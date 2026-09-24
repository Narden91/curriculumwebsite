// Builds src/data/repos.generated.json with every public repository of the GitHub user.
// Runs at build time so visitors make no GitHub API calls (the unauthenticated limit is 60/hour per IP).
// Repos without a GitHub description get the first paragraph of their README; READMEs are
// re-fetched only for repos pushed since the previous run.
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fetchOk, readJsonOrNull, runIfMain } from './lib/http.mjs';

const USER = 'Narden91';
const PINNED = ['f1_ai_race_xrp', 'SmartTravel', 'SmartAdvisor'];
const API = process.env.GITHUB_API_URL ?? 'https://api.github.com';
const OUT_FILE = fileURLToPath(new URL('../src/data/repos.generated.json', import.meta.url));
const SUMMARY_WORDS = 28;
const README_CONCURRENCY = 6;
// Bump when extractReadmeSummary changes, so cached summaries are recomputed.
const SUMMARY_VERSION = 2;

function githubHeaders(accept) {
  const headers = { Accept: accept, 'User-Agent': 'curriculumwebsite', 'X-GitHub-Api-Version': '2022-11-28' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

/** Plain text from one line of Markdown. */
export function stripMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images before links, or "![alt](x)" becomes "!alt"
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|\W)[*_](\S(?:.*?\S)?)[*_](?=\W|$)/g, '$1$2') // *em* and _em_, but not snake_case
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\p{Extended_Pictographic}\uFE0F?/gu, '') // the site uses no emoji
    .replace(/\s+/g, ' ')
    .trim();
}

const NON_PROSE_PREFIXES = ['#', '![', '[![', '<', '>', '|', '---', '==='];

/** Markdown line to prose text, or null for headings, badges, HTML, tables and markup leftovers. */
function proseText(line) {
  if (NON_PROSE_PREFIXES.some((p) => line.startsWith(p))) return null;
  if (/^[a-z-]+=/i.test(line)) return null; // attribute line of a multi-line HTML tag
  const text = stripMarkdown(line);
  return /[A-Za-z]{3}/.test(text) ? text : null; // "/>" and similar leftovers are not prose
}

const MIN_SUMMARY_WORDS = 4; // shorter "paragraphs" are bylines or titles, not descriptions

/** First prose paragraph of a README, cut to SUMMARY_WORDS words; null when there is none. */
export function extractReadmeSummary(markdown) {
  let paragraph = [];
  let inFence = false;
  const wordCount = () => paragraph.join(' ').split(' ').length;
  for (const raw of markdown.split(/\r?\n/)) {
    const line = raw.trim();
    const isFence = line.startsWith('```');
    if (isFence) inFence = !inFence;
    const text = !isFence && !inFence && line && proseText(line);
    if (text) {
      paragraph.push(text);
      continue;
    }
    // A paragraph ended: keep it if it is long enough, otherwise look at the next one.
    if (paragraph.length && wordCount() >= MIN_SUMMARY_WORDS) break;
    paragraph = [];
  }
  if (!paragraph.length || wordCount() < MIN_SUMMARY_WORDS) return null;
  const words = paragraph.join(' ').split(' ');
  return words.length <= SUMMARY_WORDS ? words.join(' ') : `${words.slice(0, SUMMARY_WORDS).join(' ')}…`;
}

/** Fields the site needs from a GitHub API repository object. */
export function toRepo(api, summary = null) {
  return {
    name: api.name,
    url: api.html_url,
    description: api.description || null,
    summary,
    language: api.language || null,
    stars: api.stargazers_count,
    forks: api.forks_count,
    fork: api.fork,
    archived: api.archived,
    homepage: api.homepage || null,
    topics: api.topics ?? [],
    pushedAt: api.pushed_at,
  };
}

/** Pinned repos first (in PINNED order), then most recently pushed. */
export function sortRepos(repos, pinned = PINNED) {
  const rank = (r) => {
    const i = pinned.indexOf(r.name);
    return i === -1 ? pinned.length : i;
  };
  return [...repos].sort((a, b) => rank(a) - rank(b) || b.pushedAt.localeCompare(a.pushedAt));
}

async function listPublicRepos() {
  const repos = [];
  for (let page = 1; ; page++) {
    const res = await fetchOk(
      `${API}/users/${USER}/repos?type=owner&per_page=100&page=${page}`,
      githubHeaders('application/vnd.github+json'),
    );
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) return repos;
  }
}

/** README summary; on errors other than "no README" (404) keep the previous summary. */
async function readmeSummary(name, previousSummary) {
  try {
    const res = await fetchOk(`${API}/repos/${USER}/${name}/readme`, githubHeaders('application/vnd.github.raw'));
    return extractReadmeSummary(await res.text());
  } catch (err) {
    if (String(err.message).startsWith('404')) return null;
    console.warn(`[readme] ${name}: ${err.message}; keeping previous summary`);
    return previousSummary ?? null;
  }
}

async function main() {
  const previous = await readJsonOrNull(OUT_FILE);
  const cacheValid = previous?.summaryVersion === SUMMARY_VERSION;
  const previousByName = new Map((previous?.repos ?? []).map((r) => [r.name, r]));

  let apiRepos;
  try {
    apiRepos = await listPublicRepos();
  } catch (err) {
    if (!previous) throw new Error(`GitHub failed and no previous JSON exists: ${err.message}`);
    console.warn(`[github] ${err.message}; keeping previous repository list`);
    return;
  }

  const repos = [];
  let fetched = 0;
  for (let i = 0; i < apiRepos.length; i += README_CONCURRENCY) {
    const chunk = apiRepos.slice(i, i + README_CONCURRENCY);
    const done = await Promise.all(
      chunk.map(async (api) => {
        if (api.description) return toRepo(api);
        const prev = previousByName.get(api.name);
        // Reuse only real summaries: a null may come from a failed fetch, so it is re-checked.
        if (cacheValid && prev?.summary && prev.pushedAt === api.pushed_at) return toRepo(api, prev.summary);
        fetched++;
        return toRepo(api, await readmeSummary(api.name, prev?.summary));
      }),
    );
    repos.push(...done);
  }

  const out = {
    updatedAt: new Date().toISOString().slice(0, 10),
    user: USER,
    summaryVersion: SUMMARY_VERSION,
    repos: sortRepos(repos),
  };
  await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
  console.log(`Wrote ${repos.length} repositories (${fetched} READMEs fetched)`);
}

runIfMain(import.meta.url, main);
