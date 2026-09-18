(()=>{
  const svgURI = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
  const cell=(x,y,body)=>`<g transform="translate(${x*128} ${y*128})">${body}</g>`;
  const human=(kind,front=true,step=0,flip=false)=>{
    const just=kind==='j', skin=just?'#d99a78':'#c98b68', hair=just?'#5a3021':'#241b18';
    const top=just?'#2d3030':'#4b4037', pants=just?'#5e644b':'#9b8058', pack='#6d5437';
    const leg=step?5:-3, arm=step?8:-6;
    return `<g ${flip?'transform="translate(128 0) scale(-1 1)"':''}>
      <ellipse cx="64" cy="112" rx="28" ry="8" fill="#000" opacity=".25"/>
      ${front?`<path d="M42 38 Q64 ${just?10:18} 86 38 L84 61 Q64 49 44 61Z" fill="${hair}"/>`:`<path d="M39 31 Q64 7 89 31 L88 68 Q64 79 40 68Z" fill="${hair}"/>`}
      <circle cx="64" cy="42" r="18" fill="${skin}"/>
      ${front&&!just?'<path d="M48 48 Q64 64 80 48 Q78 61 64 64 Q50 61 48 48Z" fill="#30221c"/>':''}
      ${front&&just?'<path d="M43 30 Q30 60 39 93 M85 30 Q98 60 89 93" stroke="#5a3021" stroke-width="9" fill="none" stroke-linecap="round"/>':''}
      ${!front?`<rect x="43" y="50" width="42" height="38" rx="9" fill="${pack}"/><path d="M49 54 V84 M79 54 V84" stroke="#a58a5c" stroke-width="4"/>`:''}
      <rect x="43" y="57" width="42" height="42" rx="10" fill="${top}"/>
      <path d="M43 65 Q32 ${70+arm/3} 29 91" stroke="${skin}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M85 65 Q96 ${70-arm/3} 99 91" stroke="${skin}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <rect x="47" y="94" width="15" height="27" rx="6" fill="${pants}" transform="rotate(${leg} 54 94)"/>
      <rect x="66" y="94" width="15" height="27" rx="6" fill="${pants}" transform="rotate(${-leg} 74 94)"/>
      <path d="M44 118 h20 v7 H42z M65 118 h21 v7 H64z" fill="#35291f"/>
      <path d="M44 79 H84" stroke="#ad8751" stroke-width="5"/>
      ${front?'<circle cx="58" cy="41" r="2"/><circle cx="70" cy="41" r="2"/>':''}
    </g>`;
  };
  const dog=(front=true,step=0,flip=false)=>`<g ${flip?'transform="translate(128 0) scale(-1 1)"':''}>
    <ellipse cx="64" cy="109" rx="31" ry="8" fill="#000" opacity=".22"/>
    <ellipse cx="64" cy="73" rx="34" ry="28" fill="#17191a"/>
    ${front?'<path d="M50 45 L40 23 L58 35 M78 45 L88 23 L70 35" fill="#17191a"/><path d="M56 42 Q64 32 72 42 L70 76 Q64 83 58 76Z" fill="#f1eee4"/><circle cx="56" cy="52" r="3" fill="#b87932"/><circle cx="72" cy="52" r="3" fill="#b87932"/><circle cx="64" cy="65" r="4"/>':'<path d="M50 45 L40 23 L58 35 M78 45 L88 23 L70 35" fill="#17191a"/><path d="M57 41 Q64 33 71 41 L73 72 Q64 78 55 72Z" fill="#f1eee4"/>'}
    <path d="M38 65 H90" stroke="#8d6a3d" stroke-width="7"/><rect x="51" y="62" width="26" height="21" rx="5" fill="#705231"/>
    <path d="M47 91 v${20+(step?3:0)} M60 93 v${18-(step?2:0)} M72 93 v${18+(step?2:0)} M84 91 v${20-(step?3:0)}" stroke="#f1eee4" stroke-width="9" stroke-linecap="round"/>
    <path d="M92 73 Q114 ${58+(step?7:0)} 105 42" stroke="#17191a" stroke-width="12" fill="none" stroke-linecap="round"/>
  </g>`;
  const sheetHuman = kind => `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="256" viewBox="0 0 512 256">${cell(0,0,human(kind,true,0))}${cell(1,0,human(kind,true,1))}${cell(2,0,human(kind,false,0))}${cell(3,0,human(kind,false,1))}${cell(0,1,human(kind,true,0,false))}${cell(1,1,human(kind,true,1,false))}${cell(2,1,human(kind,true,0,true))}${cell(3,1,human(kind,true,1,true))}</svg>`;
  const sheetDog = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="256" viewBox="0 0 512 256">${cell(0,0,dog(true,0))}${cell(1,0,dog(true,1))}${cell(2,0,dog(false,0))}${cell(3,0,dog(false,1))}${cell(0,1,dog(true,0))}${cell(1,1,dog(true,1))}${cell(2,1,dog(true,0,true))}${cell(3,1,dog(true,1,true))}</svg>`;
  window.__sqSprites={justine:svgURI(sheetHuman('j')),guillaume:svgURI(sheetHuman('g')),syrachi:svgURI(sheetDog)};

  fetch('game.js',{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('game.js');return r.text()}).then(code=>{
    code=code.replace(/const parts=await Promise\.all\(\[0,1,2,3,4\][\s\S]*?\[IMG\.justineSprite,IMG\.guillaumeSprite,IMG\.syrachiSprite\]=await Promise\.all\(\[spriteFromB64\(jb\),spriteFromB64\(gb\),spriteFromB64\(db\)\]\);/,"[IMG.justineSprite,IMG.guillaumeSprite,IMG.syrachiSprite]=await Promise.all([preload(window.__sqSprites.justine),preload(window.__sqSprites.guillaume),preload(window.__sqSprites.syrachi)]);");
    code=code.replace('b.dogUsed?.04:0','b.dogUsed?0.04:0');
    (0,eval)(code);
  }).catch(e=>{console.error(e);const l=document.getElementById('loading');if(l)l.textContent='Erreur de chargement — recharge la page.'});
})();