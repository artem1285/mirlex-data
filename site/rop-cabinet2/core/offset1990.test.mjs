import {allocateOffset} from './offset1990.mjs';
function checks(fn){
 let n=0;const eq=(a,b)=>{if(a!==b)throw Error(`${a} != ${b}`);n++};
 const d={id:"decision-1",organizationId:"a",status:"approved",verified:true,reference:"RPN-1",applicableYear:2026,availableKopecks:3000,targetForm:"APP1_T1"};
 const b={organizationId:"a",year:2026,forms:[{id:"APP1_T1",grossKopecks:10000},{id:"APP3_T2",grossKopecks:5000}],decisions:[d]};
 let r=fn(b);eq(r.status,"STAGING");eq(r.forms[0].payableKopecks,7000);eq(r.forms[1].payableKopecks,5000);
 eq(fn({...b,decisions:[{...d,status:"pending"}]}).forms[0].payableKopecks,10000);
 eq(fn({...b,decisions:[d,{...d,targetForm:"APP3_T2"}]}).reason,"DUPLICATE_OR_FOREIGN_DECISION");
 eq(fn({...b,decisions:[{...d,organizationId:"b"}]}).status,"BLOCKED");
 eq(fn({...b,decisions:[{...d,verified:false}]}).status,"BLOCKED");
 eq(fn({...b,decisions:[{...d,availableKopecks:10001}]}).reason,"OFFSET_EXCEEDS_TARGET_REVIEW");
 eq(fn({...b,decisions:[{...d,applicableYear:2025}]}).status,"BLOCKED");
 eq(fn({...b,decisions:[{...d,targetForm:"APP2"}]}).status,"BLOCKED");
 eq(fn({...b,decisions:[d,{...d,id:"decision-2",availableKopecks:8000}]}).status,"BLOCKED");
 eq(fn({...b,forms:[b.forms[0],b.forms[0]]}).status,"BLOCKED");
 eq(fn({...b,decisions:[{...d,availableKopecks:0}]}).forms[0].payableKopecks,10000);
 return n;
}
console.log('Passed:',checks(allocateOffset));
