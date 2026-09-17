---
title: "Système — Développement"
parent: Natulib OS
statut: publie
---
[🏠 Accueil](../../index.md) | 🚀 [Installation](../../Installation.md) | 🧱 [Modules](../../Modules.md) | 🏗️ [Projets](../../Projets.md) | 🌱 [Recettes](../../Recettes.md) | 🧠 [Natulib OS](../../Natulib-OS.md) | 🤝 [Contribuer](../../Contribuer.md) | ❓ [FAQ](../../FAQ.md) | [🔗 GitHub](https://github.com/natulib/Natulib)

***

# 🧑‍💻 Système — Développement

Pour s'y retrouver dans le code source du firmware :

| Fichier | Rôle |
|---|---|
| `main.cpp` | Démarrage de la station et boucle principale |
| `natulib_devices.h` | Tous les drivers de capteurs et actionneurs — voir **[Drivers](./drivers.md)** |
| `natulib_api.h` | Toutes les routes de l'API Web — voir **[API REST](./api.md)** |
| `natulib_logic.h` | Le moteur d'automatisations — voir **[Automatisations](./automatisations.md)** |
| `natulib_history.h` | L'historisation des mesures — voir **[Filesystem](./filesystem.md)** |
| `natulib_network.h` | Wi-Fi, MQTT et requêtes sortantes |
| `face_engine.h` | Le rendu des scènes affichées à l'écran |

> 💡 Plusieurs fichiers du firmware contiennent en en-tête des consignes destinées à un assistant IA modifiant le code (invariants à respecter, signatures à ne pas casser…). Elles concernent le code C++ lui-même, pas cette documentation.

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
