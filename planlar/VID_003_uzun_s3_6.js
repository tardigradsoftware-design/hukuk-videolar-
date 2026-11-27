// VID_003 uzun — KARMA: dört sahne dilinden seçme (4 kâğıt → 1 mavi → 4 ürün → 5 adres → 5 turuncu → 2 şema zaman).
const P = n => require('./VID_003_uzun_s3_' + n + '.js');
const [p1, p2, p4, p5] = [P(1), P(2), P(4), P(5)];
const al = (p, tur, ek) => Object.assign({}, p.s3.find(s => s.tur === tur), ek || {});
module.exports = { maskot: true, dil: 6, sahneler: p1.sahneler, adimPos: [1360, 40],
  sesler: [...p4.sesler.filter(x => x[0] < 13), ...p1.sesler.filter(x => x[0] >= 13 && x[0] < 17), ...p4.sesler.filter(x => x[0] >= 17 && x[0] < 28), ...p5.sesler.filter(x => x[0] >= 28 && x[0] < 61), ...p2.sesler.filter(x => x[0] >= 61)],
  s3: [al(p4, 'd_kagit'), al(p1, 'm_mavi', { gruplar: [p1.s3[1].gruplar[0]] }), al(p4, 'd_urun'), al(p5, 'f_url'), al(p5, 'f_turuncu'), al(p2, 'c_zaman')] };
