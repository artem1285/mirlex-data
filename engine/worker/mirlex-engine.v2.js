// MIRLEX Engine — stateless MCP + legacy REST. Source-controlled; deploy separately to Cloudflare.
const BASE="https://raw.githubusercontent.com/artem1285/mirlex-data/main/";
const SOURCES={
  core:"engine/rules/universal/universal-gates.v1.json",
  rop:"engine/rules/rop/rop-core.v1.json",
  tests:"engine/tests/rop-core-regression.v1.json",
  carwash:"engine/rules/industry/carwash.v1.json",
  packages:"engine/expert-packages.v1.json",
  registry:"engine/industry-registry.v1.json"
};
const headers={"Cache-Control":"no-store","Access-Control-Allow-Origin":"*"};
const J=(x,s=200)=>Response.json(x,{status:s,headers});
async function read(p){if(!p||p.includes("..")||p.startsWith("/"))throw Error("Invalid path");const r=await fetch(BASE+p,{headers:{"Accept":"application/json"}});if(!r.ok)throw Error("GitHub "+r.status+" "+p);return r.json()}
async function readText(p){if(!p||p.includes("..")||p.startsWith("/"))throw Error("Invalid path");const r=await fetch(BASE+p);if(!r.ok)throw Error("GitHub "+r.status+" "+p);return r.text()}
async function eco(){const [core,registry,packages]=await Promise.all([read(SOURCES.core),read(SOURCES.registry),read(SOURCES.packages)]);return {ok:true,expert:"ECO_EXPERT",engine_version:"v2",core,industry_registry:registry,packages,notice:"58 industry research profiles available through get_industry_research. Executable rules are distinct."}}
async function rop(){const [core,rop,packages]=await Promise.all([read(SOURCES.core),read(SOURCES.rop),read(SOURCES.packages)]);return {ok:true,expert:"ROP_EXPERT",engine_version:"v2",core,rop,packages}}
const TOOLS=[
{name:"get_eco_expert_package",description:"Get universal ECO core and the complete 58-industry research registry.",inputSchema:{type:"object",properties:{}}},
{name:"get_rop_expert_package",description:"Get ROP core and common rules.",inputSchema:{type:"object",properties:{}}},
{name:"get_mirlex_core",description:"Get common MIRLEX rules.",inputSchema:{type:"object",properties:{}}},
{name:"get_rop_tests",description:"Get ROP regression test cases.",inputSchema:{type:"object",properties:{}}},
{name:"get_carwash_rules",description:"Get carwash executable rules.",inputSchema:{type:"object",properties:{}}},
{name:"list_mirlex_industries",description:"List all 58 ECO PARSER industries, stable IDs and rulepack availability.",inputSchema:{type:"object",properties:{}}},
{name:"get_industry_research",description:"Retrieve original MIRLEX research on one industry by stable IND-001..IND-058 ID, including expert passport and three questions. This is research, not an approved legal rulepack.",inputSchema:{type:"object",properties:{industry_id:{type:"string",pattern:"^IND-0[0-5][0-9]$"}},required:["industry_id"]}},
{name:"get_industry_rulepack",description:"Retrieve an executable or draft industry rulepack when one exists; report not_formalized otherwise.",inputSchema:{type:"object",properties:{industry_id:{type:"string"}},required:["industry_id"]}}
];
const ok=(id,result)=>J({jsonrpc:"2.0",id,result});
const err=(id,code,message)=>J({jsonrpc:"2.0",id:id??null,error:{code,message}});
const tool=(data)=>({content:[{type:"text",text:JSON.stringify(data)}],structuredContent:data,isError:false});
function section(md,id){const lines=md.split(/\r?\n/);const start=lines.findIndex(x=>new RegExp("^##\\s+"+id+"\\s+[—-]").test(x));if(start<0)return null;let end=lines.findIndex((x,i)=>i>start&&/^##\s+IND-\d{3}\s+[—-]/.test(x));if(end<0)end=lines.length;return lines.slice(start,end).join("\n").trim()}
async function industry(id){const reg=await read(SOURCES.registry);const row=reg.industries.find(x=>x.id===id);if(!row)return {ok:false,error:"UNKNOWN_INDUSTRY"};const [passports,questions]=await Promise.all([readText(reg.research_sources.passports),readText(reg.research_sources.questions)]);return {ok:true,id,name:row.name,status:"INTERNAL_RESEARCH_NOT_LEGAL_APPROVAL",expert_passport:section(passports,id),questions:section(questions,id),provenance:{passport:reg.research_sources.passports,questions:reg.research_sources.questions},rulepack_status:row.rulepack_status}}
async function call(name,args){switch(name){
case "get_eco_expert_package":return eco();
case "get_rop_expert_package":return rop();
case "get_mirlex_core":return {ok:true,data:await read(SOURCES.core)};
case "get_rop_tests":return {ok:true,data:await read(SOURCES.tests)};
case "get_carwash_rules":return {ok:true,data:await read(SOURCES.carwash)};
case "list_mirlex_industries":return read(SOURCES.registry);
case "get_industry_research":return industry(args?.industry_id);
case "get_industry_rulepack":{const reg=await read(SOURCES.registry);const row=reg.industries.find(x=>x.id===args?.industry_id);if(!row)return {ok:false,error:"UNKNOWN_INDUSTRY"};return row.engine_rulepack?{ok:true,id:row.id,data:await read(row.engine_rulepack)}:{ok:false,id:row.id,status:"NOT_FORMALIZED",research_available:true}}
default:throw Error("Unknown tool "+name)
}}
async function mcp(req){if(req.method==="OPTIONS")return new Response(null,{status:204,headers:{...headers,"Access-Control-Allow-Methods":"POST,GET,DELETE,OPTIONS","Access-Control-Allow-Headers":"content-type,mcp-session-id,mcp-protocol-version,accept"}});if(req.method==="GET")return new Response(null,{status:405,headers:{...headers,Allow:"POST"}});if(req.method==="DELETE")return new Response(null,{status:204,headers});if(req.method!=="POST")return J({error:"METHOD_NOT_ALLOWED"},405);let b;try{b=await req.json()}catch{return err(null,-32700,"Parse error")}if(b.method==="notifications/initialized")return new Response(null,{status:202,headers});if(b.method==="initialize")return ok(b.id,{protocolVersion:"2025-06-18",capabilities:{tools:{listChanged:false}},serverInfo:{name:"mirlex-engine",version:"2.0.0"}});if(b.method==="ping")return ok(b.id,{});if(b.method==="tools/list")return ok(b.id,{tools:TOOLS});if(b.method==="tools/call"){try{return ok(b.id,tool(await call(b.params?.name,b.params?.arguments||{})))}catch(e){return ok(b.id,{content:[{type:"text",text:String(e.message)}],isError:true})}}return err(b.id,-32601,"Method not found")}
export default {async fetch(req){try{const path=new URL(req.url).pathname.replace(/\/+$/,"")||"/";if(path==="/mcp")return mcp(req);if(req.method!=="GET")return J({ok:false,error:"METHOD_NOT_ALLOWED"},405);if(path==="/"||path==="/health")return J({ok:true,service:"MIRLEX Engine",version:"2.0.0",mcp:"/mcp"});const simple={"/v1/core":SOURCES.core,"/v1/rop":SOURCES.rop,"/v1/rop/tests":SOURCES.tests,"/v1/industry/carwash":SOURCES.carwash,"/v1/packages":SOURCES.packages,"/v1/industries":SOURCES.registry};if(simple[path])return J({ok:true,data:await read(simple[path])});if(path==="/v1/expert/eco")return J(await eco());if(path==="/v1/expert/rop")return J(await rop());const match=path.match(/^\/v1\/industry\/research\/(IND-\d{3})$/);if(match)return J(await industry(match[1]));return J({ok:false,error:"NOT_FOUND"},404)}catch(e){return J({ok:false,error:"MIRLEX_ENGINE_ERROR",message:String(e.message)},500)}}};
