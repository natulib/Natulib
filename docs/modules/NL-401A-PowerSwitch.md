---
layout: module
bare: true
title: PowerSwitch PN2222A
reference: NL-401A
ref: NL-401A
famille: power
categorie: Alimentation
statut: Validé
etat: valide
soudure: Soudure requise
montage: soudure
niveau: Intermédiaire
duree: 20 min
temps: 20
interface: GPIO
prix: ≈ 1 €
description: Le NL-401A PowerSwitch coupe l'alimentation d'un petit périphérique à l'aide d'une GPIO de l'ESP32-C6.
images: []
photos_a_ajouter: true
elements:
- 🔌 Commutation
natulib_os_driver: DeviceRelay (commande GPIO analogue, pas driver PN2222A dédié)
natulib_os_type: relay
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Statut repris du catalogue antérieur ; essais détaillés non fournis
---
**PowerSwitch PN2222A** — Commuter une petite charge avec un transistor PN2222A, dans les limites du montage.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « Validé » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Commuter une petite charge avec un transistor PN2222A, dans les limites du montage.

## 🔌 Branchement

Respecter l’orientation du transistor, la résistance de base, la masse commune et la protection de charge inductive si nécessaire.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, créer une sortie relais/logique sur le GPIO dédié, puis vérifier l’action manuelle.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

État de sortie ; état logique de la commande selon le driver.

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

**Test spécifique :** Contrôler l’état de repos au démarrage, les activations répétées et l’échauffement de la partie puissance.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Le PN2222A n’est pas un relais isolé ; dimensionner le courant et la dissipation pour chaque charge.

## 🔧 Améliorations pour un montage plus simple

- [ ] Préférer à terme un petit module de commutation protégé avec borniers à vis.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

## ⚙️ Pour aller plus loin (facultatif)

`DeviceRelay` (`type: relay`) : commande d’une sortie GPIO.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).
