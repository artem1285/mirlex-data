// Server-only staging adapter: backend must derive session from authenticated request.
import {readProtectedDraftHistory} from './protected-history-read.mjs';
const id=s=>typeof s==='string'&&/^[A-Za-z0-9._:-]{1,160}$/.test(s);
export async function readDraftHistoryInTransaction({session,organizationId,year,reportId,database}){
 if(!session||session.authenticated!==true||!id(session.subjectId))throw Error('UNAUTHENTICATED');
 if(!database||typeof database.transaction!=='function')throw Error('MISSING_TRANSACTION');
 return database.transaction(async tx=>{
  if(!tx||typeof tx.authorize!=='function'||typeof tx.readHistoryAndAnchor!=='function')throw Error('INVALID_TRANSACTION');
  const principal=Object.freeze({subjectId:session.subjectId,authenticated:true});
  return readProtectedDraftHistory({
   principal,request:{organizationId,year,reportId},
   authorize:scope=>tx.authorize(scope),
   readConsistentHistory:async scope=>{
    if(await tx.authorize(scope)!==true)throw Error('FORBIDDEN');
    return tx.readHistoryAndAnchor(scope);
   }
  });
 });
}
