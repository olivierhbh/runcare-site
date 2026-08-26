# RunCare — site vitrine

Astro 7 + Tailwind 4 + Keystatic. Site 100 % statique.

```sh
pnpm install
pnpm dev          # http://127.0.0.1:4321 — interface d'édition : /keystatic
pnpm build        # génère dist/
```

## Où est le contenu ?

Tout est dans `src/content/` (éditable via `/keystatic` en dev, ou à la main) :

- `settings.yaml` — coordonnées, liens Doctolib/WhatsApp, horaires
- `equipe/` — Romain, Lelio
- `services/` — les 4 pages de services (texte Markdown + tarifs)
- `formules/` — les 3 formules de coaching (cartes + tableau)
- `faq/` — questions/réponses
- `articles/` — le blog

Les photos sont dans `src/assets/photos/`. Celles éditables via Keystatic sont rangées par
entrée (`services/<slug>/`, `equipe/<slug>/`, `articles/<slug>/`) — c'est le fonctionnement
imposé par Keystatic pour les champs image avec `directory`. Les photos utilisées directement
dans les pages (duo, quai, studio, Nolio…) restent à la racine du dossier.

## Outils de maquette

- **Sélecteur de thème** (bas droite) : 4 palettes commutables (`data-theme` sur `<html>`,
  définies dans `src/styles/global.css`). Une fois le thème choisi, fixer la valeur par
  défaut dans `src/layouts/Base.astro` et supprimer `src/components/ThemePicker.astro`.
- **Notes de relecture** : `<Flag note="…">` et `<FlagBlock>` marquent les points à
  trancher avec le client. Masquées par défaut, activables via le sélecteur. À retirer
  au fur et à mesure des validations (`grep -rn "Flag" src/pages`).

## Mise en production

Keystatic n'est chargé qu'en dev (voir `astro.config.mjs`). Pour que RunCare édite le
contenu en ligne : passer `storage` en mode `github` dans `keystatic.config.ts`, créer la
GitHub App, ajouter l'adaptateur Vercel et les variables `KEYSTATIC_*`.
