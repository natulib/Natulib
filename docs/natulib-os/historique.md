---
title: "Fonctionnement — Historique"
parent: Natulib OS
statut: publie
---
[🏠 Accueil](../../index.md) | 🚀 [Installation](../../Installation.md) | 🧱 [Modules](../../Modules.md) | 🏗️ [Projets](../../Projets.md) | 🌱 [Recettes](../../Recettes.md) | 🧠 [Natulib OS](../../Natulib-OS.md) | 🤝 [Contribuer](../../Contribuer.md) | ❓ [FAQ](../../FAQ.md) | [🔗 GitHub](https://github.com/natulib/Natulib)

***

# ⚙️ Fonctionnement — Historique

Acquisition, stockage et archivage des données produites par la station.

- **Deux temps d'écriture.** Les mesures sont d'abord accumulées en mémoire (environ 9 h de rétention), puis écrites sur la Flash par lots — pour ménager la durée de vie de la mémoire. Un redémarrage brutal ne perd pas les points déjà en attente d'écriture.
- **Sources multiples.** En plus des capteurs branchés, l'historique peut recevoir des mesures externes via l'API (`/api/sensor`) ou via une automatisation MQTT.
- **Purge automatique.** Les fichiers d'historique plus anciens que la durée de rétention configurée sont supprimés chaque jour.
- **Consultation** possible via l'interface Web, ou directement via l'API (`/api/history_file`, `/api/history_ram`) — voir **[API REST](./api.md)**.

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- 🗂️ [Matériel — Filesystem](./filesystem.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
