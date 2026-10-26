---
layout: module
bare: true
title: Capteur de courant INA219
reference: NL-207A
ref: NL-207A
famille: sensors
categorie: Capteurs
statut: En test
etat: test
soudure: Soudure requise
montage: soudure
niveau: Intermédiaire
duree: 10 min
temps: 10
interface: I²C
prix: ≈ 1.5 €
description: Le INA219 est un capteur de courant et de tension communiquant en I²C.
images: []
photos_a_ajouter: true
elements:
- ⚡ Courant
- 🔋 Tension
natulib_os_driver: DeviceINA219
natulib_os_type: ina219
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Essais matériels à documenter
---
**Capteur de courant INA219** — Mesurer la tension, le courant et la puissance d’un circuit pour suivre sa consommation.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « En test » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Mesurer la tension, le courant et la puissance d’un circuit pour suivre sa consommation.

## 🔌 Branchement

VCC → alimentation logique compatible ; GND commun ; SDA/SCL vers I²C ; VIN+ et VIN− sont insérés **en série** sur la ligne positive de la charge.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, sélectionner INA219, saisir SDA/SCL et enregistrer. Contrôler les mesures dans Accueil et les erreurs dans Console.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

`voltage_v`, `current_ma`, `power_mw`, `online`

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

**Test spécifique :** Vérifier une mesure à vide puis avec une charge connue, comparer à un multimètre, contrôler la polarité et l’effet des reconnexions I²C.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Ne jamais placer VIN+/VIN− directement en parallèle sur une alimentation. Le driver utilise actuellement l’adresse 0x40 et le calibrage de la bibliothèque : vérifier la valeur du shunt.

## 🔧 Améliorations pour un montage plus simple

- [ ] Bornier à vis pour la puissance et connecteur I²C à quatre contacts pour la logique.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

## ⚙️ Pour aller plus loin (facultatif)

`DeviceINA219` ; intervalle par défaut 1 000 ms ; tentative de réinitialisation I²C et moyennage matériel 16 échantillons.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).
