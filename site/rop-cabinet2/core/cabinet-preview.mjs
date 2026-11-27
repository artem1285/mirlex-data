import {deriveAnnualMass} from './annual-mass.mjs';
import {secondaryReportFields} from './secondary-report-fields.mjs';
import {settlementPreview} from './settlement-preview.mjs';
// Internal staging only. No official report, no production or browser trust.
export function calculateCabinetPreview(input,rateData){
 const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false});
 if(!input?.organizationId||!Number.isInteger(input.year)||input.serverEvidenceVerified!==true||!Array.isArray(input.rows)||!input.rows.length)return deny("CONTEXT_REQUIRED");
 const rows=[],massDetails=[];
 for(const row of input.rows){
  if(!row||row.organizationId!==input.organizationId||row.year!==input.year)return deny("ROW_IDENTITY_CONFLICT");
  if(row.route==="PP742_APP1"){
   const m=row.massInput;
   if(!m||m.organizationId!==row.organizationId||m.year!==row.year||m.productKey!==row.productKey||row.groupScopeVerified!==true)return deny("MASS_SCOPE_CONFLICT");
   const result=deriveAnnualMass(m);
   if(result.status!=="STAGING_MASS")return deny(result.reason);
   // No guessed statutory rounding or combining distinct report rows.
   let secondaryFields=null;
   if(result.requiresSeparateReportRows){
    if(row.formId!=="APP1_T2"||row.secondaryReportMappingVerified!==true)return deny("SECONDARY_REPORT_ROWS_REVIEW");
    secondaryFields=secondaryReportFields(m);
    if(secondaryFields.status!=="STAGING_FIELDS")return deny(secondaryFields.reason);
   }
   const n=BigInt(result.requiredKg.numerator),d=BigInt(result.requiredKg.denominator);
   if(d<=0n||n%d!==0n)return deny("MASS_ROUNDING_REVIEW");
   const requiredKg=String(n/d);
   if(row.requiredKg!=null&&row.requiredKg!==requiredKg)return deny("REQUIRED_MASS_CONFLICT");
   rows.push({...row,requiredKg,normMassVerified:true});
   massDetails.push({id:row.id,...result,secondaryFields});
  }else if(row.route==="PP750")rows.push(row);
  else return deny("UNSUPPORTED_ROUTE");
 }
 const result=settlementPreview({...input,rows},rateData);
 if(result.status!=="STAGING_SETTLEMENT")return deny(result.reason);
 return {...result,massDetails,publicationAllowed:false,officialReportAllowed:false};
}
