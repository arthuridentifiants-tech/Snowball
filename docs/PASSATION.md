# Passation — application « snowball »

État au 24 novembre 2026, **version 61** (`index.html`). Ce document reprend tout le contexte utile pour continuer le développement dans une nouvelle conversation.

---

## 1. Le projet en bref

**snowball** est une application web de gestion de patrimoine personnel, en français, contenue dans **un seul fichier HTML** (`index.html`, environ 10 150 lignes : HTML, CSS et JavaScript sans framework). Elle s'ouvre sur iPhone (visionneuse de fichiers, Safari ou icône sur l'écran d'accueil) et fonctionne sans serveur : toutes les données restent dans le navigateur (`localStorage`).

**La promesse** : aider quelqu'un qui n'y connaît rien à faire grossir son épargne mois après mois, sans la laisser fondre (métaphore de la boule de neige : elle grossit avec l'épargne et les intérêts, elle fond avec les frais, l'inflation, les impôts, l'irrégularité).

**Le parcours** :
1. Un **questionnaire d'accueil** plein écran, une question par écran, en 4 étapes (ce que vous avez → ce que vous dépensez → vos projets → votre plan), avec deux animations d'introduction (la boule qui grossit, la boule qui fond).
2. Ensuite, **5 onglets** : Accueil · Mon argent · Mes coûts · Mes projets · Mon plan.
3. Chaque onglet va **du général et visuel vers le détail** : l'essentiel d'abord, puis « En savoir plus » (une feuille avec d'autres graphiques), puis « Tout le détail » (écrans complets).

---

## 2. Règles de travail avec l'utilisatrice / l'utilisateur

Ces règles ont été fixées au fil de la conversation ; les respecter évite de perdre du temps.

1. **Langue** : tout en français, ton simple, pas de jargon. Libellés clairs pour « tout utilisateur ».
2. **Fonctionnement par captures d'écran** : la personne envoie des captures avec un commentaire ; je propose une **liste numérotée** de correctifs ; **j'attends son « go »** avant de modifier l'appli.
3. **Exception** : les **petits détails visuels** (texte, taille, couleur, espacement, alignement, élément qui dépasse ou à retirer dans le même écran) se corrigent **directement**, sans attendre le go.
4. **Toujours demander le go** pour : un calcul ou un chiffre, un élément qui change d'onglet, une fonction ajoutée ou supprimée, ce qui peut toucher aux données enregistrées.
5. **Livrer à chaque fois le fichier `index.html` complet** (la personne le téléverse elle-même sur son téléphone). Les noms de fichiers côté téléphone sont du type `index-26.html`.
6. **GitHub** : le dépôt est `arthuridentifiants-tech/Snowball` (privé). Les anciens dépôts `7jdj82pj62-lab/*` ont été supprimés : ne plus les utiliser. **Web app** : `arthuridentifiants-tech/snowball-app` (public, branche `main`, **uniquement `index.html`**) est publié par GitHub Pages à l'adresse https://arthuridentifiants-tech.github.io/snowball-app/ ; la personne ouvre snowball dans Safari, ajouté à l'écran d'accueil (plus de Sitecase ni de téléversement). À chaque version, envoyer `index.html` sur les deux dépôts. **Prudence GitHub** (le compte a déjà été suspendu) : un seul envoi par version, jamais de création ou suppression de dépôt, pas d'issue, commentaire, pull request ni workflow sans demande, pas d'envoi forcé, aucun autre dépôt. Commit avec un message clair et une entrée dans `CHANGELOG.md` à chaque version, puis envoi sur ce dépôt.
7. **L'artifact « page de commentaires » n'est plus mis à jour** (demande explicite). Ne pas le republier.
8. **Lancer les tests** après chaque modification (`python3 tools/build-demo.py && node tests/snowball.e2e.js` → actuellement **70/70**). Ajouter des vérifications quand on modifie une fonction.
9. **Vérifier visuellement** avec des captures (voir § 9) et être honnête sur ce qui n'a pas pu être testé (l'environnement de développement n'a **pas d'accès internet** : logos, cours et apps IA ne peuvent pas y être vérifiés).
10. **Préférences de fond exprimées** : une question par écran dans le questionnaire ; pas de défilement inutile ; mises en page centrées et équilibrées ; gain en vert, perte en rouge ; pas de doublons ; widgets pertinents, au bon endroit, au bon moment ; aller du général vers le détail ; « En savoir plus » = d'autres graphiques, pas du texte.

---

## 3. Fichiers du dépôt

| Fichier | Rôle |
|---|---|
| `index.html` | L'application complète (v61). |
| `CHANGELOG.md` | Historique détaillé des versions 1 à 50. |
| `docs/PASSATION.md` | Ce document. |
| `tests/snowball.e2e.js` | Tests de bout en bout (Playwright), **70 vérifications** : questionnaire pour un nouvel utilisateur, 18 écrans sans erreur, chiffres de la démo, « Demander à une IA » en 2 temps (presse-papiers vérifié), thème sombre, données conservées, 320 px sans débordement, icône et réglages de la web app. |
| `tools/build-demo.py` | Construit `tools/out/demo.html` : l'appli + les données d'exemple, pour les captures et les tests. |
| `tools/shot.js` | Capture d'un écran de la démo au format iPhone : `node tools/shot.js '#/a' tools/out/argent.png [1 = page entière] [dark]`. Réseau coupé : logos en pastilles. |
| `prototype/capture/demo-data.js` | Données d'exemple : PEA (3 lignes), compte-titres, Livret A, assurance vie, PEE, crypto, appartement avec crédit, crédit auto, budget, 2 grosses dépenses, 3 projets, plan d'achats, 400 jours d'historique. |

**Recréés en version 53** : la série de tests v50 (170 vérifications), les outils de captures et le dossier `prototype/` (catalogue des 111 widgets, prototypes d'interface) n'étaient plus disponibles. Les outils et les tests ont été réécrits ; le catalogue et les prototypes sont perdus. `original/` (ancienne appli `test_3010.html` et diagnostic) est conservé (les numéros de widgets cités plus bas restent valables comme repères).

**Git** : 66 commits locaux, dernier `fa126aa` (« Version 50 »). La version 19 est un retour volontaire à la base v17 (la v18, très simplifiée, a été rejetée).

---

## 4. Architecture technique

### Données
- **État principal** : objet global `S`, sauvegardé par `save()` dans `localStorage['pf.v1']`.
- **Cours de Bourse** : objet `M` (`M.q[symbole] = {price, prev, currency}`, `M.fx`, `M.t`) dans `localStorage['pf.q']`.
- **Clés principales de `S`** :
  - `envs[]` : comptes (`{id, type, name, bank?, tax?, fee?, avRate?, rates?, plan?, lines[]}`). Types (`TYPES`) : `pea`, `cto`, `crypto`, `es` (épargne salariale PEE/PER), `av` (assurance vie), `la` (Livret A), `lj` (livret jeune/LDDS), `cf` (crowdfunding immo), `im` (immobilier direct), `au` (autres).
  - `lines[]` d'un compte : titre coté `{m:1, sym, name, qty, cost (PRU), kind: 'Action'|'ETF'|'Crypto'|'Fonds', isin?, fee?, ordFee?, divs[]}` ou ligne manuelle `{name, val, cst (versé), loan?, up?, upv?}`.
  - `loans[]` : crédits hors immobilier (`{kind, name, amt, rate, yrs, start, ins, fees, partial?}`) ; le crédit immobilier est dans la ligne du bien (`line.loan`).
  - `goals[]` : projets (`{id, name, type, target, date, envs[]}`).
  - `st[année]` : plan (`b[]` achats programmés `{m, sym, name, env, amt, kind, done?}`, `p[]` mises de côté `{name, amt, env, f}`, `pd{mois:[ids]}` mises de côté faites).
  - `bud` : budget (`rev`, `groups{daily, housing, variable, subs…}` avec postes, `annualBills[]`).
  - `hist[]` : historique quotidien `{d, v (patrimoine net), c: {Bourse, Crypto, Épargne, Immobilier, Autres}}` (le détail par classe existe depuis la v20).
  - `target` : allocation cible en % par classe.
  - `prof` (v58, facultatif, sert uniquement au message pour l'IA) : `birth` (année), `fam`, `kids`, `pro`, `tmi` (0/11/30/41/45), `log`, `risk`, `open{idCompte: 'AAAA-MM'}` (PEA, assurance vie, épargne salariale). Saisie : questionnaire d'accueil, partie facultative « Et vous » (écrans `u-intro` … `u-risk`, avant `end`, `wzProfPick`) ; la date d'ouverture se saisit sur l'écran du compte (`wzOpenRow`, PEA, assurance vie, épargne salariale, v60), et `openProfileModal` (Réglages → Mes données → Mon profil). Plus dans la fenêtre IA (v59).
  - Divers : `theme` (light/dark/auto), `url`/`urlMode` (relais), `inflOv`, `histP` (période de la courbe), `tipHide`, `wz` (état du questionnaire), `onbDone`, `gm` (net/brut), `fire`, `wOff` (ancien).
- **Classes d'actifs** : `CLASSES = ['Bourse','Crypto','Épargne','Immobilier','Autres']`, couleurs `KCOL` (`--c0`…`--c4`).

### Cours en direct
Relais **Google Apps Script** par défaut, sans réglage : `DEFAULT_RELAY_URL = 'https://script.google.com/macros/s/AKfycbw1SPU6MTmGYMr0HHds8qbWNTmS3U15uHViFBkX-7JOKbwj-nx-WERW1FKMQfS_hgB_qA/exec'`. Modifiable dans Réglages → Options avancées. Le code du script est affiché par « Voir le code Google » (fonctions `doGet`, `quotes_`, `search_`, `isin_`, `inflation_`).

### Navigation (hash)
| Route | Écran |
|---|---|
| `#/` | Accueil (`vToday`) |
| `#/a` · `#/a/d` · `#/a/t` | Mon argent (`vMoney`) · Immobilier et historique (`vMoneyDetail`) · Allocation cible (`vTarget`) |
| `#/b` | Ma boule de neige, projection (`vBall`) |
| `#/h` | Santé détaillée (`vHealth`, plus utilisée dans le parcours) |
| `#/c/i` · `#/e/id` · `#/l/env/ligne` | Classe d'actifs · page d'un compte (`vEnv`) · page d'une ligne (`vLine`) |
| `#/n` · `#/n/d` · `#/u` | Mes coûts (`vCosts`) · Frais, impôts, crédits (`vNet`) · Budget (`vTools`) |
| `#/g` · `#/g/id` | Mes projets (`vProjects`) · page d'un projet (`vGoalsR`) |
| `#/s` · `#/s/d` | Mon plan (`vPlan`) · plan complet (`vStrat`) |
| `#/r` | Simulateur louer ou acheter (`vRent`, plus de lien direct) |

`render()` construit l'écran, enregistre un point d'historique, puis `updateNav()` met à jour la barre du bas (onglet actif à la couleur de sa rubrique).

### Organisation du code (repères dans `index.html`)
- CSS : jetons de couleur (`--ch1` bleu argent, `--ch2` orange coûts, `--ch3` violet projets, `--ch4` vert plan, `--up` / `--down` / `--warn`), police d'affichage Fraunces, police de texte Plus Jakarta Sans ; thème sombre via `:root[data-theme="dark"]`. Les styles de l'interface actuelle sont préfixés `n-` ; ceux du questionnaire `wz-`.
- Helpers : `h(tag, attrs, ...enfants)` crée un élément ; formats `E0` (€ entier), `E2`, `P`, `P0`, `fr1`, `nE`, `sE`, `kE`.
- Calculs : `agg`, `val`, `fees`, `taxe`, `sums`, `loanCalc`, `goalCalc`, `goalEffort`, `getBudget`, `keyFigures`, `passiveData`, `healthData`, `leakData`, `moveParts`, `monthPlan`, `upcoming`, `staleEnvs`.
- Questionnaire : `openWizard`, `wzDraw`, `WZ_STEPS` (étapes `welcome`, `melt`, `why`, `how`, `p-intro`, `p-pick`, `p-env:id`, `p-debts`, `c-…`, `g-…`, `s-…`, `end`), animation `wzSnowball`.
- Ajout pas à pas d'un titre : `openAssetFlow`, `afDraw` (étapes `env`, `kind`, `search`, `pick`, `qty`, `pru`, `fee`, `mname`, `mval`, `mpaid`, `trans`, `done`).
- Logos : section `LOGOS` (§ 6).
- IA : section `DEMANDER À UNE IA` (§ 7).
- Interface : section `INTERFACE (maquette v4)` (briques `nWh`, `nRow`, `nCard`, feuilles `openSheet`, graphiques, vues des 5 onglets).
- Fenêtres du bas : se ferment en glissant vers le bas ou en touchant la barre grise (`sheetClose`, gestionnaire tactile global).

---

## 5. Ce que contient l'appli aujourd'hui (v50)

Les numéros entre parenthèses renvoient au catalogue `prototype/catalogue-widgets.html`.

### Barre du haut
Logo snowball · actualiser les cours · **bouton « ✦ IA »** · bouton **+** (Ajouter : compte, titre, crédit, dépense, projet, achat mensuel) · Réglages.

### Accueil (dans l'ordre)
1. Carte « Reprendre votre parcours » si le questionnaire est inachevé (21).
2. **Votre boule de neige** (23, 24) : patrimoine net, variation 30 jours et 12 mois, **courbe** avec périodes 1M/3M/6M/1A/Max (les périodes plus longues que l'historique sont grisées) et bouton **« Par classe »** (une courbe par classe d'actifs + total en pointillé, légende cliquable). Bouton « Projeter › » vers la projection (96, 97).
3. **L'essentiel** (26) : 4 lignes colorées, une par onglet, avec leur chiffre clé.
4. **Ce mois-ci** (27) : achats et mises de côté à valider (bouton Valider), comptes sans cours dont le solde n'a pas bougé depuis 3 mois (« Mettre à jour »).
5. **À venir** (34) sur 60 jours : grosses dépenses, dividendes estimés, fin de crédit, échéance de projet.
6. **Pourquoi ça a bougé** (30) : épargne, marchés, intérêts, frais, comptes ajoutés/retirés.
7. **Vos prochaines actions** (45) : les 3 repères de santé à améliorer avec un conseil ; touche → feuille avec **radar** (41) et **grille des 6 indicateurs** (40).
8. **Conseil du jour** (35).

### Mon argent
- Patrimoine net + Biens / Crédits / Impôts à venir sur 3 lignes.
- **Camembert** de répartition (46).
- **Allocation cible** : barres à la couleur de chaque classe, objectif en contour pointillé, part actuelle en grand et écart en mots (« il manque 28 % », « 30 % de trop », « dans l'objectif »), phrase « Orientez vos prochains achats vers… sans rien vendre ». Bouton **Modifier** → fenêtre à **curseurs** (pas de 5 %, total en direct, « Ajuster à 100 % »). « En savoir plus » → aujourd'hui → objectif et achats du mois (51, 52).
- **Comptes** avec logo de la banque → page d'un compte (57) avec logos des titres, assurance vie (58, 72), bien immobilier et graphique d'amortissement (61).
- Tout le détail : immobilier et historique (correction de la courbe).

### Mes coûts
- **« Chaque mois, il vous reste »** en grand + barre dépenses / mis de côté / épargne possible (65), puis le **diagramme de flux d'origine** (Sankey, 64) ; « En savoir plus » → dépenses par poste et grosses dépenses de l'année (66).
- **Ce qui fait fondre votre boule** (76) sur 20 ans ; « En savoir plus » → classement des fuites (78).
- Tout le détail : frais et fiscalité par compte (70), effet des frais dans le temps (71), crédits (73, 74) ; budget (67, 68).

### Mes projets
- Carte **X / Y atteints** (79) : déjà financé, total visé, reste.
- Carte **« À mettre de côté chaque mois »** : total en grand, barre de l'épargne possible découpée par projet en cours + marge (ou manque en rouge), une ligne par projet avec €/mois et durée.
- **Chaque projet** (liste) → page du projet ; « Ajouter un projet ».

### Mon plan
- **Vos achats récurrents** (91) + mises de côté (88), boutons Planifier un achat / Mise de côté / Modifier.
- **Ce que votre boule vous rapporte** (93) ; « En savoir plus » → mois par mois et qui vous paie (94).
- **Calendrier des dividendes** (95).
- Tout le détail : plan complet (années précédentes et suivantes).

### Exécuter un achat (bouton Valider)
Sur un **PEA**, uniquement des **actions/parts entières** : nombre = (budget − frais) ÷ cours, arrondi vers le bas, boutons − et +, récapitulatif « 5 actions × 190,48 € = 952,40 € investis ». **Seul le montant réellement investi est compté** (le reste non investi n'est compté nulle part). Ailleurs, les fractions restent possibles.

### Réglages (simplifiés)
Apparence (Clair / Sombre / Automatique) · Cours de la Bourse (état + Actualiser/Activer) · Mes données (Sauvegarder en JSON, Restaurer, Refaire le questionnaire) · Options avancées (inflation, relais personnalisé, code Google). Tout s'applique immédiatement, bouton « Terminé ».

### Questionnaire d'accueil
Animations « Tout commence petit » et « … voire fondre » (1, 2), bienvenue (3), données chez vous (4), étapes 1 à 4 avec couvertures (5), cartes à cocher (7), grand montant centré (8), ajout pas à pas des titres avec recherche par ISIN ou nom et cotation exacte (9, 62), fonds non cotés (10), épargne salariale PEE/PER (11), bilans (12, 16), frais par ETF (13), impôt sur les gains (14), crédits (15), projets (17), plan sur 12 mois (18, 19), écran final avec confettis (20). **La barre de progression colorée (6) est masquée.** Chaque compte a une ligne **« Banque »** (ou « Plateforme ») facultative.

---

## 6. Système de logos

- **Banques et plateformes** : `BANK_GROUPS` (≈ 180 établissements en 8 catégories : banques, banques en ligne, courtiers, assurance vie/PER, épargne salariale, crypto, immobilier/SCPI/crowdfunding, or). Choix via `openBankPicker` (recherche en haut, fixe, compatible clavier ; les établissements peu connus sans logo disparaissent ; 20 grands toujours affichés : `BANK_MAJOR`). Choix possible dans le questionnaire, à la création d'un compte (+) et sur la page du compte.
- **Logos intégrés** (toujours affichés, même hors ligne) : `LOGO_EMBED` pour **Caisse d'Épargne** (écureuil, carré rouge) et **Natixis** (vague violette), fournis par la personne.
- **Titres** : `lineLogo` → d'abord **Parqet** puis **Elbstream** (par ISIN puis code de cotation), puis le site de l'entreprise (table `TICKERS`, ≈ 235 actions), puis Financial Modeling Prep (logos souvent anciens, en dernier). ETF : logo de l'émetteur d'abord (`ETF_ISSUERS`, 63 sociétés de gestion). Cryptos : `CRYPTOS` (60).
- **Sources par site** (`LOGO_SRCS`) : favicon Google haute définition (sans icône générique), `apple-touch-icon` du site, favicon Google standard. Un logo n'est retenu qu'à partir de 96 px, sinon le meilleur ≥ 32 px, sinon **pastille aux initiales**.
- **Fond blanc** : `logoIsDark` examine les bords quand le service l'autorise (CORS) ; un fond sombre est écarté ou inversé. **Safran** est inversé d'office (`LOGO_DARK = ['SAF']`).
- **Logos aussi** dans la recherche d'un titre (« Lequel est le vôtre ? ») et la liste des titres déjà saisis du questionnaire.
- Retirés à la demande : Milleis Banque, October.

---

## 7. « Demander à une IA » (bouton ✦ IA)

**Depuis la v53 : fonctionnement en 2 temps** (fenêtre `openAIModal`) :
1. **Envoyez vos données** : toucher une IA copie le contexte seul (`buildAIPromptFull(null, anon)`, sans question, encadré au début et à la fin par la consigne de répondre seulement « Bien reçu. », sans demander la question, depuis la v55) puis ouvre l'IA (lien sans texte ; ChatGPT : `chatgpt.com/?q=` + caractère invisible U+200B, pour ouvrir l'app). L'IA choisie est retenue (`localStorage['pf.ai']`).
2. **Posez votre question** : toucher une question toute prête la copie, ou « Copier ma question » ; on la colle dans la même discussion. (Un lien avec la question ouvrirait une nouvelle discussion, sans les données : refusé.)
- **Contexte (v58)** : `buildAIPromptFull` = consigne, rôle et règles de réponse, En bref, Mon profil, vue d'ensemble, répartition, évolution par classe (3/6/12 mois), comptes et lignes (cours actuel, prix de revient, poids, plafonds, dates d'ouverture), crédits, disponibilité, budget et épargne libre, projets, plan, 60 prochains jours, revenus passifs, fuites (`leakData`), projection 4 %, santé, repères fiscaux 2026, « Ce que l'appli ne sait pas », rappel.
- **Fenêtre IA (v59)** : écran 1 = tuiles des IA (un toucher copie le contexte et ouvre l'IA), bouton « Copier mon contexte personnel financier », « Masquer les noms », « Voir les données » ; écran 2 (affiché tout seul après le choix de l'IA) = questions toutes prêtes à copier, question libre, retour « Changer d'IA ». Copie à la main seulement en cas d'échec.
- **Depuis la v57** (la personne utilise la web app dans Safari) : **un seul toucher** sur une IA copie le contexte (`copySync` : textarea + `execCommand` dans le geste, API presse-papiers en secours) et ouvre l'IA. Le passage en 2 touchers de la v56 a été annulé à la demande. La question (étape 2) se copie avec `copyNow` (presse-papiers moderne attendu, ancienne méthode en secours). Si la copie échoue : texte affiché pour la copie à la main (`showManual`, « Tout sélectionner » + bulle « Copier » de l'iPhone) ; lien permanent « Copier à la main ».
- **Abandonné** (la personne passe par Safari en web app, v54) : la personne ouvrait snowball dans l'app **Sitecase**, où la copie ne se fait pas (l'IA reçoit un ancien message). Proposé : afficher le message déjà sélectionné avec un bouton « Copier et ouvrir » (la bulle « Copier » de l'iPhone marche partout) ; conseil : ouvrir snowball dans Safari et l'ajouter à l'écran d'accueil.

Historique (v33 à v50, remplacé par le fonctionnement ci-dessus) :
1. Fenêtre : question libre + bouton « Choisir une question toute prête » (6 questions), case **« Masquer les noms »** (cochée par défaut : « Banque A », « PEA 1 », « Bien 1 »… ; montants et titres conservés), grand bouton « Ouvrir avec… » (menu de partage iPhone), tuiles avec logo : **ChatGPT, Claude, Gemini, Le Chat, Perplexity, Grok**, « Copier le message », « Voir le message ».
2. En touchant une IA : le **message complet détaillé** (`buildAIPromptFull` : consigne, question, vue d'ensemble, répartition, chaque compte et ligne, crédits, budget, dépenses annuelles, projets, plan, revenus passifs, santé, repères fiscaux 2026) est **copié dans le presse-papiers, sans compression**, puis un écran « Votre message est copié » explique les 3 étapes, avec le bouton « Ouvrir … ».
3. **ChatGPT** : lien `https://chatgpt.com/?q=Voici ma situation financière : ` → l'app s'ouvre (elle ne s'ouvre qu'avec un texte dans le lien) et **colle d'elle-même** le presse-papiers après la phrase. **Ça marche parfaitement : ne rien changer.**
4. **Les autres IA** s'ouvrent vides (lien sans texte) et on colle. Claude transforme un long texte collé en pièce jointe (comportement de l'app, normal).
5. Une version compacte (`buildAIPrompt`) existe encore dans le code mais n'est plus utilisée ; la personne a refusé la compression dans le lien.
6. Option 1 (chat IA intégré avec une clé API payante) : **reportée**.

---

## 8. Décisions et historique important

- **Identité** : nom « snowball » en minuscules, blanc « neige », métaphore de la boule. **Depuis la v61**, on ne dit plus « boule » mais « votre snowball » ; le mot s'écrit avec `sbT()` / `SB()` (classe `.sb` : Fraunces 600, bleu `--primary`), comme le logo. Icône d'écran d'accueil = proposition n° 23 (colline de neige blanche, boule, « snowball » en bleu), PNG 180 px intégré. Le nom « Clarté » a été rejeté.
- **Interface** : la maquette v4 (5 onglets, niveaux de lecture, « En savoir plus » en graphiques) a été retenue ; la v18 (très simplifiée selon une « carte ») a été rejetée et annulée (v19 = retour à la v17).
- **Sélection du catalogue (v23)** : widgets retenus `1-5, 7-24, 26, 27, 30, 34, 35, 40, 41, 45, 46, 49, 51, 52, 57, 58, 61, 62, 64-66, 70-76, 78-80, 84, 90-95, 97, 98, 100, 103, 106`. **Doublons tranchés : on garde 23 (pas 22), 27 (pas 90), 93 (pas 92), 96 (pas 98), 76 (pas 75).** Retirés : carte « À compléter », alertes, « Bien joué », score sur l'Accueil, cascade et effort/marchés, maison qui se remplit, louer ou acheter, performances par position, calendrier de l'année en colonnes, indépendance financière, bascule brut/net, courbe avec et sans fuites, barre de progression du questionnaire. Gardés car indispensables : listes des comptes et des projets, saisie du budget, Valider un achat, Réglages.
- **Refusés** : petits carrés « mois tenus », « points » dans la répartition (remplacés par des %), bouton « Changer le logo », compression du message IA, Copilot (remplacé par Grok).
- **Calcul endettement** : note pleine jusqu'à 25 % des revenus en mensualités, puis baisse jusqu'à 0 à 35 %.
- **Conseils santé** alignés sur les seuils (concentration ≤ 25 %, frais ≤ 0,3 %, précaution 6 mois, épargne 20 %, 4 classes).
- **Repères 2026** utilisés : PEA > 5 ans 18,6 % ; PFU 31,4 % (compte-titres, crypto, PEA < 5 ans) ; assurance vie 17,2 / 24,7 / 30 % ; Livret A 1,7 % (depuis le 1er août 2026) ; plafond Livret A 22 950 €.
- **Données de la personne** : remarques vues sur les captures (CTO à +376 %, crowdfunding à 80 €) → elle a répondu « RAS », ne pas y revenir.

---

## 9. Comment travailler sur le code

```bash
# Démo avec données d'exemple (à refaire après chaque modification de index.html)
python3 tools/build-demo.py

# Tests (Playwright, Chromium préinstallé) : doit afficher « 0 FAIL / 70 »
node tests/snowball.e2e.js

# Capture d'un écran au format iPhone
node tools/shot.js '#/' tools/out/accueil.png      # ajouter 1 en 3e argument pour la page entière
node tools/shot.js '#/a' tools/out/argent.png
```

Conseils :
- Modifier `index.html` par remplacements ciblés (script Python avec vérification que le texte cherché apparaît une seule fois), puis tests, puis capture.
- Après chaque version : ajouter une entrée en haut de `CHANGELOG.md` (« ## Version N »), commit local, envoyer `index.html` à la personne.
- L'environnement n'a pas internet : les logos s'affichent en pastilles et les cours ne se chargent pas ; le dire clairement quand on livre.

---

## 10. Points ouverts

- **Outils recréés** : tests (70 vérifications en v61), démo et captures réécrits en version 53 (voir § 3).

- **Logos sur fond noir pour toutes les entreprises** : solution proposée et **non validée** = passer les logos par le relais Google (le script les récupère, l'appli les analyse et met tout sur fond blanc, sauf les fonds de couleur de marque comme Samsung ; mise en cache locale). Nécessite de mettre à jour le script Google une fois. Pour l'instant, seul Safran est corrigé ; ajouter les autres à `LOGO_DARK` au cas par cas.
- **Logos manquants** : la personne peut envoyer une image ; l'intégrer dans `LOGO_EMBED` (recadrée en carré 128 px, PNG en base64) comme pour la Caisse d'Épargne et Natixis.
- **Chat IA intégré (option 1)** : reporté (clé API payante nécessaire).
- **Conseil d'usage à rappeler** : ouvrir snowball dans Safari et l'ajouter à l'écran d'accueil pour que le partage et l'ouverture des apps fonctionnent au mieux (la visionneuse de fichiers bloque parfois ces fonctions).

---

## 11. Message à coller pour démarrer la nouvelle conversation

> Je continue le développement de mon application **snowball** (gestion de patrimoine, un seul fichier HTML, en français). Je te joins `index.html` (version 61), `CHANGELOG.md`, `PASSATION.md` et les outils (`snowball.e2e.js`, `build-demo.py`, `shot.js`, `demo-data.js`). Lis d'abord la passation en entier : elle décrit l'appli, son architecture, mes préférences et nos règles de travail.
>
> Pour commencer : mets `index.html` et `CHANGELOG.md` à la racine du dépôt, `PASSATION.md` dans `docs/`, `snowball.e2e.js` dans `tests/`, `build-demo.py` et `shot.js` dans `tools/`, `demo-data.js` dans `prototype/capture/` ; lance `python3 tools/build-demo.py && node tests/snowball.e2e.js` (43/43 attendu) ; fais un commit « Version 53 » et envoie-le sur GitHub.
>
> Règles : je t'envoie des captures d'écran avec mes remarques ; tu me proposes une liste numérotée de correctifs et tu attends mon « go » ; les petits détails visuels se corrigent directement ; tu me renvoies toujours le fichier `index.html` complet ; GitHub autorisé sur le dépôt `arthuridentifiants-tech/Snowball` : envoie chaque version ; une entrée dans le CHANGELOG à chaque version ; tu lances les tests et tu vérifies visuellement avant de livrer.
>
> « Demander à une IA » fonctionne en 2 temps (données, puis question) : voir § 7.
