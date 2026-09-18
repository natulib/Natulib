---
title: "NL-206A — Capteur tactile capacitif TTP223"
parent: Modules
ref: NL-206A
famille: sensors
etat: valide
montage: sans-soudure
temps: 5
niveau: debutant
prix: 1
interface: gpio
---

# 👆 NL-206A — Capteur tactile capacitif TTP223

> 🟢 Validé · 🟢 Sans soudure · 👤 Débutant · ⏱️ 5 min · 💰 ~1 € · 🔌 GPIO

## 👀 En bref

Le **TTP223** est un capteur tactile capacitif qui transforme une simple surface conductrice en **bouton sans contact mécanique**.

Dans Natulib, il peut être utilisé pour :

- 👆 réveiller Naturochi ;
- 📺 changer d'affichage ;
- 🌱 déclencher une action ou une recette ;
- 🔘 créer un bouton tactile intégré à la façade d'un boîtier.

**Alimentation :** 3,3 V · **Sortie :** numérique · **Consommation :** ~3 mA · **Calibration :** automatique à la mise sous tension.

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-206A-Capteur-tactile-TTP223-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Module TTP223 installé derrière une façade](../assets/NL-206A-Capteur-tactile-TTP223-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module tactile capacitif TTP223 | 1 | ✅ | AliExpress |
| Câbles Dupont | 3 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

| TTP223 | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| I/O | GPIO11 | Détection tactile |

> 💡 Le TTP223 fournit une sortie numérique : la GPIO passe à l'état actif lorsque la surface tactile est sollicitée.

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

---

## ⚙️ Configuration Natulib OS

**Type :** `button`

```json
{
  "id": "bouton_tactile",
  "type": "button",
  "pins": {
    "pin": 11
  },
  "pullup": false,
  "invert": false,
  "active": true,
  "debug": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins.pin` | Broche numérique reliée à `I/O` |
| `pullup` | Résistance de tirage interne (déf. `true` — ici `false` car le TTP223 pilote activement sa sortie) |
| `invert` | Inverse la logique de détection (déf. `true` — ici `false`) |
| `active` | Active / désactive le module |
| `debug` | Journalisation détaillée |

Le driver `button` produit la métrique `pressed`.

> 🔵 Les champs `metrics`, `actions` et `mA` que l'on peut trouver dans des fichiers `/dev/*.json` existants sont des **métadonnées d'interface** (utilisées par l'éditeur Web pour afficher les capacités du module) : le driver `button` de Natulib OS ne les lit pas au runtime et leur présence ou absence n'a aucun effet sur son fonctionnement. Voir **[Drivers](../natulib-os/drivers.md)**.

---

## 🛠️ Montage en 5 minutes

1. Connectez le TTP223 à l'ESP32-C6 selon le tableau de câblage.
2. Reliez `I/O` à **GPIO11**.
3. Placez la surface tactile derrière la façade pour créer un bouton invisible.
4. Testez la détection tactile avec Natulib OS.
5. Ajoutez ensuite l'action souhaitée dans votre configuration.

---

## 🧩 Problèmes courants

**Le bouton reste actif en permanence**
→ Le module s'auto-calibre à la mise sous tension : ne touchez pas la zone tactile pendant le démarrage.

**Aucune détection à travers la façade**
→ La façade est trop épaisse ou contient un élément conducteur. Réduisez l'épaisseur ou rapprochez la plaque tactile.

---

## 💡 À retenir

- Le TTP223 fonctionne comme un **bouton numérique**.
- Aucun bouton mécanique n'est nécessaire.
- Le capteur peut être placé **derrière une fine façade non métallique**.
- Évitez les surfaces métalliques ou les éléments conducteurs proches de la zone tactile.
- La sensibilité dépend de l'épaisseur et du matériau de la façade.
- Consommation d'environ **3 mA**, à prendre en compte pour une station sur batterie.

---

## 🚧 Évolutions prévues

- [ ] Actions configurables directement depuis Natulib OS
- [ ] Support tactile intégré aux façades Natulib
- [ ] Gestes ou interactions tactiles avancées

---

## 🔗 Ressources

- ✋ [NL-204A — Détecteur IR TCRT5000](./NL-204A-Detecteur-IR-TCRT5000.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration du TTP223 |
