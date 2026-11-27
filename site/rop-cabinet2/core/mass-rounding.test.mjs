import {massGrams,aggregateMass} from './mass-rounding.mjs';
function checks(m,a){
 let n=0;const eq=(x,y)=>{if(x!==y)throw Error(`${x} != ${y}`);n++};
 eq(m("1,234","kg"),1234n);eq(m("1.234567","t"),1234567n);eq(m("0","kg"),0n);eq(m("0.001000","kg"),1n);
 for(const v of ["-1","1e3","1,2.3","0.0001","NaN",""]) {let rejected=false;try{m(v,"kg")}catch(e){rejected=true}eq(rejected,true)}
 const r={id:"1",organizationId:"a",sourceLineKey:"doc1:1",year:2026,reportForm:"741:1",reportTable:"1",reportRowKey:"confirmed-product",massField:"grossMass",mass:"100.4",unit:"kg",verified:true};
 const rows=[r,{...r,id:"2",sourceLineKey:"doc2:1"},{...r,id:"3",sourceLineKey:"doc3:1"}];
 eq(a(rows).rows[0].exactGrams,"301200");eq(a(rows).rows[0].roundedKg,"301");
 eq(a([{...r,mass:"0.5"}]).rows[0].roundedKg,"1");
 eq(a([{...r,mass:"0.499"}]).rows[0].roundedKg,"0");
 eq(a([r,{...r,id:"2"}]).reason,"DUPLICATE_SOURCE");
 eq(a([r,{...r,id:"2",organizationId:"b"}]).rows.length,2);
 eq(a([r,{...r,id:"2",year:2027}]).rows.length,2);
 eq(a([r,{...r,id:"2",massField:"exportMass"}]).rows.length,2);
 eq(a([{...r,verified:false}]).status,"BLOCKED");
 eq(a([{...r,mass:"0.0001"}]).reason,"SUB_GRAM_PRECISION");
 eq(a([r,{...r,id:"2",sourceLineKey:"doc2:1",reportRowKey:"other"}]).rows.length,2);
 return n;
}
console.log('Passed:',checks(massGrams,aggregateMass));
