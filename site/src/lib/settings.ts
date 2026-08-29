import { load } from 'js-yaml';

export type Settings = {
  nom: string; baseline: string; adresse: string; codePostal: string; ville: string;
  telephone: string; whatsapp: string; whatsappCoaching: string; telephoneLelio: string; email: string;
  doctolibRomain: string; doctolibLelio: string; instagram: string;
  horaires: string; leadMagnetUrl: string;
};

import raw from '../content/settings.yaml?raw';
export const settings = load(raw) as Settings;

export const whatsappUrl = (text?: string, number: string = settings.whatsapp) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/** WhatsApp dédié au coaching (numéro de Lelio). */
export const whatsappCoachingUrl = (text?: string) => whatsappUrl(text, settings.whatsappCoaching);

export const telHref = `tel:+33${settings.telephone.replace(/\D/g, '').replace(/^0/, '')}`;

export function ctaHref(type: 'doctolib' | 'whatsapp' | 'contact' | 'url', url?: string | null, subject?: string) {
  switch (type) {
    case 'doctolib': return url || settings.doctolibRomain;
    case 'whatsapp': return whatsappUrl(subject ? `Bonjour, je souhaite ${subject}.` : undefined);
    case 'url': return url ?? '#';
    default: return '/contact';
  }
}

/** Le cabinet est la marque principale ; RunCare est son programme dédié au coureur. */
export const cabinet = { nom: 'Argonne Kiné Sport Santé', court: 'Argonne', baseline: 'Kinésithérapie du sport · Bordeaux' };
export const runcare = { nom: 'RunCare', baseline: 'Le programme du coureur' };

export const nav = [
  { href: '/kinesitherapie', label: 'Kinésithérapie' },
  { href: '/runcare', label: 'RunCare' },
  { href: '/equipe', label: 'L’équipe' },
  { href: '/blog', label: 'Conseils' },
];

/** URL de chaque service (id de la collection `services`). */
export const servicePath: Record<string, string> = {
  'reeducation': '/kinesitherapie',
  'bilan-runcare': '/runcare/bilan',
  'analyse-de-foulee': '/runcare/analyse-de-foulee',
  'coaching': '/runcare/coaching',
};

export const serviceLabels: Record<string, string> = {
  'reeducation': 'Kinésithérapie',
  'bilan-runcare': 'Bilan RunCare',
  'analyse-de-foulee': 'Analyse de foulée',
  'coaching': 'Coaching',
};

/** Services RunCare (hors kinésithérapie), pour les menus et le hub. */
export const runcareNav = [
  { href: servicePath['bilan-runcare'], label: 'Bilan Diagnostic' },
  { href: servicePath['analyse-de-foulee'], label: 'Analyse de foulée' },
  { href: servicePath['coaching'], label: 'Coaching' },
];
