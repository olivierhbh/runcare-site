# RunCare — site vitrine

Site de Romain Bihel et Lelio Renault (kinés du sport et coachs running, Bordeaux).
Domaine : **argonnekinesportsante.fr**. Prod : https://argonnekinesportsante.fr (alias https://runcare-site.vercel.app) (Vercel, push sur `main` → déploiement).

## Organisation du dépôt

- `site/` — le code (Astro 7 + Tailwind 4 + Keystatic). Voir `site/README.md`.
- `docs/` — documentation de travail : `MODIFICATIONS-CONTENU.md` (journal des écarts avec le brief et points en suspens), `seo-suivi.md` (référencement : ce qui est en place, actions restantes), les briefs envoyés à Romain et Lelio, `photos-ia-prompts.md`.
- `sources/` — matière brute fournie par le client :
  - `brief/` — brief initial et consignes complémentaires (versionnés) ;
  - `logo-runner.svg` — logo provisoire ;
  - `photos-client/`, `photos-ia/`, `articles-pdf/` — photos WhatsApp, générations IA et PDF des 4 articles (**non versionnés**, à conserver localement).
