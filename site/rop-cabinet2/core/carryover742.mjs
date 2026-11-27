// Staging: appendix 1 only. Trusted verification and persistent allocations required.
export function carryover742({requiredKg,currentKg,priorKg,year,priorYear,identityVerified,priorReportVerified,currentMassVerified,route}={}){
 const bad=reason=>({status:"BLOCKED",reason,publicationAllowed:false});
 if(route!=="PP742_APP1"||![2025,2026,2027].includes(year)||priorYear!==year-1||identityVerified!==true||currentMassVerified!==true)return bad("SCOPE_UNVERIFIED");
 if(![requiredKg,currentKg,priorKg].every(x=>typeof x==="string"&&/^\d{1,20}$/.test(x)))return bad("INVALID_MASS");
 const r=BigInt(requiredKg),c=BigInt(currentKg),p=BigInt(priorKg);
 if(p>0n&&priorReportVerified!==true)return bad("PRIOR_REPORT_REQUIRED");
 const used=c+p<r?c+p:r;
 return {status:"STAGING",creditedKg:String(used),feeMassKg:String(r-used),nextYearCandidateKg:String(c>r?c-r:0n),publicationAllowed:false,requiresPersistentAllocation:true};
}
