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

`pages/balade-cheval.html` et `pages/mediation-equine.html` crees sur ce meme pattern, contenu inspire (reformule, pas copie) du vrai site de Ludivine. Photos encore en placeholder.svg partout.

`pages/elevage/index.html` cree : hub avec 2 grandes cartes pleine image (section `.showcase`), inspire de la section "Our Games" du site de Star Citizen (badge, degrade sombre, texte en bas). Pointe vers `irish-cob.html` et `chiens-protection.html`, pas encore crees.

`pages/projet-loungta.html` cree en version minimale (header/footer + message "page en cours de preparation") — rappel : reste sur la branche `test` uniquement, pas mergee sur `main` tant que le contenu reel n'est pas clarifie.

Prochaine étape concrète : `pages/elevage/irish-cob.html`, `pages/elevage/chiens-protection.html`, `pages/a-propos.html`, `pages/contact.html` (avec vrai formulaire).
