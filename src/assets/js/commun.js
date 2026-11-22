// Fonctions partagées par les outils.
export const nf = (x, d = 0) => Number(x).toLocaleString("fr-BE", { minimumFractionDigits: d, maximumFractionDigits: d });
export const pct = (x, d = 0) => nf(x * 100, d) + " %";
export const $ = (sel, racine = document) => racine.querySelector(sel);
export const $$ = (sel, racine = document) => [...racine.querySelectorAll(sel)];

// Générateur pseudo-aléatoire reproductible (mulberry32), pour des simulations stables.
export function alea(graine = 20261122) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Synchronise les champs d'un formulaire avec l'adresse de la page.
export function etatDansUrl(form, noms) {
  const p = new URLSearchParams(location.search);
  for (const n of noms) {
    const el = form.elements[n];
    if (!el || !p.has(n)) continue;
    if (el.type === "checkbox") el.checked = p.get(n) === "1";
    else if (el instanceof RadioNodeList) el.value = p.get(n);
    else el.value = p.get(n);
  }
  return () => {
    const q = new URLSearchParams();
    for (const n of noms) {
      const el = form.elements[n];
      if (!el) continue;
      q.set(n, el.type === "checkbox" ? (el.checked ? "1" : "0") : el.value);
    }
    history.replaceState(null, "", `${location.pathname}?${q.toString()}`);
  };
}

// Met à jour l'état « enfoncé » des boutons de préréglage.
export function marquerPreset(boutons, actif) {
  for (const b of boutons) b.setAttribute("aria-pressed", b.dataset.preset === actif ? "true" : "false");
}
