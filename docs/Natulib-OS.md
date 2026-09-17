---
title: Natulib OS
nav_order: 6
has_children: true
---
[🏠 Accueil](./index.md) | 🚀 [Installation](./Installation.md) | 🧱 [Modules](./Modules.md) | 🏗️ [Projets](./Projets.md) | 🌱 [Recettes](./Recettes.md) | 🧠 [Natulib OS](./Natulib-OS.md) | 🤝 [Contribuer](./Contribuer.md) | ❓ [FAQ](./FAQ.md) | [🔗 GitHub](https://github.com/natulib/Natulib)

***

# 🧠 Natulib OS

**Natulib OS** est le système d'exploitation embarqué qui pilote les stations Natulib.

Il constitue la couche logicielle qui fait le lien entre les **modules matériels**, les **recettes**, les **automatisations** et les **actions réalisées dans le monde réel**.

Il assure notamment :

- 🔌 la gestion du matériel et des drivers ;
- 📡 l'acquisition et la gestion des données des capteurs ;
- 🧠 l'exécution des automatisations locales ;
- ⚡ la commande des actionneurs ;
- 🌐 les communications réseau ;
- 💾 le stockage et l'historique des données ;
- 👁️ l'interface utilisateur et l'Avatar Natulib ;
- 🛡️ les mécanismes de sécurité et de récupération du système.

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

## 📚 Documentation

- **[🏛️ Architecture](./natulib-os/architecture.md)** —  Organisation générale du système, tâches FreeRTOS, boucle principale, Workers, synchronisation et échanges entre les différents composants.
- **[🔌 Matériel - Drivers](./natulib-os/drivers.md)** — Gestion des modules matériels, drivers, métriques et actions exposées à Natulib OS.
- **[🔌 Matériel - Filesystem](./natulib-os/filesystem.md)** — Organisation du stockage LittleFS et des fichiers utilisés par Natulib OS.
- **[⚙️ Fonctionnement - API REST](./natulib-os/api.md)** — Interface HTTP permettant d'interagir avec la station et d'explorer ses données et fonctionnalités.
- **[⚙️ Fonctionnement - Automatisations](./natulib-os/automatisations.md)** — Fonctionnement du moteur de règles locales, des conditions, des actions, des temporisations et des synapses.
- **[⚙️ Fonctionnement - Historique](./natulib-os/historique.md)** — Acquisition, stockage et archivage des données produites par la station.
- **[🌐 Communication - Réseau & Connectivité](./natulib-os/reseau.md)** — Wi-Fi, MQTT, HTTP et mécanismes de synchronisation avec les services externes.
- **[🛡️ Système - Sécurité](./natulib-os/securite.md)** — Protection mémoire, Watchdog, gestion des erreurs et mécanismes de récupération.
- **[🛡️ Système - Développement](./natulib-os/developpement.md)** — Organisation du code, compilation, architecture logicielle et méthodes pour ajouter ou modifier des composants de Natulib OS.

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
