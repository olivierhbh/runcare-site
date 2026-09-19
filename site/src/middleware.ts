import { defineMiddleware } from 'astro:middleware';

// L'interface d'édition et ses routes d'API ne doivent pas être indexées.
// _headers ne s'applique qu'aux fichiers statiques : ces routes, servies par
// le Worker, reçoivent l'en-tête ici.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!/^\/(keystatic|api)(\/|$)/.test(context.url.pathname)) return response;
  // Copie : les en-têtes d'une redirection (Response.redirect) sont immuables.
  const copy = new Response(response.body, response);
  copy.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return copy;
});
