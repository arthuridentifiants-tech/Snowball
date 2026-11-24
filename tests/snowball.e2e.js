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
  ok(pop !== null, 'IA étape 1 : un seul toucher copie et ouvre l’IA');
  ok(c1 !== 'ANCIEN' && c1.length > 1000, 'IA étape 1 : données copiées', `${c1.length} car.`);
  ok(!c1.includes('## Ma question'), 'IA étape 1 : sans question');
  ok(/Ma question arrive dans le message suivant/.test(c1), 'IA étape 1 : annonce la question suivante');
  ok(/^## Consigne : ne réponds pas encore/.test(c1) && /ne me pose aucune question/.test(c1) && /Fin du contexte/.test(c1), 'IA étape 1 : consigne « Bien reçu » au début et à la fin');
  ok(!/Quelle est votre question/.test(c1), 'IA étape 1 : l\'IA ne doit pas demander la question');
  ok(/Banque A/.test(c1) && !/BoursoBank/.test(c1), 'IA : noms masqués par défaut');
  await p.waitForTimeout(600);
  ok(/Posez votre question dans Claude/.test(await p.locator('.ai-body').innerText()) && await p.locator('.ai-apps').count() === 0, 'IA : après le choix de l’IA, la fenêtre des questions s’ouvre');
  await p.click('.ai-chips button:nth-child(2)');
  ok(await clip() === await p.evaluate(() => AI_QUESTIONS[1]), 'IA étape 2 : question toute prête copiée');
  await p.fill('.ai-body textarea', 'Combien pour ma retraite ?'); await p.click('.ai-open');
  ok(await clip() === 'Combien pour ma retraite ?', 'IA étape 2 : question libre copiée');
  await p.click('.ai-back'); await p.waitForTimeout(100);
  ok((await p.locator('.ai-apps .ai-app[data-n="ChatGPT"]').getAttribute('href')) === 'https://chatgpt.com/?q=%E2%80%8B', 'IA : retour au choix de l’IA · lien ChatGPT sans phrase');
  await p.evaluate(() => navigator.clipboard.writeText('ANCIEN'));
  await p.click('.ai-ctx'); await p.waitForTimeout(200);
  ok(/^## Consigne/.test(await clip()) && await p.locator('.ai-apps').count() === 1, 'IA : bouton « Copier mon contexte personnel financier »');
  ok(await p.locator('text=La copie ne marche pas').count() === 0, 'IA : plus de lien « La copie ne marche pas »');
  await p.evaluate(() => openAIModal());
  ok(await p.locator('.ai-app.on').getAttribute('data-n') === 'Claude', 'IA : IA choisie retenue');
  // Copie impossible : le texte s'affiche pour la copie à la main
  await p.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { value: undefined }); document.execCommand = () => false; openAIModal(); });
  await p.waitForTimeout(150); await p.click('.ai-apps .ai-app[data-n="Gemini"]'); await p.waitForTimeout(200);
  const man = await p.evaluate(() => { const t = document.querySelector('.ai-manual-t'); return t ? t.value : ''; });
  ok(/^## Consigne/.test(man), 'IA : copie impossible → texte affiché pour la copie à la main');
  ok(await p.locator('.ai-manual a', { hasText: 'Ouvrir Gemini' }).count() === 1, 'IA : copie à la main → bouton « Ouvrir Gemini »');
  await p.reload(); await p.waitForTimeout(400);
  await p.evaluate(() => { $('#modal-root').innerHTML = ''; });
  // 4 bis. Contexte précis pour l'IA (v58) et « Mon profil »
  { const t = await p.evaluate(() => buildAIPromptFull(null, true));
    ok(['## En bref', '## Mon profil', '## Disponibilité de l’argent', '## Projection', '## Ce que l’appli ne sait pas', '## Repères fiscaux'].every(x => t.includes(x)), 'IA contexte : nouvelles rubriques présentes');
    ok(!/NaN|undefined|null|Crédit Crédit|\[object/.test(t), 'IA contexte : aucune valeur cassée ni doublon « Crédit Crédit »');
    ok(/cours actuel 545/.test(t) && /prix de revient moyen 420,00/.test(t) && /valeur 6.540.€/.test(t), 'IA contexte : cours actuel et prix de revient distincts');
    ok(/plafond 22.950.€, encore 10.450.€ de place/.test(t), 'IA contexte : place restante sur le Livret A');
    ok(/Inflation : non disponible/.test(t), 'IA contexte : inflation inconnue signalée (pas 0 %)');
    await p.evaluate(() => openSettingsModal()); await p.waitForTimeout(150);
    await p.locator('.set-row', { hasText: 'Mon profil' }).click(); await p.waitForTimeout(150);
    ok(await p.locator('.modal-title', { hasText: 'Mon profil' }).count() === 1, 'Mon profil : s’ouvre depuis les Réglages');
    const pea = await p.evaluate(() => S.envs.find(e => e.type === 'pea').id);
    await p.locator('select[aria-label="Année de naissance"]').selectOption('1985');
    await p.locator('.prof-g', { hasText: 'Tranche d’imposition' }).locator('select').selectOption('30');
    await p.locator('.prof-g', { hasText: 'Situation familiale' }).locator('select').selectOption('marie');
    await p.locator('.prof-g', { hasText: 'Logement' }).locator('select').selectOption('proprio');
    await p.evaluate(id => { const i = [...document.querySelectorAll('input[type="month"]')][0]; i.value = '2018-03'; i.dispatchEvent(new Event('change')); }, pea);
    const t2 = await p.evaluate(() => buildAIPromptFull(null, true));
    ok(/Âge : 4\d ans \(né·e en 1985\)/.test(t2) && /Tranche marginale d’imposition : 30 %/.test(t2), 'Mon profil : âge et tranche d’imposition dans le contexte');
    ok(/Ouvert en mars 2018, il y a 8 ans .* plus de 5 ans/.test(t2) && !/ouverture du compte « PEA 1 »/.test(t2), 'Mon profil : date d’ouverture du PEA prise en compte');
    ok(await p.evaluate(() => JSON.parse(localStorage.getItem('pf.v1')).prof.tmi) === 30, 'Mon profil : enregistré');
    await p.evaluate(() => { openAIModal(); }); await p.waitForTimeout(150);
    ok(await p.locator('.ai-body button', { hasText: 'Mon profil' }).count() === 0, 'IA : le profil n’est plus demandé dans la fenêtre IA');
    // Questionnaire : écrans du profil, facultatifs
    await p.evaluate(() => { $('#modal-root').innerHTML = ''; delete S.prof; openWizard('u-intro'); }); await p.waitForTimeout(200);
    const wi = await p.locator('#wz-root').innerText();
    ok(/Facultatif/i.test(wi) && /restent sur votre téléphone/.test(wi) && /Passer cette partie/.test(wi), 'Questionnaire : profil facultatif, données en local');
    const n0 = p.errs.length;
    for (const id of ['u-birth', 'u-fam', 'u-kids', 'u-pro', 'u-tmi', 'u-log', 'u-risk', 'u-open']) { await p.evaluate(x => wzGo(x), id); await p.waitForTimeout(80); }
    ok(p.errs.length === n0, 'Questionnaire : 8 écrans du profil sans erreur', p.errs.slice(n0).join(' | '));
    await p.evaluate(() => wzGo('u-tmi')); await p.waitForTimeout(80);
    await p.locator('.wz-choice', { hasText: '30 %' }).click(); await p.waitForTimeout(500);
    ok(await p.evaluate(() => S.prof.tmi === 30 && wzState().at === 'u-log'), 'Questionnaire : un choix enregistre et passe à la question suivante');
    await p.evaluate(() => wzGo('u-intro')); await p.waitForTimeout(80); await p.click('.wz-skip'); await p.waitForTimeout(150);
    ok(await p.evaluate(() => wzState().at) === 'end', 'Questionnaire : « Passer cette partie » mène à la fin');
    await p.evaluate(() => closeWizard(false)); await p.waitForTimeout(150);
    await p.evaluate(() => { delete S.prof; save(); $('#modal-root').innerHTML = ''; }); }
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
  // 7. Web app iPhone : icône d'écran d'accueil, nom, barre d'état
  { const { ctx, p } = await mk(); await p.goto(APP); await p.waitForTimeout(300);
    const w = await p.evaluate(async () => {
      const q = s => document.querySelector(s), ic = q('link[rel="apple-touch-icon"]');
      const img = new Image(); img.src = ic ? ic.href : ''; await img.decode().catch(() => {});
      return { t: q('meta[name="apple-mobile-web-app-title"]')?.content, sb: q('meta[name="apple-mobile-web-app-status-bar-style"]')?.content, iw: img.naturalWidth, ih: img.naturalHeight };
    });
    ok(w.t === 'snowball', 'web app : nom « snowball » sous l\'icône');
    ok(w.iw === 180 && w.ih === 180, 'web app : icône 180 × 180', `${w.iw}×${w.ih}`);
    ok(w.sb === 'default', 'web app : barre d\'état');
    await p.evaluate(() => { S.theme = 'dark'; applyTheme(); });
    ok(await p.evaluate(() => document.querySelector('meta[name="theme-color"]').content) === '#121826', 'web app : barre du haut sombre en thème sombre');
    await ctx.close(); }
  await b.close();
  console.log(`${fail} FAIL / ${pass + fail}`);
  process.exit(fail ? 1 : 0);
})();
