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

### Informations complémentaires

> 📷 *Photo à ajouter : `assets/NL-207A-Capteur-courant-INA219-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :

-->

## 🔌 Branchement

VCC → alimentation logique compatible ; GND commun ; SDA/SCL vers I²C ; VIN+ et VIN− sont insérés **en série** sur la ligne positive de la charge.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

### Matériel nécessaire

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module INA219 | 1 | ✅ | Amazon / AliExpress |
| Câbles Dupont | 4 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.


### Câblage détaillé

> **Important :** brochage historique à confirmer pour la carte utilisée ; les valeurs du JSON ne garantissent pas la compatibilité de chaque GPIO.

| INA219 | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| SDA | GPIO4 | Données I²C |
| SCL | GPIO5 | Horloge I²C |

#### ⚡ Insertion sur la ligne de puissance

Le INA219 se place **en série sur la ligne d'alimentation** du périphérique à surveiller.

```text
Alimentation +
      │
      ▼
   VIN+ ── INA219 ── VIN- ──► + Périphérique
                              │
Alimentation GND ─────────────┴── GND
```

> ⚠️ Ne branchez pas le INA219 en parallèle sur la charge. Le courant à mesurer doit traverser le **shunt** du module.

#### 🔗 Adressage

| A0 | A1 | Adresse |
|:---:|:---:|:---:|
| ouvert | ouvert | `0x40` |
| pontée | ouvert | `0x41` |
| ouvert | pontée | `0x44` |
| pontée | pontée | `0x45` |

> 💡 Quatre adresses permettent de placer jusqu'à quatre INA219 sur le même bus I²C.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, sélectionner INA219, saisir SDA/SCL et enregistrer. Contrôler les mesures dans Accueil et les erreurs dans Console.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

### Montage pas à pas

1. Soudez la barrette de broches si le module en est dépourvu.
2. Connectez `VCC`, `GND`, `SDA` et `SCL` à l'ESP32-C6.
3. Insérez le INA219 **en série** sur l'alimentation du périphérique à surveiller.
4. Vérifiez le sens `VIN+` → `VIN-`.
5. Mettez le circuit sous tension.
6. Vérifiez les mesures de tension et de courant dans Natulib OS.

## 📊 Mesures ou fonctions

`voltage_v`, `current_ma`, `power_mw`, `online`

*Les préfixes de mesures dépendent de l'identifiant donné au module dans Hardware.*

## 🧩 Configuration JSON d’usine

Extrait **exact** de `DEFAULT_ORG_INA219` dans `factory_defaults.h` (firmware fourni, V0.448), mis en forme pour la lecture. Il s’agit d’un **exemple**, pas d’un relevé de ton montage : contrôler les broches avant branchement.

```json
{
  "id": "energie_harpe",
  "name": "⚡ Capteur INA219",
  "category": "sys",
  "type": "ina219",
  "pins": {
    "sda": 4,
    "scl": 5
  },
  "interval_ms": 1000,
  "mA": 2,
  "factory": true,
  "icon": "⚡",
  "metrics": [
    {
      "id": "voltage_v",
      "label": "Tension",
      "type": "number",
      "unit": "V"
    },
    {
      "id": "current_ma",
      "label": "Courant",
      "type": "number",
      "unit": "mA"
    },
    {
      "id": "power_mw",
      "label": "Puissance",
      "type": "number",
      "unit": "mW"
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
| `pins.sda` | Ligne de données I²C. |
| `pins.scl` | Ligne d’horloge I²C. |
| `interval_ms` | Intervalle de mesure demandé, en millisecondes (1 000 ms = 1 seconde). Le comportement exact dépend du driver. |
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

**Test spécifique :** Vérifier une mesure à vide puis avec une charge connue, comparer à un multimètre, contrôler la polarité et l’effet des reconnexions I²C.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Ne jamais placer VIN+/VIN− directement en parallèle sur une alimentation. Le driver utilise actuellement l’adresse 0x40 et le calibrage de la bibliothèque : vérifier la valeur du shunt.

### Retours de dépannage

**Le courant lu est toujours nul**
→ Le module est branché en parallèle, ou le sens `VIN+` / `VIN-` est inversé.

**Deux INA219 ne sont pas vus simultanément**
→ Les deux modules partagent l'adresse `0x40` ; pontez A0 ou A1 sur l'un d'eux.

## 🔧 Améliorations pour un montage plus simple

- [ ] Bornier à vis pour la puissance et connecteur I²C à quatre contacts pour la logique.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

### Évolutions possibles

- [ ] Affichage de la consommation instantanée dans Natulib OS
- [ ] Historique de consommation
- [ ] Alertes en cas de surconsommation
- [ ] Support de plusieurs INA219 sur le même bus I²C

## ⚙️ Pour aller plus loin (facultatif)

`DeviceINA219` ; intervalle par défaut 1 000 ms ; tentative de réinitialisation I²C et moyennage matériel 16 échantillons.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).

### Informations complémentaires

Le **INA219** est un capteur de courant et de tension communiquant en **I²C**.

Il permet à Natulib de surveiller en temps réel la consommation électrique d'un périphérique ou d'une partie de la station.

Il mesure :

- 🔋 la tension ;
- ⚡ le courant ;
- 🔌 la puissance ;
- ↔️ le courant dans les deux sens.

**Plage de tension annoncée :** 0–26 V · **Adresse I²C par défaut :** `0x40` · **Calibration :** dépend du shunt.


### Informations complémentaires

**Configuration historique (à revérifier) :**

**Type :** `ina219`

```json
{
  "id": "energie",
  "type": "ina219",
  "pins": {
    "sda": 4,
    "scl": 5
  },
  "interval_ms": 10000,
  "active": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins` | Broches I²C (`sda`, `scl`) |
| `interval_ms` | Intervalle entre deux lectures (1000 ms par défaut ; une lecture rapide est conseillée pour ne pas manquer les pics de courant) |
| `active` | Active / désactive le module |

> 🔵 **Divergence connue** — Le driver `ina219` de Natulib OS ne lit ni `address` ni `shunt_ohm` : il s'appuie sur la bibliothèque Adafruit INA219 avec sa **calibration par défaut** (plage 32 V / 2 A, correspondant à un shunt de 0,1 Ω) et son adresse I²C par défaut (`0x40`). Si votre module utilise un shunt différent de 0,1 Ω ou une adresse différente de `0x40`, les mesures de courant/puissance seront faussées proportionnellement, sans que la configuration JSON puisse actuellement le corriger. Voir **[Drivers](../natulib-os/drivers.md)**.


### Informations complémentaires

- Le INA219 mesure **tension, courant et puissance**.
- Il communique en **I²C** et cohabite avec les autres capteurs du bus.
- Le courant peut être mesuré dans les **deux directions**.
- La tension maximale annoncée pour ce module est de **26 V**.
- Le courant mesuré doit traverser le **shunt intégré**.
- Le module peut moyenner plusieurs échantillons pour réduire le bruit.
- La précision réelle dépend du **shunt monté** et de sa configuration.


### Informations complémentaires

**Ressources complémentaires**

- 🔧 [NL-401A — PowerSwitch](./NL-401A-PowerSwitch.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)


### Informations complémentaires

**Historique du module**

| Version | Évolution |
|---|---|
| A | Première intégration du INA219 |
