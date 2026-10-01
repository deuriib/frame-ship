package devops.state

# Guardrail §7: Terraform backends must encrypt state at rest.
# Evaluated against backend config JSON (terraform init -backend-config
# dumped, or the backend block parsed to JSON in CI).

deny[msg] {
	input.terraform.backend.s3
	not input.terraform.backend.s3.encrypt == true
	msg := "S3 backend without encrypt=true — state at rest must be encrypted (guardrails §7)"
}

deny[msg] {
	input.terraform.backend.azurerm
	not input.terraform.backend.azurerm.storage_account_name
	msg := "azurerm backend missing storage account — verify state encryption (guardrails §7)"
}

deny[msg] {
	input.terraform.backend.local
	msg := "local backend in shared env — use remote encrypted state (guardrails §7)"
}
