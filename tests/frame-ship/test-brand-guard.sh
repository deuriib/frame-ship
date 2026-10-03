#!/usr/bin/env bash
#
# Guardia de marca: FAIL si `superpower` (cualquier caja) aparece fuera del allowlist.
# Task 1 del rebrand superpowers -> frame-ship (TDD RED: FAIL hasta completar Tasks 2-11).
#
# Allowlist (historia + spec + placeholders intencionales):
#   .git/, .worktrees/ (cada rama se verifica en su propio worktree),
#   .superpowers/ (SDD activo de ESTE rebrand; se archiva al cerrar el plan),
#   .frame-ship/ (workspace de herramienta, no se shippea),
#   docs/frame-ship/ (spec + plan mencionan la marca vieja por necesidad),
#   RELEASE-NOTES.md, docs/plans/, docs/superpowers/ (historia intacta),
#   README.md + MIGRATION.md (atribución con link a obra/superpowers, intencional),
#   tests/frame-ship/ (fixtures con marca retirada intencionales),
#   skills/writing-skills/SKILL.md:107 (placeholder Skill-Name-With-Hyphens),
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT"

RAW="$(grep -rni \
  --exclude-dir=.git \
  --exclude-dir=.worktrees \
  --exclude-dir=.superpowers \
  --exclude-dir=.frame-ship \
  --exclude-dir=node_modules \
  'superpower' . || true)"

FILTERED="$(printf '%s\n' "$RAW" \
  | grep -v -E '^\./docs/frame-ship/' \
  | grep -v -E '^\./RELEASE-NOTES\.md' \
  | grep -v -E '^\./docs/plans/' \
  | grep -v -E '^\./docs/superpowers/' \
  | grep -v -E '^\./MIGRATION\.md' \
  | grep -v -E '^\./README\.md:5:' \
  | grep -v -E '^\./tests/frame-ship/' \
  | grep -v -E '^\./skills/writing-skills/SKILL\.md:107:' \
  | grep -v -E 'branding\.test\.js:[0-9]+:.*primeradiant\.com' \
  || true)"

# Descarta lineas vacias (RAW vacio deja una linea en blanco via printf).
FILTERED="$(printf '%s\n' "$FILTERED" | grep -v -E '^[[:space:]]*$' || true)"

if [ -n "$FILTERED" ]; then
  COUNT="$(printf '%s\n' "$FILTERED" | wc -l)"
  echo "BRAND-GUARD FAIL: $COUNT linea(s) con 'superpower' fuera del allowlist:"
  printf '%s\n' "$FILTERED"
  exit 1
fi

echo "BRAND-GUARD PASS: sin 'superpower' fuera del allowlist."
