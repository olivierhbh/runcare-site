# Journal de la migration du tunnel systeme.io (29/10/2026)

À redonner à Olivier en fin de journée : résumé de ce qui a été fait, et tout ce qu'il faut transmettre à Romain et Lélio.

## 1. Fait

- Copie du tunnel : https://systeme.io/dashboard/funnels/7750323 (le tunnel d'origine n'a pas été touché).
- 8 pages traitées, toutes sauvegardées et vérifiées publiées sur ordinateur et téléphone (détail dans `README.md`) :
  - Page de vente https://runcare.systeme.io/748f0635-9fb2da99 : maquette validée (haut bleu marine, vidéo, 3 étapes, tarif,
    PDF récapitulatif conservé en pleine largeur, FAQ dépliable, signature).
  - Formules https://runcare.systeme.io/748f0635-89d03b4a-d15dc65e-18d80b1a : image du comparatif remplacée par deux colonnes
    de texte (Premium sur fond bleu marine).
  - Capture https://runcare.systeme.io/79081d31-b845847e et Remerciements https://runcare.systeme.io/1c70f1a3-e04b5b62 :
    champs, bouton d'envoi et bouton « étape suivante » d'origine conservés, rhabillés.
  - Différentes réservations https://runcare.systeme.io/748f0635-89d03b4a-b9c04b1f : mêmes liens TidyCal et Doctolib.
  - Agenda https://runcare.systeme.io/d38d75ca-bfedb687-9bac6eb7 : calendrier natif conservé, recoloré en vert.
  - Stripe agenda commun : logo seul (page vide à l'origine).
  - Lead magnet : non touché (cadre vers l'outil Lovable, design dans Lovable).
- Importés dans leur compte : polices Fraunces (600, normal et italique) et Instrument Sans (400 et 700) en TTF,
  logo RunCare transparent, photo de Romain et Lélio.

## 2. À transmettre à Romain et Lélio

- Polices RunCare dans « Polices personnalisées » : « FrauncesSemiBold » (titres), « InstrumentSans » (texte),
  « InstrumentSansBold » (boutons), « FrauncesSemiBoldItalic ». Elles s'affichent aussi dans l'éditeur.
- Titres avec un passage en italique (4 sur la page de vente : haut de page, « Bilan Coaching RunCare », « Une seule »,
  « Progresser sans se blesser ») : si on modifie l'un de ces titres, l'éditeur enlève l'italique. Rien ne casse,
  le passage reste visible et de la bonne couleur. Attention : dans l'éditeur, ces passages s'affichent déjà en écriture
  droite (pas penchée), alors qu'ils sont bien en italique sur la page publiée. C'est normal.
- Même chose pour les petits passages en police de texte dans un titre (« (peut être réalisée en visio) » dans l'étape 1,
  « par mois » sur les formules) : ils reprennent la police des titres si on modifie le titre.
- Ne pas supprimer le texte masqué « NE PAS SUPPRIMER… » en haut de la page de vente : il fait charger l'italique.
- Bouton : le menu « Largeur du bouton » s'affiche vide ; c'est normal, la largeur est réglée (fluide sur ordinateur,
  pleine largeur sur mobile).
- Les liens internes pointent vers les pages de la copie.
- Page Agenda : l'ancien lien `runcare-site.vercel.app/coaching` était mort ; il pointe maintenant vers les formules.
- Témoignages : emplacements présents sur la page de vente mais masqués ; à remplir avec de vrais retours puis rendre visibles.
- Petites retouches de texte : « Prends-le », « te sera envoyé » (au lieu de « vous »), placeholders du formulaire en
  minuscules, bouton « Comprends ton profil ! » en minuscules ; surtitres ajoutés (ex. « Profil du coureur · outil gratuit »).
- Titres d'onglet des pages à remplir (plusieurs affichent « %TITRE% »).
- La popup de la page de capture n'a pas été restylée.
- Pour basculer : remplacer le tunnel d'origine par la copie, puis faire pointer `/coaching` du site vers la nouvelle page de vente.

## À proposer à Romain

- Refaire aussi le design du lead magnet (outil Lovable `dessinetonprofil.lovable.app`) en gardant contenu et calcul :
  il faut qu'il nous donne accès au projet Lovable (invitation, ou liaison à un dépôt GitHub). Son lien vers la page
  de vente pointe sur l'ancienne (`runcare.systeme.io/748f0635`), à changer à la bascule.

## 3. Contrôle de l'éditabilité (fait)
Contrôle fait le 29/10 dans l'éditeur de la page de vente (sans rien sauvegarder d'autre que les correctifs ci-dessous) :

- Encadrés (rangées) : fond, bordure, coins, marges, rembourrage reconnus et modifiables dans le panneau.
- Titres et textes : taille, interligne, alignement, marges, police reconnus ; saisie directe dans la page possible.
- Boutons : texte, lien, ouverture, alignement, police, couleurs reconnus.
- Listes à puces : police, taille, icône reconnues. FAQ : questions modifiables, ajout, ordre, affichage des réponses.
- Problème trouvé et corrigé : les 4 polices avaient été enregistrées comme « documents » par systeme.io (import automatisé
  sans type de fichier), donc absentes du menu des polices et de l'aperçu de l'éditeur. Réimportées en `font/ttf`, les
  7 pages refaites pointent maintenant sur les nouveaux fichiers ; vérifié publié (les 4 polices se chargent).
- Problème trouvé et corrigé : dans l'éditeur, les passages en italique d'un titre sur fond bleu marine étaient
  invisibles (bleu sur bleu). Couleur ajoutée sur le passage : visible dans l'éditeur, vraie italique sur la page publiée.
- Texte masqué de chargement de l'italique renommé « NE PAS SUPPRIMER… ».
- Les anciens fichiers de police (« documents ») sont restés dans leurs fichiers ; inutiles, supprimables par eux.

## 4. Lead magnet « Profil Coureur » (30/10)

### 4.1 État des lieux de l'outil d'origine

Fait :
- Accès au projet Lovable obtenu : https://lovable.dev/projects/cbf7baad-5c8b-43a0-a539-fb51d131e645 (« Lead Magnet »,
  propriétaire Lélio, 205 crédits restants, sous-domaine `dessinetonprofil`). Aucun dépôt GitHub relié ; l'éditeur de
  code de Lovable est modifiable directement (sans passer par le chat ni consommer de crédits).
- Code lu : application TanStack Start + Tailwind, tout l'outil tient dans `src/components/Quiz.tsx`,
  `src/lib/profil-coureur.ts` (calcul) et `src/styles.css`. Aucune base de données, aucun envoi : les réponses restent
  dans le navigateur.
- Écrans parcourus : accueil (bandeau logo, titre, bouton), 8 questions en 3 piliers (Charge 4, Récupération 1 avec deux
  encadrés d'aide, Biomécanique 3), résultat (3 barres sur 100, « La prochaine étape », bouton vers la page de vente,
  photo, signature, « Refaire le profil coureur »).
- Calcul (à garder tel quel) : Charge = moyenne(volume, séances, structure) × coefficient d'ancienneté (0,75 à 1,3),
  plafonnée à 100 ; Récupération = réponse directe ; Biomécanique = moyenne(blessures inversées, cadence, renforcement),
  plafonnée à 45 si 2 blessures ou plus.
- Intégration actuelle dans le tunnel (page lead magnet de la copie, 46161771) : cadre de hauteur fixe 2200 px.

Problèmes repérés (à transmettre) :
- Le bouton final « Découvrir le Bilan Diagnostic RunCare » s'ouvre dans le cadre : la page de vente se charge à
  l'intérieur de la page lead magnet au lieu de la remplacer.
- Cadre fixe de 2200 px : grand vide blanc sous les questions sur ordinateur, et au clic sur « Suivant » la question
  suivante peut s'afficher au-dessus de l'écran sur téléphone.
- Le bouton vise l'ancienne page de vente `runcare.systeme.io/748f0635` (à changer à la bascule).
- Nom de l'offre : l'outil dit « Bilan Diagnostic RunCare », la page de vente « Bilan Coaching RunCare ».
- Badge « Edit with Lovable » affiché en bas à droite quand on ouvre l'outil seul (il se masque tout seul
  dans un cadre, donc invisible dans le tunnel).

### 4.2 Copie refaite à la charte (fait le 30/10)

Même principe que pour le tunnel : l'outil d'origine et le tunnel d'origine n'ont pas été touchés.

- Copie du projet Lovable : « Lead Magnet (charte RunCare) »,
  https://lovable.dev/projects/ac83ad55-e983-45fd-833f-51dadcda12a1, dans l'espace Lovable de Lélio
  (propriétaire Olivier, transférable à Lélio : réglages du projet, « Transfer ownership »).
- Publiée sur https://profil-coureur-runcare.lovable.app (l'outil d'origine reste sur dessinetonprofil.lovable.app).
- Contenu et calcul inchangés : le bloc des 8 questions est recopié à l'identique (vérifié caractère pour caractère),
  `profil-coureur.ts` non touché ; mêmes réponses = mêmes scores que l'original (55 / 50 / 67 au test).
- Design : polices Fraunces (titres) et Instrument Sans (texte), fond crème, texte bleu marine, vert `#1f5e3a`, coins
  de 4 px, boutons comme sur le tunnel ; logo RunCare transparent en haut de l'accueil à la place du bandeau vert ;
  piliers en bleu marine (Charge), vert (Récupération) et ocre (Biomécanique) ; titre du résultat sur fond bleu marine.
- Logo : le même fichier que dans le tunnel, publié sur le site (commit 42dd6b2) :
  https://argonnekinesportsante.fr/charte/logo-runcare-fond-clair.png.
- Intégration : le bouton final ouvre la page de vente en pleine page (plus dans le cadre) et vise la page de vente de la
  copie (`/748f0635-9fb2da99`) ; l'outil envoie sa hauteur au tunnel, le cadre s'ajuste à chaque écran (plus de vide
  de 2200 px) et la page remonte en haut de la question suivante.
- Page lead magnet de la copie du tunnel (46161771) : cadre vers la copie + petit script de hauteur dans le bloc
  « Code HTML », fond crème, marges retirées ; sauvegardée et vérifiée publiée (parcours complet jusqu'à la page de vente).
- Code de référence dans `docs/charte/lovable/` (`Quiz.tsx` avec un repère à la place du bloc des questions,
  `styles.css`) ; dans `__root.tsx`, seuls le lien des polices et `lang="fr"` ont changé.
- Incident : à la création de la copie, Lovable a lancé tout seul une réponse de son IA (« mise à jour de sécurité des
  paquets ») ; je l'ai arrêtée, mais elle avait déjà monté les versions des paquets, ce qui a cassé la compilation
  (typage de l'écran d'erreur). Réparé avec « Fix build (free) » : 2 lignes dans `__root.tsx`, sans crédit.

À transmettre à Romain et Lélio :
- Comparer l'ancienne et la nouvelle version : https://dessinetonprofil.lovable.app et
  https://profil-coureur-runcare.lovable.app (ou dans la copie du tunnel : https://runcare.systeme.io/8f413eb4-bf97a13e).
- Lélio peut continuer à modifier la copie par le chat Lovable comme avant (le code reste lisible, couleurs et polices
  rangées dans `styles.css`). Le logo vient du site : ne pas changer son adresse sans prévenir.
- Si on modifie à la main le bloc « Code HTML » de la page lead magnet, garder le script sous le cadre
  (c'est lui qui ajuste la hauteur).
- Le nom de l'offre diffère toujours : « Bilan Diagnostic RunCare » dans l'outil, « Bilan Coaching RunCare » sur la page
  de vente (texte laissé tel quel).
- Petite retouche typographique : espace insécable avant le « ! » du bouton d'accueil.
- À la bascule : la page lead magnet du tunnel retenu doit pointer sur la copie (et sa page de vente), puis l'ancien
  projet peut être dépublié.

## 5. Validation (31/10)

Romain a tout validé (tunnel copié et lead magnet refait). Prochaine étape : la bascule, à faire dans une nouvelle session.
État des liens au 31/10 : le site pointe encore sur le tunnel d'origine (`site/src/content/settings.yaml` :
`venteUrl` = /748f0635, `leadMagnetUrl` = /79081d31 ; `coaching.mdoc` : `ctaUrl` = /748f0635). La copie vit sur des
chemins rallongés (capture /79081d31-b845847e, vente /748f0635-9fb2da99) et l'outil de la copie vise /748f0635-9fb2da99.

## 6. Bascule : comparaison des deux tunnels (31/10, lecture seule)

Tunnel d'origine 7382683 « Diagnostic du coureur », copie 7750323 « Diagnostic du coureur (copy) », même domaine
`runcare.systeme.io`, mêmes 8 étapes dans le même ordre.

| Étape | Origine | Copie |
|---|---|---|
| Capture | /79081d31 | /79081d31-b845847e |
| Remerciements | /1c70f1a3 | /1c70f1a3-e04b5b62 |
| Lead magnet | /8f413eb4 (cadre dessinetonprofil.lovable.app) | /8f413eb4-bf97a13e (cadre profil-coureur-runcare.lovable.app) |
| Vente | /748f0635 | /748f0635-9fb2da99 |
| Différentes réservations | /748f0635-89d03b4a | /748f0635-89d03b4a-b9c04b1f |
| Stripe agenda commun | /748f0635-89d03b4a-11a03860 | /748f0635-89d03b4a-11a03860-16b24a1b |
| Agenda | /d38d75ca-bfedb687 | /d38d75ca-bfedb687-9bac6eb7 |
| Formules | /748f0635-89d03b4a-d15dc65e | /748f0635-89d03b4a-d15dc65e-18d80b1a |

Identique dans les deux : formulaires (prénom + e-mail, dans la page et dans la popup), aucune offre ni moyen de paiement
sur les étapes (les paiements passent par TidyCal), aucun produit, liens TidyCal / Doctolib / PDF
`bilan-diagnostic-runcare.lovable.app`, pixel systeme.io, titres d'onglet (« %TITRE% » sur capture et agenda, vides ailleurs).

Ce que la copie n'a pas repris :
- **La règle d'automatisation** (la seule du compte) : origine = inscription sur la page de capture → abonnement à la
  « Campagne bilan coureur » (5 e-mails : J0 « Ton profil coureur est accessible ici », J+1, J+3, J+5, J+8 ; 29 contacts
  encore en cours). La copie n'en a aucune : un inscrit sur la copie ne reçoit aucun e-mail.

Entrées vers le tunnel d'origine :
- Site : `venteUrl` /748f0635 (menu, pied de page, /coaching en 301, équipe, articles), `leadMagnetUrl` /79081d31
  (menu, pied de page, accueil, /profil-coureur en 301), `coaching.mdoc` `ctaUrl` /748f0635 (non affiché).
- Campagne : 15 liens vers /748f0635 dans les 5 e-mails ; l'e-mail J0 vise directement `dessinetonprofil.lovable.app`
  (l'ancien outil : à changer avant toute dépublication).
- Liens codés en dur dans la copie : vente → formules, formules → vente, agenda → formules (chemins longs) ; l'outil
  Lovable de la copie → vente /748f0635-9fb2da99. Le bouton des remerciements est « étape suivante » (suit le tunnel).
- Divers : workflow « Mail lien du Bilan » inactif ; la page « Différentes réservations » n'est liée par aucune page.

## 7. Bascule faite (31/10, option A : échange des chemins)

Fait :
- Préparé sur la copie avant l'échange (aucun visiteur dessus) : liens en dur passés sur les chemins courts (vente →
  formules, formules → vente, agenda → formules, pages enregistrées) ; outil Lovable de la copie : `VENTE_URL` =
  https://runcare.systeme.io/748f0635, republié ; règle d'automatisation recréée sur la capture de la copie
  (inscription → « Campagne bilan coureur »).
- Échange des chemins (API des étapes, corps `{name, page: {path}}`) : les 8 pages de l'ancien tunnel portent
  maintenant le suffixe `-ancien` (ex. /79081d31-ancien, /748f0635-ancien) ; la copie a repris les chemins courts
  (/79081d31, /1c70f1a3, /8f413eb4, /748f0635, /748f0635-89d03b4a, /748f0635-89d03b4a-11a03860, /d38d75ca-bfedb687,
  /748f0635-89d03b4a-d15dc65e). Les chemins longs de la copie n'existent plus. Coupure de quelques secondes par page.
- Tunnels renommés : la copie s'appelle « Diagnostic du coureur », l'ancien « Diagnostic du coureur (archive, avant
  charte) ». L'ancienne règle d'automatisation reste en place (plus personne n'arrive sur l'ancienne capture).
- E-mail J0 « Ton profil coureur est accessible ici » : bouton « Détermine ton profil ! » repointé de
  dessinetonprofil.lovable.app vers https://runcare.systeme.io/8f413eb4 (page lead magnet du tunnel).
- Site : rien à changer (`settings.yaml` et `coaching.mdoc` gardent les chemins courts, qui servent la nouvelle version).
- Vérifié sur ordinateur : site (menu « Découvre ton profil », /profil-coureur, /coaching) → capture → envoi du
  formulaire (contact de test olivier.huibonhoa+runcare@gmail.com) → remerciements → lead magnet → 8 questions →
  résultat → page de vente en pleine page → formules → TidyCal (sans réserver). E-mail J0 reçu, son bouton mène à la
  nouvelle page lead magnet. Sur téléphone (cadre 390 px) : les 8 pages s'affichent sans débordement, questionnaire OK.

- Titres d'onglet des 8 pages posés et vérifiés publiés : « Découvre ton profil de coureur · RunCare » (capture),
  « Vérifie ta boîte mail · RunCare », « Ton profil de coureur · RunCare » (lead magnet), « Bilan Coaching RunCare ·
  Bordeaux » (vente), « Réserve ton bilan · RunCare », « RunCare » (Stripe agenda commun), « Agenda · RunCare »,
  « Formules de coaching · RunCare ».
- Ancien outil dessinetonprofil.lovable.app dépublié (projet conservé, republiable à tout moment depuis Publish).

Reste :
- Contact de test « Test bascule » (olivier.huibonhoa+runcare@gmail.com) à supprimer dans systeme.io : il est inscrit
  à la campagne.
- Copie Lovable : propriétaire Olivier, déjà dans l'espace de Lélio. Transfert (réglages du projet, « Transfer
  ownership ») seulement si Olivier le demande.
- Toujours ouverts : nom de l'offre (laissé tel quel), témoignages masqués.
- Popup de la page de capture : inutilisée (ouverture automatique coupée sur ordinateur et mobile, aucun bouton ne
  l'ouvre, déjà le cas dans l'ancien tunnel) ; invisible des visiteurs, donc rien à restyler.
- Message envoyé à Romain (version simplifiée par Olivier) : `docs/charte/message-whatsapp-2026-10-31.txt`. L'offre payante
  (29/10) a été prise à la demande d'Olivier uniquement pour avoir la place de dupliquer le tunnel : une fois l'ancien
  supprimé, Romain peut repasser au plan gratuit.

## 8. Nom de l'offre : « Bilan Coaching RunCare » partout (31/10, décision de Romain)

Fait (« Bilan Diagnostic » → « Bilan Coaching » ; « diagnostic » au sens médical et adresses `bilan-diagnostic-runcare`
laissés tels quels) :
- Campagne « Bilan coureur » : les 5 e-mails (14 mentions, dont le bouton J+3 « Je fais mon bilan coaching »),
  enregistrés et revérifiés ; liens intacts.
- Tunnel : page agenda (titre « Réserve ton Bilan Coaching RunCare », tarifs, texte du calendrier) et titre du cadre du
  récapitulatif sur la page de vente ; « 2. Établir ton diagnostic » gardé (nom d'une étape).
- Outil Lovable de la copie : 2 mentions (texte « La prochaine étape » et bouton final), republié et vérifié en ligne.
- Site : bouton et encadrés des articles, fiche Coaching (texte et description SEO, « Runcare » → « RunCare »),
  deux formules ; compilation vérifiée.

À transmettre :
- Récapitulatif PDF de la page de vente (projet Lovable de Lélio « RunCare Insight Animation »,
  bilan-diagnostic-runcare.lovable.app) : le titre « BILAN DIAGNOSTIC RUNCARE » est dans les deux images des pages ;
  Lélio doit regénérer ces images. L'adresse peut rester.
- Liens TidyCal (`.../bilan-diagnostic-runcare`) : adresse inchangée pour ne rien casser ; le nom affiché dans TidyCal
  est déjà « Bilan coaching RunCare ».
- Témoignages : viendront d'une fiche Google dédiée que Romain doit créer ; ensuite on les affiche sur la page de vente.
