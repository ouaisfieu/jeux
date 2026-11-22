// Outil de scénarios : arbre de probabilités, sensibilité et lien partageable.
// Les formules sont les mêmes que le filtre « scenarioCalc » utilisé pour le rendu sans JavaScript.

const donnees = JSON.parse(document.getElementById("donnees-scenarios")?.textContent || "null");
const form = document.getElementById("form-scenarios");

const pct = (x, d = 0) =>
  (x * 100).toLocaleString("fr-BE", { minimumFractionDigits: d, maximumFractionDigits: d }) + " %";

export function calculer(v) {
  const A = v.q1 * v.q2 * v.q3 + (1 - v.q1 * v.q2) * v.q4;
  const sans = 1 - A;
  const rupture = sans * (1 - v.q5);
  return { A, B: sans * v.q5, C: rupture * v.q6, D: rupture * (1 - v.q6), sans, rupture };
}

if (donnees && form) {
  const ids = donnees.questions.map((q) => q.id);
  const nomIssue = Object.fromEntries(donnees.issues.map((i) => [i.id, i.nom]));
  const metrique = document.getElementById("metrique");
  const boutonsPreset = [...form.querySelectorAll("[data-preset]")];
  const copier = document.getElementById("copier-lien");
  const etatCopie = document.getElementById("copie-etat");

  const lire = () => Object.fromEntries(ids.map((id) => [id, Number(form.elements[id].value)]));

  const ecrire = (valeurs) => {
    for (const id of ids) {
      if (valeurs[id] === undefined) continue;
      const x = Math.min(1, Math.max(0, Math.round(valeurs[id] * 20) / 20));
      form.elements[id].value = String(x);
    }
  };

  // Réglages passés dans l'adresse (?q1=0.75&q2=…)
  const params = new URLSearchParams(location.search);
  const depuisUrl = {};
  for (const id of ids) {
    const x = Number(params.get(id));
    if (params.has(id) && Number.isFinite(x)) depuisUrl[id] = x;
  }
  ecrire(depuisUrl);

  const barres = () => {
    const r = calculer(lire());
    for (const ligne of document.querySelectorAll("#barres-issues .rangee")) {
      const x = r[ligne.dataset.issue];
      ligne.querySelector(".rempli").style.width = `${(x * 100).toFixed(1)}%`;
      ligne.querySelector(".val").textContent = pct(x);
    }
    return r;
  };

  // Sensibilité : effet de ±15 points sur chaque hypothèse, les autres fixées.
  const sensibilite = (v, cle) => {
    const base = calculer(v)[cle];
    const lignes = donnees.questions.map((q) => {
      const bas = Math.max(0, v[q.id] - 0.15);
      const haut = Math.min(1, v[q.id] + 0.15);
      const yBas = calculer({ ...v, [q.id]: bas })[cle];
      const yHaut = calculer({ ...v, [q.id]: haut })[cle];
      return { q, bas, haut, yBas, yHaut, ampleur: Math.abs(yHaut - yBas) };
    });
    lignes.sort((a, b) => b.ampleur - a.ampleur);
    return { base, lignes };
  };

  const dessinerSensibilite = (v) => {
    const cle = metrique.value;
    const { base, lignes } = sensibilite(v, cle);
    const W = 440, G = 12, D = 428, H0 = 26, pas = 44, H = H0 + lignes.length * pas + 4;
    const x = (p) => G + (D - G) * p;
    let svg = `<svg class="halteres" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="sens-titre sens-desc">`;
    svg += `<title id="sens-titre">Sensibilité de la probabilité « ${nomIssue[cle].toLowerCase()} » à chaque hypothèse</title>`;
    svg += `<desc id="sens-desc">${lignes
      .map((l) => `${l.q.court} : de ${pct(l.yBas)} à ${pct(l.yHaut)}`)
      .join(" ; ")}.</desc>`;
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      svg += `<line class="grille-l" x1="${x(t)}" x2="${x(t)}" y1="${H0 - 4}" y2="${H - 4}"/>`;
      svg += `<text x="${x(t)}" y="${H0 - 10}" text-anchor="${t === 0 ? "start" : t === 1 ? "end" : "middle"}">${pct(t)}</text>`;
    }
    svg += `<line class="actuel" x1="${x(base)}" x2="${x(base)}" y1="${H0 - 4}" y2="${H - 4}"/>`;
    lignes.forEach((l, i) => {
      const yT = H0 + i * pas + 14;
      const y = yT + 15;
      const a = Math.min(l.yBas, l.yHaut), b = Math.max(l.yBas, l.yHaut);
      svg += `<g><title>${l.q.court} : à ${pct(l.bas)}, ${pct(l.yBas)} ; à ${pct(l.haut)}, ${pct(l.yHaut)}</title>`;
      svg += `<text class="nomp" x="${G}" y="${yT}">${l.q.court}</text>`;
      svg += `<line class="lien" x1="${x(a)}" x2="${x(b)}" y1="${y}" y2="${y}"/>`;
      svg += `<circle class="avant" cx="${x(l.yBas)}" cy="${y}" r="6"/>`;
      svg += `<circle class="apres" cx="${x(l.yHaut)}" cy="${y}" r="6"/></g>`;
    });
    svg += `</svg>`;
    const legende = `<p class="legende legende-points"><span class="l-vide">Hypothèse diminuée de 15 points</span><span>Hypothèse augmentée de 15 points</span></p>`;
    const table = `<details class="valeurs"><summary>Voir les valeurs</summary><table class="mini-tableau"><thead><tr><th scope="col">Hypothèse</th><th scope="col">−15 points</th><th scope="col">+15 points</th></tr></thead><tbody>${lignes
      .map((l) => `<tr><td>${l.q.court}</td><td>${pct(l.yBas)}</td><td>${pct(l.yHaut)}</td></tr>`)
      .join("")}</tbody></table></details>`;
    document.getElementById("sensibilite").innerHTML = legende + svg + table;
    return lignes[0];
  };

  const dessinerArbre = (v, r) => {
    const g = v.q1, m = v.q2, s = v.q3, c = v.q4, p = v.q5, e = v.q6;
    const n = (texte, cond, chemin, issue) =>
      `<span class="noeud">${texte} <span class="cond">(${pct(cond)})</span>${
        chemin !== undefined ? ` <span class="chemin${issue ? " issue-" + issue : ""}">${issue ? nomIssue[issue] + " : " : "pas d'accord : "}${pct(chemin, 1)}</span>` : ""
      }</span>`;
    const html = `<ul class="arbre">
      <li>${n("Un geste est proposé", g)}
        <ul>
          <li>${n("le MR l'accepte", m)}
            <ul>
              <li>${n("Vooruit signe", s, g * m * s, "A")}</li>
              <li>${n("Vooruit ne signe pas", 1 - s, g * m * (1 - s))}</li>
            </ul>
          </li>
          <li>${n("le MR le refuse", 1 - m)}
            <ul>
              <li>${n("Vooruit cède quand même", c, g * (1 - m) * c, "A")}</li>
              <li>${n("Vooruit tient", 1 - c, g * (1 - m) * (1 - c))}</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>${n("Aucun geste", 1 - g)}
        <ul>
          <li>${n("Vooruit cède quand même", c, (1 - g) * c, "A")}</li>
          <li>${n("Vooruit tient", 1 - c, (1 - g) * (1 - c))}</li>
        </ul>
      </li>
    </ul>
    <ul class="arbre">
      <li><span class="noeud">Sans accord <span class="cond">(${pct(r.sans, 1)} au total)</span></span>
        <ul>
          <li>${n("on prolonge", p, r.B, "B")}</li>
          <li>${n("on rompt", 1 - p)}
            <ul>
              <li>${n("élections", e, r.C, "C")}</li>
              <li>${n("autre majorité", 1 - e, r.D, "D")}</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>`;
    document.getElementById("arbre").innerHTML = html;
  };

  const ecrireLecture = (r, poids) => {
    const issues = ["A", "B", "C", "D"].map((k) => ({ k, x: r[k] })).sort((a, b) => b.x - a.x);
    const tete = issues[0];
    const phrases = [];
    const avecArticle = { A: "l'accord-cadre", B: "l'enlisement", C: "des élections anticipées", D: "une recomposition" };
    phrases.push(`Avec ces hypothèses, l'issue la plus probable est ${avecArticle[tete.k]} (${pct(tete.x)}).`);
    if (tete.k === "A" && tete.x >= 0.5) phrases.push(`Un accord reste plus probable que toutes les autres issues réunies, sans être acquis.`);
    else if (tete.k === "A") phrases.push(`C'est le scénario central, mais il pèse moins qu'une chance sur deux.`);
    else phrases.push(`L'accord n'est plus le scénario central (${pct(r.A)}).`);
    if (r.sans > 0.005) {
      phrases.push(
        r.B >= r.rupture
          ? `Faute d'accord (${pct(r.sans)}), l'enlisement (${pct(r.B)}) l'emporterait sur la rupture (${pct(r.rupture)}).`
          : `Faute d'accord (${pct(r.sans)}), la rupture (${pct(r.rupture)}) l'emporterait sur l'enlisement (${pct(r.B)}).`
      );
    }
    if (poids) phrases.push(`L'hypothèse qui fait le plus varier la probabilité observée ci-dessous est : « ${poids.q.label} ».`);
    document.getElementById("lecture-scenarios").innerHTML = `<p>${phrases.join(" ")}</p>`;
  };

  const majUrl = (v) => {
    const p = new URLSearchParams(location.search);
    for (const id of ids) p.set(id, String(v[id]));
    history.replaceState(null, "", `${location.pathname}?${p.toString()}`);
  };

  const majPresets = (v) => {
    for (const b of boutonsPreset) {
      const pr = donnees.presets.find((p) => p.id === b.dataset.preset);
      const egal = ids.every((id) => Math.abs(pr.valeurs[id] - v[id]) < 0.013);
      b.setAttribute("aria-pressed", egal ? "true" : "false");
    }
  };

  const toutMettreAJour = (majAdresse = true) => {
    const v = lire();
    for (const id of ids) document.getElementById(`${id}-val`).textContent = pct(v[id]);
    const r = barres();
    const poids = dessinerSensibilite(v);
    dessinerArbre(v, r);
    ecrireLecture(r, poids);
    majPresets(v);
    if (majAdresse) majUrl(v);
  };

  form.addEventListener("input", () => toutMettreAJour());
  form.addEventListener("submit", (e) => e.preventDefault());
  metrique.addEventListener("change", () => toutMettreAJour(false));
  for (const b of boutonsPreset) {
    b.addEventListener("click", () => {
      const pr = donnees.presets.find((p) => p.id === b.dataset.preset);
      ecrire(pr.valeurs);
      toutMettreAJour();
    });
  }
  if (copier) {
    copier.hidden = false;
    copier.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        etatCopie.textContent = "Lien copié.";
      } catch {
        etatCopie.textContent = location.href;
      }
    });
  }
  toutMettreAJour(Object.keys(depuisUrl).length > 0);
}
