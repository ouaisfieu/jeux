// Simulateur de marchandage : offres alternées de Rubinstein avec options extérieures.
import { nf, pct, $, $$, etatDansUrl, marquerPreset } from "./commun.js";

const form = $("#form-marchandage");

const PRESETS = {
  epaules: { enjeu: "epaules", dV: 0.92, dQ: 0.9, prem: "quatre", oV: 0, oQ: 0 },
  sante: { enjeu: "sante", dV: 0.92, dQ: 0.9, prem: "quatre", oV: 0, oQ: 0 },
  option: { enjeu: "epaules", dV: 0.92, dQ: 0.9, prem: "quatre", oV: 0.6, oQ: 0 },
  symetrique: { enjeu: "abstrait", dV: 0.9, dQ: 0.9, prem: "quatre", oV: 0, oQ: 0 },
};

const ENJEUX = {
  epaules: {
    titre: "Contribution des épaules les plus larges",
    montant: (sV) => `${nf(1.2 + 0.3 * sV, 2)} milliard${1.2 + 0.3 * sV >= 2 ? "s" : ""}`,
    legende: (sV) => `sur un écart de 300 millions entre le tableau du 15 novembre (1,2 milliard) et la demande de Vooruit (1,5 milliard), Vooruit obtient ${nf(300 * sV)} millions`,
    bornes: ["1,2 Md€, tableau du 15 novembre", "1,5 Md€, demande de Vooruit"],
  },
  sante: {
    titre: "Économies en soins de santé évitées",
    montant: (sV) => `${nf(750 * sV)} millions`,
    legende: (sV) => `sur les 750 millions d'économies que Vooruit voudrait éviter, ${nf(750 * sV)} millions le seraient, et ${nf(750 * (1 - sV))} millions maintenus`,
    bornes: ["Économies maintenues", "750 M€ évités"],
  },
  abstrait: {
    titre: "Part de l'enjeu obtenue par Vooruit",
    montant: (sV) => pct(sV),
    legende: () => "de l'enjeu disputé, le reste allant aux quatre",
    bornes: ["0 %", "100 %"],
  },
};

// Équilibre stationnaire : chaque offre donne au répondant le maximum de ce qu'il obtiendrait
// en refusant (sa part future, escomptée) et de son option extérieure.
export function partager({ dV, dQ, prem, oV, oQ }) {
  if (oV + oQ >= 1) return { accord: false };
  let vV = (1 - dQ) / (1 - dV * dQ); // part de Vooruit quand il propose
  let vQ = (1 - dV) / (1 - dV * dQ); // part des quatre quand ils proposent
  for (let i = 0; i < 500; i++) {
    const nV = 1 - Math.max(dQ * vQ, oQ);
    const nQ = 1 - Math.max(dV * vV, oV);
    if (Math.abs(nV - vV) + Math.abs(nQ - vQ) < 1e-12) break;
    vV = nV;
    vQ = nQ;
  }
  const sV = prem === "vooruit" ? vV : 1 - vQ;
  const lieV = prem === "quatre" && oV > dV * vV + 1e-9;
  const lieQ = prem === "vooruit" && oQ > dQ * vQ + 1e-9;
  return { accord: true, sV, lieV, lieQ };
}

if (form) {
  const boutons = $$("[data-preset]", form);
  const noms = ["enjeu", "dV", "dQ", "prem", "oV", "oQ"];
  const sauver = etatDansUrl(form, noms);

  const lire = () => ({
    enjeu: ENJEUX[form.elements.enjeu.value] ? form.elements.enjeu.value : "epaules",
    dV: Number(form.elements.dV.value),
    dQ: Number(form.elements.dQ.value),
    prem: form.elements.prem.value,
    oV: Number(form.elements.oV.value),
    oQ: Number(form.elements.oQ.value),
  });
  const ecrire = (v) => {
    for (const [k, x] of Object.entries(v)) form.elements[k].value = String(x);
  };
  const presetCourant = (v) => Object.keys(PRESETS).find((id) => noms.every((k) => String(PRESETS[id][k]) === String(v[k]))) || "";

  const calculer = () => {
    const p = lire();
    const e = ENJEUX[p.enjeu];
    $("#dV-val").textContent = nf(p.dV, 2);
    $("#dQ-val").textContent = nf(p.dQ, 2);
    $("#oV-val").textContent = pct(p.oV);
    $("#oQ-val").textContent = pct(p.oQ);
    $("#titre-enjeu").textContent = e.titre;

    const r = partager(p);
    const lecture = [];
    if (!r.accord) {
      $("#montant-marchandage").textContent = "Pas d'accord";
      $("#legende-marchandage").textContent = "les deux options extérieures réunies valent plus que l'enjeu : chacun gagne davantage à rompre";
      $("#barre-marchandage").innerHTML = "";
      $("#comparaison-marchandage").innerHTML = "";
      lecture.push("Quand chacun peut obtenir mieux ailleurs, il n'y a rien à partager. C'est rarement le cas dans une coalition : la rupture coûte presque toujours à tous.");
      $("#lecture-marchandage").innerHTML = lecture.map((t) => `<p>${t}</p>`).join("");
      marquerPreset(boutons, presetCourant(p));
      return;
    }
    $("#montant-marchandage").textContent = e.montant(r.sV);
    $("#legende-marchandage").textContent = e.legende(r.sV);

    const g = Math.max(0.0001, 1 - r.sV), d = Math.max(0.0001, r.sV);
    $("#barre-marchandage").innerHTML = `<div class="partage" role="img" aria-label="Les quatre : ${pct(1 - r.sV)} ; Vooruit : ${pct(r.sV)}">
        <div class="p1" style="flex: ${g}">${1 - r.sV >= 0.14 ? `Les quatre ${pct(1 - r.sV)}` : ""}</div>
        <div class="p2" style="flex: ${d}">${r.sV >= 0.14 ? `Vooruit ${pct(r.sV)}` : ""}</div>
      </div>
      <p class="bornes"><span>${e.bornes[0]}</span><span>${e.bornes[1]}</span></p>`;

    // Comparaison avec deux autres règles de partage
    const sansOption = partager({ ...p, oV: 0, oQ: 0 }).sV;
    const nash = p.oV + (1 - p.oV - p.oQ) / 2;
    const ligne = (nom, sV, note) => `<tr><td>${nom}</td><td>${pct(sV)}</td><td>${e.montant(sV)}</td><td class="petit">${note}</td></tr>`;
    $("#comparaison-marchandage").innerHTML = `<table class="mini-tableau comparaison">
      <caption>Trois règles de partage, part de Vooruit</caption>
      <thead><tr><th scope="col">Règle</th><th scope="col">Part</th><th scope="col">Montant</th><th scope="col"></th></tr></thead>
      <tbody>
        ${ligne("Rubinstein et option extérieure", r.sV, "le résultat ci-dessus")}
        ${ligne("Rubinstein sans option", sansOption, "patience et ordre des offres seulement")}
        ${ligne("Partage de la différence", nash, "chacun reçoit son option, puis la moitié du reste")}
      </tbody></table>`;

    // Lecture
    const plusPatient = p.dV > p.dQ ? "V" : p.dQ > p.dV ? "Q" : null;
    const gagnant = r.sV > 0.5005 ? "V" : r.sV < 0.4995 ? "Q" : null;
    const premier = p.prem === "vooruit" ? "V" : "Q";
    const nomC = { V: "Vooruit", Q: "les quatre" };
    const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
    const etre = (c) => (c === "V" ? "est" : "sont");
    const accord = (c, mot) => (c === "V" ? mot : mot + "s");
    let phrase = `Vooruit obtient ${pct(r.sV)} de l'écart, les quatre ${pct(1 - r.sV)}. `;
    if (plusPatient) {
      phrase += `${cap(nomC[plusPatient])} ${etre(plusPatient)} ${accord(plusPatient, "plus patient")} (${nf(Math.max(p.dV, p.dQ), 2)} contre ${nf(Math.min(p.dV, p.dQ), 2)})`;
      if (plusPatient === premier) phrase += ` et ${plusPatient === "V" ? "propose" : "proposent"} en premier : les deux avantages se cumulent.`;
      else phrase += `, mais ${nomC[premier]} ${premier === "V" ? "propose" : "proposent"} en premier. ${gagnant === plusPatient ? "La patience l'emporte." : gagnant ? "Ici, l'avantage de proposer en premier l'emporte." : "Les deux effets s'équilibrent."}`;
    } else {
      phrase += `Les deux camps sont aussi patients : seul l'avantage de proposer en premier fait pencher la balance, vers ${nomC[premier]}.`;
    }
    if (r.lieV || r.lieQ) phrase = `Vooruit obtient ${pct(r.sV)} de l'écart, les quatre ${pct(1 - r.sV)}.`;
    lecture.push(phrase);
    if (r.lieV) lecture.push(`L'option extérieure de Vooruit est contraignante : elle vaut plus que ce que la négociation lui donnerait. Les quatre doivent lui offrir exactement cette valeur, ni plus ni moins.`);
    else if (r.lieQ) lecture.push(`L'option extérieure des quatre est contraignante : Vooruit doit leur offrir exactement cette valeur.`);
    else if (p.oV > 0 || p.oQ > 0) lecture.push(`Les options extérieures ne changent rien : chaque camp obtient déjà plus en négociant qu'en rompant. C'est le principe de l'option extérieure, que la règle du « partage de la différence », dans le tableau, ignore.`);
    else lecture.push(`Sans option extérieure, la menace de rompre ne pèse pas : seuls comptent la patience et l'ordre des offres.`);
    if (p.enjeu === "epaules") lecture.push(`Pour mémoire, le milieu de l'écart serait 1,35 milliard. C'est un point focal naturel, que le modèle retrouve quand les deux camps sont presque aussi patients.`);
    $("#lecture-marchandage").innerHTML = lecture.map((t) => `<p>${t}</p>`).join("");
    marquerPreset(boutons, presetCourant(p));
  };

  form.addEventListener("input", () => { calculer(); sauver(); });
  form.addEventListener("change", () => { calculer(); sauver(); });
  for (const b of boutons) b.addEventListener("click", () => { ecrire(PRESETS[b.dataset.preset]); calculer(); sauver(); });
  const copier = $("#copier-lien");
  copier.hidden = false;
  copier.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(location.href); $("#copie-etat").textContent = "Lien copié."; }
    catch { $("#copie-etat").textContent = location.href; }
  });
  calculer();
}
