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
description: Le TTP223 est un capteur tactile capacitif qui transforme une simple surface conductrice en bouton
  sans contact mécanique.
images: []
photos_a_ajouter: true
elements:
- 👆 Toucher
natulib_os_driver: DeviceButton (entrée digitale générique)
natulib_os_type: button
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Statut repris du catalogue antérieur ; essais détaillés non fournis
---
**Capteur tactile capacitif TTP223** — Créer une commande tactile simple sans bouton mécanique.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « Validé » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Créer une commande tactile simple sans bouton mécanique.

### Informations complémentaires

> 📷 *Photo à ajouter : `assets/NL-206A-Capteur-tactile-TTP223-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :

-->

## 🔌 Branchement

Alimenter le TTP223 conformément à sa variante ; relier GND et sa sortie numérique à un GPIO d’entrée.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

### Matériel nécessaire

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module tactile capacitif TTP223 | 1 | ✅ | AliExpress |
| Câbles Dupont | 3 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.


### Câblage détaillé

> **Important :** brochage historique à confirmer pour la carte utilisée ; les valeurs du JSON ne garantissent pas la compatibilité de chaque GPIO.

| TTP223 | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| I/O | GPIO11 | Détection tactile |

> 💡 Le TTP223 fournit une sortie numérique : la GPIO passe à l'état actif lorsque la surface tactile est sollicitée.

> 💡 Les GPIO indiqués ci-dessus sont un **exemple historique de câblage**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, sélectionner le type bouton correspondant, puis la broche du signal.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

### Montage pas à pas

1. Connectez le TTP223 à l'ESP32-C6 selon le tableau de câblage.
2. Reliez `I/O` à **GPIO11**.
3. Placez la surface tactile derrière la façade pour créer un bouton invisible.
4. Testez la détection tactile avec Natulib OS.
5. Ajoutez ensuite l'action souhaitée dans votre configuration.

## 📊 Mesures ou fonctions

État du bouton ; événements selon le driver `button`.

*Les préfixes de mesures dépendent de l'identifiant donné au module dans Hardware.*

## 🧩 Configuration JSON d’usine

Extrait **exact** de `DEFAULT_ORG_BUTTON` dans `factory_defaults.h` (firmware fourni, V0.448), mis en forme pour la lecture. Il s’agit d’un **exemple**, pas d’un relevé de ton montage : contrôler les broches avant branchement.

```json
{
  "id": "bouton_tactile",
  "name": "👆 Bouton Tactile (TTP223)",
  "category": "sec",
  "type": "button",
  "pins": {
    "pin": 11
  },
  "interval_ms": 500,
  "pullup": false,
  "invert": false,
  "mA": 3,
  "factory": true,
  "icon": "👆",
  "metrics": [
    {
      "id": "pressed",
      "label": "Appuyé",
      "type": "boolean"
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
| `pins.pin` | GPIO associé au signal ou à la commande. |
| `interval_ms` | Intervalle de mesure demandé, en millisecondes (1 000 ms = 1 seconde). Le comportement exact dépend du driver. |
| `pullup` | Active ou désactive la résistance interne de rappel selon le driver. |
| `invert` | Inverse la logique du signal lorsque cette option est gérée par le driver. |
| `mA` | Consommation indicative saisie dans le catalogue, **pas une mesure électrique certifiée**. |
| `factory` | Marqueur de configuration proposée par le catalogue d’usine. |
| `icon` | Icône du module dans l’interface. |
| `metrics` | Liste descriptive des mesures exposées dans Natulib OS (identifiants, intitulés et unités). |
| `actions` | Actions proposées dans l’interface et utilisables selon le driver. |

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

**Test spécifique :** Toucher puis relâcher plusieurs fois et vérifier la stabilité du signal. Refaire les essais au redémarrage.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Certaines variantes de TTP223 ont des options matérielles de sensibilité et de mode de sortie.

### Retours de dépannage

**Le bouton reste actif en permanence**
→ Le module s'auto-calibre à la mise sous tension : ne touchez pas la zone tactile pendant le démarrage.

**Aucune détection à travers la façade**
→ La façade est trop épaisse ou contient un élément conducteur. Réduisez l'épaisseur ou rapprochez la plaque tactile.

## 🔧 Améliorations pour un montage plus simple

- [ ] Version avec fils déjà montés ou boîtier tactile prêt à raccorder.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

### Évolutions possibles

- [ ] Actions configurables directement depuis Natulib OS
- [ ] Support tactile intégré aux façades Natulib
- [ ] Gestes ou interactions tactiles avancées

## ⚙️ Pour aller plus loin (facultatif)

Le module utilise le driver `DeviceButton` (`type: button`) ; la documentation ne doit pas inventer un driver TTP223 distinct.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).

### Informations complémentaires

Le **TTP223** est un capteur tactile capacitif qui transforme une simple surface conductrice en **bouton sans contact mécanique**.

Dans Natulib, il peut être utilisé pour :

- 👆 réveiller Naturochi ;
- 📺 changer d'affichage ;
- 🌱 déclencher une action ou une recette ;
- 🔘 créer un bouton tactile intégré à la façade d'un boîtier.

**Alimentation :** 3,3 V · **Sortie :** numérique · **Consommation :** ~3 mA · **Calibration :** automatique à la mise sous tension.


### Informations complémentaires

**Configuration historique (à revérifier) :**

**Type :** `button`

```json
{
  "id": "bouton_tactile",
  "type": "button",
  "pins": {
    "pin": 11
  },
  "pullup": false,
  "invert": false,
  "active": true,
  "debug": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins.pin` | Broche numérique reliée à `I/O` |
| `pullup` | Résistance de tirage interne (déf. `true` — ici `false` car le TTP223 pilote activement sa sortie) |
| `invert` | Inverse la logique de détection (déf. `true` — ici `false`) |
| `active` | Active / désactive le module |
| `debug` | Journalisation détaillée |

Le driver `button` produit la métrique `pressed`.

> 🔵 Les champs `metrics`, `actions` et `mA` que l'on peut trouver dans des fichiers `/dev/*.json` existants sont des **métadonnées d'interface** (utilisées par l'éditeur Web pour afficher les capacités du module) : le driver `button` de Natulib OS ne les lit pas au runtime et leur présence ou absence n'a aucun effet sur son fonctionnement. Voir **[Drivers](../natulib-os/drivers.md)**.


### Informations complémentaires

- Le TTP223 fonctionne comme un **bouton numérique**.
- Aucun bouton mécanique n'est nécessaire.
- Le capteur peut être placé **derrière une fine façade non métallique**.
- Évitez les surfaces métalliques ou les éléments conducteurs proches de la zone tactile.
- La sensibilité dépend de l'épaisseur et du matériau de la façade.
- Consommation d'environ **3 mA**, à prendre en compte pour une station sur batterie.


### Informations complémentaires

**Ressources complémentaires**

- ✋ [NL-204A — Détecteur IR TCRT5000](./NL-204A-Detecteur-IR-TCRT5000.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)


### Informations complémentaires

**Historique du module**

| Version | Évolution |
|---|---|
| A | Première intégration du TTP223 |
