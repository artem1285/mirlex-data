// Staging stock reconciliation. Not official accounting or confirmation.
export function stockBalance({openingGrams,closingGrams,movements,organizationId,materialId,periodStart,periodEnd}){
 const bad=reason=>({status:"BLOCKED",reason});
 const mass=x=>typeof x==="string"&&/^\d{1,24}$/.test(x);
 const date=x=>typeof x==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;
 if(!organizationId||!materialId||!mass(openingGrams)||!mass(closingGrams)||!date(periodStart)||!date(periodEnd)||periodStart>periodEnd||periodStart.slice(0,4)!==periodEnd.slice(0,4)||!Array.isArray(movements))return bad("INVALID_CONTEXT");
 const ids=new Set(),sources=new Set();let balance=BigInt(openingGrams),received=0n,used=0n,otherOut=0n;
 for(const m of movements){
 if(!m||typeof m.id!=="string"||!m.id||ids.has(m.id)||typeof m.sourceKey!=="string"||!m.sourceKey||sources.has(m.sourceKey)||m.organizationId!==organizationId||m.materialId!==materialId||m.verified!==true||!mass(m.grams)||!date(m.date)||m.date<periodStart||m.date>periodEnd||!Number.isSafeInteger(m.sequence)||m.sequence<0||!["receipt","production_use","other_out"].includes(m.kind))return bad("UNVERIFIED_OR_DUPLICATE_MOVEMENT");
 if(m.kind==="production_use"&&!m.productKey)return bad("PRODUCT_REQUIRED");
 ids.add(m.id);sources.add(m.sourceKey);
 }
 const sorted=[...movements].sort((a,b)=>a.date.localeCompare(b.date)||a.sequence-b.sequence);
 const byProduct=new Map();let previous="";
 for(const m of sorted){
 const order=m.date+":"+m.sequence;if(order===previous)return bad("AMBIGUOUS_ORDER");previous=order;
 const v=BigInt(m.grams);
 if(m.kind==="receipt"){balance+=v;received+=v;}else{balance-=v;if(m.kind==="production_use"){used+=v;byProduct.set(m.productKey,(byProduct.get(m.productKey)||0n)+v);}else otherOut+=v;}
 if(balance<0n)return bad("NEGATIVE_STOCK");
 }
 return {status:balance===BigInt(closingGrams)?"STAGING_BALANCED":"BLOCKED",reason:balance===BigInt(closingGrams)?null:"CLOSING_MISMATCH",calculatedClosingGrams:balance.toString(),receivedGrams:received.toString(),usedGrams:used.toString(),otherOutGrams:otherOut.toString(),byProduct:[...byProduct].map(([productKey,v])=>({productKey,usedGrams:v.toString()})),publicationAllowed:false};
}
