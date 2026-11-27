// Pure conservative allocation guard; no legal recognition of ROP recycling.
export function assessAllocation(input) {
 const deny = reason => ({status:'REVIEW_REQUIRED',reason,creditedKg:null,publicationAllowed:false});
 if (!input || !Array.isArray(input.allocations) || !Array.isArray(input.evidence)) return deny('INVALID_INPUT');
 const parse = s => {
   if (typeof s !== 'string' || !/^(?:0|[1-9]\d{0,11})(?:\.\d{1,3})?$/.test(s)) return null;
   const [whole,frac=''] = s.split('.');
   const value = BigInt(whole)*1000n + BigInt(frac.padEnd(3,'0'));
   return value > 0n ? value : null;
 };
 const source = new Map();
 for (const e of input.evidence) {
   if (!e || typeof e.id !== 'string' || !e.id || source.has(e.id)) return deny('DUPLICATE_EVIDENCE');
   const mass = parse(e.maximumKg);
   if (mass === null || e.officialVerified !== true || e.registryVerified !== true || e.classificationVerified !== true || e.legalPeriodVerified !== true || e.documentVerified !== true) return deny('UNVERIFIED_EVIDENCE');
   source.set(e.id,{mass,allocated:0n});
 }
 const ids = new Set();
 for (const a of input.allocations) {
   if (!a || typeof a.id !== 'string' || !a.id || ids.has(a.id)) return deny('DUPLICATE_ALLOCATION');
   ids.add(a.id);
   const item = source.get(a.evidenceId), mass = parse(a.kg);
   if (!item || mass === null || !Number.isInteger(a.reportingYear) || a.reportingYear < 2024 || a.reportingYear > 2100 || typeof a.obligationId !== 'string' || !a.obligationId) return deny('INVALID_ALLOCATION');
   if (a.periodEligibilityVerified !== true || a.groupEligibilityVerified !== true || a.carryoverEligibilityVerified !== true || a.externalPriorUseChecked !== true) return deny('ELIGIBILITY_NOT_VERIFIED');
   item.allocated += mass;
   if (item.allocated > item.mass) return deny('OVER_ALLOCATED');
 }
 if (input.serverReservationVerified !== true) return deny('SERVER_RESERVATION_REQUIRED');
 return {status:'STAGING_ALLOCATION_CONSISTENT',creditedKg:null,publicationAllowed:false,requiresLegalMassCalculation:true};
}
