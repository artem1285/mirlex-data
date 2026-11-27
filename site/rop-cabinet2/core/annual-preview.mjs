import {carryover742} from './carryover742.mjs';
import {lookupRate} from './rate-core.mjs';
// Internal staging only. Inputs must be resolved from trusted server records.
export function annualPreview(input, rateData) {
 const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false});
 if(!input||input.route!=="PP742_APP1"||input.evidenceVerified!==true||input.normMassVerified!==true||input.allocationVerified!==true)return deny("UNVERIFIED_INPUT");
 const c=carryover742(input);
 if(c.status!=="STAGING")return deny(c.reason);
 const rate=lookupRate(rateData,input.year,input.group,input.tyreEvidence);
 if(rate.status!=="STAGING_RATE")return deny(rate.reason);
 // Convert decimal coefficient to exact rational; no monetary rounding here.
 const s=String(rate.coefficient);
 if(!/^\d+(?:\.\d+)?$/.test(s)||!Number.isSafeInteger(rate.baseRubPerTonne))return deny("RATE_PRECISION_REVIEW");
 const [w,f=""]=s.split(".");
 const denominator=1000n*10n**BigInt(f.length);
 const numerator=BigInt(c.feeMassKg)*BigInt(rate.baseRubPerTonne)*BigInt(w+f)*100n;
 return {status:"STAGING_PREVIEW",year:input.year,group:input.group,requiredKg:input.requiredKg,creditedKg:c.creditedKg,feeMassKg:c.feeMassKg,nextYearCandidateKg:c.nextYearCandidateKg,baseRubPerTonne:rate.baseRubPerTonne,coefficient:rate.coefficient,grossFeeKopecks:{numerator:String(numerator),denominator:String(denominator)},publicationAllowed:false,officialReportAllowed:false,requiresPersistentAllocation:true};
}
