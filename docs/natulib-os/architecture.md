---
layout: doc
title: "Système — Architecture"
parent: Natulib OS
statut: publie
---

# 🏗️ Comment fonctionne Natulib OS ?

Natulib OS rassemble quatre fonctions : **lire les capteurs**, **conserver les mesures**, **évaluer les Synapses** et **piloter les sorties**.

Le firmware organise également les communications réseau et les écritures de fichiers en tâches dédiées, pour que les mesures et les règles locales restent prioritaires. Les ressources partagées, comme le bus I²C, sont coordonnées pour éviter que plusieurs composants les utilisent simultanément.

En cas de problème réseau, la station peut proposer un point d'accès de configuration. Certains drivers, comme celui du BME280, tentent également de retrouver un capteur momentanément indisponible.

Ce fonctionnement interne est transparent pour l'utilisateur : **Hardware** pour les modules, **Synapses** pour les automatisations et **Accueil** pour les résultats.


---

[⬅️ Retour à Natulib OS](../Natulib-OS.md)
