import {annualPreview} from './annual-preview.mjs';
import {experiment750,experimentFee1990} from './experiment-core.mjs';
import {allocateOffset} from './offset1990.mjs';
import {lookupRate} from './rate-core.mjs';
// Internal preview only. All evidence must be verified server-side.
export function settlementPreview(input,rateData){
 const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false});
 if(!input?.organizationId||!Number.isInteger(input.year)||input.serverEvidenceVerified!==true||!Array.isArray(input.rows)||!input.rows.length||!Array.isArray(input.decisions))return deny("CONTEXT_REQUIRED");
 const ids=new Set(), totals=new Map(), details=[];
 for(const r of input.rows){
  if(!r?.id||ids.has(r.id)||r.organizationId!==input.organizationId||r.year!==input.year||r.formRouteVerified!==true)return deny("ROW_IDENTITY_OR_ROUTE");
  ids.add(r.id);
  let fee,form;
  if(r.route==="PP742_APP1"){
   if(!["APP1_T1","APP1_T2","APP1_T3"].includes(r.formId))return deny("FORM_ROUTE_CONFLICT");
   const p=annualPreview(r,rateData);if(p.status!=="STAGING_PREVIEW")return deny(p.reason);
   fee=p.grossFeeKopecks;form=r.formId;details.push({id:r.id,...p});
  }else if(r.route==="PP750"){
   if(!["APP3_T1","APP3_T2"].includes(r.formId)||r.shipmentScopeVerified!==true||r.annualAggregationVerified!==true||r.massEvidenceVerified!==true)return deny("EXPERIMENT_SCOPE_REQUIRED");
   if(!r.shipment||r.shipment.releaseDate?.slice(0,4)!==String(input.year))return deny("SHIPMENT_YEAR_CONFLICT");
   const scope=experiment750(r.shipment);if(scope.status!=="APPLICABLE")return deny("EXPERIMENT_ROUTE_CONFLICT");
   const rate=lookupRate(rateData,input.year,r.group,r.tyreEvidence);
   if(rate.status!=="STAGING_RATE")return deny(rate.reason);
   const p=experimentFee1990({...r.experimentAmounts,rateKopecksPerTonne:rate.rateRubPerTonne*100,verified:true});
   if(p.status!=="STAGING_CALCULATION")return deny(p.reason);
   fee=p.feeAfterDeduction;form=r.formId;details.push({id:r.id,...p});
  }else return deny("UNSUPPORTED_ROUTE");
  const n=BigInt(fee.numerator),d=BigInt(fee.denominator);
  if(d<=0n||n<0n)return deny("INVALID_FEE");
  const t=totals.get(form)||[0n,1n];totals.set(form,[t[0]*d+n*t[1],t[1]*d]);
 }
 const forms=[];
 for(const [id,[n,d]] of totals){
  // Do not guess rounding; only exact whole kopeck totals admitted.
  if(n%d!==0n||n/d>BigInt(Number.MAX_SAFE_INTEGER))return deny("ROUNDING_OR_PRECISION_REVIEW");
  forms.push({id,grossKopecks:Number(n/d)});
 }
 const offset=allocateOffset({organizationId:input.organizationId,year:input.year,forms,decisions:input.decisions});
 if(offset.status!=="STAGING")return deny(offset.reason);
 return {status:"STAGING_SETTLEMENT",details,forms:offset.forms,totalPayableKopecks:offset.forms.reduce((s,f)=>s+BigInt(f.payableKopecks),0n).toString(),publicationAllowed:false,officialReportAllowed:false,requiresPersistentReservation:true};
}
