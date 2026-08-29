# Argonne Kiné Sport Santé — site vitrine

Site du cabinet de kinésithérapie du sport de Romain Bihel et Lelio Renault (Bordeaux). **RunCare** est le programme du cabinet dédié au coureur (bilan, analyse de foulée, coaching), présenté sous `/runcare`.
Domaine : **argonnekinesportsante.fr**. Prod actuelle : https://runcare-site.vercel.app (Vercel, push sur `main` → déploiement).

## Organisation du dépôt

- `site/` — le code (Astro 7 + Tailwind 4 + Keystatic). Voir `site/README.md`.
- `docs/` — documentation de travail : `MODIFICATIONS-CONTENU.md` (journal des écarts avec le brief et points en suspens), `photos-ia-prompts.md`.
- `sources/` — matière brute fournie par le client :
  - `brief/` — brief initial et consignes complémentaires (versionnés) ;
  - `logo-runner.svg` — logo provisoire ;
  - `photos-client/`, `photos-ia/`, `articles-pdf/` — photos WhatsApp, générations IA et PDF des 4 articles (**non versionnés**, à conserver localement).
