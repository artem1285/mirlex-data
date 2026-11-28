// Server-only audit of a complete persisted draft history; not a signature or trusted anchor.
import {buildDraftRevision} from './draft-revisions.mjs';
const valid=s=>typeof s==='string'&&/^[A-Za-z0-9._:-]{1,160}$/.test(s);
export function auditDraftHistory({organizationId,year,reportId,snapshots,expectedHeadDigest}){
 if(!valid(organizationId)||!valid(reportId)||!Number.isInteger(year)||year<2024||year>2100)throw Error('INVALID_SCOPE');
 if(!Array.isArray(snapshots)||!snapshots.length)throw Error('EMPTY_HISTORY');
 if(!/^[a-f0-9]{64}$/.test(expectedHeadDigest))throw Error('MISSING_TRUSTED_ANCHOR');
 let previous=null;
 for(const entry of snapshots){
  if(!entry||!entry.revision||!entry.payload)throw Error('INVALID_SNAPSHOT');
  const r=entry.revision,p=entry.payload;
  if(r.status!=='DRAFT'||r.publicationAllowed!==false||r.officialReportAllowed!==false)throw Error('UNSAFE_STATUS');
  if(r.organizationId!==organizationId||r.year!==year||r.reportId!==reportId||
     p.organizationId!==organizationId||p.year!==year||p.reportId!==reportId)throw Error('FOREIGN_SCOPE');
  if(p.version!==(previous?.version??0)+1||p.previousDigest!==(previous?.digest??null)||
     r.version!==p.version||r.previousDigest!==p.previousDigest)throw Error('BROKEN_CHAIN');
  const computed=buildDraftRevision({organizationId,year,reportId,previous,body:p.body,sourceIds:p.sourceIds});
  if(computed.digest!==r.digest)throw Error('DIGEST_MISMATCH');
  previous=computed;
 }
 if(previous.digest!==expectedHeadDigest)throw Error('ANCHOR_MISMATCH');
 return Object.freeze({verified:true,version:previous.version,digest:previous.digest,publicationAllowed:false,officialReportAllowed:false});
}
