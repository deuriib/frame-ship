# agents/ — Portable Templates

## OVERVIEW

Authoritative `agents/<domain>/<agent>.md` roster; every change starts here.

## STRUCTURE

```text
c-level/ engineering/ security/ finance/
legal/ marketing/ people/ revenue/ shared/
```

## WHERE TO LOOK

| Task              | Location                                                                             | Notes                                      |
| ----------------- | ------------------------------------------------------------------------------------ | ------------------------------------------ |
| Orchestrators     | `montilla, vasquez, berrera, dauhjare, espinoza, montero, santana, subero, vera` (9) | Stage + gate ownership                     |
| Build/review      | `engineering/` (15+1)                                                                | Includes review-* wave                     |
| Contracts/helpers | `agents/core/delegation-contract.md`                                                 | canonical contract; excluded from manifest |

## CONVENTIONS

- Schema order: frontmatter → H1 + portable note → craft body → one-line Delegation ref.
- Single Delegation line to `agents/core/delegation-contract.md`; no duplicated text.
- Sync rule: update `agents/README.md` count + layout on roster change.

## ANTI-PATTERNS

- Duplicating bodies across domains; harness keys in frontmatter.
- Full-context packets between stages (paths + IDs only).
