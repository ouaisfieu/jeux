---
title: Les modèles
description: Huit modèles de la théorie des jeux appliqués à la politique belge et à la crise budgétaire de l'automne 2026, avec ce que chacun éclaire et ce qu'il laisse dans l'ombre.
chapeau: Huit outils de la théorie des jeux, chacun appliqué à la crise. Aucun ne suffit seul. Chacun éclaire une facette, et chacun a ses angles morts, que nous signalons à chaque fois.
fil: false
---

## Ce qu'est un modèle ici

La théorie des jeux étudie les situations où le résultat de ce que fait chacun dépend de ce que font les autres. Elle ne suppose pas que les responsables politiques sont froids ou cyniques. Elle suppose seulement qu'ils ont des objectifs et qu'ils tiennent compte, pour les atteindre, de ce que les autres vont probablement faire.

Un modèle est une simplification volontaire. Il retient quelques traits d'une situation, deux joueurs, deux choix, un ordre de préférence, et en tire des conséquences. Sa valeur ne tient pas à son réalisme mais à ce qu'il permet de voir : pourquoi une attente coûteuse peut être rationnelle, pourquoi une menace bruyante peut ne rien peser, pourquoi une coalition où chacun peut bloquer est aussi une coalition dont personne ne peut sortir.

Chaque page suit le même chemin : l'intuition, le modèle, son application à la crise, puis ce qu'il ne dit pas. Les passages techniques sont repliés et peuvent être sautés.

<ul class="liste-modeles">
{%- for m in collections.modeles %}
<li><a href="{{ m.url }}">{{ m.data.title }}</a><p><em>{{ m.data.question }}</em> {{ m.data.resume }}</p></li>
{%- endfor %}
</ul>

## Ce que chaque modèle dit de la crise

<div class="tableau">
<table class="table-texte">
<caption>Les huit lectures de la crise, côte à côte</caption>
<thead><tr><th scope="col">Modèle</th><th scope="col">Ce qu'il éclaire</th><th scope="col">Ce qu'il laisse attendre</th><th scope="col">Sa principale limite ici</th></tr></thead>
<tbody>
<tr><td><a href="/modeles/poule-mouillee/">Poule mouillée</a></td><td>Le durcissement des déclarations ; le « qui cède le premier »</td><td>Un dénouement par la concession d'un camp, ou une sortie commune offerte par un tiers</td><td>Un jeu en un coup, alors que la crise dure</td></tr>
<tr><td><a href="/modeles/guerre-usure/">Guerre d'usure</a></td><td>La durée du blocage ; le rôle des douzièmes</td><td>Un enlisement tant qu'aucun choc ne rend l'attente plus coûteuse</td><td>Dit mal quand l'attente s'arrête</td></tr>
<tr><td><a href="/modeles/marchandage/">Marchandage</a></td><td>Ce qui fait pencher le partage : patience, repli, droit de proposer</td><td>Un compromis proche du milieu, construit comme un paquet</td><td>Suppose un gâteau fixe et une information complète</td></tr>
<tr><td><a href="/modeles/jeux-imbriques/">Jeux imbriqués</a></td><td>Des refus coûteux au gouvernement mais rentables face aux électeurs</td><td>Un accord seulement s'il peut être vendu dans chaque arène</td><td>Les contraintes de chaque parti sont invisibles</td></tr>
<tr><td><a href="/modeles/acteurs-de-veto/">Acteurs de veto</a></td><td>Deux pôles, le MR et Vooruit ; un statu quo qui arrange les deux</td><td>Des changements limités, une forte inertie</td><td>Prédit la stabilité, pas la crise</td></tr>
<tr><td><a href="/modeles/coalitions/">Coalitions</a></td><td>Pourquoi chacun peut bloquer sans pouvoir partir</td><td>Pas de rupture volontaire, faute de meilleure option</td><td>Des motivations qu'on ne peut pas observer</td></tr>
<tr><td><a href="/modeles/signaux-et-reputation/">Signaux et blâme</a></td><td>L'usure des démissions ; le rôle du Roi ; le partage du blâme</td><td>Un blocage stable tant que le blâme reste partagé</td><td>Les intentions restent hors de portée</td></tr>
<tr><td><a href="/modeles/budget-commun/">Budget et bien commun</a></td><td>Pourquoi un diagnostic partagé ne produit pas d'accord ; le contrat de coalition</td><td>Une pression européenne réelle mais trop lente pour imposer une date</td><td>Le conflit est idéologique, pas clientéliste</td></tr>
</tbody>
</table>
</div>

Les modèles ne se contredisent pas tant qu'ils se relaient. La poule mouillée décrit le face-à-face, la guerre d'usure sa durée, le marchandage son contenu, les jeux imbriqués ses raisons cachées, les acteurs de veto et les coalitions le cadre qui rend la sortie si difficile. Les [outils interactifs](/outils/) permettent d'en manipuler trois, et l'[outil de scénarios](/outils/scenarios/) combine leurs enseignements en probabilités explicites, que vous pouvez modifier.

## Ce que ces modèles ne voient pas

Tous partagent trois angles morts, qu'il faut garder en tête.
- **Les préférences sont devinées.** Nous déduisons ce que veulent les partis de leurs déclarations, de leurs votes et des sondages. Un bluff et une conviction produisent les mêmes signaux jusqu'au dénouement.
- **Les personnes comptent.** Fatigue, rancunes, confiance ou méfiance entre dirigeants pèsent dans une négociation. Les modèles les rangent dans les « coûts » et les « gains », ce qui les aplatit.
- **Le fond disparaît.** Lire la crise comme un jeu, c'est risquer d'oublier qu'elle porte sur la santé, les pensions et l'impôt. Nous en discutons dans la page [Méthode](/methode/).
