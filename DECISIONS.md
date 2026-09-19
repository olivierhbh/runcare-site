# Décisions — migration Vercel → Cloudflare Workers

Branche de travail : `cloudflare`. La production Vercel (`main`) reste intacte jusqu'à validation.

## 2026-09-19 — Inventaire de départ

- Site dans `site/`, pnpm 12.3.4 (lockfile v9), Astro 7.2.7, `@astrojs/vercel` 11.0.8, Keystatic 6.0.0 / core 0.6.8 en mode GitHub (`olivierhbh/runcare-site`, `pathPrefix: 'site'`).
- `output` statique ; seules les routes injectées par Keystatic (`/keystatic`, `/api/keystatic`) sont rendues à la demande. Aucun formulaire, aucune route d'API maison, aucun secret lu par notre code.
- `vercel.json` : `www` → apex et `runcare-site.vercel.app` → apex (règles par hôte), `/index.html` → `/`, `X-Robots-Tag: noindex` sur `/keystatic*` et `/api/*`. Vercel redirigeait `/x/` → `/x` en 308 (`trailingSlash: 'never'`).
- Pas d'action GitHub : Vercel déployait par son intégration git.
- Domaine argonnekinesportsante.fr, DNS chez OVH (compte de Romain), courrier OVH (MX mx1/2/3.mail.ovh.net, SPF `include:mx.ovh.com -all`, pas de DMARC visible, DKIM à relever).
- Secrets Keystatic de `site/.env` : Client ID identique à la prod (lu dans l'URL de connexion de la prod) ; secret client validé par l'API GitHub (`POST /applications/{client_id}/token` : 404 avec le vrai secret, 401 avec un faux). `KEYSTATIC_SECRET` ne sert qu'à signer les cookies : n'importe quelle valeur longue convient.

## Compte Cloudflare

- **Quoi** : compte Cloudflare d'Olivier (Worker `runcare-site`, sous-domaine `thework-astro-ks.workers.dev`), jeton d'API de compte.
- **Pourquoi** : choix d'Olivier (impossible de créer un compte par variante d'adresse e-mail).
- **Écarté** : compte au nom de Romain (plus simple à transférer un jour, mais pas faisable maintenant).

## Versions : Astro 7.3.3 + `@astrojs/cloudflare` 14.3.2 + wrangler 4.134.0

- **Pourquoi** : le 14.3.2 déclare `astro ^7.2.0` mais importe `renderForPrerender`, absent d'Astro 7.2.7 (build en échec : `MISSING_EXPORT`). L'export existe dans Astro 7.3.0 ; l'adaptateur 14.3.x est développé contre Astro 7.3.0 (sa devDependency), le 14.2.6 contre 7.2.10. Montée **mineure** d'Astro, et combinaison déjà validée sur l'autre site.
- **Écarté** : adaptateur 14.2.6 avec Astro 7.2.7 (fonctionnerait sans doute, mais combinaison non éprouvée chez nous).
- **Effets de bord** : `pnpm install --fix-lockfile` (un lien `wrangler` cassé après `pnpm add -D`) a fait passer Sharp de 0.35.3 à 0.35.4 (correctif). `workerd: true` ajouté à `allowBuilds`.
- **Mesure** : HTML des 16 pages identique à la sortie Vercel, hors empreintes de fichiers et un polyfill `globalThis.process` ajouté en tête des scripts en ligne (sans effet visible).

## Configuration de l'adaptateur

- `imageService: 'compile'` (Sharp au build, aucun binding Images), `prerenderEnvironment: 'node'` (le prérendu lit le disque), `session: false` (pas de binding KV). Vérifié dans `dist/server/wrangler.json` : seul le binding `ASSETS`.
- `compatibility_flags: ["nodejs_compat"]` : Keystatic lit `process.env.NODE_ENV`.
- `run_worker_first: ["/keystatic", "/keystatic/*", "/api/*"]` : depuis la date de compatibilité 2025-04-01 (`assets_navigation_prefers_asset_serving`), une navigation sans fichier statique sert la 404 sans invoquer le Worker.

## Barre oblique finale et redirections

- **Quoi** : `html_handling: "drop-trailing-slash"` + `public/_redirects` (`/:page/ /:page 301`, `/:section/:page/ /:section/:page 301`, `/index.html / 301`).
- **Pourquoi** : Cloudflare sert par défaut `/blog/` et redirige `/blog` vers `/blog/`, l'inverse du site (`trailingSlash: 'never'`, canonicals sans barre). `drop-trailing-slash` corrige le sens mais redirige en **307** (doc html-handling : toutes ses redirections sont en 307). Les deux règles génériques rétablissent une redirection permanente, comme le 308 de Vercel. Mesuré en local et en ligne : `/blog/` → 301 `/blog`, `/index.html` → 301 `/`, `/a/b/c/` → 404.
- **Hors `_redirects`** : les redirections par hôte (`www`, `vercel.app`) ne sont pas possibles dans `_redirects` (« Domain-level redirects » non supportés). `www` → apex se fera par une règle de redirection Cloudflare (plan Free : 10 Single Redirects ; enregistrement `www` proxifié requis) à la bascule DNS. `vercel.app` disparaît avec le projet Vercel.

## Non-indexation

- `public/_headers` : `X-Robots-Tag: noindex` sur `https://:worker.:account.workers.dev/*` (fichiers statiques de l'adresse workers.dev, aperçus compris). Vérifié : présent sur workers.dev, absent avec l'hôte du vrai domaine.
- `src/middleware.ts` : `X-Robots-Tag: noindex, nofollow` sur `/keystatic` et `/api`, car `_headers` ne s'applique pas aux réponses du Worker (doc headers). La réponse est recopiée avant modification (les en-têtes d'une redirection sont immuables).

## Déploiement

- Action GitHub `.github/workflows/deploy.yml` : `push` sur `main` (et `cloudflare` pendant la migration), filtrée sur `site/**` pour que les commits de docs ne redéploient pas ; `pnpm install --frozen-lockfile`, `pnpm build` avec la seule variable `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` (variable GitHub, valeur `runcare-vercel-site`), `wrangler deploy -c dist/server/wrangler.json`. Groupe `concurrency` sans annulation du run en cours.
- Versions d'actions vérifiées le 2026-09-19 : checkout v7.0.1, setup-node v7.0.0, pnpm/action-setup v6.1.0 (support de pnpm 12).
- Build local : ~4 s avec cache, ~2 s de prérendu, 23 images. Pas de cache d'images en CI tant que le build à froid reste court (à mesurer au premier run).
- Premier déploiement fait depuis le poste le 2026-09-19 : 70 fichiers, Worker de 1,5 Mo (339 Ko gzip), démarrage 15 ms.

## Tarifs et limites vérifiés (2026-09-19, developers.cloudflare.com)

- Workers Free : 100 000 requêtes Worker par jour, 10 ms de CPU par invocation ; requêtes vers les fichiers statiques gratuites et illimitées ; 20 000 fichiers par version, 25 Mio par fichier ; Worker 64 Mio non compressé.
- Domaine personnalisé sur un Worker : zone Cloudflare active requise ; configuration partielle (CNAME) réservée aux plans Business et Enterprise ⇒ changement des serveurs de noms chez OVH obligatoire.
- `_redirects` : 2 000 règles statiques + 100 dynamiques. `_headers` : 100 règles.

## Vérifications

| Vérification | Local (`wrangler dev`) | workers.dev |
|---|---|---|
| 14 pages + 404 : HTML identique à Vercel | ✅ | ✅ (comparé à argonnekinesportsante.fr) |
| Sitemap identique (hors `lastmod`) | ✅ | ✅ |
| 404 réelle avec la page du site | ✅ | ✅ |
| `/x/` → 301 `/x`, `/index.html` → 301 `/` | ✅ | ✅ |
| `/_astro/*` immuable | ✅ | ✅ |
| `X-Robots-Tag` workers.dev / Keystatic | ✅ | ✅ |
| POST sans `Origin` → 403 (CSRF Astro) | ✅ | — |
| Connexion GitHub Keystatic | redirection vers GitHub ✅ | ⏳ secrets à poser |
| Édition, commit, redéploiement | — | ⏳ |
| Dépôt d'image via Keystatic | — | ⏳ |
