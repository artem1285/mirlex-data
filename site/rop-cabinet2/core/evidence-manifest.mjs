// Staging-only evidence manifest for report rows. Does not verify signatures or registry authenticity.
const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false});
const safeId=s=>typeof s==="string"&&s.length>0&&s.length<=160&&/^[a-zA-Z0-9._:-]+$/.test(s);
export function buildEvidenceManifest(input){
 if(!input||!safeId(input.organizationId)||!Number.isInteger(input.year)||input.year<2024||input.year>2035||!Array.isArray(input.rows)||!input.rows.length)return deny("CONTEXT_REQUIRED");
 const rowIds=new Set(),refs=new Set(),rows=[];
 for(const r of input.rows){
  if(!r||!safeId(r.id)||rowIds.has(r.id)||r.organizationId!==input.organizationId||r.year!==input.year||!safeId(r.productKey)||!safeId(r.sourceReportId)||!Array.isArray(r.evidence)||!r.evidence.length)return deny("ROW_SCOPE_OR_SOURCE_REQUIRED");
  rowIds.add(r.id);
  const items=[];
  for(const e of r.evidence){
   if(!e||!safeId(e.id)||!safeId(e.kind)||!safeId(e.documentId)||!safeId(e.documentVersion)||e.organizationId!==input.organizationId||e.year!==input.year||e.rowId!==r.id||e.serverVerified!==true||e.registryChecked!==true||refs.has(e.id))return deny("EVIDENCE_VERIFICATION_OR_REUSE");
   refs.add(e.id);
   items.push(Object.freeze({id:e.id,kind:e.kind,documentId:e.documentId,documentVersion:e.documentVersion}));
  }
  rows.push(Object.freeze({id:r.id,productKey:r.productKey,sourceReportId:r.sourceReportId,evidence:Object.freeze(items)}));
 }
 return Object.freeze({status:"STAGING_MANIFEST",organizationId:input.organizationId,year:input.year,rows:Object.freeze(rows),publicationAllowed:false,officialReportAllowed:false,requiresServerReverification:true});
}
