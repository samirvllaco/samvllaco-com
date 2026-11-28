// Article cover (1400x788 PNG, convert to WebP) and share image (1200x630 JPG) in the site's article style.
// Run: node scripts/cover.cjs '[["slug","Chip text","Title on the cover"]]', then convert public/writing/<slug>.png to WebP at quality 80.
// Needs the Inter font installed on the machine.
const {chromium}=require('playwright');const path=require('path');
const ROOT=path.join(__dirname,'..');

const ff='';
const items=JSON.parse(process.argv[2]);
(async()=>{const b=await chromium.launch();
for(const [slug,chip,title] of items){
 for(const [w,h,file,type] of [[1400,788,path.join(ROOT,'public/writing',`${slug}.png`),'png'],[1200,630,path.join(ROOT,'public/og',`writing-${slug}.jpg`),'jpeg']]){
  const s=w/1400;
  const html=`<html><head><style>${ff}*{margin:0;box-sizing:border-box}body{width:${w}px;height:${h}px;overflow:hidden;font-family:Inter,sans-serif;background:radial-gradient(60% 70% at 85% 10%,#1c2d44 0%,rgba(16,24,34,0) 60%),radial-gradient(50% 60% at 0% 100%,#132235 0%,rgba(0,0,0,0) 60%),#0f1620;color:#fff;position:relative}
body:before{content:"";position:absolute;right:0;top:0;width:${520*s}px;height:${360*s}px;background-image:radial-gradient(rgba(255,255,255,.08) 1.2px,transparent 1.3px);background-size:${18*s}px ${18*s}px;-webkit-mask-image:radial-gradient(closest-side,#000,transparent)}
.chip{position:absolute;left:${92*s}px;top:${80*s}px;padding:${12*s}px ${24*s}px;border-radius:${28*s}px;background:#1d3150;color:#7cc0ff;font-weight:600;font-size:${26*s}px}
h1{position:absolute;left:${92*s}px;right:${92*s}px;top:50%;transform:translateY(-50%);font-size:${72*s}px;line-height:1.1;font-weight:600;letter-spacing:-.02em}
.by{position:absolute;left:${92*s}px;bottom:${72*s}px;font-size:${24*s}px;color:#c7ccd4}.by b{color:#fff;font-weight:600}
.url{position:absolute;right:${92*s}px;bottom:${72*s}px;font-size:${24*s}px;color:#c7ccd4}</style></head><body><div class="chip">${chip}</div><h1>${title}</h1><p class="by"><b>Sam Vllaco</b> · UI/UX and product designer</p><p class="url">samvllaco.com</p></body></html>`;
  const p=await b.newPage({viewport:{width:w,height:h}});await p.setContent(html);await p.waitForTimeout(300);
  await p.screenshot({path:file,type,quality:type==='jpeg'?85:undefined});await p.close();}
}await b.close()})();
