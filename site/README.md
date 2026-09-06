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

Keystatic est en mode `github` en production (variables `KEYSTATIC_*` sur Vercel) : Romain
et Lelio éditent sur https://argonnekinesportsante.fr/keystatic. Cette route est en
`noindex` (en-tête `X-Robots-Tag` dans `vercel.json`) et exclue du sitemap et de `robots.txt`.

## Référencement

- `@astrojs/sitemap` génère `/sitemap-index.xml` ; `public/robots.txt` le référence.
- `src/layouts/Base.astro` porte les balises (title, description, canonical, Open Graph,
  Twitter) et les données structurées schema.org : cabinet (`Physiotherapy`), fiches
  `Person` de l'équipe, fil d'Ariane, `Article` pour le blog.
- Chaque service et article a des champs « Titre pour Google » / « Description pour
  Google » dans Keystatic (facultatifs, sinon le titre et l'accroche sont utilisés).
- `vercel.json` redirige `www.` et `runcare-site.vercel.app` vers le domaine principal.
- Statistiques : Umami (sans cookie, sans bandeau). Renseigner l'identifiant du site dans
  « Coordonnées & réglages » ; les clics Doctolib / WhatsApp / systeme.io / téléphone /
  e-mail remontent comme événements.
- Google Search Console : coller le code de la balise HTML dans « Coordonnées & réglages ».
