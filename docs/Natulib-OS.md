---
layout: hub
title: Natulib OS
bare: true
nav_order: 6
has_children: true
rubrique: Natulib · documentation
hero_title: 🧠 Natulib OS
intro: Configurer les modules, consulter les mesures et automatiser une station depuis le navigateur, sans programmer.
cartes_titre: Explorer Natulib OS
cartes:
- icone: 🖥️
  titre: Interface web
  description: Découvrir les onglets et les fonctions de la station.
  url: /natulib-os/interface.html
- icone: 🔌
  titre: Modules et drivers
  description: Configurer un capteur ou un actionneur.
  url: /natulib-os/drivers.html
- icone: ⚡
  titre: Synapses
  description: Créer ou importer des automatisations locales.
  url: /natulib-os/automatisations.html
- icone: 📡
  titre: Réseau
  description: Wi-Fi, MQTT et fonctionnement local.
  url: /natulib-os/reseau.html
- icone: 📈
  titre: Historique
  description: Retrouver les mesures enregistrées.
  url: /natulib-os/historique.html
- icone: 🛡️
  titre: Maintenance et sécurité
  description: Diagnostic, précautions et mises à jour.
  url: /natulib-os/securite.html
- icone: 🏗️
  titre: Architecture
  description: Comprendre les grands principes du firmware.
  url: /natulib-os/architecture.html
- icone: 🔗
  titre: API REST
  description: Explorer les données et les fonctions HTTP.
  url: /natulib-os/api.html
- icone: 💾
  titre: Stockage
  description: Comprendre les fichiers et configurations.
  url: /natulib-os/filesystem.html
- icone: 👨‍💻
  titre: Développement
  description: Trouver les composants du code source.
  url: /natulib-os/developpement.html
---

**Natulib OS transforme une carte ESP32 en station connectée, sans programmation Arduino pour l'utilisateur.** Après installation du firmware, le matériel et les automatisations se configurent depuis un navigateur, sur ordinateur ou téléphone.

## 🌱 Du module à l'automatisation

1. **Brancher** un module (capteur ou actionneur).
2. **L'ajouter** dans l'onglet **Hardware**.
3. **Vérifier ses mesures** dans l'accueil ou la console.
4. **Créer ou importer une recette** dans **Synapses**.

La station privilégie le **fonctionnement local** : les automatisations n'ont pas besoin d'un cloud pour fonctionner. Wi-Fi, MQTT et synchronisation sont des possibilités complémentaires.


## 🧪 Un projet qui évolue avec les essais

Natulib OS est en phase de développement et d'expérimentation. **Un driver présent dans le code n'est pas nécessairement un module validé sur le terrain.** Chaque fiche Module présente sa configuration, ses tests et les améliorations encore envisagées, notamment pour faciliter un montage **sans soudure**.
