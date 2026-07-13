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

## 5. CSS ensuite

- [x] Mobile-first — `css/style.css`.
- [x] Variables CSS pour couleurs/fonts : crème / vert sauge-forêt / terracotta / charbon, Playfair Display + Nunito Sans.
- [x] Layout d'abord (grid/flexbox), détails ensuite — cartes en flexbox (centrage auto de la dernière ligne), nav responsive.

## 6. Interactivité (JS) si besoin

- [ ] Formulaire de contact (pas encore décidé si Formspree, Netlify Forms, ou autre — projet d'entraînement donc pas d'enjeu réel de destinataire). À faire avec `pages/contact.html`.
- [x] Menu mobile — hamburger sous 860px, branché en JS (`initMobileNav`).
- [ ] Carrousel d'images statique en JS : scroll horizontal natif fait, flèches/points de navigation pas encore ajoutés.

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

Étapes 1 à 5 posées pour `index.html`. Étape 6 en partie faite (partials + menu mobile), reste : navigation carrousel et formulaire contact (lié à `pages/contact.html`, pas encore créée).

Prochaine étape concrète : passer aux pages types — dupliquer le squelette de `index.html` (header/footer/style déjà externalisés, donc léger à dupliquer) pour créer la première page d'activité, ex. `pages/visite-ferme.html`, et valider le pattern avant de répliquer sur les autres.
