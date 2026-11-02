---
layout: module
bare: true
title: Photodiode BPW34
reference: NL-209A
ref: NL-209A
famille: sensors
categorie: Capteurs
statut: En test
etat: en_test
soudure: Sans soudure pour le prototype
montage: sans-soudure
niveau: Débutant
niveau_detail: Intégration logicielle à prévoir dans Natulib OS
duree: 15 min (montage d'essai)
temps: 15
interface: Analogique (ADC)
prix: Variable selon le fournisseur et le lot
alimentation: Montage sous 3,3 V
description: Photodiode sensible à la lumière visible et au proche infrarouge, pour la détection optique et les essais de mesure lumineuse (dont PAR expérimental).
presentation: >-
  Le BPW34 transforme la lumière reçue en un très faible courant électrique.
  Une résistance permet d'obtenir une tension lisible par l'entrée analogique
  de l'ESP32-C6. Dans Natulib, il pourra devenir un capteur optique polyvalent,
  notamment pour repérer l'allumage d'un objet lumineux sans le modifier.
  Avec des accessoires optiques et un étalonnage, il peut aussi servir à un
  montage expérimental de mesure du rayonnement utile aux plantes (PAR).
caracteristiques:
  - nom: Technologie
    valeur: Photodiode PIN au silicium, 2 connexions (A/K)
  - nom: Lumière détectée
    valeur: Visible et proche infrarouge (environ 430 à 1 100 nm)
  - nom: Surface photosensible
    valeur: 7,5 mm² (Vishay BPW34)
  - nom: Signal vers Natulib
    valeur: Tension analogique sur GPIO ADC via une résistance
  - nom: Montage conseillé pour débuter
    valeur: BPW34 + résistance de 100 kΩ + GPIO2 sur ESP32-C6 N16
  - nom: Mode PAR expérimental
    valeur: Filtre 400–700 nm, diffuseur, étalonnage de référence requis
  - nom: Driver Natulib OS V0.475
    valeur: Photodiode dédiée non intégrée — adaptation nécessaire
images:
  - fichier: /assets/NL-209A-BPW34-reperage.svg
    titre: Repérer anode et cathode — vue correspondant à la photographie
    alt: "Face photosensible vers soi, pattes vers le bas : sur la variante photographiée, le petit ergot métallique à droite repère la cathode K"
  - fichier: /assets/NL-209A-BPW34-branchement.svg
    titre: Montage Natulib — 3V3, GPIO2 et résistance 100 kΩ
    alt: La cathode K va au 3V3 et l'anode A va au GPIO2, avec une résistance 100 kiloohms entre GPIO2 et GND
elements:
  - "💡 Détection lumineuse"
  - "🚪 Passage et ouverture"
  - "🧩 Bouton optique"
  - "🌱 Mesure PAR expérimentale"
natulib_os_driver: À développer (driver optique polyvalent)
natulib_os_type: photodiode (prévu, non disponible dans V0.475)
validation_statut: Montage et intégration non encore testés
---

**Le BPW34 détecte des variations de lumière sans contact.** Ce n'est **ni une LED**, ni un bouton, ni un capteur de présence humaine : c'est une *photodiode* dont le signal peut servir à plusieurs organes Natulib.

> **État de la fiche — En test.** Le circuit ci-dessous est un **montage de départ à valider** avec le vrai BPW34 et la carte ESP32-C6 N16. Le firmware Natulib OS **V0.475** fourni ne possède pas encore de driver dédié `photodiode` ; les étapes d'intégration sont donc distinguées de celles déjà réalisables.

## 🌱 À quoi sert-il ?

- **Détecter une LED** : vérifier qu'un objet s'allume ou s'éteint, sans intervenir sur son électronique.
- **Détecter un passage** : placer une source lumineuse face au BPW34 ; un objet interrompt le faisceau.
- **Observer une ouverture** : repérer l'arrivée de lumière dans une boîte ou un tiroir.
- **Détecter un reflet** : éclairer un objet et mesurer la lumière qu'il renvoie (géométrie à régler).
- **Suivre une variation lumineuse** : mesurer une luminosité *relative*, mais **pas des lux étalonnés**. Pour des lux, choisir plutôt le module Natulib BH1750 (NL-202A).
- **Essayer un capteur PAR pour les plantes** : construire un montage avec filtre visible, diffuseur et étalonnage de référence. Usage **expérimental**, pas une valeur PAR absolue fiable sans validation.

**Exemple de projet :** utiliser un Clickeez lumineux complet et amovible comme bouton Natulib. C'est un *cas d'usage*, pas la définition du BPW34 : le même capteur doit rester utile pour d'autres montages.

## 🌱 Usage avancé — Capteur PAR expérimental pour les plantes

Le **PAR** (*Photosynthetically Active Radiation*) correspond au rayonnement utile à la photosynthèse, habituellement défini dans la plage **400 à 700 nm**. Un appareil PAR étalonné peut donner une densité de flux de photons photosynthétiques (**PPFD**, en **µmol·m⁻²·s⁻¹**). La BPW34 seule ne fournit **ni cette unité ni une mesure PAR précise** : sa réponse s'étend environ de **430 à 1 100 nm**, avec un maximum vers **900 nm** (proche infrarouge). En particulier, elle est peu sensible à une partie de la bande 400–430 nm et répond fortement hors PAR, dans l'IR.

Un montage de recherche amateur décrit dans le manuel [*Build-It-Yourself: Low-Cost Systems for Field Ecophysiology*](https://monkshilllab-isolab.github.io/LCSfFE-handbook/hardware-solutions.html) ajoute les éléments suivants :

| Élément pour l'usage PAR | Utilité | Statut |
|---|---|---|
| BPW34 | Produit un photocourant lié au rayonnement reçu | Capteur de base |
| **Filtre optique 400–700 nm** | Réduit la lumière proche infrarouge hors PAR | **Obligatoire pour tenter une estimation PAR** |
| **Diffuseur PTFE** | Homogénéise l'éclairage incident | Recommandé pour le montage étudié |
| Résistance **2,2 kΩ / 4,7 kΩ / 10 kΩ** | Convertit le courant lumineux en tension avec un gain plus faible qu'en mode LED | Valeur **à choisir après essais**, pas une valeur universelle |
| Boîtier noir imprimé en 3D | Maintient les éléments optiques et limite la lumière parasite | À concevoir |
| Référence PAR étalonnée | Permet de construire une courbe de conversion et de vérifier le résultat | **Nécessaire pour prétendre mesurer en PPFD** |

**Deux usages, deux réglages :** pour détecter la LED d'un Clickeez, **100 kΩ** est une valeur initiale utile car le photocourant peut être faible. En plein jour, une résistance **plus faible** (par exemple 2,2–10 kΩ) peut éviter que la lecture ADC ne soit saturée. La bonne valeur dépend de la lumière réelle, du filtre et de la géométrie.

**Pour Natulib :** tant que la conversion n'a pas été comparée à un véritable capteur PAR, exposer plutôt une **mesure analogique relative**. Une future métrique `ppfd` ne serait pertinente qu'après étalonnage et tests sous différents spectres lumineux (soleil, LED de culture, etc.). Le filtre 400–700 nm ne compense pas à lui seul la réponse spectrale non uniforme de la BPW34.

### Point de vigilance sur le schéma publié

Le schéma du manuel cité relie **l'anode à 5 V**, la **cathode à la sortie analogique** et une résistance de cette sortie à GND. **Tel que dessiné, ce montage polarise la diode en direct** : la broche de mesure pourrait recevoir une tension supérieure à ce qu'accepte un ESP32-C6. Il ne faut **pas le recopier dans Natulib** sans rectifier ou clarifier ce circuit avec la source. La mention **A2** dans le manuel désigne une entrée analogique de son microcontrôleur d'exemple ; **ce n'est pas le GPIO2 de notre ESP32-C6**.

Pour la station Natulib, garder le câblage **cathode → 3V3**, **anode → GPIO ADC**, **résistance ADC → GND** décrit ci-dessous. L'adaptation PAR consiste d'abord à **changer la valeur de résistance**, à ajouter **filtre + diffuseur** et à **étalonner**, sans injecter 5 V sur le GPIO.

## 🛒 Ce qu'il vous faut

| Matériel | Quantité | Rôle |
|---|---:|---|
| Photodiode **BPW34** | 1 | Détecter la lumière |
| Résistance **100 kΩ** | 1 | Convertir le photocourant en tension |
| Carte **ESP32-C6 N16** avec Natulib OS | 1 | Lire le signal ADC |
| Breadboard et fils Dupont | Selon montage | Réaliser l'essai sans soudure |
| Lampe ou LED visible | 1 (pour le test) | Vérifier la réaction du capteur |
| Condensateur **100 nF** | 1 (facultatif) | Filtrage éventuel de la mesure |

La photodiode est un composant **à deux pattes sans module électronique intégré**. Elle ne possède **ni VCC/SIG/GND**, ni bus I²C. Il faut réaliser le petit circuit décrit ci-dessous.

## 🔌 Branchement sur le NL-001A (ESP32-C6 N16)

> **À suivre pour le premier essai :** 1 BPW34 + 1 résistance **100 kΩ** + 3 connexions vers l'ESP32-C6 (**3V3**, **GPIO2**, **GND**). **Ne rien relier au 5V.** Ce montage est à tester hors tension avant le premier démarrage.

### 1. Identifier la cathode et l'anode (le point le plus important)

Sur **la photographie fournie avec cette fiche**, on regarde la BPW34 **du côté de sa fenêtre sensible**, les deux pattes **vers le bas** :

- **À droite sur CETTE vue : cathode `K`** — patte associée au **petit décroché / ergot métallique latéral** du boîtier.
- **À gauche sur CETTE vue : anode `A`** — patte sans ce repère.
- **Si la pièce est tournée ou regardée de dos, gauche et droite peuvent s'inverser.** Ce qui compte, c'est le **repère physique de cathode**, pas une position absolue.

![Repérage physique anode/cathode — Natulib BPW34](/assets/NL-209A-BPW34-reperage.svg)

Ce repère figure dans le dessin constructeur **« CATHODE MARKING »**, page 4 de la [fiche Vishay BPW34](https://www.vishay.com/docs/81521/bpw34.pdf). Le repère est une **petite particularité métallique du boîtier près de la patte**, **pas simplement une patte plus courte ou recourbée**. Sur une copie d'un autre fabricant, contrôler son propre brochage.

**Double vérification facultative au multimètre (mode diode), sans alimentation :** placer la pointe **rouge sur A** et la **noire sur K** : la photodiode peut afficher une chute de tension directe (souvent environ 0,5 à 0,8 V). En inversant les pointes, la lecture doit normalement indiquer un circuit non conducteur (`OL`). Cette vérification est indicative ; en cas de doute, privilégier la fiche de la référence exacte.

### 2. Réaliser le circuit sur breadboard, USB débranché

| Étape | Fil ou composant | Connexion à effectuer |
|---|---|---|
| **①** | BPW34 **cathode K** (patte avec ergot) | Sur le **3V3** de l'ESP32-C6 |
| **②** | BPW34 **anode A** (autre patte) | Sur un **point commun** de la breadboard |
| **③** | Fil de signal | De ce **point commun** au **GPIO2 (ADC)** |
| **④** | Résistance **100 kΩ** | **Une patte** sur le **même point commun** (A + GPIO2) |
| **⑤** | Résistance **100 kΩ** | **L'autre patte** au **GND** de l'ESP32-C6 |

**Schéma électrique :**

```text
         ESP32-C6 N16 (GPIO en logique 3,3 V)

  3V3  ──────────── K  [ BPW34 ]  A ───┬──── GPIO2  (ADC1)
                                       │
                                    [100 kΩ]
                                       │
  GND  ────────────────────────────────┘
```

![Schéma de câblage de la BPW34 avec Natulib](/assets/NL-209A-BPW34-branchement.svg)

**À retenir :** la **résistance est entre GPIO2 et GND**, **pas entre la cathode et le GPIO2**, ni en série avec la photodiode. Une résistance n'a pas de sens de montage. Le GPIO2 figure sur le **côté droit du profil de ta carte ESP32-C6 N16 double USB-C**, mais il faut toujours lire le **numéro de broche sérigraphié** sur la carte réelle ([fiche NL-001A](./NL-001A-ESP32-C6-N16.md)).

> ⚠️ **Attention à l'autre schéma trouvé sur Internet :** il indique **5V → anode**, **cathode → A2** et **résistance vers GND**. **Ne pas le recopier** sur l'ESP32-C6. Ici, on branche bien **3V3 → cathode K**, **anode A → GPIO2**, **100 kΩ → GND**. L'étiquette `A2` de cet autre document n'est pas le numéro `GPIO2` de notre carte.

### 3. Vérifications avant de rebrancher l'USB

- [ ] La **cathode avec l'ergot** va bien au **3V3** (et non au 5V).
- [ ] L'autre patte (**anode**) rejoint **GPIO2**.
- [ ] La **résistance 100 kΩ** est installée **entre GPIO2 et GND**.
- [ ] Les deux pattes de la BPW34 **ne se touchent pas**.
- [ ] Les pistes et rangées de la breadboard sont bien identifiées ; pas de court-circuit entre **3V3** et **GND**.
- [ ] **GPIO2 est libre** sur le montage Natulib (aucun autre organe dessus).

### 4. Premier essai électrique (sans modifier Natulib OS)

1. Rebrancher l'ESP32-C6 par **USB-C** après avoir vérifié les cinq points ci-dessus.
2. Avec un **multimètre en mode tension continue** (si disponible), poser la pointe **noire sur GND** et la **rouge sur le point commun GPIO2 / anode**.
3. **Masquer la BPW34** avec un objet opaque : la tension doit être **faible**, souvent proche de **0 V**.
4. **Éclairer la face sensible** avec une lampe ou le Clickeez : la tension doit **augmenter**. Revenir à l'obscurité pour constater qu'elle redescend.
5. Noter les mesures obtenues : elles permettront de choisir le futur seuil de détection dans Natulib.

| Essai | Tension mesurée entre GPIO2 et GND |
|---|---|
| BPW34 masquée | ______ V |
| Lumière ambiante | ______ V |
| Lampe proche | ______ V |
| Clickeez allumé | ______ V |
| Clickeez éteint après appui | ______ V |

**Sans multimètre :** ces étapes attendent la lecture ADC au moyen d'un outil de test ou d'un driver adapté. **Ne supposez pas** que l'organe générique `analog` de la V0.475 convient : voir plus bas sa détection de « déconnexion » lorsqu'il lit zéro.

### 5. Comprendre la valeur de la résistance

La lumière génère un faible **photocourant**, que la résistance convertit en tension. Dans le montage ci-dessus, **plus de lumière → tension généralement plus élevée**. Une résistance de **100 kΩ** est un **choix initial**, pas une valeur définitive.

| Observation | Action prudente |
|---|---|
| Quasiment 0 V même sous la lumière | Revoir d'abord le repère K/A, les fils, le point GPIO2 et l'orientation du capteur. |
| Signal détectable mais faible | Rapprocher la lumière ; envisager **220 kΩ** seulement après une première mesure. |
| Tension élevée / lecture ADC saturée | Diminuer la résistance, par exemple **47 kΩ** puis **10 kΩ** si nécessaire. |
| Variation lors du changement de couleur du Clickeez | Normal : la sensibilité de la BPW34 dépend de la longueur d'onde ; le futur bouton devra le tolérer. |

Une entrée ADC de l'ESP32-C6 peut **saturer avant 3,3 V selon l'atténuation choisie**, même si la broche reste dans sa plage électrique admissible. Ne pas déduire une tension exacte du seul nombre brut ADC sans connaître le réglage et l'étalonnage. La tension mesurée au multimètre reste l’indication la plus simple pour ce premier essai.

Un **condensateur de 100 nF** entre GPIO2 et GND peut être ajouté **plus tard** pour stabiliser la mesure, mais **ne le monte pas au premier essai** : commençons par le circuit minimal pour voir le comportement réel de la LED.

## 🚀 Première mise en service — état actuel de Natulib OS

1. Suivre **dans l'ordre les étapes 1 à 4 de « Branchement »** ci-dessus, sans sauter la vérification K/A.
2. Vérifier la variation de tension **lumière éteinte / allumée**, puis le retour à la valeur sombre.
3. Pour le Clickeez, tester **plusieurs couleurs** et l'orientation réelle de la lumière.
4. Consigner ces résultats dans le **cahier de validation** ci-dessous.
5. Pour afficher une mesure dans **Natulib Hardware**, il faudra le driver optique adapté (ou un outil ADC de diagnostic validé). **Ne pas importer** le JSON `photodiode` illustratif ci-dessous tant que ce type n'existe pas dans le firmware.

### Pourquoi ne pas sélectionner simplement « Sonde analogique » ?

Le driver actuel `DeviceAnalog` de **Natulib OS V0.475** (`type: analog`) est prévu notamment pour une sonde analogique calibrée. Dans le code fourni, il considère une lecture ADC **inférieure à 150** ou **égale/supérieure à 4095** comme une déconnexion, puis **désactive l'organe**. Or, dans l'obscurité, un BPW34 peut légitimement produire une lecture proche de zéro.

**Conclusion :** ne pas présenter `type: analog` comme une intégration fiable prête à l'emploi pour le BPW34. Il faut un **driver optique dédié** ou une évolution ciblée du driver générique qui accepte le zéro normal de la photodiode.

## 📊 Ce que Natulib pourra exploiter après intégration

Le BPW34 ne fournit qu'**un signal analogique** ; c'est le driver Natulib qui définit les métriques et les comportements. Proposition à confirmer lors de l'implémentation :

| Mode de l'organe | Métrique visée | Utilisation |
|---|---|---|
| Mesure optique | `optique_1.raw` | Lecture brute ADC, valeur relative |
| Détection de lumière / faisceau | `optique_1.detected` | Seuil d'éclairage ou interruption |
| Bouton lumineux | `optique_1.pressed` | État compatible avec les Synapses `tap` / `hold` |
| Diagnostic | `optique_1.online` | Driver opérationnel |

Ces **noms sont proposés**, pas des métriques publiées actuellement par le firmware.

### 🧩 Configuration Natulib OS — proposition, NON disponible en V0.475

L'objectif est d'avoir à terme un module réutilisable dans **Hardware**, dont la fonction est définie par la configuration (par exemple `light`, `beam` ou `button`). Le JSON suivant **illustre la cible**, il **ne doit pas être importé dans le firmware actuel** :

```json
{
  "id": "optique_1",
  "name": "💡 Photodiode BPW34",
  "category": "sec",
  "type": "photodiode",
  "pins": { "adc": 2 },
  "mode": "light",
  "interval_ms": 30,
  "active": true
}
```

Le type `photodiode`, la clé `mode`, les seuils, la calibration et la publication des états devront être définis dans le **nouveau driver**, puis exposés dans **Hardware**. Le passage en mode `button` permettra ensuite de réutiliser le moteur de Synapses existant, sans modifier celui-ci.

## 🧪 Cahier de validation Natulib

**Date :** ______ · **Version OS :** ______ · **Carte :** ______ · **GPIO ADC :** ______ · **Résistance :** ______ · **BPW34 / fabricant :** ______

| Essai | Résultat | Valeur / observation |
|---|---|---|
| ☐ Identifier correctement anode et cathode | Non testé | ______ |
| ☐ Brancher sous 3,3 V sans court-circuit | Non testé | ______ |
| ☐ Tester la tension dans l'obscurité | Non testé | ______ |
| ☐ Tester la tension sous une lampe | Non testé | ______ |
| ☐ Vérifier le retour à l'état sombre | Non testé | ______ |
| ☐ Lire le signal dans un driver Natulib adapté | Non testé | ______ |
| ☐ Vérifier le fonctionnement après redémarrage | Non testé | ______ |
| ☐ Tester plusieurs luminosités et conditions ambiantes | Non testé | ______ |

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur ce montage.

**Observations :** ______  
**Photos / logs :** ______

### Essai complémentaire : Clickeez (projet, pas module générique)

- [ ] Tester la lumière reçue **LED éteinte / LED allumée**.
- [ ] Tester **toutes les couleurs** pendant un appui long.
- [ ] Tester un Clickeez dans la **position réelle du futur support**, car sa base puzzle peut être opaque.
- [ ] Tester 10 appuis courts et 10 appuis longs, sans faux relâchement.
- [ ] Essayer avec l'éclairage habituel de la chambre et l'écran GC9A01 allumé.

Pour ce mode, prévoir dans le futur driver **seuil haut, seuil bas (hystérésis), anti-rebond et éventuelle temporisation de relâchement** : ces paramètres seront déterminés à partir des relevés, et non inventés avant les tests.

## 🛠️ Si cela ne fonctionne pas

| Symptôme | Premier contrôle |
|---|---|
| Tension toujours proche de zéro | Vérifier polarité K/A, GPIO2, résistance à GND et orientation de la lumière. |
| Tension toujours haute | Vérifier une éventuelle saturation, la valeur de la résistance et le câblage. |
| Réagit à la lampe mais pas au Clickeez | Chercher la zone lumineuse accessible ; ne pas supposer que la lumière traverse l'embase puzzle. |
| Mesure change au passage d'un objet | Normal : c'est le principe d'une barrière ou d'une détection de reflet. |
| Détection instable avec une LED qui change de couleur | Prévoir un réglage de seuils et un filtrage, puis retester toutes les couleurs. |
| Capteur marqué « débranché » dans `type: analog` | Comportement possible du driver actuel quand la valeur est basse ; utiliser un driver optique adapté. |
| Aucune métrique BPW34 n'apparaît dans Hardware | Le type `photodiode` n'est pas encore disponible dans Natulib OS V0.475. |

## 🔧 Évolutions prévues

- [ ] Ajouter un **driver optique polyvalent** dans Natulib OS, distinct du driver analogique de sonde de sol.
- [ ] Proposer ce module dans **Hardware** avec mode, GPIO, seuils et filtrage configurables.
- [ ] Exposer `raw`, `detected`, `pressed` selon le mode sélectionné, avec métriques compatibles Synapses.
- [ ] Ajouter une petite procédure de calibration visuelle dans Hardware.
- [ ] Concevoir un support imprimé en 3D si un projet exige une isolation de la lumière ambiante.

## ⚙️ Pour aller plus loin

**Montage mécanique :** laisser la face photosensible visible et éviter toute colle sur sa fenêtre. Pour détecter une source spécifique, placer le composant dans un canal opaque, par exemple en PETG noir. Ne pas le placer à côté d'une LED parasite sans écran optique.

**Faisceau infrarouge :** la BPW34 est sensible à l'IR proche, mais n'est **pas un récepteur de télécommande démodulé**. Pour compter des passages, utiliser une source lumineuse stable, un emplacement fixe et des seuils adaptés.

**Références :**

- [Vishay — Fiche technique BPW34/BPW34S (PDF, caractéristiques et repère de cathode)](https://www.vishay.com/docs/81521/bpw34.pdf)
- [NL-001A — ESP32-C6 N16](./NL-001A-ESP32-C6-N16.md)
- [NL-202A — BH1750](./NL-202A-BH1750.md) — mesure de lumière ambiante en lux
- [Documentation Natulib — Interface et Hardware](../natulib-os/interface.md)
- [Documentation Natulib — Drivers](../natulib-os/drivers.md)

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Création de la fiche module Natulib BPW34 ; montage sous 3,3 V, usages polyvalents et état d'intégration V0.475. |
| A.1 | Ajout du montage PAR expérimental, des accessoires optiques, des limites d’étalonnage et de l’alerte sur le schéma 5 V de référence. |
| A.2 | Identification visuelle de la cathode par son ergot métallique (photo fournie), double vérification possible au multimètre, câblage pas à pas sur breadboard, contrôles avant mise sous tension, mesures initiales. |
