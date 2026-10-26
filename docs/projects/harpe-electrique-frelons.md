---
title: "Harpe électrique tueuse de frelons"
parent: Projets
ref: PRJ-001
statut: planifie
niveau: avance
temps: ~3 heures
---

---
title: "Harpe électrique tueuse de frelons"
parent: Projets
ref: PRJ-001
statut: planifie
niveau: avance
temps: ~3 heures
---

# 🐝⚡ Harpe électrique tueuse de frelons

---

## 1. 👀 Présentation

### Rôle et fonctionnement
La harpe électrique est un maillage de fils conducteurs parallèles alternés, porté à une haute tension (1 500 à 2 000 V) sous faible courant. Au passage d'un frelon asiatique (_Vespa velutina_) entre deux fils, un arc électrique se forme et neutralise l'insecte.

L'étage haute tension repose sur un module booster (entrée 3,0 à 4,2 V). Natulib OS assure :
- ⚡ **La commutation du booster** via le module double MOSFET D4184 (un seul canal utilisé), piloté par `GPIO 21` ;
- 📊 **La surveillance énergétique** via l'INA219 placé en sortie du régulateur (mesure de la tension réelle du booster et détection d'un frelon collé par hausse de puissance) ;
- 🛡️ **La mise en sécurité automatique** en cas de surpuissance persistante, de surtension, de perte d'un capteur I²C ou de blocage système (Watchdog) ;
- ☀️ **L'asservissement environnemental** : activation uniquement de jour (BH1750) et par temps sec (capteur de pluie analogique), avec extinction nocturne obligatoire pour protéger la faune nocturne et éviter les arcs dus à la rosée.

### Limites du système
- **Comptage d'arcs** : à un intervalle de lecture de 250 ms sur l'INA219, un arc bref de quelques millisecondes n'est pas capté. L'INA219 sert à détecter un court-circuit franc ou un insecte resté bloqué entre deux fils.
- **Protection du transformateur HT** : le fusible de 1 A protège uniquement le câblage contre les courts-circuits francs. La survie thermique du booster repose exclusivement sur la règle logicielle anti-collage et le Watchdog.

> 🛑 **Avertissement sécurité** : la haute tension (2 kV) est dangereuse pour l'humain, les animaux et les porteurs de stimulateur cardiaque, même à faible courant. La grille active doit être protégée derrière une grille externe à mailles larges hors de portée. Le booster doit être isolé seul dans une boîte de dérivation étanche dédiée, et un **interrupteur physique** doit permettre de couper matériellement la chaîne HT avant toute manipulation ou nettoyage.

---

## 2. 🛒 Matériel nécessaire

### Modules Natulib & Électronique

| Composant | Qté | Référence / Fiche Module | Rôle et remarques |
| :--- | :---: | :--- | :--- |
| **Microcontrôleur** | 1 | [NL-001A — ESP32-C6 N16](../hardware/NL-001A-ESP32-C6-N16.md) | Cerveau logique, exécute Natulib OS |
| **Mesure d'énergie HT** | 1 | [NL-207A — INA219](../hardware/NL-207A-Capteur-courant-INA219.md) | Adresse `0x40` (`energie_harpe`), placé **après** le régulateur 3,8 V[cite: 1, 2, 7] |
| **Mesure batterie (Mode B)** | 1 | [NL-207A — INA219](../hardware/NL-207A-Capteur-courant-INA219.md) | Option solaire : adresse `0x41` (pont A0 soudé), sur le rail 12 V[cite: 1, 2, 7] |
| **Capteur de lumière** | 1 | [NL-202A — BH1750](../hardware/NL-202A-BH1750.md) | Adresse `0x23` (`soleil_lux`, broche `ADDR` reliée à `GND`)[cite: 1, 2, 4] |
| **Capteur de pluie** | 1 | [NL-208A — Capteur de pluie](../hardware/NL-208A-Capteur-pluie.md) | Id `meteo_pluie`, sortie analogique `AO` utilisée |
| **Commutation puissance** | 1 | [NL-402A — MOSFET D4184](../hardware/NL-402A-Mosfet-PWM.md) | Commutation low-side du booster (`GPIO 21`), placé **après** l'INA219[cite: 1, 2, 6] |
| **Horloge RTC (Option)** | 1 | DS3231 Mini (`0x68`) | Maintien de l'heure haute précision (TCXO ±2 ppm) hors Wi-Fi |
| **Buck 5 V** | 1 | Buck 5 V fixe (Vin 5–30 V) | Alimente l'ESP32-C6 depuis le rail 12 V |
| **Régulateur 3,8 V** | 1 | Buck réglable sans voyant (~75 mW) | Fixe la tension d'entrée du booster (≤ 4,0 V), toujours alimenté |
| **Booster haute tension** | 1 | Générateur 2 kV (Vin 3,0–4,2 V) | Génère la haute tension de la grille (isolé en boîte HT) |

### Composants passifs, protection et câblage

| Composant | Qté | Spécification | Rôle |
| :--- | :---: | :--- | :--- |
| **Condensateur céramique** | 1 | **100 nF (104)** | Filtre HF soudé directement à l'entrée du booster (**seul condo ajouté**) |
| **Diode Schottky** | 1 | **1N5819** | Anti-retour entre la sortie du buck 5 V et le port USB-C de l'ESP32 |
| **Résistance pull-down MOSFET** | 1 | **10 kΩ** | Entre `GPIO 21` et `GND` (maintient le MOSFET fermé au boot/reset) |
| **Résistance pull-down Pluie** | 1 | **1 MΩ** | Entre `AO` (`GPIO 3`) et `GND` (détection de déconnexion capteur) |
| **Résistance de test** | 1 | **47 Ω 1/2 W** | Charge fictive (~80 mA sous 3,8 V) pour régler le régulateur avant montage |
| **Résistance de maintien** | 1 | **1 kΩ** *(conditionnelle)* | À monter en sortie du régulateur uniquement si sa tension dérive à vide |
| **Diode TVS (Mode B)** | 1 | **SMBJ15A** (ou SMBJ18A) | Écrêtage des surtensions sur le rail 12 V batterie/solaire |
| **Fusibles** | 2 | **1 A** (branche HT) + **Général** | Protection des câbles contre les courts-circuits |
| **Interrupteur physique** | 1 | **MTS-102** | Coupure matérielle de la chaîne HT lors des interventions |
| **Bornier de masse** | 1 | **Wago 221-415** (5 entrées) | Nœud unique de masse en étoile |
| **Liaison capteurs** | 1 | **Câble RJ45 Cat5e/Cat6** (≤ 3 m) | Déport étanche des capteurs `soleil_lux` et `meteo_pluie` |
| **Boîtiers étanches** | 2 | 1 Boîte BT + 1 Boîte HT | Séparation physique stricte entre électronique logique et haute tension |

---

## 3. 🛠️ Architecture et montage

### Alimentation : deux modes sur un rail 12 V unique
- **Mode A (Actuel — Banc / Secteur)** : Bloc secteur 12 V régulé.
- **Mode B (Autonome — Solaire / Batterie 12 V)** : Panneau solaire → Contrôleur de charge 12 V → Batterie 12 V.
  - *Règles Mode B* : Ne jamais brancher le panneau sans contrôleur (> 18 V à vide). Toujours raccorder la batterie au contrôleur **avant** le panneau. Placer un fusible au plus près de la borne batterie, une diode **TVS SMBJ15A** après le fusible général, et n'utiliser sur le rail 12 V que des composants supportant **au moins 25 V**.

### Schéma d'architecture globale

```text
  [ SOURCE 12 V ]  Mode A : Bloc secteur 12 V  |  Mode B : Panneau > Contrôleur > Batterie 12 V
        │
   Fusible général  (Mode B : + TVS SMBJ15A juste après)
        │
        ├────────────── BRANCHE LOGIQUE (Boîte BT) ─────────────────────────┐
        │                                                                   │
        │            Buck 5 V fixe ─► Schottky 1N5819 ─► 5V ESP32-C6        │
        │                                                                   │
        └────────────── BRANCHE HAUTE TENSION ──────────────────────────────┘

   ┌─────────────────────────── BOÎTE BT (Étanche) ─────────────────────────┐
   │ Fusible 1 A ─► Interrupteur MTS-102                                    │
   │      ─► Régulateur 3,8 V sans voyant (~75 mW, toujours alimenté)       │
   │      ─► INA219 (VIN+ -> VIN-)   [Mesure tension + puissance booster]   │
   │      ─► D4184 (VIN+ ... OUT+)   [Commutation low-side]                 │
   │                                                                        │
   │ ESP32-C6 GPIO 21 ─► TRIG D4184  (fil court torsadé avec sa masse)      │
   │ Résistance 10 kΩ : entre GPIO 21 et GND                                │
   │                                                                        │
   │ [Port RJ45] ══ Câble Cat5e/Cat6 (≤ 3 m) ══► BH1750 (0x23) + Pluie (AO) │
   └──────────────────────── 2 fils ≥ 0,5 mm² (OUT+ / OUT-) ────────────────┘
                                         │ (Distance ≥ 10 cm)
                                         ▼
   ┌────────────────────────── BOÎTE HT (Étanche, seule) ───────────────────┐
   │ Condensateur 104 en parallèle ║ Entrée booster ─► Booster 2 kV ─► HARPE│
   └────────────────────────────────────────────────────────────────────────┘
   
```
   
   ### Câblage en étoile du nœud de masse (Wago 221-415)

Toutes les masses de puissance et de logique convergent vers un unique bornier Wago sans jamais traverser les pistes de l'ESP32-C6 :

- **Entrée [1]** : `GND` Source 12 V (bloc secteur ou borne `−` batterie)
- **Entrée [2]** : `GND` du Buck 5 V (`= GND` ESP32-C6 `= GND` logique INA219 / RJ45)
- **Entrée [3]** : `VIN −` du D4184 (retour de puissance du booster)
- **Entrée [4]** : `GND` commande du D4184
- **Entrée [5]** : `IN −` du régulateur 3,8 V

### Étapes d'assemblage (dans l'ordre)

1. **Rail logique (5 V / 3,3 V)** :
    - Raccorder la sortie du **buck 5 V** à l'entrée `5V` de l'ESP32-C6 à travers la diode **Schottky 1N5819**.
    
2. **Réglage préalable du régulateur 3,8 V (à blanc)** :
    - Raccorder `IN+` du régulateur après l'interrupteur MTS-102 (et fusible 1 A), et `IN-` au Wago (entrée 5).
    - **Sans brancher le booster**, connecter la résistance de charge de **47 Ω** en sortie du régulateur et régler la tension à **3,5 V**.
    - Débrancher la 47 Ω et vérifier que la tension à vide reste strictement **sous 4,0 V** (si elle dérive à vide, laisser une résistance de **1 kΩ** en permanence en sortie).
    
3. **Chaîne de mesure (INA219) et commutation (D4184)** :
    - Alimenter l'INA219 en logique (`VCC` sur `3V3` ESP32, `GND` sur `GND` ESP32) et relier `SDA` sur `GPIO 6`, `SCL` sur `GPIO 7`.
      - Câbler la puissance : `OUT+` du régulateur → `VIN+` de l'INA219 ; `VIN-` de l'INA219 → `VIN+` du D4184.
    - Relier `VIN-` du D4184 au Wago (entrée 3) et le `GND` de commande au Wago (entrée 4).
    - Relier `GPIO 21` à `TRIG/PWM` du D4184 (fil court torsadé avec sa masse) et installer la résistance de **10 kΩ** entre `GPIO 21` et `GND` côté ESP32.
    
4. **Câblage des capteurs extérieurs (RJ45)** :
    - Câbler le BH1750 (`0x23`) et le capteur de pluie (`AO` sur `GPIO 3` avec sa pull-down de **1 MΩ** vers `GND`) via le câble RJ45 selon le tableau T568B de la section 5.
    - Raccorder le `GND` du capteur de pluie sur une broche `GND` dédiée de l'ESP32.
    
5. **Boîte Haute Tension (Booster seul)** :
    - Installer le booster 2 kV **seul** dans sa boîte étanche, espacée d'au moins **10 cm** de la boîte BT.
    - Relier `OUT+` et `OUT-` du D4184 à l'entrée du booster avec deux fils courts de section **≥ 0,5 mm²**.
    - Monter le condensateur céramique **100 nF (104)** en parallèle au plus près de l'entrée du booster (isoler les pattes à la gaine thermorétractable).
    - Raccorder les deux fils haute tension isolés vers la grille de la harpe.

## 4. ✅ Mise en service et vérifications

Respecter scrupuleusement cet ordre de validation avant de mettre la grille sous haute tension :

1. **Contrôle des alimentations (Mode A, sans booster ni harpe)** :
    - Mettre sous tension et vérifier la présence du **5 V** et du **3,3 V** sur l'ESP32-C6.
    - Mesurer la sortie du régulateur avec la charge de **47 Ω**, puis **à vide** (D4184 ouvert puis fermé).
    - _Critère de validation_ : Tension stable et strictement **< 4,0 V** dans tous les cas ; aucune broche GPIO de l'ESP32 ne doit jamais dépasser **3,3 V** (max absolu 3,6 V).
        
2. **Sécurité de la commande au boot (`GPIO 21`)** :
    - Vérifier au multimètre que `GPIO 21` reste à **0 V** (MOSFET coupé) lors de la mise sous tension, pendant un reset manuel et lors d'un redémarrage Watchdog.
        
3. **Validation du bus I²C et des capteurs (24 h à blanc)** :
    - Laisser tourner 24 h sans booster ni harpe.
    - _Critère de validation_ : Remontée fluide de `energie_harpe`, `soleil_lux` et `meteo_pluie`, zéro erreur I²C et zéro reboot intempestif de l'ESP32.

4. **Essai du booster à vide (sans la harpe)** :
    - Couper l'alimentation, brancher le booster seul dans sa boîte HT fermée (sorties HT isolées en l'air)[cite: 1, 2].
    - Remettre sous tension, déclencher le tir et vérifier que la tension d'entrée lue par `energie_harpe` ne dépasse jamais **4,0 V**[cite: 1, 2].
    - Relever la **puissance à vide** (`power_mw`, typiquement ~450 à 500 mW) et paramétrer le seuil de coupure de la **Règle 1 (Anti-collage)** à environ **2 × cette valeur** (ex. 750 à 950 mW)[cite: 1, 2].
        
    - Bloquer définitivement la vis du potentiomètre du régulateur avec une goutte de vernis[cite: 1, 2].
        
5. **Validation fonctionnelle des sécurités (Conditions d'arrêt)** :
    
    - Masquer le BH1750 (≤ 50 lux) → la sortie `extracteur_air` doit passer immédiatement à `OFF`[cite: 1, 2].
        
    - Humidifier le capteur de pluie (`raw` ≤ 2400) → la sortie doit passer immédiatement à `OFF`[cite: 1, 2].
        
6. **Raccordement final de la harpe** :
    
    - Basculer l'interrupteur physique MTS-102 sur `OFF`, raccorder la grille de la harpe, refermer les boîtiers et enclencher l'interrupteur[cite: 1, 2].
        
    - Valider plusieurs heures en Mode A avant tout déploiement en Mode B (solaire/batterie)[cite: 1, 2].
        

## 5. 📐 Documentation technique avancée

### Plan de brochage complet (ESP32-C6)

|**Signal**|**Broche ESP32-C6**|**Périphérique cible**|**Spécification électrique**|
|---|---|---|---|
|**I²C SDA**|`GPIO 6`|INA219 (`0x40`), BH1750 (`0x23`), DS3231 (`0x68`)|Bus à 50 kHz, pull-ups internes aux modules (~6 kΩ équivalent)[cite: 1, 2]|
|**I²C SCL**|`GPIO 7`|INA219 (`0x40`), BH1750 (`0x23`), DS3231 (`0x68`)|Bus à 50 kHz, 3,3 V strict[cite: 1, 2]|
|**Commande MOSFET**|`GPIO 21`|Entrée `TRIG/PWM` du D4184|Sortie PWM (0 ou 100 %), pull-down **10 kΩ** vers `GND`<br><br>[cite: 1, 2]|
|**Pluie Analogique**|`GPIO 3`|Sortie `AO` du capteur de pluie|Entrée ADC1, pull-down **1 MΩ** vers `GND`<br><br>[cite: 5]|
|**Alimentation Logique**|`3V3` / `GND`|INA219, BH1750, Capteur de pluie|3,3 V max (retour `GND` dédié pour le capteur de pluie)[cite: 1, 2, 5]|

> ⛔ **Broches interdites sur ESP32-C6** : `GPIO 4, 5, 8, 9, 15` (strapping de boot), `GPIO 12, 13` (USB natif), `GPIO 16, 17` (UART0 console) et `GPIO 24 à 30` (Flash SPI interne)[cite: 1, 2, 3].

### Câblage déporté RJ45 (Standard T568B — Longueur max 3 m)

> ⚠️ **Règle anti-diaphonie I²C** : Ne **jamais** regrouper `SDA` et `SCL` sur la même paire torsadée (risque de corruption des trames par couplage capacitif). Chaque ligne I²C est torsadée avec son propre conducteur `GND`. Aucun courant du booster ne transite par ce câble.

|**Broche RJ45**|**Couleur (T568B)**|**Paire**|**Signal**|**Côté Boîte BT**|**Côté Capteurs extérieurs**|
|---|---|---|---|---|---|
|**1**|⚪/🟠 Blanc-Orange|**Paire 2**|**SDA**|`GPIO 6`|`SDA` BH1750|
|**2**|🟠 Orange|**Paire 2**|**GND**|Wago Masse (blindage SDA)|`GND` BH1750|
|**3**|⚪/🟢 Blanc-Vert|**Paire 3**|**SCL**|`GPIO 7`|`SCL` BH1750|
|**6**|🟢 Vert|**Paire 3**|**GND**|Wago Masse (blindage SCL)|Masse commune|
|**4**|🔵 Bleu|**Paire 1**|**+3V3**|Rail `3V3` ESP32|`VCC` BH1750 + `VCC` Pluie|
|**5**|⚪/🔵 Blanc-Bleu|**Paire 1**|**GND**|Wago Masse|Retour alimentation 3V3|
|**7**|⚪/🟤 Blanc-Marron|**Paire 4**|**PLUIE_AO**|`GPIO 3` (ADC)|Sortie `AO` Capteur pluie|
|**8**|🟤 Marron|**Paire 4**|**GND_PLUIE**|`GND` dédié ESP32|`GND` Capteur pluie|

### Configuration JSON Natulib OS (`/dev/`)

JSON

```
[
  {
    "id": "energie_harpe",
    "type": "ina219",
    "pins": { "sda": 6, "scl": 7 },
    "interval_ms": 250,
    "active": true
  },
  {
    "id": "soleil_lux",
    "type": "bh1750",
    "address": 35,
    "pins": { "sda": 6, "scl": 7 },
    "interval_ms": 60000,
    "active": true
  },
  {
    "id": "meteo_pluie",
    "type": "rain_analog",
    "pins": { "digital": -1, "adc": 3 },
    "hold_sec": 60,
    "analog_threshold_pct": 5,
    "calibration": { "min": 1400, "max": 3200 },
    "active": true
  },
  {
    "id": "extracteur_air",
    "type": "pwm",
    "pins": { "pin": 21 },
    "active": true
  }
]
```

> 💾 **Préservation de la mémoire Flash** : Avec une lecture toutes les 250 ms sur `energie_harpe`, ne jamais déclencher d'écriture LittleFS à chaque échantillon[cite: 1, 2]. Conserver le mécanisme de tampon RAM/RTC avec transfert différé par seuil.

### Règles de Synapses (Matrice de sécurité)

Toutes les conditions d'une ligne sont liées par un **ET logique**[cite: 1, 2] :

|**N°**|**Règle**|**Conditions d'activation**|**Action déclenchée**|
|---|---|---|---|
|**1**|**Anti-collage**|`energie_harpe.power_mw` > **750 mW** _(ou 2× P_vide)_ pendant **0,5 s** ET sortie active[cite: 1, 2]|`off_extracteur_air` (cooldown 5 s)[cite: 1, 2]|
|**2**|**Allumage**|`energie_harpe.online` == **1**, `power_mw` < **600 mW** pendant **5 s**, sortie à l'arrêt, `voltage_v` ≤ **3,8 V**, `soleil_lux.lux` ≥ **60 lux**, `meteo_pluie.raw` > **2500**<br><br>[cite: 1, 2]|`pwm_100_extracteur_air` (cooldown 5 s)[cite: 1, 2]|
|**3**|**INA219 muet**|`energie_harpe.online` == **0** ET sortie active[cite: 1, 2]|`off_extracteur_air`<br><br>[cite: 1, 2]|
|**4**|**BH1750 muet**|`soleil_lux.online` == **0** ET sortie active[cite: 1, 2]|`off_extracteur_air`<br><br>[cite: 1, 2]|
|**5**|**Nuit**|`soleil_lux.lux` ≤ **50 lux** ET sortie active[cite: 1, 2]|`off_extracteur_air`<br><br>[cite: 1, 2]|
|**6**|**Surtension**|`energie_harpe.voltage_v` > **3,95 V** ET sortie active[cite: 1, 2]|`off_extracteur_air`<br><br>[cite: 1, 2]|
|**7**|**Pluie**|`meteo_pluie.raw` ≤ **2400** ET sortie active[cite: 1, 2]|`off_extracteur_air`<br><br>[cite: 1, 2]|

### Guide de dépannage matériel (Options si symptômes)

|**Symptôme constaté**|**Action corrective**|
|---|---|
|**Reboots de l'ESP32 sur les pics Wi-Fi**|Ajouter un condensateur **47 µF 16 V** (puis **470 µF 16 V** si besoin) sur le rail 5 V[cite: 1, 2]|
|**Erreurs I²C pendant les tirs ou câble RJ45 long**|Ajouter deux résistances de pull-up de **4,7 kΩ** vers `3V3` sur `SDA` et `SCL` côté boîte BT ; en dernier recours, isoler `GPIO 21` par un optocoupleur (PC817)[cite: 1, 2]|
|**Tension du régulateur 3,8 V qui dérive à vide**|Câbler une résistance permanente de **1 kΩ** en sortie du régulateur[cite: 1, 2]|
|**Arc électrique trop faible sur la grille**|1. Vérifier qu'aucun condensateur chimique (47 µF) n'est présent à l'entrée du booster[cite: 1, 2].<br><br>  <br><br>2. Contrôler que la règle 1 ou 6 ne coupe pas le tir[cite: 1, 2].<br><br>  <br><br>3. Vérifier la tension en charge sur `energie_harpe` et raccourcir les deux fils (≥ 0,5 mm²) vers le booster[cite: 1, 2].|

### Historique des révisions

|**Version**|**Évolution**|
|---|---|
|**A**|Première ébauche théorique du projet[cite: 1, 2]|
|**B**|Passage sur ESP32-C6 et rail 12 V, brochage `GPIO 6/7` et `21`, révision des seuils de sécurité[cite: 1, 2]|
|**C**|Régulateur 3,8 V placé avant le D4184 et alimenté en continu ; isolation du booster seul en boîte HT ; retrait du 1 000 µF sur le rail 5 V[cite: 1, 2]|
|**D**|Validation au banc (Mode A) : INA219 déplacé après le régulateur ; suppression du 47 µF d'entrée booster (seul le 104 est conservé) ; bus I²C à 50 kHz ; asservissement BH1750 et capteur de pluie[cite: 1, 2]|
|**E**|Structuration en 5 parties, optimisation veille Mode B (~75 mW sans voyant), plan de câblage RJ45 T568B anti-diaphonie, hystérésis des règles Synapses (lux/tension + `online == 1`) et maillage vers les fiches modules|
   
   
   
   
   
   
# 🐝⚡ Harpe électrique tueuse de frelons

---

## 👀 En bref

La harpe électrique est un maillage de fils conducteurs parallèles alternés, porté à une haute tension sous faible courant. Au contact d'un frelon asiatique (_Vespa velutina_), un arc se forme et neutralise l'insecte.

L'étage haute tension est un module booster dédié (entrée 3,0 à 4,2 V, sortie environ 1 500 à 2 000 V). Natulib assure :

- ⚡ **La commutation du booster** via un module double MOSFET D4184, piloté par `GPIO 21` ;
- 📊 **La surveillance du booster** via l'INA219 (tension d'entrée, puissance, détection d'un frelon collé) ;
- 🛡️ **La coupure automatique** en cas de puissance anormale persistante, de surtension, de capteur muet ou de crash système ;
- ☀️ **L'asservissement à l'environnement** : harpe active seulement de jour (BH1750) et par temps sec (capteur de pluie analogique), avec coupure nocturne systématique pour préserver l'étage HT de la rosée et protéger l'entomofaune nocturne.

> 🛑 **Avertissement sécurité** : la haute tension (2 kV) est dangereuse pour l'humain, les animaux et les porteurs de stimulateur cardiaque, même à faible courant. La grille doit être confinée derrière une grille externe à mailles larges hors de portée. Le booster doit être isolé dans une boîte de dérivation étanche dédiée, et un **interrupteur physique** doit permettre de couper la chaîne HT hors de toute commande logicielle (nettoyage, intervention).

---

## 🎯 Principes de conception

1. **Simplicité** : pas de module ni de condensateur ajouté tant qu'un symptôme ne le justifie (voir « Options si symptômes »).
2. **La protection vient du logiciel et de la mise en boîte** : `GPIO 21` bas dès le début de `setup()`, watchdog actif, règles de coupure sur la puissance et la tension.
3. **Deux boîtes séparées** : une boîte basse tension (BT) avec toute l'électronique logique et de commande, une boîte HT avec le booster seul. Seuls deux fils d'alimentation les relient.
4. **Le régulateur 3,8 V n'est jamais coupé** : plus de redémarrage ni de dépassement de tension à chaque cycle, plus d'appel de courant sur son entrée, et sa masse reste fixée au nœud en étoile.
5. **L'INA219 est après le régulateur** : il mesure ce que reçoit réellement le booster (tension et puissance) et permet de refuser l'allumage ou de couper si la tension dépasse la limite.
6. **Déport des capteurs par RJ45** : les paires torsadées acheminent l'I²C et le signal de pluie en isolant chaque ligne rapide avec son propre retour de masse.

---

## 🔋 Alimentation : deux modes, un seul rail 12 V

Le montage ne voit qu'un **rail 12 V** protégé par un fusible général. Seule la source change.

|Mode|Source|Statut|
|:--|:--|:--|
|**A**|Bloc secteur 12 V régulé|Validé au banc (tests et prototype)|
|**B**|Panneau solaire → contrôleur de charge 12 V → batterie 12 V|Prévu|

**Mode B : règles à respecter**

- Le panneau ne se branche **jamais** directement sur le rail : un panneau « 12 V » dépasse couramment 18 V à vide. Il passe obligatoirement par un **contrôleur de charge adapté à la chimie de la batterie** (avec sortie _load_ et coupure basse tension).
- Respecter l'ordre de branchement de la notice du contrôleur (batterie d'abord, panneau ensuite).
- Un fusible sur la borne de la batterie, au plus près, et un fusible sur l'entrée panneau.
- Une batterie au plomb en charge monte vers 14,4 V : **tout composant ajouté sur le rail 12 V doit supporter au moins 25 V**. Aucun condensateur 16 V sur ce rail.
- Ajouter une **TVS SMBJ15A** (ou SMBJ18A) sur le rail 12 V, juste après le fusible général.
- **Consommation de veille optimisée** : le régulateur reste alimenté la nuit. Le passage d'un régulateur avec afficheur (~400 mW) à une **version sans voyant/écran abaisse la veille à ~75 mW** (~6,1 mA sous 12 V), permettant une exploitation solaire sereine.
- **Surveillance de la batterie** : l'INA219 principal étant placé après le régulateur, la mesure du rail 12 V nécessite un **second INA219** configuré à l'adresse `0x41` (pont A0 soudé) en amont sur le rail 12 V.

---

## 🧱 Modules Natulib & Composants du montage

Les modules standards renvoient directement vers leur fiche technique de référence pour les détails de soudure, de calibration et de fonctionnement interne :

|Module / Composant|Référence / Fiche Module|Rôle dans le projet|
|:--|:--|:--|
|**Contrôleur principal**|[NL-001A — ESP32-C6 N16](../hardware/NL-001A-ESP32-C6-N16.md)|Cerveau logique, exécute Natulib OS|
|**Mesure d'énergie HT**|[NL-207A — INA219](../hardware/NL-207A-Capteur-courant-INA219.md)|Adresse `0x40` (`energie_harpe`), placé **après** le régulateur 3,8 V|
|**Mesure batterie (Mode B)**|[NL-207A — INA219](../hardware/NL-207A-Capteur-courant-INA219.md)|Adresse `0x41` (pont A0 fermé), placé sur le rail 12 V|
|**Capteur de lumière**|[NL-202A — BH1750](../hardware/NL-202A-BH1750.md)|Adresse `0x23` (`soleil_lux`), asservissement jour/nuit|
|**Capteur de pluie**|[NL-208A — Capteur de pluie](../hardware/NL-208A-Capteur-pluie.md)|Id `meteo_pluie`, coupure immédiate sous la pluie|
|**Commutation puissance**|[NL-402A — MOSFET D4184](../hardware/NL-402A-Mosfet-PWM.md)|Commutation low-side du booster (`GPIO 21`), placé **après** l'INA219|
|**Horloge RTC (Option)**|DS3231 Mini (`0x68`)|Maintien de l'heure haute précision (TCXO ±2 ppm) hors Wi-Fi (préféré aux PCF8563/DS1307)|
|**Buck 5 V**|Convertisseur Buck 5 V fixe (Vin 5–30 V)|Alimente l'ESP32-C6 depuis le rail 12 V|
|**Diode anti-retour**|Schottky 1N5819|Évite la rétro-alimentation entre buck 5 V et port USB-C|
|**Régulateur 3,8 V**|Buck réglable sans écran (~75 mW)|Fixe l'entrée du booster (≤ 4,0 V), toujours alimenté|
|**Résistance de tirage**|10 kΩ|Entre `GPIO 21` et `GND` (maintient le MOSFET fermé au boot)|
|**Charge de test**|47 Ω 1/2 W (~80 mA à 3,8 V)|Réglage et contrôle du régulateur en charge avant raccordement|
|**Booster haute tension**|Générateur 2 kV|Génère la tension de claquage de la grille|
|**Condensateur booster**|100 nF (104) céramique|Filtre HF soudé au plus près de l'entrée du booster (**seul condensateur ajouté**)|
|**Liaison capteurs**|Câble RJ45 Cat5e/Cat6 + embases|Déport étanche des capteurs extérieurs (`soleil_lux` et `meteo_pluie`)|
|**Protection & Coupure**|Fusible 1 A + Interrupteur MTS-102|Protection câblage et coupure physique d'intervention|
|**Répartiteur de masse**|Wago 221-415|Nœud de masse en étoile|

> ⚠️ **Note sur les condensateurs chimiques** : Le condensateur électrolytique de **47 µF 16 V** initialement testé à l'entrée directe du booster a été **retiré** : son impédance (ESR) associée à l'inductance des fils étouffait les fronts d'appel de courant impulsionnels de l'oscillateur HT et bridait la puissance de l'arc. Seul le **100 nF (104) céramique** doit être câblé sur l'entrée du booster.

---

## 🔌 Plan de brochage du projet (ESP32-C6)

Contrairement aux broches par défaut des fiches modules isolées, ce projet utilise l'assignation suivante sur le [NL-001A](../hardware/NL-001A-ESP32-C6-N16.md) :

|Signal|Broche ESP32-C6|Module cible|Remarque|
|:--|:--|:--|:--|
|**I²C SDA**|`GPIO 6`|INA219 (`0x40`), BH1750 (`0x23`), DS3231 (`0x68`)|Hors broches de strapping. Bus à 50 kHz|
|**I²C SCL**|`GPIO 7`|INA219 (`0x40`), BH1750 (`0x23`), DS3231 (`0x68`)|Hors broches de strapping. Bus à 50 kHz|
|**Commande Tir (TRIG)**|`GPIO 21`|MOSFET D4184 (`extracteur_air` / `tir`)|Sortie PWM/GPIO, niveau bas forcé au repos|
|**Pluie Analogique (AO)**|`GPIO 3` (ADC)|Capteur de pluie (`meteo_pluie`)|Entrée ADC, pull-down 1 MΩ recommandée|
|**Alimentation Capteurs**|`3V3` / `GND`|INA219, BH1750, Capteur de pluie|Logique 3,3 V stricte|

> ⛔ **Rappel ESP32-C6** : Ne jamais utiliser `GPIO 8, 9, 15` (strapping), `GPIO 12, 13` (USB) ni `GPIO 24 à 30` (Flash). Aucune broche ne doit recevoir plus de 3,3 V.

---

## 🌐 Câblage déporté RJ45 (Capteurs extérieurs)

Le déport du capteur de lumière ([NL-202A](../hardware/NL-202A-BH1750.md)) et du capteur de pluie ([NL-208A](../hardware/NL-208A-Capteur-pluie.md)) entre la boîte BT et l'extérieur s'effectue via un câble réseau RJ45 (Cat5e/Cat6) de **3 mètres maximum** (bus I²C à 50 kHz).

> ⚠️ **Règle anti-diaphonie I²C (Crosstalk)** : Ne **jamais** placer `SDA` et `SCL` dans la même paire torsadée. Le couplage capacitif entre les deux fils provoquerait des erreurs de bus immédiates. Chaque signal I²C est torsadé avec son propre fil de masse (`GND`).
> 
> 🛑 **Sécurité HT** : Aucun courant d'alimentation du booster ni aucun conducteur haute tension (2 kV) ne doit transiter par le câble RJ45.

### Plan de brochage RJ45 (Standard T568B)

| Broche RJ45 | Couleur (T568B) | Paire | Signal | Raccordement Boîte BT | Raccordement Capteurs |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **1** | ⚪/🟠 Blanc-Orange | **Paire 2** | **SDA** | `GPIO 6` | `SDA` BH1750 |
| **2** | 🟠 Orange | **Paire 2** | **GND** | Wago Masse (blindage SDA) | `GND` BH1750 |
| **3** | ⚪/🟢 Blanc-Vert | **Paire 3** | **SCL** | `GPIO 7` | `SCL` BH1750 |
| **4** | 🔵 Bleu | **Paire 1** | **+3V3** | Rail `3V3` ESP32 | `VCC` BH1750 + `VCC` Pluie |
| **5** | ⚪/🔵 Blanc-Bleu | **Paire 1** | **GND** | Wago Masse | Retour alimentation logique |
| **6** | 🟢 Vert | **Paire 3** | **GND** | Wago Masse (blindage SCL) | Masse commune |
| **7** | ⚪/🟤 Blanc-Marron | **Paire 4** | **PLUIE_AO** | `GPIO 3` (ADC) | Sortie `AO` Capteur pluie |
| **8** | 🟤 Marron | **Paire 4** | **GND_PLUIE** | `GND` dédié ESP32 | `GND` Capteur pluie |

---

## 🛠️ Schéma d'architecture globale

```text
  [ SOURCE 12 V ]  mode A : bloc régulé  |  mode B : panneau > contrôleur > batterie
        │
   fusible général  (mode B : + TVS SMBJ15A juste après)
        │
        ├────────────── BRANCHE ESP (boîte BT) ─────────────────────────────┐
        │                                                                   │
        │            Buck 5 V fixe ─ Schottky 1N5819 ─ 5V ESP32-C6          │
        │                                                                   │
        └────────────── BRANCHE HAUTE TENSION ──────────────────────────────┘

   ┌─────────────────────────── BOÎTE BT (étanche) ─────────────────────────┐
   │ fusible 1 A ─ interrupteur MTS-102                                     │
   │      ─> régulateur 3,8 V sans voyant (~75 mW, masse au Wago)           │
   │      ─> INA219 (Vin+ -> Vin-)   mesure tension + puissance du booster  │
   │      ─> D4184 VIN+ ... OUT+                                            │
   │                                                                        │
   │ ESP32-C6 GPIO 21 ─> TRIG D4184      (fil court, torsadé avec sa masse) │
   │ 10 kΩ : GPIO 21 vers GND                                               │
   │                                                                        │
   │ [Embase RJ45] ══ Câble Cat5e/Cat6 ══> BH1750 (0x23) + Sonde Pluie (AO) │
   └──────────────────────── 2 fils ≥ 0,5 mm² (OUT+ / OUT-) ────────────────┘
                                         │
                                         ▼
   ┌────────────────────────── BOÎTE HT (étanche, seule) ───────────────────┐
   │ 104 céramique en parallèle ║ entrée booster ─> booster 2 kV ─> 🐝 HARPE│
   └────────────────────────────────────────────────────────────────────────┘

  Masse : tout revient au nœud unique (Wago 221-415), sans traverser l'ESP32.

```

## 📋 Procédure d'assemblage du projet

_(Pour la préparation individuelle de chaque module, référez-vous à sa fiche dédiée dans le tableau des composants)._

### Étape 1 : Le rail logique (5 V / 3,3 V)

1. Raccorde la sortie du **buck 5 V** à l'alimentation 5 V de l'[ESP32-C6](https://www.google.com/search?q=../hardware/NL-001A-ESP32-C6-N16.md&authuser=4) en passant par la diode **Schottky 1N5819**.
    

### Étape 2 : Réglage à blanc du régulateur 3,8 V

1. Raccorde `IN+` du régulateur à la sortie de l'interrupteur (+12 V après fusible 1 A), et `IN-` au nœud de masse Wago.
    
2. **Sans brancher le booster**, règle la sortie à **3,5 V** avec la **résistance de charge de 47 Ω**, puis vérifie qu'elle reste strictement **sous 4,0 V** à vide.
    
3. Bloque le potentiomètre avec un point de vernis une fois la mise en service validée.
    

### Étape 3 : Insertion de l'INA219 et du D4184

1. Alimente l'[INA219](https://www.google.com/search?q=../hardware/NL-207A-Capteur-courant-INA219.md&authuser=4) en 3,3 V et relie `SDA` (`GPIO 6`) et `SCL` (`GPIO 7`).
    
2. Relie `OUT+` du régulateur sur `VIN+` de l'INA219, puis `VIN-` de l'INA219 vers `VIN+` du [MOSFET D4184](https://www.google.com/search?q=../hardware/NL-402A-Mosfet-PWM.md&authuser=4).
    
3. Relie `VIN-` et `GND` du D4184 directement au bornier Wago de masse.
    
4. Connecte `TRIG/PWM` du D4184 à `GPIO 21` avec la résistance de pull-down de **10 kΩ** entre `GPIO 21` et `GND`.
    

### Étape 4 : Câblage du nœud de masse en étoile (Wago 221-415)

Plaintext

```
  Wago 5 entrées : nœud de masse central
  [1] GND source (bloc 12 V ou borne − batterie)
  [2] GND du buck 5 V (= GND ESP32 = GND logique capteurs / RJ45)
  [3] D4184 VIN − (retour de puissance du booster)
  [4] D4184 GND commande de GPIO 21
  [5] GND du régulateur 3,8 V
```

### Étape 5 : Connexion RJ45 et Boîte HT

1. Câble le cordon RJ45 vers le [BH1750](https://www.google.com/search?q=../hardware/NL-202A-BH1750.md&authuser=4) et le [capteur de pluie](https://www.google.com/search?q=../hardware/NL-208A-Capteur-pluie.md&authuser=4) en respectant le tableau T568B.
    
2. Place le **booster 2 kV seul** dans sa boîte étanche dédiée (à au moins 10 cm de la boîte BT).
    
3. Relie `OUT+` et `OUT-` du D4184 à l'entrée du booster par deux fils courts de section ≥ 0,5 mm², avec le condensateur céramique **100 nF (104)** en parallèle directe sur l'entrée du booster.
    

## ⚙️ Configuration Natulib OS & Recette

### Périphériques (`/dev/*.json`)

JSON

```
[
  {
    "id": "energie_harpe",
    "type": "ina219",
    "pins": { "sda": 6, "scl": 7 },
    "interval_ms": 250,
    "active": true
  },
  {
    "id": "soleil_lux",
    "type": "bh1750",
    "address": 35,
    "pins": { "sda": 6, "scl": 7 },
    "interval_ms": 60000,
    "active": true
  },
  {
    "id": "meteo_pluie",
    "type": "rain_analog",
    "pins": { "digital": -1, "adc": 3 },
    "hold_sec": 60,
    "analog_threshold_pct": 5,
    "calibration": { "min": 1400, "max": 3200 },
    "active": true
  },
  {
    "id": "extracteur_air",
    "type": "pwm",
    "pins": { "pin": 21 },
    "active": true
  }
]
```

> 💾 **Préservation de la mémoire Flash** : À un intervalle de 250 ms sur `energie_harpe`, assurez-vous que l'enregistrement historique s'effectue uniquement par seuil de transfert RAM/RTC (toutes les N mesures ou sur événement) et non à chaque échantillon, afin d'éviter l'usure prématurée de la Flash LittleFS.

### Règles de Synapses (Sécurité & Asservissement)

|**N°**|**Règle**|**Conditions (ET logique)**|**Action**|
|---|---|---|---|
|1|**Anti-collage**|`energie_harpe.power_mw` > **750 mW** pendant 0,5 s ET sortie active|`off_extracteur_air` (cooldown 5 s)|
|2|**Allumage**|`energie_harpe.online` == **1**, `power_mw` < **600 mW** pendant 5 s, sortie OFF, `voltage_v` ≤ **3,8 V**, `soleil_lux.lux` ≥ **60 lux**, `meteo_pluie.raw` > **2500**|`pwm_100_extracteur_air` (cooldown 5 s)|
|3|**INA219 muet**|`energie_harpe.online` == **0** ET sortie active|`off_extracteur_air`|
|4|**BH1750 muet**|`soleil_lux.online` == **0** ET sortie active|`off_extracteur_air`|
|5|**Nuit**|`soleil_lux.lux` ≤ **50 lux** ET sortie active|`off_extracteur_air`|
|6|**Surtension**|`energie_harpe.voltage_v` > **3,95 V** ET sortie active|`off_extracteur_air`|
|7|**Pluie**|`meteo_pluie.raw` ≤ **2400** ET sortie active|`off_extracteur_air`|

## 🛡️ Règles de sécurité et dépannage matériel

### Options si symptômes au banc

|**Symptôme observé**|**Correctif matériel à appliquer**|
|---|---|
|Reboots de l'ESP32 sur pics Wi-Fi|Ajouter un condensateur **47 µF 16 V** sur le rail 5 V (puis 470 µF 16 V si nécessaire)|
|Erreurs I²C avec câble RJ45 long (> 1,5 m)|Ajouter deux résistances de pull-up de **3,3 kΩ ou 4,7 kΩ** vers `3V3` sur `SDA` et `SCL` côté boîte BT|
|Sortie du régulateur 3,8 V qui dérive à vide|Placer une résistance de charge permanente de **1 kΩ** en sortie du régulateur|
|Arc faible en sortie de harpe|1. Vérifier qu'aucun condensateur chimique (47 µF) n'est branché sur l'entrée du booster.<br><br>  <br><br>2. Vérifier la tension en charge sur `energie_harpe`.<br><br>  <br><br>3. Raccourcir les fils entre D4184 et booster.|

## ✅ Mise en service, dans l'ordre

1. **Mode A, sans booster ni harpe** : alimenter le montage, vérifier le 5 V et le 3,3 V. Contrôler la sortie du régulateur avec la charge de **47 Ω**, puis à vide (< 4,0 V).
    
2. **Vérifier `GPIO 21`** : doit rester à 0 V au démarrage, pendant un reset et hors conditions d'allumage.
    
3. **Valider les capteurs RJ45** : vérifier dans les logs Natulib OS la remontée de `soleil_lux`, `meteo_pluie` et `energie_harpe` sans erreur I²C.
    
4. **Brancher le booster seul (sans harpe)** : relever la puissance à vide (`power_mw`) et ajuster le seuil de la règle 1 à environ **2× la puissance à vide**.
    
5. **Verrouiller le potentiomètre** du régulateur avec une goutte de vernis.
    
6. **Raccorder la harpe** et tester les déclenchements (simulation pluie, masquage du capteur de lumière).
    

## 🚧 Évolutions prévues

- [ ] Auditer `main.cpp` et les drivers C++ (`useWDT`, `wdtTimeout`, `GPIO 21` forcé à `LOW` dès le début de `setup()`)
- [ ] Intégration du second [INA219](https://www.google.com/search?q=../hardware/NL-207A-Capteur-courant-INA219.md&authuser=4) (`0x41`) dans le driver C++ pour la règle « batterie basse » (Mode B)
- [ ] Ajout optionnel d'une commande vocale hors-ligne (SU-03T sur port UART non bloquant) pour coupure mains-libres au rucher
- [ ] Comptage rapide des arcs pour évaluer la pression de prédation

## 🕓 Historique

|**Version**|**Évolution**|
|---|---|
|A|Première ébauche du projet, non testée sur prototype|
|B|ESP32-C6 et alimentation 12 V, brochage corrigé (`GPIO 6/7` et `21`), sécurité hors ligne et seuils révisés|
|C|Régulateur 3,8 V placé avant le D4184 et toujours alimenté ; booster seul en boîte HT ; 1 000 µF retiré du rail 5 V|
|D|Validation au banc (Mode A) : INA219 après régulateur, suppression du 47 µF d'entrée booster (conservé uniquement le 104 céramique), bus I²C à 50 kHz, ajout BH1750 et pluie|
|E|Optimisation veille à 75 mW (régulateur sans voyant), ajout du plan de câblage RJ45 T568B anti-diaphonie, hystérésis des règles Synapses (lux/tension + `online == 1`) et maillage vers les fiches modules Natulib|

