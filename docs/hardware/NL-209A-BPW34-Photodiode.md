---
layout: module
bare: true
title: Photodiode BPW34
reference: NL-209A
ref: NL-209A
famille: sensors
categorie: Capteurs
statut: En test
etat: en_test
soudure: Sans soudure pour le prototype
montage: sans-soudure
niveau: Débutant
niveau_detail: Intégration logicielle à prévoir dans Natulib OS
duree: 15 min (montage d'essai)
temps: 15
interface: Analogique (ADC)
prix: Variable selon le fournisseur et le lot
alimentation: Montage sous 3,3 V
description: Photodiode sensible à la lumière visible et au proche infrarouge, utilisable pour détecter une LED, un passage ou une variation lumineuse.
presentation: >-
  Le BPW34 transforme la lumière reçue en un très faible courant électrique.
  Une résistance permet d'obtenir une tension lisible par l'entrée analogique
  de l'ESP32-C6. Dans Natulib, il pourra devenir un capteur optique polyvalent,
  notamment pour repérer l'allumage d'un objet lumineux sans le modifier.
caracteristiques:
  - nom: Technologie
    valeur: Photodiode PIN au silicium, 2 connexions (A/K)
  - nom: Lumière détectée
    valeur: Visible et proche infrarouge (environ 430 à 1 100 nm)
  - nom: Surface photosensible
    valeur: 7,5 mm² (Vishay BPW34)
  - nom: Signal vers Natulib
    valeur: Tension analogique sur GPIO ADC via une résistance
  - nom: Montage conseillé pour débuter
    valeur: BPW34 + résistance de 100 kΩ + GPIO2 sur ESP32-C6 N16
  - nom: Driver Natulib OS V0.475
    valeur: Photodiode dédiée non intégrée — adaptation nécessaire
images:
  - fichier: /assets/NL-209A-BPW34-branchement.svg
    titre: Câblage BPW34 — 3,3 V, GPIO2, résistance de 100 kΩ
    alt: Schéma Natulib de la BPW34, cathode vers 3,3 V, anode vers GPIO2 et résistance entre GPIO2 et GND
elements:
  - "💡 Détection lumineuse"
  - "🚪 Passage et ouverture"
  - "🧩 Bouton optique"
natulib_os_driver: À développer (driver optique polyvalent)
natulib_os_type: photodiode (prévu, non disponible dans V0.475)
validation_statut: Montage et intégration non encore testés
---

**Le BPW34 détecte des variations de lumière sans contact.** Ce n'est **ni une LED**, ni un bouton, ni un capteur de présence humaine : c'est une *photodiode* dont le signal peut servir à plusieurs organes Natulib.

> **État de la fiche — En test.** Le circuit ci-dessous est un **montage de départ à valider** avec le vrai BPW34 et la carte ESP32-C6 N16. Le firmware Natulib OS **V0.475** fourni ne possède pas encore de driver dédié `photodiode` ; les étapes d'intégration sont donc distinguées de celles déjà réalisables.

## 🌱 À quoi sert-il ?

- **Détecter une LED** : vérifier qu'un objet s'allume ou s'éteint, sans intervenir sur son électronique.
- **Détecter un passage** : placer une source lumineuse face au BPW34 ; un objet interrompt le faisceau.
- **Observer une ouverture** : repérer l'arrivée de lumière dans une boîte ou un tiroir.
- **Détecter un reflet** : éclairer un objet et mesurer la lumière qu'il renvoie (géométrie à régler).
- **Suivre une variation lumineuse** : mesurer une luminosité *relative*, mais **pas des lux étalonnés**. Pour des lux, choisir plutôt le module Natulib BH1750 (NL-202A).

**Exemple de projet :** utiliser un Clickeez lumineux complet et amovible comme bouton Natulib. C'est un *cas d'usage*, pas la définition du BPW34 : le même capteur doit rester utile pour d'autres montages.

## 🛒 Ce qu'il vous faut

| Matériel | Quantité | Rôle |
|---|---:|---|
| Photodiode **BPW34** | 1 | Détecter la lumière |
| Résistance **100 kΩ** | 1 | Convertir le photocourant en tension |
| Carte **ESP32-C6 N16** avec Natulib OS | 1 | Lire le signal ADC |
| Breadboard et fils Dupont | Selon montage | Réaliser l'essai sans soudure |
| Lampe ou LED visible | 1 (pour le test) | Vérifier la réaction du capteur |
| Condensateur **100 nF** | 1 (facultatif) | Filtrage éventuel de la mesure |

La photodiode est un composant **à deux pattes sans module électronique intégré**. Elle ne possède **ni VCC/SIG/GND**, ni bus I²C. Il faut réaliser le petit circuit décrit ci-dessous.

## 🔌 Branchement sur le NL-001A (ESP32-C6 N16)

### 1. Repérer les deux pattes

Le BPW34 possède une **anode (A)** et une **cathode (K, parfois notée C)**. Sur le modèle Vishay, le constructeur indique un **repère de cathode sur le boîtier**. Consultez le dessin des *PACKAGE DIMENSIONS*, page 4, de [la fiche Vishay BPW34](https://www.vishay.com/docs/81521/bpw34.pdf), puis comparez votre composant réel. **Ne vous fiez pas simplement à la longueur des pattes ni à une vue tournée du composant.**

### 2. Câbler hors tension

| Connexion | Brancher à | Pourquoi ? |
|---|---|---|
| **Cathode K du BPW34** | **3V3** de l'ESP32-C6 | Polarisation inverse de la photodiode |
| **Anode A du BPW34** | **GPIO2 (ADC)** | Lire la tension produite sous éclairage |
| **Résistance 100 kΩ — patte 1** | **GPIO2** (même point que l'anode) | Conversion courant → tension |
| **Résistance 100 kΩ — patte 2** | **GND** | Retour à la masse |

```text
 ESP32-C6 N16

  3V3 ────────────── K  BPW34  A ───────┬──── GPIO2 (ADC)
                                        │
                                      [100 kΩ]
                                        │
  GND ──────────────────────────────────┘
```

**Attention :** la résistance se place **entre GPIO2 et GND** ; elle n'est **pas en série** entre le BPW34 et GPIO2. Sur le profil de ta carte **ESP32-C6 N16 double USB-C**, GPIO2 apparaît sur le **côté droit** du brochage : vérifier la sérigraphie avant de brancher. Voir [NL-001A — ESP32-C6 N16](./NL-001A-ESP32-C6-N16.md).

> ⚠️ **Sécurité électrique :** utiliser exclusivement la broche **3V3**, **jamais 5V** pour ce circuit. Les GPIO de l'ESP32-C6 ne doivent pas recevoir 5 V. Couper l'alimentation USB avant tout changement de fil. Vérifier qu'aucun autre périphérique n'utilise GPIO2.

### 3. Comprendre ce qu'on mesure

La lumière provoque un **photocourant**. Dans ce montage, plus de lumière produit en principe une tension plus élevée sur GPIO2. Approximativement : **tension ≈ courant × résistance**, avant saturation. La valeur **100 kΩ est un point de départ**, à adapter aux mesures réelles.

| Situation | Ce qu'on devrait observer |
|---|---|
| Photodiode recouverte | Signal très faible, parfois proche de **0** |
| Photodiode éclairée | Signal qui **augmente** |
| Éclairage trop fort / trop de gain | Signal proche du maximum : réduire la résistance (par exemple 47 kΩ) |
| Signal trop faible | Rapprocher la lumière ou essayer 220 kΩ, après contrôle du montage |

La sensibilité varie selon la **couleur** : le BPW34 est particulièrement sensible dans le proche infrarouge (maximum autour de **900 nm**). **On ne déduit donc pas directement une luminosité en lux** de sa mesure ADC.

## 🚀 Première mise en service — état actuel de Natulib OS

1. **Monter la BPW34 et la 100 kΩ** selon le tableau, ESP32 hors tension.
2. **Alimenter la carte** ; contrôler visuellement les fils et l'absence de court-circuit.
3. **Vérifier la réponse lumineuse** par une mesure de tension entre GPIO2 et GND (multimètre, si disponible) : obscurité, lampe, puis retour à l'obscurité.
4. **Noter les valeurs** et essayer différentes orientations de la lumière.
5. **Pour visualiser la valeur ADC dans Natulib Hardware**, attendre le driver spécifique (voir ci-dessous) ou faire un essai logiciel temporaire *séparé* du firmware Natulib. Ne pas importer un JSON `photodiode` tant que le driver n'existe pas.

### Pourquoi ne pas sélectionner simplement « Sonde analogique » ?

Le driver actuel `DeviceAnalog` de **Natulib OS V0.475** (`type: analog`) est prévu notamment pour une sonde analogique calibrée. Dans le code fourni, il considère une lecture ADC **inférieure à 150** ou **égale/supérieure à 4095** comme une déconnexion, puis **désactive l'organe**. Or, dans l'obscurité, un BPW34 peut légitimement produire une lecture proche de zéro.

**Conclusion :** ne pas présenter `type: analog` comme une intégration fiable prête à l'emploi pour le BPW34. Il faut un **driver optique dédié** ou une évolution ciblée du driver générique qui accepte le zéro normal de la photodiode.

## 📊 Ce que Natulib pourra exploiter après intégration

Le BPW34 ne fournit qu'**un signal analogique** ; c'est le driver Natulib qui définit les métriques et les comportements. Proposition à confirmer lors de l'implémentation :

| Mode de l'organe | Métrique visée | Utilisation |
|---|---|---|
| Mesure optique | `optique_1.raw` | Lecture brute ADC, valeur relative |
| Détection de lumière / faisceau | `optique_1.detected` | Seuil d'éclairage ou interruption |
| Bouton lumineux | `optique_1.pressed` | État compatible avec les Synapses `tap` / `hold` |
| Diagnostic | `optique_1.online` | Driver opérationnel |

Ces **noms sont proposés**, pas des métriques publiées actuellement par le firmware.

### 🧩 Configuration Natulib OS — proposition, NON disponible en V0.475

L'objectif est d'avoir à terme un module réutilisable dans **Hardware**, dont la fonction est définie par la configuration (par exemple `light`, `beam` ou `button`). Le JSON suivant **illustre la cible**, il **ne doit pas être importé dans le firmware actuel** :

```json
{
  "id": "optique_1",
  "name": "💡 Photodiode BPW34",
  "category": "sec",
  "type": "photodiode",
  "pins": { "adc": 2 },
  "mode": "light",
  "interval_ms": 30,
  "active": true
}
```

Le type `photodiode`, la clé `mode`, les seuils, la calibration et la publication des états devront être définis dans le **nouveau driver**, puis exposés dans **Hardware**. Le passage en mode `button` permettra ensuite de réutiliser le moteur de Synapses existant, sans modifier celui-ci.

## 🧪 Cahier de validation Natulib

**Date :** ______ · **Version OS :** ______ · **Carte :** ______ · **GPIO ADC :** ______ · **Résistance :** ______ · **BPW34 / fabricant :** ______

| Essai | Résultat | Valeur / observation |
|---|---|---|
| ☐ Identifier correctement anode et cathode | Non testé | ______ |
| ☐ Brancher sous 3,3 V sans court-circuit | Non testé | ______ |
| ☐ Tester la tension dans l'obscurité | Non testé | ______ |
| ☐ Tester la tension sous une lampe | Non testé | ______ |
| ☐ Vérifier le retour à l'état sombre | Non testé | ______ |
| ☐ Lire le signal dans un driver Natulib adapté | Non testé | ______ |
| ☐ Vérifier le fonctionnement après redémarrage | Non testé | ______ |
| ☐ Tester plusieurs luminosités et conditions ambiantes | Non testé | ______ |

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur ce montage.

**Observations :** ______  
**Photos / logs :** ______

### Essai complémentaire : Clickeez (projet, pas module générique)

- [ ] Tester la lumière reçue **LED éteinte / LED allumée**.
- [ ] Tester **toutes les couleurs** pendant un appui long.
- [ ] Tester un Clickeez dans la **position réelle du futur support**, car sa base puzzle peut être opaque.
- [ ] Tester 10 appuis courts et 10 appuis longs, sans faux relâchement.
- [ ] Essayer avec l'éclairage habituel de la chambre et l'écran GC9A01 allumé.

Pour ce mode, prévoir dans le futur driver **seuil haut, seuil bas (hystérésis), anti-rebond et éventuelle temporisation de relâchement** : ces paramètres seront déterminés à partir des relevés, et non inventés avant les tests.

## 🛠️ Si cela ne fonctionne pas

| Symptôme | Premier contrôle |
|---|---|
| Tension toujours proche de zéro | Vérifier polarité K/A, GPIO2, résistance à GND et orientation de la lumière. |
| Tension toujours haute | Vérifier une éventuelle saturation, la valeur de la résistance et le câblage. |
| Réagit à la lampe mais pas au Clickeez | Chercher la zone lumineuse accessible ; ne pas supposer que la lumière traverse l'embase puzzle. |
| Mesure change au passage d'un objet | Normal : c'est le principe d'une barrière ou d'une détection de reflet. |
| Détection instable avec une LED qui change de couleur | Prévoir un réglage de seuils et un filtrage, puis retester toutes les couleurs. |
| Capteur marqué « débranché » dans `type: analog` | Comportement possible du driver actuel quand la valeur est basse ; utiliser un driver optique adapté. |
| Aucune métrique BPW34 n'apparaît dans Hardware | Le type `photodiode` n'est pas encore disponible dans Natulib OS V0.475. |

## 🔧 Évolutions prévues

- [ ] Ajouter un **driver optique polyvalent** dans Natulib OS, distinct du driver analogique de sonde de sol.
- [ ] Proposer ce module dans **Hardware** avec mode, GPIO, seuils et filtrage configurables.
- [ ] Exposer `raw`, `detected`, `pressed` selon le mode sélectionné, avec métriques compatibles Synapses.
- [ ] Ajouter une petite procédure de calibration visuelle dans Hardware.
- [ ] Concevoir un support imprimé en 3D si un projet exige une isolation de la lumière ambiante.

## ⚙️ Pour aller plus loin

**Montage mécanique :** laisser la face photosensible visible et éviter toute colle sur sa fenêtre. Pour détecter une source spécifique, placer le composant dans un canal opaque, par exemple en PETG noir. Ne pas le placer à côté d'une LED parasite sans écran optique.

**Faisceau infrarouge :** la BPW34 est sensible à l'IR proche, mais n'est **pas un récepteur de télécommande démodulé**. Pour compter des passages, utiliser une source lumineuse stable, un emplacement fixe et des seuils adaptés.

**Références :**

- [Vishay — Fiche technique BPW34/BPW34S (PDF, caractéristiques et repère de cathode)](https://www.vishay.com/docs/81521/bpw34.pdf)
- [NL-001A — ESP32-C6 N16](./NL-001A-ESP32-C6-N16.md)
- [NL-202A — BH1750](./NL-202A-BH1750.md) — mesure de lumière ambiante en lux
- [Documentation Natulib — Interface et Hardware](../natulib-os/interface.md)
- [Documentation Natulib — Drivers](../natulib-os/drivers.md)

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Création de la fiche module Natulib BPW34 ; montage sous 3,3 V, usages polyvalents et état d'intégration V0.475. |
