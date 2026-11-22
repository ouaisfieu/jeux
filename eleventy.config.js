import fs from "node:fs";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAnchor from "markdown-it-anchor";
import { HtmlBasePlugin } from "@11ty/eleventy";

// Typographie française : espaces insécables fines avant ; : ! ? » et après «,
// appliquées uniquement au texte (jamais dans les balises, scripts, styles, code).
function frenchTypography(html) {
  const parts = html.split(/(<[^>]+>)/g);
  let skip = 0;
  const SKIP = /^<(script|style|pre|code|textarea|title|option|svg)\b/i;
  const UNSKIP = /^<\/(script|style|pre|code|textarea|title|option|svg)>/i;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p.startsWith("<")) {
      if (SKIP.test(p)) skip++;
      else if (UNSKIP.test(p) && skip > 0) skip--;
      continue;
    }
    if (skip) continue;
    parts[i] = p
      .replace(/ ([;:!?»])/g, " $1")
      .replace(/« /g, "« ")
      .replace(/(\d) (%|€)/g, "$1 $2")
      .replace(/\b(N-VA|PVDA-PTB|PTB-PVDA|Ecolo-Groen|Open VLD|CD&amp;V)\b/g, '<span class="insecable">$1</span>');
  }
  return parts.join("");
}

const slugify = (s) =>
  String(s)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  const md = markdownIt({ html: true, linkify: false, typographer: false })
    .use(markdownItFootnote)
    .use(markdownItAnchor, { slugify, level: [2, 3] });
  // Notes de bas de page en français
  md.renderer.rules.footnote_block_open = () =>
    '<section class="notes" aria-label="Notes et sources">\n<h2 class="notes-titre">Notes et sources</h2>\n<ol class="notes-liste">\n';
  md.renderer.rules.footnote_caption = (tokens, idx) => {
    return Number(tokens[idx].meta.id + 1).toString();
  };
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/data-public": "donnees" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  const fontFiles = {
    "node_modules/@fontsource/spectral/files/spectral-latin-400-normal.woff2": "assets/fonts/spectral-400.woff2",
    "node_modules/@fontsource/spectral/files/spectral-latin-400-italic.woff2": "assets/fonts/spectral-400-italic.woff2",
    "node_modules/@fontsource/spectral/files/spectral-latin-600-normal.woff2": "assets/fonts/spectral-600.woff2",
    "node_modules/@fontsource/spectral/files/spectral-latin-ext-400-normal.woff2": "assets/fonts/spectral-ext-400.woff2",
    "node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2": "assets/fonts/archivo-wdth.woff2",
    "node_modules/@fontsource-variable/archivo/files/archivo-latin-ext-wdth-normal.woff2": "assets/fonts/archivo-ext-wdth.woff2",
  };
  for (const [from, to] of Object.entries(fontFiles)) eleventyConfig.addPassthroughCopy({ [from]: to });

  eleventyConfig.addTransform("typo-fr", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) return frenchTypography(content);
    return content;
  });

  // Filtres
  eleventyConfig.addFilter("slug", slugify);
  eleventyConfig.addFilter("dateFr", (iso) => {
    if (!iso) return "";
    const [y, m, d] = String(iso).split("-").map(Number);
    if (!m) return String(y);
    if (!d) return `${MOIS[m - 1]} ${y}`;
    return `${d === 1 ? "1er" : d} ${MOIS[m - 1]} ${y}`;
  });
  eleventyConfig.addFilter("pct", (x, digits = 1) =>
    (Number(x) * 100).toLocaleString("fr-BE", { minimumFractionDigits: digits, maximumFractionDigits: digits }) + " %");
  eleventyConfig.addFilter("num", (x, digits = 0) =>
    Number(x).toLocaleString("fr-BE", { minimumFractionDigits: digits, maximumFractionDigits: digits }));
  eleventyConfig.addFilter("json", (x) => JSON.stringify(x));
  eleventyConfig.addFilter("where", (arr, key, val) => (arr || []).filter((o) => o[key] === val));
  eleventyConfig.addFilter("md", (s) => md.renderInline(String(s || "")));
  // Arbre de scénarios : mêmes formules que src/assets/js/scenarios.js
  eleventyConfig.addFilter("scenarioCalc", (v) => {
    const A = v.q1 * v.q2 * v.q3 + (1 - v.q1 * v.q2) * v.q4;
    const sans = 1 - A, rupture = sans * (1 - v.q5);
    return { A, B: sans * v.q5, C: rupture * v.q6, D: rupture * (1 - v.q6) };
  });
  eleventyConfig.addFilter("uniq", (arr) => [...new Set(arr)]);
  eleventyConfig.addFilter("toc", (html) => {
    const out = [];
    const re = /<h2[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g;
    let m;
    while ((m = re.exec(String(html || "")))) {
      const text = m[2].replace(/<sup[\s\S]*?<\/sup>/g, "").replace(/<[^>]+>/g, "")
        .replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim();
      if (text && m[1] !== "notes-et-sources") out.push({ id: m[1], text });
    }
    return out;
  });

  // Référence de source : {% src "id" %} → « Média, Titre, date » + lien
  const loadSources = () => JSON.parse(fs.readFileSync("src/_data/sources.json", "utf8")).liste;
  eleventyConfig.addShortcode("src", function (id) {
    const list = loadSources();
    const s = list.find((x) => x.id === id);
    if (!s) throw new Error(`Source inconnue : ${id}`);
    const date = s.date ? `, ${s.date}` : "";
    const auteur = s.auteur ? `${s.auteur}, ` : "";
    const titre = s.url ? `[${s.titre}](${s.url})` : s.titre;
    return `${auteur}${s.media ? s.media + ", " : ""}« ${titre} »${date}. <span data-pagefind-ignore class="grade grade-${s.fiabilite}" title="Fiabilité ${s.fiabilite} (voir Méthode)">${s.fiabilite}</span>`;
  });

  eleventyConfig.addCollection("modeles", (api) =>
    api.getFilteredByGlob("src/modeles/*.md").filter((p) => !p.inputPath.endsWith("index.md")).sort((a, b) => a.data.ordre - b.data.ordre));
  eleventyConfig.addCollection("cas", (api) =>
    api.getFilteredByGlob("src/histoire/*.md").filter((p) => !p.inputPath.endsWith("index.md")).sort((a, b) => a.data.ordre - b.data.ordre));
  eleventyConfig.addCollection("outils", (api) =>
    api.getFilteredByGlob("src/outils/*.njk").filter((p) => !p.inputPath.endsWith("index.njk")).sort((a, b) => a.data.ordre - b.data.ordre));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}
