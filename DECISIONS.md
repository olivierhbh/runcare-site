# Décisions — migration Vercel → Cloudflare Workers

Branche de travail `cloudflare`, fusionnée dans `main` le 2026-09-19. Production sur Cloudflare depuis le même jour.

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
| Connexion GitHub Keystatic | redirection vers GitHub ✅ | ✅ |
| Édition, commit, redéploiement (branche `cloudflare`) | — | ✅ phrase en ligne 71 s après l'enregistrement, puis revert |
| Dépôt d'image via Keystatic | — | ✅ WebP généré au build, puis revert |
| CPU Keystatic (`wrangler tail`) | — | 3 à 7 ms |

## Bascule du domaine (2026-09-19, heures de la machine d'Olivier, UTC+8)

- **DNSSEC** coupé chez OVH (délégation sécurisée), DS retiré par l'AFNIC à 09:23 ; attente d'une heure (TTL du DS : 3600 s) avant de changer les serveurs de noms.
- **Zone Cloudflare** (Free, configuration complète) : import automatique comparé à la zone OVH (identique : A Vercel, CNAME www Vercel, 3 MX OVH, SPF, TXT Google, TXT `1|www…`), `ftp` supprimé, A et www laissés en « DNS only » pendant la transition. Réponses de `denver`/`paris.ns.cloudflare.com` vérifiées identiques à celles d'OVH avant le changement. Bot Preference Sync désactivé (le `robots.txt` du dépôt reste intact).
- **Serveurs de noms** changés chez OVH à 10:25 ; registre `.fr` à jour à 10:35 ; zone active à 10:37.
- **Méthode sans coupure** : route `argonnekinesportsante.fr/*` déclarée dans `wrangler.jsonc` et déployée, puis enregistrement A passé en « Proxied » (bascule instantanée, réversible en repassant en gris). Écarté : domaine personnalisé du Worker, qui impose de supprimer d'abord l'enregistrement existant (trou possible, cache négatif). Déclarer une route désactive workers.dev par défaut (coupure d'environ 1 min constatée) : `workers_dev: true` ajouté.
- **Pages légales** : hébergeur Vercel remplacé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, +1 (650) 319-8930 (adresse lue sur cloudflare.com/privacypolicy le 2026-09-19).
- **Vercel** : intégration git déconnectée par Olivier avant la fusion (aucun statut Vercel sur le commit de fusion) ; projet conservé quelques jours pour les résolveurs qui ont encore l'ancienne adresse.
- **www** : règle Single Redirect « Redirect from WWW to root » (`https://www.*` → `https://${1}`, 301, query string conservée) + CNAME www passé en « Proxied ». **Always Use HTTPS** activé : Cloudflare servait la page en `http://` (200), Vercel redirigeait (308).
- Vérifié sur le vrai domaine via Cloudflare : pages 200, 404 réelle, `/x/` et `/index.html` en 301, `http://` → `https://` 301, `www` → apex 301 (chemin et paramètres conservés), `/_astro` immuable, `noindex` seulement sur Keystatic, `robots.txt` intact, Keystatic connecté (session existante conservée), déploiement de `main` par l'action en 32 s.

- Branche `cloudflare` supprimée le 2026-09-19 après fusion (0 commit hors de `main`) : elle apparaissait dans le sélecteur de branches de Keystatic et prêtait à confusion.

## DNSSEC rétabli (2026-09-20)

Vérifié avant : les quatre résolveurs publics interrogés ne renvoyaient plus que `denver`/`paris.ns.cloudflare.com` (délégation changée 23 h plus tôt, TTL 3600 s). DNSSEC activé chez Cloudflare, puis DS saisi chez OVH (onglet « DS records ») : key tag 2371, flag 257 (KSK), algorithme 13, clé publique relue par `dig DNSKEY` sur les serveurs Cloudflare et empreinte SHA-256 recalculée pour contrôle (`875BD008…`, identique à la fiche Cloudflare). OVH demande la clé publique, pas l'empreinte. DS publié par l'AFNIC à 09:34 ; validation confirmée (drapeau `ad`) chez Google, Cloudflare et Quad9, sur le site comme sur les MX.

## Nettoyage après bascule (2026-09-22)

- **CNAME `www`** (`cname.vercel-dns.com`) remplacé par un `AAAA 100::` proxifié : la redirection `www` → apex est faite par Cloudflare à la périphérie, l'origine n'est jamais contactée. Vérifié après : `https://www.…/contact?x=1` → 301 apex, chemin et paramètres conservés ; `http://www` → 301 → 301 (Always Use HTTPS puis règle www).
- **Projet Vercel `runcare-site` supprimé** (lui seul), trois jours après la bascule : serveurs de noms Cloudflare vus par les résolveurs publics depuis le 19/09 (TTL 3600 s), `www` déjà servi par Cloudflare. `runcare-site.vercel.app` répond désormais 404 chez Vercel ; cette adresse n'a jamais été indexée (toujours redirigée) et n'a circulé que dans le brief 1 à Romain et Lelio.
- Branche `cloudflare` : déjà supprimée le 19/09.

- **App GitHub `runcare-vercel-site`** (2026-09-22) : URL de rappel `workers.dev` retirée ; restent `argonnekinesportsante.fr` (prod) et deux adresses de boucle locale (`127.0.0.1:4321` pour `astro dev`, `127.0.0.1` sans port pour `wrangler dev` : GitHub n'impose pas le port sur une adresse de boucle locale).
- **Courrier** : test d'envoi/réception non fait, Romain ne prévoit pas d'adresse sur ce domaine. Les MX OVH restent déclarés dans la zone, sans effet. Point ouvert : `settings.yaml` publie `contact@argonnekinesportsante.fr` comme e-mail du cabinet dans les données structurées (JSON-LD `Physiotherapy.email`), adresse qui ne sera donc pas relevée — à remplacer par `runcarepro@gmail.com` ou à retirer, décision de Romain.

## Reste à faire

- E-mail du cabinet dans « Coordonnées & réglages » (Keystatic) : `contact@argonnekinesportsante.fr` n'est pas relevée, à faire trancher par Romain.
