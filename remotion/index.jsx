// Remotion kompozisyonları: sayılar ve grafikler (şeffaf arka plan; v5 sahnesine kare dizisi olarak gömülür).
// Props: uret.js → remotion_render.mjs ile verilir. Uydurma rakam yok: değerler yalnızca senaryodan.
import React from 'react';
import '@fontsource/anton/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/inter/800.css';
import { registerRoot, Composition, AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
const INK = '#151515', RED = '#E8402F', YEL = '#F6B92B', GRN = '#1E9E6A', MUT = '#8B8E95';
const font = "Anton, 'Inter Display', Inter, sans-serif";

// Dev sayaç: 0 → deger (ör. 30 GÜN, %100, 10 YIL). Rakamlar yaylı sayılır, birim maske arkasından çıkar.
const Sayac = ({ deger = 30, birim = 'GÜN', ust = '', renk = RED, ondalik = 0 }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 14, stiffness: 120 } });
  const v = interpolate(s, [0, 1], [0, deger]);
  const by = interpolate(f, [8, 20], [110, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const halka = interpolate(f, [0, 40], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return (<AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
    <svg width={560} height={560} style={{ position: 'absolute', left: 80, top: 80 }}><circle cx={280} cy={280} r={250} fill="none" stroke="rgba(21,21,21,.08)" strokeWidth={26} />
      <circle cx={280} cy={280} r={250} fill="none" stroke={renk} strokeWidth={26} strokeLinecap="round" strokeDasharray={2 * Math.PI * 250} strokeDashoffset={2 * Math.PI * 250 * (1 - halka * Math.min(1, deger / Math.max(deger, 1)))} transform="rotate(-90 280 280)" /></svg>
    {ust ? <div style={{ font: "700 26px 'JetBrains Mono'", letterSpacing: '.25em', color: MUT, marginBottom: 6 }}>{ust}</div> : null}
    <div style={{ font: `400 210px ${font}`, color: INK, lineHeight: .95, transform: `scale(${0.85 + 0.15 * s})` }}>{v.toFixed(ondalik)}</div>
    <div style={{ overflow: 'hidden', height: 96 }}><div style={{ font: `400 84px ${font}`, color: renk, transform: `translateY(${by}%)` }}>{birim}</div></div>
  </AbsoluteFill>);
};

// Çubuk grafik: [{ad, deger, vurgu}] — sırayla büyür, vurgulanan kırmızı, değer etiketi çubukla yükselir.
const Cubuk = ({ veriler = [], birim = '', baslik = '' }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const max = Math.max(...veriler.map(v => v.deger), 1);
  return (<AbsoluteFill style={{ padding: '60px 70px', justifyContent: 'flex-end' }}>
    {baslik ? <div style={{ font: "700 28px 'JetBrains Mono'", letterSpacing: '.2em', color: MUT, marginBottom: 26 }}>{baslik}</div> : null}
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 34, height: 500, borderBottom: `6px solid ${INK}` }}>
      {veriler.map((v, i) => { const s = spring({ frame: f - 6 - i * 6, fps, config: { damping: 15, stiffness: 140 } }); const h = 440 * v.deger / max * s;
        return (<div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ font: `400 54px ${font}`, color: v.vurgu ? RED : INK, opacity: s, marginBottom: 10 }}>{Math.round(v.deger * s)}{birim}</div>
          <div style={{ width: '100%', height: h, background: v.vurgu ? RED : INK, borderRadius: '18px 18px 0 0', transformOrigin: 'bottom', transform: `scaleY(${1 + 0.06 * Math.sin(Math.min(1, s) * Math.PI)})` }} />
        </div>); })}
    </div>
    <div style={{ display: 'flex', gap: 34, marginTop: 14 }}>{veriler.map((v, i) => <div key={i} style={{ flex: 1, textAlign: 'center', font: "800 28px Inter", color: INK }}>{v.ad}</div>)}</div>
  </AbsoluteFill>);
};

// Zaman çizelgesi / süre: noktalar yerleşir, çizgi çizilir, son nokta (son gün) kırmızı atar.
const Zaman = ({ adimlar = [], vurgu = -1 }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig();
  const k = interpolate(f, [0, 18], [0, 1], { extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
  return (<AbsoluteFill style={{ justifyContent: 'center', padding: '0 110px 0 90px' }}>
    <div style={{ position: 'relative', height: 16, background: 'rgba(21,21,21,.1)', borderRadius: 8 }}>
      <div style={{ position: 'absolute', inset: 0, width: `${k * 100}%`, background: INK, borderRadius: 8 }} />
      {adimlar.map((a, i) => { const x = adimlar.length > 1 ? i / (adimlar.length - 1) : 0, s = spring({ frame: f - 2 - x * 14, fps, config: { damping: 12 } }); const v = i === vurgu;
        return (<div key={i} style={{ position: 'absolute', left: `${x * 100}%`, top: 8, transform: `translate(-50%,-50%) scale(${s})` }}>
          <div style={{ width: v ? 78 : 50, height: v ? 78 : 50, borderRadius: '50%', background: v ? RED : '#fff', border: `8px solid ${v ? RED : INK}`, margin: '0 auto' }} />
          <div style={{ position: 'absolute', top: i % 2 ? -150 : 64, left: '50%', transform: `translateX(${i === adimlar.length - 1 ? -78 : i === 0 ? -22 : -50}%)`, textAlign: i === adimlar.length - 1 ? 'right' : i === 0 ? 'left' : 'center', whiteSpace: 'nowrap' }}>
            <div style={{ font: `400 ${v ? 92 : 66}px ${font}`, color: v ? RED : INK, lineHeight: 1 }}>{a.ust}</div><div style={{ font: "800 26px Inter", color: MUT }}>{a.alt}</div></div>
        </div>); })}
    </div>
  </AbsoluteFill>);
};

const Kok = () => (<>
  <Composition id="Sayac" component={Sayac} durationInFrames={60} fps={30} width={720} height={720} defaultProps={{ deger: 30, birim: 'GÜN' }} />
  <Composition id="Cubuk" component={Cubuk} durationInFrames={60} fps={30} width={720} height={720} defaultProps={{ veriler: [{ ad: 'A', deger: 3 }, { ad: 'B', deger: 7, vurgu: true }] }} />
  <Composition id="Zaman" component={Zaman} durationInFrames={60} fps={30} width={720} height={560} defaultProps={{ adimlar: [{ ust: '1', alt: 'gün' }, { ust: '30', alt: 'gün' }], vurgu: 1 }} />
</>);
registerRoot(Kok);
