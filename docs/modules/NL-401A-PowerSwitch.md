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

### Informations complémentaires

> 📷 *Photo à ajouter : `assets/NL-401A-PowerSwitch-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :

-->

## 🔌 Branchement

Respecter l’orientation du transistor, la résistance de base, la masse commune et la protection de charge inductive si nécessaire.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

### Matériel nécessaire

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Transistor PN2222A | 1 | ✅ | AliExpress |
| Résistance 1 kΩ | 1 | ✅ | AliExpress |
| Connecteur 3 broches | 1 | Optionnel | AliExpress |
| PCB NL-401A | 1 | Optionnel | Projet KiCad |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.


### Câblage détaillé

> **Important :** brochage historique à confirmer pour la carte utilisée ; les valeurs du JSON ne garantissent pas la compatibilité de chaque GPIO.

#### Orientation du PN2222A

Placez la **face plate vers vous**, inscriptions visibles.

```text
                 PN2222A — vue de face

              ┌───────────────┐
              │    PN2222A    │
              └───────────────┘
                  │   │   │
                  E   B   C
                  │   │   │
                  │   │   └──── GND périphérique
                  │   │
                  │   └──────── 1 kΩ ─── GPIO21
                  │
                  └──────────── GND ESP32
```

#### Brochage

| Broche | Nom | Connexion |
|---|---|---|
| Gauche | Émetteur (E) | GND ESP32 |
| Milieu | Base (B) | Résistance 1 kΩ → GPIO21 |
| Droite | Collecteur (C) | GND du périphérique |

> 🔧 Vérifiez impérativement le brochage du **PN2222A utilisé** : l'ordre des broches varie selon le fabricant.

> 💡 Les GPIO indiqués ci-dessus sont un **exemple historique de câblage**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

#### Principe

Le périphérique conserve son alimentation positive. Le PN2222A commute uniquement son **retour GND**.

```text
ESP32 / alimentation
       │
      +3V3
       │
       ├────────────── + périphérique
       │
      GND ── E PN2222A C ── GND périphérique
                 ▲
                 │
          1 kΩ ──┴── GPIO21
```

| GPIO | PN2222A | Périphérique |
|---|---|---|
| **HIGH** | Conducteur | Alimenté |
| **LOW** | Bloqué | Hors tension |

> ⚠️ Cette architecture est une **commutation côté masse**. Vérifiez que le périphérique la supporte avant de l'intégrer : un périphérique partageant une masse avec l'ESP32-C6 par ailleurs (bus I²C, SPI) ne sera pas réellement coupé.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, créer une sortie relais/logique sur le GPIO dédié, puis vérifier l’action manuelle.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

### Montage pas à pas

1. Identifiez les broches **E / B / C** du PN2222A.
2. Soudez le transistor et la résistance de **1 kΩ**.
3. Reliez la base à la GPIO de commande via la résistance.
4. Reliez l'émetteur au GND de l'ESP32-C6.
5. Reliez le collecteur au GND du périphérique.
6. Vérifiez le câblage avant la mise sous tension.

## 📊 Mesures ou fonctions

État de sortie ; état logique de la commande selon le driver.

*Les préfixes de mesures dépendent de l'identifiant donné au module dans Hardware.*

## 🧩 Configuration JSON d’usine

Extrait **exact** de `DEFAULT_ORG_RELAY` dans `factory_defaults.h` (firmware fourni, V0.448), mis en forme pour la lecture. Il s’agit d’un **exemple**, pas d’un relevé de ton montage : contrôler les broches avant branchement.

```json
{
  "id": "lampe_croissance",
  "name": "🔌 Module Relais",
  "category": "act",
  "type": "relay",
  "pins": {
    "pin": 19
  },
  "invert": false,
  "default_on": false,
  "mA": 70,
  "factory": true,
  "icon": "⚡",
  "metrics": [
    {
      "id": "state",
      "label": "État du relais",
      "type": "boolean"
    }
  ],
  "actions": [
    {
      "id": "on",
      "label": "Allumer (ON)"
    },
    {
      "id": "off",
      "label": "Éteindre (OFF)"
    },
    {
      "id": "toggle",
      "label": "Inverser l'état"
    }
  ]
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
| `invert` | Inverse la logique du signal lorsque cette option est gérée par le driver. |
| `default_on` | État demandé au démarrage pour les sorties qui gèrent cette option. |
| `mA` | Consommation indicative saisie dans le catalogue, **pas une mesure électrique certifiée**. |
| `factory` | Marqueur de configuration proposée par le catalogue d’usine. |
| `icon` | Icône du module dans l’interface. |
| `metrics` | Liste descriptive des mesures exposées dans Natulib OS (identifiants, intitulés et unités). |
| `actions` | Actions proposées dans l’interface et utilisables selon le driver. |

**Précision issue du driver ou du matériel :** Ce JSON est celui du **driver générique `relay`**, fourni comme exemple de sortie logique ; il ne décrit **pas** la résistance, la polarité, la charge ni les protections du montage PN2222A. Ce montage doit être dimensionné séparément.

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

**Test spécifique :** Contrôler l’état de repos au démarrage, les activations répétées et l’échauffement de la partie puissance.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Le PN2222A n’est pas un relais isolé ; dimensionner le courant et la dissipation pour chaque charge.

### Retours de dépannage

**Le périphérique reste alimenté à l'état LOW**
→ Il dispose d'un autre chemin de masse, par exemple via un bus de données partagé.

**Le transistor chauffe**
→ La charge dépasse ce que le montage peut absorber ; passez au [NL-402A](./NL-402A-Mosfet-PWM.md).

## 🔧 Améliorations pour un montage plus simple

- [ ] Préférer à terme un petit module de commutation protégé avec borniers à vis.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

### Évolutions possibles

- [ ] **NL-401B** : version à base de MOSFET pour des charges plus importantes
- [ ] Mesure du courant maximal réellement admissible
- [ ] PCB Natulib et boîtier associé

## ⚙️ Pour aller plus loin (facultatif)

`DeviceRelay` (`type: relay`) : commande d’une sortie GPIO.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).

### Informations complémentaires

Le **NL-401A PowerSwitch** coupe l'alimentation d'un petit périphérique à l'aide d'une **GPIO de l'ESP32-C6**.

Il utilise un **PN2222A** en commutation côté masse (*low-side switching*).

Il est particulièrement utile pour les périphériques dépourvus d'un véritable mode veille, par exemple certains écrans **[GC9A01](./NL-101A-GC9A01.md)** dont le rétroéclairage reste alimenté.

Applications :

- 📺 extinction complète d'un écran ;
- 🌡️ mise hors tension d'un capteur ;
- 😴 réduction de la consommation en Deep Sleep ;
- 🔄 redémarrage matériel d'un périphérique.

**Charge visée :** quelques centaines de mA · **Commande :** GPIO 3,3 V via résistance 1 kΩ.

> ⚠️ Le NL-401A est destiné aux **petites charges**. Pour des courants plus importants, utilisez le **[NL-402A](./NL-402A-Mosfet-PWM.md)**.


### Informations complémentaires

**Configuration historique (à revérifier) :**

Le PowerSwitch se déclare comme une sortie numérique, avec le driver générique `relay` — il n'existe pas de type `switch` dédié dans Natulib OS.

```json
{
  "id": "alim_ecran",
  "type": "relay",
  "pins": {
    "pin": 21
  },
  "invert": false,
  "active": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins.pin` | Broche numérique reliée à la gâchette du PowerSwitch |
| `invert` | Inverse la logique de commande (déf. `false`) |
| `active` | Active / désactive le module |

Actions disponibles : `on_<id>`, `off_<id>`, `toggle_<id>` (voir **[Drivers](../natulib-os/drivers.md)**).

> 🔵 **Divergence connue** — Il n'existe pas de champ `default_state` : au démarrage, le driver `relay` initialise systématiquement la sortie à l'état **éteint** (sauf si `invert: true`, auquel cas la logique électrique est inversée mais l'état logique reste « éteint »). Pour rétablir un état après un redémarrage, utilisez une automatisation dédiée (voir **[Automatisations](../natulib-os/automatisations.md)**).


### Informations complémentaires

- Réservez cette version aux **petites charges** compatibles avec la commutation côté masse.
- La résistance de **1 kΩ** protège la GPIO en limitant le courant de base.
- Vérifiez le brochage du transistor avant soudure.
- Pour une charge plus importante, utilisez un **MOSFET** — voir [NL-402A](./NL-402A-Mosfet-PWM.md).
- Particulièrement utile pour réduire la consommation pendant le **Deep Sleep**.


### Informations complémentaires

**Ressources complémentaires**

- ⚡ [NL-402A — Module MOSFET PWM](./NL-402A-Mosfet-PWM.md)
- 📺 [NL-101A — Écran rond GC9A01](./NL-101A-GC9A01.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)


### Informations complémentaires

**Historique du module**

| Version | Évolution |
|---|---|
| A | Première version du PowerSwitch PN2222A |
