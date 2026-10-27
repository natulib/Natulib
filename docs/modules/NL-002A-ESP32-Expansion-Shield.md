---
layout: module
bare: true
title: ESP32 Expansion Shield 30 broches
reference: NL-002A
ref: NL-002A
famille: core
categorie: Core
statut: Validé
etat: valide
soudure: Sans outil
montage: sans-outil
niveau: Débutant
duree: 2 min
temps: 2
interface: Aucune
prix: ≈ 3 €
description: Le NL-002A est un shield d'extension pour ESP32 DevKit 30 broches.
images: []
photos_a_ajouter: true
elements:
- 🔌 Extension GPIO
natulib_os_driver: Aucun driver dédié
validation_statut: Cahier de tests à renseigner
documentation_modele: Natulib V3
validation_note: Statut repris du catalogue antérieur ; essais détaillés non fournis
---
**ESP32 Expansion Shield 30 broches** — Extension à barrettes et borniers à vis pour faciliter le raccordement des modules à un ESP32 compatible.

> **État de documentation :** informations issues du catalogue existant et du firmware Natulib OS V0.448. Le statut historique « Validé » est conservé ; les essais ci-dessous restent à consigner.

## 🌱 À quoi sert ce module ?

Extension à barrettes et borniers à vis pour faciliter le raccordement des modules à un ESP32 compatible.

### Informations complémentaires

> 📷 *Photo à ajouter : `assets/NL-002A-ESP32-Expansion-Shield-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :

-->

## 🔌 Branchement

Vérifier l’orientation de la carte, les bornes de tension et les GPIO disponibles ; contrôler le partage de GND, 3,3 V, SDA et SCL.

**Avant toute connexion :** couper l'alimentation, identifier la variante exacte et vérifier la tension et les GPIO utilisés. Les GPIO4/5 des anciens exemples de câblage I²C ne doivent pas être considérés comme une recommandation universelle pour ESP32-C6.

### Matériel nécessaire

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| ESP32 Expansion Shield 30 broches | 1 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.


### Câblage détaillé

> **Important :** brochage historique à confirmer pour la carte utilisée ; les valeurs du JSON ne garantissent pas la compatibilité de chaque GPIO.

Chaque bornier est directement relié à une broche de l'ESP32 et identifié sur le shield.

| Bornier | Fonction |
|---|---|
| **3V3** | Alimentation 3,3 V des modules |
| **5V / VIN** | Alimentation 5 V, selon le shield |
| **GND** | Masse commune |
| **GPIOxx** | Une borne par GPIO, selon la sérigraphie |

> ⚠️ Vérifiez la correspondance réelle entre chaque borne et le GPIO attendu avant de raccorder un module. Le câblage réel de chaque module est documenté dans sa fiche **[Projet](../Projets.md)**.

## 🚀 Installation dans Natulib OS

1. Brancher le module hors tension, puis ouvrir l'interface web Natulib.
2. Utiliser le profil de carte pertinent dans Hardware ; les périphériques restent configurés dans leur propre fiche.
3. Vérifier le résultat dans **Accueil** ; consulter **Console** et **Maintenance** en cas d'erreur.

La configuration se fait depuis l'interface, **sans modifier de code Arduino**.

## 📊 Mesures ou fonctions

Aucune mesure directe : c’est un accessoire de distribution et de connexion.

*Les préfixes de mesures dépendent de l'identifiant donné au module dans Hardware.*

## 🧩 Configuration JSON

**Pas de JSON de périphérique dans `factory_defaults.h` pour ce shield passif.** Le NL-002A ne possède pas de driver propre : ce sont les modules branchés dessus qui disposent chacun de leur JSON. La distribution physique des GND, 3,3 V, SDA et SCL doit être vérifiée sur le shield réel.

## 🧪 Cahier de validation

**Configuration testée :** date ______ · firmware ______ · référence matérielle ______ · carte/shield ______ · broches ______.

| Vérification | Résultat | Notes / preuves |
|---|---|---|
| ☐ Référence et photo du module vérifiées | Non testé | ______ |
| ☐ Alimentation et câblage contrôlés | Non testé | ______ |
| ☐ Ajout du module dans Hardware | Non testé | ______ |
| ☐ Réaction ou mesures cohérentes | Non testé | ______ |
| ☐ Comparaison / calibration si pertinente | Non testé | ______ |
| ☐ Redémarrage et reprise du fonctionnement | Non testé | ______ |
| ☐ Essai prolongé avec durée notée | Non testé | ______ |

**Test spécifique :** Tester la continuité des borniers, les tensions accessibles et l’absence de court-circuit avant montage complet.

**Décision :** ☐ En cours · ☐ À corriger · ☐ Validé sur le montage documenté.

**Observations :** ______  
**Photos / logs :** ______

## 🛠️ En cas de problème

- Vérifier les connexions, l'alimentation et les paramètres saisis dans **Hardware**.
- Consulter **Console** pour les erreurs et **Maintenance** pour les diagnostics.
- Les borniers n’éliminent pas tous les partages de masse et d’I²C ; ne pas supposer que chaque bornier protège électriquement le circuit.

## 🔧 Améliorations pour un montage plus simple

- [ ] Répartiteur I²C, connecteurs détrompés et distribution plus simple de GND/3,3 V.
- [ ] Vérifier qu'une personne débutante peut réaliser le montage sans soudure et sans choix ambigu de GPIO.

*Ces pistes ne sont pas des fonctions annoncées comme disponibles ou validées.*

### Évolutions possibles

- [ ] Photo annotée de la correspondance bornier ↔ GPIO
- [ ] Liste des variantes de shield validées avec l'ESP32-C6
- [ ] Étiquettes Natulib imprimables pour les borniers

## ⚙️ Pour aller plus loin (facultatif)

Accessoire physique sans driver Natulib dédié.

Retrouver les bases dans [l'interface Natulib OS](../natulib-os/interface.md) et [les modules et drivers](../natulib-os/drivers.md).

### Informations complémentaires

Le **NL-002A** est un shield d'extension pour **ESP32 DevKit 30 broches**.

Il transforme les GPIO de l'ESP32 en **borniers à vis** pour connecter rapidement les modules Natulib, sans soudure.

Il permet de :

- 🔌 connecter rapidement les capteurs Natulib ;
- 📺 raccorder les écrans et actionneurs ;
- 🔧 modifier facilement le câblage ;
- 🔁 remplacer rapidement une carte ESP32 ;
- 🧪 réaliser un prototype sans breadboard.

**Compatibilité :** ESP32 DevKit **30 broches**.

> ⚠️ Le nombre de broches ne garantit pas le même **ordre** de broches. Avant l'achat, comparez la sérigraphie du shield avec celle de votre [NL-001A](./NL-001A-ESP32-C6-N16.md) : sur certaines cartes ESP32-C6, la correspondance bornier ↔ GPIO diffère de celle d'un ESP32 classique.


### Informations complémentaires

**Configuration historique (à revérifier) :**

Le shield est **passif** : il n'apparaît pas dans la configuration de Natulib OS.


### Informations complémentaires

1. Insérez l'ESP32 dans le support du shield.
2. Vérifiez l'orientation du connecteur USB.
3. Connectez les fils aux borniers à vis.
4. Alimentez l'ESP32 via son port USB.

> 🔩 **Aucune soudure nécessaire.**


### Informations complémentaires

- Compatible avec les **ESP32 DevKit 30 broches**.
- Ne forcez jamais l'insertion de l'ESP32.
- Coupez l'alimentation avant toute modification du câblage.
- Serrez les borniers sans excès.
- Le shield ne protège pas les GPIO : les règles de tension du [NL-001A](./NL-001A-ESP32-C6-N16.md) restent valables.


### Informations complémentaires

**Ressources complémentaires**

- 🧠 [NL-001A — ESP32-C6 N16](./NL-001A-ESP32-C6-N16.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)


### Informations complémentaires

**Historique du module**

| Version | Évolution |
|---|---|
| A | Première version du shield 30 broches |
