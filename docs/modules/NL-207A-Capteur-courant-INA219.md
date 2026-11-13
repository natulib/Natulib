---
layout: module
bare: true
title: Capteur de courant INA219
reference: NL-207A
ref: NL-207A
famille: sensors
categorie: Capteurs
statut: Validé
etat: valide
soudure: Selon le module (bornier et/ou barrette à souder)
montage: soudure
niveau: Intermédiaire
duree: 10 min
temps: 10
interface: I²C
prix: ≈ 1.5 €
description: Mesurer en temps réel la tension, le courant et la puissance d'un périphérique.
images:
  - fichier: /assets/NL-207A-INA219-1.png
    titre:
    alt:
elements:
  - ⚡ Courant
  - 🔋 Tension
  - 📊 Puissance
starter_sections:
  - 🛒 Ce qu'il vous faut
  - 🚀 Pour commencer
  - 🧪 Validation rapide
---
Le **INA219** est un capteur **I²C** qui mesure la **tension**, le **courant** dans les deux sens et la **puissance** consommés par un périphérique. 

Il permet à Natulib de surveiller en temps réel la consommation électrique d'un périphérique ou d'une partie de la station.

**Plage de tension annoncée :** 0–26 V · **Adresse I²C par défaut :** `0x40` · **Calibration :** dépend du shunt.

## 🛒 Ce qu'il vous faut

| Composant | Lien d'achat | Note / Rôle |
| --- | --- | --- |
| **Module INA219 avec shunt R100 (0,1 Ω)** | [AliExpress — Recherche INA219](https://fr.aliexpress.com/w/wholesale-ina219.html) | Mesure de courant, de tension et de puissance. |
| **4 fils Dupont** | — | Alimentation 3,3 V, masse et bus I²C. |
| **2 fils pour la ligne positive à mesurer** | — | Relier l'alimentation, `VIN+`, `VIN−` et la charge ; selon le modèle, utiliser le bornier à vis. |

## 🚀 Pour commencer

1. **Souder** la barrette de broches si le module en est dépourvu.
2. **Couper l'alimentation** avant tout raccordement.
3. Brancher **VCC → 3V3**, **GND → GND**, **SCL → GPIO5** et **SDA → GPIO4**, comme sur l'illustration de référence. 
4. Pour mesurer une consommation, insérer le shunt **en série sur la ligne positive du périphérique à surveiller ** : **alimentation + → VIN+ → VIN− → + du périphérique**. Relier le **GND du périphérique à la masse commune**.
5. Vérifier le sens `VIN+` → `VIN-`.
6. Remettre le montage sous tension et ouvrir **Hardware** dans l'interface Web locale de **Natulib OS**.
7. Ajouter **⚡ Capteur INA219**, vérifier les broches **SDA/SCL**, puis **enregistrer**.
8. **Redémarrer l'ESP32-C6 après l'ajout du module** pour que Natulib OS prenne sa configuration en compte.
9. Vérifier les mesures de **tension (V)**, **courant (mA)** et **puissance (mW)** dans l'interface.

> ⚠️ **Important :** `VIN+` et `VIN−` doivent être **traversés par le courant de la charge**. Ne pas relier ces deux bornes directement en parallèle entre le + et le GND de l'alimentation : cela créerait un court-circuit via le shunt.

**À retenir :** `VCC` alimente l'électronique du capteur en **3,3 V** ; `VIN+` et `VIN−` servent à mesurer la consommation du périphérique. Ce sont deux circuits fonctionnellement distincts.

**Hardware**. L'adresse I²C utilisée par le driver actuel est **`0x40`**.

## 🧪 Validation rapide

| Vérification | Résultat attendu |
| --- | --- |
| Redémarrer l'ESP32-C6 après l'ajout | Le module est chargé et ses mesures sont visibles. |
| Vérifier l'état du capteur | **`online = 1`** lorsque l'INA219 communique. |
| Alimenter un périphérique via `VIN+` / `VIN−` | Une **tension** et un **courant** cohérents apparaissent. |
| Modifier la consommation du périphérique | Les valeurs **`current_ma`** et **`power_mw`** évoluent. |
| Débrancher la charge, alimentation coupée au préalable | Le courant mesuré doit revenir près de zéro, à la précision du montage près. |

## 🧩 Dans Natulib

### Hardware

Le module utilise le type interne **`ina219`** et le driver **`DeviceINA219`**. Il expose quatre mesures :

| Mesure | Signification | Unité |
| --- | --- | --- |
| **`voltage_v`** | Tension du bus mesurée côté `VIN−`, par rapport à GND | V |
| **`current_ma`** | Courant traversant le shunt, selon son sens de branchement | mA |
| **`power_mw`** | Puissance calculée par Natulib (`tension × courant`) | mW |
| **`online`** | État de communication du capteur (`1` connecté, `0` indisponible) | 0 / 1 |

Le préfixe des mesures dépend de l'identifiant défini dans **Hardware** (par exemple `energie_harpe.current_ma`).

### Synapses

Dans **Synapses**, sélectionner l'INA219, puis la **mesure** à utiliser dans une condition :

- **`current_ma`** : détecter un courant supérieur à un seuil, par exemple une surconsommation.
- **`voltage_v`** : surveiller une baisse de tension.
- **`power_mw`** : déclencher une action en fonction de la puissance consommée.
- **`online`** : détecter si le capteur n'est plus disponible.

Exemple : créer une condition **« Courant > 50 mA »** pour déclencher une alerte, en adaptant le seuil au périphérique surveillé.

### ✅ Essai réel : consommation d'un écran GC9A01

Mesures affichées par **Natulib OS** avec un **INA219** lors des essais du module **NL-101A** :

| Alimentation de l'écran | Tension | Courant | Puissance |
| --- | ---: | ---: | ---: |
| **Ligne 3V3** | **3,20 V** | **38,2 mA** | **122 mW** |
| **Sortie GPIO2 à HIGH — essai ponctuel** | **2,82 V** | **16,8 mA** | **47 mW** |

Le courant et la puissance diminuent dans le second cas, avec une luminosité d'écran réduite. 

## ⚙️ Configuration de référence

Exemple simplifié pour le montage de référence :

```json
{
  "id": "energie_harpe",
  "type": "ina219",
  "pins": {
    "sda": 4,
    "scl": 5
  },
  "interval_ms": 1000,
  "active": true
}
```

- **`pins.sda` / `pins.scl`** : broches du bus I²C.
- **`interval_ms: 1000`** : intervalle de lecture demandé, soit environ une lecture par seconde.
- **`active: true`** : module activé dans Hardware.

**Limite du driver fourni :** l'adresse I²C est fixée à **`0x40`** et le driver ne lit pas de paramètres JSON `address` ou `shunt_ohm`. Il utilise la bibliothèque **Adafruit INA219** avec son calibrage usuel et configure un **moyennage matériel 16 échantillons**. Les modules avec une adresse différente ou un shunt différent de **0,1 Ω** demandent une adaptation du firmware ou de la calibration avant de pouvoir être considérés comme compatibles.

### 🔗 Adressage

| A0 | A1 | Adresse |
|:---:|:---:|:---:|
| ouvert | ouvert | `0x40` |
| pontée | ouvert | `0x41` |
| ouvert | pontée | `0x44` |
| pontée | pontée | `0x45` |

> 💡 Quatre adresses permettent de placer jusqu'à quatre INA219 sur le même bus I²C.

## 🛠️ Problèmes courants

| Problème | Vérification / Solution |
| --- | --- |
| **Aucune mesure après l'ajout** | Enregistrer dans **Hardware**, puis **redémarrer l'ESP32-C6**. |
| **`online = 0`** | Vérifier VCC, GND, SDA/SCL, les connexions I²C et l'adresse **`0x40`** ; consulter **Console**. |
| **Courant nul malgré une charge active** | Vérifier que le courant passe réellement par **VIN+ → VIN−** et que la ligne positive n'est pas contournée. |
| **Courant négatif** | Vérifier le sens du shunt : inverser VIN+ et VIN− si le sens de mesure attendu est positif. |
| **Valeurs incohérentes** | Vérifier le shunt **R100**, les connexions, la tension de la charge et la calibration. |
| **Deux INA219 sur le même bus** | Le driver actuel utilise **`0x40`** : plusieurs adresses nécessitent une évolution logicielle. |
| **Mesures manquantes après une déconnexion I²C** | Le driver tente une reconnexion ; vérifier le câblage et consulter les logs **Console**. |

## 🔗 Ressources

- [NL-101A — Écran rond GC9A01](./NL-101A-GC9A01.md) — périphérique utilisé pour les mesures de validation.
- [Documentation Natulib OS — Drivers](../natulib-os/drivers.md).
- [Catalogue des modules Natulib](../Modules.md).

## 🕓 Historique

| Version | Évolution |
| --- | --- |
| A | Première intégration du INA219 et documentation initiale. |











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


## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Ne jamais placer VIN+/VIN− directement en parallèle sur une alimentation. Le driver utilise actuellement l’adresse 0x40 et le calibrage de la bibliothèque : vérifier la valeur du shunt.




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

