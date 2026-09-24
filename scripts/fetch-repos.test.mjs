import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stripMarkdown, extractReadmeSummary, toRepo, sortRepos } from './fetch-repos.mjs';

test('stripMarkdown removes images before links and keeps snake_case names', () => {
  assert.equal(stripMarkdown('![logo](a.png) See [docs](http://x) for **f1_ai_race** and `code`'), 'See docs for f1_ai_race and code');
  assert.equal(stripMarkdown('An _emphasised_ word'), 'An emphasised word');
  assert.equal(stripMarkdown('Welcome to my site! 🚀 Enjoy'), 'Welcome to my site! Enjoy');
});

test('extractReadmeSummary skips headings, badges, HTML tags and code, joining the first paragraph', () => {
  const md = [
    '# Title',
    '[![CI](badge.svg)](ci)',
    '<img',
    '  src="https://readme-typing-svg.demolab.com?font=Fira"',
    '/>',
    '```bash',
    'pip install x',
    '```',
    'A toolkit for **handwriting** analysis',
    'with evolutionary feature selection.',
    '',
    'Second paragraph is ignored.',
  ].join('\n');
  assert.equal(extractReadmeSummary(md), 'A toolkit for handwriting analysis with evolutionary feature selection.');
});

test('extractReadmeSummary truncates long paragraphs and returns null without prose', () => {
  const long = Array.from({ length: 40 }, (_, i) => `word${i}`).join(' ');
  assert.match(extractReadmeSummary(long), /^word0 .* word27…$/);
  assert.equal(extractReadmeSummary('# Only a heading\n\n![img](x.png)'), null);
});

test('toRepo keeps only the fields the site uses', () => {
  const repo = toRepo({
    name: 'x', html_url: 'https://github.com/u/x', description: '', language: null, stargazers_count: 2,
    forks_count: 1, fork: true, archived: false, homepage: '', topics: ['ml'], pushed_at: '2026-01-01T00:00:00Z',
  }, 'From README');
  assert.deepEqual(repo, {
    name: 'x', url: 'https://github.com/u/x', description: null, summary: 'From README', language: null, stars: 2,
    forks: 1, fork: true, archived: false, homepage: null, topics: ['ml'], pushedAt: '2026-01-01T00:00:00Z',
  });
});

test('sortRepos puts pinned repos first in pinned order, then newest push', () => {
  const repos = [
    { name: 'old', pushedAt: '2024-01-01' },
    { name: 'b', pushedAt: '2023-01-01' },
    { name: 'new', pushedAt: '2026-01-01' },
    { name: 'a', pushedAt: '2022-01-01' },
  ];
  assert.deepEqual(sortRepos(repos, ['a', 'b']).map((r) => r.name), ['a', 'b', 'new', 'old']);
});

test('extractReadmeSummary skips byline-like short paragraphs', () => {
  const md = ['# Tool', '', 'Emanuele Nardone', '', 'Deploys a small LLM on Kubernetes with GPU scheduling.'].join('\n');
  assert.equal(extractReadmeSummary(md), 'Deploys a small LLM on Kubernetes with GPU scheduling.');
});
