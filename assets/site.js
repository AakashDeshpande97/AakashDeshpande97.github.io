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
