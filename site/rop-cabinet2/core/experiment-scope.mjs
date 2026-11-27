// Staging only; identity and canonical packaging name must be established upstream.
export function match750(rows,{tnved,group,identityVerified,laundryMachine}){
 const code=typeof tnved==="string"?tnved.replace(/\s/g,""):"";
 if(!/^\d{10}$/.test(code)||!Number.isInteger(group)||identityVerified!==true)return {status:"BLOCKED",reason:"IDENTITY_UNVERIFIED"};
 const candidates=rows.filter(r=>r.match==="exact"?code===r.code:code.startsWith(r.code));
 if(!candidates.length)return {status:"NO_CODE_MATCH",legalReviewRequired:true};
 const matched=candidates.find(r=>r.group===group);
 if(!matched)return {status:"BLOCKED",reason:"GROUP_CONFLICT"};
 if(matched.condition==="exclude_laundry"){
 if(typeof laundryMachine!=="boolean")return {status:"BLOCKED",reason:"LAUNDRY_SCOPE_UNVERIFIED"};
 if(laundryMachine)return {status:"EXCLUDED",legalReviewRequired:true};
 }
 return {status:"CANDIDATE",group,legalReviewRequired:true};
}
export function routeAnnualPackaging(rows){
 const blocked=reason=>({status:"BLOCKED",reason});
 if(!Array.isArray(rows))return blocked("INVALID_ROWS");
 const ids=new Set(),buckets=new Map();
 for(const r of rows){
 if(!r||typeof r.id!=="string"||!r.id.trim()||ids.has(r.id))return blocked("DUPLICATE_OR_MISSING_ID");
 ids.add(r.id);
 if(typeof r.organizationId!=="string"||!r.organizationId.trim()||![2026,2027].includes(r.year)||typeof r.packagingNameId!=="string"||!r.packagingNameId.trim()||!Number.isSafeInteger(r.massKg)||r.massKg<0||r.classificationVerified!==true||typeof r.experimentGoods!=="boolean"||!["import_non_eaeu","import_eaeu","production_rf"].includes(r.origin))return blocked("INVALID_OR_UNVERIFIED_ROW");
 if(r.origin==="import_non_eaeu"){
 const key=JSON.stringify([r.organizationId,r.year,r.packagingNameId]);
 buckets.set(key,(buckets.get(key)||false)||r.experimentGoods);
 }
 }
 return {status:"STAGING",rows:rows.map(r=>({...r,annualMassForm:r.origin==="import_non_eaeu"&&buckets.get(JSON.stringify([r.organizationId,r.year,r.packagingNameId]))?"PP750_APPENDIX_2":"PP741_APPENDIX_1"})),publicationAllowed:false};
}
