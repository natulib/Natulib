---
title: "Fonctionnement — Interface Web"
parent: Natulib OS
statut: publie
---

# 🖥️ Fonctionnement — Interface Web

Natulib OS embarque sa propre interface Web (servie directement par la station, sans compte ni cloud). C'est elle qui permet de configurer une station sans écrire de JSON à la main. Disponible en français, anglais et espagnol.

## 🗂️ Les onglets du tableau de bord

| Onglet | À quoi il sert |
|---|---|
| **🏠 Tableau de bord** | Avatar animé en direct, état biologique, télémétrie en temps réel, graphique d'historique. |
| **🎨 Studio** | Éditeur du visage affiché à l'écran : profils multiples, mode *Simulateur* (curseurs température/humidité/luminosité pour prévisualiser les réactions), mode *Scènes* (calques empilés), gestionnaire d'images (recadrage et conversion au format écran), export/import de profils à partager. |
| **🔌 Hardware** | L'écran d'installation du matériel : choix de la carte, catalogue d'organes à ajouter avec leur guide de câblage, configuration de chaque module, sauvegarde/restauration complète de la configuration matérielle. C'est l'équivalent visuel des fichiers `/dev/*.json` décrits dans **[Drivers](./drivers.md)**. |
| **⚡ Synapses** | L'éditeur visuel des automatisations : construction d'une règle (Quand / Et que / Alors), import de recettes toutes faites, création de variables internes (« Helpers »). Correspond au moteur décrit dans **[Automatisations](./automatisations.md)**. |
| **📡 Réseau & Cloud** | Configuration Wi-Fi, MQTT et services externes. |
| **💾 Fichiers** | Parcours et gestion du système de fichiers LittleFS. |
| **🛠️ Maintenance** | Redémarrage, réinitialisation, mise à jour du firmware (OTA). |
| **💻 Console** | Journal des logs de la station en direct. |

## 🧭 API Explorer

Une page séparée, accessible sur `/explorer`, permet de tester chaque route de l'**[API REST](./api.md)** directement depuis le navigateur — utile pour découvrir l'API sans écrire de code.

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- 🔌 [Matériel — Drivers](./drivers.md)
- ⚙️ [Fonctionnement — Automatisations](./automatisations.md)
- ⚙️ [Fonctionnement — API REST](./api.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
