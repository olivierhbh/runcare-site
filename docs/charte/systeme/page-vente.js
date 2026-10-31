// Page de vente du bilan (copie du tunnel, page 46161772), d'après docs/charte/sources/maquette/index.html.
// Prérequis : rc-builder.js chargé dans l'onglet de l'éditeur. FORMULES = page des formules de la copie.
(() => {
  const { C, sec, row, col, box, h, t, eyebrow, small, btn, img, vid, list, faq, hidden, keep, TIDY_APPEL } = RC;
  const FORMULES = 'https://runcare.systeme.io/748f0635-89d03b4a-d15dc65e';
  const old = RC.begin();
  const rawPdf = Object.values(old).find((e) => e.type === 'RawHtml');
  const S = [];

  S.push(sec({ pt: 24, pb: 20, mpt: 20, mpb: 16 }, [img('logo', { width: 240, mwidth: 180, alt: 'RunCare, kiné et coach' })]));

  S.push(sec({ bg: C.dark, pt: 64, pb: 76, mpt: 44, mpb: 52 }, [
    eyebrow('Bilan Coaching RunCare · Bordeaux', { dark: true, align: 'center' }),
    h('Tu cours régulièrement, tu veux progresser… mais les douleurs ou les blessures <em>freinent ta progression ?</em>', { tag: 'h1', size: 54, msize: 34, align: 'center', color: C.darkInk, mb: 20 }),
    t('Tout coaching commence par un bilan, au cabinet à Bordeaux, pour établir une vision claire de ta situation.', { size: 22, msize: 19, lh: 1.5, align: 'center', color: C.darkMuted, mb: 28 }),
    vid('https://youtu.be/mzkMKVzwtqY', { mb: 28 }),
    btn('Je réserve mon appel gratuit', TIDY_APPEL),
    small('15 minutes avec ton kiné-coach, sans engagement.', { dark: true, mb: 14 }),
    btn('Voir les formules de coaching', FORMULES, { variant: 'ghost', dark: true, mt: 0, mb: 24 }),
    t(`<span style="color: ${C.mint}">✓</span> Kinés du sport et coachs&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: ${C.mint}">✓</span> Bilan 90 €, sans abonnement&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: ${C.mint}">✓</span> Priorités claires en une consultation`, { size: 17, msize: 16, align: 'center', color: C.darkInk, mb: 0 }),
  ]));

  S.push(sec({}, [
    row([
      col(6, [
        eyebrow('Ton parcours'),
        h('Tu as peut-être déjà essayé :', { size: 36, msize: 28 }),
        list(['De te <strong>reposer</strong> en cas de douleur', "Un plan d'entraînement <strong>standardisé</strong> (coach, IA, internet)", 'Du renforcement musculaire <strong>non spécifique</strong>', 'Des <strong>étirements</strong>', 'Des séances de rééducation <strong>sans résultats</strong>', 'De changer ta <strong>foulée</strong> ou tes <strong>chaussures</strong>'], { cross: true }),
      ]),
      col(6, [
        eyebrow('Le constat'),
        h("Pourquoi ça n'a pas marché ?", { size: 36, msize: 28 }),
        t('Car ces éléments pris <strong>séparément</strong> ne permettent pas :', { mb: 10 }),
        list(['de prendre du <strong>recul</strong>', 'de <strong>comprendre</strong> le problème dans sa globalité', 'de <strong>définir</strong> les bonnes <strong>priorités</strong>']),
      ]),
    ]),
    box([h("C'est précisément là que notre <em>Bilan Coaching RunCare</em> prend tout son sens.", { tag: 'h3', size: 32, msize: 24, align: 'center', mb: 0 })], { mt: 40, mmt: 28 }),
  ]));

  const step = (n, title, sub, body) => box([
    h(`<span style="color: ${C.accent}">${n}.</span> ${title}${sub ? ` <span style="font-family: ${RC.F.sans[0]}; font-size: 17px; color: ${C.ink2}">${sub}</span>` : ''}`, { tag: 'h3', size: 26, msize: 22, mb: 12 }),
    ...body,
  ], { bg: C.white, border: RC.border(1, C.line), pad: RC.p(28, 32), mpad: RC.p(22, 20), mb: 16, mmb: 12 });
  S.push(sec({ bg: C.bg2 }, [
    box([
      eyebrow("Qu'est-ce que ce bilan ?", { align: 'center' }),
      h('Trois étapes, une seule consultation.', { align: 'center', mb: 32, mmb: 24 }),
    ]),
    step(1, 'Une analyse de ton profil', '(peut être réalisée en visio)', [
      list(['<strong>Questionnaire pré-bilan</strong> et tests musculaires à distance', '<strong>Analyse de ta foulée</strong> en présentiel grâce aux capteurs Stryd', '<strong>Bilan dynamométrique</strong> en présentiel pour compléter les tests musculaires'], { mb: 0 }),
    ]),
    step(2, 'Établir ton diagnostic', '', [
      t("Nous <strong>croisons l'ensemble</strong> de ces informations afin d'identifier les facteurs qui limitent réellement ta progression et d'expliquer pourquoi certaines douleurs ou difficultés persistent.", { mb: 12 }),
      list(['<strong>Lors de la consultation</strong>, nous définissons les actions prioritaires à mettre en place et nous répondons à tes questions.', '<strong>Après la consultation</strong>, nous te présentons nos conclusions à travers un PDF récapitulatif.'], { mb: 0 }),
    ]),
    step(3, 'Coaching', '', [
      t('Nous <strong>mettons en lien</strong> les conclusions du bilan avec tes <strong>objectifs</strong> pour te proposer l\'accompagnement le plus adapté à ta situation.', { mb: 0 }),
    ]),
    box([
      btn('Je réserve mon appel gratuit', TIDY_APPEL),
      small('On fait le point sur ta pratique, puis tu décides.', { mb: 14 }),
      btn('Voir les formules de coaching', FORMULES, { variant: 'ghost', mt: 0 }),
    ], { mt: 28 }),
  ]));

  S.push(sec({}, [
    box([
      eyebrow('Pour qui ?'),
      h('Ce Bilan Coaching est fait pour toi si :', { size: 36, msize: 28 }),
      list(['Tu souhaites reprendre <strong>confiance</strong> dans ton entraînement plutôt que courir avec la <strong>peur de te blesser</strong>.', 'Tu veux <strong>comprendre</strong> pourquoi tu te blesses et agir sur les causes plutôt que traiter uniquement les conséquences.', 'Tu recherches un <strong>accompagnement</strong> individualisé, fondé sur les données <strong>scientifiques</strong> et l\'expertise de <strong>professionnels de santé</strong>.']),
      h("<em>Une seule</em> consultation pour objectiver et prioriser ce qui aura le plus d'efficience dans ta progression.", { tag: 'h3', size: 26, msize: 21, mt: 12, mb: 0 }),
    ], { bg: C.accentSoft, pad: RC.p(44, 44), mpad: RC.p(28, 20) }),
  ]));

  S.push(sec({ width: 'small', pt: 0, mpt: 0 }, [
    box([
      eyebrow('Tarif du Bilan Coaching RunCare', { align: 'center' }),
      h('90 €', { tag: 'p', size: 96, msize: 72, align: 'center', mb: 8 }),
      t('<strong>Sans engagement, sans abonnement.</strong>', { align: 'center', mb: 10 }),
      t('Tu peux appliquer les recommandations en autonomie ou, si tu le souhaites, choisir de te faire accompagner par la suite.', { size: 18, msize: 17, align: 'center', color: C.ink2, mb: 24 }),
      btn('Je réserve mon appel gratuit', TIDY_APPEL),
      small('Appel de 15 min, gratuit. Le bilan se réserve ensuite.', { mb: 0 }),
    ], { bg: C.white, border: RC.border(2, C.accent), pad: RC.p(44, 40), mpad: RC.p(30, 20) }),
  ]));

  const proof = (txt) => box([t(`« ${txt} »`, { size: 16, color: C.ink2, mb: 8 }), t('<strong>Prénom, distance ou objectif</strong>', { size: 15, mb: 0 })], { bg: C.white, border: { ...RC.border(1, C.line), style: 'dashed' }, pad: RC.p(20, 20) });
  S.push(sec({ bg: C.bg2, pb: 24, mpb: 16 }, [
    box([
      eyebrow('Après la consultation', { align: 'center' }),
      h('Chez RunCare, on objective tes déficits.', { align: 'center' }),
      t('Tes résultats et tes priorités de travail te sont remis dans un PDF récapitulatif.', { align: 'center', color: C.ink2, mb: 0 }),
    ]),
  ]));
  // Le récapitulatif PDF (code HTML intégré) est conçu pour la pleine largeur, comme sur la page d'origine.
  if (rawPdf) S.push(sec({ bg: C.bg2, width: 'fullPage', pt: 0, mpt: 0, pb: 0, mpb: 0 }, [RC.keep(rawPdf)]));
  S.push(sec({ bg: C.bg2, pt: 0, mpt: 0 }, [
    // Témoignages : masqués tant qu'il n'y a pas de vrais retours (rendre visibles dans l'éditeur une fois remplis).
    hidden(box([eyebrow('Ils ont fait le bilan', { align: 'center' }), h('Ce que disent les coureurs.', { size: 30, msize: 24, align: 'center' })], { mt: 40 })),
    hidden(row([
      col(4, [proof('Emplacement pour un retour de coureur : deux ou trois phrases, concrètes, sur ce que le bilan a changé.')]),
      col(4, [proof('Emplacement pour un deuxième retour. À collecter auprès des coureurs déjà passés par le bilan.')]),
      col(4, [proof('Emplacement pour un troisième retour. Un avis Google peut être repris mot pour mot.')]),
    ])),
  ]));

  S.push(sec({ bg: C.dark }, [
    row([
      col(6, [
        eyebrow('Notre approche', { dark: true }),
        h('Pourquoi notre approche est différente ?', { color: C.darkInk }),
        t('Chez RunCare, nous avons une double casquette :', { color: C.darkMuted, mb: 10 }),
        t(`<span style="color: ${C.mint}">1.</span> L'expertise du <strong>kinésithérapeute</strong> pour comprendre ton corps.\n<span style="color: ${C.mint}">2.</span> Celle du <strong>coach</strong> pour construire ta progression.`, { color: C.darkInk, mb: 16 }),
        t("Le Bilan Coaching RunCare combine ces deux approches afin de définir une stratégie d'entraînement adaptée à ton profil et à tes objectifs.", { color: C.darkMuted, mb: 0 }),
      ]),
      col(6, [
        h("C'est facile de progresser. C'est facile de ne pas se blesser. <em>Progresser sans se blesser</em>, c'est là que se trouve notre expertise.", { tag: 'h3', size: 32, msize: 25, color: C.darkInk, mt: 8, mmt: 28, mb: 24 }),
        btn('Je réserve mon appel gratuit', TIDY_APPEL, { align: 'flex-start' }),
      ]),
    ]),
  ]));

  S.push(sec({ width: 'small' }, [
    eyebrow('Questions fréquentes', { align: 'center' }),
    h('Avant de réserver', { align: 'center', mb: 28 }),
    faq([
      ['Est-ce que je peux faire le bilan si je suis actuellement blessé ?', "Oui. Nous cherchons d'abord à comprendre pourquoi ta blessure est apparue et ce qui t'empêche de reprendre durablement. Si ta situation nécessite une prise en charge médicale spécifique, nous t'orienterons vers un professionnel de santé adapté."],
      ['Est-ce que vous analysez ma foulée ?', "Oui, mais pas systématiquement. La littérature scientifique ne permet pas de considérer qu'il existe une « foulée parfaite » permettant à elle seule de prévenir ou guérir les blessures."],
      ['Que se passe-t-il après le bilan ?', "À l'issue du bilan, nous t'expliquons clairement les principaux éléments identifiés et les priorités de travail, que tu pourras appliquer seul ou accompagné si tu choisis un coaching."],
      ['Quel est le prix du coaching ?', 'Selon ta situation, nous avons plusieurs formules de coaching pour répondre à tes besoins.'],
      ['Quel est le prix du bilan ?', '90 €, aucun abonnement, aucun engagement.'],
    ]),
  ]));

  S.push(sec({ bg: C.bg2 }, [
    eyebrow('On fait le point ?', { align: 'center' }),
    h('Appelle ton kiné-coach pour faire le point sur ta pratique.', { align: 'center', mb: 24 }),
    btn('Je réserve mon appel gratuit', TIDY_APPEL),
    small('15 minutes, gratuit, sans engagement.', { mb: 36 }),
    img('duo', { width: 448, mwidth: 320, alt: 'Romain et Lélio, kinésithérapeutes et coachs RunCare', mb: 28 }),
    h('À très vite !', { tag: 'p', size: 26, msize: 22, align: 'center', mb: 6 }),
    t('<strong>Romain et Lélio</strong>', { align: 'center', mb: 2 }),
    t('Kinésithérapeutes spécialisés en course à pied, fondateurs de RunCare', { size: 17, align: 'center', color: C.ink2, mb: 36 }),
    t("RunCare : actes de prévention et d'accompagnement du coureur. Les prestations de coaching sont réalisées par des kinésithérapeutes dans le cadre d'actes hors nomenclature et ne sont pas remboursées par l'Assurance Maladie.", { size: 15, msize: 14, lh: 1.5, align: 'center', color: C.ink2, mb: 0 }),
  ]));

  return RC.apply(S);
})();
