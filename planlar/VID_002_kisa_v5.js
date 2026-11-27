// VID_002 kısa — v5 "kâğıt kinetik" planı (maskotsuz). k = kelime sırası.
// 0:Kimlik 1:bilgilerin 2:sızdıysa, 3:haberin 4:bile 5:olmadan 6:adına 7:şirket 8:açılıp 9:milyonlarca 10:lira 11:vergi 12:ve 13:icra
// 14:borcuna 15:sokulabilirsin. 16:Çoğu 17:kişi 18:bunu 19:kapısına 20:haciz 21:kağıdı 22:gelince 23:öğreniyor. 24:Ama 25:e-Devlet'te
// 26:tek 27:bir 28:kilidi 29:açtığında 30:senin 31:onayın 32:olmadan 33:kimse 34:adına 35:şirket 36:kuramıyor. 37:Yorumlara 38:KORUMA
// 39:yaz, 40:bu 41:güvenlik 42:kilidini 43:nasıl 44:açacağını 45:adım 46:adım 47:hemen 48:göndereyim.
module.exports = {
  sahneler: [
    { k: 0, baslik: ['KİMLİĞİN SIZDIYSA', 'ADINA ŞİRKET AÇILIR'] },
    { k: 16, baslik: ['HACİZ KAĞIDI', 'GELİNCE ÖĞRENME'] },
    { k: 24, baslik: ["E-DEVLET'TE", 'TEK BİR KİLİT'] },
    { k: 37, baslik: ['YORUMLARA', '"KORUMA" YAZ'] },
  ],
  vuruslar: [
    { k: 0, tip: 'dev', satir: ['KİMLİĞİN', 'SIZDIYSA'], vurgu: 'SIZDIYSA', ikon: '🪪', cizgi: 'daire' },
    { k: 3, tip: 'not', yazi: 'haberin bile olmadan…', ikon: '🔍', cizgi: 'alt' },
    { k: 6, tip: 'dev', satir: ['ADINA', 'ŞİRKET'], vurgu: 'ŞİRKET', ikon: '🏢' },
    { k: 9, tip: 'dev', satir: ['MİLYONLARCA', 'LİRA BORÇ'], vurgu: 'BORÇ', etiketler: ['VERGİ', 'İCRA'], alt: [11, 13] },
    { k: 16, tip: 'dev', satir: ['HACİZ', 'KAĞIDI'], vurgu: 'HACİZ', koyu: true, ikon: '📜' },
    { k: 22, tip: 'not', yazi: 'gelince öğreniyorsun', koyu: true, cizgi: 'alt' },
    { k: 24, tip: 'ui', baslik: 'Ortak / Yetkili Kısıtlama', alt1: 'Adıma şirket kurulmasın', acK: 29, cizgi: 'daire' },
    { k: 30, tip: 'dev', satir: ['ONAYIN', 'OLMADAN'], vurgu: 'ONAYIN', ikon: '🛡️' },
    { k: 33, tip: 'dev', satir: ['KİMSE', 'KURAMAZ'], vurgu: 'KURAMAZ' },
    { k: 37, tip: 'yorum', satir: ['YORUMLARA'], yaz: 'KORUMA', yazK: 38 },
    { k: 40, tip: 'not', yazi: 'adım adım rehber', ikon: '📩', cizgi: 'ok' },
  ],
  son: { uzat: 1.0 },
};
