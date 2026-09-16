# Defense in Depth

After fixing the root cause, add validation at multiple layers (input boundary, service boundary, persistence) so the same class cannot silently recur. One fix + layered guards; no bundled refactors. Each guard gets its own evidence entry in the gate trace.
