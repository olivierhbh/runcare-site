// Pages de réservation de la copie du tunnel : « Différentes réservations » (46161773), « Agenda » (46161775),
// « Stripe agenda commun » (46161774, logo seul). Liens et calendrier repris de la page existante.
// Prérequis : rc-builder.js chargé dans l'onglet de l'éditeur de la page concernée.
const FORMULES = 'https://runcare.systeme.io/748f0635-89d03b4a-d15dc65e';
const logoSec = () => RC.sec({ pt: 24, pb: 8, mpt: 20, mpb: 8 }, [RC.img('logo', { width: 240, mwidth: 180, alt: 'RunCare, kiné et coach' })]);
const note = (txt) => RC.box([RC.t(txt, { size: 17, msize: 16, lh: 1.5, mb: 0 })], { bg: RC.C.accentSoft, pad: RC.p(18, 22), mpad: RC.p(16, 16) });

window.__reservations = () => {
  const { C, sec, row, col, h, t, eyebrow, btn } = RC;
  const old = RC.begin();
  const url = (label) => Object.values(old).find((e) => e.type === 'Button' && e.text.trim() === label).linkUrl;
  const S = [logoSec()];
  S.push(sec({ pt: 32, mpt: 24, width: 'small' }, [
    eyebrow('Bilan Coaching RunCare', { align: 'center' }),
    h('Je réserve sur le planning de :', { tag: 'h1', size: 48, msize: 32, align: 'center', mb: 16 }),
    t("Pour tout coaching, l'accompagnement commence par le Bilan Coaching RunCare.", { size: 20, msize: 18, align: 'center', color: C.ink2, mb: 32 }),
    btn('Pas de préférence', url('Pas de préférence'), { mb: 28 }),
  ]));
  S.push(sec({ pt: 0, mpt: 0, width: 'small' }, [
    row([
      col(6, [btn('Lélio', url('Lélio'), { variant: 'secondary', full: true, mt: 0, mb: 8 })]),
      col(6, [btn('Romain', url('Romain'), { variant: 'secondary', full: true, mt: 0, mb: 8 })]),
    ], { mb: 32 }),
    note('⚠️ Avant la consultation, tu devras remplir un questionnaire et réaliser des tests (durée estimée : 45 min). Prends-le en compte dans ton organisation.'),
  ]));
  return RC.apply(S);
};

window.__agenda = () => {
  const { C, sec, box, h, t, eyebrow, btn } = RC;
  const old = RC.begin();
  const cal = Object.values(old).find((e) => e.type === 'BookingCalendar');
  const S = [logoSec()];
  S.push(sec({ pt: 32, pb: 32, mpt: 24, mpb: 24, width: 'small' }, [
    eyebrow('Réservation', { align: 'center' }),
    h('Réserve ton Bilan Diagnostic RunCare', { tag: 'h1', size: 48, msize: 32, align: 'center', mb: 16 }),
    t('Aucun paiement n’est demandé au moment de la réservation : <strong>un lien de paiement sécurisé</strong> te sera envoyé <strong>à la fin</strong> de la visioconférence.', { size: 19, msize: 17, align: 'center', color: C.ink2, mb: 24 }),
    note('⚠️ Avant la visio, tu devras remplir un questionnaire et réaliser les tests (durée estimée : 45 min). Prends-le en compte dans ton organisation.'),
  ]));
  S.push(sec({ pt: 0, pb: 56, mpt: 0, mpb: 40 }, [box([RC.keepTree(old, cal.id, {
    titlesColor: C.ink, mobileTitlesColor: C.ink, color: 'rgba(20, 34, 56, 0.72)', mobileColor: 'rgba(20, 34, 56, 0.72)',
    selectedSlotBackgroundColor: C.accent, availableSlotBackgroundColor: C.accentSoft,
    fieldBorder: { ...cal.fieldBorder, color: C.line, radius: 4 },
  })], { bg: C.white, border: RC.border(1, C.line), pad: RC.p(8, 8), mpad: RC.p(0, 0) })]));
  S.push(sec({ bg: C.bg2, width: 'small', pt: 56, mpt: 40 }, [
    eyebrow('Rappel des tarifs', { align: 'center' }),
    h('Bilan Diagnostic seul : 90 €', { size: 34, msize: 26, align: 'center', mb: 12 }),
    t("Le Bilan Diagnostic est <strong>offert</strong> s'il est suivi d'un accompagnement.", { align: 'center', mb: 24 }),
    btn('Voir les accompagnements RunCare', FORMULES, { variant: 'ghost', mt: 0 }),
  ]));
  return RC.apply(S);
};

window.__stripe = () => { RC.begin(); return RC.apply([logoSec()]); };
