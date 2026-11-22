---
title: Former, garder, remplacer une coalition
description: Les théories des coalitions (Riker, Gamson, Strøm, Laver et Shepsle, Lupia et Strøm) appliquées à l'Arizona, ses options de rechange et les incitations à rompre ou à rester.
chapeau: Pourquoi cinq partis et pas quatre ? Pourquoi chacun peut-il bloquer sans pouvoir partir ? Les théories des coalitions expliquent ce paradoxe de l'Arizona, une coalition où chacun a un veto crédible mais aucune porte de sortie attrayante.
resume: Une coalition minimale gagnante, sans majorité de rechange crédible. Pourquoi chacun peut bloquer, et pourquoi personne n'a intérêt à partir.
question: Qui a intérêt à rompre ?
---

{%- set J3 = pouvoir.jeux.double_gouvernable -%}

## Pourquoi cinq partis

En 1962, William Riker formule le « principe de taille » : des joueurs rationnels forment des coalitions juste assez grandes pour gagner, car chaque membre superflu réduit la part des autres[^riker]. Une coalition dont chaque membre est indispensable est dite « minimale gagnante ».

L'Arizona en est une. Avec 80 sièges sur 150, elle perd sa majorité si n'importe lequel de ses cinq partis s'en va. Elle ne pouvait guère être plus petite : une fois exclus le Vlaams Belang et le PVDA-PTB, les quatre plus grands partis restants ne totalisent que 72 sièges. Toute majorité gouvernable compte au moins cinq partis (voir [Arithmétique](/arithmetique/)).

William Gamson avait proposé un an plus tôt une autre règle : chaque partenaire obtient une part des gains proportionnelle aux ressources qu'il apporte[^gamson]. Appliquée aux sièges, elle donnerait à la N-VA plus du quart des gains et au CD&V moins d'un septième. Mais dans une coalition minimale gagnante, les ressources comptent moins que la nécessité. Chacun des cinq peut faire tomber le gouvernement, et dans le jeu interne à la coalition, la valeur de Shapley de chacun vaut exactement un cinquième.

Le rapport de force change dès qu'on regarde l'ensemble des coalitions possibles, et pas seulement celle qui gouverne. Si l'on exige une majorité dans les deux groupes linguistiques, la N-VA pèse {{ J3.shapley[J3.joueurs.indexOf("N-VA")] | pct }} du pouvoir de vote, Vooruit et le CD&V {{ J3.shapley[J3.joueurs.indexOf("Vooruit")] | pct }} chacun, et le MR, le PS et Les Engagés {{ J3.shapley[J3.joueurs.indexOf("MR")] | pct }} chacun. Côté néerlandophone, les sièges sont rares, donc chers ; côté francophone, deux partis sur trois suffisent toujours.

## Ce que veulent les partis

Kaare Strøm a montré que les partis poursuivent trois objectifs qui se contrarient : les postes, les politiques et les voix[^strom]. Un parti qui ne viserait que les postes resterait au gouvernement à tout prix. Un parti soucieux de ses voix peut préférer l'opposition, si gouverner l'oblige à porter des mesures que ses électeurs rejettent. Les sondages de septembre 2026 donnent à cet arbitrage une acuité particulière, puisque quatre partenaires sur cinq sont en recul ou devancés dans leur région (voir [la crise](/crise/#ce-que-disent-les-sondages)).

Michael Laver et Kenneth Shepsle ajoutent que les ministères ne sont pas que des trophées[^laver]. Chaque ministre dispose d'une large marge dans son domaine, et la promesse d'un parti n'est crédible que s'il tient le ministère qui l'exécutera. La remarque éclaire la crise : les économies que refuse Vooruit concernent en bonne partie les soins de santé, que gère son vice-Premier ministre Frank Vandenbroucke. Lui demander ces économies, c'est lui demander de les exécuter lui-même.

## Rompre ou rester

Arthur Lupia et Kaare Strøm ont modélisé la fin des coalitions comme un calcul[^lupia]. Un parti rompt quand il espère faire mieux dehors, soit par des élections anticipées, soit dans une autre coalition. Ce calcul dépend des sondages, mais aussi des règles de dissolution.

En Belgique, ces règles rendent la rupture peu rentable.
- **Personne ne peut provoquer seul des élections.** La dissolution exige un vote de la Chambre à la majorité absolue, dans des cas limités (article 46 de la Constitution)[^art46].
- **Une législature anticipée serait courte.** Elle s'arrêterait aux élections européennes de juin 2029. Des élections début 2027 n'ouvriraient qu'un mandat d'environ deux ans et demi[^art46].
- **Les sondages sont défavorables.** Le Vlaams Belang devance la N-VA en Flandre, et le PS a repris la première place au MR en Wallonie[^sondage].

Le modèle prédit donc que personne n'a intérêt à rompre. Une rupture serait soit une erreur de calcul, soit le produit d'une dynamique interne à un parti (voir [les jeux imbriqués](/modeles/jeux-imbriques/)).

## Les coalitions de rechange

Le calcul de rupture dépend aussi des coalitions qui pourraient remplacer l'actuelle. La page [Arithmétique](/arithmetique/#les-coalitions-de-rechange) les passe en revue. En résumé :
- remplacer Vooruit ou le CD&V par Anders ne donne pas de majorité néerlandophone, et pas toujours de majorité tout court ;
- remplacer le MR ou Les Engagés par le PS fonctionnerait sur le papier, mais le PS répète depuis 2024 qu'il ne servira pas de roue de secours[^ps] ;
- le cordon sanitaire autour du Vlaams Belang, et le refus de gouverner avec le PVDA-PTB, réduisent encore le champ[^biard].

L'Arizona est donc verrouillée. C'est son paradoxe : chaque partenaire dispose d'un veto crédible, puisqu'il est indispensable, mais d'aucune menace de départ crédible, puisque partir lui coûterait plus que rester. Les crises s'y règlent par l'usure et le marchandage, pas par le remplacement.

## Un pays de formations longues

Lieven De Winter et Patrick Dumont décrivent la formation des coalitions belges comme d'une complexité exceptionnelle, au point de se demander si elle ne menace pas le régime lui-même[^dewinter]. Les durées parlent : 541 jours après les élections de 2010, 494 jours après celles de 2019, 613 jours pour le gouvernement bruxellois formé en février 2026[^durees]. Le Vlaams Belang a même proposé, en 2024, une dissolution automatique en cas de formation interminable[^vb]. Cette expérience compte dans la crise actuelle. Chaque joueur sait qu'une rupture ouvrirait une période longue et incertaine, ce qui renforce l'incitation à rester.

## Ce que ces théories laissent dans l'ombre

- **Des motivations invisibles.** On ne sait pas quel poids chaque parti accorde aux postes, aux politiques et aux voix. On le déduit de son comportement, ce qui rend l'explication circulaire.
- **Des partis qui ne sont pas des blocs.** Les théories traitent chaque parti comme un acteur unique. En Belgique, le président et les ministres d'un même parti peuvent avoir des intérêts différents.
- **Former n'est pas gouverner.** Les théories de la formation disent quelles coalitions naissent. Elles disent moins bien comment une coalition gère un conflit interne en cours de route.

[^riker]: {% src "riker-1962" %}
[^gamson]: {% src "gamson-1961" %}
[^strom]: {% src "strom-1990" %}
[^laver]: {% src "laver-shepsle-1996" %}
[^lupia]: {% src "lupia-strom-1995" %}
[^art46]: {% src "constitution" %} ; {% src "chambre-art46" %}
[^sondage]: {% src "lavenir-2026-09-18" %}
[^ps]: {% src "brf-magnette-2024" %}
[^biard]: {% src "biard-2022" %}
[^dewinter]: {% src "dewinter-dumont-2022" %}
[^durees]: {% src "wiki-formation-2010" %} ; {% src "ucl-benelux-2020" %} ; {% src "crisp-bruxelles-2026" %} ; sur les règles et usages de la formation : {% src "dandoy-lebrun" %}
[^vb]: {% src "chambre-art46-vb" %}
