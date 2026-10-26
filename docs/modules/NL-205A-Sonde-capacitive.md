---
layout: module
bare: true
title: Sonde capacitive d'humidité du sol V2.0
reference: NL-205A
ref: NL-205A
famille: sensors
categorie: Capteurs
statut: Validé
etat: valide
soudure: Sans outil
montage: sans-outil
niveau: Débutant
duree: 2 min
temps: 2
interface: ADC
prix: ≈ 2 €
alimentation: 3,3 V
description: La sonde capacitive V2.0 mesure l'humidité du sol par variation de capacité, sans électrodes métalliques
  exposées au substrat.
images: []
photos_a_ajouter: true
elements:
- 💧 Humidité du sol
natulib_os_driver: DeviceAnalog (générique)
natulib_os_type: analog
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Statut repris du catalogue antérieur ; essais détaillés non fournis
---
**Sonde capacitive d'humidité du sol V2.0** — Mesurer une indication de l’humidité du substrat à partir d’une sortie analogique.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « Validé » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Mesurer une indication de l’humidité du substrat à partir d’une sortie analogique.

## 🔌 Branchement

Alimenter la sonde selon sa version ; GND commun ; sortie analogique vers une entrée ADC compatible, sans dépasser la tension admissible du GPIO.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, choisir le module Analog approprié, sélectionner l’entrée ADC et renseigner sa calibration.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

Valeur brute et grandeur transformée selon la configuration du driver analogique.

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

**Test spécifique :** Relever les valeurs dans un substrat sec, humide et à plusieurs niveaux intermédiaires ; répéter les mesures pour évaluer la dérive.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- La calibration est liée au substrat, au montage et à la sonde ; une valeur brute n’est pas un pourcentage universel d’eau.

## 🔧 Améliorations pour un montage plus simple

- [ ] Sonde à connecteur déjà installé, rallonge rapide et distribution 3,3 V/GND.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

## ⚙️ Pour aller plus loin (facultatif)

`DeviceAnalog` (`type: analog`) ; vérifier le champ de calibration utilisé par ton profil.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).
