# Accepted focused source contract

Source: Turpial-AI-Academy/woia-real-estate @ eb0a7278188b2f9968e21ed4299f08184d864cac / docs/24-authority-finance-final-contract.md

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

B4 organization resource resolution supplies versioned organization policy references without copying private truth into Projects.

### 2.2 Organization policy plane

Private organization configuration supplies versioned:
- Mandate/represented-principal powers;
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
| represented principal | current Mandate/power/delegation when applicable |
| organization policy | exact policy version/digest and effective interval |
| target | exact Property/Lease/Charge/Payment/Document/etc. scope |
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

### Always human-led in the initial product

- commercial Negotiation;
- Offer creation/transmission/acceptance as a commercial commitment;
- exception/waiver/concession that changes accepted economic obligation unless already explicitly approved as a fixed exact action;
- legal/professional applicability and external professional acts;
- grant/delegation creation or enlargement;
- exceptional beneficiary/account substitution.

AI may prepare, compare, summarize and persist attributable human decisions.

### Approval is not transport

Core receiver acceptance and result return remain autonomous work mechanics. They do not approve the underlying business consequence.

## 6. Customer Service boundary

Only Customer Service executes agent-generated external-person communication.

A Finance/Sales/Legal/Property Management approval never implicitly grants another department permission to send the resulting message.

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

Authority control data is separated from B3 canonical business facts:

- Core's AuthorityContext/Effect records carry Task/runtime grant/effect identity;
- organization configuration holds current policies/delegations/limits/approval resources;
- providers persist their domain financial/business facts;
- approval/evidence references are linked into Effect/domain records.

Therefore Authority/Finance reconciliation creates **no new plugin/repository identity** before B5.
