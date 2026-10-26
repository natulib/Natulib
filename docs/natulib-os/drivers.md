---
layout: doc
title: "Matériel — Modules et drivers"
parent: Natulib OS
statut: publie
---

# 🔌 Modules et drivers

Chaque module dispose d'un driver dans Natulib OS. L'utilisateur passe normalement par l'onglet **Hardware** : le firmware stocke ensuite la configuration du périphérique.

**Pour ajouter un capteur :** sélectionnez le type de module, vérifiez le câblage indiqué, choisissez les broches si nécessaire, puis enregistrez. La mesure apparaît une fois le capteur correctement branché et reconnu.

Quelques exemples :

| Usage | Modules |
|---|---|
| Climat de l'air | BME280, SCD40 |
| Lumière | BH1750 |
| Humidité du substrat | Sonde capacitive analogique |
| Énergie | INA219 |
| Pilotage | Relais, PWM |
| Pluie | Capteur analogique de pluie |

**À retenir :** une même famille de capteurs peut exister sous différentes cartes électroniques, avec des tensions et des brochages différents. Vérifiez toujours la fiche du modèle réellement utilisé.

📖 Exemple de documentation complète : [NL-201A — BME280](../modules/NL-201A-BME280.md).

*Pour les contributeurs : les paramètres JSON et métriques exacts sont définis dans `natulib_devices.h` et dans les modèles de l'interface Hardware.*

---

[⬅️ Retour à Natulib OS](../Natulib-OS.md)
