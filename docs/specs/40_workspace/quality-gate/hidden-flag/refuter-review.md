# review-refuter — hidden flag (adversarial)

**SPEC:** SPEC-hidden-flag-engineering | **Verdict:** PASS | **Findings:** 0 (all refutations fail = claim stands)

- Refute "montilla hidden too": FALSE — brief says all except montilla; `rg 'key: "montilla".*hidden'` = 0. Claim stands.
- Refute "subagents need hidden:false": FALSE — HARD says untouched as hidden-by-default; `rg 'mode: "subagent".*hidden'` = 0; conditional spread keeps absent-hidden byte-identical. Claim stands.
- Refute "mirror needs no type change": FALSE — without `hidden?: boolean` on Records, `tsc` would reject the spread; typecheck EXIT 0 with it. Claim stands.
- Refute "hidden:string works": FALSE — brief freezes exact shape `hidden:true` boolean; strings would break host contract. Claim stands.
- Refute "version bump required": FALSE — no release policy demands it; triple stays v0.6.0; ship-release decides. Claim stands.
