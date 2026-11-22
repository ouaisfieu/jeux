---
layout: layouts/page.njk
title: Arithmétique parlementaire
description: Composition vérifiée de la Chambre, double majorité linguistique, coalitions de rechange et indices de pouvoir (Shapley-Shubik, Banzhaf) recalculés pour novembre 2026.
chapeau: Avant de parler de stratégie, il faut compter. Qui est indispensable, qui est remplaçable, et sous quelles conditions ? Les chiffres ci-dessous sont recalculés à partir des documents officiels de la Chambre.
---
{% set P = pouvoir.parties %}{% set J1 = pouvoir.jeux.simple_tous %}{% set J2 = pouvoir.jeux.simple_gouvernable %}{% set J3 = pouvoir.jeux.double_gouvernable %}

## La Chambre au 22 novembre 2026

La Chambre compte 150 députés, répartis en un groupe linguistique néerlandais de 90 membres et un groupe français de 60[^groupes]. Depuis les élections de juin 2024, trois changements ont modifié les groupes politiques. Aucun n'a changé un député de groupe linguistique.

- **Jean-Marie Dedecker**, élu sur la liste N-VA en Flandre occidentale, siège comme indépendant depuis février 2025. Il a voté la confiance au gouvernement[^confiance].
- **Alexia Bertrand**, élue sur la liste MR à Bruxelles, siège dans le groupe Open VLD, devenu Anders en janvier 2026, et dans le groupe linguistique néerlandais. C'est pourquoi le MR, qui avait obtenu 20 élus, ne comptait que 19 membres de groupe dès 2025[^composition][^anders].
- **Michel De Maegd** a quitté le MR pour Les Engagés le 6 janvier 2026[^demaegd].

<div class="tableau">
<table>
<caption>Composition de la Chambre par groupe politique et par groupe linguistique</caption>
<thead><tr><th scope="col">Groupe</th><th scope="col" class="n">Sièges</th><th scope="col" class="n">Néerlandophones</th><th scope="col" class="n">Francophones</th><th scope="col">Position</th></tr></thead>
<tbody>
{%- for p in P %}
<tr{% if p.bloc == "arizona" %} class="arizona"{% endif %}><td>{{ p.nom }}</td><td class="n">{{ p.sieges }}</td><td class="n">{{ p.nl }}</td><td class="n">{{ p.fr }}</td><td>{% if p.bloc == "arizona" %}Majorité (Arizona){% elif p.bloc == "independant" %}Indépendant, a voté la confiance{% else %}Opposition{% endif %}</td></tr>
{%- endfor %}
<tr><td><strong>Total</strong></td><td class="n"><strong>{{ pouvoir.meta.total }}</strong></td><td class="n"><strong>{{ pouvoir.meta.nl_total }}</strong></td><td class="n"><strong>{{ pouvoir.meta.fr_total }}</strong></td><td></td></tr>
</tbody>
</table>
</div>

Le groupe Ecolo-Groen réunit les deux partis écologistes : 7 élus de Groen (néerlandophones) et 2 d'Ecolo (francophones). Le PVDA-PTB est le seul parti national : 7 néerlandophones, 8 francophones.

## Trois seuils, pas un

- **76 sièges sur 150.** La majorité absolue de la Chambre, nécessaire pour la confiance, le budget et la plupart des lois.
- **46 sur 90 et 31 sur 60.** La majorité dans chaque groupe linguistique. Elle n'est exigée juridiquement que pour les lois spéciales, qui demandent aussi deux tiers des voix au total[^fiche]. Pour former un gouvernement, c'est une **convention politique** : on considère qu'une coalition doit être majoritaire des deux côtés.

Cette convention a été enfreinte plusieurs fois.
- Entre 2008 et 2014, les gouvernements étaient minoritaires côté néerlandophone.
- De 2014 à 2018, le gouvernement Michel I était minoritaire côté francophone : le MR gouvernait seul pour les francophones[^michel].
- La Vivaldi, de 2020 à 2024, était de nouveau minoritaire côté néerlandophone[^vivaldi].

Elle pèse donc lourd, sans être absolue. Une coalition qui la viole s'expose à une contestation de sa légitimité dans une communauté. Pour le calcul des rapports de force, cela change tout (voir plus bas).

## L'Arizona, coalition minimale gagnante

<div class="tableau">
<table>
<caption>Ce qui reste de la majorité si un partenaire s'en va</caption>
<thead><tr><th scope="col">Partenaire qui part</th><th scope="col" class="n">Sièges restants</th><th scope="col" class="n">Néerlandophones restants</th><th scope="col" class="n">Francophones restants</th><th scope="col">Majorité ?</th></tr></thead>
<tbody>
<tr class="arizona"><td>Aucun : l'Arizona au complet</td><td class="n">80 (81 avec Dedecker)</td><td class="n">47 sur 90</td><td class="n">33 sur 60</td><td>Oui, dans les trois sens</td></tr>
{%- for p in P %}{% if p.bloc == "arizona" %}
<tr><td>{{ p.nom }}</td><td class="n">{{ 80 - p.sieges }}</td><td class="n">{{ 47 - p.nl }}</td><td class="n">{{ 33 - p.fr }}</td><td>Non</td></tr>
{%- endif %}{% endfor %}
</tbody>
</table>
</div>

Chaque départ fait tomber la majorité sous 76 sièges, même avec Dedecker. L'Arizona est donc une **coalition minimale gagnante** au sens de William Riker[^riker] : chaque partenaire est nécessaire, donc chacun dispose d'un veto. C'est précisément le cas où la théorie des acteurs de veto se vérifie le mieux empiriquement[^angelova].

## Les coalitions de rechange

Un veto vaut ce que vaut la menace de s'en passer. La question devient : peut-on **remplacer** un partenaire récalcitrant ? Le tableau vérifie chaque option dans les trois dimensions.

{% set commentaires = {
  "Arizona": "Coalition actuelle.",
  "Arizona + Dedecker": "Dedecker a voté la confiance en 2025, mais son soutien n'est pas acquis vote par vote.",
  "Sans Vooruit, avec Anders": "Ni majorité fédérale ni majorité flamande.",
  "Sans Vooruit, avec Anders + Dedecker": "Majorité d'un siège, sans majorité flamande : jugée intenable, y compris par Les Engagés.",
  "Sans Vooruit, avec Anders + Dedecker + DéFI": "Toujours pas de majorité flamande ; DéFI siège dans l'opposition.",
  "Sans Vooruit, avec Ecolo-Groen": "Pas de majorité flamande ; écart idéologique majeur sur l'austérité.",
  "Sans Vooruit, avec Anders + Ecolo-Groen": "Seul remplacement de Vooruit qui respecte la double majorité. Faire signer à Groen et Ecolo un tableau que Vooruit juge trop dur est invraisemblable.",
  "Sans MR, avec PS": "Complète sur le papier, y compris côté francophone (31 sur 60). Fermée politiquement : le PS refuse de servir de dépanneur.",
  "Sans Les Engagés, avec PS": "Complète sur le papier ; aucun acteur ne la porte.",
  "Sans CD&V, avec Anders": "Pas de majorité flamande.",
  "Sans CD&V, avec Anders + Dedecker": "Toujours un siège de trop peu côté flamand (45 sur 90).",
  "Sans N-VA (« Vivaldi + Engagés »)": "Large majorité fédérale, mais seulement 39 néerlandophones sur 90 : il faudrait le PVDA."
} %}

<div class="tableau">
<table>
<caption>Coalitions de rechange : sièges, groupes linguistiques et faisabilité politique</caption>
<thead><tr><th scope="col">Configuration</th><th scope="col" class="n">Sièges</th><th scope="col" class="n">NL (sur 90)</th><th scope="col" class="n">FR (sur 60)</th><th scope="col">Lecture politique</th></tr></thead>
<tbody>
{%- for nom, c in pouvoir.coalitions %}
<tr{% if nom == "Arizona" %} class="arizona"{% endif %}><td>{{ nom }}</td><td class="n">{{ c.sieges }} {% if c.majorite %}<span aria-hidden="true">✓</span><span class="visuellement-cache">majorité</span>{% else %}<span aria-hidden="true">✗</span><span class="visuellement-cache">pas de majorité</span>{% endif %}</td><td class="n">{{ c.nl }} {% if c.maj_nl %}<span aria-hidden="true">✓</span><span class="visuellement-cache">majorité</span>{% else %}<span aria-hidden="true">✗</span><span class="visuellement-cache">pas de majorité</span>{% endif %}</td><td class="n">{{ c.fr }} {% if c.maj_fr %}<span aria-hidden="true">✓</span><span class="visuellement-cache">majorité</span>{% else %}<span aria-hidden="true">✗</span><span class="visuellement-cache">pas de majorité</span>{% endif %}</td><td>{{ commentaires[nom] }}</td></tr>
{%- endfor %}
</tbody>
</table>
</div>

Trois enseignements.

1. **La N-VA est la clé de voûte.** Hors N-VA, Vlaams Belang et PVDA, les partis néerlandophones ne réunissent que {{ pouvoir.meta.nl_hors_nva_vb_pvda }} sièges, alors qu'il en faut 46. Tant que le cordon sanitaire écarte le Vlaams Belang et que personne ne gouverne avec le PVDA, aucune majorité flamande n'existe sans la N-VA.
2. **Vooruit et le CD&V sont symétriques.** Chacun n'est remplaçable que par Anders et Ecolo-Groen ensemble. Le levier de Vooruit ne vient donc pas d'une singularité arithmétique : il vient de ce que ses remplaçants possibles sont politiquement indisponibles.
3. **Le MR est remplaçable sur le papier.** Depuis le départ de Michel De Maegd, Les Engagés et le PS réunissent exactement 31 francophones sur 60. Ce qui protège le MR, c'est le refus du PS, et le fait qu'aucun partenaire ne porte cette option. Le document de travail qui jugeait l'option impossible ([vérification](/verification/)) s'appuyait sur une composition dépassée.

## Les indices de pouvoir

Le nombre de sièges mesure mal le poids d'un parti. Ce qui compte, c'est la fréquence à laquelle il fait basculer une coalition de perdante à gagnante. Deux mesures classiques le quantifient.

- **L'indice de Shapley-Shubik.** On imagine les partis rejoignant une coalition dans un ordre aléatoire. On compte la fréquence à laquelle chacun apporte le siège qui fait franchir le seuil[^ss].
- **L'indice de Banzhaf.** On compte, parmi toutes les coalitions gagnantes, celles où le parti est décisif : son retrait les rendrait perdantes[^bz]. En Belgique, ces indices ont été utilisés pour étudier la formation et la durée des gouvernements[^caulier].

Nous les avons calculés exactement, en énumérant toutes les coalitions possibles, dans trois versions du jeu.
- **Chambre entière.** Majorité simple ; tous les groupes sont admis.
- **Ensemble « gouvernable ».** Mêmes règles, sans le Vlaams Belang (cordon sanitaire) ni le PVDA-PTB, qui ne gouverne pas avec la droite et dont aucun partenaire ne veut. Il reste 115 sièges ; le seuil reste 76.
- **Gouvernable avec double majorité.** Il faut en plus 46 néerlandophones et 31 francophones.

<div class="tableau">
<table>
<caption>Indice de Shapley-Shubik (en % du pouvoir total) selon les règles du jeu</caption>
<thead><tr><th scope="col">Groupe</th><th scope="col" class="n">Sièges</th><th scope="col">Part des sièges</th><th scope="col">Chambre entière</th><th scope="col">Gouvernable</th><th scope="col">Gouvernable et double majorité</th></tr></thead>
<tbody>
{%- for p in P %}
{%- set i1 = J1.joueurs.indexOf(p.nom) -%}
{%- set i2 = J2.joueurs.indexOf(p.nom) -%}
{%- set i3 = J3.joueurs.indexOf(p.nom) %}
<tr{% if p.bloc == "arizona" %} class="arizona"{% endif %}><td>{{ p.nom }}</td><td class="n">{{ p.sieges }}</td>
<td><div class="barre part"><span class="barre-valeur">{{ (p.sieges / 150) | pct }}</span><span class="barre-piste"><span class="barre-remplie" style="width: {{ (p.sieges / 150 / 0.34 * 100) | round(1) }}%"></span></span></div></td>
<td><div class="barre"><span class="barre-valeur">{{ J1.shapley[i1] | pct }}</span><span class="barre-piste"><span class="barre-remplie" style="width: {{ (J1.shapley[i1] / 0.34 * 100) | round(1) }}%"></span></span></div></td>
<td>{% if i2 >= 0 %}<div class="barre"><span class="barre-valeur">{{ J2.shapley[i2] | pct }}</span><span class="barre-piste"><span class="barre-remplie" style="width: {{ (J2.shapley[i2] / 0.34 * 100) | round(1) }}%"></span></span></div>{% else %}<span class="petit">exclu du jeu</span>{% endif %}</td>
<td>{% if i3 >= 0 %}<div class="barre"><span class="barre-valeur">{{ J3.shapley[i3] | pct }}</span><span class="barre-piste"><span class="barre-remplie" style="width: {{ (J3.shapley[i3] / 0.34 * 100) | round(1) }}%"></span></span></div>{% else %}<span class="petit">exclu du jeu</span>{% endif %}</td></tr>
{%- endfor %}
</tbody>
</table>
</div>

<details class="encadre technique">
<summary>Voir aussi l'indice de Banzhaf et le nombre de coalitions</summary>
<div class="tableau">
<table>
<caption>Indice de Banzhaf normalisé (en %)</caption>
<thead><tr><th scope="col">Groupe</th><th scope="col" class="n">Chambre entière</th><th scope="col" class="n">Gouvernable</th><th scope="col" class="n">Gouvernable et double majorité</th></tr></thead>
<tbody>
{%- for p in P %}
{%- set i1 = J1.joueurs.indexOf(p.nom) -%}
{%- set i2 = J2.joueurs.indexOf(p.nom) -%}
{%- set i3 = J3.joueurs.indexOf(p.nom) %}
<tr><td>{{ p.nom }}</td><td class="n">{{ J1.banzhaf[i1] | pct }}</td><td class="n">{% if i2 >= 0 %}{{ J2.banzhaf[i2] | pct }}{% else %}–{% endif %}</td><td class="n">{% if i3 >= 0 %}{{ J3.banzhaf[i3] | pct }}{% else %}–{% endif %}</td></tr>
{%- endfor %}
</tbody>
</table>
</div>
<p>Coalitions gagnantes : {{ J1.n_gagnantes }} dans la Chambre entière, {{ J2.n_gagnantes }} dans l'ensemble gouvernable, {{ J3.n_gagnantes }} avec la double majorité. Coalitions <em>minimales</em> gagnantes, où chaque membre est indispensable : {{ J1.n_mwc }}, {{ J2.n_mwc }} et {{ J3.n_mwc }}. Dans les deux derniers jeux, aucune ne compte moins de cinq partis.</p>
</details>

### Ce que montrent les trois colonnes

- **Sans contrainte, le pouvoir suit à peu près les sièges.** C'est le résultat attendu quand beaucoup de partis de taille moyenne coexistent.
{%- set iN = J2.joueurs.indexOf("N-VA") -%}{%- set iM = J2.joueurs.indexOf("MR") -%}{%- set iP = J2.joueurs.indexOf("PS") %}
- **Écarter le VB et le PVDA-PTB profite d'abord aux plus grands partis restants.** La N-VA passe à {{ J2.shapley[iN] | pct }}, soit {{ ((J2.shapley[iN] - 23/150) * 100) | num(1) }} points de plus que sa part des sièges, et le MR à {{ J2.shapley[iM] | pct }} ({{ ((J2.shapley[iM] - 18/150) * 100) | num(1) }} points de plus). Le PS gagne aussi, mais moins ({{ ((J2.shapley[iP] - 16/150) * 100) | num(1) }} points). La prime suit la taille, pas l'orientation politique : il se trouve que les deux plus grands partis gouvernables sont à droite. L'un des documents de travail présentait ce calcul ; nous retrouvons ses valeurs au centième près.
- **La double majorité redistribue tout.** La N-VA monte à {{ J3.shapley[J3.joueurs.indexOf("N-VA")] | pct }}. Vooruit et le CD&V gagnent ({{ J3.shapley[J3.joueurs.indexOf("Vooruit")] | pct }} chacun), car les sièges flamands deviennent rares. Le MR, le PS et Les Engagés deviennent strictement interchangeables ({{ J3.shapley[J3.joueurs.indexOf("MR")] | pct }} chacun) : côté francophone, deux partis sur trois suffisent toujours.

La lecture courante (« Vooruit est irremplaçable, donc il a le levier ») est donc à moitié juste. Vooruit a du poids parce que le côté flamand est étroit. Mais c'est la N-VA, plus encore, qui tient la clé arithmétique. Et le MR pèse moins par les chiffres que par les refus des autres.

## Ce que ces chiffres ne disent pas

<div class="encadre limite">
<ul>
<li><strong>Ce sont des pouvoirs a priori.</strong> Les indices supposent que toutes les coalitions sont également envisageables. Or la distance idéologique, les exclusions mutuelles (« jamais avec la N-VA », « jamais sans le MR ») et les alliances régionales rendent la plupart d'entre elles impensables.</li>
<li><strong>Une fois la coalition formée, le jeu change.</strong> Le budget exige l'accord des cinq : dans ce jeu interne d'unanimité, chacun pèse exactement un cinquième. Les indices décrivent le pouvoir de négociation <em>autour</em> de la coalition, pas à l'intérieur.</li>
<li><strong>Le vrai rapport de force dépend des options de repli</strong> : ce que chacun peut espérer si la négociation échoue (élections, opposition, autre majorité). C'est l'objet des <a href="/modeles/marchandage/">modèles de marchandage</a>.</li>
<li><strong>Les sièges ne votent pas comme des blocs parfaits.</strong> Un député peut changer de groupe, comme en janvier 2026, ou s'abstenir. Le cas de Dedecker montre qu'un seul siège peut compter.</li>
</ul>
</div>

## Reproduire le calcul

Le calcul tient en quelques dizaines de lignes de Python. Il énumère les 2<sup>n</sup> coalitions possibles (4 096 pour les 12 groupes) et vérifie, pour chacune, les seuils choisis. Le script et ses résultats sont publiés avec le code du site : [scripts/power.py]({{ site.depot }}/blob/main/scripts/power.py) et [les résultats au format JSON](/donnees/pouvoir.json). Pour tester une autre hypothèse (un député qui change de groupe, un cordon levé…), il suffit de modifier le tableau des partis en tête du script.

[^groupes]: {% src "chambre-groupes-linguistiques" %} ; {% src "chambre-fiche-composition" %}
[^confiance]: {% src "vrt-fr-2025-02-07" %} ; {% src "chambre-composition-2025" %}
[^composition]: {% src "chambre-composition-2025" %}
[^anders]: {% src "lalibre-anders-2026" %}
[^demaegd]: {% src "vrt-demaegd-2026" %} ; {% src "chambre-plen-2026-01-08" %}
[^fiche]: {% src "chambre-fiche-composition" %}
[^michel]: {% src "lalibre-2014-07-21" %} ; {% src "lalibre-2018-12-09" %}
[^vivaldi]: {% src "wiki-formation-2019" %} ; {% src "ucl-benelux-2020" %}
[^riker]: {% src "riker-1962" %}
[^angelova]: {% src "angelova-2018" %}
[^ss]: {% src "shapley-shubik-1954" %}
[^bz]: {% src "banzhaf-1965" %}
[^caulier]: {% src "caulier-dumont" %}
