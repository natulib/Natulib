---
title: "Nom du projet"
parent: Projets
ref: PRJ-xxx
statut: planifie
niveau: intermediaire
temps: 1h
---

# 🏗️ Nom du projet

> 🚧 Gabarit — dupliquez ce fichier pour créer un nouveau projet, renseignez `ref` et `statut` dans le front matter.

## 👀 En bref

Une phrase décrivant l'objectif du projet et le problème qu'il résout.

**Niveau :** … · **Temps de montage :** … · **Budget indicatif :** …

---

## 🧱 Modules utilisés

| Module | Rôle dans ce projet |
|---|---|
| [NL-001A](../hardware/NL-001A-ESP32-C6-N16.md) | Carte principale |
| [NL-xxxA](../hardware/NL-xxxA.md) | … |

---

## 🔌 Plan de brochage

GPIO réellement câblés pour **cette combinaison de modules**. Le GPIO recommandé est celui indiqué par défaut sur la fiche du module ; il n'est repris ici que s'il ne rentre pas en conflit avec un autre module du projet.

| Module | Signal | GPIO recommandé | GPIO câblé dans ce projet | Écart / raison |
|---|---|:---:|:---:|---|
| [NL-xxxA](../hardware/NL-xxxA.md) | … | GPIOx | GPIOx | — |
| [NL-xxxA](../hardware/NL-xxxA.md) | … | GPIOy | GPIOz | Conflit avec … sur GPIOy |

> ⚠️ Vérifiez ce tableau avant de câbler : c'est lui qui fait foi pour ce projet, pas la recommandation isolée de chaque fiche module.

---

## 🛒 Liste de courses

| Composant | Qté | Fiche |
|---|--:|---|
| … | 1 | [NL-xxxA](../hardware/NL-xxxA.md) |

---

## ⚙️ Configuration Natulib OS

```json
{
  "modules": []
}
```

---

## 🛠️ Montage

1. …

---

## 🌱 Recette / automatisation associée

Lien vers la recette Natulib OS qui pilote ce projet, si applicable.

---

## 🧩 Problèmes courants

**…**
→ …

---

## 🚧 Évolutions prévues

- [ ] …

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première version du projet |
