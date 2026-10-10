# woia-data-governance

Version 0.5.9. Generic source, normalization, quality and migration review without becoming a business fact writer.

Portable entry: [Agent Skill](skills/woia-data-governance/SKILL.md).

Run `mise run bootstrap`, `mise run doctor`, `pnpm test`, `pnpm run ci:fast`. Central certification: Ecosystem v0.5.7 `mise run plugin:certify-thin --repo <absolute-path>`.

Local helpers operate only on provided data. No backend, DBMS, external adapter, authority policy, fees, account or legal applicability is selected. Adapter qualification and Operator E2E remain NOT_RUN; no Production Ready claim.

Normalization uses the [accepted target contract](skills/woia-data-governance/references/normalization-contract.md). The host resolves exact current source identity, revision and digest for the organization, relation, Task and purpose; request JSON supplies evidence, never policy. `ci:fast` runs focused regression tests for all supported targets and rejected source/context mismatches.

## Maintenance

Edit only this canonical repository. Keep `plugin.json`, `package.json` and `dev.woia/manifest.json` versions aligned. From the canonical WOIA Ecosystem repository, run `mise run plugin:certify-thin --repo <absolute-plugin-repository>`, then use its release preparation/publication tasks. Install and update consumers from immutable published artifacts; keep Project personalization in overlays.
