# 🔧 NL-401A - PowerSwitch

Commutateur de masse (Low-Side Switch) permettant de couper totalement l'alimentation d'un périphérique à l'aide d'une GPIO de l'ESP32.

Ce module est particulièrement utile pour les périphériques qui ne disposent pas d'un véritable mode veille, comme certains écrans GC9A01 dont le rétroéclairage reste alimenté.

---

## Caractéristiques

| Propriété | Valeur |
|-----------|--------|
| Référence | NL-401A |
| Catégorie | 400 - Power |
| Fonction | Commutateur de masse |
| Tension | 3.3 V |
| Commande | GPIO ESP32 |
| Composants | PN2222A + Résistance |
| État | Prototype |

---

## Applications

- Extinction complète d'un écran GC9A01
- Mise hors tension d'un capteur
- Réduction de la consommation en Deep Sleep
- Redémarrage matériel d'un périphérique
- Coupure d'un petit module 3.3 V

---

## Schéma de principe

```
              3.3 V
                 │
                 │
ESP32 GPIO2 ── 1 kΩ ──► Base (B)

ESP32 GND ───────────► Émetteur (E)

Collecteur (C) ─────► GND du périphérique
```

Le **+3.3 V** reste connecté en permanence.

Seule la **masse (GND)** est commutée.

---

## Orientation du transistor

Placer le **PN2222A** face plate vers soi.

```
        _______
       |       |
       |PN2222A|
       |_______|

         | | |
         E B C
```

De gauche à droite :

- **E** → GND ESP32
- **B** → Résistance 1 kΩ → GPIO2
- **C** → GND du périphérique

---

## Liste des composants (BOM)

| Composant | Quantité |
|------------|---------:|
| PN2222A | 1 |
| Résistance 1 kΩ | 1 |
| Connecteur 3 broches | 1 |

---

## Pourquoi une résistance de 1 kΩ ?

La résistance limite le courant entrant dans la base du transistor.

Avec une alimentation **3.3 V** :

```
I = (3.3 - 0.7) / 1000
≈ 2.6 mA
```

Ce courant est largement suffisant pour saturer le PN2222A tout en protégeant la GPIO de l'ESP32.

Des valeurs comprises entre **1 kΩ et 4.7 kΩ** fonctionnent généralement très bien.

---

## Limitations

- Adapté aux faibles courants.
- Pour des charges importantes, préférer un MOSFET (NL-402 à venir).

---

## État

- 🚧 Schéma en cours
- 🚧 PCB en cours
- ⏳ Prototype à réaliser
- ⏳ Validation électrique

---

## Licence

Open Source — Natulib
