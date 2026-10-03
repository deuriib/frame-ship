// Contrato de invocacion frame-ship:{domain}:{skill} (Task 1).
// Tasks 4-13 implementan este contrato por runtime; este stub es la referencia
// compartida que usan los tests y los tasks 2-11.
export const VALID_DOMAINS = [
  'dev',
  'product',
  'security',
  'devops',
  'finance',
  'legal',
  'marketing',
  'people',
  'revenue',
  'automation-roi',
];

// Mismo set de exclusiones que tests/frame-ship/test-brand-guard.sh, para que
// Tasks 2-10 lo reutilicen: historia + spec/plan + placeholders intencionales.
export const brandGuardAllowlist = [
  '.git/',
  '.worktrees/',
  '.superpowers/',
  'docs/frame-ship/',
  'RELEASE-NOTES.md',
  'docs/plans/',
  'docs/superpowers/plans/',
  'MIGRATION.md',
  'tests/frame-ship/',
  'skills/writing-skills/SKILL.md:107',
  'tests/brainstorm-server/branding.test.js (linea ASSET_URL primeradiant.com)',
];

export function isValidInvocation(ref) {
  if (typeof ref === 'string' && ref.startsWith('superpowers:')) {
    const skill = ref.slice('superpowers:'.length).split(':').pop();
    throw new Error(
      `Marca retirada '${ref}': soy frame-ship, actualiza tu bootstrap. ` +
      `Equivalencia: frame-ship:dev:${skill}. Ver MIGRATION.md`
    );
  }
  const m = typeof ref === 'string' && /^frame-ship:([a-z-]+):([a-z-]+)$/.exec(ref);
  if (!m) {
    throw new Error(
      `Invocacion invalida '${ref}': se requieren tres segmentos: ` +
      `usa frame-ship:{domain}:{skill}. Ver MIGRATION.md`
    );
  }
  const [, domain, skill] = m;
  if (!VALID_DOMAINS.includes(domain)) {
    throw new Error(
      `Dominio desconocido '${domain}' en '${ref}'. ` +
      `Dominios validos: ${VALID_DOMAINS.join(', ')}. Ver MIGRATION.md`
    );
  }
  return { brand: 'frame-ship', domain, skill };
}
