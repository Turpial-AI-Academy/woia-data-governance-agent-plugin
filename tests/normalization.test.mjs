import test from 'node:test';
import assert from 'node:assert/strict';
import { NORMAL_FORMS, normalizationDescriptorDigest, resolveNormalizationContract } from '../skills/woia-data-governance/scripts/normalization-contract.mjs';
import { reviewNormalization } from '../skills/woia-data-governance/scripts/governance.mjs';

const request = () => ({
  org_id: 'org:test', scope: 'schema:services', task_ref: 'task:test', purpose: 'schema-review',
  relation: 'ServiceAssignment', fact_grain: 'One assignment to a service', candidate_keys: [['service','assignee']],
  lossless_reconstruction_evidence: 'proof:lossless', enforceability_evidence: 'proof:constraints',
  proofs: {
    '1NF': {evidence_ref:'proof:1', atomic:true}, '2NF': {evidence_ref:'proof:2', partial_dependencies:false},
    '3NF': {evidence_ref:'proof:3', transitive_dependencies:false}, BCNF: {evidence_ref:'proof:b', every_determinant_is_superkey:true},
    '4NF': {evidence_ref:'proof:4', independent_multivalued_dependencies:false}, '5NF': {evidence_ref:'proof:5', join_dependencies_implied_by_keys:true}
  }
});
const host = (r, target = '3NF') => {
  const descriptor = {schema:'dev.woia.normalization-contract/v1',id:'normalization:services',revision:'revision:7',source_ref:'contract:services',org_id:r.org_id,scope:r.scope,relation:r.relation,target};
  const identity = {source_ref:descriptor.source_ref,revision:descriptor.revision,digest_sha256:normalizationDescriptorDigest(descriptor)};
  return {authenticated:true,current:true,org_id:r.org_id,scope:r.scope,task_ref:r.task_ref,purpose:r.purpose,normalization_binding:{status:'ACCEPTED_CURRENT',...identity,descriptor},domain_source:{current:true,...identity}};
};
test('3NF target needs only cumulative lower proofs; no universal 5NF', () => {
  const r=request(); delete r.proofs.BCNF; delete r.proofs['4NF']; delete r.proofs['5NF'];
  const result=reviewNormalization(r,{resolveTrustedContext:selection => host(selection)});
  assert.equal(result.target,'3NF'); assert.deepEqual(result.required_proofs,['1NF','2NF','3NF']); assert.equal(result.runtime_enforcement,false);
});
for (const target of NORMAL_FORMS) test(target+' preserves cumulative proof obligations', () => {
  const r=request(); const index=NORMAL_FORMS.indexOf(target);
  for(const level of NORMAL_FORMS.slice(index+1))delete r.proofs[level];
  const result=reviewNormalization(r,{resolveTrustedContext:selection => host(selection,target)});
  assert.equal(result.target,target); assert.equal(result.required_proofs.length,index+1);
  delete r.proofs[target]; assert.throws(()=>reviewNormalization(r,{resolveTrustedContext:selection=>host(selection,target)}),/DEPENDENCY_PROOFS_REQUIRED/);
});
test('a known invalid 5NF proof still fails',()=>{
  const r=request();r.proofs['5NF'].join_dependencies_implied_by_keys=false;
  assert.throws(()=>reviewNormalization(r,{resolveTrustedContext:s=>host(s,'5NF')}),/UNPROVEN_JOIN_DEPENDENCY/);
});
test('request cannot select policy and trusted booleans do not authenticate',()=>{
  const r=request();
  assert.throws(()=>reviewNormalization(r),/TRUSTED_HOST_RESOLVER_REQUIRED/);
  for(const field of ['target','policy','descriptor','binding','normalization_binding','trusted_host','trusted_context']){
    assert.throws(()=>reviewNormalization({...r,[field]:field==='target'?'1NF':{}},{resolveTrustedContext:s=>host(s,'5NF')}),/REQUEST_POLICY_NOT_ALLOWED/);
  }
});
for(const [name,change,code] of [
  ['host stale',h=>h.current=false,'CURRENT_AUTHENTICATED_HOST_REQUIRED'],
  ['host unauthenticated',h=>h.authenticated=false,'CURRENT_AUTHENTICATED_HOST_REQUIRED'],
  ['wrong organization',h=>h.org_id='other','HOST_SCOPE_MISMATCH'],
  ['wrong Task',h=>h.task_ref='other','HOST_SCOPE_MISMATCH'],
  ['wrong purpose',h=>h.purpose='other','HOST_SCOPE_MISMATCH'],
  ['binding obsolete',h=>h.normalization_binding.status='OBSOLETE','ACCEPTED_CURRENT_NORMALIZATION_BINDING_REQUIRED'],
  ['domain stale',h=>h.domain_source.current=false,'CURRENT_DOMAIN_SOURCE_EVIDENCE_REQUIRED'],
  ['domain revision mismatch',h=>h.domain_source.revision='revision:6','CURRENT_DOMAIN_SOURCE_EVIDENCE_REQUIRED'],
  ['domain digest mismatch',h=>h.domain_source.digest_sha256='a'.repeat(64),'CURRENT_DOMAIN_SOURCE_EVIDENCE_REQUIRED'],
  ['descriptor source mismatch',h=>h.normalization_binding.descriptor.source_ref='other','NORMALIZATION_SOURCE_REVISION_OR_DIGEST_MISMATCH'],
  ['descriptor target tampered',h=>h.normalization_binding.descriptor.target='1NF','NORMALIZATION_SOURCE_REVISION_OR_DIGEST_MISMATCH'],
  ['descriptor relation mismatch',h=>{h.normalization_binding.descriptor.relation='Other';h.normalization_binding.digest_sha256=normalizationDescriptorDigest(h.normalization_binding.descriptor);h.domain_source.digest_sha256=h.normalization_binding.digest_sha256},'NORMALIZATION_DESCRIPTOR_SCOPE_MISMATCH']
])test(name+' fails closed',()=>{
  assert.throws(()=>reviewNormalization(request(),{resolveTrustedContext:s=>{const h=host(s);change(h);return h}}),new RegExp(code));
});
test('returned descriptor is isolated, immutable and stable under source key order',()=>{
  const r=request(),h=host(r), contract=resolveNormalizationContract(r,()=>h);
  assert.ok(Object.isFrozen(contract));h.normalization_binding.descriptor.target='5NF';assert.equal(contract.target,'3NF');
  assert.equal(normalizationDescriptorDigest(contract),normalizationDescriptorDigest(Object.fromEntries(Object.entries(contract).reverse())));
  assert.throws(()=>normalizationDescriptorDigest({...contract,grant:true}),/INVALID_NORMALIZATION_DESCRIPTOR/);
});
test('lossless reconstruction and enforceability remain separate',()=>{
  const r=request();delete r.enforceability_evidence;
  assert.throws(()=>reviewNormalization(r,{resolveTrustedContext:s=>host(s)}),/SEPARATE_RECONSTRUCTION_ENFORCEABILITY_EVIDENCE_REQUIRED/);
});
test('proof references and candidate keys remain typed and nonempty',()=>{
  const r=request();r.proofs['3NF'].evidence_ref=42;
  assert.throws(()=>reviewNormalization(r,{resolveTrustedContext:s=>host(s)}),/DEPENDENCY_PROOFS_REQUIRED/);
  const duplicate=request();duplicate.candidate_keys=[['service','service']];
  assert.throws(()=>reviewNormalization(duplicate,{resolveTrustedContext:s=>host(s)}),/CANDIDATE_KEYS_REQUIRED/);
});
