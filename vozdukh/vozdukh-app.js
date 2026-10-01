(function(){
  if(!document.getElementById('mirlex-vozdukh-root')){
    var root=document.createElement('div');
    root.id='mirlex-vozdukh-root';
    root.hidden=true;
    var current=document.currentScript;
    if(current&&current.parentNode) current.parentNode.insertBefore(root,current);
    else document.body.appendChild(root);
  }
  if(!document.getElementById('mirlex-vozdukh-style')){
    var style=document.createElement('style');
    style.id='mirlex-vozdukh-style';
    style.textContent="\n#mirlex-vozdukh-root{font-family:Inter,Arial,sans-serif;color:#1F2A32;background:#E6EBED;margin:0}\n#mirlex-vozdukh-root[hidden]{display:none!important}\n#mirlex-vozdukh-root.mvx-open{display:block!important;padding:56px 20px}\n#mirlex-vozdukh-root *{box-sizing:border-box}\n#mirlex-vozdukh-root .mvx-shell{max-width:980px;margin:0 auto}\n#mirlex-vozdukh-root .mvx-card{background:#fff;border-radius:24px;padding:40px;box-shadow:0 10px 35px rgba(31,42,50,.08)}\n#mirlex-vozdukh-root .mvx-top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:22px}\n#mirlex-vozdukh-root .mvx-kicker{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#3CB371}\n#mirlex-vozdukh-root .mvx-meta{text-align:right}\n#mirlex-vozdukh-root .mvx-stage{font-size:13px;color:#7a858c;margin-bottom:3px}\n#mirlex-vozdukh-root .mvx-time{font-size:14px;color:#52616a;white-space:nowrap}\n#mirlex-vozdukh-root .mvx-progress{height:6px;background:#dde4e7;border-radius:99px;overflow:hidden;margin:0 0 26px}\n#mirlex-vozdukh-root .mvx-progress>i{display:block;height:100%;background:#3CB371;transition:width .2s ease}\n#mirlex-vozdukh-root h2{font-size:38px;line-height:1.12;margin:0 0 14px}\n#mirlex-vozdukh-root h3{font-size:28px;line-height:1.2;margin:0 0 12px}\n#mirlex-vozdukh-root p{font-size:18px;line-height:1.55;margin:0 0 18px}\n#mirlex-vozdukh-root .mvx-muted{color:#66737b}\n#mirlex-vozdukh-root .mvx-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin:24px 0}\n#mirlex-vozdukh-root .mvx-option{width:100%;text-align:left;border:1px solid #d7dee2;background:#fff;border-radius:16px;padding:18px;cursor:pointer;transition:.18s ease;font:inherit;color:inherit}\n#mirlex-vozdukh-root .mvx-option:hover{border-color:#3CB371;transform:translateY(-1px)}\n#mirlex-vozdukh-root .mvx-option[aria-pressed=\"true\"]{border-color:#3CB371;background:#eef8f2;box-shadow:inset 0 0 0 1px #3CB371}\n#mirlex-vozdukh-root .mvx-option strong{display:block;font-size:17px;line-height:1.35;margin-bottom:5px}\n#mirlex-vozdukh-root .mvx-option span{display:block;font-size:14px;line-height:1.4;color:#69747b}\n#mirlex-vozdukh-root .mvx-actions{display:flex;justify-content:space-between;gap:12px;margin-top:28px}\n#mirlex-vozdukh-root .mvx-btn{border:0;border-radius:14px;padding:15px 22px;font-size:16px;font-weight:700;cursor:pointer}\n#mirlex-vozdukh-root .mvx-btn-primary{background:#3CB371;color:#fff}\n#mirlex-vozdukh-root .mvx-btn-secondary{background:#eef1f2;color:#1F2A32}\n#mirlex-vozdukh-root .mvx-btn:disabled{opacity:.4;cursor:not-allowed}\n#mirlex-vozdukh-root textarea,#mirlex-vozdukh-root input{font:inherit}\n#mirlex-vozdukh-root textarea{width:100%;min-height:120px;border:1px solid #ccd5da;border-radius:14px;padding:14px 15px;resize:vertical}\n#mirlex-vozdukh-root .mvx-understood{display:grid;gap:10px;margin:22px 0}\n#mirlex-vozdukh-root .mvx-understood div{background:#f5f7f8;border-radius:14px;padding:14px 16px}\n#mirlex-vozdukh-root .mvx-flags{display:grid;gap:10px;margin:20px 0}\n#mirlex-vozdukh-root .mvx-flag{background:#fff8e8;border:1px solid #ead8a5;border-radius:14px;padding:14px 16px}\n#mirlex-vozdukh-root .mvx-ok{background:#eef8f2;border:1px solid #c8e8d3}\n#mirlex-vozdukh-root .mvx-form{display:grid;gap:14px;margin-top:24px}\n#mirlex-vozdukh-root .mvx-form input{width:100%;border:1px solid #ccd5da;border-radius:12px;padding:14px 15px}\n#mirlex-vozdukh-root .mvx-consent{display:flex;gap:10px;align-items:flex-start;font-size:13px;line-height:1.45;color:#58636a}\n#mirlex-vozdukh-root .mvx-consent input{width:auto;margin-top:3px}\n#mirlex-vozdukh-root .mvx-consent a{color:#1F2A32;text-decoration:underline}\n#mirlex-vozdukh-root .mvx-error{color:#9d2b2b;font-size:14px}\n#mirlex-vozdukh-root .mvx-success{background:#eef8f2;border-radius:16px;padding:18px}\n@media(max-width:768px){\n  #mirlex-vozdukh-root.mvx-open{padding:34px 14px}\n  #mirlex-vozdukh-root .mvx-card{padding:26px 18px;border-radius:18px}\n  #mirlex-vozdukh-root h2{font-size:30px}\n  #mirlex-vozdukh-root h3{font-size:24px}\n  #mirlex-vozdukh-root p{font-size:16px}\n  #mirlex-vozdukh-root .mvx-grid{grid-template-columns:1fr}\n}\n@media(max-width:430px){\n  #mirlex-vozdukh-root .mvx-top{display:block}\n  #mirlex-vozdukh-root .mvx-meta{text-align:left;margin-top:8px}\n  #mirlex-vozdukh-root .mvx-actions{flex-direction:column-reverse}\n  #mirlex-vozdukh-root .mvx-btn{width:100%}\n}\n@media(prefers-reduced-motion:reduce){\n  #mirlex-vozdukh-root .mvx-option,#mirlex-vozdukh-root .mvx-progress>i{transition:none}\n}\n";
    document.head.appendChild(style);
  }

(function(){
  const BASE='https://artem1285.github.io/mirlex-data/vozdukh/';
  const root=document.getElementById('mirlex-vozdukh-root');
  if(!root) return;

  const state={
    phase:'intro',
    selectedGroups:[],
    answers:{},
    factRoute:[],
    factIndex:0,
    docRoute:[],
    docIndex:0,
    startedAt:null
  };

  let cfg=null,processes=null,rules=null,docs=null;

  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

  async function loadData(){
    if(cfg) return;
    const [a,b,c,d]=await Promise.all([
      fetch(BASE+'vozdukh-config.json',{cache:'no-store'}),
      fetch(BASE+'vozdukh-processes.json',{cache:'no-store'}),
      fetch(BASE+'vozdukh-rules.json',{cache:'no-store'}),
      fetch(BASE+'vozdukh-documents.json',{cache:'no-store'})
    ]);
    if(!a.ok||!b.ok||!c.ok||!d.ok) throw new Error('load');
    [cfg,processes,rules,docs]=await Promise.all([a.json(),b.json(),c.json(),d.json()]);
  }

  function stageName(){
    if(state.phase==='intro'||state.phase==='processes'||state.phase==='facts'||state.phase==='understood') return 'Производство';
    if(state.phase==='documents') return 'Документы';
    if(state.phase==='result') return 'Результат';
    if(state.phase==='form') return 'Последний шаг';
    return '';
  }

  function conditionTrue(q){
    if(!q.showIf) return true;
    const c=q.showIf;
    if(Array.isArray(c.any)){
      return c.any.some(rule=>{
        const v=state.answers[rule.question];
        if(rule.equals!==undefined) return v===rule.equals;
        if(rule.includesAny){
          const a=Array.isArray(v)?v:[v];
          return rule.includesAny.some(x=>a.includes(x));
        }
        return false;
      });
    }
    const v=state.answers[c.question];
    if(c.equals!==undefined) return v===c.equals;
    if(c.includesAny){
      const a=Array.isArray(v)?v:[v];
      return c.includesAny.some(x=>a.includes(x));
    }
    return true;
  }

  function visibleFutureCount(route,index){
    let n=0;
    for(let i=index;i<route.length;i++){
      const q=route[i];
      if(!q.showIf || conditionTrue(q) || (q.showIf.question && state.answers[q.showIf.question]===undefined) || (Array.isArray(q.showIf.any) && q.showIf.any.some(x=>state.answers[x.question]===undefined))) n++;
    }
    return n;
  }

  function remainingText(){
    if(!state.startedAt) return 'Около 5 минут';
    let left=0;
    if(state.phase==='processes') left=(state.factRoute.length||8)+(docs.questions?.length||5);
    else if(state.phase==='facts') left=visibleFutureCount(state.factRoute,state.factIndex)+(docs.questions?.length||5);
    else if(state.phase==='understood') left=(docs.questions?.length||5);
    else if(state.phase==='documents') left=visibleFutureCount(state.docRoute,state.docIndex);
    else if(state.phase==='result') return 'Проверка завершена';
    else if(state.phase==='form') return 'Последний шаг';
    const sec=Math.max(20,left*(rules?.secondsPerQuestion||11));
    const min=Math.max(1,Math.min(5,Math.ceil(sec/60)));
    if(left<=1) return 'Почти готово';
    return 'Осталось примерно '+min+' '+(min===1?'минута':min<5?'минуты':'минут');
  }

  function progress(){
    if(state.phase==='intro') return 0;
    if(state.phase==='processes') return 8;
    if(state.phase==='facts') return 12+Math.round((state.factIndex/Math.max(1,state.factRoute.length))*48);
    if(state.phase==='understood') return 62;
    if(state.phase==='documents') return 65+Math.round((state.docIndex/Math.max(1,state.docRoute.length))*22);
    if(state.phase==='result') return 92;
    return 100;
  }

  function shell(body){
    root.innerHTML='<div class="mvx-shell"><div class="mvx-card">'+
      '<div class="mvx-top"><div class="mvx-kicker">MIRLEX · ВОЗДУХ</div>'+
      '<div class="mvx-meta"><div class="mvx-stage">'+esc(stageName())+'</div><div class="mvx-time">'+esc(remainingText())+'</div></div></div>'+
      '<div class="mvx-progress"><i style="width:'+progress()+'%"></i></div>'+body+
      '</div></div>';
  }

  function openQuiz(){
    root.hidden=false;
    root.classList.add('mvx-open');
    loadData().then(()=>{
      renderCurrent();
      setTimeout(()=>root.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'}),60);
    }).catch(()=>shell('<h3>Диагностика временно недоступна</h3><p>Обновите страницу и попробуйте ещё раз.</p>'));
  }

  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href="#proverit-vozdukh"],a[href="#rec4405822701"],button[data-vozdukh-open]');
    if(!a) return;
    e.preventDefault();
    openQuiz();
  });

  function renderIntro(){
    state.phase='intro';
    shell('<h2>Разберём вашу площадку по воздуху</h2>'+
      '<p>Чтобы точно понять деятельность, зададим несколько вопросов о площадке, оборудовании и производственных процессах.</p>'+
      '<p class="mvx-muted"><strong>Около 5 минут.</strong> Экологические термины знать не нужно — просто отмечайте, как всё устроено у вас.</p>'+
      '<div class="mvx-actions"><span></span><button class="mvx-btn mvx-btn-primary" id="mvx-start">Начать диагностику</button></div>');
    root.querySelector('#mvx-start').onclick=()=>{state.startedAt=Date.now();renderProcesses();};
  }

  function renderProcesses(){
    state.phase='processes';
    const cards=processes.groups.map(g=>'<button class="mvx-option" data-group="'+esc(g.id)+'" aria-pressed="'+state.selectedGroups.includes(g.id)+'"><strong>'+esc(g.title)+'</strong><span>'+esc(g.hint)+'</span></button>').join('');
    shell('<h3>Что происходит на вашей площадке?</h3><p class="mvx-muted">Отметьте всё, что есть.</p><div class="mvx-grid">'+cards+'</div>'+
      '<div class="mvx-actions"><button class="mvx-btn mvx-btn-secondary" id="mvx-back">Назад</button><button class="mvx-btn mvx-btn-primary" id="mvx-next" '+(!state.selectedGroups.length?'disabled':'')+'>Продолжить</button></div>');

    root.querySelectorAll('[data-group]').forEach(btn=>btn.onclick=()=>{
      const id=btn.dataset.group;
      const g=processes.groups.find(x=>x.id===id);
      if(g?.exclusive){
        state.selectedGroups=state.selectedGroups.includes(id)?[]:[id];
      }else{
        state.selectedGroups=state.selectedGroups.filter(x=>!processes.groups.find(y=>y.id===x)?.exclusive);
        state.selectedGroups=state.selectedGroups.includes(id)?state.selectedGroups.filter(x=>x!==id):state.selectedGroups.concat(id);
      }
      renderProcesses();
    });
    root.querySelector('#mvx-back').onclick=renderIntro;
    root.querySelector('#mvx-next').onclick=()=>{buildFactRoute();state.factIndex=0;renderFactQuestion();};
  }

  function buildFactRoute(){
    const many=state.selectedGroups.filter(x=>x!=='unknown').length>3;
    const route=[];
    state.selectedGroups.forEach(id=>{
      (rules.branches[id]||[]).forEach(q=>{
        if(!many || (q.priority||1)<=1) route.push({...q,section:id});
      });
    });
    (rules.common||[]).forEach(q=>route.push({...q,section:'common'}));
    state.factRoute=route;
  }

  function hasAnswer(q){
    const v=state.answers[q.id];
    if(q.type==='multi') return Array.isArray(v)&&v.length>0;
    if(q.type==='text') return typeof v==='string'&&v.trim().length>0;
    return v!==undefined&&v!==null&&v!=='';
  }

  function nextVisible(route,from){
    for(let i=from;i<route.length;i++) if(conditionTrue(route[i])) return i;
    return -1;
  }

  function prevVisible(route,from){
    for(let i=from;i>=0;i--) if(conditionTrue(route[i])) return i;
    return -1;
  }

  function renderQuestion(q,onNext,onBack){
    const prev=state.answers[q.id];
    let input='';
    if(q.type==='text'){
      input='<textarea id="mvx-text" placeholder="Короткий ответ">'+esc(prev||'')+'</textarea>';
    }else{
      const multi=q.type==='multi';
      input='<div class="mvx-grid">'+q.options.map(opt=>{
        const selected=multi?(Array.isArray(prev)&&prev.includes(opt)):prev===opt;
        return '<button class="mvx-option" data-opt="'+esc(opt)+'" aria-pressed="'+selected+'"><strong>'+esc(opt)+'</strong></button>';
      }).join('')+'</div>';
    }

    shell('<h3>'+esc(q.title)+'</h3>'+(q.hint?'<p class="mvx-muted">'+esc(q.hint)+'</p>':'')+input+
      '<div class="mvx-actions"><button class="mvx-btn mvx-btn-secondary" id="mvx-back">Назад</button><button class="mvx-btn mvx-btn-primary" id="mvx-next" '+(!hasAnswer(q)?'disabled':'')+'>Продолжить</button></div>');

    if(q.type==='text'){
      const ta=root.querySelector('#mvx-text');
      ta.oninput=()=>{
        state.answers[q.id]=ta.value.trim();
        root.querySelector('#mvx-next').disabled=!hasAnswer(q);
      };
    }else{
      root.querySelectorAll('[data-opt]').forEach(btn=>btn.onclick=()=>{
        const opt=btn.dataset.opt;
        if(q.type==='multi'){
          let cur=Array.isArray(state.answers[q.id])?[...state.answers[q.id]]:[];
          const exclusive=q.exclusiveOptions||[];
          if(exclusive.includes(opt)) cur=cur.includes(opt)?[]:[opt];
          else{
            cur=cur.filter(x=>!exclusive.includes(x));
            cur=cur.includes(opt)?cur.filter(x=>x!==opt):cur.concat(opt);
          }
          state.answers[q.id]=cur;
        }else state.answers[q.id]=opt;
        renderQuestion(q,onNext,onBack);
      });
    }
    root.querySelector('#mvx-back').onclick=onBack;
    root.querySelector('#mvx-next').onclick=()=>{if(hasAnswer(q))onNext();};
  }

  function renderFactQuestion(){
    state.phase='facts';
    let i=nextVisible(state.factRoute,state.factIndex);
    if(i<0){renderUnderstood();return;}
    state.factIndex=i;
    const q=state.factRoute[i];
    renderQuestion(q,()=>{
      state.factIndex=i+1;
      renderFactQuestion();
    },()=>{
      const p=prevVisible(state.factRoute,i-1);
      if(p<0) renderProcesses();
      else{state.factIndex=p;renderFactQuestion();}
    });
  }

  function summaryFacts(){
    const names=state.selectedGroups.map(id=>processes.groups.find(g=>g.id===id)?.title).filter(Boolean);
    const paths=[];
    ['heat_outlet','metal_path','chem_path','dust_control','wood_path','storage_system','other_path','infra_outlet'].forEach(id=>{
      const v=state.answers[id];
      if(v){
        const txt=Array.isArray(v)?v.join(', '):v;
        paths.push(txt);
      }
    });
    return {names,paths};
  }

  function renderUnderstood(){
    state.phase='understood';
    const s=summaryFacts();
    shell('<h3>Вот что мы поняли</h3>'+
      '<p>Основная схема площадки уже понятна. Теперь проверим, что из этого отражено в документах.</p>'+
      '<div class="mvx-understood"><div><strong>Процессы</strong><br>'+esc(s.names.join(', ')||'Описание получено')+'</div>'+
      (s.paths.length?'<div><strong>Как удаляется воздух / пыль / газы</strong><br>'+esc(s.paths.slice(0,4).join(' · '))+'</div>':'')+
      '</div>'+
      '<div class="mvx-actions"><button class="mvx-btn mvx-btn-secondary" id="mvx-back">Назад</button><button class="mvx-btn mvx-btn-primary" id="mvx-next">Проверить документы</button></div>');
    root.querySelector('#mvx-back').onclick=()=>{
      const p=prevVisible(state.factRoute,state.factRoute.length-1);
      if(p<0)renderProcesses(); else{state.factIndex=p;renderFactQuestion();}
    };
    root.querySelector('#mvx-next').onclick=()=>{state.docRoute=docs.questions||[];state.docIndex=0;renderDocQuestion();};
  }

  function renderDocQuestion(){
    state.phase='documents';
    let i=nextVisible(state.docRoute,state.docIndex);
    if(i<0){renderResult();return;}
    state.docIndex=i;
    const q=state.docRoute[i];
    renderQuestion(q,()=>{
      state.docIndex=i+1;
      renderDocQuestion();
    },()=>{
      const p=prevVisible(state.docRoute,i-1);
      if(p<0) renderUnderstood();
      else{state.docIndex=p;renderDocQuestion();}
    });
  }

  function includes(id,value){
    const v=state.answers[id];
    return Array.isArray(v)&&v.includes(value);
  }

  function hasCleaning(){
    const raw=JSON.stringify(state.answers).toLowerCase();
    return /циклон|фильтр|скруббер|очистк|аспирац/.test(raw);
  }

  function hasRefrigeration(){
    return includes('infra_extra','Холодильные установки / чиллеры / крупные кондиционеры') || includes('other_kind','Холодильные установки / чиллеры');
  }

  function hasPotentialAirActivity(){
    const groups=state.selectedGroups||[];
    if(groups.some(x=>['metal','chem','dust','wood','storage','other'].includes(x))) return true;

    if(groups.includes('heat')){
      const kinds=Array.isArray(state.answers.heat_kind)?state.answers.heat_kind:[];
      const energy=Array.isArray(state.answers.heat_energy)?state.answers.heat_energy:[];
      const onlyElectricBoilers=kinds.length>0 &&
        kinds.every(x=>x==='Котлы') &&
        energy.length===1 &&
        energy[0]==='Электричество';
      if(!onlyElectricBoilers) return true;
    }

    const infra=Array.isArray(state.answers.infra_extra)?state.answers.infra_extra:[];
    return infra.some(x=>[
      'Общая производственная вытяжная вентиляция',
      'Общая аспирационная сеть',
      'Отдельные трубы / дымоходы / вентиляционные шахты',
      'Фильтры, циклоны, скрубберы или другая очистка воздуха',
      'Погрузчики, спецтехника или другой транспорт работают на территории'
    ].includes(x));
  }

  function hasApparentEmissionSource(){
    const outlet=state.answers.heat_outlet;
    const heatEnergy=Array.isArray(state.answers.heat_energy)?state.answers.heat_energy:[];
    if(outlet && !['В помещение','Не знаю'].includes(outlet) && !(heatEnergy.length===1 && heatEnergy[0]==='Электричество')) return true;

    if(['Есть местная вытяжка от рабочих мест','Есть одна общая вытяжка участка','Только общеобменная вентиляция цеха','Сразу выводится наружу'].includes(state.answers.metal_path)) return true;
    if(['Есть местная вытяжка и воздух уходит наружу','Проходит через фильтры','Есть водяная завеса / скруббер','Уходит в общую вентиляцию'].includes(state.answers.chem_path)) return true;

    const dk=Array.isArray(state.answers.dust_kind)?state.answers.dust_kind:[];
    if(dk.length && ['На открытой площадке','Под навесом','В нескольких местах'].includes(state.answers.dust_place)) return true;

    if(['Станки подключены к аспирации через циклон','Станки подключены к аспирации через фильтр','Есть общий воздуховод с выбросом наружу'].includes(state.answers.wood_path)) return true;

    const ss=Array.isArray(state.answers.storage_system)?state.answers.storage_system:[];
    if(ss.some(x=>['Есть дыхательная труба или вентиляционный отвод','Операции выполняются открыто'].includes(x))) return true;

    if(['Есть местная вытяжка наружу','Есть общая вентиляция','Есть очистка / фильтр','Процесс идёт на открытой площадке'].includes(state.answers.other_path)) return true;

    const io=Array.isArray(state.answers.infra_outlet)?state.answers.infra_outlet:[];
    if(io.some(x=>[
      'Через трубу / дымоход',
      'Через вентиляционную шахту / дефлектор на крыше',
      'Через стену',
      'Через общий воздуховод',
      'Есть открытые участки без организованного отвода'
    ].includes(x))) return true;

    return false;
  }

  function hasCleaningEquipment(){
    const ic=Array.isArray(state.answers.infra_cleaning)?state.answers.infra_cleaning:[];
    if(ic.some(x=>x!=='Не знаю')) return true;
    if(['Станки подключены к аспирации через циклон','Станки подключены к аспирации через фильтр'].includes(state.answers.wood_path)) return true;
    if(['Проходит через фильтры','Есть водяная завеса / скруббер'].includes(state.answers.chem_path)) return true;
    if(state.answers.dust_control==='Есть фильтр / циклон') return true;
    return false;
  }

  function diagnosticFlags(){
    const out=[];
    const docsA=Array.isArray(state.answers.documents_present)?state.answers.documents_present:[];
    const changes=Array.isArray(state.answers.inventory_changes)?state.answers.inventory_changes:[];
    const cat=state.answers.nvos_category;
    const nvos=state.answers.nvos_registered;
    const apparentSource=hasApparentEmissionSource();
    const potentialActivity=hasPotentialAirActivity();

    const hasDoc=name=>docsA.includes(name);
    const add=(code,text)=>out.push({code,text});

    // Государственный учет / категория
    if(nvos==='Нет' && ['I','II','III'].includes(cat)){
      add('NVOS_REG_CONTRADICTION','Указана категория '+cat+', но площадка отмечена как не поставленная на государственный учёт НВОС — сведения противоречат друг другу и требуют проверки.');
    }
    if(nvos==='Да' && cat==='IV'){
      add('NVOS_IV_STATUS_CHECK','Указана IV категория и одновременно действующий государственный учёт объекта. С учётом правил, действующих с 1 сентября 2026 года, статус и актуальность учетных сведений нужно проверить.');
    }
    if(nvos==='Нет' && potentialActivity && cat!=='IV'){
      add('NVOS_STATUS_CHECK','На площадке указаны процессы, связанные с возможным воздействием на атмосферный воздух. Нужно проверить, правильно ли определён статус объекта НВОС по действующим критериям.');
    }

    // Разрешительный контур: КЭР / ДВОС
    if(hasDoc('Декларация о воздействии на окружающую среду') && cat && !['II','Не помню / не знаю'].includes(cat)){
      add('DVOS_CATEGORY_CONTRADICTION','Указана декларация о воздействии на окружающую среду, но категория объекта указана как '+cat+'. ДВОС относится к объектам II категории (за исключением II категории с КЭР) — категорию и документ нужно сверить.');
    }
    if(hasDoc('Комплексное экологическое разрешение (КЭР)') && cat && !['I','II','Не помню / не знаю'].includes(cat)){
      add('KER_CATEGORY_CONTRADICTION','Указано комплексное экологическое разрешение, но категория объекта указана как '+cat+'. КЭР применяется к объектам I категории и в предусмотренном законом случае может быть получено для объекта II категории — сведения нужно сверить.');
    }
    if(nvos==='Нет' && hasDoc('Декларация о воздействии на окружающую среду')){
      add('DVOS_REG_CONTRADICTION','Указана ДВОС, но площадка отмечена как не поставленная на учёт НВОС. Поскольку ДВОС относится к объектам II категории, эти сведения требуют проверки.');
    }
    if(nvos==='Нет' && hasDoc('Комплексное экологическое разрешение (КЭР)')){
      add('KER_REG_CONTRADICTION','Указано КЭР, но площадка отмечена как не поставленная на учёт НВОС — сведения требуют проверки.');
    }
    if(cat==='I' && !hasDoc('Комплексное экологическое разрешение (КЭР)')){
      add('KER_NOT_CONFIRMED_I','Для объекта I категории комплексное экологическое разрешение среди документов не подтверждено.');
    }
    if(cat==='II' && !hasDoc('Декларация о воздействии на окружающую среду') && !hasDoc('Комплексное экологическое разрешение (КЭР)')){
      add('DVOS_OR_KER_NOT_CONFIRMED_II','Для объекта II категории не подтверждены ни ДВОС, ни КЭР. Разрешительный документ нужно проверить.');
    }

    // Инвентаризация
    const knownNvosObject = nvos==='Да' || ['I','II','III','IV'].includes(cat);
    if(knownNvosObject && !hasDoc('Инвентаризация источников и выбросов')){
      add('INVENTORY_NOT_CONFIRMED','Для объекта НВОС инвентаризация источников и выбросов среди имеющихся документов не подтверждена.');
    }
    if(hasDoc('Инвентаризация источников и выбросов') && changes.length && !changes.includes('Ничего существенного не менялось') && !changes.includes('Не знаю')){
      add('INVENTORY_CHANGE_IMPACT_CHECK','После инвентаризации на площадке были изменения. Нужно проверить, повлияли ли они на состав, объём или массу выбросов и возникла ли обязанность корректировки инвентаризации.');
    }

    // ПЭК
    if(['I','II','III'].includes(cat) && !hasDoc('Программа производственного экологического контроля (ПЭК)')){
      add('PEK_NOT_CONFIRMED','Для объекта '+cat+' категории программа ПЭК среди документов не подтверждена.');
    }

    // НМУ — только при I–III категории и выявленном пути выброса
    if(['I','II','III'].includes(cat) && apparentSource && !hasDoc('План / мероприятия при НМУ')){
      add('NMU_NOT_CONFIRMED','Для объекта '+cat+' категории по ответам выявлен путь поступления выбросов в атмосферный воздух, но документы по НМУ не подтверждены.');
    }

    // Очистка воздуха / ГОУ — не приравниваем аспирацию к ГОУ автоматически
    if(hasCleaningEquipment() && !hasDoc('Паспорт и документы на газоочистное оборудование')){
      add('GOU_APPLICABILITY_CHECK','Указано оборудование очистки воздуха. Нужно проверить, относится ли оно к установкам очистки газа и применимы ли требования к эксплуатации и документации ГОУ.');
    }

    // Хладагенты — сначала устанавливаем вещество, а не объявляем документ обязательным
    if(hasRefrigeration()){
      add('REFRIGERANT_REGULATION_CHECK','На площадке указано холодильное оборудование. Нужно установить используемый хладагент и проверить, относится ли он к регулируемым веществам.');
    }

    const seen=new Set();
    return out.filter(x=>{
      if(seen.has(x.code)) return false;
      seen.add(x.code);
      return true;
    }).map(x=>x.text);
  }

  function renderResult(){
    state.phase='result';
    const s=summaryFacts();
    const docsA=Array.isArray(state.answers.documents_present)?state.answers.documents_present:[];
    const flags=diagnosticFlags();

    shell('<h3>Проверка завершена</h3>'+
      '<p>Мы собрали основные сведения о площадке и отметили вопросы, которые требуют профессиональной проверки.</p>'+
      '<div class="mvx-understood">'+
      '<div><strong>Производство</strong><br>'+esc(s.names.join(', ')||'Описание получено')+'</div>'+
      '<div><strong>Объект НВОС</strong><br>'+esc(state.answers.nvos_category||state.answers.nvos_registered||'Не указано')+'</div>'+
      '<div><strong>Документы</strong><br>'+esc(docsA.join(', ')||'Не подтверждены')+'</div>'+
      '</div>'+
      '<div class="mvx-flags">'+(flags.length?flags.map(x=>'<div class="mvx-flag">⚠ '+esc(x)+'</div>').join(''):'<div class="mvx-flag mvx-ok">По ответам явных противоречий не выявлено. Окончательный вывод дадим после проверки документов.</div>')+'</div>'+
      '<div class="mvx-actions"><button class="mvx-btn mvx-btn-secondary" id="mvx-back">Назад</button><button class="mvx-btn mvx-btn-primary" id="mvx-form-open">Получить полный отчёт по воздуху</button></div>');

    root.querySelector('#mvx-back').onclick=()=>{
      const p=prevVisible(state.docRoute,state.docRoute.length-1);
      if(p<0)renderUnderstood();else{state.docIndex=p;renderDocQuestion();}
    };
    root.querySelector('#mvx-form-open').onclick=openTildaForm;
  }

  /* ПЕРЕДАЧА РЕЗУЛЬТАТА В ШТАТНУЮ ФОРМУ TILDA */
  function formatAnswer(value){
    return Array.isArray(value)?value.join(', '):String(value??'');
  }

  function buildTildaReport(){
    const selected=state.selectedGroups
      .map(id=>processes.groups.find(g=>g.id===id)?.title)
      .filter(Boolean);

    const docsA=Array.isArray(state.answers.documents_present)?state.answers.documents_present:[];
    const flags=diagnosticFlags();

    const answerLines=[];
    const labels={};
    Object.values(rules.branches||{}).forEach(list=>list.forEach(q=>labels[q.id]=q.title));
    (rules.common||[]).forEach(q=>labels[q.id]=q.title);
    (docs.questions||[]).forEach(q=>labels[q.id]=q.title);

    Object.entries(state.answers).forEach(([id,value])=>{
      answerLines.push((labels[id]||id)+': '+formatAnswer(value));
    });

    return {
      vozdukh_versiya: cfg.version||'vozdukh',
      vozdukh_processy: selected.join('; '),
      vozdukh_kategoriya_nvos: state.answers.nvos_category||state.answers.nvos_registered||'Не указано',
      vozdukh_dokumenty: docsA.join('; ')||'Не подтверждены',
      vozdukh_otvety_diagnostiki: answerLines.join(' | '),
      vozdukh_rezultat_proverki: flags.join(' | ')||'По ответам явных противоречий не выявлено',
      vozdukh_vremya_prohozhdeniya: state.startedAt?Math.max(0,Math.round((Date.now()-state.startedAt)/1000))+' сек.':'',
      vozdukh_stranitsa: location.href
    };
  }

  function findTildaVozdukhForm(){
    const marker=document.querySelector('form [name="vozdukh_otvety_diagnostiki"]');
    return marker?marker.closest('form'):null;
  }

  function fillTildaForm(form){
    const report=buildTildaReport();
    Object.entries(report).forEach(([name,value])=>{
      const field=form.querySelector('[name="'+name+'"]');
      if(field){
        field.value=value;
        field.setAttribute('value',value);
        field.dispatchEvent(new Event('input',{bubbles:true}));
        field.dispatchEvent(new Event('change',{bubbles:true}));
      }
    });
  }

  function triggerVozdukhPopup(){
    const a=document.createElement('a');
    a.href='#popup:vozdukh';
    a.style.display='none';
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>a.remove(),100);
  }

  function openTildaForm(){
    const form=findTildaVozdukhForm();
    if(!form){
      shell('<h3>Форма заявки ещё не подключена</h3><p>В popup «Воздух» нужно добавить скрытые поля для передачи результатов диагностики.</p><div class="mvx-actions"><button class="mvx-btn mvx-btn-secondary" id="mvx-back-result">Назад</button></div>');
      const b=root.querySelector('#mvx-back-result');
      if(b)b.onclick=renderResult;
      return;
    }

    fillTildaForm(form);
    triggerVozdukhPopup();
  }

  function renderCurrent(){
    if(state.phase==='intro')renderIntro();
    else if(state.phase==='processes')renderProcesses();
    else if(state.phase==='facts')renderFactQuestion();
    else if(state.phase==='understood')renderUnderstood();
    else if(state.phase==='documents')renderDocQuestion();
    else if(state.phase==='result')renderResult();
    else renderIntro();
  }
if(location.hash==='#proverit-vozdukh'||location.hash==='#rec4405822701') openQuiz();
  window.addEventListener('hashchange',()=>{if(location.hash==='#proverit-vozdukh'||location.hash==='#rec4405822701')openQuiz();});
})();

})();
