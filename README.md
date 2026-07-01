<div align="center">

# 🌱 Natulib

### Plateforme Open Source modulaire pour observer, comprendre et automatiser la culture du vivant.

**ESP32 • Impression 3D • Hydroponie • Agriculture Connectée • Edge Computing**

![Status](https://img.shields.io/badge/Status-V0.11-orange?style=flat-square)
![Hardware](https://img.shields.io/badge/Hardware-ESP32--C6-red?style=flat-square)
![License](https://img.shields.io/badge/License-Open%20Source-33a852?style=flat-square)
[![ESP Web Tools](https://img.shields.io/badge/Installer-Flasher_l'ESP-00a2ed?style=flat-square&logo=esphome)](https://natulib.github.io/Natulib/)
[![Discord](https://img.shields.io/badge/Discord-Rejoindre-7289da?style=flat-square&logo=discord)](https://discord.gg/qPMzR2jXK)
[![YouTube](https://img.shields.io/badge/YouTube-Suivre-ff0000?style=flat-square&logo=youtube)](https://www.youtube.com/@Natulib)

> 🚧 **Natulib est un laboratoire Open Source.**
>
> Le projet est développé publiquement, module par module. Les réussites comme les échecs sont documentés afin de construire une plateforme simple, reproductible et ouverte autour de la culture du vivant.

</div>

---

# 🌿 Présentation

Natulib est une plateforme Open Source permettant de créer des systèmes de culture connectés, modulaires et autonomes.

Le projet combine électronique, développement embarqué, impression 3D et observation du vivant afin de concevoir des systèmes de culture connectés, modulaires et facilement reproductibles.

L'objectif n'est pas de remplacer le jardinier, mais de fournir des outils pour mieux observer, mieux comprendre et automatiser les tâches répétitives tout en conservant l'humain au centre des décisions.

---

# ❤️ Principes

## 👀 Observer

Mesurer l'environnement grâce à des capteurs simples et peu coûteux :

* Température / Humidité / Luminosité
* VPD (Déficit de Pression de Vapeur)
* Humidité du sol
* Niveau des réservoirs
* Consommation d'eau / Poids

---

## 🧠 Comprendre

Les données permettent d'analyser une culture et de comprendre les raisons d'une réussite ou d'un échec.

L'observation humaine reste essentielle pour qualifier des informations qu'aucun capteur ne peut mesurer :

* Aspect général de la plante
* Odeur / Goût
* Qualité de la récolte / Satisfaction

---

## 🤖 Automatiser

Natulib peut automatiser différentes tâches :

* Irrigation / Gestion des pompes
* Éclairage / Ventilation / Chauffage
* Alertes et scénarios personnalisés

L'automatisation reste entièrement configurable.

---

## 🔓 Local First

Le système fonctionne entièrement en local sur l'ESP32.

Le Cloud est optionnel et sert uniquement à synchroniser les données ou partager des expériences lorsque l'utilisateur le souhaite.

---

# 😊 Naturochi

Naturochi est l'interface visuelle de Natulib.

Plutôt que d'afficher en permanence des valeurs techniques, un avatar représente l'état général de la culture.

Quelques secondes suffisent pour savoir si tout fonctionne normalement ou si une intervention est nécessaire.

---

# 📚 Les recettes

Les recettes constituent le cœur de Natulib. Une recette décrit une culture reproductible. Elle est composée de deux éléments complémentaires :

### 📖 La fiche recette
La fiche recette est destinée aux utilisateurs. Elle documente notamment les espèces cultivées, les modules nécessaires, les nutriments utilisés, les conseils de culture, les photos, les observations, les résultats obtenus et l'historique des versions.

### ⚙️ Le fichier `recipe.json`
Le fichier de recette est destiné à l'ESP32. Il contient uniquement les informations nécessaires à l'exécution : paramètres de culture, configuration des modules, Synapses (règles d'automatisation) et paramètres système.

Les recettes peuvent être importées, exportées, versionnées et partagées librement entre utilisateurs afin de transformer une expérience de culture en une connaissance reproductible.

---

# 🧩 Architecture modulaire

Natulib est construit comme un ensemble de modules indépendants.

```text
ESP32 Core (NL-001-ESP32C6-16)
├── Écran GC9A01 (NL-101) / Interface Naturochi 
├── Commutateur de puissance intelligent / PowerSwitch (NL-401A)
├── Capteur de climat (NL-103 BME280)
├── Détecteur de proximité (NL-104)
├── Bouton / Encodeur (NL-105)
├── Sonde d'humidité du sol capacitive (NL-106)
├── Module de puissance MOSFET / Pompes (NL-107)
└── ...

```

Chaque module possède sa propre documentation, son firmware de test et, lorsque nécessaire, son boîtier imprimable. L'objectif est de limiter les soudures et de privilégier des composants standards faciles à remplacer.

---

# 📁 Organisation du dépôt

```text
natulib/
├── firmware/          # Firmware ESP32 (PlatformIO - Core CORTEX)
├── hardware/          # Modules matériels et fiches techniques
│   ├── README.md
│   ├── NL-001-ESP32C6-16/  # Noyau central durci (16MB Flash)
│   ├── NL-101-GC9A01/      # Écran circulaire (Visage)
│   ├── NL-103-BME280/      # Sonde Climat atmosphérique
│   ├── NL-104-Proximity/   # Capteur de présence
│   ├── NL-401A-PowerSwitch/# Étage de coupure électrique intelligent
│   └── ...
├── enclosure/         # Boîtiers et pièces 3D imprimables (.STL/.STEP)
├── docs/              # Fichiers de l'installateur Web et documentations
├── recipes/           # Recettes de culture (Basilic, Menthe...)
│   ├── Basilic/
│   │   ├── README.md
│   │   ├── recipe.json
│   │   └── images/
│   └── ...
└── synapses/          # Exemples de règles d'automatisation

```

Chaque module matériel possède sa propre documentation, ses fichiers d'impression 3D, son firmware de test et son historique d'évolution.

---

# 🧠 Les Synapses

Les Synapses permettent de séparer le comportement du système du firmware.

Le matériel reste identique.

Chaque Synapse est composée de conditions et d'actions.

Le comportement évolue simplement en modifiant les règles.

Exemple :

```json
{
  "id": "irrigation",
  "conditions": [
    {
      "sensor": "humidite_sol",
      "op": "<",
      "val": 30
    }
  ],
  "actions": [
    {
      "target": "pompe1",
      "cmd": "on"
    }
  ]
}
```

Les Synapses peuvent être créées ou modifiées depuis l'interface Web sans recompiler le firmware.

---

# 🌐 Connectivité

Natulib expose une API REST locale et prend en charge les protocoles **HTTP** et **MQTT**.

Le système peut fonctionner de manière totalement autonome ou s'intégrer dans un environnement existant.

Exemples d'utilisation :

- Pilotage depuis Home Assistant
- Commande de prises connectées
- Contrôle de pompes, éclairages ou ventilateurs
- Publication des mesures via MQTT
- Communication entre plusieurs appareils Natulib
- Développement d'applications ou tableaux de bord personnalisés

Toutes les fonctionnalités restent disponibles localement, sans dépendance à un service Cloud.

---

# 🚧 Feuille de route

Natulib évolue progressivement module par module.


| Organe / Module | État logiciel | Matériel (V1) / Intégration |
|-----------------|---------------|-----------------------------|
| ESP32 Core (Noyō Cortex) | ✅ Stable | Test OK sur NL-001-ESP32C6-16 |
| Écran GC9A01 (Naturochi) | ✅ Actif | Module NL-101 / Boîtier déporté 3D |
| Coupure Matérielle (Power) | ✅ Actif | Commutateur intelligent NL-401A |
| Capteur Climat (BME280) | ✅ Actif | Tube de protection ventilé |
| Humidité du sol | ✅ Actif | Sonde capacitive isolée |
| Interface Web embarquée | 🚧 En cours | Servie localement via LittleFS |
| Gestion des pompes (MOSFET) | 🚧 En cours | Circuit de puissance unitaire |
| API REST / Local Logger | ✅ Stable | 39 routes / Écriture Flash asynchrone |
| Web Flasher | ✅ Stable | Déploiement universel Web Serial |
| Cloud / IA | 💭 Concept | Synchronisation asynchrone sécurisée |

---

# 🚀 Installation

Deux méthodes sont prévues.

### 🚀 ⚡ Méthode 1 : Flash rapide via le Web (Recommandé)

Le déploiement et le formatage du firmware s'effectuent directement depuis votre navigateur sans installer Python ni aucune ligne de commande, grâce à l'API Web Serial.

[![Flash avec ESP Web Tools](https://img.shields.io/badge/ESP%20Web%20Tools-Flasher%20le%20module-vividcyan?style=for-the-badge&logo=esphome)](https://natulib.github.io/Natulib/)

> 💡 *Note : Nécessite un navigateur compatible Web Serial (Google Chrome, Microsoft Edge ou Opera).*

🔌 Étapes pour programmer la carte :
Connectez votre carte NL-001-ESP32C6-16 en USB-C à votre appareil.

Cliquez sur le bouton ci-dessous pour ouvrir l'installateur :

Cliquez sur Connect, sélectionnez le port de votre puce.

⚠️ TRÈS IMPORTANT : Lors de la première installation, cochez impérativement la case "Erase device" (Effacer l'appareil). Cela nettoiera l'ancienne structure mémoire pour formater et créer la partition géante LittleFS de ~9.8 Mo indispensable au système.

💡 Note d'accès Configuration (Portail Captif) : > Au premier démarrage, la carte génère un réseau Wi-Fi Point d'Accès nommé NOYO-XXXX. Connectez-vous dessus. Si la page de configuration ne s'affiche pas automatiquement à cause des protections HTTPS de votre navigateur, ouvrez un onglet de navigation privée et tapez manuellement l'adresse IP absolue : http://192.168.4.1.



### 🛠️ Méthode 2 : Compilation locale

* Installer VS Code et PlatformIO.
* Cloner le dépôt.
* Ouvrir le dossier `firmware`.
* Compiler et téléverser le firmware sur l'ESP32.

---

# 🤝 Contribuer


Les contributions sont les bienvenues.

Vous pouvez participer en :

* Développement du code embarqué ou web ;
* Conception et amélioration des modules matériels ;
* Réalisation de supports et boîtiers imprimables en 3D ;
* Tests de cultures, suivi agronomique et retours d'expérience ;
* Rédaction de documentations ou partage de recettes de culture ;

---

# 🌍 Vision

Natulib a pour ambition de constituer une bibliothèque ouverte de connaissances autour du vivant.

Les modules matériels, les recettes de culture et les règles d'automatisation sont conçus pour être indépendants, versionnés et librement partageables.

Chaque utilisateur reste libre de conserver ses données localement ou de partager anonymement ses observations afin d'améliorer progressivement les recettes grâce aux retours de la communauté et à l'analyse des données.

À terme, Natulib souhaite rendre les connaissances autour de la culture aussi simples à partager, reproduire et améliorer que du code Open Source.

---

# 📜 Licence

Natulib est un projet Open Source.

Le code, la documentation, les modules matériels et les recettes ont vocation à être librement consultés, réutilisés et améliorés selon les conditions de la licence du projet.

---

# 🌱 À propos

Natulib est développé progressivement, module par module.

Chaque prototype, réussite, erreur et évolution est documenté afin que chacun puisse comprendre le fonctionnement du projet, le reproduire et contribuer à son amélioration.

L'objectif n'est pas seulement de construire un système de culture connecté, mais de créer une bibliothèque ouverte de connaissances autour du vivant.
