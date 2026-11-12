# Scaffold Checklist — Greenfield Foundation

Run as a mandatory first lane in `execute-spec` when no repo, CI, or test
harness exists. Gate: **pipeline green on an empty suite** before any feature
lane starts.

## Foundation

- [ ] Repo skeleton (language/build layout, `.gitignore`, license, README stub)
- [ ] CI wired and green on an empty suite (`typecheck` + `test` jobs run, not no-op)
- [ ] Test harness present (runner + one smoke test that fails when broken)
- [ ] Conventions declared (commit format, branch policy, lint/format config)
- [ ] Monitoring/logging hookpoints (where deploy events + SLO signals land)

## Gate

- [ ] `git status` clean after scaffold commit
- [ ] `CI` green (typecheck + test executed, zero steps commented out)
- [ ] Rollback path exists and is reversible before the first feature lane
