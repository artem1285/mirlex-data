// Staging candidate only: PP1486 p.6 and 89-FZ art.24.5 p.5. Homogeneous original settlement only. No official report deduction or persistent reservation.
export function priorExportCandidate({lot,allocations,organizationId,calculationYear}){
 const bad=reason=>({status:"BLOCKED",reason});
 const integer=x=>typeof x==="string"&&/^\d{1,24}$/.test(x);
 if(!lot||lot.verified!==true||lot.organizationId!==organizationId||!organizationId||!lot.id||!lot.productKey||!Number.isInteger(lot.year)||!Number.isInteger(calculationYear)||calculationYear<=lot.year||!integer(lot.originalMassGrams)||!integer(lot.previouslyExportedGrams)||!Array.isArray(allocations)||!allocations.length)return bad("UNVERIFIED_CONTEXT");
 const base=BigInt(lot.originalMassGrams),previous=BigInt(lot.previouslyExportedGrams);
 if(!base||previous>base)return bad("INVALID_BASE");
 let total=0n;const seen=new Set(),sources=new Set();
 for(const a of allocations){
 if(!a||!a.id||seen.has(a.id)||!a.sourceKey||sources.has(a.sourceKey)||a.lotId!==lot.id||a.organizationId!==organizationId||a.productKey!==lot.productKey||a.exportYear!==calculationYear||a.evidenceVerified!==true||a.previouslyClaimed!==false||!integer(a.grams)||BigInt(a.grams)===0n)return bad("UNVERIFIED_OR_DUPLICATE_ALLOCATION");
 seen.add(a.id);sources.add(a.sourceKey);total+=BigInt(a.grams);
 }
 if(total+previous>base)return bad("MASS_EXCEEDS_ORIGINAL");
 if(lot.homogeneousSettlementVerified!==true)return bad("MIXED_SETTLEMENT_REVIEW");
 if(lot.settlement==="fee_paid"){
 if(!integer(lot.originalPaidKopecks)||!lot.paymentReference||lot.paymentVerified!==true)return bad("PAYMENT_UNVERIFIED");
 return {status:"STAGING_CANDIDATE",kind:"fee_reduction",exportedGrams:total.toString(),candidateKopecks:{numerator:(BigInt(lot.originalPaidKopecks)*total).toString(),denominator:base.toString()},publicationAllowed:false,requiresLegalPeriodAndFormReview:true};
 }
 if(lot.settlement==="recycling_completed"&&lot.recyclingVerified===true&&lot.actReference)return {status:"STAGING_CANDIDATE",kind:"recycling_mass_reduction",exportedGrams:total.toString(),candidateGrams:total.toString(),publicationAllowed:false,requiresLegalPeriodAndFormReview:true};
 return bad("SETTLEMENT_UNVERIFIED");
}
