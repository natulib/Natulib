---
title: "Configuration Wi-Fi"
parent: Installation
statut: redaction
---

# 📶 Configuration Wi-Fi

Une carte neuve, ou une carte qui n'arrive pas à rejoindre son Wi-Fi, crée son propre point d'accès. Vous vous y connectez avec un téléphone ou un ordinateur, puis vous lui indiquez votre réseau.

---

## 🔑 Le point d'accès de la carte

|||
|---|---|
|**Nom du réseau**|`NATULIB-XXXX` (4 caractères propres à votre carte)|
|**Mot de passe**|aucun, le réseau est ouvert|
|**Adresse de la carte**|`http://192.168.4.1`|
|**Canal Wi-Fi**|1 par défaut|

---

## 🚀 Configurer le Wi-Fi

1. **Alimentez la carte** et attendez environ 40 secondes : elle cherche d'abord un Wi-Fi connu avant d'ouvrir son propre réseau.
2. Sur votre téléphone ou votre ordinateur, **connectez-vous au réseau `NATULIB-XXXX`**.
3. **La page de configuration s'ouvre d'elle-même** (portail captif). Si rien ne s'affiche, ouvrez votre navigateur et allez sur `http://192.168.4.1`.
4. Dans l'interface, **choisissez votre réseau Wi-Fi** dans la liste (la carte le détecte pour vous), saisissez son mot de passe et enregistrez.
5. La carte **redémarre et rejoint votre réseau**. Le point d'accès `NATULIB-XXXX` disparaît alors.

---

## 🌐 Retrouver la carte ensuite

Une fois connectée à votre Wi-Fi, la carte est accessible à l'adresse **`http://natulib.local`**.

Certains appareils, notamment sous Android, ne savent pas résoudre les adresses en `.local`. Dans ce cas, utilisez l'adresse IP de la carte, visible dans la liste des appareils connectés de votre box ou routeur.

---

## 🧩 Problèmes courants

**Le réseau `NATULIB-XXXX` n'apparaît pas** → Patientez jusqu'à 40 secondes après la mise sous tension. La carte tente d'abord de rejoindre un Wi-Fi (deux essais successifs) avant d'ouvrir son propre point d'accès.

**Mon téléphone dit « pas d'accès Internet » et se déconnecte** → C'est normal, la carte n'est pas une box. Gardez la connexion à `NATULIB-XXXX` quand le téléphone vous le propose.

**Plusieurs cartes portent le même nom de réseau** → Allumez-les et configurez-les **une par une**.

**J'ai saisi un mauvais mot de passe, ou mon Wi-Fi a changé** → Au démarrage suivant, la carte n'arrive pas à se connecter et rouvre automatiquement son point d'accès `NATULIB-XXXX`. Reprenez la procédure ci-dessus.

**L'interface demande un identifiant** → La protection par mot de passe de l'interface a été activée dans la configuration. Par défaut, l'identifiant est `admin` et le mot de passe `natulib2026` tant que vous ne les avez pas modifiés.

---

## 🔗 Ressources

- ⬅️ [Retour à 🚀 Installation](./Installation.md)
- 🟢 [Premier démarrage](./premier-demarrage.md)
- 🤝 [Contribuer à cette page](./Contribuer.md)


