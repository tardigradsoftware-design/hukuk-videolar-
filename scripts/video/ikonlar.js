// Emoji → profesyonel ikon (Phosphor Icons duotone, MIT). Çocuksu emoji/Fluent/Windows emojisi KULLANILMAZ.
// Planlarda emoji yazılabilir; burada eşlenir. Eşlenemeyen emoji gösterilmez (metinden silinir).
const P = require('@iconify-json/ph/icons.json');
const ESLE = {
  '⏰': 'alarm', '⏱': 'timer', '⏳': 'hourglass-medium', '☎': 'phone', '⚖': 'scales', '⚠': 'warning', '✅': 'check-circle', '✉': 'envelope-simple',
  '✍': 'signature', '✒': 'pen-nib', '🌐': 'globe', '🎓': 'graduation-cap', '🏖': 'island', '🏘': 'buildings', '🏛': 'bank', '🏠': 'house',
  '🏢': 'building-office', '🏥': 'hospital', '🏦': 'vault', '🏷': 'tag', '🐷': 'chart-line-up', '👇': 'hand-pointing', '👪': 'users-three',
  '👴': 'user', '👷': 'hard-hat', '💔': 'heart-break', '💡': 'lightbulb', '💬': 'chat-circle-text', '💰': 'money', '💳': 'credit-card',
  '💵': 'money', '💸': 'hand-coins', '💼': 'briefcase', '📅': 'calendar-check', '📈': 'trend-up', '📉': 'trend-down', '📊': 'chart-bar',
  '📌': 'push-pin', '📜': 'scroll', '📝': 'note-pencil', '📞': 'phone-call', '📡': 'broadcast', '📢': 'megaphone', '📣': 'megaphone-simple',
  '📦': 'package', '📧': 'envelope-simple', '📨': 'envelope-open', '📩': 'tray-arrow-down', '📮': 'mailbox', '📱': 'device-mobile',
  '📵': 'phone-x', '📶': 'cell-signal-full', '🔁': 'repeat', '🔍': 'magnifying-glass', '🔐': 'lock-key', '🔑': 'key', '🔒': 'lock',
  '🔔': 'bell-ringing', '🔥': 'fire', '🚓': 'police-car', '🚗': 'car', '🚨': 'siren', '🚪': 'door', '🚫': 'prohibit', '🚰': 'drop',
  '🛒': 'shopping-cart', '🛠': 'wrench', '🛡': 'shield-check', '🤖': 'robot', '🧒': 'baby', '🧭': 'compass', '🧾': 'receipt',
  '🩺': 'stethoscope', '🪪': 'identification-card', '📄': 'file-text', '✔': 'check', '❌': 'x-circle', '⭐': 'star',
};
const ad = x => { const k = String(x).replace(/️/g, ''); return ESLE[k] || (P.icons[k] ? k : P.icons[k + '-duotone'] ? k : null); };
// tek renk + %35 ikinci ton (duotone)
function svg(x, boy = 64, renk = '#151515', ton = null) {
  const n = ad(x), ic = n && (P.icons[n + '-duotone'] || P.icons[n]); if (!ic) return '';
  const body = ic.body.replace(/opacity="\.2"/g, `opacity="${ton ? 1 : .35}"${ton ? ` fill="${ton}"` : ''}`).replace(/currentColor/g, renk).replace(new RegExp(`fill="${renk}" opacity="1" fill="${ton}"`, 'g'), `fill="${ton}"`);
  return `<svg class="il" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="${boy}" height="${boy}">${body}</svg>`;
}
// renkli karo içinde beyaz ikon (uygulama ikonu gibi, yetişkin/kurumsal görünüm)
const RENK = ['#E8402F', '#151515', '#F6B92B', '#1E9E6A'];
const karo = (x, boy = 96, i = 0, bg = null) => { const b = bg || RENK[i % RENK.length], fg = b === '#F6B92B' ? '#151515' : '#fff';
  const s = svg(x, Math.round(boy * .58), fg); return s ? `<span class="karo" style="width:${boy}px;height:${boy}px;background:${b}">${s}</span>` : ''; };
const RE = /(\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*|\p{Regional_Indicator}{2})/gu;
const degistir = (html, boy = 36, renk = '#151515') => html.replace(RE, m => svg(m, boy, renk));
module.exports = { svg, karo, degistir, ESLE };
