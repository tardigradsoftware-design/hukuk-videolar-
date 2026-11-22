// VID_001 uzun video (yatay 1920x1080) sahne planı. k = metindeki kelime sırası.
// Görsel alan: x 60–1180, y 240–880 (sağda maskot). Kelime listesi için: node scripts/video/kelimeler.js VID_001 uzun
module.exports = {
  sahneler: [
    { // HOOK (1.20x)
      k: 0, baslik: ["E-DEVLET'TE", 'UNUTULMUŞ PARALAR'],
      mimik: [[0, 'saskin', 'isaret'], [11, 'korkmus', 'eller_yukari'], [20, 'emin', 'anlat'], [28, 'mutlu', 'anlat'], [40, 'emin', 'basparmak']],
      ogeler: [
        { tip: 'edevlet', k: 0, x: 420, y: 520, satirlar: [{ t: 'Şahıs ödemeleri', sag: 'sorgulanıyor…' }, { t: 'Adına bekleyen ödeme', rozet: 'VAR ✓' }], alt: [0, 8], rozetK: [9] },
        { tip: 'damga', k: 15, x: 420, y: 540, yazi: '✗ ZAMANAŞIMI', rot: -8 },
        { tip: 'rozet', k: 20, x: 900, y: 420, e: '📅', yazi: 'YILDA EN AZ 1 KEZ', renk: 'y', rot: -3 },
        { tip: 'rozet', k: 40, x: 900, y: 590, e: '✅', yazi: '5 NET ADIM', renk: 'k', rot: 2 },
      ],
    },
    { // 1. ADIM
      k: 44, baslik: ['1. ADIM', 'SGK ŞAHIS ÖDEMELERİ'],
      mimik: [[44, 'emin', 'isaret'], [51, 'notr', 'anlat'], [63, 'notr', 'isaret'], [77, 'mutlu', 'anlat'], [97, 'emin', 'basparmak']],
      ogeler: [
        { tip: 'adim', k: 44, x: 470, y: 320, no: 1, yazi: 'SGK şahıs ödemeleri' },
        { tip: 'ikon', k: 51, k1: 63, x: 330, y: 610, e: '📱', yazi: 'e-Devlet girişi' },
        { tip: 'rozet', k: 56, k1: 63, x: 760, y: 610, e: '🔑', yazi: 'T.C. NO + ŞİFRE', renk: 'b' },
        { tip: 'arama', k: 63, k1: 77, x: 620, y: 600, yazi: 'Şahıs Ödemeleri Sorgulama', yazK: 66, hiz: 22 },
        { tip: 'liste', k: 77, x: 470, y: 640, ogeler: [{ e: '🩺', t: 'Rapor parası' }, { e: '🍼', t: 'Emzirme ödeneği' }, { e: '🚌', t: 'Yol gideri' }, { e: '🕊️', t: 'Cenaze yardımı' }, { e: '💸', t: 'Fazla prim iadesi' }], alt: [79, 81, 83, 85, 88] },
        { tip: 'rozet', k: 97, x: 950, y: 640, e: '₺', yazi: 'TUTAR · TARİH · DURUM', renk: 'g', rot: -3 },
      ],
    },
    { // 2. ADIM
      k: 104, baslik: ['2. ADIM', 'UNUTULAN BES BİRİKİMİN'],
      mimik: [[104, 'emin', 'isaret'], [114, 'notr', 'anlat'], [131, 'saskin', 'isaret'], [134, 'dusunceli', 'dusun'], [149, 'notr', 'anlat'], [160, 'mutlu', 'basparmak']],
      ogeler: [
        { tip: 'adim', k: 104, x: 520, y: 320, no: 2, yazi: 'Eski işyerlerinden kalan BES' },
        { tip: 'arama', k: 114, k1: 134, x: 620, y: 560, yazi: 'BES Devlet Katkısı ve Birikim Sorgulama', yazK: 118, hiz: 22 },
        { tip: 'ikon', k: 131, k1: 134, x: 620, y: 740, e: '🏦', yazi: 'Takasbank' },
        { tip: 'liste', k: 134, x: 470, y: 600, ogeler: [{ e: '🏢', t: 'Eski firmaların kesintileri' }, { e: '🐷', t: 'Unutulan otomatik BES fonu' }, { e: '📞', t: 'Çıkış / birleştirme talimatı' }], alt: [134, 141, 149] },
        { tip: 'rozet', k: 160, x: 980, y: 600, e: '💳', yazi: "IBAN'INA ÇEK", renk: 'g', rot: 3 },
      ],
    },
    { // 3. ADIM
      k: 163, baslik: ['3. ADIM', 'ZAMANAŞIMI HESAPLAR'],
      mimik: [[163, 'emin', 'isaret'], [171, 'notr', 'anlat'], [180, 'dusunceli', 'dusun'], [199, 'korkmus', 'dur'], [202, 'emin', 'basparmak']],
      ogeler: [
        { tip: 'adim', k: 163, x: 520, y: 320, no: 3, yazi: 'Zamanaşımına uğrayan hesaplar' },
        { tip: 'arama', k: 171, k1: 180, x: 620, y: 560, yazi: 'Mevduat ve Katılım Fonu Zamanaşımı Sorgulama', yazK: 173, hiz: 24 },
        { tip: 'rozet', k: 180, x: 620, y: 480, e: '⏳', yazi: 'SON 10 YIL İŞLEMSİZ', renk: 'y', rot: -2 },
        { tip: 'ikon', k: 187, x: 420, y: 680, e: '💼', yazi: 'Maaş hesabı' },
        { tip: 'ikon', k: 190, x: 700, y: 680, e: '🎓', yazi: 'Öğrenci hesabı' },
        { tip: 'damga', k: 199, x: 560, y: 640, yazi: "HAZİRAN'DAN ÖNCE!", rot: -7 },
        { tip: 'rozet', k: 202, x: 980, y: 760, e: '🪪', yazi: 'KİMLİKLE ŞUBEYE', renk: 'g', rot: 3 },
      ],
    },
    { // 4. ADIM
      k: 209, baslik: ['4. ADIM', 'IBAN TANIMLA'],
      mimik: [[209, 'emin', 'isaret'], [218, 'notr', 'anlat'], [226, 'notr', 'isaret'], [240, 'mutlu', 'basparmak'], [244, 'emin', 'anlat']],
      ogeler: [
        { tip: 'adim', k: 209, x: 520, y: 320, no: 4, yazi: 'Ödemeleri hesabına bağla' },
        { tip: 'arama', k: 218, k1: 226, x: 620, y: 560, yazi: 'Şahıs Ödemeleri Banka Hesabı Tanımlama', yazK: 220, hiz: 22 },
        { tip: 'edevlet', k: 226, x: 470, y: 620, baslik: 'Banka Hesabı Tanımlama', satirlar: [{ t: 'Yeni Hesap Ekle', rozet: '+ EKLE' }, { t: 'Vadesiz TL IBAN', sag: 'TR•• •••• ••••' }, { t: 'Durum', rozet: 'KAYDEDİLDİ ✓' }], alt: [226, 235, 240], rozetK: [228, null, 240] },
        { tip: 'rozet', k: 242, x: 980, y: 480, e: '🚫', yazi: 'PTT SIRASI YOK', renk: 'k', rot: -3 },
        { tip: 'ikon', k: 248, x: 980, y: 680, e: '💸', yazi: 'Doğrudan hesabına' },
      ],
    },
    { // 5. ADIM
      k: 252, baslik: ['5. ADIM', 'B PLANI'],
      mimik: [[252, 'dusunceli', 'dusun'], [256, 'notr', 'anlat'], [271, 'notr', 'isaret'], [279, 'mutlu', 'basparmak']],
      ogeler: [
        { tip: 'adim', k: 252, x: 470, y: 320, no: 5, yazi: 'Ödeme iade edildiyse' },
        { tip: 'liste', k: 256, x: 560, y: 560, ogeler: [{ e: '📮', t: "PTT'ye aktarıldı → kimlikle PTT şubesi" }, { e: '📝', t: "Kuruma döndü → SGK'ya dilekçe" }], alt: [256, 271] },
        { tip: 'rozet', k: 279, x: 560, y: 740, e: '✅', yazi: 'YENİDEN HESABINA', renk: 'g', rot: -2 },
      ],
    },
    { // KAPANIŞ
      k: 282, baslik: ['HAKLARINI KORU', 'ABONE OL'],
      mimik: [[282, 'mutlu', 'selam']],
      zipla: [287],
      ogeler: [
        { tip: 'ikon', k: 283, x: 420, y: 560, e: '📘', yazi: 'Net rehberler' },
        { tip: 'rozet', k: 287, x: 800, y: 560, e: '🔔', yazi: 'ABONE OL', renk: 'k', rot: -3 },
      ],
    },
  ],
  son: { ifade: 'mutlu', jest: 'selam', uzat: 1.5 },
};
