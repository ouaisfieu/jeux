// Simulateur de guerre d'usure (forme réduite, Monte-Carlo reproductible).
import { nf, pct, $, $$, alea, etatDansUrl, marquerPreset } from "./commun.js";

const form = $("#form-usure");

const PRESETS = {
  nous: { vA: 4, cA: 0.8, vB: 4, cB: 1, inc: 0.5, douz: true, choc: false, chocSem: 7, chocMult: 3 },
  "sans-douziemes": { vA: 4, cA: 0.8, vB: 4, cB: 1, inc: 0.5, douz: false, choc: false, chocSem: 7, chocMult: 3 },
  choc: { vA: 4, cA: 0.8, vB: 4, cB: 1, inc: 0.5, douz: true, choc: true, chocSem: 7, chocMult: 3 },
  "vooruit-patient": { vA: 6, cA: 0.5, vB: 4, cB: 1, inc: 0.5, douz: true, choc: false, chocSem: 7, chocMult: 3 },
};
const N = 4000;
const DEBUT = new Date(Date.UTC(2026, 10, 22)); // 22 novembre 2026
const FIN_ANNEE = 39 / 7; // 31 décembre 2026, en semaines depuis le 22 novembre
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const dateSemaine = (w) => {
  const d = new Date(DEBUT.getTime() + Math.round(w * 7) * 86400000);
  const j = d.getUTCDate();
  return `${j === 1 ? "1er" : j} ${MOIS[d.getUTCMonth()]}${d.getUTCFullYear() !== 2026 ? " " + d.getUTCFullYear() : ""}`;
};

// Temps nécessaire pour que le coût cumulé atteigne l'enjeu
const seuil = (V, c, p) => {
  if (!p.choc || V <= c * p.chocSem) return V / c;
  return p.chocSem + (V - c * p.chocSem) / (c * p.chocMult);
};

export function simuler(p) {
  const r = alea();
  const tire = (x) => x * (1 + p.inc * (2 * r() - 1));
  const facteur = p.douz ? 0.7 : 1;
  const fins = new Float64Array(N);
  const cedeA = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    const tA = seuil(tire(p.vA), Math.max(0.02, tire(p.cA)) * facteur, p);
    const tB = seuil(tire(p.vB), Math.max(0.02, tire(p.cB)) * facteur, p);
    fins[i] = Math.min(tA, tB);
    cedeA[i] = tA < tB ? 1 : 0;
  }
  const tri = Float64Array.from(fins).sort();
  // Nombre de classes adapté à la dispersion (de 10 à 26 semaines, la dernière regroupant le reste)
  const nb = Math.min(26, Math.max(10, Math.ceil(tri[Math.floor(0.99 * N)]) + 1));
  const classes = Array.from({ length: nb + 1 }, () => [0, 0]);
  let avantFin = 0, nA = 0;
  for (let i = 0; i < N; i++) {
    const k = Math.min(nb, Math.floor(fins[i]));
    classes[k][cedeA[i] ? 0 : 1]++;
    if (fins[i] < FIN_ANNEE) avantFin++;
    nA += cedeA[i];
  }
  return { nb, fins: tri, mediane: tri[Math.floor(N / 2)], q1: tri[Math.floor(N / 4)], q3: tri[Math.floor((3 * N) / 4)], classes, pAvantFin: avantFin / N, pA: nA / N };
}

if (form) {
  const boutons = $$("[data-preset]", form);
  const noms = Object.keys(PRESETS.nous);
  const sauver = etatDansUrl(form, noms);

  const lire = () => ({
    vA: Number(form.elements.vA.value), cA: Number(form.elements.cA.value),
    vB: Number(form.elements.vB.value), cB: Number(form.elements.cB.value),
    inc: Number(form.elements.inc.value), douz: form.elements.douz.checked,
    choc: form.elements.choc.checked, chocSem: Number(form.elements.chocSem.value), chocMult: Number(form.elements.chocMult.value),
  });
  const ecrire = (v) => {
    for (const [k, x] of Object.entries(v)) {
      const el = form.elements[k];
      if (el.type === "checkbox") el.checked = x;
      else el.value = String(x);
    }
  };
  const presetCourant = (v) =>
    Object.keys(PRESETS).find((id) => noms.every((k) => PRESETS[id][k] === v[k])) || "";

  const dessinerHisto = (res, p) => {
    const W = 420, H = 230, G = 38, D = 412, Hh = 22, B = 192;
    const max = Math.max(...res.classes.map(([a, b]) => a + b)) / N;
    const pasY = max > 0.2 ? 0.1 : 0.05;
    const ymax = Math.max(pasY, Math.ceil(max / pasY) * pasY);
    const nb = res.nb;
    const bw = (D - G) / (nb + 1);
    const y = (f) => B - (B - Hh) * (f / ymax);
    let s = `<svg class="histo" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="h-titre h-desc">`;
    s += `<title id="h-titre">Répartition des dates de dénouement sur ${nf(N)} simulations</title>`;
    s += `<desc id="h-desc">Médiane : semaine ${nf(res.mediane, 1)}. ${pct(res.pAvantFin)} des simulations se dénouent avant le 31 décembre.</desc>`;
    for (let t = 0; t <= ymax + 1e-9; t += pasY) {
      s += `<line class="grille-l" x1="${G}" x2="${D}" y1="${y(t)}" y2="${y(t)}"/>`;
      s += `<text x="${G - 6}" y="${y(t) + 4}" text-anchor="end">${pct(t)}</text>`;
    }
    res.classes.forEach(([a, b], k) => {
      const x0 = G + k * bw + 1, w = bw - 2;
      const fa = a / N, fb = b / N;
      const tip = `<title>${k === nb ? `${nb} semaines et plus` : `Semaine ${k} (à partir du ${dateSemaine(k)})`} : Vooruit cède dans ${pct(fa, 1)} des simulations, les quatre dans ${pct(fb, 1)}</title>`;
      if (fb > 0) s += `<rect class="b1" x="${x0}" y="${y(fb)}" width="${w}" height="${Math.max(0, B - y(fb))}" rx="2">${tip}</rect>`;
      if (fa > 0) s += `<rect class="b2" x="${x0}" y="${y(fa + fb)}" width="${w}" height="${Math.max(0, y(fb) - y(fa + fb) - (fb > 0 ? 2 : 0))}" rx="2">${tip}</rect>`;
    });
    s += `<line class="axe" x1="${G}" x2="${D}" y1="${B}" y2="${B}"/>`;
    const pasX = nb <= 12 ? 2 : 4;
    for (let k = 0; k <= nb - 2; k += pasX) {
      s += `<text x="${G + k * bw + bw / 2}" y="${B + 14}" text-anchor="middle">${k}</text>`;
    }
    s += `<text x="${G + nb * bw + bw / 2}" y="${B + 14}" text-anchor="middle">${nb}+</text>`;
    s += `<text x="${(G + D) / 2}" y="${B + 30}" text-anchor="middle">semaines après le 22 novembre</text>`;
    const xFin = G + FIN_ANNEE * bw;
    s += `<line class="repere" x1="${xFin}" x2="${xFin}" y1="${Hh - 8}" y2="${B}"/><text class="repere-t" x="${xFin - 4}" y="${Hh - 10}" text-anchor="end">31 déc.</text>`;
    if (p.choc) {
      const xc = G + p.chocSem * bw;
      s += `<line class="repere choc" x1="${xc}" x2="${xc}" y1="${Hh - 8}" y2="${B}"/><text class="repere-t" x="${xc + 4}" y="${Hh - 10}">choc</text>`;
    }
    s += `</svg>`;
    const legende = `<p class="legende"><span>Les quatre cèdent l'essentiel</span><span class="l2">Vooruit cède l'essentiel</span></p>`;
    const table = `<details class="valeurs"><summary>Voir les valeurs</summary><table class="mini-tableau"><thead><tr><th scope="col">Semaine</th><th scope="col">Vooruit cède</th><th scope="col">Les quatre cèdent</th></tr></thead><tbody>${res.classes
      .map(([a, b], k) => `<tr><td>${k === res.nb ? res.nb + " et plus" : k}</td><td>${pct(a / N, 1)}</td><td>${pct(b / N, 1)}</td></tr>`)
      .join("")}</tbody></table></details>`;
    $("#histo-usure").innerHTML = legende + s + table;
  };

  const calculer = () => {
    const p = lire();
    for (const k of ["vA", "cA", "vB", "cB", "chocSem", "chocMult"]) $(`#${k}-val`).textContent = nf(p[k], Number.isInteger(p[k]) ? 0 : 1);
    $("#inc-val").textContent = `±${pct(p.inc)}`;
    form.elements.chocSem.disabled = form.elements.chocMult.disabled = !p.choc;
    const res = simuler(p);
    $("#mediane-usure").textContent = `${nf(res.mediane, 1)} semaines`;
    $("#mediane-legende").textContent = `durée médiane du blocage, soit un dénouement vers le ${dateSemaine(res.mediane)} ; la moitié centrale des simulations s'étend du ${dateSemaine(res.q1)} au ${dateSemaine(res.q3)}`;
    dessinerHisto(res, p);

    // Comparaison : même réglage, douzièmes inversés
    const alt = simuler({ ...p, douz: !p.douz });
    const lecture = [];
    lecture.push(`${pct(res.pAvantFin)} des simulations se dénouent avant le 31 décembre. Dans ${pct(res.pA)} des cas, c'est Vooruit qui cède l'essentiel ; dans ${pct(1 - res.pA)}, ce sont les quatre.`);
    lecture.push(
      p.douz
        ? `Sans douzièmes provisoires, la durée médiane tomberait à ${nf(alt.mediane, 1)} semaines : en rendant l'attente supportable, ils allongent le blocage.`
        : `Avec des douzièmes provisoires, la durée médiane monterait à ${nf(alt.mediane, 1)} semaines : un filet de sécurité allonge l'attente.`
    );
    if (p.choc) {
      const sansChoc = simuler({ ...p, choc: false });
      const apres = (fins) => {
        const r = fins.filter((t) => t > p.chocSem);
        return { part: r.length / N, med: r.length ? r[Math.floor(r.length / 2)] - p.chocSem : 0 };
      };
      const avec = apres(res.fins), sans = apres(sansChoc.fins);
      if (avec.part > 0.005) {
        lecture.push(`${pct(avec.part)} des simulations sont encore bloquées au moment du choc, en semaine ${p.chocSem}. Le choc les dénoue en médiane ${nf(avec.med, 1)} semaine${avec.med >= 2 ? "s" : ""} plus tard, contre ${nf(sans.med, 1)} sans lui. C'est le mécanisme de novembre 2011, quand une dégradation de notation a précédé l'accord d'un jour.`);
      } else {
        lecture.push(`Presque toutes les simulations se dénouent avant le choc de la semaine ${p.chocSem}, qui n'a donc guère d'effet. Avancez-le pour le voir agir.`);
      }
    }
    if (p.inc === 0) lecture.push(`Sans incertitude, le résultat est certain : le camp le plus pressé le sait dès le départ. Dans le modèle original, il céderait d'ailleurs immédiatement ; l'attente naît de l'incertitude.`);
    $("#lecture-usure").innerHTML = lecture.map((t) => `<p>${t}</p>`).join("");
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
