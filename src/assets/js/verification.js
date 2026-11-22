// Filtre des affirmations par verdict : amélioration progressive.
const form = document.getElementById("filtres-verif");

if (form) {
  form.hidden = false;
  const items = [...document.querySelectorAll(".verif")];
  const compteur = document.getElementById("compteur-verif");
  const appliquer = () => {
    const actifs = new Set([...form.querySelectorAll('input[name="statut"]:checked')].map((i) => i.value));
    let n = 0;
    for (const el of items) {
      const ok = actifs.has(el.dataset.statut);
      el.hidden = !ok;
      if (ok) n++;
    }
    compteur.textContent = `${n} affirmation${n > 1 ? "s" : ""} affichée${n > 1 ? "s" : ""} sur ${items.length}`;
  };
  form.addEventListener("change", appliquer);
  appliquer();
}
