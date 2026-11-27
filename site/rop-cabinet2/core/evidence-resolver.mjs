import {buildEvidenceManifest} from './evidence-manifest.mjs';
// Server-only adapter. Caller must supply a trusted server-side document resolver.
// No browser verification flags, file contents, or credentials are accepted.
const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false});
const safe=s=>typeof s==="string"&&/^[a-zA-Z0-9._:-]{1,160}$/.test(s);
export async function resolveEvidenceManifest(input,resolveDocument){
 if(!input||!safe(input.organizationId)||!Number.isInteger(input.year)||!Array.isArray(input.rows)||!input.rows.length||typeof resolveDocument!=="function")return deny("SERVER_CONTEXT_REQUIRED");
 const rows=[],used=new Set();
 for(const row of input.rows){
  if(!row||row.organizationId!==input.organizationId||row.year!==input.year||!safe(row.id)||!safe(row.productKey)||!safe(row.sourceReportId)||!Array.isArray(row.evidence)||!row.evidence.length)return deny("ROW_SCOPE_REQUIRED");
  const evidence=[];
  for(const item of row.evidence){
   if(!item||!safe(item.id)||!safe(item.kind)||!safe(item.documentId)||!safe(item.documentVersion)||used.has(item.id))return deny("EVIDENCE_REFERENCE_REQUIRED");
   used.add(item.id);
   let verified;
   try{verified=await resolveDocument(Object.freeze({organizationId:input.organizationId,year:input.year,rowId:row.id,productKey:row.productKey,sourceReportId:row.sourceReportId,id:item.id,kind:item.kind,documentId:item.documentId,documentVersion:item.documentVersion}));}
   catch{return deny("SERVER_RESOLVER_ERROR");}
   if(!verified||verified.authoritative!==true||verified.registryChecked!==true||verified.organizationId!==input.organizationId||verified.year!==input.year||verified.rowId!==row.id||verified.documentId!==item.documentId||verified.documentVersion!==item.documentVersion||verified.kind!==item.kind)return deny("SERVER_EVIDENCE_REJECTED");
   evidence.push({id:item.id,kind:item.kind,documentId:item.documentId,documentVersion:item.documentVersion,organizationId:input.organizationId,year:input.year,rowId:row.id,serverVerified:true,registryChecked:true});
  }
  rows.push({id:row.id,organizationId:input.organizationId,year:input.year,productKey:row.productKey,sourceReportId:row.sourceReportId,evidence});
 }
 const result=buildEvidenceManifest({organizationId:input.organizationId,year:input.year,rows});
 if(result.status!=="STAGING_MANIFEST")return deny(result.reason);
 return result;
}
