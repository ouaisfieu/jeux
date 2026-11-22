// Chronologie regroupée par période, avec noms d'acteurs et de types résolus.
import fs from "node:fs";

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const GROUPES = [
  { id: "precedents", titre: "Précédents, de 1958 à 2020", test: (d) => d < "2024" },
  { id: "annee-2024", titre: "2024 : élections et formation", test: (d) => d.startsWith("2024") },
  { id: "annee-2025", titre: "2025 : le premier budget de l'Arizona", test: (d) => d.startsWith("2025") },
  { id: "debut-2026", titre: "2026, de janvier à août", test: (d) => d >= "2026-01" && d < "2026-09" },
  { id: "automne-2026", titre: "Automne 2026 : la crise", test: (d) => d >= "2026-09" },
];

export default function () {
  const c = JSON.parse(fs.readFileSync("src/_data/chronologie.json", "utf8"));
  const acteurs = Object.fromEntries(c.acteurs.map((a) => [a.id, a.nom]));
  const types = Object.fromEntries(c.types.map((t) => [t.id, t.nom]));
  const evts = [...c.evenements].sort((a, b) => a.date.localeCompare(b.date));
  const groupes = GROUPES.map((g) => ({
    id: g.id,
    titre: g.titre,
    evenements: evts
      .filter((e) => g.test(e.date))
      .map((e) => {
        const [y, m, d] = e.date.split("-").map(Number);
        const jour = d === 1 ? "1er" : String(d);
        return {
          ...e,
          dateTexte: g.id === "precedents" ? `${jour} ${MOIS[m - 1]} ${y}` : `${jour} ${MOIS[m - 1]}`,
          acteursNoms: (e.acteurs || []).map((a) => acteurs[a]),
          typeNom: types[e.type],
        };
      }),
  }));
  return { acteurs: c.acteurs, types: c.types, groupes, total: evts.length };
}
