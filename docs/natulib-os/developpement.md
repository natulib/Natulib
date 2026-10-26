---
layout: doc
title: "Système — Développement"
parent: Natulib OS
statut: publie
---

# 👨‍💻 Pour contribuer au code

L'utilisateur de Natulib OS n'a pas besoin de compiler de code. Cette page sert uniquement à ceux qui veulent comprendre ou faire évoluer le firmware.

| Partie | Fichier principal |
|---|---|
| Démarrage | `main.cpp` |
| Modules et capteurs | `natulib_devices.h` |
| Interface HTTP | `natulib_api.h` |
| Synapses | `natulib_logic.h` |
| Réseau | `natulib_network.h` |
| Historique | `natulib_history.h` |
| Diagnostics | `natulib_diagnostics.h` |
| Affichage | `face_engine.h` |

Les fichiers d'interface web (HTML et JavaScript) sont également séparés du cœur C++.

Pour proposer une amélioration : documenter le besoin, vérifier son fonctionnement, puis préciser les essais réalisés.


---

[⬅️ Retour à Natulib OS](../Natulib-OS.md)
