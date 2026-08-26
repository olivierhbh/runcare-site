# RunCare — scènes photo et prompts IA

Objectif : obtenir un jeu de photos homogène, lumineux et sobre, cohérent avec un site
minimal. Toutes les images doivent partager la même « recette » pour se marier entre elles.

## Retour d'expérience (après la première salve)

Les scènes inventées de toutes pièces (salle de squat, studio avec grande baie) donnent
un décor trop éloigné du vrai cabinet. Ce qui marche : **partir d'une photo existante et
demander une retouche**, pas une nouvelle scène. Ajouter systématiquement :

> Keep the exact same room, furniture, floor and wall as in the reference photo; only
> clean up clutter (cables, radiator, bottles), improve lighting and sharpness, and keep
> the same framing.

Pour un décor différent, fournir aussi une photo du cabinet comme référence de lieu
(la photo de la table de soin avec l'espalier et la baie vitrée, par exemple).

## Recette commune (à coller à la fin de chaque prompt)

> Style: editorial healthcare / sports photography, natural soft daylight, neutral off-white
> background, muted tones (deep green, navy, warm off-white), shallow depth of field,
> 35mm or 50mm lens look, no harsh flash, no HDR, no oversaturation, no text, no watermark,
> realistic skin, clean uncluttered environment, calm and professional atmosphere.
> Keep the faces and body proportions of the reference people exactly as in the source photo.

Conseils de génération (Nano Banana / Gemini, Flux Kontext, GPT-image…) :
- Toujours fournir la photo source de la personne comme référence d'identité.
- Demander un ratio adapté à l'usage : **3:2 ou 16:9** pour les bandeaux (hero, cartes de
  service), **4:5** pour les portraits.
- Générer 3-4 variantes par scène, garder la plus naturelle (attention aux mains, aux
  logos déformés, aux chaussures).
- Le logo RunCare sur les polos sera souvent déformé par l'IA : préférer des polos unis vert
  sapin, ou retoucher le logo à la main ensuite.
- Fond : mur blanc cassé propre, pas de radiateur, pas de câbles, pas de prise (les photos
  actuelles en ont).

---

## 1. Portraits (page Équipe + accueil)

### 1a. Portrait Romain (source : photo blond, bras croisés, polo vert)
> Professional portrait of the man in the reference photo, physiotherapist, dark green polo
> shirt, arms crossed, slight confident smile, standing in front of a clean off-white wall,
> soft window light from the left, 4:5 ratio, waist-up framing. + recette commune

### 1b. Portrait Lelio (source : photo barbu à lunettes, bras croisés, polo vert)
> Même prompt que 1a avec la photo de Lelio en référence. Garder les lunettes.

### 1c. Duo (source : photo des deux en polo/t-shirt blanc)
> The two men from the reference photo standing side by side in matching dark green polo
> shirts, relaxed and friendly, in a bright physiotherapy studio with a large window in the
> background slightly out of focus, 3:2 ratio. + recette commune

### 1d. Portraits « coureur » (crédibilité terrain)
Romain, route :
> The man from the reference photo running on an empty road at golden hour, mid-stride,
> race bib visible, focused expression, long lens compression, blurred trees in the
> background, 3:2 ratio. + recette commune

Lelio, trail :
> The man from the reference photo (glasses, beard, cap) running on a single-track mountain
> trail at sunrise, mist in the valley, trail shoes, hydration vest, 3:2 ratio. + recette commune

---

## 2. Rééducation du coureur (source : soin de la cheville sur table)

> Physiotherapist (Lelio, reference photo) seated on a stool, examining the ankle of a
> runner lying on a treatment table, hands carefully holding the foot, bright treatment
> room with a large window, wooden floor, wall bars softly out of focus, calm and attentive
> mood, 3:2 ratio. + recette commune

Variante détail :
> Close-up of a physiotherapist's hands assessing a runner's Achilles tendon, treatment
> table, soft daylight, shallow depth of field, 3:2 ratio. + recette commune

---

## 3. Bilan Diagnostic RunCare (source : mesure au sol avec mètre ruban)

Le bilan se fait **à distance** : la scène doit évoquer la visio et l'analyse, pas le cabinet.

> A runner at home doing a single-leg calf-raise test in front of a laptop on a video call
> with a physiotherapist, living room with plants and daylight, laptop screen showing the
> coach, 3:2 ratio. + recette commune

Variante « analyse » :
> Over-the-shoulder view of a physiotherapist (Romain, reference photo) at a desk reviewing
> a runner's training load charts on a laptop and taking notes, clean desk, daylight, 3:2
> ratio. + recette commune

Variante test (proche de la photo existante mais propre) :
> Physiotherapist kneeling on the floor measuring a runner's knee-to-wall ankle mobility with
> a tape measure, off-white wall, wooden floor, 3:2 ratio. + recette commune

---

## 4. Analyse de foulée (source : tapis de course)

> Runner running on a treadmill in a bright studio, side view showing full stride, a small
> running power sensor on the shoe, a physiotherapist (Romain, reference photo) filming with
> a tablet on a tripod, clean white wall, wooden floor, 3:2 ratio. + recette commune

Variante détail :
> Close-up of running shoes mid-stride on a treadmill belt, motion blur on the belt, sharp
> shoe, soft daylight, 3:2 ratio. + recette commune

---

## 5. Coaching (source : capture d'écran Nolio)

La capture Nolio ne s'intègre pas bien telle quelle (trop colorée). Deux options :
- l'afficher dans un mockup d'ordinateur portable ou de téléphone (fait dans le site) ;
- générer une scène qui raconte le suivi à distance.

> A runner sitting on a bench after a run, checking a training plan on a smartphone, GPS
> watch on the wrist, park in soft morning light, 3:2 ratio. + recette commune

Préparation physique (formule Force) :
> Physiotherapist (Romain, reference photo) coaching a runner performing a barbell squat in a
> small clean training room, spotting technique, dark green polo, daylight, 3:2 ratio.
> + recette commune

---

## 6. Ambiance / hero (sans visage, faciles à générer)

> Empty treadmill and wooden wall bars in a bright minimalist physiotherapy studio, off-white
> walls, morning light through a large window, 16:9 ratio. + recette commune

> Pair of worn road running shoes on a wooden floor next to a foam roller and a resistance
> band, top-down view, soft daylight, 16:9 ratio. + recette commune

> Quiet Bordeaux quay at dawn with a lone runner far in the distance, soft haze, 16:9 ratio.
> + recette commune

---

## 7. Logo

Le logo (runner + « RunCare / KINÉ & COACH », vert + marine) n'existe que sur les polos.
Pour le vectoriser : recadrer serré sur le t-shirt blanc (photo duo, torse de droite), passer
dans un outil de vectorisation (Nano Banana → « redraw this logo as a clean flat vector on
white background », puis vectorisation dans Illustrator / vectorizer.ai / Inkscape « trace
bitmap »). Demander aussi une version monochrome blanche pour les fonds sombres.
