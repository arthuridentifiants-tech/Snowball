// Capture d'un écran de la démo au format iPhone (390 x 844, x2).
// Usage : node tools/shot.js '#/a' tools/out/argent.png [1 = page entière] [dark]
const path = require('path'), { chromium } = require('playwright');
(async () => {
  const [route = '#/', out = 'tools/out/shot.png', full, theme] = process.argv.slice(2);
  const demo = 'file://' + path.resolve(__dirname, 'out/demo.html');
  const b = await chromium.launch();
  const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route(/^https?:/, r => r.abort()); // pas de réseau : logos en pastilles, cours de la démo
  await p.goto(demo + '?reset'); await p.waitForTimeout(300);
  if (theme === 'dark') await p.evaluate(() => { S.theme = 'dark'; save(); applyTheme(); });
  await p.evaluate(r => { location.hash = r; }, route); await p.waitForTimeout(700);
  await p.screenshot({ path: out, fullPage: full === '1' });
  console.log(errs.length ? 'ERREURS JS : ' + errs.join(' | ') : 'OK ' + out);
  await b.close();
})();
