(() => {
 const mount = document.getElementById("mirlex-rop-cabinet-mount");
 if (!mount || mount.dataset.loaded) return;
 mount.dataset.loaded = "1";
 mount.innerHTML = "<div id=\"mirlex-rop-test-v2-isolated\" class=\"mxr\"><style>\n#mirlex-rop-test-v2-isolated{font-family:Inter,Arial,sans-serif;color:#182833;max-width:1160px;margin:auto;padding:24px 16px;--mx:#116f59}\n#mirlex-rop-test-v2-isolated *{box-sizing:border-box}#mirlex-rop-test-v2-isolated .mx-title{font-size:27px;font-weight:750;letter-spacing:-.5px}\n#mirlex-rop-test-v2-isolated .mx-muted{color:#65747e;font-size:13px}#mirlex-rop-test-v2-isolated .mx-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}\n#mirlex-rop-test-v2-isolated .mx-top{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-bottom:22px;border-bottom:1px solid #e2e7ea}\n#mirlex-rop-test-v2-isolated .mx-panel{border:1px solid #e1e8e9;background:#fff;border-radius:15px;padding:19px;margin:16px 0}\n#mirlex-rop-test-v2-isolated .mx-tabs{display:flex;gap:8px;overflow:auto;padding-top:18px}\n#mirlex-rop-test-v2-isolated button{cursor:pointer;border:1px solid #dce4e6;background:#fff;border-radius:9px;padding:10px 14px;color:#233744;font-weight:650}\n#mirlex-rop-test-v2-isolated button[aria-selected=\"true\"],#mirlex-rop-test-v2-isolated button.mx-primary{background:#174c42;color:white;border-color:#174c42}\n#mirlex-rop-test-v2-isolated input,#mirlex-rop-test-v2-isolated select,#mirlex-rop-test-v2-isolated textarea{border:1px solid #ccd7da;border-radius:9px;padding:11px;min-width:0;width:100%;font:inherit;background:white;color:#182833}\n#mirlex-rop-test-v2-isolated label{display:block;font-size:13px;font-weight:650;margin-bottom:6px}\n#mirlex-rop-test-v2-isolated .mx-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}\n#mirlex-rop-test-v2-isolated .mx-stat{border:1px solid #dce5e5;border-radius:13px;padding:18px;text-align:left;width:100%}\n#mirlex-rop-test-v2-isolated .mx-number{font-size:25px;font-weight:750;display:block;margin:7px 0}\n#mirlex-rop-test-v2-isolated .mxv2-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}\n#mirlex-rop-test-v2-isolated table{width:100%;border-collapse:collapse;text-align:left;font-size:13px}\n#mirlex-rop-test-v2-isolated th,#mirlex-rop-test-v2-isolated td{padding:11px;border-bottom:1px solid #e5ebed;vertical-align:top}\n#mirlex-rop-test-v2-isolated .mx-scroll{overflow:auto}#mirlex-rop-test-v2-isolated .mxv2-status{min-height:26px;margin:10px 0;font-size:13px}\n#mirlex-rop-test-v2-isolated [hidden]{display:none!important}#mirlex-rop-test-v2-isolated .mx-note{font-size:12px;background:#f2f6f7;border-radius:8px;padding:12px;line-height:1.6}\n@media(max-width:780px){#mirlex-rop-test-v2-isolated .mx-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#mirlex-rop-test-v2-isolated .mxv2-form{grid-template-columns:1fr}}\n\n@media(max-width:480px){#mirlex-rop-test-v2-isolated{padding:18px 12px}#mirlex-rop-test-v2-isolated .mx-grid{grid-template-columns:1fr}#mirlex-rop-test-v2-isolated .mx-top{gap:10px}#mirlex-rop-test-v2-isolated .mx-title{font-size:23px}#mirlex-rop-test-v2-isolated .mx-panel{padding:14px}#mirlex-rop-test-v2-isolated .mx-tabs{flex-wrap:wrap}#mirlex-rop-test-v2-isolated .mx-row>input{min-width:0!important}}\n#mirlex-rop-test-v2-isolated #mxv2-utilization-allocation > p{margin:8px 0 16px}\n#mirlex-rop-test-v2-isolated #mxv2-allocated-status{margin:12px 0}\n#mirlex-rop-test-v2-isolated #mxv2-allocated-fields > b{display:block;margin:20px 0 10px}\n#mirlex-rop-test-v2-isolated #mxv2-allocated-fields > details{margin:12px 0}\n#mirlex-rop-test-v2-isolated .mx-contract-section{margin-top:20px;padding-top:16px;border-top:1px solid #dce4e6}\n#mirlex-rop-test-v2-isolated .mx-contract-section>p{margin:6px 0 12px}\n#mirlex-rop-test-v2-isolated .mx-counterparty-row{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e8edef}\n#mirlex-rop-test-v2-isolated .mx-counterparty-row>span{overflow-wrap:anywhere}\n#mirlex-rop-test-v2-isolated .mx-counterparty-row button{margin-left:auto}\n</style>\n<div class=\"mx-top\"><div><div class=\"mx-title\">MIRLEX <span style=\"color:#18735f\">|</span> Кабинет утилизатора</div><div class=\"mx-muted\">Учёт отходов · утилизация · акты · отчётность</div></div><div class=\"mx-row\"><label style=\"min-width:220px\">Предприятие<select id=\"mxv2-org\" disabled><option>Сначала войдите</option></select></label><div class=\"mx-muted\" id=\"mxv2-security\">Нет подключения</div></div></div>\n<div class=\"mx-panel\" id=\"mxv2-login\"><b>Вход в кабинет утилизатора</b><p class=\"mx-muted\">Для текущего тестового доступа используется ключ Render. Ключ не сохраняется в браузере и не включён в код сайта.</p><form id=\"mxv2-login-form\" class=\"mx-row\" autocomplete=\"off\"><input id=\"mxv2-token\" type=\"password\" autocomplete=\"off\" placeholder=\"Тестовый ключ доступа\" aria-label=\"Тестовый ключ MIRLEX\" style=\"flex:1;min-width:230px\" required/><button class=\"mx-primary\" id=\"mxv2-connect\" type=\"submit\">Открыть кабинет</button></form></div>\n<div id=\"mxv2-content\" hidden>\n<div class=\"mx-tabs\" role=\"tablist\"><button data-tab=\"profile\" aria-selected=\"true\">Организация</button><button data-tab=\"overview\" aria-selected=\"false\">Обзор</button><button data-tab=\"operations\" aria-selected=\"false\">Журнал операций</button><button data-tab=\"acts\" aria-selected=\"false\">Акты утилизации</button><button data-tab=\"reports\" aria-selected=\"false\">Отчётность</button></div>\n<section data-section=\"overview\" hidden><div class=\"mx-panel\"><b>Контроль мощностей и энергопотребления</b>\n<p class=\"mx-muted\">Показатели рассчитываются автоматически из карточек оборудования, журнала фактической утилизации и показаний электросчётчиков. Здесь нет ручного ввода.</p>\n<div id=\"mxv2-cap-result\" role=\"status\" class=\"mx-muted\">Загрузка производственных данных…</div></div>\n<p class=\"mx-muted\">Нажмите на показатель — откроются операции, из которых он рассчитан. Масса в килограммах.</p>\n<div class=\"mx-grid\" id=\"mxv2-stats\"></div><div class=\"mx-panel\"><b id=\"mxv2-detail-title\">Расшифровка</b><div id=\"mxv2-breakdown\" class=\"mx-scroll\"></div></div></section>\n<section data-section=\"profile\"><div class=\"mx-panel\"><b>Карточка утилизатора</b><p class=\"mx-muted\">Поля, подтверждаемые реестром ЕФГИС УОИТ, пока заполняются вручную. Данные сохраняются только в тестовой организации. Реквизиты организации пока доступны для просмотра.</p><p class=\"mx-note\">Поиск по ИНН и сверка с ЕФГИС УОИТ разрабатываются отдельно. Реквизиты ФНС не подтверждают включение в реестр утилизаторов. До официального доступа можно будет загружать выписку и сверять сведения вручную.</p><div class=\"mxv2-form\"><div><label>Наименование организации<input id=\"mxv2-legal\" readonly/></label></div><div><label>ИНН<input id=\"mxv2-inn\" readonly placeholder=\"Не указан\"/></label></div><div><label>ОГРН<input id=\"mxv2-ogrn\" readonly placeholder=\"Не указан\"/></label></div></div><form id=\"mxv2-profile-form\" class=\"mxv2-form\"><div><label>Номер записи в реестре утилизаторов<input name=\"registry_number\" maxlength=\"120\" placeholder=\"По официальной выписке\"/></label></div><div><label>Дата получения/проверки сведений<input name=\"registry_as_of\" type=\"date\"/></label></div><div><label>Ссылка на источник реестровых сведений (при наличии)<input name=\"registry_source_url\" type=\"url\" maxlength=\"500\" placeholder=\"https://...\"/></label></div><div><label>Часовой пояс объекта<select name=\"site_timezone\" id=\"mxv2-timezone\" required><option value=\"Europe/Kaliningrad\">Калининград (UTC+2)</option><option value=\"Europe/Moscow\" selected>Москва (UTC+3)</option><option value=\"Europe/Samara\">Самара (UTC+4)</option><option value=\"Asia/Yekaterinburg\">Екатеринбург (UTC+5)</option><option value=\"Asia/Omsk\">Омск (UTC+6)</option><option value=\"Asia/Novosibirsk\">Новосибирск (UTC+7)</option><option value=\"Asia/Irkutsk\">Иркутск (UTC+8)</option><option value=\"Asia/Yakutsk\">Якутск (UTC+9)</option><option value=\"Asia/Vladivostok\">Владивосток (UTC+10)</option><option value=\"Asia/Magadan\">Магадан (UTC+11)</option><option value=\"Asia/Kamchatka\">Камчатка (UTC+12)</option></select></label><small class=\"mx-muted\">Выберите часовой пояс фактического производственного объекта. Позже он будет привязан к каждому объекту отдельно.</small></div><div><button class=\"mx-primary\" type=\"submit\">Сохранить карточку</button></div></form><p class=\"mx-muted\" id=\"mxv2-profile-status\" role=\"status\"></p><p class=\"mx-note\">Статус — черновик. Ввод номера реестра не является подтверждением нахождения в реестре. Импорт из ЕФГИС УОИТ, оборудование, мощности и виды отходов подключаются отдельно.</p></div><div class=\"mx-panel\"><b>Производственные объекты</b><p class=\"mx-muted\">Добавляйте объекты раздельно. Введённые сведения являются черновыми до сверки с выпиской ЕФГИС УОИТ.</p>\n<form id=\"mxv2-site-form\" class=\"mxv2-form\">\n<div><label>Наименование объекта<input name=\"name\" required maxlength=\"200\" placeholder=\"Цех утилизации № 1\"/></label></div>\n<div><label>Адрес производственного объекта<input name=\"address\" maxlength=\"500\" placeholder=\"Адрес объекта\"/></label></div>\n<div><label>Часовой пояс объекта<select name=\"timezone\" id=\"mxv2-site-timezone\"><option value=\"Europe/Kaliningrad\">Калининград</option><option value=\"Europe/Moscow\" selected>Москва</option><option value=\"Europe/Samara\">Самара</option><option value=\"Asia/Yekaterinburg\">Екатеринбург</option><option value=\"Asia/Omsk\">Омск</option><option value=\"Asia/Novosibirsk\">Новосибирск</option><option value=\"Asia/Irkutsk\">Иркутск</option><option value=\"Asia/Yakutsk\">Якутск</option><option value=\"Asia/Vladivostok\">Владивосток</option><option value=\"Asia/Magadan\">Магадан</option><option value=\"Asia/Kamchatka\">Камчатка</option></select></label></div>\n<div><button class=\"mx-primary\" type=\"submit\">Добавить объект</button></div>\n</form><p id=\"mxv2-site-status\" class=\"mx-muted\" role=\"status\"></p><div id=\"mxv2-site-list\" class=\"mx-scroll\"></div></div>\n<div class=\"mx-panel\"><b>Оборудование, технологические линии и мощности</b>\n<p class=\"mx-muted\">Укажите годовую мощность и часовую производительность по документам оборудования. Фактическую утилизацию и загрузку линии проверяем отдельно во вкладке «Обзор».</p>\n<form id=\"mxv2-line-form\" class=\"mxv2-form\">\n<div><label>Производственный объект<select name=\"site_id\" id=\"mxv2-line-site\" required><option value=\"\">Сначала добавьте объект</option></select></label></div>\n<div><label>Оборудование или технологическая линия<input name=\"name\" maxlength=\"200\" required placeholder=\"Линия переработки\"/></label></div>\n<div><label>Паспортная мощность, т/год<input name=\"annual_t\" required inputmode=\"decimal\" placeholder=\"1000\"/></label></div>\n<div><label>Производительность оборудования, т/ч (по паспорту)<input name=\"hourly_t\" inputmode=\"decimal\" placeholder=\"0,5\"/></label></div>\n<div><label>С какой даты действует эта мощность<input name=\"valid_from\" type=\"text\" inputmode=\"numeric\" maxlength=\"10\" placeholder=\"20.10.2026\" title=\"Можно вставить дату через Ctrl+V\"/></label></div>\n<div><label>Документ — основание мощности<input name=\"source\" maxlength=\"500\" required placeholder=\"Паспорт оборудования, раздел, дата\"/></label></div><div style=\"grid-column:1/-1\"><b>Энергетические параметры оборудования</b></div><div><label>Удельный расход электроэнергии, кВт·ч/т<input name=\"energy_specific_kwh_per_t\" inputmode=\"decimal\" pattern=\"[0-9]+([.,][0-9]{1,6})?\" title=\"Число, до 6 знаков после запятой\" placeholder=\"По технологическому регламенту\"/></label></div><div><label>Номер электросчётчика<input name=\"electricity_meter_number\" inputmode=\"numeric\" pattern=\"[0-9]+\" title=\"Только цифры\" maxlength=\"100\" placeholder=\"Номер прибора\"/></label></div><div><label>Дата поверки электросчётчика<input name=\"meter_verification_date\" type=\"date\"/></label></div>\n<div><button class=\"mx-primary\" type=\"submit\">Добавить оборудование</button> <button type=\"button\" id=\"mxv2-line-cancel\" hidden>Отмена</button></div>\n</form><p id=\"mxv2-line-status\" class=\"mx-muted\" role=\"status\"></p><div id=\"mxv2-line-list\" class=\"mx-scroll\"></div>\n<p class=\"mx-note\">Это пользовательские данные. Сверка с реестром ЕФГИС УОИТ и нормативными связями ПП № 2394 будет подключена отдельно.</p></div>\n<div class=\"mx-panel\"><b>Справочник отходов, сырья и продукции</b>\n<p class=\"mx-muted\">Добавьте отходы по ФККО, вторичное сырьё и продукцию по ОКПД 2. Для отходов действует поиск по БДО; для сырья и продукции укажите код и наименование по документам. Отметка «РОП» для отхода отражает ваш выбор, но не подтверждает соответствие ПП № 2394. Проверка нормативных связей будет подключена отдельно.</p>\n<div class=\"mx-panel\"><b>Массовое добавление из Excel</b><p class=\"mx-muted\">Выберите категорию, загрузите Excel и нажмите «Проверить Excel». MIRLEX сам попробует распознать таблицу и предложит проверить результаты. Дополнительные настройки — только если файл неоднозначен.</p>\n<div class=\"mxv2-form\">\n<fieldset id=\"mxv2-xlsx-kind\" style=\"grid-column:1/-1\"><legend>Что загружаем?</legend><label style=\"display:flex;align-items:center;gap:8px\"><input style=\"width:auto;margin:0\" type=\"radio\" name=\"xlsx_kind\" value=\"waste_fkko\" checked/> Отходы</label><label style=\"display:flex;align-items:center;gap:8px\"><input style=\"width:auto;margin:0\" type=\"radio\" name=\"xlsx_kind\" value=\"secondary_okpd2\"/> Вторичное сырьё</label><label style=\"display:flex;align-items:center;gap:8px\"><input style=\"width:auto;margin:0\" type=\"radio\" name=\"xlsx_kind\" value=\"product_okpd2\"/> Продукция</label></fieldset>\n<div><label>Excel (.xlsx)<input id=\"mxv2-catalog-xlsx\" type=\"file\" accept=\".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\"/></label></div>\n<div style=\"grid-column:1/-1\"><details id=\"mxv2-xlsx-advanced\"><summary>Настройки Excel (если распознавание не удалось)</summary><div class=\"mxv2-form\"><div><label>Номер листа Excel<input id=\"mxv2-xlsx-sheet\" type=\"number\" min=\"0\" max=\"12\" value=\"0\"/></label></div><div><label>Расположение столбцов<select id=\"mxv2-xlsx-layout\"><option value=\"manual\">Указать столбцы вручную</option><option value=\"one_c\">Пример 1С: E — ФККО, F — название</option></select></label></div>\n<div><label><span id=\"mxv2-xlsx-code-label\">Столбец с кодом ФККО</span><input id=\"mxv2-xlsx-codecol\" maxlength=\"3\" placeholder=\"Например, E\"/></label></div>\n<div><label><span id=\"mxv2-xlsx-name-label\">Столбец с названием отхода</span><input id=\"mxv2-xlsx-namecol\" maxlength=\"3\" placeholder=\"Например, F\"/></label></div><div id=\"mxv2-xlsx-doc-group\"><label>Столбец с ТУ / ГОСТ (если есть)<input id=\"mxv2-xlsx-documentcol\" maxlength=\"3\" placeholder=\"Необязательно\"/></label></div>\n</div></details></div>\n<div><button id=\"mxv2-xlsx-preview-button\" type=\"button\">Проверить Excel</button></div>\n</div><p id=\"mxv2-xlsx-status\" role=\"status\" class=\"mx-muted\"></p>\n<div id=\"mxv2-xlsx-preview\" class=\"mx-scroll\"></div></div>\n<p><b>Добавление вручную</b></p>\n<form id=\"mxv2-catalog-form\" class=\"mxv2-form\">\n<fieldset id=\"mxv2-catalog-kind\" style=\"grid-column:1/-1\"><legend>Категория справочника</legend><label style=\"display:flex;align-items:center;gap:8px\"><input style=\"width:auto;margin:0\" type=\"radio\" name=\"kind\" value=\"waste_fkko\" checked/> Отходы</label><label style=\"display:flex;align-items:center;gap:8px\"><input style=\"width:auto;margin:0\" type=\"radio\" name=\"kind\" value=\"secondary_okpd2\"/> Вторичное сырьё</label><label style=\"display:flex;align-items:center;gap:8px\"><input style=\"width:auto;margin:0\" type=\"radio\" name=\"kind\" value=\"product_okpd2\"/> Продукция</label></fieldset>\n<p id=\"mxv2-catalog-source\" class=\"mx-muted\" style=\"grid-column:1/-1\"></p>\n<div id=\"mxv2-catalog-fkko-lookup\"><label>Найти отход по ФККО<input id=\"mxv2-catalog-search\" type=\"search\" autocomplete=\"off\" placeholder=\"Введите название или код ФККО\"/></label><div id=\"mxv2-catalog-search-results\" role=\"status\" class=\"mx-muted\">Начните вводить название отхода или код ФККО.</div></div><div><label><span id=\"mxv2-manual-code-label\">Код ФККО</span><input name=\"code\" required maxlength=\"40\" placeholder=\"Выберите отход из списка\"/></label></div>\n<div><label><span id=\"mxv2-manual-name-label\">Наименование отхода</span><input name=\"name\" required maxlength=\"300\" placeholder=\"Название подставится после выбора кода\"/></label></div>\n<div id=\"mxv2-catalog-standard\"><label><span id=\"mxv2-manual-doc-label\">Документ (ТУ, ГОСТ и др.)</span><input name=\"standard_document\" maxlength=\"500\" placeholder=\"Например, ТУ, номер, дата (если есть)\"/></label></div>\n<div><button class=\"mx-primary\" type=\"submit\">Добавить в справочник</button></div>\n</form><p id=\"mxv2-catalog-status\" role=\"status\" class=\"mx-muted\"></p>\n<div id=\"mxv2-catalog-list\" class=\"mx-scroll\">Загрузка сохранённых записей…</div></div>\n</section><section data-section=\"operations\" hidden>\n<div class=\"mx-panel\" id=\"mxv2-receipts-import\">\n<b>Массовая загрузка поступлений из Excel</b>\n<p class=\"mx-muted\">Загрузите реестр поступлений отходов. Для сохранения проверьте дату, код ФККО, наименование, массу в кг, отправителя и номер документа. Пропуски можно заполнить перед сохранением.</p>\n<div class=\"mxv2-form\">\n<div><label>Файл Excel (.xlsx)<input type=\"file\" accept=\".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\" id=\"mxv2-receipts-file\"/></label></div>\n<div><label>Номер листа (0 — автоматически)<input type=\"number\" min=\"0\" max=\"12\" value=\"0\" id=\"mxv2-receipts-sheet\"/></label></div>\n</div>\n<div id=\"mxv2-receipts-mass-confirm-panel\" class=\"mx-panel\" hidden>\n<b>Контроль массы перед сохранением</b>\n<p id=\"mxv2-receipts-mass-source\" class=\"mx-muted\"></p>\n<label><input type=\"checkbox\" id=\"mxv2-receipts-mass-confirm\"/> Подтверждаю, что выбранный столбец содержит массу поступивших отходов в кг</label>\n<button type=\"button\" id=\"mxv2-receipts-change-mass\">Указать другой столбец массы</button>\n</div>\n<details id=\"mxv2-receipts-mapping\"><summary>Указать столбцы вручную, если распознавание не удалось</summary>\n<div class=\"mxv2-form\">\n<div><label>Дата поступления<input id=\"mxv2-receipts-col-occurred_on\" placeholder=\"A\" maxlength=\"3\"/></label></div>\n<div><label>Код ФККО<input id=\"mxv2-receipts-col-material_code\" placeholder=\"B\" maxlength=\"3\"/></label></div>\n<div><label>Наименование отхода (необязательно)<input id=\"mxv2-receipts-col-material_name\" placeholder=\"C\" maxlength=\"3\"/></label></div>\n<div><label>Масса в кг<input id=\"mxv2-receipts-col-mass_kg\" placeholder=\"D\" maxlength=\"3\"/></label></div>\n<div><label>От кого получено<input id=\"mxv2-receipts-col-counterparty\" placeholder=\"E\" maxlength=\"3\"/></label></div>\n<div><label>Номер документа<input id=\"mxv2-receipts-col-document_number\" placeholder=\"F\" maxlength=\"3\"/></label></div>\n</div></details>\n<div class=\"mx-panel\" style=\"margin:12px 0\"><b>Заполнить пропуски во всех строках предпросмотра</b><p class=\"mx-muted\">Заполняйте только если эти реквизиты действительно одинаковы для выбранных строк. Дата документа не всегда является датой фактического поступления.</p><div class=\"mxv2-form\"><div><label>Фактическая дата поступления (ДД.ММ.ГГГГ)<input type=\"text\" id=\"mxv2-receipts-common-date\" placeholder=\"11.02.2026\"/></label></div><div><label>Отправитель / контрагент<input id=\"mxv2-receipts-common-cp\" maxlength=\"200\" placeholder=\"По первичному документу\"/></label></div><div><label>Номер документа<input id=\"mxv2-receipts-common-doc\" maxlength=\"160\" placeholder=\"По накладной или акту\"/></label></div></div><button type=\"button\" id=\"mxv2-receipts-complete\">Дополнить отсутствующие поля</button></div>\n<div class=\"mx-row\" style=\"margin-top:12px\"><button id=\"mxv2-receipts-check\" type=\"button\">Проверить Excel</button></div>\n<p class=\"mx-muted\" role=\"status\" id=\"mxv2-receipts-status\"></p>\n<div id=\"mxv2-receipts-preview\" class=\"mx-scroll\"></div><div style=\"margin-top:12px\"><button id=\"mxv2-receipts-save\" type=\"button\" class=\"mx-primary\" hidden>Сохранить выбранные поступления</button><p id=\"mxv2-receipts-bottom-status\" class=\"mx-muted\" role=\"status\"></p></div>\n</div>\n<div class=\"mx-panel\" id=\"mxv2-rop-contracts\">\n<b>Контрагенты и договоры для отчётности № 2116</b>\n<p class=\"mx-muted\">Здесь ведутся договоры, по которым вы выполняете утилизацию для производителя, импортёра или иного лица. В договоре выбери организацию, с которой заключён договор на утилизацию. В поступлении укажи, от кого фактически приняты отходы по накладной или акту. Эти организации могут различаться.</p>\n<div class=\"mxv2-form\">\n<div><label>Новый контрагент<input id=\"mxv2-cp-name\" maxlength=\"200\" placeholder=\"Наименование\"/></label></div>\n<div><label>ИНН<input id=\"mxv2-cp-inn\" inputmode=\"numeric\" maxlength=\"12\" pattern=\"[0-9]{10}|[0-9]{12}\" aria-describedby=\"mxv2-cp-inn-hint\"/></label><small id=\"mxv2-cp-inn-hint\">Для юрлица — 10 цифр, для ИП — 12.</small></div>\n<div><label>Тип<select id=\"mxv2-cp-type\"><option value=\"legal\">Юридическое лицо</option><option value=\"entrepreneur\">ИП</option><option value=\"person\">Физическое лицо</option></select></label></div>\n<div style=\"grid-column:1/-1\"><button id=\"mxv2-cp-save\" type=\"button\">Сохранить контрагента</button></div>\n</div>\n<div class=\"mxv2-form\">\n<div><label>Контрагент<select id=\"mxv2-contract-cp\"><option value=\"\">Выберите</option></select></label></div>\n<div><label>Номер договора<input id=\"mxv2-contract-number\" maxlength=\"160\"/></label></div>\n<div><label>Дата заключения<input id=\"mxv2-contract-signed\" type=\"date\"/></label></div>\n<div><label>Начало действия<input id=\"mxv2-contract-from\" type=\"date\"/></label></div>\n<div><label>Окончание действия (если установлено)<input id=\"mxv2-contract-to\" type=\"date\"/></label></div>\n<div><label>Дата расторжения (если есть)<input id=\"mxv2-contract-terminated\" type=\"date\"/></label></div>\n<div><button id=\"mxv2-contract-save\" type=\"button\">Сохранить договор</button></div>\n</div>\n<div class=\"mxv2-form\">\n<div><label>Поступление<select id=\"mxv2-contract-receipt\"><option value=\"\">Выбери сохранённое поступление</option></select></label></div>\n<div><label>Договор<select id=\"mxv2-contract-link\"><option value=\"\">Выберите договор</option></select></label></div>\n<div><button id=\"mxv2-contract-link-save\" type=\"button\">Связать договор с поступлением</button><p id=\"mxv2-contract-link-status\" class=\"mx-muted\" role=\"status\"></p></div>\n</div>\n<button id=\"mxv2-contract-refresh\" type=\"button\">Обновить реестр договоров</button>\n<div id=\"mxv2-contract-status\" class=\"mx-muted\" role=\"status\"></div>\n<section class=\"mx-contract-section\"><b>Сохранённые контрагенты</b><div id=\"mxv2-cp-table\"></div></section><section class=\"mx-contract-section\"><b>Реестр договоров</b><div id=\"mxv2-contract-table\" class=\"mx-scroll\"></div></section><section class=\"mx-contract-section\"><b>Поступления, которые можно связать с договором</b><p class=\"mx-muted\">Привязка указывает, по какому договору принята партия отходов. Она нужна, когда поступление относится к конкретному договору. В таблице ниже — партии для выбора.</p><div id=\"mxv2-contract-receipts-table\" class=\"mx-scroll\"></div></section>\n</div>\n<div class=\"mx-panel\" id=\"mxv2-utilization-allocation\">\n<b>Утилизировать принятые партии</b>\n<p class=\"mx-muted\">Открой остатки поступлений, выбери отход и отметь партии, которые переработал. Укажи использованную массу и добавь полученное сырьё или продукцию. Паспортная доля показывает расчётный выход.</p>\n<button type=\"button\" id=\"mxv2-allocated-refresh\">1. Показать партии с остатком</button>\n<div id=\"mxv2-allocated-status\" class=\"mx-muted\" role=\"status\"></div>\n<div id=\"mxv2-allocated-list\" class=\"mx-scroll\" style=\"margin:12px 0\"></div><div id=\"mxv2-allocated-fields\" hidden>\n<div class=\"mxv2-form\" style=\"margin-top:12px\">\n<div><label>Дата утилизации (ДД.ММ.ГГГГ)<input id=\"mxv2-allocated-date\" placeholder=\"02.11.2026\" maxlength=\"10\"/></label></div>\n<div><label>Технологическая линия<select id=\"mxv2-allocated-line\"><option value=\"\">Выберите линию</option></select></label></div>\n<div><label>Маршрут<select id=\"mxv2-allocated-route\"><option value=\"secondary_raw\">Отходы → вторсырьё → продукция</option><option value=\"raw_only\">Отходы → вторсырьё, без выпуска продукции</option><option value=\"direct_waste\">Отходы → продукция непосредственно</option></select></label></div>\n<div><label>Код продукции ОКПД 2<input id=\"mxv2-allocated-product-code\" maxlength=\"40\"/></label></div>\n<div><label>Наименование продукции<input id=\"mxv2-allocated-product-name\" maxlength=\"200\"/></label></div>\n</div>\n<b>3. Укажи, что получилось после утилизации</b>\n<details><summary>Загрузить результаты из Excel (.xlsx)</summary>\n<p class=\"mx-muted\">Сначала выбери исходные партии. Один файл добавляет результаты одной операции. После загрузки проверь строки и сохрани операцию обычной кнопкой.</p>\n<label>Файл Excel<input id=\"mxv2-output-xlsx\" type=\"file\" accept=\".xlsx\"/></label>\n<div class=\"mx-row\"><button type=\"button\" id=\"mxv2-output-template\">Скачать шаблон Excel</button><button type=\"button\" id=\"mxv2-output-import\">Проверить и добавить строки</button></div>\n<p class=\"mx-muted\" id=\"mxv2-output-import-status\" role=\"status\"></p></details>\n<div id=\"mxv2-allocated-outputs\"></div>\n<div class=\"mx-row\"><button type=\"button\" id=\"mxv2-allocated-add-output\">Добавить вид сырья / продукции</button><button class=\"mx-primary\" type=\"button\" id=\"mxv2-allocated-save\">Сохранить утилизацию выбранных партий</button></div>\n<p class=\"mx-muted\">Доля для графы 13 не присваивается автоматически без проверки назначения показателя и первичных документов.</p><p id=\"mxv2-allocated-save-status\" class=\"mx-muted\" role=\"status\"></p></div>\n</div>\n<div class=\"mx-panel\"><b>Новая запись</b><p class=\"mx-muted\">Выбери, что произошло, и заполни поля этой записи.</p><form id=\"mxv2-form\" class=\"mxv2-form\">\n<fieldset style=\"grid-column:1/-1\"><legend>Что записываем?</legend><p class=\"mx-muted\">Поступление — приняли отходы. Утилизация — переработали отходы или вторсырьё. Выпуск — отдельно зафиксировали готовую продукцию. Для утилизации с привязкой к входным партиям используй блок выше.</p>\n<label style=\"display:inline-flex;align-items:center;gap:6px;margin-right:14px\"><input type=\"radio\" style=\"width:auto\" name=\"kind\" value=\"receipt\" checked/> Поступление</label>\n<label style=\"display:inline-flex;align-items:center;gap:6px;margin-right:14px\"><input type=\"radio\" style=\"width:auto\" name=\"kind\" value=\"utilization\"/> Утилизация</label>\n<label style=\"display:inline-flex;align-items:center;gap:6px\"><input type=\"radio\" style=\"width:auto\" name=\"kind\" value=\"production\"/> Выпуск продукции</label></fieldset>\n<div><label>Дата операции (ДД.ММ.ГГГГ)<div class=\"mx-row\" style=\"flex-wrap:nowrap;gap:8px\"><input name=\"occurred_on\" id=\"mxv2-operation-date\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" placeholder=\"21.10.2026\" maxlength=\"10\" required aria-describedby=\"mxv2-date-hint\"/><input id=\"mxv2-operation-calendar\" type=\"date\" aria-label=\"Выбрать дату в календаре\" title=\"Выбрать дату в календаре\" style=\"width:48px;min-width:48px;padding:9px 5px\"/></div></label><small class=\"mx-muted\" id=\"mxv2-date-hint\">Можно ввести или вставить дату. Календарь — дополнительный способ.</small></div>\n<div id=\"mxv2-fkko-search\" style=\"grid-column:1/-1\"><label>Поиск по БДО: код или наименование<input id=\"mxv2-fkko-query\" type=\"search\" placeholder=\"Введите код или название отхода\" autocomplete=\"off\"/></label><div id=\"mxv2-fkko-results\" role=\"status\" class=\"mx-muted\">Введите не менее 2 символов для поиска по БДО.</div><a id=\"mxv2-fkko-official\" href=\"https://rpn.gov.ru/fkko/\" target=\"_blank\" rel=\"noopener noreferrer\">Открыть официальный ФККО</a></div><div><label><span id=\"mxv2-code-label\">Код ФККО</span><input name=\"material_code\" maxlength=\"40\" required placeholder=\"11-значный код ФККО\"/></label><small class=\"mx-muted\" id=\"mxv2-code-hint\">Точный код по ФККО. Автопоиск по справочнику пока не подключён.</small></div>\n<div><label><span id=\"mxv2-name-label\">Наименование отхода по ФККО</span><input name=\"material_name\" maxlength=\"200\" required placeholder=\"Наименование по ФККО\"/></label></div>\n<div><label>Масса, кг<input name=\"mass_kg\" required inputmode=\"decimal\" placeholder=\"Например, 1250,5\"/></label></div><div id=\"mxv2-pp2116-fields\" hidden style=\"grid-column:1/-1\"><div class=\"mx-panel\"><b>Для отчётности ПП № 2116, раздел II</b><p class=\"mx-muted\">Эти сведения сохраняются с операцией утилизации. Доля вводится в процентах; если она повторяется для той же линии, материала и продукции, MIRLEX предложит последнее значение.</p><div class=\"mxv2-form\">\n<div><label>Технологическая линия<select name=\"recycler_line_id\" id=\"mxv2-operation-line\"><option value=\"\">Выберите линию</option></select></label></div>\n<div><label>Способ утилизации<select name=\"utilization_route\" id=\"mxv2-operation-route\"><option value=\"direct_waste\">Непосредственно отходы → продукция</option><option value=\"secondary_raw\">Вторичное сырьё → продукция</option></select></label></div>\n<div><label>Код произведённой продукции ОКПД 2<input name=\"product_code\" maxlength=\"40\" placeholder=\"Код продукции\"/></label></div>\n<div><label>Наименование произведённой продукции<input name=\"product_name\" maxlength=\"200\" placeholder=\"По документу или из сохранённого справочника\"/></label></div>\n<div><label>Доля использования, % (графа 13)<input name=\"waste_share_percent\" id=\"mxv2-operation-share\" type=\"text\" inputmode=\"decimal\" placeholder=\"Например, 80\"/></label></div>\n</div><small class=\"mx-muted\" id=\"mxv2-share-hint\">При отсутствии подтверждённой доли оставьте поле пустым: в истории появится «Не указана», а не 0%.</small></div></div>\n<div><label>От кого получено / контрагент<input name=\"counterparty\" maxlength=\"200\" placeholder=\"По первичному документу\"/></label></div>\n<div><label>Номер документа<input name=\"document_number\" maxlength=\"160\" placeholder=\"Акт, накладная и др.\"/></label></div>\n<div><label>Примечание<input name=\"notes\" maxlength=\"1000\"/></label></div>\n<div class=\"mx-row\"><button class=\"mx-primary\" type=\"submit\">Сохранить операцию</button><span id=\"mxv2-operation-status\" class=\"mx-muted\" role=\"status\"></span></div></form></div>\n<div class=\"mx-panel\"><div class=\"mx-row\" style=\"justify-content:space-between\"><b>История операций</b><button id=\"mxv2-export\">Экспорт CSV</button></div><div class=\"mx-scroll\" id=\"mxv2-history\"></div></div></section>\n<section data-section=\"acts\" hidden>\n<div class=\"mx-panel\"><b>Акты утилизации</b>\n<p class=\"mx-muted\">Реестр актов и подбор объёма для заказчика. Оформление акта по форме приказа Минприроды России № 762 будет доступно после подключения реестра договоров, подтверждённых фактов утилизации и защиты от повторного распределения массы.</p>\n<div class=\"mx-grid\" style=\"grid-template-columns:repeat(3,minmax(0,1fr))\">\n<div class=\"mx-stat\"><span class=\"mx-muted\">Подтверждённый объём для актов</span><div class=\"mx-number\">—</div><small class=\"mx-muted\">Требует подтверждённых партий</small></div>\n<div class=\"mx-stat\"><span class=\"mx-muted\">Распределено по актам</span><div class=\"mx-number\">—</div><small class=\"mx-muted\">Реестр ещё не подключён</small></div>\n<div class=\"mx-stat\"><span class=\"mx-muted\">Свободно для распределения</span><div class=\"mx-number\">—</div><small class=\"mx-muted\">Нельзя рассчитать достоверно</small></div>\n</div>\n<div class=\"mx-panel\"><b>Акты, оформленные в MIRLEX</b><p class=\"mx-muted\">Здесь видны сохранённые черновики и акты, которые оформил утилизатор. Загрузка файла не требуется.</p><div id=\"mxv2-acts-table\"></div></div><p class=\"mx-muted\">Для черновика выбери ниже сохранённую операцию утилизации. Затем укажи номер, дату, заказчика и массу в кг. Автоматический подбор по нескольким операциям ещё недоступен.</p>\n<div class=\"mx-panel\"><b>Предварительное заполнение акта № 762</b>\n<p class=\"mx-muted\">Проверка сведений по выбранной операции. Это не подписанный акт и не основание для автоматического отражения массы в отчётности.</p>\n<div class=\"mxv2-form\"><div><label>Операция утилизации<select id=\"mxv2-act-event\"><option value=\"\">Выберите операцию</option></select></label></div>\n<div><button type=\"button\" id=\"mxv2-act-check\">Показать сведения для акта</button></div></div>\n<div id=\"mxv2-act-draft-result\" role=\"status\" class=\"mx-scroll\"></div></div>\n<div class=\"mx-panel\"><b>Распределение объёма в черновик акта</b><p class=\"mx-muted\">Черновик резервирует объём операции и не считается подписанным актом. Заполните реквизиты и подтвердите фактическую массу.</p><div class=\"mxv2-form\"><div><label>Номер акта<input id=\"mxv2-act-number\" maxlength=\"160\"/></label></div><div><label>Дата акта<input id=\"mxv2-act-date\" type=\"date\"/></label></div><div><label>Заказчик<input id=\"mxv2-act-customer\" maxlength=\"200\"/></label></div><div><label>Договор<input id=\"mxv2-act-contract-ref\" maxlength=\"200\"/></label></div><div><label>Масса из выбранной операции, кг<input id=\"mxv2-act-mass\" inputmode=\"decimal\"/></label></div></div><button type=\"button\" id=\"mxv2-act-save-draft\">Сохранить черновик и зарезервировать массу</button><div id=\"mxv2-act-save-status\" class=\"mx-muted\" role=\"status\"></div></div>\n<div class=\"mx-panel\"><b>Формирование акта в Word (.docx)</b><p class=\"mx-muted\">Предпросмотр и выгрузка документа по утверждённой форме. Генерация будет разрешена только после проверки операций, договора и доступных объёмов.</p><button type=\"button\" id=\"mxv2-act-docx\">Скачать неподписанный черновик Word</button></div>\n</div></section>\n<section data-section=\"reports\" hidden>\n<div class=\"mx-panel\"><b>ПП РФ № 2116 — проверка заполнения отчётности</b>\n<p class=\"mx-muted\">Черновая сверка исходных сведений. Данные агрегируются сервером из всех операций за квартал. Это не утверждённая форма и не готовый файл для подачи в ЕФГИС УОИТ.</p>\n<div class=\"mx-row\" style=\"flex-wrap:wrap;gap:12px\">\n<label>Год<input id=\"mxv2-reports-year\" type=\"number\" min=\"2000\" max=\"2100\" value=\"2026\" style=\"max-width:110px\"/></label>\n<label>Квартал<select id=\"mxv2-reports-quarter\"><option value=\"1\">I</option><option value=\"2\">II</option><option value=\"3\">III</option><option value=\"4\">IV</option></select></label>\n<button id=\"mxv2-reports-check\" type=\"button\">Проверить исходные данные</button>\n</div>\n<div id=\"mxv2-pp2116-report\" role=\"status\" class=\"mx-scroll\">Выберите отчётный период и нажмите «Проверить исходные данные».</div>\n</div>\n<div class=\"mx-panel\"><b>Раздел II · прослеживаемые результаты переработки</b>\n<p class=\"mx-muted\">Исходная масса каждой операции учитывается один раз. Все полученные виды вторсырья показываются как дочерние результаты, без повторного сложения исходного отхода.</p>\n<button type=\"button\" id=\"mxv2-ii-evidence-check\">Показать операции и результаты</button>\n<button type=\"button\" id=\"mxv2-ii-csv-download\">Скачать проверочный раздел II (CSV, 17 граф)</button>\n<div id=\"mxv2-ii-evidence\" role=\"status\" class=\"mx-scroll\"></div></div>\n<div class=\"mx-panel\"><b>Контроль готовности разделов I–V</b><p class=\"mx-muted\">Проверка по серверной базе. Неполные разделы помечаются отдельно. Это контроль полноты, не официальный файл.</p><button type=\"button\" id=\"mxv2-report-readiness-check\">Проверить все пять разделов</button><div id=\"mxv2-report-readiness-result\" role=\"status\" class=\"mx-scroll\"></div></div>\n<div class=\"mx-panel\" id=\"mxv2-pp2116-navigator\">\n<b>Структура отчётности по ПП РФ № 2116</b>\n<p class=\"mx-muted\">Каждый раздел — отдельная проверка. Ни один неполный раздел не помечается готовым автоматически.</p>\n<div class=\"mx-grid\" style=\"grid-template-columns:repeat(auto-fit,minmax(170px,1fr))\">\n<button type=\"button\" data-mxr-report-section=\"I\"><b>Раздел I</b><br>Организация</button>\n<button type=\"button\" data-mxr-report-section=\"II\"><b>Раздел II</b><br>Утилизация и доли</button>\n<button type=\"button\" data-mxr-report-section=\"III\"><b>Раздел III</b><br>Договоры</button>\n<button type=\"button\" data-mxr-report-section=\"IV\"><b>Раздел IV</b><br>Поступления</button>\n<button type=\"button\" data-mxr-report-section=\"V\"><b>Раздел V</b><br>Энергоресурсы</button>\n</div>\n<div id=\"mxv2-pp2116-active-detail\" role=\"status\" class=\"mx-note\" style=\"margin-top:14px\">Выберите раздел или нажмите «Проверить все пять разделов».</div>\n<p class=\"mx-muted\">Акт утилизации (приказ Минприроды № 762) формируется отдельно и должен ссылаться на подтверждённую утилизацию; его показатели используются при заполнении применимых граф отчёта.</p>\n<button id=\"mxv2-reports-zip\" type=\"button\">Выгрузить разделы I–V одним ZIP (CSV + контроль)</button>\n<button id=\"mxv2-reports-draft\" type=\"button\">Выгрузить проверочный документ I–V (HTML)</button>\n<button id=\"mxv2-reports-export\" type=\"button\">Выгрузить исходный журнал CSV (не отчётность)</button>\n</div></section>\n\n</div><div class=\"mx-panel\" id=\"mxv2-session-actions\" hidden><span class=\"mx-muted\">Закрытая тестовая среда. Не загружайте реальные персональные данные и договоры.</span> <button type=\"button\" id=\"mxv2-logout\">Выйти из кабинета</button></div><div class=\"mxv2-status\" role=\"status\" id=\"mxv2-status\"></div><p class=\"mx-note\">Тестовый режим · Данные сохраняются на сервере PostgreSQL. Список последних 500 операций; сводные показатели рассчитаны сервером по всем записям. Расшифровка ограничена последними 500 операциями. Баланс отходов по отдельным кодам и остаткам будет доступен после введения прослеживаемости потоков. Показанные агрегаты не являются подтверждением выполнения нормативов РОП.</p></div>\n";

(function(){
const root=document.getElementById("mirlex-rop-test-v2-isolated");if(!root||root.dataset.bound==="1")return;
try{
const $=s=>root.querySelector(s), $$=s=>[...root.querySelectorAll(s)];
const URL="https://mirlex-core-migration-test.onrender.com";
let token="",org="",items=[],lastTotals=[];
const label={receipt:"Получено отходов",utilization:"Утилизировано",production:"Произведено продукции"};
const status=s=>{$("#mxv2-status").textContent=s};
const mass=n=>Number(n).toLocaleString("ru-RU",{maximumFractionDigits:6});
const neat=n=>n==null||n===""?"—":Number(n).toLocaleString("ru-RU",{maximumFractionDigits:6});
let configLines=[],capacityData=null;
let editingLineId="";
let materialCatalog=[];
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
async function request(path,body){const ctrl=new AbortController(),timeout=setTimeout(()=>ctrl.abort(),90000);try{const r=await fetch(URL+path,{method:body?"POST":"GET",signal:ctrl.signal,headers:{"Authorization":"Bearer "+token,...(body?{"Content-Type":"application/json"}:{})},...(body?{body:JSON.stringify(body)}:{})});const j=await r.json();if(!r.ok)throw Error(j.error||"Ошибка сервера: "+r.status);return j}catch(e){if(e.name==="AbortError")throw Error("Сервер не ответил за 90 секунд. Проверьте подключение и повторите вход.");throw e}finally{clearTimeout(timeout)}}
const loginField=$("#mxv2-token"),loginForm=$("#mxv2-login-form");
loginField.addEventListener("keydown",event=>{
 if(event.key!=="Enter"||event.isComposing||event.repeat)return;
 event.preventDefault();
 if(!$("#mxv2-connect").disabled)loginForm.requestSubmit();
});
$("#mxv2-login-form").addEventListener("submit",async(event)=>{
 event.preventDefault();
 const button=$("#mxv2-connect");
 if(button.disabled)return;
 const v=$("#mxv2-token").value.trim();
 if(!v){status("Введите тестовый ключ MIRLEX.");return}
 token=v;button.disabled=true;button.textContent="Подключение…";
 status("Соединяемся с тестовым сервером. После простоя Render может запускаться около минуты.");
 try{
  const j=await request("/api/test/organizations");
  const allowed=j.organizations||[];
  $("#mxv2-org").innerHTML=allowed.map(o=>'<option value="'+esc(o.id)+'">'+esc(o.name)+'</option>').join("");
  org=allowed[0]?.id||"";
  if(!org)throw Error("Нет доступных предприятий");
  $("#mxv2-org").disabled=true;
  $("#mxv2-login").hidden=true;
  $("#mxv2-content").hidden=false;$("#mxv2-session-actions").hidden=false;
  $("#mxv2-security").textContent="TEST · авторизован";
  $("#mxv2-token").value="";
  status("Вход выполнен. Загружаем журнал и профиль…");
  Promise.allSettled([load(),loadProfile(),loadRecyclerConfig(),loadCapacityOverview(),loadMaterialCatalog()]).then(responses=>{
   if(!token||!org)return;
   const failures=responses.filter(x=>x.status==="rejected");
   status(failures.length?"Кабинет открыт. Ошибка загрузки данных: "+failures.map(x=>x.reason?.message||"ошибка запроса").join("; "):"Кабинет готов к работе.");
  });
 }catch(e){
  token="";org="";
  $("#mxv2-security").textContent="Нет подключения";
  status("Не удалось войти: "+(e.message||"Ошибка соединения"));
 }finally{
  button.disabled=false;button.textContent="Открыть кабинет";
 }
});
async function load(){if(!org)return;const j=await request("/api/test/events/"+encodeURIComponent(org));items=j.items;lastTotals=j.totals||[];render();const acts=$("#mxv2-act-event");if(acts)acts.innerHTML='<option value="">Выберите операцию</option>'+items.filter(x=>x.kind==="utilization").map(x=>'<option value="'+esc(x.id)+'">'+esc(x.occurred_on+" · "+x.material_name+" · "+x.mass_kg+" кг")+"</option>").join("");prefillShare();status("Данные получены с сервера")}

let showArchivedCatalog=false,importCandidates=[];
const ropWasteExact2026=new Set(["36121101313", "36121121313", "36122201313", "40214001624", "40233231614", "40235157514", "40414000515", "40414111524", "40512101205", "40512201605", "40512202605", "40512203605", "40512211605", "40512311605", "40513001205", "40513111205", "40513112204", "40513115204", "40518101605", "40518201605", "40518301605", "40518401605", "40518911605", "40522211605", "40523111604", "40540101205", "40540201205", "40540301205", "40581101605", "40581191604", "40611001313", "40612001313", "40613001313", "40614001313", "40615001313", "40616601313", "40616811313", "40617001313", "40617511313", "40618001313", "40618511314", "40619001313", "40619121303", "40619123323", "40631001313", "40631101323", "40641001393", "40641111333", "40641511393", "40699611303", "43411001205", "43411002295", "43411003515", "43411004515", "43411111514", "43412002295", "43412003515", "43412004515", "43412101514", "43412311514", "43412511524", "43412611294", "43413511204", "43414101205", "43414102515", "43414103515", "43414104514", "43414201515", "43414211524", "43416101515", "43417101205", "43418101515", "43418102295", "43418111514", "43418121514", "43418211514", "43419902205", "43419931524", "43419971524", "43419972505", "43419975524", "43499111204", "43499121725", "43499133725", "43510001204", "43510002294", "43510003514", "43599121204", "43599131724", "43599132724", "43614111524", "43812289514", "43813711514", "43813811514", "43831266514", "43832311514", "43832911524", "43894111524", "43896111514", "43896171514", "43896172514", "45110100205", "46220004295", "46220005515", "46220501205", "46812113514", "46812121513", "46812131514", "46812133514", "46812135514", "46812141513", "46812142514", "46812151504", "46812161514", "46812211504", "46821212514", "46821213524", "46821215514", "47110101521", "47110211523", "47131111491", "47199111521", "47230101312", "47230201312", "48111911724", "48112111524", "48112191524", "48113111524", "48220101532", "48220111532", "48220121532", "48220131532", "48220145532", "48220151532", "48221102532", "48221111532", "48221121532", "48221211532", "48223111522", "48241100525", "48241121523", "48241311523", "48242101523", "48242102525", "48242711524", "48242721524", "48242811524", "48452111524", "48455311524", "49211181524", "74111001724", "74111311725", "74111341724", "74111411724", "74111412294", "74111421724", "74111432514", "74111511205", "74111611724", "74111721514", "74131411724", "74135121704", "74135721704", "82799001724", "89003121724", "92011001532", "92011002523", "92012001532", "92012002523", "92013001532", "92013002523", "92130101524", "92130201523", "92130301523", "92191091514", "92222102524", "92222105523", "92222107523", "92311111524", "92312201513", "92312301513", "92312311523", "92440101524", "92440201523", "92440301523"]);
const ropWastePrefixes2026=new Set(["4021", "40211", "40212", "40213", "40219", "4022", "4023", "4051", "405129", "405212", "405213", "405216", "405301", "405302", "4055", "40581", "4059", "405918", "40592", "405991", "40632", "40635", "413", "431", "433", "43414", "43415", "43416", "43417", "43418", "43419", "4342", "43421", "43422", "43423", "43424", "43425", "43426", "43427", "43429", "4349", "435", "43599", "436", "43811", "43812", "43817", "43818", "43819", "4383", "4389", "4511", "4518", "4519", "46811", "468211", "4732", "47323", "4812", "4813", "4814", "4815", "4817", "4818", "4825", "48271", "482721", "482812", "482813", "482821", "482822", "482823", "482911", "482919", "74116", "8271", "8272", "9211"]);
function wasteMatchesRop2026(value){
 const code=String(value??"").replace(/\s/g,"");
 return /^\d{11}$/.test(code)&&(ropWasteExact2026.has(code)||[...ropWastePrefixes2026].some(prefix=>code.startsWith(prefix)));
}
function ropWasteBadge(item){
 if(item.kind!=="waste_fkko")return "";
 return '<small class="mx-muted" style="display:block;margin-top:4px">'+(wasteMatchesRop2026(item.code)?"Код найден в перечне № 2394 (2026)":"Нет совпадения с перечнем РОП № 2394 (2026)")+'</small>';
}
async function loadMaterialCatalog(){
 if(!token||!org)return;
 const data=await request("/api/test/material-catalog");
 materialCatalog=data.items||[];
 const kindName={waste_fkko:"Отход",secondary_okpd2:"Вторсырьё",product_okpd2:"Продукция"};
 const visible=materialCatalog.filter(x=>!!x.archived===showArchivedCatalog);
 const table=visible.length?'<table><thead><tr><th>Тип</th><th>Код</th><th>Наименование</th><th>Документ</th><th>РОП</th><th>Действие</th></tr></thead><tbody>'+
 visible.map(x=>'<tr><td>'+esc(kindName[x.kind]||x.kind)+'</td><td>'+esc(x.code)+'</td><td>'+esc(x.name)+ropWasteBadge(x)+'</td><td>'+esc(x.standard_document||"—")+'</td><td>'+
 (x.kind==="waste_fkko"?'<input type="checkbox" aria-label="Учитывать в РОП" data-rop-catalog="'+esc(x.id)+'" '+(x.include_in_rop?'checked':'')+' '+(x.archived?'disabled':'')+'/>':'—')+
 '</td><td><button type="button" data-archive-catalog="'+esc(x.id)+'">'+(x.archived?'Восстановить':'Удалить')+'</button></td></tr>').join("")+'</tbody></table>':'<p class="mx-muted">В этом разделе записей нет.</p>';
 $("#mxv2-catalog-list").innerHTML='<div class="mx-row" style="flex-wrap:wrap;gap:12px"><button type="button" id="mxv2-catalog-active" '+(!showArchivedCatalog?'disabled':'')+'>Активные ('+materialCatalog.filter(x=>!x.archived).length+')</button><button type="button" id="mxv2-catalog-trash" '+(showArchivedCatalog?'disabled':'')+'>Корзина ('+materialCatalog.filter(x=>x.archived).length+')</button></div>'+table;
 $("#mxv2-catalog-active").addEventListener("click",()=>{showArchivedCatalog=false;loadMaterialCatalog()});
 $("#mxv2-catalog-trash").addEventListener("click",()=>{showArchivedCatalog=true;loadMaterialCatalog()});
 $("#mxv2-catalog-list").querySelectorAll("[data-rop-catalog]").forEach(input=>input.addEventListener("change",async()=>{
  const chosen=input.checked;input.disabled=true;
  try{await request("/api/test/material-catalog/rop-choice",{id:input.dataset.ropCatalog,include_in_rop:chosen});await loadMaterialCatalog();$("#mxv2-catalog-status").textContent="Выбор РОП сохранён."}
  catch(err){input.checked=!chosen;$("#mxv2-catalog-status").textContent=err.message}finally{input.disabled=false}
 }));
 $("#mxv2-catalog-list").querySelectorAll("[data-archive-catalog]").forEach(btn=>btn.addEventListener("click",async()=>{
  const item=materialCatalog.find(x=>x.id===btn.dataset.archiveCatalog);if(!item)return;
  if(!item.archived&&!window.confirm("Переместить запись в корзину? Учетные операции сохранятся."))return;
  btn.disabled=true;
  try{await request("/api/test/material-catalog/archive",{id:item.id,archived:!item.archived});await loadMaterialCatalog();$("#mxv2-catalog-status").textContent=item.archived?"Запись восстановлена.":"Запись перемещена в корзину."}
  catch(err){$("#mxv2-catalog-status").textContent=err.message}finally{btn.disabled=false}
 }));
}
function fileToBase64(file){
 return new Promise((resolve,reject)=>{
  const reader=new FileReader();
  reader.onerror=()=>reject(Error("Ошибка чтения файла"));
  reader.onload=()=>resolve(String(reader.result).split(",")[1]||"");
  reader.readAsDataURL(file);
 });
}
function updateXlsxMappingUI(){
 const kind=$("#mxv2-xlsx-kind input:checked").value,oneC=$("#mxv2-xlsx-layout").value==="one_c";
 $("#mxv2-xlsx-code-label").textContent=kind==="waste_fkko"?"Столбец с кодом ФККО":"Столбец с кодом ОКПД 2";
 $("#mxv2-xlsx-name-label").textContent=kind==="waste_fkko"?"Столбец с названием отхода":kind==="secondary_okpd2"?"Столбец с названием вторсырья":"Столбец с названием продукции";
 $("#mxv2-xlsx-doc-group").hidden=kind==="waste_fkko";
 if(kind==="waste_fkko"&&oneC){$("#mxv2-xlsx-codecol").value="E";$("#mxv2-xlsx-namecol").value="F";}
 else if(!oneC){$("#mxv2-xlsx-codecol").value="";$("#mxv2-xlsx-namecol").value="";}
 $("#mxv2-xlsx-status").textContent=oneC&&kind!=="waste_fkko"?"Шаблон E/F относится к ФККО из примера 1С. Для ОКПД 2 укажите столбцы своего файла.":"";
 $("#mxv2-xlsx-preview").replaceChildren();
}
$("#mxv2-xlsx-kind").addEventListener("change",()=>{const kind=$("#mxv2-xlsx-kind input:checked").value;if(kind!=="waste_fkko")$("#mxv2-xlsx-layout").value="manual";updateXlsxMappingUI();$("#mxv2-xlsx-preview").replaceChildren();$("#mxv2-xlsx-status").textContent="Проверьте Excel для выбранной категории.";});
$("#mxv2-xlsx-layout").addEventListener("change",updateXlsxMappingUI);
updateXlsxMappingUI();
$("#mxv2-xlsx-preview-button").addEventListener("click",async()=>{
 const file=$("#mxv2-catalog-xlsx").files[0],out=$("#mxv2-xlsx-status"),box=$("#mxv2-xlsx-preview");
 if(!file||!file.name.toLowerCase().endsWith(".xlsx")||file.size>7000000){out.textContent="Выберите файл .xlsx размером до 7 МБ.";return}
 const btn=$("#mxv2-xlsx-preview-button");btn.disabled=true;out.textContent="Чтение и проверка Excel…";box.replaceChildren();
 try{
  const codeCol=$("#mxv2-xlsx-codecol").value.trim().toUpperCase(),nameCol=$("#mxv2-xlsx-namecol").value.trim().toUpperCase();
  if((codeCol||nameCol)&&(!/^[A-Z]{1,3}$/.test(codeCol)||!/^[A-Z]{1,3}$/.test(nameCol))){out.textContent="Заполните оба столбца буквами (например A и B), либо очистите оба поля для автоматического определения.";$("#mxv2-xlsx-advanced").open=true;btn.disabled=false;return}
  const importKind=$("#mxv2-xlsx-kind input:checked").value;
  const base64=await fileToBase64(file);
  const data=await request("/api/test/catalog/xlsx-preview",{data_base64:base64,kind:importKind,
   code_column:$("#mxv2-xlsx-codecol").value.trim().toUpperCase(),
   sheet_index:Number($("#mxv2-xlsx-sheet").value),
   document_column:$("#mxv2-xlsx-documentcol").value.trim().toUpperCase(),
   name_column:$("#mxv2-xlsx-namecol").value.trim().toUpperCase()});
  if(importKind!==$("#mxv2-xlsx-kind input:checked").value)return;
  if(data.needs_mapping){out.textContent=data.message||"Уточните лист и столбцы для распознавания.";$("#mxv2-xlsx-advanced").open=true;$("#mxv2-xlsx-preview").replaceChildren();return}
  importCandidates=data.distinct||[];
  out.textContent="Определены столбцы "+data.code_column+" (код) и "+data.name_column+" (название). Строк проверено: "+data.rows_seen+". Найдено различных кодов: "+importCandidates.length+". "+(importKind==="waste_fkko"?"Проверка отходов по БДО (не полный ФККО).":"Коды ОКПД 2 пока не сверяются с официальным справочником.")+" Выберите виды для добавления.";
  box.innerHTML='<div class="mx-row"><button type="button" id="mxv2-import-mark-all">Выбрать все</button><button type="button" id="mxv2-import-unmark">Снять выбор</button><button type="button" id="mxv2-import-save">Сохранить выбранные</button></div>'+
   '<table><thead><tr><th>Добавить</th><th>Код</th><th>Наименование</th><th>Строк</th><th>Документ</th><th>Проверка</th></tr></thead><tbody>'+
   importCandidates.map((x,i)=>'<tr><td><input type="checkbox" data-import-add="'+i+'" '+(x.matched_bdo||importKind!=='waste_fkko'?'checked':'disabled')+'/></td><td>'+esc(x.code)+'</td><td>'+esc(x.name)+'</td><td>'+x.count+'</td><td>'+esc(x.standard_document||'—')+'</td><td>'+(importKind==='waste_fkko'?(x.matched_bdo?'✓ Совпало с БДО':'Нет совпадения в БДО'):'Не сверено с ОКПД 2')+'</td></tr>').join("")+'</tbody></table>';
  box.querySelector("#mxv2-import-mark-all").addEventListener("click",()=>box.querySelectorAll("[data-import-add]:not(:disabled)").forEach(x=>x.checked=true));
  box.querySelector("#mxv2-import-unmark").addEventListener("click",()=>box.querySelectorAll("[data-import-add]").forEach(x=>x.checked=false));
  box.querySelector("#mxv2-import-save").addEventListener("click",async()=>{
   const selected=importCandidates.filter((x,i)=>box.querySelector('[data-import-add="'+i+'"]')?.checked);
   if(!selected.length){out.textContent="Выберите позиции для добавления.";return}
   const items=selected.map(x=>({code:x.code,name:x.name,standard_document:x.standard_document||"",include_in_rop:false}));
   if(!window.confirm("Сохранить "+items.length+" записей в справочник организации?"))return;
   const save=box.querySelector("#mxv2-import-save");save.disabled=true;
   try{const result=await request("/api/test/catalog/bulk-save",{organization_id:org,kind:importKind,items});out.textContent="Добавлено: "+result.created+". Уже были в справочнике: "+result.already_existed+". Выбор РОП настраивается галочками в справочнике ниже.";showArchivedCatalog=false;await loadMaterialCatalog();}
   catch(err){out.textContent="Ошибка сохранения: "+err.message}
   finally{save.disabled=false}
  });
 }catch(err){out.textContent="Excel не обработан: "+err.message}finally{btn.disabled=false}
});
let catalogChosen=null,catalogTimer=null,catalogSequence=0;
const catalogForm=$("#mxv2-catalog-form"),catalogCode=catalogForm.elements.code,catalogName=catalogForm.elements.name;
const catalogSearch=$("#mxv2-catalog-search"),catalogResults=$("#mxv2-catalog-search-results");
function catalogKindUI(){
 ++catalogSequence;clearTimeout(catalogTimer);
 const kind=$("#mxv2-catalog-kind input:checked").value;
 const waste=kind==="waste_fkko";
 const material=kind==="secondary_okpd2"?"вторичного сырья":"продукции";
 $("#mxv2-manual-code-label").textContent=waste?"Код ФККО":"Код ОКПД 2 "+material;
 $("#mxv2-manual-name-label").textContent=waste?"Наименование отхода":"Наименование "+material;
 $("#mxv2-manual-doc-label").textContent="Документ на "+(kind==="secondary_okpd2"?"вторичное сырьё":"продукцию")+" (ТУ, ГОСТ и др.)";
 catalogForm.elements.standard_document.value="";
 $("#mxv2-catalog-status").textContent="";
 $("#mxv2-catalog-source").textContent=waste?"Источник поиска: ФККО / БДО":"Ручной ввод ОКПД 2. Сверка по ПП № 2394 пока недоступна.";
 $("#mxv2-catalog-standard").hidden=waste;
 $("#mxv2-catalog-fkko-lookup").hidden=!waste;
 catalogCode.readOnly=waste;
 catalogCode.placeholder=waste?"Выберите отход из результатов поиска":"Код ОКПД 2";
 catalogName.readOnly=waste;
 catalogName.placeholder=waste?"Выберите отход — название появится автоматически":"Наименование "+material+" по документу";
 catalogChosen=null;catalogCode.value="";catalogName.value="";catalogSearch.value="";
 catalogResults.textContent="Введите минимум 2 символа для поиска по БДО.";
}
async function searchCatalogWaste(q){
 const seq=++catalogSequence;
 try{
  const data=await request("/api/test/catalog/bdo?q="+encodeURIComponent(q));
  if(seq!==catalogSequence)return;
  catalogResults.replaceChildren();
  if(!data.items?.length){catalogResults.textContent="В доступной БДО не найдено. Этот справочник не является полным ФККО.";return}
  const info=document.createElement("p");info.className="mx-muted";info.textContent="Совпадений в БДО: "+data.total_matches+". Выберите точную запись:";catalogResults.append(info);
  const list=document.createElement("div");list.style.cssText="max-height:210px;overflow:auto;border:1px solid #d9e3e5;border-radius:8px";
  data.items.forEach(x=>{
    const btn=document.createElement("button");btn.type="button";btn.style.cssText="display:block;width:100%;text-align:left;border-radius:0;white-space:normal";
    btn.textContent=x.code+" — "+x.name;
    btn.addEventListener("click",()=>{catalogChosen={code:x.code,name:x.name};catalogCode.value=x.code;catalogName.value=x.name;catalogSearch.value=x.code+" — "+x.name;catalogResults.textContent="✓ Код и наименование совпадают с записью БДО. Применимость к РОП по ПП № 2394 проверяется отдельно.";});
    list.append(btn);
  });catalogResults.append(list);
 }catch(err){if(seq===catalogSequence)catalogResults.textContent="Поиск не выполнен: "+err.message}
}
catalogSearch.addEventListener("input",()=>{
 clearTimeout(catalogTimer);catalogSequence++;catalogChosen=null;catalogCode.value="";catalogName.value="";
 const q=catalogSearch.value.trim();if(q.length<2){catalogResults.textContent="Введите минимум 2 символа.";return}
 catalogTimer=setTimeout(()=>searchCatalogWaste(q),250);
});
$("#mxv2-catalog-kind").addEventListener("change",catalogKindUI);catalogKindUI();
$("#mxv2-catalog-form").addEventListener("submit",async e=>{
 e.preventDefault();if(!token||!org)return;
 const form=e.currentTarget,button=form.querySelector('[type="submit"]');
 const body=Object.fromEntries(new FormData(form).entries());
 if(body.kind==="waste_fkko")delete body.standard_document;
 body.organization_id=org;
 if(body.kind==="waste_fkko"&&(!catalogChosen||catalogChosen.code!==body.code||catalogChosen.name!==body.name)){$("#mxv2-catalog-status").textContent="Выберите отход из результатов поиска БДО.";return}
 button.disabled=true;
 try{await request("/api/test/material-catalog",body);form.reset();catalogKindUI();await loadMaterialCatalog();$("#mxv2-catalog-status").textContent="Запись сохранена в PostgreSQL."}
 catch(err){$("#mxv2-catalog-status").textContent="Ошибка: "+err.message}
 finally{button.disabled=false}
});
async function loadRecyclerConfig(){
 if(!org)return;
 const requestedToken=token,requestedOrg=org;
 const data=await request("/api/test/recycler-config");
 if(token!==requestedToken||org!==requestedOrg)return;
 const sites=data.sites||[];configLines=data.lines||[];
 const lines=configLines.filter(line=>!line.archived_at);recalcCapacity();
 const allocationLine=$("#mxv2-allocated-line");
 if(allocationLine){
   const prior=allocationLine.value;
   allocationLine.innerHTML='<option value="">Выберите линию</option>'+lines.map(x=>'<option value="'+esc(x.id)+'">'+esc(x.name)+'</option>').join("");
   if(lines.some(x=>x.id===prior))allocationLine.value=prior;
   else if(lines.length===1)allocationLine.value=lines[0].id;
 }
 const lineSelect=$("#mxv2-operation-line"),chosen=lineSelect.value;
 lineSelect.innerHTML='<option value="">Выберите линию</option>'+lines.map(x=>'<option value="'+esc(x.id)+'">'+esc(x.name)+'</option>').join("");
 if(lines.some(x=>x.id===chosen))lineSelect.value=chosen;else if(lines.length===1)lineSelect.value=lines[0].id;
 prefillShare();
 const escapeHtml=esc;
 $("#mxv2-site-list").innerHTML=sites.length?'<table><thead><tr><th>Объект</th><th>Адрес</th><th>Часовой пояс</th></tr></thead><tbody>'+sites.map(x=>'<tr><td>'+escapeHtml(x.name)+'</td><td>'+escapeHtml(x.address)+'</td><td>'+escapeHtml(x.timezone)+'</td></tr>').join("")+'</tbody></table>':'<p class="mx-muted">Объектов пока нет</p>';
 const select=$("#mxv2-line-site"),previousSite=select.value;
 select.innerHTML='<option value="">Выберите объект</option>'+sites.map(x=>'<option value="'+escapeHtml(x.id)+'">'+escapeHtml(x.name)+'</option>').join("");
 if(sites.some(site=>site.id===previousSite))select.value=previousSite;
 $("#mxv2-line-list").innerHTML=lines.length?'<table><thead><tr><th>Объект</th><th>Оборудование / линия</th><th>Мощность, т/год</th><th>Производительность, т/ч</th><th>Основание</th><th>Действие</th></tr></thead><tbody>'+lines.map(x=>'<tr><td>'+escapeHtml(sites.find(a=>a.id===x.site_id)?.name||x.site_id)+'</td><td>'+escapeHtml(x.name)+'</td><td>'+escapeHtml(neat(x.annual_t))+'</td><td>'+escapeHtml(neat(x.hourly_t))+'</td><td>'+escapeHtml(x.source)+'</td><td><button type="button" data-edit-line="'+escapeHtml(x.id)+'">Редактировать</button> <button type="button" data-archive-line="'+escapeHtml(x.id)+'">Удалить</button></td></tr>').join("")+'</tbody></table>':'<p class="mx-muted">Оборудования пока нет</p>';
}
function validPositive(s,zeroOk=false){const value=String(s||"").trim().replace(",",".");if(!/^\d+(\.\d{1,6})?$/.test(value))return null;const n=Number(value);return Number.isFinite(n)&&(zeroOk?n>=0:n>0)?n:null}
async function loadCapacityOverview(){
 if(!org)return;
 const activeToken=token,activeOrg=org;
 const data=await request("/api/test/capacity-overview");
 if(token!==activeToken||org!==activeOrg)return;
 capacityData=data;recalcCapacity();
}
function recalcCapacity(){
 const box=$("#mxv2-cap-result");
 if(!capacityData){box.textContent="Загрузка результатов из журнала PostgreSQL…";return}
 const lines=(capacityData.lines||[]).filter(line=>configLines.some(item=>item.id===line.id&&!item.archived_at));
 if(!lines.length){box.textContent="Нет технологических линий. Заполните оборудование во вкладке «Организация».";return}
 const y=Number(capacityData.year),asOf=capacityData.as_of;
 const missing=Number(capacityData.unlinked_utilization_count||0);
 const rows=lines.map(line=>{
 const usedKg=line.days.reduce((n,x)=>n+Number(x.mass_kg),0),usedT=usedKg/1000;
 const annual=Number(line.annual_t),remain=annual-usedT;
 const percent=annual>0?Math.round(usedT/annual*10000)/100:0;
 return '<tr><td><button type="button" data-cap-line="'+esc(line.id)+'">'+esc(line.name)+' →</button></td><td>'+esc(neat(annual))+'</td><td>'+esc(neat(usedT))+'</td><td>'+esc(neat(remain))+'</td><td>'+esc(neat(percent))+'%</td><td>'+(remain<0?'Превышение — требуется проверка':'—')+'</td></tr>';
 }).join("");
 box.innerHTML='<p class="mx-muted">Отчётный год: '+y+'.</p>'+
 '<div class="mx-scroll"><table><thead><tr><th>Линия</th><th>Мощность, т/год</th><th>Факт, т</th><th>Не использовано, т</th><th>Загрузка</th><th>Контроль</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
 (missing?'<p class="mx-muted">Внимание: '+missing+' операций утилизации за год ещё не привязаны к линии. Данные по линиям неполные; для них требуется восстановление исходных сведений.</p>':'')+
 '<div id="mxv2-cap-drilldown"></div>';
 box.querySelectorAll("[data-cap-line]").forEach(btn=>btn.addEventListener("click",()=>{
  const line=lines.find(x=>x.id===btn.dataset.capLine);if(!line)return;
  let cumulative=0;
  const byDay=new Map(line.days.map(x=>[x.date,Number(x.mass_kg)/1000]));
  const from=new Date(Date.UTC(y,0,1)),until=new Date(asOf+"T00:00:00Z");
  const dayRows=[],daysWithOperations=[];
  for(let t=from.getTime();t<=until.getTime();t+=86400000){
    const date=new Date(t).toISOString().slice(0,10),val=byDay.get(date)||0;cumulative+=val;
    const row='<tr><td><button type="button" data-cap-date="'+esc(date)+'">'+esc(formatShownDate(date))+' →</button></td><td>'+esc(neat(val))+'</td><td>'+esc(neat(cumulative))+'</td><td>'+esc(neat(Number(line.annual_t)-cumulative))+'</td></tr>';
    dayRows.push(row);if(byDay.has(date))daysWithOperations.push(row);
  }
  const dayTable=rows=>'<div class="mx-scroll"><table><thead><tr><th>Дата</th><th>Утилизировано, т</th><th>Накопительно, т</th><th>Остаток, т</th></tr></thead><tbody>'+rows.join("")+'</tbody></table></div>';
  $("#mxv2-cap-drilldown").innerHTML='<p><b>'+esc(line.name)+' · '+y+'</b></p>'+
   (daysWithOperations.length?dayTable(daysWithOperations):'<p class="mx-muted">Операций за год пока нет.</p>')+
   '<details><summary>Показать все календарные дни</summary>'+dayTable(dayRows)+'</details><div id="mxv2-cap-source-rows" class="mx-scroll"></div>';
  $("#mxv2-cap-drilldown").querySelectorAll("[data-cap-date]").forEach(dayBtn=>dayBtn.addEventListener("click",async()=>{
   const output=$("#mxv2-cap-source-rows");output.textContent="Загрузка первичных записей…";
   try{
    const data=await request("/api/test/capacity-day-details?"+new URLSearchParams({line_id:line.id,date:dayBtn.dataset.capDate}));
    const rows=data.rows||[];
    output.innerHTML='<p><b>Операции за '+esc(formatShownDate(data.date))+'</b></p>'+(rows.length?
       '<table><thead><tr><th>Код</th><th>Материал</th><th>Масса, кг</th><th>Документ</th><th>Продукция</th><th>Доля, %</th></tr></thead><tbody>'+
       rows.map(x=>'<tr><td>'+esc(x.material_code)+'</td><td>'+esc(x.material_name)+'</td><td>'+esc(neat(x.mass_kg))+'</td><td>'+esc(x.document_number||"Не указан")+'</td><td>'+esc(x.product_name)+'</td><td>'+esc(x.share_percent==null?"—":neat(x.share_percent)+"%")+'</td></tr>').join('')+'</tbody></table>':'<p class="mx-muted">В этот день операций не было.</p>')+
       (data.truncated?'<p class="mx-muted">Показаны первые 500 операций; итоговая масса рассчитана по всей базе.</p>':'');
   }catch(err){output.textContent="Не удалось получить документы: "+err.message}
  }));

 }));
}
function positiveCapacity(v){const x=String(v).trim().replace(",",".");if(!/^\d+(\.\d{1,6})?$/.test(x)||Number(x)<=0||Number(x)>1e9)throw Error("Мощность должна быть положительным числом");return x}
$("#mxv2-site-form").addEventListener("submit",async e=>{
 e.preventDefault();if(!token||!org)return;const form=e.currentTarget;const button=form.querySelector('[type="submit"]');button.disabled=true;
 const f=new FormData(form),body=Object.fromEntries(f.entries());body.organization_id=org;
 try{await request("/api/test/recycler-sites",body);form.reset();await loadRecyclerConfig();$("#mxv2-site-status").textContent="Объект сохранён в PostgreSQL"}
 catch(err){$("#mxv2-site-status").textContent="Ошибка: "+err.message}finally{button.disabled=false}
});
const lineForm=$("#mxv2-line-form");
const energyField=lineForm.elements.energy_specific_kwh_per_t;
const meterField=lineForm.elements.electricity_meter_number;
for(const [field,allowed] of [[energyField,/^[0-9]*([.,][0-9]{0,6})?$/],[meterField,/^[0-9]*$/]]){
 let previous="";
 field.addEventListener("focus",()=>{previous=field.value});
 field.addEventListener("input",()=>{
  if(allowed.test(field.value))previous=field.value;
  else field.value=previous;
 });
}
const lineSubmit=lineForm.querySelector('[type="submit"]');
const lineCancel=$("#mxv2-line-cancel");
function resetLineForm(){
 editingLineId="";
 lineForm.reset();
 lineSubmit.textContent="Добавить оборудование";
 lineCancel.hidden=true;
 $("#mxv2-line-status").textContent="";
}
lineCancel.addEventListener("click",resetLineForm);
$("#mxv2-line-list").addEventListener("click",async e=>{
 const remove=e.target.closest("button[data-archive-line]");
 if(remove){
  if(!token||!org||lineSubmit.disabled||!confirm("Убрать оборудование из активного списка? История операций сохранится."))return;
  const activeToken=token,activeOrg=org,lineId=remove.dataset.archiveLine;
  lineSubmit.disabled=true;
  lineCancel.disabled=true;
  remove.disabled=true;
  try{
   await request("/api/test/recycler-lines/update",{organization_id:org,line_id:lineId,archive:true});
   if(token!==activeToken||org!==activeOrg)return;
   if(editingLineId===lineId)resetLineForm();
   configLines=configLines.map(line=>line.id===lineId?{...line,archived_at:true}:line);
   remove.closest("tr").remove();
   recalcCapacity();
   $("#mxv2-line-status").textContent="Оборудование удалено из активного списка";
   await loadRecyclerConfig();
  }catch(err){
   if(token===activeToken&&org===activeOrg)$("#mxv2-line-status").textContent=err.message;
  }finally{
   lineSubmit.disabled=false;
   lineCancel.disabled=false;
   remove.disabled=false;
  }
  return;
 }
 const button=e.target.closest("button[data-edit-line]");
 if(!button||!token||!org||lineSubmit.disabled)return;
 const line=configLines.find(item=>item.id===button.dataset.editLine);
 if(!line)return;
 editingLineId=line.id;
 for(const field of ["site_id","name","annual_t","hourly_t","source","energy_specific_kwh_per_t","electricity_meter_number","meter_verification_date"]){
  lineForm.elements[field].value=line[field]??"";
 }
 lineForm.elements.valid_from.value=formatShownDate(line.valid_from);
 lineSubmit.textContent="Сохранить изменения";
 lineCancel.hidden=false;
 $("#mxv2-line-status").textContent="";
 lineForm.elements.name.focus();
});
lineForm.addEventListener("submit",async e=>{
 e.preventDefault();
 if(!token||!org||lineSubmit.disabled)return;
 const activeToken=token,activeOrg=org,lineId=editingLineId;
 lineSubmit.disabled=true;
 lineCancel.disabled=true;
 try{const f=new FormData(lineForm),body=Object.fromEntries(f.entries());body.organization_id=org;body.annual_t=positiveCapacity(body.annual_t);
 if(body.hourly_t)body.hourly_t=positiveCapacity(body.hourly_t);else body.hourly_t=null;
 if(!body.site_id)throw Error("Выберите производственный объект");if(body.valid_from){const m=/^(\d{2})\.(\d{2})\.(\d{4})$/.exec(body.valid_from);if(!m)throw Error("Дата: ДД.ММ.ГГГГ");const d=new Date(Date.UTC(+m[3],+m[2]-1,+m[1]));if(d.getUTCFullYear()!==+m[3]||d.getUTCMonth()+1!==+m[2]||d.getUTCDate()!==+m[1])throw Error("Некорректная дата");body.valid_from=m[3]+"-"+m[2]+"-"+m[1];}
 if(body.energy_specific_kwh_per_t)body.energy_specific_kwh_per_t=positiveCapacity(body.energy_specific_kwh_per_t);
 if(body.electricity_meter_number&&!/^[0-9]+$/.test(body.electricity_meter_number))throw Error("Номер счётчика: укажите цифры");
 if(body.meter_verification_date&&body.meter_verification_date>new Date().toLocaleDateString("sv-SE"))throw Error("Дата поверки не может быть в будущем");
 if(lineId)body.line_id=lineId;
 await request(lineId?"/api/test/recycler-lines/update":"/api/test/recycler-lines",body);
 if(token!==activeToken||org!==activeOrg)return;
 resetLineForm();
 const message=lineId?"Изменения оборудования сохранены":"Оборудование сохранено в PostgreSQL";
 $("#mxv2-line-status").textContent=message;
 const refreshed=await Promise.allSettled([loadRecyclerConfig(),loadCapacityOverview()]);
 if(token===activeToken&&org===activeOrg&&refreshed.some(result=>result.status==="rejected")){
  $("#mxv2-line-status").textContent=message+". Для обновления данных войдите повторно.";
 }
 }catch(err){
  if(token===activeToken&&org===activeOrg)$("#mxv2-line-status").textContent="Ошибка: "+err.message;
 }finally{
  lineSubmit.disabled=false;
  lineCancel.disabled=false;
 }
});
async function loadProfile(){const j=await request("/api/test/recycler-profile");const p=j.profile||{};$("#mxv2-legal").value=p.legal_name||"";$("#mxv2-inn").value=p.inn||"";$("#mxv2-ogrn").value=p.ogrn||"";const form=$("#mxv2-profile-form");["registry_number","registry_as_of","registry_source_url"].forEach(k=>{form.elements[k].value=p[k]||""});const tz=form.elements.site_timezone;const savedZone=p.site_timezone||"Europe/Moscow";if(![...tz.options].some(o=>o.value===savedZone)){const opt=document.createElement("option");opt.value=savedZone;opt.textContent=savedZone+" (сохранённый)";tz.append(opt)}tz.value=savedZone;$("#mxv2-profile-status").textContent=p.profile_status?"Черновик сохранён на сервере":"Карточка ещё не заполнена";}
function formatShownDate(v){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v||""));return m?m[3]+"."+m[2]+"."+m[1]:String(v||"")}
function table(rows, actionsRight=false){const actions="<th>Действия</th>";return '<table><thead><tr>'+(actionsRight?"":actions)+'<th>Дата</th><th>Операция</th><th>Код</th><th>Материал</th><th>Масса, кг</th><th>Линия</th><th>Маршрут</th><th>Доля, %</th><th>Продукция</th><th>Контрагент</th><th>Документ</th>'+(actionsRight?actions:"")+'</tr></thead><tbody>'+rows.map(x=>{
 const line=configLines.find(a=>a.id===x.recycler_line_id);
 const button='<td><button type="button" data-delete-event="'+esc(x.id)+'">Удалить</button></td>';
 return '<tr>'+(actionsRight?"":button)+'<td>'+esc(formatShownDate(x.occurred_on))+'</td><td>'+esc(label[x.kind])+'</td><td>'+esc(x.material_code)+'</td><td>'+esc(x.material_name)+'</td><td>'+mass(x.mass_kg)+'</td><td>'+esc(line?.name|| (x.kind==="utilization"?"Не привязано":"—"))+'</td><td>'+esc(x.utilization_route==="raw_only"?"Отходы → вторсырьё":x.utilization_route==="direct_waste"?"Отходы → продукция":x.utilization_route==="secondary_raw"?"Вторсырьё → продукция":"—")+'</td><td>'+esc(x.waste_share_percent==null?"Не указана":neat(x.waste_share_percent)+"%")+'</td><td>'+esc(x.product_name||"—")+'</td><td>'+esc(x.counterparty)+'</td><td>'+esc(x.document_number)+'</td>'+(actionsRight?button:'')+'</tr>'}).join('')+'</tbody></table>'}
let currentOverviewKind="receipt";
function detail(kind){currentOverviewKind=kind;const rows=items.filter(x=>x.kind===kind);$("#mxv2-detail-title").textContent=label[kind]+": "+mass(lastTotals.filter(x=>x.kind===kind).reduce((s,x)=>s+Number(x.mass_kg),0))+" кг";$("#mxv2-breakdown").innerHTML=rows.length?table(rows,true):'<p class="mx-muted">Операций пока нет</p>'}
function render(){const stats=$("#mxv2-stats");stats.innerHTML=Object.keys(label).map(k=>'<button class="mx-stat" data-kind="'+k+'"><span>'+label[k]+'</span><span class="mx-number">'+mass(lastTotals.filter(x=>x.kind===k).reduce((s,x)=>s+Number(x.mass_kg),0))+'</span><span class="mx-muted">кг · посмотреть расчёт →</span></button>').join('')+'<div class="mx-panel" style="margin:0"><b>Записей</b><span class="mx-number">'+items.length+'</span><span class="mx-muted">в выбранном предприятии</span></div>';
stats.querySelectorAll('[data-kind]').forEach(b=>b.addEventListener("click",()=>detail(b.dataset.kind)));
$("#mxv2-history").innerHTML=items.length?table(items):'<p class="mx-muted">Записей ещё нет</p>';detail(currentOverviewKind)}
function exportCsv(){const rows=[["Дата","Операция","Код","Материал","Масса кг","Линия","Способ утилизации","Доля %","Код продукции","Наименование продукции","Контрагент","Документ"],...items.map(x=>[x.occurred_on,label[x.kind],x.material_code,x.material_name,x.mass_kg,configLines.find(l=>l.id===x.recycler_line_id)?.name||"",x.utilization_route||"",x.waste_share_percent||"",x.product_code||"",x.product_name||"",x.counterparty,x.document_number])];const csv="\uFEFF"+rows.map(r=>r.map(v=>'"'+String(v||"").replace(/"/g,'""')+'"').join(";")).join("\r\n");const a=document.createElement("a");a.href=URLcreate(csv);a.download="mirlex-rop-test.csv";a.click();setTimeout(()=>window.URL.revokeObjectURL(a.href),3000)}
function URLcreate(csv){return window.URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}))}



let bdoChosen=null, bdoSequence=0, bdoTimer=null;
const operationForm=$("#mxv2-form"),codeField=operationForm.elements.material_code,nameField=operationForm.elements.material_name;
const bdoSearch=$("#mxv2-fkko-query"),bdoOutput=$("#mxv2-fkko-results");
function bdoClear(){bdoChosen=null;codeField.value="";nameField.value="";}
function syncMaterialLabels(){
 const utilization=operationForm.elements.kind.value==="utilization";
 $("#mxv2-pp2116-fields").hidden=!utilization;
 $("#mxv2-operation-line").required=utilization;
 operationForm.elements.product_code.required=utilization;
 operationForm.elements.product_name.required=utilization;
 const secondary=utilization&&$("#mxv2-operation-route").value==="secondary_raw";
 const product=operationForm.elements.kind.value==="production";
 bdoSequence++;clearTimeout(bdoTimer);bdoChosen=null;codeField.value="";nameField.value="";bdoSearch.value="";
 $("#mxv2-code-label").textContent=product?"Код продукции по ОКПД 2":secondary?"Код вторичного сырья по ОКПД 2":"Код отхода по БДО / ФККО";
 $("#mxv2-name-label").textContent=product?"Наименование произведённой продукции":secondary?"Наименование вторичного сырья":"Наименование отхода по БДО";
 $("#mxv2-fkko-search").hidden=product||secondary;
 $("#mxv2-code-hint").textContent=product?"Укажите ОКПД 2. Проверка по ПП № 2394 ещё не подключена.":"Выберите запись из БДО. Этот справочник не охватывает весь ФККО.";
 codeField.placeholder=product||secondary?"Например, 23.62.10":"11-значный код отхода";
 nameField.placeholder=product||secondary?"Наименование по документу / ТУ":"Наименование из БДО";
 codeField.readOnly=!(product||secondary);nameField.readOnly=!(product||secondary);
 bdoOutput.textContent=product?"":"Введите не менее 2 символов для поиска по БДО.";
}
let shareLookupSeq=0;
function suggestNamesFromHistory(){
 const form=$("#mxv2-form"),code=form.elements.material_code.value.trim(),name=form.elements.material_name;
 const productCode=form.elements.product_code.value.trim(),productName=form.elements.product_name;
 const route=form.elements.utilization_route.value;
 if(code&&!name.value.trim()){
  const known=items.find(x=>x.material_code===code&&x.material_name&&
    (route!=="secondary_raw"||x.utilization_route==="secondary_raw"));
  if(known)name.value=known.material_name;
 }
 if(productCode&&!productName.value.trim()){
  const known=items.find(x=>x.product_code===productCode&&x.product_name);
  if(known)productName.value=known.product_name;
 }
}
operationForm.elements.product_code.addEventListener("change",suggestNamesFromHistory);
codeField.addEventListener("change",suggestNamesFromHistory);
function prefillShare(){
 const lookupId=++shareLookupSeq;
 const form=$("#mxv2-form"),line=form.elements.recycler_line_id.value;
 const code=form.elements.material_code.value.trim(),product=form.elements.product_code.value.trim();
 const route=form.elements.utilization_route.value,share=$("#mxv2-operation-share");
 const match=items.find(x=>x.kind==="utilization"&&x.recycler_line_id===line&&x.material_code===code&&x.product_code===product&&x.utilization_route===route&&x.waste_share_percent!==null&&x.waste_share_percent!==undefined);
 share.value=match?neat(match.waste_share_percent):"";
 $("#mxv2-share-hint").textContent=match?"Подставлена предыдущая доля "+neat(match.waste_share_percent)+"%. При необходимости измените только для этой операции.":"Если доля пока не подтверждена, поле можно оставить пустым.";
 if(!token||!org||!line||!code||!product||$("#mxv2-pp2116-fields").hidden)return;
 request("/api/test/share-default?"+new URLSearchParams({line_id:line,material_code:code,product_code:product,route})).then(data=>{
  if(lookupId!==shareLookupSeq)return;
  if(data.share_percent!==null){share.value=neat(data.share_percent);$("#mxv2-share-hint").textContent="Подставлена сохранённая в PostgreSQL доля "+neat(data.share_percent)+"%. Для этой операции можно изменить.";}
 }).catch(()=>{if(lookupId===shareLookupSeq)$("#mxv2-share-hint").textContent="Не удалось проверить сохранённую долю; проверьте вручную.";});
}
$("#mxv2-operation-line").addEventListener("change",prefillShare);
$("#mxv2-operation-route").addEventListener("change",()=>{syncMaterialLabels();prefillShare()});
operationForm.elements.product_code.addEventListener("change",()=>{suggestNamesFromHistory();prefillShare()});
operationForm.querySelectorAll('input[name="kind"]').forEach(field=>field.addEventListener("change",syncMaterialLabels));syncMaterialLabels();
function selectBdo(row){
 if(operationForm.elements.kind.value==="production"||$("#mxv2-operation-route").value==="secondary_raw")return;
 bdoChosen={code:row.code,name:row.name};codeField.value=row.code;nameField.value=row.name;
 bdoSearch.value=row.code+" — "+row.name;
 suggestNamesFromHistory();prefillShare();bdoOutput.textContent="Выбрана запись БДО: "+row.code+(row.hazard_class?" · класс "+row.hazard_class:"")+". Применимость по ПП № 2394 проверяется отдельно.";
}
async function queryBdo(value){
 const seq=++bdoSequence,q=value.trim();if(q.length<2)return;
 bdoOutput.textContent="Поиск по БДО…";
 try{
  const data=await request("/api/test/catalog/bdo?q="+encodeURIComponent(q));
  if(seq!==bdoSequence||operationForm.elements.kind.value==="production")return;
  bdoOutput.replaceChildren();
  const info=document.createElement("div");info.className="mx-muted";
  info.textContent="БДО: совпадений "+data.total_matches+" · показано "+data.items.length+" · каталог "+data.catalog_count+" позиций";
  bdoOutput.append(info);
  if(!data.items.length){const no=document.createElement("p");no.textContent="В БДО не найдено. Это не означает отсутствия в полном ФККО.";bdoOutput.append(no);return}
  const choices=document.createElement("div");choices.setAttribute("role","listbox");choices.style.cssText="max-height:280px;overflow:auto;border:1px solid #dce4e6;border-radius:9px;margin-top:8px";
  data.items.forEach(row=>{const btn=document.createElement("button");btn.type="button";btn.setAttribute("role","option");
   btn.style.cssText="display:block;width:100%;text-align:left;white-space:normal;border-radius:0;border:0;border-bottom:1px solid #e5ebed";
   btn.textContent=row.code+" — "+row.name+(row.hazard_class?" · класс "+row.hazard_class:"");
   btn.addEventListener("click",()=>selectBdo(row));choices.append(btn)});
  bdoOutput.append(choices);
 }catch(err){if(seq===bdoSequence)bdoOutput.textContent="Ошибка поиска: "+err.message}
}
bdoSearch.addEventListener("input",()=>{bdoClear();bdoSequence++;clearTimeout(bdoTimer);
 const q=bdoSearch.value.trim();if(q.length<2){bdoOutput.textContent="Введите не менее 2 символов.";return}
 bdoTimer=setTimeout(()=>queryBdo(q),220);
});
$$("[data-tab]").forEach(b=>b.addEventListener("click",()=>{$$("[data-tab]").forEach(t=>t.setAttribute("aria-selected",String(t===b)));$$("[data-section]").forEach(x=>x.hidden=x.dataset.section!==b.dataset.tab);if(token&&org){if(b.dataset.tab==="acts")loadIssuedActs();if(b.dataset.tab==="operations")loadContracts()}}));
const operationDate=$("#mxv2-operation-date"),operationCalendar=$("#mxv2-operation-calendar");
function parseOperationDate(raw){
 const value=String(raw||"").trim();
 const match=/^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
 if(!match)return null;
 const year=Number(match[3]),month=Number(match[2]),day=Number(match[1]);
 if(year<2000||year>9999||month<1||month>12||day<1||day>31)return null;
 const dt=new Date(Date.UTC(year,month-1,day));
 if(dt.getUTCFullYear()!==year||dt.getUTCMonth()!==month-1||dt.getUTCDate()!==day)return null;
 const iso=match[3]+"-"+match[2]+"-"+match[1];
 const today=new Date(),todayLocal=[today.getFullYear(),String(today.getMonth()+1).padStart(2,"0"),String(today.getDate()).padStart(2,"0")].join("-");
 return iso<=todayLocal?iso:null;
}
operationCalendar.addEventListener("change",()=>{if(!operationCalendar.value)return;const a=operationCalendar.value.split("-");operationDate.value=a[2]+"."+a[1]+"."+a[0];});
operationDate.addEventListener("change",()=>{const iso=parseOperationDate(operationDate.value);operationCalendar.value=iso||"";});



const contractStatus=v=>$("#mxv2-contract-status").textContent=v;
let receiptDates=new Map(),contractPeriods=new Map();
root.addEventListener("click",async event=>{
 const button=event.target.closest("button[data-delete-event],button[data-delete-counterparty],button[data-delete-contract]");
 if(!button||!token||!org)return;
 const isEvent=Boolean(button.dataset.deleteEvent);
 const recordId=button.dataset.deleteEvent||button.dataset.deleteCounterparty||button.dataset.deleteContract;
 if(!window.confirm(isEvent?"Удалить запись из журнала?":button.dataset.deleteContract?"Удалить договор?":"Удалить контрагента?"))return;
 button.parentElement.querySelector("[data-delete-status]")?.remove();
 const output=document.createElement("span");
 output.dataset.deleteStatus="";
 output.style.display="block";
 output.setAttribute("role","status");
 button.after(output);
 button.disabled=true;
 try{
  await request("/api/test/rop-contracts",{organization_id:org,action:isEvent?"delete_event":button.dataset.deleteContract?"delete_contract":"delete_counterparty",id:recordId});
  output.textContent="Удалено.";
  try{
   if(isEvent){await load();await loadCapacityOverview();}
   else await loadContracts();
  }catch{output.textContent="Удалено. Обнови страницу, чтобы увидеть изменения.";}
 }catch(err){output.textContent=err.message==="Unsupported action"?"Обновление сервера ещё недоступно.":err.message;}
 finally{button.disabled=false;}
});
async function loadContracts(){
 if(!token||!org)return;
 try{
  const [data,receipts]=await Promise.all([
   request("/api/test/rop-contracts"),request("/api/test/utilization/available-receipts").catch(()=>({receipts:[],unavailable:true}))
  ]);
  const cps=data.counterparties||[],contracts=data.contracts||[],receiptRows=receipts.receipts||[];
  const selector=$("#mxv2-contract-cp"),link=$("#mxv2-contract-link"),receipt=$("#mxv2-contract-receipt");
  const previous=[selector,link,receipt].map(field=>field.value);
  selector.innerHTML='<option value="">Выберите</option>'+cps.map(x=>'<option value="'+esc(x.id)+'">'+esc(x.name)+' · '+esc(x.inn)+'</option>').join("");
  link.innerHTML='<option value="">Выберите</option>'+contracts.map(x=>'<option value="'+esc(x.id)+'">'+esc(x.number)+' · '+esc(x.valid_from)+'–'+esc(x.valid_to||"без даты")+'</option>').join("");
  receipt.innerHTML='<option value="">Выберите</option>'+receiptRows.map(x=>'<option value="'+esc(x.id)+'">'+esc(x.date)+' · '+esc(x.counterparty)+' · '+esc(x.code)+' · '+esc(x.received_kg)+' кг</option>').join("");
  [selector,link,receipt].forEach((field,i)=>{
   if([...field.options].some(option=>option.value===previous[i]))field.value=previous[i];
  });
  receiptDates=new Map(receiptRows.map(row=>[row.id,row.date]));
  contractPeriods=new Map(contracts.map(row=>[row.id,row]));
  $("#mxv2-cp-table").innerHTML=cps.length?cps.map(row=>'<div class="mx-counterparty-row"><span><b>'+esc(row.name)+'</b><br><small>ИНН '+esc(row.inn||"не указан")+'</small></span><button type="button" data-delete-counterparty="'+esc(row.id)+'">Удалить</button></div>').join(""):"<p class=\"mx-muted\">Контрагентов пока нет.</p>";
  $("#mxv2-contract-receipts-table").innerHTML=receiptRows.length?'<table><thead><tr><th>Дата</th><th>Отправитель</th><th>Отход</th><th>Документ</th><th>Масса, кг</th></tr></thead><tbody>'+receiptRows.map(row=>'<tr><td>'+esc(formatShownDate(row.date))+'</td><td>'+esc(row.counterparty)+'</td><td>'+esc(row.code+" · "+(row.name||""))+'</td><td>'+esc(row.document||"—")+'</td><td>'+esc(row.received_kg)+'</td></tr>').join("")+'</tbody></table>':"Доступных поступлений пока нет.";
  $("#mxv2-contract-table").innerHTML=contracts.length?'<table><thead><tr><th>Номер</th><th>Контрагент</th><th>Подписан</th><th>Период</th><th>Расторгнут</th><th>Действия</th></tr></thead><tbody>'+
   contracts.map(x=>'<tr><td>'+esc(x.number)+'</td><td>'+esc(cps.find(y=>y.id===x.counterparty_id)?.name||"—")+'</td><td>'+esc(x.signed_on)+'</td><td>'+esc(x.valid_from)+' — '+esc(x.valid_to||"Не установлен")+'</td><td>'+esc(x.terminated_on||"Нет")+'</td><td><button type="button" data-delete-contract="'+esc(x.id)+'">Удалить</button></td></tr>').join("")+'</tbody></table>':'<p class="mx-muted">Договоров пока нет.</p>';
  contractStatus("Обновлено · контрагентов: "+cps.length+" · договоров: "+contracts.length+" · "+(receipts.unavailable?"поступления не загрузились":"поступлений: "+receiptRows.length));
 }catch(e){contractStatus("Реестр недоступен: "+e.message)}
}
$("#mxv2-contract-refresh").onclick=loadContracts;
const innField=$("#mxv2-cp-inn");
innField.addEventListener("input",()=>{innField.value=innField.value.replace(/[^0-9]/g,"");});
$("#mxv2-cp-save").onclick=async()=>{
 const name=$("#mxv2-cp-name").value.trim(),inn=innField.value.trim(),kind=$("#mxv2-cp-type").value;
 if((kind==="legal"&&!/^[0-9]{10}$/.test(inn))||(kind==="entrepreneur"&&!/^[0-9]{12}$/.test(inn))||(kind==="person"&&inn&&!/^[0-9]{12}$/.test(inn))){
  contractStatus(kind==="legal"&&inn.length===12?"Для 12-значного ИНН выбери «ИП» или «Физическое лицо» в поле «Тип».":"Проверь ИНН: "+(kind==="legal"?"для юрлица нужно 10 цифр.":"нужно 12 цифр."));innField.focus();return;
 }
 if(!name){contractStatus("Укажите наименование контрагента");return}
 try{await request("/api/test/rop-contracts",{organization_id:org,action:"counterparty",name,inn,type:$("#mxv2-cp-type").value});await loadContracts();contractStatus("Контрагент сохранён")}
 catch(e){contractStatus(e.message==="Forbidden"?"Для сохранения нужны права администратора организации.":e.message==="Contract save unavailable"?"Сервер не сохранил контрагента.":e.message)}
};
$("#mxv2-contract-save").onclick=async()=>{
 const val=id=>$("#"+id).value;
 if(!val("mxv2-contract-cp")||!val("mxv2-contract-number")||!val("mxv2-contract-signed")||!val("mxv2-contract-from")){
  contractStatus("Заполните контрагента, номер и даты договора");return
 }
 try{await request("/api/test/rop-contracts",{
  organization_id:org,action:"contract",counterparty_id:val("mxv2-contract-cp"),
  number:val("mxv2-contract-number"),signed_on:val("mxv2-contract-signed"),
  valid_from:val("mxv2-contract-from"),valid_to:val("mxv2-contract-to")||null,
  terminated_on:val("mxv2-contract-terminated")||null
 });await loadContracts();contractStatus("Договор сохранён")}
 catch(e){contractStatus(e.message)}
};
const linkStatus=message=>$("#mxv2-contract-link-status").textContent=message;
$("#mxv2-contract-link-save").onclick=async e=>{
 const receipt_id=$("#mxv2-contract-receipt").value,contract_id=$("#mxv2-contract-link").value;
 if(!receipt_id||!contract_id){linkStatus("Выбери поступление и договор");return}
 const date=receiptDates.get(receipt_id), period=contractPeriods.get(contract_id);
 if(date&&period&&(date<period.valid_from||(period.valid_to&&date>period.valid_to)||(period.terminated_on&&date>period.terminated_on))){
  linkStatus("Поступление от "+formatShownDate(date)+" вне срока договора. Выбери договор, действовавший на дату поступления, или сверь даты с документами.");return;
 }
 const button=e.currentTarget;button.disabled=true;linkStatus("Связываем договор и поступление…");
 try{await request("/api/test/rop-contracts",{
  organization_id:org,action:"link_receipt",receipt_id,contract_id
 });linkStatus("Поступление связано с договором")}
 catch(e){linkStatus(e.message==="Receipt date is outside contract effective period"?"Дата поступления вне срока договора. Сверь даты с документами.":e.message==="Receipt already linked; change requires explicit revision"?"Поступление уже связано с договором.":e.message)}
 finally{button.disabled=false;}
};

let availableReceipts=[];
const allocatedStatus=v=>$("#mxv2-allocated-status").textContent=v;
const allocatedSaveStatus=v=>$("#mxv2-allocated-save-status").textContent=v;
const availableBox=$("#mxv2-allocated-list");
async function showAvailable(){
 allocatedStatus("Получаем остатки поступлений…");
 try{
  const data=await request("/api/test/utilization/available-receipts");
  availableReceipts=(data.receipts||[]).filter(x=>Number(x.available_kg)>0);
  $("#mxv2-allocated-fields").hidden=true;
  availableBox.replaceChildren();
  if(!availableReceipts.length){
   allocatedStatus((data.receipts||[]).length?"По загруженным поступлениям свободного остатка нет.":"Поступлений пока нет. Сохрани поступление вручную или через Excel, затем снова покажи партии.");
   return;
  }
  const choices=[...new Set(availableReceipts.map(x=>x.code))];
  availableBox.innerHTML='<div class="mx-row"><label>ФККО для утилизации<select id="mxv2-allocated-code">'+choices.map(x=>'<option value="'+esc(x)+'">'+esc(x)+'</option>').join("")+'</select></label></div><div id="mxv2-allocated-rows"></div>';
  const select=availableBox.querySelector("#mxv2-allocated-code");
  function draw(){
   const rows=availableReceipts.filter(x=>x.code===select.value);
   availableBox.querySelector("#mxv2-allocated-rows").innerHTML=
   '<div class="mx-row"><button type="button" data-alloc-all>Выбрать все</button><button type="button" data-alloc-none>Снять весь выбор</button></div><table><thead><tr><th>Выбрать</th><th>Дата</th><th>Контрагент</th><th>Документ</th><th>Доступно, кг</th><th>Утилизировать, кг</th></tr></thead><tbody>'+
   rows.map(x=>'<tr><td><input type="checkbox" aria-label="Выбрать партию для утилизации" data-alloc-id="'+esc(x.id)+'" '+(x.ready_for_report?"":"disabled")+'/></td><td>'+esc(x.date)+'</td><td>'+esc(x.counterparty||"Требует уточнения")+'</td><td>'+esc(x.document||"Требует уточнения")+'</td><td>'+esc(x.available_kg)+'</td><td><input inputmode="decimal" data-alloc-mass="'+esc(x.id)+'" value="'+esc(x.available_kg)+'" aria-label="Масса утилизации, кг"/></td></tr>').join("")+'</tbody></table>';
  }
  select.addEventListener("change",()=>{$("#mxv2-allocated-fields").hidden=true;draw();allocatedStatus("2. Отметь партии выбранного отхода.");});draw();
  allocatedStatus("Поступлений с остатками: "+availableReceipts.length+(data.truncated?". Показаны не все записи; нужна дополнительная выборка.":""));
 }catch(e){allocatedStatus("Не удалось загрузить партии: "+e.message)}
}
availableBox.addEventListener("click",event=>{
 const button=event.target.closest("[data-alloc-all],[data-alloc-none]");
 if(!button)return;
 const boxes=[...availableBox.querySelectorAll("[data-alloc-id]:not(:disabled)")];
 boxes.forEach(box=>box.checked=button.hasAttribute("data-alloc-all"));
 if(boxes.length)boxes[0].dispatchEvent(new Event("change",{bubbles:true}));
});
availableBox.addEventListener("change",event=>{
 if(!event.target.matches("[data-alloc-id],[data-alloc-mass]"))return;
 const count=availableBox.querySelectorAll("[data-alloc-id]:checked").length;
 $("#mxv2-allocated-fields").hidden=count===0;
 allocatedStatus(count?"Выбрано партий: "+count+". Проверь массу в колонке «Утилизировать, кг». Ниже укажи дату, линию и результаты.":"2. Отметь партии выбранного отхода.");
});
$("#mxv2-allocated-refresh").onclick=showAvailable;
const outputsBox=$("#mxv2-allocated-outputs");
$("#mxv2-allocated-add-output").onclick=()=>{
 const block=document.createElement("div");block.className="mxv2-form";block.style="border:1px solid #dce4e6;padding:12px;margin:9px 0;border-radius:10px";
 block.innerHTML='<div><label>Результат<select data-out-kind><option value="secondary_raw">Вторсырьё</option><option value="product">Продукция</option><option value="residue">Остаток</option></select></label></div>'+
 '<div><label>Откуда взялась масса<select data-out-method><option value="actual">Фактическая масса</option><option value="passport">Расчёт по паспорту</option><option value="technology">Технологический норматив</option><option value="mixed">Факт и расчёт вместе</option></select></label><small class="mx-muted">Факт — по взвешиванию. Паспорт или норматив — расчётный выход.</small></div>'+
 '<div><label>Код ОКПД 2 (при наличии)<input data-out-code maxlength="40"/></label></div>'+
 '<div><label>Наименование результата<input data-out-name maxlength="200"/></label></div>'+
 '<div><label>Паспортная / нормативная доля, %<input data-out-percent inputmode="decimal" placeholder="Только для расчётного метода"/></label></div>'+
 '<div><label>Фактическая масса, кг<input data-out-actual inputmode="decimal"/></label></div>'+
 '<div><label>Расчётная масса, кг<input data-out-projected inputmode="decimal"/></label></div>'+
 '<div><label>Подтверждающий документ / источник<input data-out-evidence maxlength="500"/></label></div>'+
 '<div><button type="button" data-out-remove>Убрать строку</button></div>';
 block.querySelector("[data-out-remove]").onclick=()=>block.remove();
 outputsBox.append(block);
};
const outputColumns=["Результат","Метод","Код","Наименование","Расчётная доля, %","Факт, кг","Расчёт, кг","Основание"];
const outputKinds=new Map([["вторсырьё","secondary_raw"],["продукция","product"],["остаток","residue"]]);
const outputMethods=new Map([["факт","actual"],["паспорт","passport"],["технологический норматив","technology"],["комбинированный","mixed"]]);
let outputReader;
function getOutputReader(){
 if(!outputReader)outputReader=new Promise((resolve,reject)=>{
  const script=document.createElement("script");
  script.src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js";
  script.onload=()=>window.XLSX?.read?resolve(window.XLSX):reject(Error("Чтение Excel недоступно"));
  script.onerror=()=>{script.remove();reject(Error("Не удалось загрузить модуль Excel"))};
  document.head.append(script);
 }).catch(err=>{outputReader=null;throw err});
 return outputReader;
}
function parseOutputRows(rows){
 const header=(rows[0]||[]).map(cell=>String(cell??"").trim());
 const indexes=outputColumns.map(column=>header.indexOf(column));
 if(indexes.some((i,j)=>i<0||i!==header.lastIndexOf(outputColumns[j])))throw Error("Используй заголовки из шаблона Excel");
 const result=[];
 rows.slice(1).forEach((row,i)=>{
  if(!row.some(value=>String(value??"").trim()))return;
  const [type,source,code,name,percent,actual,projected,evidence]=indexes.map(index=>String(row[index]??"").trim());
  const kind=outputKinds.get(type.toLowerCase().replace("сырье","сырьё")),method=outputMethods.get(source.toLowerCase());
  const number=(value,places)=>!value||new RegExp("^\\d+(?:[.,]\\d{1,"+places+"})?$").test(value);
  if(!kind||!method||!name||name.length>200||code.length>40||!evidence||evidence.length>500||
    !number(percent,4)||!number(actual,6)||!number(projected,6)||Number(percent.replace(",","."))>100||
    (method==="actual"&&!actual)||(["passport","technology"].includes(method)&&!percent&&!projected)||
    (method==="mixed"&&(!actual||!projected))||(percent&&!["passport","technology"].includes(method))){
   throw Error("Строка "+(i+2)+": проверь тип, метод, массы и основание");
  }
  result.push({kind,method,code,name,percent,actual,projected,evidence});
 });
 if(!result.length||result.length>100)throw Error("В файле должно быть от 1 до 100 результатов");
 return result;
}
$("#mxv2-output-template").onclick=async e=>{
 const button=e.currentTarget, status=$("#mxv2-output-import-status");
 button.disabled=true;
 try{
  const xlsx=await getOutputReader(), book=xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(book,xlsx.utils.aoa_to_sheet([outputColumns]),"Результаты");
  xlsx.utils.book_append_sheet(book,xlsx.utils.aoa_to_sheet([["Результат","Метод"],["Вторсырьё","Факт"],["Продукция","Паспорт"],["Остаток","Технологический норматив"],["","Комбинированный"]]),"Допустимые значения");
  xlsx.writeFile(book,"MIRLEX_Результаты_операции.xlsx");
 }catch(err){status.textContent=err.message}finally{button.disabled=false}
};
$("#mxv2-output-import").onclick=async e=>{
 const button=e.currentTarget, input=$("#mxv2-output-xlsx"), status=$("#mxv2-output-import-status");
 const file=input.files[0];
 if(!file||!file.name.toLowerCase().endsWith(".xlsx")||file.size>2000000){status.textContent="Выбери файл .xlsx до 2 МБ";return}
 button.disabled=true;
 try{
  const xlsx=await getOutputReader(), book=xlsx.read(await file.arrayBuffer(),{sheetRows:102});
  const sheet=book.Sheets[book.SheetNames[0]];
  if(!sheet)throw Error("Первый лист пуст");
  if(sheet["!fullref"]&&xlsx.utils.decode_range(sheet["!fullref"]).e.r>=101)throw Error("Файл превышает лимит 100 строк результатов");
  const results=parseOutputRows(xlsx.utils.sheet_to_json(sheet,{header:1,raw:false,defval:"",blankrows:true}));
  if(input.files[0]!==file)return;
  for(const row of results){
   $("#mxv2-allocated-add-output").click();
   const block=outputsBox.lastElementChild;
   for(const [key,value] of Object.entries(row))block.querySelector("[data-out-"+key+"]").value=value;
  }
  input.value="";
  status.textContent="Добавлено строк: "+results.length+". Проверь их перед сохранением операции.";
 }catch(err){status.textContent=err.message}finally{button.disabled=false}
};
const allocatedRoute=$("#mxv2-allocated-route");
function syncAllocatedRoute(){
 for(const id of ["mxv2-allocated-product-code","mxv2-allocated-product-name"]){
  const field=$("#"+id);
  field.disabled=allocatedRoute.value==="raw_only";
  field.closest("label").parentElement.hidden=field.disabled;
 }
}
allocatedRoute.addEventListener("change",syncAllocatedRoute);
syncAllocatedRoute();
$("#mxv2-allocated-save").onclick=async()=>{
 const select=availableBox.querySelector("#mxv2-allocated-code");
 if(!select){allocatedSaveStatus("Сначала загрузите остатки");return}
 const allocations=[...availableBox.querySelectorAll("[data-alloc-id]:checked")].map(x=>({
  receipt_id:x.dataset.allocId,
  mass_kg:availableBox.querySelector('[data-alloc-mass="'+x.dataset.allocId+'"]').value.trim().replace(",",".")
 }));
 if(!allocations.length){allocatedSaveStatus("Отметьте поступления галочками");return}
 const selected=availableReceipts.filter(x=>allocations.some(a=>a.receipt_id===x.id));
 if(selected.some(x=>!x.ready_for_report)){allocatedSaveStatus("Для выбранных поступлений отсутствует отправитель или документ. Сначала уточните данные.");return}
 for(const a of allocations){
  const receipt=selected.find(x=>x.id===a.receipt_id);
  if(!/^\d+(\.\d{1,6})?$/.test(a.mass_kg)||Number(a.mass_kg)<=0||Number(a.mass_kg)>Number(receipt.available_kg)){
   allocatedSaveStatus("Проверьте массу каждой выбранной партии");return
  }
 }
 const day=parseOperationDate($("#mxv2-allocated-date").value);
 if(!day){allocatedSaveStatus("Проверьте дату фактической утилизации");return}
 const line=$("#mxv2-allocated-line").value;
 const pc=$("#mxv2-allocated-product-code").value.trim(),pn=$("#mxv2-allocated-product-name").value.trim();
 const rawOnly=allocatedRoute.value==="raw_only";
 if(!line||(!rawOnly&&(!pc||!pn))){allocatedSaveStatus(rawOnly?"Выбери технологическую линию":"Выбери линию и укажи продукцию");return}
 const inputMass=allocations.reduce((sum,x)=>sum+Number(x.mass_kg),0);
 for(const block of outputsBox.children){
  const percentInput=block.querySelector("[data-out-percent]");
  const method=block.querySelector("[data-out-method]").value;
  if(method==="passport"||method==="technology"){
   const p=percentInput.value.trim().replace(",",".");
   if(p!==""&&(!/^\d+(\.\d{1,4})?$/.test(p)||Number(p)>100)){
    allocatedSaveStatus("Проверьте расчётную долю: число от 0 до 100");return
   }
   if(p!==""){
    const calculated=(inputMass*Number(p)/100).toFixed(6);
    block.querySelector("[data-out-projected]").value=calculated;
   }else if(!block.querySelector("[data-out-projected]").value.trim()){
    allocatedSaveStatus("Для расчётного метода укажите процент или расчётную массу результата");return;
   }
  }
 }
 const outputs=[...outputsBox.children].map(x=>({
  kind:x.querySelector("[data-out-kind]").value,method:x.querySelector("[data-out-method]").value,
  code:x.querySelector("[data-out-code]").value.trim(),name:x.querySelector("[data-out-name]").value.trim(),
  actual_kg:x.querySelector("[data-out-actual]").value.trim().replace(",","."),
  projected_kg:x.querySelector("[data-out-projected]").value.trim().replace(",","."),
  evidence:x.querySelector("[data-out-evidence]").value.trim()
 }));
 if(!outputs.length){allocatedSaveStatus("Добавь полученное сырьё или продукцию");return}
 if(rawOnly&&(!outputs.some(row=>row.kind==="secondary_raw")||outputs.some(row=>row.kind==="product"))){
  allocatedSaveStatus("Добавь вторсырьё. Для этого маршрута строки продукции нужно убрать.");return;
 }
 const btn=$("#mxv2-allocated-save");btn.disabled=true;
 try{
  const result=await request("/api/test/utilization/allocate",{
   organization_id:org,operation_id:crypto.randomUUID(),occurred_on:day,
   recycler_line_id:line,utilization_route:$("#mxv2-allocated-route").value,
   material_code:select.value,material_name:selected[0]?.name||select.value,
   product_code:pc,product_name:pn,allocations,outputs
  });
  allocatedSaveStatus("Утилизация: "+result.allocated_kg+" кг исходных отходов; выходы: "+result.output_mass_kg+" кг ("+result.outputs_count+" видов). Баланс: "+result.mass_balance_difference_kg+" кг."+(result.requires_added_materials_review?" Выход превышает массу отходов — проверьте добавленные материалы и основание расчёта.":"")+" Для отчётности нужны подтверждённые сведения.");
  await showAvailable();await load();
  allocatedStatus("Операция сохранена. Остатки обновлены.");
 }catch(e){allocatedSaveStatus(e.message)}finally{btn.disabled=false}
};

async function loadIssuedActs(){
 const box=$("#mxv2-acts-table");
 try{
  const d=await request("/api/test/utilization/acts");
  box.textContent=(d.acts||[]).map(x=>x.date+" № "+x.number+" · "+x.reserved_kg+" кг · "+x.status).join("\n")||"Актов нет";
 }catch(e){box.textContent=e.message}
}
$("#mxv2-act-save-draft").onclick=async()=>{
 const box=$("#mxv2-act-save-status"),event_id=$("#mxv2-act-event").value;
 const number=$("#mxv2-act-number").value.trim(),date=$("#mxv2-act-date").value;
 const mass=$("#mxv2-act-mass").value.trim().replace(",",".");
 if(!event_id||!number||!date||!/^\d+(\.\d{1,6})?$/.test(mass)||Number(mass)<=0){box.textContent="Выбери операцию выше. Заполни номер, дату акта и массу в кг больше нуля";return}
 const btn=$("#mxv2-act-save-draft");btn.disabled=true;
 try{
  const data=await request("/api/test/utilization/act-draft-save",{
   organization_id:org,number,date,counterparty:$("#mxv2-act-customer").value.trim(),
   contract_reference:$("#mxv2-act-contract-ref").value.trim(),events:[{event_id,mass_kg:mass}]
  });
  box.textContent="Черновик сохранён, зарезервировано "+data.allocated_kg+" кг. Акт ещё не подписан и в отчёт не включён.";
  await loadIssuedActs();
 }catch(e){box.textContent=e.message}finally{btn.disabled=false}
};
$("#mxv2-act-docx").onclick=async()=>{
 const id=$("#mxv2-act-event").value;
 if(!id){$("#mxv2-act-draft-result").textContent="Сначала выберите операцию утилизации";return}
 const button=$("#mxv2-act-docx");button.disabled=true;
 try{
  const response=await fetch(URL+"/api/test/utilization/act-draft-docx?"+new URLSearchParams({event_id:id}),{
   headers:{"Authorization":"Bearer "+token}
  });
  if(!response.ok){const info=await response.json().catch(()=>({}));throw Error(info.error||"Ошибка выгрузки Word: "+response.status)}
  const blob=await response.blob();
  const uri=globalThis.URL.createObjectURL(blob);
  const link=document.createElement("a");link.href=uri;link.download="MIRLEX_Act_762_UNSIGNED_DRAFT.docx";
  document.body.append(link);link.click();link.remove();setTimeout(()=>globalThis.URL.revokeObjectURL(uri),1000);
  $("#mxv2-act-draft-result").textContent="Скачан неподписанный черновик. Проверьте реквизиты и подтверждающие документы перед оформлением.";
 }catch(e){$("#mxv2-act-draft-result").textContent=e.message}
 finally{button.disabled=false}
};
$("#mxv2-reports-zip").onclick=async()=>{
 const year=Number($("#mxv2-reports-year").value),quarter=Number($("#mxv2-reports-quarter").value);
 const output=$("#mxv2-pp2116-active-detail");
 if(!org||!token){output.textContent="Сначала войдите в кабинет";return}
 if(!Number.isInteger(year)||year<2024||year>2100||![1,2,3,4].includes(quarter)){
  output.textContent="Проверьте год и квартал";return
 }
 const button=$("#mxv2-reports-zip");button.disabled=true;
 try{
  const query=new URLSearchParams({year:String(year),quarter:String(quarter)});
  const response=await fetch(URL+"/api/test/report-pp2116-all-sections-zip?"+query,{
   headers:{"Authorization":"Bearer "+token}
  });
  if(!response.ok){const x=await response.json().catch(()=>({}));throw Error(x.error||"Ошибка выгрузки: "+response.status)}
  const blob=await response.blob(),url=globalThis.URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download="MIRLEX_PP2116_I-V_REVIEW.zip";
  document.body.append(a);a.click();a.remove();setTimeout(()=>globalThis.URL.revokeObjectURL(url),1000);
  output.textContent="Выгружены разделы I–V, файл CHECKS.csv и инструкция. Недостающие сведения не заменяются нулями. Это проверочный архив, не файл подачи.";
 }catch(err){output.textContent=err.message}
 finally{button.disabled=false}
};
$("#mxv2-ii-csv-download").onclick=async()=>{
 const year=Number($("#mxv2-reports-year").value),quarter=Number($("#mxv2-reports-quarter").value);
 if(!Number.isInteger(year)||year<2024||year>2100||![1,2,3,4].includes(quarter)){
  $("#mxv2-ii-evidence").textContent="Выберите корректный год и квартал";return;
 }
 const btn=$("#mxv2-ii-csv-download");btn.disabled=true;
 try{
  const query=new URLSearchParams({year:String(year),quarter:String(quarter)});
  const response=await fetch(URL+"/api/test/report-pp2116-section-ii-csv?"+query,{
   headers:{"Authorization":"Bearer "+token}
  });
  if(!response.ok){const v=await response.json().catch(()=>({}));throw Error(v.error||"Ошибка CSV "+response.status)}
  const blob=await response.blob(),uri=globalThis.URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=uri;a.download="MIRLEX_PP2116_II_REVIEW.csv";
  document.body.append(a);a.click();a.remove();setTimeout(()=>globalThis.URL.revokeObjectURL(uri),1000);
  $("#mxv2-ii-evidence").textContent="Проверочный CSV раздела II выгружен. Пустые графы и список недостающих сведений требуют проверки; файл не предназначен для подачи.";
 }catch(err){$("#mxv2-ii-evidence").textContent=err.message}
 finally{btn.disabled=false}
};
$("#mxv2-act-check").onclick=async()=>{
 const id=$("#mxv2-act-event").value,box=$("#mxv2-act-draft-result");
 if(!id){box.textContent="Выберите операцию утилизации";return}
 box.textContent="Получаем данные…";
 try{
  const d=await request("/api/test/utilization/act-preview?"+new URLSearchParams({event_id:id}));
  const list=(d.outputs||[]).map(x=>"<tr><td>"+esc(x.kind)+"</td><td>"+esc(x.name)+"</td><td>"+esc(x.actual_kg||"Нет факта")+"</td><td>"+esc(x.projected_kg||"—")+"</td></tr>").join("");
  box.innerHTML="<p><b>Исходный отход:</b> "+esc(d.waste.name)+"; "+esc(d.waste.mass_kg)+" кг</p>"+
   "<p><b>Продукция:</b> "+esc(d.product.name||"—")+"</p>"+
   "<table><thead><tr><th>Вид</th><th>Наименование</th><th>Факт, кг</th><th>Расчёт, кг</th></tr></thead><tbody>"+list+"</tbody></table>"+
   "<p><b>Контроль формы № 762:</b> "+(d.form_762_validation?.complete_for_draft?"Реквизиты заполнены":"Нужны уточнения: "+(d.form_762_validation?.missing?.length||0))+"</p>"+
   "<p><b>Отсутствующие поля формы:</b> "+esc((d.form_762_validation?.missing||[]).join("; ")||"Нет")+"</p>"+
   "<p><b>Подтверждающие документы:</b> "+esc(d.missing.join("; "))+"</p>"+
   "<p>Нельзя выдавать как оформленный акт № 762 или включать в отчёт без подтверждения.</p>";
 }catch(e){box.textContent=e.message}
};
let receiptPreview=[];
const receiptMsg=msg=>{ $("#mxv2-receipts-status").textContent=msg; $("#mxv2-receipts-bottom-status").textContent=msg; };
const receiptBox=$("#mxv2-receipts-preview");
$("#mxv2-receipts-file").addEventListener("change",()=>{
 receiptPreview=[];receiptBox.replaceChildren();$("#mxv2-receipts-save").hidden=true;$("#mxv2-receipts-mass-confirm-panel").hidden=true;$("#mxv2-receipts-mass-confirm").checked=false;
 receiptMsg("Файл выбран. Нажмите «Проверить Excel».");
});
$("#mxv2-receipts-check").addEventListener("click",async()=>{
 if(!org||!token){receiptMsg("Сначала войдите в кабинет");return}
 const file=$("#mxv2-receipts-file").files[0];
 if(!file){receiptMsg("Выберите Excel");return}
 if(file.size>7000000){receiptMsg("Максимальный размер файла — 7 МБ");return}
 const button=$("#mxv2-receipts-check");button.disabled=true;
 receiptMsg("Распознавание строк Excel…");receiptBox.replaceChildren();$("#mxv2-receipts-save").hidden=true;
 try{
  const fields=["occurred_on","material_code","material_name","mass_kg","counterparty","document_number"];
  const cols={};
  for(const field of fields){const col=$("#mxv2-receipts-col-"+field).value.trim().toUpperCase();if(col)cols[field]=col}
  const data=await request("/api/test/receipts/xlsx-preview",{
   data_base64:await fileToBase64(file),sheet_index:Number($("#mxv2-receipts-sheet").value)||0,columns:cols
  });
  if(data.needs_mapping){receiptMsg(data.message||"Укажите столбцы вручную");$("#mxv2-receipts-mapping").open=true;return}
  receiptPreview=data.rows||[];
  const massCol=data.columns?.mass_kg || "не определён";
  const massTotal=receiptPreview.reduce((sum,r)=>sum+(r.data&&Number.isFinite(Number(r.data.mass_kg))?Number(r.data.mass_kg):0),0);
  $("#mxv2-receipts-mass-confirm-panel").hidden=false;
  $("#mxv2-receipts-mass-confirm").checked=false;
  $("#mxv2-receipts-mass-source").textContent="MIRLEX определил столбец "+massCol+" как массу поступления, кг. Сумма распознанных строк: "+massTotal.toLocaleString("ru-RU",{maximumFractionDigits:6})+" кг. Сверьте с Excel. Если это другой вес, укажите правильный столбец и нажмите «Проверить Excel» повторно.";
  $("#mxv2-receipts-change-mass").onclick=()=>{
    $("#mxv2-receipts-mapping").open=true;
    $("#mxv2-receipts-col-mass_kg").focus();
    receiptMsg("Введите букву правильного столбца «Масса в кг» и повторно нажмите «Проверить Excel».");
  };
  receiptMsg("Проверено: "+receiptPreview.length+". Распознано: "+data.valid+
    ". Ошибок распознавания: "+data.invalid+". Неполные строки остаются на проверке. Лист: "+data.sheet+".");
  if(!receiptPreview.length)return;
  const toolbar=document.createElement("div");toolbar.className="mx-row";
  const all=document.createElement("button");all.type="button";all.textContent="Выбрать все допустимые";
  const none=document.createElement("button");none.type="button";none.textContent="Снять выбор";
  const counter=document.createElement("span");counter.className="mx-muted";toolbar.append(all,none,counter);
  const table=document.createElement("table");
  table.innerHTML="<thead><tr><th>Выбор</th><th>Строка Excel</th><th>Дата</th><th>ФККО</th><th>Наименование отхода</th><th>Масса, кг</th><th>Отправитель</th><th>Документ</th><th>Проверка</th></tr></thead><tbody></tbody>";
  const body=table.querySelector("tbody");
  let page=0;const perPage=100;
  const pages=document.createElement("div");pages.className="mx-row";
  const prev=document.createElement("button");prev.type="button";prev.textContent="Предыдущие 100";
  const next=document.createElement("button");next.type="button";next.textContent="Следующие 100";
  const pageLabel=document.createElement("span");pageLabel.className="mx-muted";
  pages.append(prev,pageLabel,next);
  const receiptReady=r=>Boolean(r.data && r.data.occurred_on && r.data.counterparty && r.data.document_number && !(r.missing||[]).length && (r.data.code_verification!=="requires_fkko_check" || r.data.fkko_manual_confirmed===true));
  const receiptFieldLabels={occurred_on:"дата поступления",counterparty:"отправитель отходов",document_number:"номер документа",material_code:"код ФККО",material_name:"наименование отхода",mass_kg:"масса в кг"};
  const receiptEditable={occurred_on:"Дата поступления (ДД.ММ.ГГГГ)",counterparty:"Отправитель отходов",document_number:"Номер документа"};
  const selected=new Set(receiptPreview.map((r,i)=>receiptReady(r)?i:null).filter(i=>i!==null));
  function receiptCheckMessage(row){
   if(row.error)return row.error;
   if(receiptReady(row))return "Готово к выбору";
   const missing=(row.missing||[]).map(key=>receiptFieldLabels[key]||"реквизиты строки");
   const reasons=[];
   if(missing.length)reasons.push("Не заполнено: "+missing.join(", ")+".");
   if((row.missing||[]).includes("counterparty"))reasons.push("Впиши, кто передал отходы, как указано в накладной или акте приёма.");
   if(row.data?.code_verification==="requires_fkko_check"&&!row.data.fkko_manual_confirmed)reasons.push("Сверь ФККО и название, затем отметь подтверждение.");
   return reasons.join(" ")||"Проверь данные строки.";
  }
  $("#mxv2-receipts-complete").onclick=()=>{
   const dateValue=$("#mxv2-receipts-common-date").value.trim();
   const dateIso=dateValue?parseOperationDate(dateValue):null;
   if(dateValue&&!dateIso){receiptMsg("Проверьте фактическую дату поступления");return}
   const cp=$("#mxv2-receipts-common-cp").value.trim(),doc=$("#mxv2-receipts-common-doc").value.trim();
   if(!dateIso&&!cp&&!doc){receiptMsg("Заполните хотя бы одно поле");return}
   let count=0;
   receiptPreview.forEach((r)=>{
    if(!r.data)return;
    if(!r.data.occurred_on&&dateIso){r.data.occurred_on=dateIso;count++}
    if(!r.data.counterparty&&cp){r.data.counterparty=cp;count++}
    if(!r.data.document_number&&doc){r.data.document_number=doc;count++}
    r.missing=["occurred_on","counterparty","document_number"].filter(k=>!r.data[k]);
   });
   receiptPreview.forEach((r,i)=>{if(receiptReady(r))selected.add(i)});
   render();$("#mxv2-receipts-save").hidden=!selected.size;
   receiptMsg("Дополнено полей: "+count+". Готовых строк: "+selected.size+". Проверьте соответствие реквизитов перед сохранением.");
  };
  const recount=()=>{counter.textContent="Выбрано: "+selected.size;$("#mxv2-receipts-save").hidden=!selected.size;};
  const render=()=>{
   body.replaceChildren();const start=page*perPage;
   receiptPreview.slice(start,start+perPage).forEach((r,j)=>{
    const i=start+j, tr=document.createElement("tr");
    const checked=selected.has(i);
    tr.innerHTML='<td><input type="checkbox" data-receipt-row="'+i+'" '+(checked?"checked ":"")+(r.data?"":"disabled ")+
     '/></td><td>'+esc(r.excel_row)+'</td><td>'+esc(r.data?.occurred_on||"—")+'</td><td>'+esc(r.data?.material_code||"—")+
     '</td><td>'+esc(r.data?.material_name||"—")+'</td><td>'+esc(r.data?.mass_kg||"—")+'</td><td>'+esc(r.data?.counterparty||"—")+'</td><td>'+esc(r.data?.document_number||"—")+
     '</td><td>'+esc(receiptCheckMessage(r))+
     (r.data?.code_verification==="requires_fkko_check" ? '<div><input data-fkko-code="'+i+'" value="'+esc(r.data.material_code)+'" maxlength="11" aria-label="Код ФККО"/><input data-fkko-name="'+i+'" value="'+esc(r.data.material_name)+'" maxlength="200" aria-label="Наименование отхода"/><label><input type="checkbox" data-fkko-confirm="'+i+'" '+(r.data.fkko_manual_confirmed?"checked":"")+'/>Код и наименование перепроверены</label></div>' : "")+'</td>';
    if(r.data&&!r.error){
     for(const key of Object.keys(receiptEditable)){
      if(r.data[key])continue;
      const label=document.createElement("label");
      label.textContent=receiptEditable[key]+" ";
      const field=document.createElement("input");
      field.maxLength={occurred_on:10,counterparty:200,document_number:160}[key];
      const apply=document.createElement("button");
      apply.type="button";apply.textContent="Применить";
      apply.onclick=()=>{
       const value=field.value.trim();
       const corrected=key==="occurred_on"?parseOperationDate(value):value;
       if(!corrected){receiptMsg("Проверьте поле «"+receiptEditable[key]+"» в строке "+r.excel_row+".");return}
       r.data[key]=corrected;r.missing=(r.missing||[]).filter(field=>field!==key);
       if(receiptReady(r))selected.add(i);
       render();
      };
      label.append(field,apply);tr.lastElementChild.append(label);
     }
    }
    body.appendChild(tr);
   });
   for(const input of body.querySelectorAll("[data-fkko-code],[data-fkko-name],[data-fkko-confirm]")){
     input.addEventListener("change",()=>{
       const i=Number(input.dataset.fkkoCode ?? input.dataset.fkkoName ?? input.dataset.fkkoConfirm);
       const r=receiptPreview[i];if(!r?.data)return;
       if(input.dataset.fkkoCode!==undefined || input.dataset.fkkoName!==undefined){
         r.data.material_code=body.querySelector('[data-fkko-code="'+i+'"]').value.trim();
         r.data.material_name=body.querySelector('[data-fkko-name="'+i+'"]').value.trim();
         r.data.fkko_manual_confirmed=false;
       }else{
         r.data.fkko_manual_confirmed=input.checked && /^\d{11}$/.test(r.data.material_code) && !!r.data.material_name;
       }
       if(receiptReady(r))selected.add(i);render();
     });
   }
   body.querySelectorAll("[data-receipt-row]").forEach(el=>el.addEventListener("change",()=>{
    const i=Number(el.dataset.receiptRow);el.checked?selected.add(i):selected.delete(i);recount();
   }));
   prev.disabled=page===0;next.disabled=(page+1)*perPage>=receiptPreview.length;
   pageLabel.textContent="Страница "+(page+1)+" / "+Math.ceil(receiptPreview.length/perPage);recount();
  };
  all.onclick=()=>{receiptPreview.forEach((r,i)=>{if(receiptReady(r))selected.add(i)});render()};
  none.onclick=()=>{selected.clear();render()};
  prev.onclick=()=>{if(page>0){page--;render()}};
  next.onclick=()=>{if((page+1)*perPage<receiptPreview.length){page++;render()}};
  const container=document.createElement("div");container.className="mx-scroll";container.appendChild(table);
  receiptBox.append(toolbar,container,pages);render();
  const save=$("#mxv2-receipts-save");save.hidden=!selected.size;
  save.onclick=async()=>{
   if(!$("#mxv2-receipts-mass-confirm").checked){
     receiptMsg("Подтвердите столбец поступившей массы в кг или укажите другой столбец и повторите проверку Excel.");
     $("#mxv2-receipts-mass-confirm-panel").scrollIntoView({block:"center"});
     return;
   }
   const indexes=[...selected].sort((a,b)=>a-b);
   const incomplete=indexes.filter(i=>!receiptReady(receiptPreview[i]));
   if(incomplete.length){
    receiptMsg("Заполни данные выбранных строк Excel: "+incomplete.slice(0,10).map(i=>receiptPreview[i].excel_row).join(", ")+(incomplete.length>10?"…":"")+". Подсказки — в колонке «Проверка».");
    return;
   }
   if(!indexes.length){receiptMsg("Выберите строки");return}
   save.disabled=true;$("#mxv2-receipts-check").disabled=true;
   let created=0,duplicates=0,processed=0;
   try{
    for(let j=0;j<indexes.length;j+=100){
     const batch=indexes.slice(j,j+100).map(i=>receiptPreview[i].data);
     const result=await request("/api/test/receipts/bulk-save",{organization_id:org,items:batch});
     created+=result.created||0;duplicates+=result.duplicates||0;processed+=batch.length;
     receiptMsg("Обработано "+processed+"/"+indexes.length+" · добавлено "+created+" · повторов "+duplicates);
    }
    const refresh=await Promise.allSettled([load(),loadContracts()]);
    if(refresh[0].status==="rejected"){receiptMsg("Импорт сохранён. Обнови страницу, чтобы увидеть новые строки.");return;}
    receiptMsg("Импорт завершён. Добавлено: "+created+". Повторные строки: "+duplicates+".");
   }catch(e){receiptMsg("Обработано "+processed+"/"+indexes.length+". "+e.message+" Повторное сохранение допустимо: уже записанные строки будут пропущены.")}
   finally{save.disabled=false;$("#mxv2-receipts-check").disabled=false}
  };
 }catch(e){receiptMsg(e.message)}
 finally{button.disabled=false}
});

const operationStatus=message=>$("#mxv2-operation-status").textContent=message;
operationForm.addEventListener("invalid",event=>{
 const label=event.target.closest("label")?.textContent.trim();
 operationStatus(label?"Проверь поле «"+label+"».":"Проверь обязательные поля.");
},true);
$("#mxv2-form").addEventListener("submit",async e=>{
 e.preventDefault();
 if(!token||!org){operationStatus("Сначала войди в кабинет");return}
 operationStatus("Проверяем запись…");
 if(operationForm.elements.kind.value!=="production"&&(operationForm.elements.kind.value!=="utilization"||$("#mxv2-operation-route").value!=="secondary_raw")&&(!bdoChosen||codeField.value!==bdoChosen.code||nameField.value!==bdoChosen.name)){
  operationStatus("Выберите точную запись из результатов поиска БДО.");return}
 const f=new FormData(e.target),v=String(f.get("mass_kg")).replace(",","."),m=Number(v);
 if(!Number.isFinite(m)||m<=0||! /^\d+(\.\d{1,6})?$/.test(v)){operationStatus("Проверьте массу (до 6 знаков после запятой)");return}
 const day=parseOperationDate(f.get("occurred_on"));
 if(!day){operationStatus("Введите реальную дату в формате ДД.ММ.ГГГГ (не позднее сегодня и не ранее 2000 года).");return}
 const body=Object.fromEntries(f.entries());if(body.kind==="utilization"){
  const raw=String(body.waste_share_percent||"").trim().replace(",",".");if(raw!==""&&(!/^\d+(\.\d{1,4})?$/.test(raw)||Number(raw)>100)){operationStatus("Доля: укажите процент от 0 до 100, до четырёх знаков.");return}body.waste_share_percent=raw||null;
 }else{delete body.recycler_line_id;delete body.utilization_route;delete body.waste_share_percent;delete body.product_code;delete body.product_name;}body.occurred_on=day;body.mass_kg=v;body.organization_id=org;body.external_key=crypto.randomUUID();
 const btn=e.target.querySelector('[type="submit"]');btn.disabled=true;
 try{await request("/api/test/events",body);e.target.reset();syncMaterialLabels();operationStatus("Операция сохранена");
  try{await load();prefillShare()}catch{operationStatus("Операция сохранена. Обнови страницу, чтобы увидеть её в журнале.")}}
 catch(err){operationStatus(err.message)}finally{btn.disabled=false}
});
$("#mxv2-profile-form").addEventListener("submit",async e=>{e.preventDefault();if(!org||!token)return;const f=e.currentTarget;const payload={organization_id:org};["registry_number","registry_as_of","registry_source_url","site_timezone"].forEach(k=>{const value=f.elements[k].value.trim();payload[k]=value||null});if(!payload.site_timezone){$("#mxv2-profile-status").textContent="Укажите часовой пояс";return}if(payload.registry_as_of && (payload.registry_as_of<"2000-01-01"||payload.registry_as_of>new Date().toISOString().slice(0,10))){$("#mxv2-profile-status").textContent="Проверьте дату";return}const btn=f.querySelector('[type="submit"]');btn.disabled=true;try{await request("/api/test/recycler-profile",payload);await loadProfile();$("#mxv2-profile-status").textContent="Карточка сохранена в PostgreSQL"}catch(err){$("#mxv2-profile-status").textContent="Ошибка сохранения: "+err.message}finally{btn.disabled=false}});
const pp2116Headings={I:"Общие сведения",II:"Масса отходов, вторсырья и доля использования",III:"Заключённые и расторгнутые договоры",IV:"Полученные отходы и вторсырьё",V:"Фактическое потребление энергетических ресурсов"};
let pp2116LastReadiness=null;
function displayPP2116Section(key){
 const panel=$("#mxv2-pp2116-active-detail");
 const section=pp2116LastReadiness?.sections?.find(x=>x.section===key);
 panel.innerHTML="<b>Раздел "+esc(key)+". "+esc(pp2116Headings[key])+"</b><p>"+
  (section?esc(section.issues.length?section.issues.join("; "):"Необходима финальная проверка первичных документов."):"Нажмите «Проверить все пять разделов» для проверки по PostgreSQL.")+"</p>";
}
$$("[data-mxr-report-section]").forEach(button=>button.addEventListener("click",()=>displayPP2116Section(button.dataset.mxrReportSection)));
$("#mxv2-ii-evidence-check").onclick=async()=>{
 const box=$("#mxv2-ii-evidence");box.textContent="Получаем связанные результаты…";
 try{
  const year=$("#mxv2-reports-year").value,quarter=$("#mxv2-reports-quarter").value;
  const result=await request("/api/test/report-pp2116-section-ii?"+new URLSearchParams({year,quarter}));
  if(!result.rows.length){box.textContent="За квартал нет операций утилизации";return}
  box.innerHTML="<table><thead><tr><th>Дата / ФККО</th><th>Исходный отход, кг (один раз)</th><th>Полученное сырьё / продукция</th><th>Масса</th><th>Контроль</th></tr></thead><tbody>"+
   result.rows.map(x=>"<tr><td>"+esc(x.date)+" · "+esc(x.fkko)+"</td><td>"+esc(x.utilized_mass_kg_once)+"</td><td>"+
   (x.outputs.length?x.outputs.map(o=>esc(o.name)+" ("+esc(o.method)+")").join("; "):"Не указано")+
   "</td><td>"+(x.outputs.length?x.outputs.map(o=>esc(o.actual_kg||"Только расчёт: "+(o.projected_kg||"—"))).join("; "):"—")+
   "</td><td>"+esc(x.needs_review.join("; "))+"</td></tr>").join("")+
   "</tbody></table><p>Данные не являются утверждённой формой отчётности.</p>";
 }catch(e){box.textContent=e.message}
};

$("#mxv2-reports-draft").onclick=async()=>{
 if(!token||!org)return;
 const year=$("#mxv2-reports-year").value,quarter=$("#mxv2-reports-quarter").value;
 const button=$("#mxv2-reports-draft");button.disabled=true;
 try{
  const q=new URLSearchParams({year,quarter});
  const [statusData,detail]=await Promise.all([
    request("/api/test/report-pp2116-readiness?"+q),
    request("/api/test/report-pp2116-section-ii?"+q)
  ]);
  const tags=(statusData.sections||[]).map(x=>'<section><h2>Раздел '+esc(x.section)+'. '+esc(pp2116Headings[x.section]||"")+'</h2>'+
   '<p><b>Статус:</b> требуется проверка</p><p>'+esc(x.issues.join("; "))+'</p></section>').join("");
  const rows=(detail.rows||[]).map(x=>'<tr><td>'+esc(x.date)+'</td><td>'+esc(x.fkko)+'</td><td>'+esc(x.utilized_mass_kg_once)+'</td><td>'+
     esc(x.outputs.map(o=>o.name+" (факт "+(o.actual_kg??"не установлен")+", расчёт "+(o.projected_kg??"не установлен")+")").join("; "))+'</td></tr>').join("");
  const html='<!doctype html><html lang="ru"><meta charset="utf-8"/><title>MIRLEX · сверка ПП № 2116</title>'+
   '<style>body{font:15px Arial,sans-serif;max-width:980px;margin:32px auto;color:#183039;line-height:1.5}h1{font-size:24px}h2{font-size:19px;margin-top:30px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #cdd8da;padding:8px;text-align:left}p{margin:8px 0}</style>'+
   '<h1>ПРОВЕРОЧНЫЙ ЧЕРНОВИК · ПП РФ № 2116</h1><p><b>Не является официальной отчетностью и не предназначен для подачи.</b></p>'+
   '<p>Период: '+esc(year)+' год, '+esc(quarter)+' квартал. В документе перечислены недостающие сведения.</p>'+
   tags+'<h2>Расшифровка раздела II (по операциям)</h2><table><thead><tr><th>Дата</th><th>ФККО</th><th>Масса исходного отхода, кг</th><th>Результаты</th></tr></thead><tbody>'+rows+'</tbody></table>'+
   '<p>Масса отходов учитывается по операциям один раз. Этот файл не подтверждает графу 13 или наличие акта № 762.</p></html>';
  const blob=new Blob([html],{type:"text/html;charset=utf-8"});
  const link=document.createElement("a"),url=window.URL.createObjectURL(blob);
  link.href=url;link.download="MIRLEX-2116-check-"+year+"-Q"+quarter+".html";
  document.body.append(link);link.click();link.remove();setTimeout(()=>window.URL.revokeObjectURL(url),1000);
 }catch(e){status("Не удалось сформировать проверочный документ: "+e.message)}
 finally{button.disabled=false}
};

$("#mxv2-report-readiness-check").addEventListener("click",async()=>{
 if(!org||!token)return;
 const target=$("#mxv2-report-readiness-result");
 target.textContent="Проверка сведений в PostgreSQL…";
 try{
  const year=$("#mxv2-reports-year").value,quarter=$("#mxv2-reports-quarter").value;
  const data=await request("/api/test/report-pp2116-readiness?"+new URLSearchParams({year,quarter}));
  const table=document.createElement("table");
  table.innerHTML="<thead><tr><th>Раздел</th><th>Статус</th><th>Что требует проверки</th></tr></thead><tbody>"+
   data.sections.map(x=>"<tr><td>"+esc(x.section)+"</td><td>Требует проверки</td><td>"+esc(x.issues.join("; "))+"</td></tr>").join("")+"</tbody>";
  target.replaceChildren(table);
 }catch(e){target.textContent=e.message}
});
async function checkPP2116(){
 if(!token||!org)return;
 const box=$("#mxv2-pp2116-report"),year=$("#mxv2-reports-year").value,quarter=$("#mxv2-reports-quarter").value;
 box.textContent="Получаем предварительную сводку из PostgreSQL…";
 try{
  const data=await request("/api/test/report-pp2116-preview?"+new URLSearchParams({year,quarter}));
  const rows=data.rows||[];
  if(!rows.length){box.textContent="Нет операций утилизации в выбранном квартале.";return}
  const header='<table><thead><tr><th>Оборудование (гр. 2)</th><th>Способ</th><th>Материал (гр. 3–4 / 8–9)</th><th>Масса, кг</th><th>Доля, % (гр. 13)</th><th>Продукция (гр. 14–15)</th><th>Что требует заполнения</th></tr></thead><tbody>';
  const labels={equipment:"оборудование",route:"способ утилизации",share:"доля",product:"продукция",material_origin:"происхождение материалов",act_reference:"реквизиты акта"};
  const body=rows.map(x=>'<tr><td>'+esc(x.line||"Не привязано")+'</td><td>'+esc(x.route==="direct_waste"?"Отходы → продукция":x.route==="secondary_raw"?"Вторсырьё → продукция":"Не установлено")+'</td><td>'+esc(x.material_code+" — "+x.material_name)+'</td><td>'+esc(neat(x.mass_kg_exact))+'</td><td>'+esc(x.share_percent==null?"Требует уточнения":neat(x.share_percent)+"%")+'</td><td>'+esc(x.product_code+" "+x.product_name)+'</td><td>'+esc(x.missing.map(k=>labels[k]||k).join(", "))+'</td></tr>').join("");
  box.innerHTML='<p class="mx-muted">Черновая сверка: '+data.year+', '+data.quarter+' квартал. Не округляйте первичные массы до формирования отчётных строк.</p>'+header+body+'</tbody></table><p class="mx-muted">Нельзя использовать как официальный отчёт: отсутствуют проверенные связи происхождения материалов и актов утилизации.'+(data.truncated?" Показаны первые 500 групп; полный результат содержит больше.":"")+'</p>';
 }catch(e){box.textContent="Сверка недоступна: "+e.message}
}
$("#mxv2-reports-check").addEventListener("click",checkPP2116);
const reportToday=new Date();$("#mxv2-reports-year").value=String(reportToday.getFullYear());
$("#mxv2-reports-quarter").value=String(Math.floor(reportToday.getMonth()/3)+1);
$("#mxv2-export").addEventListener("click",exportCsv);$("#mxv2-reports-export").addEventListener("click",exportCsv);
$("#mxv2-logout").addEventListener("click",()=>{token="";org="";items=[];resetLineForm();configLines=[];$("#mxv2-line-list").textContent="";$("#mxv2-content").hidden=true;$("#mxv2-session-actions").hidden=true;$("#mxv2-login").hidden=false;$("#mxv2-org").disabled=true;$("#mxv2-org").innerHTML="<option>Сначала войдите</option>";$("#mxv2-security").textContent="Нет подключения";lastTotals=[];$("#mxv2-profile-form").reset();status("Выход выполнен")});
root.dataset.bound="1";
}catch(initErr){
 const box=root.querySelector("#mxv2-status");
 if(box)box.textContent="Ошибка запуска кабинета: "+(initErr?.message||"Ошибка JavaScript");
 console.error("MIRLEX_TEST_V2_INIT",initErr);
}
})();

})();
