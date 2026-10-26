---
layout: module
bare: true
title: Détecteur de présence PIR HC-SR501
reference: NL-203A
ref: NL-203A
famille: sensors
categorie: Capteurs
statut: Validé
etat: valide
soudure: Sans soudure
montage: sans-soudure
niveau: Débutant
duree: 5 min
temps: 5
interface: GPIO
prix: ≈ 2 €
alimentation: 5 V
description: Le HC-SR501, souvent vendu sous la marque D-SUN, détecte les mouvements grâce aux variations du rayonnement
  infrarouge.
images: []
photos_a_ajouter: true
elements:
- 🚶 Mouvement
natulib_os_driver: DevicePIR
natulib_os_type: pir
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Statut repris du catalogue antérieur ; essais détaillés non fournis
---
**Détecteur de présence PIR HC-SR501** — Détecter un mouvement ou une présence par infrarouge passif.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « Validé » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Détecter un mouvement ou une présence par infrarouge passif.

## 🔌 Branchement

VCC et GND selon la référence du module ; OUT vers un GPIO d’entrée choisi sur la carte.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, choisir le détecteur PIR, sélectionner la broche de signal et enregistrer.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

État de détection et, selon configuration, métriques de fonctionnement.

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

**Test spécifique :** Tester en présence et en absence de mouvement, après l’éventuel temps de stabilisation du capteur. Vérifier les fausses détections.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- La détection PIR dépend des mouvements thermiques ; elle ne prouve pas qu’une personne est immobile devant le capteur.

## 🔧 Améliorations pour un montage plus simple

- [ ] Module à connecteur précâblé et prise numérique détrompée.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

## ⚙️ Pour aller plus loin (facultatif)

`DevicePIR` ; confirmer dans Hardware le nom exact du champ GPIO de la version installée.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).
