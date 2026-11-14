---
layout: module
bare: true
title: Détecteur de présence PIR HC-SR501
reference: NL-203A
ref: NL-203A
famille: sensors
categorie: Capteurs
statut: Validé
etat: valide
soudure: Sans soudure
montage: sans-soudure
niveau: Débutant
duree: 5 min
temps: 5
interface: GPIO
prix: ≈ 2 €
alimentation: 5 V
description: Capteur PIR de mouvement à sortie numérique, pratique pour détecter une présence avec Natulib OS.
images:
  - fichier: /assets/NL-203A-PIR-HC-SR501-1.png
    titre: Vue du détecteur PIR HC-SR501
elements:
  - 🚶 Mouvement
  - 🎛️ Sensibilité
  - ⏱️ Temporisation
starter_sections:
  - 🛒 Ce qu'il vous faut
  - 🚀 Pour commencer
  - 🧪 Validation rapide
natulib_os_driver: DevicePIR
natulib_os_type: pir
---

Le **HC-SR501** est un capteur **PIR** qui détecte les mouvements grâce aux variations d'infrarouge. Il est utile pour réveiller un écran, lancer une automatisation ou surveiller une zone.

## 🛒 Ce qu'il vous faut

| Composant | Note / Rôle |
| --- | --- |
| **HC-SR501** | Détecteur de mouvement PIR |
| **3 fils Dupont** | Alimentation et signal |

## 🚀 Pour commencer

1. Couper l'alimentation de l'ESP32-C6.
2. Raccorder le module : **VCC → 5V**, **OUT → GPIO10**, **GND → GND**.
3. Démarrer Natulib OS puis ouvrir **Hardware**.
4. Ajouter le module **PIR HC-SR501**, choisir **GPIO10** comme broche de signal, puis **enregistrer**.
5. **Redémarrer l'ESP32-C6** pour prendre en compte le nouveau module.
6. Attendre quelques secondes de stabilisation puis vérifier le comportement dans **Accueil**.

> Le **HC-SR501** s'alimente en **5 V**. Sa sortie **OUT** est utilisée ici sur **GPIO10**.

## 🧪 Validation rapide

| Vérification | Résultat attendu |
| --- | --- |
| Module ajouté dans Hardware | Le capteur apparaît sans erreur |
| Aucun mouvement | `motion = 0` |
| Mouvement devant le capteur | `motion = 1` |
| Après la temporisation | retour à `motion = 0` |
| Redémarrage de l'ESP32-C6 | Le capteur fonctionne à nouveau |

Le HC-SR501 nécessite souvent un **court temps de stabilisation** après mise sous tension.

## 🧩 Dans Natulib

Dans **Hardware**, le type utilisé est **`pir`**.

Dans **Accueil** et **Synapses**, tu peux retrouver notamment :

| Mesure | Rôle |
| --- | --- |
| `motion` | Mouvement détecté (`0` ou `1`) |
| `idle_time_sec` | Temps écoulé sans détection |
| `online` | État de disponibilité du module |

Dans **Synapses**, tu peux utiliser `motion = 1` pour déclencher une action lorsqu'un mouvement est détecté.

## ⚙️ Réglages matériels

Le module comporte deux potentiomètres et un cavalier :

| Réglage | Rôle |
| --- | --- |
| **Sensibilité** | Ajuste la portée de détection |
| **Temporisation** | Ajuste la durée pendant laquelle `OUT` reste actif |
| **Cavalier H / L** | `H` = redéclenchable · `L` = impulsion unique |

Pour Natulib, le mode **H** est souvent pratique si l'on veut maintenir une action tant qu'un mouvement continue.

## ⚙️ Configuration de référence

Exemple simple de configuration :

```json
{
  "id": "presence",
  "type": "pir",
  "pins": {
    "pin": 10
  },
  "active": true
}
```

## 🛠️ Problèmes courants

| Problème | Vérification |
| --- | --- |
| **Aucune détection** | Vérifier **5V**, **GND**, **GPIO10** et le redémarrage après ajout du module |
| **Détection permanente** | Réduire la temporisation ou vérifier le mode **H/L** |
| **Déclenchements intempestifs** | Réduire la sensibilité et éloigner le capteur des sources de chaleur |
| **Comportement incohérent au démarrage** | Attendre la phase de stabilisation du HC-SR501 |

## 🔗 Ressources

- [NL-001A — ESP32-C6 N16](./NL-001A-ESP32-C6-N16.md)
- [Catalogue des modules](../Modules.md)

## 🕓 Historique

| Version | Évolution |
| --- | --- |
| A | Documentation initiale du HC-SR501 |