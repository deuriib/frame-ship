import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

// TS source can't be imported directly: extract the pure parser body and eval it.
// The extraction is intentionally dumb: VALID_DOMAINS const + function, with the
// TS type annotations stripped line-wise (no regex surgery on multi-line shapes).
const src = await readFile(new URL('../../.pi/extensions/frame-ship.ts', import.meta.url), 'utf8');

function extractParser(source) {
  const start = source.indexOf('export function parseFrameShipRef');
  const end = source.indexOf('function messageContainsBootstrap');
  const block = source.slice(start, end);
  const lines = block.split('\n').filter((ln) => {
    const t = ln.trim();
    // drop the TS return-type annotation lines
    if (t.startsWith('brand:') || t.startsWith('domain:') || t.startsWith('skill:') || t === '} {') return false;
    return true;
  });
  return lines
    .join('\n')
    .replace('export function', 'function')
    .replace('(ref: string): {', '(ref) {')
    .replace('(ref: string)', '(ref)')
    .replace('(VALID_DOMAINS as readonly string[]).includes(domain)', 'VALID_DOMAINS.includes(domain)');
}

// VALID_DOMAINS is defined just above the parser in the .ts; reuse it verbatim.
const domainsSrc = src.slice(src.indexOf('const VALID_DOMAINS'), src.indexOf('export function parseFrameShipRef'));
const js = domainsSrc.replaceAll('\t', '  ').replace('] as const;', '];') + '\n' + extractParser(src);
const parseFrameShipRef = new Function(`${js}; return parseFrameShipRef;`)();

test('pi ext acepta frame-ship:dev:brainstorming', () => {
  assert.deepEqual(parseFrameShipRef('frame-ship:dev:brainstorming'),
    { brand: 'frame-ship', domain: 'dev', skill: 'brainstorming' });
});
test('pi ext rechaza dos segmentos', () => {
  assert.throws(() => parseFrameShipRef('frame-ship:brainstorming'), /tres segmentos/);
});
test('pi ext rechaza marca vieja con equivalencia', () => {
  assert.throws(() => parseFrameShipRef('oldbrand:brainstorming'), /frame-ship:dev:brainstorming/);
});
test('pi ext rechaza dominio inválido con lista', () => {
  assert.throws(() => parseFrameShipRef('frame-ship:nope:algo'), /dev.*product.*security/);
});
