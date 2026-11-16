#!/usr/bin/env node
/**
 * elementsitecreator — serveur MCP de bibliothèque de composants UI
 * (React + Tailwind), inspiré de 21st.dev/mcp.
 *
 * Zéro dépendance : implémente le protocole MCP (JSON-RPC 2.0 sur stdio)
 * directement avec Node.js >= 18.
 */
"use strict";

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const SERVER_NAME = "elementsitecreator";
const SERVER_VERSION = require("../package.json").version;
const LIB_DIR = path.join(__dirname, "library");
const USER_DIR =
  process.env.ELEMENTSITECREATOR_HOME ||
  path.join(os.homedir(), ".elementsitecreator");
const USER_COMPONENTS_DIR = path.join(USER_DIR, "components");

// ---------------------------------------------------------------------------
// Bibliothèque
// ---------------------------------------------------------------------------

function readJSON(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function loadLibrary() {
  const builtin = readJSON(path.join(LIB_DIR, "registry.json"), []).map((c) => ({
    ...c,
    source: "builtin",
    file: path.join(LIB_DIR, "components", c.file),
  }));
  const user = readJSON(path.join(USER_DIR, "registry.json"), []).map((c) => ({
    ...c,
    source: "user",
    file: path.join(USER_COMPONENTS_DIR, c.file),
  }));
  // Les composants de l'utilisateur remplacent ceux du même id
  const map = new Map();
  for (const c of [...builtin, ...user]) map.set(c.id, c);
  return [...map.values()];
}

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function score(component, terms) {
  const fields = [
    [component.id, 5],
    [component.name, 4],
    [component.category, 3],
    [(component.tags || []).join(" "), 3],
    [component.description, 1],
  ];
  let total = 0;
  for (const term of terms) {
    for (const [text, weight] of fields) {
      if (normalize(text).includes(term)) total += weight;
    }
  }
  return total;
}

function search(query, { category, limit = 8 } = {}) {
  const terms = normalize(query).split(/[\s,]+/).filter(Boolean);
  let list = loadLibrary();
  if (category) list = list.filter((c) => normalize(c.category) === normalize(category));
  const ranked = list
    .map((c) => ({ c, s: terms.length ? score(c, terms) : 1 }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, Math.max(1, Math.min(limit, 50)));
  return ranked.map(({ c }) => c);
}

function summary(c) {
  return {
    id: c.id,
    name: c.name,
    category: c.category,
    description: c.description,
    tags: c.tags || [],
    source: c.source,
  };
}

function getComponent(id) {
  const c = loadLibrary().find((x) => x.id === id);
  if (!c) return null;
  let code = "";
  try {
    code = fs.readFileSync(c.file, "utf8");
  } catch {
    code = "// Fichier introuvable : " + c.file;
  }
  return { ...summary(c), dependencies: c.dependencies || [], usage: c.usage || "", code };
}

function slugify(s) {
  return normalize(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "component";
}

function publish({ name, description, category, tags, code, dependencies }) {
  if (!name || !code) throw new Error("`name` et `code` sont obligatoires.");
  fs.mkdirSync(USER_COMPONENTS_DIR, { recursive: true });
  const id = slugify(name);
  const file = id + ".tsx";
  fs.writeFileSync(path.join(USER_COMPONENTS_DIR, file), code, "utf8");
  const regPath = path.join(USER_DIR, "registry.json");
  const reg = readJSON(regPath, []).filter((c) => c.id !== id);
  reg.push({
    id,
    name,
    category: category || "custom",
    description: description || "",
    tags: Array.isArray(tags) ? tags : [],
    dependencies: Array.isArray(dependencies) ? dependencies : [],
    file,
  });
  fs.writeFileSync(regPath, JSON.stringify(reg, null, 2), "utf8");
  return { id, path: path.join(USER_COMPONENTS_DIR, file) };
}

const DESIGN_RULES = `Règles de génération (elementsitecreator) :
- React + TypeScript, composant fonctionnel exporté par défaut, props typées avec valeurs par défaut.
- Style uniquement avec Tailwind CSS ; pas de CSS externe. Mode sombre via les classes dark:.
- Accessible : balises sémantiques, aria-* quand nécessaire, focus visible (focus-visible:ring-2), contrastes AA.
- Responsive mobile-first (sm:, md:, lg:).
- Aucune dépendance sauf si indispensable ; icônes : lucide-react si besoin.
- Contenu réaliste (pas de lorem ipsum), facile à remplacer via les props.
- Le fichier doit être autonome et prêt à coller dans components/ui/.`;

// ---------------------------------------------------------------------------
// Outils MCP
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "search_components",
    description:
      "Cherche des composants UI (React + Tailwind) dans la bibliothèque elementsitecreator. À utiliser dès que l'utilisateur demande un élément d'interface : hero, pricing, navbar, formulaire, FAQ, footer, etc. Renvoie une liste d'ids à passer à get_component.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Mots-clés, ex. \"pricing table\", \"hero sombre\"." },
        category: { type: "string", description: "Filtrer par catégorie (voir list_categories)." },
        limit: { type: "number", description: "Nombre max de résultats (défaut 8)." },
      },
      required: ["query"],
    },
  },
  {
    name: "get_component",
    description:
      "Renvoie le code source complet d'un composant (TSX), ses dépendances et son mode d'emploi, pour l'écrire dans le projet de l'utilisateur.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", description: "Id du composant, ex. \"pricing-three-tiers\"." } },
      required: ["id"],
    },
  },
  {
    name: "list_categories",
    description: "Liste les catégories de la bibliothèque et le nombre de composants dans chacune.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "generate_component",
    description:
      "Prépare la création d'un nouveau composant à partir d'une description en langage naturel : renvoie les composants les plus proches comme base d'inspiration et les règles de style à respecter. Claude écrit ensuite le composant final.",
    inputSchema: {
      type: "object",
      properties: {
        description: { type: "string", description: "Ce que doit faire / montrer le composant." },
        variants: { type: "number", description: "Nombre de variantes à proposer (1 à 3, défaut 1)." },
      },
      required: ["description"],
    },
  },
  {
    name: "publish_component",
    description:
      "Enregistre un composant dans la bibliothèque personnelle de l'utilisateur (~/.elementsitecreator) pour le retrouver ensuite avec search_components.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        category: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        dependencies: { type: "array", items: { type: "string" } },
        code: { type: "string", description: "Code TSX complet du composant." },
      },
      required: ["name", "code"],
    },
  },
];

function text(t) {
  return { content: [{ type: "text", text: t }] };
}

function callTool(name, args = {}) {
  switch (name) {
    case "search_components": {
      const res = search(args.query, args);
      if (!res.length)
        return text(
          `Aucun composant trouvé pour « ${args.query} ». Utilise generate_component pour en créer un.`
        );
      return text(JSON.stringify(res.map(summary), null, 2));
    }
    case "get_component": {
      const c = getComponent(args.id);
      if (!c) return { ...text(`Composant « ${args.id} » introuvable. Lance search_components.`), isError: true };
      const deps = c.dependencies.length ? c.dependencies.join(" ") : "aucune";
      return text(
        `# ${c.name} (${c.id})\n${c.description}\n\nDépendances npm : ${deps}\nUsage : ${c.usage || "import et utilisation directe"}\n\n\`\`\`tsx\n${c.code}\n\`\`\``
      );
    }
    case "list_categories": {
      const counts = {};
      for (const c of loadLibrary()) counts[c.category] = (counts[c.category] || 0) + 1;
      return text(JSON.stringify(counts, null, 2));
    }
    case "generate_component": {
      const n = Math.max(1, Math.min(3, Number(args.variants) || 1));
      const refs = search(args.description, { limit: 2 }).map((c) => getComponent(c.id));
      const refText = refs.length
        ? refs.map((r) => `## Référence : ${r.name} (${r.id})\n\`\`\`tsx\n${r.code}\n\`\`\``).join("\n\n")
        : "Aucune référence proche dans la bibliothèque.";
      return text(
        `Demande : ${args.description}\nVariantes à produire : ${n}\n\n${DESIGN_RULES}\n\n${refText}\n\nÉcris maintenant ${n > 1 ? `${n} variantes distinctes` : "le composant"} en respectant ces règles, puis propose de l'enregistrer avec publish_component.`
      );
    }
    case "publish_component": {
      const r = publish(args);
      return text(`Composant enregistré : id « ${r.id} » → ${r.path}`);
    }
    default:
      return { ...text(`Outil inconnu : ${name}`), isError: true };
  }
}

// ---------------------------------------------------------------------------
// Transport JSON-RPC sur stdio
// ---------------------------------------------------------------------------

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

function handle(msg) {
  const { id, method, params } = msg;
  const isRequest = id !== undefined && id !== null;
  try {
    let result;
    switch (method) {
      case "initialize":
        result = {
          protocolVersion: (params && params.protocolVersion) || "2025-06-18",
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
          instructions:
            "Bibliothèque de composants UI React + Tailwind. Pour toute demande d'interface : search_components → get_component ; si rien ne convient : generate_component.",
        };
        break;
      case "ping":
        result = {};
        break;
      case "tools/list":
        result = { tools: TOOLS };
        break;
      case "tools/call":
        result = callTool(params.name, params.arguments || {});
        break;
      case "resources/list":
        result = { resources: [] };
        break;
      case "prompts/list":
        result = { prompts: [] };
        break;
      default:
        if (!isRequest) return; // notifications (ex. notifications/initialized)
        return send({ jsonrpc: "2.0", id, error: { code: -32601, message: `Méthode inconnue : ${method}` } });
    }
    if (isRequest) send({ jsonrpc: "2.0", id, result });
  } catch (err) {
    if (isRequest) {
      if (method === "tools/call") send({ jsonrpc: "2.0", id, result: { ...text(String(err.message || err)), isError: true } });
      else send({ jsonrpc: "2.0", id, error: { code: -32603, message: String(err.message || err) } });
    }
  }
}

const rl = readline.createInterface({ input: process.stdin });
rl.on("line", (line) => {
  if (!line.trim()) return;
  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return send({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "JSON invalide" } });
  }
  if (Array.isArray(msg)) msg.forEach(handle);
  else handle(msg);
});
rl.on("close", () => process.exit(0));
