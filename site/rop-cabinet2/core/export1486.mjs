// Staging. Candidate allocations only; authoritative evidence and persistent reservation required.
export function exportAllocations({organizationId,lots,exports}){
 const bad=reason=>({status:"BLOCKED",reason});
 const mass=x=>typeof x==="string"&&/^\d{1,24}$/.test(x);
 const date=x=>typeof x==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;
 if(!organizationId||!Array.isArray(lots)||!Array.isArray(exports))return bad("INVALID_CONTEXT");
 const index=new Map(),ids=new Set(),sources=new Set(),out=[];
 for(const l of lots){
 if(!l.id||index.has(l.id)||l.organizationId!==organizationId||!Number.isInteger(l.year)||!l.productKey||!mass(l.availableGrams)||l.verified!==true)return bad("LOT_UNVERIFIED");
 index.set(l.id,{...l,left:BigInt(l.availableGrams)});
 }
 for(const e of exports){
 if(!e.id||ids.has(e.id)||!e.sourceAllocationKey||sources.has(e.sourceAllocationKey)||e.organizationId!==organizationId||!date(e.actualExportDate)||e.actualExportDate<"2025-01-01"||e.actualExportDate>="2031-01-01"||!mass(e.grams)||BigInt(e.grams)===0n||e.documentVerified!==true||e.actualExportEvidenceVerified!==true||e.ropScopeVerified!==true||typeof e.thirdParty!=="boolean")return bad("EXPORT_UNVERIFIED_OR_DUPLICATE");
 if(e.thirdParty&&e.transferEvidenceVerified!==true)return bad("TRANSFER_EVIDENCE_REQUIRED");
 const form=e.destination==="EAEU"&&e.documentType==="STAT"?3:e.destination==="NON_EAEU"&&e.documentType==="DT"?1:e.destination==="NON_EAEU"&&e.documentType==="CN23"?2:0;
 if(!form||!e.documentNumber)return bad("DOCUMENT_ROUTE_CONFLICT");
 const lot=index.get(e.lotId),year=Number(e.actualExportDate.slice(0,4)),g=BigInt(e.grams);
 if(!lot||lot.productKey!==e.productKey||year<lot.year||g>lot.left)return bad("LOT_MISMATCH_OR_EXCESS");
 let route;
 if(year===lot.year)route="CURRENT_MASS_REDUCTION_CANDIDATE";
 else if(lot.priorSettlement==="fee_paid"&&lot.priorSettlementVerified===true)route="LATER_FEE_REDUCTION_REVIEW";
 else if(lot.priorSettlement==="recycling_completed"&&lot.priorSettlementVerified===true)route="LATER_RECYCLING_MASS_REDUCTION_REVIEW";
 else return bad("PRIOR_SETTLEMENT_REVIEW");
 ids.add(e.id);sources.add(e.sourceAllocationKey);lot.left-=g;
 out.push({id:e.id,lotId:lot.id,appendix:form,exportYear:year,originalYear:lot.year,grams:g.toString(),route,requiresLegalReview:true});
 }
 return {status:"STAGING",allocations:out,remainingLots:[...index.values()].map(l=>({id:l.id,grams:l.left.toString()})),publicationAllowed:false};
}
