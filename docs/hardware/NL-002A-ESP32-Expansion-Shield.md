---
title: "NL-002A — ESP32 Expansion Shield 30 broches"
parent: Modules
ref: NL-002A
famille: core
etat: valide
montage: sans-outil
temps: 2
niveau: debutant
prix: 3
interface: none
---

# 🔌 NL-002A — ESP32 Expansion Shield 30 broches

> 🟢 Validé · 🟢 Sans outil · 👤 Débutant · ⏱️ 2 min · 💰 ~2–4 € · 🔩 Sans soudure

## 👀 En bref

Le **NL-002A** est un shield d'extension pour **ESP32 DevKit 30 broches**.

Il transforme les GPIO de l'ESP32 en **borniers à vis** pour connecter rapidement les modules Natulib, sans soudure.

Il permet de :

- 🔌 connecter rapidement les capteurs Natulib ;
- 📺 raccorder les écrans et actionneurs ;
- 🔧 modifier facilement le câblage ;
- 🔁 remplacer rapidement une carte ESP32 ;
- 🧪 réaliser un prototype sans breadboard.

**Compatibilité :** ESP32 DevKit **30 broches**.

> ⚠️ Le nombre de broches ne garantit pas le même **ordre** de broches. Avant l'achat, comparez la sérigraphie du shield avec celle de votre [NL-001A](./NL-001A-ESP32-C6-N16.md) : sur certaines cartes ESP32-C6, la correspondance bornier ↔ GPIO diffère de celle d'un ESP32 classique.

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-002A-ESP32-Expansion-Shield-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Shield d'extension avec un ESP32 installé](../assets/NL-002A-ESP32-Expansion-Shield-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| ESP32 Expansion Shield 30 broches | 1 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

Chaque bornier est directement relié à une broche de l'ESP32 et identifié sur le shield.

| Bornier | Fonction |
|---|---|
| **3V3** | Alimentation 3,3 V des modules |
| **5V / VIN** | Alimentation 5 V, selon le shield |
| **GND** | Masse commune |
| **GPIOxx** | Une borne par GPIO, selon la sérigraphie |

> ⚠️ Vérifiez la correspondance réelle entre chaque borne et le GPIO attendu avant de raccorder un module. Le câblage réel de chaque module est documenté dans sa fiche **[Projet](../Projets.md)**.

---

## ⚙️ Configuration Natulib OS

Le shield est **passif** : il n'apparaît pas dans la configuration de Natulib OS.

---

## 🛠️ Installation en 2 minutes

1. Insérez l'ESP32 dans le support du shield.
2. Vérifiez l'orientation du connecteur USB.
3. Connectez les fils aux borniers à vis.
4. Alimentez l'ESP32 via son port USB.

> 🔩 **Aucune soudure nécessaire.**

---

## 💡 À retenir

- Compatible avec les **ESP32 DevKit 30 broches**.
- Ne forcez jamais l'insertion de l'ESP32.
- Coupez l'alimentation avant toute modification du câblage.
- Serrez les borniers sans excès.
- Le shield ne protège pas les GPIO : les règles de tension du [NL-001A](./NL-001A-ESP32-C6-N16.md) restent valables.

---

## 🚧 Évolutions prévues

- [ ] Photo annotée de la correspondance bornier ↔ GPIO
- [ ] Liste des variantes de shield validées avec l'ESP32-C6
- [ ] Étiquettes Natulib imprimables pour les borniers

---

## 🔗 Ressources

- 🧠 [NL-001A — ESP32-C6 N16](./NL-001A-ESP32-C6-N16.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première version du shield 30 broches |
