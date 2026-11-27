// Staging only. Prefix search returns candidates, not classification. Trusted scope and date verification required.
export function assessShare(data,input){
 const bad=reason=>({status:"BLOCKED",reason});
 const {okpd2,positionId,scopeVerified,dateApplicabilityVerified,foodConsumerPackaging,availableWithin100km,naturalMineralRoadDistanceOver30km,totalGrams,eligibleGrams,shareBasisVerified}=input;
 if(typeof okpd2!=="string"||!/^\d{2}\.\d{1,2}(?:\.\d{1,2}(?:\.\d{3})?)?$/.test(okpd2))return bad("INVALID_CODE");
 const matches=data.rows.filter(r=>r.codes.some(c=>okpd2.replaceAll(".","").startsWith(c.replaceAll(".",""))));
 if(!matches.length)return {status:"NO_CODE_CANDIDATE",publicationAllowed:false};
 const r=matches.find(x=>x.id===positionId);
 if(!r||scopeVerified!==true||dateApplicabilityVerified!==true)return {...bad("SCOPE_OR_DATE_UNVERIFIED"),candidates:matches.map(x=>x.id)};
 if(r.footnotes.includes(4)){if(typeof foodConsumerPackaging!=="boolean")return bad("FOOD_PACKAGING_UNVERIFIED");if(foodConsumerPackaging)return {status:"EXCLUDED_FOOD_PACKAGING",publicationAllowed:false};}
 if(r.footnotes.some(x=>x===3||x===6)){if(typeof availableWithin100km!=="boolean")return bad("AVAILABILITY_UNVERIFIED");if(!availableWithin100km)return {status:"CONDITION_NOT_MET",publicationAllowed:false};}
 if(r.footnotes.includes(5)){if(typeof naturalMineralRoadDistanceOver30km!=="boolean")return bad("DISTANCE_UNVERIFIED");if(!naturalMineralRoadDistanceOver30km)return {status:"CONDITION_NOT_MET",publicationAllowed:false};}
 if(shareBasisVerified!==true||![totalGrams,eligibleGrams].every(x=>typeof x==="string"&&/^\d{1,24}$/.test(x)))return bad("SHARE_BASIS_UNVERIFIED");
 const total=BigInt(totalGrams),eligible=BigInt(eligibleGrams);
 if(!total||eligible>total)return bad("INVALID_MASS");
 return {status:"STAGING_COMPARISON",positionId:r.id,minPercent:r.minPercent,actualShare:{numerator:(eligible*100n).toString(),denominator:total.toString()},meetsThreshold:eligible*100n>=total*BigInt(r.minPercent),publicationAllowed:false,ropCoefficientEntitlement:false};
}
