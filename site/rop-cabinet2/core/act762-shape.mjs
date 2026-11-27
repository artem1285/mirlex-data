// Conservative structural checks only; not signature, registry, classification or legal validation.
export function validateActShape(act){
 const issues=[];const add=(path,reason)=>issues.push({path,reason});const nonempty=x=>typeof x==="string"&&x.trim().length>0;
 const date=x=>typeof x==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x))&&new Date(x).toISOString().slice(0,10)===x;
 const mass=x=>typeof x==="string"&&/^\d{1,15}(?:[.,]\d{1,6})?$/.test(x)&&Number(x.replace(",","."))>0;
 const okpd=x=>typeof x==="string"&&/^\d{2}\.\d{2}\.\d{2}\.\d{3}$/.test(x);
 if(!act||typeof act!=="object")return {status:"BLOCKED",issues:[{path:"act",reason:"INVALID"}],publicationAllowed:false};
 for(const k of ["actNumber","place","executorIdentity","executorInn","executorOgrn","executorOkved","executorOkato","executorRegisteredAddress","executorRepresentative","executorAuthority","licenseDetailsOrNotRequired"])if(!nonempty(act[k]))add(k,"REQUIRED");
 for(const k of ["actDate","periodStart","periodEnd"])if(!date(act[k]))add(k,"INVALID_DATE");
 if(date(act.actDate)&& (act.actDate<"2024-03-01"||act.actDate>="2030-03-01"))add("actDate","FORM_VERSION_REVIEW");
 if(date(act.periodStart)&&date(act.periodEnd)&&act.periodStart>act.periodEnd)add("periodEnd","REVERSED_PERIOD");
 if(typeof act.ownInfrastructure!=="boolean")add("ownInfrastructure","REQUIRED");
 if(act.ownInfrastructure===false){for(const k of ["customerIdentity","customerInn","customerOgrn","customerOkved","customerOkato","customerRegisteredAddress","customerRepresentative","customerAuthority","contractNumber"])if(!nonempty(act[k]))add(k,"REQUIRED");if(!date(act.contractDate))add("contractDate","INVALID_DATE");if(!["producer","importer","both"].includes(act.customerRole))add("customerRole","REQUIRED");}
 if(!Array.isArray(act.sites)||!act.sites.length)add("sites","REQUIRED");
 const ids=new Set();
 for(const [i,s] of (Array.isArray(act.sites)?act.sites:[]).entries()){
 const path=`sites.${i}`;
 if(!s||typeof s!=="object"){add(path,"INVALID");continue;}
 for(const k of ["siteAddress","siteCadastralNumber","siteOktmo"])if(!nonempty(s[k]))add(`${path}.${k}`,"REQUIRED_OR_REVIEW");
 if(!Array.isArray(s.rows)||!s.rows.length)add(`${path}.rows`,"REQUIRED");
 for(const [j,r] of (Array.isArray(s.rows)?s.rows:[]).entries()){
 const p=`${path}.rows.${j}`;
 if(!r||typeof r!=="object"){add(p,"INVALID");continue;}
 if(!nonempty(r.id)||ids.has(r.id))add(`${p}.id`,"DUPLICATE_OR_MISSING");ids.add(r.id);
 for(const k of ["inputName","productName","standardDocument"])if(!nonempty(r[k]))add(`${p}.${k}`,"REQUIRED");
 if(!Number.isInteger(r.ropGroup)||r.ropGroup<1||r.ropGroup>52)add(`${p}.ropGroup`,"INVALID_GROUP");
 for(const k of ["acceptedKg","productKg"])if(!mass(r[k]))add(`${p}.${k}`,"INVALID_MASS");
 if(!okpd(r.productOkpd2))add(`${p}.productOkpd2`,"CODE_REVIEW");
 if(r.inputKind==="waste"){
 const c=typeof r.inputCode==="string"?r.inputCode.replace(/\s/g,""):"";
 if(!/^\d{10}[1-5]$/.test(c)||Number(c.slice(-1))!==r.hazardClass)add(`${p}.inputCode`,"FKKO_CLASS_REVIEW");
 const sec=[r.secondaryName,r.secondaryOkpd2,r.secondaryUsedKg];if(sec.some(x=>x!=null&&x!=="")&&(!nonempty(r.secondaryName)||!okpd(r.secondaryOkpd2)||!mass(r.secondaryUsedKg)))add(`${p}.secondary`,"INCOMPLETE");
 }else if(r.inputKind==="secondary"){if(!okpd(r.inputCode))add(`${p}.inputCode`,"CODE_REVIEW");if([r.hazardClass,r.secondaryName,r.secondaryOkpd2,r.secondaryUsedKg].some(x=>x!=null&&x!==""))add(p,"SECONDARY_INPUT_FIELDS_MUST_BE_BLANK");}
 else add(`${p}.inputKind`,"REQUIRED");
 }
 }
 return {status:issues.length?"BLOCKED":"STAGING_SHAPE_PASS",issues,publicationAllowed:false,creditedMass:null,requiresRegistryAndLegalEvidence:true};
}
