# Accepted focused source contract

Source: Turpial-AI-Academy/woia-real-estate @ eb0a7278188b2f9968e21ed4299f08184d864cac / docs/22-canonical-domain-data-contract.md

### Map completeness rule

A consequential command that needs a fact/source and has no effective Source Authority Map entry for that scope must return a precise owned blocker. It may not:
- use the freshest arbitrary source;
- trust a model confidence score;
- copy from another organization;
- promote Evidence to Fact by default;
- invent an organization policy.

## 11. Migration and cutover contract

Each bounded source migration uses a stable `migration_id` and `cutover_id`.

1. **Inventory:** source datasets, object types, IDs, writer, scope, cutoff candidates and consumers.
2. **Stage:** ingest immutable source observations with source IDs/times; no authority change.
3. **Map:** deterministic field/entity mapping version; rejected/unknown values remain explicit.
4. **Identity resolution:** exact external refs first; ambiguous candidates quarantine, never auto-merge consequential identities.
5. **Validate:** domains/keys/FKs/5NF relation rules and access classification.
6. **Reconcile:** counts by scope, relationships, missing/duplicate refs and financial positions by currency/period/beneficiary/custody/purpose.
7. **Shadow:** compare without changing writer.
8. **Freeze old writer for bounded scope** at accepted cutover window.
9. **Late delta:** ingest/reconcile entries since last staged watermark.
10. **Switch Source Authority Map** to one writer at an effective instant/version.
11. **Verify:** post-cutover reads/writes, reconciliation, access and in-flight/unknown Effect references.
12. **Retain fallback:** rollback/reversal procedure and evidence; already-real external effects require reconciliation/compensation, not database rewind.

No unlimited bidirectional last-write-wins synchronization is supported.

## 12. Security and isolation contract

- Authenticate principal and organization before retrieval.
- Resolve field/resource/purpose access before model processing.
- Mutation commands enforce current authority and expected revision.
- Cross-organization FK/reference creation is denied unless a separately authorized cross-org contract explicitly exists; none is part of v0.5.0.
- Administrative/migration/backup roles are separate from ordinary runtime roles.
- Secrets are references, never canonical business data or prompt content.
- Historical/current authorization are separate: a historical document may remain readable only under current permitted access.
- Restore re-evaluates current revocations/holds before dispatch resumes.

Physical RLS/schema-per-tenant/database-per-tenant choice remains Technology/Software implementation after B4/B5; it must satisfy this logical contract.
