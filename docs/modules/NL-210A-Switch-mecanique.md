---
layout: module
bare: true
title: Switch mécanique de clavier (3 broches)
reference: NL-210A
ref: NL-210A
famille: sensors
categorie: Capteurs
statut: En test
etat: test
soudure: Selon le support (soudure ou socket hot-swap)
montage: soudure
niveau: Débutant
duree: 5 min
temps: 5
interface: GPIO
alimentation: Aucune (contact sec)
description: Bouton mécanique personnalisable, de type clavier MX, pour déclencher des actions Natulib depuis un GPIO.
images: 
  - fichier: /assets/NL-210A-SWITCH-1.png
    titre: Vue du switch
elements:
  - "👆 Appui"
  - "⌨️ Bouton"
  - "⚡ Déclenchement"

# Référence proposée : vérifier sa disponibilité dans le catalogue Natulib.
# Les autres titres H2 sont placés automatiquement dans « Pour aller plus loin ».
starter_sections:
  - "🛒 Ce qu'il vous faut"
  - "🔌 Branchement — GPIO11"
  - "🚀 Pour commencer"
  - "🛠️ Problèmes courants"
---

Ce **switch mécanique de clavier** permet de déclencher une action physique dans **Natulib OS** : changer une scène, commander un équipement ou lancer une Synapse. Les versions **rouge**, **brune** et **bleue** se branchent de la même façon ; seule la sensation d'appui change.

## 🛒 Ce qu'il vous faut

| Composant | Qté | À savoir |
|---|:---:|---|
| **Switch mécanique compatible MX, 3 broches** | 1 | Rouge, brun ou bleu, avec tige en croix. |
| **Deux fils de connexion** | 2 | Pour relier les deux **contacts métalliques** à l'ESP32. |
| **Support ou socket adapté** | 1 | Recommandé pour maintenir le switch et pouvoir le remplacer facilement. |

> **Attention aux « 3 broches » :** ce format possède **deux contacts électriques en métal** et **un ergot central en plastique** servant au positionnement. L'ergot plastique **ne se câble pas**. La tige en croix, située au-dessus, sert à fixer le capuchon de touche.

## 🔌 Branchement — GPIO11

| Switch mécanique | ESP32-C6 | Rôle |
|---|---|---|
| **Contact métallique 1** | **GND** | Masse |
| **Contact métallique 2** | **GPIO11** | Entrée du bouton |
| **Ergot central en plastique** | **Non connecté** | Positionnement mécanique |

**Montage :** `GPIO11 ── [switch] ── GND`

- **Aucun fil VCC, 3V3 ou 5V** n'est nécessaire : c'est un **contact sec**.
- **Aucune résistance externe** n'est nécessaire avec le réglage Natulib `pullup: true`.
- Les deux contacts métalliques sont **sans polarité** : leur sens n'a pas d'importance.
- **GPIO11** est le choix du profil de référence Natulib ; si ta carte utilise une autre broche disponible, adapte-la dans **Hardware**.

> ⚠️ Couper l'alimentation avant le câblage. Ne jamais relier directement le switch au **5 V** ni brancher un fil électrique sur son ergot plastique.

## 🚀 Pour commencer

1. Relier les **deux contacts métalliques** du switch à **GND** et **GPIO11**.
2. Démarrer Natulib OS puis ouvrir **Hardware**.
3. Ajouter **⌨️ Interrupteur Mécanique (Switch Clavier / Poussoir)**.
4. Vérifier **GPIO11**, **Pull-up activé** et **Inverser activé** (`pullup: true`, `invert: true`).
5. Appuyer puis relâcher : la mesure **`pressed`** doit passer d'un état à l'autre.

**Comportement attendu :** le GPIO est à l'état **HIGH au repos** grâce au pull-up interne ; il passe à **LOW pendant l'appui**. L'option `invert: true` permet de présenter l'appui comme un état actif dans Natulib.

## 🧩 Dans Natulib

Dans **Hardware**, ce switch utilise le type interne **`button`**. Il apparaît comme un **interrupteur mécanique** grâce à ses réglages `pullup: true` et `invert: true`.

Dans **Synapses**, sélectionner le bouton et sa mesure **`pressed`** pour créer une automatisation à partir d'un appui. Le moteur Synapses prévoit les entrées de type `button` pour la gestion des interactions, notamment les appuis et relâchements.

La disponibilité exacte des gestes (appui long, relâchement, etc.) dépend du firmware installé et de la règle créée.

## 🎨 Switch rouge, brun ou bleu ?

| Couleur | Sensation habituelle | Particularité |
|---|---|---|
| 🔴 **Rouge** | Linéaire | Appui fluide, sans cran tactile marqué. |
| 🟤 **Brun** | Tactile | Petit retour tactile, généralement sans clic sonore marqué. |
| 🔵 **Bleu** | Tactile et sonore | Clic audible lors de l'actionnement. |

Ces descriptions correspondent aux familles de switchs mécaniques **de type MX** ; les sensations réelles peuvent varier selon la marque. **Le câblage et la configuration GPIO11 sont identiques** pour les trois versions passives.

**Échange à chaud :** le remplacement sans dessouder nécessite un **socket hot-swap compatible** et un montage mécanique adapté. Un switch nu n'est pas automatiquement échangeable sans soudure ; pour une station Natulib, couper l'alimentation avant de le retirer.

## ⚙️ Configuration de référence

Extrait des réglages du modèle **`mech_button`** présents dans l'interface Hardware fournie :

```json
{
  "id": "switch_meca",
  "type": "button",
  "pins": { "pin": 11 },
  "interval_ms": 100,
  "pullup": true,
  "invert": true,
  "max_hold_ms": 0,
  "active": true
}
```

La clé **`mech_button`** désigne le modèle dans le catalogue Hardware ; le **type réellement enregistré** reste `button`. Le modèle expose notamment la mesure booléenne **`pressed`** dans Synapses. Ce JSON décrit une **configuration prévue par l'interface** ; la réaction du matériel doit être vérifiée avec la version du firmware installée.

## 🛠️ Problèmes courants

| Problème | Vérification |
|---|---|
| **Aucun appui détecté** | Contrôler les **deux pattes métalliques** et la broche sélectionnée dans Hardware. |
| **Toujours indiqué comme appuyé** | Vérifier le câblage vers **GND** et les réglages `pullup` / `invert`. |
| **Plusieurs appuis pour une seule pression** | Vérifier les contacts ; prévoir un anti-rebond logiciel adapté si nécessaire. |
| **Le switch tient mal ou ses pattes se plient** | Utiliser un support mécanique ou un socket hot-swap adapté. |

## 🔗 Ressources

- [ESP32-C6 N16 — carte principale Natulib](./NL-001A-ESP32-C6-N16.md)
- [CHERRY — familles de switchs mécaniques MX](https://www.cherry.de/fr-fr/produits/interrupteurs)
- [Natulib — dépôt GitHub](https://github.com/Natulib/Natulib)

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première fiche du switch mécanique de clavier, branchement GPIO11 et modèle Hardware `mech_button`. |
