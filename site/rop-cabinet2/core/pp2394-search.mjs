// Staging candidate search only. Never infer eligibility from numeric prefixes. Full dataset and verified classification hierarchy required.
export function search2394(data,{group,kind,code,legalEventDate,legalEventVerified}={}){
 const bad=reason=>({status:"BLOCKED",reason});
 if(!Number.isInteger(group)||group<1||group>52||!["waste","secondary","product"].includes(kind)||typeof code!=="string")return bad("INVALID_QUERY");
 if(legalEventVerified!==true||typeof legalEventDate!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(legalEventDate)||!Number.isFinite(Date.parse(legalEventDate))||new Date(legalEventDate).toISOString().slice(0,10)!==legalEventDate)return bad("LEGAL_DATE_REQUIRED");
 if(legalEventDate<"2024-01-01"||legalEventDate>="2027-01-01")return bad("VERSION_NOT_AVAILABLE");
 if(!data||data.codedRows!==971||!Array.isArray(data.rows)||data.rows.length!==971||Object.keys(data.groups||{}).length!==52)return bad("DATASET_INCOMPLETE");
 const norm=s=>kind==="waste"?s.replace(/\s/g,""):s.trim();
 const valid=s=>kind==="waste"?/^\d{11}$/.test(s):/^\d{2}(?:\.\d{1,3}){1,3}$/.test(s);
 const q=norm(code);
 if(!valid(q))return bad("INVALID_CODE");
 const matches=[];
 for(const r of data.rows){
 if(r.group!==group||r.kind!==kind)continue;
 const c=norm(r.codeRaw);if(!valid(c))return bad("INVALID_SOURCE_ROW");
 // For candidate discovery only: trailing-zero FKKO classes and OKPD prefixes are NOT verified ancestry.
 const exact=c===q;
 const candidate=kind==="waste"?c.endsWith("0")&&q.startsWith(c.replace(/0+$/,"")):q.replaceAll(".","").startsWith(c.replaceAll(".",""));
 if(exact||candidate)matches.push({group,kind,code:r.codeRaw,name:r.name,table:r.table,row:r.row,match:exact?"exact":"hierarchy_candidate",continuations:r.continuations||[],requiresScopeReview:true});
 }
 return {status:"STAGING_CANDIDATES",matches,legalEligibility:null,publicationAllowed:false};
}
