---
layout: doc
title: "Fonctionnement — API REST"
parent: Natulib OS
statut: publie
---

# 🔗 API REST

Natulib OS propose une API HTTP locale. Elle permet notamment de lire les mesures, voir la configuration matérielle, consulter les historiques et déclencher certaines opérations.

**Pour découvrir l'API sans coder :** ouvrir **API Explorer**, accessible séparément depuis l'interface Natulib.

Quelques accès utiles pour les utilisateurs avancés :

| API | Usage |
|---|---|
| `/api/status` | État de la station |
| `/api/hw_status` | Mesures des périphériques |
| `/api/hw_config` | Configuration du matériel |
| `/api/i2c_scan` | Recherche de périphériques I²C |

D'autres routes concernent les Synapses, les fichiers, les diagnostics et les mises à jour. **Attention : ne pas exposer cette API directement à Internet.**

Pour un usage normal, privilégier les écrans de l'interface web.


---

[⬅️ Retour à Natulib OS](../Natulib-OS.md)
