---
layout: module
bare: true
title: Switch mécanique de clavier
reference: NL-210A
ref: NL-210A
famille: sensors
categorie: Capteurs
statut: Validé
etat: valide
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
  - 👆 Appui
  - ⌨️ Bouton
  - ⚡ Déclenchement
starter_sections:
  - 🛒 Ce qu'il vous faut
  - 🚀 Pour commencer
  - 🧪 Validation rapide
---

Ce **switch mécanique de clavier** permet de déclencher une action physique dans **Natulib OS** : changer une scène, commander un équipement ou lancer une Synapse. Les versions **rouge**, **brune** et **bleue** se branchent de la même façon ; seule la sensation d'appui change.

Il s'agit d'un **contact sec normalement ouvert** : le switch n'a pas besoin d'alimentation propre. Il fonctionne ici sur une **entrée GPIO à logique 3,3 V**, grâce à la résistance de tirage interne (_pull-up_) de l'ESP32-C6. **Ne pas raccorder directement le 3,3 V au switch.**

## 🛒 Ce qu'il vous faut

|Composant|Lien d'achat|Note / Rôle|
|---|---|---|
|**Switch mécanique compatible MX**|[AliExpress — Recherche de switchs MX](https://fr.aliexpress.com/w/wholesale-switch-m%C3%A9canique-mx.html)|Bouton à 2 contacts électriques et 1 ergot plastique de positionnement.|
|**Fils de raccordement**|—|Pour connecter le switch à la carte.|

## 🚀 Pour commencer

1. Relier les deux contacts métalliques du switch à **GPIO11** et **GND** (les contacts sont **sans polarité** leur ordre n'a donc pas d'importance).
2. Ouvrir l'interface Web locale de **Natulib OS**, puis accéder à **Hardware**.
3. Ajouter le module **⌨️ Interrupteur Mécanique (Switch Clavier / Poussoir)**.
4. Vérifier la broche **GPIO11**, l'option **Pull-up activé** et l'option **Inverser activé** (`pullup: true`, `invert: true`). Enregistrer la configuration.
5. **Redémarrer l'ESP32-C6 après l'ajout du module** pour que Natulib OS le prenne en compte. Attendre que l'interface Web redevienne accessible.
6. Appuyer sur le switch, le maintenir enfoncé puis le relâcher pour vérifier le changement d'état.

> **Important :** après l'ajout du module dans Hardware, **un redémarrage de l'ESP32-C6 est nécessaire** avant de tester le switch dans Natulib OS et Synapses.

**Comportement électrique :** au repos, le *pull-up* interne maintient le GPIO à l'état **HIGH** ; pendant l'appui, le contact relie le GPIO à GND et son état passe à **LOW**. Avec `invert: true`, Natulib présente l'appui comme un état actif.

## 🧪 Validation rapide

| Action | Résultat attendu |
| --- | --- |
| Laisser le switch au repos | Mesure **`pressed = 0`** (non appuyé). |
| Appuyer et maintenir le switch | Mesure **`pressed = 1`** (appuyé). |
| Relâcher le switch | Retour à **`pressed = 0`**. |
| Répéter plusieurs appuis | L'état suit chaque pression et chaque relâchement détectés. |
| Redémarrer l'ESP32-C6 | Le module reste configuré et la détection fonctionne à nouveau. |

**Validation réussie :** le switch apparaît dans Hardware et son état change correctement après le redémarrage de l'ESP32-C6.

## 🧩 Dans Natulib

### Hardware

Le modèle **`mech_button`** utilise le type interne **`button`**. La mesure **`pressed`** indique si le bouton est actionné. Les options `pullup: true` et `invert: true` permettent de raccorder un contact sec entre GPIO et GND et d'obtenir un état logique actif pendant l'appui.

### Synapses : deux façons d'utiliser le switch

**1. Utiliser la mesure**

Sélectionner le switch dans **Synapses**, puis sa **mesure** :

- **`0`** : bouton relâché.
- **`1`** : bouton appuyé.

Cette approche permet de créer une condition fondée sur l'état instantané du bouton, par exemple agir lorsque la mesure vaut **1**.

**2. Utiliser le champ « Appuyé »**

Sélectionner le switch, puis le champ **« Appuyé »**. Il est possible d'ajouter la condition **« depuis X secondes »** pour détecter un appui maintenu.

**Exemple :** **« Appuyé depuis 2 secondes »** permet de détecter un appui long lorsque le bouton est resté enfoncé pendant au moins 2 secondes.

> **À distinguer :** une mesure à `1` signale un bouton actuellement enfoncé ; **« Appuyé depuis X secondes »** permet de caractériser un maintien prolongé. La détection d'un *clic court* au sens strict (pression suivie d'un relâchement avant une durée limite) dépend de la règle Synapses construite.

## 🎨 Switch rouge, brun ou bleu ?

| Couleur | Sensation habituelle | Particularité |
| --- | --- | --- |
| 🔴 **Rouge** | Linéaire | Appui fluide, sans cran tactile marqué. |
| 🟤 **Brun** | Tactile | Retour tactile, généralement sans clic sonore marqué. |
| 🔵 **Bleu** | Tactile et sonore | Clic audible lors de l'actionnement. |

Ces caractéristiques décrivent des familles courantes de switchs **de type MX** : le ressenti peut varier selon le fabricant. Leur raccordement électrique est identique lorsqu'il s'agit de modèles mécaniques passifs.

## ⚙️ Configuration de référence

Exemple de configuration du modèle **`mech_button`** dans Hardware :

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

La clé **`mech_button`** identifie le modèle dans le catalogue Hardware ; le **type enregistré** est `button`. La mesure **`pressed`** est exploitée dans Synapses sous forme d'état **0 / 1**.

Cette configuration est donnée comme **référence d'interface**. Son comportement effectif reste à vérifier avec la version de Natulib OS utilisée, en particulier les appuis très brefs et la gestion temporelle.

## 🛠️ Problèmes courants

| Problème | Vérification / Solution |
| --- | --- |
| **Le switch n'apparaît pas ou ne réagit pas après ajout** | Enregistrer le module dans Hardware, puis **redémarrer l'ESP32-C6**. |
| **Aucun appui détecté** | Vérifier les **deux contacts métalliques**, la connexion à GND et le GPIO choisi. |
| **Toujours indiqué comme appuyé** | Contrôler le câblage et les options **`pullup`** / **`invert`**. |
| **La valeur est inversée** | Vérifier que **Inverser** est activé dans Hardware. |
| **Plusieurs détections pour un appui** | Vérifier les connexions et le traitement de l'anti-rebond logiciel. |
| **Un appui très bref n'est pas détecté** | Vérifier la fréquence d'acquisition et les réglages de détection du firmware. |
| **L'appui long ne fonctionne pas dans Synapses** | Utiliser le champ **« Appuyé »**, puis ajouter **« depuis X secondes »**. |
| **Le switch tient mal ou ses pattes se plient** | Prévoir un support adapté ou un **socket hot-swap MX**. |

## 🕓 Historique

| Version | Évolution |
| --- | --- |
| A | Première fiche : branchement GPIO11 et modèle Hardware `mech_button`. |
