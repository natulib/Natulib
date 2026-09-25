---
title: "Harpe électrique tueuse de frelons"
parent: Projets
ref: PRJ-001
statut: planifie
niveau: avance
temps: à définir
---

# 🐝⚡ Harpe électrique tueuse de frelons

> 🚧 **Projet validé pour environnements hostiles.** Ce câblage intègre les sécurités industrielles nécessaires (filtrage, isolation EMI, séparation de puissance) pour protéger le microcontrôleur des interférences générées par la haute tension.

## 👀 En bref

Une **harpe électrique** est une grille de fils tendus, portée à une haute tension à très faible courant, qui électrocute un insecte au contact sans représenter de danger de choc électrique létal pour un humain — c'est le principe utilisé par les pièges commerciaux contre le **frelon asiatique (*Vespa velutina*)**, une espèce invasive qui prédate les colonies d'abeilles.

Le rôle de Natulib dans ce projet n'est **pas** de générer la haute tension : celle-ci provient d'un module booster dédié (Module Booster DC 3.7V à 1800V  moteur à impulsion d'arc avec condensateurs haute tension 3.7 à 5V 9V). Natulib se limite à :

- ⚡ **commander la mise sous/hors tension** de la grille via un MOSFET Logic-Level (IRLZ44N);
- 🎯 **détecter une présence** à proximité de la grille (IR ou PIR) pour ne l'activer qu'au besoin ;
- 📊 **mesurer l'énergie consommée** et détecter les décharges via un capteur I2C (INA219) ;
- ⏱️ **couper automatiquement** l'alimentation en dehors des horaires de vol du frelon asiatique

> 🛑 **Sécurité — à lire avant tout montage.** Une grille électrifiée présente un risque réel selon la tension et le courant utilisés, y compris pour un humain ou un animal domestique Ce projet suppose l'utilisation d'un **module haute tension déjà homologué pour cet usage**, jamais d'un circuit haute tension construit sans expérience en électronique de puissance. Isolez physiquement la grille (cage grillagée à maille large, hors de portée), coupez-la par défaut, et ne l'activez que par détection ou sur plage horaire contrôlée. 

**Niveau :** avancé[cite: 18] · **Temps de montage :** ~3 heures

---

## 🧱 Modules utilisés

| Module / Composant | Rôle dans ce projet |
|---|---|
| ESP32 | Carte principale, exécute Natulib OS[cite: 18] |
| Détecteur PIR | Détection de présence à proximité de la grille[cite: 18] |
| MOSFET IRLZ44N | Commande de la mise sous tension du module haute tension (côté basse tension uniquement)[cite: 18] |
| INA219 | Mesure du courant et de la tension (détection des frelons foudroyés) |
| LM2596 (Step-Down) | Abaissement de la tension pour le Booster Haute Tension |
| MINI360 (Step-Down) | Alimentation dédiée, stable et propre pour l'ESP32 |
| Condensateurs 1000µF | Filtrage massif anti-Brownout Reset |
| Diode 1N4007 | Protection anti-retour (Flyback) |
| Module haute tension homologué | Génère la tension d'électrocution — non fourni ni documenté ici[cite: 18] |

---

## 🔌 Plan de brochage

| Composant | Signal | GPIO câblé dans ce projet | 
|---|---|:---:|
| Détecteur PIR | DO | GPIO14[cite: 18] |
| MOSFET IRLZ44N | Gate (Commande) | GPIO21[cite: 18] |
| Capteur INA219 | SDA / SCL | Broches I2C par défaut |

> ⚠️ **La sortie de commande (GPIO21) ne doit jamais être reliée directement au circuit haute tension[cite: 18].** Elle pilote uniquement la grille (Gate) du MOSFET qui gère l'entrée basse tension du module haute tension[cite: 18].

---

### 🛠️ Tutoriel de Montage Sécurisé (Le Câblage)

Ce montage garantit que l'ESP32 ne subira aucun `Brownout Reset` et que le bus I2C ne fige pas sous l'effet des ondes électromagnétiques de la harpe.

#### Étape 1 : Le Séparateur (L'alimentation en Y)
Pars de ta source d'alimentation principale (ex: Batterie 12V). Sépare immédiatement les fils en deux branches distinctes. 
Ne chaîne **jamais** les modules les uns derrière les autres.

#### Étape 2 : La Branche Logique (Le Cerveau)
Cette branche doit rester absolument pure.
1. Connecte l'entrée du **MINI360** sur la batterie 12V. Règle sa sortie sur **5V**.
2. Soude un **Condensateur de 1000µF** sur la sortie 5V/GND du MINI360 (attention à la polarité, la bande blanche sur le GND).
3. Relie cette sortie 5V/GND à la broche `5V` (ou `VIN`) et `GND` de l'ESP32.

#### Étape 3 : La Branche Puissance (La Harpe)
1. Prends le module **INA219**. Connecte la ligne positive (+12V de la batterie) sur la borne **VIN+**.
2. Depuis la borne **VIN-** de l'INA219, va vers l'entrée **IN+** du module **LM2596**.
3. Règle le LM2596 sur la tension requise par ton Booster Haute Tension (ex: 3.7V à 9V).
4. Soude un **Condensateur de 1000µF** sur la sortie (OUT+/OUT-) du LM2596. Ce réservoir va encaisser l'appel de courant (inrush) du Booster.
5. Ajoute la **Diode 1N4007** en parallèle de cette sortie (le trait blanc / cathode sur le OUT+).

#### Étape 4 : La Commutation Isolée (Le MOSFET IRLZ44N)
Nous allons couper la masse (Low-Side) pour ne jamais exposer le processeur à un courant de retour.
1. **Source (S) :** Relie-la au `OUT-` (GND) du LM2596.
2. **Drain (D) :** Relie-le au fil Négatif (-) de l'entrée du Booster Haute Tension.
3. Le fil Positif (+) du Booster va directement au `OUT+` du LM2596.
4. **Gate (G) :**
   - Soude une résistance de **10 kΩ** entre la Gate et la Source (GND) pour forcer le MOSFET à rester éteint au démarrage.
   - Soude une résistance de **330 Ω** en série entre le **GPIO 21** de l'ESP32 et la Gate.

#### Étape 5 : Le Bus I2C de l'INA219 (Protection EMI)
L'INA219 doit dialoguer avec l'ESP32 malgré les arcs électriques.
1. Alimente l'INA219 (VCC/GND de la puce) depuis le 3.3V ou le 5V "propre" de l'ESP32.
2. Coupe deux fils de masse (GND) supplémentaires. 
3. **Torsade** le fil SDA avec un fil GND. **Torsade** le fil SCL avec l'autre fil GND.
4. Connecte-les à l'ESP32. Ce torsadage empêchera les ondes radio de la harpe d'induire un faux signal d'horloge dans le bus.


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
