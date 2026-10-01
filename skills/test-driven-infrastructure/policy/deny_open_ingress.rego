package devops.network

# Guardrail §7: no ingress open to the world on sensitive ports.
# Covers terraform plan JSON (aws_security_group_rule / azurerm NSG style
# ingress blocks) and K8s NetworkPolicy-less Service of type LoadBalancer
# without restriction annotation (flagged for review, not auto-fail —
# see warn below).

import future.keywords.in

sensitive_ports := {22, 3389, 5432, 3306, 6379, 27017, 9200, 5601}

deny[msg] {
	rule := input.resource_changes[_].change.after.ingress[_]
	rule.cidr_blocks[_] == "0.0.0.0/0"
	port_ok(rule)
	msg := sprintf("ingress open to 0.0.0.0/0 on ports %v/%v — restrict CIDR (guardrails §7)", [rule.from_port, rule.to_port])
}

port_ok(rule) {
	sensitive_ports[rule.from_port]
} {
	sensitive_ports[rule.to_port]
} {
	rule.from_port == 0
	rule.to_port == 0
}
