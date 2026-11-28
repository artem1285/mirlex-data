// Protected-server staging contract; adapter MUST implement atomic compare-and-swap in a transaction.
import {buildDraftRevision} from './draft-revisions.mjs';
const valid=s=>typeof s==='string'&&/^[A-Za-z0-9._:-]{1,160}$/.test(s);
export async function persistDraftRevision({principal,organizationId,year,reportId,body,sourceIds=[],authorize,store}){
 if(!principal||!valid(principal.subjectId)||!valid(organizationId)||!valid(reportId)||!Number.isInteger(year)||year<2024||year>2100)throw Error('INVALID_SCOPE');
 if(typeof authorize!=='function'||!store||typeof store.readHead!=='function'||typeof store.compareAndAppend!=='function')throw Error('MISSING_PROTECTED_ADAPTER');
 const scope=Object.freeze({subjectId:principal.subjectId,organizationId,year,reportId,permission:'rop:draft:write'});
 if(await authorize(scope)!==true)throw Error('FORBIDDEN');
 // readHead must return a backend-verified committed head, not a browser-supplied revision.
 const previous=await store.readHead(scope);
 if(previous!==null&&(!previous||previous.organizationId!==organizationId||previous.year!==year||previous.reportId!==reportId||previous.status!=='DRAFT'))throw Error('INVALID_STORED_HEAD');
 const revision=buildDraftRevision({organizationId,year,reportId,previous,body,sourceIds});
 // Atomic implementation must recheck authorization, previous digest/version and source ownership,
 // persist canonical full payload, and enforce uniqueness under a database transaction.
 const committed=await store.compareAndAppend({scope,expectedVersion:previous?.version??0,expectedDigest:previous?.digest??null,revision,body,sourceIds});
 if(!committed||committed.accepted!==true||committed.version!==revision.version||committed.digest!==revision.digest)throw Error('REVISION_CONFLICT');
 return Object.freeze({...revision,persisted:true,publicationAllowed:false,officialReportAllowed:false});
}
