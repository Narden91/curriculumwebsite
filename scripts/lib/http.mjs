// Shared by the build-time data scripts (publications, repositories).
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const TIMEOUT_MS = 20_000;

/**
 * fetch() that throws on non-2xx and retries once on 429 (Crossref and GitHub rate limits).
 * @param {string} url
 * @param {Record<string, string>} [headers]
 * @returns {Promise<Response>}
 */
export async function fetchOk(url, headers = {}) {
  let res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (res.status === 429) {
    const waitS = Math.min(Number(res.headers.get('retry-after')) || 2, 10);
    await new Promise((r) => setTimeout(r, waitS * 1000));
    res = await fetch(url, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
  }
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res;
}

/**
 * Previous output of a script, used as the fallback when a source is down.
 * @param {string} file
 * @returns {Promise<any | null>}
 */
export async function readJsonOrNull(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch {
    return null;
  }
}

/**
 * Runs main() only when the module is executed directly, not when imported by tests.
 * @param {string} importMetaUrl
 * @param {() => Promise<void>} main
 */
export function runIfMain(importMetaUrl, main) {
  if (!process.argv[1] || pathToFileURL(path.resolve(process.argv[1])).href !== importMetaUrl) return;
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
