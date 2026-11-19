// Submits every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver). Run after a deploy: npm run indexnow
const HOST = 'ebike-zu-verkaufen.de';
const KEY = 'f5c77cdd83a3ee0da5f688c0413106ff'; // must match public/<KEY>.txt

async function main() {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urls.length) throw new Error('no URLs found in sitemap');
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
  });
  console.log(`IndexNow: submitted ${urls.length} URLs -> HTTP ${res.status}`);
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}
main();
