---
layout: module
bare: true
title: Module MOSFET PWM
reference: NL-402A
ref: NL-402A
famille: power
categorie: Alimentation
statut: En test
etat: test
soudure: Soudure requise
montage: soudure
niveau: Intermédiaire
duree: 20 min
temps: 20
interface: PWM
prix: ≈ 1 €
description: Le NL-402A est un module MOSFET permettant de commander une charge en courant continu depuis un signal
  GPIO ou PWM.
images: []
photos_a_ajouter: true
elements:
- ⚡ Commande PWM
natulib_os_driver: DevicePWM
natulib_os_type: pwm
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Essais matériels à documenter
---
**Module MOSFET PWM** — Piloter une charge basse tension par signal PWM, notamment une pompe ou un éclairage compatible.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « En test » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Piloter une charge basse tension par signal PWM, notamment une pompe ou un éclairage compatible.

## 🔌 Branchement

Relier la commande du MOSFET au GPIO PWM configuré, les masses correctement et la charge à une alimentation adaptée. Ne jamais alimenter une pompe depuis un GPIO.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, ajouter une sortie PWM, choisir sa broche et ses paramètres, puis essayer la commande manuelle avant les Synapses.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

État et niveau de sortie PWM (selon le driver et la configuration).

*Les préfixes de mesures dépendent de l'identifiant donné au module dans Hardware.*

## 🧪 Cahier de validation

**Configuration testée :** date ______ · firmware ______ · référence matérielle ______ · carte/shield ______ · broches ______.

| Vérification | Résultat | Notes / preuves |
|---|---|---|
| ☐ Référence et photo du module vérifiées | Non testé | ______ |
| ☐ Alimentation et câblage contrôlés | Non testé | ______ |
| ☐ Ajout du module dans Hardware | Non testé | ______ |
| ☐ Réaction ou mesures cohérentes | Non testé | ______ |
| ☐ Comparaison / calibration si pertinente | Non testé | ______ |
| ☐ Redémarrage et reprise du fonctionnement | Non testé | ______ |
| ☐ Essai prolongé avec durée notée | Non testé | ______ |

**Test spécifique :** Tester les niveaux de commande, l’arrêt au redémarrage et la température du montage sous charge réelle ; mesurer le courant.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Les charges inductives exigent des protections adaptées. Ne pas utiliser cet assemblage pour une tension secteur sans équipement certifié.

## 🔧 Améliorations pour un montage plus simple

- [ ] Bornier à vis, module MOSFET précâblé et connecteur de commande rapide.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

## ⚙️ Pour aller plus loin (facultatif)

`DevicePWM` ; les paramètres disponibles dépendent du profil enregistré dans Hardware.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).
