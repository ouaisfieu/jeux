// Données communes aux pages de modèles : gabarit, fil d'Ariane et pages voisines.
const ORDRE = [
  ["poule-mouillee", "La poule mouillée"],
  ["guerre-usure", "La guerre d'usure"],
  ["marchandage", "Le marchandage"],
  ["jeux-imbriques", "Jeux imbriqués, jeux à deux niveaux"],
  ["acteurs-de-veto", "Les acteurs de veto"],
  ["coalitions", "Former, garder, remplacer une coalition"],
  ["signaux-et-reputation", "Signaux, réputation et blâme"],
  ["budget-commun", "Budget, bien commun et contrainte extérieure"],
];

export default {
  layout: "layouts/page.njk",
  fil: { titre: "Modèles", url: "/modeles/" },
  eleventyComputed: {
    ordre: (data) => {
      const i = ORDRE.findIndex(([s]) => s === data.page.fileSlug);
      return i < 0 ? 0 : i + 1;
    },
    suite: (data) => {
      const i = ORDRE.findIndex(([s]) => s === data.page.fileSlug);
      if (i < 0) return null;
      const lien = (x) => (x ? { url: `/modeles/${x[0]}/`, titre: x[1] } : null);
      return { precedent: lien(ORDRE[i - 1]), suivant: lien(ORDRE[i + 1]) };
    },
  },
};
