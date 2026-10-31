// Page des formules de coaching (copie du tunnel, page 46161776), d'après docs/charte/sources/maquette/formules.html.
// Remplace l'image du comparatif par du texte. Prérequis : rc-builder.js chargé.
window.__formules = () => {
  const { C, sec, row, col, box, h, t, eyebrow, small, btn, img, list, TIDY_APPEL, TIDY_BILAN } = RC;
  const VENTE = 'https://runcare.systeme.io/748f0635-9fb2da99';
  RC.begin();
  const S = [];
  S.push(sec({ pt: 24, pb: 8, mpt: 20, mpb: 8 }, [img('logo', { width: 240, mwidth: 180, alt: 'RunCare, kiné et coach' })]));
  S.push(sec({ pt: 32, pb: 40, mpt: 24, mpb: 28, width: 'small' }, [
    eyebrow('Formules de coaching RunCare', { align: 'center' }),
    h("Deux formules, un même niveau d'exigence.", { tag: 'h1', size: 52, msize: 34, align: 'center', mb: 18 }),
    t("Pour tout coaching, l'accompagnement commence par le Bilan Coaching RunCare. Il est offert dans les deux formules.", { size: 21, msize: 18, lh: 1.5, align: 'center', color: C.ink2, mb: 0 }),
  ]));
  const plan = (o) => {
    const ink = o.dark ? C.darkInk : C.ink, muted = o.dark ? C.darkMuted : C.ink2;
    return col(6, [box([
      eyebrow(o.sub, { dark: o.dark, mb: 6 }),
      h(o.name, { size: 32, msize: 26, color: o.dark ? C.darkInk : null, mb: 14 }),
      t(o.desc, { size: 18, msize: 17, color: ink, mb: 16 }),
      t(`<strong>Bilan Coaching (90 €) offert</strong>`, { size: 15, msize: 15, lh: 1.3, color: o.dark ? C.mint : C.accent, mb: 16 }),
      list(o.items, { dark: o.dark, mb: 18 }),
      t(o.ideal, { size: 16, msize: 15, lh: 1.5, color: muted, mb: 22 }),
      h(`${o.price} <span style="font-family: ${RC.F.sans[0]}; font-size: 18px; color: ${muted}">par mois</span>`, { tag: 'p', size: 46, msize: 40, color: o.dark ? C.darkInk : null, mb: 4 }),
      t(o.eng, { size: 16, msize: 15, color: muted, mb: 0 }),
    ], { bg: o.dark ? C.dark : C.white, border: RC.border(o.dark ? 2 : 1, o.dark ? C.dark : C.line), pad: RC.p(36, 32), mpad: RC.p(28, 20), mb: 0, mmb: 16 })]);
  };
  const base = ["Planification individualisée de l'entraînement", 'Conseils personnalisés en fonction de ta progression', 'Suivi digital sur Nolio', 'Fiches éducatives'];
  S.push(sec({ pt: 0, pb: 64, mpt: 0, mpb: 40 }, [row([
    plan({ sub: 'Essentiel', name: 'Gestion de charge', desc: "Tu bénéficies d'un plan d'entraînement personnalisé et d'un débrief avec ajustement tous les 15 jours.",
      items: [...base, 'Suivi et débrief tous les 15 jours'],
      ideal: "Idéal si tu as besoin d'un plan individualisé, construit à partir des objectifs identifiés lors du bilan, pour mieux gérer ta charge d'entraînement, avec des conseils d'experts pour ajuster ton programme au fil de ta préparation.",
      price: '60 €', eng: 'Engagement 6 mois · à distance' }),
    plan({ dark: true, sub: 'Premium', name: 'Accompagnement complet', desc: 'La même qualité de planification, avec un accompagnement beaucoup plus rapproché : suivi hebdomadaire, briefing chaque semaine, renforcement musculaire et échanges WhatsApp avec ton coach.',
      items: [...base, 'Suivi hebdomadaire et briefing chaque semaine', 'Échanges WhatsApp avec ton coach, réponse sous 48 h', 'Programme de préparation physique avec renforcement musculaire'],
      ideal: "Idéal si tu cherches un accompagnement complet, répondant à l'ensemble des objectifs identifiés lors de ton bilan, avec un accès direct à ton kiné-coach quand ta situation demande un conseil ou une adaptation.",
      price: '120 €', eng: 'Engagement 3 mois · à distance' }),
  ])]));
  S.push(sec({ bg: C.bg2, width: 'small' }, [
    eyebrow('Comment choisir ?', { align: 'center' }),
    h("La différence n'est pas dans le plan, mais dans le suivi.", { size: 38, msize: 28, align: 'center' }),
    t("Dans les deux formules, la planification de ton entraînement est réalisée avec le même niveau d'exigence et de personnalisation. La différence se situe dans le niveau de suivi et la disponibilité du coach.", { align: 'center', mb: 12 }),
    t("Tu hésites encore ? Le bilan, inclus dans chaque formule, permet justement d'identifier ce dont tu as besoin.", { align: 'center', mb: 28 }),
    btn('Je réserve mon bilan', TIDY_BILAN),
    small('90 €, offert si tu poursuis avec une formule. Sans engagement.', { mb: 14 }),
    btn("Je préfère un appel gratuit d'abord", TIDY_APPEL, { variant: 'ghost', mt: 0 }),
  ]));
  S.push(sec({ pt: 40, pb: 48, mpt: 32, mpb: 40 }, [
    t(`<a href="${VENTE}" style="color: ${C.accent}">← Retour à la page du bilan</a>`, { size: 17, align: 'center', mb: 24 }),
    t("RunCare : actes de prévention et d'accompagnement du coureur. Les prestations de coaching sont réalisées par des kinésithérapeutes dans le cadre d'actes hors nomenclature et ne sont pas remboursées par l'Assurance Maladie.", { size: 15, msize: 14, lh: 1.5, align: 'center', color: C.ink2, mb: 0 }),
  ]));
  return RC.apply(S);
};
