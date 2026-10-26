---
layout: doc
title: "Fonctionnement — Synapses"
parent: Natulib OS
statut: publie
---

# ⚡ Automatisations avec Synapses

**Synapses** permet de faire réagir une station à ses mesures, sans programmer.

Une règle se lit simplement : **Quand** une condition est remplie, **alors** Natulib exécute une action. Il est possible de combiner plusieurs conditions et d'ajouter des temporisations pour éviter les déclenchements intempestifs.

**Exemple :** « Si la température dépasse un seuil pendant une durée définie, activer une sortie configurée ». Les seuils et les actions se règlent dans l'interface.

Les **recettes** permettent de retrouver ou partager un ensemble d'automatisations. Avant d'en importer une, vérifier que les modules et les identifiants attendus sont bien présents sur sa station.

Les règles locales restent utilisables sans connexion à un service cloud. Pour aller plus loin, les fichiers correspondants sont stockés dans `/synapses/`.


---

[⬅️ Retour à Natulib OS](../Natulib-OS.md)
