// Staging only. No official report or final debt calculation. Evidence must be obtained by trusted server, never asserted by browser.
export function lookupRate(data, year, group, tyreEvidence) {
  if (!Number.isInteger(year) || !Number.isInteger(group) || !data?.years?.includes(year) || !Object.hasOwn(data.groups || {}, String(group))) return {status:"BLOCKED",reason:"RATE_NOT_AVAILABLE"};
  const row = data.groups[String(group)], base = row.base[String(year)];
  let coefficient = row.table_coefficient[String(year)];
  if (group===5 && year>=2026) {
    if (tyreEvidence?.verified!==true || typeof tyreEvidence.specialRuleApplies!=="boolean") return {status:"BLOCKED",reason:"TYRE_SCOPE_UNVERIFIED"};
    if (!tyreEvidence.specialRuleApplies) coefficient=1;
    else if (tyreEvidence.officialCertificateData==="present") coefficient=1;
    else if (tyreEvidence.officialCertificateData==="absent") coefficient=18;
    else return {status:"BLOCKED",reason:"TYRE_CERTIFICATE_DATA_UNVERIFIED"};
  }
  if (!Number.isFinite(base)||base<=0||!Number.isFinite(coefficient)||coefficient<=0) return {status:"BLOCKED",reason:"INVALID_RATE"};
  return {status:"STAGING_RATE",year,group,baseRubPerTonne:base,coefficient,rateRubPerTonne:base*coefficient,revision:data.revision,publicationAllowed:false};
}

export function compareCosts(rate, remainingKg, plannedCreditedKg, quoteRubPerCreditedTonne, additionalRub=0) {
  if (rate?.status!=="STAGING_RATE" || ![remainingKg,plannedCreditedKg,quoteRubPerCreditedTonne,additionalRub].every(x=>typeof x==="number"&&Number.isFinite(x)&&x>=0)||plannedCreditedKg>remainingKg) return {status:"BLOCKED",reason:"INVALID_COMPARISON_INPUT"};
  if (plannedCreditedKg>0 && quoteRubPerCreditedTonne===0) return {status:"BLOCKED",reason:"QUOTE_REQUIRED"};
  const feeOnly=remainingKg*rate.rateRubPerTonne/1000;
  const recycling=plannedCreditedKg*quoteRubPerCreditedTonne/1000+(plannedCreditedKg>0?additionalRub:0);
  const residualFee=(remainingKg-plannedCreditedKg)*rate.rateRubPerTonne/1000;
  const total=recycling+residualFee;
  if (![feeOnly,recycling,residualFee,total].every(Number.isFinite)) return {status:"BLOCKED",reason:"NUMERIC_OVERFLOW"};
  return {status:"PRELIMINARY",feeOnlyRub:feeOnly,recyclingRub:recycling,residualFeeRub:residualFee,totalRub:total,potentialSavingsRub:feeOnly-total,updatesOfficialReport:false};
}
