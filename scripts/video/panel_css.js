// panel.js için CSS (sayfa_v5'ten ayrıldı; Geist→G)
module.exports = `
.pp{position:absolute;left:70px;top:130px;width:1130px;height:770px;border-radius:18px;overflow:hidden;background:#F5F6F8;box-shadow:0 0 0 3px #151515,10px 10px 0 #151515,0 50px 70px -30px rgba(0,0,0,.35)}
.pp.tel{left:445px;top:120px;width:400px;height:790px;border-radius:58px;background:#F5F6F8;box-shadow:0 0 0 13px #111,0 0 0 15px #444,0 50px 70px -30px rgba(0,0,0,.45)}
.pp-z{position:absolute;inset:0;will-change:transform}
.pp-tar{display:flex;align-items:center;gap:9px;height:54px;padding:0 18px;background:#1C1D21;color:#fff}.pp-tar>i{width:13px;height:13px;border-radius:50%;background:#555}.pp-tar>i:first-child{background:#FF5F57}.pp-tar>i:nth-child(2){background:#FEBC2E}.pp-tar>i:nth-child(3){background:#28C840}
.pp-url{flex:1;margin-left:14px;display:flex;align-items:center;gap:10px;background:#2C2D33;border-radius:10px;height:34px;padding:0 14px;font:500 18px GM;color:#E8E8EA}.pp-kil{width:12px;height:10px;border-radius:2px;background:#9AA0A6;position:relative;display:inline-block}.pp-kil::before{content:'';position:absolute;left:2px;top:-6px;width:8px;height:7px;border:2px solid #9AA0A6;border-bottom:0;border-radius:5px 5px 0 0}
.pp-tar small{font:700 13px GM;letter-spacing:.16em;color:#F6B92B}
.pp-ust{display:flex;align-items:center;gap:16px;height:72px;padding:0 34px;background:#fff;border-bottom:1px solid #E3E5E8}.pp-amb{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#C8102E,#E8402F)}.pp-ust b{font:800 24px G;color:#151515}.pp-ust nav{margin-left:auto;display:flex;gap:30px;font:600 17px G;color:#5F6368}
.pp-yk{height:4px;background:#E8402F;transform-origin:left;transform:scaleX(0)}
.pp-gov{position:relative;padding:26px 44px}.pp-sc{position:absolute;left:44px;right:44px;top:26px}
.pp-yol{font:500 16px G;color:#80868B;margin-bottom:16px}.pp-yol i{font-style:normal;margin:0 8px}.pp-yol b{color:#151515;font-weight:700}
.pp-hero h2{font:800 40px G;letter-spacing:-.02em;color:#151515;margin:14px 0 18px}
.pp-ara{display:flex;align-items:center;gap:14px;height:72px;background:#fff;border:2.5px solid #151515;border-radius:16px;padding:0 22px;font:600 26px G;color:#151515;box-shadow:0 10px 24px -14px rgba(0,0,0,.3)}.pp-ik{font:700 28px G;color:#80868B}
.pp-cr{display:inline-block;width:3px;height:30px;background:#E8402F;margin-left:-8px}
.pp-on{margin-top:8px;background:#fff;border-radius:14px;box-shadow:0 18px 30px -16px rgba(0,0,0,.3);overflow:hidden}.pp-oi{display:flex;align-items:center;gap:14px;padding:18px 22px;font:600 23px G;color:#151515;border-bottom:1px solid #EEF0F2;opacity:0}.pp-oi small{margin-left:auto;font:500 16px G;color:#80868B}
.pp-pop{margin-top:26px;display:flex;flex-wrap:wrap;gap:12px;align-items:center}.pp-pop b{font:700 17px G;color:#5F6368;margin-right:6px}.pp-pop span{background:#fff;border:1px solid #DADCE0;border-radius:999px;padding:8px 16px;font:500 16px G;color:#3C4043}
.pp-hb{background:#fff;border-radius:16px;padding:24px 28px;border:1px solid #E3E5E8}.pp-hb h3{margin:0;font:800 34px G;letter-spacing:-.02em;color:#151515}.pp-kur{margin-top:8px;font:600 19px G;color:#C8102E}
.pp-bilgi{margin:18px 0;background:#FFF8E1;border-left:5px solid #F6B92B;border-radius:10px;padding:14px 22px}.pp-bilgi p{margin:6px 0;font:500 20px/1.35 G;color:#3C4043}
.pp-bt{display:inline-block;background:#C8102E;color:#fff;font:700 22px G;padding:16px 36px;border-radius:12px}.pp-bt.act{box-shadow:0 0 0 5px rgba(232,64,47,.3)}
.pp-h3{margin:4px 0 16px;font:800 32px G;letter-spacing:-.02em;color:#151515}
.pp-tb{width:100%;border-collapse:separate;border-spacing:0;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 0 0 1px #E3E5E8;font:500 20px G;color:#3C4043}.pp-tb th{text-align:left;background:#F1F3F4;font:700 16px G;letter-spacing:.04em;color:#5F6368;padding:14px 18px}.pp-tb td{padding:18px;border-top:1px solid #EEF0F2}.pp-tb tr.act td{background:#FDECEA;color:#151515;font-weight:700}
.pp-uy{margin-top:14px;font:600 18px G;color:#C8102E}
.pp-al{margin-bottom:14px}.pp-al label{display:block;font:600 17px G;color:#5F6368;margin-bottom:6px}.pp-in{height:58px;background:#fff;border:2px solid #DADCE0;border-radius:12px;display:flex;align-items:center;padding:0 18px;font:600 22px G;color:#151515}.pp-in.act{border-color:#E8402F;box-shadow:0 0 0 4px rgba(232,64,47,.15)}
.pp-cb{display:flex;align-items:center;gap:14px;margin:10px 0 18px;font:600 20px G;color:#3C4043}.pp-cb i{width:28px;height:28px;border:2.5px solid #151515;border-radius:7px;display:inline-block}.pp-cb.ok i{background:#1E9E6A;border-color:#1E9E6A}
.pp-son{text-align:center;padding-top:60px}.pp-son h3{font:800 38px G;color:#151515;margin:18px 0 8px}.pp-son p{font:500 22px G;color:#5F6368}.pp-ref{display:inline-block;margin-top:14px;background:#fff;border:1px dashed #9AA0A6;border-radius:10px;padding:10px 20px;font:600 20px GM}.pp-tik{display:inline-block}
.pp.tel .pp-sb{display:flex;justify-content:space-between;align-items:center;padding:16px 30px 6px;font:700 17px G;color:#111}.pp-cen{width:110px;height:30px;border-radius:20px;background:#111}
.pp-app{display:flex;justify-content:space-between;align-items:center;padding:10px 26px 14px;font:800 26px G;color:#151515;border-bottom:1px solid #E3E5E8;background:#fff}.pp-app small{font:700 11px GM;letter-spacing:.14em;color:#F6B92B}
.pp.tel .pp-gov{padding:16px 18px}.pp.tel .pp-sc{left:18px;right:18px;top:16px}.pp.tel .pp-h3{font-size:26px}.pp.tel .pp-ara{height:60px;font-size:20px}.pp.tel .pp-oi{font-size:19px;padding:14px 16px}.pp.tel .pp-oi small{display:none}
.pp-vp{height:560px;overflow:hidden;border-radius:14px}.pp-kay{position:relative}.pp-li{display:flex;align-items:center;gap:14px;background:#fff;border-radius:16px;padding:16px;margin-bottom:10px;box-shadow:0 1px 0 rgba(0,0,0,.06)}.pp-li b{display:block;font:700 19px G;color:#151515}.pp-li small{font:500 15px G;color:#80868B}.pp-li i{margin-left:auto;font-style:normal;font-size:24px;color:#BDC1C6}.pp-nok{width:38px;height:38px;border-radius:11px;background:#E8EAED;flex:none}.pp-li.hd .pp-nok{background:#E8402F}.pp-li.act{box-shadow:0 0 0 3px #E8402F}
.pp-im{position:absolute;left:0;top:0;z-index:20;pointer-events:none;filter:drop-shadow(0 6px 6px rgba(0,0,0,.3))}.pp-dlg{position:absolute;width:80px;height:80px;border-radius:50%;border:4px solid #E8402F;z-index:19;opacity:0}
`;
