---
title: "Fonctionnement — Automatisations"
parent: Natulib OS
statut: publie
---
[🏠 Accueil](../../index.md) | 🚀 [Installation](../../Installation.md) | 🧱 [Modules](../../Modules.md) | 🏗️ [Projets](../../Projets.md) | 🌱 [Recettes](../../Recettes.md) | 🧠 [Natulib OS](../../Natulib-OS.md) | 🤝 [Contribuer](../../Contribuer.md) | ❓ [FAQ](../../FAQ.md) | [🔗 GitHub](https://github.com/natulib/Natulib)

***

# ⚙️ Fonctionnement — Automatisations

Le moteur d'automatisation local ("synapses") évalue des règles condition → action, en continu et sans dépendre du réseau. Chaque règle est un fichier JSON dans `/synapses/`.

## 📐 Une règle en un coup d'œil

```json
{
  "id": "usr_exemple",
  "active": true,
  "trigger": "hold",
  "for_ms": 2000,
  "conditions": [
    {"logic": "START", "sensor": "climat", "metric": "t", "op": ">", "val": 28}
  ],
  "actions": [
    {"type": "local", "target": "ventilateur", "cmd": "on"}
  ]
}
```

- **`trigger`** : `"hold"` déclenche pendant que la condition reste vraie ; `"release"` déclenche au relâchement (utile pour un tap court vs un appui long).
- **`for_ms`** : durée minimale (ou maximale, selon `trigger`) que la condition doit tenir.
- **`conditions`** : combinables avec `"logic": "AND"` / `"OR"` ; `sensor` peut aussi valoir `"chronos"` pour une condition temporelle (ex. « une fois toutes les 5 minutes »).
- **`actions`** : `local` (commande `<cmd>_<target>` à un périphérique), `mqtt`, `http`, `system` (scènes, profils, veille d'écran) ou `visibility` (afficher/masquer un calque d'écran).

Dans les actions `mqtt`/`http`, `{capteur.metrique}` insère la dernière valeur mesurée — par exemple `{climat.t}` dans un payload.

## 🗂️ Préfixes de fichiers

- `usr_*` — créée depuis l'interface Web ;
- `sys_*` — règle système, recréée automatiquement (réveil d'écran sur mouvement, interaction tactile…) selon le matériel détecté ;
- `rcp_*` — fournie par une recette.

---

## 🔗 Ressources

- ⬅️ [Retour à 🧠 Natulib OS](../Natulib-OS.md)
- 🔌 [Matériel — Drivers](./drivers.md)
- ⚙️ [Fonctionnement — API REST](./api.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)
