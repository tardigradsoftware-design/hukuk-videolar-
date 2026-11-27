// VID_003 uzun — sahne dili 7 "Defter tarifi" (ror-fly Negroni uyarlaması): tek dosya adım adım dolar, sağda ölçü kartı, altta 1–5 çizelge.
// Rakamlar yalnız metinden: 30 gün, %100, 6502, 15 iş günü, 2–4 ay. Kişisel veri •••.
const base = require('./VID_003_uzun_s3.js');
const D = {
  tur: 'df_ana', sinif: 'df', a: 0,
  baslik: { ust: 'Kredi hayat sigortası iadesi', alt: [['şubeye gitmeden paranı geri al', 0], ['yasal olarak zorunlu değil', 17], ['5 net adım', 38], ['dikkat: faiz blöfü', 52], ['adım adım dosyanı hazırla', 61], ['dosya hazır', 453]] },
  fis: { ust: 'KREDİ ÖDEME PLANI', satirlar: [['Kredi tutarı', '••• TL', 1], ['Dosya masrafı', '••• TL', 4], ['Hayat sigortası primi', '••• TL', 7], ['Hesaba geçen', '••• TL', 9]], daire: 2, daireK: 10, cik: 61 },
  adimK: 38, bitK: 453,
  adimlar: [['30 GÜN CAYMA', 61], ['POLİÇEYİ BUL', 111], ['YAZILI TALEP', 186], ['FAİZ ŞARTI', 273], ['B PLANI', 387]],
  form: { k: 61, baslik: 'İptal ve iade dosyası', ust: 'KREDİ HAYAT SİGORTASI',
    ozetler: ['Cayma süresi kontrol edildi', 'Poliçe bilgileri not edildi', 'Yazılı talep gönderildi', 'Faiz şartı kontrol edildi', 'B planı hazır'],
    alanlar: [
      [['SÜRE', 'Poliçe tarihinden 30 gün', 74], ['İLK 30 GÜN', 'Primin %100’ü iade', 90], ['SONRASI', 'Kalan gün kadar iade', 100]],
      [['POLİÇE NO', '•••••••', 141], ['BAŞLANGIÇ', '••.••.••••', 142], ['ŞİRKET', '••• Sigorta (tam adı)', 146]],
      [['KANAL', 'Uygulama / resmi e-posta', 209], ['KİMLİK', 'T.C. •••••••••••', 219], ['POLİÇE', '•••••••', 222], ['HAK', '30 gün cayma / erken iptal', 226], ['İADE', 'Kendi adına IBAN', 241]],
      [['SÖZLEŞME', 'Faiz farkı yazıyor mu?', 291], ['YAZMIYORSA', 'Faiz değişemez', 300], ['YAZIYORSA', 'Dışarıdan ucuz poliçe', 316], ['BANKAYA', 'Dain-i mürtehin şerhi', 324]],
      [['EKLER', 'Yazılı talep + poliçe çıktısı', 407], ['BAŞVURU', 'BDDK e-Şikayet', 411], ['VEYA', 'Sigorta Tahkim Komisyonu', 418]]] },
  kartlar: [
    { k: 13, ust: 'BANKADA KALMASIN', buyuk: 'PRİM', alt: 'Hayat sigortası primi', not: 'bırakmak zorunda değilsin' },
    { k: 17, ust: 'SİGORTACILIK MEVZUATI', buyuk: 'ZORUNLU DEĞİL', alt: 'Kredi hayat sigortası', not: 'yasal olarak' },
    { k: 28, ust: 'ŞUBEYE GİTMEDEN', buyuk: 'İPTAL + İADE', alt: 'Paranı geri alabilirsin' },
    { k: 38, ust: 'YOL HARİTASI', buyuk: '5 ADIM', alt: 'Hiçbir detayı atlamadan' },
    { k: 49, ust: 'BANKALARIN ÇOĞU', buyuk: 'FAİZ BLÖFÜ', alt: '4. adımda göstereceğim', not: 'müşteriyi vazgeçirmeye çalışırlar' },
    { k: 61, ust: 'ADIM 1 / 5', buyuk: '30 GÜN', alt: 'Cayma hakkı', not: 'poliçenin kesildiği günden itibaren', bar: [74, 79, '1. gün', '30. gün'] },
    { k: 83, ust: 'ADIM 1 / 5', buyuk: '%100', alt: 'İade · tek kuruş kesintisiz', not: 'ilk 30 gün içinde başvurursan', bar: [90, 92, '%0', '%100'] },
    { k: 95, ust: 'ADIM 1 / 5', buyuk: 'KALAN GÜNLER', alt: '30 gün geçtiyse de vazgeçme', not: 'gün bazlı hesaplanıp iade edilir', bar: [100, 107, 'kullanılan', 'kalan → iade'] },
    { k: 111, ust: 'ADIM 2 / 5', buyuk: 'POLİÇE NO', alt: 've sigorta şirketi', not: 'e-Devlet · Sigorta Bilgi ve Gözetim Merkezi' },
    { k: 151, ust: 'BANKA DERSE Kİ', buyuk: '6502', alt: 'Sayılı kanuna göre zorunlu değil', not: 'yazılı iptal talebini kayıt altına aldır' },
    { k: 186, ust: 'ADIM 3 / 5', buyuk: 'YAZILI TALEP', alt: 'Şubeye gitmeden', not: 'uygulama · Poliçe İşlemleri / resmi e-posta' },
    { k: 248, ust: 'SENİN BANKAN', buyuk: 'BLÖF?', alt: '“Faiz artar” dediler mi?' },
    { k: 273, ust: 'ADIM 4 / 5', buyuk: 'FAİZ ŞARTI', alt: 'Kredi sözleşmeni kontrol et', not: 'sigortalı–sigortasız faiz farkı yazıyor mu?' },
    { k: 326, ust: 'TEK KARTTA', buyuk: 'ÖZET', alt: 'Süreler ve başvuru sırası', not: 'ekran görüntüsünü al' },
    { k: 372, ust: 'ADIM 5 / 5', buyuk: 'B PLANI', alt: '15 iş günü içinde iade yoksa' },
    { k: 424, ust: 'SÜREÇ TAKVİMİ', buyuk: '≤ 15 İŞ GÜNÜ', alt: 'Prim iadesi hesabında', bar: [427, 435, 'yazılı başvuru', '15 iş günü'], ek: '<div class="a">Ret gelirse: 2–4 ay</div><div class="n">Sigorta Tahkim · bağlayıcı karar</div>' },
    { k: 453, ust: 'DOSYA TAMAM', buyuk: '5 / 5', alt: 'Paran bankada kalmadı', not: 'sırada: unutulmuş BES ve SGK ödemeleri' }],
  ekranlar: [
    { k: 119, cik: 150, url: 'turkiye.gov.tr', baslik: 'Hayat Sigortası Poliçe Sorgulama', arama: ['Hayat Sigortası Poliçe Sorgulama', 121], satirlar: [['Poliçe ••• · Aktif', 136, 139], ['Poliçe ••• · Sona erdi', [136, .3]]] },
    { k: 204, cik: 247, url: 'sigorta şirketi uygulaması', baslik: 'Poliçe İşlemleri', satirlar: [['İptal talebi oluştur', 206, 207], ['Belgelerim', [206, .2]], ['Ödeme planı', [206, .4]]] },
    { k: 408, cik: 414, url: 'turkiye.gov.tr', baslik: 'BDDK e-Şikayet', arama: ['BDDK e-Şikayet', 409], satirlar: [['Şikâyet başvurusu', 411, 411]] },
    { k: 414, cik: 424, url: 'sigortatahkim.org', baslik: 'Sigorta Tahkim Komisyonu', satirlar: [['Başvuru formu', 416, 418]] }],
  malzemeler: [
    { ad: 'takvim', k: 63, dok: 74, cik: 82, x: 850, y: 230 }, { ad: 'para', k: 88, dok: 90, cik: 95, x: 850, y: 230 },
    { ad: 'buyutec', k: 113, dok: 140, cik: 150, x: 850, y: 230 }, { ad: 'telefon', k: 192, cik: 202, x: 850, y: 230 },
    { ad: 'zarf', k: 211, dok: 219, cik: 247, x: 850, y: 230 }, { ad: 'belge', k: 285, dok: 291, cik: 301, x: 850, y: 230 },
    { ad: 'kalkan', k: 305, dok: 316, cik: 325, x: 850, y: 230 }, { ad: 'terazi', k: 400, dok: 416, cik: 424, x: 850, y: 230 },
    { ad: 'cuzdan', k: 458, cik: 495, x: 850, y: 230 }],
  balonlar: [
    { k: 151, cik: 166, ust: 'BANKA TEMSİLCİSİ', metin: '“Bu sigorta kredi şartıdır, iptal edemeyiz.”', ciz: 165, x: 380, y: 300 },
    { k: 194, cik: 204, ust: 'YAPMA', metin: 'Bankayı arayıp telefonda ikna olma', x: 1040, y: 600 }],
  damgalar: [
    { k: 25, cik: 28, metin: 'Zorunlu değil', x: 1100, y: 620, rot: -6 }, { k: 57, cik: 61, metin: 'Blöf', x: 1180, y: 640, rot: 8 },
    { k: 170, cik: 186, metin: 'Zorunlu değil', x: 440, y: 560, rot: -7 }, { k: 197, cik: 204, metin: 'Telefon yok', x: 800, y: 330, rot: 9 },
    { k: 298, cik: 302, metin: 'Değiştiremezler', x: 1090, y: 620, rot: -5 }, { k: 354, cik: 366, metin: 'Ekran görüntüsü al', x: 1060, y: 640, rot: -4 },
    { k: 421, cik: 424, metin: 'Kuruşu kuruşuna', x: 1090, y: 600, rot: -6 }, { k: 487, metin: 'Dosya hazır', x: 1110, y: 640, rot: -6 }],
  notlar: [
    { k: 13, cik: 17, metin: 'bankada bırakmak zorunda değilsin!', x: 380, y: 640, ok: [80, -140] },
    { k: 30, cik: 38, metin: 'online iptal → para hesabına', x: 380, y: 650 },
    { k: 83, cik: 95, metin: 'tek kuruş kesinti yok', x: 1060, y: 640 },
    { k: 172, cik: 186, metin: '“yazılı iptal talebimi kayıt altına alın”', x: 1040, y: 640, renk: '#2F5DA8' },
    { k: 301, cik: 326, metin: 'yazıyorsa bile: aynı teminat, çok daha ucuza', x: 1040, y: 640, renk: '#2F5DA8' },
    { k: 357, cik: 366, metin: 'tek hak kaybında binlerce lira', x: 1060, y: 640 },
    { k: 377, cik: 400, metin: 'talebi reddederse → paranı zorla al', x: 1040, y: 640 },
    { k: 465, cik: 487, metin: 'BES + SGK ödemelerin de bekliyor olabilir', x: 1040, y: 640, renk: '#2F5DA8' }],
  yapiskan: [
    { k: 262, cik: 273, metin: 'Yorumlara <b>BLÖF</b> yaz', alt: 'Hangi bankada ne yaşadın?', x: 1100, y: 590 },
    { k: 366, cik: 372, metin: '<b>Abone ol</b>', alt: 'yeni rehberleri kaçırma', x: 1110, y: 590 }],
  odak: [{ k: 342, cik: 356, x: 630, y: 520, s: 1.16 }],
};
const ses = [];
D.fis.satirlar.forEach(r => ses.push([r[2], 'kagit'])); ses.push([D.fis.daireK, 'swish']);
D.kartlar.forEach(c => ses.push([c.k, 'swish'])); D.adimlar.forEach(a => ses.push([a[1], 'ding']));
D.form.alanlar.flat().forEach(a => ses.push([a[2], 'kagit']));
D.malzemeler.forEach(m => { ses.push([m.k, 'whoosh']); if (m.dok != null) ses.push([m.dok, 'pop']); });
D.damgalar.forEach(d => ses.push([d.k, 'thud'])); D.balonlar.forEach(b => ses.push([b.k, 'pop'])); D.yapiskan.forEach(p => ses.push([p.k, 'kagit']));
D.ekranlar.forEach(e => { ses.push([e.k, 'whoosh']); if (e.arama) ses.push([e.arama[1], 'key']); });
module.exports = { maskot: true, dil: 7, sahneler: base.sahneler, s3: [D], sesler: ses.map(([k, t]) => [k, t, undefined, 0]) };
