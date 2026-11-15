'use strict';
const menuBtn=document.querySelector('[data-menu-toggle]');
const mainNav=document.querySelector('[data-nav]');
if(menuBtn && mainNav){
 menuBtn.addEventListener('click',()=>{const opened=mainNav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(opened));menuBtn.setAttribute('aria-label',opened?'Close menu':'Open menu');});
 mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){mainNav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}});
}
const filters=document.querySelectorAll('[data-gallery-filter]');
const galleryItems=document.querySelectorAll('[data-gallery-category]');
filters.forEach(button=>button.addEventListener('click',()=>{
 const value=button.dataset.galleryFilter;
 filters.forEach(btn=>{const selected=btn===button;btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected));});
 galleryItems.forEach(item=>{item.hidden=value!=='all' && !item.dataset.galleryCategory.split(' ').includes(value);});
}));
document.querySelectorAll('[data-current-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
const enquiryForm=document.querySelector('[data-enquiry-form]');
if(enquiryForm){
 enquiryForm.addEventListener('submit',event=>{
  event.preventDefault();
  if(!enquiryForm.reportValidity())return;
  const values=new FormData(enquiryForm);
  const name=String(values.get('name')||'').trim();
  const phone=String(values.get('phone')||'').trim();
  const interest=String(values.get('interest')||'MLMLIVE App').trim();
  const message=String(values.get('message')||'').trim();
  if(!/^[6-9]\d{9}$/.test(phone)){alert('Please enter a valid 10-digit Indian mobile number.');return;}
  const msg=`Hello MLMLIVE Team,\nI have an enquiry about your design app.\n\nName: ${name}\nMobile: ${phone}\nInterested in: ${interest}\nMessage: ${message || 'Please share more details.'}\n\nSent from mlmlive.in`;
  const url='https://wa.me/919229885383?text='+encodeURIComponent(msg);
  const popup=window.open(url,'_blank','noopener,noreferrer');
  if(!popup){const link=document.querySelector('[data-wa-fallback]');if(link){link.href=url;link.hidden=false;}}
 });
}
