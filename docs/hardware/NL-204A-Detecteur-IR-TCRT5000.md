---
title: "NL-204A — Détecteur IR de proximité TCRT5000"
parent: Modules
ref: NL-204A
famille: sensors
etat: valide
montage: sans-soudure
temps: 5
niveau: debutant
prix: 1
interface: gpio
---

# ✋ NL-204A — Détecteur IR de proximité TCRT5000

> 🟢 Validé · 🟢 Sans soudure · 👤 Débutant · ⏱️ 5 min · 💰 ~1 € · 🔌 GPIO / ADC

## 👀 En bref

Le **TCRT5000** est un capteur infrarouge réfléchissant qui détecte les objets à **très courte distance**.

Dans Natulib, il sert principalement de **capteur d'interaction** :

- ✋ détection d'une main devant l'écran ;
- 🌱 réveil de Naturochi ;
- 📺 changement d'affichage ;
- ⚡ déclenchement d'une action sans contact.

**Alimentation :** 3,3 V · **Sortie principale :** DO · **Sortie analogique :** AO *(optionnelle)* · **Calibration :** potentiomètre.

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-204A-Detecteur-IR-TCRT5000-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Module TCRT5000](../assets/NL-204A-Detecteur-IR-TCRT5000-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module TCRT5000 (LM393) | 1 | ✅ | AliExpress |
| Câbles Dupont | 3–4 | ✅ | AliExpress |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

| TCRT5000 | ESP32-C6 | Fonction |
|---|---|---|
| VCC | 3V3 | Alimentation |
| GND | GND | Masse |
| DO | GPIO14 | Détection numérique |
| AO *(optionnel)* | GPIO1 | Mesure analogique |

> 💡 Natulib utilise principalement **DO**. La sortie **AO** fournit une mesure analogique de la réflexion infrarouge.

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

---

## ⚙️ Configuration Natulib OS

**Type :** `tcrt5000`

```json
{
  "id": "interaction",
  "type": "tcrt5000",
  "pins": {
    "signal": 14
  },
  "active": true
}
```

---

## 🛠️ Montage en 5 minutes

1. Connectez le TCRT5000 à l'ESP32-C6 selon le tableau de câblage.
2. Positionnez le capteur derrière une petite ouverture dans la façade.
3. Orientez-le vers la zone d'interaction.
4. Réglez la sensibilité avec le potentiomètre.
5. Testez la détection avec la main ou l'objet à détecter.

---

## 📏 Calibration

1. Laissez la zone de détection dégagée.
2. Tournez le potentiomètre jusqu'à ce que la LED de sortie s'éteigne.
3. Approchez la main à la distance de déclenchement souhaitée.
4. Ajustez jusqu'à obtenir un basculement franc.
5. Répétez le test plusieurs fois pour vérifier la stabilité du seuil.

> 💡 Refaites ce réglage **après** l'installation dans la façade : l'épaisseur et la matière modifient la réflexion.

---

## 🧩 Problèmes courants

**Aucune détection sur un objet sombre**
→ Les surfaces noires ou mates réfléchissent peu l'infrarouge ; augmentez la sensibilité ou réduisez la distance.

**Détections aléatoires en journée**
→ Une lumière ambiante forte, notamment le soleil direct, perturbe la mesure.

---

## 💡 À retenir

- Le **DO** fournit une détection numérique simple.
- Le **AO** est facultatif et fournit une mesure analogique.
- La portée dépend fortement de la **distance, de la couleur et de la matière** de l'objet.
- Ce capteur est destiné à la **proximité**, pas à la détection de présence dans une pièce — voir le [NL-203A](./NL-203A-PIR-HC-SR501.md) pour cet usage.
- Ajustez le potentiomètre après l'installation pour obtenir un seuil fiable.

---

## 🚧 Évolutions prévues

- [ ] Assistant de calibration dans Natulib OS
- [ ] Seuil réglable depuis l'interface Web
- [ ] Petit support imprimable orientable
- [ ] Version sur PCB Natulib

---

## 🔗 Ressources

- 👁️ [NL-203A — PIR HC-SR501](./NL-203A-PIR-HC-SR501.md)
- 👆 [NL-206A — Capteur tactile TTP223](./NL-206A-Capteur-tactile-TTP223.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration du TCRT5000 |
