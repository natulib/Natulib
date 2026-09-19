---
title: "Premier démarrage & Wi-Fi"
parent: Installation
statut: redaction
---

# 🟢 Premier démarrage & Wi-Fi

Une carte neuve ne connaît pas encore votre réseau. Au premier allumage, elle prépare sa mémoire et crée **immédiatement** son propre point d'accès Wi-Fi pour vous permettre de la configurer.

---

## 🔑 Le point d'accès de la carte

|||
|---|---|
|**Nom du réseau**|`NATULIB-XXXX` (4 caractères propres à votre carte)|
|**Mot de passe**|Aucun (réseau ouvert)|
|**Adresse de l'interface**|`http://192.168.4.1`|

---

## 🚀 Configurer le Wi-Fi (Premier démarrage)

1. **Alimentez la carte**. Le point d'accès `NATULIB-XXXX` apparaît en quelques secondes.
2. Sur votre téléphone ou votre ordinateur, **connectez-vous au réseau `NATULIB-XXXX`**.
3. **La page de configuration s'ouvre d'elle-même** (portail captif). Si rien ne s'affiche, ouvrez votre navigateur et allez sur `http://192.168.4.1`.
4. Dans l'interface, **choisissez votre réseau Wi-Fi** dans la liste (la carte scanne les réseaux pour vous), saisissez votre mot de passe et enregistrez.
5. La carte **redémarre et rejoint votre réseau**. Le point d'accès `NATULIB-XXXX` disparaît.

---

## 🌐 Retrouver la carte ensuite

Une fois connectée à votre Wi-Fi domestique, la carte est accessible à l'adresse **`http://natulib.local`**.

*Note : Certains appareils (notamment sous Android) ne gèrent pas les adresses en `.local`. Dans ce cas, utilisez l'adresse IP de la carte, visible dans l'interface de votre box internet ou routeur.*

---

## 🧩 Problèmes courants

**Le réseau `NATULIB-XXXX` n'apparaît pas du tout** → Vérifiez l'alimentation de la carte. Si c'est une carte qui a *déjà* été configurée et qui a perdu le réseau, elle tentera de se reconnecter pendant environ 15 à 20 secondes avant de rouvrir son point d'accès `NATULIB-XXXX` en secours.

**Mon téléphone dit « pas d'accès Internet » et se déconnecte** → C'est normal, la carte n'est pas une box internet. Forcez votre téléphone à rester connecté à `NATULIB-XXXX` quand il vous le propose.

**J'ai saisi un mauvais mot de passe, ou mon Wi-Fi a changé** → Au démarrage, la carte n'arrivera pas à se connecter. Après quelques secondes de tentatives, elle rouvrira automatiquement son point d'accès `NATULIB-XXXX`. Reprenez simplement la procédure de configuration.

**L'interface demande un mot de passe administrateur** → Par défaut, l'identifiant est `admin` et le mot de passe est `natulib`.

---

## 🔗 Ressources

- ⬅️ [Retour à 🚀 Installation](../Installation.md)
- 🤝 [Contribuer à cette page](../Contribuer.md)