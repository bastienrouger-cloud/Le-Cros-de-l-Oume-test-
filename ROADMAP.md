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

- [ ] Structure sémantique complète (header, nav, main, sections, footer) — pas commencé.
- [ ] Header/footer en partials, inclus via JS (`fetch`) plutôt que dupliqués sur chaque page — décision prise, pas encore implémentée.
- [ ] Contenu réel dans le HTML, pas de lorem ipsum.

## 5. CSS ensuite

- [ ] Mobile-first.
- [ ] Variables CSS pour couleurs/fonts dès le départ (palette à définir — pas encore choisie pour ce projet).
- [ ] Layout d'abord (grid/flexbox), détails ensuite.

## 6. Interactivité (JS) si besoin

- [ ] Formulaire de contact (pas encore décidé si Formspree, Netlify Forms, ou autre — projet d'entraînement donc pas d'enjeu réel de destinataire).
- [ ] Menu mobile.
- [ ] Carrousel d'images statique en JS (remplace le widget Instagram du vrai site).

## 7. Responsive + tests

- [ ] Test sur mobile réel.
- [ ] Vérif navigateurs courants.

## 8. Perf + SEO de base

- [ ] Compression images, meta tags, alt text.
- [ ] Lighthouse.

## 9. Déploiement

- [ ] Hébergement : pas nécessaire ici (pas de client, pas de mise en prod), mais on peut simuler avec GitHub Pages pour s'entraîner à ce bout de la chaîne si tu veux.
- [ ] DNS / SSL : sans objet pour ce projet, sauf si tu veux pousser l'exercice jusque-là.

## Où on en est (à jour au 13/07/2026)

Étapes 1 à 3 globalement posées. Prochaine étape concrète : squelette HTML sémantique de `index.html` + `partials/header.html` et `footer.html`, sur la branche `test`.
