---
title: "Fonctionnement — API REST"
parent: Natulib OS
statut: publie
---
[🏠 Accueil](../../index.md) | 🚀 [Installation](../../Installation.md) | 🧱 [Modules](../../Modules.md) | 🏗️ [Projets](../../Projets.md) | 🌱 [Recettes](../../Recettes.md) | 🧠 [Natulib OS](../../Natulib-OS.md) | 🤝 [Contribuer](../../Contribuer.md) | ❓ [FAQ](../../FAQ.md) | [🔗 GitHub](https://github.com/natulib/Natulib)

***

# ⚙️ Fonctionnement — API REST

Natulib OS expose une API HTTP locale pour piloter la station, lire sa télémétrie et gérer ses fichiers. Toutes les routes commencent par `/api/`, sauf mention contraire.

> 💡 Aucune route de l'API n'est protégée par mot de passe, même si l'authentification web est activée — voir **[Sécurité](./securite.md)**. Un explorateur de routes interactif est disponible sur `/explorer`.

## 📊 Statut et pilotage

| Route | Rôle |
|---|---|
| `status` | État complet de la station + toute la télémétrie |
| `hw_status` | Télémétrie des périphériques seule |
| `hw_action?cmd=...` | Envoie une commande (`on_<id>`, `toggle_<id>`…) à tous les périphériques |
| `device/trigger?id=...` | Force la lecture immédiate d'un périphérique |

## ⚙️ Configuration matérielle

| Route | Rôle |
|---|---|
| `hw_config` | Récupère la configuration de tous les périphériques |
| `hw_save` | Sauvegarde globale de la configuration matérielle (redémarre) |

## 📡 Réseau et configuration globale

| Route | Rôle |
|---|---|
| `scan_wifi` | Scanne les réseaux Wi-Fi à proximité |
| `save_config` | Met à jour la configuration (Wi-Fi, MQTT, sécurité, historique…) |
| `logs` | Journal en direct de la station |

## 💾 Fichiers

| Route | Rôle |
|---|---|
| `files` / `list` | Liste les fichiers d'un dossier |
| `delete` / `mkdir` | Supprime / crée un fichier ou dossier |
| `download` | Télécharge un fichier |
| `restore_file` | Restaure une sauvegarde `.bak` |
| `cleanup` | Supprime toutes les sauvegardes `.bak` |

## 📤 Mises à jour (OTA)

| Route | Rôle |
|---|---|
| `upload` | Dépose un fichier sur la station (protège `config.json`/`hardware.json`) |
| `flash` | Met à jour le firmware ou le système de fichiers, avec vérifications anti-brique |
| `reboot` / `format` | Redémarre / réinitialise complètement la station |

## 🧠 Automatisations

| Route | Rôle |
|---|---|
| `synapses_config` | Liste les règles d'automatisation |
| `synapse_save` | Crée ou modifie une règle |
| `synapse_toggle` | Active/désactive une règle |
| `synapses_clear` | Supprime des règles en masse |

## 🛠️ Autres routes utiles

| Route | Rôle |
|---|---|
| `history_file` / `history_ram` / `flush_history` | Consultation et export de l'historique |
| `telemetry_purge` | Purge la télémétrie en mémoire |
| `i2c_scan` | Détecte les capteurs I²C branchés |
| `sensor?key=...&value=...` | Injecte une mesure externe dans l'historique |
| `nodes` / `node_action` | Registre et pilotage des nœuds distants |
| `set_time` | Lit ou corrige l'heure de la station |

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- 🔌 [Matériel — Drivers](./drivers.md)
- ⚙️ [Fonctionnement — Automatisations](./automatisations.md)
- 🛡️ [Système — Sécurité](./securite.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
