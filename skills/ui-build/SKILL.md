---
name: ui-build
description: Construire une section ou une page web avec les composants elementsitecreator (React + Tailwind). À utiliser quand l'utilisateur demande de créer, ajouter ou générer un élément d'interface : landing page, hero, tableau de prix, formulaire, footer, etc.
---

# Construire avec elementsitecreator

1. **Chercher** : `search_components` avec les mots-clés de la demande.
2. **Récupérer** : si un résultat convient, `get_component` avec son id.
3. **Adapter** : remplace les textes par défaut via les props ou directement dans le code, ajuste les couleurs Tailwind à la charte du projet.
4. **Écrire** le fichier dans `components/ui/<id>.tsx` (ou le dossier de composants du projet) et l'importer là où il faut.
5. **Rien ne convient ?** Appelle `generate_component` avec la description : il renvoie les règles de style et des références proches. Écris le composant en les respectant.
6. **Enregistrer** : propose `publish_component` pour qu'un nouveau composant soit réutilisable plus tard.

Pré-requis du projet : React 18+ et Tailwind CSS 3+ (mode sombre en `class` ou `media`).
