# Le Cros de l'Oume — Site d'entraînement

Projet perso pour continuer à pratiquer après HummingCob. Reproduction (non officielle, juste pour toi) du site d'une ferme équestre qui propose plusieurs activités. Pas de mise en prod prévue, juste un support d'apprentissage.

## Workflow

Contrairement à HC (Drive + un seul PC), ici tu bosses seul depuis plusieurs machines. Donc :

- 1 repo GitHub, source de vérité.
- Un dossier local sur ce PC, synchronisé avec le repo via git (pas Drive).
- Plus tard : `git clone` du même repo sur le 2e PC. Tu push/pull des deux côtés, git gère la synchro. Plus besoin de Drive.
- Deux branches : `main` (stable, ce qui "marche") et `test` (ou `dev`, tu bosses dedans, tu merges vers `main` quand une étape est validée).

## Structure de dossiers

```
/
├── index.html              → page d'accueil, à part, liste les activités
├── pages/
│   ├── activite-1.html
│   ├── activite-2.html
│   └── ...
├── css/
│   └── style.css           → commun à toutes les pages
├── js/
│   └── main.js             → carrousel, menu, inclusion header/footer
├── partials/
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── images/
│   └── icons/
└── PLAN.md
```

## Sur ta question : header/footer dans le style.css ?

Non — le CSS ne contient pas de HTML, donc header/footer ne peuvent pas "vivre" dans style.css. Ce que style.css doit contenir : le style commun (couleurs, polices, carte modèle, carrousel, header, footer — le *style* de ces éléments, pas leur contenu).

Pour le HTML du header/footer répété sur chaque page, trois options :

1. **Dupliquer le HTML** dans chaque page. Simple, zéro dépendance, mais tu dois répéter la même modif partout si tu changes le menu.
2. **Inclusion via JS** (`fetch('partials/header.html')` injecté dans un `<div id="header"></div>`) — un seul fichier à modifier, mais ajoute un peu de JS et un flash de contenu au chargement.
3. **Générateur statique** (11ty, Jekyll, Hugo) qui gère les includes nativement — plus propre, mais plus lourd à apprendre en plus du reste.

Pour un projet d'entraînement en HTML/CSS/JS pur, je recommande l'option 2 : ça t'entraîne à manipuler le DOM en JS, sans la lourdeur d'un générateur. On part sur ça sauf si tu préfères autre chose.

## Pages types

- **index.html** : à part, page d'accueil de la ferme, renvoie vers les pages d'activités.
- **pages/activite-X.html** : une page par activité (élevage, pension, cours équitation, etc. — à définir avec ton schéma).

Contenu détaillé des pages d'activités : à définir une fois que tu m'auras montré ton dessin.

## Prochaines étapes

1. Init du repo git local + structure de dossiers (squelette vide).
2. Toi : création du repo GitHub (vide, sans README auto-généré).
3. Connexion du dossier local au repo distant, push de `main` et `test`.
4. Squelette HTML/CSS de base (style.css, header/footer partagés).
5. Pages types une fois ton dessin reçu.
