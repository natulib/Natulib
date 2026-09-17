---
title: "Système — Réseau"
parent: Natulib OS
statut: publie
---
[🏠 Accueil](../../index.md) | 🚀 [Installation](../../Installation.md) | 🧱 [Modules](../../Modules.md) | 🏗️ [Projets](../../Projets.md) | 🌱 [Recettes](../../Recettes.md) | 🧠 [Natulib OS](../../Natulib-OS.md) | 🤝 [Contribuer](../../Contribuer.md) | ❓ [FAQ](../../FAQ.md) | [🔗 GitHub](https://github.com/natulib/Natulib)

***

# 📡 Système — Réseau

- **Wi-Fi avec repli automatique.** Au démarrage, la station essaie de rejoindre le réseau enregistré. Si elle n'y arrive pas, elle crée son propre point d'accès (`NATULIB-<id>`, sans mot de passe, à l'adresse `192.168.4.1`) pour rester configurable depuis un téléphone ou un ordinateur.
- **MQTT optionnel.** Une fois activé avec l'adresse d'un broker, la station peut publier ses mesures et recevoir des commandes. Les automatisations peuvent aussi publier sur un topic de votre choix (voir **[Automatisations](./automatisations.md)**).
- **Suivi en direct dans l'interface Web** via une connexion WebSocket, limitée à 3 onglets ouverts simultanément.
- **Actions HTTP sortantes** : une automatisation peut appeler une URL externe (webhook, service tiers…) sans bloquer le reste de la station.

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- ⚙️ [Fonctionnement — Automatisations](./automatisations.md)
- 🛡️ [Système — Sécurité](./securite.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
