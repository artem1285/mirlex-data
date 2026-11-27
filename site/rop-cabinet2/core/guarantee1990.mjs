// Staging, PP1990 app3 notes 29 and 48. No final rounding.
export function allocateGuarantee({rows,guarantees,verified,year,organizationId}){
 const bad=reason=>({status:"BLOCKED",reason});
 if(verified!==true||!Number.isInteger(year)||!organizationId||!Array.isArray(rows)||!rows.length||!Array.isArray(guarantees)||!guarantees.length)return bad("EVIDENCE_REQUIRED");
 const ids=new Set(),gids=new Set(),used=new Set(),out=[];
 for(const r of rows){if(!r.id||ids.has(r.id)||r.organizationId!==organizationId||r.year!==year||!["T1","T2"].includes(r.table)||![r.requiredKg,r.prepaidKg,r.creditedKg,r.grossKopecks].every(x=>Number.isSafeInteger(x)&&x>=0)||r.prepaidKg+r.creditedKg>r.requiredKg)return bad("INVALID_ROW");ids.add(r.id);}
 const buckets=new Map();
 for(const g of guarantees){
 if(!g.id||gids.has(g.id)||g.organizationId!==organizationId||g.claimYear!==year||g.verified!==true||g.previouslyClaimed!==false||!Array.isArray(g.rowIds)||!g.rowIds.length||new Set(g.rowIds).size!==g.rowIds.length||g.rowIds.some(id=>!ids.has(id))||![g.feeKopecks,g.rateBasisPoints].every(x=>Number.isSafeInteger(x)&&x>=0))return bad("INVALID_OR_REUSED_GUARANTEE");
 gids.add(g.id);const key=JSON.stringify([...g.rowIds].sort());if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(g);
 }
 for(const [key,gs] of buckets){
 const rs=rows.filter(r=>JSON.parse(key).includes(r.id));
 if(rs.some(r=>used.has(r.id)))return bad("OVERLAPPING_SCOPE_REVIEW");
 if(new Set(rs.map(r=>r.table)).size!==1)return bad("CROSS_TABLE_SCOPE_REVIEW");
 if(rs.length>1&&gs.length>1)return bad("MULTIPLE_MULTIROW_GUARANTEES_REVIEW");
 rs.forEach(r=>used.add(r.id));
 const sum=(arr,fn)=>arr.reduce((s,r)=>s+BigInt(fn(r)),0n);
 const mass=sum(rs,r=>r.requiredKg-r.prepaidKg),credit=sum(rs,r=>r.creditedKg),gross=sum(rs,r=>r.grossKopecks),fee=sum(gs,g=>g.feeKopecks),rate=sum(gs,g=>g.rateBasisPoints);
 const pn=fee*credit,pd=mass||1n,cn=gross*2n*rate,cd=30000n*BigInt(gs.length);
 const [n,d]=pn*cd<=cn*pd?[pn,pd]:[cn,cd];
 for(const r of rs){const rn=n*BigInt(r.creditedKg),rd=d*(credit||1n);if(rn>BigInt(r.grossKopecks)*rd)return bad("ROW_DEDUCTION_EXCEEDS_FEE_REVIEW");out.push({rowId:r.id,deduction:{numerator:rn.toString(),denominator:rd.toString(),unit:"kopeck"}});}
 }
 return {status:"STAGING",rows:out,publicationAllowed:false,requiresPersistentClaimControl:true};
}
