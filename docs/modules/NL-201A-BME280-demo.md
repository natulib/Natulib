---
layout: module
bare: true
title: BME280
reference: NL-201A
categorie: Climat & Air
statut: Validé
soudure: Requise si barrette non montée
niveau: Intermédiaire
duree: 20 min
description: Capteur de température, humidité relative et pression atmosphérique.
presentation: >-
  Le BME280 mesure l'air ambiant et communique avec l'ESP32-C6 en I²C.
  Dans Natulib, ses mesures peuvent alimenter les tableaux de bord,
  les recettes, les automatisations et Naturochi.
fonctions:
  - 🌡️ Température
  - 💧 Humidité
  - 🌦️ Pression
infos_rapides:
  - nom: Alimentation
    valeur: 3,3 V
  - nom: Interface
    valeur: I²C
  - nom: Prix indicatif
    valeur: ≈ 3 €
images:
  - fichier: /assets/starter/bme280/bme280-brochage.svg
    titre: Brochage et connexions
    alt: Schéma de brochage du BME280
  - fichier: /assets/starter/bme280/bme280-illustration.webp
    titre: Illustration du module
    alt: Illustration du module BME280
caracteristiques:
  - nom: Température
    valeur: −40 à +85 °C
  - nom: Humidité relative
    valeur: 0 à 100 % HR
  - nom: Pression
    valeur: 300 à 1 100 hPa
  - nom: Adresse I²C
    valeur: 0x76 ou 0x77
---

> ⚠️ Ne pas confondre BME280 et BMP280 : ce dernier ne mesure pas l'humidité.

## Branchement et montage

1. Soudez la barrette de six broches si nécessaire.
2. Reliez VCC → 3V3, GND → GND, SDA → GPIO4 et SCL → GPIO5.
3. Pour I²C à l'adresse 0x76, reliez CSB → 3V3 et SDO → GND.
4. Placez le capteur dans un endroit ventilé, loin du soleil direct et de la chaleur.

**Attention :** l'ordre des broches varie selon les fabricants. Vérifiez la sérigraphie de votre module.

## Configuration Natulib OS

1. Dans l'interface web Natulib OS, ouvrez **Hardware**.
2. Dans **Climat & Air**, sélectionnez **Capteur BME280 (Air)**.
3. Ajoutez et activez le capteur, puis redémarrez si demandé.

Natulib recherche le capteur sur le bus I²C ; aucun code Arduino n'est nécessaire.

## Matériel nécessaire

- Module BME280 à six broches
- Barrette mâle à souder si nécessaire
- Six fils Dupont adaptés

## Dépannage

- **Non détecté :** vérifier SDA/GPIO4, SCL/GPIO5, CSB/3V3 et SDO/GND.
- **Pas d'humidité :** vérifier qu'il s'agit du BME280 et non du BMP280.
- **Température trop élevée :** éloigner le module des sources de chaleur.

## Configuration avancée

Le driver essaie l'adresse `0x76`, puis `0x77`. D'après la fiche HTML de référence, le champ `address` n'est actuellement pas utilisé.

```json
{
  "id": "climat",
  "type": "bme280",
  "pins": { "sda": 4, "scl": 5 },
  "interval_ms": 60000,
  "active": true
}
```

## Documentation et ressources

- Module complémentaire : NL-202A — BH1750
- [Fiche constructeur Bosch Sensortec BME280](https://www.bosch-sensortec.com/products/environmental-sensors/humidity-sensors-bme280/)
