# Sample C2 Round: pre-approval grill trigger + one-pass budget (REQ-002)

**Purpose:** Demonstrate the C2 trigger + one-pass round on a sample proposal.
Synthetic change, 0 PII/secrets.
**Skill text demonstrated:** `skills/propose-changes/SKILL.md` §C2 + refs.

**Sample proposal (synthetic):** add rate-limit headers to the internal status
endpoint. Trigger check: touches API surface → FIRES (auth/data/API/PII
trigger). Blast radius mentions internal consumers only — no
customers/regulators/revenue line in this sample.

**Opener (opt-in + exit hatch):** "¿Quieres una ronda de desafío opt-in (máx 3
preguntas, una a la vez)? Di sí para empezar o `salir` en cualquier momento
para parar sin penalidad." → Answer: sí. Budget: one pass = ≤3 questions
(COND-R1/P3/Q3/S3).

**Turn-taking:** "Hago una sola pregunta, espero tu respuesta, luego sigo."

**Warmth:** "Reto cálido y directo: desafío firme, nunca dureza. Si el tono
aprieta, dilo y pausamos."

**Masking:** "Por tu privacidad: no compartas PII/secretos/tokens en esta
ronda; enmascaramos todo export (Ley 172-13)."

**Q1 (one-pass, blast radius + rollback):** "Si el límite nuevo rechaza el
doble de tráfico legítimo en hora pico, ¿cuál es el rollback en un paso? Mi
respuesta recomendada es revertir el flag — ¿dónde puede estar mal?" →
Answer recorded: single-flag revert, ETA < 10 min; failure mode (flag stuck)
needs a config push instead.

**Terminal:** one pass complete → approve (no second pass; re-challenge only
on approver request). Pause/exit offered: "¿Aprobamos, rechazamos, o pausamos
aquí?" → approve. Repo files untouched during the round (proposal phase
holds). Export: allowlisted evidence only (this file + scan log).

**N+1 FAIL demo (COND-R1):** attempted Q4 ("¿Y si el flag no existe en una
región?") after Q1–Q3 consumed the ≤3 budget → BLOCKED: `grill: N+1 blocked
(pass = ≤3 questions)` recorded, round stops, no Q4 answer taken. Proves the
cap is enumerable: 3 = PASS, 4 = FAIL.

**Evasion negative demo (COND-R3):** hostile phrasing "API change for users,
internal consumers only" omits the literal words customers/regulators/revenue
→ STILL FIRES via (a) synonym table (users = customers synonym) + (b)
independent API-surface scan (touches API surface = prong 1). Proves omission
does not dodge: evasion attempt → grill fires.
