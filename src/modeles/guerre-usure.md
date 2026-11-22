---
title: La guerre d'usure
description: Le modèle de la guerre d'usure d'Alesina et Drazen, ou pourquoi des réformes budgétaires jugées nécessaires par tous sont reportées, appliqué à la crise de l'Arizona.
chapeau: Tout le monde juge l'assainissement nécessaire, personne ne veut en payer la plus grosse part. Chacun attend donc que l'autre cède. Le modèle d'Alesina et Drazen explique pourquoi cette attente est rationnelle, et ce qui finit par y mettre fin.
resume: Quand céder coûte cher et attendre coûte peu, chacun attend. Ce qui fait durer la crise, et ce qui pourrait l'arrêter.
question: Combien de temps chacun peut-il attendre ?
outil: /outils/guerre-usure/
---

## L'intuition

Le biologiste John Maynard Smith a décrit des animaux qui se disputent un territoire sans se battre : ils se toisent, et le premier qui renonce s'en va. Gagne celui qui tient le plus longtemps, mais l'attente coûte à tous les deux[^maynard]. Il a appelé ce jeu la « guerre d'usure ».

En 1991, les économistes Alberto Alesina et Allan Drazen l'ont transposé à une question qui intriguait les spécialistes des finances publiques. Pourquoi des pays repoussent-ils pendant des années un assainissement budgétaire que tous jugent nécessaire, alors que le retard coûte cher à tout le monde[^ad] ?

Leur réponse tient en trois éléments.
- **Un conflit de répartition.** Tous veulent la stabilisation, mais chacun veut que l'effort pèse sur les autres. Le groupe qui cède le premier en supporte la plus grosse part.
- **Un coût de l'attente.** Tant que rien n'est décidé, la situation se dégrade pour tous, mais pas au même rythme pour chacun.
- **Une incertitude.** Chacun connaît son propre coût d'attente, pas celui de l'autre. Il ne sait donc pas combien de temps l'autre tiendra.

## Pourquoi attendre est rationnel

Le troisième élément est décisif. Si chacun savait ce que l'attente coûte à l'autre, le plus pressé céderait tout de suite : à quoi bon souffrir pour un résultat connu d'avance ? Le retard naît de l'incertitude. Chacun espère que l'autre est plus pressé que lui, et chaque semaine sans concession est une information : l'autre est peut-être plus résistant qu'on ne le croyait.

La parole ne suffit pas à lever cette incertitude. Tout le monde a intérêt à affirmer qu'il peut tenir longtemps ; une telle déclaration ne coûte rien, donc ne prouve rien. Seule l'attente elle-même révèle qui est vraiment pressé.

Le modèle produit aussi des prédictions.
- **Plus l'effort retombe sur celui qui cède, plus l'attente dure.** Céder coûte d'autant plus cher que le partage est inégal.
- **Plus l'attente coûte cher, plus elle est courte.** Une crise qui s'aggrave hâte le dénouement.
- **La concession vient du plus pressé.** Celui pour qui l'attente coûte le plus, rapporté à l'enjeu, finit par céder.

<details class="encadre technique">
<summary>La version simplifiée utilisée dans le simulateur</summary>

Le modèle original suppose deux groupes dont les coûts d'attente sont tirés au hasard, et calcule pour chacun une date de concession optimale. Notre [simulateur](/outils/guerre-usure/) en propose une forme réduite. Chaque camp a un seuil de patience, égal à la valeur qu'il attache à ne pas céder divisée par ce que lui coûte une semaine d'attente :

<p class="formule"><var>T</var> = <var>V</var> / <var>c</var></p>

Celui dont le seuil est le plus bas cède à ce moment-là. Comme ni <var>V</var> ni <var>c</var> ne sont connus, le simulateur tire de nombreuses valeurs plausibles et montre la distribution des dates de dénouement. Cette simplification garde l'intuition du modèle, pas sa rigueur : elle ne calcule pas d'équilibre.
</details>

## Appliqué à la crise

### Ce que coûte l'attente, et à qui

Le coût de l'attente n'est pas le même pour les cinq partenaires, et il évolue.

**Les douzièmes provisoires l'abaissent pour tout le monde.** L'État continue de percevoir l'impôt et de payer ses dépenses courantes, au prorata du dernier budget voté (voir [la crise](/crise/#les-douziemes-provisoires)). Le 11 octobre, Bart De Wever excluait ce scénario ; le 5 novembre, il confirmait que 2027 commencerait sous douzièmes[^douziemes]. Entre les deux, Conner Rousseau avait déclaré que les douzièmes « ne sont pas la fin du monde »[^rousseau]. Dans une guerre d'usure, ce genre de phrase est un coup : elle annonce qu'on peut attendre.

**Le Premier ministre est plus pressé que ses partenaires.** Il porte l'objectif de 10 milliards et la réputation du gouvernement. Les douzièmes bloquent les politiques nouvelles, donc son programme. Il a d'ailleurs évoqué un « frein à l'endettement » à défaut d'accord[^frein]. Quel qu'en soit le contenu exact, l'idée revient à changer ce qui se passe en l'absence d'accord, et donc à rendre l'attente plus coûteuse pour ceux qui s'en accommodent.

**Les signaux extérieurs ont joué dans les deux sens.**
- Les prévisions d'automne de la Commission, le 17 novembre, annoncent une dégradation du déficit et de la dette à politique inchangée[^ce]. Elles rendent l'attente plus coûteuse.
- Le 20 novembre, Fitch a maintenu la note belge, en disant s'attendre à une solution comparable à celle de l'an dernier[^fitch]. Elle a desserré la pression de court terme.
- La manifestation syndicale du 23 novembre vise l'austérité. Elle augmente la pression sur le gouvernement, mais conforte Vooruit dans sa position, puisque ses exigences vont dans le sens des syndicats[^manif].

**Les échéances royales créent des dates focales.** Le 16 novembre, le Roi a accordé une semaine de plus[^delai]. Une date n'oblige personne à céder, mais elle rend visible le fait de ne pas avoir cédé.

### Les précédents vont dans le sens du modèle

En 2011, après plus de 500 jours de crise, Elio Di Rupo demande au Roi d'être déchargé le 21 novembre. Le 25, Standard & Poor's abaisse la note de la Belgique. Le lendemain, un accord budgétaire est conclu[^2011]. Le choc extérieur a brutalement augmenté le coût de l'attente pour tous : c'est la configuration que le modèle décrit (voir [le cas de 2011](/histoire/2011-541-jours/)).

En 2025, le Premier ministre se donne « cinquante jours » le 6 novembre. L'accord sur 9,2 milliards tombe le 24 novembre, premier jour d'une grève de trois jours[^2025]. L'échéance fixée et la pression sociale ont réduit l'attente à moins de trois semaines.

### Ce que le modèle laisse attendre

Si rien ne vient modifier les coûts d'attente, le modèle prévoit un enlisement : chacun a les moyens d'attendre, et les douzièmes amortissent le choc. Les accélérateurs possibles sont connus : une décision d'une agence de notation, une étape de la procédure européenne, une hausse des taux, ou un sondage qui ferait porter le blâme à un seul parti (voir [le jeu du blâme](/modeles/signaux-et-reputation/#le-jeu-du-blame)). Notre [outil de scénarios](/outils/scenarios/) chiffre ces hypothèses.

## Ce que le modèle laisse dans l'ombre

- **Deux camps, pas cinq.** Le modèle oppose deux groupes. La configuration « quatre contre un » s'en approche, mais rien ne garantit que les quatre tiendront ensemble aussi longtemps que chacun d'eux le ferait seul.
- **Tout ou rien.** Dans le modèle, un camp finit par céder entièrement. Dans la réalité, chacun peut lâcher une partie : 1,3 milliard au lieu de 1,2, ou de 1,5. Le [marchandage](/modeles/marchandage/) décrit mieux ces concessions partielles.
- **Des coûts manipulables.** Le modèle traite le coût de l'attente comme une donnée. Ici, les joueurs le façonnent : un Premier ministre peut dramatiser, un président de parti peut minimiser, le Roi peut fixer une date.
- **Une explication après coup.** Le modèle rend bien compte des retards observés. Il dit mal quand ils se terminent, parce qu'il faudrait connaître des coûts que personne n'observe.

[^maynard]: {% src "maynard-smith-1974" %}
[^ad]: {% src "alesina-drazen-1991" %}
[^douziemes]: {% src "parismatch-2026-10-11" %} ; {% src "parismatch-2026-11-06" %}
[^rousseau]: {% src "lalibre-2026-11-02" %}
[^frein]: {% src "vrt-liveblog-schuldenrem" %}
[^ce]: {% src "vrt-en-2026-11-17" %} ; {% src "businessam-ce-automne" %}
[^fitch]: {% src "lavenir-2026-11-20" %} ; {% src "vrt-liveblog-nov" %}
[^manif]: {% src "lavenir-2026-11-16" %} ; {% src "bx1-synova-2026" %}
[^delai]: {% src "parismatch-2026-11-16" %} ; {% src "bruzz-2026-11-16" %}
[^2011]: {% src "dh-2011-11-21" %} ; {% src "dh-2011-11-25" %} ; {% src "lalibre-2011-11-26" %} ; {% src "emulations-2011" %}
[^2025]: {% src "bx1-2025-11-06" %} ; {% src "rtbf-2025-11-24" %}
