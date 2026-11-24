// Tests de bout en bout de snowball (recréés en version 53 ; la série v50 de 170 vérifications n'était plus disponible).
// Prérequis : python3 tools/build-demo.py   ·   Lancer : node tests/snowball.e2e.js   →   « 0 FAIL / N »
const path = require('path'), { chromium } = require('playwright');
const APP = 'file://' + path.resolve(__dirname, '../index.html');
const DEMO = 'file://' + path.resolve(__dirname, '../tools/out/demo.html');
let pass = 0, fail = 0;
const ok = (c, name, extra = '') => { c ? pass++ : fail++; console.log(`${c ? 'PASS' : 'FAIL'}  ${name}  ${extra}`); };
(async () => {
  const b = await chromium.launch();
  const mk = async (w = 390) => {
    const ctx = await b.newContext({ viewport: { width: w, height: 844 }, permissions: ['clipboard-read', 'clipboard-write'] });
    await ctx.route(/^https?:/, r => r.abort());
    const p = await ctx.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); return { ctx, p };
  };
  // 1. Nouvel utilisateur : le questionnaire s'ouvre
  { const { ctx, p } = await mk(); await p.goto(APP); await p.waitForTimeout(600);
    ok(await p.locator('[class*="wz-"]').first().isVisible().catch(() => false), 'nouvel utilisateur : questionnaire ouvert');
    ok(await p.evaluate(() => document.documentElement.dataset.theme) === 'light', 'thème clair par défaut');
    ok(p.errs.length === 0, 'aucune erreur JS (nouvel utilisateur)', p.errs.join(' | ')); await ctx.close(); }
  // 2. Démo : tous les écrans s'affichent sans erreur
  const { ctx, p } = await mk();
  await p.goto(DEMO + '?reset'); await p.waitForTimeout(600);
  ok(!(await p.locator('[class*="wz-"]').first().isVisible().catch(() => false)), 'démo : pas de questionnaire');
  const ids = await p.evaluate(() => ({ e: S.envs[0].id, g: S.goals[0].id, im: S.envs.find(e => e.type === 'im').id }));
  const routes = ['#/', '#/a', '#/a/d', '#/a/t', '#/b', '#/h', '#/c/0', `#/e/${ids.e}`, `#/l/${ids.e}/0`, `#/e/${ids.im}`, '#/n', '#/n/d', '#/u', '#/g', `#/g/${ids.g}`, '#/s', '#/s/d', '#/r'];
  for (const r of routes) {
    const n0 = p.errs.length; await p.evaluate(x => { location.hash = x; }, r); await p.waitForTimeout(250);
    const txt = (await p.locator('#app, main, body').first().innerText()).trim();
    ok(p.errs.length === n0 && txt.length > 50, `écran ${r}`, p.errs.slice(n0).join(' | '));
  }
  // 3. Chiffres de la démo
  await p.evaluate(() => { location.hash = '#/a'; }); await p.waitForTimeout(300);
  ok(/7/.test(await p.locator('body').innerText()) && await p.evaluate(() => S.envs.length) === 7, 'démo : 7 comptes');
  ok(await p.evaluate(() => Math.round(keyFigures().net)) > 100000, 'patrimoine net calculé');
  // 4. Demander à une IA, en 2 temps
  const clip = () => p.evaluate(() => navigator.clipboard.readText());
  await p.evaluate(() => openAIModal()); await p.waitForTimeout(200);
  ok(await p.locator('.ai-apps .ai-app').count() === 6, 'IA : 6 tuiles');
  await p.evaluate(() => navigator.clipboard.writeText('ANCIEN'));
  const [pop] = await Promise.all([p.context().waitForEvent('page', { timeout: 3000 }).catch(() => null), p.click('.ai-apps .ai-app[data-n="Claude"]')]);
  if (pop) await pop.close();
  const c1 = await clip();
  ok(pop !== null, 'IA étape 1 : l’IA s’ouvre');
  ok(c1 !== 'ANCIEN' && c1.length > 1000, 'IA étape 1 : données copiées', `${c1.length} car.`);
  ok(!c1.includes('## Ma question'), 'IA étape 1 : sans question');
  ok(/Ma question arrive dans le message suivant/.test(c1), 'IA étape 1 : annonce la question suivante');
  ok(/Banque A/.test(c1) && !/BoursoBank/.test(c1), 'IA : noms masqués par défaut');
  ok(/Posez votre question dans Claude/.test(await p.locator('.ai-body').innerText()), 'IA étape 2 : IA choisie affichée');
  await p.click('.ai-chips button:nth-child(2)');
  ok(await clip() === await p.evaluate(() => AI_QUESTIONS[1]), 'IA étape 2 : question toute prête copiée');
  await p.fill('.ai-body textarea', 'Combien pour ma retraite ?'); await p.click('.ai-open');
  ok(await clip() === 'Combien pour ma retraite ?', 'IA étape 2 : question libre copiée');
  ok((await p.locator('.ai-apps .ai-app[data-n="ChatGPT"]').getAttribute('href')) === 'https://chatgpt.com/?q=%E2%80%8B', 'IA : lien ChatGPT sans phrase');
  await p.evaluate(() => openAIModal());
  ok(await p.locator('.ai-app.on').getAttribute('data-n') === 'Claude', 'IA : IA choisie retenue');
  await p.evaluate(() => { $('#modal-root').innerHTML = ''; });
  // 5. Thème sombre et persistance
  await p.evaluate(() => { S.theme = 'dark'; save(); applyTheme(); });
  ok(await p.evaluate(() => document.documentElement.dataset.theme) === 'dark', 'thème sombre');
  await p.goto(DEMO); await p.waitForTimeout(500); // sans ?reset : on garde les données
  ok(await p.evaluate(() => S.theme === 'dark' && S.envs.length === 7), 'données conservées après rechargement');
  ok(p.errs.length === 0, 'aucune erreur JS (démo)', p.errs.join(' | '));
  await ctx.close();
  // 6. Petit écran (320 px) : pas de défilement horizontal
  { const { ctx, p } = await mk(320); await p.goto(DEMO + '?reset'); await p.waitForTimeout(500);
    for (const r of ['#/', '#/a', '#/n', '#/g', '#/s']) {
      await p.evaluate(x => { location.hash = x; }, r); await p.waitForTimeout(250);
      const w = await p.evaluate(() => document.documentElement.scrollWidth);
      ok(w <= 320, `320 px sans débordement ${r}`, `largeur ${w}`);
    }
    await ctx.close(); }
  await b.close();
  console.log(`${fail} FAIL / ${pass + fail}`);
  process.exit(fail ? 1 : 0);
})();
