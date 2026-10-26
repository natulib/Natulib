---
layout: doc
title: "Communication — Réseau"
parent: Natulib OS
statut: publie
---

# 📡 Réseau et communications

Une station Natulib peut fonctionner localement. Le réseau sert à accéder à l'interface, consulter les mesures et, si nécessaire, communiquer avec d'autres services.

- **Wi-Fi** : connecter la station au réseau domestique.
- **Point d'accès** : retrouver un accès de configuration lorsque la station n'est pas connectée au réseau habituel.
- **MQTT (optionnel)** : envoyer des mesures vers un serveur domotique et, selon la configuration, échanger des commandes.
- **API et WebSocket** : accès aux informations depuis d'autres logiciels ou depuis l'interface.

**Précaution :** ne pas exposer directement l'ESP32 sur Internet. Le transport MQTT sans TLS ne chiffre pas les échanges ; la signature des commandes ne remplace pas cette protection.

La configuration se fait dans **Réseau & Cloud**.


---

[⬅️ Retour à Natulib OS](../Natulib-OS.md)
