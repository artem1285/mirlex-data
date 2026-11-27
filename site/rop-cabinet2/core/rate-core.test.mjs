import {readFileSync} from 'node:fs';
import {lookupRate,compareCosts} from './rate-core.mjs';
const data=JSON.parse(readFileSync(new URL('../data/pp1041.v2026-03-11.json',import.meta.url),'utf8'));
function verify(data,rate,compare) {
  const tests=[];
  const check=(name,ok)=>{tests.push({name,passed:!!ok});if(!ok)throw Error(name)};
  check("all 52 groups",Object.keys(data.groups).length===52&&Array.from({length:52},(_,i)=>i+1).every(g=>Object.hasOwn(data.groups,g)));
  for (const y of [2025,2026,2027]) for(let g=1;g<=52;g++) {
    const t=rate(data,y,g,{verified:true,specialRuleApplies:true,officialCertificateData:"absent"});
    check(`${y}/${g} rate finite`,t.status==="STAGING_RATE"&&Number.isFinite(t.rateRubPerTonne)&&t.rateRubPerTonne>0);
  }
  check("2026 group 19",rate(data,2026,19).rateRubPerTonne===2953);
  check("2026 group 37",rate(data,2026,37).rateRubPerTonne===9548);
  check("2027 group 37",rate(data,2027,37).rateRubPerTonne===14895);
  check("2025 group 5",rate(data,2025,5).rateRubPerTonne===10310);
  check("2026 group 5 needs evidence",rate(data,2026,5).status==="BLOCKED");
  check("2026 group 5 unverified certificate",rate(data,2026,5,{verified:true,specialRuleApplies:true}).status==="BLOCKED");
  check("2026 group 5 no official certificate",rate(data,2026,5,{verified:true,specialRuleApplies:true,officialCertificateData:"absent"}).rateRubPerTonne===200430);
  check("2026 group 5 with official certificate",rate(data,2026,5,{verified:true,specialRuleApplies:true,officialCertificateData:"present"}).rateRubPerTonne===11135);
  check("2026 group 5 not in special scope",rate(data,2026,5,{verified:true,specialRuleApplies:false}).rateRubPerTonne===11135);
  check("unknown year rejected",rate(data,2028,19).status==="BLOCKED");
  check("unknown group rejected",rate(data,2026,53).status==="BLOCKED");
  const r=rate(data,2026,37);
  check("pay all",compare(r,10000,0,0).totalRub===95480);
  check("recycle all",compare(r,10000,10000,5000).totalRub===50000);
  check("mixed",compare(r,10000,4000,5000,1000).totalRub===78288);
  check("excess planned rejected",compare(r,10000,10001,5000).status==="BLOCKED");
  check("missing quote rejected",compare(r,10000,4000,0).status==="BLOCKED");
  check("negative rejected",compare(r,-1,0,0).status==="BLOCKED");
  check("never alters report",compare(r,10000,4000,5000).updatesOfficialReport===false);
  return tests;
}
console.log('Passed:',verify(data,lookupRate,compareCosts).length);
