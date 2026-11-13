---
layout: module
bare: true
title: ESP32 Expansion Shield 30 broches
reference: NL-002A
ref: NL-002A
famille: core
categorie: Core
statut: Validé
etat: valide
soudure: Sans outil
montage: sans-outil
niveau: Débutant
duree: 2 min
temps: 2
interface: Aucune
prix: ≈ 3 €
description: Shield passif pour ESP32 avec borniers à vis pour faciliter le câblage des modules Natulib.
images:
  - fichier: /assets/NL-002A-EXPANSION-SHIELD-1.png
    titre: Vue du shield d'extension ESP32
elements:
  - 🔌 Extension GPIO
  - 🟩 Borniers à vis
  - 🧩 Adaptateur
starter_sections:
  - 🛒 Ce qu'il vous faut
  - 🚀 Pour commencer
  - 🧪 Validation rapide
natulib_os_driver: Aucun
natulib_os_type: aucun
---

Le **NL-002A** est un shield d'extension pour **ESP32 DevKit**.

Il transforme les GPIO de l'ESP32 en **borniers à vis** pour connecter rapidement les modules Natulib, sans soudure.

Il permet de :

- 🔌 connecter rapidement les capteurs Natulib ;
- 📺 raccorder les écrans et actionneurs ;
- 🔧 modifier facilement le câblage ;
- 🔁 remplacer rapidement une carte ESP32 ;
- 🧪 réaliser un prototype sans breadboard.

## 🛒 Ce qu'il vous faut

| Composant | Lien d'achat | Note / Rôle |
| --- | --- | --- |
| **ESP32 Expansion Shield 30 broches** | [AliExpress (Lien affilié)](https://fr.aliexpress.com/) | Adaptateur à borniers pour ESP32 |

## 🚀 Pour commencer

1. Couper l'alimentation de la carte ESP32.
2. Insérer l'**ESP32 30 broches** dans le support du shield, dans le bon sens.
3. Vérifier que l'ordre des broches du shield correspond bien à celui de la carte utilisée.
4. Brancher les fils des modules sur les **borniers à vis**.
5. Alimenter ensuite l'ESP32 normalement.

> Ce shield est **passif** : il ne faut **rien ajouter dans Hardware** dans Natulib OS.

## 🧪 Validation rapide

- L'ESP32 s'insère correctement sans forcer.
- Les borniers serrent correctement les fils.
- Les alimentations **3V3**, **5V/VIN** et **GND** sont repérées.
- Les broches **GPIO** restent accessibles plus facilement que sur la carte seule.
- Les modules branchés via le shield fonctionnent comme s'ils étaient reliés directement à l'ESP32.

## 🧩 Dans Natulib

Le **NL-002A** n'apparaît pas comme un module dans Natulib OS.

Il n'a :

- **aucun driver dédié** ;
- **aucune mesure** ;
- **aucune action** ;
- **aucun JSON de configuration**.

Dans Natulib, seuls les **modules branchés sur le shield** sont à configurer dans **Hardware**.

## ⚠️ Compatibilité

Ce module est prévu pour les **cartes ESP32 DevKit 30 broches**.

> ⚠️ Le nombre de broches ne garantit pas le même **ordre** de broches. Avant l'achat, comparez la sérigraphie du shield avec celle de votre [NL-001A](./NL-001A-ESP32-C6-N16.md) : sur certaines cartes ESP32-C6, la correspondance bornier ↔ GPIO diffère de celle d'un ESP32 classique.

## 🛠️ Problèmes courants

| Problème | Vérification |
| --- | --- |
| **L'ESP32 ne rentre pas correctement** | Vérifier qu'il s'agit bien d'une carte **30 broches**. |
| **Les GPIO ne correspondent pas** | Contrôler la **sérigraphie** du shield avant branchement. |
| **Un module ne fonctionne plus** | Vérifier le serrage des fils et la bonne correspondance du GPIO utilisé. |
| **La carte chauffe ou ne démarre pas** | Couper immédiatement l'alimentation et vérifier un éventuel mauvais branchement sur **3V3 / 5V / GND**. |

## 🔗 Ressources

- [NL-001A — ESP32-C6 N16](./NL-001A-ESP32-C6-N16.md)
- [Modules Natulib](../Modules.md)

## 🕓 Historique

| Version | Évolution |
| --- | --- |
| A | Première fiche du shield d'extension ESP32 |