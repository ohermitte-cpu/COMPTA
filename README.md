# Factures Immo

Application mobile (PWA) de saisie des factures et loyers d'un patrimoine locatif.
Toutes les données restent stockées sur le téléphone. 

## Fonctionnalités

- **Saisie facture** : photo (avec recadrage, rotation, reprise), date, immeuble/appartement pré-paramétrés, fournisseur, libellé, montant.
- **Saisie loyer / charges** : encaissements avec locataire, loyer et charges séparés.
- **Écritures récurrentes** : un loyer ou une charge identique chaque mois se saisit une seule fois ; les lignes se génèrent automatiquement chaque mois (bandeau de rappel sur l'écran de saisie).
- **PDF justificatif** : généré à la demande pour chaque facture photographiée, avec en-tête (date, bien, libellé, montant) et nom de fichier normalisé, ex. `2026-07-03_PASTEUR_RDC_LEROY-MERLIN_23-80.pdf`.
- **Export comptable** : fichier `COMPTA-ANNÉE.xlsx` reprenant exactement les colonnes de l'onglet SAISIES (compatible OpenOffice), ou ZIP complet Excel + tous les PDF de l'année, à envoyer au comptable.
- **Sauvegarde / restauration** : export JSON complet (photos comprises) pour mise à l'abri sur ordinateur ou cloud.

## Déploiement sur GitHub Pages

1. Créer un dépôt (par exemple `factures-immo`).
2. Y déposer les 6 fichiers : `index.html`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png`, `README.md`.
3. Dans **Settings → Pages**, choisir la branche `main` et le dossier `/ (root)`.
4. L'application est accessible à `https://VOTRE-COMPTE.github.io/factures-immo/`.

## Installation sur le téléphone

- **Android (Chrome)** : ouvrir l'URL → menu ⋮ → « Ajouter à l'écran d'accueil » (ou « Installer l'application »).
- **iPhone (Safari)** : ouvrir l'URL → bouton Partager → « Sur l'écran d'accueil ».

L'application fonctionne ensuite hors ligne (le service worker met en cache les fichiers et les librairies).

## Données et limites

- Stockage local : IndexedDB (photos et écritures) + localStorage (réglages, récurrences). Rien ne quitte le téléphone.
- Si le navigateur manque d'espace, il peut purger les données des sites : penser à faire des **sauvegardes régulières** (Réglages → Exporter une sauvegarde) et vérifier l'indicateur de stockage en bas des réglages.
- Le service worker est en stratégie « réseau d'abord » : les mises à jour du site sont prises en compte dès la connexion suivante, sans purge manuelle du cache.
