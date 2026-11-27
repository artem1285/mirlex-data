import {verifiedCabinetPreview} from './verified-cabinet-preview.mjs';
// Protected backend entry point: only authenticated server records enter the calculator.
// The request contains opaque identifiers, never browser-supplied statutory flags or masses.
const deny=reason=>({status:"BLOCKED",reason,publicationAllowed:false,officialReportAllowed:false});
const safe=s=>typeof s==="string"&&/^[a-zA-Z0-9._:-]{1,160}$/.test(s);
export async function serverCabinetPreview(request,loadTrustedContext,resolveDocument){
 if(!request||!safe(request.organizationId)||!Number.isInteger(request.year)||!Array.isArray(request.rowIds)||request.rowIds.length===0||request.rowIds.length>1000||request.rowIds.some(id=>!safe(id))||new Set(request.rowIds).size!==request.rowIds.length||typeof loadTrustedContext!=="function"||typeof resolveDocument!=="function")return deny("SERVER_REQUEST_INVALID");
 let trusted;
 try{trusted=await loadTrustedContext(Object.freeze({organizationId:request.organizationId,year:request.year,rowIds:Object.freeze([...request.rowIds])}));}
 catch{return deny("SERVER_CONTEXT_LOAD_ERROR");}
 if(!trusted||trusted.authenticated!==true||trusted.organizationId!==request.organizationId||trusted.year!==request.year||!Array.isArray(trusted.rows)||trusted.rows.length!==request.rowIds.length||!trusted.rateData||!Array.isArray(trusted.decisions))return deny("SERVER_CONTEXT_REJECTED");
 const ids=new Set(request.rowIds);
 if(trusted.rows.some(r=>!r||!ids.has(r.id)||r.organizationId!==request.organizationId||r.year!==request.year)||new Set(trusted.rows.map(r=>r.id)).size!==ids.size)return deny("SERVER_ROW_SCOPE_REJECTED");
 // Explicit allowlist prevents accidental copying of browser-provided flags.
 const serverInput={organizationId:trusted.organizationId,year:trusted.year,rows:trusted.rows,decisions:trusted.decisions,serverEvidenceVerified:false};
 const result=await verifiedCabinetPreview(serverInput,trusted.rateData,resolveDocument);
 return {...result,publicationAllowed:false,officialReportAllowed:false,requiresAuthenticatedBackend:true};
}
