// Données communes aux outils interactifs.
const ORDRE = [
  ["scenarios", "Scénarios à hypothèses"],
  ["poule-mouillee", "Simulateur de poule mouillée"],
  ["guerre-usure", "Simulateur de guerre d'usure"],
  ["marchandage", "Simulateur de marchandage"],
];

export default {
  layout: "layouts/page.njk",
  fil: { titre: "Outils", url: "/outils/" },
  eleventyComputed: {
    ordre: (data) => {
      const i = ORDRE.findIndex(([s]) => s === data.page.fileSlug);
      return i < 0 ? 0 : i + 1;
    },
    suite: (data) => {
      const i = ORDRE.findIndex(([s]) => s === data.page.fileSlug);
      if (i < 0) return null;
      const lien = (x) => (x ? { url: `/outils/${x[0]}/`, titre: x[1] } : null);
      return { precedent: lien(ORDRE[i - 1]), suivant: lien(ORDRE[i + 1]) };
    },
  },
};
