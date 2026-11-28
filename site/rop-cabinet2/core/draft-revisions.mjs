// Staging-only immutable version chain. Persistence and authentication belong to protected backend.
// Never treats a draft as a submitted statutory report.
import {createHash} from 'node:crypto';
const id=s=>typeof s==='string'&&/^[A-Za-z0-9._:-]{1,160}$/.test(s);
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
function canonical(v){
 if(v===null||typeof v==='string'||typeof v==='boolean')return JSON.stringify(v);
 if(typeof v==='number'){if(!Number.isSafeInteger(v))throw Error('UNSAFE_NUMBER');return JSON.stringify(v);}
 if(Array.isArray(v)){
  if(Object.keys(v).length!==v.length||!Array.from({length:v.length},(_,i)=>Object.prototype.hasOwnProperty.call(v,i)).every(Boolean))throw Error('UNSAFE_ARRAY');
  return '['+v.map(canonical).join(',')+']';
 }
 if(v&&typeof v==='object'&&Object.getPrototypeOf(v)===Object.prototype){
  const keys=Object.keys(v).sort();
  if(keys.some(k=>k==='__proto__'||k==='constructor'||k==='prototype'))throw Error('UNSAFE_KEY');
  return '{'+keys.map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
 }
 throw Error('UNSUPPORTED_VALUE');
}
export function snapshotDigest(value){return createHash('sha256').update(canonical(value)).digest('hex');}
export function buildDraftRevision({organizationId,year,reportId,previous=null,body,sourceIds=[]}){
 if(!id(organizationId)||!id(reportId)||!Number.isInteger(year)||year<2024||year>2100)throw Error('INVALID_SCOPE');
 if(!Array.isArray(sourceIds)||sourceIds.some(s=>!id(s))||new Set(sourceIds).size!==sourceIds.length)throw Error('INVALID_SOURCES');
 if(!body||typeof body!=='object'||Array.isArray(body))throw Error('INVALID_BODY');
 if(previous!==null&&(!Number.isSafeInteger(previous.version)||previous.version<1||!id(previous.organizationId)||previous.organizationId!==organizationId||previous.year!==year||previous.reportId!==reportId||!/^[a-f0-9]{64}$/.test(previous.digest)||previous.status!=='DRAFT'))throw Error('INVALID_PREVIOUS');
 const version=previous?previous.version+1:1;
 const payload={organizationId,year,reportId,version,previousDigest:previous?.digest??null,sourceIds:[...sourceIds].sort(),body};
 const digest=snapshotDigest(payload);
 return Object.freeze({organizationId,year,reportId,version,previousDigest:payload.previousDigest,digest,status:'DRAFT',publicationAllowed:false,officialReportAllowed:false});
}
export function verifyDraftChain(revisions){
 if(!Array.isArray(revisions)||revisions.length===0)return false;
 return revisions.every((r,i)=>r&&r.status==='DRAFT'&&r.version===i+1&&/^[a-f0-9]{64}$/.test(r.digest)&&r.previousDigest===(i?revisions[i-1].digest:null)&&r.organizationId===revisions[0].organizationId&&r.year===revisions[0].year&&r.reportId===revisions[0].reportId);
}
