import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTitle, mapType, parseOrcid, parseScholar, mergeCitations, formatOrcidName } from './fetch-publications.mjs';

const SCHOLAR_HTML = `
<table id="gsc_rsb_st"><tr><td class="gsc_rsb_std">66</td><td class="gsc_rsb_std">60</td></tr>
<tr><td class="gsc_rsb_std">6</td><td class="gsc_rsb_std">6</td></tr>
<tr><td class="gsc_rsb_std">1</td><td class="gsc_rsb_std">1</td></tr></table>
<tbody><tr class="gsc_a_tr"><td class="gsc_a_t"><a href="#" class="gsc_a_at">Handwriting strokes as biomarkers for Alzheimer&#8217;s disease prediction: a novel machine learning approach</a>
<div class="gs_gray">E Nardone, C De Stefano</div></td><td class="gsc_a_c"><a href="#" class="gsc_a_ac gs_ibl">19</a></td></tr>
<tr class="gsc_a_tr"><td class="gsc_a_t"><a href="#" class="gsc_a_at">Uncited work &amp; friends</a></td><td class="gsc_a_c"><a class="gsc_a_ac gs_ibl"></a></td></tr></tbody>`;

test('normalizeTitle ignores case, punctuation and quote style', () => {
  assert.equal(normalizeTitle("Alzheimer’s: A Study!"), normalizeTitle("alzheimer's a study"));
});

test('mapType maps ORCID work types to site categories', () => {
  assert.equal(mapType('journal-article'), 'journal');
  assert.equal(mapType('book-chapter'), 'conference');
  assert.equal(mapType('conference-paper'), 'conference');
  assert.equal(mapType('preprint'), 'preprint');
  assert.equal(mapType('other'), 'preprint');
  assert.equal(mapType('dissertation-thesis'), 'other');
});

test('parseOrcid reads title, year, type and DOI', () => {
  const [w] = parseOrcid({
    group: [{
      'work-summary': [{
        title: { title: { value: 'A paper' } },
        'publication-date': { year: { value: '2025' } },
        type: 'journal-article',
        'put-code': 42,
        'journal-title': { value: 'Pattern Recognition Letters' },
        'external-ids': { 'external-id': [{ 'external-id-type': 'doi', 'external-id-value': '10.1/x' }] },
      }],
    }],
  });
  assert.deepEqual(w, { title: 'A paper', year: 2025, type: 'journal', venue: 'Pattern Recognition Letters', doi: '10.1/x', url: undefined, putCode: 42 });
});

test('parseScholar reads totals and per-row citations, decoding entities', () => {
  const s = parseScholar(SCHOLAR_HTML);
  assert.equal(s.citations, 66);
  assert.equal(s.hIndex, 6);
  assert.equal(s.i10Index, 1);
  assert.equal(s.rows.length, 2);
  assert.equal(s.rows[0].citations, 19);
  assert.match(s.rows[0].title, /Alzheimer’s/);
  assert.deepEqual(s.rows[1], { title: 'Uncited work & friends', citations: 0 });
});

test('parseScholar throws on a CAPTCHA / unknown page', () => {
  assert.throws(() => parseScholar('<html>Please show you are not a robot</html>'), /not recognised/);
});

test('mergeCitations matches Scholar rows by normalised title', () => {
  const pubs = [
    { title: "Handwriting Strokes as Biomarkers for Alzheimer's Disease Prediction: A Novel Machine Learning Approach", doi: '10.1/a' },
    { title: 'Not on Scholar', doi: '10.1/b' },
  ];
  const [a, b] = mergeCitations(pubs, parseScholar(SCHOLAR_HTML).rows);
  assert.equal(a.citations, 19);
  assert.equal(b.citations, undefined);
});

test('mergeCitations falls back to previous snapshot by DOI when Scholar failed', () => {
  const pubs = [{ title: 'Renamed title', doi: '10.1/A' }];
  const previous = [{ title: 'Old title', doi: '10.1/a', citations: 7 }];
  assert.equal(mergeCitations(pubs, null, previous)[0].citations, 7);
});

test('formatOrcidName turns "Family, Given" into "Given Family"', () => {
  assert.equal(formatOrcidName('Nardone, E.'), 'E. Nardone');
  assert.equal(formatOrcidName('di Freca, A.S.'), 'A.S. di Freca');
  assert.equal(formatOrcidName('Consortium'), 'Consortium');
});

test('mergeCitations replaces an ALL-CAPS title with the Scholar title', () => {
  const rows = [{ title: 'When Deep Learning Fails: Limits of Recurrent Models', citations: 3 }];
  const [p] = mergeCitations([{ title: 'WHEN DEEP LEARNING FAILS: LIMITS OF RECURRENT MODELS' }], rows);
  assert.equal(p.title, rows[0].title);
  assert.equal(p.citations, 3);
});
