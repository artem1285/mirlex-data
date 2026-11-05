(function(){
  const VERSION='autsorsing-v1.0.0';
  const root=document.getElementById('mirlex-autsorsing-root');
  if(!root) return;

  const questions=[
    {
      id:'zadacha',
      title:'Что вам нужно?',
      type:'multi',
      options:[
        'Полное экологическое сопровождение',
        'Ведение отчётности и контроль сроков',
        'Проверка и актуализация документов',
        'Подготовка к проверке',
        'Разобраться, что требуется предприятию',
        'Нужна консультация'
      ]
    },
    {
      id:'tekuschiy_status',
      title:'Кто сейчас занимается экологическими вопросами?',
      type:'single',
      options:[
        'Штатный эколог',
        'Внешний подрядчик',
        'Распределено между сотрудниками',
        'Сейчас никто не ведёт',
        'Не знаю'
      ]
    },
    {
      id:'ploschadki',
      title:'Сколько у компании площадок?',
      type:'single',
      options:[
        'Одна',
        '2–5',
        '6–10',
        'Более 10',
        'Не знаю'
      ]
    },
    {
      id:'glavnaya_problema',
      title:'Что сейчас беспокоит больше всего?',
      type:'multi',
      options:[
        'Отчётность и сроки',
        'Документы могли устареть',
        'Предстоящая проверка',
        'Есть предписание или замечания',
        'Неясно, какие требования относятся к предприятию',
        'Нужно постоянное сопровождение',
        'Другое'
      ]
    }
  ];

  const state={index:0,answers:{},startedAt:null};

  function esc(s){
    return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function injectStyle(){
    if(document.getElementById('mirlex-autsorsing-style')) return;
    const style=document.createElement('style');
    style.id='mirlex-autsorsing-style';
    style.textContent=`
#mirlex-autsorsing-root{font-family:Inter,Arial,sans-serif;color:#1F2A32;background:#E6EBED}
#mirlex-autsorsing-root[hidden]{display:none!important}
.moa-wrap{max-width:980px;margin:0 auto;padding:28px 24px 34px}
.moa-card{background:#fff;border-radius:24px;padding:30px;box-sizing:border-box}
.moa-top{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:18px;font-size:14px}
.moa-brand{font-weight:700;letter-spacing:.08em;color:#2FAE70}
.moa-muted{color:#6E7A82}
.moa-progress{height:5px;background:#DDE4E7;border-radius:999px;overflow:hidden;margin:0 0 26px}
.moa-progress>span{display:block;height:100%;background:#3CB371;width:0;transition:width .2s ease}
.moa-card h3{font-size:30px;line-height:1.18;margin:0 0 12px}
.moa-desc{font-size:18px;line-height:1.5;margin:0 0 24px;color:#40505A}
.moa-options{display:grid;gap:12px}
.moa-option{border:1px solid #D2DADF;border-radius:14px;padding:16px 18px;cursor:pointer;background:#fff;font-size:17px;line-height:1.35;transition:.15s}
.moa-option:hover{border-color:#3CB371}
.moa-option.active{border-color:#3CB371;background:#EEF8F2}
.moa-actions{display:flex;justify-content:space-between;gap:12px;margin-top:26px}
.moa-btn{border:0;border-radius:14px;padding:14px 22px;font-weight:700;font-size:16px;cursor:pointer}
.moa-primary{background:#3CB371;color:#fff}
.moa-secondary{background:#EEF2F4;color:#1F2A32}
.moa-summary{display:grid;gap:12px;margin:22px 0}
.moa-summary>div{background:#F3F6F7;border-radius:14px;padding:15px 17px}
.moa-summary strong{display:block;margin-bottom:4px}
@media(max-width:640px){
  .moa-wrap{padding:16px 10px 22px}
  .moa-card{padding:22px 16px;border-radius:18px}
  .moa-card h3{font-size:25px}
  .moa-desc,.moa-option{font-size:16px}
  .moa-actions{flex-direction:column-reverse}
  .moa-btn{width:100%}
}`;
    document.head.appendChild(style);
  }

  function shell(body,progress){
    root.hidden=false;
    root.innerHTML=`<div class="moa-wrap"><div class="moa-card">
      <div class="moa-top"><div class="moa-brand">MIRLEX · АУТСОРСИНГ</div><div class="moa-muted">${progress}</div></div>
      <div class="moa-progress"><span style="width:${progress==='Готово'?'100%':((state.index+1)/questions.length*100)+'%'}"></span></div>
      ${body}
    </div></div>`;
  }

  function renderIntro(){
    shell(`
      <h3>Поймём, какой формат экологического сопровождения вам нужен</h3>
      <p class="moa-desc">Четыре коротких вопроса. Это займёт около минуты и поможет нам сразу понять масштаб задачи.</p>
      <div class="moa-actions"><span></span><button class="moa-btn moa-primary" id="moa-start">Начать</button></div>
    `,'Около 1 минуты');
    root.querySelector('#moa-start').onclick=()=>{
      state.startedAt=Date.now();
      state.index=0;
      renderQuestion();
    };
  }

  function renderQuestion(){
    const q=questions[state.index];
    const current=state.answers[q.id];
    const selected=Array.isArray(current)?current:(current?[current]:[]);
    const options=q.options.map(o=>`<div class="moa-option ${selected.includes(o)?'active':''}" data-value="${esc(o)}">${esc(o)}</div>`).join('');

    shell(`
      <h3>${esc(q.title)}</h3>
      <div class="moa-options">${options}</div>
      <div class="moa-actions">
        <button class="moa-btn moa-secondary" id="moa-back">${state.index===0?'К началу':'Назад'}</button>
        <button class="moa-btn moa-primary" id="moa-next" ${selected.length?'':'disabled'}>Далее</button>
      </div>
    `,`Шаг ${state.index+1} из ${questions.length}`);

    root.querySelectorAll('.moa-option').forEach(el=>{
      el.onclick=()=>{
        const v=el.dataset.value;
        if(q.type==='single'){
          state.answers[q.id]=v;
        }else{
          let a=Array.isArray(state.answers[q.id])?[...state.answers[q.id]]:[];
          a=a.includes(v)?a.filter(x=>x!==v):[...a,v];
          state.answers[q.id]=a;
        }
        renderQuestion();
      };
    });

    root.querySelector('#moa-back').onclick=()=>{
      if(state.index===0) renderIntro();
      else{state.index--;renderQuestion();}
    };

    root.querySelector('#moa-next').onclick=()=>{
      if(!state.answers[q.id] || (Array.isArray(state.answers[q.id])&&!state.answers[q.id].length)) return;
      if(state.index<questions.length-1){state.index++;renderQuestion();}
      else renderResult();
    };
  }

  function fmt(v){return Array.isArray(v)?v.join(', '):String(v||'');}

  function renderResult(){
    shell(`
      <h3>Теперь можно определить формат сопровождения</h3>
      <p class="moa-desc">Мы получили достаточно исходных сведений, чтобы начать с предметного разговора, а не с общего опроса.</p>
      <div class="moa-summary">
        <div><strong>Задача</strong>${esc(fmt(state.answers.zadacha))}</div>
        <div><strong>Сейчас экологию ведёт</strong>${esc(fmt(state.answers.tekuschiy_status))}</div>
        <div><strong>Площадки</strong>${esc(fmt(state.answers.ploschadki))}</div>
        <div><strong>Основной вопрос</strong>${esc(fmt(state.answers.glavnaya_problema))}</div>
      </div>
      <div class="moa-actions">
        <button class="moa-btn moa-secondary" id="moa-back">Назад</button>
        <button class="moa-btn moa-primary" id="moa-contact">Получить предложение</button>
      </div>
    `,'Готово');

    root.querySelector('#moa-back').onclick=()=>{state.index=questions.length-1;renderQuestion();};
    root.querySelector('#moa-contact').onclick=openTildaForm;
  }

  function report(){
    const labels=Object.fromEntries(questions.map(q=>[q.id,q.title]));
    const lines=Object.entries(state.answers).map(([k,v])=>labels[k]+': '+fmt(v));
    return {
      autsorsing_versiya:VERSION,
      autsorsing_zadacha:fmt(state.answers.zadacha),
      autsorsing_tekuschiy_status:fmt(state.answers.tekuschiy_status),
      autsorsing_ploschadki:fmt(state.answers.ploschadki),
      autsorsing_glavnaya_problema:fmt(state.answers.glavnaya_problema),
      autsorsing_otvety:lines.join(' | '),
      autsorsing_vremya:state.startedAt?Math.max(0,Math.round((Date.now()-state.startedAt)/1000))+' сек.':'',
      autsorsing_stranitsa:location.href
    };
  }

  function findForm(){
    const marker=document.querySelector('form [name="autsorsing_otvety"]');
    return marker?marker.closest('form'):null;
  }

  function fillForm(form){
    const data=report();
    Object.entries(data).forEach(([name,value])=>{
      const field=form.querySelector('[name="'+name+'"]');
      if(!field) return;
      field.value=value;
      field.setAttribute('value',value);
      field.dispatchEvent(new Event('input',{bubbles:true}));
      field.dispatchEvent(new Event('change',{bubbles:true}));
    });
  }

  function triggerPopup(){
    const a=document.createElement('a');
    a.href='#popup:autsorsing';
    a.style.display='none';
    document.body.appendChild(a);
    a.click();
    setTimeout(()=>a.remove(),100);
  }

  function openTildaForm(){
    const form=findForm();
    if(!form){
      alert('Форма контактов «Аутсорсинг» пока не подключена.');
      return;
    }
    fillForm(form);
    triggerPopup();
  }

  function openQuiz(){
    injectStyle();
    renderIntro();
    setTimeout(()=>root.scrollIntoView({behavior:'smooth',block:'start'}),50);
  }

  injectStyle();
  window.MIRLEX_AUTSORSING_OPEN=openQuiz;
  if(location.hash==='#proverit-autsorsing') openQuiz();
  window.addEventListener('hashchange',()=>{if(location.hash==='#proverit-autsorsing')openQuiz();});
})();