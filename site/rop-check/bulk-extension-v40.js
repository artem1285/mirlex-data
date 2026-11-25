// Additive module: original v37 functions remain unchanged.
function mountBulkV38(){
 const box=document.createElement('div');
 box.style.cssText='margin-top:28px;border-top:1px solid #53616a;padding-top:24px';
 box.innerHTML=`<h3 style="color:white;margin:0 0 12px;font-size:23px">Массовая проверка Excel</h3><p style="color:#d1d9de;margin:0 0 18px;line-height:1.55">Загрузите список товаров или упаковки. Определим позиции перечня, группы и нормативы за 2026 год. Файл обрабатывается в браузере.</p><div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center"><label style="display:inline-flex;align-items:center;justify-content:center;min-height:54px;border:1px solid #8c9ca5;border-radius:8px;padding:12px 20px;cursor:pointer;color:white;font-weight:600">Загрузить Excel<input type="file" accept=".xlsx" style="position:absolute;width:1px;height:1px;opacity:0" aria-label="Загрузить Excel"></label><span data-field="filename" style="color:#d1d9de;overflow-wrap:anywhere"></span><button class="mr12-button" data-action="run" type="button" disabled>Проверить список</button><button class="mr12-button" data-action="download" type="button" disabled>Скачать Excel</button></div><div data-field="mapping" style="margin-top:16px"></div><div role="status" data-field="status" style="margin-top:14px;line-height:1.5;color:#d1d9de"></div><div data-field="preview" style="overflow:auto;margin-top:16px"></div>`;
 root.querySelector('.mr12-wrap').appendChild(box);
 const field=n=>box.querySelector(`[data-field="${n}"]`), file=box.querySelector('[type=file]'), run=box.querySelector('[data-action=run]'), download=box.querySelector('[data-action=download]');
 let book=null, mapping=null, output=null, busy=false, records=[], sourceRows=[], sourceWidth=0;
 const status=t=>field('status').textContent=t;
 function invalidate(){output=null;download.disabled=true;field('preview').replaceChildren();}
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
   mapping={sheet:p.sheet,cc:p.codes[0]??-1,nc:p.names[0]??-1,start:p.first};run.disabled=false;status('Файл готов к проверке.');return;
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
  confirm.addEventListener('click',()=>{const o=options.find(v=>v.sheet===sheet.value),cc=Number(code.value),nc=Number(name.value),r=Number(start.value)-1;if((cc<0&&nc<0)||cc===nc||!Number.isInteger(r)||r<o.range.s.r||r>o.range.e.r){status('Выберите разные столбцы и корректную первую строку.');return;}mapping={sheet:o.sheet,cc,nc,start:r};host.replaceChildren();run.disabled=false;status('Файл готов к проверке.');});
 }
 file.addEventListener('change',async()=>{if(busy)return;invalidate();records=[];book=null;mapping=null;field('mapping').replaceChildren();run.disabled=true;const f=file.files[0];field('filename').textContent=f?f.name:'';if(!f)return;busy=true;file.disabled=true;try{if(!/\.xlsx$/i.test(f.name)||f.size>5000000)throw Error('Выберите XLSX до 5 МБ');const x=await library();book=x.read(await f.arrayBuffer(),{type:'array',sheetRows:5002,cellFormula:true,cellText:true});const options=inspect(x,book);if(!options.length)throw Error('Нет непустых листов');choose(options);}catch(e){book=null;mapping=null;status(e.message);}finally{busy=false;file.disabled=false;run.disabled=!mapping;}});
 const headers=['статус','раздел','группа','строка перечня','ОКПД 2','ТН ВЭД','норматив, %','основание','комментарий'];
 function candidateResult(m,statusText,comment){const item=m.item,g=groupOf(item),n=norms(item)[2026];return [statusText,item.sectionName,String(item.group)+(g?' — '+g.name:''),item.name,item.okpd||'',Number(item.section)===3?'':tnDisplay(item,m.rule),n??'',Number(item.section)===1?'ПП РФ №2414':'ПП РФ №2414; 451-ФЗ, ст.7 ч.5',comment];}
 function blank(s,why){return [s,'','','','','','','ПП РФ №2414',why];}
 async function classify(code,name,year,semantic){
  const q=clean(code)||clean(name);if(!q)return {res:blank('Требуется уточнение','Нет кода и наименования'),matches:[]};
  let matches=search(q),qd=exactNumericQuery(q),entry=null;
  if(qd&&qd.length>=6){if(!semantic)return {res:blank('Требуется уточнение','Семантическая база недоступна'),matches:[]};entry=semantic.codes[qd]||null;if(entry)matches=applySemanticFilter(matches,entry);}
  if(!matches.length)return {res:blank('Не найдено в перечне','Поиск не подтвердил строку; не означает отсутствия обязанности. Упаковка проверяется отдельно.'),matches:[]};
  const m=matches[0],item=m.item;
  const nameReview=clean(name)&&lower(name)!==lower(item.name)&&lower(name)!==lower(item.material);
  if(matches.length===1&&m.certainty==='confirmed'&&!nameReview&&Number(item.section)!==3)return {res:candidateResult(m,'Позиция найдена','Принадлежность и обязанность конкретного лица проверяются отдельно'),matches};
  const groups=[...new Set(matches.map(x=>String(x.item.group)))];
  const rates=[...new Set(matches.map(x=>norms(x.item)[year]).filter(v=>v!=null))];
  const res=matches.length===1?candidateResult(m,'Требуется уточнение','Предварительный норматив. '+(m.reason||'Сверьте фактические характеристики')):['Требуется уточнение',[...new Set(matches.map(x=>x.item.sectionName))].join('; '),groups.join('; '),matches.map(x=>x.item.name).join(' | ').slice(0,30000),'','',rates.join(' / '),'ПП РФ №2414; для упаковки 451-ФЗ, ст.7 ч.5','Предварительные нормативы. Выберите фактическую строку перечня.'];
  return {res,matches};
 }
 function renderResults(){
  const x=window.XLSX,counts={};for(const z of records)counts[z.res[0]]=(counts[z.res[0]]||0)+1;
  const byRow=new Map(records.map(z=>[z.row,z.res])),start=mapping.start;
  const out=sourceRows.map((row,i)=>[...row,...(byRow.get(i+1)||(i===start-1?headers:[]))]);if(start===0)out.unshift([...Array(sourceWidth).fill(''),...headers]);
  const wb=x.utils.book_new();x.utils.book_append_sheet(wb,x.utils.aoa_to_sheet(out),'Результаты');x.utils.book_append_sheet(wb,x.utils.aoa_to_sheet([['Статус','Количество'],...Object.entries(counts),['Год','2026'],['Лист',mapping.sheet],['Источник',OFFICIAL_URL],['Ограничение','Нормативы спорных строк предварительные. Выбор пользователя не является юридическим заключением. Исходные отображаемые значения сохранены текстом.']]),'Сводка');output=wb;download.disabled=false;
  status('Проверено: '+records.length+'. '+Object.entries(counts).map(([k,v])=>k+': '+v).join('; '));
  const preview=field('preview');preview.replaceChildren();const table=document.createElement('table');table.style.cssText='color:white;font-size:13px;border-collapse:collapse;min-width:850px';preview.appendChild(table);
  function row(values){const tr=table.insertRow();for(const v of values){const td=tr.insertCell();td.style.cssText='padding:8px;border-bottom:1px solid #53616a;vertical-align:top';td.textContent=String(v);}return tr;}
  row(['Строка','Код','Наименование','Статус','Группа','Норматив %','Комментарий','Уточнение']);
  for(const z of records.slice(0,100)){const tr=row([z.row,z.code,z.name,z.res[0],z.res[2],z.res[6],z.res[8],'']);if(z.matches.length&&z.res[0]!=='Позиция найдена'){const td=tr.cells[7],sel=document.createElement('select');sel.style.cssText='max-width:240px;color:#1F2A32;background:white';const o=document.createElement('option');o.value='';o.textContent='Выбрать строку';sel.appendChild(o);z.matches.forEach((m,i)=>{const o=document.createElement('option');o.value=String(i);o.textContent='№'+m.item.group+' — '+m.item.name+' ('+(norms(m.item)[2026]??'—')+'%)';sel.appendChild(o);});td.appendChild(sel);const button=document.createElement('button');button.type='button';button.textContent='Подтвердить';td.appendChild(button);button.addEventListener('click',()=>{if(sel.value==='')return;if(!window.confirm('Подтверждаете соответствие фактического товара, материала и специальных условий выбранной строки?'))return;z.res=candidateResult(z.matches[Number(sel.value)],'Выбрано пользователем','Строка выбрана пользователем; обязанность проверяется отдельно.');renderResults();});}}
  if(records.length>100){const p=document.createElement('p');p.textContent='На экране первые 100 строк. Все строки доступны в Excel; уточнение остальных строк пока выполняется отдельными партиями.';preview.appendChild(p);}
 }
 run.addEventListener('click',async()=>{if(busy)return;invalidate();if(!DATA_READY){status('База не прошла самопроверку или ещё загружается');return;}if(!book||!mapping){status('Сначала загрузите Excel');return;}busy=true;run.disabled=true;file.disabled=true;try{
  const x=window.XLSX, ws=book.Sheets[mapping.sheet];if(!ws||!ws['!ref'])throw Error('Пустой лист');
  const range=x.utils.decode_range(ws['!fullref']||ws['!ref']);if(range.e.r>=5001||range.e.c>=100)throw Error('Лимит: 5001 строка и 100 столбцов');
  const {cc,nc,start}=mapping,year='2026';if(start>range.e.r)throw Error('Нет строк для проверки');
  const src=[], results=[];let semantic=null;try{semantic=await getTnvedSemantic();}catch(e){}
  const cell=(r,c)=>c<0?null:ws[x.utils.encode_cell({r,c})];
  const val=c=>c?String(c.w??c.v??''):'';
  const counts={};
  for(let r=0;r<=range.e.r;r++){
   const row=Array.from({length:range.e.c+1},(_,c)=>val(cell(r,c)));src.push(row);
   if(r<start||!row.some(v=>v.trim()))continue;
   const a=cell(r,cc),b=cell(r,nc);let result;
   if(a?.f||b?.f||a?.F||b?.F||a?.t==='e'||b?.t==='e'||(a?.t==='n'&&(!Number.isSafeInteger(a.v)||/[eE+]/.test(val(a))||!/^\d{10}$/.test(val(a)))))result={res:blank('Требуется уточнение','Формула, ошибка или неоднозначное числовое представление кода'),matches:[]};
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
