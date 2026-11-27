// Staging only. Server evidence flags must never be accepted from browser input.
export function checkRegistryEvidence({act,record,asOf,maxAgeDays=1}={}){
 const fail=reason=>({status:"REVIEW_REQUIRED",reason,creditedKg:null,publicationAllowed:false});
 const date=s=>typeof s==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
 if(!act||!record||!date(asOf)||!date(act.periodStart)||!date(act.periodEnd)||act.periodStart>act.periodEnd||act.periodEnd>asOf)return fail("INVALID_CONTEXT");
 if(!["official_extract","official_registry"].includes(record.source)||record.serverEvidenceVerified!==true||!record.evidenceId||!date(record.retrievedDate))return fail("OFFICIAL_EVIDENCE_REQUIRED");
 const age=(Date.parse(asOf)-Date.parse(record.retrievedDate))/86400000;
 if(!Number.isInteger(maxAgeDays)||maxAgeDays<0||age<0||age>maxAgeDays)return fail("REFRESH_REQUIRED");
 if(!act.registryNumber||record.registryNumber!==act.registryNumber||!act.executorInn||record.inn!==act.executorInn)return fail("IDENTITY_MISMATCH");
 if(!date(record.includedDate)||record.includedDate>act.periodStart)return fail("INCLUSION_DATE_REVIEW");
 if(record.status!=="active")return fail("STATUS_HISTORY_REVIEW");
 if(record.historicalCoverageVerified!==true||!date(record.coverageFrom)||!date(record.coverageThrough)||record.coverageFrom>act.periodStart||record.coverageThrough<act.periodEnd)return fail("HISTORICAL_RECORD_REQUIRED");
 if(!Array.isArray(record.sites)||!Array.isArray(act.sites)||!act.sites.length)return fail("SITE_EVIDENCE_REQUIRED");
 for(const s of act.sites){
 if(!s?.registrySiteId||!Array.isArray(s.rows)||!s.rows.length)return fail("SITE_EVIDENCE_REQUIRED");
 const sites=record.sites.filter(x=>x.id===s.registrySiteId);
 if(sites.length!==1||sites[0].identityVerified!==true)return fail("SITE_MISMATCH");
 const site=sites[0];
 for(const row of s.rows){
 if(!row||!["waste","secondary"].includes(row.inputKind)||!row.inputCode||!row.productOkpd2)return fail("ROW_UNVERIFIED");
 if(!Array.isArray(site.operations))return fail("OPERATION_EVIDENCE_REQUIRED");
 const op=site.operations.find(o=>o.inputKind===row.inputKind&&o.inputCode===row.inputCode&&o.productCode===row.productOkpd2&&o.scopeVerified===true);
 if(!op)return fail("OPERATION_SCOPE_REVIEW");
 if(row.inputKind==="waste"&&(!Number.isInteger(row.hazardClass)||row.hazardClass<1||row.hazardClass>5))return fail("HAZARD_CLASS_REVIEW");
 if(row.inputKind==="waste"&&row.hazardClass<=4&&op.licenseCoverageVerified!==true)return fail("LICENSE_REVIEW");
 }
 }
 return {status:"STAGING_EVIDENCE_MATCH",evidenceId:record.evidenceId,creditedKg:null,publicationAllowed:false,requiresLegalAndMassValidation:true};
}
