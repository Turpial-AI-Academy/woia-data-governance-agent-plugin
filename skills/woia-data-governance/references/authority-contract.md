# Accepted focused source contract


## 2. Authority planes

Authority is evaluated at the **actual operation boundary**, not only during planning.

### 2.1 Generic control plane

Core owns generic:
- AgentInstance / Task identity;
- AuthorityContext and exact grants;
- approval references;
- Effect identity/state/reconciliation;
- resource scope;
- current revision checks;
- no-authority-from-wake/request/install/access semantics.

Organization resource resolution supplies versioned organization policy references without copying private truth into Projects.

### 2.2 Organization policy plane

Private organization configuration supplies versioned:
- represented-principal powers and current delegation;
- role/delegation grants;
- financial per-effect and aggregate limits;
- allowed confirmation modes;
- approval requirements and validity windows;
- channel/recipient/purpose policies;
- fee/adjustment policies;
- holds/revocations/emergency stops;
- independence/dual-control requirements where applicable.

These values are data/resources, not a new plugin identity.

### 2.3 Provider enforcement plane

The provider that can create the consequence must fail closed if the effective authority is insufficient.

A provider may narrow an organization policy. It may never broaden it.

## 3. Effective authority evaluation

Before dispatch/mutation, verify all applicable dimensions:

| Dimension | Required proof |
|---|---|
| actor | authenticated principal / AgentInstance and current Task |
| department | effective executing department matches operation contract |
| capability | exact admitted provider and operation |
| effect | exact effect class and stable business/effect key |
| represented principal | current representation/power/delegation when applicable |
| organization policy | exact policy version/digest and effective interval |
| target | exact typed resource, fields and operation scope |
| counterparty/recipient | exact Subject/ContactPoint/beneficiary/vendor |
| money | exact amount, currency, fees, custody, beneficiary/account and aggregate limits |
| source | current Source Authority Map, freshness and conflict state |
| approval | exact approval when required, including payload digest and conditions |
| revocation/hold | rechecked immediately before effect |
| concurrency | expected revision / reservation / fencing where applicable |

Any material mismatch returns a precise blocker or denial. It never falls back to model judgment.

## 4. Decision classes

| Decision | Meaning |
|---|---|
| AUTONOMOUS | bounded action fully covered by existing grant/policy; no per-action human approval |
| POLICY_GOVERNED | explicit deterministic current policy permits the action under exact conditions |
| APPROVAL_REQUIRED | competent decision on the exact material effect must precede dispatch |
| FORBIDDEN | outside authority or prohibited; normal approval cannot cure it |

## 5. Protected human boundaries

### Accepted policy boundaries

The current accepted organization/domain policy identifies protected decisions and competent approving principals. Resolve its exact version, digest, scope and validity at dispatch. Missing policy, held or revoked grants, mismatched targets and unapproved material effects fail closed. A model cannot invent policy or enlarge a grant.

AI may prepare, compare, summarize and persist attributable competent decisions within its existing authority.

### Approval is not transport

Core receiver acceptance and result return remain autonomous work mechanics. They do not approve the underlying business consequence.

## 6. Customer Service boundary

Only Customer Service executes agent-generated external-person communication.

Approval by a competent business owner never implicitly grants another department permission to send the resulting message.

Each outward communication has its own recipient/purpose/content/channel guard.

## 12. Approval binding

An approval binds at minimum:
- approval ID/revision;
- competent approving principal;
- evidence/source of approving power;
- Task/Effect/business operation;
- capability + operation;
- exact target/counterparty;
- action/payload digest;
- amount/currency/fees if applicable;
- beneficiary/account/custody/purpose;
- enumerated fixed batch items where batch approval is allowed;
- relevant record/source revisions;
- policy/version;
- validity window;
- conditions;
- revocation state.

A changed material field invalidates the approval.

A batch approval cannot authorize future members of a query.

## 13. Persistence without a new Authority plugin

Authority control data is separated from canonical business facts:

- Core's AuthorityContext/Effect records carry Task/runtime grant/effect identity;
- organization configuration holds current policies/delegations/limits/approval resources;
- providers persist their domain financial/business facts;
- approval/evidence references are linked into Effect/domain records.

Therefore Authority/Finance reconciliation creates **no new plugin/repository identity**.
