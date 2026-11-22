// 20 hukukçu maskot üretir: node scripts/maskotlar.js
// Çıktı: maskotlar/svg/NN-ad.svg + maskotlar/galeri.html
const fs = require('fs');
const path = require('path');

const O = '#161616', R = '#F0442C', R2 = '#C2321D', CR = '#FFF4DA', W = '#FFFFFF',
  G = '#F6B92B', N = '#26324F', GR = '#1E9E6A', BL = '#2F5BFF', SK = '#FFD2AE',
  BR = '#A8693E', GY = '#D9D9D9', PK = '#FF8A8A', PU = '#6B3FA0';
const S = `stroke="${O}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
const S5 = `stroke="${O}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;

const shadow = (w = 160) => `<ellipse cx="200" cy="374" rx="${w / 2}" ry="11" fill="#000" opacity=".13"/>`;
const eyes = (cx, cy, d = 38, r = 10) => `<g id="eyes">
  <circle cx="${cx - d / 2}" cy="${cy}" r="${r}" fill="${O}"/><circle cx="${cx + d / 2}" cy="${cy}" r="${r}" fill="${O}"/>
  <circle cx="${cx - d / 2 + r * .35}" cy="${cy - r * .35}" r="${r * .33}" fill="${W}"/><circle cx="${cx + d / 2 + r * .35}" cy="${cy - r * .35}" r="${r * .33}" fill="${W}"/></g>`;
const happyEyes = (cx, cy, d = 38, w = 11, c = O) => `<g id="eyes" fill="none" stroke="${c}" stroke-width="7" stroke-linecap="round">
  <path d="M${cx - d / 2 - w} ${cy + 4} Q${cx - d / 2} ${cy - 12} ${cx - d / 2 + w} ${cy + 4}"/>
  <path d="M${cx + d / 2 - w} ${cy + 4} Q${cx + d / 2} ${cy - 12} ${cx + d / 2 + w} ${cy + 4}"/></g>`;
const smile = (cx, cy, w = 20, c = O) => `<path id="mouth" d="M${cx - w / 2} ${cy} Q${cx} ${cy + w * .6} ${cx + w / 2} ${cy}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;
const openSmile = (cx, cy, w = 26) => `<path id="mouth" d="M${cx - w / 2} ${cy} Q${cx} ${cy + w * .9} ${cx + w / 2} ${cy} Z" fill="${R2}" ${S5}/>`;
const cheeks = (cx, cy, d = 70) => `<ellipse cx="${cx - d / 2}" cy="${cy}" rx="10" ry="6" fill="${PK}" opacity=".7"/><ellipse cx="${cx + d / 2}" cy="${cy}" rx="10" ry="6" fill="${PK}" opacity=".7"/>`;
const hand = (x, y, f = R, r = 17) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${S}/>`;
const glasses = (cx, cy, d = 40, r = 17) => `<g fill="none" ${S5}><circle cx="${cx - d / 2}" cy="${cy}" r="${r}"/><circle cx="${cx + d / 2}" cy="${cy}" r="${r}"/><path d="M${cx - d / 2 + r} ${cy} H${cx + d / 2 - r}"/></g>`;
const gavel = (x, y, a = -30, s = 1) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">
  <rect x="-6" y="-4" width="12" height="70" rx="5" fill="${BR}" ${S5}/>
  <rect x="-30" y="-26" width="60" height="30" rx="8" fill="${BR}" ${S5}/>
  <rect x="-36" y="-29" width="10" height="36" rx="4" fill="${G}" ${S5}/><rect x="26" y="-29" width="10" height="36" rx="4" fill="${G}" ${S5}/></g>`;
const tie = (x, y, c = R) => `<path d="M${x - 10} ${y} H${x + 10} L${x + 6} ${y + 10} L${x + 14} ${y + 46} L${x} ${y + 60} L${x - 14} ${y + 46} L${x - 6} ${y + 10} Z" fill="${c}" ${S5}/>`;
const bowtie = (x, y, c = R) => `<path d="M${x} ${y} L${x - 26} ${y - 14} V${y + 14} Z M${x} ${y} L${x + 26} ${y - 14} V${y + 14} Z" fill="${c}" ${S5}/><circle cx="${x}" cy="${y}" r="7" fill="${c}" ${S5}/>`;
const scalesIcon = (x, y, s = 1, c = G) => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round">
  <path d="M0 -22 V22 M-14 22 H14 M-24 -14 H24"/><path d="M-24 -14 L-32 4 H-16 Z M24 -14 L16 4 H32 Z" fill="${c}"/></g>`;
const legs = (x1, x2, y, f = R, h = 26) => `<rect x="${x1 - 13}" y="${y}" width="26" height="${h}" rx="10" fill="${f}" ${S}/><rect x="${x2 - 13}" y="${y}" width="26" height="${h}" rx="10" fill="${f}" ${S}/>`;
const screenFace = (x, y, w, h, happy = false) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h * .32}" fill="${O}"/>` +
  (happy ? happyEyes(x + w / 2, y + h / 2, w * .36, 10, W)
    : `<g id="eyes"><rect x="${x + w * .3 - 8}" y="${y + h / 2 - 16}" width="16" height="30" rx="8" fill="${W}"/><rect x="${x + w * .7 - 8}" y="${y + h / 2 - 16}" width="16" height="30" rx="8" fill="${W}"/></g>`);

const M = [];
const add = (slug, ad, aciklama, body) => M.push({ slug, ad, aciklama, body });

// 1 Hakim Robot
add('hakim-robot', 'Hakim Robot', 'Ekran yüzlü, cübbeli ve tokmaklı robot hakim', `
${shadow(170)}
<path d="M200 70 V46" ${S}/><circle cx="200" cy="40" r="11" fill="${R}" ${S}/>
<path d="M120 250 Q200 230 280 250 L292 350 H108 Z" fill="${O}" ${S}/>
<path d="M172 238 L200 290 L228 238" fill="${W}" ${S5}/>
<rect x="110" y="70" width="180" height="170" rx="42" fill="${R}" ${S}/>
${screenFace(132, 100, 136, 96)}
<path d="M140 222 H260" stroke="${R2}" stroke-width="6" stroke-linecap="round"/>
${gavel(300, 250, 25)}${hand(285, 268)}${hand(115, 280)}`);

// 2 Terazi
add('terazi', 'Bay Terazi', 'Adalet terazisinin kendisi; dengeli, sakin karakter', `
${shadow(180)}
<path d="M160 360 H240 L228 330 H172 Z" fill="${G}" ${S}/>
<rect x="182" y="120" width="36" height="215" rx="14" fill="${G}" ${S}/>
<path d="M80 120 H320" ${S} stroke-width="9"/>
<path d="M95 122 L65 220 M95 122 L125 220 M305 122 L275 220 M305 122 L335 220" stroke="${O}" stroke-width="4"/>
<path d="M50 220 H140 Q130 256 95 256 Q60 256 50 220 Z" fill="${R}" ${S}/>
<path d="M260 220 H350 Q340 256 305 256 Q270 256 260 220 Z" fill="${R}" ${S}/>
<circle cx="200" cy="110" r="58" fill="${G}" ${S}/>
${eyes(200, 104, 36, 9)}${smile(200, 128, 22)}${cheeks(200, 126, 72)}`);

// 3 Tokmak
add('tokmak', 'Tokmak Tosun', 'Neşeli hakim tokmağı; "karar verildi!" anları için', `
${shadow(190)}
<rect x="80" y="330" width="240" height="34" rx="10" fill="${BR}" ${S}/>
<rect x="186" y="200" width="28" height="135" rx="12" fill="${BR}" ${S}/>
<rect x="70" y="90" width="260" height="130" rx="40" fill="${BR}" ${S}/>
<rect x="56" y="82" width="34" height="146" rx="14" fill="${G}" ${S}/><rect x="310" y="82" width="34" height="146" rx="14" fill="${G}" ${S}/>
${eyes(200, 142, 54, 12)}${openSmile(200, 172, 34)}${cheeks(200, 170, 110)}
${hand(160, 290, BR)}${hand(240, 290, BR)}`);

// 4 Kanun Kitabı
add('kanun-kitabi', 'Kanun Kitabı', 'Her şeyi bilen kalın kırmızı kanun kitabı', `
${shadow(170)}${legs(165, 235, 330, R)}
<rect x="110" y="70" width="190" height="270" rx="16" fill="${CR}" ${S}/>
<rect x="96" y="60" width="190" height="270" rx="16" fill="${R}" ${S}/>
<path d="M118 62 V328" stroke="${R2}" stroke-width="8"/>
<rect x="140" y="96" width="122" height="38" rx="8" fill="${CR}" ${S5}/>
<text x="201" y="124" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="24" fill="${O}">KANUN</text>
${eyes(200, 196, 50, 12)}${smile(200, 232, 30)}${cheeks(200, 226, 100)}
${hand(88, 240)}${hand(300, 210)}`);

// 5 Baykuş Avukat
add('baykus-avukat', 'Avukat Baykuş', 'Gözlüklü, cübbeli bilge baykuş', `
${shadow(170)}
<path d="M110 120 L96 70 L150 100 Z M290 120 L304 70 L250 100 Z" fill="${BR}" ${S}/>
<ellipse cx="200" cy="215" rx="110" ry="140" fill="${BR}" ${S}/>
<path d="M118 260 Q200 230 282 260 Q286 330 240 352 H160 Q114 330 118 260 Z" fill="${O}" ${S}/>
<path d="M176 250 L200 290 L224 250" fill="${W}" ${S5}/>
<circle cx="160" cy="170" r="38" fill="${CR}" ${S}/><circle cx="240" cy="170" r="38" fill="${CR}" ${S}/>
${eyes(200, 172, 80, 13)}
<path d="M188 200 L212 200 L200 222 Z" fill="${G}" ${S5}/>
<g fill="none" ${S5}><circle cx="160" cy="170" r="27"/><circle cx="240" cy="170" r="27"/><path d="M187 168 H213"/></g>
<path d="M160 370 v-14 M240 370 v-14" ${S}/>`);

// 6 Evrak Çantası
add('evrak-cantasi', 'Çanta Cemil', 'Avukat evrak çantası; dava dosyası taşıyan karakter', `
${shadow(200)}${legs(150, 250, 320, BR)}
<path d="M160 120 V96 Q160 80 176 80 H224 Q240 80 240 96 V120" fill="none" ${S} stroke-width="12"/>
<rect x="70" y="116" width="260" height="210" rx="26" fill="${BR}" ${S}/>
<path d="M72 170 H328" ${S}/>
<rect x="182" y="156" width="36" height="28" rx="6" fill="${G}" ${S5}/>
${eyes(200, 226, 60, 12)}${smile(200, 262, 30)}${cheeks(200, 256, 110)}
${hand(64, 250, BR)}${hand(336, 250, BR)}`);

// 7 Su Ayısı Avukat
add('su-ayisi-avukat', 'Avukat Tardi', 'Tardigrad (su ayısı) avukat — markana bağlanan maskot', `
${shadow(230)}
<g fill="${CR}" ${S}>
<rect x="92" y="300" width="30" height="50" rx="12"/><rect x="150" y="306" width="30" height="48" rx="12"/><rect x="222" y="306" width="30" height="48" rx="12"/><rect x="280" y="300" width="30" height="50" rx="12"/></g>
<path d="M70 230 Q70 140 160 130 H260 Q340 140 340 230 Q340 320 260 320 H150 Q70 320 70 230 Z" fill="${CR}" ${S}/>
<path d="M150 134 Q138 220 150 318 M210 130 Q200 220 210 320 M270 140 Q262 220 270 316" fill="none" stroke="${O}" stroke-width="4" opacity=".35"/>
<path d="M90 300 Q100 220 160 200 H250 Q312 220 322 300 Q300 322 260 322 H150 Q108 322 90 300 Z" fill="${O}" ${S}/>
<path d="M180 200 L205 240 L230 200" fill="${W}" ${S5}/>
<circle cx="300" cy="190" r="62" fill="${CR}" ${S}/>
${eyes(300, 182, 40, 10)}
<ellipse cx="300" cy="214" rx="12" ry="9" fill="${R2}" ${S5}/>
${cheeks(300, 206, 72)}
${hand(110, 260, CR, 16)}`);

// 8 Kedi Avukat
add('kedi-avukat', 'Avukat Pati', 'Kravatlı, kendinden emin kedi avukat', `
${shadow(170)}
<path d="M128 330 Q120 240 200 236 Q280 240 272 330 Q272 350 250 350 H150 Q128 350 128 330 Z" fill="${N}" ${S}/>
<path d="M176 240 L200 272 L224 240" fill="${W}" ${S5}/>${tie(200, 254)}
<path d="M108 130 L112 52 L170 96 Z M292 130 L288 52 L230 96 Z" fill="${G}" ${S}/>
<path d="M124 108 L126 74 L152 96 Z M276 108 L274 74 L248 96 Z" fill="${PK}"/>
<ellipse cx="200" cy="160" rx="100" ry="84" fill="${G}" ${S}/>
${eyes(200, 152, 64, 12)}
<path d="M192 178 H208 L200 188 Z" fill="${PK}" ${S5}/>
<path d="M200 188 Q190 202 180 196 M200 188 Q210 202 220 196" fill="none" ${S5}/>
<path d="M110 170 H150 M112 186 L150 180 M290 170 H250 M288 186 L250 180" stroke="${O}" stroke-width="4" stroke-linecap="round"/>
${hand(122, 300, G)}${hand(278, 300, G)}`);

// 9 Dosya
add('dava-dosyasi', 'Dosya Dilek', 'Sarı dava klasörü; içinden belgeler taşan karakter', `
${shadow(190)}${legs(160, 240, 330, G)}
<path d="M80 110 H170 L190 132 H320 V340 H80 Z" fill="#E09B12" ${S}/>
<rect x="108" y="96" width="180" height="120" rx="6" fill="${W}" ${S5} transform="rotate(-6 200 150)"/>
<path d="M130 120 H260 M130 140 H240 M130 160 H250" stroke="${GY}" stroke-width="6" stroke-linecap="round" transform="rotate(-6 200 150)"/>
<path d="M80 160 H320 V340 H80 Z" fill="${G}" ${S}/>
${eyes(200, 234, 56, 12)}${openSmile(200, 266, 30)}${cheeks(200, 260, 104)}
${hand(72, 260, G)}${hand(328, 260, G)}`);

// 10 Sözleşme
add('sozlesme', 'Sözleşme Selin', 'Rulo sözleşme kâğıdı ve imza kalemi', `
${shadow(170)}
<rect x="110" y="70" width="180" height="270" rx="10" fill="${W}" ${S}/>
<rect x="96" y="56" width="208" height="30" rx="15" fill="${CR}" ${S}/>
<rect x="96" y="324" width="208" height="30" rx="15" fill="${CR}" ${S}/>
<path d="M136 112 H264 M136 132 H240" stroke="${GY}" stroke-width="7" stroke-linecap="round"/>
${eyes(200, 190, 50, 11)}${smile(200, 222, 26)}${cheeks(200, 216, 96)}
<path d="M140 292 Q160 270 175 292 T210 292 L250 280" fill="none" stroke="${BL}" stroke-width="5" stroke-linecap="round"/>
<g transform="rotate(35 300 260)"><rect x="290" y="200" width="20" height="90" rx="6" fill="${R}" ${S5}/><path d="M290 290 L300 312 L310 290 Z" fill="${CR}" ${S5}/></g>
${hand(100, 230, W)}${hand(304, 232, W)}`);

// 11 Mühür
add('muhur', 'Mühür Mümtaz', '"ONAYLANDI" damgası basan mühür', `
${shadow(200)}
<rect x="94" y="320" width="212" height="44" rx="10" fill="${R}" ${S}/>
<path d="M120 320 Q120 280 160 270 H240 Q280 280 280 320 Z" fill="${N}" ${S}/>
<rect x="170" y="200" width="60" height="74" rx="18" fill="${N}" ${S}/>
<circle cx="200" cy="140" r="78" fill="${N}" ${S}/>
${eyes(200, 132, 50, 12)}${smile(200, 162, 26, W)}
${cheeks(200, 158, 96)}
<text x="200" y="350" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="20" fill="${W}">ONAYLANDI</text>
${hand(118, 236, N)}${hand(282, 236, N)}`);

// 12 Kalkan
add('hak-kalkani', 'Hak Kalkanı', 'Haklarını koruyan terazili kalkan', `
${shadow(170)}${legs(170, 230, 326, BL)}
<path d="M200 50 L320 92 V190 Q320 290 200 340 Q80 290 80 190 V92 Z" fill="${BL}" ${S}/>
<path d="M200 76 L296 110 V190 Q296 272 200 314 Z" fill="#2549D6"/>
${scalesIcon(200, 112, 1.1, G)}
${eyes(200, 196, 56, 12)}${openSmile(200, 228, 30)}${cheeks(200, 222, 104)}
${hand(72, 200, BL)}${hand(328, 200, BL)}`);

// 13 Sütun
add('adalet-sutunu', 'Sütun Sami', 'Adliye binası sütunu; ağırbaşlı ama sevimli', `
${shadow(190)}
<rect x="100" y="320" width="200" height="40" rx="8" fill="${CR}" ${S}/>
<rect x="128" y="96" width="144" height="228" fill="${CR}" ${S}/>
<path d="M160 100 V320 M200 100 V170 M200 250 V320 M240 100 V320" stroke="${O}" stroke-width="4" opacity=".3"/>
<path d="M90 96 Q90 60 130 60 H270 Q310 60 310 96 Z" fill="${CR}" ${S}/>
<circle cx="110" cy="88" r="16" fill="${CR}" ${S}/><circle cx="290" cy="88" r="16" fill="${CR}" ${S}/>
${eyes(200, 190, 52, 12)}${smile(200, 224, 26)}${cheeks(200, 218, 96)}
${hand(118, 250, CR)}${hand(282, 250, CR)}`);

// 14 Peruklu Yargıç
add('peruklu-yargic', 'Yargıç Peruk', 'Beyaz kıvırcık peruklu yuvarlak yargıç', `
${shadow(180)}
<path d="M110 270 Q200 236 290 270 L300 352 H100 Z" fill="${O}" ${S}/>
<path d="M176 250 L200 294 L224 250" fill="${W}" ${S5}/>
<g fill="${W}" ${S}>
<circle cx="120" cy="220" r="26"/><circle cx="114" cy="178" r="26"/><circle cx="124" cy="136" r="26"/><circle cx="280" cy="220" r="26"/><circle cx="286" cy="178" r="26"/><circle cx="276" cy="136" r="26"/>
<circle cx="150" cy="100" r="28"/><circle cx="200" cy="86" r="30"/><circle cx="250" cy="100" r="28"/></g>
<circle cx="200" cy="178" r="74" fill="${SK}" ${S}/>
<path d="M140 128 Q200 96 260 128 Q230 112 200 114 Q170 112 140 128 Z" fill="${W}" ${S5}/>
${eyes(200, 174, 48, 11)}${smile(200, 204, 24)}${cheeks(200, 198, 90)}
${gavel(292, 262, 30, .8)}${hand(282, 290, SK)}`);

// 15 Ayı
add('ayi-avukat', 'Avukat Ayı', 'Papyonlu, güven veren ayıcık', `
${shadow(180)}
<ellipse cx="200" cy="300" rx="96" ry="62" fill="${N}" ${S}/>
<path d="M170 252 L200 290 L230 252" fill="${W}" ${S5}/>
<circle cx="120" cy="96" r="32" fill="${BR}" ${S}/><circle cx="280" cy="96" r="32" fill="${BR}" ${S}/>
<circle cx="120" cy="96" r="14" fill="${PK}"/><circle cx="280" cy="96" r="14" fill="${PK}"/>
<circle cx="200" cy="160" r="96" fill="${BR}" ${S}/>
<ellipse cx="200" cy="196" rx="44" ry="34" fill="${CR}" ${S5}/>
${eyes(200, 146, 66, 12)}
<ellipse cx="200" cy="184" rx="13" ry="9" fill="${O}"/>${smile(200, 202, 20)}
${bowtie(200, 262)}${hand(112, 300, BR)}${hand(288, 300, BR)}`);

// 16 Penguen
add('penguen-avukat', 'Avukat Penguen', 'Doğuştan takım elbiseli penguen; resmi ama tatlı', `
${shadow(170)}
<path d="M150 360 h36 l-8 -22 h-20 Z M214 360 h36 l-8 -22 h-20 Z" fill="${G}" ${S5}/>
<ellipse cx="200" cy="210" rx="104" ry="140" fill="${N}" ${S}/>
<path d="M200 110 Q132 120 132 210 Q132 330 200 344 Q268 330 268 210 Q268 120 200 110 Z" fill="${W}" ${S5}/>
${eyes(200, 156, 52, 11)}
<path d="M186 176 H214 L200 194 Z" fill="${G}" ${S5}/>
${cheeks(200, 182, 92)}
${bowtie(200, 236)}
<circle cx="200" cy="272" r="5" fill="${O}"/><circle cx="200" cy="296" r="5" fill="${O}"/>
<path d="M98 190 Q60 250 84 290 Q110 270 112 230 Z" fill="${N}" ${S}/>
<path d="M302 190 Q340 250 316 290 Q290 270 288 230 Z" fill="${N}" ${S}/>`);

// 17 Tilki
add('tilki-avukat', 'Avukat Tilki', 'Takım elbiseli kurnaz ama dürüst tilki', `
${shadow(170)}
<path d="M130 334 Q124 250 200 246 Q276 250 270 334 Q270 352 250 352 H150 Q130 352 130 334 Z" fill="${N}" ${S}/>
<path d="M174 250 L200 280 L226 250" fill="${W}" ${S5}/>${tie(200, 262, G)}
<path d="M106 140 L98 50 L170 104 Z M294 140 L302 50 L230 104 Z" fill="#F07A1E" ${S}/>
<path d="M200 260 Q110 240 100 150 Q100 96 200 92 Q300 96 300 150 Q290 240 200 260 Z" fill="#F07A1E" ${S}/>
<path d="M200 258 Q140 246 132 196 Q170 214 200 214 Q230 214 268 196 Q260 246 200 258 Z" fill="${W}"/>
${eyes(200, 160, 70, 12)}
<ellipse cx="200" cy="214" rx="13" ry="9" fill="${O}"/>${smile(200, 230, 18)}
${hand(124, 306, '#F07A1E')}${hand(276, 306, '#F07A1E')}`);

// 18 Cüppeli Damla
add('cuppeli-damla', 'Cübbeli Damla', 'Sade, minimal cübbeli damla; her sahneye uyar', `
${shadow(160)}
<path d="M200 50 Q300 170 300 250 Q300 350 200 350 Q100 350 100 250 Q100 170 200 50 Z" fill="${R}" ${S}/>
<path d="M104 280 Q200 250 296 280 Q290 350 200 350 Q110 350 104 280 Z" fill="${O}" ${S}/>
<path d="M176 266 L200 306 L224 266" fill="${W}" ${S5}/>
${eyes(200, 196, 50, 12)}${smile(200, 228, 24)}${cheeks(200, 222, 96)}
${hand(98, 300)}${hand(302, 300)}`);

// 19 Kum Saati
add('kum-saati', 'Süre Saati', 'Zamanaşımı ve yasal süreleri hatırlatan kum saati', `
${shadow(180)}
<rect x="100" y="50" width="200" height="30" rx="10" fill="${BR}" ${S}/>
<rect x="100" y="326" width="200" height="30" rx="10" fill="${BR}" ${S}/>
<path d="M122 80 H278 Q278 170 214 204 Q278 236 278 326 H122 Q122 236 186 204 Q122 170 122 80 Z" fill="#DFF3FF" ${S}/>
<path d="M150 300 Q200 250 250 300 V320 H150 Z" fill="${G}"/>
<path d="M200 204 V300" stroke="${G}" stroke-width="5" stroke-dasharray="6 8"/>
<path d="M142 104 H258 Q250 150 200 176 Q150 150 142 104 Z" fill="${G}"/>
${eyes(200, 128, 44, 10)}${smile(200, 150, 20)}
${hand(92, 200, BR)}${hand(308, 200, BR)}`);

// 20 Robot Avukat
add('robot-avukat', 'Robot Avukat', 'TV-ekran kafalı, kravatlı yapay zekâ avukat', `
${shadow(180)}
<path d="M168 64 L150 36 M232 64 L250 36" ${S}/><circle cx="148" cy="32" r="9" fill="${R}" ${S}/><circle cx="252" cy="32" r="9" fill="${R}" ${S}/>
<rect x="134" y="236" width="132" height="110" rx="26" fill="${N}" ${S}/>
<path d="M176 240 L200 268 L224 240" fill="${W}" ${S5}/>${tie(200, 250)}
<rect x="96" y="64" width="208" height="170" rx="36" fill="${GY}" ${S}/>
${screenFace(118, 86, 164, 112, true)}
<path d="M178 168 Q200 184 222 168" fill="none" stroke="${W}" stroke-width="6" stroke-linecap="round"/>
<circle cx="130" cy="216" r="6" fill="${R}"/><circle cx="150" cy="216" r="6" fill="${G}"/>
${hand(122, 300, GY)}${hand(278, 300, GY)}
<rect x="282" y="262" width="56" height="70" rx="6" fill="${W}" ${S5} transform="rotate(10 310 296)"/>`);

const outDir = path.join(__dirname, '..', 'maskotlar', 'svg');
fs.mkdirSync(outDir, { recursive: true });
const cards = M.map((m, i) => {
  const n = String(i + 1).padStart(2, '0');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">\n<!-- ${m.ad}: ${m.aciklama} -->\n${m.body.trim()}\n</svg>\n`;
  fs.writeFileSync(path.join(outDir, `${n}-${m.slug}.svg`), svg);
  return `<div class="c"><div class="n">${n}</div>${svg}<b>${m.ad}</b><span>${m.aciklama}</span></div>`;
});
fs.writeFileSync(path.join(__dirname, '..', 'maskotlar', 'galeri.html'), `<!DOCTYPE html><html lang="tr"><meta charset="utf-8"><title>Hukuk Maskotları</title>
<style>body{margin:0;padding:40px;background:#f4f4f2 radial-gradient(#d6d6d6 1.5px,transparent 1.5px) 0 0/22px 22px;font-family:Arial,sans-serif}
h1{margin:0 0 30px;font:900 44px Arial Black,Arial}h1 em{font-style:normal;color:#F0442C}
.g{display:grid;grid-template-columns:repeat(5,1fr);gap:24px}.c{position:relative;background:#fff;border:4px solid #161616;border-radius:20px;box-shadow:6px 6px 0 #161616;padding:12px 14px 16px;text-align:center}
.c svg{width:100%;height:auto}.c b{display:block;font:900 20px Arial Black,Arial}.c span{display:block;font-size:13px;color:#555;margin-top:4px;min-height:32px}
.n{position:absolute;top:10px;left:12px;background:#F0442C;color:#fff;font:900 15px Arial Black,Arial;padding:3px 9px;border-radius:8px;border:3px solid #161616}</style>
<h1>20 HUKUK <em>MASKOTU</em></h1><div class="g">${cards.join('\n')}</div></html>`);
console.log(`${M.length} maskot üretildi.`);
