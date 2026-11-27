// VID_009 kısa — v5 + Remotion sayı/grafik (maskotsuz). Rakamlar yalnızca senaryodan: 12 aylık TÜFE, 5 yıl.
// 0:Ev 1:sahibin 2:'çevrede 3:kiralar 4:çok 5:arttı' 6:diyerek 7:senden 8:yasal 9:oranın 10:üstünde 11:zam 12:istiyorsa 13:bunu 14:ödemek
// 15:zorunda 16:değilsin. 17:Kanundaki 18:kesin 19:tavan 20:12 21:aylık 22:TÜFE 23:ortalamasıdır; 24:5 25:yıl 26:dolmadan 27:ev 28:sahibi
// 29:bu 30:sınırın 31:üstüne 32:tek 33:kuruş 34:çıkamaz. 35:Yorumlara 36:KİRA 37:yaz, 38:yasal 39:kira 40:zammı 41:hesaplama 42:ve
// 43:güvenli 44:ödeme 45:rehberini 46:hemen 47:göndereyim.
module.exports = {
  sahneler: [
    { k: 0, baslik: ['KİRA ZAMMI', 'YASAL SINIRI'] },
    { k: 17, baslik: ['TAVAN', '12 AYLIK TÜFE'] },
    { k: 35, baslik: ['YORUMLARA', '"KİRA" YAZ'] },
  ],
  vuruslar: [
    { k: 0, tip: 'not', yazi: '"çevrede kiralar çok arttı"', ikon: '🏠', cizgi: 'alt' },
    { k: 7, tip: 'dev', satir: ['YASAL ORANIN', 'ÜSTÜNDE ZAM?'], vurgu: 'ZAM?' },
    { k: 13, tip: 'dev', satir: ['ÖDEMEK', 'ZORUNDA DEĞİLSİN'], vurgu: 'DEĞİLSİN', carpi: 'ZORUNDA', carpiK: 15 },
    { k: 17, tip: 'karisim', ust: 'KANUNDAKİ KESİN TAVAN', yazi: 'TÜFE', koyu: true },
    { k: 20, tip: 'grafik', comp: 'Sayac', props: { deger: 12, birim: 'AY', ust: 'TÜFE ORTALAMASI' }, koyu: false },
    { k: 24, tip: 'grafik', comp: 'Zaman', props: { adimlar: [{ ust: '1', alt: 'yıl' }, { ust: '2', alt: 'yıl' }, { ust: '3', alt: 'yıl' }, { ust: '4', alt: 'yıl' }, { ust: '5', alt: 'yıl dolmadan' }], vurgu: 4 }, top: 300 },
    { k: 29, tip: 'dev', satir: ['TEK KURUŞ', 'FAZLASI YOK'], vurgu: 'YOK', ikon: '🚫' },
    { k: 35, tip: 'yorum', satir: ['YORUMLARA'], yaz: 'KİRA', yazK: 36 },
    { k: 38, tip: 'not', yazi: 'zam hesaplama rehberi', ikon: '📩', cizgi: 'ok' },
  ],
  son: { uzat: 1.0 },
};
