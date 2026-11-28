// Protected backend contract: verify persisted canonical payload before returning a draft.
import {buildDraftRevision} from './draft-revisions.mjs';
const valid=s=>typeof s==='string'&&/^[A-Za-z0-9._:-]{1,160}$/.test(s);
export async function readVerifiedDraft({principal,organizationId,year,reportId,authorize,store}){
 if(!principal||!valid(principal.subjectId)||!valid(organizationId)||!valid(reportId)||!Number.isInteger(year)||year<2024||year>2100)throw Error('INVALID_SCOPE');
 if(typeof authorize!=='function'||!store||typeof store.readSnapshot!=='function')throw Error('MISSING_PROTECTED_ADAPTER');
 const scope=Object.freeze({subjectId:principal.subjectId,organizationId,year,reportId,permission:'rop:draft:read'});
 if(await authorize(scope)!==true)throw Error('FORBIDDEN');
 const snapshot=await store.readSnapshot(scope);
 if(snapshot===null)return null;
 if(!snapshot||typeof snapshot!=='object'||!snapshot.revision||!snapshot.payload)throw Error('INVALID_SNAPSHOT');
 const {revision:r,payload:p}=snapshot;
 if(r.organizationId!==organizationId||r.year!==year||r.reportId!==reportId||r.status!=='DRAFT'||r.publicationAllowed!==false||r.officialReportAllowed!==false)throw Error('FOREIGN_OR_UNSAFE_REVISION');
 if(p.organizationId!==organizationId||p.year!==year||p.reportId!==reportId||p.version!==r.version||p.previousDigest!==r.previousDigest)throw Error('PAYLOAD_SCOPE_MISMATCH');
 const previous=r.version===1?null:{organizationId,year,reportId,version:r.version-1,digest:r.previousDigest,status:'DRAFT'};
 const computed=buildDraftRevision({organizationId,year,reportId,previous,body:p.body,sourceIds:p.sourceIds});
 if(computed.digest!==r.digest||computed.version!==r.version||computed.previousDigest!==r.previousDigest)throw Error('SNAPSHOT_INTEGRITY_FAILURE');
 return Object.freeze({revision:Object.freeze({...computed,publicationAllowed:false,officialReportAllowed:false}),body:p.body,sourceIds:[...p.sourceIds]});
}
