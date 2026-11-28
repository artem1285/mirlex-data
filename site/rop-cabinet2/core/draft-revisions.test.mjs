import test from 'node:test';
import assert from 'node:assert/strict';
import {snapshotDigest,buildDraftRevision,verifyDraftChain} from './draft-revisions.mjs';
const base={organizationId:'org1',year:2026,reportId:'r1',body:{rows:[{id:'a',mass:'1.000'}]},sourceIds:['doc2','doc1']};
test('stable canonical hash across key order',()=>assert.equal(snapshotDigest({b:2,a:1}),snapshotDigest({a:1,b:2})));
test('source ordering does not affect digest',()=>assert.equal(buildDraftRevision(base).digest,buildDraftRevision({...base,sourceIds:['doc1','doc2']}).digest));
test('mass change changes digest',()=>assert.notEqual(buildDraftRevision(base).digest,buildDraftRevision({...base,body:{rows:[{id:'a',mass:'2.000'}]}}).digest));
test('reject unsafe numbers',()=>assert.throws(()=>snapshotDigest({n:1.5}),/UNSAFE_NUMBER/));
test('reject undefined',()=>assert.throws(()=>snapshotDigest({a:undefined}),/UNSUPPORTED_VALUE/));
test('reject duplicate sources',()=>assert.throws(()=>buildDraftRevision({...base,sourceIds:['x','x']}),/INVALID_SOURCES/));
test('reject invalid scope',()=>assert.throws(()=>buildDraftRevision({...base,organizationId:'../secret'}),/INVALID_SCOPE/));
test('reject foreign predecessor',()=>assert.throws(()=>buildDraftRevision({...base,previous:{...buildDraftRevision(base),organizationId:'other'}}),/INVALID_PREVIOUS/));
test('reject predecessor marked submitted',()=>assert.throws(()=>buildDraftRevision({...base,previous:{...buildDraftRevision(base),status:'SUBMITTED'}}),/INVALID_PREVIOUS/));
test('revision chain',()=>{const a=buildDraftRevision(base),b=buildDraftRevision({...base,previous:a});assert.equal(b.version,2);assert.equal(b.previousDigest,a.digest);assert.equal(verifyDraftChain([a,b]),true);assert.equal(verifyDraftChain([b,a]),false);});
test('never publish',()=>{const a=buildDraftRevision(base);assert.equal(a.publicationAllowed,false);assert.equal(a.officialReportAllowed,false);});

test('reject negative zero to prevent canonical collision with zero',()=>{assert.throws(()=>snapshotDigest({massGrams:-0}),/UNSAFE_NUMBER/);assert.notEqual(Object.is(-0,0),true);});

test('reject symbol-keyed object to avoid untracked mutation',()=>{const v={mass:'1.000'};v[Symbol('hidden')]='changed';assert.throws(()=>snapshotDigest(v),/UNSAFE_PROPERTY/);});
test('reject accessor without invoking it',()=>{let invoked=0;const v={};Object.defineProperty(v,'mass',{enumerable:true,get(){invoked++;return '1.000';}});assert.throws(()=>snapshotDigest(v),/UNSAFE_PROPERTY/);assert.equal(invoked,0);});
test('reject array symbol metadata and index accessor',()=>{const a=['x'];a[Symbol('extra')]=1;assert.throws(()=>snapshotDigest(a),/UNSAFE_PROPERTY/);const b=['x'];Object.defineProperty(b,'0',{enumerable:true,get(){throw Error('GETTER_CALLED');}});assert.throws(()=>snapshotDigest(b),/UNSAFE_PROPERTY/);});

test('reject non-enumerable hidden object and array metadata',()=>{const o={mass:'1.000'};Object.defineProperty(o,'hidden',{value:'changed',enumerable:false});assert.throws(()=>snapshotDigest(o),/UNSAFE_PROPERTY/);const a=['x'];Object.defineProperty(a,'hidden',{value:1,enumerable:false});assert.throws(()=>snapshotDigest(a),/UNSAFE_PROPERTY/);assert.match(snapshotDigest(['x']),/^[a-f0-9]{64}$/);});
