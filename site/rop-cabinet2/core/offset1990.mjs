// Staging: approved balance must come from trusted server. Persistent reservations not implemented.
export function allocateOffset({organizationId,year,forms,decisions}){
 const bad=reason=>({status:"BLOCKED",reason});
 if(typeof organizationId!=="string"||!organizationId.trim()||!Number.isInteger(year)||!Array.isArray(forms)||!Array.isArray(decisions))return bad("INVALID_CONTEXT");
 const ids=new Set(),ds=new Set(),result=[];
 for(const f of forms){
 if(!f||!["APP1_T1","APP1_T2","APP1_T3","APP2","APP3_T1","APP3_T2"].includes(f.id)||ids.has(f.id)||!Number.isSafeInteger(f.grossKopecks)||f.grossKopecks<0)return bad("INVALID_FORM");
 ids.add(f.id);result.push({...f,offsetKopecks:0,decisionRefs:[]});
 }
 for(const d of decisions){
 if(!d||typeof d.id!=="string"||!d.id.trim()||ds.has(d.id)||d.organizationId!==organizationId)return bad("DUPLICATE_OR_FOREIGN_DECISION");
 ds.add(d.id);
 if(d.status!=="approved")continue;
 if(d.verified!==true||typeof d.reference!=="string"||!d.reference.trim()||d.applicableYear!==year||!Number.isSafeInteger(d.availableKopecks)||d.availableKopecks<0)return bad("DECISION_UNVERIFIED");
 if(d.availableKopecks===0)continue;
 const f=result.find(x=>x.id===d.targetForm);
 if(!f)return bad("TARGET_FORM_MISSING");
 if(d.availableKopecks>f.grossKopecks-f.offsetKopecks)return bad("OFFSET_EXCEEDS_TARGET_REVIEW");
 f.offsetKopecks+=d.availableKopecks;f.decisionRefs.push(d.reference);
 }
 return {status:"STAGING",forms:result.map(f=>({...f,payableKopecks:f.grossKopecks-f.offsetKopecks})),publicationAllowed:false,requiresTransactionalReservation:true};
}
