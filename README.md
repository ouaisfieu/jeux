# Jeux de pouvoir

La théorie des jeux appliquée à la politique belge, avec un accent sur la crise budgétaire de la coalition Arizona (automne 2026). Site statique, sourcé, sans traceur ni ressource externe.

Site publié : https://ouaisfieu.github.io/jeux/

État des informations : dimanche 22 novembre 2026, 5 h (heure de Bruxelles).

## Contenu

| Rubrique | Fichiers |
|---|---|
| Accueil, crise, arithmétique | `src/index.njk`, `src/crise.md`, `src/arithmetique.md` |
| Huit modèles | `src/modeles/*.md` |
| Onze précédents belges | `src/histoire/*.md` |
| Chronologie filtrable | `src/chronologie.njk`, données dans `src/_data/chronologie.json` |
| Vérification des documents de travail | `src/verification.njk`, données dans `src/_data/verification.json` |
| Sources et échelle de fiabilité | `src/sources.njk`, données dans `src/_data/sources.json` |
| Outils interactifs | `src/outils/*.njk`, scripts dans `src/assets/js/` |
| Méthode, glossaire, recherche | `src/methode.md`, `src/glossaire.md`, `src/recherche.njk` |

## Construire le site

Il faut Node.js 22 ou plus récent.

```sh
npm ci
npm run build    # Eleventy, puis l'index de recherche Pagefind
npm run serve    # serveur local avec rechargement (sans index de recherche)
```

Le site est construit dans `_site/`. Sur GitHub Pages, il est servi sous `/jeux/` : la variable `PATH_PREFIX=/jeux/` est fixée par le flux de déploiement (`.github/workflows/deploy.yml`), qui publie automatiquement chaque modification de la branche `main`.

## Mettre à jour

- **Date d'état** : `src/_data/site.json` (`etat` et `etatTexte`).
- **Événements** : `src/_data/chronologie.json`. Chaque événement cite des identifiants de `sources.json`.
- **Sources** : `src/_data/sources.json`. Une note de bas de page s'écrit `{% src "identifiant" %}` ; la construction échoue si l'identifiant n'existe pas.
- **Composition de la Chambre et indices de pouvoir** : modifier la table `PARTIES` de `scripts/power.py`, puis lancer `python3 -I scripts/power.py` depuis la racine du dépôt. Le script réécrit `src/_data/pouvoir.json` et sa copie publique `src/data-public/pouvoir.json`.
- **Scénarios** : `src/_data/scenarios.json` (questions, valeurs par défaut, préréglages). Les formules sont dans `src/assets/js/scenarios.js` et, pour l'affichage sans JavaScript, dans le filtre `scenarioCalc` de `eleventy.config.js`.

## Principes

- Chaque fait renvoie à une source, notée de A à D (ou I pour les documents de travail internes) selon l'échelle décrite dans la page Méthode.
- Toutes les pages restent lisibles sans JavaScript ; les outils sont une amélioration progressive.
- Aucune ressource externe : polices auto-hébergées, politique de sécurité du contenu stricte, aucun script en ligne.

## Transparence

Le site est publié anonymement. La recherche, la vérification et la rédaction ont été réalisées avec l'aide d'une intelligence artificielle (Claude, d'Anthropic) sous direction humaine ; les commits correspondants portent la mention de coautorat. Les erreurs peuvent être signalées dans les [tickets du dépôt](https://github.com/ouaisfieu/jeux/issues).
