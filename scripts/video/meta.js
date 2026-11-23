// YouTube metni: başlık, açıklama, bölümler (chapters), etiketler, hashtagler → videonun yanına .txt
const KISALT = ['SGK', 'BES', 'PTT', 'IBAN', 'T.C.', 'TC', 'KVKK', 'MERSİS', 'OKS', 'TL', 'SMS', 'PDF', 'TCKN', 'ÖTV', 'KDV', 'SSK', 'GSS'];
const UP = s => s.toLocaleUpperCase('tr'), LOW = s => s.toLocaleLowerCase('tr');
function cumleDuzeni(s) {
  const t = LOW(s).replace(/e-devlet/g, 'e-Devlet');
  return t.split(' ').map((w, i) => {
    const k = KISALT.find(a => LOW(a) === w.replace(/['’].*$/, '')); if (k) return k + w.slice(k.length);
    return i === 0 ? w.charAt(0).toLocaleUpperCase('tr') + w.slice(1) : w;
  }).join(' ');
}
const mmss = t => { const s = Math.max(0, Math.floor(t)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

// YouTube kuralı: ilk bölüm 00:00, en az 3 bölüm, her biri ≥10 sn
function bolumler(basliklar, sure) {
  let b = basliklar.map((x, i) => ({ t: i === 0 ? 0 : x.t, ad: x.adim ? `${x.adim}. Adım: ${cumleDuzeni(x.alt)}` : (i === 0 ? 'Giriş' : (i === basliklar.length - 1 ? 'Kapanış' : cumleDuzeni(`${x.ust} ${x.alt}`))) }));
  const out = [];
  b.forEach((x, i) => { const son = (b[i + 1] ? b[i + 1].t : sure); if (out.length && (x.t - out[out.length - 1].t < 10)) return; if (son - x.t < 10 && out.length && i === b.length - 1) return; out.push(x); });
  return out.length >= 3 ? out : null;
}

function yaz({ satir, kisa, basliklar, sure }) {
  const metin = satir[kisa ? 'shorts video tts' : 'uzun video tts'];
  const ilk = (metin.match(/^.+?[.!?](\s|$)/) || [metin])[0].trim();
  const etiket = satir[kisa ? 'shorts etiketler' : 'uzun video etiketler'] || '';
  const hash = satir[kisa ? 'shorts hastaglar' : 'uzun video hastaglar'] || '';
  const L = [];
  L.push('BAŞLIK', satir[kisa ? 'shorts video başlığı' : 'uzun video başlığı'], '');
  L.push('AÇIKLAMA');
  L.push(ilk);
  if (!kisa) {
    const bl = bolumler(basliklar, sure);
    L.push('', 'Bu videoda hiçbir adımı atlamadan, ekran ekran anlatıyorum.');
    if (bl) { L.push('', '📌 Bölümler'); bl.forEach(x => L.push(`${mmss(x.t)} ${x.ad}`)); }
    L.push('', '💬 Sende de oldu mu? Yorumlara yaz, birlikte bakalım.', '🔔 Haklarını koruyan net rehberler için abone ol.');
  } else {
    const m = /yorumlara\s+(\S+)\s+yaz/i.exec(metin);
    L.push('', m ? `💬 Yorumlara ${UP(m[1].replace(/[,.]/g, ''))} yaz, rehberi göndereyim.` : '💬 Yorumlara yaz.');
  }
  L.push('', 'ℹ️ Bu video genel bilgilendirme amaçlıdır, hukuki danışmanlık değildir. Ekran görüntüleri temsilidir.');
  L.push('', hash.trim());
  L.push('', 'ETİKETLER', etiket.split(',').map(s => s.trim()).filter(Boolean).join(', '));
  L.push('', 'HASHTAGLER', hash.trim());
  return L.join('\n') + '\n';
}
module.exports = { yaz, bolumler };
