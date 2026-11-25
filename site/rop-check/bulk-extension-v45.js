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
    if(z.res[2])add('small','Группа: '+z.res[2],info);
    const rate=add('div',undefined,r);rate.className='mb-rate';add('span',z.res[6]!==''?String(z.res[6]).split(' / ').join('% / ')+'%':'—',rate);if(kind(z)==='review'&&z.res[6]!=='')add('small','Предварительно',rate);
    const details=add('details',undefined,r);details.className='mb-details';add('summary',kind(z)==='review'&&z.matches.length?'Уточнить позицию':'Подробнее',details);
    if(kind(z)!=='review'){const m=z.selectedMatch|| (z.matches.length===1?z.matches[0]:null);if(m)details.appendChild(normativeCard(m,z.code));else add('p',z.res[8],details);}
    if(kind(z)==='review'&&!z.matches.length){add('p',z.res[8],details);add('p','Уточните код или наименование в исходном документе либо проверьте исправленный код в одиночном поиске выше.',details);} if(z.matches.length&&kind(z)==='review'){
     add('p',z.matches.length===1?'Найдена одна строка перечня. Проверьте условия её применения.':'Код встречается в нескольких строках перечня №2414. Выберите строку, соответствующую вашему товару или упаковке.',details);
     const cardHost=add('div',undefined,details);let selected=z.matches.length===1?0:null;
     const choices=[];const choiceHost=add('div',undefined,details);details.insertBefore(choiceHost,cardHost);
     if(z.matches.length>1)z.matches.forEach((m,i)=>{const item=m.item,g=groupOf(item),button=add('button',undefined,choiceHost);button.type='button';button.className='mb-option';button.setAttribute('aria-pressed','false');add('b',Number(item.section)===3?(g?.name||item.name):item.name,button);if(m.semanticPreferred===true)add('small','Справочное совпадение ОКПД 2 — проверьте характеристики',button);else if(m.semanticPreferred===false)add('small','Справочное соответствие ОКПД 2 не установлено',button);add('small',[g?'Группа №'+item.group+' — '+g.name:'',item.okpd?'ОКПД 2 '+item.okpd:'',Number(item.section)!==3?'ТН ВЭД '+tnDisplay(item,m.rule):item.material||''].filter(Boolean).join(' · '),button);choices.push(button);button.onclick=()=>{selected=i;choices.forEach((v,j)=>v.setAttribute('aria-pressed',String(i===j)));cardHost.replaceChildren(normativeCard(m,z.code));confirm.disabled=false;};});
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
