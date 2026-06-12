(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();let C=null;function V(){return C||(C=new AudioContext),C.state==="suspended"&&C.resume(),C}function h(e,t,i="sine",n=.3){try{const a=V(),s=a.createOscillator(),o=a.createGain();s.type=i,s.frequency.value=e,o.gain.value=n,o.gain.exponentialRampToValueAtTime(.001,a.currentTime+t),s.connect(o),o.connect(a.destination),s.start(a.currentTime),s.stop(a.currentTime+t)}catch{}}function ie(e,t=.1){try{const i=V(),n=i.sampleRate*e,a=i.createBuffer(1,n,i.sampleRate),s=a.getChannelData(0);for(let l=0;l<n;l++)s[l]=(Math.random()*2-1)*t;const o=i.createBufferSource();o.buffer=a;const r=i.createGain();r.gain.value=1,r.gain.exponentialRampToValueAtTime(.001,i.currentTime+e),o.connect(r),r.connect(i.destination),o.start(i.currentTime)}catch{}}function x(){ie(.08,.3),h(800,.1,"sine",.2),setTimeout(()=>h(600,.05,"sine",.15),50)}function $(){h(1200+Math.random()*400,.15,"sine",.1)}function b(){h(1e3,.08,"square",.08)}function se(){h(523,.15,"sine",.2),setTimeout(()=>h(659,.15,"sine",.2),100),setTimeout(()=>h(784,.2,"sine",.25),200)}function W(){[523,659,784,1047].forEach((t,i)=>{setTimeout(()=>h(t,.2,"sine",.2),i*150)})}function R(){h(800,.05,"square",.05)}function ae(e=!1){e?h(1047,.3,"sine",.3):h(660,.15,"sine",.2)}function ne(){h(880,.1,"sine",.15),setTimeout(()=>h(1100,.15,"sine",.2),80)}function oe(){h(300,.15,"sawtooth",.08)}const P={"ad-220":"/images/ad-220.webp","ad-450":"/images/ad-450.webp","ad-strawberry-220":"/images/ad-strawberry-220.webp","ad-peach-220":"/images/ad-peach-220.webp","ad-strawberry-450":"/images/ad-strawberry-450.webp","ad-peach-450":"/images/ad-peach-450.webp","ad-lactic-450":"/images/ad-lactic-450.webp","ad-collagen-450":"/images/ad-collagen-450.webp"},re={"ad-220":"经典AD钙奶 220ml","ad-450":"经典AD钙奶 450ml","ad-strawberry-220":"草莓味AD钙奶 220ml","ad-peach-220":"蜜桃味AD钙奶 220ml","ad-strawberry-450":"草莓味AD钙奶 450ml","ad-peach-450":"蜜桃味AD钙奶 450ml","ad-lactic-450":"乳酸菌AD钙奶 450ml","ad-collagen-450":"胶原蛋白AD钙奶 450ml"};function le(){const e=Object.keys(P);return e[Math.floor(Math.random()*e.length)]}function de(e){const t=document.createElement("div");t.className="bubble-bg",t.id="bubble-bg";for(let i=0;i<15;i++){const n=document.createElement("div");n.className="bubble";const a=8+Math.random()*20;n.style.width=`${a}px`,n.style.height=`${a}px`,n.style.left=`${Math.random()*100}%`,n.style.setProperty("--duration",`${4+Math.random()*5}s`),n.style.setProperty("--opacity",`${.15+Math.random()*.25}`),n.style.animationDelay=`${Math.random()*5}s`,t.appendChild(n)}for(let i=0;i<10;i++){const n=document.createElement("div");n.className="star",n.style.left=`${Math.random()*100}%`,n.style.top=`${Math.random()*100}%`,n.style.setProperty("--duration",`${2+Math.random()*3}s`),n.style.animationDelay=`${Math.random()*3}s`,t.appendChild(n)}e.appendChild(t)}function k(e="ad-450",t={}){const{width:i=120,className:n="",id:a="",style:s="",clickable:o=!1,showCap:r=!0}=t,l=P[e],c=o?"cursor:pointer;":"",d=a?`id="${a}"`:"";return`
    <div class="bottle-img-wrapper ${n}" ${d} style="position:relative; display:inline-block; ${c} ${s}">
      ${r?`
      <div class="bottle-cap-img" style="
        position:absolute; top:-8px; left:50%; transform:translateX(-50%);
        width:${Math.round(i*.35)}px; height:${Math.round(i*.18)}px;
        background:linear-gradient(135deg, #FF9800, #F57C00);
        border-radius:4px 4px 2px 2px; z-index:2;
        box-shadow:0 2px 4px rgba(0,0,0,0.15);
      ">
        <div style="position:absolute; top:3px; left:2px; right:2px; height:2px; background:rgba(255,255,255,0.3); border-radius:1px;"></div>
        <div style="position:absolute; top:7px; left:2px; right:2px; height:2px; background:rgba(255,255,255,0.3); border-radius:1px;"></div>
      </div>
      `:""}
      <img
        src="${l}"
        alt="${re[e]}"
        width="${i}"
        style="display:block; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.2));"
        draggable="false"
      />
    </div>
  `}function S(e,t){x(),setTimeout(()=>$(),100),setTimeout(()=>$(),200),setTimeout(()=>$(),300);const i=le(),n=document.createElement("div");n.className="bottle-opening-overlay",n.innerHTML=`
    <div class="bottle-anim" style="position:relative;">
      ${k(i,{width:140,showCap:!0})}
      <div class="bottle-bubbles-burst" id="bottle-burst"></div>
    </div>
    <div style="margin-top:20px; font-size:16px; color:var(--ad-green-dark); font-weight:700; animation:feedback-pop 0.6s 0.3s both;">
      啵～ ✨
    </div>
  `,e.appendChild(n),setTimeout(()=>{const a=n.querySelector(".bottle-cap-img");a&&a.classList.add("bottle-cap-pop");const s=n.querySelector("#bottle-burst");if(s)for(let o=0;o<12;o++){const r=document.createElement("div");r.className="burst-bubble";const l=6+Math.random()*14;r.style.width=`${l}px`,r.style.height=`${l}px`;const c=Math.PI*2*o/12,d=30+Math.random()*50;r.style.setProperty("--tx",`${Math.cos(c)*d}px`),r.style.setProperty("--ty",`${Math.sin(c)*d-40}px`),r.style.setProperty("--dur",`${.4+Math.random()*.3}s`),s.appendChild(r)}},200),setTimeout(()=>{n.style.opacity="0",n.style.transition="opacity 0.3s",setTimeout(()=>{n.remove(),t()},300)},1200)}function ce(e){return`
    <div class="desk-scene">
      <div class="desk-surface"></div>
      <div class="bottle-container" id="intro-bottle" style="position:relative; bottom:20px; z-index:2;">
        ${k("ad-450",{width:130,clickable:!0,showCap:!0})}
        <div style="
          position:absolute; bottom:-8px; left:50%; transform:translateX(-50%);
          background:rgba(0,0,0,0.1); border-radius:50%; width:80px; height:12px;
          filter:blur(3px);
        "></div>
      </div>
      <div style="
        position:absolute; top:40px; left:50%; transform:translateX(-50%);
        background:white; padding:8px 16px; border-radius:20px;
        font-size:13px; color:var(--ad-green-dark); font-weight:600;
        box-shadow:0 2px 10px var(--ad-shadow); white-space:nowrap;
        animation:float-gentle 2s ease-in-out infinite;
      ">
        点击瓶盖打开 👆
      </div>
    </div>
  `}const j=[{id:1,text:"放学路上最期待的小卖部零食是？",emoji:"🏫",options:[{label:"A",text:"辣条，越辣越爽",score:3},{label:"B",text:"果冻，一口一个",score:2},{label:"C",text:"AD钙奶，灵魂之选",score:1}]},{id:2,text:"超市货架上看到AD钙奶，你会？",emoji:"🛒",options:[{label:"A",text:"看看就走了",score:3},{label:"B",text:"拿一排放购物车",score:2},{label:"C",text:"整箱搬走！别拦我",score:1}]},{id:3,text:"小时候喝AD钙奶的方式是？",emoji:"🍼",options:[{label:"A",text:"小口慢慢品",score:3},{label:"B",text:"用吸管一口气喝完",score:2},{label:"C",text:"先嘬一口再晃晃瓶子听声音",score:1}]},{id:4,text:"AD钙奶30年了，你最想对它说什么？",emoji:"🎂",options:[{label:"A",text:"陪伴是最长情的告白",score:3},{label:"B",text:"不管几岁 快乐万岁！",score:2},{label:"C",text:"再来一排！永远爱你",score:1}]},{id:5,text:"新口味AD钙奶你最想尝哪个？",emoji:"🍓",options:[{label:"A",text:"草莓味，甜甜蜜蜜",score:3},{label:"B",text:"蜜桃味，清新满分",score:2},{label:"C",text:"全都要！成年人不做选择",score:1}]}],M=[{age:6,label:"资深小朋友",emoji:"🍼"},{age:9,label:"元气小可爱",emoji:"🌈"},{age:12,label:"元气少年",emoji:"⚡"},{age:18,label:"快乐青年",emoji:"🎸"},{age:25,label:"成熟大朋友",emoji:"🎯"}];function J(e){const t=[3,2,1],i=e.reduce((n,a)=>n+t[a],0);return i<=7?M[0]:i<=9?M[1]:i<=11?M[2]:i<=13?M[3]:M[4]}const pe={0:["😴","🥱","📱"],1:["😊","🤭","✨"],2:["🎉","🥳","🍼","💚","🎊"]};function ue(e){const t=pe[e],i=t[Math.floor(Math.random()*t.length)],n=document.createElement("div");n.className="feedback-emoji",n.textContent=i,document.body.appendChild(n),e===2&&O(),setTimeout(()=>n.remove(),800)}function O(){const e=document.createElement("div");e.className="confetti-burst",document.body.appendChild(e);const t=["#4CAF50","#FF9800","#FFF9C4","#81C784","#FFCDD2"];for(let i=0;i<20;i++){const n=document.createElement("div");n.className="confetti-piece",n.style.backgroundColor=t[Math.floor(Math.random()*t.length)];const a=Math.PI*2*i/20,s=60+Math.random()*80;n.style.setProperty("--tx",`${Math.cos(a)*s}px`),n.style.setProperty("--ty",`${Math.sin(a)*s-30}px`),n.style.setProperty("--rot",`${Math.random()*720-360}deg`),n.style.setProperty("--dur",`${.8+Math.random()*.5}s`),e.appendChild(n)}setTimeout(()=>e.remove(),1500)}let D=0,X=[];function ge(e,t){D=0,X=[],Z(e,t)}function Z(e,t){const i=j[D],n=D/j.length*100,a=["ad-220","ad-strawberry-220","ad-peach-220","ad-lactic-450","ad-collagen-450"][D%5];e.innerHTML=`
    <div class="page" style="justify-content: center;">
      <div style="margin-bottom:8px; display:flex; justify-content:center;">
        ${k(a,{width:60,showCap:!1})}
      </div>
      <div style="font-size:48px; margin-bottom:12px;">${i.emoji}</div>
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width:${n}%"></div>
      </div>
      <div style="font-size:13px; color:var(--ad-text-light); margin-bottom:20px;">
        第 ${D+1}/${j.length} 题
      </div>
      <div class="quiz-card">
        <div style="font-size:18px; font-weight:700; text-align:center; margin-bottom:20px; line-height:1.5;">
          ${i.text}
        </div>
        <div id="quiz-options">
          ${i.options.map((r,l)=>`
            <div class="quiz-option" data-index="${l}" data-label="${r.label}">
              <div class="quiz-option-label">${r.label}</div>
              <div>${r.text}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;const s=e.querySelector("#quiz-options");if(!s)return;const o=s.querySelectorAll(".quiz-option");o.forEach(r=>{const l=parseInt(r.dataset.index||"0",10),c=r.dataset.label||"",d=()=>{b(),r.classList.add("selected"),c==="C"&&r.classList.add("selected-c"),ue(l),l===2&&(se(),setTimeout(()=>$(),100),setTimeout(()=>$(),200)),o.forEach(g=>{g.style.pointerEvents="none"}),X.push(l),setTimeout(()=>{D++,D<j.length?Z(e,t):t(X)},l===2?1e3:600)};r.addEventListener("click",d,{once:!0})})}function fe(e,t,i){const n=J(t);ve(e,()=>{me(e,n,t,i)})}function ve(e,t){x(),e.innerHTML=`
    <div class="theme-splash" id="theme-splash">
      <div class="theme-splash-bg"></div>
      <div class="theme-splash-content">
        <div class="theme-splash-bottle">
          ${k("ad-450",{width:120,showCap:!1})}
        </div>
        <div class="theme-splash-text" id="splash-text-1">不管几岁</div>
        <div class="theme-splash-text theme-splash-text-2" id="splash-text-2">快乐万岁</div>
        <div class="theme-splash-burst" id="splash-burst"></div>
      </div>
    </div>
  `;const i=document.getElementById("splash-burst");if(i){const o=["#4CAF50","#FF9800","#FFF9C4","#81C784","#FFCDD2","#66BB6A"];for(let r=0;r<30;r++){const l=document.createElement("div");l.className="splash-particle";const c=Math.PI*2*r/30,d=80+Math.random()*120;l.style.setProperty("--tx",`${Math.cos(c)*d}px`),l.style.setProperty("--ty",`${Math.sin(c)*d}px`),l.style.setProperty("--rot",`${Math.random()*720-360}deg`),l.style.setProperty("--size",`${6+Math.random()*10}px`),l.style.backgroundColor=o[Math.floor(Math.random()*o.length)],i.appendChild(l)}}setTimeout(()=>$(),200),setTimeout(()=>$(),400),setTimeout(()=>$(),600);const n=document.getElementById("splash-text-1"),a=document.getElementById("splash-text-2"),s=document.getElementById("theme-splash");setTimeout(()=>{n&&n.classList.add("splash-visible"),x()},300),setTimeout(()=>{a&&a.classList.add("splash-visible"),x()},700),setTimeout(()=>O(),900),setTimeout(()=>{s&&s.classList.add("splash-fade-out"),setTimeout(t,600)},2400)}function me(e,t,i,n){x();const a=t.age<=9?"ad-strawberry-220":t.age<=12?"ad-peach-220":t.age<=18?"ad-lactic-450":"ad-collagen-450";e.innerHTML=`
    <div class="page" style="justify-content: center;">
      <div class="result-theme-banner">
        <span>不管几岁 · 快乐万岁</span>
      </div>
      <div style="margin-bottom:12px;">
        ${k(a,{width:90,showCap:!1})}
      </div>
      <div class="result-card">
        <div style="font-size:14px; color:var(--ad-text-light); margin-bottom:8px;">你的快乐年龄是</div>
        <div class="result-age">${t.age}</div>
        <div class="result-unit">岁</div>
        <div style="font-size:48px; margin:16px 0;">${t.emoji}</div>
        <div class="result-label">快乐年龄${t.age}岁 · ${t.label}</div>
        <div style="font-size:13px; color:var(--ad-text-light); margin-top:12px; line-height:1.6;">
          ${ye(t.age)}
        </div>
        <div style="font-size:11px; color:var(--ad-green); margin-top:8px; font-weight:600;">
          ${he[t.age]||""}
        </div>
      </div>
      <div style="margin-top:32px; width:100%; max-width:340px;">
        <button class="btn-primary btn-orange w-full" id="btn-next-challenge">
          敢不敢挑战30秒快乐闯关？ 🎮
        </button>
      </div>
    </div>
  `,setTimeout(()=>O(),300),e.querySelector("#btn-next-challenge")?.addEventListener("click",()=>{b(),n("challenge-intro",{quizAnswers:i,happyAge:t.age,happyLabel:t.label})})}const he={6:"你的本命口味：草莓味AD钙奶 🍓",9:"推荐搭配：蜜桃味AD钙奶 🍑",12:"能量加满：乳酸菌AD钙奶 💪",18:"精致之选：胶原蛋白AD钙奶 ✨",25:"经典永不过时：原味AD钙奶 🥛"};function ye(e){const t={6:"你的内心住着一个永远长不大的小孩！AD钙奶对你来说不是饮料，是续命水！不管几岁，快乐万岁！",9:"你保留了童真的同时又有自己的小想法，选AD钙奶从不犹豫——你是真正的快乐达人！",12:"你正在探索世界的阶段，对每一款新口味都充满好奇！30年经典和新鲜口味你都要！",18:"你懂得在成长中保持快乐，成熟不意味着丢掉童趣！AD钙奶30年陪你一起长大！",25:"你是稳重的大朋友，但提到AD钙奶就秒变小朋友！30年的陪伴，是最长情的快乐！"};return t[e]||t[12]}const be=[{id:1,title:"拧开瓶盖",instruction:"点击瓶盖把它拧开！",gesture:"tap",icon:"🧴",failText:"瓶盖太紧没拧开，再试试！"},{id:2,title:"插入吸管",instruction:"向下滑动插入吸管！",gesture:"swipe-down",icon:"🥤",failText:"吸管插歪了，奶都漏了"},{id:3,title:"喝第一口奶",instruction:"长按吸管品尝第一口！",gesture:"long-press",icon:"🥛",failText:"还没喝到就洒了"},{id:4,title:"摇一摇钙奶",instruction:"上下快速摇匀钙奶！",gesture:"shake-ud",icon:"🫧",failText:"没摇匀，味道分层了"},{id:5,title:"收集30颗钙星",instruction:"连续点击收集30周年钙星！",gesture:"multi-tap",icon:"⭐",failText:"钙星不够，能量不足"},{id:6,title:"接住掉落的AD钙奶",instruction:"左右滑动接住掉落的钙奶！",gesture:"swipe-lr",icon:"🫳",failText:"AD钙奶掉地上啦！"},{id:7,title:"撕开30周年标签",instruction:"快速来回滑动撕开标签！",gesture:"rapid-swipe",icon:"🏷️",failText:"标签撕坏了，再试一瓶"},{id:8,title:"吹灭30周年蜡烛",instruction:"长按吹灭AD钙奶30岁蜡烛！",gesture:"long-press",icon:"🎂",failText:"蜡烛又亮了，许个愿再吹"},{id:9,title:"拼出AD钙奶30年",instruction:"把logo拖到正确位置！",gesture:"drag",icon:"🧩",failText:"拼图散落一地，重新来过"},{id:10,title:"找到隐藏的AD钙奶",instruction:"找到藏在画面里的AD钙奶！",gesture:"find-tap",icon:"🔍",failText:"找错位置了，AD钙奶藏得深"}],_=["pixel","handdrawn","3d","comic","neon"],xe={pixel:"像素风 · 1994",handdrawn:"手绘风 · 2004","3d":"3D风 · 2014",comic:"漫画风 · 2020",neon:"霓虹风 · 2024"};let F=0,A=0,z=[],ee=[],B=null,L={tapCount:0};function we(e,t){x(),e.innerHTML=`
    <div class="page" style="justify-content: center;">
      <div style="font-size:64px; margin-bottom:16px;">🎉</div>
      <div class="title-main" style="margin-bottom:12px;">30秒快乐闯关</div>
      <div class="title-sub" style="margin-bottom:8px; max-width:280px;">
        AD钙奶30周年特别挑战！<br>
        30秒完成10个快闪互动<br>
        每一个都和AD钙奶有关！
      </div>
      <div style="margin:16px 0; display:flex; gap:8px; justify-content:center; align-items:center;">
        <img src="/images/ad-220.webp" alt="AD钙奶" style="height:80px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" />
        <img src="/images/ad-strawberry-220.webp" alt="草莓味" style="height:80px; filter:drop-shadow(0 4px 12px rgba(244,67,54,0.3));" />
        <img src="/images/ad-peach-220.webp" alt="蜜桃味" style="height:80px; filter:drop-shadow(0 4px 12px rgba(255,152,0,0.3));" />
      </div>
      <div style="margin:8px auto; max-width:300px; font-size:13px; color:var(--ad-text-light); line-height:1.8; text-align:left;">
        <div>🧴 拧瓶盖 · 插吸管 · 喝第一口</div>
        <div>🫧 摇钙奶 · 收集钙星 · 接住钙奶</div>
        <div>🏷️ 撕标签 · 吹蜡烛 · 拼logo · 找钙奶</div>
      </div>
      <button class="btn-primary btn-orange" id="btn-start-challenge" style="margin-top:16px;">
        开始挑战！
      </button>
    </div>
  `,e.querySelector("#btn-start-challenge")?.addEventListener("click",()=>{b(),t()})}function Ee(e,t){F=0,A=0,z=[],ee=[...be],Ae(e,()=>{Y(e,t)})}function Ae(e,t){let i=3;function n(){if(i<=0){t();return}ae(i===1),e.innerHTML=`
      <div class="challenge-countdown">
        <div class="countdown-number flip-number">${i}</div>
      </div>
    `,i--,setTimeout(n,800)}n()}function $e(e){return _[Math.floor(e/2)%_.length]}function Y(e,t){if(A>=10){t(F,z);return}const i=ee[A],n=$e(A);De(e,i,n);let a=3e3;const s=setInterval(()=>{a-=50;const o=e.querySelector(".challenge-timer-bar");if(o){const r=a/3e3*100;o.style.width=`${r}%`,r<30&&o.classList.add("urgent")}a<=0&&(clearInterval(s),Le(e,i,t))},50);B=setTimeout(()=>{},3500),Me(e,i,()=>{clearInterval(s),B&&clearTimeout(B),F++,z.push(!0),ne(),te(e,!0,i),setTimeout(()=>{A++,Y(e,t)},600)})}function De(e,t,i){const n=`style-${i}`,a=Array.from({length:10},(s,o)=>{let r="challenge-dot";return o<A&&(r+=z[o]?" success":" fail"),o===A&&(r+=" current"),`<div class="${r}"></div>`}).join("");e.innerHTML=`
    <div class="page ${n}">
      <div class="challenge-score-display">
        <span>得分</span>
        <span style="color:var(--ad-orange); font-size:24px;">${F}</span>
        <span>/ 10</span>
      </div>
      <div class="challenge-dots">${a}</div>
      <div style="font-size:11px; color:var(--ad-text-light); margin-bottom:8px;">
        ${xe[i]}
      </div>
      <div class="challenge-timer">
        <div class="challenge-timer-bar" style="width:100%"></div>
      </div>
      <div class="challenge-game-area" id="game-area">
        <div class="challenge-instruction">${t.instruction}</div>
        <div id="game-content">
          ${Te(t)}
        </div>
      </div>
    </div>
  `}function Te(e,t){switch(e.gesture){case"tap":return`
        <div class="mini-game-tap-area" id="tap-target" style="position:relative;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:90px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" />
          <div style="position:absolute; top:-8px; left:50%; transform:translateX(-50%); font-size:24px; animation:bounce 0.6s infinite;">🔄</div>
        </div>
        <div style="margin-top:12px; font-size:13px; color:var(--ad-green); font-weight:600;">点击瓶盖拧开！</div>
      `;case"swipe-down":return`
        <div style="position:relative; display:inline-block;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:80px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" />
          <div style="position:absolute; top:-30px; left:50%; transform:translateX(-50%); font-size:28px; animation:float-down 0.8s infinite;">🥤</div>
        </div>
        <div class="swipe-arrow down" style="font-size:36px; margin-top:12px;">⬇️</div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600;">向下滑动插入吸管</div>
      `;case"long-press":return e.id===8?`
          <div class="long-press-ring" id="long-press-target">
            <svg class="progress-ring" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="67" />
            </svg>
            <span style="position:relative; z-index:1; font-size:40px;">🎂</span>
          </div>
          <div style="margin-top:8px; font-size:12px; color:var(--ad-orange);">AD钙奶30岁啦！按住吹蜡烛</div>
        `:`
        <div class="long-press-ring" id="long-press-target">
          <svg class="progress-ring" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="67" />
          </svg>
          <span style="position:relative; z-index:1;">
            <img src="/images/ad-220.webp" alt="AD钙奶" style="height:48px;" />
          </span>
        </div>
        <div style="margin-top:8px; font-size:13px; color:var(--ad-green); font-weight:600;">按住吸管喝第一口！</div>
      `;case"shake-ud":return`
        <div style="position:relative; display:inline-block;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:80px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" id="shake-bottle" />
          <div style="position:absolute; top:50%; left:-30px; font-size:20px; animation:shake-left 0.5s infinite;">⬆️</div>
          <div style="position:absolute; bottom:0; left:-30px; font-size:20px; animation:shake-right 0.5s infinite 0.25s;">⬇️</div>
        </div>
        <div style="display:flex; gap:6px; margin-top:12px; justify-content:center;" id="shake-dots">
          ${[0,1,2,3].map(()=>'<div style="width:12px; height:12px; border-radius:50%; background:rgba(76,175,80,0.2); transition:background 0.2s;"></div>').join("")}
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600; margin-top:8px;">上下快速滑动摇匀！</div>
      `;case"multi-tap":return`
        <div class="mini-game-tap-area" id="multi-tap-target" style="width:120px; height:120px; font-size:44px; background:radial-gradient(circle, rgba(255,249,196,0.5) 0%, transparent 70%);">
          ⭐
        </div>
        <div style="font-size:11px; color:var(--ad-orange); margin-top:4px;">30周年限定钙星</div>
        <div class="multi-tap-counter" id="tap-counter">
          ${[0,1,2,3,4].map(()=>'<div class="multi-tap-dot"></div>').join("")}
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600; margin-top:4px;">连点5次收集钙星！</div>
      `;case"swipe-lr":return`
        <div style="position:relative; width:200px; height:120px; margin:0 auto;">
          <div style="position:absolute; top:0; left:50%; transform:translateX(-50%); font-size:28px; animation:fall-down 1.5s infinite;">
            <img src="/images/ad-220.webp" alt="AD钙奶" style="height:36px;" />
          </div>
          <div style="position:absolute; bottom:0; left:50%; transform:translateX(-50%); font-size:24px;">🧺</div>
        </div>
        <div style="display:flex; align-items:center; gap:16px; margin-top:8px; justify-content:center;">
          <span style="font-size:28px;">👈</span>
          <span style="font-size:28px;">👉</span>
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600;">左右滑动接住AD钙奶！</div>
      `;case"rapid-swipe":return`
        <div style="position:relative; display:inline-block;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:80px; filter:drop-shadow(0 4px 12px rgba(76,175,80,0.3));" />
          <div style="position:absolute; top:30%; right:-20px; font-size:20px; animation:wiggle 0.4s infinite;">🏷️</div>
        </div>
        <div style="display:flex; gap:6px; margin-top:12px; justify-content:center;" id="energy-bars">
          ${[0,1,2].map(()=>'<div style="width:50px; height:8px; background:rgba(76,175,80,0.2); border-radius:4px; overflow:hidden;"><div style="width:0%; height:100%; background:var(--ad-green); border-radius:4px; transition:width 0.2s;"></div></div>').join("")}
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600; margin-top:8px;">来回滑动撕开标签！</div>
      `;case"drag":return`
        <div style="display:flex; align-items:center; gap:20px; margin:16px 0;">
          <div class="drag-target" style="border:2px dashed var(--ad-green); border-radius:12px; padding:8px 16px; font-size:14px; color:var(--ad-green); font-weight:600;">
            AD钙奶<br><span style="font-size:20px;">30年</span>
          </div>
          <div class="drag-item" id="drag-item" style="cursor:grab; font-size:28px;">
            <img src="/images/ad-220.webp" alt="AD钙奶" style="height:40px;" />
          </div>
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600;">拖动AD钙奶logo到虚线框！</div>
      `;case"find-tap":return`
        <div class="find-area" id="find-area">
          ${Ce()}
        </div>
        <div style="font-size:13px; color:var(--ad-green); font-weight:600; margin-top:8px;">找到隐藏的AD钙奶！</div>
      `;default:return`<div style="font-size:48px;">${e.icon}</div>`}}function Ce(){const e=["/images/ad-220.webp","/images/ad-strawberry-220.webp","/images/ad-peach-220.webp"],t=e[Math.floor(Math.random()*e.length)],n=["🎒","📐","✏️","📚","🎒","🧸"].map((o,r)=>({emoji:o,x:15+r%3*30,y:20+Math.floor(r/3)*35,isTarget:!1})),a=25+Math.random()*50,s=25+Math.random()*50;return n.map(o=>`
    <div class="find-decoy" style="left:${o.x}%; top:${o.y}%;">${o.emoji}</div>
  `).join("")+`
    <div class="find-hidden-item" style="left:${a}%; top:${s}%;" data-target="true">
      <img src="${t}" alt="AD钙奶" style="height:32px;" />
    </div>
  `}let u=!1,q=null;function Me(e,t,i,n){u=!1,L={startTime:0,startX:0,startY:0,tapCount:0,lastTapTime:0,swipeCount:0,lastSwipeDir:"",isDragging:!1,dragStartX:0,dragStartY:0};const a=e.querySelector("#game-area");if(a){if(t.gesture==="tap"){const s=e.querySelector("#tap-target");s&&s.addEventListener("click",()=>{u||(u=!0,s.classList.add("tapped"),i())})}if(t.gesture==="swipe-down"){let s=0;a.addEventListener("touchstart",o=>{s=o.touches[0].clientY},{passive:!0}),a.addEventListener("touchend",o=>{if(u)return;o.changedTouches[0].clientY-s>50&&(u=!0,i())},{passive:!0}),a.addEventListener("mousedown",o=>{s=o.clientY}),a.addEventListener("mouseup",o=>{u||o.clientY-s>50&&(u=!0,i())})}if(t.gesture==="long-press"){const s=t.id===8?1e3:500,o=e.querySelector("#long-press-target"),r=e.querySelector(".progress-ring circle"),l=()=>{if(!u){if(r){const g=s,f=Date.now(),p=()=>{if(u)return;const v=Date.now()-f,m=Math.min(v/g,1);r.style.strokeDashoffset=String(440*(1-m)),m<1&&requestAnimationFrame(p)};requestAnimationFrame(p)}q=setTimeout(()=>{u||(u=!0,i())},s)}},c=()=>{q&&(clearTimeout(q),q=null),r&&(r.style.strokeDashoffset="440")};o&&(o.addEventListener("touchstart",d=>{d.preventDefault(),l()}),o.addEventListener("touchend",c),o.addEventListener("mousedown",l),o.addEventListener("mouseup",c),o.addEventListener("mouseleave",c))}if(t.gesture==="shake-ud"){let s=0,o=0,r="";const l=e.querySelectorAll("#shake-dots div");a.addEventListener("touchstart",d=>{s=d.touches[0].clientY},{passive:!0}),a.addEventListener("touchmove",d=>{if(u)return;const g=d.touches[0].clientY,f=g-s,p=f>0?"down":"up";if(p!==r&&Math.abs(f)>20){o++,r=p,s=g,R();const v=Math.min(o/6,1);l.forEach((m,E)=>{E<Math.floor(v*4)&&(m.style.background="var(--ad-green)")})}o>=6&&(u=!0,i())},{passive:!0});let c=!1;a.addEventListener("mousedown",d=>{c=!0,s=d.clientY}),a.addEventListener("mousemove",d=>{if(!c||u)return;const g=d.clientY,f=g-s,p=f>0?"down":"up";if(p!==r&&Math.abs(f)>20){o++,r=p,s=g;const v=Math.min(o/6,1);l.forEach((m,E)=>{E<Math.floor(v*4)&&(m.style.background="var(--ad-green)")})}o>=6&&(u=!0,i())}),a.addEventListener("mouseup",()=>{c=!1})}if(t.gesture==="multi-tap"){const s=e.querySelector("#multi-tap-target"),o=e.querySelectorAll("#tap-counter .multi-tap-dot");s&&s.addEventListener("click",()=>{u||(L.tapCount++,R(),o[L.tapCount-1]&&o[L.tapCount-1].classList.add("filled"),L.tapCount>=5&&(u=!0,i()))})}if(t.gesture==="swipe-lr"){let s=0,o=0,r="";a.addEventListener("touchstart",c=>{s=c.touches[0].clientX},{passive:!0}),a.addEventListener("touchmove",c=>{if(u)return;const d=c.touches[0].clientX,g=d-s,f=g>0?"right":"left";f!==r&&Math.abs(g)>20&&(o++,r=f,s=d),o>=2&&(u=!0,i())},{passive:!0});let l=!1;a.addEventListener("mousedown",c=>{l=!0,s=c.clientX}),a.addEventListener("mousemove",c=>{if(!l||u)return;const d=c.clientX,g=d-s,f=g>0?"right":"left";f!==r&&Math.abs(g)>20&&(o++,r=f,s=d),o>=2&&(u=!0,i())}),a.addEventListener("mouseup",()=>{l=!1})}if(t.gesture==="rapid-swipe"){let s=0,o=0;const r=e.querySelectorAll("#energy-bars div > div");a.addEventListener("touchstart",c=>{s=c.touches[0].clientX},{passive:!0}),a.addEventListener("touchmove",c=>{if(u)return;const d=c.touches[0].clientX;if(Math.abs(d-s)>30){o++,s=d,R();const f=Math.min(o/8,1);r.forEach((p,v)=>{const m=Math.min(f*3-v,1)*100;p.style.width=`${Math.max(0,m)}%`}),o>=8&&(u=!0,i())}},{passive:!0});let l=!1;a.addEventListener("mousedown",c=>{l=!0,s=c.clientX}),a.addEventListener("mousemove",c=>{if(!l||u)return;const d=c.clientX;if(Math.abs(d-s)>30){o++,s=d;const f=Math.min(o/8,1);r.forEach((p,v)=>{const m=Math.min(f*3-v,1)*100;p.style.width=`${Math.max(0,m)}%`}),o>=8&&(u=!0,i())}}),a.addEventListener("mouseup",()=>{l=!1})}if(t.gesture==="drag"){const s=e.querySelector("#drag-item"),o=e.querySelector(".drag-target");if(s&&o){let r=!1,l=0,c=0;const d=(p,v)=>{if(!r||u)return;s.style.position="fixed",s.style.left=`${p-l}px`,s.style.top=`${v-c}px`,s.style.zIndex="100";const m=o.getBoundingClientRect(),E=s.getBoundingClientRect();Math.hypot(m.left+m.width/2-(E.left+E.width/2),m.top+m.height/2-(E.top+E.height/2))<60&&(u=!0,r=!1,i())},g=p=>d(p.clientX,p.clientY),f=()=>{r=!1,document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",f)};s.addEventListener("touchstart",p=>{p.preventDefault(),r=!0;const v=s.getBoundingClientRect();l=p.touches[0].clientX-v.left,c=p.touches[0].clientY-v.top}),s.addEventListener("touchmove",p=>{p.preventDefault(),d(p.touches[0].clientX,p.touches[0].clientY)},{passive:!1}),s.addEventListener("touchend",()=>{r=!1}),s.addEventListener("mousedown",p=>{r=!0;const v=s.getBoundingClientRect();l=p.clientX-v.left,c=p.clientY-v.top,document.addEventListener("mousemove",g),document.addEventListener("mouseup",f)})}}if(t.gesture==="find-tap"){const s=e.querySelector("#find-area");s&&s.addEventListener("click",o=>{if(u)return;const r=o.target;if(r.dataset.target==="true"||r.closest('[data-target="true"]')){u=!0;const l=r.closest('[data-target="true"]')||r;l.style.transform="scale(2)",l.style.transition="transform 0.3s",i()}else r.classList.add("shake"),setTimeout(()=>r.classList.remove("shake"),400)})}}}const G=["🥛","✨","🎉","💚","🫧","🧴"];function te(e,t,i){const n=e.querySelector("#game-area");if(n)if(t){n.classList.add("success-flash");const a=document.createElement("div");a.className="feedback-emoji",a.style.fontSize="60px";const s=(i.id-1)%G.length;a.textContent=G[s],document.body.appendChild(a),setTimeout(()=>a.remove(),600)}else{const a=document.createElement("div");a.className="fail-text",a.textContent=i.failText,a.style.left="50%",a.style.top="50%",a.style.transform="translate(-50%, -50%)",n.appendChild(a),setTimeout(()=>a.remove(),1200)}}function Le(e,t,i){u||(u=!0,z.push(!1),oe(),te(e,!1,t),setTimeout(()=>{A++,Y(e,i)},800))}function ze(e,t,i,n){const a=ke(t);W(),e.innerHTML=`
    <div class="page" style="justify-content: center;">
      <div class="result-card">
        <div style="font-size:14px; color:var(--ad-text-light); margin-bottom:8px;">30秒挑战完成！</div>
        <div class="result-age" style="font-size:48px;">${t}<span class="result-unit" style="font-size:18px;">/10</span></div>
        <div style="font-size:48px; margin:16px 0;">${a.emoji}</div>
        <div class="result-label">${a.label}</div>
        <div style="margin:16px auto 0; display:flex; gap:6px; justify-content:center; align-items:center;">
          <img src="/images/ad-220.webp" alt="AD钙奶" style="height:50px; filter:drop-shadow(0 2px 6px rgba(76,175,80,0.3));" />
          <img src="/images/ad-strawberry-220.webp" alt="草莓味" style="height:50px; filter:drop-shadow(0 2px 6px rgba(244,67,54,0.3));" />
          <img src="/images/ad-peach-220.webp" alt="蜜桃味" style="height:50px; filter:drop-shadow(0 2px 6px rgba(255,152,0,0.3));" />
        </div>
        <div style="margin-top:12px; display:flex; gap:4px; justify-content:center; flex-wrap:wrap;">
          ${i.map(s=>`
            <div style="width:24px; height:24px; border-radius:50%; background:${s?"var(--ad-green)":"#F44336"}; display:flex; align-items:center; justify-content:center; color:white; font-size:11px; font-weight:700;">
              ${s?"✓":"✗"}
            </div>
          `).join("")}
        </div>
        <div style="font-size:13px; color:var(--ad-text-light); margin-top:12px; line-height:1.6;">
          ${Se(t)}
        </div>
      </div>
      <div style="margin-top:32px; width:100%; max-width:340px;">
        <button class="btn-primary w-full" id="btn-to-profile">
          生成我的快乐档案 📋
        </button>
      </div>
    </div>
  `,t>=7&&setTimeout(()=>{const s=document.createElement("div");s.className="confetti-burst",document.body.appendChild(s);const o=["#4CAF50","#FF9800","#FFF9C4","#81C784","#FFCDD2"];for(let r=0;r<30;r++){const l=document.createElement("div");l.className="confetti-piece",l.style.backgroundColor=o[Math.floor(Math.random()*o.length)];const c=Math.PI*2*r/30,d=80+Math.random()*100;l.style.setProperty("--tx",`${Math.cos(c)*d}px`),l.style.setProperty("--ty",`${Math.sin(c)*d-50}px`),l.style.setProperty("--rot",`${Math.random()*720-360}deg`),l.style.setProperty("--dur",`${.8+Math.random()*.5}s`),s.appendChild(l)}setTimeout(()=>s.remove(),1500)},300),e.querySelector("#btn-to-profile")?.addEventListener("click",()=>{b(),n("profile",{challengeScore:t,challengeRating:a.label})})}function ke(e){return e>=10?{label:"快乐万岁·传说级",emoji:"🏆"}:e>=7?{label:"快乐王者",emoji:"👑"}:e>=4?{label:"快乐达人",emoji:"🌟"}:{label:"快乐新手",emoji:"🌱"}}function Se(e){return e>=10?"满分通关！你就是快乐本乐，AD钙奶30周年快乐大使非你莫属！":e>=7?"太厉害了！你和AD钙奶的默契一流，是名副其实的快乐王者！":e>=4?"不错的表现！你对AD钙奶还是很有感情的，继续加油！":"没关系，快乐从来不需要考核，先喝瓶AD钙奶压压惊！"}const je="modulepreload",qe=function(e){return"/"+e},H={},Fe=function(t,i,n){let a=Promise.resolve();if(i&&i.length>0){let c=function(d){return Promise.all(d.map(g=>Promise.resolve(g).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var o=c;document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),l=r?.nonce||r?.getAttribute("nonce");a=c(i.map(d=>{if(d=qe(d),d in H)return;H[d]=!0;const g=d.endsWith(".css"),f=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${f}`))return;const p=document.createElement("link");if(p.rel=g?"stylesheet":je,g||(p.as="script"),p.crossOrigin="",p.href=d,l&&p.setAttribute("nonce",l),document.head.appendChild(p),g)return new Promise((v,m)=>{p.addEventListener("load",v),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(r){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=r,window.dispatchEvent(l),!l.defaultPrevented)throw r}return a.then(r=>{for(const l of r||[])l.status==="rejected"&&s(l.reason);return t().catch(s)})},Pe=["酸甜派·行动派","可可爱爱·闷骚型","元气满满·社交牛","温柔系·佛系派","热血派·冒险型","佛系青年·快乐本乐","调皮鬼·机智型","暖心宝·治愈系"],U=["不管几岁，快乐万岁！愿你永远保持那颗爱笑的童心，像第一口AD钙奶一样甜！","30年的陪伴，30年的快乐。愿你的每一天都像打开一瓶新AD钙奶，充满期待！","时光可以改变很多事，但改变不了你嘴角上扬的弧度。快乐万岁，永远年轻！","从1996到2026，快乐从未缺席。愿接下来的每一天，都有AD钙奶般的甜蜜！","快乐不分年龄，童心不设期限。30周年快乐，愿你的笑容比阳光还灿烂！"],Re={0:"ad-strawberry-220",1:"ad-peach-220",2:"ad-lactic-450",3:"ad-450",4:"ad-collagen-450",5:"ad-220",6:"ad-strawberry-450",7:"ad-peach-450"};function Be(e){const t=e.quizAnswers||[],i=e.challengeScore||0;let n=0;t.forEach(o=>{o===2&&n++});let a=0;n>=3&&i>=7?a=0:n>=3&&i<7?a=1:n>=2&&i>=7?a=2:n>=2&&i<4?a=3:i>=9?a=4:i<3?a=5:n>=1?a=6:a=7;const s=(t.reduce((o,r)=>o+r,0)+i)%U.length;return{personalityTag:Pe[a],blessing:U[s],productKey:Re[a]}}function Ie(e,t,i){W();const n=Be(t);e.innerHTML=`
    <div class="page" style="justify-content: center; padding-top: calc(10px + var(--ad-safe-top));">
      <div style="font-size:14px; color:var(--ad-text-light); margin-bottom:16px;">— 我的快乐档案 —</div>
      <div class="profile-card" id="profile-card">
        <!-- Pixel decorations -->
        <div class="pixel-deco top-left"></div>
        <div class="pixel-deco top-right"></div>
        <div class="pixel-deco bottom-left"></div>
        <div class="pixel-deco bottom-right"></div>

        <!-- Product Image -->
        <div style="display:flex; justify-content:center; margin-bottom:8px;">
          <img
            src="${P[n.productKey]}"
            alt="AD钙奶"
            width="80"
            style="filter:drop-shadow(0 2px 8px rgba(76,175,80,0.2));"
            crossorigin="anonymous"
          />
        </div>

        <!-- Happy Age -->
        <div style="text-align:center; margin-bottom:12px;">
          <div style="font-size:13px; color:var(--ad-text-light);">快乐年龄</div>
          <div style="font-size:36px; font-weight:900; color:var(--ad-green); line-height:1.1;">
            ${t.happyAge}<span style="font-size:16px;">岁</span>
          </div>
          <div style="font-size:14px; color:var(--ad-orange); font-weight:700;">${t.happyLabel}</div>
        </div>

        <!-- Fields -->
        <div class="profile-field">
          <div class="profile-field-label">🎮 快乐等级</div>
          <div class="profile-field-value">${t.challengeRating}</div>
        </div>
        <div class="profile-field">
          <div class="profile-field-label">💫 快乐人格</div>
          <div class="profile-field-value">${n.personalityTag}</div>
        </div>

        <!-- Blessing -->
        <div class="profile-blessing">
          "${n.blessing}"
        </div>

        <!-- Footer -->
        <div class="profile-footer">
          AD钙奶30周年<br>不管几岁 快乐万岁
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="margin-top:24px; width:100%; max-width:340px;">
        <button class="btn-primary w-full" id="btn-save" style="margin-bottom:12px;">
          📸 保存快乐档案
        </button>
        <div class="share-buttons">
          <button class="share-btn wechat" id="btn-wechat">💬 微信</button>
          <button class="share-btn weibo" id="btn-weibo">📢 微博</button>
          <button class="share-btn save" id="btn-save-img">💾 保存图片</button>
        </div>
      </div>

      <!-- Hidden Easter Egg Link -->
      <div style="margin-top:24px; text-align:center;">
        <button id="btn-easter-egg" style="background:none; border:none; font-size:12px; color:var(--ad-green-light); cursor:pointer; padding:8px 16px;">
          🎁 分享后解锁30周年经典回忆
        </button>
      </div>
    </div>
  `,e.querySelector("#btn-save")?.addEventListener("click",()=>{b(),Q()}),e.querySelector("#btn-save-img")?.addEventListener("click",()=>{b(),Q()}),e.querySelector("#btn-wechat")?.addEventListener("click",()=>{b(),Xe()}),e.querySelector("#btn-weibo")?.addEventListener("click",()=>{b(),Ne()}),e.querySelector("#btn-easter-egg")?.addEventListener("click",()=>{x(),i("easter-egg",{personalityTag:n.personalityTag,blessing:n.blessing})})}async function Q(){const e=document.getElementById("profile-card");if(e)try{const t=(await Fe(async()=>{const{default:n}=await import("./html2canvas.esm-DXEQVQnt.js");return{default:n}},[])).default;(await t(e,{backgroundColor:"#FFF8E1",scale:2,useCORS:!0,logging:!1})).toBlob(n=>{if(!n)return;const a=URL.createObjectURL(n),s=document.createElement("a");s.href=a,s.download="AD钙奶30周年-快乐档案.png",document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a)},"image/png")}catch(t){console.error("Save image failed:",t),N("长按档案卡图片可保存到相册")}}function Xe(){navigator.share?navigator.share({title:"AD钙奶30周年 · 不管几岁 快乐万岁",text:"我测出了我的快乐年龄，你也来试试！",url:window.location.href}).catch(()=>{N("请截图分享到微信朋友圈")}):N("请截图分享到微信朋友圈")}function Ne(){const e=encodeURIComponent("AD钙奶30周年 · 不管几岁 快乐万岁！我测出了我的快乐年龄，你也来试试！"),t=encodeURIComponent(window.location.href);window.open(`https://service.weibo.com/share/share.php?title=${e}&url=${t}`,"_blank")}function N(e){const t=document.createElement("div");t.style.cssText=`
    position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.75); color: white; padding: 16px 24px;
    border-radius: 12px; font-size: 14px; z-index: 200;
    animation: overlay-in 0.3s ease-out;
  `,t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),2500)}function Oe(e,t){x();const i=[{year:"1996",slogan:"AD钙奶 最初的快乐",flavor:"ad-220",bg:"#E8F5E9"},{year:"2000",slogan:"酸酸甜甜就是我",flavor:"ad-450",bg:"#FFF8E1"},{year:"2005",slogan:"喝AD钙奶 做快乐宝贝",flavor:"ad-strawberry-220",bg:"#FFEBEE"},{year:"2010",slogan:"AD钙奶 陪伴成长每一天",flavor:"ad-peach-220",bg:"#FFF3E0"},{year:"2018",slogan:"新口味 新快乐",flavor:"ad-lactic-450",bg:"#E3F2FD"},{year:"2026",slogan:"不管几岁 快乐万岁",flavor:"ad-collagen-450",bg:"#E8F5E9"}];e.innerHTML=`
    <div class="page">
      <div style="font-size:14px; color:var(--ad-text-light); margin-bottom:16px;">🎁 30周年经典回忆</div>
      <div class="title-main" style="font-size:22px; margin-bottom:20px;">AD钙奶 · 30年快乐回忆</div>
      <div class="easter-egg-page" style="overflow-y:auto; max-height:70vh; padding-bottom:80px;">
        ${i.map((n,a)=>`
          <div class="ad-frame" style="background:${n.bg}; animation-delay:${a*.2}s;">
            <div class="ad-year">${n.year}</div>
            <div class="ad-slogan">${n.slogan}</div>
            <div style="display:flex; justify-content:center; margin:8px 0;">
              <img src="${P[n.flavor]}" alt="AD钙奶${n.year}" width="50" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1));" />
            </div>
            <div style="position:absolute; bottom:8px; right:12px; font-size:11px; color:rgba(0,0,0,0.2); font-weight:700;">
              AD钙奶® ${n.year}
            </div>
          </div>
        `).join("")}
      </div>
      <div style="position:fixed; bottom: calc(20px + var(--ad-safe-bottom)); left:50%; transform:translateX(-50%); z-index:10;">
        <button class="btn-secondary" id="btn-back-profile">
          ← 返回快乐档案
        </button>
      </div>
    </div>
  `,e.querySelector("#btn-back-profile")?.addEventListener("click",()=>{b(),t()})}const y={stage:"intro",quizAnswers:[],happyAge:0,happyLabel:"",challengeScore:0,challengeRating:"",challengeResults:[],personalityTag:"",blessing:""};let T=null;function K(){if(T=document.getElementById("app"),!T){console.error("App container not found");return}de(T),w("intro")}function w(e,t=!0){if(!T)return;y.stage=e;const i=T.querySelector(".stage-content");i?t?(i.classList.add("page-exit"),setTimeout(()=>{i.remove(),I(e)},300)):(i.remove(),I(e)):I(e)}function I(e){if(!T)return;const t=document.createElement("div");switch(t.className="stage-content",T.appendChild(t),e){case"intro":Ye(t);break;case"quiz":Ge(t);break;case"quiz-result":He(t);break;case"challenge-intro":Ue(t);break;case"challenge":Qe(t);break;case"challenge-result":Ke(t);break;case"profile":Ve(t);break;case"easter-egg":We(t);break}}function Ye(e){e.innerHTML=`
    <div class="page" style="justify-content: center;">
      <div style="font-size:13px; color:var(--ad-green); font-weight:600; letter-spacing:4px; margin-bottom:8px;">
        AD钙奶30周年
      </div>
      <div class="title-main" style="margin-bottom:4px;">
        不管几岁
      </div>
      <div class="title-main" style="color:var(--ad-orange);">
        快乐万岁
      </div>
      <div style="width:40px; height:3px; background:var(--ad-green); border-radius:2px; margin:16px auto;"></div>
      <div id="desk-scene-area"></div>
      <div style="margin-top:24px; font-size:12px; color:var(--ad-text-light); text-align:center; line-height:1.6;">
        点击瓶盖开启你的快乐之旅<br>
        🥛 30周年特别企划 🥛
      </div>
    </div>
  `;const t=e.querySelector("#desk-scene-area");if(t){t.innerHTML=ce();const i=t.querySelector("#intro-bottle");i&&i.addEventListener("click",()=>{_e(e)})}}function _e(e){x(),S(e,()=>{w("quiz")})}function Ge(e){ge(e,t=>{y.quizAnswers=t;const i=J(t);y.happyAge=i.age,y.happyLabel=i.label,S(e,()=>{w("quiz-result",!1)})})}function He(e){fe(e,y.quizAnswers,(t,i)=>{Object.assign(y,i),S(e,()=>{w(t)})})}function Ue(e){we(e,()=>{w("challenge")})}function Qe(e){Ee(e,(t,i)=>{y.challengeScore=t,y.challengeResults=i;const n=Je(t);y.challengeRating=n,S(e,()=>{w("challenge-result",!1)})})}function Ke(e){ze(e,y.challengeScore,y.challengeResults,(t,i)=>{Object.assign(y,i),S(e,()=>{w(t)})})}function Ve(e){Ie(e,y,(t,i)=>{Object.assign(y,i),t==="easter-egg"&&w(t)})}function We(e){Oe(e,()=>{w("profile")})}function Je(e){return e>=10?"快乐万岁·传说级":e>=7?"快乐王者":e>=4?"快乐达人":"快乐新手"}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",K):K();
