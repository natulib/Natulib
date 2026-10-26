---
layout: module
bare: true
title: ESP32 Expansion Shield 30 broches
reference: NL-002A
ref: NL-002A
famille: core
categorie: Core
statut: Validé
etat: valide
soudure: Sans outil
montage: sans-outil
niveau: Débutant
duree: 2 min
temps: 2
interface: Aucune
prix: ≈ 3 €
description: Le NL-002A est un shield d'extension pour ESP32 DevKit 30 broches.
images: []
photos_a_ajouter: true
elements:
- 🔌 Extension GPIO
natulib_os_driver: Aucun driver dédié
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Statut repris du catalogue antérieur ; essais détaillés non fournis
---
**ESP32 Expansion Shield 30 broches** — Extension à barrettes et borniers à vis pour faciliter le raccordement des modules à un ESP32 compatible.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « Validé » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Extension à barrettes et borniers à vis pour faciliter le raccordement des modules à un ESP32 compatible.

## 🔌 Branchement

Vérifier l’orientation de la carte, les bornes de tension et les GPIO disponibles ; contrôler le partage de GND, 3,3 V, SDA et SCL.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Utiliser le profil de carte pertinent dans Hardware ; les périphériques restent configurés dans leur propre fiche.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

Aucune mesure directe : c’est un accessoire de distribution et de connexion.

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

**Test spécifique :** Tester la continuité des borniers, les tensions accessibles et l’absence de court-circuit avant montage complet.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Les borniers n’éliminent pas tous les partages de masse et d’I²C ; ne pas supposer que chaque bornier protège électriquement le circuit.

## 🔧 Améliorations pour un montage plus simple

- [ ] Répartiteur I²C, connecteurs détrompés et distribution plus simple de GND/3,3 V.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

## ⚙️ Pour aller plus loin (facultatif)

Accessoire physique sans driver Natulib dédié.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).
