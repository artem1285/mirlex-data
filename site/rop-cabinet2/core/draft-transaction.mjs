// Server-only staging transaction boundary. The backend supplies trusted session and transaction.
import {persistDraftRevision} from './draft-persistence.mjs';
const valid=s=>typeof s==='string'&&/^[A-Za-z0-9._:-]{1,160}$/.test(s);
export async function persistDraftInTransaction({session,organizationId,year,reportId,body,sourceIds=[],database}){
 if(!database||typeof database.transaction!=='function')throw Error('MISSING_TRANSACTION');
 if(!session||session.authenticated!==true||!valid(session.subjectId))throw Error('UNAUTHENTICATED');
 // No user-controlled principal or authorization callback is accepted.
 return database.transaction(async tx=>{
  if(!tx||typeof tx.authorize!=='function'||typeof tx.readHead!=='function'||typeof tx.compareAndAppend!=='function'||typeof tx.verifySourceOwnership!=='function')throw Error('INVALID_TRANSACTION');
  const principal=Object.freeze({subjectId:session.subjectId,authenticated:true});
  const authorize=async scope=>tx.authorize(scope);
  const store={
   readHead:async scope=>tx.readHead(scope),
   compareAndAppend:async entry=>{
    // Recheck permission in the same transaction immediately before compare-and-append.
    if(await tx.authorize(entry.scope)!==true)throw Error('FORBIDDEN');
    if(await tx.verifySourceOwnership({scope:entry.scope,sourceIds:[...entry.sourceIds]})!==true)throw Error('SOURCE_OWNERSHIP_UNVERIFIED');
    return tx.compareAndAppend(entry);
   }
  };
  return persistDraftRevision({principal,organizationId,year,reportId,body,sourceIds,authorize,store});
 });
}
