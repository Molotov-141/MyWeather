# 🌩️ MY WEATHER — Brutalist Weather Station

![Version](https://img.shields.io/badge/version-2.0.0-ff2d2d?style=for-the-badge)
![Status](https://img.shields.io/badge/status-STABLE-f5e642?style=for-the-badge&labelColor=1a1a1a)

**My Weather** est une application météo minimaliste au design **Brutaliste**, conçue pour offrir des prévisions rapides et précises par commune française. Pas de fioritures, juste les données brutes dont vous avez besoin.

---

## 🚀 FONCTIONNALITÉS

- 🔍 **Recherche par Code Postal** : Identification instantanée des communes via l'API Géo de l'État.
- 🌡️ **Données Précises** : Températures min/max, probabilité de pluie et ensoleillement.
- 🎨 **Design Radical** : Interface à haut contraste, typographie impactante et effets de grain rétro.
- ⚡ **Performance** : Zéro framework, 100% JavaScript pur (Vanilla JS).

---

## 🛠️ INSTALLATION

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-repo/my-weather.git
   cd my-weather
   ```

2. **Configuration de l'API**
   - Créez un fichier `config.js` à la racine du projet.
   - Ajoutez-y votre clé API [Météo-Concept](https://api.meteo-concept.com/) :
   ```javascript
   const API_KEY = "VOTRE_CLÉ_API_ICI";
   ```

3. **Lancer l'application**
   Ouvrez simplement `index.html` dans votre navigateur préféré.

---

## 🔌 API UTILISÉES

- [Météo-Concept API](https://api.meteo-concept.com/) — Pour les prévisions météorologiques.
- [Géo API (gouv.fr)](https://geo.api.gouv.fr/) — Pour le découpage administratif et la recherche de communes.

---

## 📐 ARCHITECTURE

- `index.html` : Structure sémantique et accessible.
- `style.css` : Design brutaliste, variables CSS et animations.
- `app.js` : Logique applicative et gestion des appels asynchrones.
- `config.js` : (Ignoré par Git) Stockage sécurisé de votre clé API.

---

## ⚠️ NOTES DE DÉVELOPPEMENT

Cette application a été développée avec une approche **"Accessibility First"** (Skip links, rôles ARIA) tout en maintenant une esthétique visuelle forte. Les rotations des cartes de résultats sont générées dynamiquement pour un aspect unique à chaque recherche.

---

**PROJET OPEN SOURCE — FAIT AVEC PASSION ET RIGUEUR.**
