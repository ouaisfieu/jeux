// Initialise l'interface de recherche Pagefind (index construit au moment du déploiement).
const zone = document.getElementById("recherche");

if (zone && window.PagefindUI) {
  new window.PagefindUI({
    element: "#recherche",
    showSubResults: true,
    showImages: false,
    resetStyles: false,
    autofocus: true,
  });
  const q = new URLSearchParams(location.search).get("q");
  if (q) {
    const input = zone.querySelector("input");
    if (input) {
      input.value = q;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
} else if (zone) {
  zone.textContent = "L'index de recherche n'est pas disponible dans cette version du site.";
}
