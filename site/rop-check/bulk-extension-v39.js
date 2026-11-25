// Additive module: original v37 functions remain unchanged.
function mountBulkV38(){
 const box=document.createElement('div');
 box.style.cssText='margin-top:28px;border-top:1px solid #53616a;padding-top:24px';
 box.innerHTML=`<h3 style="color:white;margin:0 0 12px;font-size:23px">Массовая проверка Excel</h3><p style="color:#d1d9de;margin:0 0 18px;line-height:1.55">Загрузите список товаров или упаковки. Определим позиции перечня, группы и нормативы за 2026 год. Файл обрабатывается в браузере.</p><div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center"><label style="display:inline-flex;align-items:center;justify-content:center;min-height:54px;border:1px solid #8c9ca5;border-radius:8px;padding:12px 20px;cursor:pointer;color:white;font-weight:600">Загрузить Excel<input type="file" accept=".xlsx" style="position:absolute;width:1px;height:1px;opacity:0" aria-label="Загрузить Excel"></label><span data-field="filename" style="color:#d1d9de;overflow-wrap:anywhere"></span><button class="mr12-button" data-action="run" type="button" disabled>Проверить список</button><button class="mr12-button" data-action="download" type="button" disabled>Скачать Excel</button></div><div role="status" data-field="status" style="margin-top:14px;line-height:1.5;color:#d1d9de"></div><div data-field="preview" style="overflow:auto;margin-top:16px"></div>`;
 root.querySelector('.mr12-wrap').appendChild(box);
 const field=n=>box.querySelector(`[data-field="${n}"]`), file=box.querySelector('[type=file]'), run=box.querySelector('[data-action=run]'), download=box.querySelector('[data-action=download]');
 let book=null, mapping=null, output=null, busy=false;
 const status=t=>field('status').textContent=t;
 function invalidate(){output=null;download.disabled=true;field('preview').replaceChildren();}
 async function library(){if(window.XLSX?.version==='0.20.3')return window.XLSX;await loadDataScript('https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js',15000);if(window.XLSX?.version!=='0.20.3')throw Error('Библиотека Excel недоступна');return window.XLSX;}
 // Detect only explicit, unique headers. Never guess from numeric columns.
 function detect(x,wb){
  const found=[];
  const codeHeader=/^(?:код\s*)?(?:тн\s*вэд(?:\s*еаэс)?|окпд\s*2|код|маркировка(?:\s*упаковки)?|код\s*упаковки)$/iu;
  const nameHeader=/^(?:наименование(?:\s*(?:товара|продукции|упаковки|номенклатуры|товаров))?|название(?:\s*товара)?|номенклатура)$/iu;
  const normalize=v=>lower(v).replace(/[_().-]/g,' ').replace(/\s+/g,' ').trim();
  for(const sheet of wb.SheetNames){
   const ws=wb.Sheets[sheet];if(!ws||!ws['!ref'])continue;
   const range=x.utils.decode_range(ws['!fullref']||ws['!ref']);
   if(range.e.c>=100||range.e.r>=5001)throw Error('Лимит: 5001 строка и 100 столбцов на лист');
   for(let r=range.s.r;r<=Math.min(range.e.r,range.s.r+19);r++){
    const codes=[],names=[];
    for(let c=range.s.c;c<=range.e.c;c++){const v=ws[x.utils.encode_cell({r,c})];if(!v||v.f)continue;const t=normalize(v.w??v.v??'');if(codeHeader.test(t))codes.push(c);if(nameHeader.test(t))names.push(c);}
    if(codes.length>1||names.length>1)throw Error('Несколько столбцов кодов или наименований. Оставьте один столбец «Код» и при необходимости «Наименование».');
    if(codes.length===1){found.push({sheet,cc:codes[0],nc:names[0]??-1,start:r+1});break;}
   }
  }
  if(found.length!==1)throw Error('Нужен один лист с однозначным заголовком «Код», «ТН ВЭД» или «ОКПД 2». Наименование — необязательно.');
  return found[0];
 }
 file.addEventListener('change',async()=>{if(busy)return;invalidate();book=null;mapping=null;run.disabled=true;const f=file.files[0];field('filename').textContent=f?f.name:'';if(!f)return;busy=true;file.disabled=true;try{if(!/\.xlsx$/i.test(f.name)||f.size>5000000)throw Error('Выберите XLSX до 5 МБ');const x=await library();book=x.read(await f.arrayBuffer(),{type:'array',sheetRows:5002,cellFormula:true,cellText:true});mapping=detect(x,book);status('Файл готов к проверке.');}catch(e){book=null;mapping=null;status(e.message);}finally{busy=false;run.disabled=!mapping;file.disabled=false;}});
 const headers=['MIRLEX: статус','MIRLEX: раздел','MIRLEX: группа','MIRLEX: строка перечня','MIRLEX: ОКПД 2','MIRLEX: ТН ВЭД','MIRLEX: норматив, %','MIRLEX: основание','MIRLEX: комментарий'];
 async function classify(code,name,year,semantic){
  const q=clean(code)||clean(name);const blank=(s,why)=>[s,'','','','','','','ПП РФ №2414',why];
  if(!q)return blank('Требуется уточнение','Нет кода и наименования');
  let matches=search(q), qd=exactNumericQuery(q), entry=null;
  if(qd&&qd.length>=6){if(!semantic)return blank('Требуется уточнение','Семантическая база недоступна');entry=semantic.codes[qd]||null;if(entry)matches=applySemanticFilter(matches,entry);}
  if(!matches.length)return blank('Не найдено в перечне','Поиск не подтвердил строку; не означает отсутствия обязанности, упаковка проверяется отдельно');
  // Never infer legal inclusion from an ambiguous match or silently choose by score.
  const confirmed=matches.length===1&&matches[0].certainty==='confirmed';
  const m=matches[0], item=m.item, g=groupOf(item);
  if(!confirmed)return ['Требуется уточнение',[...new Set(matches.map(x=>x.item.sectionName))].join('; '),[...new Set(matches.map(x=>String(x.item.group)))].join('; '),matches.map(x=>x.item.name).join(' | ').slice(0,30000),'','','','ПП РФ №2414','Вариантов: '+matches.length+'. '+(m.reason||'Сверьте фактический товар и условия строки')];
  // A supplied name differing from the legal name is not automatically a mismatch,
  // but it must be reviewed rather than silently accepted in bulk mode.
  const nameReview=clean(name)&&lower(name)!==lower(item.name)&&lower(name)!==lower(item.material);
  const norm=norms(item)[year];
  return [nameReview?'Требуется уточнение':'Позиция найдена',item.sectionName,String(item.group)+(g?' — '+g.name:''),item.name,item.okpd||'',Number(item.section)===3?'':tnDisplay(item,m.rule),nameReview?'':(norm??''),Number(item.section)===1?'ПП РФ №2414':(year==='2026'?'451-ФЗ, ст.7 ч.5':'89-ФЗ, ст.24.2 п.4'),nameReview?'Сверьте наименование с найденной строкой':(Number(item.section)===3?'Материал упаковки необходимо подтвердить':'Принадлежность и обязанность конкретного лица проверяются отдельно')];
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
   const a=cell(r,cc),b=cell(r,nc);let res;
   if(a?.f||b?.f||a?.t==='e'||b?.t==='e'||(a?.t==='n'&&(!Number.isSafeInteger(a.v)||/[eE+]/.test(val(a)))))res=['Требуется уточнение','','','','','','','ПП РФ №2414','Формула, ошибка или неоднозначное числовое представление кода'];
   else res=await classify(val(a),val(b),year,semantic);
   results.push({row:r+1,res});counts[res[0]]=(counts[res[0]]||0)+1;
   if(r%100===0){status('Обработано строк: '+results.length);await new Promise(resolve=>setTimeout(resolve,0));}
  }
  if(!results.length)throw Error('Нет строк для проверки');
  const byRow=new Map(results.map(a=>[a.row,a.res]));const out=src.map((row,i)=>[...row,...(byRow.get(i+1)|| (i===start-1?headers:[]))]);if(start===0)out.unshift([...Array(range.e.c+1).fill(''),...headers]);
  const wb=x.utils.book_new();x.utils.book_append_sheet(wb,x.utils.aoa_to_sheet(out),'Результаты');x.utils.book_append_sheet(wb,x.utils.aoa_to_sheet([['Статус','Количество'],...Object.entries(counts),['Год',year],['Лист',mapping.sheet],['Источник',OFFICIAL_URL],['Ограничение','Проверка перечня не заменяет определение обязанности. Исходные значения выбранного листа сохранены текстом; формулы и оформление не копируются.']]),'Сводка');output=wb;download.disabled=false;
  status('Проверено: '+results.length+'. '+Object.entries(counts).map(([k,v])=>k+': '+v).join('; '));
  const table=document.createElement('table');table.style.cssText='color:white;font-size:13px;border-collapse:collapse;min-width:600px';for(const row of [['Строка','Статус','Группа','Норматив %','Комментарий'],...results.slice(0,100).map(z=>[z.row,z.res[0],z.res[2],z.res[6],z.res[8]])]){const tr=table.insertRow();for(const v of row){const td=tr.insertCell();td.style.cssText='padding:8px;border-bottom:1px solid #53616a';td.textContent=String(v);}}field('preview').appendChild(table);
 }catch(e){status(e.message);invalidate();}finally{busy=false;run.disabled=false;file.disabled=false;}});
 download.addEventListener('click',()=>{if(output)window.XLSX.writeFile(output,'MIRLEX_ROP_check.xlsx',{compression:true});});
}
try{mountBulkV38();}catch(e){console.error('MIRLEX bulk module unavailable',e);}
