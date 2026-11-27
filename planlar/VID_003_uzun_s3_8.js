// VID_003 uzun — sahne dili 8 "Gerçek ekran": altyazısız; büyük temsili ekranlar, sade slaytlar, alt bilgi bandı, ekran görüntüsü simülasyonu.
// Rakamlar yalnız metinden (30 gün, %100, 6502, 15 iş günü, 2–4 ay). Kişisel veri •••. Resmi logo yok, "TEMSİLİ GÖRÜNTÜ".
const base = require('./VID_003_uzun_s3.js'), v5 = require('./VID_003_uzun_v5.js');
const P = k => { const b = v5.vuruslar.find(x => x.tip === 'panel' && x.k === k); return { cihaz: b.cihaz, url: b.url, site: b.site, ekranlar: JSON.parse(JSON.stringify(b.ekranlar)) }; };
const tel = P(200); tel.ekranlar = tel.ekranlar.filter(e => e.tur !== 'sonuc');
tel.ekranlar.push({ k: 218, tur: 'form', baslik: 'İptal ve iade talebi', alanlar: [{ ad: 'T.C. kimlik no', deger: '•••••••••••' }, { ad: 'Poliçe no', deger: '•••••••' }, { ad: 'Talep', deger: '30 gün cayma / erken iptal' }, { ad: 'İade IBAN', deger: 'TR•• •••• •••• ••••' }], alanK: [219, 222, 226, 241], buton: 'Gönder', butonK: 246 });
tel.ekranlar.push({ k: [247, .3], tur: 'sonuc', baslik: 'Talebin alındı', alt: 'Prim iadesi kendi IBAN’ına', ref: '•••-•••' });
const s3 = [
  { tur: 'g_slayt', sinif: 'gr', a: 0, ust: 'KREDİ HAYAT SİGORTASI', baslik: 'Primi bankada bırakmak zorunda değilsin',
    belge: { tur: 'plan', baslik: 'Kredi Ödeme Planı', satirlar: [['Kredi tutarı', '••• TL', 1], ['Dosya masrafı', '••• TL', 4], ['Hayat sigortası primi', '••• TL', 7, 10], ['Hesaba geçen', '••• TL', 9]], damga: 'ZORUNLU DEĞİL', damgaK: 25 },
    maddeler: [['Sigortacılık mevzuatına göre yasal olarak zorunlu değil', 17, 'zorunlu değil'], ['Şubeye gitmeden iptal edip paranı geri alabilirsin', 28, 'şubeye gitmeden']], mdY: 520, mdAra: 170 },
  { tur: 'g_slayt', sinif: 'gr', a: 38, ust: 'YOL HARİTASI', baslik: '5 net adımda paranı geri al',
    maddeler: [['30 gün cayma hakkını kontrol et', 38], ['Poliçe numarasını ve şirketi tespit et', [38, .25]], ['Yazılı iptal ve iade talebi gönder', [38, .5]], ['Faiz artışı blöfüne karşı önlem al', [38, .75], 'faiz artışı blöfüne'], ['B planı: BDDK ve Sigorta Tahkim', [38, 1]]], mdY: 330, mdAra: 104,
    vurguK: [null, null, null, 55, null],
    altbant: [{ k: 49, ust: 'DİKKAT', metin: 'Bankaların çoğu 4. adımda “faiz artar” blöfüyle vazgeçirmeye çalışır', uy: 1 }] },
  { tur: 'g_slayt', sinif: 'gr', a: 61, adim: 1, rayUst: 'ADIM 1 / 5', rayAd: 'Cayma hakkı', ust: '1. ADIM', baslik: '30 gün cayma hakkını kontrol et',
    belge: { tur: 'police', baslik: 'Kredi Hayat Sigortası Poliçesi', satirlar: [['Poliçe no', '•••••••', 61], ['Sigorta şirketi', '••• Sigorta A.Ş.', 61], ['Başlangıç tarihi', '••.••.••••', 72, 74], ['Prim', '••• TL', 87, 89]] },
    zaman: [{ y: 560, k: 74, dolK: 75, n: 30, a: 0, b: 30, adim: 5, sol: 'Poliçe başlangıcı', orta: 'İlk 30 gün', sag: '30. gün' }],
    maddeler: [], altbant: [{ k: 80, cik: 95, ust: 'İLK 30 GÜN', metin: 'Tek kuruş kesintisiz: primin %100’ü hesabına' }, { k: 95, ust: '30 GÜN GEÇTİYSE', metin: 'Vazgeçme: kalan vade günleri kadar gün bazlı iade' }] },
  { tur: 'g_ekran', sinif: 'gr', a: 111, adim: 2, rayUst: 'ADIM 2 / 5', rayAd: 'Poliçeyi bul', panel: P(111), ss: [149],
    yan: [[121, 'ARAMA', 'Hayat Sigortası Poliçe Sorgulama'], [129, 'HİZMET', 'Sigorta Bilgi ve Gözetim Merkezi']],
    altbant: [{ k: 136, cik: 151, ust: 'NOT ET', metin: 'Poliçe numarası · başlangıç tarihi · şirketin tam adı' }] },
  { tur: 'g_slayt', sinif: 'gr', a: 151, adim: 2, rayUst: 'ADIM 2 / 5', rayAd: 'Poliçeyi bul', ust: 'BANKA TEMSİLCİSİ DERSE Kİ',
    alinti: { ust: 'BANKA', metin: '“Bu sigorta kredi şartıdır, iptal edemeyiz.”', k: 152, cizK: 165 },
    cevap: { ust: 'NET CEVABIN', metin: '6502 sayılı kanuna göre sigorta zorunlu değildir. Yazılı iptal talebimi kayıt altına alın.', k: 165, y: 600 } },
  { tur: 'g_ekran', sinif: 'gr', a: 186, adim: 3, rayUst: 'ADIM 3 / 5', rayAd: 'Yazılı talep', panel: tel, x: 560, y: 90,
    yan: [[204, 'KANAL', 'Uygulama · Poliçe İşlemleri'], [213, 'YA DA', 'Resmi müşteri hizmetleri e-postası'], [218, 'METNE YAZ', 'Kimlik no · poliçe no · hak · IBAN']],
    altbant: [{ k: 186, cik: 194, ust: '3. ADIM', metin: 'Yazılı iptal ve iade talebi gönder' }, { k: 194, cik: 204, ust: 'YAPMA', metin: 'Bankayı arayıp telefonda ikna olma', uy: 1 }, { k: 226, cik: 247, ust: 'HAK', metin: '30 gün cayma ya da erken iptal hakkı kapsamında' }] },
  { tur: 'g_slayt', sinif: 'gr', a: 248, ust: 'SENİN BANKAN', baslik: '“Faiz artar” blöfü yaptılar mı?',
    maddeler: [['Hangi bankada ne yaşadığını yorumlara yaz', 262, 'yorumlara yaz'], ['Diğer izleyiciler de hazırlıklı olsun', 268]], mdY: 470, mdAra: 130 },
  { tur: 'g_slayt', sinif: 'gr', a: 273, adim: 4, rayUst: 'ADIM 4 / 5', rayAd: 'Faiz blöfü', ust: '4. ADIM', baslik: 'Faiz blöfüne karşı sözleşmeni kontrol et',
    belge: { tur: 'sozlesme', baslik: 'Kredi Sözleşmesi', satirlar: [['Kredi tutarı', '••• TL', 289], ['Sigortalı faiz oranı', '%•••', 293, 294], ['Sigortasız faiz oranı', '%•••', 294, 296], ['Vade', '•• ay', 289]] },
    maddeler: [['Fark açıkça yazmıyorsa faizi değiştiremezler', 298, 'değiştiremezler', 'ok'], ['Yazıyorsa bile: dışarıdan aynı teminatlı, çok daha ucuz poliçe', 309, 'çok daha ucuz'], ['Bankaya dain-i mürtehin şerhiyle sun', 321, 'dain-i mürtehin şerhiyle']], mdY: 470, mdAra: 150 },
  { tur: 'g_slayt', sinif: 'gr', a: 326, ust: 'TEK KARTTA', baslik: 'Kredi sigortası iade özeti', ss: [354],
    kart: { ust: 'SÜRELER VE BAŞVURU SIRASI', k: 331, cik: 366, satirlar: [['İlk 30 gün: primin %100’ü iade', 342], ['30 gün sonrası: kalan günler gün bazlı', 343], ['Yazılı başvuru + kendi IBAN’ın', 344], ['Faiz farkı yazmıyorsa faiz değişmez', 345], ['15 iş günü içinde iade yoksa: BDDK / Tahkim', 346]] },
    abone: { k: 366, yazi: 'Tek bir hak kaybında binlerce lira ödememek için', ek: 'yeni rehberleri kaçırma', x: 140, y: 420 } },
  { tur: 'g_slayt', sinif: 'gr', a: 372, adim: 5, rayUst: 'ADIM 5 / 5', rayAd: 'B planı', ust: '5. ADIM · B PLANI', baslik: '15 iş günü içinde iade yoksa',
    maddeler: [['Yazılı iptal talebini hazırla', 402], ['Poliçe çıktını ekle', 406], ['e-Devlet → BDDK e-Şikayet', 408]], mdY: 420, mdAra: 120 },
  { tur: 'g_ekran', sinif: 'gr', a: 408, adim: 5, rayUst: 'ADIM 5 / 5', rayAd: 'B planı', panel: P(408), yan: [[409, 'BAŞVURU', 'BDDK e-Şikayet']] },
  { tur: 'g_ekran', sinif: 'gr', a: 414, adim: 5, rayUst: 'ADIM 5 / 5', rayAd: 'B planı', panel: P(414), yan: [[415, 'BAŞVURU', 'Sigorta Tahkim Komisyonu']],
    altbant: [{ k: 420, ust: 'SONUÇ', metin: 'Paranı kuruşu kuruşuna alırsın' }] },
  { tur: 'g_slayt', sinif: 'gr', a: 424, ust: 'SÜREÇ TAKVİMİ', baslik: 'Süreler net',
    zaman: [{ y: 380, k: 427, dolK: 430, n: 15, a: 0, b: 15, adim: 5, sol: 'Yazılı başvuru', orta: 'En geç 15 iş günü', sag: 'Prim iadesi hesabında' },
      { y: 640, k: 440, dolK: 445, n: 4, a: 2, b: 4, adim: 1, sol: 'Ret gelirse · Sigorta Tahkim', orta: 'Ortalama 2–4 ay', sag: 'Bağlayıcı karar' }] },
  { tur: 'g_slayt', sinif: 'gr', a: 453, ust: 'SIRADA', baslik: 'e-Devlet’te unutulmuş paraların olabilir',
    maddeler: [['Eski işyerlerinden kalan otomatik BES kesintilerin', 465, 'otomatik BES'], ['Haberin olmadan bekleyen SGK şahıs ödemelerin', 469, 'SGK şahıs ödemelerin'], ['Ekrandaki videoda: dakikalar içinde hesabına aktar', 477, 'dakikalar içinde']], mdY: 420, mdAra: 130,
    abone: { k: 484, yazi: 'Hemen kontrol et', ek: 'yeni rehberler için abone ol', x: 140, y: 820 } },
];
const ses = [];
s3.forEach(s => { ses.push([s.a, 'whoosh']); (s.maddeler || []).forEach(m => { const k = Array.isArray(m[1]) ? m[1] : [m[1], 0]; ses.push([k[0], 'pop', .6, k[1]]); });
  (s.altbant || []).forEach(a => ses.push([a.k, 'swish'])); (s.ss || []).forEach(k => ses.push([k, 'click'])); if (s.belge && s.belge.damgaK) ses.push([s.belge.damgaK, 'thud']);
  if (s.alinti) ses.push([s.alinti.cizK, 'swish']); if (s.panel) s.panel.ekranlar.forEach(e => { if (e.aramaK) ses.push([e.aramaK, 'key']); ['butonK', 'secK', 'tapK', 'onayK'].forEach(f => { if (e[f] != null) ses.push([e[f], 'click']); }); (e.alanK || []).forEach(k => ses.push([k, 'key'])); }); });
module.exports = { maskot: true, dil: 8, altyazi: false, sahneler: base.sahneler, s3, sesler: ses.map(([k, t, v, d]) => [Array.isArray(k) ? k[0] : k, t, v, d || 0]) };
