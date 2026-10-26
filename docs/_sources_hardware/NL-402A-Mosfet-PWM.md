---
title: "NL-402A — Module MOSFET PWM"
parent: Modules
ref: NL-402A
famille: power
etat: test
montage: soudure
temps: 20
niveau: intermediaire
prix: 1
interface: pwm
---

# ⚡ NL-402A — Module MOSFET PWM

> 🟡 En test · 🟠 Soudure · 👤 Intermédiaire · ⏱️ 20 min · 💰 ~1 € · ⚡ PWM / GPIO

## 👀 En bref

Le **NL-402A** est un module MOSFET permettant de commander une charge en courant continu depuis un signal **GPIO ou PWM**.

Il peut servir à :

- 💡 contrôler la luminosité d'une bande LED ;
- 🌀 régler la vitesse d'un moteur DC ;
- 💧 commander une petite pompe ;
- ⚡ commuter une charge alimentée séparément ;
- 🎛️ piloter une charge avec un signal PWM.

Le module utilise **deux MOSFET en parallèle**.

**Tension de charge annoncée :** 5–36 V · **Courant continu annoncé :** 15 A · **Courant maximal annoncé :** 30 A · **PWM :** 0–20 kHz.

> ⚠️ Les valeurs de courant et de puissance sont celles annoncées par le fabricant. Elles dépendent du refroidissement, du câblage et de la charge utilisée, et ne constituent pas une capacité garantie.

---

## 📷 Aperçu

> 📷 *Photo à ajouter : `assets/NL-402A-Mosfet-PWM-1.png`*

<!-- Décommentez cette ligne une fois la photo ajoutée :
![Module MOSFET PWM](../assets/NL-402A-Mosfet-PWM-1.png)
-->

---

## 🛒 Ce qu'il vous faut

| Composant | Qté | Obligatoire | Fournisseur |
|---|--:|:-:|---|
| Module MOSFET PWM | 1 | ✅ | Amazon |
| Câbles Dupont | 3 | ✅ | AliExpress |
| Alimentation adaptée à la charge | 1 | ✅ | Selon projet |
| Charge DC | 1 | ✅ | Selon projet |

> 💡 Les liens d'achat peuvent être affiliés et contribuer au développement de Natulib, sans coût supplémentaire pour vous.

---

## 🔌 Câblage

Le câblage exact dépend du bornier de la version reçue.

| Module | Connexion | Fonction |
|---|---|---|
| VCC / + | Alimentation charge | Alimentation |
| GND / - | GND alimentation **et** GND ESP32-C6 | Masse commune |
| IN / PWM | GPIO6 | Commande |
| OUT | Charge | Sortie commutée |

> ⚠️ Vérifiez impérativement le marquage **IN / OUT / VCC / GND** directement sur le PCB avant raccordement. Le brochage varie selon les versions du module.

> ⚠️ L'alimentation de la charge ne doit jamais provenir d'une GPIO de l'ESP32-C6. La GPIO commande le MOSFET ; la charge est alimentée par son alimentation dédiée.

> ⚠️ La masse de l'ESP32-C6 et celle de l'alimentation de la charge doivent être **reliées**, sinon le signal de commande n'a pas de référence.

> 💡 Les GPIO indiqués ci-dessus sont une **recommandation par défaut**, utilisable telle quelle pour un montage isolé. Dans une station qui combine plusieurs modules, le câblage réel peut différer : reportez-vous au plan de brochage de votre fiche **[Projet](../Projets.md)**.

---

## ⚙️ Configuration Natulib OS

**Type :** `pwm`

```json
{
  "id": "mosfet_pwm",
  "type": "pwm",
  "pins": {
    "pin": 6
  },
  "active": true
}
```

| Paramètre | Fonction |
|---|---|
| `pins.pin` | Broche PWM reliée à l'entrée de commande du module MOSFET |
| `active` | Active / désactive le module |

> 🔵 **Divergence connue** — Le driver `pwm` ne lit ni `frequency_hz` ni `duty`. La fréquence PWM est **fixée en dur dans le code** à 5 kHz sur 8 bits de résolution (0–255), quelle que soit la configuration JSON. Le rapport cyclique de démarrage est toujours 0 (sortie éteinte) ; il se pilote uniquement **par action**, jamais par un champ statique du fichier `/dev/*.json` :

| Action | Effet |
|---|---|
| `off_<id>` | Rapport cyclique 0 % |
| `pwm_50_<id>` | Rapport cyclique 50 % |
| `pwm_100_<id>` | Rapport cyclique 100 % |
| `pwm_<id>_<0-255>` | Rapport cyclique arbitraire (valeur brute 0–255) |

Voir **[Drivers](../natulib-os/drivers.md)** et **[Automatisations](../natulib-os/automatisations.md)** pour déclencher ces actions depuis une règle.

---

## 🛠️ Montage en 20 minutes

1. Vérifiez le brochage inscrit sur le module.
2. Connectez l'alimentation de la charge au module.
3. Connectez la charge sur la sortie MOSFET.
4. Reliez la masse de commande à la masse du système.
5. Connectez l'entrée de commande à **GPIO6**.
6. Démarrez avec un rapport cyclique faible.
7. Vérifiez la température du module lorsque la charge augmente.

---

## 🧩 Problèmes courants

**La charge ne s'éteint jamais complètement**
→ Certains modules laissent passer un courant résiduel ; vérifiez le type de MOSFET et le niveau de commande.

**Bourdonnement audible sur un moteur ou une pompe**
→ Augmentez la fréquence PWM au-delà de la plage audible.

**Le module chauffe fortement**
→ Réduisez la charge, améliorez le refroidissement ou augmentez la section des câbles de puissance.

---

## 💡 À retenir

- Le **GPIO ne fournit pas la puissance à la charge** : il commande le MOSFET.
- Utilisez une alimentation adaptée à la tension et au courant de la charge.
- Le fabricant annonce **5–36 V DC** et jusqu'à **15 A en continu**, 30 A en pointe.
- La puissance annoncée de **400 W** ne doit pas être considérée comme garantie en toutes conditions.
- Le refroidissement et la section des câbles deviennent déterminants avec les fortes charges.
- ⚠️ Pour les charges inductives — moteurs, pompes, électrovannes — prévoyez les protections adaptées aux transitoires.
- Ne jamais appliquer la tension de puissance directement sur une GPIO de l'ESP32-C6.

---

## 🚧 Évolutions prévues

- [ ] Intégration PWM native dans Natulib OS
- [ ] Commande de bandes LED
- [ ] Contrôle de vitesse des moteurs DC
- [ ] Pilotage de pompes et électrovannes
- [ ] Support de profils PWM dans les recettes Natulib
- [ ] Boîtier avec bornier de puissance intégré

---

## 🔗 Ressources

- 🔧 [NL-401A — PowerSwitch](./NL-401A-PowerSwitch.md)
- ⚡ [NL-207A — Capteur de courant INA219](./NL-207A-Capteur-courant-INA219.md)
- 🧱 [Retour au catalogue des modules](../Modules.md)

---

## 🕓 Historique

| Version | Évolution |
|---|---|
| A | Première intégration du module MOSFET PWM |
