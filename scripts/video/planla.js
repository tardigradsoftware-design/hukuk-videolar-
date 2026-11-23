// Otomatik sahne planı: metinden sahneler, öğeler, mimikler, fırlatmalar.
// node scripts/video/planla.js VID_XXX kisa|uzun  →  planlar/VID_XXX_<tur>.js  (elle düzenlenebilir)
// Başlıklar (baslik) otomatik önerilir; kaliteyi artırmak için elle iyileştirilebilir.
const fs = require('fs'), path = require('path');
const KOK = path.join(__dirname, '..', '..');

// ---------- yardımcılar
const low = s => s.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
const UP = s => s.toLocaleUpperCase('tr');
const temiz = w => w.replace(/[,.!?;:"“”'’()…]/g, '');
function csvSatir(ID) {
  const text = fs.readFileSync(path.join(KOK, 'veri', 'senaryolar.csv'), 'utf8');
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; } else if (c === '\n') { row.push(f.replace(/\r$/, '')); rows.push(row); row = []; f = ''; } else f += c;
  }
  const head = rows.shift().map(h => h.replace(/^﻿/, '').trim());
  const r = rows.map(r => Object.fromEntries(head.map((h, i) => [h, r[i]]))).find(r => r['video id'] === ID);
  if (!r) throw new Error(ID + ' bulunamadı');
  return r;
}

// ---------- sözlük: kök → ikon / nesne
const IKON = [
  ['para', '💰', 'PARA'], ['maaş', '💼', 'MAAŞ'], ['ücret', '💵', 'ÜCRET'], ['kira', '🏠', 'KİRA'], ['konut', '🏠', 'KONUT'], ['ev sahib', '🏠', 'EV SAHİBİ'],
  ['depozito', '🔑', 'DEPOZİTO'], ['sözleşme', '📝', 'SÖZLEŞME'], ['mahkeme', '⚖️', 'MAHKEME'], ['banka', '🏦', 'BANKA'], ['iban', '💳', 'IBAN'],
  ['kredi', '💳', 'KREDİ'], ['kart', '💳', 'KART'], ['borç', '📉', 'BORÇ'], ['icra', '⚠️', 'İCRA'], ['haciz', '🔒', 'HACİZ'], ['vergi', '🧾', 'VERGİ'],
  ['fatura', '🧾', 'FATURA'], ['sgk', '🏥', 'SGK'], ['sağlık', '🏥', 'SAĞLIK'], ['hastane', '🏥', 'HASTANE'], ['rapor', '🩺', 'RAPOR'], ['emekli', '👴', 'EMEKLİLİK'],
  ['bes', '🐷', 'BES'], ['tazminat', '💸', 'TAZMİNAT'], ['kıdem', '💼', 'KIDEM'], ['ihbar', '📣', 'İHBAR'], ['işçi', '👷', 'İŞÇİ'], ['işveren', '🏢', 'İŞVEREN'],
  ['işyeri', '🏢', 'İŞYERİ'], ['şirket', '🏢', 'ŞİRKET'], ['mesai', '⏰', 'MESAİ'], ['izin', '🏖️', 'İZİN'], ['trafik', '🚗', 'TRAFİK'], ['araç', '🚗', 'ARAÇ'],
  ['ceza', '🚨', 'CEZA'], ['polis', '🚓', 'POLİS'], ['telefon', '📱', 'TELEFON'], ['uygulama', '📱', 'UYGULAMA'], ['internet', '🌐', 'İNTERNET'],
  ['alışveriş', '🛒', 'ALIŞVERİŞ'], ['ürün', '📦', 'ÜRÜN'], ['kargo', '📦', 'KARGO'], ['iade', '↩️', 'İADE'], ['garanti', '🛡️', 'GARANTİ'], ['sigorta', '🛡️', 'SİGORTA'],
  ['miras', '📜', 'MİRAS'], ['tapu', '📜', 'TAPU'], ['noter', '✒️', 'NOTER'], ['imza', '✍️', 'İMZA'], ['kimlik', '🪪', 'KİMLİK'], ['nüfus cüzdan', '🪪', 'KİMLİK'],
  ['ptt', '📮', 'PTT'], ['boşanma', '💔', 'BOŞANMA'], ['nafaka', '👪', 'NAFAKA'], ['çocuk', '🧒', 'ÇOCUK'], ['komşu', '🏘️', 'KOMŞU'], ['abonelik', '🔁', 'ABONELİK'],
  ['zam', '📈', 'ZAM'], ['fiyat', '🏷️', 'FİYAT'], ['okul', '🎓', 'OKUL'], ['öğrenci', '🎓', 'ÖĞRENCİ'], ['tatil', '🏖️', 'TATİL'], ['elektrik', '💡', 'ELEKTRİK'],
  ['su faturası', '🚰', 'SU'], ['doğalgaz', '🔥', 'DOĞALGAZ'], ['aidat', '🏢', 'AİDAT'], ['site yönetim', '🏢', 'YÖNETİM'], ['şikayet', '📢', 'ŞİKAYET'],
];
const NESNE = [['dilekçe', 'belge', 'DİLEKÇE'], ['başvuru', 'belge', 'BAŞVURU'], ['ihtarname', 'belge', 'İHTARNAME'], ['dava', 'tokmak', 'DAVA'],
  ['karar', 'tokmak', 'KARAR'], ['hakim', 'tokmak', 'HAKİM'], ['kanun', 'kitap', 'KANUN'], ['yasa', 'kitap', 'YASA'], ['madde', 'kitap', 'MADDE']];
const DAMGA = [['zamanaşımı', '✗ ZAMANAŞIMI'], ['geçersiz', '✗ GEÇERSİZ'], ['yasak', '✗ YASAK'], ['sakın', 'SAKIN!'],
  ['kaybeder', '✗ KAYBEDERSİN'], ['dolandırıcı', '✗ DOLANDIRICILIK'], ['haksız', '✗ HAKSIZ'], ['usulsüz', '✗ USULSÜZ'], ['devlete geç', '✗ DEVLETE GEÇER']];
const OLUMLU = /(ücretsiz|bedava|geri al|alabilirsin|kazan|hakkın var|hakkındır|iade|hesabına|çözüm|korur|koruyan)/;
const UYARI = /(sakın|dikkat|ceza|kaybeder|zamanaşımı|yasak|iptal|haciz|icra|tehlike|risk|mağdur)/;
const SAYI_KELIME = { bir: 1, iki: 2, üç: 3, dört: 4, beş: 5, altı: 6, yedi: 7, sekiz: 8, dokuz: 9, on: 10, yirmi: 20, otuz: 30, kırk: 40, elli: 50, altmış: 60, doksan: 90, yüz: 100, bin: 1000 };
const SIRA = ['birinci', 'ikinci', 'üçüncü', 'dördüncü', 'beşinci', 'altıncı', 'yedinci', 'sekizinci', 'dokuzuncu', 'onuncu'];

// ---------- metni cümlelere böl (kelime indeksleriyle)
function cumleler(words) {
  const out = []; let cur = { i0: 0, w: [] };
  words.forEach((w, i) => { cur.w.push(w); if (/[.!?…]["”']?$/.test(w)) { out.push({ ...cur, i1: i, t: cur.w.join(' ') }); cur = { i0: i + 1, w: [] }; } });
  if (cur.w.length) out.push({ ...cur, i1: words.length - 1, t: cur.w.join(' ') });
  return out;
}
const bul = (words, i0, i1, re) => { for (let i = i0; i <= i1; i++) if (re.test(low(words.slice(i, i + 3).join(' ')))) return i; return -1; };
const bulKok = (words, i0, i1, kok) => { for (let i = i0; i <= i1; i++) { const w = low(temiz(words[i])).replace(/['’].*$/, ''); const k2 = low(temiz(words.slice(i, i + 2).join(' '))); const kisa = kok.length <= 3; if ((w.startsWith(kok) && (!kisa || w.length <= kok.length + 3)) || (kok.includes(' ') && k2.startsWith(kok))) return i; } return -1; };

function sayilar(words, i0, i1) {
  const out = [];
  for (let i = i0; i <= i1; i++) {
    const w = low(temiz(words[i])), n = low(temiz(words[i + 1] || ''));
    const birim = /^(gün|ay|yıl|saat|hafta|tl|lira|%|yüzde)/.exec(n);
    let v = /^\d+([.,]\d+)?$/.test(w) ? w : (SAYI_KELIME[w] != null ? String(SAYI_KELIME[w]) : null);
    if (v && birim) out.push({ k: i, yazi: `${v} ${UP(n.replace(/[^a-zçğıöşü%]/g, '').replace(/^(gün|ay|yıl|saat|hafta).*/, '$1'))}`, e: /tl|lira/.test(birim[1]) ? '₺' : /%|yüzde/.test(birim[1]) ? '📊' : '📅' });
  }
  return out;
}
function listeBul(c, words) {
  // virgülle ayrılmış en az 3 öğe → liste
  const parcalar = []; let cur = [];
  for (let i = c.i0; i <= c.i1; i++) { cur.push(i); if (/,$/.test(words[i]) || i === c.i1 || /^(veya|ve)$/.test(low(words[i + 1] || ''))) { parcalar.push(cur); cur = []; if (/^(veya|ve)$/.test(low(words[i + 1] || ''))) i++; } }
  const adaylar = parcalar.filter(p => p.length <= 4 && !p.some(i => SIRA.includes(low(temiz(words[i]))) || /^adım/.test(low(words[i])) || /^(bu|şu|o|ve|veya|ama|ya|da|de)$/.test(low(temiz(words[p[0]])))));
  if (adaylar.length < 3) return null;
  const ogeler = adaylar.slice(0, 5).map(p => {
    const t = p.map(i => temiz(words[i])).join(' ');
    const ik = IKON.find(([k]) => low(t).includes(k));
    return { e: ik ? ik[1] : '•', t: t.charAt(0).toLocaleUpperCase('tr') + t.slice(1), k: p[0] };
  });
  return ogeler;
}

function planla(ID, TUR) {
  const r = csvSatir(ID), KISA = TUR === 'kisa';
  const metin = r[KISA ? 'shorts video tts' : 'uzun video tts'];
  const words = metin.split(/\s+/);
  const C = cumleler(words);
  // --- sahne grupları
  const gruplar = [];
  if (KISA) {
    const cta = C.findIndex(c => /yorumlara|yorum/.test(low(c.t)));
    const govde = cta >= 0 ? C.slice(0, cta) : C;
    const n = Math.min(3, govde.length), boy = Math.ceil(govde.length / n);
    for (let i = 0; i < govde.length; i += boy) gruplar.push({ cs: govde.slice(i, i + boy), tip: i === 0 ? 'hook' : 'govde' });
    if (cta >= 0) gruplar.push({ cs: C.slice(cta), tip: 'cta' });
  } else {
    let cur = { cs: [], tip: 'hook' }, adim = 0;
    C.forEach(c => {
      const ilk = low(temiz(c.w[0] || ''));
      if (SIRA.includes(ilk) && /^adım/.test(low(c.w[1] || ''))) { if (cur.cs.length) gruplar.push(cur); adim = SIRA.indexOf(ilk) + 1; cur = { cs: [c], tip: 'adim', adim }; }
      else if (/abone|takip|yorumlara/.test(low(c.t)) && c === C[C.length - 1]) { if (cur.cs.length) gruplar.push(cur); cur = { cs: [c], tip: 'cta' }; }
      else cur.cs.push(c);
    });
    if (cur.cs.length) gruplar.push(cur);
  }
  const adimSayisi = gruplar.filter(g => g.tip === 'adim').length;

  // --- yerleşim yuvaları
  const Y0 = KISA ? { A: [360, 425], B: [540, 688], C: [190, 688], soru: [360, 440] } : { A: [480, 560], B: [1080, 360], C: [1080, 700], soru: [560, 845], portal: [620, 590] };
  const MIMIK_DONGU = [['emin', 'isaret'], ['notr', 'anlat'], ['emin', 'anlat'], ['notr', 'isaret']];
  let firlatSay = 0, mi = 0, Y, portalVar = false, damgaSay = 0;

  const sahneler = gruplar.map((g, gi) => {
    const i0 = g.cs[0].i0, i1 = g.cs[g.cs.length - 1].i1;
    const s = { k: i0, baslik: ['', ''], mimik: [], ogeler: [] };
    if (g.adim) s.adim = g.adim;
    Y = JSON.parse(JSON.stringify(Y0)); const bos = new Set(['A', 'B', 'C']);
    const al = (tercih) => { for (const y of tercih) if (bos.has(y)) { bos.delete(y); return Y[y]; } return null; };
    const ekle = (o, tercih) => { const p = al(tercih); if (!p) return false; s.ogeler.push(Object.assign({ x: p[0], y: p[1] }, o)); return true; };

    // başlık önerisi
    if (g.tip === 'hook' || gi === 0) { const b = r[KISA ? 'shorts video başlığı' : 'uzun video başlığı'].replace(/[!?].*$/, '').split(/\s+/); const h = Math.ceil(Math.min(b.length, 6) / 2); s.baslik = [UP(b.slice(0, h).join(' ')), UP(b.slice(h, Math.min(b.length, 6)).join(' '))]; }
    else if (g.tip === 'adim') { const w = g.cs[0].w.slice(2).map(temiz).filter(Boolean).slice(0, 3); s.baslik = [`${g.adim}. ADIM`, UP(w.join(' '))]; }
    else if (g.tip === 'cta') { const m = /yorumlara\s+(\S+)\s+yaz/i.exec(g.cs.map(c => c.t).join(' ')); s.baslik = m ? ['YORUMLARA', `"${UP(temiz(m[1]))}" YAZ`] : ['HAKLARINI KORU', 'TAKİPTE KAL']; }
    else { const w = g.cs[0].w.map(temiz).filter(Boolean).slice(0, 4); s.baslik = [UP(w.slice(0, 2).join(' ')), UP(w.slice(2).join(' '))]; }

    // --- portal (uzun, e-Devlet işlemi anlatılıyorsa)
    const gt = low(g.cs.map(c => c.t).join(' '));
    const aramaM = [...g.cs.map(c => c.t).join(' ').matchAll(/(?:arama çubuğuna|arama kısmına)\s+(.+?)\s+yaz/gi)];
    const ISLEM = /(işaretle|kutucu|butonuna|onayla|kaydet|seç|tıkla)/;
    if (!KISA && (aramaM.length || /e-devlet.{0,40}(giriş|gir)/.test(gt) || (portalVar && ISLEM.test(gt)))) {
      const ekr = {}, akis = [];
      const gk = bul(words, i0, i1, /(giriş yap|giriş|şifren)/);
      if (/e-devlet.{0,60}(giriş|şifre)/.test(gt) && gk >= 0) {
        ekr.giris = { tur: 'giris', baslik: 'e-Devlet ile Giriş', alanlar: [{ id: 'tc', label: 'T.C. Kimlik No', ph: '11 haneli kimlik numaranız' }, { id: 'sifre', label: 'e-Devlet Şifresi', ph: 'Şifreniz' }], buton: { id: 'giris', t: 'Giriş Yap' } };
        const ek = bulKok(words, i0, i1, 'e-devlet');
        akis.push({ k: Math.max(i0, ek), yap: 'url', yazi: 'turkiye.gov.tr', hiz: 16 }, { k: Math.max(i0, gk - 4), yap: 'yaz', alan: 'tc', yazi: '•••••••••••', hiz: 16 }, { k: Math.max(i0, gk - 1), yap: 'yaz', alan: 'sifre', yazi: '••••••••', hiz: 16 }, { k: gk, yap: 'tikla', hedef: 'giris', dt: .25 });
      }
      aramaM.forEach((m, j) => {
        const ad = 'ara' + j, sorgu = m[1].replace(/[“”"]/g, '');
        const sk = bul(words, i0, i1, /arama (çubuğuna|kısmına)/);
        const kurum = /([A-ZÇĞİÖŞÜ][\wçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ][\wçğıöşü]+){0,3}(?:’|')?(?:na|ne|ya|ye|a|e)?\s+ait)/.exec(g.cs.map(c => c.t).join(' '));
        ekr[ad] = { tur: 'arama', alan: ad, sonuclar: [{ t: sorgu, s: kurum ? kurum[1].replace(/(’|')?(na|ne|ya|ye|a|e)?\s+ait$/, '') : 'e-Devlet hizmeti' }] };
        akis.push({ k: Math.max(i0, sk - 1), yap: 'ekran', ad }, { k: sk + 2, yap: 'yaz', alan: ad, yazi: sorgu, hiz: Math.max(15, Math.round(sorgu.length / 2.2)) });
        const tk = bul(words, sk + 2, i1, /(tıkla|aç\.|seç)/); akis.push({ k: tk >= 0 ? tk : sk + 2 + sorgu.split(' ').length + 1, yap: 'tikla', hedef: 'r0', dt: .2 });
      });
      // açılan tablo / form
      const ak = bul(words, i0, i1, /^(açılan|ekranda|listede)/);
      const ls = g.cs.map(c => listeBul(c, words)).find(Boolean);
      if (ak >= 0 && ls) { ekr.tablo = { tur: 'tablo', baslik: 'Sonuçlar', kolonlar: ['Kalem', 'Tutar', 'Durum'], durum: true, satirlar: ls.map(o => [o.t.replace(/^[a-zçğıöşü]/, x => x.toLocaleUpperCase('tr')), '₺ •••,••', 'Bekliyor']) }; akis.push({ k: ak, yap: 'ekran', ad: 'tablo' }); ls.forEach((o, j) => akis.push({ k: o.k, yap: 'vurgula', hedef: 'row' + j })); }
      const bk = [...g.cs.map(c => c.t).join(' ').matchAll(/([A-ZÇĞİÖŞÜ][\wçğıöşü]+(?:\s+[A-ZÇĞİÖŞÜ][\wçğıöşü]+){0,3})\s+butonuna\s+(bas|tıkla)/g)];
      const ibanK = bulKok(words, i0, i1, 'iban');
      const kutuK = bul(words, i0, i1, /(kutucu|işaretle)/), onayK = bul(words, i0, i1, /(onayla|onay ver)/);
      if (bk.length || ibanK >= 0 || kutuK >= 0 || onayK >= 0) {
        const kutular = kutuK >= 0 ? ['Seçenek 1 (onaylıyorum)', 'Seçenek 2 (onaylıyorum)'] : [];
        ekr.form = { tur: 'form', baslik: 'İşlem Ekranı', kutular, ust: bk.length ? [{ id: 'b0', t: bk[0][1] }] : [], alanlar: ibanK >= 0 ? [{ id: 'iban', label: 'IBAN', ph: 'TR__ ____ ____ ____ ____ ____ __' }] : [], butonlar: [{ id: 'kaydet', t: onayK >= 0 ? 'Onayla' : 'Kaydet' }], toast: { id: 'ok', t: '✓ İşleminiz tamamlandı' } };
        const fk = Math.min(...[bk.length ? bulKok(words, i0, i1, low(bk[0][1].split(' ')[0])) : 1e9, ibanK >= 0 ? ibanK : 1e9, kutuK >= 0 ? kutuK : 1e9, onayK >= 0 ? onayK : 1e9]);
        akis.push({ k: Math.max(i0, fk - 1), yap: 'ekran', ad: 'form', dt: .2 });
        if (bk.length) akis.push({ k: fk + 1, yap: 'tikla', hedef: 'b0' });
        if (kutuK >= 0) akis.push({ k: kutuK, yap: 'vurgula', hedef: 'cb0' }, { k: kutuK + 1, yap: 'vurgula', hedef: 'cb1' }, { k: kutuK, yap: 'tikla', hedef: 'cb0' }, { k: kutuK + 1, yap: 'tikla', hedef: 'cb1' });
        if (ibanK >= 0) akis.push({ k: ibanK, yap: 'yaz', alan: 'iban', yazi: 'TR•• •••• •••• •••• •••• •••• ••', hiz: 18 });
        if (onayK >= 0 && bul(words, i0, i1, /kaydet/) < 0) akis.push({ k: onayK, yap: 'tikla', hedef: 'kaydet' }, { k: onayK, yap: 'goster', hedef: 'ok', dt: .3 });
        const kk = bul(words, i0, i1, /kaydet/); if (kk >= 0) akis.push({ k: kk, yap: 'tikla', hedef: 'kaydet' }, { k: kk, yap: 'goster', hedef: 'ok', dt: .3 });
      }
      if (Object.keys(ekr).length && akis.length) {
        akis.sort((a, b) => a.k - b.k);
        s.ogeler.push({ tip: 'portal', k: Math.min(akis[0].k, i0 + 2), x: Y.portal[0], y: Y.portal[1], w: 760, h: 455, kullanici: ekr.giris ? '' : 'Hoş geldiniz', ekranlar: ekr, akis });
        bos.delete('A'); bos.delete('C'); Y.B = [980, 330]; portalVar = true;
      }
    }
    // --- CTA
    if (g.tip === 'cta') {
      const m = /yorumlara\s+(\S+)\s+yaz/i.exec(g.cs.map(c => c.t).join(' '));
      const yk = bulKok(words, i0, i1, 'yorum');
      if (m && KISA) ekle({ tip: 'yorum', k: Math.max(i0, yk), k1: i1, yazi: UP(temiz(m[1])), yazK: yk + 1, hiz: 8 }, ['A']);
      s.ogeler.push({ tip: 'soru', k: KISA ? i1 : Math.min(i1, i0 + 1), firlat: true, x: KISA ? Y.soru[0] : 560, y: KISA ? Y.soru[1] : 450, e: '💬', yazi: m ? `'${UP(temiz(m[1]))}' yaz, rehber gelsin!` : 'Sende de oldu mu? Yorumlara yaz', ust: 'YORUMLARA YAZ 👇' });
      if (!KISA) s.ogeler.push({ tip: 'rozet', k: bulKok(words, i0, i1, 'abone') >= 0 ? bulKok(words, i0, i1, 'abone') : i1, x: 560, y: 650, e: '🔔', yazi: 'ABONE OL', renk: 'k', rot: -3 });
      s.mimik.push([i0, 'mutlu', 'yukari'], [Math.max(i0, i1 - 2), 'mutlu', 'basparmak']);
      s.zipla = [Math.min(i1, i0 + 1)];
      return s;
    }
    // --- liste
    const ls = g.cs.map(c => listeBul(c, words)).find(Boolean);
    if (ls && !s.ogeler.some(o => o.tip === 'portal')) ekle({ tip: 'liste', k: ls[0].k, ogeler: ls.map(o => ({ e: o.e, t: o.t })), alt: ls.map(o => o.k) }, ['A']);
    // --- e-Devlet kartı (portal yoksa)
    const ek = bulKok(words, i0, i1, 'e-devlet');
    if (ek >= 0 && !s.ogeler.some(o => o.tip === 'portal') && bos.has('A')) {
      const bk2 = bulKok(words, i0, i1, 'bekle');
      ekle({ tip: 'edevlet', k: ek, satirlar: [{ t: 'Giriş', sag: 'yapıldı' }, { t: 'İşlem durumu', rozet: 'HAZIR ✓' }], alt: [ek, bk2 >= 0 ? bk2 : ek + 3], rozetK: [bk2 >= 0 ? bk2 + 1 : ek + 4] }, ['A']);
    }
    // --- nesne (dilekçe, dava, kanun) ve ikonlar
    const nes = NESNE.map(([kok, ad, yazi]) => ({ k: bulKok(words, i0, i1, kok), ad, yazi })).filter(n => n.k >= 0).sort((a, b) => a.k - b.k)[0];
    if (nes) ekle({ tip: 'nesne', k: nes.k, ad: nes.ad, yazi: nes.yazi, rot: 6, firlat: firlatSay < 2 ? 'el' : undefined }, KISA ? ['A', 'B', 'C'] : ['B', 'C']) && firlatSay++;
    const ikonlar = IKON.map(([kok, e, yazi]) => ({ k: bulKok(words, i0, i1, kok), e, yazi })).filter(n => n.k >= 0)
      .sort((a, b) => a.k - b.k).filter((n, j, arr) => arr.findIndex(m => m.yazi === n.yazi) === j).slice(0, 2);
    ikonlar.forEach((n, j) => {
      const fl = gi === 0 && j === 0 && firlatSay < 3 ? 'el' : undefined; if (fl) firlatSay++;
      ekle({ tip: 'ikon', k: n.k, e: n.e, yazi: n.yazi, rot: j ? -4 : 5, firlat: fl }, KISA ? ['A', 'B', 'C'] : ['B', 'C']);
    });
    // --- sayılar (süre, tutar) ve damga
    sayilar(words, i0, i1).slice(0, 1).forEach(n => ekle({ tip: 'rozet', k: n.k, e: n.e, yazi: n.yazi, renk: 'y', rot: -3 }, ['C', 'B']));
    const dm = DAMGA.map(([kok, yazi]) => ({ k: bulKok(words, i0, i1, kok), yazi })).filter(d => d.k >= 0).sort((a, b) => a.k - b.k)[0];
    if (dm && damgaSay++ < 2) { const A = s.ogeler.find(o => o.tip === 'portal') ? Y.portal : Y.A; s.ogeler.push({ tip: 'damga', k: dm.k, x: A[0], y: A[1] + (KISA ? 10 : 60), yazi: dm.yazi, rot: -8 }); }
    // --- mimikler: cümle başlarında döngü + duyguya göre
    g.cs.forEach((c, ci) => {
      const t = low(c.t);
      if (/\?/.test(c.t)) s.mimik.push([c.i0, 'dusunceli', 'dusun']);
      else if (UYARI.test(t)) { const uk = bul(words, c.i0, c.i1, UYARI); s.mimik.push([c.i0, 'notr', 'anlat'], [Math.max(c.i0, uk), /sakın|dikkat/.test(t) ? 'kizgin' : 'korkmus', /sakın|dikkat/.test(t) ? 'dur' : 'eller_yukari']); }
      else if (OLUMLU.test(t)) { const ok = bul(words, c.i0, c.i1, OLUMLU); s.mimik.push([c.i0, 'emin', 'anlat'], [Math.max(c.i0, ok), 'mutlu', 'basparmak']); }
      else { const [f, j] = MIMIK_DONGU[mi++ % MIMIK_DONGU.length]; s.mimik.push([c.i0, f, j]); }
      if (gi === 0 && ci === 0) s.mimik[s.mimik.length - 1] = [c.i0, 'saskin', 'isaret'];
    });

    // ===== UZUN: zengin bileşenler (VID_003 kalıpları) =====
    if (!KISA) {
      const gtam = g.cs.map(c => c.t).join(' ');
      const buyuk = [];
      // koşullu cümleler → karşılaştırma
      const kos = [];
      g.cs.forEach(c => { const j = c.w.findIndex(w => /(ysa|yse|ysan|ysen|rsa|rse|rsan|rsen|zsa|zse|zsan|zsen)[,;]?$/.test(low(w)) && low(temiz(w)).length > 4);
        if (j >= 1) { const kosul = c.w.slice(Math.max(0, j - 2), j + 1).map(temiz).join(' '); const sonuc = c.w.slice(j + 1, j + 8).map(temiz).filter((w, q) => !(q === 0 && /^(de|da|bile|ise|o zaman)$/i.test(w))).slice(0, 6).join(' '); if (sonuc.split(' ').length >= 2) kos.push({ k: c.i0 + j, kosul, sonuc }); } });
      if (kos.length >= 2) buyuk.push({ tip: 'karsilastir', k: kos[0].k, sutunlar: kos.slice(0, 2).map((x, i) => ({ baslik: UP(x.kosul), renk: i ? 'y' : 'g', satirlar: [x.sonuc.charAt(0).toLocaleUpperCase('tr') + x.sonuc.slice(1)] })), alt: kos.slice(0, 2).map(x => x.k) });
      // metne/dilekçeye yaz + liste → e-posta/dilekçe şablonu
      g.cs.forEach(c => {
        if (!/(metne|dilekçe|e-posta|mail|başvuru metn)/.test(low(c.t))) return;
        const ls = listeBul(c, words); if (!ls) return;
        buyuk.push({ tip: 'eposta', k: c.i0, baslik: /dilekçe/.test(low(c.t)) ? 'Dilekçe' : 'Yazılı başvuru', alanlar: ls.map(o => ({ etiket: o.t.split(' ').slice(0, 2).join(' '), deger: /(numara|no\b|iban|kimlik|t\.c)/i.test(o.t) ? '•••••••••' : o.t })), alt: ls.map(o => o.k) });
      });
      // not et / hazırla / yanına al + liste → kontrol listesi
      g.cs.forEach(c => {
        if (!/(not et|not al|hazırla|yanına al|gerekli|sakla|kaydet|fotoğrafını çek|ekle)/.test(low(c.t))) return;
        if (buyuk.some(b => b.tip === 'eposta' && b.k === c.i0)) return;
        const ls = listeBul(c, words); if (!ls) return;
        buyuk.push({ tip: 'kontrol', k: ls[0].k, baslik: /not/.test(low(c.t)) ? 'NOT AL' : 'HAZIRLA', maddeler: ls.map(o => o.t), alt: ls.map(o => o.k) });
      });
      // mobil uygulama → telefon ekranı
      const mk = bul(words, i0, i1, /mobil uygulama/);
      if (mk >= 0) {
        const bm = /((?:[A-ZÇĞİÖŞÜ][\wçğıöşü]+\s+){0,2}[A-ZÇĞİÖŞÜ][\wçğıöşü]+)\s+(?:bölüm|menü|sekme)/.exec(gtam);
        const sec = bm ? bm[1] : 'İşlemlerim';
        const sk = bm ? bulKok(words, i0, i1, low(bm[1].split(' ')[0])) : mk + 2;
        const sahip = words.slice(Math.max(i0, mk - 2), mk).map(temiz).join(' ').replace(/(nın|nin|nun|nün|ın|in|un|ün)$/i, '');
        buyuk.push({ tip: 'portal', cihaz: 'telefon', uygulama: sahip ? sahip.charAt(0).toLocaleUpperCase('tr') + sahip.slice(1) : 'Uygulama', k: mk, w: 340, h: 480, ekranlar: { menu: { tur: 'menu', baslik: 'Menü', satirlar: ['Hesabım', sec, 'Bildirimler', 'Destek'] } }, akis: [{ k: mk, yap: 'ekran', ad: 'menu' }, { k: Math.max(mk + 1, sk), yap: 'tikla', hedef: 'm1' }] });
      }
      // başvuru / şikâyet kanalları → rozetler (alt satırlar)
      const KANAL = [['cimer', '📨', 'CİMER'], ['bddk', '🏛️', 'BDDK e-Şikayet'], ['tüketici hakem', '⚖️', 'Tüketici Hakem Heyeti'], ['sigorta tahkim', '⚖️', 'Sigorta Tahkim Komisyonu'], ['tahkim', '⚖️', 'Tahkim Komisyonu'],
        ['savcılı', '⚖️', 'Savcılık'], ['noter', '✒️', 'Noter'], ['kep', '📧', 'KEP'], ['alo 175', '☎️', 'ALO 175'], ['ticaret bakanlığı', '🏛️', 'Ticaret Bakanlığı'], ['btk', '📡', 'BTK'],
        ['bilgi teknolojileri', '📡', 'BTK'], ['kvkk', '🔐', 'KVKK'], ['kişisel verileri koruma', '🔐', 'KVKK'], ['icra dairesi', '🏛️', 'İcra Dairesi'], ['emniyet', '🚓', 'Emniyet'], ['karakol', '🚓', 'Karakol'], ['baro', '⚖️', 'Baro']];
      const kanallar = []; KANAL.forEach(([kok, e, ad]) => { const k = bulKok(words, i0, i1, kok); if (k >= 0 && !kanallar.some(x => x.ad === ad || (ad.includes('Tahkim') && x.ad.includes('Tahkim')))) kanallar.push({ k, e, ad }); });
      kanallar.sort((a, b) => a.k - b.k).slice(0, 2).forEach((x, j) => s.ogeler.push({ tip: 'rozet', k: x.k, x: 600, y: j ? 875 : 775, e: x.e, yazi: x.ad, renk: j ? 'b' : 's', rot: j ? 2 : -2 }));
      // büyük öğeleri yerleştir: aynı anda tek büyük öğe, sırayla
      if (buyuk.length) {
        s.ogeler.forEach(o => { if (['liste', 'edevlet'].includes(o.tip)) buyuk.push(o); });
        s.ogeler = s.ogeler.filter(o => !['liste', 'edevlet'].includes(o.tip));
        const eskiPortal = s.ogeler.find(o => o.tip === 'portal'); if (eskiPortal) { buyuk.push(eskiPortal); s.ogeler = s.ogeler.filter(o => o !== eskiPortal); }
        buyuk.sort((a, b) => a.k - b.k);
        for (let j = buyuk.length - 1; j >= 0; j--) { const b = buyuk[j]; if (['liste', 'edevlet', 'not'].includes(b.tip) && buyuk.some(o => o !== b && !['liste', 'edevlet', 'not'].includes(o.tip) && Math.abs(o.k - b.k) <= 3)) buyuk.splice(j, 1); }
        buyuk.forEach((b, j) => {
          if (b.tip === 'portal' && b.cihaz === 'telefon') { b.x = 430; b.y = 590; }
          else if (b.tip === 'portal') { b.x = b.x || Y0.portal[0]; b.y = b.y || Y0.portal[1]; }
          else { b.x = ['karsilastir', 'eposta'].includes(b.tip) ? 600 : 520; b.y = kanallar.length ? 520 : 560; }
          if (buyuk[j + 1]) b.k1 = buyuk[j + 1].k;
          s.ogeler.push(b);
        });
        bos.delete('A');
        const ilkB = Math.min(...buyuk.map(b => b.k));
        if (ilkB - i0 > 8) {   // ilk büyük öğeye kadar ana alan boş kalmasın: adım özeti
          const c0 = g.cs[0], w = c0.w.slice(g.tip === 'adim' ? 2 : 0).map(temiz).filter(Boolean).join(' ');
          const ks = w.length > 46 ? w.slice(0, w.lastIndexOf(' ', 46)) + '…' : w; const ik = IKON.find(([k]) => low(w).includes(k));
          s.ogeler.push({ tip: 'not', k: c0.i0 + (g.tip === 'adim' ? 2 : 0), k1: ilkB, x: 480, y: 560, e: ik ? ik[1] : '✅', ust: g.tip === 'adim' ? `${g.adim}. ADIM` : 'BİLMEN GEREKEN', yazi: ks.charAt(0).toLocaleUpperCase('tr') + ks.slice(1) });
        }
        if (s.ogeler.some(o => o.tip === 'portal' || o.tip === 'karsilastir' || o.tip === 'eposta')) { bos.delete('C'); }
      }
      if (kanallar.length) { bos.delete('C'); }
    }
    if (bos.has('A')) {
      const c0 = g.tip === 'adim' ? g.cs[0] : g.cs[0];
      let w = c0.w.slice(g.tip === 'adim' ? 2 : 0).map(temiz).filter(Boolean);
      const cumle = w.join(' ');
      const kisa = cumle.length > 46 ? cumle.slice(0, cumle.lastIndexOf(' ', 46)) + '…' : cumle;
      const ik = IKON.find(([k]) => low(cumle).includes(k));
      ekle({ tip: 'not', k: c0.i0 + (g.tip === 'adim' ? 2 : 0), e: ik ? ik[1] : (g.tip === 'adim' ? '✅' : '📌'), ust: g.tip === 'adim' ? `${g.adim}. ADIM` : 'BİLMEN GEREKEN', yazi: kisa.charAt(0).toLocaleUpperCase('tr') + kisa.slice(1) }, ['A']);
    }
    if (dm) s.mimik.push([dm.k, 'korkmus', 'eller_yukari']);
    // --- çakışma önleme
    if (!KISA) {
      const genis = s.ogeler.filter(o => ['karsilastir', 'eposta'].includes(o.tip) || (o.tip === 'portal' && o.cihaz !== 'telefon'));
      s.ogeler = s.ogeler.filter(o => {
        if (!['ikon', 'nesne'].includes(o.tip)) return true;
        for (const w of genis) { const w1 = w.k1 ?? 1e9;
          if (o.k < w.k) { o.k1 = Math.min(o.k1 ?? 1e9, w.k); if (o.k1 === 1e9) delete o.k1; }
          else if (o.k < w1) return false; }
        return true; });
      if (s.ogeler.some(o => o.tip === 'rozet' && o.y >= 775)) s.ogeler.forEach(o => { if (['edevlet', 'liste', 'not', 'kontrol'].includes(o.tip)) o.y = 520; });
    } else s.ogeler.forEach(o => { if (o.tip === 'nesne') o.y -= 18; });
    s.mimik.sort((a, b) => a[0] - b[0]);
    return s;
  });
  return { adimSayisi, sahneler, son: { ifade: 'mutlu', jest: 'selam', uzat: KISA ? 1.3 : 2.5 } };
}

if (require.main === module) {
  const [, , ID, TUR = 'kisa'] = process.argv;
  const p = planla(ID, TUR);
  const out = path.join(KOK, 'planlar', `${ID}_${TUR}.js`);
  if (fs.existsSync(out) && !process.argv.includes('--uzerine')) { console.error(`${out} zaten var (üzerine yazmak için --uzerine)`); process.exit(1); }
  fs.writeFileSync(out, `// ${ID} ${TUR} — otomatik plan (scripts/video/planla.js). Başlıklar ve öğeler elle düzenlenebilir.\nmodule.exports = ${JSON.stringify(p, null, 1)};\n`);
  console.log(out); p.sahneler.forEach(s => console.log(`  [k${s.k}] ${s.baslik.join(' / ')} — ${s.ogeler.map(o => o.tip + (o.firlat ? '*' : '')).join(', ')}`));
}
module.exports = { planla };
