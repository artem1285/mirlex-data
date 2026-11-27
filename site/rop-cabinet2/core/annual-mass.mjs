import {secondary1901} from './secondary1901.mjs';
// Staging only. Input masses are already mapped to verified report columns. No inferred rounding or final reporting.
function deriveMass741(x,secondaryFn){
 const bad=reason=>({status:"BLOCKED",reason,publicationAllowed:false});
 if(!x||!x.organizationId||!x.productKey||!["T1","T2"].includes(x.table)||![2025,2026,2027].includes(x.year)||x.scopeVerified!==true||x.massEvidenceVerified!==true||x.normVerified!==true)return bad("VERIFIED_SCOPE_REQUIRED");
 if(![x.grossKg,x.exportKg,x.componentsKg].every(v=>typeof v==="string"&&/^\d{1,20}$/.test(v))||!Number.isInteger(x.normPercent)||x.normPercent<0||x.normPercent>100)return bad("INVALID_MASS_OR_NORM");
 const g=BigInt(x.grossKg),e=BigInt(x.exportKg),m=BigInt(x.componentsKg);
 if(e+m>g||x.table==="T2"&&m!==0n)return bad("MASS_BALANCE_CONFLICT");
 if(e>0n&&x.exportEvidenceVerified!==true||m>0n&&x.componentEvidenceVerified!==true||e>0n&&m>0n&&x.disjointMassVerified!==true)return bad("DEDUCTION_EVIDENCE_REQUIRED");
 const base=g-e-m,n=BigInt(x.normPercent);
 const result={status:"STAGING_MASS",baseKg:String(base),originalRequiredKg:{numerator:String(base*n),denominator:"100"},publicationAllowed:false};
 if(x.secondaryMode==="none")return {...result,requiredKg:result.originalRequiredKg};
 if(x.secondaryMode!=="confirmed"||x.table!=="T1"||!x.secondary||x.secondary.organizationId!==x.organizationId||x.secondary.productKey!==x.productKey||x.secondary.year!==x.year||x.secondary.normPercent!==x.normPercent||x.secondary.baseMassGrams!==String(base*1000n))return bad("SECONDARY_SCOPE_CONFLICT");
 const s=secondaryFn(x.secondary);
 if(s.status!=="STAGING")return bad(s.reason);
 return {...result,coefficient:s.coefficient,requiredKg:{numerator:s.requiredGrams.numerator,denominator:String(BigInt(s.requiredGrams.denominator)*1000n)},requiresSeparateReportRows:true};
}
export const deriveAnnualMass = x => deriveMass741(x,secondary1901);
export {deriveMass741};
