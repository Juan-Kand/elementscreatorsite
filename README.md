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

**52 composants** dans 16 catégories : hero (3), navigation (5), tarifs (3), fonctionnalités (3), preuve sociale (5), formulaires (7), overlays (5 : modale, menu, tooltip, cookies, palette Ctrl+K), feedback (5 : toasts, alertes, squelettes, progression, état vide), données (tableau triable, KPI), e-commerce, contenu (blog, timeline, galerie), équipe, pages (404), FAQ, CTA, footer, primitives (bouton, badge, avatars, texte dégradé).

La bibliothèque est lue **en direct depuis GitHub** : tout composant ajouté au dépôt est disponible dans Claude sans réinstaller (cache local en cas de coupure, copie embarquée en dernier recours).

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
claude mcp add elementsitecreator -- npx -y https://github.com/Juan-Kand/elementscreatorsite/archive/refs/tags/v1.1.0.tar.gz
```

### Claude Desktop

1. Ouvrez **Paramètres → Développeur → Modifier la config** (fichier `claude_desktop_config.json`).
2. Ajoutez :

```json
{
  "mcpServers": {
    "elementsitecreator": {
      "command": "npx",
      "args": ["-y", "https://github.com/Juan-Kand/elementscreatorsite/archive/refs/tags/v1.1.0.tar.gz"]
    }
  }
}
```

3. Quittez complètement Claude Desktop et relancez-le. Les outils apparaissent dans le menu des outils de la conversation.

> Cette méthode ne nécessite pas Git, seulement Node.js. Si le dépôt devient **privé**, elle ne fonctionnera plus. Clonez-le et pointez sur le fichier local :
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
3. Lancez `npm test` pour vérifier, puis poussez sur GitHub.

Le composant apparaît dans Claude dans les 10 minutes (le temps du cache), sans rien réinstaller.

Variables d'environnement utiles :
- `ELEMENTSITECREATOR_REMOTE=off` : n'utiliser que la copie embarquée.
- `ELEMENTSITECREATOR_REMOTE=<url>` : lire la bibliothèque depuis un autre dépôt.

## Développement

```bash
npm test     # simule un client MCP et vérifie les 5 outils
npm start    # lance le serveur en stdio
```

Licence MIT.
