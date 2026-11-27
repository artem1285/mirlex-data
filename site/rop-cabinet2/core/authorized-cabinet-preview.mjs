import {serverCabinetPreview} from './server-cabinet-preview.mjs';
import {principalContextLoader} from './principal-context-loader.mjs';
// The protected transport must supply the principal from verified server session,
// never from request JSON. This wrapper does not implement session authentication.
const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false,officialReportAllowed:false});
const safe=s=>typeof s==="string"&&/^[a-zA-Z0-9._:-]{1,160}$/.test(s);
export async function authorizedCabinetPreview(request,principal,authorize,loadTrustedContext,resolveDocument){
 if(!request||!principal||!safe(principal.subjectId)||typeof authorize!=="function")return deny("AUTHENTICATED_PRINCIPAL_REQUIRED");
 if(!safe(request.organizationId)||!Number.isInteger(request.year)||!Array.isArray(request.rowIds))return deny("SERVER_REQUEST_INVALID");
 let allowed;
 try{
  allowed=await authorize(Object.freeze({subjectId:principal.subjectId,organizationId:request.organizationId,year:request.year,permission:"rop:preview"}));
 }catch{return deny("AUTHORIZATION_CHECK_ERROR");}
 if(allowed!==true)return deny("ORGANIZATION_ACCESS_DENIED");
 // Re-authorize and bind the principal when loading trusted rows, not just at entry.
 let scopedLoader;
 try{scopedLoader=await principalContextLoader(principal,authorize,loadTrustedContext);}
 catch{return deny("SERVER_PRINCIPAL_CONTEXT_REQUIRED");}
 return serverCabinetPreview(request,scopedLoader,resolveDocument);
}
