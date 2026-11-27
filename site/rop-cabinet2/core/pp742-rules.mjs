// PP 742 routing; staging only. No official report submission.
export function route742({origin, eventDate, reportingYear, legacyTransitionConfirmed=false, experimentStatus="unknown"}) {
 const bad=(reason)=>({status:"BLOCKED",reason});
 if (!Number.isInteger(reportingYear)||reportingYear<2024||reportingYear>2030||typeof eventDate!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)||Number.isNaN(Date.parse(eventDate+"T00:00:00Z"))||new Date(eventDate+"T00:00:00Z").toISOString().slice(0,10)!==eventDate) return bad("INVALID_DATE_OR_YEAR");
 if (!["production_rf","import_eaeu","import_non_eaeu"].includes(origin)) return bad("INVALID_ORIGIN");
 if (origin==="production_rf"||origin==="import_eaeu") return {status:"ROUTE",form:"PP742_APPENDIX_1",reason:"GENERAL"};
 if (eventDate<"2024-01-01") return bad("LEGACY_BEFORE_SCOPE");
 if (eventDate<"2026-01-01") return legacyTransitionConfirmed===true?{status:"ROUTE",form:"PP742_APPENDIX_1",reason:"CONFIRMED_TRANSITION"}:bad("LEGACY_TRANSITION_UNVERIFIED");
 if (eventDate<"2028-01-01") {
   if (experimentStatus==="not_applicable" && legacyTransitionConfirmed===true && reportingYear>=2026 && reportingYear<=2027 && Number(eventDate.slice(0,4))===reportingYear) return {status:"ROUTE",form:"PP742_APPENDIX_1",reason:"PP650_CONFIRMED_TRANSITION"};
   if (experimentStatus==="applicable") return {status:"BLOCKED",reason:"PP750_SPECIAL_ROUTE_REQUIRES_VERIFICATION"};
   return bad("NON_EAEU_TRANSITION_RULE_REQUIRES_VERIFICATION");
 }
 if (experimentStatus==="unknown") return bad("EXPERIMENT_STATUS_UNVERIFIED");
 return {status:"ROUTE",form:"PP742_APPENDIX_2",reason:"POST_SUSPENSION_REVIEW_REQUIRED",finalLegalReviewRequired:true};
}
export function check742Act({periodStart,periodEnd,submissionDate,actDate,recyclingDate,external,contractPresent,actPresent,recyclerExcludedOn=null}) {
 const bad=(reason)=>({status:"BLOCKED",reason});
 const dates=[periodStart,periodEnd,submissionDate,actDate,recyclingDate,...(recyclerExcludedOn?[recyclerExcludedOn]:[])];
 if (dates.some(s=>typeof s!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(s)||Number.isNaN(Date.parse(s+"T00:00:00Z"))||new Date(s+"T00:00:00Z").toISOString().slice(0,10)!==s)) return bad("INVALID_DATE");
 if(periodStart>periodEnd||submissionDate<periodEnd) return bad("INVALID_PERIOD");
 if(!actPresent) return bad("ACT_REQUIRED");
 if(external===true&&!contractPresent) return bad("CONTRACT_REQUIRED");
 if(actDate<periodStart||actDate>submissionDate) return bad("ACT_OUTSIDE_ALLOWED_DATES");
 if(recyclingDate<periodStart||recyclingDate>periodEnd) return bad("RECYCLING_OUTSIDE_REPORTING_YEAR");
 if(recyclerExcludedOn&&actDate>recyclerExcludedOn) return bad("ACT_AFTER_RECYCLER_EXCLUSION");
 return {status:"PRELIMINARY_PASS",legalVerificationRequired:true};
}
