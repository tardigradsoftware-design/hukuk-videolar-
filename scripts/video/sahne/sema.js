// SAHNE DİLİ 2 (genel) — "Pastel Brutal sistem şeması", her senaryoya uyan bildirimsel motor.
// Sahne: { tur:'c_genel', sinif:'c2', a:k, basliklar:[[k,'HAP','BAŞLIK']], ogeler:[{ t:'kart'|'cizgi'|'akis'|'damga'|'not'|'liste'|'panel'|'zaman'|'yigin'|'dev'|'ikon'|'yorum'|'abone'|'adimlar', ... }] }
// Ortak alanlar: k (giriş kelimesi), cik (çıkış kelimesi), giris ('d' düş, 'x', '-x', 's', 'y'), sars (girişte ekran sarsılır).
// Vurgu (Stil 4'ten): 'dev' koyu tam ekran + üstü çizilen cümle + büyük damga. Temsili portal: 'panel' (resmi logo yok, TEMSİLİ GÖRÜNTÜ, kişisel veri •••).
const CZ = require('../cizimler');
const esc = x => String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const P = ['#FF9AD5', '#BFE3FF', '#F7D14C', '#A8F08C', '#FFB3A7', '#D9C8FF'];
const css = `
.c2 .ob{position:absolute}
.c2 .kt3{position:absolute;border:4px solid #151515;border-radius:12px;box-shadow:8px 8px 0 #151515;color:#151515;padding:22px 22px}
.c2 .kt3 .eti{position:absolute;left:14px;top:-17px;padding:3px 12px;background:#151515;color:#fff;font:800 16px GM;letter-spacing:.14em;border-radius:6px;white-space:nowrap}
.c2 .kt3 h3{margin:0;font:900 56px/1 Arc;font-stretch:88%;letter-spacing:-.02em;text-transform:uppercase}
.c2 .kt3 .al{display:flex;justify-content:space-between;gap:16px;margin-top:12px;padding:10px 14px;border:3px solid #151515;border-radius:8px;background:#fff;font:700 26px G;white-space:nowrap}
.c2 .kt3 .al b{font:800 22px GM}
.c2 .dm3{position:absolute;padding:8px 22px;border:5px solid #151515;border-radius:10px;font:900 46px Arc;font-stretch:86%;white-space:nowrap;box-shadow:5px 5px 0 #151515;text-transform:uppercase}
.c2 .nt3{position:absolute;padding:18px 24px 20px;background:#fff;border:3px solid #151515;border-radius:10px;box-shadow:6px 6px 0 #151515;font:700 32px/1.25 G;color:#151515}
.c2 .nt3 .k{display:inline-block;padding:2px 10px;border-radius:6px;background:#151515;color:#fff;font:800 15px GM;letter-spacing:.16em;margin-bottom:10px}
.c2 .nt3 .hl{background:linear-gradient(90deg,#F7D14C var(--p,0%),transparent var(--p,0%));padding:0 .08em}
.c2 .ls3{position:absolute;padding:20px 24px;background:#fff;border:4px solid #151515;border-radius:12px;box-shadow:8px 8px 0 #151515}
.c2 .ls3 h4{margin:0 0 14px;font:900 34px Arc;font-stretch:88%;text-transform:uppercase}
.c2 .ls3 .m{display:flex;align-items:center;gap:16px;margin-top:12px;font:700 32px G;white-space:nowrap}
.c2 .ls3 .m i.on{background:#A8F08C}.c2 .ls3 .m i{width:46px;height:46px;border:4px solid #151515;border-radius:10px;display:flex;align-items:center;justify-content:center;font:900 30px G;font-style:normal;flex:none}
.c2 .pn{position:absolute;background:#fff;border:4px solid #151515;border-radius:14px;box-shadow:10px 10px 0 #151515;overflow:hidden;color:#151515}
.c2 .pn .tb{height:58px;background:#151515;display:flex;align-items:center;gap:10px;padding:0 18px}
.c2 .pn .tb i{width:14px;height:14px;border-radius:50%;background:#FF9AD5}.c2 .pn .tb i:nth-child(2){background:#F7D14C}.c2 .pn .tb i:nth-child(3){background:#A8F08C}
.c2 .pn .tb span{margin-left:14px;flex:1;height:36px;border-radius:999px;background:#2A2A2A;color:#ddd;font:500 20px GM;display:flex;align-items:center;padding:0 18px}
.c2 .pn .tb em{font:800 14px GM;font-style:normal;letter-spacing:.14em;color:#151515;background:#F7D14C;padding:5px 10px;border-radius:6px}
.c2 .pn .hd3{height:64px;border-bottom:3px solid #151515;display:flex;align-items:center;gap:14px;padding:0 24px;font:900 30px Arc;font-stretch:90%;background:#BFE3FF}
.c2 .pn .hd3 b{width:36px;height:36px;border:3px solid #151515;border-radius:50%;background:#fff}
.c2 .pn .ek{position:absolute;left:0;right:0;top:122px;bottom:0;padding:28px 30px}
.c2 .pn .ara{display:flex;align-items:center;gap:14px;height:76px;border:4px solid #151515;border-radius:12px;padding:0 20px;font:700 30px G;background:#fff;white-space:nowrap;overflow:hidden}
.c2 .pn .ara svg{width:32px;height:32px;flex:none}
.c2 .pn .on{margin-top:14px;padding:16px 20px;border:3px solid #151515;border-radius:10px;font:700 26px G;display:flex;justify-content:space-between;white-space:nowrap}
.c2 .pn .on small{font:700 18px GM;color:#555}
.c2 .pn .on.sec{background:#F7D14C;box-shadow:4px 4px 0 #151515}
.c2 .pn h5{margin:0 0 16px;font:900 38px Arc;font-stretch:88%;text-transform:uppercase}
.c2 .pn table{width:100%;border-collapse:separate;border-spacing:0 8px;font:700 24px G}
.c2 .pn th{text-align:left;font:800 16px GM;letter-spacing:.12em;padding:0 12px;color:#555;text-transform:uppercase}
.c2 .pn td{padding:12px;border-top:3px solid #151515;border-bottom:3px solid #151515;background:#fff;white-space:nowrap}
.c2 .pn td:first-child{border-left:3px solid #151515;border-radius:8px 0 0 8px}.c2 .pn td:last-child{border-right:3px solid #151515;border-radius:0 8px 8px 0}
.c2 .pn tr.hl td{background:#A8F08C}
.c2 .pn .dur{display:inline-block;padding:2px 10px;border:2px solid #151515;border-radius:999px;font:800 18px G;background:#F7D14C}
.c2 .pn .al3{margin-top:16px}.c2 .pn .al3 label{display:block;font:800 16px GM;letter-spacing:.12em;margin-bottom:6px;color:#555}
.c2 .pn .al3 div{height:66px;border:3px solid #151515;border-radius:10px;padding:0 18px;display:flex;align-items:center;font:700 28px GM;white-space:nowrap;overflow:hidden}
.c2 .pn .btn{display:inline-block;margin-top:20px;padding:14px 30px;border:4px solid #151515;border-radius:10px;background:#FF9AD5;font:900 30px Arc;font-stretch:90%;box-shadow:5px 5px 0 #151515;text-transform:uppercase}
.c2 .pn .ok3{position:absolute;inset:0;background:#A8F08C;display:flex;flex-direction:column;align-items:center;justify-content:center;font:900 56px Arc;font-stretch:88%;text-transform:uppercase}
.c2 .pn .ok3 i{width:120px;height:120px;border:6px solid #151515;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font:900 70px G;font-style:normal;margin-bottom:20px}
.c2 .imc{position:absolute;width:58px;height:58px;z-index:9;filter:drop-shadow(3px 3px 0 #151515)}
.c2 .rp{position:absolute;width:30px;height:30px;margin:-15px 0 0 -15px;border:4px solid #151515;border-radius:50%;z-index:8}
.c2 .zm{position:absolute}.c2 .zm .ax{position:absolute;left:0;right:0;top:60px;height:8px;background:#151515;border-radius:4px}
.c2 .zm .tk{position:absolute;top:44px;width:4px;height:40px;background:#151515}.c2 .zm .tl{position:absolute;top:96px;font:800 22px GM;transform:translateX(-50%);white-space:nowrap}
.c2 .zm .ar{position:absolute;top:30px;height:68px;border:4px solid #151515;border-radius:10px;background:#A8F08C;box-shadow:5px 5px 0 #151515;transform-origin:left;display:flex;align-items:center;justify-content:center;font:900 34px Arc;font-stretch:88%;white-space:nowrap;overflow:hidden}
.c2 .zm .lb{position:absolute;top:-34px;font:900 30px Arc;font-stretch:88%;white-space:nowrap;text-transform:uppercase}
.c2 .yg i{position:absolute;width:64px;height:30px;border:3px solid #151515;border-radius:6px;box-shadow:3px 3px 0 #151515}
.c2 .dv3{position:absolute;inset:0;background:#151515;color:#FBF6EA;z-index:20}
.c2 .dv3 .u{position:absolute;left:140px;top:200px;font:800 22px GM;letter-spacing:.2em;color:#F7D14C}
.c2 .dv3 .y{position:absolute;left:140px;top:250px;right:140px;font:900 104px/1.02 Arc;font-stretch:86%;letter-spacing:-.02em;text-transform:uppercase}
.c2 .dv3 .y s{text-decoration:none;position:relative;color:#8C877C}.c2 .dv3 .y s i{position:absolute;left:-8px;right:-8px;top:46%;height:14px;background:#E8402F;transform-origin:left;border-radius:6px}
.c2 .dv3 .y2{position:absolute;left:140px;right:140px;top:640px;font:800 54px/1.15 G;color:#fff}.c2 .dv3 .y2 em{font-style:normal;background:#F7D14C;color:#151515;padding:0 .12em;border-radius:6px}
.c2 .ik3{position:absolute;border:4px solid #151515;border-radius:50%;box-shadow:6px 6px 0 #151515;display:flex;align-items:center;justify-content:center;overflow:hidden}
.c2 .yr3{position:absolute;padding:24px 30px;background:#151515;color:#fff;border-radius:16px;box-shadow:8px 8px 0 #F7D14C;font:900 58px Arc;font-stretch:88%;text-transform:uppercase;white-space:nowrap}
.c2 .yr3 b{color:#151515;background:#F7D14C;padding:0 14px;border-radius:8px}.c2 .yr3 small{display:block;margin-top:10px;font:700 28px G;text-transform:none;color:#ddd}
.c2 .ab3{position:absolute;display:flex;align-items:center;gap:22px;padding:18px 26px;background:#fff;border:4px solid #151515;border-radius:16px;box-shadow:8px 8px 0 #151515}
.c2 .ab3 b{display:block;font:900 44px Arc;font-stretch:88%;text-transform:uppercase}.c2 .ab3 small{font:700 24px G;color:#444}
.c2 .ab3 i{font-style:normal;padding:14px 26px;border-radius:12px;background:#E8402F;color:#fff;font:900 34px Arc;font-stretch:90%;border:4px solid #151515}
.c2 .ad3{position:absolute;display:flex;gap:18px}.c2 .ad3 div{width:248px;height:112px;padding:12px 14px;border:4px solid #151515;border-radius:10px;box-shadow:6px 6px 0 #151515;font:900 30px/1.02 Arc;font-stretch:88%;text-transform:uppercase;position:relative}
.c2 .ad3 small{display:block;font:800 15px GM;letter-spacing:.14em;margin-bottom:6px}.c2 .ad3 b{position:absolute;right:10px;top:8px;font:900 30px G;opacity:0}
`;
const DERI = `
.c2 .pn.tel,.m1 .pn.tel,.k3 .pn.tel{border-radius:52px}.pn.tel .tb b{color:#fff;font:700 20px G;margin-left:16px}.pn.tel .tb span{background:transparent!important}
.pn.tel .ek{padding:22px}.pn.tel .al3 div{font-size:22px;height:58px}.pn.tel .btn{font-size:24px}.pn.tel h5{font-size:32px}
.kg5{position:absolute;left:0;top:0;width:150px;height:200px;padding:22px 16px;background:#fff;border-radius:6px}.kg5 i{display:block;height:7px;margin-bottom:14px;border-radius:4px;background:#D9D5CD}
.yd{position:absolute;left:0;top:0;display:flex;flex-direction:column;align-items:center}.yd b{width:84px;height:84px;border-radius:50%;display:flex;align-items:center;justify-content:center}.yd span{position:absolute;top:96px;white-space:nowrap}
.ytk{position:absolute;width:24px;height:24px;margin:-12px 0 0 -12px;border-radius:50%}
.bsl .msk{display:block}.bsl.yt .msk{display:inline-block}.bsl .msk{overflow:hidden;padding:0 .04em .1em 0;vertical-align:top}.bsl .msk>span{display:inline-block}
/* --- c2 --- */
.c2 .kg5{border:3px solid #151515;box-shadow:5px 5px 0 #151515}.c2 .yd b{background:#fff;border:4px solid #151515;box-shadow:5px 5px 0 #151515;font:900 40px Arc}.c2 .yd.on b{background:#E8402F;color:#fff}.c2 .yd span{font:900 28px Arc;text-transform:uppercase}.c2 .ytk{background:#F7D14C;border:3px solid #151515}
.c2 .bsl{font:900 110px/.95 Arc;font-stretch:86%;text-transform:uppercase;color:#151515}.c2 .bsl .v{background:#F7D14C;padding:0 .06em}
/* --- m1 (Mavi Ferah) --- */
.m1 .kt3{border:0;border-radius:28px;box-shadow:0 34px 64px -26px rgba(30,100,220,.5),0 0 0 1px rgba(30,110,230,.14)}.m1 .kt3 .eti{background:#1E7BF2;border-radius:999px;padding:5px 14px}
.m1 .kt3 h3{font:800 46px/1.02 G;letter-spacing:-.045em;text-transform:none;color:#0E1726}.m1 .kt3 .al{border:0;background:#F1F5FC;border-radius:14px}
.m1 .dm3{border:5px solid #1E7BF2;color:#1E7BF2;background:rgba(255,255,255,.94)!important;box-shadow:0 20px 40px -20px rgba(30,123,242,.5);font:800 40px G;letter-spacing:-.03em;text-transform:none;border-radius:16px}
.m1 .nt3{border:0;border-radius:24px;box-shadow:0 30px 60px -26px rgba(30,100,220,.45),0 0 0 1px rgba(30,110,230,.12);font:700 34px/1.25 G}.m1 .nt3 .k{background:#1E7BF2;border-radius:999px}.m1 .nt3 .hl{background:linear-gradient(90deg,#DCEAFF var(--p,0%),transparent var(--p,0%))}
.m1 .ls3{border:0;border-radius:28px;box-shadow:0 40px 70px -30px rgba(30,100,220,.5),0 0 0 1px rgba(30,110,230,.14)}.m1 .ls3 h4{font:700 18px GM;letter-spacing:.24em;color:#1E7BF2}
.m1 .ls3 .m{font:700 32px G;letter-spacing:-.02em;color:#0E1726}.m1 .ls3 .m i{border:0;border-radius:14px;background:#E8F1FF;color:#1E7BF2;font:800 24px G}.m1 .ls3 .m i.on{background:#1E7BF2;color:#fff}
.m1 .pn{border:0;border-radius:26px;box-shadow:0 60px 90px -36px rgba(30,100,220,.55),0 0 0 1px rgba(30,110,230,.14)}.m1 .pn .tb{background:#F1F5FC}.m1 .pn .tb i{background:#D5DEEE!important}.m1 .pn .tb span{background:#fff;color:#556}.m1 .pn .tb em{background:#E8F1FF;color:#1E7BF2}.m1 .pn.tel .tb{background:#0E1726}
.m1 .pn .hd3{background:#1E7BF2;color:#fff;border:0;font:800 26px G}.m1 .pn .hd3 b{border:0;background:rgba(255,255,255,.35)}.m1 .pn h5{font:800 34px G;letter-spacing:-.03em;text-transform:none}
.m1 .pn .ara{border:2px solid #D5DEEE;border-radius:18px}.m1 .pn .on{border:0;background:#F6F9FF;border-radius:14px}.m1 .pn .on.sec{background:#1E7BF2;color:#fff;box-shadow:none}.m1 .pn .on.sec small{color:#DCEAFF}
.m1 .pn td{border:0!important;background:#F6F9FF}.m1 .pn tr.hl td{background:#DCEAFF}.m1 .pn .dur{border:0;background:#1E7BF2;color:#fff}.m1 .pn .al3 div{border:2px solid #D5DEEE;border-radius:14px}
.m1 .pn .btn{border:0;background:#1E7BF2;color:#fff;box-shadow:0 14px 24px -10px rgba(30,123,242,.6);border-radius:16px;font:800 28px G;text-transform:none}.m1 .pn .ok3{background:#1E7BF2;color:#fff;font:800 46px G;text-transform:none}.m1 .pn .ok3 i{border:0;color:#1E7BF2}
.m1 .imc{filter:drop-shadow(0 6px 8px rgba(0,0,0,.25))}.m1 .rp{border-color:#1E7BF2}
.m1 .zm .ax{background:#D5DEEE}.m1 .zm .tk{background:#B9C6DC}.m1 .zm .tl{color:#8A94A6}.m1 .zm .ar{border:0;background:#1E7BF2;color:#fff;border-radius:16px;box-shadow:0 20px 30px -14px rgba(30,123,242,.6);font:800 30px G}.m1 .zm .lb{font:700 18px GM;letter-spacing:.2em;color:#8A94A6}
.m1 .ik3{border:0;box-shadow:0 30px 50px -24px rgba(30,100,220,.5),0 0 0 1px rgba(30,110,230,.12);background:#fff!important}
.m1 .yr3{background:#1E7BF2;box-shadow:0 40px 70px -30px rgba(30,123,242,.7);font:800 64px G;letter-spacing:-.045em;text-transform:none;border-radius:30px}.m1 .yr3 b{background:#fff;color:#1E7BF2}
.m1 .ab3{border:0;border-radius:28px;box-shadow:0 40px 70px -30px rgba(30,100,220,.55),0 0 0 1px rgba(30,110,230,.14)}.m1 .ab3 b{font:800 40px G;letter-spacing:-.03em;text-transform:none}.m1 .ab3 i{border:0;border-radius:999px;font:800 28px G}
.m1 svg.ob path{stroke:#1E7BF2}.m1 .kg5{box-shadow:0 20px 40px -18px rgba(30,100,220,.45)}.m1 .kg5 i{background:#DDE6F5}
.m1 .yd b{background:#fff;box-shadow:0 20px 40px -16px rgba(30,100,220,.6),0 0 0 3px #1E7BF2;font:800 34px G;color:#1E7BF2}.m1 .yd.on b{background:#1E7BF2;color:#fff}.m1 .yd span{font:700 26px G;color:#0E1726}.m1 .ytk{background:#1E7BF2;box-shadow:0 0 0 6px rgba(30,123,242,.2)}
/* --- k3 (Kâğıt Serif) --- */
.k3{background:#fff radial-gradient(#E3E5EB 1.6px,transparent 1.8px) 0 0/36px 36px}
.k3 .kt3{background:#FFFDF8!important;border:2.5px solid #151515;border-radius:18px;box-shadow:6px 6px 0 #151515}.k3 .kt3 .eti{background:#FFFDF8;color:#6B7280;border:2px solid #151515;letter-spacing:.2em}
.k3 .kt3 h3{font:400 54px/1 IS;letter-spacing:-.01em;text-transform:none}.k3 .kt3 .al{border:1.5px solid #D8D6CF;font:600 26px G}
.k3 .dm3{font:italic 400 54px IS;text-transform:none;border:3px solid #2F6BFF;color:#2F6BFF;background:#fff!important;box-shadow:5px 5px 0 #2F6BFF;border-radius:999px;padding:4px 32px 8px}
.k3 .nt3{border:2.5px solid #151515;border-radius:16px;font:400 44px/1.12 IS}.k3 .nt3 .k{background:#151515}.k3 .nt3 .hl{font-style:italic;background:linear-gradient(90deg,#CDEFDB var(--p,0%),transparent var(--p,0%))}
.k3 .ls3{background:#FFFDF8;border:2.5px solid #151515;border-radius:20px;box-shadow:6px 6px 0 #151515}.k3 .ls3 h4{font:600 20px GM;letter-spacing:.24em;color:#6B7280}.k3 .ls3 .m{font:400 42px IS}.k3 .ls3 .m i{border:2.5px solid #151515;border-radius:50%;font:600 20px GM}.k3 .ls3 .m i.on{background:#12B76A;color:#fff}
.k3 .pn{border:2.5px solid #151515;border-radius:20px;box-shadow:8px 8px 0 #151515}.k3 .pn .tb{background:#F3F1EC}.k3 .pn .tb span{background:#fff;color:#444}.k3 .pn .tb em{background:#151515;color:#fff}.k3 .pn.tel .tb{background:#151515}
.k3 .pn .hd3{background:#FFFDF8;font:400 34px IS;border-bottom:2px solid #151515}.k3 .pn h5{font:400 46px IS;text-transform:none}.k3 .pn .ara{border:2.5px solid #151515}.k3 .pn .on{border:1.5px solid #D8D6CF}.k3 .pn .on.sec{background:#DCE6FF;box-shadow:none;border-color:#2F6BFF}
.k3 .pn td{border-width:1.5px!important;border-color:#D8D6CF!important}.k3 .pn tr.hl td{background:#DCF5E7}.k3 .pn .dur{background:#fff}.k3 .pn .al3 div{border:2px solid #151515}.k3 .pn .btn{background:#2F6BFF;color:#fff;border:2.5px solid #151515;font:600 26px G;text-transform:none}.k3 .pn .ok3{background:#12B76A;color:#fff;font:400 60px IS;text-transform:none}
.k3 svg.ob path{stroke:#2F6BFF}.k3 .zm .ax{background:#151515}.k3 .zm .ar{background:#2F6BFF;color:#fff;border:2.5px solid #151515;font:400 42px IS;text-transform:none}.k3 .zm .lb{font:400 40px IS;text-transform:none}
.k3 .ik3{border:2.5px solid #151515;box-shadow:5px 5px 0 #151515}.k3 .yr3{background:#FFFDF8;color:#151515;border:2.5px solid #151515;box-shadow:8px 8px 0 #151515;font:400 76px IS;text-transform:none}.k3 .yr3 b{background:#E8402F;color:#fff;font-style:italic}.k3 .yr3 small{color:#555}
.k3 .ab3{border:2.5px solid #151515;border-radius:20px}.k3 .ab3 b{font:400 54px IS;text-transform:none}.k3 .ab3 i{border:0;border-radius:999px;font:600 28px G}
.k3 .kg5{border:2px solid #151515;box-shadow:5px 5px 0 #151515;background:#FFFDF8}.k3 .yd b{background:#fff;border:3px solid #151515;box-shadow:5px 5px 0 #151515;font:400 46px IS}.k3 .yd.on b{background:#E8402F;color:#fff}.k3 .yd span{font:italic 400 36px IS}.k3 .ytk{background:#F6B92B;border:2.5px solid #151515}
.k3 .bsl{font:400 110px/1 IS;letter-spacing:-.015em;color:#151515}.k3 .bsl .v{font-style:italic;color:#2F6BFF}
.k3 .dv3{background:#151515}.k3 .dv3 .y{font:400 120px/1 IS;text-transform:none}
`;
const ARA = '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.5" fill="none" stroke="#151515" stroke-width="3"/><path d="M15 15 L21 21" stroke="#151515" stroke-width="3.4" stroke-linecap="round"/></svg>';
function ekran(e, j) {
  const ust = e.baslik ? `<h5>${esc(e.baslik)}</h5>` : '';
  if (e.tur === 'giris') return `<div class="ek" data-ek="${j}">${ust}${e.alanlar.map(([l], n) => `<div class="al3"><label>${esc(l)}</label><div data-ty="${n}"></div></div>`).join('')}<span class="btn" data-hd="btn">${esc(e.buton.yazi)}</span></div>`;
  if (e.tur === 'arama') return `<div class="ek" data-ek="${j}">${ust}<div class="ara" data-hd="ara">${ARA}<span data-ty="a"></span></div>${(e.oneriler || []).map(([o, kurum], n) => `<div class="on" data-on="${n}" data-hd="on${n}"><span>${esc(o)}</span><small>${esc(kurum || '')}</small></div>`).join('')}</div>`;
  if (e.tur === 'tablo') return `<div class="ek" data-ek="${j}">${ust}<table><tr>${e.kolonlar.map(c => `<th>${esc(c)}</th>`).join('')}</tr>${e.satirlar.map(([r], n) => `<tr data-sr="${n}" data-hd="sr${n}">${r.map((c, m) => `<td>${m === r.length - 1 && e.durum ? `<span class="dur">${esc(c)}</span>` : esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>`;
  if (e.tur === 'form') return `<div class="ek" data-ek="${j}">${ust}${e.ust ? `<span class="btn" data-hd="ub" style="margin:0 0 6px;background:#BFE3FF">${esc(e.ust.yazi)}</span>` : ''}${e.alanlar.map(([l], n) => `<div class="al3"><label>${esc(l)}</label><div data-ty="${n}"></div></div>`).join('')}<span class="btn" data-hd="btn">${esc(e.buton.yazi)}</span>${e.sonuc ? `<div class="ok3" data-ok="1"><i>✓</i>${esc(e.sonuc.yazi)}</div>` : ''}</div>`;
  return '';
}
function oge(o, j) {
  const st = `left:${o.x}px;top:${o.y}px;${o.w ? 'width:' + o.w + 'px;' : ''}${o.h ? 'height:' + o.h + 'px;' : ''}${o.z ? 'z-index:' + o.z + ';' : ''}`;
  const A = `data-o="${j}"`;
  switch (o.t) {
    case 'kart': return `<div class="kt3" ${A} style="${st}background:${o.renk || P[j % P.length]}">${o.eti ? `<span class="eti">${esc(o.eti)}</span>` : ''}${o.yazi ? `<h3 style="${o.boy ? 'font-size:' + o.boy + 'px' : ''}">${esc(o.yazi)}</h3>` : ''}${(o.alt || []).map(([a, b, k], n) => `<div class="al" data-al="${n}"><span>${esc(a)}</span>${b ? `<b>${esc(b)}</b>` : ''}</div>`).join('')}</div>`;
    case 'cizgi': return `<svg class="ob" ${A} style="left:0;top:0;width:1920px;height:1080px;overflow:visible" viewBox="0 0 1920 1080"><path d="${o.d}" fill="none" stroke="#151515" stroke-width="5" ${o.kesik ? 'stroke-dasharray="16 12"' : ''}/>${o.ok ? '<path class="uc" d="M-14 -10 L4 0 L-14 10" fill="none" stroke="#151515" stroke-width="5" stroke-linejoin="round"/>' : ''}</svg>${o.eti ? `<div class="nt3" data-oe="${j}" style="left:0;top:0;padding:6px 14px;font:800 24px G;background:${o.etiRenk || '#A8F08C'};white-space:nowrap">${esc(o.eti)}</div>` : ''}`;
    case 'akis': return `<div class="kt3" ${A} style="left:0;top:0;padding:10px 18px;background:${o.renk || '#A8F08C'};font:900 34px Arc;font-stretch:88%;white-space:nowrap;box-shadow:5px 5px 0 #151515">${esc(o.yazi)}</div>`;
    case 'damga': return `<div class="dm3" ${A} style="${st}background:${o.renk || '#FF9AD5'}">${esc(o.yazi)}</div>`;
    case 'not': return `<div class="nt3" ${A} style="${st}">${o.eti ? `<span class="k">${esc(o.eti)}</span><br>` : ''}${esc(o.metin)}${o.vurgu ? ` <span class="hl">${esc(o.vurgu)}</span>` : ''}${o.son ? esc(o.son) : ''}</div>`;
    case 'liste': return `<div class="ls3" ${A} style="${st}">${o.baslik ? `<h4>${esc(o.baslik)}</h4>` : ''}${o.maddeler.map(([m], n) => `<div class="m" data-m="${n}"><i>${n + 1}</i>${esc(m)}</div>`).join('')}</div>`;
    case 'panel': return `<div class="pn${o.cihaz === 'telefon' ? ' tel' : ''}" ${A} style="${st}"><div class="tb">${o.cihaz === 'telefon' ? '<b>9:41</b><span></span>' : `<i></i><i></i><i></i><span>${esc(o.url || '')}</span>`}<em>TEMSİLİ GÖRÜNTÜ</em></div><div class="hd3"><b></b>${esc(o.site || '')}</div>${o.ekranlar.map(ekran).join('')}</div><svg class="imc" data-im="${j}" viewBox="0 0 24 24" style="left:0;top:0"><path d="M3 2 L20 12 L12 13.5 L8 21 Z" fill="#fff" stroke="#151515" stroke-width="2" stroke-linejoin="round"/></svg><i class="rp" data-rp="${j}"></i>`;
    case 'zaman': return `<div class="zm" ${A} style="${st}"><i class="ax"></i>${Array.from({ length: o.n + 1 }, (_, m) => `<i class="tk" style="left:${m / o.n * 100}%"></i>${m % (o.adim || 1) === 0 ? `<span class="tl" style="left:${m / o.n * 100}%">${m}</span>` : ''}`).join('')}
      <div class="ar" data-ar="1" style="left:${o.a / o.n * 100}%;width:${(o.b - o.a) / o.n * 100}%">${esc(o.yazi || '')}</div>${(o.etiketler || []).map(([x, tx], m) => `<span class="lb" style="left:${x / o.n * 100}%;${m ? 'transform:translateX(-100%)' : ''}">${esc(tx)}</span>`).join('')}<span class="tl" style="left:50%;top:136px;font-size:20px;letter-spacing:.14em">${esc(o.birim || '')}</span></div>`;
    case 'yigin': return `<div class="yg ob" ${A} style="${st}">${Array.from({ length: o.n }, (_, m) => `<i data-y="${m}" style="background:${P[m % P.length]}"></i>`).join('')}</div>`;
    case 'dev': return `<div class="dv3" ${A}><div class="u">${esc(o.ust || '')}</div><div class="y">${o.cizik ? `<s>${esc(o.cizik)}<i></i></s> ` : ''}${esc(o.yazi || '')}</div>${o.alt ? `<div class="y2">${esc(o.alt)}${o.vurgu ? ` <em>${esc(o.vurgu)}</em>` : ''}</div>` : ''}</div>`;
    case 'ikon': return `<div class="ik3" ${A} style="${st}width:${o.boy || 170}px;height:${o.boy || 170}px;background:${o.renk || '#fff'}">${CZ.svg(o.ad, (o.boy || 170) * .72)}</div>`;
    case 'yorum': return `<div class="yr3" ${A} style="${st}">Yorumlara <b>${esc(o.kelime)}</b> yaz<small>${esc(o.soru || '')}</small></div>`;
    case 'abone': return `<div class="ab3" ${A} style="${st}">${CZ.svg('zil', 90)}<div><b>${esc(o.yazi || 'Abone ol')}</b><small>${esc(o.ek || 'yeni hak rehberleri için')}</small></div><i>ABONE OL</i></div>`;
    case 'baslik': return `<div class="hd bsl ob${o.yatay ? ' yt' : ''}" ${A} style="${st}font-size:${o.boy || 130}px;${o.orta ? 'text-align:center;' : ''}">${o.satir.map(([x, a, v]) => `<span class="msk" data-a="${a}"><span${v ? ' class="b v"' : ''}>${esc(x)}${o.yatay ? '&nbsp;' : ''}</span></span>`).join('')}</div>`;
    case 'cip': return `<div class="chip" ${A}><i></i><span></span><em></em></div>${o.nokta === false ? '' : `<div class="dots" data-od="${j}" data-ek="${esc(o.ek || '')}" style="left:${o.x - 120}px;top:${o.y + 118}px;width:240px;justify-content:center">${o.cipler.filter(c => c[4]).map(() => '<b></b>').join('')}<span></span></div>`}`;
    case 'kagitlar': return `<div class="ob" ${A} style="left:0;top:0;width:1920px;height:1080px">${Array.from({ length: o.n || 10 }, (_, m) => `<div class="kg5" data-kg="${m}">${Array.from({ length: 7 }, (_, r) => `<i style="width:${45 + (r * 31 + m * 17) % 50}%"></i>`).join('')}</div>`).join('')}</div>`;
    case 'yol': return `<svg class="ob" ${A} style="left:0;top:0;width:1920px;height:1080px;overflow:visible" viewBox="0 0 1920 1080"><path d="${o.d}" fill="none" stroke="#151515" stroke-width="6" stroke-linecap="round"/></svg>${o.dugumler.map(([p, et], m) => `<div class="yd" data-yd="${j}_${m}"><b>${m + 1}</b><span>${esc(et)}</span></div>`).join('')}<i class="ytk" data-yt="${j}"></i>`;
    case 'adimlar': return `<div class="ad3" ${A} style="${st}">${o.adlar.map((a, m) => `<div data-ad="${m}" style="background:${P[m % P.length]}"><small>ADIM ${m + 1}</small>${esc(a)}<b>✓</b></div>`).join('')}</div>`;
  }
  return '';
}
const STAR = (c, n) => `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="${n === 1 ? 'M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39Z' : 'M50 0 L58 30 L88 14 L70 42 L100 50 L70 58 L88 86 L58 70 L50 100 L42 70 L12 86 L30 58 L0 50 L30 42 L12 14 L42 30Z'}" fill="${c}" stroke="#151515" stroke-width="4" stroke-linejoin="round"/></svg>`;
const mark = {
  c_genel: s => `${s.basliklar ? '<div class="pil" data-r="pil"></div><div class="bas" data-r="bas"></div>' : ''}
    ${!/c2/.test(s.sinif || '') ? '' : [[1180, 40, '#F7D14C', 1, 80], [1800, 70, '#FF7AC6', 2, 64], [1840, 600, '#A8F08C', 1, 56]].map(([x, y, c, n, b], j) => `<div class="st" data-st="${j}" style="left:${x}px;top:${y}px;width:${b}px;height:${b}px">${STAR(c, n)}</div>`).join('')}
    ${s.ogeler.map(oge).join('\n')}`,
};
const rt = `
const KT = v => v == null ? 1e9 : Array.isArray(v) ? T(v[0]) + v[1] : T(v);
function tyz(el, txt, t0, t, sure) { if (!el) return; const n = t < t0 ? 0 : Math.floor(cl((t - t0) / (sure || Math.min(1.1, .04 * txt.length + .2)), 0, 1) * txt.length); el.textContent = txt.slice(0, n) + (n > 0 && n < txt.length ? '|' : ''); }
function goreli(el, hedef) { const a = el.getBoundingClientRect(), b = hedef.getBoundingClientRect(), sc = a.width / el.offsetWidth; return [(b.left - a.left) / sc + b.width / sc * .6, (b.top - a.top) / sc + b.height / sc * .6]; }
function cGenelOge(s, o, j, t, el) { const e = q(el, '[data-o="' + j + '"]'); if (!e) return; const t0 = o.k == null ? s.t : KT(o.k), t1 = KT(o.cik);
  if (t < t0 - .05 || t > t1 + .4) { e.style.display = 'none'; const x = q(el, '[data-oe="' + j + '"]'); if (x) x.style.display = 'none'; const im = q(el, '[data-im="' + j + '"]'); if (im) im.style.display = 'none'; const rp = q(el, '[data-rp="' + j + '"]'); if (rp) rp.style.display = 'none'; const od = q(el, '[data-od="' + j + '"]'); if (od) od.style.display = 'none'; qa(el, '[data-yd^="' + j + '_"]').forEach(z => z.style.display = 'none'); const yt = q(el, '[data-yt="' + j + '"]'); if (yt) yt.style.display = 'none'; return; }
  e.style.display = ''; const cik = cl((t - t1) / .35, 0, 1);
  const G = () => { gir(e, t0, t, o.giris || (o.t === 'damga' ? 'damga' : 'd')); if (cik > 0) { e.style.opacity = (1 - cik); e.style.transform += ' translateY(' + (-60 * ei(cik)) + 'px)'; } };
  if (o.t === 'kart') { G(); (o.durum || []).forEach(([k, d]) => { if (t >= KT(k)) { if (d.renk) e.style.background = d.renk; if (d.soluk) e.style.filter = 'grayscale(1) opacity(.6)'; } }); if (!(o.durum || []).some(([k, d]) => d.soluk && t >= KT(k))) e.style.filter = '';
    qa(e, '[data-al]').forEach((r, n) => { const a = o.alt[n][2]; if (a == null) return; const k = bo(cl((t - KT(a)) / .3, 0, 1)); r.style.opacity = t < KT(a) ? 0 : 1; r.style.transform = 'translateX(' + ((1 - k) * -40) + 'px)'; const hl = o.alt[n][3]; r.style.background = hl && t >= KT(hl) ? '#F7D14C' : '#fff'; }); return; }
  if (o.t === 'cizgi') { const p = e.querySelector('path'), L = p.getTotalLength(), k = eio(cl((t - t0) / (o.sure || .5), 0, 1)); e.style.opacity = 1 - cik;
    if (o.kesik) { p.style.strokeDashoffset = -t * 50; e.style.clipPath = 'none'; p.style.opacity = k; } else { p.style.strokeDasharray = L; p.style.strokeDashoffset = L * (1 - k); }
    const uc = e.querySelector('.uc'); if (uc) { const P1 = p.getPointAtLength(L * k), P0 = p.getPointAtLength(Math.max(0, L * k - 4)); uc.setAttribute('transform', 'translate(' + P1.x + ' ' + P1.y + ') rotate(' + (Math.atan2(P1.y - P0.y, P1.x - P0.x) * 180 / Math.PI) + ')'); uc.style.opacity = k > .05 ? 1 : 0; }
    const x = q(el, '[data-oe="' + j + '"]'); if (x) { x.style.display = ''; const M = p.getPointAtLength(L * .5); gir(x, t0 + .3, t, 's'); x.style.left = (M.x - x.offsetWidth / 2) + 'px'; x.style.top = (M.y - 60) + 'px'; if (cik > 0) x.style.opacity = 1 - cik; } return; }
  if (o.t === 'akis') { const yol = s.ogeler.findIndex(z => z.id === o.yol), pe = q(el, '[data-o="' + yol + '"] path'); if (!pe) return; const L = pe.getTotalLength(), k = eio(cl((t - t0) / (o.sure || 1), 0, 1)), Pp = pe.getPointAtLength(L * (o.geri ? 1 - k : k));
    e.style.opacity = t < t0 ? 0 : (1 - cik) * (o.kal ? 1 : 1 - cl((k - .92) / .08, 0, 1)); e.style.transform = 'translate(' + (Pp.x - e.offsetWidth / 2) + 'px,' + (Pp.y - e.offsetHeight / 2) + 'px) rotate(' + (Math.sin(k * 9) * 5) + 'deg)'; return; }
  if (o.t === 'damga') { if (t < t0) { e.style.opacity = 0; return; } const k = eo(cl((t - t0) / .2, 0, 1)); e.style.opacity = 1 - cik; e.style.transform = 'rotate(' + (o.rot || -6) + 'deg) scale(' + (1 + 1.6 * Math.pow(1 - k, 2)) + ')'; return; }
  if (o.t === 'not') { G(); const hl = e.querySelector('.hl'); if (hl) hl.style.setProperty('--p', (eo(cl((t - KT(o.vurguK != null ? o.vurguK : o.k)) / .4, 0, 1)) * 100) + '%'); return; }
  if (o.t === 'liste') { G(); qa(e, '[data-m]').forEach((m, n) => { const mk = KT(o.maddeler[n][1]), on = t >= mk, k = bo(cl((t - mk) / .3, 0, 1)), ic = m.querySelector('i'); m.style.opacity = o.hepsi || on ? 1 : .35; ic.textContent = on ? '✓' : n + 1; ic.className = on ? 'on' : ''; ic.style.transform = 'scale(' + (on ? .7 + .3 * k : 1) + ') rotate(' + (on ? (1 - k) * -30 : 0) + 'deg)'; }); return; }
  if (o.t === 'panel') { G(); let ai = 0; o.ekranlar.forEach((x, n) => { if (t >= KT(x.k)) ai = n; }); const at = KT(o.ekranlar[ai].k);
    qa(e, '[data-ek]').forEach((x, n) => { const on = n === ai, k = eio(cl((t - at) / .35, 0, 1)); x.style.display = on || (n === ai - 1 && k < 1) ? 'block' : 'none'; x.style.transform = on ? 'translateX(' + ((1 - k) * (n ? 100 : 0)) + '%)' : 'translateX(' + (-100 * k) + '%)'; });
    const E = o.ekranlar[ai], X = q(e, '[data-ek="' + ai + '"]'), hedef = [];
    if (E.tur === 'giris' || E.tur === 'form') { E.alanlar.forEach(([l, v, k], n) => { tyz(q(X, '[data-ty="' + n + '"]'), v, KT(k), t); hedef.push([KT(k) - .3, '[data-ty="' + n + '"]']); }); hedef.push([KT(E.buton.k) - .35, '[data-hd=btn]', 1]); const b = q(X, '[data-hd=btn]'); b.style.transform = t > KT(E.buton.k) && t < KT(E.buton.k) + .15 ? 'translate(4px,4px)' : ''; b.style.boxShadow = t > KT(E.buton.k) && t < KT(E.buton.k) + .15 ? 'none' : '';
      if (E.ust) hedef.unshift([KT(E.ust.k) - .35, '[data-hd=ub]', 1]); const ok = q(X, '[data-ok]'); if (ok) { const k = bo(cl((t - KT(E.sonuc.k)) / .35, 0, 1)); ok.style.opacity = t < KT(E.sonuc.k) ? 0 : 1; ok.style.transform = 'scale(' + (.6 + .4 * k) + ')'; } }
    if (E.tur === 'arama') { tyz(q(X, '[data-ty=a]'), E.metin, KT(E.aramaK), t); hedef.push([KT(E.aramaK) - .4, '[data-hd=ara]', 1]); (E.oneriler || []).forEach((on, n) => { const d = q(X, '[data-on="' + n + '"]'), ot = KT(E.aramaK) + .9 + n * .1; d.style.opacity = t < ot ? 0 : 1; d.style.transform = 'translateY(' + ((1 - eo(cl((t - ot) / .25, 0, 1))) * 20) + 'px)'; d.classList.toggle('sec', E.sec === n && t >= KT(E.secK)); }); if (E.sec != null) hedef.push([KT(E.secK) - .4, '[data-hd=on' + E.sec + ']', 1]); }
    if (E.tur === 'tablo') { E.satirlar.forEach(([r, k], n) => { const d = q(X, '[data-sr="' + n + '"]'), kk = bo(cl((t - KT(k)) / .3, 0, 1)); d.style.opacity = t < KT(k) ? 0 : 1; d.style.transform = 'translateX(' + ((1 - kk) * 60) + 'px)'; d.classList.toggle('hl', E.hl != null && n === E.hl[0] && t >= KT(E.hl[1])); }); if (E.hl) hedef.push([KT(E.hl[1]) - .4, '[data-sr="' + E.hl[0] + '"]', 1]); }
    const im = q(el, '[data-im="' + j + '"]'), rp = q(el, '[data-rp="' + j + '"]'); im.style.display = ''; rp.style.display = ''; let cur = null, prv = null; hedef.sort((a, b) => a[0] - b[0]).forEach(h => { if (t >= h[0]) { prv = cur; cur = h; } });
    if (!cur) { im.style.opacity = 0; rp.style.opacity = 0; } else { const hc = q(X, cur[1]); if (hc) { const [hx, hy] = goreli(e, hc); let px = hx + 200, py = hy + 160; if (prv) { const hp = q(X, prv[1]); if (hp) [px, py] = goreli(e, hp); } const k = eio(cl((t - cur[0]) / .35, 0, 1)), x = o.x + px + (hx - px) * k, y = o.y + py + (hy - py) * k, tk = cur[2] && t > cur[0] + .35;
        im.style.opacity = (1 - cik) * cl((t - t0) / .3, 0, 1); im.style.left = x + 'px'; im.style.top = y + 'px'; im.style.transform = 'scale(' + (tk && t < cur[0] + .5 ? .8 : 1) + ')'; const rk = cl((t - cur[0] - .35) / .4, 0, 1); rp.style.left = (x + 4) + 'px'; rp.style.top = (y + 4) + 'px'; rp.style.opacity = tk ? 1 - rk : 0; rp.style.transform = 'scale(' + (1 + rk * 2.5) + ')'; } } return; }
  if (o.t === 'zaman') { G(); const ar = q(e, '[data-ar]'); ar.style.transform = 'scaleX(' + eo(cl((t - KT(o.dolK)) / .8, 0, 1)) + ')'; return; }
  if (o.t === 'yigin') { e.style.opacity = 1 - cik; const t2 = KT(o.bitK); qa(e, '[data-y]').forEach((b, m) => { const bt = t0 + (t2 - t0) * m / o.n, k = cl((t - bt) / .35, 0, 1), col = m % 6, row = Math.floor(m / 6); b.style.opacity = t < bt ? 0 : 1; b.style.left = (col * 70) + 'px'; b.style.top = (row * -36 - (1 - bo(k)) * 300) + 'px'; b.style.transform = 'rotate(' + ((1 - k) * 30 * (hs(m) - .5)) + 'deg)'; }); return; }
  if (o.t === 'dev') { const k = eio(cl((t - t0) / .35, 0, 1)); e.style.clipPath = 'inset(0 0 0 ' + ((1 - k) * 100) + '%)'; e.style.opacity = 1 - cik; document.body.classList.toggle('k', t >= t0 && cik < .5);
    const s1 = e.querySelector('s i'); if (s1) s1.style.transform = 'scaleX(' + eo(cl((t - KT(o.cizikK)) / .3, 0, 1)) + ')'; const y = e.querySelector('.y'); y.style.transform = 'translateY(' + ((1 - bo(cl((t - t0 - .15) / .4, 0, 1))) * 80) + 'px)';
    const y2 = e.querySelector('.y2'); if (y2) gir(y2, KT(o.altK), t, 'y'); return; }
  if (o.t === 'ikon') { G(); const c = e.querySelector('.cz-il'); if (c) CZ.anim(c, t - t0); return; }
  if (o.t === 'yorum' || o.t === 'abone') { G(); if (t > t0 + .4) e.style.transform += ' rotate(' + (Math.sin(t * 2.4) * 1.5) + 'deg) scale(' + (1 + .02 * Math.sin(t * 3.1)) + ')'; const c = e.querySelector('.cz-il'); if (c) CZ.anim(c, t - t0); return; }
  if (o.t === 'baslik') { e.style.opacity = 1 - cik; e.style.transform = cik > 0 ? 'translateY(' + (-60 * ei(cik)) + 'px)' : ''; hdCiz(e, t); return; }
  if (o.t === 'cip') { const dt = q(el, '[data-od="' + j + '"]'); if (dt) dt.style.display = ''; cipCiz(e, o.cipler, t, o.x, o.y, dt, o.toplam); if (cik > 0) { e.style.opacity = 1 - cik; if (dt) dt.style.opacity = 1 - cik; } return; }
  if (o.t === 'kagitlar') { e.style.opacity = (1 - cik) * cl((t - t0) / .5, 0, 1); qa(e, '[data-kg]').forEach((g, m) => { const x = hs(m) * 1800, y = ((hs(m + 5) * 1300 + t * (14 + hs(m + 2) * 18)) % 1300) - 200, r = (hs(m + 9) - .5) * 50 + Math.sin(t * .5 + m) * 6; g.style.transform = 'translate(' + x + 'px,' + (1080 - y) + 'px) rotate(' + r + 'deg) scale(' + (.6 + hs(m + 3) * .5) + ')'; }); return; }
  if (o.t === 'yol') { const p = e.querySelector('path'), L = +p.dataset.L || (p.dataset.L = p.getTotalLength()), k = eio(cl((t - t0) / (o.sure || .9), 0, 1)); p.style.strokeDasharray = L; p.style.strokeDashoffset = L * (1 - k); e.style.opacity = 1 - cik;
    o.dugumler.forEach(([pos, et, dk, vk], m) => { const d = q(el, '[data-yd="' + j + '_' + m + '"]'), P0 = p.getPointAtLength(L * pos), kk = bo(cl((t - KT(dk)) / .35, 0, 1)), on = vk != null && t >= KT(vk); d.style.display = ''; d.style.left = P0.x + 'px'; d.style.top = P0.y + 'px'; d.style.opacity = (t < KT(dk) ? 0 : 1) * (1 - cik); d.style.transform = 'translate(-50%,-50%) scale(' + (.3 + .7 * kk + .03 * Math.sin(t * 4 + m)) + ')'; d.classList.toggle('on', on); });
    const tk = q(el, '[data-yt="' + j + '"]'); if (tk) { tk.style.display = ''; const ph = ((t - t0) / 2.4) % 1, P1 = p.getPointAtLength(L * ph * k); tk.style.left = P1.x + 'px'; tk.style.top = P1.y + 'px'; tk.style.opacity = t > t0 + .6 ? Math.sin(ph * Math.PI) * (1 - cik) : 0; } return; }
  if (o.t === 'adimlar') { G(); qa(e, '[data-ad]').forEach((d, m) => { const dk = t0 + m * .1, k = bo(cl((t - dk) / .3, 0, 1)); let tr = 'translateY(' + ((1 - k) * -120) + 'px)'; d.style.opacity = t < dk ? 0 : 1; const ak = o.aktif && o.aktif[1] === m && t >= KT(o.aktif[0]); if (ak) { const kk = bo(cl((t - KT(o.aktif[0])) / .3, 0, 1)); tr += ' translateY(' + (-30 * kk) + 'px) scale(' + (1 + .1 * kk) + ')'; d.style.outline = '5px solid #E8402F'; d.style.outlineOffset = '5px'; } else d.style.outline = 'none';
      const ok = o.tamam && t >= KT(o.tamam[m]); d.querySelector('b').style.opacity = ok ? 1 : 0; d.style.transform = tr; }); return; }
}
Object.assign(D, {
  c_genel(s, lt, o, t) { const el = s.el; if (s.basliklar) c2Ust(el, s, t);
    const sh = s.ogeler.reduce((a, x) => { if (!x.sars) return a; const d = t - KT(x.k); return d > 0 && d < .35 ? a + Math.sin(d * 80) * 9 * (1 - d / .35) : a; }, 0); el.style.translate = sh + 'px 0';
    s.ogeler.forEach((x, j) => cGenelOge(s, x, j, t, el)); },
});`;
module.exports = { css: css.replace(/\.c2 /g, ':is(.c2,.m1,.k3) ') + DERI, mark, rt };
