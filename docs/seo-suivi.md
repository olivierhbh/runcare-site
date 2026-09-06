# Référencement — suivi et actions côté Olivier

Mis en place le 06/09/2026 (voir `site/README.md`, section Référencement, pour le
fonctionnement technique). Le brief envoyé à Romain et Lelio est dans
`brief-3-referencement.md`.

## À faire (Olivier), dans l'ordre

Fait le 06/09/2026 : redirections vérifiées (1), Search Console vérifiée par TXT OVH et
sitemap envoyé (2), compte Umami créé et identifiant en place (5, commit 2dace6a).
Romain ajouté en propriétaire sur la Search Console (3). Bing importé depuis la Search
Console, accueil « Discovered but not crawled » le 06/09 (normal pour un site neuf) ;
Romain pas encore ajouté sur Bing (il pourra s'y connecter avec son compte Google, pas
besoin de compte Microsoft). Compte Umami encore sur le compte d'Olivier : à transmettre
ensemble, ou changer l'adresse e-mail du compte pour la sienne dans le profil Umami.
Reste : Bing pour Romain (4), Umami à transmettre (5), contrôles (6), retours du brief (7).

1. **Vérifier les redirections après déploiement** :
   `curl -sI https://www.argonnekinesportsante.fr/` doit répondre 308 vers l'apex,
   idem pour `https://runcare-site.vercel.app/`. Si `vercel.json` n'est pas pris en
   compte : Vercel → projet → Settings → Domains → `www` → « Redirect to
   argonnekinesportsante.fr » (308).
2. **Google Search Console** (https://search.google.com/search-console) :
   propriété de type **Domaine** `argonnekinesportsante.fr`, vérification par
   enregistrement TXT dans la zone DNS OVH (couvre www, http et https d'un coup).
   Puis Sitemaps → ajouter `sitemap-index.xml`. Puis Inspection d'URL sur la page
   d'accueil → « Demander une indexation ».
   Variante sans DNS : propriété « Préfixe d'URL », méthode « Balise HTML », coller le
   code `content="…"` dans Keystatic → Coordonnées & réglages → « Code de vérification
   Google Search Console ».
3. **Donner la main à Romain** : Search Console → Paramètres → Utilisateurs et
   autorisations → ajouter l'adresse Google de Romain (celle de la fiche Google) en
   **Propriétaire**. Une fois fait, mon compte peut rester ou être retiré.
4. **Bing Webmaster Tools** (https://www.bing.com/webmasters) : « Importer depuis
   Google Search Console », 2 minutes. Ajouter Romain en utilisateur.
5. **Umami Cloud** (https://cloud.umami.is, plan Hobby gratuit, 100 000 événements par
   mois, sans cookie donc sans bandeau) : créer le compte, « Add website »
   `argonnekinesportsante.fr`, copier le **Website ID** dans Keystatic → Coordonnées &
   réglages → « Identifiant du site Umami ». Les clics Doctolib / WhatsApp /
   systeme.io / téléphone / e-mail / Instagram remontent comme événements
   (`clic-doctolib`, etc.) sans rien d'autre à faire.
   Pour la passation : créer le compte avec un identifiant dédié dont on transmet le mot
   de passe à Romain (le plan gratuit n'a pas de gestion d'équipe).
6. **Contrôles une fois en ligne** :
   - https://search.google.com/test/rich-results sur l'accueil, `/equipe` et un article
     (attendu : LocalBusiness, Breadcrumb, Article, FAQ) ;
   - https://pagespeed.web.dev sur l'accueil (Lighthouse local du 06/09 : 100 partout,
     desktop et mobile) ;
   - https://www.opengraph.xyz sur l'accueil pour l'image de partage.
7. **Quand Romain répond au brief** : renseigner les horaires dans
   `settings.yaml` (et ajouter `opens`/`closes` dans `Base.astro`), l'auteur des
   articles (ajouter un champ `auteur` si besoin).

## Ce qui a été fait le 06/09/2026

- `@astrojs/sitemap` → `/sitemap-index.xml` ; `public/robots.txt` (bloque `/keystatic`,
  `/api/`).
- `vercel.json` : redirections `www` et `runcare-site.vercel.app` → apex, `/index.html`
  → `/`, en-tête `X-Robots-Tag: noindex` sur `/keystatic` et `/api/`. Astro
  `trailingSlash: 'never'` (redirection 308 des URL avec `/` final).
- `Base.astro` : Open Graph complet + Twitter card + image par défaut
  (`public/og-default.jpg`, 1200×630, photo duo) ; JSON-LD en graphe : `Physiotherapy`
  (téléphone cabinet E.164, e-mail, GPS, `hasMap`, Doctolib ×2, Instagram, fiche
  Google, lun–ven), `Person` Romain et Lelio (issus de `src/content/equipe`), `WebSite`,
  `WebPage`, `BreadcrumbList`, `Article` sur le blog ; balise Search Console et script
  Umami pilotés par `settings.yaml`.
- Champs Keystatic : `seoTitle` / `seoDescription` (services, articles), `updatedDate`
  (articles), `googleMapsUrl`, `latitude`, `longitude`, `googleSiteVerification`,
  `umamiWebsiteId` (réglages).
- Titres et descriptions réécrits : accueil, équipe, contact, blog, 4 services (dans
  les fichiers `.mdoc`). H1 de l'accueil = ancien sur-titre (« Cabinet de kinésithérapie
  du sport et coaching running · Bordeaux »), le slogan devient un paragraphe (même
  rendu).
- Articles : `og:type article`, dates, alt sur l'image de couverture, `<time datetime>`.
- Accueil : `fetchpriority="high"` sur l'image hero (seul point Lighthouse).
- Pied de page : liens Instagram et Google Maps.
- Instagram, fiche Google et coordonnées GPS renseignés dans `settings.yaml` ; Doctolib
  de Romain dans `equipe/romain.yaml` (données structurées uniquement).

## Idées pour plus tard

- Page dédiée par pathologie (essuie-glace, périostite…) si les articles prennent.
- Horaires précis dans le schema (`opens` / `closes`) dès que Romain les donne.
- Vercel Web Analytics (gratuit sur Hobby, limité) en secours si Umami ne convient pas.
