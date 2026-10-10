---
name: woia-data-governance
description: Use for Generic source, normalization, quality and migration review without becoming a business fact writer.
license: MIT
---

# woia-data-governance

## Scope and dispatch

Generic source, normalization, quality and migration review without becoming a business fact writer. This is a shared provider, not an orchestrator. Resolve the caller's organization, current actor/task scope and accepted source contract before reading or mutating. Technical access is not authority. Missing binding, permission or source is an owned blocker.

Load [the action contract](references/action-contract.json) for every operation; load [the accepted provider contract](references/provider-contract.md) when assigning ownership or deciding whether an operation is allowed. Only the listed actions belong here. Current source policy, revocation, hold and exact-resource conditions must be enforced by the storage/adapter at actual dispatch; these local helpers do not prove runtime enforcement.

For business data or consequential effects load [the domain/source contract](references/domain-source-contract.md) and [the final authority contract](references/authority-contract.md). Preserve Evidence, Inference and accepted Fact separately. Do not infer organization rules, legal validity or money/permissions from documents or training. Do not send external notifications: Customer Service through Communications owns external-person contact, including embedded file/signature notifications.

## Local execution

Run deterministic helpers under `scripts/` only on explicitly supplied synthetic or authorized inputs. They return reviewed data or validation results; no backend, credentials or live effect is selected. Adapter/backend qualification is NOT_RUN and no external adapter is advertised. Never interpret local PASS as operator E2E or Production Ready.

## Reconcile and report

Retain stable operation/source IDs, exact version and evidence. Unknown remote effects require reconciliation before retry; cancellation/restore does not undo external effects. Report accepted source, tested scope, blockers and NOT_RUN adapter/operator gates. Domain owners accept business facts; this provider never silently promotes model output.

## Normalization review

For schema, normalization, security or migration review load [the generic method](references/normalization-method.md), [the accepted target contract](references/normalization-contract.md) and [the review template](references/review-template.json). The trusted host resolves the immutable current target for the exact organization, relation, Task and purpose; requests cannot choose policy. Enumerate actual attributes, every candidate key, FDs/MVDs/JDs, lossless decomposition and dependency preservation proofs. Do not accept a UUID, ORM, sample rows or empty dependency arrays as proof. Local helper validates cumulative proof completeness through the accepted target; competent review and physical enforcement remain separate.
