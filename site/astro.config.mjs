// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

// Keystatic (interface d'édition /keystatic) n'est chargé qu'en développement :
// en production le site est 100 % statique. Pour éditer en prod, passer Keystatic
// en mode GitHub et ajouter un adaptateur (Vercel).
const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  site: 'https://runcare-bordeaux.fr',
  integrations: [react(), markdoc(), ...(isDev ? [keystatic()] : [])],
  vite: { plugins: [tailwindcss()] },
});
