// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Le site est statique ; seules les routes /keystatic et /api/keystatic sont
// rendues à la demande (adaptateur Vercel), ce qui permet l'édition en ligne.
export default defineConfig({
  site: 'https://argonnekinesportsante.fr',
  adapter: vercel(),
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
