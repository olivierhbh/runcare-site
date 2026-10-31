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
