---
title: "Web Flasher"
parent: Installation
nav_order: 1
---

# 💾 Web Flasher

Installez Natulib OS directement depuis votre navigateur, sans rien installer sur votre ordinateur.

---

## ✅ Prérequis

- Un navigateur **Chrome** ou **Edge** (Web Serial API — Firefox et Safari ne sont pas compatibles).
- Une carte **[NL-001A](../hardware/NL-001A-ESP32-C6-N16.md)** connectée en USB-C, avec un câble transportant les données.

---

## 🚀 Lancer l'installation

<a href="./web-flasher.html" class="btn btn-primary">Ouvrir l'installeur Web →</a>

L'outil utilise [ESP Web Tools](https://esphome.github.io/esp-web-tools/) : il détecte automatiquement le port série, efface la mémoire flash et installe le firmware en un clic.

---

## 🧩 Problèmes courants

**Le bouton d'installation reste grisé**
→ Votre navigateur n'est pas compatible. Utilisez Chrome ou Edge sur ordinateur (pas de support mobile pour Web Serial à ce jour).

**Aucun port ne s'affiche**
→ Le câble USB-C ne transporte que l'alimentation. Essayez un autre câble, ou installez le pilote CP2102 / CH340 selon la puce USB-série de votre carte.

**L'installation échoue en cours de flash**
→ Maintenez le bouton **BOOT** de la carte enfoncé pendant quelques secondes après avoir cliqué sur Installer, puis relâchez.

---

## 🔗 Alternative

Pour compiler et flasher depuis les sources : **[Installation PlatformIO](./platformio.md)**.
