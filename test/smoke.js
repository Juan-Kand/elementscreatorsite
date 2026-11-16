// Test rapide : lance le serveur et simule un client MCP.
const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const fs = require("fs");

const home = fs.mkdtempSync(path.join(os.tmpdir(), "esc-"));
const srv = spawn("node", [path.join(__dirname, "..", "server", "index.js")], {
  env: { ...process.env, ELEMENTSITECREATOR_HOME: home, ELEMENTSITECREATOR_REMOTE: process.env.ELEMENTSITECREATOR_REMOTE || "off" },
});
const msgs = [
  { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "0" } } },
  { jsonrpc: "2.0", method: "notifications/initialized" },
  { jsonrpc: "2.0", id: 2, method: "tools/list" },
  { jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "search_components", arguments: { query: "tarifs" } } },
  { jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "get_component", arguments: { id: "faq-accordion" } } },
  { jsonrpc: "2.0", id: 5, method: "tools/call", params: { name: "publish_component", arguments: { name: "Ma Carte", code: "export default function MaCarte(){return <div/>}" } } },
  { jsonrpc: "2.0", id: 6, method: "tools/call", params: { name: "search_components", arguments: { query: "carte" } } },
  { jsonrpc: "2.0", id: 7, method: "tools/call", params: { name: "generate_component", arguments: { description: "hero sombre pour une app" } } },
  { jsonrpc: "2.0", id: 8, method: "tools/call", params: { name: "list_categories", arguments: {} } },
];
let out = "";
srv.stdout.on("data", (d) => (out += d));
for (const m of msgs) srv.stdin.write(JSON.stringify(m) + "\n");
setTimeout(() => {
  srv.kill();
  const lines = out.trim().split("\n").map((l) => JSON.parse(l));
  const byId = Object.fromEntries(lines.map((l) => [l.id, l]));
  const ok = (c, m) => { if (!c) { console.error("ÉCHEC :", m); process.exit(1); } console.log("✓", m); };
  ok(byId[1].result.serverInfo.name === "elementsitecreator", "initialize");
  ok(byId[2].result.tools.length === 5, "tools/list (5 outils)");
  ok(byId[3].result.content[0].text.includes("pricing-three-tiers"), "search « tarifs » → pricing");
  ok(byId[4].result.content[0].text.includes("<details"), "get_component renvoie le code");
  ok(byId[5].result.content[0].text.includes("ma-carte"), "publish_component");
  ok(byId[6].result.content[0].text.includes("ma-carte"), "composant publié retrouvable");
  ok(byId[7].result.content[0].text.includes("hero-gradient"), "generate_component donne des références");
  ok(Object.values(JSON.parse(byId[8].result.content[0].text)).reduce((a, b) => a + b, 0) >= 50, "list_categories (50+ composants)");
  ok(lines.length === 8, "aucune réponse aux notifications");
  console.log("Tous les tests passent.");
}, 800);
