# Policy fixtures for `conftest verify` / `opa test` — one failing, one passing per rule.

## deny_latest_tag

Fail (`fixtures/images_latest.yaml`):

```yaml
kind: Deployment
metadata:
  name: api
spec:
  template:
    spec:
      containers:
        - name: api
          image: myapp:latest
```

Pass (`fixtures/images_pinned.yaml`): same manifest with `image: registry.example.com/myapp:1.4.2@sha256:<digest>`.

## deny_open_ingress

Fail (`fixtures/sg_open.json`): terraform plan JSON with an `aws_security_group_rule`
whose `change.after` holds `cidr_blocks: ["0.0.0.0/0"]`, `from_port: 5432`, `to_port: 5432`.

Pass (`fixtures/sg_private.json`): same rule with `cidr_blocks: ["10.0.0.0/8"]`.

## deny_missing_labels

Fail (`fixtures/deploy_nolabels.yaml`): Deployment without `metadata.labels`.

Pass (`fixtures/deploy_labeled.yaml`): Deployment with all three `app.kubernetes.io/` labels.

## deny_unencrypted_state

Fail (`fixtures/backend_local.json`): `{"terraform": {"backend": {"local": {}}}}`.

Pass (`fixtures/backend_s3.json`): `{"terraform": {"backend": {"s3": {"encrypt": true}}}}`.

Run: `conftest test -p policy/ <file>` — expect FAIL on the fail fixture, clean on the pass fixture.

> Tooling note: `conftest`/`opa` is not vendored in this repo (zero-dependency rule).
> Install per environment (`brew install conftest`, `choco install conftest`, or the
> pinned CI action) and pin the version in the pipeline. The four `.rego` files
> above are the contract; the runner is the adapter.
