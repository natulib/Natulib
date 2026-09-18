---
title: "NL-208A — Capteur de pluie"
parent: Modules
ref: NL-208A
famille: sensors
etat: test
montage: soudure
temps: 20
niveau: intermediaire
prix: 1
interface: gpio
---

# 🌧️ NL-208A — Capteur de pluie

> 🟡 En test · 🟠 Soudure · 👤 Intermédiaire · ⏱️ 20 min · 💰 ~1 € · 🔌 GPIO / ADC

## 👀 En bref

Le **capteur de pluie** détecte la présence d'eau sur une plaque conductrice.

Natulib peut utiliser cette information pour :

- 🌧️ détecter un épisode de pluie ;
- 🪴 adapter le comportement d'une plante ou d'une recette ;
- 📊 suivre l'humidité présente sur la surface du capteur ;
- ⚡ suspendre un arrosage automatique.

Le module propose deux sorties :

- **DO** : sortie numérique avec seuil réglable ;
- **AO** : sortie analogique permettant d'exploiter une mesure progressive.

**Alimentation :** 3,3 à 5 V · **Sensibilité :** réglable · **Calibration :** seuil DO à régler.

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-208A-Capteur-pluie-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Module capteur de pluie](../assets/NL-208A-Capteur-pluie-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module capteur de pluie | 1 | ✅ | Amazon |
| Câbles Dupont | 3–4 | ✅ | AliExpress |
| Barrette de broches | 1 | ⚠️ | Selon module |

> 💡 Le produit est souvent vendu en lot de 9 modules pour environ 9,99 €, soit ~1,10 € par module.

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

| Capteur | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| DO | GPIO20 | Détection numérique |
| AO *(optionnel)* | GPIO3 | Mesure analogique |

> 💡 Utilisez **DO** pour une simple détection de pluie. **AO** permet d'exploiter une valeur progressive.

> ⚠️ Alimentez le module en **3,3 V** : ses sorties suivent la tension d'alimentation, et un module alimenté en 5 V renverrait 5 V sur une GPIO de l'ESP32-C6.

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

---

## ⚙️ Configuration Natulib OS

**Type :** `rain_analog`

> 🔵 **Correction** — Ce module est en réalité déjà intégré à Natulib OS via le driver `rain_analog` (contrairement à ce qu'indiquait la version précédente de cette fiche).

```json
{
  "id": "pluie",
  "type": "rain_analog",
  "pins": {
    "digital": 20,
    "adc": 3
  },
  "invert": false,
  "calibration": {
    "min": 1400,
    "max": 3200
  },
  "active": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins.digital` | Broche numérique reliée à `DO` |
| `pins.adc` | Broche analogique reliée à `AO` (facultative) |
| `invert` | Inverse la logique de la sortie `DO` (déf. `false`) |
| `calibration.min` / `calibration.max` | Bornes de conversion de la sortie analogique en pourcentage d'intensité (mêmes valeurs par défaut que le driver `analog`, à ajuster selon votre module) |
| `active` | Active / désactive le module |

Le driver expose les métriques `rain_detected` (booléen, basé sur `DO`), `intensity_pct` (basé sur `AO`, si câblé) et `raw`. L'intervalle de lecture par défaut est de 5000 ms (phénomène lent, pas besoin d'une fréquence élevée).

---

## 🛠️ Montage en 20 minutes

1. Soudez les broches du module si elles ne sont pas déjà installées.
2. Connectez le capteur à l'ESP32-C6 selon le tableau de câblage.
3. Utilisez **DO** pour une détection simple ou **AO** pour une mesure analogique.
4. Déposez quelques gouttes d'eau sur la plaque.
5. Réglez le potentiomètre jusqu'au seuil de déclenchement souhaité.
6. Vérifiez la détection dans Natulib OS.

---

## 📏 Calibration

Le potentiomètre règle la sensibilité de la **sortie DO**.

1. Laissez la plaque sèche.
2. Vérifiez l'état de la sortie numérique.
3. Ajoutez progressivement de l'eau sur la plaque.
4. Ajustez le potentiomètre jusqu'au déclenchement souhaité.
5. Répétez le test plusieurs fois pour vérifier la stabilité du seuil.

> 💡 La sortie **AO** n'est pas une mesure pluviométrique calibrée : elle indique l'état d'humidification de la plaque.

---

## 🧩 Problèmes courants

**La détection reste active après la pluie**
→ La plaque sèche lentement ; inclinez-la pour favoriser l'évacuation de l'eau.

**La plaque se corrode**
→ Les pistes s'oxydent à l'usage en extérieur. Prévoyez un remplacement périodique de la plaque, qui est la pièce d'usure du module.

---

## 💡 À retenir

- Alimentez le module en **3,3 V**.
- **DO** fournit une détection numérique avec seuil réglable, **AO** une sortie analogique.
- La plaque doit être exposée à l'eau pour détecter la pluie.
- Évitez de laisser le capteur constamment immergé.
- Pour une installation extérieure, prévoyez une fixation inclinée permettant à l'eau de s'évacuer.
- Séparez la plaque du comparateur : seule la plaque doit être exposée aux intempéries.

---

## 🚧 Évolutions prévues

- [x] Intégration du capteur dans Natulib OS (driver `rain_analog`)
- [ ] Détection automatique pluie / absence de pluie
- [ ] Exploitation de la sortie analogique
- [ ] Support pour boîtier extérieur
- [ ] Support clipsable pour les boîtiers Natulib

---

## 🔗 Ressources

- 🌱 [Recettes d'arrosage](../Recettes.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration du capteur de pluie |
