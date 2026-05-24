<div align="center">

# 🌿 Natulib-OS

**Branchez, flashez, expérimentez.**

<img width="227" height="227" alt="naturochi" src="https://github.com/user-attachments/assets/eec08ba1-d1e8-4bb2-81cc-cfe79c0f30dd" />


[![License: Open Source](https://img.shields.io/badge/License-Open%20Source-33a852.svg?style=flat-square)](#)
[![Status: Expérimental](https://img.shields.io/badge/Status-Exp%C3%A9rimental-fe7d37.svg?style=flat-square)](#)
[![Hardware: ESP32](https://img.shields.io/badge/Hardware-ESP32-red.svg?style=flat-square)](#)

</div>

---
**Natulib-OS** est un firmware open-source pour ESP32 conçu pour surveiller, analyser et automatiser de petits écosystèmes vivants : cultures connectées, mini-serres, systèmes aquaponiques expérimentaux ou stations environnementales isolées.

Propulsé par un noyau multitâche, le projet sert de plateforme d'expérimentation pour :

🌱 **Cultures connectées** (optimisation des apports hydriques et lumineux)  
🌡️ **Surveillance environnementale** (collecte de données climatiques et physico-chimiques)  
🔌 **Automatisation locale** (prise de décision en périphérie / Edge Computing)  
📊 **Télémétrie & Partage** (flux de données ouverts et intégrations tierces)

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

L'idée n'est pas de construire une solution industrielle lourde ou propriétaire, mais de proposer un canevas modulaire, résilient et transparent, redonnant à l'utilisateur le contrôle total sur ses données, ses machines et ses interactions avec le vivant.

---
