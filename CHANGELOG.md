# Journal des modifications

## Tests (après la version 63, appli inchangée)
- **Retour de la série historique** `tests/parcours-accueil.e2e.js` (170 vérifications), à côté de `tests/snowball.e2e.js` (83). Les deux sont à lancer après chaque modification.
- Adaptée à deux changements voulus : la partie facultative « Et vous, en quelques mots ? » avant l'écran final (v59, une vérification ajoutée) et le titre final « Votre snowball est prête. » (v61).
- Résultats : **171/171** et **83/83**.

## Version 63 — une appli propre et sérieuse
**Identité**
- Mini-logo de la barre du haut : la boule sur la colline, comme l'icône.
- Écran de lancement : l'icône et « snowball » pendant le chargement.

**Chiffres**
- Tous les chiffres ont la même largeur (montants bien alignés).
- L'essentiel : montant complet pour Mon argent (plus de « k€ »).
- Mes projets sans projet : un vrai bouton « + Ajouter » au lieu d'un texte écrit comme un montant.

**Confiance**
- **Mode discret** : bouton œil dans la barre du haut, tous les montants deviennent « ••• € » (données inchangées).
- **Fraîcheur** : sous le patrimoine net de Mon argent, l'heure des cours et l'ancienneté du plus vieux solde saisi à la main.
- **Confidentialité et à propos** (Réglages) : données sur le téléphone, ni publicité ni pistage, services contactés, source des cours, avertissement, version.
- **Rappel de sauvegarde** : dans « Ce mois-ci » si aucune sauvegarde depuis 30 jours ; date de la dernière sauvegarde dans Réglages.
- **Verrouillage par code** (facultatif, Réglages → Sécurité) : code à 4 chiffres à l'ouverture et après une minute dans une autre appli.

**Confort**
- Accueil : une seule ligne « Votre courbe démarre demain » ; seules les périodes déjà couvertes sont proposées ; sous-titre raccourci.
- Vraies icônes à la place des symboles (€, ↗, %, ⌂, §) dans « Ce qui fait fondre » ; émojis retirés.
- Tirer vers le bas en haut de l'écran pour actualiser les cours.
- Transition douce à chaque changement d'écran (désactivée si l'iPhone réduit les animations).
- Thème sombre vérifié sur les écrans principaux.
- Tests : 83/83.

## Version 62
- **Plus de flou en haut de l'écran** : la barre du haut est maintenant pleine (sans transparence ni effet de flou), pour un haut d'écran net sous l'heure et la batterie.
- Tests : 70/70.

## Version 61
- **Nouvelle icône d'écran d'accueil (proposition n° 23)** : la boule sur une colline de neige blanche, « snowball » écrit en bleu dans la neige (police Fraunces).
- **« boule » devient « snowball »** dans toute l'appli : « Votre snowball » (Accueil), « Ma snowball » (projection), « Ce qui fait fondre votre snowball », « Ce que votre snowball vous rapporte », « Votre snowball vous attend », « Votre snowball continue de grossir », « Votre snowball est prête », et dans l'accueil du questionnaire.
- **Typographie du logo** : le mot « snowball » s'écrit partout comme le logo (Fraunces, demi-gras, bleu de l'appli), y compris le nom dans la barre du haut. Le reste de l'appli garde sa typographie.
- Tests : 70/70.

## Version 60
- **Date d'ouverture des contrats demandée plus tôt** : dans le questionnaire, sur l'écran de chaque PEA et assurance vie (ligne « Date d'ouverture · facultatif », sous la banque) et de l'épargne salariale (« Premier versement »). L'écran à part de la partie « Et vous » est retiré. Toujours modifiable dans Réglages → Mes données → Mon profil.
- Tests : 68/68.

## Version 59
- **« Mon profil » passe dans le questionnaire d'accueil** : nouvelle partie « Et vous, en quelques mots ? » après le plan, **facultative** (« Passer cette partie », « Passer » sur chaque écran), avec la mention que les réponses restent sur le téléphone et n'en sortent que si l'on envoie ses données à une IA. Une question par écran (année de naissance, situation familiale, enfants, situation professionnelle, tranche d'imposition, logement, goût du risque, dates d'ouverture des contrats) ; un choix fait passer à la question suivante.
- Le profil n'est plus proposé dans la fenêtre IA ; il reste modifiable dans Réglages → Mes données → Mon profil.
- **Demander à une IA** :
  - après avoir touché son IA (copie du contexte et ouverture), la fenêtre passe d'elle-même à l'écran **« Posez votre question »** : questions toutes prêtes à copier, ou la sienne ; lien « Changer d'IA ou recopier mes données ».
  - petit bouton **« Copier mon contexte personnel financier »** (copie sans ouvrir d'IA).
  - lien « La copie ne marche pas ? » supprimé (la copie à la main ne s'affiche plus qu'en cas d'échec).
- Tests : 67/67.

## Version 58
- **Demander à une IA : contexte beaucoup plus précis** :
  1. **Imprécisions corrigées** : plus de « Crédit Crédit auto » ; inflation « non disponible » au lieu de 0 % quand elle n'a pas pu être chargée ; pour chaque titre, **cours actuel** et **prix de revient moyen** distincts, valeur, montant investi, plus-value en € et en %, **poids** dans les placements ; mensualités totales et du seul crédit immobilier distinguées.
  2. **Nouveaux chiffres** : place restante sur le Livret A et le PEA (plafond 150 000 €), disponibilité de l'argent (tout de suite, en quelques jours, bloqué, long à vendre), part du bien déjà à vous, évolution par classe d'actifs sur 3, 6 et 12 mois, ce qui fait fondre le patrimoine sur 20 ans, projection à 10 et 20 ans, les 60 prochains jours, épargne vraiment libre après les projets.
  3. **L'IA est mieux guidée** : résumé « En bref » en tête, règles de réponse (chiffres compte par compte, calcul de l'impôt avant toute vente, hypothèses claires si une donnée manque, 3 actions au plus), repères fiscaux 2026 complets (PEA, assurance vie, PER, livrets, compte-titres), rubrique « Ce que l'appli ne sait pas ».
  4. **Nouveau : « Mon profil »** (Réglages → Demander à une IA, et dans la fenêtre IA) : année de naissance, situation familiale, enfants, situation professionnelle, tranche d'imposition, logement, goût du risque, date d'ouverture du PEA, de l'assurance vie et de l'épargne salariale. Tout est facultatif et ne sert qu'au message pour l'IA ; aucun chiffre de l'appli ne change.
- Tests : 61/61.

## Version 57
- **Demander à une IA : retour à un seul toucher** (à la demande) : toucher une IA copie le contexte et l'ouvre aussitôt, comme en v55. La question se copie ensuite depuis snowball (étape 2) et se colle dans la même discussion.
- Conservé de la v56 : la consigne « Bien reçu. » (v55), la copie à la main si la copie automatique échoue, et le lien « La copie ne marche pas ? Copier à la main ».
- Tests : 51/51.

## Version 56
- **Demander à une IA : copie fiable dans la web app** :
  1. **Nouvelle méthode de copie** : sur le site sécurisé (web app), l'appli utilise le presse-papiers moderne de l'iPhone et attend la fin de la copie ; l'ancienne méthode ne sert plus que de secours. « Copié » ne s'affiche que si la copie a réussi.
  2. **Copier, puis ouvrir, en 2 touchers** : le 1er toucher sur une IA copie les données et la tuile devient « ✓ Ouvrir » (en vert) ; le 2e toucher ouvre l'IA. L'ouverture de l'IA ne peut plus interrompre la copie.
  3. **Copie à la main en dernier recours** : si la copie échoue (données ou question), le texte s'affiche avec « Tout sélectionner », à copier avec la bulle « Copier » de l'iPhone, et un bouton « Ouvrir … ». Lien permanent « La copie ne marche pas ? Copier à la main ».
- Tests : 53/53.

## Version 55
- **Demander à une IA, étape 1** : le message de données commence et se termine par une consigne claire : c'est seulement le contexte, l'IA doit répondre uniquement « Bien reçu. », sans analyse, sans conseil et **sans demander la question**. Le début du message reste visible même quand l'IA transforme le texte collé en pièce jointe.
- Tests : 49/49.

## Version 54
- **Web app sur iPhone** : snowball est publié sur GitHub Pages (dépôt `snowball-app`), à ouvrir dans Safari puis « Sur l'écran d'accueil ».
- **Icône d'écran d'accueil** : la boule de neige blanche sur fond bleu (intégrée au fichier), au lieu d'une miniature de la page.
- **Nom sous l'icône** : toujours « snowball » (et non le titre complet de la page).
- **Barre du haut** (heure, batterie) : suit le thème clair ou sombre.
- Tests : 47/47 (4 vérifications ajoutées pour la web app).

## Version 53
- **Demander à une IA en 2 temps** :
  1. **Envoyez vos données** : toucher une IA copie toutes les données (sans question) et ouvre l'IA ; on colle et on envoie. Le message se termine par « Ma question arrive dans le message suivant » : l'IA répond simplement « Bien reçu ».
  2. **Posez votre question** : de retour dans snowball, toucher une question toute prête la copie, ou écrire la sienne puis « Copier ma question » ; on revient dans l'IA et on colle dans la même discussion (ou on écrit directement dans l'IA).
- **L'IA choisie est retenue** : l'étape 2 dit « Posez votre question dans Claude » (ou l'IA choisie), et la tuile reste entourée à la prochaine ouverture.
- Copie courte et fiable pour la question ; « Voir les données » montre le message de l'étape 1.
- **Outils recréés** (ceux de la v50 n'étaient plus disponibles) : données d'exemple (`prototype/capture/demo-data.js`), démo (`tools/build-demo.py`), captures iPhone (`tools/shot.js`) et tests (`tests/snowball.e2e.js`).
- Tests : 43/43.

## Version 52
- **Demander à une IA, en un toucher** : toucher une IA copie le message (la question choisie ou écrite, puis toutes les données) et ouvre l'IA aussitôt ; il reste à coller et envoyer. Plus d'écran intermédiaire ni d'explications.
- **Copie fiable sur iPhone** : la copie se fait dans le geste même, avec la méthode qui fonctionne dans Safari et la visionneuse de fichiers ; si elle échoue, l'IA ne s'ouvre pas et un message le dit (plus de risque de coller un ancien message).
- **La question est la première ligne du message** (« ## Ma question »), visible dès le collage.
- Fenêtre simplifiée en 2 temps : « 1 Votre question », « 2 Touchez une IA, puis collez le message ». Le bouton « Ouvrir avec… » est retiré ; « Copier le message » et « Voir le message » restent.
- Aucune IA n'est préremplie ; ChatGPT s'ouvre avec une zone de saisie vide.

## Version 51
- **Demander à une IA, copie fiable** : sur iPhone, le message est copié avec une méthode qui sélectionne vraiment le texte (l'ancienne pouvait afficher « copié » sans rien copier) ; il est recopié au moment de toucher « Ouvrir … », pour que l'IA reçoive toujours la dernière question, choisie ou écrite.
- **Question copiée affichée** sur l'écran « Votre message est copié », pour vérifier avant d'ouvrir l'IA.
- **Claude** : l'étape 2 explique comment effacer un ancien message resté dans la zone de texte avant de coller.
- **ChatGPT** : plus de phrase « Voici ma situation financière : » ; l'app s'ouvre avec une zone de saisie vide (caractère invisible dans le lien), le message copié se colle.

## Version 50
- **ChatGPT** : l'app s'ouvre avec « Voici ma situation financière : » et colle d'elle-même le message copié ; l'écran d'explication le dit (« Le message se colle tout seul ») et indique quoi faire s'il n'apparaît pas.
- Tests : 170/170.

## Version 49
- **ChatGPT** : l'app s'ouvre avec « Voici ma situation financière (collez le texte) : » ; on colle juste après le message copié par snowball.
- Tests : 170/170.

## Version 48
- **ChatGPT** : le lien contient un caractère invisible, ce qui ouvre l'application avec une zone de saisie qui paraît vide ; il suffit de coller, comme pour Gemini.
- Tests : 170/170.

## Version 47
- **Toutes les IA s'ouvrent vides**, comme Gemini, Le Chat et Perplexity : plus de texte prérempli dans ChatGPT (lien chatgpt.com/?q= avec paramètre vide, pour ouvrir l'application) ; il suffit de coller. Pour Claude, l'écran précise que le long texte collé devient une pièce jointe, ce qui est normal.
- Tests : 170/170.

## Version 46
- **Demander à une IA, plus clair** : en touchant une IA, un écran confirme « Votre message est copié » puis explique en 3 étapes (ouvrir l'IA, appui long puis Coller, envoyer), avec un grand bouton « Ouvrir ChatGPT » (ou l'IA choisie) et « Copier à nouveau ».
- **Plus de texte prérempli** dans les IA, sauf ChatGPT (« Voici ma situation financière : »), dont l'app ne s'ouvre qu'avec un texte dans le lien.
- Tests : 170/170.

## Version 45
- **Demander à une IA : copier, puis coller soi-même** : en touchant une IA, le message complet (version détaillée, sans limite de longueur) est copié et l'app s'ouvre avec la ligne « Voici ma situation financière : » ; il suffit de coller à la suite et d'envoyer.
- Tests : 170/170.

## Version 44
- **Message pour l'IA 3,5 fois plus court**, sans perte d'information : une ligne par compte, codes des titres (AI.PA, CW8.PA), montants en euros sans symbole, abréviations simples. Avec les données d'exemple, le lien passe de 11 000 à 3 100 caractères : il tient dans le lien, le message complet arrive directement dans l'IA, sans copier-coller.
- Tests : 170/170.

## Version 43
- **ChatGPT s'ouvre de nouveau dans son app** : le lien garde toujours la forme chatgpt.com/?q=… (la seule qui ouvre l'app ChatGPT) ; message complet prérempli jusqu'à 12 000 caractères, sinon la question seule avec une phrase invitant à coller les données (toujours copiées). Même règle pour Claude, Le Chat, Perplexity et Grok.
- Tests : 170/170.

## Version 42
- **Safran** : logo affiché en noir sur fond blanc (couleurs inversées), partout dans l'appli.
- Tests : 170/170.

## Version 41
- **Logos sur fond blanc uniquement** : l'appli examine les bords de chaque logo ; une version sur fond sombre est écartée au profit d'une autre source sur fond clair ; si seule une version sombre existe, ses couleurs sont inversées pour l'afficher sur fond blanc.
- Tests : 170/170.

## Version 40
- **Logos à la saisie des titres** : dans la recherche d'un titre (« Lequel est le vôtre ? ») du parcours d'accueil, de l'ajout dans l'appli et du nouveau titre du plan, chaque résultat affiche le logo de l'entreprise, de l'émetteur de l'ETF ou de la crypto ; les titres déjà saisis dans le parcours d'accueil aussi. Même système que dans l'appli (logo récent, sinon pastille).
- Tests : 170/170.

## Version 39
- **Banque dès le questionnaire** : sur l'écran de chaque compte, une ligne « Banque » (ou « Plateforme » pour la crypto, le crowdfunding et les autres actifs) ouvre la liste des établissements ; facultatif ; pas pour les biens immobiliers.
- **Création d'un compte (bouton +)** : le choix de la banque s'ouvre juste après la création (on peut le fermer).
- **Ajout pas à pas** : la banque s'affiche sous le nom de chaque compte à l'étape « Dans quel compte ? ».
- Doublons du catalogue : les éléments actuels sont conservés (23, 27, 93, 96, 76).
- Tests : 170/170.

## Version 38
- **ChatGPT** : la tuile fonctionne comme les autres IA (lien direct avec le message prérempli quand c'est possible, et toujours copié).
- Tests : 170/170.

## Version 37
- **ChatGPT** : la tuile ouvre le menu de partage de l'iPhone, où l'application ChatGPT apparaît ; le message y arrive directement (sinon : message copié et site ouvert).
- **Grok** remplace Copilot (grok.com, message prérempli quand c'est possible et toujours copié).
- Tests : 170/170.

## Version 36
- **ChatGPT et Copilot** : les tuiles pointent vers la page d'accueil de chaque service (sans message prérempli, le message est copié), mieux reconnue par l'iPhone pour ouvrir l'application. Logo de Copilot : plus de logo Microsoft en secours.
- Tests : 170/170.

## Version 35
- **Demander à une IA** : les IA s'affichent en tuiles avec leur logo (ChatGPT, Claude, Gemini, Le Chat, Perplexity, Copilot) ; chaque tuile utilise l'adresse officielle de l'IA, qui ouvre directement l'application iPhone si elle est installée (sinon le site), avec le message prérempli quand c'est possible et toujours copié.
- Tests : 170/170.

## Version 34
- **Fenêtre « Demander à une IA » simplifiée** : texte d'introduction réduit à une ligne ; les questions toutes prêtes s'ouvrent dans leur propre fenêtre (« Choisir une question toute prête ») ; tout tient sur un écran.
- **« Ouvrir avec… »** : ouvre le menu du téléphone pour choisir l'app IA (ChatGPT, Claude, Gemini…) ; si ce menu n'existe pas, le message est copié et la liste des IA s'affiche.
- **Boutons ChatGPT, Claude, Gemini, Le Chat, Perplexity, Copilot** : vrais liens qui ouvrent l'app si elle est installée (sinon le site), avec le message prérempli quand c'est possible et copié dans tous les cas.
- Tests : 170/170.

## Version 33 : demander à une IA
- **Bouton « IA »** en haut à droite, à côté de la synchronisation.
- **Fenêtre « Demander à une IA »** : une question libre ou 6 questions toutes prêtes ; snowball prépare un message complet avec toutes les données (patrimoine, répartition actuelle et visée, chaque compte et chaque ligne avec frais et fiscalité, crédits, budget et grosses dépenses, projets et effort mensuel, plan de l'année, revenus passifs, santé financière, repères fiscaux 2026) et une consigne pour l'IA.
- **Envoi** : partage vers une app (menu de partage du téléphone), copie, ou ouverture directe de ChatGPT, Claude, Le Chat, Perplexity (message prérempli quand c'est possible) et Gemini (message copié).
- **« Masquer les noms »**, coché par défaut : banques, comptes et biens remplacés par « Banque A », « PEA 1 », « Bien 1 »… ; aperçu du message avant envoi.
- Tests : 170/170.

## Version 32
- **Logos plus récents** : pour les actions, cryptos et fonds, les services aux logos à jour (Parqet puis Elbstream, par ISIN et par code) passent en premier, puis le site de l'entreprise ; Financial Modeling Prep, dont les logos sont souvent anciens, n'est plus utilisé qu'en dernier recours.
- Tests : 170/170.

## Version 31
- **Logo de n'importe quelle action, ETF ou crypto** : l'appli interroge des services de logos boursiers avec le code de cotation (TTWO, TTE.PA…) et l'ISIN quand il est connu (Parqet, Elbstream, Financial Modeling Prep), avant la table d'entreprises et la pastille. Les fonds non cotés avec un ISIN en profitent aussi ; pour les ETF, le logo de l'émetteur reste prioritaire.
- Tests : 170/170.

## Version 30
- **Logos de la Caisse d'Épargne et de Natixis intégrés à l'appli** (images fournies, 128 px) : toujours affichés, même sans internet, pour la banque et pour les fonds Natixis.
- Tests : 170/170.

## Version 29
- **Caisse d'Épargne et Natixis** : leur logo est d'abord cherché sur leur page Wikipédia (logo officiel), puis sur leurs sites.
- **Milleis Banque** retirée de la liste.
- Tests : 170/170.

## Version 28
- **Logos** : plus de logo du groupe BPCE (rond violet) à la place de l'écureuil de la Caisse d'Épargne ; source DuckDuckGo retirée (elle renvoyait une flèche grise générique, vue sur Natixis Interépargne) ; October retiré (logo vide).
- **Choix de la banque** : les établissements peu connus dont le logo est introuvable disparaissent de la liste (les 20 grands établissements restent toujours proposés, ainsi que celui déjà choisi) ; plus de « null » en bas de la liste ; la recherche reste en haut, fixe, et la touche Entrée du clavier le ferme ; quand le clavier est ouvert, la fenêtre se cale en haut de la partie visible de l'écran pour que les résultats restent visibles.
- Tests : 170/170.

## Version 27
- **Logos des banques** : plus d'icône générique grise à la place du logo (le service de Google signale maintenant les logos introuvables au lieu d'envoyer une flèche grise) ; nouvelle source de haute qualité, l'icône officielle publiée par chaque site pour les téléphones ; plusieurs adresses essayées pour les marques qui en ont plusieurs (BNP Paribas, Société Générale, Caisse d'Épargne, Banque Populaire, Crédit Agricole, Crédit Mutuel, Arkéa, CMB, HSBC, BoursoBank…). Un logo n'est retenu qu'à partir de 96 px, sinon le meilleur trouvé, sinon la pastille.
- Tests : 170/170.

## Version 26
- **Logos de meilleure qualité** : l'appli demande d'abord l'icône en haute définition (256 px), puis la version standard, puis une troisième source ; une image trop petite passe à la suivante ; la pastille aux initiales reste en dernier recours. Les logos trouvés sont mémorisés pendant la session.
- **Listes complétées** : 184 établissements en 8 catégories (banques, banques en ligne et néobanques, courtiers et plateformes de Bourse, assurance vie et PER, épargne salariale, cryptomonnaies, immobilier, SCPI et crowdfunding, or et métaux précieux), 235 actions (CAC 40, SBF 120, grandes valeurs européennes, américaines et asiatiques), 63 émetteurs d'ETF et sociétés de gestion (aussi reconnus pour les fonds d'assurance vie et SCPI), 60 cryptomonnaies.
- **Choix de la banque** : recherche par nom, établissements rangés par catégorie, saisie libre si l'établissement n'est pas dans la liste.
- **Fonds saisis à la main** (fonds euros, fonds de PEE…) : logo de la société de gestion s'il est reconnu, sinon celui de la banque du compte.
- Tests : 170/170.

## Version 25
- **Fenêtre « Frais et impôts »** : tout tient dans la largeur de l'écran ; libellés courts avec l'aide en dessous ; taux d'impôt en un toucher (18,6 %, 31,4 %, 17,2 %) ; symbole % dans les cases, virgule acceptée ; chaque fonds sur deux lignes avec son nom complet.
- **Banque ou courtier** sur chaque compte (choix dans une liste de 33 établissements ou saisie libre), depuis la page du compte (« + Ajouter la banque »).
- **Logos** : banque de chaque compte (liste des comptes, page du compte), entreprise de chaque action (CAC 40, grandes valeurs européennes et américaines), émetteur de chaque ETF (Amundi, BNP Paribas, iShares…), cryptos principales. Les logos viennent du service d'icônes de Google ; sans réseau ou si le logo est introuvable, une pastille aux initiales le remplace.
- Les noms longs des positions passent sur deux lignes ; menu « Nature du titre » : « Action (avec dividendes) ».
- Tests : 170/170.

## Version 24
- **Allocation cible** : chaque barre dans la couleur de sa classe, l'objectif dessiné en contour pointillé, la part actuelle en grand et l'écart en mots (« il manque 28 % », « 30 % de trop », « dans l'objectif »), échelle adaptée pour lire les petites parts, une phrase claire pour orienter les prochains achats sans rien vendre.
- **Modifier l'allocation cible** : une fenêtre avec un curseur par classe (pas de 5 %), la part actuelle sous chacun, le total en direct et un bouton « Ajuster à 100 % ».
- **Mes projets** : une carte « À mettre de côté chaque mois » avec le total en grand, une barre de l'épargne possible découpée par projet en cours et la marge (ou ce qui manque en rouge), puis le montant mensuel et la durée de chaque projet en cours.
- **Courbe de l'Accueil** : les périodes plus longues que l'historique sont grisées avec une explication ; en mode « Par classe », les courbes occupent toute la largeur à partir du premier jour enregistré ; un point d'historique est enregistré quel que soit l'onglet ouvert.
- **PEA : actions entières** : le nombre d'actions est arrondi à l'entier inférieur (frais déduits), avec des boutons − et +, et un récapitulatif « 5 actions × 190,48 € = 952,40 € investis ». Seul le montant réellement investi est compté. « Ce mois-ci » affiche le nombre entier d'actions au cours du jour.
- Tests : 170/170.

## Version 23 : l'appli selon ta sélection du catalogue
Chaque onglet va du plus général et visuel au plus détaillé.
- **Accueil** : boule de neige et courbe · L'essentiel (4 chiffres, un par onglet) · Ce mois-ci · À venir · Pourquoi ça a bougé · Vos prochaines actions (les 3 repères de santé à améliorer, avec conseil ; touchez pour le radar et la grille des 6 indicateurs) · Conseil du jour.
- **Mon argent** : patrimoine net · camembert de répartition · allocation cible (avec « aujourd'hui → objectif » et les achats du mois) · comptes · détail : immobilier (graphique d'amortissement du crédit) et historique avec correction de la courbe.
- **Mes coûts** : ce qu'il reste chaque mois avec la barre dépenses / épargne possible, puis le diagramme de flux · ce qui fait fondre votre boule (classement des fuites) · détail : frais par compte, effet des frais dans le temps, crédits.
- **Mes projets** : X sur Y atteints (financé, visé, reste) · prochain objectif · marge · chaque projet.
- **Mon plan** : achats récurrents (planifier, mise de côté, modifier) · ce que votre boule rapporte (qui vous paie) · calendrier des dividendes.
- Retirés car non sélectionnés : carte « À compléter », alertes, « Bien joué », score sur 100 de l'Accueil, cascade et effort/marchés, maison qui se remplit, Louer ou acheter, performances par position, calendrier de l'année en colonnes, indépendance financière, bascule brut / net, courbe avec et sans fuites, barre de progression colorée du questionnaire.
- Tests : 170/170.

## Version 22 : les bons widgets au bon endroit
Tri du catalogue des 111 éléments : on garde ce qui aide vraiment, au moment où on en a besoin, sans doublon.
- **Une question en haut de chaque onglet** (Qu'est-ce que j'ai ? · Qu'est-ce qui me coûte, et combien il me reste ? · Pour quoi j'épargne ? · Comment j'y arrive ?).
- **Accueil** : « À compléter » (budget, projet, compte vide) seulement s'il manque quelque chose ; « Ce mois-ci » montre l'avancement (x sur y faits) et un « Bien joué » avec le prochain projet quand tout est fait ; le conseil du jour générique est retiré.
- **Mon argent** : l'anneau se touche pour ouvrir une famille de placements ; « Modifier » la répartition visée ouvre son écran ; « Tout le détail » ne garde que les performances par placement, l'immobilier (avec Louer ou acheter) et l'évolution avec la correction de la courbe.
- **Mes coûts** : « Chaque mois, il vous reste » en grand au-dessus du diagramme de flux ; retrait des doublons (totaux de frais, simulateur de frais composés, second diagramme de flux, simulateur d'intérêts composés).
- **Mes projets** : résumé de l'indépendance financière (dans combien de temps vos placements paieraient vos dépenses), réglable dans le détail ; bandeau en doublon retiré.
- **Mon plan** : chaque mois se touche pour son détail ; nouvelle liste « Vos versements programmés » (achats réguliers et mises de côté) avec Planifier un achat, Mise de côté, Modifier ; doublons retirés du détail pour l'année en cours.
- **Réglages simplifiés** : Apparence (Clair / Sombre / Automatique), Cours de la Bourse (état + Actualiser), Mes données (Sauvegarder, Restaurer, Refaire le questionnaire) ; inflation et relais dans « Options avancées ». Tout s'applique tout de suite, un seul bouton « Terminé ». Plus de liste de cartes à cocher.
- Tests : 170/170.

## Version 21
- **Accueil · alertes**, affichées seulement quand c'est le cas : Livret A plein ou presque (95 % du plafond de 22 950 €), budget dans le rouge, plan du mois supérieur à l'épargne possible, une ligne qui dépasse 25 % des placements (sauf si la santé financière le signale déjà).
- **Accueil · « Ce mois-ci »** : les comptes sans cours en direct (livrets, épargne salariale, assurance vie, autres) dont le solde n'a pas bougé depuis 3 mois apparaissent avec un bouton « Mettre à jour ». Le suivi démarre à partir de cette version.
- **Accueil · « À venir »** sur les 60 prochains jours : grosses dépenses de l'année, dividendes estimés d'après l'an dernier, fin d'un crédit, échéance d'un projet.
- **Santé financière · endettement** : note pleine jusqu'à 25 % des revenus en mensualités, puis baisse jusqu'à 0 à 35 %.
- Tests : 170/170.

## Version 20
- **Fenêtres du bas** : on les ferme en les glissant vers le bas, ou en touchant la barre grise du haut, sur téléphone. Toutes les fenêtres du bas ont maintenant cette barre.
- **Santé financière** : la fenêtre « En savoir plus » garde le radar, puis détaille chaque repère du plus urgent au plus solide, avec sa note, votre chiffre réel, un conseil concret quand la note n'est pas pleine, et un « ? » qui explique le calcul. Le bouton « Voir le détail » disparaît.
- **Conseils alignés sur le calcul** : concentration 25 % ou moins, frais 0,3 % ou moins, précaution 6 mois, épargne 20 %, diversification 4 classes.
- **Radar** : les étiquettes ne touchent plus leur point.
- **Accueil, carte « Votre boule de neige »** : courbe d'évolution avec 1M, 3M, 6M, 1A, Max, et un bouton « Par classe » qui superpose une courbe par classe d'actifs (toucher un nom la masque). Seul « Projeter › » ouvre la projection.
- **Historique** : la valeur de chaque classe d'actifs est enregistrée chaque jour, à partir de cette version.
- Tests : 170/170.

## Version 19 : retour à la version 17
- Retour à la base de la version 17 (Accueil aéré, répartition visée en pourcentages), choisie comme point de départ. Les simplifications de la version 18 sont retirées de l'appli mais restent dans l'historique.
- Tests : 170/170.

## Version 18 : l'appli simplifiée selon la carte
Chaque élément répond maintenant à une seule question, et un chiffre n'apparaît qu'à un seul endroit.
- **Une question en haut de chaque onglet** : « Qu'est-ce que j'ai ? », « Qu'est-ce qui me coûte, et combien il me reste ? », « Pour quoi j'épargne ? », « Comment j'y arrive ? ».
- **Accueil** : la carte « À compléter » (ex-Bien démarrer et Reste à renseigner) n'apparaît que s'il manque quelque chose ; le détail de la santé financière est dans sa fenêtre « En savoir plus » ; l'évolution du patrimoine rejoint « Pourquoi ça a bougé » ; le conseil du jour est désactivé par défaut.
- **Mon argent** : l'anneau se touche pour voir les comptes d'une famille ; « Modifier » la répartition visée ouvre son propre écran ; « Tout le détail » ne garde que l'évolution, les performances par placement, l'immobilier et les crédits.
- **Mes coûts** : supprimés en doublon, les totaux de frais et d'impôts, le simulateur de frais composés, le simulateur d'intérêts composés (c'est « Ma boule de neige ») et le diagramme de flux de l'écran Budget.
- **Mes projets** : suppression du bandeau en doublon dans le détail.
- **Mon plan** : chaque colonne de l'année se touche pour voir et modifier le mois ; le calendrier des dividendes rejoint « Ce que votre boule rapporte » ; dans le détail, plus de bandeau d'avancement ni de liste « en attente » et de grille en doublon pour l'année en cours.
- **Réglages** : la liste des 14 cartes à cocher disparaît ; il reste « Conseil du jour » et « Succès » (les médailles s'affichent dans les Réglages).
- Tests : 170/170.

## Version 17
- **Accueil** : carte de la boule de neige plus aérée, variations sur 30 jours et sur 12 mois sur deux lignes.
- **Mon argent** : répartition visée en pourcentages clairs (ex. « 12 % · visé 40 % ») au lieu des « points » ; vert = proche de l’objectif, rouge = pas assez, orange = trop.

## Version 16
- **Mon argent** : sous le patrimoine net, Biens, Crédits et Impôts à venir sur 3 lignes, au lieu d’une ligne qui dépassait de la carte sur petit écran.

## Version 15
- **Accueil** : suppression des petits carrés « mois tenus » à côté de « Ce mois-ci », peu compréhensibles.

## Version 14
- **Mes coûts** : retour du diagramme de flux d’origine (revenus → catégories → postes, provisions et épargne libre), comme sur l’écran Budget.

## Version 13 : visuel de la maquette v4
- **Accueil** : la boule de neige (variation sur 30 jours et 12 mois, courbe), « Ce mois-ci » avec la série des mois tenus et un bouton Valider, « Pourquoi ça a bougé » (épargne, marchés, intérêts, frais, comptes ajoutés), santé financière en jauge et pastilles.
- **Mon argent** : patrimoine net, répartition en anneau, répartition visée (barre et trait d'objectif), liste des comptes.
- **Mes coûts** : flux du budget, ce qui fait fondre la boule sur 20 ans.
- **Mes projets** : prochain objectif, barres de financement, marge mensuelle.
- **Mon plan** : l'année en colonnes avec la capacité d'épargne, ce que la boule rapporte.
- **Ma boule de neige** (bouton « Projeter ») : curseurs durée et versement, 3 scénarios, « Et si… ? ».
- **En savoir plus** : feuilles avec cascade du mois, effort et marchés sur 12 mois, profil radar, anneaux, répartition actuelle et visée, courbe avec et sans fuites, dépenses par poste, revenus passifs mois par mois et par payeur.
- Bouton « + » rond dans la barre du haut, onglet actif à la couleur de sa rubrique. Les écrans complets restent sous « Tout le détail ».
- Tests : 169/169.

## Version 12 : nouvelle interface en deux niveaux
- **Nouvel Accueil** : la boule de neige (patrimoine net et variation sur un mois), « Ce mois-ci » (achats et mises de côté à valider en un geste), « L'essentiel » (une ligne colorée par onglet) et la santé financière en un anneau.
- **5 onglets** : Accueil · Mon argent · Mes coûts · Mes projets · Mon plan. L'ancien Patrimoine devient « Mon argent », Frais et Budget sont réunis dans « Mes coûts ».
- **« En savoir plus » ouvre des graphiques** : courbe et projection à 20 ans de la boule, repères de santé, fuites classées (frais, argent qui dort, impôts, intérêts), dépenses par poste et grosses dépenses de l'année, anneaux des projets avec effort mensuel comparé à l'épargne possible, plan de l'année réalisé et répartition.
- **Tout le détail** : les écrans complets existants restent accessibles, avec toutes leurs fonctions.
- Tests : 164/164.

## Version 11
- **Grands montants centrés** : la largeur du champ est mesurée sur le texte réellement affiché, au lieu d'être estimée en nombre de caractères (estimation fausse sur iPhone). Le montant et son trait sont centrés quelle que soit la longueur, à 0 px près.
- **Plus-value d'un fonds non coté** : Gain en vert avec un « + », Perte en rouge avec un « − ». Les boutons, le montant, le trait et la phrase d'explication prennent la couleur choisie.
- Tests : 162/162.


## Version 10 : finitions du parcours
1. **Types de crédit clairs**, chacun avec une courte description : crédit auto, prêt personnel, crédit renouvelable, prêt étudiant, prêt travaux, Autre. Pour « Autre », un écran demande d'abord son nom. Les anciens crédits de type « Consommation » restent affichés sous le nom « Crédit conso ».
2. **Titres de l'étape 2 lisibles** : une question courte en titre, avec le nom du compte ou du fonds en repère au-dessus. La ponctuation est insécable, pour ne plus avoir de « » ? » seul à la ligne.
3. **Plus de doublons** : revenir en arrière puis continuer modifie le crédit, le projet ou la dépense annuelle déjà créé au lieu d'en ajouter un, et le montant est prérempli.
4. **« Nouveau titre » plus discret** : fond blanc, bordure fine, texte vert. Il n'y a plus de bouton grisé quand aucun titre n'est choisi.
5. **Écran final** :
   - quatre lignes compactes aux couleurs des étapes (bleu, orange, violet, vert), avec une icône et un montant bien lisible ;
   - une nouvelle illustration : la boule au départ avec un drapeau, une flèche qui descend la pente, et la boule estimée en bas, avec une projection à 20 ans à 4 % par an (indiquée comme non garantie) ;
   - tout tient sur un écran de téléphone ;
   - les confettis sont conservés.

Tests : `node tests/parcours-accueil.e2e.js` : **162/162**.


## Version 9 : troisième série de corrections
1. **Ajout d'un titre** : le compte est fixé, et il n'y a plus de pastilles PEA / CTO / Cryptos sur l'écran. Depuis le bouton « Ajouter » de l'application, un écran « Dans quel compte ? » vient en premier. Le texte d'exemple n'est plus coupé.
2. **Plus de « J'ai un autre PEA »** ni de « J'ai un autre Livret A » : un seul par personne.
3. **Épargne salariale** : chaque écran indique « PEE · fonds non coté » ou « PER collectif · fonds coté en Bourse ». Le premier écran annonce « Ajouter un fonds non coté à votre PEE ». Un écran de transition marque le passage des fonds cotés aux fonds non cotés.
4. **Vocabulaire** : immobilier, crowdfunding et objets parlent d'« actif » (« Retirer cet actif », « Nom de ce bien »).
5. **Crédits** : on coche un ou plusieurs types, puis on indique le **montant emprunté** de chacun, sur un écran par crédit. C'est aussi le cas pour le crédit immobilier. À l'étape 2, on renseigne le taux, la durée totale, la date de la 1re mensualité, l'assurance et les frais. Le montant emprunté compte entièrement dans les dettes tant que ces conditions ne sont pas connues.
6. **Les questions de l'étape 2 reprennent le nom saisi** (« Frais de gestion de « PEA Trade Republic » ? »). Pour les objets, de nouveaux repères fiscaux 2026 portent sur le **prix de vente** (`e.taxOnPrice`) : 6,5 % pour les objets de collection et les bijoux, 11,5 % pour l'or et les métaux précieux, 0 % jusqu'à 5 000 €.
7. **Coût total du crédit mis en avant** : « Au total, vous rembourserez X € », c'est-à-dire le montant emprunté plus les intérêts, l'assurance et les frais. Viennent ensuite la mensualité, la date de fin, le reste à rembourser et la part déjà remboursée.
8. **Dépenses annuelles** : des exemples à cocher, plus « Autre » (avec un nom libre), puis un écran par dépense et un récapitulatif modifiable.
9. **Projets** : sélection multiple, puis, pour chaque projet, le montant, l'échéance et les comptes qui le financent. Les cartes sont plus compactes.
10. **Plan** : un bouton « + Nouveau titre » remplace les exemples et la saisie libre. Il lance une recherche dans la base des cotations, affiche le **cours actuel du marché** et l'équivalent en parts.
11. **Écran final** : confettis à l'arrivée, encadrés qui apparaissent l'un après l'autre avec des montants animés, et une petite boule « prête » qui oscille en haut de la pente. Les couleurs sont, dans l'ordre : bleu (ce que vous avez), orange (ce que coûte le patrimoine, avec les intérêts de crédit restants), violet (projets de vie), vert (épargne possible).

Tests : `node tests/parcours-accueil.e2e.js` : **157/157**.


## Version 8
- **Assurance vie** : le premier écran ne demande que le montant (plus de « cours en direct »). L'écran suivant demande « Quel rendement annonce votre assurance vie ? ».
- **Boutons et cartes sur téléphone** : les effets de survol ne s'appliquent plus qu'avec une souris (`@media (hover: hover) and (pointer: fine)`). Sur écran tactile, une carte n'a plus d'état « à moitié coché » qui reste collé. Les effets à l'appui (rétrécissement, fond plus foncé) sont supprimés dans toute l'application.
- Tests : **137/137**, dont une vérification sur écran tactile simulé.


## Version 7 : assurance vie, cryptos, épargne salariale
1. **Assurance vie** : le montant d'abord, puis un écran dédié « Quel rendement a eu votre fonds euros l'an dernier ? », avec des choix en un toucher et les intérêts annuels estimés.
2. **Cryptos** : comme les actions. Plus de montant global : on choisit la crypto, puis sa quantité, puis le prix moyen d'achat, et la valeur suit le cours du jour. Le lien « saisir une valeur sans cotation » est supprimé.
3. **Épargne salariale** :
   - on coche PEE et/ou PER collectif, et cocher les deux crée deux comptes ;
   - pour chaque plan, on coche les fonds cotés et/ou les fonds non cotés ;
   - chaque plan peut avoir plusieurs lignes, renommables avec le crayon ;
   - le bouton n'est plus grisé quand un plan est coché.
4. **Fonds non cotés** (épargne salariale, et « Autre fonds » de l'assurance vie depuis l'application) : nom, valeur, puis plus-value (Gain ou Perte et montant, ou « Je ne sais pas »). Le montant investi en est déduit.

Tests : `node tests/parcours-accueil.e2e.js` : **136/136**.


## Version 6 : deuxième série de corrections
1. **Frais des ETF déplacés à l'étape 2** : dans le parcours, l'ajout d'un titre ne demande plus ses frais. Tous les ETF et fonds du PEA et du compte-titres reviennent un par un à l'étape « Ce que vous dépensez ». L'écran des frais reste dans l'ajout depuis le bouton « Ajouter » de l'application.
2. **Épargne salariale pas à pas** : type de plan (PEE ou PER collectif, enregistré dans `e.plan`), puis « Des fonds cotés en Bourse ? », puis « D'autres fonds à ajouter ? ». Pour un fonds non coté : nom, valeur, montant versé (facultatif), et autant de fonds que nécessaire. Le lien « J'ai aussi un PER » (ou un PEE) crée le second plan. Le bouton « Ajouter » de l'application utilise les mêmes écrans.
3. **Écran des crédits** : le texte s'adapte. Si un crédit immobilier est déjà renseigné, le titre devient « Un autre crédit en cours ? » et une ligne rappelle que le crédit immobilier est déjà pris en compte.
4. **Crédits, seulement le reste dû à l'étape 1** : type de crédit, puis capital restant dû (même chose pour le crédit immobilier sur l'écran du bien). Le taux, les mois restants, l'assurance et les frais se renseignent à l'étape 2, sur les écrans « Ce que coûte ce crédit », qui affichent la mensualité et le coût restant. Tant que ses conditions manquent, le crédit est marqué `partial` : il compte dans le patrimoine net, mais aucun échéancier ni coût n'est inventé, et il est signalé « conditions à compléter » dans l'application.

Tests : PASS  wizard auto-opens for new user  
PASS  light theme by default  
PASS  welcome  Tout commence petit
PASS  welcome shows paid + capital + Mais  
PASS  melt  
PASS  melt lists 6 obstacles  
PASS  why  Bienvenue sur snowball
PASS  how  
PASS  p-intro  
PASS  p-pick  
PASS  4 envs created  
PASS  toggle removes empty env  
PASS  PEA: exact holdings question  Qu’y a-t-il dans votre PEA ?
PASS  PEA: no approximate amount  
PASS  flow: search screen  Quel titre voulez-vous ajouter ?
PASS  flow: no manual entry for PEA  
PASS  flow: pick screen  
PASS  flow: quantity screen  
PASS  flow: PRU screen  
PASS  flow: no fee screen during onboarding  
PASS  flow: line saved with ISIN, kind, no fee yet  
PASS  flow: stock skips fee screen  
PASS  flow closed → back to wizard with 2 lines  
PASS  Immobilier step  Combien vaut votre bien ?
PASS  property loan: remaining balance only  
PASS  loan saved on property (partial)  
PASS  loan chip shows remaining  
PASS  Livret step  Combien sur votre Livret A ?
PASS  Livret: official rate shown  
PASS  livret balance with space  
PASS  12abc refused (marked invalid, value kept)  
PASS  decimal comma accepted  
PASS  options hidden by default then shown  
PASS  ES: plan type  Quel type de plan ?
PASS  ES: quoted funds question  
PASS  ES: other funds question  
PASS  ES: fund name screen  
PASS  ES: paid screen  
PASS  ES: fund added  
PASS  ES: plan list with 2 funds  
PASS  debts step adapts to property loan  
PASS  debt: type screen  
PASS  debt: remaining balance screen, no rate asked  
PASS  debt saved (partial)  
PASS  p-sum  
PASS  c-intro  
PASS  c-fees PEA  Frais de gestion de votre PEA ?
PASS  PEA account fee preset to none  
PASS  c-etf screen  Frais de Amundi MSCI World UCITS ETF ?
PASS  c-etf starts on « Je ne sais pas »  
PASS  c-etf fee updated  
PASS  c-frec recap  Les frais de votre PEA
PASS  c-tax PEA  Impôt sur vos gains, si vous vendiez votre PEA ?
PASS  PEA tax 18.6  
PASS  c-tax Immo  Impôt sur vos gains, si vous vendiez votre Immobilier ?
PASS  c-fees PEE  Frais de gestion de votre Épargne salariale ?
PASS  c-loan property: rate  Quel est le taux de ce crédit ?
PASS  c-loan: months  
PASS  c-loan: insurance  
PASS  c-loan: fees  
PASS  c-loan: cost summary  
PASS  c-loan car: rate  
PASS  car loan stays partial when skipped  
PASS  c-rev  
PASS  group daily  
PASS  group housing  
PASS  loan reminder in housing  
PASS  group subs  
PASS  annual  
PASS  annual bill listed  
PASS  c-sum  
PASS  capacity = 3500-400-100-870 = 2130  
PASS  g-intro  
PASS  goal type  
PASS  continue disabled with no goal  
PASS  goal form  
PASS  goal funding screen  
PASS  nothing checked by default  
PASS  goal created with chosen accounts  
PASS  goal date in 5 years  
PASS  goal list  
PASS  s-intro  
PASS  asset choice  
PASS  amount stage  
PASS  buys created this year + next year  
PASS  buy kind ETF & env PEA  
PASS  plan list  
PASS  next-year action buys  
PASS  over-capacity alert  
PASS  provision added  
PASS  end  
PASS  end recap: life projects + yearly cost  
PASS  wizard closed  
PASS  wz done  
PASS  Objectifs: next goal monthly effort  
PASS  app « Ajouter » opens step-by-step flow for PEA  
PASS  applyBuy kind=Action  
PASS  view renders #/n  
PASS  view renders #/s  
PASS  view renders #/g  
PASS  view renders #/u  
PASS  view renders #/r  
PASS  view renders #/e/5vr6mxi  
PASS  view renders #/g/1yqn005  
PASS  view renders #/  
PASS  no reopen after done  
PASS  data persisted  
PASS  resume after reload  
PASS  later closes wizard  
PASS  dark theme switch  
PASS  save failure badge  
PASS  save failure toast  
PASS  existing user: no auto-open  
PASS  existing user: data intact  
PASS  existing user: data kept note  
PASS  existing livret shown in its step  
PASS  resume card on home  
PASS  resume goes back to same step  
PASS  no horizontal overflow at 320px  
PASS  no JS errors  
0 FAIL / 120 : **120/120**.


## Version 5 : corrections après essai sur téléphone
1. **PEA et compte-titres : cotation exacte obligatoire.** Plus de montant approximatif dans le parcours : on ajoute chaque titre avec sa cotation réelle, et la valeur est calculée au cours du jour.
2. **Ajout d'un titre pas à pas** (nouveau, `openAssetFlow`), en plein écran, une information par écran : titre recherché (ISIN ou nom), choix de la cotation, nombre de parts, prix de revient moyen (PRU), frais annuels (ETF et fonds uniquement), puis confirmation. Le bouton « Ajouter » de l'application l'utilise aussi pour les comptes cotés. Pour les cryptos, un lien permet encore une saisie sans cotation.
3. Le champ « ISIN (optionnel, pour garder une trace) » est supprimé : l'ISIN est enregistré automatiquement quand on cherche par ISIN.
4. **Livret A** : le taux officiel est appliqué d'office (1,7 % depuis le 1er août 2026, vérifié en novembre 2026). Un autre taux reste possible dans « Plus d'options », avec un bouton « revenir au taux officiel ». Le taux et sa date sont à mettre à jour dans `LIVRET_RATE` et `LIVRET_RATE_SINCE`.
5. et 6. **Frais du PEA et du compte-titres** : un écran pour les frais du compte (« Aucun » présélectionné pour le PEA), puis un écran par ETF ou fonds avec son pourcentage et le coût en euros par an, un récapitulatif modifiable, puis l'impôt sur son propre écran. Taux 2026 : PEA de plus de 5 ans 18,6 %, flat tax 31,4 %, assurance vie 17,2 %, 24,7 % ou 30 %, immobilier 0 % ou 36,2 % (sources : loi de financement de la Sécurité sociale pour 2026).
7. **Projets** : aucun compte n'est coché par défaut. Le choix se fait sur un écran dédié, obligatoire avant d'ajouter le projet. Même règle dans la fenêtre « Nouvel objectif » de l'application.
8. **Récapitulatif final** : « Ce que vous avez » en vert foncé, « Épargne possible par mois » en vert clair, « Projets de vie » avec l'effort mensuel, et « Votre patrimoine vous coûte X € / an » en rouge (frais de gestion estimés, hors impôts). Ce dernier remplace « Achats prévus ».
9. **Onglet Objectifs** : un encadré « Prochain objectif » indique combien mettre par mois pour l'atteindre à temps. Les achats et mises de côté déjà programmés sont déduits, et le calcul ne compte pas de rendement futur. Chaque carte de projet affiche son effort mensuel, et le total est comparé à l'épargne possible.

Tests : `node tests/parcours-accueil.e2e.js` : **102/102**. Le relais Google est simulé dans le test : le vrai relais n'est pas joignable depuis l'environnement de développement.


## Version 4 : « snowball »
- Nom : **snowball**, en minuscules (constante `APP_NAME`).
- **Page 1, « Tout commence petit »** : la boule grossit en dévalant la pente. Le compteur affiche les versements cumulés et le capital, mois après mois puis année après année (100 € par mois à 4 % pendant 30 ans, hypothèse). La page se termine par « Mais… ».
- **Page 2, « … elle peut aussi grossir moins vite que prévu, voire fondre »** : la même descente, avec six obstacles numérotés sur la pente : frais cumulés, irrégularité, inflation, émotions (vendre en pleine baisse), imprévus, impôts. À chaque obstacle, des morceaux se détachent, et à partir de l'inflation la boule fond goutte à goutte. Une silhouette en pointillés montre la boule prévue. Le compteur compare Versé, Prévu (barré) et ce qu'il reste en euros d'aujourd'hui (environ 20 900 € pour 32 400 € versés, contre 69 600 € prévus). La liste des obstacles s'allume au passage de la boule.
- **Page 3, « Bienvenue sur snowball »** : « L'app qui vous aide à faire grossir votre boule de neige, sans la laisser fondre », puis les quatre étapes.


## Version 3 : « Boule de neige »
- Nouveau nom : **Boule de neige**, avec le slogan « votre épargne, petit à petit ». Il est défini à un seul endroit, la constante `APP_NAME` au début du script. Nouveau logo en forme de boule de neige.
- **Écran d'accueil animé** : une petite boule dévale une pente et grossit. Un compteur suit la descente (mois, puis années) jusqu'à environ 69 400 € au bout de 30 ans. Exemple affiché : 100 € par mois à 4 % par an, **hypothèse indiquée comme non garantie**. L'animation est faite en SVG, sans aucune bibliothèque. Elle tourne en boucle avec une pause, et s'affiche sous forme d'image fixe si l'appareil demande moins d'animations.
- **Écran final** : « Votre boule de neige est lancée », avec la boule arrivée en bas de la pente.
- Identité visuelle (blanc neige, bleu glacier, couleurs par étape) inchangée par rapport à la version 2.
- Tests : 80/80.


## Version 2 : identité visuelle (d'abord nommée « Clarté ») et questionnaire allégé

### Identité
- **Nom** : *Clarté*, avec le slogan « Vos finances, enfin claires ». Le symbole est un flocon, pour la neige et la clarté.
- **Couleurs** : un blanc neige, une encre presque noire, un seul accent « bleu glacier » (#3858F6). Chaque étape du parcours a sa couleur douce : bleu (ce que vous avez), corail (ce que vous dépensez), lilas (vos projets), vert sapin (votre plan).
- **Typographie** : Fraunces, une police à empattements chaleureuse, pour les questions et les grands montants. Plus Jakarta Sans pour le reste. En l'absence de réseau, Georgia et la police système prennent le relais.
- **Toute l'app** : boutons en pilule, cartes à peine ombrées, champs à fond doux, fenêtres plus légères. La carte « Patrimoine net » est blanche avec le chiffre en grand, et ses repères colorés sont conservés. Le bandeau « relais Google » devient une petite carte « Cours en direct · option ».
- **Apparence** : thème clair par défaut. Sombre ou « comme l'appareil » au choix dans Réglages (`S.theme`). Le mode sombre d'origine reste disponible.

### Questionnaire
- **Une seule question par écran**, posée en langage courant (« Combien sur votre Livret A ? », « Combien gagnez-vous par mois ? »).
- **Un grand montant** au centre de l'écran, et un seul gros bouton en bas. Le bouton « Retour » est en haut à gauche, « Plus tard » en haut à droite.
- **Détails techniques masqués** dans « Plus d'options » : taux, prix d'achat, nom du compte, compte en double, retrait.
- **Pas d'ISIN imposé** : on donne la valeur totale de son PEA. Le détail ligne par ligne, avec cours en direct, reste proposé en option. Le relais Google sort du parcours, il reste accessible depuis l'accueil et les fenêtres d'ajout.
- **Frais et impôts en un toucher** : « Aucun / 0,5 % / 0,6 % / 1 % / Je ne sais pas ». On peut passer tous les frais en une fois.
- **Projets** : on choisit une illustration, puis un montant et une durée (« dans 5 ans »). L'effort mensuel et la marge restante sont affichés.
- **Plan** : on choisit un titre, puis un montant et un départ (« dès novembre », « en janvier »). On peut reconduire sur l'année suivante. Un calendrier sur 12 mois, avec un repère de la capacité d'épargne, sert de contrôle.
- **Bilans visuels** à la fin de chaque étape : grand chiffre et barre de répartition.
- **Moins de notifications** pendant le parcours.

Données inchangées : mêmes structures qu'en version 1. Les seuls ajouts sont les champs facultatifs `S.theme`, `S.wz` et `kind` sur les achats programmés.

Tests : `node tests/parcours-accueil.e2e.js` : **80/80** (parcours complet, saisie, persistance, reprise, thème sombre, échec de sauvegarde, utilisateur existant, 320 px, rendu de tous les onglets, aucune erreur JS).

---

## Version 1 : parcours d'accueil guidé

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Application modifiée (fichier unique, à ouvrir dans le navigateur). |
| `original/test_3010.html` | Copie **inchangée** du fichier d'origine (retour arrière : le rouvrir à la place de `index.html`). |
| `original/diagnostic.txt` | Diagnostic fourni. |
| `tests/parcours-accueil.e2e.js` | Test navigateur (Playwright) du parcours complet + non-régression des vues. |

Les 122 fonctions de premier niveau d'origine sont toutes conservées ; 16 fonctions sont ajoutées (`wz*`, `openWizard`, `closeWizard`). Le « Questionnaire express » d'origine reste accessible depuis le bouton **Ajouter**.

## Le parcours

Fenêtres plein écran successives, une question à la fois, avec barre de progression en 4 chapitres, retour arrière, « passer » et « continuer plus tard ».

1. **Bienvenue** : présentation de l'application.
2. **Pourquoi cette application ?** : la logique en 6 temps (ce que j'ai → ce que ça coûte → ce que je dépense → capacité d'épargne → objectifs → plan d'achat).
3. **Comment ça se passe** : les 4 chapitres, durée, données locales, estimations indicatives.
4. **Chapitre 1 · Mon patrimoine**
   - choix des types d'enveloppes (tuiles) ;
   - cotations en direct (relais Google, facultatif ; même test de connexion qu'avant) ;
   - **une fenêtre par enveloppe** : nom, puis ses actifs (solde et taux pour un livret ; titres via la fenêtre « Ajouter un actif » existante pour PEA/CTO/crypto ; saisie manuelle intégrée pour assurance vie, épargne salariale, immobilier, crowdfunding, autres ; crédit immobilier rattaché au bien ; « j'ai un autre PEA » ; retrait) ;
   - crédits auto, conso, perso (éditeur de crédit existant) ;
   - bilan : brut, crédits, net, répartition, **avertissement si des lignes ne sont pas valorisées**.
5. **Chapitre 2 · Mes coûts & dépenses**
   - **une fenêtre par enveloppe** : fiscalité sur la plus-value, frais de l'enveloppe, frais de chaque ETF/fonds, avec estimation en direct ;
   - revenus nets mensuels ;
   - **une fenêtre par catégorie de dépenses** (catégories du budget existant, ajout de postes) ; rappel des mensualités de crédit dans « Logement » ;
   - dépenses annuelles ;
   - bilan : **capacité d'épargne** (même formule que l'onglet Budget : revenus − dépenses − provisions), diagramme de flux, frais des placements, impôts latents, courtage.
6. **Chapitre 3 · Mes objectifs** : création d'objectifs financés par les enveloppes (même modèle et même répartition sans double comptage que l'onglet Objectifs). L'écran affiche aussi la part déjà financée, l'effort mensuel restant et une alerte si le total dépasse la capacité d'épargne.
7. **Chapitre 4 · Ma stratégie** : achats mensuels (titre détenu, ETF du catalogue ou saisie libre avec type d'instrument), plan de l'année en cours ou de la suivante, provisions vers un livret, **calendrier sur 12 mois** comparé à revenus − dépenses, avec une alerte en cas de dépassement.
8. **Fin** : synthèse et rôle de chaque onglet → tableau de bord.

Le parcours s'ouvre seul pour un nouvel utilisateur. Il reprend à la même étape après fermeture ou rechargement. Une carte « Reprendre » apparaît sur l'accueil. On peut le relancer depuis **Ajouter** ou **Réglages**. Avec des données existantes, il ne s'ouvre pas tout seul et reprend les données sans rien effacer.

## Changements dans le code existant

| Zone | Changement | Raison |
|---|---|---|
| `ls.set()` / `save()` | Renvoient `true`/`false`. Un seul avertissement en cas d'échec d'écriture. | Diagnostic 5.7 : ne pas masquer un échec de sauvegarde. |
| `applyBuy()` | `kind: b.kind \|\| 'ETF'` | Diagnostic 5.3 : le type choisi lors de la planification est conservé. Les anciens ordres sans type gardent le comportement d'avant. |
| `vHome()` | Ouvre le nouveau parcours au lieu du questionnaire express pour un nouvel utilisateur ; carte « Reprendre ». | Accueil. |
| `render()` | Ne redessine pas la vue tant que le parcours est ouvert. | Évite les notifications et confettis de succès en rafale derrière le parcours (regroupés en un message à la fermeture). |
| `openAddMenu()`, `openSettingsModal()` | Bouton « Parcours guidé complet » / « Relancer le parcours ». | Accès au parcours. |
| `getIcon()` | Icônes `wallet`, `flag`, `clock`. | Écrans d'accueil. |
| Touche Échap | Ferme la fenêtre ouverte, sinon le parcours (progression enregistrée). | Accessibilité (diagnostic, tableau 8). |

## Schéma de données

- **Ajout** : `S.wz = { v: 1, at, open, done, hide, mk }` (progression du parcours). Champ facultatif : les anciennes sauvegardes et les anciens exports JSON restent compatibles, aucune migration n'est nécessaire.
- **Ajout** : champ facultatif `kind` sur les achats programmés (`S.st[année].b[i].kind`). Les ordres sans ce champ fonctionnent comme avant.
- Le parcours n'utilise que les structures existantes : `S.envs[].lines[]`, `e.tax`, `e.fee`, `l.fee`, `e.rate`, `e.avRate`, `l.loan`, `S.loans`, `S.bud`, `S.goals`, `S.st`.

## Tests réellement exécutés

- `node --check` sur le JavaScript extrait : OK.
- `node tests/parcours-accueil.e2e.js` (Chromium, Playwright) : **75/75 vérifications réussies**, aucune erreur JavaScript. Le test couvre :
  - le parcours complet sur mobile (390 px) : 3 enveloppes, ETF du catalogue et ligne manuelle via la fenêtre existante, bien avec crédit, livret, frais, budget, dépense annuelle, objectif, achats de l'année en cours et de la suivante, provision ;
  - la capacité d'épargne (3 500 − 400 − 100 − 870 = 2 130 €) ;
  - la saisie : « 10 000 » et « 10000,50 » acceptés, « 12abc » refusé sans écraser la valeur ;
  - le total partiel quand une ligne n'est pas valorisée ;
  - l'alerte de dépassement de capacité ;
  - la propagation du type `Action` par `applyBuy` ;
  - la persistance après rechargement, la non-réouverture une fois terminé, la reprise après rechargement, la carte « Reprendre » ;
  - un utilisateur existant (pas d'ouverture automatique, données intactes) ;
  - l'échec simulé du stockage local (badge et message) ;
  - l'absence de débordement horizontal à 320 px ;
  - le rendu de tous les onglets (Frais, Stratégie, Objectifs, Budget, Simulateur, enveloppe, objectif, accueil) après le parcours ;
  - des captures en mode sombre sur ordinateur.

Lancer : `node tests/parcours-accueil.e2e.js` (captures facultatives : `SHOTS=/chemin/ node …`).

## Non testé / limites restantes

- **Relais Google, Yahoo Finance, Eurostat** : pas de connexion réelle testée (recherche ISIN, cours en direct, test de connexion du relais).
- Pas de test sur Safari/iOS réel ni avec un lecteur d'écran.
- Diagnostic, **non traité** dans cette livraison : validation stricte de `pf()` dans toute l'application (seul le parcours valide strictement), import JSON avec validation, sauvegarde préalable et retour arrière (§6), pouvoir d'achat réel (§5.5), séparation dividendes réalisés / intérêts estimés dans `passiveCard()` (§5.4), taux du livret daté et paramétrable globalement (§5.8 ; le parcours indique seulement s'il s'agit de la valeur par défaut), zoom bloqué par la balise viewport et les gestes, frais de courtage dans les agrégats du tableau de bord (§5.2 ; le parcours les affiche à part), allocation partielle d'une enveloppe entre objectifs.
- Taux de fiscalité et de frais proposés (17,2 %, 30 %, 0,5 %…) : ce sont les **repères déjà présents dans l'application**, signalés comme indicatifs. Ils ne valent pas conseil fiscal.
