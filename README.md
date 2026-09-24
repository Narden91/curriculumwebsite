# curriculumwebsite

Personal academic website of Emanuele Nardone, postdoctoral researcher at the University of Eastern Finland.
Live at <https://narden91.github.io/curriculumwebsite/>.

React 19, TypeScript, Vite 6 and React Router 7, styled with plain CSS (no UI framework).

## Develop

```bash
npm ci
npm run dev            # http://localhost:5173
npm run build          # type-check and build to dist/
npm run lint
npm run test:scripts   # tests for the data scripts (node:test)
```

## Data that updates itself

Publications and repositories are fetched at build time, not in the visitor's browser:

| Script | Sources | Output |
| --- | --- | --- |
| `npm run fetch:pubs` | ORCID (list), Crossref (metadata), Google Scholar (citations, h-index) | `src/data/publications.generated.json` |
| `npm run fetch:repos` | GitHub API (all public repositories, README summaries) | `src/data/repos.generated.json` |
| `npm run fetch:data` | both of the above | |

If a source is down or rate-limited, the script keeps the values already in the JSON file, so a
failed fetch never breaks a deploy. Commit the generated files: they are the fallback.
Set `GITHUB_TOKEN` to raise GitHub's limit of 60 requests per hour.

Everything else (experience, education, skills, postdoc topics) is edited by hand in `src/data/`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main` and
every Monday at 06:00 UTC, running `fetch:data` first so new papers and citations appear without a push.
GitHub pauses scheduled workflows after 60 days without repository activity.

## Credits

Fonts: Geist and Geist Mono (Vercel) and Instrument Serif, SIL Open Font License, self-hosted in
`public/fonts/` with their licence files.
