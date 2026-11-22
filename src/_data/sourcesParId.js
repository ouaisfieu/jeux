// Index des sources par identifiant, pour les gabarits (chronologie, vérification).
import fs from "node:fs";

export default function () {
  const { liste } = JSON.parse(fs.readFileSync("src/_data/sources.json", "utf8"));
  return Object.fromEntries(liste.map((s) => [s.id, s]));
}
