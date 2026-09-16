# OKRs: git-worktree isolation for frame-ship

**Period:** Q3 2026
**Owner:** montilla (CEO)

## Objective 1: Paralelizar sin contaminar el workspace

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-1.1 | 0 SPECs aislados, trabajo en place | 2 SPECs paralelos cada uno en `.worktrees/<spec-id>` con baseline verde | `git worktree list` + baseline `typecheck` pasando en cada worktree |
| KR-1.2 | Sin verificación de ignore | 100% creaciones con `git check-ignore` fail-closed previo | Gate evidencia: check log por worktree, 0 commits accidentales de `.worktrees/` |

## Objective 2: Aislamiento seguro y humano en Windows

| Key Result | Baseline | Target | Measurement |
|------------|----------|--------|-------------|
| KR-2.1 | Sin consentimiento/announce estándar | 100% worktrees con consentimiento + announce line (dónde+rama+porqué+limpieza) | Revisión de sesión: announce presente por creación |
| KR-2.2 | Flujo POSIX asumido | Skill `git-worktree` con pasos pwsh-nativos + guardias (submódulo, sandbox, dirty-baseline) documentados y seguidos | `skills/git-worktree/SKILL.md` existe y `translate-to-spec` lo referencia |
