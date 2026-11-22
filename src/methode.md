---
layout: layouts/page.njk
title: Méthode
description: Qui écrit ce site, le rôle de l'intelligence artificielle, la hiérarchie des sources, l'échelle de fiabilité, les limites de la théorie des jeux et le risque de performativité.
chapeau: Comment ce site a été fait, par qui, avec quels outils, et ce qu'il ne peut pas prétendre. Une lecture stratégique de la politique n'est utile que si elle dit d'où elle parle.
---

## Ce que fait ce site

Ce site applique la théorie des jeux à la politique belge, avec un accent sur la crise budgétaire de l'automne 2026. Il part de deux documents de travail arrêtés au 18 novembre 2026, les vérifie affirmation par affirmation (voir [Vérification](/verification/)) et les complète par une recherche documentaire.

Sa posture se veut analytique et équilibrée. Il cherche à expliquer les comportements des acteurs, pas à les juger, et ne prend pas position sur le contenu du budget. Il ne recommande aucune stratégie à aucun parti. Quand il propose des probabilités, il les présente comme des hypothèses réglables, pas comme des prévisions.

## Qui écrit ce site

L'auteur a choisi de rester anonyme. Ce choix a un coût pour le lecteur, qui ne peut pas juger les intérêts de celui qui écrit. Nous tentons de le compenser par une transparence complète sur tout le reste : chaque fait est sourcé, chaque calcul est reproductible, et le code du site comme son historique sont publics sur [le dépôt GitHub]({{ site.depot }}).

Une information doit cependant être portée à votre connaissance. Le compte qui publie ce site publie aussi un agenda de mobilisations sociales. L'auteur peut donc avoir une sympathie pour les mouvements qui manifestent contre l'austérité, dont la manifestation du 23 novembre. L'un des documents de travail citait d'ailleurs cet agenda comme source ; nous l'avons écarté, car une telle citation serait circulaire. Gardez ce biais possible à l'esprit en lisant nos analyses, et signalez-nous tout passage qui vous paraîtrait pencher d'un côté.

## Le rôle de l'intelligence artificielle

La recherche documentaire, la vérification et la rédaction de ce site ont été réalisées avec l'aide d'une intelligence artificielle, Claude, développée par Anthropic, sous direction humaine. Concrètement :
- l'outil a recherché et lu les sources, vérifié les affirmations des documents de travail, calculé les indices de pouvoir et rédigé les textes ;
- les choix de posture, de langue, de périmètre et de publication ont été faits par l'auteur ;
- les contributions de l'outil sont signalées comme coautrices dans l'historique du dépôt.

Une IA peut se tromper, y compris avec assurance. C'est une raison supplémentaire pour laquelle chaque fait renvoie à une source que vous pouvez consulter vous-même. Si une source ne dit pas ce que nous lui faisons dire, c'est une erreur, et nous voulons la corriger.

## Comment nous travaillons

**Les sources primaires d'abord.** Pour les règles et les chiffres, nous remontons aux documents de la Chambre, à la Constitution, aux publications de la Commission européenne. Pour les faits datés, nous privilégions la presse de référence et, pour novembre 2026, le direct horodaté de la VRT.

**Les calculs refaits.** Les sièges, les seuils et les indices de pouvoir ont été recalculés à partir de la composition officielle de la Chambre. Le script est public et ses résultats téléchargeables (voir [Arithmétique](/arithmetique/#reproduire-le-calcul)).

**Les montants avec prudence.** Les chiffres de la négociation viennent de fuites, souvent anonymes. Nous les donnons avec leur source et signalons quand ils divergent.

**Les citations vérifiées ou écartées.** Une citation que nous n'avons pas retrouvée dans une source accessible n'est pas reprise comme telle.

## L'échelle de fiabilité

Chaque source porte une lettre, visible dans les notes et dans la page [Sources](/sources/).

<div class="tableau">
<table class="table-texte">
<caption>Les cinq niveaux de fiabilité</caption>
<thead><tr><th scope="col">Lettre</th><th scope="col">Ce qu'elle recouvre</th><th scope="col">Usage sur ce site</th></tr></thead>
<tbody>
<tr><td><span class="grade grade-A">A</span></td><td>Documents officiels, textes juridiques, publications scientifiques évaluées par les pairs, analyses du CRISP</td><td>Fondent les règles, les chiffres et les modèles</td></tr>
<tr><td><span class="grade grade-B">B</span></td><td>Presse de référence, agences, médias publics, directs horodatés</td><td>Fondent les faits datés ; prudence quand elles rapportent des sources anonymes</td></tr>
<tr><td><span class="grade grade-C">C</span></td><td>Encyclopédies, agrégateurs sérieux, reprises de dépêches</td><td>Repérage et contexte ; jamais seules pour un fait discuté</td></tr>
<tr><td><span class="grade grade-D">D</span></td><td>Sources non signées, militantes ou invérifiables</td><td>Écartées comme appui</td></tr>
<tr><td><span class="grade grade-I">I</span></td><td>Documents internes de travail</td><td>Points de départ à vérifier, jamais preuves</td></tr>
</tbody>
</table>
</div>

## Les limites de la théorie des jeux

La théorie des jeux est une manière de penser, pas une machine à prédire. Ses limites sont rappelées dans chaque page de [modèle](/modeles/) ; en voici le résumé.
- **Les préférences sont devinées.** Nous déduisons ce que veulent les acteurs de leurs déclarations, de leurs votes et des sondages. Un bluff et une conviction produisent les mêmes signaux jusqu'au dénouement.
- **Plusieurs équilibres sont possibles.** Beaucoup de jeux, dont la poule mouillée, en ont plusieurs. Le modèle dit alors ce qui est possible, pas ce qui arrivera.
- **Le risque de l'explication après coup.** Il est toujours possible de trouver un modèle qui rend compte d'un comportement déjà observé. Un modèle n'est utile que s'il aurait pu se tromper. C'est pourquoi l'outil de scénarios rend ses hypothèses explicites et modifiables.
- **Les probabilités sont des jugements.** Les chiffres de l'[outil de scénarios](/outils/scenarios/) ne sortent pas d'un calcul objectif. Ce sont nos estimations, à partir des précédents et des signaux disponibles. D'autres analystes, avec les mêmes informations, en retiendraient d'autres.
- **Les personnes et le fond disparaissent.** Les modèles rangent la fatigue, la confiance ou la rancune dans des « coûts », et le contenu des politiques dans des « gains ». Ils aplatissent ce qui, pour les citoyens, est l'essentiel.

## Le risque de performativité

Lire la politique comme un jeu n'est pas neutre. Joseph Cappella et Kathleen Hall Jamieson ont montré que la couverture stratégique de la politique, où l'on compte les coups et les gagnants, nourrit le cynisme des citoyens[^cappella]. Ce site en relève. Nous tentons d'en limiter l'effet de trois manières : en rappelant ce qui est en jeu sur le fond (la santé, les pensions, la fiscalité), en évitant de juger les acteurs, et en signalant que les comportements que nous décrivons comme « stratégiques » peuvent aussi être sincères.

L'analyse peut aussi devenir un coup. Un acteur peut citer une lecture stratégique pour justifier sa fermeté ou accuser un adversaire. Nous ne pouvons pas l'empêcher, mais nous refusons de proposer une stratégie à quiconque.

## Un site daté

Les informations de ce site sont arrêtées au {{ site.etatTexte }}. Il n'est pas mis à jour en continu. Chaque page indique son état, et la chronologie distingue ce qui est advenu de ce qui est seulement annoncé. Lisez-le comme une analyse à une date donnée, pas comme un suivi en direct.

## Signaler une erreur

Une erreur, une source mal citée, un biais : vous pouvez le signaler en ouvrant un ticket sur [le dépôt du site]({{ site.depot }}/issues). Les corrections apparaîtront dans l'historique public du dépôt.

## Technique

Le site est statique : des pages HTML générées à l'avance avec Eleventy, hébergées sur GitHub Pages. Il ne contient aucun traceur, aucun cookie et aucune ressource externe ; les polices (Spectral et Archivo) sont hébergées avec le site. La recherche fonctionne dans votre navigateur, grâce à un index construit avec Pagefind. Les outils interactifs fonctionnent sans connexion à un serveur, et toutes les pages restent lisibles sans JavaScript.

[^cappella]: {% src "cappella-jamieson-1997" %}
