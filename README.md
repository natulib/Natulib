<div align="center">

# 🌿 Natulib-OS

**Branchez, flashez, expérimentez.**

[![License: Open Source](https://img.shields.io/badge/License-Open%20Source-33a852.svg?style=flat-square)](#)
[![Status: Expérimental](https://img.shields.io/badge/Status-Exp%C3%A9rimental-fe7d37.svg?style=flat-square)](#)
[![Hardware: ESP32](https://img.shields.io/badge/Hardware-ESP32-red.svg?style=flat-square)](#)

</div>

---

**Natulib-OS** est un firmware open-source pour ESP32 permettant de surveiller et automatiser de petits écosystèmes vivants : plantes, mini-serres, aquaponie expérimentale ou projets environnementaux.

Le projet sert actuellement de plateforme d'expérimentation pour :

🌱 Cultures connectées  
🌡️ Surveillance environnementale  
🔌 Automatisation locale  
📊 Collecte et partage de données

---

## 📡 Vision

Natulib cherche à créer un lien simple entre technologie et vivant.

L'objectif est de proposer des outils accessibles permettant de :

* **Comprendre :** Appréhender les besoins réels des plantes et des écosystèmes.
* **Automatiser :** Déléguer les tâches répétitives pour se concentrer sur l'observation.
* **Partager :** Créer un langage commun de "recettes de culture" ouvertes à tous.
* **Expérimenter :** Permettre à chacun, du jardinier urbain au chercheur, de prototyper sa propre vision de la bio-résilience.

> ⚠️ Projet expérimental en développement actif.
> Certaines fonctionnalités sont encore en test ou susceptibles d'évoluer.

---

## 🚀 Fonctionnalités actuelles

- ✅ Lecture de capteurs multiples
- ✅ Système de règles locales ("Synapses")
- ✅ API Web embarquée
- ✅ MQTT
- ✅ Dashboard intégré
- ✅ Watchdog et mécanismes de sécurité
- ✅ Télémétrie locale
- ✅ Naturochi (interface émotionnelle)
- 🚧 Synchronisation cloud
- 🚧 Web Flasher
- 
---

## 📦 Structure actuelle du projet

natulib-os/

├── firmware/         → code ESP32
├── synapses/         → recettes JSON
├── docs/             → documentation
├── assets/           → images, avatars Naturochi
├── cloud/            → futur backend
└── wiki/             → guides et documentation

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

Les Synapses permettent de créer des automatisations sans modifier le code.

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

---

## 🌍 À propos

Natulib est un projet libre développé progressivement à travers des expérimentations réelles.

L'idée n'est pas de construire une solution industrielle, mais d'explorer des outils accessibles mêlant électronique, automatisation et vivant.

---
