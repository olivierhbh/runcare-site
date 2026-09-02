# Images à régénérer (retours Romain & Lelio, 02/09/2026)

Méthode qui marche (voir `photos-ia-prompts.md`) : **toujours partir d'une photo réelle**
comme référence de visage et de lieu, et demander une retouche, pas une génération libre.

## 1. Photo d'équipe de l'accueil (`site/src/assets/photos/duo.jpg`)

Problème : le visage de Lelio ne lui ressemble pas assez (comparer avec son portrait
seul, `site/src/assets/photos/equipe/lelio/lelio.jpg`, jugé fidèle).

Fournir : la photo duo actuelle + le portrait de Lelio seul + une vraie photo de Lelio.

Prompt suggéré :
> Retouche la première image (photo de deux kinésithérapeutes dans un cabinet). Remplace
> uniquement le visage de l'homme de droite pour qu'il corresponde exactement à l'homme
> de la deuxième image (même personne). Ne change rien d'autre : cadrage, lumière,
> vêtements, décor et l'homme de gauche restent identiques. Rendu photo réaliste,
> aucun lissage excessif de la peau.

## 2. Coureur sur les quais (`site/src/assets/photos/bordeaux-quai.jpg`)

Problème : les quais ne ressemblent pas aux vrais quais de Bordeaux.

Fournir : une vraie photo des quais (miroir d'eau / place de la Bourse, ou les quais
rive gauche côté Chartrons) + la photo actuelle pour la pose du coureur.

Prompt suggéré :
> Photo réaliste d'une coureuse/d'un coureur au lever du soleil sur les quais de
> Bordeaux, reproduisant fidèlement le lieu de la photo de référence fournie (façades
> XVIIIᵉ en pierre blonde de la place de la Bourse, miroir d'eau, réverbères et pavés
> réels). Le coureur court de profil au premier tiers de l'image, tenue de running
> sobre. Lumière douce du matin, légère brume, style photojournalisme, pas de rendu
> « IA lisse ». Format paysage large 21:9.

## 3. Photo de rééducation (`site/src/assets/photos/services/reeducation/reeducation-cheville.jpg`)

Problème : rendu trop « IA », et Lelio doit être reconnaissable (c'est lui qui fait la
rééducation).

Fournir : une vraie photo de Lelio en train de traiter un patient au cabinet (idéal),
ou photo actuelle + portrait réel de Lelio.

Prompt suggéré :
> Retouche cette photo de séance de kinésithérapie : remplace le visage du praticien
> par celui de l'homme de la photo de référence (même personne), garde la scène, la
> table de traitement, la lumière et le patient identiques. Rendu naturel type photo
> prise au smartphone, grain léger, pas de peau lissée.

Une fois générées : remplacer les fichiers aux mêmes chemins (mêmes noms), puis
`git commit` — les pages les reprennent automatiquement. La photo des articles
`soigner-une-blessure/cheville-detail.jpg` peut rester.
