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

### Informations complémentaires

> 📷 *Photo à ajouter : `assets/NL-205A-Sonde-capacitive-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :

-->

## 🔌 Branchement

Alimenter la sonde selon sa version ; GND commun ; sortie analogique vers une entrée ADC compatible, sans dépasser la tension admissible du GPIO.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

### Matériel nécessaire

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Sonde capacitive V2.0 | 1 | ✅ | AliExpress |
| Câbles Dupont | 3 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.


### Câblage détaillé

> **Important :** brochage historique à confirmer pour la carte utilisée ; les valeurs du JSON ne garantissent pas la compatibilité de chaque GPIO.

| Sonde | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| AOUT | GPIO0 | Sortie analogique |

> ⚠️ **Alimentez la sonde en 3,3 V uniquement.**

> 💡 Les GPIO indiqués ci-dessus sont un **exemple historique de câblage**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, choisir le module Analog approprié, sélectionner l’entrée ADC et renseigner sa calibration.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

### Montage pas à pas

1. Connectez la sonde à l'ESP32-C6.
2. Plantez la partie verte dans le substrat.
3. Placez-la à une profondeur représentative de la zone racinaire.
4. Évitez d'immerger la partie électronique.
5. Effectuez la calibration avant la première utilisation.

## 📊 Mesures ou fonctions

Valeur brute et grandeur transformée selon la configuration du driver analogique.

*Les préfixes de mesures dépendent de l'identifiant donné au module dans Hardware.*

## 🧩 Configuration JSON d’usine

Extrait **exact** de `DEFAULT_ORG_CAPA` dans `factory_defaults.h` (firmware fourni, V0.448), mis en forme pour la lecture. Il s’agit d’un **exemple**, pas d’un relevé de ton montage : contrôler les broches avant branchement.

```json
{
  "id": "racines_1",
  "name": "💧 Sonde Capacitive",
  "category": "soil",
  "type": "analog",
  "pins": {
    "adc": 4
  },
  "interval_ms": 60000,
  "calibration": {
    "min": 1400,
    "max": 3200
  },
  "mA": 5,
  "factory": true,
  "icon": "💧",
  "metrics": [
    {
      "id": "value",
      "label": "Humidité du sol",
      "type": "number",
      "unit": "%"
    },
    {
      "id": "raw",
      "label": "Valeur brute",
      "type": "number"
    },
    {
      "id": "online",
      "label": "En ligne (capteur actif)",
      "type": "boolean"
    }
  ],
  "actions": []
}
```

### Comprendre les paramètres

| Paramètre | Signification |
|---|---|
| `id` | Identifiant unique du module ; sert de préfixe aux mesures et dans les Synapses. |
| `name` | Nom visible dans l’interface. |
| `category` | Famille utilisée pour organiser les modules dans l’interface. |
| `type` | Type de driver sélectionné par Natulib OS. |
| `pins` | Association entre les fonctions électriques et les GPIO ; **adapter au câblage réel**. |
| `pins.adc` | GPIO utilisé pour la lecture analogique (ADC). |
| `interval_ms` | Intervalle de mesure demandé, en millisecondes (1 000 ms = 1 seconde). Le comportement exact dépend du driver. |
| `calibration` | Valeurs de calibration propres à la sonde ; exemples à remplacer par des mesures réelles. |
| `calibration.min` | Point `min` de calibration à mesurer sur le capteur et le montage réels. |
| `calibration.max` | Point `max` de calibration à mesurer sur le capteur et le montage réels. |
| `mA` | Consommation indicative saisie dans le catalogue, **pas une mesure électrique certifiée**. |
| `factory` | Marqueur de configuration proposée par le catalogue d’usine. |
| `icon` | Icône du module dans l’interface. |
| `metrics` | Liste descriptive des mesures exposées dans Natulib OS (identifiants, intitulés et unités). |
| `actions` | Actions proposées dans l’interface et utilisables selon le driver. |

**Précision issue du driver ou du matériel :** Les bornes de `calibration.min` et `calibration.max` sont des exemples, pas un étalonnage universel. Le GPIO ADC doit exister sur la cible.

Pour débuter, utiliser l’onglet **Hardware** de Natulib OS : il génère la configuration. La modification manuelle du JSON est facultative.

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

### Retours de dépannage

**La valeur ne bouge pas entre sec et humide**
→ Vérifiez que la sonde est alimentée en 3,3 V et que `AOUT` est bien relié à une GPIO disposant d'une entrée analogique.

**Mesures bruitées**
→ Raccourcissez les câbles et éloignez-les des lignes de puissance.

## 🔧 Améliorations pour un montage plus simple

- [ ] Sonde à connecteur déjà installé, rallonge rapide et distribution 3,3 V/GND.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

### Évolutions possibles

- [ ] Assistant de calibration dans Natulib OS
- [ ] Enregistrement automatique des valeurs de référence
- [ ] Support de fixation pour les boîtiers Natulib

## ⚙️ Pour aller plus loin (facultatif)

`DeviceAnalog` (`type: analog`) ; vérifier le champ de calibration utilisé par ton profil.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).

### Informations complémentaires

La **sonde capacitive V2.0** mesure l'humidité du sol par variation de capacité, sans électrodes métalliques exposées au substrat.

Elle permet à Natulib de :

- 🌱 surveiller l'humidité d'un pot ou d'une jardinière ;
- 💧 déclencher un arrosage automatique ;
- 📊 suivre l'évolution de l'humidité ;
- 🧠 alimenter les recettes d'automatisation.

**Alimentation :** 3,3 V · **Sortie :** analogique · **Calibration :** nécessaire.

> ⚠️ Utilisez uniquement le modèle **Capacitive Soil Moisture Sensor V2.0** compatible 3,3 V.


### Informations complémentaires

**Configuration historique (à revérifier) :**

**Type :** `analog`

> 🔵 **Divergence connue** — Il n'existe pas de type `soil` dans Natulib OS. La sonde capacitive est pilotée par le driver générique **`analog`**, le même que pour d'autres capteurs analogiques simples (voir **[Drivers](../natulib-os/drivers.md)**).

```json
{
  "id": "humidite_sol",
  "type": "analog",
  "pins": {
    "adc": 0
  },
  "calibration": {
    "min": 1100,
    "max": 2800
  },
  "interval_ms": 60000,
  "active": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins.adc` | Broche analogique reliée à `AOUT` |
| `calibration.min` | Valeur brute (`raw`) correspondant à **100 % d'humidité** (sonde dans l'eau) — déf. 1400 |
| `calibration.max` | Valeur brute (`raw`) correspondant à **0 % d'humidité** (sonde à l'air libre) — déf. 3200 |
| `interval_ms` | Intervalle entre deux lectures (60 000 ms par défaut) |
| `active` | Active / désactive le module |

Le driver convertit la valeur brute en pourcentage (`value`, 0–100 %) à partir de `calibration.min`/`calibration.max` ; la métrique `raw` reste disponible telle quelle. Les valeurs ci-dessus sont des ordres de grandeur : remplacez-les par vos propres relevés (voir la section Calibration ci-dessous — `air` correspond à `calibration.max`, `eau` à `calibration.min`).


### Informations complémentaires

Les valeurs `RAW` varient d'une sonde à l'autre et selon le substrat.

Mesurez au minimum deux références dans votre installation :

| Situation | Valeur RAW |
|---|--:|
| Air libre | ~2600–3000 |
| Terre sèche | à mesurer |
| Terre humide | à mesurer |
| Eau | ~900–1300 |

Ces valeurs servent ensuite de références à **Natulib OS** pour convertir la mesure brute en estimation d'humidité.

> 💡 La calibration doit être réalisée avec **la sonde, le substrat et l'installation réellement utilisés**.


### Informations complémentaires

- Une calibration individuelle est recommandée pour chaque sonde.
- Plantez toujours la sonde à une profondeur similaire.
- Une légère variation des valeurs `RAW` est normale.
- Des câbles courts limitent les parasites sur la mesure analogique.
- Seule la partie prévue pour le sol doit être enfoncée dans le substrat.
- La sonde capacitive évite l'électrolyse associée aux sondes résistives classiques.


### Informations complémentaires

**Ressources complémentaires**

- 🌱 [Recettes d'arrosage](../Recettes.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)


### Informations complémentaires

**Historique du module**

| Version | Évolution |
|---|---|
| A | Première intégration de la sonde capacitive V2.0 |
