import test from 'node:test';
import assert from 'node:assert/strict';
import {buildDraftRevision} from './draft-revisions.mjs';
import {readProtectedDraftHistory} from './protected-history-read.mjs';
const org='org1',year=2026,reportId='r1',principal={subjectId:'user1',authenticated:true};
function fixture(){const body={mass:'1'};const r=buildDraftRevision({organizationId:org,year,reportId,body,sourceIds:['doc1']});return {authorized:true,subjectId:'user1',organizationId:org,year,reportId,anchorSource:'PROTECTED_INDEPENDENT_STORE',expectedHeadDigest:r.digest,snapshots:[{revision:r,payload:{organizationId:org,year,reportId,version:1,previousDigest:null,body,sourceIds:['doc1']}}]};}
const run=(o={})=>readProtectedDraftHistory({principal,request:{organizationId:org,year,reportId},authorize:async()=>true,readConsistentHistory:async()=>fixture(),...o});
test('valid anchored read remains draft-only',async()=>{const r=await run();assert.equal(r.version,1);assert.equal(r.publicationAllowed,false)});
test('unauthenticated principal rejected before backend',async()=>{let calls=0;await assert.rejects(run({principal:{subjectId:'user1',authenticated:false},authorize:async()=>{calls++;return true}}));assert.equal(calls,0)});
test('forged browser subject ignored',async()=>assert.equal((await run({request:{organizationId:org,year,reportId,subjectId:'attacker'}})).verified,true));
test('foreign organization rejected',async()=>await assert.rejects(run({request:{organizationId:'foreign',year,reportId}})));
test('authorization denied before read',async()=>{let calls=0;await assert.rejects(run({authorize:async()=>false,readConsistentHistory:async()=>{calls++;return fixture()}}));assert.equal(calls,0)});
test('missing backend rejected',async()=>await assert.rejects(run({readConsistentHistory:null})));
test('snapshot principal mismatch rejected',async()=>await assert.rejects(run({readConsistentHistory:async()=>({...fixture(),subjectId:'other'})})));
test('snapshot transaction authorization absent rejected',async()=>await assert.rejects(run({readConsistentHistory:async()=>({...fixture(),authorized:false})})));
test('untrusted anchor source rejected',async()=>await assert.rejects(run({readConsistentHistory:async()=>({...fixture(),anchorSource:'BROWSER'})})));
test('tampered history rejected',async()=>{const f=fixture();f.snapshots[0].payload.body={mass:'9'};await assert.rejects(run({readConsistentHistory:async()=>f}))});
test('wrong anchor rejected',async()=>await assert.rejects(run({readConsistentHistory:async()=>({...fixture(),expectedHeadDigest:'f'.repeat(64)})})));
test('backend error fails closed',async()=>await assert.rejects(run({readConsistentHistory:async()=>{throw Error('DB_DOWN')}})));
