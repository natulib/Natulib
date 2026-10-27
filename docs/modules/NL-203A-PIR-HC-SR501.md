---
layout: module
bare: true
title: Détecteur de présence PIR HC-SR501
reference: NL-203A
ref: NL-203A
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
prix: ≈ 2 €
alimentation: 5 V
description: Le HC-SR501, souvent vendu sous la marque D-SUN, détecte les mouvements grâce aux variations du rayonnement
  infrarouge.
images: []
photos_a_ajouter: true
elements:
- 🚶 Mouvement
natulib_os_driver: DevicePIR
natulib_os_type: pir
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Statut repris du catalogue antérieur ; essais détaillés non fournis
---
**Détecteur de présence PIR HC-SR501** — Détecter un mouvement ou une présence par infrarouge passif.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « Validé » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Détecter un mouvement ou une présence par infrarouge passif.

### Informations complémentaires

> 📷 *Photo à ajouter : `assets/NL-203A-PIR-HC-SR501-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :

-->

## 🔌 Branchement

VCC et GND selon la référence du module ; OUT vers un GPIO d’entrée choisi sur la carte.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

### Matériel nécessaire

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Détecteur PIR HC-SR501 / D-SUN | 1 | ✅ | AliExpress |
| Câbles Dupont | 3 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.


### Câblage détaillé

> **Important :** brochage historique à confirmer pour la carte utilisée ; les valeurs du JSON ne garantissent pas la compatibilité de chaque GPIO.

| PIR HC-SR501 | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 5V | Alimentation |
| GND | GND | Masse |
| OUT | GPIO10 | Détection |

> 💡 Le module est alimenté en **5 V** mais sa sortie `OUT` délivre un niveau haut de **3,3 V**, compatible avec les GPIO de l'ESP32-C6. Vérifiez ce point sur le module reçu avant le raccordement.

> 💡 Les GPIO indiqués ci-dessus sont un **exemple historique de câblage**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, choisir le détecteur PIR, sélectionner la broche de signal et enregistrer.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

### Montage pas à pas

1. Connectez le PIR à l'ESP32-C6 selon le tableau de câblage.
2. Installez le module sur la face avant du boîtier.
3. Faites dépasser le dôme blanc à travers la façade.
4. Orientez le capteur vers la zone à surveiller.
5. Réglez sensibilité et temporisation, puis positionnez le cavalier.
6. Évitez les sources de chaleur ou le soleil direct à proximité.

## 📊 Mesures ou fonctions

État de détection et, selon configuration, métriques de fonctionnement.

*Les préfixes de mesures dépendent de l'identifiant donné au module dans Hardware.*

## 🧩 Configuration JSON d’usine

Extrait **exact** de `DEFAULT_ORG_PIR` dans `factory_defaults.h` (firmware fourni, V0.448), mis en forme pour la lecture. Il s’agit d’un **exemple**, pas d’un relevé de ton montage : contrôler les broches avant branchement.

```json
{
  "id": "oeil_secu",
  "name": "🚨 Détecteur PIR",
  "category": "sec",
  "type": "pir",
  "pins": {
    "pin": 13
  },
  "interval_ms": 1000,
  "mA": 3,
  "factory": true,
  "icon": "🚶",
  "metrics": [
    {
      "id": "motion",
      "label": "Mouvement détecté",
      "type": "boolean"
    },
    {
      "id": "idle_time_sec",
      "label": "Temps d'inactivité",
      "type": "number",
      "unit": "s"
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

**Test spécifique :** Tester en présence et en absence de mouvement, après l’éventuel temps de stabilisation du capteur. Vérifier les fausses détections.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- La détection PIR dépend des mouvements thermiques ; elle ne prouve pas qu’une personne est immobile devant le capteur.

### Retours de dépannage

**Déclenchements intempestifs**
→ Réduisez la sensibilité, éloignez le capteur d'une source de chaleur ou d'un courant d'air.

**La détection reste active en permanence**
→ Le module est en mode `H` avec une temporisation longue ; réduisez-la ou passez en `L`.

**Détections erratiques après la mise sous tension**
→ Le HC-SR501 demande une période de stabilisation après démarrage ; patientez avant de conclure.

## 🔧 Améliorations pour un montage plus simple

- [ ] Module à connecteur précâblé et prise numérique détrompée.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

### Évolutions possibles

- [ ] Support clipsable pour façade Natulib
- [ ] Réglage du délai directement dans Natulib OS
- [ ] Version sur PCB Natulib

## ⚙️ Pour aller plus loin (facultatif)

`DevicePIR` ; confirmer dans Hardware le nom exact du champ GPIO de la version installée.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).

### Informations complémentaires

Le **HC-SR501**, souvent vendu sous la marque **D-SUN**, détecte les mouvements grâce aux variations du rayonnement infrarouge.

Dans Natulib, il permet notamment de :

- 👋 réveiller Naturochi lorsqu'une présence est détectée ;
- 📺 allumer automatiquement l'écran ;
- 🌱 déclencher des recettes ou automatisations ;
- 😴 remettre la station en veille après une période d'inactivité.

**Alimentation :** 5 V · **Sortie :** numérique 3,3 V · **Calibration :** matérielle, par potentiomètres.


### Informations complémentaires

Le module comporte deux potentiomètres et un cavalier.

| Réglage | Rôle |
|---|---|
| **Sensibilité** | Portée de détection |
| **Temporisation** | Durée pendant laquelle `OUT` reste à l'état haut après une détection |
| **Cavalier H / L** | `H` : déclenchement répétitif, la temporisation est relancée à chaque mouvement · `L` : déclenchement unique |

> 💡 Pour Natulib, le mode **H** est généralement préférable : il maintient l'écran allumé tant qu'une présence est détectée.


### Informations complémentaires

**Configuration historique (à revérifier) :**

**Type :** `pir`

```json
{
  "id": "presence",
  "type": "pir",
  "pins": {
    "pin": 10
  },
  "active": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins.pin` | Broche numérique reliée à `OUT` |
| `active` | Active / désactive le module |

> 🔵 Le driver `pir` de Natulib OS lit la broche sous la clé `pins.pin` (et non `pins.signal`). Métriques exposées : `motion`, `idle_time_sec`. Voir **[Drivers](../natulib-os/drivers.md)**.


### Informations complémentaires

- Le PIR détecte les **mouvements**, pas une présence immobile.
- Il ne fournit **ni distance ni position**.
- La détection peut être perturbée par des sources de chaleur importantes.
- Sa consommation est faible et aucune calibration logicielle n'est nécessaire.
- Prévoyez un **délai logiciel** avant la remise en veille pour éviter les basculements trop fréquents.


### Informations complémentaires

**Ressources complémentaires**

- ✋ [NL-204A — Détecteur IR TCRT5000](./NL-204A-Detecteur-IR-TCRT5000.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)


### Informations complémentaires

**Historique du module**

| Version | Évolution |
|---|---|
| A | Première intégration du PIR HC-SR501 |
