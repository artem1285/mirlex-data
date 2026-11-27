import assert from 'node:assert/strict';
import {calculateCabinetPreview} from './cabinet-preview.mjs';
const d={years:[2026],groups:{"1":{base:{"2026":10000},table_coefficient:{"2026":1}}}};
const m={organizationId:"o",productKey:"p",table:"T1",year:2026,scopeVerified:true,massEvidenceVerified:true,normVerified:true,grossKg:"200000",exportKg:"50000",componentsKg:"0",normPercent:50,exportEvidenceVerified:true,secondaryMode:"none"};
const r={id:"a",organizationId:"o",productKey:"p",year:2026,priorYear:2025,group:1,groupScopeVerified:true,route:"PP742_APP1",formId:"APP1_T1",formRouteVerified:true,currentKg:"50000",priorKg:"20000",identityVerified:true,priorReportVerified:true,currentMassVerified:true,evidenceVerified:true,allocationVerified:true,massInput:m};
const b={organizationId:"o",year:2026,serverEvidenceVerified:true,rows:[r],decisions:[]};
const p=calculateCabinetPreview(b,d);
assert.equal(p.status,"STAGING_SETTLEMENT");
assert.equal(p.details[0].requiredKg,"75000");
assert.equal(p.details[0].feeMassKg,"5000");
assert.equal(p.totalPayableKopecks,"5000000");
assert.equal(p.publicationAllowed,false);
assert.equal(calculateCabinetPreview({...b,rows:[{...r,requiredKg:"1"}]},d).reason,"REQUIRED_MASS_CONFLICT");
assert.equal(calculateCabinetPreview({...b,rows:[{...r,massInput:{...m,productKey:"other"}}]},d).reason,"MASS_SCOPE_CONFLICT");
assert.equal(calculateCabinetPreview({...b,rows:[{...r,massInput:{...m,exportEvidenceVerified:false}}]},d).status,"BLOCKED");
assert.equal(calculateCabinetPreview({...b,rows:[{...r,massInput:{...m,grossKg:"200001"}}]},d).reason,"MASS_ROUNDING_REVIEW");

const sm={...m,grossKg:"100000",exportKg:"0",secondaryMode:"confirmed",secondary:{organizationId:"o",productKey:"p",year:2026,section:1,origin:"production_rf",baseMassGrams:"100000000",normPercent:50,materials:[{id:"a",kind:"primary",usedGrams:"70000000",verified:true},{id:"b",kind:"secondary",usedGrams:"30000000",verified:true,origin:"RF",alreadyCredited:false}],confirmation:{kind:"ROP_1991",reference:"test",verified:true,organizationId:"o",productKey:"p",year:2026,confirmedBaseGrams:"100000000",eligibleGrams:"30000000",totalGrams:"100000000",date:"2027-03-01"}}};
const sr={...r,formId:"APP1_T2",secondaryReportMappingVerified:true,massInput:sm,currentKg:"10000",priorKg:"0"};
const sp=calculateCabinetPreview({...b,rows:[sr]},d);
assert.equal(sp.status,"STAGING_SETTLEMENT");
assert.equal(sp.details[0].requiredKg,"35000");
assert.equal(sp.totalPayableKopecks,"25000000");
assert.equal(sp.massDetails[0].secondaryFields.confirmationReference,"test");
assert.equal(calculateCabinetPreview({...b,rows:[{...sr,formId:"APP1_T1"}]},d).reason,"SECONDARY_REPORT_ROWS_REVIEW");
assert.equal(calculateCabinetPreview({...b,rows:[{...sr,secondaryReportMappingVerified:false}]},d).status,"BLOCKED");

console.log("15 assertions passed");

const pm={...sm,normPercent:75,secondary:{...sm.secondary,section:2,normPercent:75}};
const pp=calculateCabinetPreview({...b,rows:[{...sr,massInput:pm}]},d);
assert.equal(pp.status,"STAGING_SETTLEMENT");
assert.equal(pp.details[0].requiredKg,"52500");
assert.equal(pp.totalPayableKopecks,"42500000");
assert.equal(pp.massDetails[0].secondaryFields.section,2);
assert.equal(calculateCabinetPreview({...b,rows:[{...sr,massInput:{...pm,normPercent:50,secondary:{...pm.secondary,normPercent:50}}}]},d).status,"BLOCKED");
