---
title: "Premier démarrage"
parent: Installation
statut: redaction
---

# 🟢 Premier démarrage

Juste après l'installation, la carte redémarre toute seule. Elle n'a encore aucune configuration : elle prépare sa mémoire, puis ouvre son propre point d'accès Wi-Fi pour que vous puissiez la configurer.

---

## ⚙️ Ce que fait la carte

Rien à faire de votre côté, tout est automatique :

1. **Formatage de la mémoire de fichiers.** La partition LittleFS est vide, la carte la formate au premier démarrage.
2. **Création des dossiers vitaux** : `/dev`, `/faces`, `/faces/default`, `/synapses` et `/states`.
3. **Création de la configuration de base** (`/config.json`) avec les valeurs par défaut.
4. **Synapses système.** Elles sont créées seulement quand un écran et un module associé (détecteur de présence, capteur infrarouge ou bouton tactile) sont déclarés. Sur une carte neuve, rien n'est encore créé de ce côté.
5. **Point d'accès Wi-Fi.** Aucun réseau n'est configuré, la carte ouvre donc son propre réseau `NATULIB-XXXX`.

L'interface web est intégrée au firmware : elle ne dépend pas de la partition LittleFS, et elle fonctionne donc dès ce premier démarrage.

---

## 📶 Se connecter à la carte

Suivez la page **[Configuration Wi-Fi](https://claude.ai/chat/wifi.md)** : connexion au réseau `NATULIB-XXXX`, puis choix de votre Wi-Fi.

---

## 🔍 Vérifier avec le moniteur série

Si vous avez un doute, ouvrez le moniteur série (115200 bauds). Un premier démarrage normal affiche notamment :

```
⚙️ [OS] Verification de l'integrite du systeme...
✅ [OS] Firmware Vx.xxx prêt. Demarrage rapide.
⚠️ [WIFI] Echec STA au demarrage, passage en AP+STA (Hybride)
```

Le message « Echec STA » est **normal** sur une carte neuve : il signifie seulement qu'aucun Wi-Fi n'est configuré, et il est suivi de l'ouverture du point d'accès.

---

## 🔗 Ressources

- ⬅️ [Retour à 🚀 Installation](./Installation.md)
- 📶 [Configuration Wi-Fi](./wifi.md)
- 🤝 [Contribuer à cette page](./Contribuer.md)

