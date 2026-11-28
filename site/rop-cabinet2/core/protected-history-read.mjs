// Server-only contract: backend MUST supply a transactionally consistent history and independently anchored digest.
import {auditDraftHistory} from './draft-history-audit.mjs';
const id=s=>typeof s==='string'&&/^[A-Za-z0-9._:-]{1,160}$/.test(s);
export async function readProtectedDraftHistory({principal,request,authorize,readConsistentHistory}){
 if(!principal||!id(principal.subjectId)||principal.authenticated!==true)throw Error('UNAUTHENTICATED');
 const {organizationId,year,reportId}=request??{};
 if(!id(organizationId)||!id(reportId)||!Number.isInteger(year)||year<2024||year>2100)throw Error('INVALID_SCOPE');
 if(typeof authorize!=='function'||typeof readConsistentHistory!=='function')throw Error('MISSING_BACKEND');
 const scope=Object.freeze({subjectId:principal.subjectId,organizationId,year,reportId,permission:'rop:draft:read'});
 if(await authorize(scope)!==true)throw Error('FORBIDDEN');
 // Backend must recheck access INSIDE the same database transaction used for history + anchor read.
 const record=await readConsistentHistory(scope);
 if(!record||record.authorized!==true||record.subjectId!==principal.subjectId||record.organizationId!==organizationId||record.year!==year||record.reportId!==reportId||record.anchorSource!=='PROTECTED_INDEPENDENT_STORE')throw Error('UNTRUSTED_SNAPSHOT');
 const result=auditDraftHistory({organizationId,year,reportId,snapshots:record.snapshots,expectedHeadDigest:record.expectedHeadDigest});
 return Object.freeze({version:result.version,digest:result.digest,verified:true,publicationAllowed:false,officialReportAllowed:false});
}
