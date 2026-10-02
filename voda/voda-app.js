(function(){
'use strict';

const ROOT_ID='mirlex-voda-root';

function currentScriptBase(){
  const s=document.currentScript;
  if(s && s.src) return s.src.replace(/\/[^\/?#]+(?:[?#].*)?$/,'/');
  return 'https://artem1285.github.io/mirlex-data/voda/';
}
const BASE=currentScriptBase();

const state={
  selectedGroups:[],
  answers:{},
  phase:'intro',
  index:0,
  currentSection:'',
  startedAt:null,
  cfg:null, processes:null, rules:null, docs:null
};

const $=(sel,ctx=document)=>ctx.querySelector(sel);
const esc=(s)=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

function arr(v){ return Array.isArray(v)?v:(v===undefined||v===null?[]:[v]); }
function includesAnswer(id, value){ return arr(state.answers[id]).includes(value); }
function includesAny(id, values){ const a=arr(state.answers[id]); return arr(values).some(v=>a.includes(v)); }

function evalCond(cond){
  if(!cond) return true;
  if(cond.selectedGroup) return state.selectedGroups.includes(cond.selectedGroup);
  if(cond.answerEquals){
    return Object.entries(cond.answerEquals).every(([id,v])=>state.answers[id]===v);
  }
  if(cond.answerIn){
    return Object.entries(cond.answerIn).every(([id,vals])=>arr(vals).includes(state.answers[id]));
  }
  if(cond.answerIncludes){
    return Object.entries(cond.answerIncludes).every(([id,v])=>includesAnswer(id,v));
  }
  if(cond.answerIncludesAny){
    return Object.entries(cond.answerIncludesAny).every(([id,vals])=>includesAny(id,vals));
  }
  if(cond.answerNotIncludes){
    return Object.entries(cond.answerNotIncludes).every(([id,v])=>!includesAnswer(id,v));
  }
  if(cond.anyOf) return cond.anyOf.some(evalCond);
  if(cond.allOf) return cond.allOf.every(evalCond);
  return true;
}

function style(){
  if($('#mirlex-voda-style')) return;
  const st=document.createElement('style');
  st.id='mirlex-voda-style';
  st.textContent=`
  #${ROOT_ID}{font-family:Inter,Arial,sans-serif;color:#1F2A32;max-width:1040px;margin:0 auto}
  #${ROOT_ID}[hidden]{display:none!important}
  #${ROOT_ID} *{box-sizing:border-box}
  .mv-wrap{background:#fff;border:1px solid #dfe5e7;border-radius:20px;padding:28px;box-shadow:0 12px 40px rgba(31,42,50,.06)}
  .mv-top{display:flex;justify-content:space-between;align-items:flex-start;gap:18px;margin-bottom:18px}
  .mv-brand{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#3CB371}
  .mv-meta{text-align:right}
  .mv-stage{font-size:13px;color:#7a858c;margin-bottom:3px}
  .mv-time{font-size:14px;color:#52616a;white-space:nowrap}
  .mv-kicker{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#3CB371;margin-bottom:8px}
  .mv-title{font-size:30px;line-height:1.15;margin:0 0 12px;font-weight:750}
  .mv-text{font-size:16px;line-height:1.55;margin:0 0 18px;color:#42515a}
  .mv-note{font-size:13px;line-height:1.5;color:#60717a;background:#f4f7f8;border-radius:12px;padding:12px 14px;margin:14px 0}
  .mv-progress{height:6px;background:#edf1f2;border-radius:99px;overflow:hidden;margin:0 0 24px}
  .mv-progress>i{display:block;height:100%;background:#3CB371;border-radius:99px;transition:width .2s ease}
  .mv-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:18px 0}
  .mv-option{border:1px solid #d9e1e4;border-radius:14px;padding:14px 15px;cursor:pointer;background:#fff;text-align:left;font-size:15px;line-height:1.35;color:#1F2A32;transition:.15s}
  .mv-option:hover{border-color:#8bc9a8}
  .mv-option.is-selected{border-color:#3CB371;background:#f0faf4;box-shadow:inset 0 0 0 1px #3CB371}
  .mv-hint{font-size:13px;color:#708089;margin-top:5px;line-height:1.35}
  .mv-textarea{width:100%;min-height:120px;border:1px solid #cfd9dd;border-radius:14px;padding:14px;font:inherit;resize:vertical}
  .mv-actions{display:flex;gap:10px;justify-content:space-between;align-items:center;margin-top:22px;flex-wrap:wrap}
  .mv-btn{appearance:none;border:0;border-radius:12px;padding:13px 18px;font-size:15px;font-weight:700;cursor:pointer}
  .mv-primary{background:#1F2A32;color:#fff}
  .mv-primary:hover{opacity:.92}
  .mv-secondary{background:#eef2f3;color:#1F2A32}
  .mv-step{font-size:13px;color:#718089}
  .mv-summary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:16px 0}
  .mv-summary>div{background:#f5f7f8;border-radius:12px;padding:13px}
  .mv-flags{display:grid;gap:10px;margin:18px 0}
  .mv-flag{border-left:4px solid #3CB371;background:#f5f8f6;padding:13px 14px;border-radius:10px;line-height:1.45}
  .mv-flag.red{border-left-color:#9b3d35;background:#fbf4f3}
  .mv-flag.check{border-left-color:#3CB371}
  .mv-flag small{display:block;color:#66767f;margin-top:6px}
  .mv-error{padding:16px;border-radius:12px;background:#fff3f1;color:#7a2e27}
  @media(max-width:700px){.mv-wrap{padding:20px}.mv-title{font-size:24px}.mv-options,.mv-summary{grid-template-columns:1fr}.mv-btn{width:100%}.mv-top{display:block}.mv-meta{text-align:left;margin-top:7px}}
  `;
  document.head.appendChild(st);
}

function root(){ return document.getElementById(ROOT_ID); }

function stageName(){
  if(state.phase==='intro') return 'Диагностика';
  if(state.phase==='groups') return 'Водный профиль';
  if(state.phase==='questions'){
    return state.currentSection==='docs' ? 'Документы' : 'Водный профиль';
  }
  if(state.phase==='result') return 'Результат';
  return '';
}

function conditionMayBecomeTrue(cond){
  if(!cond) return true;
  if(cond.selectedGroup) return state.selectedGroups.includes(cond.selectedGroup);
  if(cond.anyOf) return cond.anyOf.some(conditionMayBecomeTrue);
  if(cond.allOf) return cond.allOf.every(conditionMayBecomeTrue);

  const checks=[
    ['answerEquals', (v,want)=>v===want],
    ['answerIn', (v,want)=>arr(want).includes(v)],
    ['answerIncludes', (v,want)=>arr(v).includes(want)],
    ['answerIncludesAny', (v,want)=>arr(want).some(x=>arr(v).includes(x))],
    ['answerNotIncludes', (v,want)=>!arr(v).includes(want)]
  ];
  for(const [key,test] of checks){
    if(cond[key]){
      return Object.entries(cond[key]).every(([id,want])=>{
        if(state.answers[id]===undefined) return true;
        return test(state.answers[id],want);
      });
    }
  }
  return true;
}

function remainingText(){
  if(state.phase==='result') return 'Диагностика завершена';
  if(!state.startedAt) return 'Обычно 3–6 минут';

  const all=(typeof candidateQuestions==='function'?candidateQuestions():[]);
  const remaining=all.filter(q=>state.answers[q.id]===undefined && conditionMayBecomeTrue(q.when)).length;

  if(remaining<=1) return 'Почти готово';

  const answered=Math.max(1,Object.keys(state.answers).length);
  const elapsed=Math.max(1,(Date.now()-state.startedAt)/1000);
  const observed=Math.max(8,Math.min(18,elapsed/answered));
  const base=(state.rules&&state.rules.secondsPerQuestion)||12;
  const sec=remaining*Math.max(base,observed);
  const min=Math.max(1,Math.ceil(sec/60));
  return 'Осталось примерно '+min+' '+(min===1?'минута':(min>=2&&min<=4?'минуты':'минут'));
}

function shell(html){
  const r=root(); if(!r) return;
  r.innerHTML='<div class="mv-wrap">'+
    '<div class="mv-top"><div class="mv-brand">MIRLEX · ВОДА</div>'+
    '<div class="mv-meta"><div class="mv-stage">'+esc(stageName())+'</div>'+
    '<div class="mv-time">'+esc(remainingText())+'</div></div></div>'+
    html+'</div>';
}
function progress(pos,total){
  const p=total?Math.max(0,Math.min(100,Math.round((pos/total)*100))):0;
  return `<div class="mv-progress"><i style="width:${p}%"></i></div>`;
}

async function loadJson(name){
  const res=await fetch(BASE+name+'?v='+encodeURIComponent(Date.now()),{cache:'no-store'});
  if(!res.ok) throw new Error(name+': HTTP '+res.status);
  return res.json();
}

async function init(){
  style();
  const r=root();
  if(r) r.hidden=true;
  try{
    const [cfg,processes,rules,docs]=await Promise.all([
      loadJson('voda-config.json'),
      loadJson('voda-processes.json'),
      loadJson('voda-rules.json'),
      loadJson('voda-documents.json')
    ]);
    state.cfg=cfg; state.processes=processes; state.rules=rules; state.docs=docs;
    const r=root();
    if(r){ r.hidden=true; r.innerHTML=''; }
  }catch(e){
    console.error('[MIRLEX WATER]',e);
  }
}

function renderIntro(){
  state.phase='intro'; state.index=0;
  shell(`
    <h2 class="mv-title">Разберём водный профиль предприятия</h2>
    <p class="mv-text">Ответьте простыми словами, откуда поступает вода, как используется, куда уходит и есть ли связь с природным водным объектом. Экологические термины знать не нужно.</p>
    <div class="mv-note">Онлайн-диагностика помогает собрать фактическую схему предприятия и отметить вопросы, которые требуют профессиональной проверки. Окончательный вывод делается после проверки документов.</div>
    <div class="mv-actions"><span></span><button class="mv-btn mv-primary" id="mv-start">Начать диагностику</button></div>
  `);
  $('#mv-start',root()).onclick=()=>{
    state.startedAt=Date.now();
    state.phase='groups';
    renderGroups();
  };
}

function renderGroups(){
  const groups=state.processes.groups||[];
  shell(`
    <h3 class="mv-title">Как предприятие использует воду или водный объект?</h3>
    <p class="mv-text">Можно выбрать несколько вариантов.</p>
    <div class="mv-options">${groups.map(g=>`
      <button type="button" class="mv-option ${state.selectedGroups.includes(g.id)?'is-selected':''}" data-id="${esc(g.id)}">
        <strong>${esc(g.title)}</strong><div class="mv-hint">${esc(g.hint||'')}</div>
      </button>`).join('')}</div>
    <div class="mv-actions">
      <button class="mv-btn mv-secondary" id="mv-back">Назад</button>
      <button class="mv-btn mv-primary" id="mv-next" ${state.selectedGroups.length?'':'disabled'}>Продолжить</button>
    </div>
  `);
  root().querySelectorAll('.mv-option').forEach(btn=>btn.onclick=()=>{
    const id=btn.dataset.id;
    const g=groups.find(x=>x.id===id);
    if(g?.exclusive){
      state.selectedGroups=[id];
    }else{
      state.selectedGroups=state.selectedGroups.filter(x=>!groups.find(g2=>g2.id===x)?.exclusive);
      state.selectedGroups=state.selectedGroups.includes(id)?state.selectedGroups.filter(x=>x!==id):[...state.selectedGroups,id];
    }
    renderGroups();
  });
  $('#mv-back',root()).onclick=renderIntro;
  const n=$('#mv-next',root()); if(n) n.onclick=()=>{
    state.phase='questions'; state.index=0; renderQuestion();
  };
}

function candidateQuestions(){
  const out=[];
  state.selectedGroups.forEach(id=>{
    (state.rules.branches?.[id]||[]).forEach(q=>out.push({...q,_section:'branch'}));
  });
  (state.rules.common||[]).forEach(q=>out.push({...q,_section:'common'}));
  (state.docs.questions||[]).forEach(q=>out.push({...q,_section:'docs'}));
  const seen=new Set();
  return out.filter(q=>{
    if(seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });
}
function visibleQuestions(){
  return candidateQuestions().filter(q=>evalCond(q.when));
}

function writeAnswer(q,value){
  state.answers[q.id]=value;
}

function questionControl(q){
  const val=state.answers[q.id];
  if(q.type==='text'){
    return `<textarea class="mv-textarea" id="mv-input" placeholder="Напишите кратко">${esc(val||'')}</textarea>`;
  }
  const selected=arr(val);
  return `<div class="mv-options">${(q.options||[]).map(o=>`
    <button type="button" class="mv-option ${selected.includes(o)?'is-selected':''}" data-value="${esc(o)}">${esc(o)}</button>
  `).join('')}</div>`;
}

function renderQuestion(){
  const qs=visibleQuestions();
  if(state.index>=qs.length){ renderResult(); return; }
  const q=qs[state.index];
  state.currentSection=q._section||'';
  shell(`
    ${progress(state.index+1,qs.length)}
    <div class="mv-step">Вопрос ${state.index+1} из ${qs.length}</div>
    <h3 class="mv-title">${esc(q.title)}</h3>
    ${q.hint?`<p class="mv-text">${esc(q.hint)}</p>`:''}
    ${questionControl(q)}
    <div class="mv-actions">
      <button class="mv-btn mv-secondary" id="mv-back">Назад</button>
      <button class="mv-btn mv-primary" id="mv-next">Продолжить</button>
    </div>
  `);

  if(q.type==='single'){
    root().querySelectorAll('.mv-option').forEach(btn=>btn.onclick=()=>{
      writeAnswer(q,btn.dataset.value); renderQuestion();
    });
  }else if(q.type==='multi'){
    root().querySelectorAll('.mv-option').forEach(btn=>btn.onclick=()=>{
      const v=btn.dataset.value;
      let a=arr(state.answers[q.id]);
      const exclusive=(q.exclusiveOptions||[]).includes(v);
      if(exclusive) a=[v];
      else{
        a=a.filter(x=>!(q.exclusiveOptions||[]).includes(x));
        a=a.includes(v)?a.filter(x=>x!==v):[...a,v];
      }
      writeAnswer(q,a); renderQuestion();
    });
  }

  $('#mv-back',root()).onclick=()=>{
    if(state.index<=0){ state.phase='groups'; renderGroups(); }
    else{ state.index--; renderQuestion(); }
  };

  $('#mv-next',root()).onclick=()=>{
    if(q.type==='text'){
      const v=$('#mv-input',root()).value.trim();
      if(v) writeAnswer(q,v);
    }
    const has=q.type==='multi'?arr(state.answers[q.id]).length>0:String(state.answers[q.id]??'').trim()!=='';
    if(!has){
      const btn=$('#mv-next',root());
      btn.textContent='Выберите ответ';
      return;
    }
    const after=visibleQuestions();
    const currentId=q.id;
    const idx=after.findIndex(x=>x.id===currentId);
    state.index=(idx>=0?idx:state.index)+1;
    renderQuestion();
  };
}

function diagnosticChecks(){
  return (state.rules.checks||[]).filter(c=>evalCond(c.when));
}
function selectedGroupNames(){
  return state.selectedGroups.map(id=>state.processes.groups.find(g=>g.id===id)?.title).filter(Boolean);
}
function docsSelected(){
  return arr(state.answers.documents_present).filter(x=>!['Ничего из перечисленного','Не знаю'].includes(x));
}

function renderResult(){
  state.phase='result';
  const checks=diagnosticChecks();
  const groups=selectedGroupNames();
  const docs=docsSelected();
  shell(`
    <h3 class="mv-title">Предварительные итоги</h3>
    <p class="mv-text">По предварительным итогам собрана фактическая схема водопользования предприятия и отмечены вопросы, которые требуют проверки. Это предварительный результат, а не готовое юридическое заключение.</p>
    <div class="mv-summary">
      <div><strong>Водный профиль</strong><br>${esc(groups.join('; ')||'Описание получено')}</div>
      <div><strong>Документы</strong><br>${esc(docs.join('; ')||'Не подтверждены')}</div>
      <div><strong>Категория НВОС</strong><br>${esc(state.answers.nvos_category||'Не указана')}</div>
      <div><strong>Площадка</strong><br>${esc(state.answers.site_location||'Не указана')}</div>
    </div>
    <h3>Что требует проверки</h3>
    <div class="mv-flags">
      ${checks.length?checks.map(c=>`
        <div class="mv-flag ${c.severity==='red'?'red':'check'}">
          ${esc(c.public)}
          ${c.requires?.length?`<small>Для вывода нужны: ${esc(c.requires.join(', '))}.</small>`:''}
        </div>`).join(''):
        '<div class="mv-flag">По ответам явных противоречий не выявлено. Окончательный вывод возможен после проверки документов и фактической схемы.</div>'}
    </div>
    <div class="mv-note">${esc(state.cfg.legalNote||'')}</div>
    <div class="mv-actions">
      <button class="mv-btn mv-secondary" id="mv-back">Назад</button>
      <button class="mv-btn mv-primary" id="mv-form-open">Получить полный результат по воде</button>
    </div>
  `);
  $('#mv-back',root()).onclick=()=>{
    state.phase='questions';
    const qs=visibleQuestions();
    state.index=Math.max(0,qs.length-1);
    renderQuestion();
  };
  $('#mv-form-open',root()).onclick=openTildaForm;
}

function formatAnswer(v){ return Array.isArray(v)?v.join(', '):String(v??''); }
function labels(){
  const map={};
  Object.values(state.rules.branches||{}).forEach(list=>list.forEach(q=>map[q.id]=q.title));
  (state.rules.common||[]).forEach(q=>map[q.id]=q.title);
  (state.docs.questions||[]).forEach(q=>map[q.id]=q.title);
  return map;
}
function buildTildaReport(){
  const lm=labels();
  const answerLines=Object.entries(state.answers).map(([id,v])=>(lm[id]||id)+': '+formatAnswer(v));
  const checks=diagnosticChecks();
  return {
    voda_versiya:state.cfg.version||'voda',
    voda_processy:selectedGroupNames().join('; '),
    voda_status_obekta:state.answers.nvos_category||'Не указан',
    voda_dokumenty:docsSelected().join('; ')||'Не подтверждены',
    voda_otvety_diagnostiki:answerLines.join(' | '),
    voda_rezultat_proverki:checks.map(c=>`[${c.id}] ${c.public}`).join(' | ')||'По ответам явных противоречий не выявлено',
    voda_vremya_prohozhdeniya:state.startedAt?Math.max(0,Math.round((Date.now()-state.startedAt)/1000))+' сек.':'',
    voda_stranitsa:location.href
  };
}
function findTildaForm(){
  const marker=document.querySelector('form [name="voda_otvety_diagnostiki"]');
  return marker?marker.closest('form'):null;
}
function fillForm(form){
  const data=buildTildaReport();
  Object.entries(data).forEach(([name,value])=>{
    const f=form.querySelector(`[name="${name}"]`);
    if(f){
      f.value=value; f.setAttribute('value',value);
      f.dispatchEvent(new Event('input',{bubbles:true}));
      f.dispatchEvent(new Event('change',{bubbles:true}));
    }
  });
}
function triggerPopup(){
  const a=document.createElement('a');
  a.href=state.cfg.popupHash||'#popup:voda';
  a.style.display='none';
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>a.remove(),100);
}
function openTildaForm(){
  const form=findTildaForm();
  if(!form){
    shell(`<div class="mv-error"><strong>Форма заявки WATER ещё не подключена.</strong><br>
    В popup Tilda добавьте скрытые поля: voda_versiya, voda_processy, voda_status_obekta, voda_dokumenty, voda_otvety_diagnostiki, voda_rezultat_proverki, voda_vremya_prohozhdeniya, voda_stranitsa.</div>
    <div class="mv-actions"><button class="mv-btn mv-secondary" id="mv-back-result">Назад</button></div>`);
    $('#mv-back-result',root()).onclick=renderResult;
    return;
  }
  fillForm(form); triggerPopup();
}

function openQuiz(){
  if(!state.cfg){ return; }
  const r=root();
  if(!r) return;
  r.hidden=false;
  renderIntro();
  setTimeout(()=>r.scrollIntoView({
    behavior:window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',
    block:'start'
  }),60);
}

function isVodaHash(){
  return location.hash==='#proverit-vodu' || location.hash==='#rec4437101601';
}

document.addEventListener('click',e=>{
  const a=e.target.closest('a[href="#proverit-vodu"],a[href="#rec4437101601"],button[data-voda-open]');
  if(!a) return;
  e.preventDefault();
  openQuiz();
});

window.MIRLEX_VODA={
  open:openQuiz,
  getState:()=>JSON.parse(JSON.stringify(state)),
  getReport:buildTildaReport,
  getChecks:diagnosticChecks
};

document.addEventListener('DOMContentLoaded',init);
if(document.readyState!=='loading') init();

window.addEventListener('hashchange',()=>{
  if(isVodaHash()) openQuiz();
});
})();