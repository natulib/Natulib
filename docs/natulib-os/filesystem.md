---
title: "Matériel — Filesystem"
parent: Natulib OS
statut: publie
---
[🏠 Accueil](../../index.md) | 🚀 [Installation](../../Installation.md) | 🧱 [Modules](../../Modules.md) | 🏗️ [Projets](../../Projets.md) | 🌱 [Recettes](../../Recettes.md) | 🧠 [Natulib OS](../../Natulib-OS.md) | 🤝 [Contribuer](../../Contribuer.md) | ❓ [FAQ](../../FAQ.md) | [🔗 GitHub](https://github.com/natulib/Natulib)

***

# 🗂️ Matériel — Filesystem

Toute la configuration et les données de Natulib OS vivent sur une partition LittleFS.

| Chemin | Contenu |
|---|---|
| `/config.json` | Configuration globale (Wi-Fi, MQTT, sécurité, historique…) |
| `/hardware.json` | Sauvegarde de la configuration matérielle |
| `/dev/*.json` | Un fichier par périphérique — voir **[Drivers](./drivers.md)** |
| `/synapses/*.json` | Une règle d'automatisation par fichier — voir **[Automatisations](./automatisations.md)** |
| `/faces/`, `/face.json` | Profils et configuration du visage affiché à l'écran |
| `/AAAAMMJJ.jsonl` | Historique du jour, une mesure par ligne |

- Les écritures de fichiers critiques passent par un fichier temporaire puis un renommage, pour ne jamais laisser un fichier à moitié écrit en cas de coupure.
- Les uploads génériques refusent d'écraser `config.json`/`hardware.json` et bloquent tout chemin contenant `..` — voir **[Sécurité](./securite.md)**.

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- 🔌 [Matériel — Drivers](./drivers.md)
- ⚙️ [Fonctionnement — Historique](./historique.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
