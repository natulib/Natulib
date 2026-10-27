<div align="center">

# 🌱 Natulib

### Plateforme ouverte et modulaire pour créer des systèmes autonomes au service du vivant.

**Production alimentaire • Biodiversité • Automatisation écologique • Science participative • Edge Computing**

![Status](https://img.shields.io/badge/Status-V0.34-orange?style=flat-square)
![Hardware](https://img.shields.io/badge/Hardware-ESP32--C6-red?style=flat-square)
![License](https://img.shields.io/badge/License-Non--Commercial-33a852?style=flat-square)
![i18n](https://img.shields.io/badge/Language-FR%20%7C%20EN%20%7C%20ES-blue?style=flat-square)

[![Installer](https://img.shields.io/badge/Installer-Web_Flasher-00a2ed?style=flat-square)](https://natulib.github.io/Natulib/installation/web-flasher.html)
[![Wiki](https://img.shields.io/badge/Wiki-Documentation-success?style=flat-square)](https://natulib.github.io/Natulib/)
[![Discord](https://img.shields.io/badge/Discord-Rejoindre-7289da?style=flat-square&logo=discord)](https://discord.gg/3Xs3HmphJk)
[![YouTube](https://img.shields.io/badge/YouTube-Suivre-ff0000?style=flat-square&logo=youtube)](https://www.youtube.com/@Natulib)

</div>

---

# 🌿 À propos

**Natulib** est une plateforme ouverte et modulaire permettant de concevoir facilement des systèmes autonomes au service du vivant.

À partir d'une bibliothèque de **modules matériels réutilisables**, de **recettes d'automatisation** et de **Natulib OS**, il est possible de créer une grande variété de projets : station de plantes aromatiques, serre connectée, hydroponie, ruche instrumentée, nichoir, composteur et bien d'autres.

Chaque système fonctionne **localement**, sans dépendre d'un service Cloud. Il peut être utilisé de manière totalement autonome ou communiquer avec d'autres systèmes lorsque cela est souhaité.

Le projet s'articule autour de quatre piliers :

- 🧱 **[Modules](https://natulib.github.io/Natulib/Modules.html)** — Cartes électroniques, capteurs, alimentation, boîtiers et autres éléments matériels réutilisables.
- 🏗️ **[Projets](https://natulib.github.io/Natulib/Projets.html)** — Assemblages complets construits à partir des modules.
- 🌱 **[Recettes](https://natulib.github.io/Natulib/Recettes.html)** — Règles d'automatisation partageables adaptées à chaque usage.
- 🧠 **[Natulib OS](https://natulib.github.io/Natulib/Natulib-OS.html)** — Système embarqué pilotant les modules et exécutant les recettes.

L'objectif de Natulib est de rendre les technologies au service du vivant **ouvertes, reproductibles et accessibles à tous**.

> 💡 **Matériel pris en charge :** ESP32-C6 aujourd'hui. Le support de l'ESP32-S3 et de l'ESP32 classique est prévu, mais pas encore disponible — les fiches modules et Natulib OS restent aujourd'hui pensés pour le C6.

## 🧩 Du matériel au comportement, sans programmer

Une fois la station installée, l'interface Web de Natulib OS permet de travailler directement depuis un navigateur :

- 🔌 **Hardware** — Ajouter et configurer les modules et capteurs pris en charge.
- 🧠 **Synapses** — Composer des conditions et des actions pour automatiser un projet localement, sans écrire de code.
- 🎨 **Studio** — Associer des images, animations et indicateurs aux états d'une station équipée d'un écran.

Par exemple, une jardinière peut surveiller l'humidité de son sol et afficher un personnage différent selon les conditions mesurées. Le même principe permet d'imaginer d'autres projets, de l'observation environnementale à la robotique expérimentale.

> 🔧 **À savoir avant de commencer :** la configuration logicielle ne nécessite pas de programmation, mais l'assemblage matériel demande encore des branchements et parfois des soudures selon les modules. Natulib documente ces étapes et expérimente des solutions plus simples (borniers, câbles préparés, boîtiers imprimés en 3D), sans promettre aujourd'hui un montage universellement sans soudure.

> 🧪 **État du projet :** Natulib évolue en phase de recherche et développement. Les exemples et modules sont validés progressivement sur des prototypes ; leur niveau de maturité est précisé dans la documentation.

---

## ⚡ Prise en main rapide (3 minutes)

1. 🔌 **Branchez** votre carte **ESP32-C6** à votre ordinateur via USB *(support S3 et Classique à venir)*.
2. 🚀 **Flashez** Natulib OS directement depuis votre navigateur avec le **[Web Flasher Natulib](https://natulib.github.io/Natulib/installation/web-flasher.html)** *(Chrome ou Edge)*.
3. 📱 **Connectez-vous** au réseau Wi-Fi **`NATULIB-XXXX`** créé par la carte.
4. ⚙️ **Ouvrez** l'interface web embarquée (traduite en FR, EN, ES) et configurez votre premier nœud Natulib.

À l’issue de cette installation, votre station Natulib OS peut être configurée depuis le navigateur. L’ajout de capteurs et le montage physique dépendent ensuite du matériel choisi.

---

# 🚀 Démarrer

Toute la documentation officielle est disponible sur le Wiki.

- 📖 **[Wiki — Explorer la documentation complète](https://natulib.github.io/Natulib/)** - Installation, documentation, modules, projets, recettes et Natulib OS.
- 💬 **[Discord — Rejoindre la communauté](https://discord.gg/3Xs3HmphJk)** - Questions, entraide et partage des réalisations.
- 🎥 **[YouTube — Voir les démonstrations et tutoriels](https://www.youtube.com/@Natulib)** - Démonstrations, tutoriels et suivi du développement.

---

# 🤝 Contribuer

Natulib est développé publiquement, **module par module**.

Que vous souhaitiez concevoir un module électronique, créer un projet, partager une recette, améliorer Natulib OS, concevoir un boîtier ou une pièce imprimable, corriger la documentation ou simplement tester les prototypes, chaque contribution participe à enrichir la bibliothèque ouverte Natulib.

Consultez notre guide **[Contribuer](https://natulib.github.io/Natulib/Contribuer/)** pour commencer.

---

## 📜 Licence

Natulib utilise des licences différentes selon la nature des ressources du projet :

* **Logiciel — Natulib OS, firmware, applications et outils Web :** [PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/)
* **Matériel — schémas, PCB, modèles 3D, boîtiers et conceptions matérielles :** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
* **Recettes — automatisations, configurations, protocoles, paramètres et procédures :** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
* **Nom & identité Natulib :** réservés et non couverts par les licences ci-dessus.

Les ressources Natulib peuvent être consultées, utilisées, étudiées, modifiées, adaptées et partagées à des fins non commerciales, dans le respect des licences applicables.

Les usages commerciaux, notamment la fabrication et la vente de produits intégrant Natulib, l'intégration dans des produits commerciaux, la commercialisation de recettes ou la fourniture de services basés sur Natulib, nécessitent une autorisation préalable du titulaire des droits.

Pour consulter la synthèse des licences : 📜 [LICENSE](./LICENSE) — et les conditions détaillées : [LICENSING.md](./LICENSING.md)

Pour toute demande de licence commerciale ou de partenariat :

📧 contact@natulib.org

---
