# Migration du tunnel systeme.io au design RunCare (29/10/2026)

Romain a validé la maquette (`../sources/maquette/`). Il est passé à une offre payante et Olivier a dupliqué le tunnel
« Diagnostic du coureur » : la copie est `https://systeme.io/dashboard/funnels/7750323`. Les 8 pages de la copie ont été
refaites dans l'éditeur via Claude in Chrome ; le tunnel d'origine n'a pas été touché.

| Étape | Page (éditeur) | URL publique | Traitement |
|---|---|---|---|
| Page de capture | 46161769 | runcare.systeme.io/79081d31-b845847e | refaite, champs et bouton d'envoi conservés, popup laissée telle quelle |
| Remerciements | 46161770 | /1c70f1a3-e04b5b62 | refaite, bouton « étape suivante » conservé |
| Lead magnet | 46161771 | /8f413eb4-bf97a13e | cadre vers la copie Lovable refaite (profil-coureur-runcare.lovable.app) + script de hauteur, fond crème (30/10, voir JOURNAL §4.2) |
| Page de vente finale | 46161772 | /748f0635-9fb2da99 | refaite d'après la maquette ; récapitulatif PDF (code HTML) conservé en pleine largeur ; témoignages masqués |
| Différentes réservations | 46161773 | /748f0635-89d03b4a-b9c04b1f | refaite, liens TidyCal et Doctolib repris |
| Stripe agenda commun | 46161774 | /748f0635-89d03b4a-11a03860-16b24a1b | logo seul (page vide à l'origine) |
| Agenda | 46161775 | /d38d75ca-bfedb687-9bac6eb7 | refaite, calendrier natif conservé et recoloré |
| Formules | 46161776 | /748f0635-89d03b4a-d15dc65e-18d80b1a | refaite en texte (l'image du comparatif est retirée) |

Méthode : `rc-builder.js` fabrique des éléments natifs de l'éditeur (Section, Row, Headline, Text, Button, BulletList,
Faq…) et remplace la page par l'action Redux `UPDATE_ENTITIES`, puis on clique sur Sauvegarder. Tout reste modifiable à
la main dans l'éditeur. Les scripts de pages (`page-*.js`, `pages-*.js`) sont collés dans l'onglet de l'éditeur après
le constructeur (outil JavaScript de Claude in Chrome).

Fichiers importés dans le compte : polices TTF statiques générées depuis `@fontsource-variable` du site
(Fraunces 600 opsz 48 normal et italique, Instrument Sans 400 et 700 : ids 50659884, 50659888, 50659877, 50659890,
importés avec le type `font/ttf` pour être listés dans le menu des polices ; les premiers imports 50658410/14/03/16 ont été
classés « document » par systeme.io et ne servent plus),
logo `logo-runcare-fond-clair.png` (50658508), photo `duo.jpg` (50658511).

Pièges : une police importée sans le type `font/ttf` devient un « document » (invisible dans le menu des polices et dans
l'aperçu de l'éditeur) ; l'éditeur ignore une police posée dans un span (d'où la couleur répétée sur le span italique) ; systeme.io ne
publie que les polices référencées par un élément, d'où un texte masqué en Fraunces italique quand l'italique sert dans
un span ; l'intégration du PDF est conçue pour une section pleine largeur.

Les 4 TTF importés et le script qui les a générés (fonttools, depuis `site/node_modules/@fontsource-variable`) sont dans `polices/`.
