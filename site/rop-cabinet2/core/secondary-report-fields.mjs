import {deriveAnnualMass} from './annual-mass.mjs';
// Map exact secondary-material results to internal audit fields, not official form export.
export function secondaryReportFields(input){
 const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false});
 if(!input||input.secondaryMode!=="confirmed"||![1,2].includes(input.secondary?.section)||input.table!=="T1")return deny("SCOPE_REVIEW");
 const m=deriveAnnualMass(input);
 if(m.status!=="STAGING_MASS")return deny(m.reason);
 const b=BigInt(m.baseKg),c=BigInt(input.secondary.confirmation.confirmedBaseGrams);
 // Only a fully confirmed row is supported; mixed lots need their own verified allocation.
 if(c!==b*1000n)return deny("PARTIAL_CONFIRMATION_SPLIT_REQUIRED");
 const k=m.coefficient;
 const frac=(n,d)=>({numerator:String(n),denominator:String(d)});
 return {status:"STAGING_FIELDS",section:input.secondary.section,baseKg:m.baseKg,normPercent:input.normPercent,originalRequiredKg:m.originalRequiredKg,coefficient:k,adjustedNormPercent:frac(BigInt(input.normPercent)*BigInt(k.numerator),BigInt(k.denominator)),adjustedRequiredKg:m.requiredKg,confirmationReference:input.secondary.confirmation.reference,publicationAllowed:false,officialReportAllowed:false};
}
