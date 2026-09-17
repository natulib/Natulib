---
title: "Système — Architecture"
parent: Natulib OS
statut: publie
---

# 🏗️ Système — Architecture

Quelques principes de fonctionnement interne, utiles pour comprendre le comportement de la station :

- **Le réseau et le disque ne bloquent jamais la boucle principale.** Les envois réseau (MQTT, HTTP sortant) et les écritures sur Flash sont délégués à des tâches de fond dédiées. La lecture des capteurs et l'évaluation des automatisations restent donc fluides même si le Wi-Fi ou la carte SD sont lents.
- **Les ressources partagées (Flash, bus I²C, bus SPI) sont verrouillées.** Deux parties du firmware ne peuvent jamais écrire en même temps sur la Flash, ni dialoguer en même temps avec un capteur I²C — cela évite les corruptions et les blocages matériels.
- **L'écran s'adapte au pilote déclaré.** Le même code pilote plusieurs dalles (GC9A01, ST7789, ILI9341, ILI9488) : le driver exact est choisi au démarrage selon la configuration du module `screen`.
- **Démarrage résilient.** Si le système de fichiers ne monte pas, la station retente automatiquement plutôt que de rester bloquée indéfiniment. Si le Wi-Fi connu est injoignable, elle bascule en point d'accès pour rester configurable — voir **[Réseau](./reseau.md)**.

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- 📡 [Système — Réseau](./reseau.md)
- 🛡️ [Système — Sécurité](./securite.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
