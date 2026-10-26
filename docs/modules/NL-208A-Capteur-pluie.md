---
layout: module
bare: true
title: Capteur de pluie
reference: NL-208A
ref: NL-208A
famille: sensors
categorie: Capteurs
statut: En test
etat: test
soudure: Soudure requise
montage: soudure
niveau: Intermédiaire
duree: 20 min
temps: 20
interface: GPIO
prix: ≈ 1 €
alimentation: 3,3 à 5 V
description: Le capteur de pluie détecte la présence d'eau sur une plaque conductrice.
images: []
photos_a_ajouter: true
elements:
- 🌧️ Pluie
natulib_os_driver: DeviceRainAnalog
natulib_os_type: rain_analog
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Essais matériels à documenter
---
**Capteur de pluie** — Détecter la présence d’eau ou de pluie et suivre un signal analogique utile aux automatismes extérieurs.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « En test » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Détecter la présence d’eau ou de pluie et suivre un signal analogique utile aux automatismes extérieurs.

## 🔌 Branchement

Raccorder l’alimentation, le GND et les sorties digitale/analogique selon la carte ; utiliser exclusivement les broches et tensions compatibles.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, ajouter le capteur de pluie analogique et vérifier les broches, la calibration, le seuil et les temporisations.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

`rain_detected`, `intensity_pct`, `raw`, `idle_time_sec`, `online`

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

**Test spécifique :** Tester plaque sèche et mouillée, transitions, hystérésis, déconnexion et retour à l’état sec ; noter les valeurs brutes réellement observées.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- La fonction `disconnect_below` exige un montage électrique adapté avec résistance externe ; ne pas l’activer sans celle-ci.

## 🔧 Améliorations pour un montage plus simple

- [ ] Plaque de pluie à connecteur protégé de l’humidité et raccordement rapide.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

## ⚙️ Pour aller plus loin (facultatif)

`DeviceRainAnalog` ; intervalle 5 000 ms par défaut ; `hold_sec` = 60 s, calibration brute 1400–3200 par défaut.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).
