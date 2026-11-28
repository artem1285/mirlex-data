import test from 'node:test';
import assert from 'node:assert/strict';
import {readDraftHistoryInTransaction} from './draft-history-transaction.mjs';
const args=()=>({session:{subjectId:'user1',authenticated:true},organizationId:'org1',year:2026,reportId:'report1'});
test('rejects unauthenticated before database',async()=>{let called=false;await assert.rejects(readDraftHistoryInTransaction({...args(),session:{subjectId:'user1'},database:{transaction:()=>{called=true}}}),/UNAUTHENTICATED/);assert.equal(called,false)});
test('requires transactional backend',async()=>{await assert.rejects(readDraftHistoryInTransaction(args()),/MISSING_TRANSACTION/)});
test('rejects incomplete transaction',async()=>{await assert.rejects(readDraftHistoryInTransaction({...args(),database:{transaction:fn=>fn({authorize:async()=>true})}}),/INVALID_TRANSACTION/)});
test('rejects initial permission denial without reading',async()=>{let read=false;const database={transaction:fn=>fn({authorize:async()=>false,readHistoryAndAnchor:async()=>{read=true}})};await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/FORBIDDEN/);assert.equal(read,false)});
test('revocation between first and second check blocks read',async()=>{let checks=0,read=false;const database={transaction:fn=>fn({authorize:async()=>++checks===1,readHistoryAndAnchor:async()=>{read=true}})};await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/FORBIDDEN/);assert.equal(read,false);assert.equal(checks,2)});
test('forged browser principal cannot change transaction scope',async()=>{let scope;const database={transaction:fn=>fn({authorize:async s=>{scope=s;return true},readHistoryAndAnchor:async()=>null})};await assert.rejects(readDraftHistoryInTransaction({...args(),principal:{subjectId:'attacker'},database}),/UNTRUSTED_SNAPSHOT/);assert.equal(scope.subjectId,'user1')});
test('untrusted anchor rejected',async()=>{const database={transaction:fn=>fn({authorize:async()=>true,readHistoryAndAnchor:async()=>({authorized:true,subjectId:'user1',organizationId:'org1',year:2026,reportId:'report1',anchorSource:'BROWSER'})})};await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/UNTRUSTED_SNAPSHOT/)});
test('transaction failure propagates',async()=>{const database={transaction:async()=>{throw Error('DB_UNAVAILABLE')}};await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/DB_UNAVAILABLE/)});

import {buildDraftRevision} from './draft-revisions.mjs';
function validHistory(){
 const body={items:[{code:'test',massGrams:1000}]};
 const revision=buildDraftRevision({organizationId:'org1',year:2026,reportId:'report1',body,sourceIds:['source1']});
 const payload={organizationId:'org1',year:2026,reportId:'report1',version:1,previousDigest:null,sourceIds:['source1'],body};
 return {authorized:true,subjectId:'user1',organizationId:'org1',year:2026,reportId:'report1',anchorSource:'PROTECTED_INDEPENDENT_STORE',expectedHeadDigest:revision.digest,snapshots:[{revision,payload}]};
}
test('valid independently anchored history is audited end-to-end inside transaction',async()=>{
 let checks=0,reads=0;
 const database={transaction:fn=>fn({authorize:async()=>{checks++;return true},readHistoryAndAnchor:async()=>{reads++;return validHistory()}})};
 const result=await readDraftHistoryInTransaction({...args(),database});
 assert.equal(result.verified,true);assert.equal(result.version,1);assert.equal(result.publicationAllowed,false);
 assert.equal(result.officialReportAllowed,false);assert.equal(checks,2);assert.equal(reads,1);
});
test('tampered payload rejected despite matching stored revision',async()=>{
 const snapshot=validHistory();snapshot.snapshots[0].payload.body.items[0].massGrams=9000;
 const database={transaction:fn=>fn({authorize:async()=>true,readHistoryAndAnchor:async()=>snapshot})};
 await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/DIGEST_MISMATCH/);
});
test('changed trusted anchor rejects otherwise valid chain',async()=>{
 const snapshot=validHistory();snapshot.expectedHeadDigest='0'.repeat(64);
 const database={transaction:fn=>fn({authorize:async()=>true,readHistoryAndAnchor:async()=>snapshot})};
 await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/ANCHOR_MISMATCH/);
});

function twoVersionHistory(){
 const first=validHistory();
 const prior=first.snapshots[0].revision;
 const body={items:[{code:'test',massGrams:2500}]};
 const revision=buildDraftRevision({organizationId:'org1',year:2026,reportId:'report1',previous:prior,body,sourceIds:['source1','source2']});
 first.snapshots.push({revision,payload:{organizationId:'org1',year:2026,reportId:'report1',version:2,previousDigest:prior.digest,sourceIds:['source1','source2'],body}});
 first.expectedHeadDigest=revision.digest;
 return first;
}
test('two linked revisions verify under protected transaction',async()=>{
 const snapshot=twoVersionHistory();
 const database={transaction:fn=>fn({authorize:async()=>true,readHistoryAndAnchor:async()=>snapshot})};
 const result=await readDraftHistoryInTransaction({...args(),database});
 assert.equal(result.verified,true);assert.equal(result.version,2);assert.equal(result.digest,snapshot.expectedHeadDigest);
});
test('missing intermediate revision is rejected even with final trusted anchor',async()=>{
 const snapshot=twoVersionHistory();snapshot.snapshots.shift();
 const database={transaction:fn=>fn({authorize:async()=>true,readHistoryAndAnchor:async()=>snapshot})};
 await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/BROKEN_CHAIN/);
});
test('foreign organization in second revision is rejected',async()=>{
 const snapshot=twoVersionHistory();snapshot.snapshots[1].payload.organizationId='foreign';
 const database={transaction:fn=>fn({authorize:async()=>true,readHistoryAndAnchor:async()=>snapshot})};
 await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/FOREIGN_SCOPE/);
});


test('rejects anchor returned from browser even with a valid digest',async()=>{
 const snapshot=validHistory();snapshot.anchorSource='BROWSER';
 const database={transaction:fn=>fn({authorize:async()=>true,readHistoryAndAnchor:async()=>snapshot})};
 await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/UNTRUSTED_SNAPSHOT/);
});
test('rejects missing independent anchor rather than trusting revision digest',async()=>{
 const snapshot=validHistory();delete snapshot.expectedHeadDigest;
 const database={transaction:fn=>fn({authorize:async()=>true,readHistoryAndAnchor:async()=>snapshot})};
 await assert.rejects(readDraftHistoryInTransaction({...args(),database}));
});
test('rejects deleted last revision even when anchor still points to it',async()=>{
 const snapshot=twoVersionHistory();snapshot.snapshots.pop();
 const database={transaction:fn=>fn({authorize:async()=>true,readHistoryAndAnchor:async()=>snapshot})};
 await assert.rejects(readDraftHistoryInTransaction({...args(),database}),/ANCHOR_MISMATCH/);
});
