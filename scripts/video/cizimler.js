// Kendi 2B SVG çizimlerimiz (emoji ve hazır ikon kütüphanesi yok). Düz renk, kalın siyah kontur.
// Node: require('./cizimler').svg(ad|emoji, boy) → işaretleme. Tarayıcı: sayfaya gömülür → window.CZ.anim(el, lt)
// Her çizim "canlı": lt (öğe göründükten sonraki saniye) ile durum değiştirir (ampul yanar, kilit kapanır…).
(function (root) {
  const K = '#151515', R = '#E8402F', Y = '#F6B92B', G = '#1E9E6A', B = '#FFFFFF', S = '#E9E6E0', M = '#8B8E95';
  const st = (w = 7) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const C = {
    ampul: () => `<g class="isin" opacity="0">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="100" y1="16" x2="100" y2="4" ${st(7)} stroke="${Y}" transform="rotate(${a} 100 84)"/>`).join('')}</g>
      <path class="cam" d="M100 28 C66 28 46 52 46 82 C46 104 60 116 70 128 L70 146 L130 146 L130 128 C140 116 154 104 154 82 C154 52 134 28 100 28Z" fill="${S}" ${st()}/>
      <path class="tel" d="M84 128 L84 98 L92 88 L100 98 L108 88 L116 98 L116 128" fill="none" ${st(5)}/>
      <rect x="72" y="146" width="56" height="16" rx="5" fill="${M}" ${st(6)}/><rect x="78" y="162" width="44" height="14" rx="5" fill="${M}" ${st(6)}/><path d="M90 176 L110 176 L104 186 L96 186Z" fill="${K}"/>
      <path class="parla" d="M70 70 Q74 52 92 46" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="0"/>`,
    kilit: () => `<path class="kanca" d="M62 92 L62 66 C62 22 138 22 138 66 L138 92" fill="none" ${st(16)}/><path class="kanca2" d="M62 92 L62 66 C62 22 138 22 138 66 L138 92" fill="none" stroke="${M}" stroke-width="5" stroke-linecap="round"/>
      <rect class="govde" x="40" y="88" width="120" height="96" rx="20" fill="${Y}" ${st()}/><circle cx="100" cy="128" r="12" fill="${K}"/><rect x="95" y="132" width="10" height="26" rx="4" fill="${K}"/>`,
    kalkan: () => `<defs><clipPath id="kc_ID"><path d="M100 18 L164 42 L164 96 C164 140 136 168 100 184 C64 168 36 140 36 96 L36 42Z"/></clipPath></defs>
      <path d="M100 18 L164 42 L164 96 C164 140 136 168 100 184 C64 168 36 140 36 96 L36 42Z" fill="${B}"/>
      <rect class="dolu" x="20" y="190" width="160" height="180" fill="${G}" clip-path="url(#kc_ID)"/>
      <path d="M100 18 L164 42 L164 96 C164 140 136 168 100 184 C64 168 36 140 36 96 L36 42Z" fill="none" ${st()}/>
      <path class="tik" d="M68 100 L92 124 L136 78" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`,
    para: () => `<g class="don"><circle cx="100" cy="100" r="72" fill="${Y}" ${st()}/><circle cx="100" cy="100" r="52" fill="none" stroke="#D99A12" stroke-width="7"/>
      <text x="100" y="128" text-anchor="middle" font-family="Archivo,Arial Black,sans-serif" font-weight="900" font-size="82" fill="${K}">₺</text></g>
      <path class="parla" d="M60 70 Q66 50 86 42" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`,
    ev: () => `<g class="duman" fill="${S}" ${st(5)}><circle cx="142" cy="30" r="9"/><circle cx="150" cy="14" r="7"/></g><rect x="132" y="34" width="20" height="36" fill="${M}" ${st(6)}/>
      <path d="M22 98 L100 30 L178 98" fill="${R}" ${st()}/><rect x="42" y="94" width="116" height="86" fill="${B}" ${st()}/>
      <rect x="84" y="124" width="32" height="56" rx="4" fill="${M}" ${st(6)}/><rect class="pen" x="54" y="110" width="22" height="22" rx="3" fill="${S}" ${st(5)}/><rect class="pen" x="124" y="110" width="22" height="22" rx="3" fill="${S}" ${st(5)}/>`,
    bina: () => `<rect x="44" y="26" width="112" height="160" rx="6" fill="${B}" ${st()}/><rect x="84" y="150" width="32" height="36" fill="${M}" ${st(6)}/>
      ${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => `<rect class="pen" x="${58 + c * 30}" y="${40 + r * 26}" width="20" height="16" rx="2" fill="${S}" ${st(4)}/>`).join('')).join('')}`,
    banka: () => `<path d="M24 74 L100 26 L176 74Z" fill="${R}" ${st()}/><rect x="30" y="74" width="140" height="14" fill="${B}" ${st(6)}/>
      ${[0, 1, 2, 3].map(i => `<rect class="kolon" x="${44 + i * 32}" y="94" width="16" height="64" fill="${B}" ${st(6)}/>`).join('')}<rect x="24" y="160" width="152" height="20" rx="3" fill="${M}" ${st(6)}/>`,
    kimlik: () => `<rect x="18" y="44" width="164" height="112" rx="14" fill="${B}" ${st()}/><rect x="18" y="44" width="164" height="26" rx="12" fill="${R}" ${st(6)}/>
      <circle cx="62" cy="106" r="22" fill="${S}" ${st(6)}/><path d="M40 146 Q62 118 84 146" fill="${S}" ${st(6)}/>
      <rect x="98" y="88" width="66" height="10" rx="5" fill="${K}"/><rect x="98" y="108" width="52" height="10" rx="5" fill="${M}"/><rect x="98" y="128" width="60" height="10" rx="5" fill="${M}"/>
      <rect class="tarama" x="22" y="74" width="156" height="6" fill="${R}" opacity="0"/>`,
    zarf: () => `<rect class="kagit" x="48" y="70" width="104" height="90" rx="6" fill="${B}" ${st(6)}/><g class="kagit"><rect x="62" y="86" width="60" height="8" rx="4" fill="${M}"/><rect x="62" y="102" width="76" height="8" rx="4" fill="${M}"/></g>
      <path d="M26 82 L100 132 L174 82 L174 168 L26 168Z" fill="${Y}" ${st()}/><path d="M26 168 L84 120 M174 168 L116 120" ${st(6)}/>
      <path class="kapak" d="M26 82 L100 132 L174 82Z" fill="#E2A21C" ${st()}/>`,
    takvim: () => `<rect x="30" y="40" width="140" height="144" rx="14" fill="${B}" ${st()}/><rect x="30" y="40" width="140" height="36" rx="12" fill="${R}" ${st(6)}/>
      <rect x="60" y="24" width="12" height="30" rx="6" fill="${K}"/><rect x="128" y="24" width="12" height="30" rx="6" fill="${K}"/>
      <text class="gun" x="100" y="160" text-anchor="middle" font-family="Archivo,Arial Black,sans-serif" font-weight="900" font-size="74" fill="${K}">30</text>
      <path class="yaprak" d="M30 76 L170 76 L170 184 L30 184Z" fill="${B}" ${st(6)} opacity="0"/>`,
    saat: () => `<circle cx="100" cy="106" r="74" fill="${B}" ${st()}/><rect x="88" y="16" width="24" height="16" rx="4" fill="${K}"/>
      ${Array.from({ length: 12 }, (_, i) => `<line x1="100" y1="42" x2="100" y2="${i % 3 ? 50 : 56}" ${st(5)} transform="rotate(${i * 30} 100 106)"/>`).join('')}
      <path class="dilim" d="" fill="${R}" opacity=".9"/><line class="akrep" x1="100" y1="106" x2="100" y2="60" ${st(8)}/><circle cx="100" cy="106" r="8" fill="${K}"/>`,
    terazi: () => `<rect x="94" y="40" width="12" height="124" fill="${K}"/><path d="M60 178 L140 178 L124 160 L76 160Z" fill="${M}" ${st(6)}/>
      <g class="kol"><line x1="34" y1="52" x2="166" y2="52" ${st(9)}/><g class="sol"><path d="M34 52 L14 106 M34 52 L54 106" ${st(4)}/><path d="M8 106 L60 106 Q34 132 8 106Z" fill="${Y}" ${st(6)}/></g>
      <g class="sag"><path d="M166 52 L146 106 M166 52 L186 106" ${st(4)}/><path d="M140 106 L192 106 Q166 132 140 106Z" fill="${Y}" ${st(6)}/></g></g><circle cx="100" cy="46" r="12" fill="${R}" ${st(6)}/>`,
    belge: () => `<path d="M46 18 L124 18 L158 52 L158 184 L46 184Z" fill="${B}" ${st()}/><path d="M124 18 L124 52 L158 52" fill="${S}" ${st(6)}/>
      ${[0, 1, 2, 3, 4].map(i => `<rect class="sat" x="64" y="${70 + i * 20}" width="${i % 2 ? 60 : 76}" height="9" rx="4" fill="${M}"/>`).join('')}
      <g class="muhur" opacity="0"><circle cx="126" cy="152" r="26" fill="none" stroke="${R}" stroke-width="7"/><path d="M114 152 L124 162 L140 142" fill="none" stroke="${R}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`,
    telefon: () => `<g class="titre"><rect x="54" y="16" width="92" height="170" rx="18" fill="${K}"/><rect x="62" y="34" width="76" height="134" rx="6" fill="${B}"/><rect x="88" y="22" width="24" height="5" rx="2.5" fill="${M}"/>
      <g class="bild" opacity="0"><rect x="68" y="52" width="64" height="30" rx="8" fill="${R}"/><rect x="76" y="61" width="36" height="5" rx="2.5" fill="#fff"/><rect x="76" y="70" width="24" height="5" rx="2.5" fill="#fff"/></g></g>`,
    buyutec: () => `<g class="gez"><line x1="124" y1="124" x2="174" y2="174" ${st(18)}/><circle cx="88" cy="88" r="52" fill="#DDF1F7" ${st(9)}/><path d="M60 72 Q68 52 90 48" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/></g>`,
    yasak: () => `<circle cx="100" cy="100" r="74" fill="${B}" stroke="${R}" stroke-width="20"/><line class="cizgi" x1="48" y1="152" x2="152" y2="48" stroke="${R}" stroke-width="20" stroke-linecap="round"/>`,
    uyari: () => `<path d="M100 22 L182 170 L18 170Z" fill="${Y}" ${st(9)}/><g class="unlem"><rect x="91" y="70" width="18" height="58" rx="9" fill="${K}"/><circle cx="100" cy="148" r="10" fill="${K}"/></g>`,
    grafik: () => `<path d="M30 26 L30 172 L176 172" fill="none" ${st(8)}/><path class="egri" d="M40 150 L76 118 L104 132 L140 76 L168 52" fill="none" stroke="${R}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="uc" d="M146 46 L172 48 L168 74" fill="none" stroke="${R}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>`,
    tik: () => `<circle cx="100" cy="100" r="78" fill="${G}" ${st(7)}/><path class="tik" d="M60 102 L88 130 L144 72" fill="none" stroke="#fff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`,
    elpara: () => `<g class="dus"><circle cx="100" cy="50" r="26" fill="${Y}" ${st(6)}/><text x="100" y="62" text-anchor="middle" font-family="Archivo,Arial Black,sans-serif" font-weight="900" font-size="32" fill="${K}">₺</text></g>
      <path d="M20 150 L60 128 C76 120 92 122 104 130 L140 130 C152 130 152 146 140 146 L106 146 L150 146 L176 128 C188 120 198 136 186 146 L150 176 L60 176 L20 176Z" fill="#F2C9A5" ${st(7)}/>`,
    tokmak: () => `<rect x="30" y="160" width="140" height="22" rx="6" fill="${M}" ${st(6)}/><g class="vur"><rect x="92" y="70" width="16" height="96" rx="6" fill="#A8693E" ${st(6)} transform="rotate(-40 100 118)"/>
      <rect x="40" y="40" width="84" height="40" rx="10" fill="#A8693E" ${st(7)} transform="rotate(-40 82 60)"/></g><g class="darbe" opacity="0" ${st(6)}><path d="M150 150 L170 132 M156 168 L184 166 M134 140 L136 116"/></g>`,
    mesaj: () => `<path d="M24 40 L176 40 Q186 40 186 50 L186 128 Q186 138 176 138 L84 138 L50 168 L54 138 L24 138 Q14 138 14 128 L14 50 Q14 40 24 40Z" fill="${B}" ${st()}/>
      <g class="nokta">${[70, 100, 130].map(x => `<circle cx="${x}" cy="89" r="10" fill="${M}"/>`).join('')}</g>`,
    kart: () => `<g class="kay"><rect x="16" y="46" width="168" height="108" rx="14" fill="${K}"/><rect x="16" y="68" width="168" height="18" fill="${M}"/>
      <rect x="34" y="100" width="34" height="26" rx="5" fill="${Y}"/><rect x="104" y="126" width="62" height="9" rx="4" fill="#fff" opacity=".7"/></g>`,
    el: () => `<path d="M84 196 L84 112 L70 102 C60 94 66 80 78 84 L92 92 L92 28 C92 14 112 14 112 28 L112 86 L112 72 C112 60 130 60 130 72 L130 90 L130 80 C130 68 148 68 148 80 L148 96 L148 90 C148 80 164 80 164 92 L164 138 C164 168 150 196 120 196Z" fill="#fff" ${st(7)}/>`,
    zil: () => `<g class="sal"><path d="M100 26 C66 26 52 54 52 86 L52 124 L36 146 L164 146 L148 124 L148 86 C148 54 134 26 100 26Z" fill="${Y}" ${st()}/><circle cx="100" cy="22" r="9" fill="${K}"/></g>
      <g class="dil"><circle cx="100" cy="158" r="14" fill="${K}"/></g><g class="dal" ${st(6)} fill="none" opacity="0"><path d="M30 60 Q18 86 30 112"/><path d="M170 60 Q182 86 170 112"/></g>`,
    cuzdan: () => `<g class="pr">${[0, 1, 2].map(i => `<g class="cn" data-i="${i}"><circle cx="${74 + i * 26}" cy="40" r="18" fill="${Y}" ${st(5)}/><text x="${74 + i * 26}" y="48" text-anchor="middle" font-family="Archivo,Arial Black" font-weight="900" font-size="22" fill="${K}">₺</text></g>`).join('')}</g>
      <rect x="26" y="72" width="148" height="104" rx="18" fill="${R}" ${st()}/><path d="M26 96 L174 96" ${st(6)}/><rect class="kapak" x="118" y="108" width="60" height="40" rx="10" fill="#C2311F" ${st(6)}/><circle cx="140" cy="128" r="7" fill="${Y}"/>`,
    imza: () => `<rect x="20" y="40" width="160" height="120" rx="10" fill="${B}" ${st()}/><rect x="40" y="62" width="90" height="9" rx="4" fill="${M}"/><rect x="40" y="82" width="70" height="9" rx="4" fill="${M}"/>
      <path class="cizgi" d="M40 136 C58 112 66 146 80 128 C92 112 98 140 112 126 C122 116 128 136 146 124" fill="none" stroke="${R}" stroke-width="6" stroke-linecap="round"/>
      <g class="kalem"><path d="M0 0 L46 -46 L58 -34 L12 12Z" fill="${K}"/><path d="M0 0 L12 12 L-4 16Z" fill="${Y}" ${st(3)}/></g><line x1="36" y1="150" x2="164" y2="150" ${st(4)}/>`,
    megafon: () => `<g class="gov"><path d="M40 84 L120 44 L120 156 L40 116Z" fill="${R}" ${st()}/><rect x="22" y="82" width="22" height="36" rx="6" fill="${M}" ${st(6)}/><path d="M60 118 L72 160 L94 160 L84 124" fill="${B}" ${st(6)}/></g>
      <g class="dalga" fill="none" ${st(7)}><path d="M140 76 Q156 100 140 124"/><path d="M156 60 Q182 100 156 140"/><path d="M172 44 Q206 100 172 156"/></g>`,
    ucak: () => `<path d="M20 98 L180 24 L130 176 L96 120Z" fill="#fff" ${st(7)}/><path d="M96 120 L180 24" ${st(6)}/>`,
  };
  const EMOJI = { '💡': 'ampul', '🔒': 'kilit', '🔐': 'kilit', '🔑': 'kilit', '🛡': 'kalkan', '💰': 'para', '💵': 'para', '🪙': 'para', '🏠': 'ev', '🏘': 'ev', '🏢': 'bina',
    '🏛': 'banka', '🏦': 'banka', '🪪': 'kimlik', '✉': 'zarf', '📩': 'zarf', '📧': 'zarf', '📨': 'zarf', '📮': 'zarf', '📅': 'takvim', '⏱': 'saat', '⏰': 'saat', '⏳': 'saat',
    '⚖': 'terazi', '📜': 'belge', '📄': 'belge', '📝': 'belge', '🧾': 'belge', '📱': 'telefon', '📞': 'telefon', '☎': 'telefon', '🔍': 'buyutec', '🚫': 'yasak', '⚠': 'uyari',
    '🚨': 'uyari', '📈': 'grafik', '📊': 'grafik', '✅': 'tik', '💸': 'elpara', '💳': 'kart', '💬': 'mesaj', '👇': 'el', '🔔': 'zil', '👛': 'cuzdan', '✍': 'imza', '📢': 'megafon', '📣': 'megafon' };
  const ad = x => C[x] ? x : EMOJI[String(x).replace(/️/g, '')] || null;
  let sayac = 0;
  function svg(x, boy = 200) { const n = ad(x); if (!n) return ''; const id = n + (sayac++);
    return `<svg class="cz-il" data-c="${n}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${boy}" height="${boy}" style="overflow:visible">${C[n]().replace(/_ID/g, '_' + id)}</svg>`; }
  // --- canlandırma (tarayıcı): el = <svg class="cz-il">, lt = görünmeden bu yana saniye
  const cl = (v, a, b) => Math.max(a, Math.min(b, v)), eo = k => 1 - Math.pow(1 - cl(k, 0, 1), 3);
  const bo = k => { k = cl(k, 0, 1); const c = 1.70158; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
  const q = (el, s) => el.querySelectorAll(s), q1 = (el, s) => el.querySelector(s);
  const ciz = (p, k) => { const L = +p.dataset.L || (p.dataset.L = p.getTotalLength()); p.style.strokeDasharray = L; p.style.strokeDashoffset = L * (1 - cl(k, 0, 1)); };
  const A = {
    ampul(el, t) { const yan = t > .62 || (t > .38 && Math.floor(t * 28) % 3 === 0); q1(el, '.cam').setAttribute('fill', yan ? '#F6B92B' : '#E9E6E0'); q1(el, '.tel').setAttribute('stroke', yan ? '#fff' : '#151515');
      const k = eo((t - .62) / .3); q1(el, '.isin').setAttribute('opacity', yan ? k : 0); const sc = .8 + .2 * k + .05 * Math.sin(t * 6); q1(el, '.isin').setAttribute('transform', `translate(100 84) scale(${sc}) translate(-100 -84)`);
      q1(el, '.parla').setAttribute('opacity', yan ? .9 : 0); },
    kilit(el, t, o = {}) { const k = o.kapan != null ? eo((t - o.kapan) / .25) : eo((t - .45) / .25); q(el, '.kanca,.kanca2').forEach(p => p.setAttribute('transform', `translate(0 ${-28 * (1 - k)})`));
      const s = k > 0 && k < 1 ? 1 + .06 * Math.sin(k * Math.PI) : 1; q1(el, '.govde').setAttribute('transform', `translate(100 136) scale(${1 / s} ${s}) translate(-100 -136)`); q1(el, '.govde').setAttribute('fill', k >= 1 ? '#1E9E6A' : '#F6B92B'); },
    kalkan(el, t) { q1(el, '.dolu').setAttribute('y', 190 - 175 * eo((t - .3) / .6)); ciz(q1(el, '.tik'), (t - .8) / .3); },
    para(el, t) { const g = q1(el, '.don'); const sx = Math.cos(t * 5); g.setAttribute('transform', `translate(100 100) scale(${Math.abs(sx) < .08 ? .08 : sx} 1) translate(-100 -100)`); },
    ev(el, t) { q(el, '.pen').forEach((p, i) => p.setAttribute('fill', t > .45 + i * .15 ? '#F6B92B' : '#E9E6E0')); const d = q1(el, '.duman'); d.setAttribute('transform', `translate(${Math.sin(t * 2) * 4} ${-((t * 18) % 18)})`); d.setAttribute('opacity', .4 + .6 * Math.abs(Math.sin(t * 1.7))); },
    bina(el, t) { q(el, '.pen').forEach((p, i) => p.setAttribute('fill', t > .3 + ((i * 7) % 12) * .06 ? '#F6B92B' : '#E9E6E0')); },
    banka(el, t) { q(el, '.kolon').forEach((p, i) => { const k = bo((t - .1 - i * .07) / .3); p.setAttribute('transform', `translate(0 ${158 * (1 - k)}) scale(1 ${k || .001})`); p.style.transformOrigin = 'center bottom'; p.style.transformBox = 'fill-box'; }); },
    kimlik(el, t) { const r = q1(el, '.tarama'), k = ((t - .3) % 1.4) / 1.4; r.setAttribute('opacity', t > .3 ? .8 : 0); r.setAttribute('y', 74 + 76 * Math.sin(k * Math.PI)); },
    zarf(el, t) { const k = eo((t - .3) / .3); q1(el, '.kapak').setAttribute('transform', `translate(0 82) scale(1 ${1 - 2 * k}) translate(0 -82)`); q(el, '.kagit').forEach(p => p.setAttribute('transform', `translate(0 ${-50 * eo((t - .55) / .35)})`)); },
    takvim(el, t) { const y = q1(el, '.yaprak'), k = cl((t - .4) / .4, 0, 1); y.setAttribute('opacity', k > 0 && k < 1 ? 1 : 0); y.setAttribute('transform', `translate(0 ${-30 * Math.sin(k * Math.PI)} ) rotate(${k * 40} 30 76)`); },
    saat(el, t) { const k = eo((t - .2) / 1.2), a = k * 300, r = 62, x = 100 + r * Math.sin(a * Math.PI / 180), y = 106 - r * Math.cos(a * Math.PI / 180);
      q1(el, '.dilim').setAttribute('d', a > 1 ? `M100 106 L100 ${106 - r} A${r} ${r} 0 ${a > 180 ? 1 : 0} 1 ${x} ${y}Z` : ''); q1(el, '.akrep').setAttribute('transform', `rotate(${a} 100 106)`); },
    terazi(el, t) { const k = t - .2, a = k < 0 ? -16 : -16 * Math.exp(-k * 3) * Math.cos(k * 7); q1(el, '.kol').setAttribute('transform', `rotate(${a} 100 52)`); q(el, '.sol,.sag').forEach(g => g.setAttribute('transform', `rotate(${-a} ${g.classList.contains('sol') ? 34 : 166} 52)`)); },
    belge(el, t) { q(el, '.sat').forEach((r, i) => { const k = eo((t - .2 - i * .12) / .2); r.setAttribute('transform', `scale(${k || .001} 1)`); r.style.transformBox = 'fill-box'; }); const m = q1(el, '.muhur'), k = cl((t - 1) / .18, 0, 1);
      m.setAttribute('opacity', k); m.setAttribute('transform', `translate(126 152) scale(${k ? 1.8 - .8 * k : 1}) rotate(-14) translate(-126 -152)`); },
    telefon(el, t) { const v = t > .3 && t < .9 ? Math.sin(t * 90) * 4 : 0; q1(el, '.titre').setAttribute('transform', `translate(${v} 0) rotate(${v / 2} 100 100)`); const b = q1(el, '.bild'), k = bo((t - .45) / .3);
      b.setAttribute('opacity', t > .45 ? 1 : 0); b.setAttribute('transform', `translate(100 67) scale(${k}) translate(-100 -67)`); },
    buyutec(el, t) { const a = t * 2.4; q1(el, '.gez').setAttribute('transform', `translate(${Math.cos(a) * 12} ${Math.sin(a) * 9})`); },
    yasak(el, t) { ciz(q1(el, '.cizgi'), (t - .25) / .3); },
    uyari(el, t) { q1(el, '.unlem').setAttribute('opacity', t < .4 || Math.floor(t * 4) % 2 ? 1 : .25); },
    grafik(el, t) { ciz(q1(el, '.egri'), (t - .15) / .6); q1(el, '.uc').setAttribute('opacity', t > .72 ? 1 : 0); },
    tik(el, t) { ciz(q1(el, '.tik'), (t - .2) / .3); },
    elpara(el, t) { const k = ((t - .2) % 1.1) / 1.1, y = t < .2 ? -80 : -80 + 150 * k * k; const g = q1(el, '.dus'); g.setAttribute('transform', `translate(0 ${Math.min(y, 68)})`); g.setAttribute('opacity', t < .2 || k > .92 ? 0 : 1); },
    tokmak(el, t) { const k = (t % 1) / 1, a = k < .7 ? -26 * eo(k / .7) : -26 + 30 * eo((k - .7) / .1); q1(el, '.vur').setAttribute('transform', `rotate(${k < .8 ? a : 4 - 4 * (k - .8) / .2} 150 170)`); q1(el, '.darbe').setAttribute('opacity', k > .8 && k < .95 ? 1 : 0); },
    mesaj(el, t) { q(el, '.nokta circle').forEach((c, i) => c.setAttribute('transform', `translate(0 ${-8 * Math.max(0, Math.sin(t * 8 - i * .8))})`)); },
    kart(el, t) { const k = eo(t / .5); q1(el, '.kay').setAttribute('transform', `translate(${-60 * (1 - k) + Math.sin(t * 2) * 3} 0) rotate(${-6 * (1 - k)} 100 100)`); },
    zil(el, t) { const a = Math.sin(t * 16) * 18 * Math.max(.15, Math.exp(-((t % 1.4)) * 2.2)); q1(el, '.sal').setAttribute('transform', `rotate(${a} 100 22)`); q1(el, '.dil').setAttribute('transform', `rotate(${-a * 1.4} 100 22)`); q1(el, '.dal').setAttribute('opacity', Math.abs(a) > 8 ? 1 : 0); },
    cuzdan(el, t) { q(el, '.cn').forEach((c, i) => { const k = ((t + i * .37) % 1.1) / 1.1, y = -40 + 120 * k * k; c.setAttribute('transform', `translate(0 ${y})`); c.setAttribute('opacity', k > .85 ? 0 : 1); }); q1(el, '.kapak').setAttribute('transform', `translate(0 ${Math.sin(t * 9) * 2})`); },
    imza(el, t) { const p = q1(el, '.cizgi'), L = +p.dataset.L || (p.dataset.L = p.getTotalLength()), k = ((t * .8) % 1.3) / 1.0; ciz(p, k); const pt = p.getPointAtLength(L * cl(k, 0, 1)); q1(el, '.kalem').setAttribute('transform', `translate(${pt.x} ${pt.y})`); },
    megafon(el, t) { q(el, '.dalga path').forEach((p, i) => p.setAttribute('opacity', .2 + .8 * Math.max(0, Math.sin(t * 7 - i * .9)))); q1(el, '.gov').setAttribute('transform', `rotate(${Math.sin(t * 9) * 2} 60 100)`); },
    el() {}, ucak(el, t) { el.querySelector('path').setAttribute('transform', `translate(${Math.sin(t * 3) * 4} ${Math.cos(t * 3) * 3})`); },
  };
  function anim(el, lt, o) { const f = A[el.dataset.c]; if (f && lt >= 0) { f(el, lt, o); if (lt > .9) el.style.transform = `rotate(${Math.sin(lt * 2.3) * 2.2}deg) scale(${1 + .025 * Math.sin(lt * 3.1)})`; } }
  root.CZ = { svg, anim, ad, ADLAR: Object.keys(C) };
  if (typeof module !== 'undefined') module.exports = root.CZ;
})(typeof window !== 'undefined' ? window : globalThis);
