# 🌿 Natulib-OS : Le Système de Bio-Résilience

Bienvenue dans **Natulib-OS**.

Natulib-OS est un firmware open-source conçu pour transformer votre ESP32 en un contrôleur autonome dédié à la bio-résilience. De la surveillance de vos cultures à la gestion de vos ressources vitales, Natulib-OS permet à votre installation de s'auto-réguler, tout en donnant une "conscience" à vos projets grâce à notre moteur d'avatar, **Naturochi**.

---

## 🚀 Pourquoi Natulib ?

*   **Liberté Totale :** Pas de cloud imposé. Vos données, vos capteurs, vos règles de culture (Synapses). Vous restez maître de votre écosystème, en local ou à distance.
*   **Intelligence Embarquée (Natulib-Cortex) :** Grâce à notre moteur de règles **Synapses**, votre système évalue vos conditions de culture en temps réel, sans aucune latence, même sans internet.
*   **Interface Vivante :** Connectez un écran et donnez un visage à votre écosystème avec **Naturochi**. Il réagit à l'environnement, se fatigue, s'éveille et communique l'état de santé de vos modules.
*   **Modularité Infinie :** Commencez avec une seule sonde (Ressources). Évoluez vers la gestion complète de modules de production, de préservation ou de symbiose.

---

## 📦 L'écosystème Natulib

*   **[Natulib-OS](https://github.com/natulib/natulib-os) :** Le firmware central (ce dépôt).
*   **[Natulib-Cortex](https://github.com/natulib/natulib-os/tree/main/natulib-Cortex) :** Le cœur computationnel garantissant la survie de vos écosystèmes.
*   **[Naturochi](https://github.com/natulib/natulib-os/tree/main/naturochi) :** Moteur de rendu graphique pour l'interface émotive.
*   **[Natulib-Dex](https://github.com/natulib/natulib-dex) :** La base de connaissances communautaire. Partagez vos "Synapses" (recettes JSON) pour optimiser vos cultures.

---

## 🛠️ Installation & Démarrage

### Option 1 : Flashage rapide (Web Flasher)
Utilisez notre **[Installateur Web](URL_VERS_TON_WEB_SERIAL_FLASHER)** pour flasher votre ESP32 directement depuis votre navigateur (Chrome/Edge), sans aucune installation logicielle.

### Option 2 : Compilation & Développement
Pour personnaliser le code source :
1.  Installez **[VS Code](https://code.visualstudio.com/)** avec l'extension **[PlatformIO](https://platformio.org/)**.
2.  Clonez ce dépôt : `git clone https://github.com/natulib/natulib-os.git`.
3.  Ouvrez le dossier dans PlatformIO.
4.  Compilez et téléversez sur votre ESP32.

---

## 🧠 Le concept des "Synapses"
Au lieu de coder en dur, Natulib utilise des **Synapses** : des fichiers JSON simples qui définissent vos règles de culture. 
*Exemple de Synapse pour piloter une pompe :*
```json
{
  "id": "arrosage_auto",
  "active": true,
  "conditions": [{"sensor": "bme280", "metric": "t", "op": ">", "val": 25}],
  "actions": [{"type": "local", "target": "pompe1", "cmd": "on"}]
}
