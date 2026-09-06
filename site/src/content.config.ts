import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const image = (schema: { image: () => z.ZodTypeAny }) => schema.image().optional();

const equipe = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/equipe' }),
  schema: ({ image: img }) =>
    z.object({
      nom: z.string(),
      ordre: z.number().default(1),
      titres: z.array(z.string()).default([]),
      services: z.array(z.string()).default([]),
      palmares: z.array(z.string()).default([]),
      philosophie: z.string().default(''),
      bio: z.string().default(''),
      portrait: img().optional(),
      photoAction: img().optional(),
      doctolib: z.string().optional().nullable(),
      strava: z.string().optional().nullable(),
    }),
});

const services = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: 'src/content/services' }),
  schema: ({ image: img }) =>
    z.object({
      titre: z.string(),
      ordre: z.number().default(1),
      besoin: z.string(),
      accroche: z.string(),
      intro: z.string(),
      format: z.string().default(''),
      duree: z.string().default(''),
      tarif: z.string().default(''),
      tarifNote: z.string().default(''),
      photo: img().optional(),
      ctaLabel: z.string(),
      ctaType: z.enum(['doctolib', 'whatsapp', 'contact', 'url']).default('contact'),
      ctaUrl: z.string().optional().nullable(),
      seoTitle: z.string().optional().nullable(),
      seoDescription: z.string().optional().nullable(),
    }),
});

const formules = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/formules' }),
  schema: z.object({
    nom: z.string(),
    ordre: z.number().default(1),
    sousTitre: z.string(),
    pourQui: z.string(),
    description: z.string(),
    inclus: z.array(z.string()),
    format: z.string(),
    engagement: z.string(),
    tarif: z.string(),
    tarifDetail: z.string().default(''),
    idealSi: z.string(),
    misEnAvant: z.boolean().default(false),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/faq' }),
  schema: z.object({
    question: z.string(),
    ordre: z.number().default(1),
    reponse: z.string(),
    accueil: z.boolean().default(true),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: 'src/content/articles' }),
  schema: ({ image: img }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      service: z.enum(['reeducation', 'bilan-runcare', 'analyse-de-foulee', 'coaching']),
      publishedDate: z.coerce.date(),
      cover: img().optional(),
      updatedDate: z.coerce.date().optional().nullable(),
      seoTitle: z.string().optional().nullable(),
      seoDescription: z.string().optional().nullable(),
    }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.mdoc', base: 'src/content/legal' }),
  schema: z.object({ titre: z.string() }),
});

export const collections = { equipe, services, formules, faq, articles, legal };
