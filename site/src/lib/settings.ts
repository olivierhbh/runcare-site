import { load } from 'js-yaml';

export type Settings = {
  nom: string; baseline: string; adresse: string; codePostal: string; ville: string;
  telephone: string; whatsapp: string; email: string;
  doctolibRomain: string; doctolibLelio: string; instagram: string;
  horaires: string; leadMagnetUrl: string;
};

import raw from '../content/settings.yaml?raw';
export const settings = load(raw) as Settings;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${settings.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const telHref = `tel:+33${settings.telephone.replace(/\D/g, '').replace(/^0/, '')}`;

export function ctaHref(type: 'doctolib' | 'whatsapp' | 'contact' | 'url', url?: string | null, subject?: string) {
  switch (type) {
    case 'doctolib': return settings.doctolibRomain;
    case 'whatsapp': return whatsappUrl(subject ? `Bonjour, je souhaite ${subject}.` : undefined);
    case 'url': return url ?? '#';
    default: return '/contact';
  }
}

export const nav = [
  { href: '/reeducation', label: 'Rééducation' },
  { href: '/bilan-runcare', label: 'Bilan RunCare' },
  { href: '/analyse-de-foulee', label: 'Analyse de foulée' },
  { href: '/coaching', label: 'Coaching' },
  { href: '/equipe', label: 'L’équipe' },
  { href: '/blog', label: 'Conseils' },
];

export const serviceLabels: Record<string, string> = {
  'reeducation': 'Rééducation',
  'bilan-runcare': 'Bilan RunCare',
  'analyse-de-foulee': 'Analyse de foulée',
  'coaching': 'Coaching',
};
