// VID_003 uzun — 2.–5. adım + kapanış sahneleri (k111 → son). Stil 1 (m1: Mavi Ferah) ve Stil 3 (k3: Kâğıt Serif) için ayrı kurgular.
// Genel motor: scripts/video/sahne/sema.js (c_genel). Rakamlar yalnız metinden: 6502, 30 gün, 15 iş günü, 2–4 ay. Kişisel veri •••.
const URL = 'https://www.turkiye.gov.tr', SITE = 'e-Devlet Kapısı';
const POLICE = { k: 119, tur: 'arama', metin: 'Hayat Sigortası Poliçe Sorgulama', aramaK: 121, oneriler: [['Hayat Sigortası Poliçe Sorgulama', 'Sigorta Bilgi ve Gözetim Merkezi']], sec: 0, secK: 129 };
const TABLO = { k: 136, tur: 'tablo', baslik: 'Poliçelerim', kolonlar: ['Poliçe no', 'Şirket', 'Başlangıç', 'Durum'], durum: 1, hl: [0, 138], satirlar: [[['•••', '•••', '••.••.••••', 'Aktif'], 136], [['•••', '•••', '••.••.••••', 'Sona erdi'], [136, .3]]] };
const FORM = { k: 206, tur: 'form', baslik: 'Poliçe İşlemleri', ust: { yazi: 'İptal talebi', k: 207 }, alanlar: [['T.C. KİMLİK NO', '•••••••••••', 219], ['POLİÇE NO', '•••••••', 222], ['TALEP', '30 gün cayma / erken iptal', 226], ['İADE IBAN', 'TR•• •••• •••• ••••', 241]], buton: { yazi: 'Gönder', k: 247 }, sonuc: { yazi: 'Talep alındı', k: [247, .4] } };
const BDDK = { k: 408, tur: 'arama', metin: 'BDDK e-Şikayet', aramaK: 409, oneriler: [['BDDK e-Şikayet', 'Bankacılık Düzenleme ve Denetleme Kurumu']], sec: 0, secK: 411 };
const TAHKIM = { k: 414, tur: 'form', baslik: 'Sigorta Tahkim Komisyonu', alanlar: [['TALEP', 'Prim iadesi', 416], ['EKLER', 'İptal talebi + poliçe', 418]], buton: { yazi: 'Başvur', k: 419 }, sonuc: { yazi: 'Başvuru alındı', k: [419, .4] } };
const OZET = [['30 gün içinde: primin %100’ü', 342], ['Sonra: kalan günler gün bazlı', 343], ['Yazılı başvuru + kendi IBAN’ın', 344], ['Faiz farkı yazmıyorsa değişmez', 345], ['15 iş günü: BDDK / Tahkim', 346]];

const m1 = [
  { tur: 'c_genel', sinif: 'm1', gir: 'zoom', a: 111, adim: 2, adimAd: 'POLİÇEYİ BUL', ogeler: [
    { t: 'baslik', x: 100, y: 210, boy: 140, satir: [['Poliçeni', 113], ['bul,', 116], ['not', 149, 1], ['et.', 150, 1]] },
    { t: 'panel', x: 880, y: 250, w: 700, h: 560, url: URL, site: SITE, k: 112, ekranlar: [{ ...POLICE, k: 112 }, TABLO] },
    { t: 'cip', x: 1230, y: 130, ek: 'BİLGİ', cipler: [[141, '1', 'Poliçe numarası', 'Not et', 1], [142, '2', 'Başlangıç tarihi', 'Not et', 1], [146, '3', 'Şirketin tam adı', 'Not et', 1]] } ] },
  { tur: 'm_mavi', sinif: 'm1 mavi', koyu: true, gir: 'daire', a: 151, adim: 2, gruplar: [
    { a: 151, ust: 'BANKA TEMSİLCİSİ DERSE Kİ', s: ['“Bu sigorta kredi', 'şartıdır.”'], pill: 'şartıdır.”', pillK: 157, son: 161 },
    { a: 161, ust: 'NET CEVAP · 6502 SAYILI KANUN', s: ['Sigorta', 'zorunlu değildir.'], pill: 'değildir.', pillK: 171, son: 172 },
    { a: 172, ust: 'VE EKLE', s: ['Yazılı iptal talebimi', 'kayıt altına alın.'], pill: 'alın.', pillK: 176 }] },
  { tur: 'c_genel', sinif: 'm1', gir: 'zoom', a: 178, adim: 3, adimAd: 'YAZILI BAŞVURU', ogeler: [
    { t: 'baslik', x: 100, y: 210, boy: 140, satir: [['Yazılı', 188], ['iptal', 189], ['talebi.', 192, 1]] },
    { t: 'damga', x: 120, y: 690, yazi: 'Telefonda ikna olma', k: 196, cik: 204, rot: -5 },
    { t: 'ikon', ad: 'telefon', x: 980, y: 330, boy: 260, k: 194, cik: 200 },
    { t: 'panel', cihaz: 'telefon', x: 1120, y: 190, w: 440, h: 690, site: 'Sigorta şirketi uygulaması', k: 200, ekranlar: [{ ...FORM, k: 200 }] },
    { t: 'cip', x: 560, y: 650, ek: 'KANAL', cipler: [[204, '1', 'Mobil uygulama', 'Poliçe İşlemleri', 1], [213, '@', 'Resmi e-posta', 'Müşteri hizmetleri', 1], [218, '✓', 'Metne 4 bilgi yaz', 'Kimlik · poliçe · hak · IBAN']], toplam: 2 } ] },
  { tur: 'c_genel', sinif: 'm1', gir: 'zoom', a: 248, ogeler: [
    { t: 'baslik', x: 100, y: 210, boy: 150, satir: [['“Faiz', 257], ['artar”', 258], ['dediler', 260], ['mi?', 261, 1]] },
    { t: 'yorum', x: 900, y: 330, kelime: 'BLÖF', soru: 'Hangi bankada ne yaşadın? Herkes hazırlıklı olsun.', k: 262 },
    { t: 'ikon', ad: 'mesaj', x: 1300, y: 600, boy: 200, k: 266 } ] },
  { tur: 'c_genel', sinif: 'm1', gir: 'zoom', a: 273, adim: 4, adimAd: 'FAİZ BLÖFÜ', ogeler: [
    { t: 'baslik', x: 100, y: 210, boy: 140, satir: [['Faiz', 276], ['blöfüne', 278, 1], ['karşı', 279], ['önlem.', 281]] },
    { t: 'kart', x: 880, y: 250, w: 680, h: 380, renk: '#fff', eti: 'KREDİ SÖZLEŞMESİ · TEMSİLİ', yazi: 'Sigortalı – sigortasız faiz farkı', boy: 42, k: 289, cik: 301, alt: [['Sigortalı faiz', '%•••', 293], ['Sigortasız faiz', '%•••', 294], ['Fark açıkça yazıyor mu?', '?', 297, 298]] },
    { t: 'damga', x: 900, y: 660, yazi: 'Yazmıyorsa değiştiremezler', k: 298, cik: 301, sars: 1 },
    { t: 'kart', x: 880, y: 300, w: 330, h: 230, renk: '#fff', eti: 'BANKANIN', yazi: 'Pahalı poliçe', k: 305, durum: [[307, { soluk: 1 }]] },
    { t: 'damga', x: 920, y: 470, yazi: 'İptal', k: 307, rot: -10 },
    { t: 'kart', x: 1240, y: 300, w: 330, h: 230, renk: '#EAF2FF', eti: 'DIŞARIDAN', yazi: 'Ucuz · aynı teminat', k: 313 },
    { t: 'cizgi', d: 'M1405 530 C 1405 600, 1300 620, 1220 640', ok: 1, k: 321 },
    { t: 'ikon', ad: 'banka', x: 1060, y: 600, boy: 160, k: 321 },
    { t: 'damga', x: 1250, y: 640, yazi: 'Dain-i mürtehin şerhi', k: 322, rot: 4 },
    { t: 'cip', x: 1230, y: 130, ek: 'YOL', cipler: [[301, '!', 'Açıkça yazıyorsa', 'B yolu'], [309, '₺', 'Dışarıdan ucuz poliçe', 'Aynı teminat'], [321, '✓', 'Bankaya sun', 'Şerhli']], nokta: false } ] },
  { tur: 'c_genel', sinif: 'm1', gir: 'zoom', a: 326, ogeler: [
    { t: 'baslik', x: 100, y: 210, boy: 140, satir: [['Tek', 339], ['kartta', 340], ['topladım.', 341, 1]] },
    { t: 'liste', x: 860, y: 200, w: 720, baslik: 'KREDİ SİGORTASI İADE ÖZETİ', hepsi: 1, maddeler: OZET, k: 331, cik: 357 },
    { t: 'damga', x: 900, y: 700, yazi: 'Ekran görüntüsü al', k: 354, cik: 357, sars: 1 },
    { t: 'not', x: 860, y: 260, w: 700, eti: 'NEDEN?', metin: 'Tek bir hak kaybında', vurgu: 'binlerce lira ödememek için.', vurguK: 361, k: 357, cik: 372 },
    { t: 'abone', x: 860, y: 520, yazi: 'Şimdi abone ol', ek: 'yeni rehberleri kaçırma', k: 368, cik: 372 } ] },
  { tur: 'c_genel', sinif: 'm1', gir: 'zoom', a: 372, adim: 5, adimAd: 'B PLANI', ogeler: [
    { t: 'baslik', x: 100, y: 210, boy: 130, satir: [['15', 377], ['iş günü', 378, 1], ['geçerse?', 382]] },
    { t: 'damga', x: 120, y: 620, yazi: 'B planı', k: 389, rot: -6 },
    { t: 'panel', x: 880, y: 250, w: 700, h: 560, url: URL, site: SITE, k: 391, ekranlar: [{ ...BDDK, k: 391 }, TAHKIM] },
    { t: 'cip', x: 1230, y: 130, ek: 'ADIM', cipler: [[402, '1', 'Yazılı iptal talebin', 'Ek', 1], [406, '2', 'Poliçe çıktın', 'Ek', 1], [410, '3', 'BDDK e-Şikayet', 'e-Devlet', 1], [415, '4', 'Sigorta Tahkim', 'Başvuru', 1]] },
    { t: 'damga', x: 140, y: 760, yazi: 'Kuruşu kuruşuna', k: 421, sars: 1 } ] },
  { tur: 'c_genel', sinif: 'm1', gir: 'zoom', a: 424, ogeler: [
    { t: 'baslik', x: 100, y: 210, boy: 140, satir: [['Süreç', 424], ['takvimi', 425], ['net.', 426, 1]] },
    { t: 'zaman', x: 900, y: 300, w: 640, n: 15, a: 0, b: 15, adim: 5, yazi: 'EN GEÇ 15 İŞ GÜNÜ', birim: 'İŞ GÜNÜ', etiketler: [[0, 'YAZILI BAŞVURU'], [15, 'İADE HESABINDA']], k: 427, dolK: 432 },
    { t: 'zaman', x: 900, y: 600, w: 640, n: 4, a: 2, b: 4, adim: 1, yazi: '2–4 AY', birim: 'AY · ORTALAMA', etiketler: [[0, 'RET GELİRSE · TAHKİM'], [4, 'BAĞLAYICI KARAR']], k: 440, dolK: 445 } ] },
  { tur: 'c_genel', sinif: 'm1', gir: 'zoom', a: 453, ogeler: [
    { t: 'baslik', x: 100, y: 210, boy: 130, satir: [['Sırada', 459], ['unutulmuş', 479, 1], ['paraların.', 481, 1]] },
    { t: 'ikon', ad: 'cuzdan', x: 1090, y: 360, boy: 300, k: 455 },
    { t: 'cip', x: 1230, y: 160, ek: 'KONTROL', cipler: [[453, '✓', 'Kredi sigortası', 'Tamam', 1], [465, 'B', 'Otomatik BES', 'Bekliyor olabilir', 1], [469, 'S', 'SGK şahıs ödemeleri', 'Bekliyor olabilir', 1], [477, '▶', 'Sıradaki video', 'Hemen kontrol et', 1]] } ] },
];

const k3 = [
  { tur: 'c_genel', sinif: 'k3', a: 111, adim: 2, adimAd: 'POLİÇEYİ BUL', ogeler: [
    { t: 'kagitlar', n: 9, k: 111 },
    { t: 'baslik', x: 0, y: 110, w: 1920, boy: 110, orta: 1, yatay: 1, satir: [['Poliçeni', 113], ['bul,', 116], ['not', 149, 1], ['et.', 150, 1]] },
    { t: 'panel', x: 160, y: 280, w: 980, h: 600, url: URL, site: SITE, k: 112, ekranlar: [{ ...POLICE, k: 112 }, TABLO] },
    { t: 'liste', x: 1200, y: 300, w: 380, baslik: 'NOT ET', maddeler: [['Poliçe no', 141], ['Başlangıç', 143], ['Şirket adı', 148]], k: 139 } ] },
  { tur: 'c_genel', sinif: 'k3', a: 151, adim: 2, ogeler: [
    { t: 'kagitlar', n: 8, k: 151 },
    { t: 'baslik', x: 0, y: 260, w: 1920, boy: 120, orta: 1, yatay: 1, satir: [['“Bu', 154], ['sigorta', 155], ['kredi', 156], ['şartıdır,', 157, 1], ['iptal', 158], ['edemeyiz.”', 159, 1]] },
    { t: 'damga', x: 760, y: 120, yazi: 'banka derse', k: 151, rot: -4 },
    { t: 'not', x: 560, y: 640, w: 800, eti: 'SENİN CEVABIN', metin: 'Net ve yazılı:', vurgu: 'aşağıda.', k: 161, vurguK: 163 } ] },
  { tur: 'kitap', a: 165, adim: 2, ust: '6502 SAYILI KANUN', madde: 'TEMSİLİ · NET CEVAP', metin: 'Kanuna göre sigorta', vurgu: 'zorunlu değildir', vurguK: 170 },
  { tur: 'c_genel', sinif: 'k3', a: 172, adim: 2, ogeler: [
    { t: 'baslik', x: 0, y: 200, w: 1920, boy: 120, orta: 1, yatay: 1, satir: [['“Yazılı', 172], ['iptal', 173], ['talebimi', 174], ['kayıt', 175, 1], ['altına', 176, 1], ['alın.”', 177, 1]] },
    { t: 'ikon', ad: 'imza', x: 860, y: 520, boy: 220, k: 175 } ] },
  { tur: 'c_genel', sinif: 'k3', a: 178, adim: 3, adimAd: 'YAZILI BAŞVURU', ogeler: [
    { t: 'baslik', x: 0, y: 110, w: 1920, boy: 100, orta: 1, yatay: 1, satir: [['Şubeye', 179], ['gitmeden', 180, 1], ['yazılı', 188], ['talep.', 192, 1]] },
    { t: 'kart', x: 160, y: 300, w: 700, h: 200, eti: 'YAPMA', yazi: 'Bankayı arayıp telefonda ikna olma', boy: 44, k: 194, cik: 204, durum: [[197, { soluk: 1 }]] },
    { t: 'damga', x: 220, y: 460, yazi: 'telefon değil, yazılı', k: 197, cik: 204 },
    { t: 'yol', d: 'M200 400 C 420 300, 620 520, 900 400', dugumler: [[0, 'Uygulama', 204], [.5, 'Poliçe İşlemleri', 207], [1, 'ya da e-posta', 213]], k: 204, cik: 218 },
    { t: 'liste', x: 160, y: 300, w: 860, baslik: 'METNE YAZ', maddeler: [['T.C. kimlik numaran', 219], ['Poliçe numaran', 222], ['30 gün cayma / erken iptal hakkı', 226], ['Prim iadesi → kendi IBAN’ın', 241]], k: 218 },
    { t: 'panel', cihaz: 'telefon', x: 1120, y: 230, w: 440, h: 660, site: 'Sigorta şirketi uygulaması', k: 200, ekranlar: [{ ...FORM, k: 200 }] } ] },
  { tur: 'c_genel', sinif: 'k3', a: 248, ogeler: [
    { t: 'kagitlar', n: 10, k: 248 },
    { t: 'baslik', x: 0, y: 160, w: 1920, boy: 120, orta: 1, yatay: 1, satir: [['Sana', 250], ['da', 250], ['“faiz', 257, 1], ['artar”', 258, 1], ['dediler', 260], ['mi?', 261]] },
    { t: 'yorum', x: 560, y: 420, kelime: 'BLÖF', soru: 'Hangi bankada ne yaşadın? Herkes hazırlıklı olsun.', k: 262 } ] },
  { tur: 'c_genel', sinif: 'k3', a: 273, adim: 4, adimAd: 'FAİZ BLÖFÜ', ogeler: [
    { t: 'baslik', x: 0, y: 110, w: 1920, boy: 100, orta: 1, yatay: 1, satir: [['Faiz', 276], ['blöfüne', 278, 1], ['karşı', 279], ['önlem', 281]] },
    { t: 'kart', x: 160, y: 290, w: 720, h: 400, eti: 'KREDİ SÖZLEŞMESİ · TEMSİLİ', yazi: 'Faiz farkı yazıyor mu?', boy: 52, k: 289, alt: [['Sigortalı faiz', '%•••', 293], ['Sigortasız faiz', '%•••', 294], ['Fark açıkça yazılı mı?', '?', 297, 298]] },
    { t: 'damga', x: 200, y: 730, yazi: 'yazmıyorsa değiştiremezler', k: 298, sars: 1 },
    { t: 'yol', d: 'M1000 640 C 1120 420, 1300 760, 1480 430', dugumler: [[0, 'Pahalı poliçe', 305], [.36, 'İptal', 307], [.7, 'Ucuz dış poliçe', 316, 317], [1, 'Şerhle bankaya', 324, 324]], k: 302 },
    { t: 'not', x: 980, y: 260, w: 580, eti: 'AÇIKÇA YAZIYORSA BİLE', metin: 'aynı teminat,', vurgu: 'çok daha ucuza.', vurguK: 316, k: 301 } ] },
  { tur: 'c_genel', sinif: 'k3', a: 326, ogeler: [
    { t: 'baslik', x: 0, y: 100, w: 1920, boy: 100, orta: 1, yatay: 1, satir: [['Kredi', 349], ['sigortası', 350], ['iade', 351, 1], ['özeti', 352, 1]] },
    { t: 'liste', x: 300, y: 260, w: 1140, baslik: 'TEK KARTTA', hepsi: 1, maddeler: OZET, k: 331, cik: 357 },
    { t: 'damga', x: 640, y: 760, yazi: 'ekran görüntüsü al', k: 354, cik: 357, sars: 1 },
    { t: 'kagitlar', n: 9, k: 357 },
    { t: 'not', x: 360, y: 300, w: 1100, eti: 'NEDEN?', metin: 'Tek bir hak kaybında', vurgu: 'binlerce lira ödememek için.', vurguK: 361, k: 357, cik: 372 },
    { t: 'abone', x: 560, y: 560, yazi: 'Şimdi abone ol', ek: 'yeni rehberleri kaçırma', k: 368, cik: 372 } ] },
  { tur: 'c_genel', sinif: 'k3', a: 372, adim: 5, adimAd: 'B PLANI', ogeler: [
    { t: 'baslik', x: 0, y: 110, w: 1920, boy: 100, orta: 1, yatay: 1, satir: [['15', 377], ['iş', 378], ['günü', 379], ['geçerse:', 382], ['B', 389, 1], ['planı', 390, 1]] },
    { t: 'yol', d: 'M200 520 C 500 360, 800 680, 1080 500 S 1380 380, 1500 520', dugumler: [[0, 'Yazılı talep', 402], [.33, 'Poliçe çıktısı', 406], [.66, 'BDDK e-Şikayet', 410, 411], [1, 'Sigorta Tahkim', 416, 418]], k: 400 },
    { t: 'damga', x: 700, y: 720, yazi: 'kuruşu kuruşuna', k: 421, sars: 1 } ] },
  { tur: 'c_genel', sinif: 'k3', a: 424, ogeler: [
    { t: 'baslik', x: 0, y: 110, w: 1920, boy: 110, orta: 1, yatay: 1, satir: [['Süreç', 424], ['takvimi', 425, 1], ['net', 426, 1]] },
    { t: 'zaman', x: 260, y: 360, w: 1240, n: 15, a: 0, b: 15, adim: 5, yazi: 'en geç 15 iş günü', birim: 'İŞ GÜNÜ', etiketler: [[0, 'yazılı başvuru'], [15, 'iade hesabında']], k: 427, dolK: 432 },
    { t: 'zaman', x: 260, y: 660, w: 1240, n: 4, a: 2, b: 4, adim: 1, yazi: '2–4 ay', birim: 'AY · ORTALAMA', etiketler: [[0, 'ret gelirse · tahkim'], [4, 'bağlayıcı karar']], k: 440, dolK: 445 } ] },
  { tur: 'c_genel', sinif: 'k3', a: 453, ogeler: [
    { t: 'kagitlar', n: 12, k: 453 },
    { t: 'baslik', x: 0, y: 140, w: 1920, boy: 120, orta: 1, yatay: 1, satir: [['Sırada:', 459], ['unutulmuş', 479, 1], ['paraların', 481, 1]] },
    { t: 'yol', d: 'M300 560 C 600 440, 900 700, 1200 560 S 1450 460, 1520 560', dugumler: [[0, 'Kredi sigortası', 453, 458], [.4, 'Otomatik BES', 466], [.75, 'SGK ödemeleri', 470], [1, 'Hemen kontrol et', 488, 489]], k: 455 } ] },
];
module.exports = { m1, k3 };
