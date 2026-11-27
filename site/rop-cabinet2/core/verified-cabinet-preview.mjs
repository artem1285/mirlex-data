import {resolveEvidenceManifest} from './evidence-resolver.mjs';
import {calculateCabinetPreview} from './cabinet-preview.mjs';
// Server-only composition boundary. The resolver is supplied by protected backend code.
// This adapter never accepts a browser-provided manifest as proof.
const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false});
export async function verifiedCabinetPreview(input,rateData,resolveDocument){
 if(!input||!Array.isArray(input.rows)||!input.rows.length||typeof resolveDocument!=="function")return deny("SERVER_CONTEXT_REQUIRED");
 const rowIds=new Set();
 for(const row of input.rows){
  if(!row||typeof row.id!=="string"||rowIds.has(row.id)||row.organizationId!==input.organizationId||row.year!==input.year||!row.productKey||!row.sourceReportId)return deny("ROW_SCOPE_OR_SOURCE_REQUIRED");
  rowIds.add(row.id);
 }
 const manifest=await resolveEvidenceManifest({organizationId:input.organizationId,year:input.year,rows:input.rows.map(row=>({id:row.id,organizationId:row.organizationId,year:row.year,productKey:row.productKey,sourceReportId:row.sourceReportId,evidence:row.evidence}))},resolveDocument);
 if(manifest.status!=="STAGING_MANIFEST")return deny(manifest.reason);
 if(manifest.rows.length!==input.rows.length)return deny("MANIFEST_ROW_MISMATCH");
 for(let i=0;i<input.rows.length;i++){
  const m=manifest.rows[i],r=input.rows[i];
  if(m.id!==r.id||m.productKey!==r.productKey||m.sourceReportId!==r.sourceReportId)return deny("MANIFEST_ROW_MISMATCH");
 }
 // Only the server may set this flag. The callback must independently authenticate sources.
 const result=calculateCabinetPreview({...input,serverEvidenceVerified:true},rateData);
 if(result.status!=="STAGING_SETTLEMENT")return deny(result.reason);
 return {...result,evidenceManifest:manifest,publicationAllowed:false,officialReportAllowed:false,requiresPersistentReservation:true,requiresServerReverification:true};
}
