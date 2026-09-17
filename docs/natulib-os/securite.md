---
title: "Système — Sécurité"
parent: Natulib OS
statut: publie
---
[🏠 Accueil](../../index.md) | 🚀 [Installation](../../Installation.md) | 🧱 [Modules](../../Modules.md) | 🏗️ [Projets](../../Projets.md) | 🌱 [Recettes](../../Recettes.md) | 🧠 [Natulib OS](../../Natulib-OS.md) | 🤝 [Contribuer](../../Contribuer.md) | ❓ [FAQ](../../FAQ.md) | [🔗 GitHub](https://github.com/natulib/Natulib)

***

# 🛡️ Système — Sécurité

Ce qu'il faut savoir avant d'exposer sa station en dehors d'un réseau local de confiance.

- **L'authentification web ne protège que la page d'accueil.** Si vous activez `use_auth` dans la configuration, un mot de passe est demandé sur `/` — mais pas sur les routes `/api/*`. Toute personne sur le réseau local peut donc appeler l'API sans identifiants. Ne pas exposer la station directement sur internet sans passer par un accès distant sécurisé (VPN, reverse-proxy avec sa propre authentification…).
- **Un seul transfert de fichier à la fois.** Que ce soit un flash OTA, une sauvegarde matérielle ou un upload, un verrou global évite que deux écritures se marchent dessus et corrompent la Flash.
- **Le flash de firmware a un garde-fou.** Natulib OS vérifie que le binaire envoyé correspond à la taille de Flash réelle de la puce et à la variante du firmware (avec ou sans Zigbee) avant de l'installer, pour limiter le risque de brique. Ce contrôle peut être forcé si nécessaire.
- **Les chemins sensibles sont protégés.** Impossible d'écraser `config.json` ou `hardware.json` par un simple upload, ni d'écrire en dehors du dossier de données via un chemin `..`.
- **Le watchdog matériel est désactivé par défaut.** Il peut être activé dans la configuration pour redémarrer automatiquement la station en cas de blocage logiciel.

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- ⚙️ [Fonctionnement — API REST](./api.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
