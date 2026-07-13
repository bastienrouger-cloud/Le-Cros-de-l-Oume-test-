# Feuille de route — Le Cros de l'Oume

Roadmap générique de dev de site vitrine, adaptée à notre projet. On la met à jour au fur et à mesure — coche les étapes, ajoute des notes sous chaque section quand on avance ou qu'on dévie du plan de base.

## 1. Cadrage avant tout code

- [x] Qui c'est pour, quel objectif : exercice perso d'entraînement (reproduction non officielle du site de Ludivine), pas de vente/prod réelle.
- [x] Liste des pages nécessaires : voir arborescence ci-dessous (section 2).
- [ ] Contenu textuel et visuel dispo ou à créer : à voir page par page, au moment de les coder. Pas de scraping du vrai site (pas nécessaire, on brainstorme la structure).

## 2. Structure / arborescence

- [x] Sitemap simple, arrêté en session du 12/07 :
```
/
├── index.html
├── pages/
│   ├── a-propos.html
│   ├── visite-ferme.html
│   ├── balade-cheval.html
│   ├── mediation-equine.html
│   ├── projet-loungta.html      ← branche test uniquement, pas mergé sur main (contenu pas clarifié)
│   ├── contact.html
│   └── elevage/
│       ├── index.html          ← hub
│       ├── irish-cob.html
│       └── chiens-protection.html
```
- [ ] Wireframe rapide par page : pas encore fait, à prévoir avant d'attaquer le HTML de chaque page.

## 3. Setup technique

- [x] Dossier propre créé : `css/`, `js/`, `assets/images/`, `assets/icons/`, `pages/`, `partials/`.
- [x] Un seul `style.css` au départ (pas encore écrit, mais c'est le plan — on splitte plus tard si besoin).
- [x] Git dès le début : repo GitHub créé, branches `main` (stable) et `test` (travail), auth token + credential helper (osxkeychain sur Mac, Git Credential Manager prévu sur Windows).

## 4. HTML d'abord, sans style

- [x] Structure sémantique complète (header, nav, main, sections, footer) — fait sur `index.html`.
- [x] Header/footer en partials, inclus via JS (`fetch`) — fait (`partials/header.html`, `partials/footer.html`, `js/main.js`).
- [x] Contenu réel dans le HTML, pas de lorem ipsum — fait pour l'index.
- ⚠️ Note pour toute future refonte du header : la mise en évidence de la page courante (nav "active") est gérée par `highlightActiveNav()` dans `js/main.js` (+ styles `.active` dans `css/style.css`) — à conserver/adapter si le header est retravaillé, sinon ce comportement disparaît silencieusement.

## 5. CSS ensuite

- [x] Mobile-first — `css/style.css`.
- [x] Variables CSS pour couleurs/fonts : crème / vert sauge-forêt / terracotta / charbon, Playfair Display + Nunito Sans.
- [x] Layout d'abord (grid/flexbox), détails ensuite — cartes en flexbox (centrage auto de la dernière ligne), nav responsive.

## 6. Interactivité (JS) si besoin

- [ ] Formulaire de contact (pas encore décidé si Formspree, Netlify Forms, ou autre — projet d'entraînement donc pas d'enjeu réel de destinataire). À faire avec `pages/contact.html`.
- [x] Menu mobile — hamburger sous 860px, branché en JS (`initMobileNav`).
- [x] Carrousel d'images statique en JS : cadre fixe, une photo a la fois, fleches, defilement auto (pause au survol du cadre), points de navigation (barre de progression synchronisee), lightbox plein ecran, bouton agrandir.

## 7. Responsive + tests

- [ ] Test sur mobile réel.
- [ ] Vérif navigateurs courants.

## 8. Perf + SEO de base

- [ ] Compression images, meta tags, alt text.
- [ ] Lighthouse.

## 9. Déploiement

- [ ] Hébergement : pas nécessaire ici (pas de client, pas de mise en prod), mais on peut simuler avec GitHub Pages pour s'entraîner à ce bout de la chaîne si tu veux.
- [ ] DNS / SSL : sans objet pour ce projet, sauf si tu veux pousser l'exercice jusque-là.

## Où on en est (à jour au 13/07/2026, soir)

`index.html` est considere comme boucle : structure, style, header/footer en partials, menu mobile, carrousel complet, hero personnalise (embleme + illustration de fond). Reste ouvert pour plus tard : formulaire de contact (lie a `pages/contact.html`, pas encore creee), et une nouvelle passe sur le PNG de l'embleme (cercle exterieur pas parfaitement rond).

Pattern "page type" valide sur `pages/visite-ferme.html` : hero, carrousel (2/3) + texte (1/3) avec horaire/tarif distingues et bouton contact centre, section video (placeholder), FAQ en accordeon (multi-ouvert, largeur 1400px). Nav "active" ajoutee en prime (header + footer, y compris le parent "Activités" quand une sous-page est active).

`pages/balade-cheval.html` et `pages/mediation-equine.html` crees sur ce meme pattern, contenu inspire (reformule, pas copie) du vrai site de Ludivine. Photos encore en placeholder — mais depuis le 13/07 chaque `<img>` a son propre fichier SVG unique, range dans une arborescence `assets/images/` qui reproduit celle de `pages/` (ex. `assets/images/pages/visite-ferme/visite-famille.svg`), comme si c'etaient de vraies photos. Le vieux `assets/images/placeholder.svg` partage a ete supprime, plus aucune reference dessus.

`pages/elevage/index.html` cree : hub avec 2 grandes cartes pleine image (section `.showcase`), inspire de la section "Our Games" du site de Star Citizen (badge, degrade sombre, texte en bas). Pointe vers `irish-cob.html` et `chiens-protection.html`, pas encore crees.

`pages/projet-loungta.html` cree en version minimale (header/footer + message "page en cours de preparation") — rappel : reste sur la branche `test` uniquement, pas mergee sur `main` tant que le contenu reel n'est pas clarifie.

`pages/elevage/irish-cob.html` cree avec un pattern different de visite-ferme (contenu plus texte + photo, moins "carte de visite") : intro image+texte (`.page-content-image`), accordeon reutilise pour la ligne de selection (5 items), puis un `.carrousel` pleine largeur (comme sur l'index) pour "Nos juments", et un `.page-cta` de fin. Seul ajout CSS : `.section-lead` (titre + paragraphe centres avant un composant pleine largeur), tout le reste reutilise l'existant.

CTA flottant ajoute sur `irish-cob.html`, inspire de la barre "Ship Value" sticky des pages vaisseau de Star Citizen : le bouton "Nous contacter" du hero (`#hero-cta-anchor`) sert de repere, sa version flottante (`#sticky-cta`, nouveau `js/sticky-cta.js` + IntersectionObserver) apparait des qu'il sort du champ de vision en scrollant et disparait si on remonte au dessus. Le `.page-cta` redondant en bas de page a ete retire. Pattern reutilisable sur d'autres pages (il suffit des deux ids).

Fix global (toutes pages) : fond de `<html>` aligne sur le vert du footer, pour eviter le flash de fond creme lors du rebond de scroll (overscroll/rubber-band) en bas de page — pas intentionnel avant, corrige sur toutes les pages d'un coup (regle sur `html`, pas sur une page en particulier).

`projet-loungta.html` : nouvelle variante `.page-hero--tall` (min-height 80vh, flex centre) pour les pages ou le hero est le seul contenu — affiche l'illustration de fond sur toute sa hauteur au lieu de la bande courte des autres pages.

`index.html` refondu (decide en fin de session du 13/07, apres essai compare sur `index-preview.html`) :
- Section "Nos activités" passee du style `.cards-grid` au meme pattern `.showcase` que le hub elevage (photo pleine largeur, badge, degrade, lien "Découvrir"). Nouvelle variante `.showcase-grid--quad` (1 colonne mobile, 2x2 des que la place le permet, pas de palier "3 par ligne").
- Carte "Projet Loungta" retiree de l'index (4 activites au lieu de 5) — la page reste accessible via le menu Activités, juste plus mise en avant sur l'accueil.
- Carrousel deplace en dessous de la section activites (etait au dessus avant).
- Le carrousel de l'index passe en variante "coverflow" (`.carrousel--coverflow`, scopee a cette seule instance) : photo active centree en pleine taille, precedente/suivante visibles en reduit de chaque cote et cliquables pour naviguer, fond creme au lieu du vert sauge standard. Positionnement via `transform: translateX() scale()` pilote par des custom properties (`--x-offset`/`--x-scale`) plutot que `order`, pour une transition glissee et non un saut instantane.
- Bug corrige au passage (touchait potentiellement tout survol de carrousel, pas juste le coverflow) : le hover pause/reprise du carrousel ecoutait `mouseenter`/`mouseleave` sur `.carrousel-viewport`, qui ne detecte que sa boite geometrique. En coverflow, les vignettes prev/next debordent visuellement de cette boite (overflow visible), donc le survol n'etait pas detecte a certains endroits et le minuteur JS se desynchronisait de la barre de progression a la reprise. Remplace par `mouseover`/`mouseout` sur `.carrousel-track` avec verification de `relatedTarget` (bulle par arborescence DOM, pas par geometrie — fonctionne meme si une slide deborde visuellement).
- `assets/images/index/card-projet-loungta.svg` n'est plus reference nulle part (carte retiree) — laisse en place pour l'instant, a nettoyer si on ne remet jamais cette carte.

Prochaine étape concrète : `pages/elevage/chiens-protection.html` (sur le meme pattern que irish-cob.html), `pages/a-propos.html`, `pages/contact.html` (avec vrai formulaire).

## Session du 13/07/2026 (nuit) — simplification irish-cob + cartes equipe + creation chiens-protection

Bug corrige au passage sur toutes les pages : `highlightActiveNav()` (js/main.js) surlignait "Activités" en plus de "Accueil" sur l'index, car le lien parent (`href="#"`, simple bouton pour deplier le sous-menu) etait resolu par erreur vers `/index.html` lors de la comparaison d'URL. Fix : on ignore desormais les liens `href="#"` dans la boucle de comparaison.

`pages/elevage/irish-cob.html` simplifie : l'image fixe de la section d'intro est remplacee par un carrousel (cheval-prairie + les 3 photos ex-"Nos juments"), et la section "Nos juments" du bas (titre/texte + carrousel dédié) est supprimee — les images ont ete recuperees dans le nouveau carrousel du haut, le texte de cette section (l'historique du troupeau depuis 2014) a ete retire, a recuperer ailleurs si besoin un jour.

Nouveau composant "cartes equipe + modale" (`.team-grid`/`.team-card`/`.modal` dans style.css, `js/team-modal.js`) : grille de cartes photo+nom, le clic ouvre une modale avec la bio complete. Objectif : presenter beaucoup d'individus (chevaux, chiens) sans alourdir la page d'un bloc de texte par individu. Concept redemande a Bastien en session (l'original avait ete fait sur l'index puis retire, mais jamais commite — introuvable dans l'historique git).

Contenu de `irish-cob.html` (section "Nos chevaux", 11 cartes) et de la nouvelle page `pages/elevage/chiens-protection.html` (section "Nos chiens", 5 cartes) inspire de la vraie page crosdeloume.com/à-propos-de-nous (recuperee via Claude in Chrome, le fetch direct de l'URL etant bloque côté outil) : reformule, pas copie.

`pages/elevage/chiens-protection.html` cree en entier sur le pattern irish-cob.html : hero + CTA flottant ("Un chiot vous intéresse ?"), intro carrousel + texte (race Cão de Gado Transmontano, contexte loup), accordeon "Notre selection" (4 items : race, instinct equin, vie en meute, portees reflechies), grille de 5 cartes chiens (Peace'tole, Toltek, Princessa, Uraïï, Vik).

Nouveaux placeholders SVG generes (meme style que les existants, cadre + forme abstraite) : 11 pour les chevaux (`assets/images/pages/elevage/irish-cob/cheval-*.svg`), 5 pour les chiens + 3 pour l'intro de `chiens-protection.html` (`assets/images/pages/elevage/chiens-protection/`).

**Point d'attention pour la prochaine session** : le mount Linux utilise par l'assistant (bash) a affiche un cache perime pour `style.css` et `irish-cob.html` apres leurs modifications (contenu vu par `git status`/`cat` different de la version reelle vue par les outils de fichiers) — les fichiers reels sont corrects (verifies un par un), mais `git status`/`git add`/`git commit` lances depuis l'outil bash de l'assistant dans cette session ne voyaient pas ces changements. A verifier/committer depuis un terminal local (ou une session fraiche) plutot que de faire confiance au bash de l'assistant pour ce commit.

Reste a faire pour l'à-propos : le contenu reel de Lulu a ete recupere (voir notes de session), mais la reorganisation de `pages/a-propos.html` elle-meme n'est pas commencee — equipe humaine (Ludivine, Margot) a garder sur cette page, equipe chevaux/chiens deplacee vers les pages elevage (fait cette session).

## Session du 13/07/2026 (suite) — ajustements cartes equipe + CTA mobile + contact

`.team-cards` passee de grid a flexbox (`display:flex; flex-wrap:wrap; justify-content:center`) : une derniere ligne incomplete (ex. 1 carte seule sur 11 chevaux) se centre maintenant au lieu de rester collee a gauche/etiree (`flex: 0 1 X%` — grow a 0 pour que la carte isolee garde la meme taille que les autres). Paliers par defaut : 2 cartes/ligne (mobile) -> 3 (480px) -> 4 (640px) -> 5 (860px). Nouvelle classe modificatrice `.team-cards--cols-4` (utilisee sur `irish-cob.html` uniquement) qui plafonne a 4 par ligne meme en grand ecran — la page chiens (5 cartes) reste au palier par defaut (5).

`.team-card` transforme en vrai conteneur de carte (fond blanc, `border-radius`, ombre, effet de survol `translateY`) plutot qu'une image+legende flottantes.

CTA flottant (pattern `#hero-cta-anchor` / `#sticky-cta` / `js/sticky-cta.js`, déjà en place sur les pages élevage) étendu aux trois pages d'activité restantes : `visite-ferme.html`, `balade-cheval.html`, `mediation-equine.html` — texte du bandeau adapté à chaque page ("Envie de visiter la ferme ?", "Envie d'une balade ?", "Envie d'une séance ?").

`pages/contact.html` créée : formulaire de façade (nom, email, sujet en select, message) — site d'entraînement, aucun envoi réel. Nouveau `js/contact-form.js` : au submit, `preventDefault()`, désactive tous les champs, affiche un message de confirmation simulé. Nouveau bloc CSS `.contact-section`/`.contact-form`/`.form-field` (colonne info + formulaire, empilés en mobile, côte à côte dès 860px).

Prochaine étape : `pages/a-propos.html` — reste le seul morceau non traité. Contenu réel de Lulu déjà récupéré cette session (voir plus haut) : équipe chevaux/chiens déjà déplacée vers les pages élevage, donc à-propos doit garder qui-sommes-nous (Ludivine + Margot), nos valeurs, et la partie biodiversité/coexistence avec le loup — à restructurer pour ne pas répéter ce qui est déjà couvert ailleurs (élevage, activités).

**Correction ulterieure (meme session)** : le CTA "Une question, une envie de venir nous rencontrer ?" plante juste au-dessus du footer faisait doublon avec le lien Contact deja present dans le footer. Retire (`.page-cta` supprime de `a-propos.html`) et remplace par le meme pattern flottant que les autres pages : CTA dans le hero (`#hero-cta-anchor`, texte "Une question ?") qui se detache en bandeau flottant (`#sticky-cta`) des qu'on scrolle en dessous, via `js/sticky-cta.js` (deja utilise ailleurs, nouveau sur cette page).

## Session du 13/07/2026 (cloture) — merge test -> main via GitHub Desktop

Site complet et fonctionnel : accueil, 4 pages d'activite (visite-ferme, balade-cheval, mediation-equine, projet-loungta), elevage (hub + irish-cob + chiens-protection), a-propos, contact. Toutes les pages testees en direct dans Chrome (localhost:8000) au fil de la session.

Decision prise avec Bastien : on merge `test` dans `main` **en totalite**, y compris `projet-loungta.html` — la regle initiale de PLAN.md ("Loungta reste sur test tant que le contenu n'est pas clarifie") est levee, ce n'est qu'un exercice d'entrainement, pas d'enjeu a proteger un contenu pas encore valide.

Marche a suivre donnee a Bastien pour GitHub Desktop (a faire cote utilisateur, pas par l'assistant — le bash de la session a un souci de cache decouvert plus tot, voir plus haut) : commit du gros paquet de changements sur `test`, push, passage sur `main`, fetch/pull, `Branch > Merge into current branch...` en choisissant `test`, push de `main`. Retour ensuite sur `test` pour la suite du travail.

**Prochaine session** : verifier que le merge/push a bien ete fait (`git log`/`git status` sur les deux branches), puis attaquer les points encore ouverts de ROADMAP.md section 7-8 (test mobile reel, Lighthouse/perf/SEO de base) si Bastien veut continuer.

## Session suivante — fix GitHub Pages (chemins racine-relatifs casses sous /repo/)

Bug signale par Bastien : https://bastienrouger-cloud.github.io/Le-Cros-de-l-Oume-test-/ s'affichait completement casse (aucun style, pas de header/footer, images cassees), alors qu'en local (serveur Python) tout marchait.

**Cause** : GitHub Pages sert un depot "projet" (pas `<compte>.github.io`) sous un sous-dossier `https://<compte>.github.io/<repo>/`, alors que tout le site utilise des chemins racine-relatifs (`/css/style.css`, `/js/main.js`, `/assets/...`, `/pages/...`) — pratique quand le site est servi a la racine d'un domaine (notre serveur Python local, ou un futur nom de domaine personnalise), mais un chemin comme `/css/style.css` pointe alors vers `https://<compte>.github.io/css/style.css` (raçine du **domaine** github.io, pas du repo) → 404/503 partout, y compris le fetch JS du header/footer.

**Fix applique (hybride, pas de reecriture de tout le HTML)** :
- `css/style.css` : les 3 `url('/assets/images/herobackground.jpg')` passes en `url('../assets/images/herobackground.jpg')` — un chemin CSS sans slash au debut se resout par rapport au fichier CSS lui-meme, donc independant de la racine du site, correct partout sans aucune logique supplementaire.
- Chaque fichier HTML (10 au total : `index.html`, les 6 pages de `pages/`, les 3 pages de `pages/elevage/`) : le `<link rel="stylesheet">` et les `<script src>` sont passes en chemins relatifs classiques selon la profondeur du fichier (`css/style.css` a la racine, `../css/style.css` dans `pages/`, `../../css/style.css` dans `pages/elevage/`). Necessaire car ces balises se chargent avant que le moindre JS puisse tourner — impossible de les corriger dynamiquement.
- `js/main.js` : ajout de `REPO_BASE` (calcule automatiquement : vide partout, sauf sur un domaine `*.github.io` ou il vaut `/<premier-segment-de-l-URL>`) et d'une fonction `fixupRootRelative(root)` qui prefixe tous les `href`/`src` commencant par `/` trouves dans `root`. Appelee une fois sur `document` entier au demarrage (corrige les liens/images deja presents dans la page), puis sur le conteneur juste apres l'injection de chaque partial (corrige les liens/images internes a `header.html`/`footer.html`, qui restent ecrits en chemins racine-relatifs classiques — inchanges — puisqu'ils sont injectes a des profondeurs differentes selon la page et ne peuvent pas etre en chemins relatifs fixes).
- Resultat : tout le contenu des pages, les partials, et le reste des scripts (`carrousel.js`, `accordion.js`, `sticky-cta.js`, `team-modal.js`, `team-portrait.js`, `contact-form.js`) restent **inchanges** — seuls `main.js`, `style.css` et les balises `<link>/<script>` de chaque page ont bouge. Teste en local (`python -m http.server`) sur l'index et une page profonde (`pages/elevage/irish-cob.html`) : aucune regression.

**A faire par Bastien** : recommiter/pusher (meme procedure GitHub Desktop que la session precedente : commit sur `test`, push, passer sur `main`, merge `test` dedans, push), puis recharger l'URL GitHub Pages pour confirmer que c'est corrige.

## Session du 13/07/2026 (fin) — pages/a-propos.html (premier jet + itérations) et pages/contact.html finalisée

`pages/contact.html` créée puis retravaillée : hero plein ecran (`.page-hero--tall .page-hero--photo`, nouvelle variante avec l'image bien visible — degrade sombre leger au lieu du degrade creme quasi opaque du `.page-hero` standard, texte en blanc) et encart `.contact-card` (fond blanc semi-transparent flouté + ombre) qui porte coordonnées + formulaire, flottant sur la photo. Footer retiré sur cette page uniquement (`#footer-placeholder` simplement absent du HTML, `main.js` ne fait rien si l'élément n'existe pas). Formulaire de façade : `js/contact-form.js` bloque le submit reel, désactive les champs, affiche un message de confirmation simulé — site d'entraînement, aucun envoi reel.

`pages/a-propos.html` créée en plusieurs passes :
- Premier jet : hero, `.page-intro`, "Qui sommes-nous" (texte+image, Ludivine + Margot), accordéon "Nos valeurs" (4 items), `.section-lead` "Biodiversité et coexistence" (lien vers chiens-protection), `.page-cta` final.
- Ajout section "Notre équipe" : portraits ronds (nouveau composant `.team-portraits`/`.team-portrait`/`.team-portrait-circle`/`.team-portrait-overlay` dans style.css, nouveau `js/team-portrait.js`) — description en overlay au survol/focus clavier (CSS pur `:hover`/`:focus-visible`), et au tap sur mobile via la classe `.is-active` basculee en JS (pas de vrai `:hover` sur tactile). Nouveaux placeholders `assets/images/pages/a-propos/humain-ludivine.svg` et `humain-margot.svg`.
- Refonte de "Nos valeurs" : l'accordéon 4 items + le bloc `.section-lead` biodiversité sont remplacés par 3 cartes `.team-card` (reutilisation du composant deja construit pour chevaux/chiens) → 3 modales ("Nos valeurs", "Connexion et harmonie", "Gestion de la biodiversité"), inspirees de la structure reelle du site de Lulu (qui a ces 3 blocs distincts avec liens "en savoir plus"). La modale biodiversité contient le lien vers `pages/elevage/chiens-protection.html` (recupere depuis l'ancien `.section-lead`, qui n'existe donc plus sur cette page). Nouveaux placeholders `valeur-bienetre.svg` (coeur), `valeur-connexion.svg` (spirale), `valeur-biodiversite.svg` (feuille). Script `js/accordion.js` retire de la page (plus aucun accordéon dessus), remplace par `js/team-modal.js`.

Le site est maintenant complet : accueil, 4 pages d'activité (visite-ferme, balade-cheval, mediation-equine — CTA flottant ajoute sur ces 3 cette session —, projet-loungta resté sur `test`), elevage (hub + irish-cob + chiens-protection), a-propos, contact. Reste a faire, si Bastien veut continuer : verifier/committer les changements (voir avertissement cache bash plus haut), tester sur mobile reel, passe SEO/perf de base (section 7-8 de ROADMAP, toujours pas cochees).
