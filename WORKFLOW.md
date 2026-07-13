# Pense-bête workflow git

## En arrivant sur une machine

```
git checkout test
git pull
```

## Pendant que tu codes

Rien de spécial, tu modifies tes fichiers normalement.

## Pour sauvegarder ton avancée (sur `test`)

```
git add .
git commit -m "message court décrivant ce qui a changé"
git push
```

## En partant d'une machine

```
git push
```

(déjà fait si tu as suivi l'étape du dessus — juste le réflexe à vérifier avant de fermer le capot)

## Basculer entre les branches

```
git checkout main    # version stable
git checkout test    # version de travail
```

## Une fois une étape validée : merge test → main

```
git checkout main
git pull
git merge test
git push
```

Puis retour au travail :

```
git checkout test
```

## Voir une branche sur GitHub (navigateur)

https://github.com/bastienrouger-cloud/Le-Cros-de-l-Oume-test-
→ menu déroulant en haut à gauche de la liste des fichiers → choisir `main` ou `test`.

## Tester le site en local (obligatoire depuis l'étape JS)

Ne pas ouvrir `index.html` en double-clic — ça ne marche plus depuis qu'on a le header/footer en partials chargés en JS (`fetch`) et des liens en chemins racine-relatifs (`/pages/...`, `/assets/...`).

Dans le terminal, à la racine du projet :

```
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000 dans le navigateur. `Ctrl+C` dans le terminal pour arrêter le serveur.

Pourquoi : le navigateur bloque `fetch()` sur des fichiers ouverts en `file://` (CORS), et les chemins commençant par `/` doivent être interprétés par rapport à la racine du projet — ce qui ne fonctionne que si un serveur sert les fichiers (même un mini serveur local comme celui-ci). C'est très exactement ce que fait un vrai serveur web en production (Apache, Nginx...), en version jouet sur ta machine, accessible seulement depuis `localhost`.

## Règle d'or

`git pull` en arrivant, `git push` en partant. Sur chaque machine, à chaque session.
