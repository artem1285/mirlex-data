import test from 'node:test';
import assert from 'node:assert/strict';
import {buildDraftRevision} from './draft-revisions.mjs';
import {auditDraftHistory} from './draft-history-audit.mjs';
const org='org1',year=2026,reportId='r1';
function fixture(){
 const a=buildDraftRevision({organizationId:org,year,reportId,body:{mass:'1.0'},sourceIds:['s1']});
 const b=buildDraftRevision({organizationId:org,year,reportId,previous:a,body:{mass:'2.0'},sourceIds:['s1','s2']});
 const snap=r=>({revision:r,payload:{organizationId:org,year,reportId,version:r.version,previousDigest:r.previousDigest,body:{mass:r===a?'1.0':'2.0'},sourceIds:r===a?['s1']:['s1','s2']}});
 return {snapshots:[snap(a),snap(b)],expectedHeadDigest:b.digest};
}
const run=o=>auditDraftHistory({organizationId:org,year,reportId,...o});
test('complete chain and trusted anchor',()=>{const r=run(fixture());assert.equal(r.verified,true);assert.equal(r.version,2);assert.equal(r.publicationAllowed,false)});
test('missing anchor rejected',()=>assert.throws(()=>run({...fixture(),expectedHeadDigest:null})));
test('modified body rejected',()=>{const f=fixture();f.snapshots[0].payload.body.mass='3';assert.throws(()=>run(f))});
test('missing middle revision rejected',()=>{const f=fixture();f.snapshots.shift();assert.throws(()=>run(f))});
test('reordered history rejected',()=>{const f=fixture();f.snapshots.reverse();assert.throws(()=>run(f))});
test('foreign organization rejected',()=>{const f=fixture();f.snapshots[0].payload.organizationId='other';assert.throws(()=>run(f))});
test('forged status rejected',()=>{const f=fixture();f.snapshots[0].revision={...f.snapshots[0].revision,status:'SUBMITTED'};assert.throws(()=>run(f))});
test('unsafe publication flag rejected',()=>{const f=fixture();f.snapshots[1].revision={...f.snapshots[1].revision,publicationAllowed:true};assert.throws(()=>run(f))});
test('head anchor mismatch rejected',()=>assert.throws(()=>run({...fixture(),expectedHeadDigest:'a'.repeat(64)})));
test('duplicate revision rejected',()=>{const f=fixture();f.snapshots.push(f.snapshots[1]);assert.throws(()=>run(f))});
test('source tampering rejected',()=>{const f=fixture();f.snapshots[1].payload.sourceIds=['s1'];assert.throws(()=>run(f))});
test('empty history rejected',()=>assert.throws(()=>run({...fixture(),snapshots:[]})));
