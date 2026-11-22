// Données communes aux cas historiques : gabarit, fil d'Ariane, ordre et pages voisines.
const ORDRE = [
  ["pacte-scolaire-1958", "Le pacte scolaire"],
  ["reforme-1970", "Parité et sonnette d'alarme"],
  ["bhv-2007-2012", "Bruxelles-Hal-Vilvorde"],
  ["2011-541-jours", "541 jours, puis un accord en cinq jours"],
  ["kamikaze-2014", "La « kamikaze »"],
  ["ceta-2016", "Le veto wallon sur le CETA"],
  ["marrakech-2018", "Marrakech : partir à la veille des élections"],
  ["vivaldi-2020", "La Vivaldi, une coalition trop grande"],
  ["formation-2024", "La formation de l'Arizona"],
  ["budget-2025", "L'accord budgétaire de novembre 2025"],
  ["bruxelles-613-jours", "Bruxelles, 613 jours"],
];

export default {
  layout: "layouts/cas.njk",
  fil: { titre: "Histoire", url: "/histoire/" },
  eleventyComputed: {
    ordre: (data) => {
      const i = ORDRE.findIndex(([s]) => s === data.page.fileSlug);
      return i < 0 ? 0 : i + 1;
    },
    suite: (data) => {
      const i = ORDRE.findIndex(([s]) => s === data.page.fileSlug);
      if (i < 0) return null;
      const lien = (x) => (x ? { url: `/histoire/${x[0]}/`, titre: x[1] } : null);
      return { precedent: lien(ORDRE[i - 1]), suivant: lien(ORDRE[i + 1]) };
    },
  },
};
