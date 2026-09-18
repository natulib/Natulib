---
title: "NL-203A — Détecteur de présence PIR HC-SR501"
parent: Modules
ref: NL-203A
famille: sensors
etat: valide
montage: sans-soudure
temps: 5
niveau: debutant
prix: 2
interface: gpio
---

# 👁️ NL-203A — Détecteur de présence PIR HC-SR501

> 🟢 Validé · 🟢 Sans soudure · 👤 Débutant · ⏱️ 5 min · 💰 ~2 € · 🔌 GPIO

## 👀 En bref

Le **HC-SR501**, souvent vendu sous la marque **D-SUN**, détecte les mouvements grâce aux variations du rayonnement infrarouge.

Dans Natulib, il permet notamment de :

- 👋 réveiller Naturochi lorsqu'une présence est détectée ;
- 📺 allumer automatiquement l'écran ;
- 🌱 déclencher des recettes ou automatisations ;
- 😴 remettre la station en veille après une période d'inactivité.

**Alimentation :** 5 V · **Sortie :** numérique 3,3 V · **Calibration :** matérielle, par potentiomètres.

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-203A-PIR-HC-SR501-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Détecteur PIR HC-SR501](../assets/NL-203A-PIR-HC-SR501-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Détecteur PIR HC-SR501 / D-SUN | 1 | ✅ | AliExpress |
| Câbles Dupont | 3 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

| PIR HC-SR501 | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 5V | Alimentation |
| GND | GND | Masse |
| OUT | GPIO10 | Détection |

> 💡 Le module est alimenté en **5 V** mais sa sortie `OUT` délivre un niveau haut de **3,3 V**, compatible avec les GPIO de l'ESP32-C6. Vérifiez ce point sur le module reçu avant le raccordement.

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

---

## 🎛️ Réglages matériels

Le module comporte deux potentiomètres et un cavalier.

| Réglage | Rôle |
|---|---|
| **Sensibilité** | Portée de détection |
| **Temporisation** | Durée pendant laquelle `OUT` reste à l'état haut après une détection |
| **Cavalier H / L** | `H` : déclenchement répétitif, la temporisation est relancée à chaque mouvement · `L` : déclenchement unique |

> 💡 Pour Natulib, le mode **H** est généralement préférable : il maintient l'écran allumé tant qu'une présence est détectée.

---

## ⚙️ Configuration Natulib OS

**Type :** `pir`

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

| Paramètre | Fonction |
|---|---|
| `pins.pin` | Broche numérique reliée à `OUT` |
| `active` | Active / désactive le module |

> 🔵 Le driver `pir` de Natulib OS lit la broche sous la clé `pins.pin` (et non `pins.signal`). Métriques exposées : `motion`, `idle_time_sec`. Voir **[Drivers](../natulib-os/drivers.md)**.

---

## 🛠️ Montage en 5 minutes

1. Connectez le PIR à l'ESP32-C6 selon le tableau de câblage.
2. Installez le module sur la face avant du boîtier.
3. Faites dépasser le dôme blanc à travers la façade.
4. Orientez le capteur vers la zone à surveiller.
5. Réglez sensibilité et temporisation, puis positionnez le cavalier.
6. Évitez les sources de chaleur ou le soleil direct à proximité.

---

## 🧩 Problèmes courants

**Déclenchements intempestifs**
→ Réduisez la sensibilité, éloignez le capteur d'une source de chaleur ou d'un courant d'air.

**La détection reste active en permanence**
→ Le module est en mode `H` avec une temporisation longue ; réduisez-la ou passez en `L`.

**Détections erratiques après la mise sous tension**
→ Le HC-SR501 demande une période de stabilisation après démarrage ; patientez avant de conclure.

---

## 💡 À retenir

- Le PIR détecte les **mouvements**, pas une présence immobile.
- Il ne fournit **ni distance ni position**.
- La détection peut être perturbée par des sources de chaleur importantes.
- Sa consommation est faible et aucune calibration logicielle n'est nécessaire.
- Prévoyez un **délai logiciel** avant la remise en veille pour éviter les basculements trop fréquents.

---

## 🚧 Évolutions prévues

- [ ] Support clipsable pour façade Natulib
- [ ] Réglage du délai directement dans Natulib OS
- [ ] Version sur PCB Natulib

---

## 🔗 Ressources

- ✋ [NL-204A — Détecteur IR TCRT5000](./NL-204A-Detecteur-IR-TCRT5000.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration du PIR HC-SR501 |
