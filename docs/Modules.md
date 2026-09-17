---
title: Modules
nav_order: 3
has_children: true
---
[🏠 Accueil](./index.md) | 🚀 [Installation](./Installation.md) | 🧱 [Modules](./Modules.md) | 🏗️ [Projets](./Projets.md) | 🌱 [Recettes](./Recettes.md) | 🧠 [Natulib OS](./Natulib-OS.md) | 🤝 [Contribuer](./Contribuer.md) | ❓ [FAQ](./FAQ.md) | [🔗 GitHub](https://github.com/natulib/Natulib)

***

# 🧱 Modules

Les modules sont les briques matérielles réutilisables de Natulib.

Chaque fiche regroupe la documentation complète d'un module : présentation, composants, câblage, configuration Natulib OS, montage, et lorsqu'ils existent schéma électronique, PCB, boîtier, fichiers d'impression 3D et firmware.

> 💡 **États :** 🟢 Validé (testé sur une station réelle) · 🟡 En test · 🔵 Documenté, non testé · ⚪ Planifié.

---

## 🔢 Plan de numérotation

| Série | Famille | Contenu |
|---|---|---|
| **000** | 🔴 Core | Cartes principales et électronique de contrôle |
| **100** | 📺 Displays | Affichage et interfaces utilisateur |
| **200** | 🌡️ Sensors | Capteurs et acquisition de données |
| **300** | ⚡ Actuators | Actionneurs pilotés (relais, moteurs, pompes) |
| **400** | 🔋 Power | Alimentation, commutation et gestion de l'énergie |
| **500** | 📦 Enclosures | Boîtiers et éléments mécaniques |
| **600** | 📡 Connectivity | Communication et extensions |

La lettre suffixe (`A`, `B`, …) indique la **révision** du module, pas une variante fonctionnelle.

---

## 🔴 000 — Core

*Cartes principales et électronique de contrôle.*

| Référence | Module | État | Montage | Temps | Niveau | Prix | Description |
|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **[NL-001A](./hardware/NL-001A-ESP32-C6-N16.md)** | ESP32-C6 N16 | 🟢 Validé | 🟢 Sans outil | 2 min | 👤 Débutant | ~8 € | Carte principale exécutant Natulib OS. |
| **[NL-002A](./hardware/NL-002A-ESP32-Expansion-Shield.md)** | Expansion Shield 30 broches | 🟢 Validé | 🟢 Sans outil | 2 min | 👤 Débutant | ~2–4 € | Borniers à vis pour raccorder les modules sans soudure. |

---

## 📺 100 — Displays

*Affichage et interfaces utilisateur.*

| Référence | Module | État | Montage | Temps | Niveau | Prix | Interface | Description |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **[NL-101A](./hardware/NL-101A-GC9A01.md)** | Écran rond GC9A01 | 🟢 Validé | 🟢 Sans outil | 5 min | 👤 Débutant | ~5 € | SPI | Affichage principal de Naturochi. |

---

## 🌡️ 200 — Sensors

*Capteurs et acquisition de données.*

| Référence | Module | État | Montage | Temps | Niveau | Prix | Interface | Description |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **[NL-201A](./hardware/NL-201A-BME280.md)** | BME280 | 🟢 Validé | 🟠 Soudure | 20 min | 👤 Intermédiaire | ~3 € | I²C | Température, humidité et pression atmosphérique. |
| **[NL-202A](./hardware/NL-202A-BH1750.md)** | BH1750 | 🟢 Validé | 🟠 Soudure | 20 min | 👤 Intermédiaire | ~2 € | I²C | Luminosité ambiante en lux. |
| **[NL-203A](./hardware/NL-203A-PIR-HC-SR501.md)** | PIR HC-SR501 | 🟢 Validé | 🟢 Sans soudure | 5 min | 👤 Débutant | ~2 € | GPIO | Détection de mouvement. |
| **[NL-204A](./hardware/NL-204A-Detecteur-IR-TCRT5000.md)** | Détecteur IR TCRT5000 | 🟢 Validé | 🟢 Sans soudure | 5 min | 👤 Débutant | ~1 € | GPIO / ADC | Détection de proximité à très courte distance. |
| **[NL-205A](./hardware/NL-205A-Sonde-capacitive.md)** | Sonde capacitive V2.0 | 🟢 Validé | 🟢 Sans outil | 2 min | 👤 Débutant | ~2 € | Analogique | Humidité du sol, calibration nécessaire. |
| **[NL-206A](./hardware/NL-206A-Capteur-tactile-TTP223.md)** | Capteur tactile TTP223 | 🟢 Validé | 🟢 Sans soudure | 5 min | 👤 Débutant | ~1 € | GPIO | Bouton tactile capacitif sans contact mécanique. |
| **[NL-207A](./hardware/NL-207A-Capteur-courant-INA219.md)** | Capteur de courant INA219 | 🟡 En test | 🟠 Soudure | 10 min | 👤 Intermédiaire | ~1,50 € | I²C | Mesure de tension, courant et puissance. |
| **[NL-208A](./hardware/NL-208A-Capteur-pluie.md)** | Capteur de pluie | 🟡 En test | 🟠 Soudure | 20 min | 👤 Intermédiaire | ~1 € | GPIO / ADC | Détection d'eau sur plaque conductrice (DO + AO). |

---

## ⚡ 300 — Actuators

*Actionneurs pilotés.*

| Référence | Module | État | Montage | Temps | Niveau | Prix | Description |
|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| *(à venir)* | Relais | ⚪ Planifié | — | — | — | ~2 € | Commutation de charges alimentées séparément. |
| *(à venir)* | Pompe d'arrosage | ⚪ Planifié | — | — | — | — | Pompe DC pilotée par le [NL-402A](./hardware/NL-402A-Mosfet-PWM.md). |

---

## 🔋 400 — Power

*Alimentation, commutation et gestion de l'énergie.*

| Référence | Module | État | Montage | Temps | Niveau | Prix | Description |
|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **[NL-401A](./hardware/NL-401A-PowerSwitch.md)** | PowerSwitch PN2222A | 🟢 Validé | 🟠 Soudure | 20 min | 👤 Intermédiaire | ~1 € | Coupure d'alimentation côté masse, petites charges. |
| **[NL-402A](./hardware/NL-402A-Mosfet-PWM.md)** | Module MOSFET PWM | 🟡 En test | 🟠 Soudure | 20 min | 👤 Intermédiaire | ~1 € | Commande de charge DC en tout-ou-rien ou en PWM. |

---

## 📦 500 — Enclosures

*Boîtiers et éléments mécaniques.*

| Référence | Module | État | Montage | Temps | Niveau | Prix | Description |
|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| *(à venir)* | Boîtier station d'intérieur | ⚪ Planifié | — | — | — | — | Boîtier imprimable avec façade pour écran rond. |

---

## 📡 600 — Connectivity

*Communication et extensions.*

| Référence | Module | État | Montage | Temps | Niveau | Prix | Description |
|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| *(à venir)* | RTC DS3231 | ⚪ Planifié | — | — | — | ~2 € | Horloge temps réel I²C. |

---

## 🔌 GPIO et brochage

Chaque fiche module propose un **GPIO recommandé** — un câblage de référence qui fonctionne pour un montage isolé de ce module seul.

Dans une station réelle, plusieurs modules cohabitent sur le même ESP32-C6, qui dispose de moins de GPIO que Natulib ne compte de modules au catalogue. **Le brochage réel n'est donc jamais figé au niveau du module : il est décidé projet par projet.**

C'est la fiche de chaque **[Projet](./Projets.md)** qui documente :
- la liste des modules effectivement utilisés ;
- le GPIO réellement câblé pour chacun ;
- les écarts par rapport à la recommandation, et pourquoi, en cas de conflit.

> 💡 Exception : les capteurs **I²C** (BME280, BH1750, INA219) partagent nativement les mêmes broches SDA / SCL — ce n'est pas un conflit, c'est le fonctionnement normal du bus. Chaque capteur reste distingué par son adresse I²C.

---

## ⚡ Rappels de sécurité

- Les GPIO de l'ESP32-C6 fonctionnent en **3,3 V**. N'appliquez jamais une tension supérieure sur une GPIO.
- Coupez l'alimentation avant toute modification du câblage.
- Un GPIO **commande** un étage de puissance ([NL-401A](./hardware/NL-401A-PowerSwitch.md), [NL-402A](./hardware/NL-402A-Mosfet-PWM.md)) ; il n'alimente jamais la charge.
- Pour les charges inductives (moteurs, pompes, électrovannes), prévoyez les protections adaptées aux transitoires.

---

## ✍️ Ajouter un module

Partez du gabarit **[TEMPLATE-module.md](./hardware/TEMPLATE-module.md)** et suivez le guide **[Contribuer](./Contribuer.md)**.

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| 2 | Ajout des NL-204A à NL-208A et du NL-402A · correction des références et des liens · plan de brochage, GPIO réservés et adresses I²C |
| 1 | Première page d'index des modules |
