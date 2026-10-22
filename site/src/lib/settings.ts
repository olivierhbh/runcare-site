import { load } from 'js-yaml';

export type Settings = {
  nom: string; baseline: string; adresse: string; codePostal: string; ville: string;
  telephone: string; telephoneCabinet: string; whatsapp: string; whatsappCoaching: string; telephoneLelio: string; email: string; emailRuncare: string; venteUrl: string;
  doctolibRomain: string; doctolibLelio: string; instagram: string;
  horaires: string; leadMagnetUrl: string; appelGratuitUrl: string;
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
export type NavItem = { href: string; label: string; tag?: 'runcare' | 'argonne'; external?: boolean };
/** Les deux services (menu principal et colonne « Services » du pied de page). */
export const servicesNav: NavItem[] = [
  { href: '/reeducation', label: 'Rééducation', tag: 'argonne' },
  // La page coaching renvoie sur la page de vente systeme.io (demande Romain, 22/10/2026) : on y va directement.
  { href: settings.venteUrl || '/coaching', label: 'Coaching', tag: 'runcare', external: true },
];
// Menu principal (consigne Romain, 15/10/2026) : bilan et analyse de foulée retirés, remplacés par le test de profil.
export const nav: NavItem[] = [
  servicesNav[0],
  { href: settings.leadMagnetUrl || '/profil-coureur', label: 'Découvre ton profil de coureur', tag: 'runcare', external: true },
  servicesNav[1],
  { href: '/equipe', label: 'L’équipe' },
  { href: '/blog', label: 'Conseils' },
];

export const serviceLabels: Record<string, string> = {
  'reeducation': 'Rééducation',
  'bilan-runcare': 'Bilan RunCare',
  'coaching': 'Coaching RunCare',
};
