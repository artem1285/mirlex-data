// Staging. Grams are a technical input precision, not a statutory limit. Reject finer input rather than silently round. Annual same-row aggregation only; not for per-release forms without separately verified grouping.
export function massGrams(value,unit){
 if(typeof value!=="string"||!["kg","t"].includes(unit))throw Error("INVALID_MASS");
 const s=value.trim().replace(",",".");
 if(!/^\d{1,15}(?:\.\d{1,6})?$/.test(s))throw Error("INVALID_MASS");
 const [whole,frac=""]=s.split("."),precision=unit==="kg"?3:6;
 if(frac.slice(precision).replace(/0/g,""))throw Error("SUB_GRAM_PRECISION");
 const factor=10n**BigInt(precision);
 return BigInt(whole)*factor+BigInt(frac.slice(0,precision).padEnd(precision,"0"));
}
export function aggregateMass(rows){
 const bad=reason=>({status:"BLOCKED",reason});
 if(!Array.isArray(rows))return bad("INVALID_ROWS");
 const ids=new Set(),keys=new Set(),buckets=new Map();
 for(const r of rows){
 if(!r||!["id","organizationId","sourceLineKey","reportForm","reportTable","reportRowKey","massField"].every(k=>typeof r[k]==="string"&&r[k].trim())||!Number.isInteger(r.year)||r.verified!==true)return bad("UNVERIFIED_ROW");
 const source=JSON.stringify([r.organizationId,r.year,r.sourceLineKey,r.massField]);
 if(ids.has(r.id)||keys.has(source))return bad("DUPLICATE_SOURCE");
 ids.add(r.id);keys.add(source);
 let grams;try{grams=massGrams(r.mass,r.unit)}catch(e){return bad(e.message)}
 const k=JSON.stringify([r.organizationId,r.year,r.reportForm,r.reportTable,r.reportRowKey,r.massField]);
 buckets.set(k,(buckets.get(k)||0n)+grams);
 }
 return {status:"STAGING",rows:[...buckets].map(([key,g])=>({key:JSON.parse(key),exactGrams:g.toString(),roundedKg:((g+500n)/1000n).toString()})),publicationAllowed:false};
}
