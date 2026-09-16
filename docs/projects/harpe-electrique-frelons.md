---
title: "Harpe électrique tueuse de frelons"
parent: Projets
ref: PRJ-001
statut: planifie
niveau: avance
temps: à définir
---

# 🐝⚡ Harpe électrique tueuse de frelons

> 🚧 **Projet à l'état de planification.** Le câblage ci-dessous est une proposition de départ, pas encore validée sur prototype.

## 👀 En bref

Une **harpe électrique** est une grille de fils tendus, portée à une haute tension à très faible courant, qui électrocute un insecte au contact sans représenter de danger de choc électrique létal pour un humain — c'est le principe utilisé par les pièges commerciaux contre le **frelon asiatique (*Vespa velutina*)**, une espèce invasive qui prédate les colonies d'abeilles.

Le rôle de Natulib dans ce projet n'est **pas** de générer la haute tension : celle-ci provient d'un module dédié, conçu et validé pour cet usage (type circuit de raquette anti-moustique renforcée, ou module commercial de piège électrique). Natulib se limite à :

- ⚡ **commander la mise sous/hors tension** de la grille via un relais ou MOSFET basse tension ;
- 🎯 **détecter une présence** à proximité de la grille (IR ou PIR) pour ne l'activer qu'au besoin ;
- 📊 **compter les déclenchements** pour suivre la pression de prédation ;
- ⏱️ **couper automatiquement** l'alimentation en dehors des horaires de vol du frelon asiatique.

> 🛑 **Sécurité — à lire avant tout montage.** Une grille électrifiée présente un risque réel selon la tension et le courant utilisés, y compris pour un humain ou un animal domestique. Ce projet suppose l'utilisation d'un **module haute tension déjà homologué pour cet usage** (comme ceux des raquettes anti-insectes du commerce), jamais d'un circuit haute tension construit sans expérience en électronique de puissance. Isolez physiquement la grille (cage grillagée à maille large, hors de portée), coupez-la par défaut, et ne l'activez que par détection ou sur plage horaire contrôlée. Ce document ne couvre pas la conception du générateur haute tension lui-même.

**Niveau :** avancé · **Temps de montage :** à définir · **Budget indicatif :** à définir

---

## 🧱 Modules utilisés

| Module | Rôle dans ce projet |
|---|---|
| [NL-001A](../hardware/NL-001A-ESP32-C6-N16.md) | Carte principale, exécute Natulib OS |
| [NL-002A](../hardware/NL-002A-ESP32-Expansion-Shield.md) | Raccordement sans soudure |
| [NL-204A](../hardware/NL-204A-Detecteur-IR-TCRT5000.md) | Détection de présence à proximité de la grille |
| [NL-401A](../hardware/NL-401A-PowerSwitch.md) ou [NL-402A](../hardware/NL-402A-Mosfet-PWM.md) | Commande de la mise sous tension du module haute tension (côté basse tension uniquement) |
| Module haute tension homologué *(hors catalogue Natulib)* | Génère la tension d'électrocution — non fourni ni documenté ici |

---

## 🔌 Plan de brochage

| Module | Signal | GPIO recommandé | GPIO câblé dans ce projet | Écart / raison |
|---|---|:---:|:---:|---|
| [NL-204A](../hardware/NL-204A-Detecteur-IR-TCRT5000.md) | DO | GPIO14 | GPIO14 | — |
| [NL-401A / NL-402A](../hardware/NL-401A-PowerSwitch.md) | Commande | GPIO21 / GPIO6 | GPIO21 | — |

> 💡 Ce projet n'utilise que deux modules côté GPIO : pas de conflit à ce stade. Le GPIO recommandé de chaque module est donc repris tel quel.

> ⚠️ **La sortie de commande (GPIO21) ne doit jamais être reliée directement au circuit haute tension.** Elle pilote uniquement l'entrée basse tension du module haute tension (souvent une simple mise sous/hors tension de son alimentation), qui reste électriquement isolé du reste du montage.

---

## 🛒 Liste de courses

| Composant | Qté | Fiche |
|---|--:|---|
| ESP32-C6 N16 | 1 | [NL-001A](../hardware/NL-001A-ESP32-C6-N16.md) |
| Expansion Shield | 1 | [NL-002A](../hardware/NL-002A-ESP32-Expansion-Shield.md) |
| Détecteur IR TCRT5000 | 1 | [NL-204A](../hardware/NL-204A-Detecteur-IR-TCRT5000.md) |
| PowerSwitch PN2222A | 1 | [NL-401A](../hardware/NL-401A-PowerSwitch.md) |
| Module haute tension homologué | 1 | Hors catalogue — voir un piège électrique du commerce |
| Cage de protection grillagée | 1 | Selon projet |

---

## ⚙️ Configuration Natulib OS

```json
{
  "modules": [
    {
      "id": "detection_frelon",
      "type": "tcrt5000",
      "pins": { "signal": 14 },
      "active": true
    },
    {
      "id": "grille_haute_tension",
      "type": "switch",
      "pins": { "signal": 21 },
      "default_state": false,
      "active": true
    }
  ]
}
```

> ⚠️ `default_state: false` — la grille reste **hors tension par défaut**. Elle n'est activée que par une recette explicite (détection + plage horaire), jamais en permanence.

---

## 🛠️ Montage

1. Installez le module haute tension homologué à l'écart, hors de portée, selon les instructions de son fabricant.
2. Câblez le [NL-204A](../hardware/NL-204A-Detecteur-IR-TCRT5000.md) pour détecter l'approche d'un insecte devant la grille.
3. Câblez le [NL-401A](../hardware/NL-401A-PowerSwitch.md) sur l'alimentation basse tension du module haute tension — jamais sur la grille elle-même.
4. Vérifiez que la grille reste isolée de toute partie accessible pendant les tests.
5. Testez la commande de mise sous/hors tension **sans la grille connectée**, avant tout essai réel.
6. Définissez la recette d'activation (détection + plage horaire).

---

## 🌱 Recette / automatisation associée

*(à rédiger)* — activation de la grille uniquement en présence détectée et pendant les horaires de vol actif du frelon asiatique (généralement diurne, printemps à automne selon la région).

---

## 🧩 Problèmes courants

**La grille reste active en permanence**
→ Vérifiez `default_state: false` et que la recette d'activation est bien temporisée.

**Détections répétées sans frelon réel**
→ Le TCRT5000 détecte tout objet proche, pas seulement un insecte. Ajustez la sensibilité et la distance de détection.

---

## 🚧 Évolutions prévues

- [ ] Comptage des déclenchements pour suivre la pression de prédation
- [ ] Reconnaissance visuelle pour distinguer frelon asiatique et abeille
- [ ] Documentation détaillée des exigences de sécurité électrique

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première ébauche du projet, non testée sur prototype |
