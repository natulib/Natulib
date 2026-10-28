---
layout: module
bare: true
title: Capteur tactile capacitif TTP223
reference: NL-206A
ref: NL-206A
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
prix: ≈ 1 €
alimentation: 3,3 V
description: Un bouton tactile sans mécanisme, utilisable pour naviguer et valider dans Studio grâce aux Synapses système de Natulib.
images: []
photos_a_ajouter: true
elements:
  - 👆 Toucher
  - ⚡ Appui court
  - ⏱️ Appui long
  - 🖥️ Navigation Studio
natulib_os_driver: DeviceButton (entrée digitale générique)
natulib_os_type: button
validation_statut: Fonctionnement confirmé sur le montage de référence ; essais détaillés à compléter
validation_note: GPIO11 utilisé sur le montage ESP32-C6 de référence. Les automatismes nécessitent un écran configuré dans Hardware.
documentation_modele: Natulib V3
---

Le **TTP223** transforme une surface tactile en bouton sans pièce mécanique. Il sert à commander une action ou, associé à un écran, à **naviguer dans Studio** : un toucher bref pour passer au choix suivant, un toucher prolongé pour interagir ou valider.

## 🚀 Starter guide

### 🔌 Branchement conseillé — ESP32-C6

| TTP223 | ESP32-C6 | Fil conseillé |
|---|---|---|
| **VCC** | **3V3** | 🔴 Rouge |
| **GND** | **GND** | ⚫ Noir |
| **I/O / OUT** | **GPIO11** | 🟡 Jaune |

**GPIO11 est le branchement utilisé sur le montage ESP32-C6 de référence.** Il correspond également au modèle `button` fourni dans Natulib OS ; ce n'est pas une obligation pour tous les projets. Si le GPIO est déjà occupé, choisir une autre entrée compatible et modifier la broche dans **Hardware**. Les couleurs des fils sont des repères facultatifs, pas une norme.

**Avant de brancher :** couper l'alimentation, vérifier les indications `VCC`, `GND` et `I/O` inscrites sur ta variante de TTP223, et l'alimenter en **3,3 V** pour ce montage.

### ⚙️ Configuration dans Hardware

1. Brancher les trois fils, puis démarrer Natulib OS.
2. Dans **Hardware**, ajouter un **bouton tactile TTP223** (type `button`, driver générique `DeviceButton`).
3. Vérifier la broche **GPIO11** et les réglages de référence `pullup: false` et `invert: false` ; les adapter uniquement si le module utilisé le nécessite.
4. Toucher puis relâcher la surface : la mesure **`pressed`** doit changer d'état.

Aucune modification du code Arduino n'est nécessaire pour cette configuration.

### ✨ Particularité Natulib : Synapses automatiques

**Si le TTP223 et un écran compatible sont configurés dans Hardware**, Natulib OS ajoute automatiquement, si elles n'existent pas déjà, deux Synapses système :

| Geste | Seuil par défaut | Effet dans Studio |
|---|---|---|
| **Appui court** | Relâché avant **1 seconde** | Parcourir les scènes, sous-scènes ou choix (`cycle_sub_scenes`, `scene_nav`) |
| **Appui long** | Maintenu **1 seconde** | Interagir avec la scène ou valider (`scene_interact`) |

Ces durées sont gérées **par Natulib OS**, pas par le circuit TTP223. Les commandes sont contextuelles : leur effet précis dépend de la scène affichée. Sans écran, le TTP223 reste utilisable comme **entrée numérique** pour tes propres Synapses.

> **Test rapide :** avec un écran et une scène interactive, essayer un appui bref puis un appui d'au moins une seconde. Vérifier la navigation puis l'interaction. Sans écran, contrôler simplement la mesure `pressed`.

## 🧩 Paramètres et fonctionnement

- **Signal :** sortie numérique `I/O` / `OUT` ; état tactile accessible dans Natulib par la métrique `pressed`.
- **Identifiant d'usine :** `bouton_tactile` ; cet identifiant sert à désigner le module dans les Synapses.
- **Pilote :** `DeviceButton`, type `button` (pas de pilote TTP223 spécifique).
- **Façade :** possibilité de placer le capteur derrière une **fine paroi non métallique**. La sensibilité dépend du matériau et de son épaisseur.
- **Montage :** prévoir 3 câbles Dupont ; l'absence de soudure dépend du connecteur présent sur la carte achetée.
- **Consommation :** `mA: 3` est une **estimation du catalogue**, pas une mesure certifiée sur ton exemplaire.

## 🧠 Synapses système : détails

Natulib OS vérifie l'existence d'un fichier d'écran connu (`/dev/screen.json`, `/dev/screen_gc9a01.json` ou `/dev/screen_st7789.json`) **et** de `/dev/button.json`. Lorsque les deux sont présents, `syncSystemSynapses()` crée, **si absents**, les fichiers :

- `/synapses/sys_touch_tap.json` : déclencheur `release`, `for_ms: 1000`, `cooldown_ms: 250` ; commandes `cycle_sub_scenes` et `scene_nav`.
- `/synapses/sys_touch_hold.json` : déclencheur `hold`, `for_ms: 1000`, `cooldown_ms: 500` ; commande `scene_interact`.

**À savoir :** la détection porte sur les *fichiers de configuration*, pas sur une sonde de présence physique. Le mécanisme ne remplace pas une Synapse système déjà existante et ne la supprime pas automatiquement lorsqu'un module est retiré. La création dépend aussi d'une version du firmware compilée avec la prise en charge des écrans (`NATULIB_SCREEN_ENABLED`).

## 🧩 Configuration JSON d’usine

Extrait du modèle `DEFAULT_ORG_BUTTON` fourni avec Natulib OS, mis en forme :

```json
{
  "id": "bouton_tactile",
  "name": "👆 Bouton Tactile (TTP223)",
  "category": "sec",
  "type": "button",
  "pins": { "pin": 11 },
  "interval_ms": 500,
  "pullup": false,
  "invert": false,
  "mA": 3,
  "factory": true,
  "icon": "👆",
  "metrics": [
    { "id": "pressed", "label": "Appuyé", "type": "boolean" },
    { "id": "online", "label": "En ligne (capteur actif)", "type": "boolean" }
  ],
  "actions": []
}
```

Dans un projet, **le câblage réel prime** sur ce modèle d'usine. Les champs `metrics`, `actions` et `mA` décrivent notamment le module dans le catalogue ; ils ne constituent pas à eux seuls une preuve de fonctionnement matériel.

## 🛠️ Vérification et dépannage

| Symptôme | À vérifier |
|---|---|
| Aucun changement sur `pressed` | Alimentation 3,3 V, GND commun, fil `I/O` vers le GPIO déclaré dans Hardware |
| État inversé | Option `invert` et éventuelle configuration matérielle de la variante TTP223 |
| Détection instable au démarrage | Laisser le capteur se stabiliser sans toucher la zone tactile |
| Ne réagit pas derrière une façade | Épaisseur du matériau, proximité de parties métalliques, position du capteur |
| Le toucher fonctionne, mais ne change pas la scène | Vérifier qu'un écran compatible et `/dev/button.json` sont configurés, puis contrôler les Synapses système et la scène Studio utilisée |

Pour diagnostiquer, consulter **Console** ou **Maintenance** dans Natulib OS.

## 🧪 Validation et suivi

**Statut du catalogue :** Validé. Le montage de référence utilise **GPIO11** ; les essais détaillés (version exacte du firmware, durée, redémarrages et variantes de cartes) restent à consigner.

| Contrôle | Résultat à renseigner |
|---|---|
| Photo et variante de la carte | À compléter |
| Détection tactile sur GPIO11 | À consigner |
| Appui court / appui long avec écran | À consigner |
| Fonctionnement après redémarrage | À consigner |

## 🔗 Ressources

- [NL-204A — Détecteur IR TCRT5000](./NL-204A-Detecteur-IR-TCRT5000.md)
- [Catalogue des modules](../Modules.md)
- [Modules et drivers](../natulib-os/drivers.md)
