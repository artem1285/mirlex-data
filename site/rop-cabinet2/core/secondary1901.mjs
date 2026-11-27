// Staging only. PP1901 paragraphs 2–11. Trusted evidence and period-specific classification required. Partial confirmation scope must be validated upstream.
export function secondary1901(input){
 const bad=reason=>({status:"BLOCKED",reason});
 const {organizationId,year,productKey,section,origin,baseMassGrams,normPercent,materials,confirmation,paymentDate,reportDate}=input;
 const validDate=s=>typeof s==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
 const mass=s=>typeof s==="string"&&/^\d{1,24}$/.test(s);
 if(!organizationId||!productKey||![2025,2026,2027,2028,2029,2030].includes(year)||![1,2].includes(section)||origin!=="production_rf"||!mass(baseMassGrams)||!Number.isInteger(normPercent)||normPercent<0||normPercent>100||!Array.isArray(materials)||!materials.length)return bad("INVALID_SCOPE");
 if(section===2&&year<=2026&&normPercent!==(year===2025?55:75))return bad("PACKAGING_NORM_CONFLICT");
 if(section===2&&year>=2027&&normPercent!==100)return bad("PACKAGING_NORM_CONFLICT");
 let total=0n,eligible=0n;const seen=new Set();
 for(const m of materials){
 if(!m.id||seen.has(m.id)||!mass(m.usedGrams)||m.verified!==true||!["primary","secondary","intermediate"].includes(m.kind))return bad("MATERIAL_UNVERIFIED");
 seen.add(m.id);const used=BigInt(m.usedGrams);total+=used;
 if(m.kind==="primary")continue;
 if(!["RF","EAEU","OTHER"].includes(m.origin)||typeof m.alreadyCredited!=="boolean")return bad("ORIGIN_OR_CREDIT_UNVERIFIED");
 if(m.origin!=="RF"||m.alreadyCredited)continue;
 if(m.kind==="secondary")eligible+=used;
 else {
 if(m.upstreamConfirmationVerified!==true||!mass(m.embeddedEligibleGrams)||BigInt(m.embeddedEligibleGrams)>used)return bad("UPSTREAM_CONFIRMATION_REQUIRED");
 eligible+=BigInt(m.embeddedEligibleGrams);
 }
 }
 if(total===0n||eligible>total)return bad("INVALID_BALANCE");
 const c=confirmation;
 if(!c||c.verified!==true||c.kind!=="ROP_1991"||!c.reference||c.organizationId!==organizationId||c.productKey!==productKey||c.year!==year||!mass(c.confirmedBaseGrams)||BigInt(c.confirmedBaseGrams)>BigInt(baseMassGrams)||!mass(c.eligibleGrams)||!mass(c.totalGrams)||BigInt(c.eligibleGrams)!==eligible||BigInt(c.totalGrams)!==total)return bad("CONFIRMATION_REQUIRED_OR_MISMATCH");
 if(!validDate(c.date)||c.date>`${year+1}-04-15`||(paymentDate!=null&&(!validDate(paymentDate)||c.date>=paymentDate))||(reportDate!=null&&(!validDate(reportDate)||c.date>=reportDate)))return bad("CONFIRMATION_DATE_REVIEW");
 const confirmed=BigInt(c.confirmedBaseGrams),base=BigInt(baseMassGrams),norm=BigInt(normPercent);
 const fraction=(n,d)=>({numerator:n.toString(),denominator:d.toString()});
 return {status:"STAGING",eligibleGrams:eligible.toString(),totalGrams:total.toString(),share:fraction(eligible,total),coefficient:fraction(total-eligible,total),requiredGrams:fraction(norm*(confirmed*(total-eligible)+(base-confirmed)*total),100n*total),unreducedRequiredGrams:fraction(base*norm,100n),publicationAllowed:false};
}
