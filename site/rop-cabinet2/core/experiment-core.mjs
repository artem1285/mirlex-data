// Staging only. Verified inputs must originate in trusted server. No report submission.
export function experiment750({origin,releaseDate,kind,productListed,packagingRopListed,classificationVerified}) {
 const blocked=reason=>({status:"BLOCKED",reason});
 if(!["production_rf","import_eaeu","import_non_eaeu"].includes(origin))return blocked("ORIGIN_UNKNOWN");
 if(typeof releaseDate!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)||!Number.isFinite(Date.parse(releaseDate))||new Date(releaseDate).toISOString().slice(0,10)!==releaseDate)return blocked("DATE_INVALID");
 if(origin!=="import_non_eaeu")return {status:"OUT_OF_SCOPE"};
 const year=Number(releaseDate.slice(0,4));
 if(year<2024||year>2027)return {status:"OUT_OF_SCOPE",requiresOtherLegalRoute:true};
 if(classificationVerified!==true||typeof productListed!=="boolean"||!["goods","packaging_as_goods","packaging_of_goods"].includes(kind))return blocked("CLASSIFICATION_UNVERIFIED");
 if(kind==="packaging_of_goods"&&typeof packagingRopListed!=="boolean")return blocked("PACKAGING_SCOPE_UNVERIFIED");
 const applicable=productListed&&(kind!=="packaging_of_goods"||packagingRopListed);
 if(!applicable)return {status:"NOT_APPLICABLE",annualPackagingAggregationReview:kind==="packaging_of_goods"&&packagingRopListed};
 if(releaseDate==="2025-09-01")return blocked("HISTORICAL_BOUNDARY_REVIEW");
 const beforeRelease=(releaseDate>="2024-09-01"&&releaseDate<"2025-09-01")||(releaseDate>="2026-09-01"&&releaseDate<"2027-09-01");
 return {status:"APPLICABLE",beforeRelease,preReleaseMassForm:beforeRelease?"PP741_APPENDIX_2":null,annualMassForm:"PP750_APPENDIX_2",annualRecyclingForm:"PP750_APPENDIX_3_IF_REQUIRED",annualFeeFormCandidate:"PP1990_APPENDIX_3",annualDueDate:`${year+1}-04-15`,paymentOrSecurity:beforeRelease,aggregationReview:kind==="packaging_of_goods",legalReviewRequired:true};
}

export function experimentFee1990({requiredKg,prepaidKg,creditedKg,rateKopecksPerTonne,guaranteeFeeKopecks=0,keyRateBasisPoints=0,verified=false,securityScope="none"}) {
 const bad=reason=>({status:"BLOCKED",reason});
 if(verified!==true)return bad("EVIDENCE_UNVERIFIED");
 if(![requiredKg,prepaidKg,creditedKg,rateKopecksPerTonne,guaranteeFeeKopecks,keyRateBasisPoints].every(v=>Number.isSafeInteger(v)&&v>=0)||rateKopecksPerTonne<=0)return bad("INVALID_INTEGER_INPUT");
 if(prepaidKg>requiredKg||creditedKg>requiredKg-prepaidKg)return bad("ALLOCATION_EXCEEDS_REQUIREMENT");
 if(!["none","single_position"].includes(securityScope)||guaranteeFeeKopecks>0&&securityScope!=="single_position")return bad("MULTI_POSITION_OR_UNVERIFIED_SECURITY");
 const covered=BigInt(requiredKg-prepaidKg),credit=BigInt(creditedKg),remaining=covered-credit;
 const grossN=remaining*BigInt(rateKopecksPerTonne),grossD=1000n;
 const proportionalN=BigInt(guaranteeFeeKopecks)*credit,proportionalD=covered||1n;
 const capN=grossN*2n*BigInt(keyRateBasisPoints),capD=grossD*3n*10000n;
 const chooseProportional=proportionalN*capD<=capN*proportionalD;
 const dn=chooseProportional?proportionalN:capN,dd=chooseProportional?proportionalD:capD;
 if(dn*grossD>grossN*dd)return bad("LEGAL_LIMIT_REVIEW");
 const fraction=(n,d)=>({numerator:n.toString(),denominator:d.toString(),unit:"kopeck"});
 return {status:"STAGING_CALCULATION",remainingKg:Number(remaining),gross:fraction(grossN,grossD),deduction:fraction(dn,dd),feeAfterDeduction:fraction(grossN*dd-dn*grossD,grossD*dd),publicationAllowed:false,roundingPendingLegalReview:true};
}
