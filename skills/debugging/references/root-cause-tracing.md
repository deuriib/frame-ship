# Root-Cause Tracing

Trace the bad value backward through the call stack to its origin. At each frame ask: who called this with what value, and where did that value come from? Stop at the first frame where the value should have been different — fix at source, not at symptom. Log masked entry/exit per boundary; never log secrets or full PII.
