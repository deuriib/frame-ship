package devops.images

# Guardrail §5: no :latest or untagged images in prod paths.
# Evaluated by conftest against terraform plan JSON, Helm-rendered
# manifests, or raw K8s YAML (one rule, all input shapes).

deny[msg] {
	image := _images[_]
	_latest_or_untagged(image)
	msg := sprintf("image %q uses :latest or no tag — pin to digest or immutable tag (guardrails §5)", [image])
}

_images[img] {
	img := input.resource_changes[_].change.after.image
} {
	img := input.resource_changes[_].change.after.containers[_].image
} {
	img := input.spec.template.spec.containers[_].image
} {
	img := input.spec.template.spec.initContainers[_].image
} {
	img := input.containers[_].image
}

_latest_or_untagged(image) {
	endswith(image, ":latest")
} {
	not contains(image, ":")
}
