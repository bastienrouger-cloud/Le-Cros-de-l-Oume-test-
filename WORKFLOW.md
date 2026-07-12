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

## Règle d'or

`git pull` en arrivant, `git push` en partant. Sur chaque machine, à chaque session.
