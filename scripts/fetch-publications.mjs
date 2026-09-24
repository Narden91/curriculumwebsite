// Builds src/data/publications.generated.json from ORCID (the list), Crossref
// (authors/venue per DOI) and Google Scholar (citation counts).
// Runs in CI before each build. Any source that fails falls back to the values
// already in the JSON, so a Scholar block never breaks a deploy.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ORCID_ID = '0009-0005-8718-5435';
const SCHOLAR_USER = '2qupBvTUD3sC';
const ORCID_URL = process.env.ORCID_URL ?? `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;
const SCHOLAR_URL =
  process.env.SCHOLAR_URL ?? `https://scholar.google.com/citations?user=${SCHOLAR_USER}&hl=en&pagesize=100`;
const ORCID_WORK_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/work/`;
const CROSSREF_URL = 'https://api.crossref.org/works/';
const OUT_FILE = fileURLToPath(new URL('../src/data/publications.generated.json', import.meta.url));
const TIMEOUT_MS = 20_000;

// Titles differ between sources only in case, punctuation and quote style.
export function normalizeTitle(title) {
  return title.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function mapType(orcidType) {
  if (orcidType === 'journal-article' || orcidType === 'review') return 'journal';
  if (orcidType === 'book-chapter' || orcidType?.startsWith('conference')) return 'conference';
  if (orcidType === 'preprint' || orcidType === 'other' || orcidType === 'working-paper') return 'preprint';
  return 'other';
}

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

const stripTags = (s) => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

export function parseOrcid(json) {
  return json.group.map((g) => {
    const w = g['work-summary'][0];
    const ids = w['external-ids']?.['external-id'] ?? [];
    const doi = ids.find((e) => e['external-id-type'] === 'doi')?.['external-id-value'];
    return {
      title: w.title.title.value,
      year: Number(w['publication-date']?.year?.value) || null,
      type: mapType(w.type),
      venue: w['journal-title']?.value ?? '',
      doi: doi ?? undefined,
      url: w.url?.value ?? undefined,
      putCode: w['put-code'],
    };
  });
}

// ORCID credit names look like "Nardone, E." or "di Freca, A.S."; show them as "E. Nardone".
export function formatOrcidName(name) {
  if (!name) return '';
  const [family, given] = name.split(',').map((x) => x.trim());
  return given ? `${given} ${family}` : family;
}

// Profile page stats table: citations, h-index, i10 (each "all" then "since").
export function parseScholar(html) {
  const stats = [...html.matchAll(/class="gsc_rsb_std">(\d+)</g)].map((m) => Number(m[1]));
  if (stats.length < 6) throw new Error('Scholar markup not recognised (blocked or changed)');
  const rows = html
    .split('<tr class="gsc_a_tr">')
    .slice(1)
    .map((row) => ({
      title: decodeEntities(row.match(/class="gsc_a_at">([^<]*)</)?.[1] ?? ''),
      citations: Number(row.match(/class="gsc_a_ac[^"]*">(\d*)</)?.[1]) || 0,
    }))
    .filter((r) => r.title);
  // Citations-per-year histogram: year labels left to right; bars carry z-index 1 for the
  // latest year upward, and years with zero citations have no bar at all.
  const years = [...html.matchAll(/class="gsc_g_t"[^>]*>(\d{4})</g)].map((m) => Number(m[1]));
  const byYear = years.map((year) => ({ year, citations: 0 }));
  for (const m of html.matchAll(/class="gsc_g_a"[^>]*z-index:(\d+)[^>]*><span class="gsc_g_al">(\d+)</g)) {
    const slot = byYear[years.length - Number(m[1])];
    if (slot) slot.citations = Number(m[2]);
  }
  return { citations: stats[0], hIndex: stats[2], i10Index: stats[4], byYear, rows };
}

function findByTitle(title, entries) {
  const key = normalizeTitle(title);
  return (
    entries.find((e) => normalizeTitle(e.title) === key) ??
    // Scholar sometimes drops a subtitle or adds one; accept a long shared prefix.
    entries.find((e) => {
      const other = normalizeTitle(e.title);
      return Math.min(key.length, other.length) >= 30 && (key.startsWith(other) || other.startsWith(key));
    })
  );
}

// Citations come from Scholar rows when we have them, otherwise from the previous snapshot.
export function mergeCitations(pubs, scholarRows, previousPubs = []) {
  return pubs.map((p) => {
    let citations;
    let title = p.title;
    if (scholarRows) {
      const row = findByTitle(p.title, scholarRows);
      citations = row?.citations;
      // Some ORCID records carry ALL-CAPS titles; Scholar's casing reads better.
      if (row && p.title === p.title.toUpperCase()) title = row.title;
    } else {
      const prev =
        (p.doi && previousPubs.find((q) => q.doi?.toLowerCase() === p.doi.toLowerCase())) ||
        findByTitle(p.title, previousPubs);
      citations = prev?.citations;
    }
    return citations === undefined ? { ...p, title } : { ...p, title, citations };
  });
}

async function fetchOk(url, headers = {}) {
  let res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  // Crossref's public pool answers 429 when pushed; wait once and retry.
  if (res.status === 429) {
    const waitS = Math.min(Number(res.headers.get('retry-after')) || 2, 10);
    await new Promise((r) => setTimeout(r, waitS * 1000));
    res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res;
}

async function enrich(pub, previousPubs) {
  const prev = pub.doi && previousPubs.find((q) => q.doi?.toLowerCase() === pub.doi.toLowerCase());
  if (pub.doi) {
    try {
      const doiPath = pub.doi.split('/').map(encodeURIComponent).join('/');
      const res = await fetchOk(CROSSREF_URL + doiPath, {
        'User-Agent': 'curriculumwebsite (https://github.com/Narden91/curriculumwebsite)',
      });
      const m = (await res.json()).message;
      const containers = m['container-title'] ?? [];
      return {
        ...pub,
        title: m.title?.[0] ? decodeEntities(stripTags(m.title[0])) : pub.title,
        authors: (m.author ?? [])
          .map((a) => decodeEntities([a.given, a.family].filter(Boolean).join(' ') || a.name || ''))
          .filter(Boolean),
        // For LNCS proceedings Crossref lists the series first and the volume title last.
        venue: containers.at(-1) ?? pub.venue,
        volume: m.volume ?? undefined,
        pages: m.page ?? m['article-number'] ?? undefined,
      };
    } catch (err) {
      console.warn(`[crossref] ${pub.doi}: ${err.message}`);
      if (prev?.authors?.length) return { ...prev, type: pub.type, year: pub.year };
    }
  }
  // No Crossref record (no DOI, or a DataCite DOI such as arXiv): ORCID's own work record has the authors.
  try {
    const res = await fetchOk(ORCID_WORK_URL + pub.putCode, { Accept: 'application/json' });
    const w = await res.json();
    const authors = (w.contributors?.contributor ?? []).map((c) => formatOrcidName(c['credit-name']?.value)).filter(Boolean);
    return { ...pub, authors };
  } catch (err) {
    console.warn(`[orcid work ${pub.putCode}] ${err.message}`);
    return prev || { ...pub, authors: [] };
  }
}

async function readPrevious() {
  try {
    return JSON.parse(await readFile(OUT_FILE, 'utf8'));
  } catch {
    return null;
  }
}

async function main() {
  const previous = await readPrevious();
  const today = new Date().toISOString().slice(0, 10);

  let pubs;
  try {
    const res = await fetchOk(ORCID_URL, { Accept: 'application/json' });
    pubs = [];
    // Sequential on purpose: Crossref rate-limits parallel anonymous requests.
    for (const pub of parseOrcid(await res.json())) {
      pubs.push(await enrich(pub, previous?.publications ?? []));
    }
  } catch (err) {
    if (!previous) throw new Error(`ORCID failed and no previous JSON exists: ${err.message}`);
    console.warn(`[orcid] ${err.message}; keeping previous publication list`);
    pubs = previous.publications;
  }

  let scholar = previous?.scholar ?? null;
  let scholarRows = null;
  try {
    const res = await fetchOk(SCHOLAR_URL, {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36',
      'Accept-Language': 'en',
    });
    const parsed = parseScholar(await res.text());
    scholar = {
      citations: parsed.citations,
      hIndex: parsed.hIndex,
      i10Index: parsed.i10Index,
      byYear: parsed.byYear,
      updatedAt: today,
    };
    scholarRows = parsed.rows;
  } catch (err) {
    console.warn(`[scholar] ${err.message}; keeping previous citation counts`);
  }

  pubs = mergeCitations(pubs, scholarRows, previous?.publications ?? []);
  pubs.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));

  const out = { updatedAt: today, orcidId: ORCID_ID, scholarUser: SCHOLAR_USER, scholar, publications: pubs };
  await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
  const withCites = pubs.filter((p) => p.citations !== undefined).length;
  console.log(
    `Wrote ${pubs.length} publications (${withCites} with citation counts); ` +
      `Scholar: ${scholar ? `${scholar.citations} citations, h=${scholar.hIndex} (${scholar.updatedAt})` : 'none'}`,
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
