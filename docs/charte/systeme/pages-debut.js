// Début du tunnel (copie) : page de capture (46161769) et remerciements (46161770).
// Les champs du formulaire, le bouton d'envoi et le bouton « étape suivante » sont conservés (mêmes éléments,
// mêmes actions), seulement rhabillés. La popup de la page de capture est conservée telle quelle.
// Prérequis : rc-builder.js chargé dans l'onglet de l'éditeur de la page concernée.
const inBody = (E, id) => { const body = Object.values(E).find((e) => e.type === 'Body'); let e = E[id]; while (e && e.parentId) { if (e.parentId === body.id) return true; e = E[e.parentId]; } return false; };
const logoSec = () => RC.sec({ pt: 24, pb: 8, mpt: 20, mpb: 8 }, [RC.img('logo', { width: 240, mwidth: 180, alt: 'RunCare, kiné et coach' })]);
const signature = (roles) => RC.sec({ bg: RC.C.bg2, width: 'small', pt: 56, mpt: 40 }, [
  RC.img('duo', { width: 360, mwidth: 300, alt: 'Romain et Lélio, kinésithérapeutes et coachs RunCare', mb: 24 }),
  RC.h('Merci et à très vite !', { tag: 'p', size: 26, msize: 22, align: 'center', mb: 6 }),
  RC.t('<strong>Lélio et Romain</strong>', { align: 'center', mb: 2 }),
  RC.t(roles, { size: 17, align: 'center', color: RC.C.ink2, mb: 0 }),
]);

window.__capture = () => {
  const { C, sec, box, h, t, eyebrow } = RC;
  const old = RC.begin();
  const fields = Object.values(old).filter((e) => e.type === 'Field' && inBody(old, e.id));
  const send = Object.values(old).find((e) => e.type === 'Button' && e.action === 'sendForm' && inBody(old, e.id));
  const field = (slug) => RC.keepTree(old, fields.find((f) => f.slug === slug).id, {
    border: { color: C.line, style: 'solid', width: 1, radius: 4, type: 'fullBorder' }, backgroundColor: C.white,
    fontSize: 18, mobileFontSize: 17, padding: RC.p(16, 16), mobilePadding: RC.p(14, 14),
    margin: RC.m(0, 12), mobileMargin: RC.m(0, 12),
    placeholder: { first_name: 'Ton nom et prénom *', email: 'Ton adresse e-mail *' }[slug],
  });
  return RC.apply([
    logoSec(),
    sec({ pt: 32, pb: 64, mpt: 24, mpb: 44, width: 'small' }, [
      eyebrow('Profil du coureur · outil gratuit', { align: 'center' }),
      h('Découvre rapidement ce qui limite ta progression !', { tag: 'h1', size: 50, msize: 33, align: 'center', mb: 18 }),
      t('Nous sommes <strong>Lélio et Romain</strong>, kinésithérapeutes spécialisés en course à pied et trail.', { size: 20, msize: 18, align: 'center', mb: 10 }),
      t("Nous avons créé un <strong>outil gratuit</strong> qui t'évalue rapidement sur les <strong>3 piliers essentiels</strong> de la course à pied.", { size: 20, msize: 18, align: 'center', mb: 28 }),
      box([
        field('first_name'), field('email'),
        RC.restyleBtn(old, send.id, 'Comprends ton profil !', { full: true, mt: 8, mb: 0 }),
        t('En parallèle, tu recevras une newsletter avec du contenu informatif gratuit sur les principes de progression.', { size: 15, msize: 14, lh: 1.45, align: 'center', color: C.ink2, mt: 14, mb: 0 }),
      ], { bg: C.white, border: RC.border(1, C.line), pad: RC.p(28, 28), mpad: RC.p(20, 16) }),
    ]),
    signature('Kinésithérapeutes spécialisés en course à pied, fondateurs de RunCare'),
  ]);
};

window.__merci = () => {
  const { C, sec, box, h, t, eyebrow, list } = RC;
  const old = RC.begin();
  const next = Object.values(old).find((e) => e.type === 'Button');
  return RC.apply([
    logoSec(),
    sec({ pt: 32, pb: 64, mpt: 24, mpb: 44, width: 'small' }, [
      eyebrow('Merci pour ton intérêt !', { align: 'center' }),
      h('Vérifie ta boîte mail', { tag: 'h1', size: 50, msize: 34, align: 'center', mb: 18 }),
      t("Tu as reçu un mail de notre newsletter contenant l'accès à l'outil <strong>Profil de Coureur</strong> (bouton en fin de mail).", { size: 20, msize: 18, align: 'center', mb: 28 }),
      RC.restyleBtn(old, next.id, 'Découvrir mon profil coureur maintenant', { mt: 0, mb: 40 }),
      box([
        t('<strong>Tu recevras également notre newsletter.</strong> Au fil des prochains mails, nous allons :', { size: 18, msize: 17, mb: 12 }),
        list(["t'aider à mieux <strong>comprendre</strong> ce qui influence réellement ta <strong>progression</strong>", 'te donner des <strong>clés</strong> concrètes pour mieux comprendre ton entraînement et <strong>progresser</strong> plus <strong>durablement</strong>'], { mb: 0 }),
      ], { bg: C.accentSoft, pad: RC.p(24, 28), mpad: RC.p(20, 18) }),
    ]),
    signature('Kinésithérapeutes spécialisés en course à pied et trail, fondateurs de RunCare'),
  ]);
};
