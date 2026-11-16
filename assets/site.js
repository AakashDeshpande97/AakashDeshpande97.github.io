// Mobile menu
(function(){
  var btn=document.querySelector('.menu-btn'), nav=document.querySelector('.top nav');
  if(btn&&nav){btn.addEventListener('click',function(){
    var open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false');});}
})();

// Lightbox for project galleries
(function(){
  var shots=[].slice.call(document.querySelectorAll('.gallery button[data-full]'));
  if(!shots.length)return;
  var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Image viewer');
  lb.innerHTML='<button class="x" type="button">Close</button><button class="prev" type="button">Previous</button><img alt=""><p></p><button class="nxt" type="button">Next</button>';
  document.body.appendChild(lb);
  var img=lb.querySelector('img'),cap=lb.querySelector('p'),i=0,last=null;
  function show(n){i=(n+shots.length)%shots.length;var b=shots[i];img.src=b.dataset.full;img.alt=b.querySelector('img').alt;
    var fc=b.parentNode.querySelector('figcaption');cap.textContent=fc?fc.textContent:'';}
  function open(n){last=document.activeElement;show(n);lb.classList.add('open');document.body.style.overflow='hidden';lb.querySelector('.x').focus();}
  function close(){lb.classList.remove('open');document.body.style.overflow='';if(last)last.focus();}
  shots.forEach(function(b,n){b.addEventListener('click',function(){open(n);});});
  lb.querySelector('.x').addEventListener('click',close);
  lb.querySelector('.prev').addEventListener('click',function(){show(i-1);});
  lb.querySelector('.nxt').addEventListener('click',function(){show(i+1);});
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();else if(e.key==='ArrowRight')show(i+1);else if(e.key==='ArrowLeft')show(i-1);});
})();

// Project list filters
(function(){
  var btns=[].slice.call(document.querySelectorAll('.filters button'));
  if(!btns.length)return;
  var items=[].slice.call(document.querySelectorAll('.plist li'));
  btns.forEach(function(b){b.addEventListener('click',function(){
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    var f=b.dataset.filter;
    items.forEach(function(li){li.hidden=!(f==='all'||li.dataset.kind===f);});
  });});
})();


// Open in the real browser when the page is shown inside an app (WhatsApp, LinkedIn, Instagram...).
// In-app browsers often block email links; Android can hand the page to Chrome, iPhone cannot.
(function(){
  var ua=navigator.userAgent||'';
  var inApp=/WhatsApp|LinkedInApp|Instagram|FBAN|FBAV|FB_IAB|Snapchat|Line\/|Telegram|; wv\)/i.test(ua);
  if(!inApp)return;
  var android=/Android/i.test(ua), ios=/iPhone|iPad|iPod/i.test(ua);
  var url=location.href;
  var intent='intent://'+location.host+location.pathname+location.search+location.hash+
    '#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url='+encodeURIComponent(url)+';end';
  // Android: try once per visit to hand the page over to Chrome automatically
  if(android){
    var tried=false;try{tried=sessionStorage.getItem('openedInBrowser')==='1';sessionStorage.setItem('openedInBrowser','1');}catch(e){}
    if(!tried){location.href=intent;}
  }
  // Fallback banner, in case the app blocked the hand-over
  var bar=document.createElement('div');bar.className='inapp';
  if(android){
    bar.innerHTML='<span>You\'re viewing this inside an app. For the best experience, open it in your browser.</span><a class="inapp-btn" href="'+intent+'">Open in Chrome</a>';
  }else{
    bar.innerHTML='<span>You\'re viewing this inside an app. For the best experience, tap the '+(ios?'menu and choose <b>Open in Safari</b>':'menu and choose <b>Open in browser</b>')+'.</span>';
  }
  var x=document.createElement('button');x.type='button';x.className='inapp-x';x.setAttribute('aria-label','Dismiss');x.textContent='\u00d7';
  x.addEventListener('click',function(){bar.remove();});
  bar.appendChild(x);
  document.body.insertBefore(bar,document.body.firstChild);
})();

// Copy email: works even where mailto links are blocked (in-app browsers)
(function(){
  [].forEach.call(document.querySelectorAll('.copy[data-copy]'),function(b){
    b.addEventListener('click',function(){
      var t=b.dataset.copy,label=b.textContent;
      function done(){b.textContent='Copied';setTimeout(function(){b.textContent=label;},1800);}
      function fallback(){var i=document.createElement('textarea');i.value=t;i.setAttribute('readonly','');i.style.position='fixed';i.style.opacity='0';
        document.body.appendChild(i);i.select();try{document.execCommand('copy');done();}catch(e){b.textContent=t;}document.body.removeChild(i);}
      try{if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(done,fallback);}else{fallback();}}catch(e){fallback();}
    });
  });
})();
