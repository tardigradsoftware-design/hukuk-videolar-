// VID_001 kısa video sahne planı. k = metindeki kelime sırası (0'dan başlar), öğe o kelime söylenince belirir.
// 0:e-Devlet'te 1:adına 2:birikmiş 3:ama 4:haberin 5:bile 6:olmadığı, 7:devletin 8:sana 9:ödemeyi 10:beklediği 11:bir 12:para 13:olabilir.
// 14:Sağlık 15:iadeleri, 16:eski 17:sigorta 18:alacakları 19:veya 20:unutulan 21:otomatik 22:emeklilik 23:kesintileri 24:zamanında 25:çekilmezse
// 26:zamanaşımına 27:uğrayıp 28:devlete 29:geçiyor. 30:Yorumlara 31:PARA 32:yaz, 33:e-Devlet'ten 34:unutulan 35:paralarını 36:saniyeler 37:içinde
// 38:sorgulama 39:ve 40:hesabına 41:çekme 42:rehberini 43:hemen 44:göndereyim.
module.exports = {
  sahneler: [
    {
      k: 0, baslik: ["E-DEVLET'TE", 'UNUTULAN PARAN'],
      mimik: [[0, 'saskin', 'isaret'], [4, 'dusunceli', 'dusun'], [9, 'emin', 'anlat'], [12, 'mutlu', 'eller_yukari']],
      ogeler: [
        { tip: 'edevlet', k: 0, x: 360, y: 430, satirlar: [{ t: 'Şahıs ödemeleri', sag: 'sorgulandı' }, { t: 'Adına bekleyen ödeme', rozet: 'VAR ✓' }], alt: [1, 7], rozetK: [9] },
        { tip: 'ikon', k: 12, x: 545, y: 668, e: '💰', yazi: 'PARA', rot: 6, firlat: 'el' },
      ],
    },
    {
      k: 14, baslik: ['ZAMANINDA ÇEKMEZSEN', 'DEVLETE GEÇİYOR'],
      mimik: [[14, 'notr', 'anlat'], [24, 'korkmus', 'eller_yukari'], [28, 'bitkin', 'omuz']],
      ogeler: [
        { tip: 'liste', k: 14, k1: 26, x: 360, y: 525, ogeler: [{ e: '🏥', t: 'Sağlık iadeleri' }, { e: '🛡️', t: 'Eski sigorta alacakları' }, { e: '🐷', t: 'Otomatik BES kesintisi' }], alt: [14, 16, 20] },
        { tip: 'damga', k: 26, x: 360, y: 470, yazi: '✗ ZAMANAŞIMI', rot: -9 },
        { tip: 'ok', k: 28, x: 240, y: 640 },
        { tip: 'ikon', k: 28, x: 430, y: 640, e: '🏛️', yazi: 'DEVLET' },
      ],
    },
    {
      k: 30, baslik: ['YORUMLARA', '"PARA" YAZ'],
      mimik: [[30, 'mutlu', 'yukari'], [36, 'emin', 'anlat'], [42, 'mutlu', 'basparmak']],
      zipla: [31],
      ogeler: [
        { tip: 'yorum', k: 30, k1: 44, x: 360, y: 440, yazi: 'PARA', yazK: 31, hiz: 8 },
        { tip: 'rozet', k: 36, x: 360, y: 620, e: '⏱️', yazi: 'SANİYELER İÇİNDE', renk: 'y', rot: -3 },
        { tip: 'rozet', k: 40, x: 360, y: 715, e: '🏦', yazi: 'HESABINA ÇEK', renk: 'g', rot: 2 },
        { tip: 'soru', k: 44, firlat: true, x: 360, y: 440, e: '📩', yazi: "'PARA' yaz, rehber gelsin!", ust: 'YORUMLARA YAZ 👇' },
      ],
    },
  ],
  son: { ifade: 'mutlu', jest: 'selam', uzat: 1.3 },
};
