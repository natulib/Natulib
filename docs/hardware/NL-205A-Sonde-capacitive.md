---
title: "NL-205A — Sonde capacitive d'humidité du sol V2.0"
parent: Modules
ref: NL-205A
famille: sensors
etat: valide
montage: sans-outil
temps: 2
niveau: debutant
prix: 2
interface: adc
---

# 🌱 NL-205A — Sonde capacitive d'humidité du sol V2.0

> 🟢 Validé · 🟢 Sans outil · 👤 Débutant · ⏱️ 2 min · 💰 ~2 € · 🔌 Analogique

## 👀 En bref

La **sonde capacitive V2.0** mesure l'humidité du sol par variation de capacité, sans électrodes métalliques exposées au substrat.

Elle permet à Natulib de :

- 🌱 surveiller l'humidité d'un pot ou d'une jardinière ;
- 💧 déclencher un arrosage automatique ;
- 📊 suivre l'évolution de l'humidité ;
- 🧠 alimenter les recettes d'automatisation.

**Alimentation :** 3,3 V · **Sortie :** analogique · **Calibration :** nécessaire.

> ⚠️ Utilisez uniquement le modèle **Capacitive Soil Moisture Sensor V2.0** compatible 3,3 V.

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-205A-Sonde-capacitive-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Sonde capacitive V2.0](../assets/NL-205A-Sonde-capacitive-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Sonde capacitive V2.0 | 1 | ✅ | AliExpress |
| Câbles Dupont | 3 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

| Sonde | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| AOUT | GPIO0 | Sortie analogique |

> ⚠️ **Alimentez la sonde en 3,3 V uniquement.**

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

---

## ⚙️ Configuration Natulib OS

**Type :** `soil`

```json
{
  "id": "humidite_sol",
  "type": "soil",
  "pins": {
    "signal": 0
  },
  "calibration": {
    "air": 2800,
    "eau": 1100
  },
  "interval_ms": 60000,
  "active": true
}
```

> ⚠️ Les valeurs de `calibration` sont des ordres de grandeur : remplacez-les par vos propres relevés. Le nom du type doit être confirmé avec la version de Natulib OS utilisée.

---

## 🛠️ Montage en 2 minutes

1. Connectez la sonde à l'ESP32-C6.
2. Plantez la partie verte dans le substrat.
3. Placez-la à une profondeur représentative de la zone racinaire.
4. Évitez d'immerger la partie électronique.
5. Effectuez la calibration avant la première utilisation.

---

## 📏 Calibration

Les valeurs `RAW` varient d'une sonde à l'autre et selon le substrat.

Mesurez au minimum deux références dans votre installation :

| Situation | Valeur RAW |
|---|--:|
| Air libre | ~2600–3000 |
| Terre sèche | à mesurer |
| Terre humide | à mesurer |
| Eau | ~900–1300 |

Ces valeurs servent ensuite de références à **Natulib OS** pour convertir la mesure brute en estimation d'humidité.

> 💡 La calibration doit être réalisée avec **la sonde, le substrat et l'installation réellement utilisés**.

---

## 🧩 Problèmes courants

**La valeur ne bouge pas entre sec et humide**
→ Vérifiez que la sonde est alimentée en 3,3 V et que `AOUT` est bien relié à une GPIO disposant d'une entrée analogique.

**Mesures bruitées**
→ Raccourcissez les câbles et éloignez-les des lignes de puissance.

---

## 💡 À retenir

- Une calibration individuelle est recommandée pour chaque sonde.
- Plantez toujours la sonde à une profondeur similaire.
- Une légère variation des valeurs `RAW` est normale.
- Des câbles courts limitent les parasites sur la mesure analogique.
- Seule la partie prévue pour le sol doit être enfoncée dans le substrat.
- La sonde capacitive évite l'électrolyse associée aux sondes résistives classiques.

---

## 🚧 Évolutions prévues

- [ ] Assistant de calibration dans Natulib OS
- [ ] Enregistrement automatique des valeurs de référence
- [ ] Support de fixation pour les boîtiers Natulib

---

## 🔗 Ressources

- 🌱 [Recettes d'arrosage](../Recettes.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration de la sonde capacitive V2.0 |
