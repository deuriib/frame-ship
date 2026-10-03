#!/usr/bin/env bash
#
# Guardia de marca: FAIL si `superpower` (cualquier caja) aparece fuera del allowlist.
# Task 1 del rebrand superpowers -> frame-ship (TDD RED: FAIL hasta completar Tasks 2-11).
#
# Allowlist (historia + spec + placeholders intencionales):
#   .git/, .worktrees/ (cada rama se verifica en su propio worktree),
#   .superpowers/ (workspace de herramienta, no se shippea),
#   docs/frame-ship/ (spec + plan mencionan la marca vieja por necesidad),
#   RELEASE-NOTES.md, docs/plans/, docs/superpowers/plans/ (historia intacta),
#   MIGRATION.md (menciona el corte),
#   tests/frame-ship/ (fixtures con 'superpowers:brainstorming' intencionales),
#   skills/writing-skills/SKILL.md:107 (placeholder Skill-Name-With-Hyphens),
#   tests/brainstorm-server/branding.test.js linea ASSET_URL (primeradiant.com,
#   out-of-scope: marca ajena del visual companion, no del rebrand).
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT"

RAW="$(grep -rni \
  --exclude-dir=.git \
  --exclude-dir=.worktrees \
  --exclude-dir=.superpowers \
  --exclude-dir=node_modules \
  'superpower' . || true)"

FILTERED="$(printf '%s\n' "$RAW" \
  | grep -v -E '^\./docs/frame-ship/' \
  | grep -v -E '^\./RELEASE-NOTES\.md' \
  | grep -v -E '^\./docs/plans/' \
  | grep -v -E '^\./docs/superpowers/plans/' \
  | grep -v -E '^\./MIGRATION\.md' \
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
