const {chromium}=require('/home/hatch/workspace/tools/screenshot-engine/node_modules/playwright');
const fs=require('fs'),path=require('path');
const EXEC='/home/hatch/workspace/tools/screenshot-engine/browsers/chrome-headless-shell-linux64/chrome-headless-shell';
const L='/home/hatch/workspace/portfolio-builds/landing-page-set-demo', T='/home/hatch/workspace/portfolio-builds/travel-tour-booking-demo';
const out={landing:{},travel:{}}; let fails=[];
function chk(scope,name,ok,detail){out[scope][name]={ok,detail}; if(!ok)fails.push(scope+':'+name+' '+detail); console.log((ok?'PASS':'FAIL'),scope,name,detail||'');}
(async()=>{
 const browser=await chromium.launch({executablePath:EXEC,args:['--proxy-server=http://hatch-egress-proxy:3128','--no-sandbox','--force-color-profile=srgb']});
 // LANDING saas tabs
 let ctx=await browser.newContext({viewport:{width:1440,height:900}}); let page=await ctx.newPage();
 await page.goto('file://'+L+'/saas.html',{waitUntil:'load'}); await page.waitForTimeout(600);
 await page.click('[data-ptab="inventory"]'); await page.waitForTimeout(200);
 let r=await page.evaluate(()=>({inv:!document.querySelector('[data-ppanel="inventory"]').hidden, invPanelVisible:document.querySelector('[data-ppanel="invoices"]').hidden, sel:document.querySelector('[data-ptab="inventory"]').getAttribute('aria-selected')}));
 chk('landing','saas-tabs-live',r.inv&&r.invPanelVisible&&r.sel==='true',JSON.stringify(r));
 // local calc
 await page.goto('file://'+L+'/local.html',{waitUntil:'load'}); await page.waitForTimeout(400);
 await page.selectOption('[data-calc-service]','6500'); await page.fill('[data-calc-qty]','3'); await page.waitForTimeout(200);
 let tot=await page.textContent('[data-calc-total]');
 chk('landing','local-calc-6500x3',tot.includes('19,500'),'total='+tot.trim());
 // agency kinetic mid-animation
 await page.goto('file://'+L+'/agency.html',{waitUntil:'load'}); await page.waitForTimeout(420);
 let chars=await page.evaluate(()=>document.querySelectorAll('.kchar').length);
 await page.screenshot({path:L+'/screenshots/signature-moment.png'});
 chk('landing','agency-splittext-chars',chars>=20,'chars='+chars);
 await page.waitForTimeout(1400);
 let fs1=await page.evaluate(()=>Math.round(document.querySelector('.kinetic .line').getBoundingClientRect().height));
 chk('landing','agency-display-scale',fs1>=90,'first-line height px='+fs1);
 await ctx.close();
 // LANDING no-JS completeness for saas tabs panels: panels hidden attr in no-JS? hidden panels stay hidden without JS -> PROBLEM check
 ctx=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false}); page=await ctx.newPage();
 await page.goto('file://'+L+'/saas.html',{waitUntil:'load'}); await page.waitForTimeout(300);
 let nojs=await page.evaluate(()=>{const p=document.querySelector('[data-ppanel="inventory"]');const cs=getComputedStyle(p);return{hidden:p.hidden,display:cs.display};});
 out.landing.saas_nojs_inventory=nojs; console.log('INFO landing saas nojs inventory',JSON.stringify(nojs));
 await ctx.close();
 // TRAVEL index: premium-on, lenis, horizontal probe normal speed
 ctx=await browser.newContext({viewport:{width:1440,height:900}}); page=await ctx.newPage();
 const errs=[]; page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await page.goto('file://'+T+'/index.html',{waitUntil:'load'}); await page.waitForTimeout(1200);
 let pre=await page.evaluate(()=>({premiumOn:document.documentElement.classList.contains('premium-on'),lenis:!!document.querySelector('.lenis')||document.documentElement.classList.contains('lenis'),navUnderline:getComputedStyle(document.querySelector('nav.main a[aria-current="page"]')).textDecorationLine}));
 chk('travel','premium-on+lenis',pre.premiumOn,'premiumOn='+pre.premiumOn);
 chk('travel','aria-current-underline-intact',pre.navUnderline.includes('underline'),'decoration='+pre.navUnderline);
 // scroll to chapter then walk at normal speed (0.8 viewport steps, 110ms) through pin, checking each panel img painted when in view
 await page.evaluate(()=>{document.querySelector('[data-chapter]').scrollIntoView();});
 await page.waitForTimeout(800);
 let seen={};
 for(let i=0;i<40;i++){
   let st=await page.evaluate(()=>{const res={};document.querySelectorAll('.hpanel img').forEach((im,ix)=>{const r=im.getBoundingClientRect();const inView=r.right>0&&r.left<innerWidth&&r.bottom>0&&r.top<innerHeight;res[ix]={complete:im.complete,nw:im.naturalWidth,inView,op:getComputedStyle(im).opacity};});return res;});
   for(const k in st){if(st[k].inView){seen[k]=st[k];}}
   await page.mouse.wheel(0,Math.floor(900*0.8)); await page.waitForTimeout(110);
   if(i===10){await page.waitForTimeout(250); await page.screenshot({path:T+'/screenshots/signature-moment.png'});}
 }
 let painted=Object.keys(seen).length, allOk=Object.values(seen).every(v=>v.complete&&v.nw>0&&v.op==='1');
 chk('travel','horizontal-panels-painted-normal-speed',painted>=4&&allOk,'panels seen in view='+painted+'/4 imgs, all complete+opacity1='+allOk+' '+JSON.stringify(seen));
 chk('travel','console-clean',errs.length===0,errs.join(';').slice(0,200));
 await ctx.close();
 // TRAVEL reduced motion: vertical stack complete
 ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}); page=await ctx.newPage();
 await page.goto('file://'+T+'/index.html',{waitUntil:'load'}); await page.waitForTimeout(600);
 let rm=await page.evaluate(()=>{const tr=document.querySelector('.htrack');const panels=[].slice.call(document.querySelectorAll('.hpanel'));return{premiumOn:document.documentElement.classList.contains('premium-on'),dir:getComputedStyle(tr).flexDirection,panels:panels.length,allVisible:panels.every(p=>p.getBoundingClientRect().height>50),imgsOk:[].slice.call(document.querySelectorAll('.hpanel img')).every(im=>im.complete&&im.naturalWidth>0)};});
 chk('travel','reduced-motion-vertical-stack',rm.dir==='column'&&rm.allVisible&&rm.imgsOk,JSON.stringify(rm));
 await ctx.close();
 // TRAVEL no-JS
 ctx=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false}); page=await ctx.newPage();
 await page.goto('file://'+T+'/index.html',{waitUntil:'load'}); await page.waitForTimeout(400);
 let nj=await page.evaluate(()=>{const panels=[].slice.call(document.querySelectorAll('.hpanel'));return{panels:panels.length,allVisible:panels.every(p=>p.getBoundingClientRect().height>50)};});
 chk('travel','nojs-chapter-complete',nj.panels===5&&nj.allVisible,JSON.stringify(nj));
 await ctx.close();
 await browser.close();
 fs.writeFileSync('/tmp/premium-checks.json',JSON.stringify({out,fails},null,2));
 console.log('FAILS:',fails.length);
})();
