<div align="center">

# 🌿 Natulib-OS

**Branchez, flashez, cultivez.**

[![License: Open Source](https://img.shields.io/badge/License-Open%20Source-33a852.svg?style=flat-square)](#)
[![Status: Expérimental](https://img.shields.io/badge/Status-Exp%C3%A9rimental-fe7d37.svg?style=flat-square)](#)
[![Hardware: ESP32](https://img.shields.io/badge/Hardware-ESP32-red.svg?style=flat-square)](#)

</div>

---

**Natulib-OS** est un firmware open-source pour ESP32 dédié à la surveillance et à l'automatisation de petits écosystèmes vivants. Il permet de transformer un ESP32 en un contrôleur modulaire capable de lire des capteurs, prendre des décisions locales et piloter des équipements (pompes, éclairage, relais, etc.) tout en donnant une "conscience" à vos projets grâce au moteur d'avatar, **Naturochi**.

Le projet est utilisé comme base expérimentale pour :

🌱 **Cultures connectées** | 🌡️ **Surveillance environnementale** | 🔌 **Automatisation locale** | 📊 **Collecte de données pour améliorer les recettes de culture**

---
## 📡 Vision

Natulib ne cherche pas à remplacer l'agriculture, mais à fournir une interface technologique entre l'humain et le vivant. 

L'objectif fondamental est de démocratiser des outils robustes pour :
* **Comprendre :** Appréhender les besoins réels des plantes et des écosystèmes.
* **Automatiser :** Déléguer les tâches répétitives pour se concentrer sur l'observation.
* **Partager :** Créer un langage commun de "recettes de culture" ouvertes à tous.
* **Expérimenter :** Permettre à chacun, du jardinier urbain au chercheur, de prototyper sa propre vision de la bio-résilience.

> ⚠️ **Statut du projet :** Projet expérimental en développement actif. La structure évolue au gré des tests de terrain et des retours d'expérience.

---

## 🚀 Pourquoi Natulib ?

*   **Liberté Totale :** Pas de cloud imposé. Vos données, vos capteurs, vos règles de culture (Synapses). Vous restez maître de votre écosystème, en local ou à distance.
*   **Intelligence Embarquée (Natulib-Cortex) :** Grâce à notre moteur de règles **Synapses**, votre système évalue vos conditions de culture en temps réel, sans aucune latence, même sans internet.
*   **Interface Vivante :** Connectez un écran et donnez un visage à votre écosystème avec **Naturochi**. Il réagit à l'environnement, se fatigue, s'éveille et communique l'état de santé de vos modules.
*   **Modularité Infinie :** Commencez avec une seule sonde (Ressources). Évoluez vers la gestion complète de modules de production, de préservation ou de symbiose.

---

## 📦 L'écosystème Natulib

*   **[Natulib-OS](https://github.com/natulib/natulib-os) :** Le firmware central (ce dépôt).
*   **[Natulib-Cortex](https://github.com/natulib/natulib-os/tree/main/natulib-Cortex) :** Le cœur computationnel garantissant la survie de vos écosystèmes.
*   **[Naturochi](https://github.com/natulib/natulib-os/tree/main/naturochi) :** Moteur de rendu graphique pour l'interface émotive.
*   **[Natulib-Dex](https://github.com/natulib/natulib-dex) :** La base de connaissances communautaire. Partagez vos "Synapses" (recettes JSON) pour optimiser vos cultures.

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

Natulib-OS utilise des **Synapses** : des fichiers JSON simples qui définissent vos règles de culture sans avoir à modifier le code.

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

Exemple : Si l'humidité du sol descend sous 30%, Natulib active la pompe automatiquement.

## 🚀 État du projet

Le système est en évolution constante. Voici les fonctionnalités déjà intégrées et celles en cours de déploiement :

### Fonctionnalités disponibles
* **✅ Gestion de capteurs :** Support de multiples sondes via architecture polymorphe.
* **✅ Système "Synapses" :** Règle de calcul et d'automatisation locale en JSON.
* **✅ Connectivité :** Support MQTT natif et API Web locale.
* **✅ Interface :** Dashboard Web embarqué et configuration dynamique.
* **✅ Sécurité :** Watchdog hardware, authentification et protection du système.
* **✅ Télémétrie :** Export de données en temps réel pour analyse.
* **✅ Naturochi :** Optimisation du moteur d'avatar et des animations émotives.

### En développement (Roadmap)

* **🚧 Naturo-Dex :** Finalisation de la bibliothèque communautaire de recettes.
* **🚧 Synchronisation Cloud :** Option de télémétrie distante sécurisée.
* **🚧 Web Flasher :** Outil de déploiement simplifié pour ESP32.

---
