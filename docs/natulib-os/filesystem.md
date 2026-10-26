---
layout: doc
title: "Système — Fichiers et données"
parent: Natulib OS
statut: publie
---

# 💾 Fichiers et données

Natulib OS utilise **LittleFS**, une zone de stockage interne de l'ESP32, pour conserver les configurations et les données.

| Contenu | Emplacement (pour utilisateurs avancés) |
|---|---|
| Configuration générale | `/config.json` |
| Modules matériels | `/dev/` |
| Règles Synapses | `/synapses/` |
| Affichages personnalisés | `/faces/` et `/face.json` |
| Historique | Fichiers `.jsonl` datés |

Pour l'usage courant, **il n'est pas nécessaire de modifier ces fichiers à la main** : l'interface web s'en charge. Avant une restauration ou une intervention importante, conserver une sauvegarde des réglages.


---

[⬅️ Retour à Natulib OS](../Natulib-OS.md)
