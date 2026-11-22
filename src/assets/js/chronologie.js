// Filtres de la chronologie : amélioration progressive d'une liste déjà complète en HTML.
const form = document.getElementById("filtres-chrono");

if (form) {
  form.hidden = false;
  const evts = [...document.querySelectorAll(".chrono-evt")];
  const groupes = [...document.querySelectorAll(".chrono-groupe")];
  const compteur = document.getElementById("compteur-chrono");
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const textes = new Map(evts.map((li) => [li, norm(li.textContent)]));
  const coches = (nom) => [...form.querySelectorAll(`input[name="${nom}"]:checked`)].map((i) => i.value);

  const appliquer = () => {
    const acteurs = coches("acteur");
    const types = coches("type");
    const q = norm(form.elements.q.value.trim());
    const majeurs = form.elements.majeurs.checked;
    let n = 0;
    for (const li of evts) {
      const a = li.dataset.acteurs.split(" ").filter(Boolean);
      const ok =
        (!acteurs.length || acteurs.some((x) => a.includes(x))) &&
        (!types.length || types.includes(li.dataset.type)) &&
        (!q || textes.get(li).includes(q)) &&
        (!majeurs || li.hasAttribute("data-majeur"));
      li.hidden = !ok;
      if (ok) n++;
    }
    for (const g of groupes) g.hidden = !g.querySelector(".chrono-evt:not([hidden])");
    compteur.textContent =
      n === evts.length ? `${n} événements` : n === 0 ? "Aucun événement ne correspond à ces filtres." : `${n} événement${n > 1 ? "s" : ""} sur ${evts.length}`;
  };

  form.addEventListener("input", appliquer);
  form.addEventListener("change", appliquer);
  form.addEventListener("reset", () => setTimeout(appliquer, 0));
  form.addEventListener("submit", (e) => e.preventDefault());
  appliquer();
}
