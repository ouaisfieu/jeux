// Simulateur de la poule mouillée : équilibres purs et mixte, engagement préalable.
import { nf, pct, $, $$, etatDansUrl, marquerPreset } from "./commun.js";

const form = $("#form-poule");
const presets = JSON.parse($("#donnees-poule")?.textContent || "null");

if (form && presets) {
  const champs = ["aW", "aC", "aL", "aD", "bW", "bC", "bL", "bD"];
  const boutons = $$("[data-preset]", form);
  const parDefaut = { a: { sujet: "le camp A", de: "du camp A", pl: false }, b: { sujet: "le camp B", de: "du camp B", pl: false } };
  let noms = parDefaut;
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
  const N = (c) => noms[c].sujet; // sujet en minuscule initiale
  const Nc = (c) => cap(noms[c].sujet); // en début de phrase
  const vb = (c, sing, plur) => (noms[c].pl ? plur : sing);
  let presetActif = "novembre";

  // L'adresse garde les valeurs, l'engagement et le préréglage (pour les noms des camps).
  const p0 = new URLSearchParams(location.search);
  if (p0.has("preset") && presets[p0.get("preset")]) presetActif = p0.get("preset");
  const appliquerNoms = (id) => {
    const pr = presets[id];
    noms = pr ? { a: pr.A, b: pr.B } : parDefaut;
    for (const el of $$("[data-nom]")) el.textContent = cap(noms[el.dataset.nom].sujet);
  };
  const appliquerPreset = (id) => {
    const pr = presets[id];
    ["W", "C", "L", "D"].forEach((k, i) => {
      form.elements["a" + k].value = pr.a[i];
      form.elements["b" + k].value = pr.b[i];
    });
    presetActif = id;
    appliquerNoms(id);
  };
  appliquerPreset(presetActif);
  const sauver = etatDansUrl(form, [...champs, "engagement"]);
  appliquerNoms(presetActif);

  const lire = () => {
    const v = (n) => Number(form.elements[n].value);
    return {
      a: { W: v("aW"), C: v("aC"), L: v("aL"), D: v("aD") },
      b: { W: v("bW"), C: v("bC"), L: v("bL"), D: v("bD") },
      eng: form.elements.engagement.value,
    };
  };

  // Type de préférences d'un camp
  const profil = (g) => {
    if (g.W > g.C && g.L > g.D) return "depend";
    if (g.W >= g.C && g.D >= g.L && (g.W > g.C || g.D > g.L)) return "tenir";
    if (g.C >= g.W && g.L >= g.D && (g.C > g.W || g.L > g.D)) return "ceder";
    if (g.C > g.W && g.D > g.L) return "imiter";
    return "indifferent";
  };
  const phraseProfil = {
    depend: "le meilleur choix dépend de l'autre camp : tenir s'il cède, céder s'il tient",
    tenir: "tenir est le meilleur choix, quoi que fasse l'autre camp",
    ceder: "céder est le meilleur choix, quoi que fasse l'autre camp",
    imiter: "mieux vaut faire comme l'autre camp : céder s'il cède, tenir s'il tient",
    indifferent: "tenir et céder se valent dans au moins un cas",
  };

  // Gains de chaque case [A, B] ; s = "c" (céder) ou "t" (tenir)
  const gains = (g, sa, sb) => {
    if (sa === "c" && sb === "c") return [g.a.C, g.b.C];
    if (sa === "c" && sb === "t") return [g.a.L, g.b.W];
    if (sa === "t" && sb === "c") return [g.a.W, g.b.L];
    return [g.a.D, g.b.D];
  };
  const meilleureA = (g, sb) => (sb === "c" ? [g.a.C, g.a.W] : [g.a.L, g.a.D]);
  const meilleureB = (g, sa) => (sa === "c" ? [g.b.C, g.b.W] : [g.b.L, g.b.D]);
  const estEquilibre = (g, sa, sb) => {
    const [cA, tA] = meilleureA(g, sb);
    const [cB, tB] = meilleureB(g, sa);
    const okA = sa === "c" ? cA >= tA : tA >= cA;
    const okB = sb === "c" ? cB >= tB : tB >= cB;
    return okA && okB;
  };
  const libelle = (sa, sb) =>
    ({ cc: "compromis", ct: `${Nc("b")} ${vb("b", "l'emporte", "l'emportent")}`, tc: `${Nc("a")} ${vb("a", "l'emporte", "l'emportent")}`, tt: "collision" })[sa + sb];

  const dessinerMatrice = (g, eqs, engage) => {
    const cell = (sa, sb) => {
      const [x, y] = gains(g, sa, sb);
      const eq = eqs.includes(sa + sb);
      const ici = engage === sa + sb;
      return `<td class="${eq ? "eq" : ""}${ici ? " engage" : ""}">${x}, ${y}<span class="petit">${libelle(sa, sb)}${eq ? ", équilibre" : ""}</span></td>`;
    };
    $("#matrice-poule").innerHTML = `<table class="mini-matrice">
      <caption>Gains ${noms.a.de} puis ${noms.b.de}. Cases dorées : équilibres de Nash.</caption>
      <thead><tr><th scope="col"></th><th scope="col">${Nc("b")} ${vb("b", "cède", "cèdent")}</th><th scope="col">${Nc("b")} ${vb("b", "tient", "tiennent")}</th></tr></thead>
      <tbody>
        <tr><th scope="row">${Nc("a")} ${vb("a", "cède", "cèdent")}</th>${cell("c", "c")}${cell("c", "t")}</tr>
        <tr><th scope="row">${Nc("a")} ${vb("a", "tient", "tiennent")}</th>${cell("t", "c")}${cell("t", "t")}</tr>
      </tbody></table>`;
  };

  const calculer = () => {
    const g = lire();
    const pa = profil(g.a), pb = profil(g.b);
    const eqs = ["cc", "ct", "tc", "tt"].filter((k) => estEquilibre(g, k[0], k[1]));

    // Équilibre mixte : seulement si les deux camps ont des préférences « qui dépendent de l'autre »
    let mixte = null;
    if (pa === "depend" && pb === "depend") {
      const qB = (g.a.W - g.a.C) / (g.a.W - g.a.C + (g.a.L - g.a.D)); // B tient avec qB
      const qA = (g.b.W - g.b.C) / (g.b.W - g.b.C + (g.b.L - g.b.D)); // A tient avec qA
      mixte = { qA, qB, collision: qA * qB };
    }

    // Engagement : le camp engagé tient ; l'autre répond au mieux
    let engage = null;
    if (g.eng !== "aucun") {
      if (g.eng === "a") {
        const [c, t] = meilleureB(g, "t");
        engage = c > t ? "tc" : t > c ? "tt" : "?";
      } else {
        const [c, t] = meilleureA(g, "t");
        engage = c > t ? "ct" : t > c ? "tt" : "?";
      }
    }

    dessinerMatrice(g, eqs, engage);
    $("#types-poule").innerHTML = `<p>Pour <strong>${N("a")}</strong>, ${phraseProfil[pa]}.</p><p>Pour <strong>${N("b")}</strong>, ${phraseProfil[pb]}.</p>`;

    // Chiffre clé et lecture
    const chiffre = $("#collision-poule");
    const legende = $("#collision-legende");
    const lecture = [];
    const estPoule = pa === "depend" && pb === "depend";
    const ordreA = g.a.W > g.a.C && g.a.C > g.a.L && g.a.L > g.a.D;
    const ordreB = g.b.W > g.b.C && g.b.C > g.b.L && g.b.L > g.b.D;

    if (engage) {
      const q = g.eng, o = g.eng === "a" ? "b" : "a";
      if (engage === "?") {
        chiffre.textContent = "indéterminé";
        legende.textContent = `pour ${N(o)}, céder et subir la collision se valent`;
      } else {
        chiffre.textContent = engage === "tt" ? pct(1) : pct(0);
        legende.textContent = engage === "tt" ? "avec cet engagement, la collision est certaine" : "avec cet engagement, pas de collision";
        lecture.push(
          engage === "tt"
            ? `${Nc(q)} ${vb(q, "s'engage", "s'engagent")} à tenir, mais ${N(o)} ${vb(o, "préfère", "préfèrent")} la collision à l'humiliation : l'engagement mène droit au mur. C'est le danger des lignes rouges croisées.`
            : `${Nc(q)} ${vb(q, "s'engage", "s'engagent")} à tenir ; ${N(o)}, qui ${vb(o, "préfère", "préfèrent")} perdre la face à la collision, ${vb(o, "a", "ont")} intérêt à céder. Celui qui s'engage le premier l'emporte, à condition que l'autre ne se soit pas engagé aussi.`
        );
      }
    } else if (mixte) {
      chiffre.textContent = pct(mixte.collision);
      legende.textContent = `dans l'équilibre où chacun hésite : ${N("a")} ${vb("a", "tient", "tiennent")} dans ${pct(mixte.qA)} des cas, ${N("b")} dans ${pct(mixte.qB)}`;
    } else if (eqs.length === 1) {
      chiffre.textContent = eqs[0] === "tt" ? pct(1) : pct(0);
      legende.textContent = `un seul équilibre : ${libelle(eqs[0][0], eqs[0][1])}`;
    } else {
      chiffre.textContent = "–";
      legende.textContent = "pas de probabilité unique dans ce jeu";
    }

    if (!engage) {
      if (estPoule) {
        lecture.push(
          `C'est une poule mouillée : deux équilibres où l'un tient et l'autre cède, et aucun moyen de savoir lequel s'imposera. Chacun a intérêt à convaincre l'autre qu'il ne cédera pas.`
        );
        lecture.push(
          `Dans l'équilibre mixte, la probabilité que ${N("b")} ${vb("b", "tienne", "tiennent")} dépend des gains ${noms.a.de}, et inversement. Plus la collision coûte cher aux deux camps, plus ce risque baisse.`
        );
      } else if (pa === "tenir" && pb === "depend") {
        lecture.push(`${Nc("a")} ${vb("a", "tient", "tiennent")} quoi qu'il arrive. ${Nc("b")} ${vb("b", "n'a", "n'ont")} donc qu'une réponse sensée : céder. Ce n'est plus une poule mouillée, mais un jeu où l'engagement ${noms.a.de} est déjà inscrit dans ses préférences.`);
      } else if (pb === "tenir" && pa === "depend") {
        lecture.push(`${Nc("b")} ${vb("b", "tient", "tiennent")} quoi qu'il arrive. ${Nc("a")} ${vb("a", "n'a", "n'ont")} donc qu'une réponse sensée : céder. Ce n'est plus une poule mouillée, mais un jeu où l'engagement ${noms.b.de} est déjà inscrit dans ses préférences.`);
      } else if (pa === "tenir" && pb === "tenir") {
        lecture.push(`Les deux camps préfèrent la collision à la défaite. Aucun ne cède : c'est une impasse, pas une poule mouillée.`);
      } else {
        lecture.push(`Avec ces valeurs, le jeu n'a plus la structure d'une poule mouillée. Regardez les cases dorées pour voir où il se stabilise.`);
      }
    }
    if (!ordreA || !ordreB) {
      const qui = [!ordreA && N("a"), !ordreB && N("b")].filter(Boolean).join(" et ");
      lecture.push(`Pour ${qui}, l'ordre classique (gagner, compromis, perdre la face, collision) n'est pas respecté. C'est souvent là que se cache la clé d'un blocage.`);
    }
    $("#lecture-poule").innerHTML = lecture.map((t) => `<p>${t}</p>`).join("");
    for (const n of champs) $(`#${n}-val`).textContent = nf(form.elements[n].value);
  };

  const sauverTout = () => {
    sauver();
    const q = new URLSearchParams(location.search);
    q.set("preset", presetActif);
    history.replaceState(null, "", `${location.pathname}?${q.toString()}`);
  };

  form.addEventListener("input", (e) => {
    if (e.target.type === "range") marquerPreset(boutons, "");
    calculer();
    sauverTout();
  });
  for (const b of boutons)
    b.addEventListener("click", () => {
      appliquerPreset(b.dataset.preset);
      marquerPreset(boutons, b.dataset.preset);
      calculer();
      sauverTout();
    });
  const copier = $("#copier-lien");
  copier.hidden = false;
  copier.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      $("#copie-etat").textContent = "Lien copié.";
    } catch {
      $("#copie-etat").textContent = location.href;
    }
  });
  if (!p0.has("aW")) marquerPreset(boutons, presetActif);
  calculer();
}
