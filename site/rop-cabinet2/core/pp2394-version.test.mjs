import {readFileSync} from 'node:fs';
import {select2394Version} from './pp2394-version.mjs';
const d=JSON.parse(readFileSync(new URL('../data/pp2394-versions.staging.json',import.meta.url),'utf8'));
function checks(d,f){let n=0;const eq=(a,b)=>{if(a!==b)throw Error(`${a} != ${b}`);n++};eq(f(d,"2026-04-02",true).version,"2394-pre2027");eq(f(d,"2026-12-31",true).amendments.length,0);eq(f(d,"2027-01-01",true).amendments.join(","),"370,1525");eq(f(d,"2029-12-31",true).version,"2394-2027");eq(f(d,"2030-01-01",true).status,"BLOCKED");eq(f(d,"2023-12-31",true).status,"BLOCKED");eq(f(d,"2026-02-30",true).status,"BLOCKED");eq(f(d,"2027-01-01",false).status,"BLOCKED");eq(f(d,"2027-01-01",true).publicationAllowed,false);return n}
console.log('Passed:',checks(d,select2394Version));
