/* Données d'exemple de snowball (captures et tests).
   Exécuté dans la page avant l'appli : remplit localStorage['pf.v1'] (état S) et ['pf.q'] (cours M).
   Recréé en version 53 (les fichiers d'origine de la v50 n'étaient plus disponibles). */
(function () {
  if (localStorage.getItem('pf.v1') && !/[?&]reset/.test(location.search)) return;
  const now = new Date(), Y = now.getFullYear(), M0 = now.getMonth();
  const ym = (y, m) => `${y}-${String(m + 1).padStart(2, '0')}`;
  const day = n => { const d = new Date(now); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
  const id = s => 'demo' + s;
  const envs = [
    { id: id('pea'), type: 'pea', name: 'PEA', bank: 'BoursoBank', tax: 18.6, fee: 0, lines: [
      { m: 1, sym: 'CW8.PA', name: 'Amundi MSCI World UCITS ETF', kind: 'ETF', isin: 'LU1681043599', qty: 12, cost: 420, fee: 0.38, divs: [] },
      { m: 1, sym: 'AI.PA', name: 'Air Liquide', kind: 'Action', isin: 'FR0000120073', qty: 15, cost: 150, divs: [{ d: `${Y - 1}-05-20`, a: 48 }] },
      { m: 1, sym: 'MC.PA', name: 'LVMH', kind: 'Action', isin: 'FR0000121014', qty: 3, cost: 690, divs: [{ d: `${Y - 1}-04-25`, a: 39 }] } ] },
    { id: id('cto'), type: 'cto', name: 'Compte-titres', bank: 'Trade Republic', tax: 31.4, fee: 0, lines: [
      { m: 1, sym: 'AAPL', name: 'Apple', kind: 'Action', qty: 10, cost: 150, divs: [] },
      { m: 1, sym: 'SAF.PA', name: 'Safran', kind: 'Action', qty: 6, cost: 160, divs: [] } ] },
    { id: id('la'), type: 'la', name: 'Livret A', bank: "Caisse d'Épargne", lines: [{ name: 'Livret A', val: 12500, cst: 12500 }] },
    { id: id('av'), type: 'av', name: 'Assurance vie', bank: 'Linxea', tax: 17.2, fee: 0.5, avRate: 2.5, lines: [
      { name: 'Fonds euros', val: 18000, cst: 16500 }, { name: 'Natixis Actions Europe', val: 6200, cst: 5000, fee: 1.2 } ] },
    { id: id('es'), type: 'es', plan: 'PEE', name: 'PEE', bank: 'Natixis Interépargne', tax: 17.2, fee: 0.3, lines: [{ name: 'Fonds Avenir Actions', val: 7400, cst: 6000 }] },
    { id: id('crypto'), type: 'crypto', name: 'Cryptos', bank: 'Coinbase', tax: 31.4, lines: [
      { m: 1, sym: 'BTC-EUR', name: 'Bitcoin', kind: 'Crypto', qty: 0.05, cost: 38000, divs: [] } ] },
    { id: id('im'), type: 'im', name: 'Appartement', tax: 0, lines: [
      { name: 'Appartement Lyon', val: 240000, cst: 210000, loan: { amt: 180000, rate: 3.6, yrs: 20, start: ym(Y - 4, 2), ins: 25, fees: 2500 } } ] }
  ];
  const q = { 'CW8.PA': [545, 541], 'AI.PA': [172, 171], 'MC.PA': [610, 618], 'AAPL': [228, 225, 'USD'], 'SAF.PA': [255, 252], 'BTC-EUR': [82000, 80500] };
  const MQ = { q: {}, fx: { EUR: 1, USD: 0.93 }, t: Date.now() };
  for (const k in q) MQ.q[k] = { price: q[k][0], prev: q[k][1], currency: q[k][2] || 'EUR' };
  const items = (names, amts) => names.map((n, i) => ({ id: id('b' + n.length + i), name: n, amt: amts[i] || 0 }));
  const bud = { rev: 3800, step: null, last: null, inv: null, annualBills: [
      { id: id('ab1'), name: 'Taxe foncière', amt: 1100, dueMonth: (M0 + 1) % 12 },
      { id: id('ab2'), name: 'Vacances d’été', amt: 2000, dueMonth: 6 } ],
    groups: {
      daily: { name: 'Vie quotidienne', color: 'var(--c0)', items: items(['Alimentation & Courses', 'Transports & Carburant', 'Santé & Soins', 'Loisirs & Sorties', 'Restauration'], [450, 120, 40, 100, 80]) },
      housing: { name: 'Logement', color: 'var(--c1)', items: items(['Charges', 'Énergie', 'Assurance habitation'], [120, 90, 25]) },
      variable: { name: 'Dépenses variables', color: 'var(--c2)', items: items(['Shopping', 'Cadeaux'], [100, 40]) },
      subs: { name: 'Abonnements', color: 'var(--c3)', items: items(['Téléphone & Internet', 'Streaming'], [45, 25]) } } };
  const goals = [
    { id: id('g1'), name: 'Voyage au Japon', type: 'Voyage', target: 6000, date: `${Y + 1}-09-01`, envs: [id('la')] },
    { id: id('g2'), name: 'Voiture', type: 'Voiture', target: 15000, date: `${Y + 3}-03-01`, envs: [id('av')] },
    { id: id('g3'), name: 'Retraite', type: 'Retraite', target: 300000, date: `${Y + 25}-01-01`, envs: [id('pea'), id('es')] } ];
  const b = [];
  for (let m = 0; m < 12; m++) {
    b.push({ m, sym: 'CW8.PA', name: 'Amundi MSCI World UCITS ETF', env: id('pea'), amt: 300, kind: 'ETF', done: m < M0 });
    if (m % 3 === 0) b.push({ m, sym: 'AI.PA', name: 'Air Liquide', env: id('pea'), amt: 200, kind: 'Action', done: m < M0 });
  }
  const st = { [Y]: { b, p: [{ id: id('p1'), name: 'Voyage', amt: 150, env: id('la'), f: 0 }], pd: {} } };
  for (let m = 0; m < M0; m++) st[Y].pd[m] = [id('p1')];
  const hist = [];
  for (let k = 400; k >= 1; k -= 3) {
    const g = 1 + (400 - k) / 4000 + Math.sin(k / 20) * 0.01;
    const c = { Bourse: Math.round(14000 * g), Crypto: Math.round(3600 * g), 'Épargne': Math.round(42000 * g), Immobilier: Math.round(240000 - 160000), Autres: 0 };
    hist.push({ d: day(k), v: Object.values(c).reduce((a, x) => a + x, 0), c });
  }
  const S = { envs, loans: [{ kind: 'Crédit auto', name: 'Crédit auto', amt: 12000, rate: 4.2, yrs: 5, start: ym(Y - 1, 5), ins: 8, fees: 150 }],
    goals, st, bud, hist, target: { Bourse: 40, Crypto: 5, 'Épargne': 25, Immobilier: 30, Autres: 0 },
    theme: 'light', urlMode: 'off', url: '', wz: { v: 1, done: true, open: false }, onbDone: true, done: true };
  localStorage.setItem('pf.v1', JSON.stringify(S));
  localStorage.setItem('pf.q', JSON.stringify(MQ));
})();
