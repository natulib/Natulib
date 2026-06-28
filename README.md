<div align="center">

#  Natulib-OS

**Une plateforme open-source pour comprendre, cultiver et partager le vivant.**

[![License: Open Source](https://img.shields.io/badge/License-Open%20Source-33a852.svg?style=flat-square)](#)
[![Status: Expérimental](https://img.shields.io/badge/Status-Exp%C3%A9rimental-fe7d37.svg?style=flat-square)](#)
[![Hardware: ESP32](https://img.shields.io/badge/Hardware-ESP32-red.svg?style=flat-square)](#)

</div>

---

**Natulib-OS** est un firmware open-source pour ESP32 conçu pour transformer un simple microcontrôleur en un compagnon capable d'observer, comprendre et automatiser de petits écosystèmes vivants.

Notre ambition n'est pas seulement de construire un contrôleur horticole.

Nous voulons créer une **infrastructure libre** permettant à chacun de documenter, expérimenter et partager des connaissances reproductibles autour du vivant.


Natulib s'adresse aussi bien :

- 🌱 aux cultures d'intérieur
- 🌿 aux jardins et terrasses
- 💧 à l'hydroponie
- 🐟 à l'aquaponie
- 🍄 aux champignons
- 🪱 à la bioponie et au compostage
- 🐝 aux projets de biodiversité (ruches, nichoirs, stations environnementales...)

La technologie ne remplace pas l'observation humaine.

Elle aide simplement à mieux comprendre le vivant.

---

# 🌍 Notre vision

Aujourd'hui, les connaissances autour de la culture sont dispersées :

- livres
- forums
- vidéos
- expériences personnelles
- savoir-faire locaux

Natulib souhaite transformer ces connaissances en un patrimoine libre, documenté et reproductible.

Notre objectif est qu'une recette de culture puisse être partagée avec la même simplicité qu'un projet GitHub.

Une recette Natulib ne décrit pas uniquement des automatisations.

Elle documente également :

- les variétés utilisées
- les paramètres environnementaux
- les observations
- les résultats obtenus
- les améliorations proposées par la communauté

Notre conviction est simple :

> **Les connaissances autour du vivant devraient être aussi ouvertes que les connaissances autour du logiciel.**

---

# 🌱 Les cinq piliers de Natulib

## 👀 Observer

Collecter des données fiables grâce à des capteurs simples, robustes et accessibles.

---

## 🧠 Comprendre

Transformer les mesures en informations utiles afin d'aider l'utilisateur à prendre les bonnes décisions.

Natulib privilégie l'assistance plutôt que l'automatisation systématique.

---

## ⚙️ Automatiser

Déléguer les tâches répétitives :

- irrigation
- éclairage
- ventilation
- pompes
- alarmes

tout en conservant un contrôle local.

---

## 📚 Documenter

Créer des recettes ouvertes décrivant :

- le matériel
- les paramètres
- les variétés
- les observations
- les résultats

afin qu'elles puissent être reproduites ailleurs.

---

## 🤝 Partager

Construire une bibliothèque ouverte de recettes, de modules matériels et de retours d'expérience accessibles à tous.

---

# 🚀 Fonctionnalités

## 🧠 Natulib-Core

- ✅ Architecture multitâche FreeRTOS
- ✅ Drivers matériels modulaires
- ✅ Registre temps réel optimisé O(1)
- ✅ Cache RAM optimisé
- ✅ Watchdog matériel
- ✅ Journalisation locale

---

## 🌐 Connectivité

- ✅ Interface Web embarquée
- ✅ Point d'accès autonome
- ✅ MQTT
- ✅ API REST
- ✅ ESP-NOW
- 🚧 Synchronisation communautaire (en développement)

---

## 🌿 Automatisation

- ✅ Règles locales ("Synapses")
- ✅ Actions simultanées
- ✅ Décisions locales sans Cloud
- ✅ Historique local
- ✅ Télémétrie

---

## 🎨 Naturochi

Le moteur graphique Naturochi représente l'état du système sous la forme d'un avatar vivant.

Il permet de visualiser rapidement :

- la santé du système
- les alertes
- les besoins des cultures

sans avoir à interpréter des dizaines de graphiques.

---

# 🧩 Philosophie matérielle

Natulib est conçu autour de quelques principes simples :

- 🔓 Open Source
- 🔧 Réparable
- 💰 Peu coûteux
- 🌞 Compatible solaire
- 📡 Fonctionnement hors ligne
- ⚡ Consommation réduite
- 🧠 Intelligence locale (Edge Computing)

L'objectif est de rester indépendant d'un Cloud et d'éviter les composants propriétaires coûteux.

---

# 🛠️ Installation

## Option 1 — Web Flasher

Flashez votre ESP32 directement depuis votre navigateur.

*A venir.*

---

## Option 2 — Développement

```bash
git clone https://github.com/natulib/natulib-os.git
```

Ouvrez le projet avec PlatformIO puis compilez le firmware.

---

# 🧠 Les Synapses

Les Synapses permettent de modifier le comportement du système sans recompiler le firmware.

Exemple :

```json
{
  "id": "arrosage_auto",
  "active": true,
  "conditions": [
    {
      "sensor": "humidite_sol",
      "metric": "value",
      "op": "<",
      "val": 30
    }
  ],
  "actions": [
    {
      "type": "local",
      "target": "pompe1",
      "cmd": "on"
    }
  ]
}
```

Dans cet exemple, la pompe est activée lorsque l'humidité du sol passe sous 30 %.

---

# 📂 Structure du projet

```
natulib-os/
│
├── firmware/          Firmware embarqué (Noyō Cortex)
│   ├── src/
│   └── platformio.ini
│
├── synapses/          Exemples de recettes JSON
├── docs/              Documentation technique
├── assets/            Ressources graphiques Naturochi
├── recipes/           Futures recettes communautaires
├── modules/           Modules matériels
└── wiki/              Guides et tutoriels
```

---

# 🗺️ Roadmap

## 🌱 Phase 1

- Stabilisation du firmware
- Validation matérielle
- Bibliothèque de capteurs
- Système de recettes

## 🌿 Phase 2

- Bibliothèque communautaire
- Web Flasher
- Catalogue de modules
- Boîtiers imprimables

## 🌍 Phase 3

Création d'une bibliothèque ouverte du vivant permettant de partager :

- recettes
- variétés
- modules
- observations
- retours d'expérience

afin de constituer un patrimoine numérique libre autour de la culture et de la biodiversité.

---

# 🤝 Contribuer

Natulib est un projet Open Source.

Vous pouvez contribuer en :

- développant du code
- documentant un module
- proposant une recette
- testant une variété
- améliorant la documentation
- partageant vos observations

Chaque contribution aide à construire une bibliothèque libre des connaissances autour du vivant.

---

# 📜 Licence

Natulib est distribué sous licence Open Source.

Notre objectif est simple :

> **Construire une infrastructure libre qui transforme les connaissances autour du vivant en un patrimoine commun, reproductible et transmissible.**

Parce que les connaissances autour de la nature devraient être aussi ouvertes que celles du logiciel.


---

## 📡 Vision

Natulib cherche à créer un lien simple, résilient et transparent entre la technologie et le monde vivant.

L'objectif est de proposer des outils accessibles permettant de :

* **Comprendre :** Appréhender les besoins réels des plantes et des écosystèmes
* **Traduire :** Transformer les données brutes des capteurs en informations sensibles via une interface émotionnelle dynamique (avatar) 100% personnalisable.
* **Automatiser :** Déléguer les tâches logistiques répétitives pour se recentrer sur l'observation biologique.
* **Partager :** Standardiser un langage commun de "recettes de culture" ouvertes et reproductibles par tous.
* **Expérimenter :** Permettre à chacun, du jardinier urbain au chercheur en agronomie, de prototyper sa propre vision de la bio-résilience.

> ⚠️ **Projet expérimental en développement actif.** > L'architecture logicielle de base est hautement optimisée, mais certaines fonctionnalités cloud et applicatives sont en cours d'évolution et susceptibles de changer de manière majeure.

---

## 🚀 Fonctionnalités actuelles

### 🧠 Noyau & Logique
- ✅ **Système de règles locales ("Synapses") :** Interpréteur de scripts JSON permettant de modifier le comportement des automatisations à la volée sans recompiler.
- ✅ **Architecture multitâche (FreeRTOS) :** Isolation asynchrone des tâches critiques (lecture capteurs, affichage, réseau) pour une stabilité maximale.
- ✅ **Sécurité embarquée :** Gestion de cache RAM optimisée et Watchdog actif anti-blocage.

### 📡 Connectivité & Interfaces
- ✅ **API Web & Serveur embarqué :** Interface Web complète et réactive servie directement par l'ESP32.
- ✅ **Naturochi (Moteur graphique) :** Rendu visuel d'un avatar dynamique dont les expressions miment l'état de santé et les besoins de votre écosystème.
- ✅ **Protocoles IoT standard :** Support MQTT natif pour intégration avec Home Assistant ou Node-RED.
- ✅ **Télémétrie locale :** Stockage temporaire et historique des capteurs en local.
- 🚧 *En cours : Web Flasher universel (Web Serial API) & Synchronisation Cloud native.*

---

## 📦 Structure actuelle du projet

```text
natulib-os/
├── firmware/              → Code source du noyau embarqué (Noyō Cortex)
│   ├── src/               # Code source C++ (API, Drivers matériels, Moteur graphique)
│   └── platformio.ini     # Configuration de l'environnement de build
├── synapses/              → Exemples de recettes d'automatisation au format JSON
├── docs/                  # Documentations techniques et spécifications des capteurs
├── assets/                # Banques d'images et avatars graphiques pour Naturochi
├── cloud/                 # Futur backend distant et centralisation IA
└── wiki/                  → Guides d'utilisation communautaires et tutoriels
```

---

## 🛠️ Installation & Démarrage

### Option 1 : Flashage rapide (Web Flasher)
Utilisez notre **[Installateur Web](URL_VERS_TON_WEB_SERIAL_FLASHER)** pour flasher votre ESP32 directement depuis votre navigateur (Chrome/Edge), sans aucune installation logicielle.

### Option 2 : Compilation & Développement
Pour personnaliser le code source :
1.  Installez **[VS Code](https://code.visualstudio.com/)** avec l'extension **[PlatformIO](https://platformio.org/)**.
2.  Clonez ce dépôt : `git clone https://github.com/natulib/natulib-os.git`.
3.  Ouvrez le dossier dans PlatformIO.
4.  Compilez et téléversez sur votre ESP32.

---

## 🧠 Le concept des "Synapses"

Les Synapses permettent de programmer le comportement de vos actionneurs de manière purement déclarative via des fichiers JSON stockés localement sur l'ESP32, évitant d'avoir à modifier le code C++.

```json
{
  "id": "arrosage_auto",
  "active": true,
  "conditions": [
    {
      "sensor": "humidite_sol",
      "metric": "value",
      "op": "<",
      "val": 30
    }
  ],
  "actions": [
    {
      "type": "local",
      "target": "pompe1",
      "cmd": "on"
    }
  ]
}
```

Exemple de comportement : Si la valeur du capteur d'humidité du sol descend en dessous de 30%, le noyau interprète la règle et active immédiatement la pompe pompe1.

---

## 🌍 À propos & Philosophie

Natulib est un projet sous licence libre, né de la volonté d'explorer la convergence entre électronique sobre, informatique embarquée et agronomie urbaine.

---

## Screenshot

<img width="1233" height="901" alt="Capture d’écran_2026-05-24_16-38-44" src="https://github.com/user-attachments/assets/33a704c9-f806-4e82-809d-7ed2f57d0829" />


---
