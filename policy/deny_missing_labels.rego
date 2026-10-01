package devops.labels

# Guardrail §7: every K8s object carries the three identifying labels so
# ownership, version and tooling are traceable in incidents.

required := {"app.kubernetes.io/name", "app.kubernetes.io/version", "app.kubernetes.io/managed-by"}

deny[msg] {
	input.kind
	input.metadata
	missing := {l | l := required[_]; not input.metadata.labels[l]}
	count(missing) > 0
	msg := sprintf("%s/%s missing labels %v (guardrails §7)", [input.kind, input.metadata.name, missing])
}
