const assert=(c,m)=>{if(!c)throw new Error(m)};
export function reviewNormalization(r){
 assert(r.fact_grain&&Array.isArray(r.candidate_keys)&&r.candidate_keys.length&&r.candidate_keys.every(k=>Array.isArray(k)&&k.length),'CANDIDATE_KEYS_REQUIRED');
 assert(['1NF','2NF','3NF','BCNF','4NF','5NF'].every(n=>r.proofs?.[n]?.evidence_ref),'DEPENDENCY_PROOFS_REQUIRED');
 assert(r.proofs['1NF'].atomic===true,'NON_ATOMIC');
 assert(r.proofs['2NF'].partial_dependencies===false,'PARTIAL_DEPENDENCY');
 assert(r.proofs['3NF'].transitive_dependencies===false,'TRANSITIVE_DEPENDENCY');
 assert(r.proofs.BCNF.every_determinant_is_superkey===true,'NON_KEY_DETERMINANT');
 assert(r.proofs['4NF'].independent_multivalued_dependencies===false,'MULTIVALUED_DEPENDENCY');
 assert(r.proofs['5NF'].join_dependencies_implied_by_keys===true,'UNPROVEN_JOIN_DEPENDENCY');
 return {relation:r.name,result:'REVIEWED_PROOFS',runtime_enforcement:false};
}
export function resolveSource(entries,{org_id,scope,at}){
 const t=Date.parse(at);assert(Number.isFinite(t),'INVALID_TIME');
 const matches=entries.filter(e=>e.org_id===org_id&&e.scope===scope&&!e.revoked&&Date.parse(e.effective_from)<=t&&t<Date.parse(e.effective_until));
 assert(matches.length===1,'SOURCE_MAP_MISSING_OR_AMBIGUOUS');const e=matches[0];
 assert(e.writer&&e.source_ref&&e.version&&e.conflict===false&&Date.parse(e.fresh_until)>=t,'STALE_OR_CONFLICTING_SOURCE');
 return structuredClone(e);
}
export function qualityEvaluation(observations,rules){assert(rules.version&&Array.isArray(rules.required_fields),'ACCEPTED_RULE_REQUIRED');return {rule_version:rules.version,issues:observations.flatMap((o,i)=>rules.required_fields.filter(f=>o[f]===undefined||o[f]===null).map(field=>({row:i,field}))),accepted_business_facts:false}}
export function migrationPlan({org_id,scope,from_writer,to_writer,source_map_version,cutover_id,reconciliation_ref}){assert(org_id&&scope&&from_writer&&to_writer&&from_writer!==to_writer&&source_map_version&&cutover_id&&reconciliation_ref,'CUTOVER_CONTRACT_REQUIRED');return {org_id,scope,from_writer,to_writer,source_map_version,cutover_id,reconciliation_ref,status:'PLANNED',writer_active:from_writer}}
export function reconcileCutover(plan,evidence){assert(evidence.reconciled===true&&evidence.cutover_id===plan.cutover_id&&evidence.old_writer_disabled===true&&evidence.new_writer_enabled===true&&evidence.source_map_version===plan.source_map_version,'SINGLE_WRITER_RECONCILIATION_REQUIRED');return {...plan,status:'RECONCILED',writer_active:plan.to_writer}}
