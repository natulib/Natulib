---
title: "Jardinière aromatique et radis"
parent: Projets
ref: PRJ-002
statut: planifie
niveau: debutant
temps: 1h
---

# 🌿🥕 Jardinière aromatique et radis

> 🚧 **Projet à l'état de planification.** Le câblage ci-dessous est une proposition de départ, pas encore validée sur prototype.

## 👀 En bref

Une jardinière d'intérieur ou de balcon pour cultiver des **aromates** (basilic, persil, ciboulette…) et des **radis**, avec surveillance de l'humidité du sol, de la luminosité et arrosage automatique déclenché par seuil.

Objectifs :

- 💧 maintenir un substrat humide sans excès, adapté à des racines superficielles (radis) et à des aromates sensibles au dessèchement ;
- ☀️ suivre l'ensoleillement reçu par la jardinière ;
- 🌡️ suivre la température ambiante ;
- 📺 afficher l'état de la jardinière sur l'écran Naturochi.

**Niveau :** débutant · **Temps de montage :** ~1h · **Budget indicatif :** ~25 €

---

## 🧱 Modules utilisés

| Module | Rôle dans ce projet |
|---|---|
| [NL-001A](../hardware/NL-001A-ESP32-C6-N16.md) | Carte principale, exécute Natulib OS |
| [NL-002A](../hardware/NL-002A-ESP32-Expansion-Shield.md) | Raccordement sans soudure |
| [NL-205A](../hardware/NL-205A-Sonde-capacitive.md) | Humidité du substrat |
| [NL-201A](../hardware/NL-201A-BME280.md) | Température, humidité de l'air, pression |
| [NL-202A](../hardware/NL-202A-BH1750.md) | Luminosité reçue par la jardinière |
| [NL-402A](../hardware/NL-402A-Mosfet-PWM.md) | Commande de la pompe d'arrosage |
| [NL-101A](../hardware/NL-101A-GC9A01.md) | Affichage de l'état (optionnel) |

---

## 🔌 Plan de brochage

| Module | Signal | GPIO recommandé | GPIO câblé dans ce projet | Écart / raison |
|---|---|:---:|:---:|---|
| [NL-205A](../hardware/NL-205A-Sonde-capacitive.md) | AOUT | GPIO0 | GPIO0 | — |
| [NL-201A](../hardware/NL-201A-BME280.md) | SDA / SCL | GPIO4 / GPIO5 | GPIO4 / GPIO5 | — |
| [NL-202A](../hardware/NL-202A-BH1750.md) | SDA / SCL | GPIO4 / GPIO5 | GPIO4 / GPIO5 | Partagé avec NL-201A — bus I²C, pas un conflit |
| [NL-402A](../hardware/NL-402A-Mosfet-PWM.md) | IN / PWM | GPIO6 | GPIO6 | — |
| [NL-101A](../hardware/NL-101A-GC9A01.md) | SCLK / MOSI / DC / CS / RST / BL | GPIO18/19/23/7/22/2 | GPIO18/19/23/7/22/2 | — |

> 💡 BME280 et BH1750 partagent le même bus I²C (GPIO4/GPIO5) : c'est le fonctionnement normal du bus, pas un conflit à arbitrer. Ils restent distingués par leur adresse (`0x76` et `0x23`).

> ✅ Aucun écart par rapport aux recommandations dans ce projet : les modules choisis n'entrent pas en conflit de GPIO entre eux.

---

## 🛒 Liste de courses

| Composant | Qté | Fiche |
|---|--:|---|
| ESP32-C6 N16 | 1 | [NL-001A](../hardware/NL-001A-ESP32-C6-N16.md) |
| Expansion Shield | 1 | [NL-002A](../hardware/NL-002A-ESP32-Expansion-Shield.md) |
| Sonde capacitive V2.0 | 1 | [NL-205A](../hardware/NL-205A-Sonde-capacitive.md) |
| BME280 | 1 | [NL-201A](../hardware/NL-201A-BME280.md) |
| BH1750 | 1 | [NL-202A](../hardware/NL-202A-BH1750.md) |
| Module MOSFET PWM | 1 | [NL-402A](../hardware/NL-402A-Mosfet-PWM.md) |
| Écran rond GC9A01 | 1 | [NL-101A](../hardware/NL-101A-GC9A01.md) *(optionnel)* |
| Mini-pompe DC + tuyau | 1 | Selon projet |
| Bac ou jardinière avec réserve d'eau | 1 | Selon projet |

---

## ⚙️ Configuration Natulib OS

```json
{
  "modules": [
    {
      "id": "humidite_sol",
      "type": "soil",
      "pins": { "signal": 0 },
      "calibration": { "air": 2800, "eau": 1100 },
      "interval_ms": 60000,
      "active": true
    },
    {
      "id": "climat",
      "type": "bme280",
      "pins": { "sda": 4, "scl": 5 },
      "address": "0x76",
      "interval_ms": 60000,
      "active": true
    },
    {
      "id": "soleil_lux",
      "type": "bh1750",
      "pins": { "sda": 4, "scl": 5 },
      "interval_ms": 60000,
      "active": true
    },
    {
      "id": "pompe_arrosage",
      "type": "pwm",
      "pins": { "signal": 6 },
      "duty": 0,
      "active": true
    }
  ]
}
```

---

## 🛠️ Montage

1. Installez [NL-001A](../hardware/NL-001A-ESP32-C6-N16.md) sur le [NL-002A](../hardware/NL-002A-ESP32-Expansion-Shield.md).
2. Plantez la [NL-205A](../hardware/NL-205A-Sonde-capacitive.md) dans le substrat, à profondeur représentative des racines de radis.
3. Positionnez le [NL-201A](../hardware/NL-201A-BME280.md) et le [NL-202A](../hardware/NL-202A-BH1750.md) hors du feuillage direct, à l'air libre.
4. Reliez le [NL-402A](../hardware/NL-402A-Mosfet-PWM.md) à la pompe et à son alimentation dédiée.
5. Calibrez la sonde d'humidité (air libre / eau) avant la première utilisation.
6. Démarrez Natulib OS et vérifiez les mesures avant de brancher la pompe en fonctionnement automatique.

---

## 🌱 Recette / automatisation associée

*(à rédiger)* — arrosage déclenché lorsque l'humidité du sol descend sous un seuil, avec une durée d'arrosage courte et répétée plutôt qu'un arrosage long, adapté aux racines superficielles du radis.

---

## 🧩 Problèmes courants

**La pompe fonctionne mais le substrat reste sec**
→ Vérifiez que le tuyau atteint bien la zone racinaire et que la pompe est amorcée.

**Les deux capteurs I²C ne sont pas détectés ensemble**
→ Vérifiez que le BME280 est bien câblé en mode I²C (CSB → 3,3 V) et que les deux modules n'utilisent pas la même adresse.

---

## 🚧 Évolutions prévues

- [ ] Recette complète d'arrosage par seuil
- [ ] Historique d'humidité sur plusieurs jours
- [ ] Alerte en cas de niveau d'eau bas dans la réserve

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première ébauche du projet, non testée sur prototype |
