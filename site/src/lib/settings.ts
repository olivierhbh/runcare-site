import { load } from 'js-yaml';

export type Settings = {
  nom: string; baseline: string; adresse: string; codePostal: string; ville: string;
  telephone: string; telephoneCabinet: string; whatsapp: string; whatsappCoaching: string; telephoneLelio: string; email: string; emailRuncare: string; venteUrl: string;
  doctolibRomain: string; doctolibLelio: string; instagram: string;
  horaires: string; leadMagnetUrl: string;
  googleMapsUrl: string; latitude: string; longitude: string;
  googleSiteVerification: string; umamiWebsiteId: string;
};

import raw from '../content/settings.yaml?raw';
export const settings = load(raw) as Settings;

export const whatsappUrl = (text?: string, number: string = settings.whatsapp) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** WhatsApp dédié au coaching (numéro de Lelio). */
export const whatsappCoachingUrl = (text?: string) => whatsappUrl(text, settings.whatsappCoaching);

/** Numéro au format international E.164 (+33…), pour schema.org. */
export const telE164 = (n: string) => `+33${n.replace(/\D/g, '').replace(/^0/, '')}`;
const toTel = (n: string) => `tel:${telE164(n)}`;
export const telHref = toTel(settings.telephone);
export const telCabinetHref = toTel(settings.telephoneCabinet);

export function ctaHref(type: 'doctolib' | 'whatsapp' | 'contact' | 'url', url?: string | null, subject?: string) {
  switch (type) {
    case 'doctolib': return url || settings.doctolibLelio;
    case 'whatsapp': return whatsappUrl(subject ? `Bonjour, je souhaite ${subject}.` : undefined);
    case 'url': return url ?? '#';
    default: return '/contact';
  }
}

/** tag: petit repère affiché sous l'entrée (RunCare en vert, Argonne en bleu). */
export type NavItem = { href: string; label: string; tag?: 'runcare' | 'argonne' };
export const nav: NavItem[] = [
  { href: '/reeducation', label: 'Rééducation', tag: 'argonne' },
  { href: '/bilan-runcare', label: 'Bilan', tag: 'runcare' },
  { href: '/analyse-de-foulee', label: 'Analyse de foulée', tag: 'runcare' },
  { href: '/coaching', label: 'Coaching', tag: 'runcare' },
  { href: '/equipe', label: 'L’équipe' },
  { href: '/blog', label: 'Conseils' },
];

export const serviceLabels: Record<string, string> = {
  'reeducation': 'Rééducation',
  'bilan-runcare': 'Bilan RunCare',
  'analyse-de-foulee': 'Analyse de foulée RunCare',
  'coaching': 'Coaching RunCare',
};
