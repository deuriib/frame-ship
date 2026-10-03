// Guardia de invocacion tres segmentos: frame-ship:{domain}:{skill}.
// Task 1 del rebrand superpowers -> frame-ship (TDD RED: FAIL hasta el Step 4,
// cuando tests/frame-ship/invocation.mjs implementa el stub isValidInvocation).
import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidInvocation } from './invocation.mjs';

test('acepta frame-ship:dev:brainstorming', () => {
  assert.deepEqual(isValidInvocation('frame-ship:dev:brainstorming'),
    { brand: 'frame-ship', domain: 'dev', skill: 'brainstorming' });
});
test('acepta frame-ship:product:product-discovery (tercer segmento exacto)', () => {
  assert.deepEqual(isValidInvocation('frame-ship:product:product-discovery'),
    { brand: 'frame-ship', domain: 'product', skill: 'product-discovery' });
});
test('rechaza dos segmentos frame-ship:brainstorming', () => {
  assert.throws(() => isValidInvocation('frame-ship:brainstorming'), /tres segmentos/);
});
test('rechaza marca vieja con equivalencia', () => {
  assert.throws(() => isValidInvocation('retired:brainstorming'), /frame-ship:dev:brainstorming/);
});
test('rechaza dominio inválido con lista de 10', () => {
  assert.throws(() => isValidInvocation('frame-ship:nope:algo'), /dev.*product.*security/);
});
test('rechaza skill inexistente sin inyección parcial', () => {
  assert.throws(
    () => isValidInvocation('frame-ship:dev:nope', { brainstorming: true }),
    /skill desconocido.*SKILL\.md/
  );
});
