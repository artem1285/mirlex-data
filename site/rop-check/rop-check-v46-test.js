(function(){const mount=document.getElementById("mirlex-rop-check-test-mount");if(!mount||mount.dataset.loaded)return;mount.dataset.loaded="1";mount.innerHTML="<style>\n#mirlex-rop-check-v37{background:#1F2A32;padding:72px 20px;font-family:Inter,Arial,sans-serif;color:#fff}\n#mirlex-rop-check-v37 *{box-sizing:border-box}\n.mr12-wrap{max-width:1120px;margin:0 auto}\n.mr12-label{font-size:12px;line-height:1.4;letter-spacing:.14em;text-transform:uppercase;color:#3CB371;margin-bottom:14px;font-weight:600}\n.mr12-title{font-size:40px;line-height:1.12;font-weight:600;margin:0 0 14px;color:#fff}\n.mr12-text{max-width:820px;margin:0 0 26px;font-size:17px;line-height:1.55;color:rgba(255,255,255,.72)}\n.mr37-source-state{font-size:12px;line-height:1.5;color:rgba(255,255,255,.48);margin-bottom:18px}\n.mr37-source-state.ok{color:#77d3a2}\n.mr37-source-state.err{color:#f0b5a9}\n.mr12-search{display:flex;gap:12px;max-width:920px}\n.mr12-input{width:100%;height:58px;border:1px solid rgba(255,255,255,.22);border-radius:8px;background:#fff;color:#1F2A32;font:16px Inter,Arial,sans-serif;padding:0 18px;outline:none}\n.mr12-input:focus{border-color:#3CB371;box-shadow:0 0 0 2px rgba(60,179,113,.15)}\n.mr12-input:disabled{opacity:.65;cursor:not-allowed}\n.mr12-button{height:58px;min-width:150px;border:0;border-radius:8px;background:#3CB371;color:#fff;padding:0 24px;font:600 15px Inter,Arial,sans-serif;cursor:pointer}\n.mr12-button:disabled{opacity:.55;cursor:not-allowed}\n.mr12-hint{margin-top:12px;font-size:13px;line-height:1.5;color:rgba(255,255,255,.48)}\n.mr37-result{margin-top:34px;display:none}\n.mr37-result.show{display:block}\n.mr12-card{background:#fff;color:#1F2A32;border-radius:10px;padding:28px;margin-bottom:14px}\n.mr12-status{font-size:12px;line-height:1.4;text-transform:uppercase;letter-spacing:.12em;color:#3CB371;font-weight:700;margin-bottom:10px}\n.mr12-rtitle{font-size:24px;line-height:1.25;font-weight:600;margin-bottom:18px}\n.mr12-row{padding:13px 0;border-top:1px solid #E6EBED}\n.mr12-row:first-of-type{border-top:0}\n.mr12-row-label{font-size:12px;color:#73808A;margin-bottom:5px;text-transform:uppercase;letter-spacing:.06em}\n.mr12-row-value{font-size:16px;line-height:1.45}\n.mr12-norms{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:10px}\n.mr12-norm{border:1px solid #E6EBED;border-radius:8px;padding:14px}\n.mr12-year{font-size:12px;color:#73808A;margin-bottom:5px}\n.mr12-pct{font-size:22px;font-weight:600}\n.mr12-warning{margin-top:18px;padding:15px 17px;border-left:3px solid #3CB371;background:#F4F7F6;font-size:14px;line-height:1.55}\n.mr12-choice{width:100%;border:1px solid #E6EBED;background:#fff;border-radius:8px;padding:16px;margin-top:10px;text-align:left;cursor:pointer;font-family:inherit;color:#1F2A32}\n.mr12-choice:hover{border-color:#3CB371}\n.mr12-choice-name{display:block;font-size:15px;line-height:1.4;font-weight:600}\n.mr12-choice-meta{display:block;font-size:12px;line-height:1.5;color:#73808A;margin-top:5px}\n.mr12-badge{display:inline-block;margin-top:8px;padding:4px 8px;border-radius:5px;background:#F4F7F6;color:#52616B;font-size:11px;line-height:1.3;font-weight:600}\n.mr12-badge.safe{background:#EAF7F0;color:#23764A}\n.mr12-badge.check{background:#FFF7E8;color:#8A6418}\n.mr12-unresolved{margin-top:12px;padding:15px 17px;border:1px solid #E4D7B6;border-radius:8px;background:#FFF9EC;font-size:14px;line-height:1.55}\n.mr12-source-link{color:#288a55;text-decoration:none;border-bottom:1px solid rgba(40,138,85,.3)}\n.mr12-source-link:hover{border-bottom-color:#288a55}\n.mr12-row-value,.mr12-choice-name,.mr12-choice-meta,.mr12-warning,.mr12-rtitle{\n  overflow-wrap:anywhere;\n  word-break:normal;\n}\n.mr12-back{display:inline-block;margin:0 0 20px;padding:0;border:0;background:transparent;color:#288a55;font:600 14px Inter,Arial,sans-serif;cursor:pointer}\n.mr12-back:hover{text-decoration:underline}\n@media(max-width:960px){\n  #mirlex-rop-check-v37{padding:64px 20px}\n  .mr12-wrap{max-width:100%}\n  .mr12-title{font-size:36px}\n  .mr12-text{max-width:760px}\n  .mr12-search{max-width:100%}\n}\n\n@media(max-width:640px){\n  #mirlex-rop-check-v37{padding:52px 16px}\n  .mr12-title{font-size:30px;line-height:1.16}\n  .mr12-text{font-size:16px}\n  .mr12-search{display:block}\n  .mr12-input{height:56px;font-size:16px}\n  .mr12-button{width:100%;height:54px;margin-top:10px}\n  .mr12-card{padding:20px}\n  .mr12-rtitle{font-size:21px}\n  .mr12-row-value{font-size:15px;overflow-wrap:anywhere;word-break:break-word}\n  .mr12-choice{padding:14px}\n  .mr12-choice-name{font-size:14px}\n  .mr12-choice-meta{overflow-wrap:anywhere;word-break:break-word}\n  .mr12-warning{font-size:13px;padding:14px 15px}\n  .mr12-back{font-size:13px;line-height:1.4}\n  .mr12-norms{grid-template-columns:repeat(2,minmax(0,1fr))}\n  .mr12-norm{min-width:0;padding:12px}\n  .mr12-pct{font-size:20px}\n}\n\n@media(max-width:480px){\n  #mirlex-rop-check-v37{padding:44px 14px}\n  .mr12-title{font-size:27px}\n  .mr12-label{font-size:11px}\n  .mr12-text{font-size:15px;line-height:1.5}\n  .mr37-source-state{font-size:11px}\n  .mr12-hint{font-size:12px}\n  .mr12-card{padding:18px;border-radius:8px}\n  .mr12-rtitle{font-size:19px}\n  .mr12-row{padding:12px 0}\n  .mr12-row-label{font-size:11px}\n  .mr12-choice{padding:13px}\n  .mr12-choice-meta{font-size:11px}\n  .mr12-warning{margin-top:14px}\n  .mr12-norms{gap:8px}\n  .mr12-year{font-size:11px}\n}\n\n@media(max-width:360px){\n  #mirlex-rop-check-v37{padding:38px 12px}\n  .mr12-title{font-size:24px}\n  .mr12-input{padding:0 14px}\n  .mr12-card{padding:16px}\n  .mr12-rtitle{font-size:18px}\n  .mr12-norms{grid-template-columns:1fr}\n  .mr12-norm{display:flex;align-items:center;justify-content:space-between;gap:12px}\n  .mr12-year{margin-bottom:0}\n  .mr12-pct{font-size:19px}\n  .mr12-back{display:block;width:100%;text-align:left}\n}\n</style>\n\n<section id=\"mirlex-rop-check-v37\">\n  <div class=\"mr12-wrap\">\n    <div class=\"mr12-label\">Проверка по перечню №2414</div>\n    <h2 class=\"mr12-title\">Введите код или наименование</h2>\n    <p class=\"mr12-text\">\n      Проверим товар или упаковку по действующему перечню №2414, определим группу\n      и покажем требования к утилизации на 2026–2029 годы.\n    </p>\n\n    <div id=\"mr37-source-state\" class=\"mr37-source-state\">Проверка по действующему перечню №2414</div>\n\n    <div class=\"mr12-search\">\n      <input id=\"mr37-query\" class=\"mr12-input\" type=\"text\" autocomplete=\"off\"\n        placeholder=\"ОКПД 2, ТН ВЭД, PET, PP, PAP, 05, 70 или наименование\">\n      <button id=\"mr37-btn\" class=\"mr12-button\" type=\"button\">Проверить</button>\n    </div>\n\n    <div class=\"mr12-hint\">\n      Для ввезённой упаковки можно искать также по материалу, буквенной маркировке\n      и цифровому коду ТР ТС 005/2011. Если одного кода недостаточно для юридически\n      безопасного вывода, система прямо сообщит, что требуется сверка.\n    </div>\n\n    <div id=\"mr37-result\" class=\"mr37-result\"></div>\n  </div>\n</section>\n\n\n\n";

(function(){
"use strict";

/*
  MIRLEX | РОП CHECK v37 NEUTRAL NEGATIVE RESULT

  Основа:
  ПП РФ от 29.12.2023 №2414 → Python builder → rop-2414.json → GitHub → Tilda T123

  Runtime:
  1) основной источник — raw.githubusercontent.com;
  2) fallback — GitHub Pages;
  3) кэш браузера используется только после проверки структуры;
  4) fail-closed: при провале self-test поиск блокируется;
  5) пользовательский запрос обрабатывается только в браузере.
*/

const OFFICIAL_URL="https://publication.pravo.gov.ru/document/0001202312310011";

let DATA=[];
let GROUPS={};
let FOOT={};
let PACK_NORMS={2026:75,2027:100,2028:100,2029:100};
let META={};
const RULE_EXPL={"meta":{"dataset":"MIRLEX ROP 2414 rule explanations","resolution":"Постановление Правительства РФ от 29.12.2023 №2414","effective_from":"2025-01-01","purpose":"Машинные пояснения для конструкций ТН ВЭД и сносок перечня. Не заменяют текст НПА."},"from":{"title":"Что означает «из»","user_text":"Перед кодом стоит «из»: эта строка охватывает не всю товарную позицию ТН ВЭД, а только часть товаров из неё. Чтобы определить нужную часть, сопоставляют полный код и фактически ввозимый товар с наименованием этой строки перечня."},"plain_heading":{"title":"Код указан без «из»","user_text":"Код товарной позиции указан без «из» и без ограничительного примечания. По сноске <2> в перечень входят все её субпозиции и подсубпозиции."},"footnotes":{"1":{"legal_text":"Наименования товаров и упаковки приводятся по ОКПД 2; принадлежность определяется по наименованию и физическим и химическим характеристикам по ОКПД 2. Коды и наименования ТН ВЭД ЕАЭС приведены для использования импортерами.","user_text":"Наименования товаров и упаковки в перечне приведены по ОКПД 2. Принадлежность определяется по наименованию, физическим и химическим характеристикам по ОКПД 2. Коды и наименования ТН ВЭД ЕАЭС приведены для использования импортёрами."},"2":{"legal_text":"Если код товарной позиции ТН ВЭД ЕАЭС указан без примечаний, включаются все входящие субпозиции и подсубпозиции.","user_text":"Если товарная позиция указана без примечаний, в перечень входят все входящие в неё субпозиции и подсубпозиции."},"3":{"legal_text":"За исключением одеял электрических.","user_text":"Электрические одеяла из этой строки исключены. В перечне они предусмотрены отдельно."},"4":{"legal_text":"Только товары, указанные в графе «Наименование товара, упаковки».","user_text":"ПП №2414 прямо ограничивает эту строку: учитываются только товары, указанные в графе «Наименование товара, упаковки»."},"5":{"legal_text":"За исключением производственных и профессиональных.","user_text":"Производственные и профессиональные товары из этой строки исключены."},"6":{"legal_text":"Без покрытия и пропитки.","user_text":"Эта строка применяется только к товарам без покрытия и пропитки."},"7":{"legal_text":"Только товары товарных субпозиций 8443 31, 8443 32 и 8443 39.","user_text":"Из позиции 8443 учитываются только товары субпозиций 8443 31, 8443 32 и 8443 39."},"8":{"legal_text":"За исключением товаров подсубпозиции 8518 90 000.","user_text":"Товары подсубпозиции 8518 90 000 из этой строки исключены."},"9":{"legal_text":"Все товары, за исключением частей и принадлежностей.","user_text":"Из этой строки исключены части и принадлежности."},"10":{"legal_text":"Раздел III применяется импортерами в отношении упаковки ввезенного товара независимо от включения самого товара в перечень.","user_text":"Импортёр проверяет упаковку ввезённого товара отдельно по разделу III независимо от того, включён ли сам товар в перечень."},"11":{"legal_text":"Буквенное обозначение и цифровой код упаковки по ТР ТС 005/2011 используются для идентификации упаковки.","user_text":"Буквенное обозначение и цифровой код по ТР ТС 005/2011 используются в справочных целях для идентификации упаковки."}}};

const root=document.getElementById("mirlex-rop-check-v37");
if(!root)return;

const input=root.querySelector("#mr37-query");
const btn=root.querySelector("#mr37-btn");
const result=root.querySelector("#mr37-result");
let DATA_READY=false;
let PENDING_QUERY=null;
let TNVED_INDEX=null;
let TNVED_INDEX_PROMISE=null;
const TNVED_INDEX_URL="https://artem1285.github.io/mirlex-data/tnved-2414-index.json";
let TNVED_SEMANTIC=null;
let TNVED_SEMANTIC_PROMISE=null;
const TNVED_SEMANTIC_URL="https://artem1285.github.io/mirlex-data/tnved-semantic-map.json";

const METRIKA_COUNTER=113440268;
let LAST_QUERY_STARTED_AT=0;



const state=root.querySelector("#mr37-source-state");

function clean(v){
  return String(v||"").replace(/\u00a0/g," ").replace(/\s+/g," ").trim();
}
function lower(v){
  return clean(v).toLowerCase().replace(/ё/g,"е");
}
function digits(v){
  return String(v||"").replace(/\D/g,"");
}
function esc(v){
  return String(v==null?"":v)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}
function uniq(arr){
  return [...new Set((arr||[]).filter(Boolean))];
}
function exactNumericQuery(q){
  const v=clean(q);
  return /^[\d\s.-]+$/.test(v) ? digits(v) : "";
}
function row(label,value){
  if(value==null || value==="")return "";
  return `<div class="mr12-row">
    <div class="mr12-row-label">${esc(label)}</div>
    <div class="mr12-row-value">${esc(value)}</div>
  </div>`;
}
function groupOf(item){
  return GROUPS[String(item.group)]||GROUPS[item.group]||null;
}
function norms(item){
  const g=groupOf(item);
  if(g && g.type==="product")return g.norms||{};
  return PACK_NORMS||{};
}
function tnDisplay(item,rule){
  if(rule && rule.code){
    const prefix=rule.isFrom ? "из " : "";
    const notes=(rule.footnotes||[]).length
      ? " <"+(rule.footnotes||[]).join(", ")+">"
      : "";
    return prefix+rule.code+notes;
  }
  if(item.tnvedRaw)return clean(item.tnvedRaw);
  return (item.tnvedCodes||[]).join(", ");
}
function looksLikeOkpdInput(q){
  const v=clean(q);
  return /^\d{2}\.\d{2}(?:\.\d{1,3}){1,2}$/.test(v);
}
function looksLikeTnvedInput(q){
  const v=clean(q);
  if(/\s/.test(v) && /^\d[\d\s-]+$/.test(v))return true;
  const d=digits(v);
  return d.length>=4 && d.length<=10;
}

function parseTnRulesFromRaw(text){
  text=clean(text);
  const out=[];
  const seen=new Set();
  const re=/(из\s+)?(\d{4}(?:\s+(?!\d{4}\b)\d{1,3}){0,3})(?:\s*<\s*(\d{1,2})\s*>)?/gi;
  let m;

  while((m=re.exec(text))){
    const code=clean(m[2]);
    const foot=m[3] ? Number(m[3]) : null;
    const rule={
      code,
      codeDigits:digits(code),
      isFrom:!!m[1],
      footnotes:foot ? [foot] : []
    };

    const key=[
      rule.codeDigits,
      rule.isFrom ? "1" : "0",
      rule.footnotes.join(",")
    ].join("|");

    if(!seen.has(key)){
      seen.add(key);
      out.push(rule);
    }
  }

  return out;
}

function normalizeTnRules(data){
  for(const item of data||[]){
    if(Number(item.section)===3)continue;

    const parsed=parseTnRulesFromRaw(item.tnvedRaw||"");
    if(!parsed.length && clean(item.tnvedRaw||""))continue;

    if(parsed.length){
      item.tnRules=parsed;
      item.tnvedCodes=parsed.map(r=>r.code);
      item.isFrom=parsed.some(r=>r.isFrom);
    }
  }
}

function validatePayload(payload){
  if(!payload || typeof payload!=="object")throw new Error("Некорректный JSON.");
  if(!payload.meta || payload.meta.integrity!=="passed")throw new Error("integrity != passed");
  if(!Array.isArray(payload.data))throw new Error("Нет массива data.");
  if(payload.data.length<1000 || payload.data.length>2500)throw new Error("Неожиданное число позиций.");
  if(!payload.groups || typeof payload.groups!=="object")throw new Error("Нет groups.");
  const groups=new Set(payload.data.map(x=>Number(x.group)));
  for(let g=1;g<=52;g++){
    if(!groups.has(g))throw new Error("Нет группы "+g);
  }
  return true;
}

function applyPayload(payload){
  validatePayload(payload);
  DATA=payload.data;
  GROUPS=payload.groups||{};
  FOOT=payload.footnotes||{};
  META=payload.meta||{};
  PACK_NORMS=(META.packaging_rule||{2026:75,2027:100,2028:100,2029:100});
}

function findByOkpdExact(code){
  const d=digits(code);
  return DATA.filter(x=>digits(x.okpd)===d);
}
function findByGroup(group){
  return DATA.filter(x=>Number(x.group)===Number(group));
}
function hasTn(item,codeDigits){
  return (item.tnRules||[]).some(r=>(r.codeDigits||digits(r.code))===codeDigits);
}

function selfTest(){
  const errors=[];

  const groups=new Set(DATA.map(x=>Number(x.group)));
  for(let g=1;g<=52;g++){
    if(!groups.has(g))errors.push("нет группы "+g);
  }

  const ctrl=findByOkpdExact("17.21.13.000").filter(x=>Number(x.group)===19);
  if(!ctrl.some(x=>hasTn(x,"4819100000"))){
    errors.push("контроль 17.21.13.000 / группа 19 / 4819 10 000 0");
  }

  const g1=findByGroup(1);
  if(!g1.some(x=>(x.tnRules||[]).some(r=>(r.footnotes||[]).includes(3)))){
    errors.push("сноска <3>");
  }

  const allRules=DATA.flatMap(x=>x.tnRules||[]);
  if(!allRules.some(r=>(r.footnotes||[]).includes(7)))errors.push("сноска <7>");
  if(!allRules.some(r=>(r.footnotes||[]).includes(8)))errors.push("сноска <8>");

  const malformedRules=[];
  for(const item of DATA){
    for(const rule of item.tnRules||[]){
      const rd=rule.codeDigits||digits(rule.code);
      if(rd.length<4 || rd.length>10){
        malformedRules.push((item.okpd||"?")+": "+(rule.code||rd));
      }
    }
  }
  if(malformedRules.length){
    errors.push("искажённые ТН ВЭД после нормализации: "+malformedRules.slice(0,5).join("; "));
  }

  const requiredRuleNotes=[1,2,3,4,5,6,7,8,9,10,11];
  for(const n of requiredRuleNotes){
    if(!RULE_EXPL.footnotes || !RULE_EXPL.footnotes[String(n)] || !RULE_EXPL.footnotes[String(n)].user_text){
      errors.push("нет встроенного пояснения сноски <"+n+">");
    }
  }
  if(!RULE_EXPL.from || !RULE_EXPL.from.user_text)errors.push("нет встроенного пояснения конструкции «из»");
  if(!RULE_EXPL.plain_heading || !RULE_EXPL.plain_heading.user_text)errors.push("нет встроенного пояснения кода без «из»");

  const regressionChecks=[
    ["13.93.19.120",["5704","570500"]],
    ["22.19.60.110",["401512000","4015190000"]],
    ["22.19.73.110",["401610000","4016950000"]],
    ["17.21.12.000",["481930000","4819400000"]]
  ];

  for(const [okpd,codes] of regressionChecks){
    const found=new Set();
    for(const item of DATA){
      if(digits(item.okpd)!==digits(okpd))continue;
      for(const rule of item.tnRules||[]){
        found.add(rule.codeDigits||digits(rule.code));
      }
    }
    if(!codes.every(c=>found.has(c))){
      errors.push("регрессионный контроль ТН ВЭД "+okpd+" не пройден");
    }
  }

  // Search-behavior regression controls.
  if(search("8518900008").length!==0){
    errors.push("контроль <8>: 8518 90 000 8 должен быть исключён");
  }

  if(!search("8443318000").some(m=>(m.rule?.footnotes||[]).includes(7))){
    errors.push("контроль <7>: 8443 31 800 0 не найден в разрешённой ветке");
  }

  if(!search("8467211000").some(m=>(m.rule?.codeDigits||digits(m.rule?.code))==="8467")){
    errors.push("контроль <2>: код внутри 8467 не найден");
  }

  if(search("9999999999").length!==0){
    errors.push("контроль отсутствующего ТН ВЭД: найден ложный результат");
  }

  return errors;
}

function sourceReady(message){
  const errors=selfTest();
  if(errors.length){
    state.textContent="Самопроверка базы №2414 не пройдена. Поиск заблокирован: "+errors.join("; ")+".";
    state.className="mr37-source-state err";
    input.disabled=true;
    btn.disabled=true;
    track("rop_check_selftest_error",{count:errors.length});
    return;
  }

  DATA_READY=true;
  state.textContent=message+" Самопроверка пройдена. Действующий перечень — с 01.01.2025.";
  state.className="mr37-source-state ok";
  input.disabled=false;
  btn.disabled=false;
  track("rop_check_loaded",{positions:DATA.length});

  if(PENDING_QUERY){
    const q=PENDING_QUERY;
    PENDING_QUERY=null;
    input.value=q;
    runSearch();
  }
}

function sourceFailed(){
  state.textContent="База №2414 временно недоступна. Проверка заблокирована, чтобы не выдавать неполный результат.";
  state.className="mr37-source-state err";
  input.disabled=true;
  btn.disabled=true;
  track("rop_check_source_error",{});
}

function queryType(q){
  const v=clean(q);
  const numeric=exactNumericQuery(v);
  if(looksLikeOkpdInput(v))return "okpd";
  if(looksLikeTnvedInput(v))return "tnved";
  if(numeric && numeric.length<=2)return "packaging_code";
  if(/^[A-Za-z]{2,5}$/.test(v))return "packaging_marking";
  return "text";
}

function safeQueryForAnalytics(q){
  const v=clean(q);
  const type=queryType(v);
  if(type==="text")return "";
  return v.slice(0,64);
}

function analyticsDurationMs(){
  return LAST_QUERY_STARTED_AT ? Math.max(0,Date.now()-LAST_QUERY_STARTED_AT) : 0;
}

function goal(target,params){
  try{
    if(typeof window.ym==="function"){
      window.ym(METRIKA_COUNTER,"reachGoal",target,params||{});
    }
  }catch(e){}
}

function eventParams(eventName,payload){
  try{
    if(typeof window.ym!=="function")return;
    window.ym(METRIKA_COUNTER,"params",{
      rop_check_event:{
        event:eventName,
        ...(payload||{})
      }
    });
  }catch(e){}
}

function resultGoal(status,match=null,extra={}){
  const q=clean(input.value);
  const item=match&&match.item ? match.item : null;
  const g=item ? groupOf(item) : null;
  const rule=match&&match.rule ? match.rule : null;

  goal("rop_check_result",{
    rop_check:{
      query:safeQueryForAnalytics(q),
      query_type:queryType(q),
      result_status:status,
      section:item ? item.section : (extra.section||""),
      group:item ? item.group : (extra.group||""),
      group_name:g ? g.name : (extra.group_name||""),
      method:match ? (match.method||"") : (extra.method||""),
      certainty:match ? (match.certainty||"") : (extra.certainty||""),
      results_count:extra.results_count||"",
      okpd:item ? (item.okpd||"") : (extra.okpd||""),
      tnved:item && Number(item.section)!==3 ? tnDisplay(item,rule) : (extra.tnved||""),
      item_name:item ? (item.name||"") : (extra.item_name||""),
      duration_ms:analyticsDurationMs()
    }
  });
}

function choiceGoal(match,index,total){
  if(!match||!match.item)return;
  const item=match.item;
  const g=groupOf(item);

  goal("rop_check_choice",{
    rop_check:{
      query:safeQueryForAnalytics(input.value),
      query_type:queryType(input.value),
      selected_index:Number(index)+1,
      results_count:Number(total)||"",
      selected_item:item.name||"",
      section:item.section||"",
      group:item.group||"",
      group_name:g ? g.name : "",
      okpd:item.okpd||"",
      tnved:Number(item.section)!==3 ? tnDisplay(item,match.rule) : "",
      method:match.method||"",
      certainty:match.certainty||""
    }
  });
}

function submitGoal(){
  const q=clean(input.value);
  if(!q)return;

  LAST_QUERY_STARTED_AT=Date.now();

  goal("rop_check_submit",{
    rop_check:{
      query:safeQueryForAnalytics(q),
      query_type:queryType(q)
    }
  });
}

function track(eventName,payload){
  const safePayload=payload||{};
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event:eventName,rop_check:safePayload});

  try{
    window.dispatchEvent(new CustomEvent(eventName,{detail:safePayload}));
  }catch(e){}

  eventParams(eventName,safePayload);
}

function hardRuleDecision(rule,qDigits){
  const f=rule.footnotes||[];

  if(f.includes(3) && qDigits.startsWith("6301100000")){
    return "excluded";
  }

  if(f.includes(7) && qDigits.length>4){
    const ok=
      qDigits.startsWith("844331") ||
      qDigits.startsWith("844332") ||
      qDigits.startsWith("844339") || ["844331","844332","844339"].some(c=>c.startsWith(qDigits));
    return ok ? "allowed" : "excluded";
  }

  // 8518 90 000... = parts. PP 2414 footnote <8> expressly excludes
  // this branch for the <8> rows. The remaining "из 8518 <4>" row names
  // finished amplifiers/sound systems, so a parts code cannot match it either.
  if(qDigits.startsWith("851890000")){
    const rd=rule.codeDigits||digits(rule.code);
    if(rd==="8518")return "excluded";
  }

  return "neutral";
}

function ruleNeedsHumanCheck(rule){
  const f=rule.footnotes||[];
  return (
    !!rule.isFrom ||
    f.includes(4) ||
    f.includes(5) ||
    f.includes(6) ||
    f.includes(9)
  );
}

function relationScore(queryDigits,ruleDigits){
  if(!queryDigits || !ruleDigits)return 0;
  if(queryDigits===ruleDigits)return 100;
  if(queryDigits.startsWith(ruleDigits))return 88;
  if(ruleDigits.startsWith(queryDigits))return 78;
  return 0;
}

function tnvedMatch(item,query){
  const q=exactNumericQuery(query);
  if(!q)return null;

  let best=null;

  for(const rule of item.tnRules||[]){
    const rd=rule.codeDigits||digits(rule.code);
    const score=relationScore(q,rd);
    if(!score)continue;

    const hard=hardRuleDecision(rule,q);
    if(hard==="excluded")continue;

    const queryMoreSpecific=q.length>rd.length;
    const queryBroader=q.length<rd.length;
    const needsCheck=ruleNeedsHumanCheck(rule);

    let certainty="confirmed";
    let reason="";

    if(queryBroader || q.length<=4){
      certainty="candidate";
      reason="Введён широкий код.";
    }

    if(queryMoreSpecific && needsCheck){
      certainty="unresolved";
      reason="Точный код попадает под более широкую условную строку перечня.";
    }else if(needsCheck && certainty!=="unresolved"){
      certainty="candidate";
      reason="Для этой строки одного кода недостаточно.";
    }

    if(hard==="allowed" && q.length>4 && !queryMoreSpecific){
      certainty="candidate";
    }

    const found={item,rule,score,certainty,reason,method:"tnved"};
    if(!best || found.score>best.score)best=found;
  }

  return best;
}

function okpdMatch(item,query){
  const q=digits(query);
  const c=digits(item.okpd);
  if(!q || !c)return null;

  if(q===c){
    return {item,score:100,certainty:"confirmed",reason:"",method:"okpd"};
  }
  if(c.startsWith(q)){
    return {
      item,
      score:82,
      certainty:"candidate",
      reason:"Введён широкий код ОКПД 2.",
      method:"okpd"
    };
  }
  if(q.startsWith(c)){
    return {
      item,
      score:86,
      certainty:"candidate",
      reason:"Введён код внутри более широкой позиции перечня.",
      method:"okpd"
    };
  }
  return null;
}

function section3NumericMatch(item,query){
  if(Number(item.section)!==3)return null;
  const q=clean(query);
  if(!/^\d{1,2}$/.test(q))return null;
  const n=Number(q);

  if((item.packagingCodes||[]).some(x=>Number(x)===n)){
    return {item,score:100,certainty:"confirmed",reason:"",method:"packaging_code"};
  }

  if((item.packagingRanges||[]).some(r=>n>=Number(r[0]) && n<=Number(r[1]))){
    return {item,score:96,certainty:"confirmed",reason:"",method:"packaging_range"};
  }

  return null;
}

function section3MarkingMatch(item,query){
  if(Number(item.section)!==3)return null;
  const q=clean(query).toUpperCase();
  if(!q || !/^[A-Z]{2,5}$/.test(q))return null;

  if((item.markings||[]).some(x=>clean(x).toUpperCase()===q)){
    return {item,score:100,certainty:"confirmed",reason:"",method:"packaging_marking"};
  }
  return null;
}

function textMatch(item,query){
  const q=lower(query);
  if(!q || q.length<2)return null;

  const hay=lower([
    item.name,
    item.material,
    item.okpd,
    item.tnvedRaw,
    (item.markings||[]).join(" "),
    (item.packagingCodes||[]).join(" "),
    (groupOf(item)||{}).name
  ].filter(Boolean).join(" "));

  if(!hay.includes(q))return null;

  let score=60;
  if(lower(item.name)===q || lower(item.material)===q)score=92;
  else if(lower(item.name).startsWith(q) || lower(item.material).startsWith(q))score=80;

  return {item,score,certainty:"candidate",reason:"Совпадение по наименованию или материалу.",method:"text"};
}

function dedupeMatches(matches){
  const map=new Map();

  for(const m of matches){
    const item=m.item;
    const key=[
      item.section,
      item.group,
      item.name,
      item.okpd||"",
      item.material||"",
      m.rule ? (m.rule.codeDigits||digits(m.rule.code)) : ""
    ].join("|");

    const prev=map.get(key);
    if(!prev || m.score>prev.score)map.set(key,m);
  }

  return [...map.values()];
}

function search(query){
  const q=clean(query);
  if(!q)return [];

  let matches=[];

  const numeric=exactNumericQuery(q);
  const okpdLike=looksLikeOkpdInput(q);
  const tnLike=looksLikeTnvedInput(q);

  if(okpdLike){
    for(const item of DATA){
      const m=okpdMatch(item,q);
      if(m)matches.push(m);
    }
  }

  if(tnLike){
    for(const item of DATA){
      if(Number(item.section)===3)continue;
      const m=tnvedMatch(item,q);
      if(m)matches.push(m);
    }
  }

  if(numeric && numeric.length<=2){
    for(const item of DATA){
      const m=section3NumericMatch(item,q);
      if(m)matches.push(m);
    }
  }

  if(/^[A-Za-z]{2,5}$/.test(q)){
    for(const item of DATA){
      const m=section3MarkingMatch(item,q);
      if(m)matches.push(m);
    }
  }

  if(!okpdLike && !tnLike && !(numeric && numeric.length<=2)){
    for(const item of DATA){
      const m=textMatch(item,q);
      if(m)matches.push(m);
    }
  }

  matches=dedupeMatches(matches);
  matches.sort((a,b)=>b.score-a.score || Number(a.item.group)-Number(b.item.group));

  return matches;
}

function renderRuleExplanation(item,match){
  const rule=match && match.rule ? match.rule : null;
  const parts=[];

  if(rule){
    const code=rule.code||"";
    const qDigits=exactNumericQuery(input.value);
    const ruleDigits=rule.codeDigits||digits(code);
    const footnotes=rule.footnotes||[];

    parts.push(
      `<div><strong>В ПП №2414 указано:</strong> ${esc(tnDisplay(item,rule))}.</div>`
    );

    if(qDigits && ruleDigits && qDigits.length>ruleDigits.length && qDigits.startsWith(ruleDigits)){
      parts.push(
        `<div style="margin-top:8px"><strong>Почему полного кода может не быть в перечне.</strong> `+
        `Ваш код найден через более широкую товарную позицию ${esc(code)}, указанную в ПП №2414. `+
        `Поэтому полный код из декларации может отдельно в тексте перечня не приводиться.</div>`
      );
    }

    if(rule.isFrom){
      if(footnotes.includes(4)){
        parts.push(
          `<div style="margin-top:8px"><strong>Что означает «из».</strong> `+
          `В эту строку входит не вся товарная позиция ${esc(code)}, а только часть товаров из неё.</div>`
        );
      }else{
        parts.push(
          `<div style="margin-top:8px"><strong>Что означает «из».</strong> `+
          `${esc(RULE_EXPL.from.user_text)}</div>`
        );
      }
    }else if(
      digits(code).length===4 &&
      !footnotes.length &&
      RULE_EXPL.plain_heading &&
      RULE_EXPL.plain_heading.user_text
    ){
      parts.push(
        `<div style="margin-top:8px"><strong>Код без «из».</strong> `+
        `${esc(RULE_EXPL.plain_heading.user_text)}</div>`
      );
    }

    for(const n of footnotes){
      const x=RULE_EXPL.footnotes && RULE_EXPL.footnotes[String(n)];
      if(!x || !x.user_text)continue;

      if(Number(n)===4){
        parts.push(
          `<div style="margin-top:8px"><strong>Сноска &lt;4&gt;.</strong> `+
          `В этой строке учитываются только товары, указанные в графе «Наименование товара, упаковки», `+
          `то есть — «${esc(item.name)}». `+
          `<span>Основание — примечание &lt;4&gt; к перечню №2414.</span></div>`
        );
        continue;
      }

      parts.push(
        `<div style="margin-top:8px"><strong>Сноска &lt;${esc(n)}&gt;.</strong> `+
        `${esc(x.user_text)} `+
        `<span>Основание — примечание &lt;${esc(n)}&gt; к перечню №2414.</span></div>`
      );
    }
  }

  if(Number(item.section)===3){
    for(const n of [10,11]){
      const x=RULE_EXPL.footnotes && RULE_EXPL.footnotes[String(n)];
      if(!x || !x.user_text)continue;
      parts.push(
        `<div style="margin-top:8px"><strong>Сноска &lt;${n}&gt;.</strong> `+
        `${esc(x.user_text)} `+
        `<span>Основание — примечание &lt;${n}&gt; к перечню №2414.</span></div>`
      );
    }
  }

  if(!parts.length)return "";

  return `
    <div class="mr12-warning">
      <strong>Пояснение по коду и сноскам.</strong>
      <div style="margin-top:8px">${parts.join("")}</div>
    </div>
  `;
}

function renderNorms(item){
  const g=groupOf(item);
  const n=norms(item);

  const cells=Object.keys(n).sort().map(y=>
    `<div class="mr12-norm">
      <div class="mr12-year">${esc(y)}</div>
      <div class="mr12-pct">${esc(n[y])}%</div>
    </div>`
  ).join("");

  if(!cells)return "";

  if(g && g.type==="product"){
    return `
      <div class="mr12-row">
        <div class="mr12-row-label">Норматив утилизации</div>
        <div class="mr12-norms">${cells}</div>
      </div>

      <div class="mr12-warning">
        <strong>Правовая основа.</strong>
        Нормативы утилизации отходов от использования товаров
        на 2026–2029 годы установлены Постановлением Правительства РФ
        от 29.12.2023 №2414.
      </div>
    `;
  }

  return `
    <div class="mr12-row">
      <div class="mr12-row-label">
        Масса упаковки, в отношении которой обеспечивается утилизация
      </div>
      <div class="mr12-norms">${cells}</div>
    </div>

    <div class="mr12-warning">
      <strong>Правовая основа.</strong><br>
      <strong>2026 — 75%.</strong>
      Часть 5 статьи 7 Федерального закона от 04.08.2023 №451-ФЗ —
      75% массы упаковки.<br><br>

      <strong>С 01.01.2027 — 100%.</strong>
      Пункт 4 статьи 24.2 Федерального закона №89-ФЗ —
      утилизация обеспечивается в отношении всей массы упаковки.
    </div>
  `;
}

function renderOne(match,backMatches){
  const item=match.item;
  const g=groupOf(item);
  const certainty=match.certainty||"confirmed";

  const rowFootnotes=uniq([
    ...(item.rowFootnotes||[]),
    ...((match.rule&&match.rule.footnotes)||[])
  ]);

  const ruleExplanation=renderRuleExplanation(item,match);

  const marks=(item.markings||[]).join(" / ");
  const pcodes=[
    ...(item.packagingCodes||[]),
    ...(item.packagingRanges||[]).map(r=>r[0]+"–"+r[1])
  ].join(", ");

  let checkBlock="";

  if(certainty==="candidate" || certainty==="unresolved"){
    checkBlock=`
      <div class="mr12-warning">
        <strong>Выбранная строка перечня.</strong>
        Ниже показаны специальные условия этой строки, если они предусмотрены ПП №2414.
      </div>
    `;
  }

  const backButton=
    Array.isArray(backMatches) && backMatches.length>1
      ? `<button class="mr12-back" type="button">← Назад к найденным вариантам</button>`
      : "";

  result.innerHTML=`
    <div class="mr12-card">

      ${backButton}

      <div class="mr12-status">
        ${certainty==="confirmed"
          ? "Позиция найдена в перечне №2414"
          : "Выбрана строка перечня №2414"}
      </div>

      <div class="mr12-rtitle">${esc(item.name)}</div>

      ${row("Раздел",item.sectionName)}
      ${row("Группа",g?`№${item.group} — ${g.name}`:"")}
      ${row("ОКПД 2",item.okpd)}
      ${row("ТН ВЭД ЕАЭС",Number(item.section)!==3?tnDisplay(item,match.rule):"")}
      ${row("Материал упаковки",item.material)}
      ${row("Буквенное обозначение ТР ТС 005/2011",marks)}
      ${row("Цифровой код ТР ТС 005/2011",pcodes)}

      ${renderNorms(item)}

      ${checkBlock}

      ${ruleExplanation}

      ${
        Number(item.section)===3
          ? `<div class="mr12-warning">
               <strong>Определение группы упаковки.</strong>
               Для импортёра группа упаковки определяется по материалу упаковки.
               Буквенное обозначение и цифровой код по ТР ТС 005/2011 используются
               в справочных целях для её идентификации.
             </div>`
          : `<div class="mr12-warning">
               <strong>Наименование и определение принадлежности товара, упаковки к перечню.</strong>
               Наименования товаров и упаковки в перечне приведены по ОКПД 2.
               Принадлежность товара, упаковки к перечню определяется по его наименованию,
               физическим и химическим характеристикам по ОКПД 2.
               Для импортёров дополнительно используются коды и наименования ТН ВЭД ЕАЭС.
             </div>`
      }

      <div class="mr12-warning">
        <strong>Для кого применяется.</strong>
        Требования РОП распространяются на производителей товаров
        и импортёров товаров в случаях, установленных Федеральным законом №89-ФЗ.
        Момент возникновения обязанности и предусмотренные законом исключения
        определяются отдельно для конкретной ситуации.
      </div>

      <div class="mr12-row">
        <div class="mr12-row-label">Правовая основа</div>
        <div class="mr12-row-value">
          <a class="mr12-source-link"
             href="${OFFICIAL_URL}"
             target="_blank"
             rel="noopener">
            Постановление Правительства РФ от 29.12.2023 №2414
          </a>
        </div>
      </div>

    </div>
  `;

  result.classList.add("show");

  const backBtn=result.querySelector(".mr12-back");
  if(backBtn){
    backBtn.addEventListener("click",()=>{
      track("rop_check_back_to_results",{count:backMatches.length});
      renderMany(backMatches);
    });
  }

  track(
    certainty==="confirmed" ? "rop_check_found" : "rop_check_candidate",
    {
      section:item.section,
      group:item.group,
      method:match.method||""
    }
  );
}

async function getTnvedIndex(){
  if(TNVED_INDEX)return TNVED_INDEX;
  if(TNVED_INDEX_PROMISE)return TNVED_INDEX_PROMISE;

  TNVED_INDEX_PROMISE=(async()=>{
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),3500);

    try{
      const r=await fetch(TNVED_INDEX_URL,{
        cache:"default",
        signal:controller.signal
      });
      if(!r.ok)throw new Error("HTTP "+r.status);

      const payload=await r.json();
      if(!payload || !Array.isArray(payload.entries)){
        throw new Error("Некорректный индекс ТН ВЭД.");
      }

      TNVED_INDEX=payload;
      return payload;
    }finally{
      clearTimeout(timer);
      TNVED_INDEX_PROMISE=null;
    }
  })();

  return TNVED_INDEX_PROMISE;
}

function formatTnInput(q){
  const d=digits(q);
  if(d.length===10)return `${d.slice(0,4)} ${d.slice(4,6)} ${d.slice(6,9)} ${d.slice(9)}`;
  if(d.length===9)return `${d.slice(0,4)} ${d.slice(4,6)} ${d.slice(6)}`;
  if(d.length===8)return `${d.slice(0,4)} ${d.slice(4,6)} ${d.slice(6)}`;
  if(d.length===7)return `${d.slice(0,4)} ${d.slice(4)}`;
  if(d.length===6)return `${d.slice(0,4)} ${d.slice(4)}`;
  return clean(q);
}

function findParentIndexEntry(index,qDigits){
  if(!index || !Array.isArray(index.entries) || qDigits.length<=4)return null;

  const candidates=index.entries
    .filter(e=>e && e.codeDigits && qDigits.startsWith(e.codeDigits) && e.codeDigits.length<qDigits.length)
    .sort((a,b)=>b.codeDigits.length-a.codeDigits.length);

  return candidates[0]||null;
}

function buildLongTnvedNotice(entry,qDigits,matches){
  if(!entry || !qDigits || qDigits.length<=entry.codeDigits.length)return "";

  const rowMatches=(entry.rows||[]).length;
  const hasFootnote4=(entry.rows||[]).some(r=>(r.footnotes||[]).includes(4));
  const displayParent=entry.displayCode||entry.codeDigits;

  let extra="";
  if(rowMatches>1){
    extra=` Позиция ${esc(displayParent)} используется в нескольких строках перечня`;
    if(hasFootnote4)extra+=" с примечанием &lt;4&gt;";
    extra+=".";
  }

  return `
    <div class="mr12-warning mr12-tnved-context" style="margin-bottom:16px">
      <strong>Ваш ТН ВЭД: ${esc(formatTnInput(qDigits))}.</strong>
      В ПП №2414 код найден через более широкую товарную позицию
      <strong>${esc(displayParent)}</strong>.${extra}
      ${
        matches.length>1
          ? " Выберите фактически ввозимый товар из списка ниже."
          : ""
      }
    </div>
  `;
}

async function addLongTnvedNotice(matches){
  const q=clean(input.value);
  const qDigits=exactNumericQuery(q);

  if(!qDigits || qDigits.length<=4 || !matches || !matches.length)return;

  try{
    const index=await getTnvedIndex();
    const parent=findParentIndexEntry(index,qDigits);
    if(!parent)return;

    const card=result.querySelector(".mr12-card");
    if(!card)return;

    const notice=buildLongTnvedNotice(parent,qDigits,matches);
    if(!notice)return;

    const existing=card.querySelector(".mr12-tnved-context");
    if(existing)return;

    const target=card.querySelector(".mr12-choice");
    if(target){
      target.insertAdjacentHTML("beforebegin",notice);
    }
  }catch(e){
    // Индекс — только поясняющий слой. Ошибка его загрузки не блокирует основной поиск.
  }
}

async function getTnvedSemantic(){
  if(TNVED_SEMANTIC)return TNVED_SEMANTIC;
  if(TNVED_SEMANTIC_PROMISE)return TNVED_SEMANTIC_PROMISE;

  TNVED_SEMANTIC_PROMISE=(async()=>{
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),3500);
    try{
      const r=await fetch(TNVED_SEMANTIC_URL,{
        cache:"default",
        signal:controller.signal
      });
      if(!r.ok)throw new Error("HTTP "+r.status);
      const payload=await r.json();
      if(!payload || !payload.codes)throw new Error("Некорректная семантическая база ТН ВЭД.");
      TNVED_SEMANTIC=payload;
      return payload;
    }finally{
      clearTimeout(timer);
      TNVED_SEMANTIC_PROMISE=null;
    }
  })();

  return TNVED_SEMANTIC_PROMISE;
}

function okpdStartsWithPrefix(okpd,prefix){
  const a=digits(okpd);
  const b=digits(prefix);
  return !!a && !!b && a.startsWith(b);
}

function applySemanticFilter(matches,entry){
  if(!entry || !Array.isArray(entry.okpdPrefixes) || !entry.okpdPrefixes.length)return matches;

  return matches.map(m=>({...m,semanticPreferred:entry.okpdPrefixes.some(prefix=>okpdStartsWithPrefix(m.item.okpd,prefix))})).sort((a,b)=>Number(b.semanticPreferred)-Number(a.semanticPreferred));
}

function renderSemanticNone(q,entry){
  const prefixes=(entry?.okpdPrefixes||[]).join(", ");
  const display=entry?.displayCode||formatTnInput(digits(q));

  result.innerHTML=`
    <div class="mr12-card">
      <div class="mr12-status">Совместимая строка перечня №2414 не найдена</div>

      <div class="mr12-rtitle">
        По ТН ВЭД ${esc(display)} строка перечня не подтверждена.
      </div>

      <div class="mr12-warning" style="margin-top:16px">
        <div><strong>ТН ВЭД:</strong> ${esc(display)}${entry?.name ? " — "+esc(entry.name) : ""}.</div>
        ${
          prefixes
            ? `<div style="margin-top:8px"><strong>Связанный ОКПД 2:</strong> ${esc(prefixes)}.</div>`
            : ""
        }
        <div style="margin-top:8px">
          Среди найденных по более широкой позиции ТН ВЭД строк ПП №2414
          нет строки с совместимым ОКПД 2.
        </div>
      </div>

      <div class="mr12-warning">
        <strong>Что это означает.</strong>
        Для этого полного кода ТН ВЭД не найдена строка перечня №2414 с совместимым ОКПД 2.
      </div>
    </div>
  `;

  result.classList.add("show");
  track("rop_check_semantic_none",{
    query:clean(input.value),
    tnved:display,
    okpd:prefixes
  });
}

function semanticNotice(entry,qDigits,matches){
  if(!entry)return "";

  const prefixes=(entry.okpdPrefixes||[]).join(", ");
  const heading=qDigits && qDigits.length>=4 ? qDigits.slice(0,4) : "";
  const headingDisplay=heading || "";
  const hasMultiple=matches && matches.length>1;

  return `
    <div class="mr12-warning mr12-tnved-context" style="margin-bottom:16px">
      <div><strong>Ваш ТН ВЭД: ${esc(entry.displayCode||formatTnInput(qDigits||""))}.</strong>
      ${entry.name ? " "+esc(entry.name)+"." : ""}</div>
      ${
        headingDisplay
          ? `<div style="margin-top:8px">В ПП №2414 код найден через более широкую товарную позицию <strong>${esc(headingDisplay)}</strong>.</div>`
          : ""
      }
      ${
        prefixes
          ? `<div style="margin-top:8px">Справочная связь полного кода с ОКПД 2 <strong>${esc(prefixes)}</strong>.</div>`
          : ""
      }
      ${
        hasMultiple
          ? `<div style="margin-top:8px">Показаны все найденные нормативные строки. Справочное совпадение ОКПД 2 помогает выбрать строку, но не исключает другие варианты.</div>`
          : ""
      }
    </div>
  `;
}

function renderMany(matches,semanticEntry=null){
  const choices=matches.map((m,i)=>{
    const item=m.item;
    const g=groupOf(item);

    const meta=[
      g?`Группа №${item.group} — ${g.name}`:"",
      item.okpd?`ОКПД 2 ${item.okpd}`:"",
      Number(item.section)!==3 && (item.tnvedCodes||[]).length
        ? `ТН ВЭД ${tnDisplay(item,m.rule)}`
        : ""
    ].filter(Boolean).join(" · ");

    return `
      <button class="mr12-choice" data-i="${i}" type="button">
        <span class="mr12-choice-name">${esc(item.name)}</span>${m.semanticPreferred?'<span class="mr12-choice-meta" style="color:#23764a;font-weight:700">Справочное совпадение по ОКПД 2 — проверьте характеристики</span>':m.semanticPreferred===false?'<span class="mr12-choice-meta">Справочное соответствие ОКПД 2 не установлено</span>':''}
        <span class="mr12-choice-meta">${esc(meta)}</span>
      </button>
    `;
  }).join("");

  result.innerHTML=`
    <div class="mr12-card">

      <div class="mr12-status">Найдено несколько вариантов</div>

      <div class="mr12-rtitle">
        Код встречается в нескольких строках перечня №2414.
      </div>

      <div class="mr12-row-value">
        Выберите строку, которая соответствует вашему товару или упаковке.
      </div>

      <div style="margin-top:16px">
        ${choices}
      </div>

    </div>
  `;

  result.classList.add("show");

  result.querySelectorAll("[data-i]").forEach(el=>{
    el.addEventListener("click",()=>{
      const index=Number(el.dataset.i);
      const selected=matches[index];
      choiceGoal(selected,index,matches.length);
      renderOne(selected,matches);
    });
  });

  track("rop_check_multiple",{count:matches.length});
  if(!semanticEntry)addLongTnvedNotice(matches);
}

function renderNone(query){
  result.innerHTML=`
    <div class="mr12-card">
      <div class="mr12-status">Совпадение не найдено</div>
      <div class="mr12-rtitle">По запросу «${esc(query)}» позиция не найдена.</div>
      <div class="mr12-warning">
        Проверьте написание кода или наименования. Отсутствие совпадения в поиске
        не заменяет юридическую проверку фактического товара или упаковки.
      </div>
    </div>
  `;
  result.classList.add("show");
  track("rop_check_not_found",{query_type:looksLikeOkpdInput(query)?"okpd":looksLikeTnvedInput(query)?"tnved":"text"});
}

async function resolveRopQuery(q,providedSemantic){
  let matches=search(q);
  const qDigits=exactNumericQuery(q);
  let semanticEntry=null;
  if(qDigits && qDigits.length>=6 && looksLikeTnvedInput(q) && !looksLikeOkpdInput(q)){
    try{
      const semantic=providedSemantic===undefined?await getTnvedSemantic():providedSemantic;
      semanticEntry=semantic?.codes?.[qDigits]||null;
      if(semanticEntry)matches=applySemanticFilter(matches,semanticEntry);
    }catch(e){}
  }
  return {matches,qDigits,semanticEntry};
}

async function runSearch(){
  const q=clean(input.value);
  result.classList.remove("show");
  result.innerHTML="";

  if(!q)return;

  if(!DATA_READY){
    PENDING_QUERY=q;
    state.textContent="База №2414 подготавливается. Запрос будет выполнен автоматически.";
    state.className="mr37-source-state";
    return;
  }

  const {matches,qDigits,semanticEntry}=await resolveRopQuery(q);

  if(!matches.length){
    if(semanticEntry){
      resultGoal("not_found_semantic",null,{
        tnved:semanticEntry.displayCode||formatTnInput(qDigits),
        okpd:(semanticEntry.okpdPrefixes||[]).join(", ")
      });
      renderSemanticNone(q,semanticEntry);
    }else{
      resultGoal("not_found",null,{
        method:queryType(q)
      });
      renderNone(q);
    }
    return;
  }

  if(matches.length===1){
    const only=matches[0];
    resultGoal(
      only.certainty==="confirmed" ? "found" : "requires_check",
      only,
      {results_count:1}
    );
    renderOne(only,matches);
    return;
  }

  resultGoal("multiple",null,{
    results_count:matches.length,
    method:queryType(q)
  });
  renderMany(matches,semanticEntry);
    if(semanticEntry){
      const card=result.querySelector(".mr12-card");
      if(card && !card.querySelector(".mr12-tnved-context")){
        const firstChoice=card.querySelector(".mr12-choice");
        if(firstChoice)firstChoice.insertAdjacentHTML("beforebegin",semanticNotice(semanticEntry,qDigits,matches));
      }
    }
}

function runSearchTracked(){
  const q=clean(input.value);
  if(!q)return;
  submitGoal();
  runSearch();
}

btn.addEventListener("click",runSearchTracked);
input.addEventListener("keydown",e=>{
  if(e.key==="Enter")runSearchTracked();
});

function loadDataScript(url,timeoutMs=3500){
  return new Promise((resolve,reject)=>{
    const s=document.createElement("script");
    let done=false;

    const finish=(ok,err)=>{
      if(done)return;
      done=true;
      clearTimeout(timer);
      s.onload=null;
      s.onerror=null;
      if(ok)resolve();
      else reject(err||new Error("Не удалось загрузить базу."));
    };

    const timer=setTimeout(()=>{
      try{s.remove();}catch(e){}
      finish(false,new Error("Таймаут загрузки базы."));
    },timeoutMs);

    s.src=url;
    s.async=true;
    s.onload=()=>finish(true);
    s.onerror=()=>finish(false,new Error("Ошибка загрузки базы."));
    document.head.appendChild(s);
  });
}

async function bootstrapData(){
  const sources=[
    "https://cdn.jsdelivr.net/gh/artem1285/mirlex-data@main/rop-check.data.js",
    "https://artem1285.github.io/mirlex-data/rop-check.data.js",
    "https://raw.githubusercontent.com/artem1285/mirlex-data/main/rop-check.data.js"
  ];

  for(const url of sources){
    try{
      await loadDataScript(url,3500);

      if(!window.MIRLEX_ROP_PAYLOAD){
        throw new Error("Файл загружен без базы.");
      }

      applyPayload(window.MIRLEX_ROP_PAYLOAD);
      sourceReady("База №2414 загружена: "+DATA.length+" позиций.");
      return;
    }catch(e){}
  }

  sourceFailed();
}

// Additive module: original v37 functions remain unchanged.
function mountBulkV38(){
 const box=document.createElement('div');
 box.style.cssText='margin-top:28px;border-top:1px solid #53616a;padding-top:24px';
 box.innerHTML=`<style>
 #mirlex-bulk-v41 .mb-upload{border:1px dashed #81929b;border-radius:12px;padding:24px;text-align:center;margin:16px 0;background:#26343d}
 #mirlex-bulk-v41 button{font:600 14px Inter,Arial,sans-serif;cursor:pointer;border:1px solid #b6c4cb;border-radius:8px;padding:12px 16px;background:white;color:#1F2A32}
 #mirlex-bulk-v41 button:disabled{opacity:.5;cursor:default}
 #mirlex-bulk-v41 .mb-primary{background:#3CB371;border-color:#3CB371;color:#102c20}
 #mirlex-bulk-v41 .mb-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:16px 0}
 #mirlex-bulk-v41 .mb-summary button{text-align:left;display:flex;flex-direction:column;gap:6px;border:2px solid transparent}
 #mirlex-bulk-v41 .mb-summary button[aria-pressed=true]{border-color:#3CB371}
 #mirlex-bulk-v41 .mb-summary strong{font-size:26px}
 #mirlex-bulk-v41 .mb-row{background:white;color:#1F2A32;border-bottom:1px solid #dbe3e6;padding:16px;display:grid;grid-template-columns:minmax(0,1fr) minmax(100px,auto);gap:10px}
 #mirlex-bulk-v41 .mb-row small{display:block;color:#52616b;margin-top:5px;line-height:1.5}
 #mirlex-bulk-v41 .mb-row b{overflow-wrap:anywhere}
 #mirlex-bulk-v41 .mb-details{grid-column:1/-1;min-width:0;max-width:100%;overflow-wrap:anywhere} #mirlex-bulk-v41 .mb-row>*{min-width:0;overflow-wrap:anywhere} #mirlex-bulk-v41 .mb-option{display:block;width:100%;white-space:normal;text-align:left;line-height:1.5;margin:8px 0;overflow-wrap:anywhere} #mirlex-bulk-v41 .mb-option[aria-pressed=true]{border:2px solid #23764A;background:#eaf7f0} #mirlex-bulk-v41 .mb-rate small{font-size:11px;font-weight:500} #mirlex-bulk-v41 .mb-details p{margin:8px 0;line-height:1.5;font-size:14px}
 #mirlex-bulk-v41 .mb-legal{border:1px solid #dbe3e6;border-radius:8px;padding:16px;margin:12px 0;min-width:0;overflow-wrap:anywhere} #mirlex-bulk-v41 .mb-legal .mr12-norms{grid-template-columns:repeat(auto-fit,minmax(90px,1fr))} #mirlex-bulk-v41 .mb-details select{max-width:100%;width:100%;padding:10px;margin:8px 0;color:#1F2A32;background:white;border:1px solid #b6c4cb;border-radius:6px}
 #mirlex-bulk-v41 .mb-rate{text-align:right;font-size:22px;font-weight:700;max-width:220px;overflow-wrap:anywhere}
 #mirlex-bulk-v41 .mb-nav{display:flex;gap:8px;justify-content:center;align-items:center;margin:12px 0;flex-wrap:wrap}
 @media(max-width:640px){#mirlex-bulk-v41 .mb-summary{grid-template-columns:repeat(2,minmax(0,1fr))}#mirlex-bulk-v41 .mb-row{grid-template-columns:minmax(0,1fr) minmax(65px,auto);padding:12px}#mirlex-bulk-v41 .mb-rate{font-size:18px;max-width:100px}}
 #mirlex-bulk-v41,#mirlex-bulk-v41 *{box-sizing:border-box}
 #mirlex-bulk-v41{min-width:0;max-width:100%;overflow-wrap:anywhere}
 #mirlex-bulk-v41 .mb-option{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 16px;align-items:start}
 #mirlex-bulk-v41 .mb-option-copy{min-width:0;white-space:normal;overflow-wrap:anywhere}
 #mirlex-bulk-v41 .mb-option-rate{font-size:20px;font-weight:700;white-space:nowrap;color:#1F2A32}
 #mirlex-bulk-v41 .mb-rate-note{font-size:13px;font-weight:600;line-height:1.4}
 #mirlex-bulk-v41 .mb-summary button,#mirlex-bulk-v41 input,#mirlex-bulk-v41 select{min-width:0;max-width:100%}
 #mirlex-bulk-v41 .mb-legal .mr12-row-value,#mirlex-bulk-v41 .mb-legal .mr12-rtitle{overflow-wrap:anywhere}
 #mirlex-bulk-v41 .mb-legal .mr12-norms{grid-template-columns:repeat(auto-fit,minmax(min(90px,100%),1fr))}
 @media(max-width:480px){#mirlex-bulk-v41 .mb-row{grid-template-columns:minmax(0,1fr)}#mirlex-bulk-v41 .mb-rate{text-align:left;max-width:none}#mirlex-bulk-v41 .mb-option{grid-template-columns:minmax(0,1fr)}#mirlex-bulk-v41 .mb-option-rate{font-size:18px}#mirlex-bulk-v41 .mb-legal{padding:10px}#mirlex-bulk-v41 .mb-upload{padding:14px}#mirlex-bulk-v41 .mb-summary button{padding:10px}#mirlex-bulk-v41 .mb-summary strong{font-size:22px}}
 </style><h3 style="color:white;margin:0 0 8px;font-size:23px">Массовая проверка Excel</h3><p style="color:#d1d9de;margin:0 0 14px;line-height:1.55">Загрузите свой список товаров или упаковки. Подготавливать файл заранее не нужно.</p><div class="mb-upload"><label style="display:block;cursor:pointer;color:white"><strong style="display:block;font-size:18px;margin-bottom:8px">Выберите файл Excel</strong><span style="display:inline-block;background:#3CB371;color:#102c20;padding:12px 20px;border-radius:8px;font-weight:700">Загрузить Excel</span><input type="file" accept=".xlsx" style="position:absolute;width:1px;height:1px;opacity:0" aria-label="Загрузить Excel"></label><div data-field="filename" style="color:#d1d9de;margin:10px 0;overflow-wrap:anywhere"></div><small style="color:#b9c5cd">XLSX · до 5 МБ · 2026 год · обработка в браузере</small></div><div data-field="mapping" style="margin-top:16px"></div><div role="status" data-field="status" style="margin-top:14px;line-height:1.5;color:#d1d9de"></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0"><button class="mb-primary" data-action="run" type="button" hidden disabled>Проверить список</button><button class="mb-primary" data-action="download" type="button" hidden disabled>Скачать результат Excel</button></div><div data-field="preview" style="margin-top:16px"></div>`;
 box.id='mirlex-bulk-v41';
 root.querySelector('.mr12-wrap').appendChild(box);
 const field=n=>box.querySelector(`[data-field="${n}"]`), file=box.querySelector('[type=file]'), run=box.querySelector('[data-action=run]'), download=box.querySelector('[data-action=download]');
 let book=null, mapping=null, output=null, busy=false, records=[], sourceRows=[], sourceWidth=0, activeFilter='all', page=0, semanticCache=null;
 const status=t=>field('status').textContent=t;
 function invalidate(){output=null;download.disabled=true;download.hidden=true;field('preview').replaceChildren();activeFilter='all';page=0;}
 async function library(){if(window.XLSX?.version==='0.20.3')return window.XLSX;await loadDataScript('https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js',15000);if(window.XLSX?.version!=='0.20.3')throw Error('Библиотека Excel недоступна');return window.XLSX;}
 const value=c=>c?String(c.w??c.v??''):'';
 const cellAt=(x,ws,r,c)=>c<0?null:ws[x.utils.encode_cell({r,c})];
 const normalize=v=>lower(v).replace(/[_().-]/g,' ').replace(/\s+/g,' ').trim();
 const codeHeader=/^(?:код\s*)?(?:тн\s*вэд(?:\s*еаэс)?|окпд\s*2|код|маркировка(?:\s*упаковки)?|код\s*упаковки)$/iu;
 const nameHeader=/^(?:наименование(?:\s*(?:товара|продукции|упаковки|номенклатуры|товаров))?|название(?:\s*товара)?|номенклатура|описание товара)$/iu;
 const codeLike=v=>/^(?:\d{2}\.\d{2}(?:\.\d{1,3}){1,2}|\d{10}|\d{4}(?:\s+\d{2,3}){1,3}|PET|PP|PEHD|PELD|PAP|PS|PVC)$/i.test(clean(v));
 function inspect(x,wb){
  const options=[];
  for(const sheet of wb.SheetNames){
   const ws=wb.Sheets[sheet];if(!ws||!ws['!ref'])continue;
   const range=x.utils.decode_range(ws['!fullref']||ws['!ref']);
   if(range.e.c>=100||range.e.r>=5001)throw Error('Лимит: 5001 строка и 100 столбцов на лист');
   const get=(r,c)=>value(cellAt(x,ws,r,c));
   let header=null;
   for(let r=range.s.r;r<=Math.min(range.e.r,range.s.r+19);r++){
    const codes=[],names=[];
    for(let c=range.s.c;c<=range.e.c;c++){const v=cellAt(x,ws,r,c);if(!v||v.f)continue;const t=normalize(value(v));if(codeHeader.test(t))codes.push(c);if(nameHeader.test(t))names.push(c);}
    if(codes.length||names.length){header={r,codes,names};break;}
   }
   const first=header?header.r+1:range.s.r;
   const columns=[];
   for(let c=range.s.c;c<=range.e.c;c++){
    const sample=[];for(let r=first;r<=Math.min(range.e.r,first+99);r++){const v=get(r,c);if(clean(v))sample.push(v);}
    if(sample.length)columns.push({c,sample:sample.slice(0,3),code:sample.filter(codeLike).length/sample.length,name:sample.filter(v=>/[а-яa-z]{3}/i.test(v)&&!codeLike(v)).length/sample.length});
   }
   const codes=header?.codes.length?header.codes:columns.filter(v=>v.code>=0.6).map(v=>v.c);
   const names=header?.names.length?header.names:columns.filter(v=>v.name>=0.7&&!codes.includes(v.c)).map(v=>v.c);
   options.push({sheet,first,columns,codes,names,explicit:!!header,range});
  }
  return options;
 }
 function choose(options){
  const host=field('mapping');host.replaceChildren();
  const plausible=options.filter(o=>o.codes.length||o.names.length);
  const p=plausible[0];
  if(options.length===1&&p?.explicit&&p.codes.length<=1&&p.names.length<=1&&(p.codes.length||p.names.length)){
   mapping={sheet:p.sheet,cc:p.codes[0]??-1,nc:p.names[0]??-1,start:p.first};run.disabled=false;run.hidden=false;status('Файл готов к проверке.');return;
  }
  const add=(tag,t,parent=host)=>{const e=document.createElement(tag);if(t)e.textContent=t;parent.appendChild(e);return e;};
  add('p','Подтвердите, какие данные проверять. Исходный Excel менять не нужно.');
  const sheet=add('select');sheet.setAttribute('aria-label','Лист');const code=add('select');code.setAttribute('aria-label','Столбец кода');const name=add('select');name.setAttribute('aria-label','Столбец наименования');
  const start=add('input');start.type='number';start.min='1';start.max='5001';start.setAttribute('aria-label','Первая строка данных');
  for(const e of [sheet,code,name,start])e.style.cssText='margin:6px;padding:10px;border-radius:6px;max-width:100%;color:#1F2A32;background:white';
  function opt(el,v,t){const o=document.createElement('option');o.value=v;o.textContent=t;el.appendChild(o);}
  for(const o of options)opt(sheet,o.sheet,o.sheet);
  if(plausible.length===1)sheet.value=plausible[0].sheet;
  function fill(){const o=options.find(v=>v.sheet===sheet.value);code.replaceChildren();name.replaceChildren();opt(code,'-1','Без кода');opt(name,'-1','Без наименования');for(const col of o.columns){const label='Столбец '+window.XLSX.utils.encode_col(col.c)+': '+col.sample.join(' / ').slice(0,120);opt(code,col.c,label);opt(name,col.c,label);}if(o.codes.length===1)code.value=String(o.codes[0]);if(o.names.length===1)name.value=String(o.names[0]);start.value=String(o.first+1);}
  sheet.addEventListener('change',fill);fill();
  const confirm=add('button','Подтвердить');confirm.type='button';confirm.className='mr12-button';
  confirm.addEventListener('click',()=>{const o=options.find(v=>v.sheet===sheet.value),cc=Number(code.value),nc=Number(name.value),r=Number(start.value)-1;if((cc<0&&nc<0)||cc===nc||!Number.isInteger(r)||r<o.range.s.r||r>o.range.e.r){status('Выберите разные столбцы и корректную первую строку.');return;}mapping={sheet:o.sheet,cc,nc,start:r};host.replaceChildren();run.disabled=false;run.hidden=false;status('Файл готов к проверке.');});
 }
 file.addEventListener('change',async()=>{if(busy)return;invalidate();records=[];book=null;mapping=null;field('mapping').replaceChildren();run.disabled=true;run.hidden=true;const f=file.files[0];field('filename').textContent=f?f.name:'';if(!f)return;busy=true;file.disabled=true;try{if(!/\.xlsx$/i.test(f.name)||f.size>5000000)throw Error('Выберите XLSX до 5 МБ');const x=await library();book=x.read(await f.arrayBuffer(),{type:'array',sheetRows:5002,cellFormula:true,cellText:true});const options=inspect(x,book);if(!options.length)throw Error('Нет непустых листов');choose(options);}catch(e){book=null;mapping=null;status(e.message);}finally{busy=false;file.disabled=false;run.disabled=!mapping;}});
 const headers=['статус','раздел','группа','строка перечня','ОКПД 2','ТН ВЭД','норматив, %','основание','комментарий','сноски и условия','2027, %','2028, %','2029, %'];
 function ruleText(m){const item=m.item,rule=m.rule;const notes=[...new Set([...(item.rowFootnotes||[]),...(rule?.footnotes||[]),...(Number(item.section)===3?[10,11]:[])])];return [rule?.isFrom?RULE_EXPL.from.user_text:'',...notes.map(n=>'Сноска '+n+': '+(RULE_EXPL.footnotes[String(n)]?.user_text||FOOT[String(n)]||''))].filter(Boolean).join('\n');}
 function normativeCard(m,q){const item=m.item,g=groupOf(item),rule=m.rule,n=norms(item),parts=[];
 const marks=(item.markings||[]).join(' / '),pcodes=[...(item.packagingCodes||[]),...(item.packagingRanges||[]).map(r=>r[0]+'–'+r[1])].join(', ');
 const notes=[...new Set([...(item.rowFootnotes||[]),...(rule?.footnotes||[]),...(Number(item.section)===3?[10,11]:[])])];
 if(rule)parts.push('<strong>В ПП №2414 указано:</strong> '+esc(tnDisplay(item,rule)));
 if(rule?.isFrom)parts.push('<strong>Что означает «из».</strong> '+esc(RULE_EXPL.from.user_text));
 else if(rule&&digits(rule.code).length===4&&!(rule.footnotes||[]).length)parts.push('<strong>Код без «из».</strong> '+esc(RULE_EXPL.plain_heading.user_text));
 for(const note of notes){const t=RULE_EXPL.footnotes[String(note)]?.user_text;if(t)parts.push('<strong>Сноска &lt;'+esc(note)+'&gt;.</strong> '+esc(t));}
 const el=document.createElement('div');el.className='mb-legal';el.innerHTML='<div class="mr12-rtitle">'+esc(item.name)+'</div>'+row('Раздел',item.sectionName)+row('Группа',g?'№'+item.group+' — '+g.name:'')+row('ОКПД 2',item.okpd)+row('ТН ВЭД ЕАЭС',Number(item.section)!==3?tnDisplay(item,rule):'')+row('Материал упаковки',item.material)+row('Буквенное обозначение ТР ТС 005/2011',marks)+row('Цифровой код ТР ТС 005/2011',pcodes)+renderNorms(item)+(parts.length?'<div class="mr12-warning">'+parts.map(p=>'<div style="margin:8px 0">'+p+'</div>').join('')+'</div>':'')+'<div class="mr12-warning">Принадлежность определяется по наименованию, физическим и химическим характеристикам. Обязанность конкретного лица определяется отдельно.</div><a class="mr12-source-link" href="'+OFFICIAL_URL+'" target="_blank" rel="noopener">Постановление Правительства РФ №2414</a>';return el;}

 function candidateResult(m,statusText,comment){const item=m.item,g=groupOf(item),n=norms(item)[2026];return [statusText,item.sectionName,String(item.group)+(g?' — '+g.name:''),item.name,item.okpd||'',Number(item.section)===3?'':tnDisplay(item,m.rule),n??'',Number(item.section)===1?'ПП РФ №2414':'ПП РФ №2414; 451-ФЗ, ст.7 ч.5',comment,ruleText(m),norms(item)[2027]??'',norms(item)[2028]??'',norms(item)[2029]??''];}
 function blank(s,why){return [s,'','','','','','','ПП РФ №2414',why];}
 async function classify(code,name,year,semantic){
  const q=clean(code)||clean(name);if(!q)return {res:blank('Требуется уточнение','Нет кода и наименования'),matches:[]};
  const {matches,semanticEntry:entry}=await resolveRopQuery(q,semantic);
  if(!matches.length)return {res:blank('Не найдено в перечне','Поиск не подтвердил строку; не означает отсутствия обязанности. Упаковка проверяется отдельно.'),matches:[]};
  const m=matches[0],item=m.item;
  const nameReview=false; // Preserve single-search candidate set.
  if(matches.length===1&&m.certainty==='confirmed'&&!nameReview)return {res:candidateResult(m,'Позиция найдена','Принадлежность и обязанность конкретного лица проверяются отдельно'),matches};
  const groups=[...new Set(matches.map(x=>String(x.item.group)))];
  const rates=[...new Set(matches.map(x=>norms(x.item)[year]).filter(v=>v!=null))];
  const res=matches.length===1?candidateResult(m,'Требуется уточнение','Предварительный норматив. '+(m.reason||'Сверьте фактические характеристики')):['Требуется уточнение',[...new Set(matches.map(x=>x.item.sectionName))].join('; '),groups.join('; '),matches.map(x=>x.item.name).join(' | ').slice(0,30000),'','',rates.join(' / '),'ПП РФ №2414; для упаковки 451-ФЗ, ст.7 ч.5','Предварительные нормативы. Выберите фактическую строку перечня.'];
  if(matches.length>1)res.push(matches.map(x=>'Группа '+x.item.group+' — '+x.item.name+': '+ruleText(x)).join('\n').slice(0,30000),'','','');return {res,matches};
 }
 function renderResults(){
  const x=window.XLSX,counts={};for(const z of records)counts[z.res[0]]=(counts[z.res[0]]||0)+1;
  const byRow=new Map(records.map(z=>[z.row,z.res])),start=mapping.start;
  const out=sourceRows.map((row,i)=>[...row,...(byRow.get(i+1)||(i===start-1?headers:[]))]);if(start===0)out.unshift([...Array(sourceWidth).fill(''),...headers]);
  const wb=x.utils.book_new();x.utils.book_append_sheet(wb,x.utils.aoa_to_sheet(out),'Результаты');x.utils.book_append_sheet(wb,x.utils.aoa_to_sheet([['Статус','Количество'],...Object.entries(counts),['Год','2026'],['Лист',mapping.sheet],['Источник',OFFICIAL_URL],['Ограничение','Нормативы спорных строк предварительные. Выбор пользователя не является юридическим заключением. Исходные отображаемые значения сохранены текстом.']]),'Сводка');output=wb;download.disabled=false;download.hidden=false;run.hidden=true;
  status('Проверено: '+records.length+'. '+Object.entries(counts).map(([k,v])=>k+': '+v).join('; '));
  const preview=field('preview');preview.replaceChildren();
  const add=(tag,t,parent=preview)=>{const e=document.createElement(tag);if(t!==undefined)e.textContent=t;parent.appendChild(e);return e;};
  const kind=z=>z.res[0]==='Позиция найдена'||z.res[0]==='Выбрано пользователем'?'found':z.res[0]==='Не найдено в перечне'?'none':'review';
  const filters=[['all','Всего позиций',records.length],['found','Найдено / выбрано',records.filter(z=>kind(z)==='found').length],['review','Уточнить',records.filter(z=>kind(z)==='review').length],['none','Не найдено',records.filter(z=>kind(z)==='none').length]];
  add('p','Сначала откройте «Уточнить» и разберите спорные позиции. Затем скачайте Excel. Если информации не хватает, оставьте позицию без подтверждения.');const summary=add('div');summary.className='mb-summary';const items=add('div'),nav=add('div');nav.className='mb-nav';
  function draw(){
   summary.replaceChildren();items.replaceChildren();nav.replaceChildren();
   for(const [key,label,n] of filters){const btn=add('button',undefined,summary);btn.type='button';btn.setAttribute('aria-pressed',String(activeFilter===key));const count=add('strong',String(n),btn);count.style.color=key==='review'?'#9a6213':key==='found'?'#23764A':'#1F2A32';add('span',label,btn);btn.onclick=()=>{activeFilter=key;page=0;draw();};}
   const list=records.filter(z=>activeFilter==='all'||kind(z)===activeFilter),size=20,pages=Math.max(1,Math.ceil(list.length/size));page=Math.min(page,pages-1);
   if(!list.length)add('p','Нет позиций в этой категории.',items);
   for(const z of list.slice(page*size,(page+1)*size)){
    const r=add('div',undefined,items);r.className='mb-row';const info=add('div',undefined,r);add('b',z.name||z.code||'Строка '+z.row,info);add('small',[z.name?z.code:'','Строка '+z.row].filter(Boolean).join(' · '),info);
    const label=add('small',z.res[0],info);label.style.color=kind(z)==='review'?'#8A6418':kind(z)==='found'?'#23764A':'#52616b';label.style.fontWeight='700';
    const reviewing=kind(z)==='review';
    const groupIds=[...new Set(z.matches.map(m=>String(m.item.group)))];
    const candidateRates=z.matches.map(m=>norms(m.item)[2026]);
    const distinctRates=[...new Set(candidateRates.filter(v=>v!==null&&v!==undefined&&v!=='' ).map(String))];
    const divergent=reviewing&&z.matches.length>1&&(distinctRates.length>1||candidateRates.some(v=>v===null||v===undefined||v===''));
    if(z.res[2])add('small',reviewing&&groupIds.length>1?'Возможные группы: '+groupIds.join(', '):'Группа: '+z.res[2],info);
    const rate=add('div',undefined,r);rate.className='mb-rate';
    if(divergent){const note=add('div','Норматив зависит от выбора строки',rate);note.className='mb-rate-note';}
    else {add('span',z.res[6]!==''?String(z.res[6]).split(' / ').join('% / ')+'%':'—',rate);if(reviewing&&z.res[6]!=='')add('small','Предварительно',rate);}
    const details=add('details',undefined,r);details.className='mb-details';add('summary',kind(z)==='review'&&z.matches.length?'Уточнить позицию':'Подробнее',details);
    if(kind(z)!=='review'){const m=z.selectedMatch|| (z.matches.length===1?z.matches[0]:null);if(m)details.appendChild(normativeCard(m,z.code));else add('p',z.res[8],details);}
    if(kind(z)==='review'&&!z.matches.length){add('p',z.res[8],details);add('p','Уточните код или наименование в исходном документе либо проверьте исправленный код в одиночном поиске выше.',details);} if(z.matches.length&&kind(z)==='review'){
     add('p',z.matches.length===1?'Найдена одна строка перечня. Проверьте условия её применения.':divergent?'Уточните вид товара или упаковки: нормативы различаются. Сопоставьте характеристики с наименованиями и условиями строк ниже.':'Выберите строку перечня, соответствующую фактическим характеристикам товара или упаковки.',details);
     const cardHost=add('div',undefined,details);let selected=z.matches.length===1?0:null;
     const choices=[];const choiceHost=add('div',undefined,details);details.insertBefore(choiceHost,cardHost);
     if(z.matches.length>1)z.matches.forEach((m,i)=>{const item=m.item,g=groupOf(item),button=add('button',undefined,choiceHost);button.type='button';button.className='mb-option';button.setAttribute('aria-pressed','false');const copy=add('span',undefined,button);copy.className='mb-option-copy';add('b',Number(item.section)===3?(g?.name||item.name):item.name,copy);if(m.semanticPreferred===true)add('small','Справочное совпадение ОКПД 2 — проверьте характеристики',copy);else if(m.semanticPreferred===false)add('small','Справочное соответствие ОКПД 2 не установлено',copy);add('small',[g?'Группа №'+item.group+' — '+g.name:'',item.okpd?'ОКПД 2 '+item.okpd:'',Number(item.section)!==3?'ТН ВЭД '+tnDisplay(item,m.rule):item.material||''].filter(Boolean).join(' · '),copy);const conditions=ruleText(m);if(conditions)add('small',conditions,copy);const n=norms(item)[2026];const pct=add('span',n===null||n===undefined||n===''?'—':String(n)+'%',button);pct.className='mb-option-rate';choices.push(button);button.onclick=()=>{selected=i;choices.forEach((v,j)=>v.setAttribute('aria-pressed',String(i===j)));cardHost.replaceChildren(normativeCard(m,z.code));confirm.disabled=false;};});
     if(selected!==null)cardHost.appendChild(normativeCard(z.matches[selected],z.code));
     const confirm=add('button','Подтвердить соответствие',details);confirm.type='button';confirm.className='mb-primary';confirm.disabled=selected===null;confirm.onclick=()=>{if(selected===null)return;if(!window.confirm('Подтверждаете соответствие фактического товара и всех условий выбранной строки?'))return;z.selectedMatch=z.matches[selected];z.res=candidateResult(z.selectedMatch,'Выбрано пользователем','Строка выбрана пользователем; обязанность проверяется отдельно.');renderResults();};
     add('small','Если характеристик недостаточно, оставьте позицию на уточнении.',details);
    }
    const edit=add('details',undefined,r);edit.className='mb-details';add('summary','Исправить запрос / проверить другой код',edit);
    const codeEdit=add('input',undefined,edit);codeEdit.type='text';codeEdit.value=z.code;codeEdit.setAttribute('aria-label','Код для повторной проверки');codeEdit.style.cssText='width:100%;max-width:400px;padding:10px;margin:8px 0;border:1px solid #b6c4cb;border-radius:6px;color:#1F2A32;background:white';
    const retry=add('button','Проверить заново',edit);retry.type='button';retry.onclick=async()=>{if(busy)return;retry.disabled=true;try{const q=clean(codeEdit.value);if(!q)return;const next=await classify(q,z.name,'2026',semanticCache);z.code=q;z.matches=next.matches;z.res=next.res;z.selectedMatch=null;z.res[8]+=' Запрос исправлен пользователем: '+q+'. Исходная строка Excel сохранена.';renderResults();}finally{retry.disabled=false;}};
   }
   if(pages>1){const prev=add('button','Назад',nav);prev.type='button';prev.disabled=page===0;prev.onclick=()=>{page--;draw();};add('span','Страница '+(page+1)+' из '+pages,nav);const next=add('button','Далее',nav);next.type='button';next.disabled=page>=pages-1;next.onclick=()=>{page++;draw();};}
  }
  draw();add('p','Проверка перечня не является окончательным определением обязанности. Нормативы спорных строк предварительные.');

 }
 run.addEventListener('click',async()=>{if(busy)return;invalidate();if(!DATA_READY){status('База не прошла самопроверку или ещё загружается');return;}if(!book||!mapping){status('Сначала загрузите Excel');return;}busy=true;run.disabled=true;file.disabled=true;try{
  const x=window.XLSX, ws=book.Sheets[mapping.sheet];if(!ws||!ws['!ref'])throw Error('Пустой лист');
  const range=x.utils.decode_range(ws['!fullref']||ws['!ref']);if(range.e.r>=5001||range.e.c>=100)throw Error('Лимит: 5001 строка и 100 столбцов');
  const {cc,nc,start}=mapping,year='2026';if(start>range.e.r)throw Error('Нет строк для проверки');
  const src=[], results=[];let semantic=null;try{semantic=await getTnvedSemantic();}catch(e){}semanticCache=semantic;
  const cell=(r,c)=>c<0?null:ws[x.utils.encode_cell({r,c})];
  const val=c=>c?String(c.w??c.v??''):'';
  const counts={};
  for(let r=0;r<=range.e.r;r++){
   const row=Array.from({length:range.e.c+1},(_,c)=>val(cell(r,c)));src.push(row);
   if(r<start||!row.some(v=>v.trim()))continue;
   const a=cell(r,cc),b=cell(r,nc);let result;
   if(a?.f||b?.f||a?.F||b?.F||a?.t==='e'||b?.t==='e'||(a?.t==='n'&&(!Number.isSafeInteger(a.v)||/[eE+]/.test(val(a))||!(/^(?:\d{1,2}|\d{4}|\d{10})$/.test(val(a))))))result={res:blank('Требуется уточнение','Формула, ошибка или неоднозначное числовое представление кода'),matches:[]};
   else result=await classify(val(a),val(b),year,semantic);
   results.push({row:r+1,code:val(a),name:val(b),...result});
   if(r%100===0){status('Обработано строк: '+results.length);await new Promise(resolve=>setTimeout(resolve,0));}
  }
  if(!results.length)throw Error('Нет строк для проверки');
  records=results;sourceRows=src;sourceWidth=range.e.c+1;renderResults();
 }catch(e){status(e.message);invalidate();}finally{busy=false;run.disabled=false;file.disabled=false;}});
 download.addEventListener('click',()=>{if(output)window.XLSX.writeFile(output,'MIRLEX_ROP_check.xlsx',{compression:true});});
}
try{mountBulkV38();}catch(e){console.error('MIRLEX bulk module unavailable',e);}

bootstrapData();

})();

})();
