import {readFileSync} from 'node:fs';
import {match750,routeAnnualPackaging} from './experiment-scope.mjs';
const data=JSON.parse(readFileSync(new URL('../data/pp750-list.staging.json',import.meta.url),'utf8'));
function checks(list,match,route){
 let n=0;const eq=(a,b)=>{if(a!==b)throw Error(`${a} != ${b}`);n++};
 const b={tnved:"4011201234",group:5,identityVerified:true};
 eq(match(list,b).status,"CANDIDATE");eq(match(list,{...b,group:1}).status,"BLOCKED");eq(match(list,{...b,tnved:"401120"}).status,"BLOCKED");eq(match(list,{...b,tnved:"4011301234"}).status,"NO_CODE_MATCH");eq(match(list,{...b,identityVerified:false}).status,"BLOCKED");
 const w={...b,tnved:"8450110000",group:10};eq(match(list,w).status,"BLOCKED");eq(match(list,{...w,laundryMachine:true}).status,"EXCLUDED");eq(match(list,{...w,laundryMachine:false}).status,"CANDIDATE");
 const r={id:"a",organizationId:"org1",year:2026,packagingNameId:"cardboard-confirmed",massKg:100,classificationVerified:true,experimentGoods:true,origin:"import_non_eaeu"};
 const rows=[r,{...r,id:"b",experimentGoods:false,massKg:200},{...r,id:"c",experimentGoods:false,origin:"import_eaeu"},{...r,id:"d",experimentGoods:false,year:2027},{...r,id:"e",experimentGoods:false,organizationId:"org2"},{...r,id:"f",experimentGoods:false,packagingNameId:"other"}];
 const out=route(rows);eq(out.status,"STAGING");eq(out.rows[0].annualMassForm,"PP750_APPENDIX_2");eq(out.rows[1].annualMassForm,"PP750_APPENDIX_2");for(let i=2;i<6;i++)eq(out.rows[i].annualMassForm,"PP741_APPENDIX_1");eq(out.rows.reduce((s,x)=>s+x.massKg,0),700);eq(route([r,r]).reason,"DUPLICATE_OR_MISSING_ID");eq(route([{...r,classificationVerified:false}]).status,"BLOCKED");eq(route([{...r,massKg:-1}]).status,"BLOCKED");return n;
}
console.log('Passed:',checks(data.rows,match750,routeAnnualPackaging));
