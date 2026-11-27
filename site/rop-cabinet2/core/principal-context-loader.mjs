// Server-only adapter. A permission decision must be checked again at data load time.
// The backing store must derive access from the authenticated session and enforce it in its own transaction.
const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false,officialReportAllowed:false});
const safe=s=>typeof s==="string"&&/^[a-zA-Z0-9._:-]{1,160}$/.test(s);
export async function principalContextLoader(principal,authorize,loadRows){
 if(!safe(principal?.subjectId)||typeof authorize!=="function"||typeof loadRows!=="function")throw Error("SERVER_PRINCIPAL_CONTEXT_REQUIRED");
 return async function load(query){
  if(!safe(query?.organizationId)||!Number.isInteger(query.year)||!Array.isArray(query.rowIds)||!query.rowIds.length||query.rowIds.length>1000||query.rowIds.some(id=>!safe(id))||new Set(query.rowIds).size!==query.rowIds.length)throw Error("INVALID_SCOPE");
  const scope=Object.freeze({subjectId:principal.subjectId,organizationId:query.organizationId,year:query.year,permission:"rop:preview",rowIds:Object.freeze([...query.rowIds])});
  if(await authorize(scope)!==true)throw Error("ACCESS_DENIED");
  // No client-provided subjectId, flags, rates or masses are forwarded.
  const context=await loadRows(scope);
  if(!context||context.authenticated!==true||context.subjectId!==principal.subjectId||context.organizationId!==scope.organizationId||context.year!==scope.year||!Array.isArray(context.rows)||context.rows.length!==scope.rowIds.length)throw Error("CONTEXT_IDENTITY_CONFLICT");
  const ids=new Set(scope.rowIds);
  if(context.rows.some(r=>!r||!ids.has(r.id)||r.organizationId!==scope.organizationId||r.year!==scope.year)||new Set(context.rows.map(r=>r.id)).size!==ids.size)throw Error("ROW_IDENTITY_CONFLICT");
  return context;
 };
}
