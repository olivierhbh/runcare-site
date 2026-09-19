// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Le site est statique ; seules les routes /keystatic et /api/keystatic sont
// rendues à la demande (Worker Cloudflare), ce qui permet l'édition en ligne.
// Les images sont optimisées au build par Sharp (imageService: 'compile'), et
// le prérendu tourne sous Node pour lire le contenu sur le disque.
export default defineConfig({
  site: 'https://argonnekinesportsante.fr',
  adapter: cloudflare({ imageService: 'compile', prerenderEnvironment: 'node' }),
  // Pas de sessions : évite le binding KV que l'adaptateur créerait sinon.
  session: false,
  trailingSlash: 'never',
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      // Pages techniques ou redirigées : hors sitemap.
      filter: (page) => !/\/(keystatic|api|profil-coureur|404)(\/|$)/.test(page),
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
