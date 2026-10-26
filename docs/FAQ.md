---
layout: hub
title: FAQ
bare: true
rubrique: Natulib · documentation
hero_title: Questions fréquentes
intro: Les réponses courantes, avec un accès direct aux guides détaillés.
cartes_titre: Explorer FAQ
cartes:
- icone: 🖥️
  titre: Écran et veille
  description: Pourquoi l’écran de ma station est-il noir ?
  url: /faq/ecran-veille.html
- icone: 🔌
  titre: Configuration des capteurs
  description: Comment ajouter un capteur ?
  url: /faq/configuration-peripheriques.html
- icone: 💾
  titre: Historique
  description: Pourquoi mes données disparaissent-elles ?
  url: /faq/logger-stockage.html
- icone: 🔄
  titre: Mises à jour OTA
  description: Comment mettre à jour Natulib ?
  url: /faq/mises-a-jour.html
- icone: 🛡️
  titre: Restauration
  description: Comment restaurer une station ?
  url: /faq/restauration-materielle.html
---

### Pourquoi l'écran de ma station est-il noir ?

L'écran peut passer automatiquement en veille afin de réduire la consommation d'énergie. Il se rallume dès qu'une activité est détectée ou lorsqu'une automatisation le demande.

➡️ **En savoir plus :** [Écran et veille](./faq/ecran-veille.md)

---

### Comment ajouter un capteur à ma station ?

Natulib est entièrement piloté par la configuration. Il suffit d'ajouter un fichier `.json` décrivant le périphérique dans le dossier `/dev/`, puis de redémarrer la station.

➡️ **En savoir plus :** [Périphériques JSON](./faq/configuration-peripheriques.md)

---

### Pourquoi mes données d'historique disparaissent-elles ?

Par défaut, Natulib conserve un historique glissant afin d'éviter de saturer la mémoire flash. Les données les plus anciennes sont supprimées automatiquement.

➡️ **En savoir plus :** [Historique et rétention](./faq/logger-stockage.md)

---

### Comment mettre à jour Natulib ?

Les mises à jour du firmware et du système de fichiers peuvent être réalisées directement depuis l'interface Web, sans démonter la station.

➡️ **En savoir plus :** [Mises à jour OTA](./faq/mises-a-jour.md)

---

### Comment restaurer une station ?

Maintenez le bouton **BOOT** pendant environ 10 secondes pour lancer la restauration du système de secours.

➡️ **En savoir plus :** [Restauration d'usine](./faq/restauration-materielle.md)
