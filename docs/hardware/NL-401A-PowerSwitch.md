---
title: "NL-401A — PowerSwitch PN2222A"
parent: Modules
ref: NL-401A
famille: power
etat: valide
montage: soudure
temps: 20
niveau: intermediaire
prix: 1
interface: gpio
---

# 🔧 NL-401A — PowerSwitch PN2222A

> 🟢 Validé · 🟠 Soudure · 👤 Intermédiaire · ⏱️ 20 min · 💰 ~1 € · ⚡ Commutation GPIO

## 👀 En bref

Le **NL-401A PowerSwitch** coupe l'alimentation d'un petit périphérique à l'aide d'une **GPIO de l'ESP32-C6**.

Il utilise un **PN2222A** en commutation côté masse (*low-side switching*).

Il est particulièrement utile pour les périphériques dépourvus d'un véritable mode veille, par exemple certains écrans **[GC9A01](./NL-101A-GC9A01.md)** dont le rétroéclairage reste alimenté.

Applications :

- 📺 extinction complète d'un écran ;
- 🌡️ mise hors tension d'un capteur ;
- 😴 réduction de la consommation en Deep Sleep ;
- 🔄 redémarrage matériel d'un périphérique.

**Charge visée :** quelques centaines de mA · **Commande :** GPIO 3,3 V via résistance 1 kΩ.

> ⚠️ Le NL-401A est destiné aux **petites charges**. Pour des courants plus importants, utilisez le **[NL-402A](./NL-402A-Mosfet-PWM.md)**.

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-401A-PowerSwitch-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Prototype NL-401A](../assets/NL-401A-PowerSwitch-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Transistor PN2222A | 1 | ✅ | AliExpress |
| Résistance 1 kΩ | 1 | ✅ | AliExpress |
| Connecteur 3 broches | 1 | Optionnel | AliExpress |
| PCB NL-401A | 1 | Optionnel | Projet KiCad |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

### Orientation du PN2222A

Placez la **face plate vers vous**, inscriptions visibles.

```text
                 PN2222A — vue de face

              ┌───────────────┐
              │    PN2222A    │
              └───────────────┘
                  │   │   │
                  E   B   C
                  │   │   │
                  │   │   └──── GND périphérique
                  │   │
                  │   └──────── 1 kΩ ─── GPIO21
                  │
                  └──────────── GND ESP32
```

### Brochage

| Broche | Nom | Connexion |
|---|---|---|
| Gauche | Émetteur (E) | GND ESP32 |
| Milieu | Base (B) | Résistance 1 kΩ → GPIO21 |
| Droite | Collecteur (C) | GND du périphérique |

> 🔧 Vérifiez impérativement le brochage du **PN2222A utilisé** : l'ordre des broches varie selon le fabricant.

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

### Principe

Le périphérique conserve son alimentation positive. Le PN2222A commute uniquement son **retour GND**.

```text
ESP32 / alimentation
       │
      +3V3
       │
       ├────────────── + périphérique
       │
      GND ── E PN2222A C ── GND périphérique
                 ▲
                 │
          1 kΩ ──┴── GPIO21
```

| GPIO | PN2222A | Périphérique |
|---|---|---|
| **HIGH** | Conducteur | Alimenté |
| **LOW** | Bloqué | Hors tension |

> ⚠️ Cette architecture est une **commutation côté masse**. Vérifiez que le périphérique la supporte avant de l'intégrer : un périphérique partageant une masse avec l'ESP32-C6 par ailleurs (bus I²C, SPI) ne sera pas réellement coupé.

---

## ⚙️ Configuration Natulib OS

Le PowerSwitch se déclare comme une sortie numérique.

```json
{
  "id": "alim_ecran",
  "type": "switch",
  "pins": {
    "signal": 21
  },
  "default_state": true,
  "active": true
}
```

> ⚠️ Le nom du type doit être confirmé avec la version de Natulib OS utilisée.

---

## 🛠️ Montage en 20 minutes

1. Identifiez les broches **E / B / C** du PN2222A.
2. Soudez le transistor et la résistance de **1 kΩ**.
3. Reliez la base à la GPIO de commande via la résistance.
4. Reliez l'émetteur au GND de l'ESP32-C6.
5. Reliez le collecteur au GND du périphérique.
6. Vérifiez le câblage avant la mise sous tension.

---

## 🧩 Problèmes courants

**Le périphérique reste alimenté à l'état LOW**
→ Il dispose d'un autre chemin de masse, par exemple via un bus de données partagé.

**Le transistor chauffe**
→ La charge dépasse ce que le montage peut absorber ; passez au [NL-402A](./NL-402A-Mosfet-PWM.md).

---

## 💡 À retenir

- Réservez cette version aux **petites charges** compatibles avec la commutation côté masse.
- La résistance de **1 kΩ** protège la GPIO en limitant le courant de base.
- Vérifiez le brochage du transistor avant soudure.
- Pour une charge plus importante, utilisez un **MOSFET** — voir [NL-402A](./NL-402A-Mosfet-PWM.md).
- Particulièrement utile pour réduire la consommation pendant le **Deep Sleep**.

---

## 🚧 Évolutions prévues

- [ ] **NL-401B** : version à base de MOSFET pour des charges plus importantes
- [ ] Mesure du courant maximal réellement admissible
- [ ] PCB Natulib et boîtier associé

---

## 🔗 Ressources

- ⚡ [NL-402A — Module MOSFET PWM](./NL-402A-Mosfet-PWM.md)
- 📺 [NL-101A — Écran rond GC9A01](./NL-101A-GC9A01.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première version du PowerSwitch PN2222A |
