---
layout: hub
title: Natulib OS
bare: true
rubrique: Natulib · documentation
hero_title: Natulib OS
intro: Le système embarqué qui relie modules, mesures, automatisations, actionneurs et interface utilisateur.
cartes_titre: Explorer Natulib OS
cartes:
- icone: 🖥️
  titre: Interface Web
  description: Studio, Hardware, Synapses et API Explorer.
  url: /natulib-os/interface.html
- icone: 🏛️
  titre: Architecture
  description: Tâches de fond, verrous et démarrage résilient.
  url: /natulib-os/architecture.html
- icone: 🔌
  titre: Drivers
  description: Matériel, métriques et actions exposées.
  url: /natulib-os/drivers.html
- icone: 💾
  titre: Filesystem
  description: Organisation de LittleFS.
  url: /natulib-os/filesystem.html
- icone: ⚙️
  titre: API REST
  description: Interaction HTTP avec la station.
  url: /natulib-os/api.html
- icone: 🧠
  titre: Automatisations
  description: Règles, conditions, temporisations et synapses.
  url: /natulib-os/automatisations.html
- icone: 📈
  titre: Historique
  description: Acquisition et conservation des données.
  url: /natulib-os/historique.html
- icone: 🌐
  titre: Réseau
  description: Wi-Fi, MQTT, HTTP et synchronisation.
  url: /natulib-os/reseau.html
- icone: 🛡️
  titre: Sécurité
  description: Authentification, OTA et watchdog.
  url: /natulib-os/securite.html
- icone: 👨‍💻
  titre: Développement
  description: Organisation et évolution du code.
  url: /natulib-os/developpement.html
---

## 🧠 Une architecture conçue pour fonctionner localement

Natulib OS est conçu pour que les fonctions essentielles d'une station puissent fonctionner **localement sur l'ESP32**.

Une connexion réseau peut permettre la synchronisation, l'accès à l'API, MQTT, le cloud ou d'autres services, mais elle ne doit pas être nécessaire au fonctionnement des automatisations locales essentielles.

La philosophie est simple :

> **Le cloud peut enrichir Natulib, mais il ne doit pas être nécessaire pour que Natulib fonctionne.**

---

## 🔄 Du capteur à l'action

Le fonctionnement général peut être résumé ainsi :

```text
🧱 MODULES
   │
   │ mesures / événements
   ▼
🧠 NATULIB OS
   │
   ├── Acquisition
   ├── État système
   ├── Automatisations
   └── Sécurité
   │
   │ décisions
   ▼
⚡ ACTIONNEURS
   │
   ▼
🌱 MONDE RÉEL
```

Les recettes décrivent le comportement souhaité.

Natulib OS fournit le moteur permettant de transformer ces consignes en décisions et en actions locales.

---

## 🧪 État du projet

Natulib OS est actuellement en **phase R&D**.

L'architecture et certaines fonctionnalités sont opérationnelles et utilisées sur les prototypes, tandis que d'autres composants continuent d'évoluer au fil des essais.

La documentation distingue autant que possible :

- 🟢 **Fonctionnel / validé** — testé sur un prototype ;
- 🟡 **Expérimental** — fonctionnel mais encore en cours de validation ;
- 🔵 **En développement** — prévu ou en cours d'implémentation.

> **Cette documentation décrit l'architecture actuelle de Natulib OS. Elle peut évoluer pendant la phase R&D avant la stabilisation d'une future version.**

---

## 👨‍💻 Pour les développeurs

Cette section s'adresse principalement aux personnes souhaitant comprendre ou contribuer au fonctionnement interne de Natulib OS.

L'utilisateur d'une station Natulib **n'a normalement pas besoin de connaître cette architecture** pour utiliser une recette ou un projet.

La complexité technique doit rester autant que possible **à l'intérieur de Natulib**, afin de conserver une expérience simple pour l'utilisateur final.
