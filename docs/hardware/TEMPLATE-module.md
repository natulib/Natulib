---
title: "NL-xxxA — Nom du module"
parent: Modules
ref: NL-xxxA
famille: core | displays | sensors | actuators | power | enclosures | connectivity
etat: valide | test | documente | planifie
montage: sans-outil | sans-soudure | soudure
temps: 10
niveau: debutant | intermediaire | avance
prix: 1
interface: gpio | adc | i2c | spi | pwm
---

[🏠 Accueil](../index.md) | [🚀 Installation](../Installation.md) | [🧱 Modules](../Modules.md) | [🏗️ Projets](../Projets.md) | [🌱 Recettes](../Recettes.md) | [🧠 Natulib OS](../Natulib-OS.md) | [🤝 Contribuer](../Contribuer.md) | [❓ FAQ](../FAQ.md) | 🔗 [GitHub](https://github.com/Natulib/Natulib)

***

# 🧩 NL-xxxA — Nom du module

> 🟢 Validé · 🟢 Sans soudure · 👤 Débutant · ⏱️ 10 min · 💰 ~1 € · 🔌 GPIO

## 👀 En bref

Une phrase décrivant ce que fait le module.

Dans Natulib, il permet notamment de :

- 🌱 usage 1 ;
- 📊 usage 2.

**Alimentation :** 3,3 V · **Sortie :** … · **Calibration :** …

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-xxxA-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Nom du module](../assets/NL-xxxA-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module … | 1 | ✅ | AliExpress |
| Câbles Dupont | 3 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

| Module | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| OUT | GPIOxx | … |

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

---

## ⚙️ Configuration Natulib OS

**Type :** `type`

```json
{
  "id": "identifiant",
  "type": "type",
  "pins": {
    "signal": 0
  },
  "active": true
}
```

---

## 🛠️ Montage en 10 minutes

1. …
2. …

---

## 💡 À retenir

- …

---

## 🚧 Évolutions prévues

- [ ] …

---

## 🔗 Ressources

- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration |
