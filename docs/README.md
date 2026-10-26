# Natulib — fiche Projet Harpe (prototype V1)

Copiez `docs/_layouts/projet.html`, `docs/assets/css/natulib-projet.css` et `docs/projects/harpe-electrique-frelons.md` dans votre dépôt. Le layout utilise le `default.html` actuel et le script existant `docs/assets/js/natulib-module.js` pour transformer automatiquement chaque titre Markdown `##` en accordéon.

## À savoir
- La source d’origine contient deux frontmatters YAML : ils ont été fusionnés en un seul.
- Les sections techniques préexistantes sont conservées dans les accordéons, sans validation de leurs montages ni de leur sécurité.
- Le statut `planifie`, le niveau `avance` et la durée `~3 heures` viennent de la source. Le fichier mentionne aussi des essais au banc : à vérifier avant d'afficher un statut « Validé ».
- Aucune photo du projet dans les fichiers disponibles : ajoutez `image:` (couverture) et éventuellement `images:` (galerie) avec des chemins réels.
- Les liens des modules supposent les chemins `docs/modules/` de la version actuelle.
- Pour garder les accordéons, vérifiez que `natulib-module.js` existe. Si JavaScript est désactivé, les sections Markdown restent lisibles.
- Test Jekyll et affichage navigateur non exécutés ici.
