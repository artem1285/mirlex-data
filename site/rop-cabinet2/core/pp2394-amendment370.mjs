// Partial override checks, not a complete PP2394 classifier.
export function check370({group,kind,code,date,scopeVerified,cadmiumOxide}){
 if(!Number.isInteger(group)||typeof code!=="string"||!["waste","secondary","product"].includes(kind)||typeof date!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date||scopeVerified!==true)return {status:"BLOCKED"};
 if(date<"2027-01-01"||kind!=="product")return {status:"NO_370_OVERRIDE"};
 if(date>="2030-01-01")return {status:"BLOCKED"};
 if([17,22,23,24,25,26,27,32,35,36,37,38,39,40,41,42,43,44,48,52].includes(group)&&code==="22.23.19.190")return {status:"EXCLUDED_FROM_AMENDED_POSITION",otherPositionsReview:true};
 if([7,16].includes(group)&&code==="20.16.10.115")return {status:"OLD_POSITION_REPLACED",otherPositionsReview:true};
 if([11,13].includes(group)&&code==="20.12.19.110")return {status:cadmiumOxide===true?"CANDIDATE":cadmiumOxide===false?"EXCLUDED_FROM_AMENDED_POSITION":"BLOCKED",publicationAllowed:false};
 return {status:"FULL_DATASET_REVIEW_REQUIRED"};
}
