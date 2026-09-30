import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const data=JSON.parse(fs.readFileSync(path.join(root,'itinerary.json'),'utf8'));
function assert(ok,msg){if(!ok)throw new Error(msg);}
assert(data.days.length===12,'Expected 12 days');
assert(data.days.every((d,i)=>d.date===`2026-11-${String(i+3).padStart(2,'0')}`),'Dates must be 11/3–11/14');
for(const day of data.days){const slots=Array(8).fill(0);for(const e of day.events){assert(Number.isInteger(e.slot)&&Number.isInteger(e.span)&&e.slot>=0&&e.span>=1&&e.slot+e.span<=8,'Invalid slot/span');for(let r=e.slot;r<e.slot+e.span;r++){assert(!slots[r],`Overlapping event on ${day.date}`);slots[r]++;}assert(['','book','tour','move'].includes(e.kind),'Unknown event kind');for(const p of e.places){if(p.url)assert(new URL(p.url).protocol==='https:','Map links must be HTTPS');}}}
assert(data.hotels.reduce((n,h)=>n+h.nights,0)===11,'Expected 11 nights');
assert(data.hotels[0].start===data.days[0].date&&data.hotels.at(-1).end===data.days.at(-1).date,'Hotel range differs from trip');
data.hotels.forEach((h,i)=>{assert((Date.parse(h.end)-Date.parse(h.start))/86400000===h.nights,'Hotel nights mismatch');if(i)assert(data.hotels[i-1].end===h.start,'Hotels must be continuous');});
const payload=JSON.stringify(data).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
fs.writeFileSync(path.join(root,'itinerary.js'),'window.KYUSHU_DATA = '+payload+';\n','utf8');
const clean=s=>String(s||'').replace(/\|/g,'／').replace(/\r?\n/g,' ');
const lines=['# 2026 九州公開行程','',`更新：${data.updatedAt}；來源：${data.sourceVersion}`,'','本文件由 itinerary.json 產生。私人完整主檔另存，不放入公開儲存庫。',''];
for(const d of data.days){lines.push(`## ${d.date}（${d.weekday}）`,``,`${d.city} · ${d.people}`,'','| 時間 | 行程 | 狀態 | 備註 |','| --- | --- | --- | --- |');if(!d.events.length)lines.push('| 全天 | 待排 | | |');for(const e of d.events){const places=e.places.map(p=>`[${clean(p.label)}](${p.url||'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.query||p.label)})`).join('、');lines.push(`| ${clean(e.time)} | ${clean(e.title)}${places?'：'+places:''} | ${clean(e.status)} | ${clean(e.note)} |`);}const h=data.hotels.find(h=>d.date>=h.start&&d.date<h.end);lines.push('',h?`住宿：[${h.name}](https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.query)})；${h.note}`:'住宿：返臺，無日本住宿。','');}
fs.writeFileSync(path.join(root,'public-itinerary.md'),lines.join('\n'),'utf8');
console.log('Validated 12 dates, 11 continuous nights, merged events, HTTPS links; generated itinerary.js and public-itinerary.md.');
