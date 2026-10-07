# Accepted focused source contract

Source: Turpial-AI-Academy/woia-real-estate @ eb0a7278188b2f9968e21ed4299f08184d864cac / docs/21-capability-provider-map.md

### 5.12 `woia-data-governance` — NEW_REQUIRED

**Actions:**
- `data.contract.resolve` / `data.contract.review`
- `data.normalization.review`
- `data.schema.review`
- `data.quality.evaluate`
- `data.quality.observe`
- `data.freshness.observe`
- `data.lineage.trace`
- `data.source-map.read/update`
- `data.migration.plan`
- `data.migration.reconcile`
- `data.reconciliation.status`
- `data.integrity.issue.record/resolve`

**Consumers:** Data. Other departments request Data only for a genuine governance outcome.

**Resources:** generic Data method, 1NF–5NF/BCNF review templates, security/integrity/quality/migration evaluations. Organization values live in private versioned resources; Real Estate semantics live in `woia-re-domain-contracts`.

**Boundary:** no universal backend, no routine-read proxy, no authority to accept Finance/Legal/business facts.

