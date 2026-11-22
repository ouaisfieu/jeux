---
layout: layouts/page.njk
title: Précédents belges
description: Onze épisodes de la politique belge, du pacte scolaire de 1958 aux 613 jours bruxellois, relus avec les outils de la théorie des jeux pour éclairer la crise de 2026.
chapeau: Onze épisodes de la politique belge, du pacte scolaire de 1958 à la formation bruxelloise de 2026, relus avec les mêmes outils. Ils ne disent pas comment finira la crise actuelle. Ils montrent quels mécanismes ont déjà joué, et dans quelles conditions.
fil: false
---

## Les cas

<div class="tableau">
<table class="table-texte">
<caption>Onze précédents, du plus ancien au plus récent</caption>
<thead><tr><th scope="col">Cas</th><th scope="col">Période</th><th scope="col">Ce qu'il enseigne</th></tr></thead>
<tbody>
{%- for c in collections.cas %}
<tr><td><a href="{{ c.url }}">{{ c.data.title }}</a></td><td>{{ c.data.periode }}</td><td>{{ c.data.lecon }}</td></tr>
{%- endfor %}
</tbody>
</table>
</div>

## Ce que les précédents ont en commun

Trois mécanismes reviennent d'un cas à l'autre.

**L'attente bon marché dure longtemps.** Les 541 jours de 2010-2011 et les 613 jours bruxellois ont un point commun : un gouvernement en affaires courantes continuait de faire fonctionner l'État. Quand attendre coûte peu, chacun attend. Les dénouements sont venus d'un choc extérieur (la dégradation de novembre 2011) ou d'une défection (Anders à Bruxelles).

**Les menaces d'exclusion échouent faute de remplaçant.** En 2024 comme en 2026, le bloc des quatre n'a pas pu se passer de Vooruit. Les coalitions qui ont violé une convention, comme la « kamikaze » de 2014, disposaient d'une majorité confortable à la Chambre. L'Arizona sans Vooruit n'en aurait pas.

**Le Roi tient en suspens, et cela compte.** En 2011, en 2018, en 2024 et en 2026, le Palais a suspendu ou refusé une démission ou une demande de décharge. Le geste ne règle rien par lui-même. Il donne du temps, fixe des dates et offre une sortie honorable (voir [le Roi comme dispositif de coordination](/modeles/signaux-et-reputation/#le-roi-comme-dispositif-de-coordination)).

## Les limites de la comparaison

Les précédents éclairent, ils ne prédisent pas. Chaque épisode a eu ses joueurs, ses règles et son contexte. Plusieurs portaient sur des questions communautaires, alors que la crise de 2026 est budgétaire et divise la coalition sur un axe gauche-droite. Surtout, nous avons choisi ces cas parce qu'ils illustraient des mécanismes connus. Un autre choix aurait pu mettre en avant d'autres leçons. C'est une limite de toute lecture par analogie, que nous signalons aussi dans la page [Méthode](/methode/).
