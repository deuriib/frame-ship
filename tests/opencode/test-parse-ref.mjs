import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const inputPath = process.argv[2] ?? new URL('../../.opencode/plugins/frame-ship.js', import.meta.url);
const mod = await import(pathToFileURL(fs.realpathSync(inputPath)).href);

test('opencode acepta frame-ship:dev:brainstorming', () => {
  assert.deepEqual(mod.parseFrameShipRef('frame-ship:dev:brainstorming'),
    { brand: 'frame-ship', domain: 'dev', skill: 'brainstorming' });
});
test('opencode rechaza dos segmentos', () => {
  assert.throws(() => mod.parseFrameShipRef('frame-ship:brainstorming'), /tres segmentos/);
});
test('opencode rechaza marca vieja con equivalencia', () => {
  assert.throws(() => mod.parseFrameShipRef('oldbrand:brainstorming'), /frame-ship:dev:brainstorming/);
});
test('opencode rechaza dominio inválido con lista', () => {
  assert.throws(() => mod.parseFrameShipRef('frame-ship:nope:algo'), /dev.*product.*security/);
});
