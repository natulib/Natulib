---
layout: module
bare: true
title: Détecteur IR de proximité TCRT5000
reference: NL-204A
ref: NL-204A
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
description: Le TCRT5000 est un capteur infrarouge réfléchissant qui détecte les objets à très courte distance.
images: []
photos_a_ajouter: true
elements:
- 📍 Proximité
natulib_os_driver: DeviceTCRT5000
natulib_os_type: tcrt5000
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Statut repris du catalogue antérieur ; essais détaillés non fournis
---
**Détecteur IR de proximité TCRT5000** — Détecter la proximité d’un objet à courte distance par réflexion infrarouge.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « Validé » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Détecter la proximité d’un objet à courte distance par réflexion infrarouge.

## 🔌 Branchement

Relier alimentation et GND ; connecter la sortie de détection à un GPIO compatible selon la carte TCRT5000.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, choisir le détecteur TCRT5000 et sélectionner la broche d’entrée.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

État de détection et variables du driver `tcrt5000`.

*Les préfixes de mesures dépendent de l'identifiant donné au module dans Hardware.*

## 🧩 Configuration JSON d’usine

Extrait **exact** de `DEFAULT_ORG_TCRT5000` dans `factory_defaults.h` (firmware fourni, V0.448), mis en forme pour la lecture. Il s’agit d’un **exemple**, pas d’un relevé de ton montage : contrôler les broches avant branchement.

```json
{
  "id": "proximite_ir",
  "name": "👁️ Capteur Optique (TCRT5000)",
  "category": "sec",
  "type": "tcrt5000",
  "pins": {
    "digital": 4,
    "adc": 34
  },
  "interval_ms": 500,
  "mA": 15,
  "invert": true,
  "factory": true,
  "icon": "👁️",
  "metrics": [
    {
      "id": "detected",
      "label": "Présence détectée",
      "type": "boolean"
    },
    {
      "id": "raw",
      "label": "Luminosité IR brute",
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
| `pins.digital` | Entrée numérique du capteur. |
| `pins.adc` | GPIO utilisé pour la lecture analogique (ADC). |
| `interval_ms` | Intervalle de mesure demandé, en millisecondes (1 000 ms = 1 seconde). Le comportement exact dépend du driver. |
| `mA` | Consommation indicative saisie dans le catalogue, **pas une mesure électrique certifiée**. |
| `invert` | Inverse la logique du signal lorsque cette option est gérée par le driver. |
| `factory` | Marqueur de configuration proposée par le catalogue d’usine. |
| `icon` | Icône du module dans l’interface. |
| `metrics` | Liste descriptive des mesures exposées dans Natulib OS (identifiants, intitulés et unités). |
| `actions` | Actions proposées dans l’interface et utilisables selon le driver. |

**Précision issue du driver ou du matériel :** Le modèle d’usine contient `adc: 34`, broche **inexistante comme ADC sur ESP32-C6**. Ce JSON est reproduit fidèlement mais doit impérativement être adapté avant utilisation sur C6.

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

**Test spécifique :** Approcher différents matériaux et distances ; tester l’influence de la lumière ambiante et du seuil réglable.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- La réponse varie beaucoup avec la couleur et la réflectivité des surfaces ; ne pas déduire une distance précise.

## 🔧 Améliorations pour un montage plus simple

- [ ] Boîtier préassemblé avec prise numérique détrompée.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

## ⚙️ Pour aller plus loin (facultatif)

`DeviceTCRT5000` (`type: tcrt5000`).

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).

## 📚 Documentation approfondie et archives

Cette partie conserve **les informations détaillées de la fiche antérieure** : matériel, étapes de montage, astuces, précautions, dépannage, évolutions et historique. Elle s’adresse aux personnes qui veulent aller plus loin.

> **Attention : contenu historique conservé.** Certains exemples de brochage, de JSON ou de fonctionnement peuvent différer du firmware V0.448. Pour la configuration actuelle, se référer à **« Configuration JSON d’usine »** et au tableau de paramètres plus haut ; vérifier les broches et tensions de la carte exacte avant le montage. Les tests matériels restent à documenter.

### 👀 En bref

Le **TCRT5000** est un capteur infrarouge réfléchissant qui détecte les objets à **très courte distance**.

Dans Natulib, il sert principalement de **capteur d'interaction** :

- ✋ détection d'une main devant l'écran ;
- 🌱 réveil de Naturochi ;
- 📺 changement d'affichage ;
- ⚡ déclenchement d'une action sans contact.

**Alimentation :** 3,3 V · **Sortie principale :** DO · **Sortie analogique :** AO *(optionnelle)* · **Calibration :** potentiomètre.

---

### 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-204A-Detecteur-IR-TCRT5000-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :

-->

---

### 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module TCRT5000 (LM393) | 1 | ✅ | AliExpress |
| Câbles Dupont | 3–4 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

### 🔌 Câblage

| TCRT5000 | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| DO | GPIO14 | Détection numérique |
| AO *(optionnel)* | GPIO1 | Mesure analogique |

> 💡 Natulib utilise principalement **DO**. La sortie **AO** fournit une mesure analogique de la réflexion infrarouge.

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

---

### ⚙️ Configuration Natulib OS

**Type :** `tcrt5000`

```json
{
  "id": "interaction",
  "type": "tcrt5000",
  "pins": {
    "digital": 14,
    "adc": 1
  },
  "invert": false,
  "active": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins.digital` | Broche numérique reliée à `DO` |
| `pins.adc` | Broche analogique reliée à `AO` (facultative) |
| `invert` | Inverse la logique de détection (déf. `false`) |
| `active` | Active / désactive le module |

> 🔵 Le driver `tcrt5000` lit les broches sous les clés `pins.digital` et `pins.adc` (et non `pins.signal`). Métriques exposées : `detected`, `raw`, `error`. Voir **[Drivers](../natulib-os/drivers.md)**.

---

### 🛠️ Montage en 5 minutes

1. Connectez le TCRT5000 à l'ESP32-C6 selon le tableau de câblage.
2. Positionnez le capteur derrière une petite ouverture dans la façade.
3. Orientez-le vers la zone d'interaction.
4. Réglez la sensibilité avec le potentiomètre.
5. Testez la détection avec la main ou l'objet à détecter.

---

### 📏 Calibration

1. Laissez la zone de détection dégagée.
2. Tournez le potentiomètre jusqu'à ce que la LED de sortie s'éteigne.
3. Approchez la main à la distance de déclenchement souhaitée.
4. Ajustez jusqu'à obtenir un basculement franc.
5. Répétez le test plusieurs fois pour vérifier la stabilité du seuil.

> 💡 Refaites ce réglage **après** l'installation dans la façade : l'épaisseur et la matière modifient la réflexion.

---

### 🧩 Problèmes courants

**Aucune détection sur un objet sombre**
→ Les surfaces noires ou mates réfléchissent peu l'infrarouge ; augmentez la sensibilité ou réduisez la distance.

**Détections aléatoires en journée**
→ Une lumière ambiante forte, notamment le soleil direct, perturbe la mesure.

---

### 💡 À retenir

- Le **DO** fournit une détection numérique simple.
- Le **AO** est facultatif et fournit une mesure analogique.
- La portée dépend fortement de la **distance, de la couleur et de la matière** de l'objet.
- Ce capteur est destiné à la **proximité**, pas à la détection de présence dans une pièce — voir le [NL-203A](./NL-203A-PIR-HC-SR501.md) pour cet usage.
- Ajustez le potentiomètre après l'installation pour obtenir un seuil fiable.

---

### 🚧 Évolutions prévues

- [ ] Assistant de calibration dans Natulib OS
- [ ] Seuil réglable depuis l'interface Web
- [ ] Petit support imprimable orientable
- [ ] Version sur PCB Natulib

---

### 🔗 Ressources

- 👁️ [NL-203A — PIR HC-SR501](./NL-203A-PIR-HC-SR501.md)
- 👆 [NL-206A — Capteur tactile TTP223](./NL-206A-Capteur-tactile-TTP223.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

### 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration du TCRT5000 |
