---
title: La poule mouillée
description: Le jeu de la poule mouillée (chicken game), ses équilibres, la stratégie de l'engagement et son application aux deux bras de fer de l'automne 2026.
chapeau: Deux joueurs foncent l'un vers l'autre. Celui qui s'écarte perd la face ; si aucun ne s'écarte, tous deux perdent davantage. C'est le modèle le plus cité pour la crise. Il éclaire bien un moment précis, celui où chacun attend que l'autre cède, et beaucoup moins la suite.
resume: Chacun préfère que l'autre cède, mais tous redoutent la collision. Pourquoi les lignes rouges se durcissent, et qui finit par s'écarter.
question: Qui s'écarte le premier ?
outil: /outils/poule-mouillee/
---

## L'intuition

Deux conducteurs roulent l'un vers l'autre sur une route étroite. S'écarter seul, c'est perdre la face. Tenir pendant que l'autre s'écarte, c'est gagner. S'écarter tous les deux est un compromis honorable. Tenir tous les deux, c'est la collision.

Chaque joueur classe donc les issues ainsi : gagner (W) vaut mieux que le compromis (C), qui vaut mieux que perdre la face (L), qui vaut mieux que la collision (D). Cet ordre, W > C > L > D, définit le jeu.

La différence avec le dilemme du prisonnier est essentielle. Dans le dilemme du prisonnier, trahir est toujours le meilleur choix, quoi que fasse l'autre. Ici, il n'existe pas de bon choix dans l'absolu. Si l'autre tient, mieux vaut céder. Si l'autre cède, mieux vaut tenir. Tout dépend de ce qu'on croit que l'autre va faire, et c'est pourquoi le jeu se joue autant dans les déclarations que dans les actes.

## Le modèle

<div class="tableau">
<table class="mini-matrice">
<caption>Le jeu de la poule mouillée. Gains de A puis de B, de 4 (la meilleure issue) à 1 (la pire).</caption>
<thead><tr><th scope="col"></th><th scope="col">B cède</th><th scope="col">B tient</th></tr></thead>
<tbody>
<tr><th scope="row">A cède</th><td>3, 3<span class="petit">compromis</span></td><td class="eq">2, 4<span class="petit">B l'emporte</span></td></tr>
<tr><th scope="row">A tient</th><td class="eq">4, 2<span class="petit">A l'emporte</span></td><td>1, 1<span class="petit">collision</span></td></tr>
</tbody>
</table>
</div>

Le jeu a deux équilibres « purs », surlignés dans le tableau : l'un des deux tient, l'autre cède. Dans chacun, personne n'a intérêt à changer seul de stratégie. Le problème est qu'ils sont deux, et que chaque joueur préfère celui où c'est l'autre qui cède. Le modèle ne dit donc pas qui gagnera. Il dit que la partie se jouera sur la capacité de chacun à convaincre l'autre qu'il ne cédera pas.

Il existe un troisième équilibre, dit « mixte », où chacun tient avec une certaine probabilité. On le lit le plus souvent comme une situation d'incertitude : chacun ignore jusqu'où l'autre est prêt à aller.

<details class="encadre technique">
<summary>Le calcul de l'équilibre mixte</summary>

Pour que A hésite vraiment entre céder et tenir, il faut que les deux choix lui rapportent autant en moyenne. Si B tient avec la probabilité <var>q</var>, cela impose :

<p class="formule"><var>q</var> × L + (1 − <var>q</var>) × C = <var>q</var> × D + (1 − <var>q</var>) × W,<br>
soit <var>q</var> = (W − C) / [(W − C) + (L − D)]</p>

Avec les valeurs du tableau (4, 3, 2, 1), chacun tient une fois sur deux et la collision survient une fois sur quatre. Si la collision devient beaucoup plus coûteuse pour les deux (D = −5 au lieu de 1), chacun ne tient plus qu'une fois sur huit, et le risque de collision tombe à environ 1,6 %.

Deux propriétés méritent l'attention. D'abord, la probabilité que B tienne dépend des gains de A, et non des siens : c'est ce qui rend A indifférent. Ce résultat contre-intuitif est l'une des critiques classiques des équilibres mixtes. Ensuite, et c'est la leçon la plus robuste, plus la collision coûte cher à tous, moins elle est probable. À condition, bien sûr, que chacun sache ce qu'elle coûte à l'autre.
</details>

## La stratégie de l'engagement

Thomas Schelling a tiré du jeu sa leçon la plus célèbre : dans un tel affrontement, le pouvoir appartient à celui qui parvient à se lier les mains[^schelling]. Le conducteur qui arrache son volant et le jette ostensiblement par la fenêtre gagne, puisque l'autre n'a plus d'autre choix que de s'écarter. Encore faut-il que l'autre le voie, et qu'il n'ait pas jeté le sien en même temps.

En politique, les volants arrachés s'appellent lignes rouges, promesses publiques, votes de congrès ou motions de parti. Une déclaration devant les militants ou à la télévision coûte cher à renier, et c'est précisément ce qui la rend crédible (voir [les coûts d'audience](/modeles/signaux-et-reputation/#les-couts-d-audience)). Schelling ajoute qu'un négociateur dont la base est réputée intransigeante négocie mieux : il peut dire, sans bluffer tout à fait, qu'il n'a pas de marge.

L'engagement fonctionne aussi dans l'autre sens. Promettre publiquement de trouver un accord rend la collision plus coûteuse pour soi, donc pousse au compromis. C'est ce que le Roi a obtenu des cinq présidents de parti le 6 novembre, en refusant la démission du gouvernement[^roi].

## Appliqué à la crise : deux manches

### Octobre : le MR contre la N-VA, sur la TVA

Dès le 6 septembre, le MR s'annonce prêt à une longue bataille budgétaire avec une ligne rouge : pas de hausse de la TVA[^mrtva]. Le Premier ministre défend pourtant une réforme qui relève certains taux, un terrain politiquement miné en Belgique[^tvadelicat]. Le 10 octobre, le kern se sépare sans accord, bloqué sur ce point[^kern1010]. Le 15, Bart De Wever retire sa réforme et se concentre sur un budget d'urgence d'environ 4 milliards[^retrait].

Le chroniqueur Bertrand Henne a lu l'épisode comme un jeu de la poule mouillée, dans lequel le Premier ministre s'est écarté le premier[^henne]. Le modèle suggère une raison : la collision ne coûte pas la même chose à tous. Pour un Premier ministre, l'échec du gouvernement est d'abord le sien. Pour un président de parti qui ne siège pas au gouvernement et qui a fait de la TVA un marqueur, céder coûte plus cher que tenir. Le joueur pour qui la collision est la plus coûteuse a intérêt à céder le premier. C'est une lecture possible, pas une démonstration : on ne connaît pas les gains réels des joueurs, seulement leurs déclarations.

### Novembre : Vooruit contre les quatre

Le 15 novembre, quatre partenaires acceptent le tableau budgétaire du Premier ministre ; Vooruit le refuse[^quatre]. La crise devient un jeu à deux camps, présenté [en page d'accueil](/). Chaque camp a son volant à jeter :
- Vooruit a rendu publiques ses exigences : davantage d'effort des plus fortunés, moins d'économies dans les soins de santé[^vooruit] ;
- les quatre autres ont fait de leur accord commun un fait accompli, et le Premier ministre a consulté ses partenaires sans Vooruit le 18 novembre[^sans].

La menace implicite des quatre, gouverner sans Vooruit, se heurte cependant à l'arithmétique. Sans Vooruit, l'Arizona tombe à 67 sièges sur 150. Remplacer Vooruit par Anders donnerait 75 sièges (76 avec l'indépendant Jean-Marie Dedecker) et seulement 42 ou 43 députés néerlandophones sur 90 (voir [Arithmétique](/arithmetique/)). Une menace qui ne peut pas être exécutée est un volant qu'on fait semblant de jeter.

Au 22 novembre, ni l'un ni l'autre n'a cédé. Les deux camps sont donc dans la case de la collision, mais au ralenti. La collision n'est pas un choc unique : c'est une attente qui coûte un peu plus chaque semaine. C'est la limite du modèle, et la raison pour laquelle [la guerre d'usure](/modeles/guerre-usure/) prend le relais.

### Un précédent dans la même configuration

Le face-à-face n'est pas nouveau. Le 31 octobre 2024, pendant la formation du gouvernement, quatre partis s'accordaient déjà contre Vooruit[^2024]. Le 4 novembre, Bart De Wever remettait sa mission de formateur au Roi[^2024b]. Vooruit est resté, et l'accord de gouvernement a été conclu en janvier 2025. Les mêmes joueurs ont donc déjà appris que ce bras de fer se termine par un compromis et non par une exclusion. Cet apprentissage rend chaque camp plus enclin à tenir, puisque la collision lui paraît peu probable.

## Ce que le modèle éclaire, ce qu'il laisse dans l'ombre

Le modèle éclaire trois choses :
- pourquoi les déclarations publiques se durcissent à l'approche d'une échéance : ce sont des engagements ;
- pourquoi le dénouement prend souvent la forme « qui cède le premier » ;
- pourquoi un tiers comme le Roi compte : il peut offrir une sortie où les deux s'écartent ensemble, sans que l'un paraisse avoir plié.

Il laisse dans l'ombre au moins cinq aspects de la crise.
- **Le temps.** Le jeu se joue en un coup. La crise dure des semaines, et les coûts s'accumulent.
- **Le contenu.** Céder ou tenir est binaire. La négociation porte sur des montants, qu'on peut couper en deux (voir [le marchandage](/modeles/marchandage/)).
- **Le nombre de joueurs.** Les « quatre » ne forment pas un bloc homogène. Les Engagés défendent aussi une contribution des plus aisés, ce qui les rapproche de Vooruit sur ce point[^le].
- **La répétition.** Les cinq partenaires doivent gouverner ensemble jusqu'en 2029. Humilier un partenaire a un coût futur que le jeu en un coup ignore.
- **Les préférences réelles.** Notre classement des issues repose sur des déclarations et des sondages. Si un parti préférait au fond la rupture à la capitulation (si D > L), le jeu ne serait plus une poule mouillée : tenir deviendrait sa meilleure stratégie dans tous les cas, et c'est l'autre camp qui devrait céder. Aucun signal public ne permet de trancher.

## Dans la littérature

L'image vient des défis automobiles des années 1950, et la guerre froide l'a rendue célèbre ; les biologistes étudient la même structure sous le nom de « faucon et colombe ». George Tsebelis a modélisé les relations entre élites des démocraties consociatives, dont la Belgique, comme un jeu de la poule mouillée répété[^tsebelis]. Ses travaux rappellent que, dans ce régime, les négociateurs jouent en même temps une autre partie, face à leurs propres partisans (voir [les jeux imbriqués](/modeles/jeux-imbriques/)).

<div class="encadre">
<p>Le <a href="/outils/poule-mouillee/">simulateur de la poule mouillée</a> permet de modifier les gains de chaque camp, d'ajouter un engagement préalable et d'observer comment évolue le risque de collision.</p>
</div>

[^schelling]: {% src "schelling-1960" %}
[^roi]: {% src "parismatch-2026-11-06" %} ; {% src "euronews-2026-11-06" %}
[^mrtva]: {% src "dh-2026-09-06" %}
[^kern1010]: {% src "parismatch-2026-10-11" %}
[^tvadelicat]: {% src "lalibre-tva-2026" %}
[^retrait]: {% src "vrt-fr-2026-10-15" %}
[^henne]: {% src "rtbf-henne-2026-10-15" %}
[^quatre]: {% src "bx1-2026-11-15" %} ; {% src "brusselstimes-2026-11-15" %}
[^vooruit]: {% src "lavenir-2026-11-20" %} ; {% src "vrt-liveblog-nov" %}
[^sans]: {% src "lalibre-2026-11-18" %} ; {% src "lavenir-2026-11-18" %}
[^2024]: {% src "wiki-formation-2024" %}
[^2024b]: {% src "bx1-2024-11-04" %} ; {% src "dh-2024-11-04-salle" %}
[^le]: {% src "belga-prevot-2026" %}
[^tsebelis]: {% src "tsebelis-1990-jtp" %} ; {% src "tsebelis-1990-nested" %}
