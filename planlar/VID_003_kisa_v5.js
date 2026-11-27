// VID_003 kısa — karma stil (maskotsuz): gazete/editoryal → kâğıt kinetik → koyu harf karışımı → cam telefon arayüzü → kinetik → yorum.
// 0:Bankadan 1:kredi 2:çekerken 3:kesilen 4:o 5:binlerce 6:liralık 7:hayat 8:sigortası 9:aslında 10:yasal 11:olarak 12:zorunlu 13:değil.
// 14:Banka 15:sana 16:mecburi 17:gibi 18:gösterse 19:de 20:krediyi 21:aldıktan 22:sonra 23:şubeye 24:bile 25:gitmeden 26:poliçeyi 27:iptal
// 28:edip 29:paranı 30:kuruşu 31:kuruşuna 32:geri 33:alabilirsin. 34:Yorumlara 35:SİGORTA 36:yaz, 37:kredi 38:hayat 39:sigortası 40:parasını
// 41:geri 42:alma 43:rehberini 44:hemen 45:göndereyim.
module.exports = {
  sahneler: [
    { k: 0, baslik: ['KREDİ HAYAT', 'SİGORTASI'] },
    { k: 14, baslik: ['MECBURİ', 'DEĞİL'] },
    { k: 20, baslik: ['POLİÇEYİ', 'İPTAL ET'] },
    { k: 34, baslik: ['YORUMLARA', '"SİGORTA" YAZ'] },
  ],
  vuruslar: [
    { k: 0, tip: 'gazete', ust: 'KREDİ DOSYASI', baslik: 'Tüketici Kredisi', satirlar: [['Kredi', '••• TL'], ['Dosya masrafı', '••• TL'], ['Hayat sigortası', '••• TL']], alt: [1, 3, 7], hl: 2, hlK: 7 },
    { k: 9, tip: 'dev', satir: ['ZORUNLU', 'DEĞİL'], vurgu: 'DEĞİL', carpi: 'ZORUNLU', carpiK: 12 },
    { k: 14, tip: 'karisim', ust: 'BANKA DİYOR Kİ', yazi: 'MECBURİ?', koyu: true },
    { k: 17, tip: 'not', yazi: 'öyle gösterse de…', koyu: true, cizgi: 'alt' },
    { k: 20, tip: 'telefon', not: 'şubeye gitmeden', ekranlar: [
      { k: 20, baslik: 'Sigortalarım', satirlar: ['Konut sigortası', 'Kredi hayat sigortası', 'Kasko'], hedef: 1 },
      { k: 26, baslik: 'Hayat sigortası', satirlar: ['Poliçe no •••', 'Prim ••• TL', 'Poliçeyi iptal et'], hedef: 2 },
      { k: 28, basarili: 'İptal talebin alındı', alt: 'Kalan prim iade edilir' } ] },
    { k: 29, tip: 'dev', satir: ['KURUŞU KURUŞUNA', 'GERİ AL'], vurgu: 'AL', ikon: '💸' },
    { k: 34, tip: 'yorum', satir: ['YORUMLARA'], yaz: 'SİGORTA', yazK: 35 },
    { k: 37, tip: 'not', yazi: 'iade rehberi gelsin', ikon: '📩', cizgi: 'ok' },
  ],
  son: { uzat: 1.0 },
};
