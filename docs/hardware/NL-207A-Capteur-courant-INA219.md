---
title: "NL-207A — Capteur de courant INA219"
parent: Modules
ref: NL-207A
famille: sensors
etat: test
montage: soudure
temps: 10
niveau: intermediaire
prix: 1.5
interface: i2c
---

# ⚡ NL-207A — Capteur de courant INA219

> 🟡 En test · 🟠 Soudure · 👤 Intermédiaire · ⏱️ 10 min · 💰 ~1,50 € · 🔌 I²C

## 👀 En bref

Le **INA219** est un capteur de courant et de tension communiquant en **I²C**.

Il permet à Natulib de surveiller en temps réel la consommation électrique d'un périphérique ou d'une partie de la station.

Il mesure :

- 🔋 la tension ;
- ⚡ le courant ;
- 🔌 la puissance ;
- ↔️ le courant dans les deux sens.

**Plage de tension annoncée :** 0–26 V · **Adresse I²C par défaut :** `0x40` · **Calibration :** dépend du shunt.

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-207A-Capteur-courant-INA219-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Module INA219](../assets/NL-207A-Capteur-courant-INA219-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module INA219 | 1 | ✅ | Amazon / AliExpress |
| Câbles Dupont | 4 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

| INA219 | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| SDA | GPIO4 | Données I²C |
| SCL | GPIO5 | Horloge I²C |

### ⚡ Insertion sur la ligne de puissance

Le INA219 se place **en série sur la ligne d'alimentation** du périphérique à surveiller.

```text
Alimentation +
      │
      ▼
   VIN+ ── INA219 ── VIN- ──► + Périphérique
                              │
Alimentation GND ─────────────┴── GND
```

> ⚠️ Ne branchez pas le INA219 en parallèle sur la charge. Le courant à mesurer doit traverser le **shunt** du module.

### 🔗 Adressage

| A0 | A1 | Adresse |
|:---:|:---:|:---:|
| ouvert | ouvert | `0x40` |
| pontée | ouvert | `0x41` |
| ouvert | pontée | `0x44` |
| pontée | pontée | `0x45` |

> 💡 Quatre adresses permettent de placer jusqu'à quatre INA219 sur le même bus I²C.

---

## ⚙️ Configuration Natulib OS

**Type :** `ina219`

```json
{
  "id": "energie",
  "type": "ina219",
  "pins": {
    "sda": 4,
    "scl": 5
  },
  "address": "0x40",
  "shunt_ohm": 0.1,
  "interval_ms": 10000,
  "active": true
}
```

> ⚠️ La valeur `shunt_ohm` doit correspondre au shunt réellement monté sur votre module. La plupart des modules du commerce utilisent 0,1 Ω, mais ce n'est pas systématique : vérifiez le marquage avant de fixer les paramètres de calibration.

---

## 🛠️ Montage en 10 minutes

1. Soudez la barrette de broches si le module en est dépourvu.
2. Connectez `VCC`, `GND`, `SDA` et `SCL` à l'ESP32-C6.
3. Insérez le INA219 **en série** sur l'alimentation du périphérique à surveiller.
4. Vérifiez le sens `VIN+` → `VIN-`.
5. Mettez le circuit sous tension.
6. Vérifiez les mesures de tension et de courant dans Natulib OS.

---

## 🧩 Problèmes courants

**Le courant lu est toujours nul**
→ Le module est branché en parallèle, ou le sens `VIN+` / `VIN-` est inversé.

**Deux INA219 ne sont pas vus simultanément**
→ Les deux modules partagent l'adresse `0x40` ; pontez A0 ou A1 sur l'un d'eux.

---

## 💡 À retenir

- Le INA219 mesure **tension, courant et puissance**.
- Il communique en **I²C** et cohabite avec les autres capteurs du bus.
- Le courant peut être mesuré dans les **deux directions**.
- La tension maximale annoncée pour ce module est de **26 V**.
- Le courant mesuré doit traverser le **shunt intégré**.
- Le module peut moyenner plusieurs échantillons pour réduire le bruit.
- La précision réelle dépend du **shunt monté** et de sa configuration.

---

## 🚧 Évolutions prévues

- [ ] Affichage de la consommation instantanée dans Natulib OS
- [ ] Historique de consommation
- [ ] Alertes en cas de surconsommation
- [ ] Support de plusieurs INA219 sur le même bus I²C

---

## 🔗 Ressources

- 🔧 [NL-401A — PowerSwitch](./NL-401A-PowerSwitch.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration du INA219 |
