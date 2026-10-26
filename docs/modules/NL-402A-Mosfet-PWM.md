---
layout: module
bare: true
title: Module MOSFET PWM
reference: NL-402A
ref: NL-402A
famille: power
categorie: Alimentation
statut: En test
etat: test
soudure: Soudure requise
montage: soudure
niveau: Intermédiaire
duree: 20 min
temps: 20
interface: PWM
prix: ≈ 1 €
description: Le NL-402A est un module MOSFET permettant de commander une charge en courant continu depuis un signal
  GPIO ou PWM.
images: []
photos_a_ajouter: true
elements:
- ⚡ Commande PWM
natulib_os_driver: DevicePWM
natulib_os_type: pwm
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Essais matériels à documenter
---
**Module MOSFET PWM** — Piloter une charge basse tension par signal PWM, notamment une pompe ou un éclairage compatible.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « En test » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Piloter une charge basse tension par signal PWM, notamment une pompe ou un éclairage compatible.

## 🔌 Branchement

Relier la commande du MOSFET au GPIO PWM configuré, les masses correctement et la charge à une alimentation adaptée. Ne jamais alimenter une pompe depuis un GPIO.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Dans Hardware, ajouter une sortie PWM, choisir sa broche et ses paramètres, puis essayer la commande manuelle avant les Synapses.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

État et niveau de sortie PWM (selon le driver et la configuration).

*Les préfixes de mesures dépendent de l'identifiant donné au module dans Hardware.*

## 🧩 Configuration JSON d’usine

Extrait **exact** de `DEFAULT_ORG_PUMP` dans `factory_defaults.h` (firmware fourni, V0.448), mis en forme pour la lecture. Il s’agit d’un **exemple**, pas d’un relevé de ton montage : contrôler les broches avant branchement.

```json
{
  "id": "pompe_eau",
  "name": "🚿 Pompe à Eau (PWM)",
  "category": "act",
  "type": "pwm",
  "pins": {
    "pin": 18
  },
  "mA": 0,
  "factory": true,
  "icon": "⚙️",
  "metrics": [
    {
      "id": "state",
      "label": "État (Allumé / Éteint)",
      "type": "boolean"
    }
  ],
  "actions": [
    {
      "id": "pwm_100",
      "label": "Activer (100%)"
    },
    {
      "id": "pwm_50",
      "label": "Activer (50%)"
    },
    {
      "id": "off",
      "label": "Désactiver"
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
| `mA` | Consommation indicative saisie dans le catalogue, **pas une mesure électrique certifiée**. |
| `factory` | Marqueur de configuration proposée par le catalogue d’usine. |
| `icon` | Icône du module dans l’interface. |
| `metrics` | Liste descriptive des mesures exposées dans Natulib OS (identifiants, intitulés et unités). |
| `actions` | Actions proposées dans l’interface et utilisables selon le driver. |

**Précision issue du driver ou du matériel :** Le JSON correspond au profil d’usine **« Pompe à Eau (PWM) »**, qui utilise le driver `pwm`. Le MOSFET, son câblage, le courant et la protection de la pompe ne sont pas définis par le JSON.

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

**Test spécifique :** Tester les niveaux de commande, l’arrêt au redémarrage et la température du montage sous charge réelle ; mesurer le courant.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Les charges inductives exigent des protections adaptées. Ne pas utiliser cet assemblage pour une tension secteur sans équipement certifié.

## 🔧 Améliorations pour un montage plus simple

- [ ] Bornier à vis, module MOSFET précâblé et connecteur de commande rapide.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

## ⚙️ Pour aller plus loin (facultatif)

`DevicePWM` ; les paramètres disponibles dépendent du profil enregistré dans Hardware.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).

## 📚 Documentation approfondie et archives

Cette partie conserve **les informations détaillées de la fiche antérieure** : matériel, étapes de montage, astuces, précautions, dépannage, évolutions et historique. Elle s’adresse aux personnes qui veulent aller plus loin.

> **Attention : contenu historique conservé.** Certains exemples de brochage, de JSON ou de fonctionnement peuvent différer du firmware V0.448. Pour la configuration actuelle, se référer à **« Configuration JSON d’usine »** et au tableau de paramètres plus haut ; vérifier les broches et tensions de la carte exacte avant le montage. Les tests matériels restent à documenter.

### 👀 En bref

Le **NL-402A** est un module MOSFET permettant de commander une charge en courant continu depuis un signal **GPIO ou PWM**.

Il peut servir à :

- 💡 contrôler la luminosité d'une bande LED ;
- 🌀 régler la vitesse d'un moteur DC ;
- 💧 commander une petite pompe ;
- ⚡ commuter une charge alimentée séparément ;
- 🎛️ piloter une charge avec un signal PWM.

Le module utilise **deux MOSFET en parallèle**.

**Tension de charge annoncée :** 5–36 V · **Courant continu annoncé :** 15 A · **Courant maximal annoncé :** 30 A · **PWM :** 0–20 kHz.

> ⚠️ Les valeurs de courant et de puissance sont celles annoncées par le fabricant. Elles dépendent du refroidissement, du câblage et de la charge utilisée, et ne constituent pas une capacité garantie.

---

### 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-402A-Mosfet-PWM-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :

-->

---

### 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module MOSFET PWM | 1 | ✅ | Amazon |
| Câbles Dupont | 3 | ✅ | AliExpress |
| Alimentation adaptée à la charge | 1 | ✅ | Selon projet |
| Charge DC | 1 | ✅ | Selon projet |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

### 🔌 Câblage

Le câblage exact dépend du bornier de la version reçue.

| Module | Connexion | Fonction |
|---|---|---|
| VCC / + | Alimentation charge | Alimentation |
| GND / - | GND alimentation **et** GND ESP32-C6 | Masse commune |
| IN / PWM | GPIO6 | Commande |
| OUT | Charge | Sortie commutée |

> ⚠️ Vérifiez impérativement le marquage **IN / OUT / VCC / GND** directement sur le PCB avant raccordement. Le brochage varie selon les versions du module.

> ⚠️ L'alimentation de la charge ne doit jamais provenir d'une GPIO de l'ESP32-C6. La GPIO commande le MOSFET ; la charge est alimentée par son alimentation dédiée.

> ⚠️ La masse de l'ESP32-C6 et celle de l'alimentation de la charge doivent être **reliées**, sinon le signal de commande n'a pas de référence.

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

---

### ⚙️ Configuration Natulib OS

**Type :** `pwm`

```json
{
  "id": "mosfet_pwm",
  "type": "pwm",
  "pins": {
    "pin": 6
  },
  "active": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins.pin` | Broche PWM reliée à l'entrée de commande du module MOSFET |
| `active` | Active / désactive le module |

> 🔵 **Divergence connue** — Le driver `pwm` ne lit ni `frequency_hz` ni `duty`. La fréquence PWM est **fixée en dur dans le code** à 5 kHz sur 8 bits de résolution (0–255), quelle que soit la configuration JSON. Le rapport cyclique de démarrage est toujours 0 (sortie éteinte) ; il se pilote uniquement **par action**, jamais par un champ statique du fichier `/dev/*.json` :

| Action | Effet |
|---|---|
| `off_<id>` | Rapport cyclique 0 % |
| `pwm_50_<id>` | Rapport cyclique 50 % |
| `pwm_100_<id>` | Rapport cyclique 100 % |
| `pwm_<id>_<0-255>` | Rapport cyclique arbitraire (valeur brute 0–255) |

Voir **[Drivers](../natulib-os/drivers.md)** et **[Automatisations](../natulib-os/automatisations.md)** pour déclencher ces actions depuis une règle.

---

### 🛠️ Montage en 20 minutes

1. Vérifiez le brochage inscrit sur le module.
2. Connectez l'alimentation de la charge au module.
3. Connectez la charge sur la sortie MOSFET.
4. Reliez la masse de commande à la masse du système.
5. Connectez l'entrée de commande à **GPIO6**.
6. Démarrez avec un rapport cyclique faible.
7. Vérifiez la température du module lorsque la charge augmente.

---

### 🧩 Problèmes courants

**La charge ne s'éteint jamais complètement**
→ Certains modules laissent passer un courant résiduel ; vérifiez le type de MOSFET et le niveau de commande.

**Bourdonnement audible sur un moteur ou une pompe**
→ Augmentez la fréquence PWM au-delà de la plage audible.

**Le module chauffe fortement**
→ Réduisez la charge, améliorez le refroidissement ou augmentez la section des câbles de puissance.

---

### 💡 À retenir

- Le **GPIO ne fournit pas la puissance à la charge** : il commande le MOSFET.
- Utilisez une alimentation adaptée à la tension et au courant de la charge.
- Le fabricant annonce **5–36 V DC** et jusqu'à **15 A en continu**, 30 A en pointe.
- La puissance annoncée de **400 W** ne doit pas être considérée comme garantie en toutes conditions.
- Le refroidissement et la section des câbles deviennent déterminants avec les fortes charges.
- ⚠️ Pour les charges inductives — moteurs, pompes, électrovannes — prévoyez les protections adaptées aux transitoires.
- Ne jamais appliquer la tension de puissance directement sur une GPIO de l'ESP32-C6.

---

### 🚧 Évolutions prévues

- [ ] Intégration PWM native dans Natulib OS
- [ ] Commande de bandes LED
- [ ] Contrôle de vitesse des moteurs DC
- [ ] Pilotage de pompes et électrovannes
- [ ] Support de profils PWM dans les recettes Natulib
- [ ] Boîtier avec bornier de puissance intégré

---

### 🔗 Ressources

- 🔧 [NL-401A — PowerSwitch](./NL-401A-PowerSwitch.md)
- ⚡ [NL-207A — Capteur de courant INA219](./NL-207A-Capteur-courant-INA219.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

### 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration du module MOSFET PWM |
