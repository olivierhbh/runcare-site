import { config, fields, collection, singleton } from '@keystatic/core';

// Mode GitHub dès que la GitHub App est configurée (variables KEYSTATIC_* /
// PUBLIC_KEYSTATIC_GITHUB_APP_SLUG), sinon mode local pour le développement.
const github = Boolean(import.meta.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG || import.meta.env.PUBLIC_KEYSTATIC_GITHUB_MODE);

export default config({
  storage: github
    ? { kind: 'github', repo: 'olivierhbh/runcare-site', pathPrefix: 'site' }
    : { kind: 'local' },
  ui: { brand: { name: 'Argonne Kiné Sport Santé' } },
  singletons: {
    settings: singleton({
      label: 'Coordonnées & réglages',
      path: 'src/content/settings',
      format: { data: 'yaml' },
      schema: {
        nom: fields.text({ label: 'Nom du cabinet', defaultValue: 'Argonne Kiné Sport Santé' }),
        baseline: fields.text({ label: 'Baseline', defaultValue: 'Kinésithérapie du sport · Bordeaux' }),
        adresse: fields.text({ label: 'Adresse' }),
        codePostal: fields.text({ label: 'Code postal' }),
        ville: fields.text({ label: 'Ville' }),
        telephone: fields.text({ label: 'Téléphone' }),
        whatsapp: fields.text({ label: 'Numéro WhatsApp général (format international, ex. 33612345678)' }),
        whatsappCoaching: fields.text({ label: 'Numéro WhatsApp pour le coaching (format international)' }),
        telephoneLelio: fields.text({ label: 'Téléphone Lelio' }),
        email: fields.text({ label: 'Email' }),
        doctolibRomain: fields.url({ label: 'Doctolib — Romain' }),
        doctolibLelio: fields.url({ label: 'Doctolib — Lelio' }),
        instagram: fields.url({ label: 'Instagram' }),
        horaires: fields.text({ label: 'Horaires', multiline: true }),
        leadMagnetUrl: fields.url({ label: 'Lien du test « Quel coureur êtes-vous ? »' }),
      },
    }),
  },
  collections: {
    equipe: collection({
      label: 'Équipe',
      path: 'src/content/equipe/*',
      slugField: 'prenom',
      format: { data: 'yaml' },
      schema: {
        prenom: fields.slug({ name: { label: 'Prénom' } }),
        nom: fields.text({ label: 'Nom' }),
        ordre: fields.integer({ label: 'Ordre d’affichage', defaultValue: 1 }),
        titres: fields.array(fields.text({ label: 'Titre' }), {
          label: 'Titres / casquettes',
          itemLabel: (p) => p.value,
        }),
        services: fields.array(fields.text({ label: 'Service' }), {
          label: 'Services assurés',
          itemLabel: (p) => p.value,
        }),
        palmares: fields.array(fields.text({ label: 'Ligne' }), {
          label: 'Palmarès / références',
          itemLabel: (p) => p.value,
        }),
        philosophie: fields.text({ label: 'Ma philosophie', multiline: true }),
        bio: fields.text({ label: 'Bio courte', multiline: true }),
        portrait: fields.image({ label: 'Portrait', directory: 'src/assets/photos/equipe', publicPath: '/src/assets/photos/equipe/' }),
        photoAction: fields.image({ label: 'Photo en course', directory: 'src/assets/photos/equipe', publicPath: '/src/assets/photos/equipe/' }),
        doctolib: fields.url({ label: 'Lien Doctolib' }),
        strava: fields.url({ label: 'Profil Strava' }),
      },
    }),
    services: collection({
      label: 'Services',
      path: 'src/content/services/*',
      slugField: 'titre',
      format: { contentField: 'contenu' },
      schema: {
        titre: fields.slug({ name: { label: 'Titre' } }),
        ordre: fields.integer({ label: 'Ordre d’affichage', defaultValue: 1 }),
        besoin: fields.text({ label: 'Besoin (accueil) — ex. « J’ai une douleur »' }),
        accroche: fields.text({ label: 'Accroche courte (accueil)', multiline: true }),
        intro: fields.text({ label: 'Introduction (haut de page)', multiline: true }),
        format: fields.text({ label: 'Format — ex. « Présentiel, au cabinet »' }),
        duree: fields.text({ label: 'Durée' }),
        tarif: fields.text({ label: 'Tarif' }),
        tarifNote: fields.text({ label: 'Précision tarif' }),
        photo: fields.image({ label: 'Photo', directory: 'src/assets/photos/services', publicPath: '/src/assets/photos/services/' }),
        ctaLabel: fields.text({ label: 'Texte du bouton' }),
        ctaType: fields.select({
          label: 'Action du bouton',
          options: [
            { label: 'Doctolib', value: 'doctolib' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Page contact', value: 'contact' },
            { label: 'Lien externe', value: 'url' },
          ],
          defaultValue: 'contact',
        }),
        ctaUrl: fields.url({ label: 'Lien externe (si « Lien externe »)' }),
        contenu: fields.markdoc({ label: 'Contenu de la page' }),
      },
    }),
    formules: collection({
      label: 'Formules de coaching',
      path: 'src/content/formules/*',
      slugField: 'nom',
      format: { data: 'yaml' },
      schema: {
        nom: fields.slug({ name: { label: 'Nom' } }),
        ordre: fields.integer({ label: 'Ordre', defaultValue: 1 }),
        sousTitre: fields.text({ label: 'Sous-titre' }),
        pourQui: fields.text({ label: 'Pour qui ?' }),
        description: fields.text({ label: 'Description', multiline: true }),
        inclus: fields.array(fields.text({ label: 'Élément' }), { label: 'Ce qui est inclus', itemLabel: (p) => p.value }),
        format: fields.text({ label: 'Format' }),
        engagement: fields.text({ label: 'Engagement' }),
        tarif: fields.text({ label: 'Tarif' }),
        tarifDetail: fields.text({ label: 'Précision tarif' }),
        idealSi: fields.text({ label: 'Idéal si…', multiline: true }),
        misEnAvant: fields.checkbox({ label: 'Mettre en avant' }),
        tableau: fields.object({
          programme: fields.text({ label: 'Programme' }),
          planification: fields.text({ label: 'Planification' }),
          suivi: fields.text({ label: 'Suivi' }),
          ajustement: fields.text({ label: 'Ajustement' }),
        }, { label: 'Colonnes du tableau comparatif' }),
      },
    }),
    faq: collection({
      label: 'FAQ',
      path: 'src/content/faq/*',
      slugField: 'question',
      format: { data: 'yaml' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        ordre: fields.integer({ label: 'Ordre', defaultValue: 1 }),
        reponse: fields.text({ label: 'Réponse', multiline: true }),
        accueil: fields.checkbox({ label: 'Afficher sur l’accueil', defaultValue: true }),
      },
    }),
    articles: collection({
      label: 'Articles',
      path: 'src/content/articles/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        description: fields.text({ label: 'Résumé', multiline: true }),
        service: fields.select({
          label: 'Service lié',
          options: [
            { label: 'Rééducation', value: 'reeducation' },
            { label: 'Bilan RunCare', value: 'bilan-runcare' },
            { label: 'Analyse de foulée', value: 'analyse-de-foulee' },
            { label: 'Coaching', value: 'coaching' },
          ],
          defaultValue: 'reeducation',
        }),
        publishedDate: fields.date({ label: 'Date de publication' }),
        cover: fields.image({ label: 'Image de couverture', directory: 'src/assets/photos/articles', publicPath: '/src/assets/photos/articles/' }),
        content: fields.markdoc({ label: 'Contenu' }),
      },
    }),
  },
});
