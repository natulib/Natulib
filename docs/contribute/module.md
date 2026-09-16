---
title: "Créer un module"
parent: Contribuer
statut: valide
---

# 🧱 Créer un module

Ajouter une nouvelle brique matérielle au catalogue **[Modules](../Modules.md)**.

---

## 🧭 Étapes

1. Choisissez une référence libre dans la série adaptée — voir le plan de numérotation dans **[Modules](../Modules.md)**.
2. Partez du gabarit **[TEMPLATE-module.md](../hardware/TEMPLATE-module.md)**.
3. Nommez le fichier `NL-xxxA-Nom-Du-Module.md`, sans accent ni espace, dans `hardware/`.
4. Renseignez le front matter en tête de fichier.
5. Ajoutez la ligne correspondante dans **[Modules](../Modules.md)**.
6. Reportez les GPIO utilisés dans le tableau de brochage de cette même page.
7. Ouvrez une Pull Request.

---

## 🔢 Plan de numérotation

| Série | Famille |
|---|---|
| **000** | 🔴 Core — cartes principales et électronique de contrôle |
| **100** | 📺 Displays — affichage et interfaces utilisateur |
| **200** | 🌡️ Sensors — capteurs et acquisition de données |
| **300** | ⚡ Actuators — actionneurs pilotés |
| **400** | 🔋 Power — alimentation et commutation |
| **500** | 📦 Enclosures — boîtiers et éléments mécaniques |
| **600** | 📡 Connectivity — communication et extensions |

La lettre suffixe (`A`, `B`, …) indique la **révision** du module, pas une variante fonctionnelle.

---

## 🧱 Front matter

Chaque fiche commence par ce bloc. Il est obligatoire : sans lui, GitHub Pages sert le fichier en texte brut au lieu de le rendre en page web.

```yaml
---
ref: NL-204A
title: "NL-204A — Détecteur IR de proximité TCRT5000"
famille: sensors
etat: valide
montage: sans-soudure
temps: 5
niveau: debutant
prix: 1
interface: gpio
---
```

| Champ | Valeurs |
|---|---|
| `ref` | Référence du module, identique au nom du fichier |
| `famille` | `core` · `displays` · `sensors` · `actuators` · `power` · `enclosures` · `connectivity` |
| `etat` | `valide` · `test` · `documente` · `planifie` |
| `montage` | `sans-outil` · `sans-soudure` · `soudure` |
| `temps` | Durée de montage en minutes |
| `niveau` | `debutant` · `intermediaire` · `avance` |
| `prix` | Prix indicatif en euros |
| `interface` | `gpio` · `adc` · `i2c` · `spi` · `pwm` · `none` |

---

## 📐 Structure d'une fiche

```
Front matter
Barre de navigation
***
# <emoji> NL-xxxA — Nom du module
> badges
## 👀 En bref
## 📷 Aperçu
## 🛒 Ce qu'il vous faut
## 🔌 Câblage
## ⚙️ Configuration Natulib OS
## 🛠️ Montage en X minutes
## 📏 Calibration          (si applicable)
## 🧩 Problèmes courants   (si applicable)
## 💡 À retenir
## 🚧 Évolutions prévues
## 🔗 Ressources
## 🕓 Historique
```

---

## 📏 Règles de rédaction

| Règle | Pourquoi |
|---|---|
| Front matter YAML obligatoire | Sans lui, la page n'est pas rendue sur le web |
| Images en `![Texte](../assets/fichier.png)` | La syntaxe Obsidian `![[…]]` n'est pas rendue sur GitHub Pages |
| Une référence = un module | Éviter les doublons dans l'index et les liens |
| Pas de valeur de courant ou de tension sans source | Distinguer ce qui est annoncé par le fabricant de ce qui est mesuré |
| Structure de sections identique | La navigation devient prévisible d'une fiche à l'autre |
| Respecter la casse des noms de fichiers | GitHub Pages est sensible à la casse, contrairement à Obsidian sous Windows |

---

## 🧪 Vérifier avant de proposer

- [ ] Le front matter est présent et `ref` correspond au nom du fichier.
- [ ] Le titre H1 porte la même référence.
- [ ] Tous les liens internes pointent vers des fichiers existants.
- [ ] Les GPIO utilisés n'entrent pas en conflit avec le tableau de brochage.
- [ ] Les images sont dans `assets/` et référencées en Markdown standard.
- [ ] La ligne est ajoutée dans `Modules.md`.

---

## 🔗 Ressources

- 🧱 [Catalogue des modules](../Modules.md)
- 📄 [Gabarit de fiche](../hardware/TEMPLATE-module.md)
- ⬅️ [Retour à 🤝 Contribuer](../Contribuer.md)
