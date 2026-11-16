# elementsitecreator

Bibliothèque de composants UI **React + Tailwind** accessible depuis Claude via **MCP**, sur le modèle de [21st.dev/mcp](https://21st.dev/mcp).

Vous demandez à Claude « ajoute un tableau de prix à ma landing page » : il cherche dans la bibliothèque, récupère le code, l'adapte à votre projet et l'écrit dans vos fichiers.

## Outils MCP

| Outil | Rôle |
|---|---|
| `search_components` | Cherche des composants par mots-clés (FR ou EN) et par catégorie |
| `get_component` | Renvoie le code TSX complet, les dépendances et l'usage |
| `list_categories` | Liste les catégories disponibles |
| `generate_component` | Prépare un nouveau composant : règles de style + composants proches comme base |
| `publish_component` | Enregistre un composant dans votre bibliothèque perso (`~/.elementsitecreator`) |

Le plugin ajoute aussi deux skills : `ui-explore` (explorer) et `ui-build` (construire).

Composants inclus : hero, navbar, pricing, feature grid, bento grid, témoignages, stats, FAQ, CTA, login, newsletter, footer, bouton.

**Aucune dépendance** : il suffit de Node.js 18 ou plus.

---

## Installation

### Claude Code (plugin, recommandé)

Dans Claude Code :

```
/plugin marketplace add Juan-Kand/elementscreatorsite
/plugin install elementsitecreator@elementsitecreator
```

Redémarrez Claude Code, puis tapez `/mcp` : `elementsitecreator` doit apparaître comme connecté.

Alternative sans plugin (serveur seul) :

```bash
claude mcp add elementsitecreator -- npx -y github:Juan-Kand/elementscreatorsite
```

### Claude Desktop

1. Ouvrez **Paramètres → Développeur → Modifier la config** (fichier `claude_desktop_config.json`).
2. Ajoutez :

```json
{
  "mcpServers": {
    "elementsitecreator": {
      "command": "npx",
      "args": ["-y", "github:Juan-Kand/elementscreatorsite"]
    }
  }
}
```

3. Quittez complètement Claude Desktop et relancez-le. Les outils apparaissent dans le menu des outils de la conversation.

> Si le dépôt est **privé**, `npx github:…` ne fonctionnera pas. Clonez-le et pointez sur le fichier local :
> ```json
> { "mcpServers": { "elementsitecreator": { "command": "node", "args": ["C:/chemin/vers/elementsitecreator/server/index.js"] } } }
> ```

### Cursor, Windsurf, VS Code…

Même bloc JSON que Claude Desktop, dans le fichier de config MCP de l'éditeur (ex. `~/.cursor/mcp.json`).

---

## Utilisation

Exemples de demandes :

- « Crée une landing page avec un hero, une grille de fonctionnalités et un tableau de prix. »
- « Quels composants de formulaire as-tu ? »
- « Génère une carte de profil utilisateur et enregistre-la dans ma bibliothèque. »

Pré-requis du projet cible : React 18+ et Tailwind CSS 3+.

## Ajouter des composants à la bibliothèque

1. Déposez le fichier dans `server/library/components/mon-composant.tsx`.
2. Ajoutez une entrée dans `server/library/registry.json` (`id`, `name`, `category`, `file`, `description`, `tags`).
3. Lancez `npm test` pour vérifier.

## Développement

```bash
npm test     # simule un client MCP et vérifie les 5 outils
npm start    # lance le serveur en stdio
```

Licence MIT.
