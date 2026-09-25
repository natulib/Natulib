---
title: "NL-208A — Capteur de pluie"
parent: Modules
ref: NL-208A
famille: sensors
etat: test
montage: soudure
temps: 20
niveau: intermediaire
prix: 1
interface: gpio
---

# 🌧️ NL-208A — Capteur de pluie

> 🟡 En test · 🟠 Soudure · 👤 Intermédiaire · ⏱️ 20 min · 💰 ~1 € · 🔌 GPIO / ADC

## 👀 En bref

Le **capteur de pluie** détecte la présence d'eau sur une plaque conductrice.

Natulib peut utiliser cette information pour :

- 🌧️ détecter un épisode de pluie ;
- 🪴 adapter le comportement d'une plante ou d'une recette ;
- 📊 suivre l'humidité présente sur la surface du capteur ;
- ⚡ suspendre un arrosage automatique.

Le module propose deux sorties :

- **DO** : sortie numérique avec seuil réglable (comparateur type LM393) ;
- **AO** : sortie analogique permettant d'exploiter une mesure progressive.

**Alimentation :** 3,3 à 5 V · **Sensibilité :** réglable · **Calibration :** seuil DO à régler.

---

## 📷 Aperçu

> 📷 _Photo à ajouter : `assets/NL-208A-Capteur-pluie-1.png`_

<!-- Décommentez cette ligne une fois la photo ajoutée : ![Module capteur de pluie](../assets/NL-208A-Capteur-pluie-1.png) -->

---

## 🛒 Ce qu'il vous faut

|Composant|Qté|Obligatoire|Fournisseur|
|---|--:|:-:|---|
|Module capteur de pluie|1|✅|Amazon|
|Câbles Dupont|3–4|✅|AliExpress|
|Résistance 10 kΩ à 1 MΩ (pull-down anti-parasite)|1|⚠️|Voir [Protection matérielle](.#-protection-mat%C3%A9rielle-recommand%C3%A9e)|

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

|Capteur|ESP32-C6|Fonction|
|---|---|---|
|VCC|3V3 (ou GPIO dédié, voir alimentation pulsée)|Alimentation|
|GND|GND (broche dédiée, voir ci-dessous)|Masse|
|DO|GPIO20|Détection numérique|
|AO _(optionnel)_|GPIO3|Mesure analogique|

> 💡 Utilisez **DO** pour une simple détection de pluie. **AO** permet d'exploiter une valeur progressive.

> ⚠️ Alimentez le module en **3,3 V** : ses sorties suivent la tension d'alimentation, et un module alimenté en 5 V renverrait 5 V sur une GPIO de l'ESP32-C6.

> ⚠️ **Masse dédiée obligatoire si un actionneur (relais, moteur, pompe...) est présent sur la même station.** Ne partagez jamais le retour GND de ce capteur avec celui d'un relais ou d'un autre organe consommant du courant en salves : l'appel de courant crée un micro-déplacement de potentiel de masse ("ground bounce") qui peut déclencher une fausse détection sur `DO`. Câblez le GND du capteur en étoile, directement sur une broche GND de l'ESP32, sans point de soudure partagé avec d'autres modules.

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](./Projets.md)**.

### ⚡ Alimentation pulsée (anti-électrolyse, recommandée)

Le driver `rain_analog` peut piloter l'alimentation du module via une broche `power` dédiée plutôt que de le laisser branché en continu sur 3V3 :

- la plaque n'est mise sous tension que **5 ms avant chaque lecture**, le temps que le comparateur LM393 se stabilise, puis coupée immédiatement après ;
- la plaque reste hors tension plus de 99 % du temps, ce qui limite fortement son électrolyse/oxydation en usage extérieur prolongé et prolonge sa durée de vie ;
- en contrepartie, l'interruption matérielle sur `DO` (qui permettrait de capter une goutte furtive entre deux cycles de lecture) est désactivée en mode pulsé, pour éviter les tempêtes d'interruptions sur une broche coupée donc flottante.

Pour l'activer, câblez `VCC` du module sur une GPIO de sortie de l'ESP32 (pas sur 3V3 direct) et renseignez cette broche dans `pins.power` (voir configuration ci-dessous). Sans cette broche, le module reste alimenté en continu et l'ISR anti-goutte-furtive reste active.

---

## 🛡️ Protection matérielle recommandée

Ces protections ne sont pas indispensables au fonctionnement de base, mais fortement conseillées pour un usage extérieur fiable et pour éviter les faux positifs :

### Résistance de tirage sur AO (détection de déconnexion)

Sans elle, une broche `AO` débranchée **flotte électriquement** : sa lecture peut se stabiliser n'importe où, y compris à une valeur qui tombe dans la plage de calibration normale et qui sera donc interprétée à tort comme une mesure de pluie valide plutôt que comme une anomalie.

- Ajoutez une résistance **1 MΩ entre la broche AO et GND** (pull-down) pour qu'une déconnexion tombe proprement à 0, nettement en dehors de la plage `calibration.min`/`calibration.max` — donc détectable comme anomalie plutôt que comme fausse pluie.
- Le driver `rain_analog` ne détecte pas nativement la déconnexion en logiciel **par défaut** — cette protection est purement matérielle tant que le paramètre `disconnect_below` n'est pas renseigné (voir configuration ci-dessous). Une fois la résistance de pull-down en place, vous pouvez activer la détection logicielle en complément.

### Filtre passe-bas anti-bruit (optionnel)

Utile si le capteur est exposé à des sources de bruit électrique (câblage long, proximité d'un relais ou d'un moteur) :

- **Sur AO** : résistance 1 kΩ en série, puis condensateur 100 nF entre la broche et GND.
- **Sur DO** : condensateur 100 nF entre la broche et GND, au plus près.

N'utilisez pas de condensateur de filtrage sur la ligne `VCC` en mode alimentation pulsée : un condensateur trop gros (électrolytique, dizaines de µF) ralentirait la mise sous tension et prolongerait l'électrolyse de la plaque à chaque cycle. Un petit condensateur céramique de découplage (100 nF) directement sur `VCC`/`GND` du module reste sans risque.

---

## ⚙️ Configuration Natulib OS

**Type :** `rain_analog`

```json
{
  "id": "pluie",
  "type": "rain_analog",
  "pins": {
    "digital": 20,
    "adc": 3,
    "power": 19
  },
  "invert": false,
  "hold_sec": 60,
  "analog_threshold_pct": 5,
  "calibration": {
    "min": 1400,
    "max": 3200
  },
  "active": true
}
```

|Paramètre|Fonction|
|---|---|
|`pins.digital`|Broche numérique reliée à `DO`|
|`pins.adc`|Broche analogique reliée à `AO` (facultative)|
|`pins.power`|Broche pilotant l'alimentation du module en mode pulsé (facultative — voir [Alimentation pulsée](https://claude.ai/chat/ea6075bd-e2a8-4444-8d2c-f63d884b6312#-alimentation-puls%C3%A9e-anti-%C3%A9lectrolyse-recommand%C3%A9e)). Sans elle, le module reste alimenté en continu|
|`invert`|Inverse la logique de la sortie `DO` (déf. `false`)|
|`hold_sec`|Durée (en secondes) pendant laquelle `rain_detected` reste maintenu à 1 après le dernier contact humide validé, pour éviter un effet stroboscope sur les actionneurs (déf. `60`)|
|`analog_threshold_pct`|Seuil minimal d'`intensity_pct` (en %) à dépasser pour valider une détection **quand seule la broche `adc` est câblée** (`digital` absent) — filtre le bruit de fond de l'ADC (déf. `5`)|
|`disconnect_below`|Optionnel — seuil `raw` en dessous duquel l'AO est considérée comme débranchée (`error: "sensor_disconnected"`, `intensity_pct` alors non calculé). **N'a de sens que si une résistance de pull-down externe est effectivement câblée sur `adc`** (voir [Protection matérielle](https://claude.ai/chat/ea6075bd-e2a8-4444-8d2c-f63d884b6312#-protection-mat%C3%A9rielle-recommand%C3%A9e)) ; laissez ce champ absent sinon, sous peine de faux positifs/négatifs. Le `DO`, s'il est câblé, continue de fonctionner normalement même si l'AO est jugée débranchée|
|`calibration.min` / `calibration.max`|Bornes de conversion de la sortie analogique en pourcentage d'intensité (mêmes valeurs par défaut que le driver `analog`, à ajuster selon votre module **et selon la présence ou non d'une résistance de pull-down**, voir plus haut)|
|`active`|Active / désactive le module|

Le driver expose les métriques `rain_detected` (booléen), `intensity_pct` (basé sur `AO`, si câblé), `raw` (valeur ADC brute) et `idle_time_sec` (temps écoulé depuis la dernière détection validée). L'intervalle de lecture par défaut est de 5000 ms (phénomène lent, pas besoin d'une fréquence élevée).

> 💡 **Priorité entre DO et AO :** si `pins.digital` est renseigné, c'est lui qui décide de `rain_detected` ; `intensity_pct`/`raw` restent alors purement informatifs (affichés mais sans effet sur la détection). Ce n'est que si `pins.digital` est absent (`-1`) que `AO` pilote seul la détection, via `analog_threshold_pct`.

### 🔎 Lecture forcée et debug

Le bouton ⚡ (« Forcer la lecture ») disponible depuis le tableau de bord ou la fiche du module déclenche une lecture immédiate. Si `debug: true` est activé sur le module, cette lecture forcée est **toujours** tracée dans les logs (préfixe `⚡`), même si la valeur n'a pas assez varié pour déclencher un log de cycle normal — pratique pour vérifier le câblage (`raw`) sans attendre un vrai épisode de pluie.

---

## 🛠️ Montage en 20 minutes

1. Soudez les broches du module si elles ne sont pas déjà installées.
2. Connectez le capteur à l'ESP32-C6 selon le tableau de câblage — avec un retour GND dédié, sans point de soudure partagé avec un autre organe.
3. Utilisez **DO** pour une détection simple ou **AO** pour une mesure analogique.
4. Déposez quelques gouttes d'eau sur la plaque.
5. Réglez le potentiomètre jusqu'au seuil de déclenchement souhaité.
6. Vérifiez la détection dans Natulib OS (utilisez le bouton ⚡ + `debug: true` pour observer `raw` en direct).

---

## 📏 Calibration

Le potentiomètre règle la sensibilité de la **sortie DO**.

1. Laissez la plaque sèche.
2. Vérifiez l'état de la sortie numérique.
3. Ajoutez progressivement de l'eau sur la plaque.
4. Ajustez le potentiomètre jusqu'au déclenchement souhaité.
5. Répétez le test plusieurs fois pour vérifier la stabilité du seuil.

> 💡 La sortie **AO** n'est pas une mesure pluviométrique calibrée : elle indique l'état d'humidification de la plaque.

> ⚠️ Si vous ajoutez la résistance de pull-down 10 kΩ recommandée plus haut, refaites cette calibration **avec la résistance déjà en place** : elle modifie la valeur `raw` lue à sec et donc les bornes `calibration.min`/`calibration.max` à utiliser.

---

## 🧩 Problèmes courants

**La détection reste active après la pluie** → La plaque sèche lentement ; inclinez-la pour favoriser l'évacuation de l'eau.

**La plaque se corrode** → Les pistes s'oxydent à l'usage en extérieur. Prévoyez un remplacement périodique de la plaque, qui est la pièce d'usure du module. L'alimentation pulsée (`pins.power`) limite ce phénomène mais ne l'élimine pas.

**`raw` reste bloqué à une valeur intermédiaire plausible quand le capteur est débranché** → La broche `AO` flotte électriquement et peut se stabiliser dans la plage de calibration normale. Ajoutez une résistance de pull-down sur `AO` (voir [Protection matérielle](https://claude.ai/chat/ea6075bd-e2a8-4444-8d2c-f63d884b6312#-protection-mat%C3%A9rielle-recommand%C3%A9e)).

**`rain_detected` passe brièvement à 1 sans raison lors de l'activation d'un relais ou d'un actionneur proche** → Signe quasi systématique d'un retour de masse partagé entre le capteur et l'actionneur. Séparez le câblage GND du capteur sur sa propre broche GND de l'ESP32 (masse en étoile), voir la section [Câblage](https://claude.ai/chat/ea6075bd-e2a8-4444-8d2c-f63d884b6312#-c%C3%A2blage). Vérifiez aussi la présence d'une diode de roue libre sur la bobine de l'actionneur en cause.

---

## 💡 À retenir

- Alimentez le module en **3,3 V**.
- **DO** fournit une détection numérique avec seuil réglable, **AO** une sortie analogique.
- Si `DO` et `AO` sont câblés simultanément, `DO` a priorité sur la détection : `AO` reste informatif.
- La plaque doit être exposée à l'eau pour détecter la pluie.
- Évitez de laisser le capteur constamment immergé.
- Pour une installation extérieure, prévoyez une fixation inclinée permettant à l'eau de s'évacuer.
- Séparez la plaque du comparateur : seule la plaque doit être exposée aux intempéries.
- Donnez toujours à ce capteur son propre retour GND, jamais partagé avec un relais ou un actionneur.
- Ajoutez une résistance de pull-down sur `AO` si vous voulez détecter une déconnexion matérielle du capteur.

---

## 🚧 Évolutions prévues

- [ ] Combinaison logicielle DO + AO (actuellement DO est prioritaire, AO reste informatif seul)
- [ ] Support pour boîtier extérieur
- [ ] Support clipsable pour les boîtiers Natulib

---

## 🔗 Ressources

- 🌱 [Recettes d'arrosage](https://claude.ai/Recettes.md)
- 🧱 [Retour au catalogue des modules](https://claude.ai/Modules.md)

---

## 🕓 Historique

|Version|Évolution|
|---|---|
|01092026|Première intégration du capteur de pluie|
