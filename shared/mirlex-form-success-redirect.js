(function(){
  var script=document.currentScript;
  var service=(script && script.dataset && script.dataset.service || '').trim();
  var target=(script && script.dataset && script.dataset.target || '/spasibo').trim();

  if(!service){
    console.warn('MIRLEX redirect: data-service не указан');
    return;
  }

  function buildUrl(){
    var sep=target.indexOf('?')===-1?'?':'&';
    return target+sep+'service='+encodeURIComponent(service);
  }

  function bindForm(form){
    if(!form || form.dataset.mirlexSuccessRedirect==='1') return;
    form.dataset.mirlexSuccessRedirect='1';

    form.addEventListener('tildaform:aftersuccess',function(){
      window.location.assign(buildUrl());
    });
  }

  function scan(){
    document.querySelectorAll('.js-form-proccess').forEach(bindForm);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',scan);
  }else{
    scan();
  }

  setTimeout(scan,800);
  setTimeout(scan,1800);
  setTimeout(scan,3500);

  var observer=new MutationObserver(scan);
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();