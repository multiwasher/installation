# Copilot Instructions for Somengil Compliance Portal

## Overview
This project is a web-based Compliance Portal for Somengil, focused on installation workflows. It uses Firebase (Firestore, Auth), is multilingual (PT, EN, ES, FR), and is built with vanilla JS, HTML, and CSS (with Tailwind for rapid styling).

## Architecture & Key Files
- **index.html**: Main entry point, includes Tailwind, Lucide icons, jsPDF, and links to `script.js` and `style.css`.
- **script.js**: Main logic. Handles Firebase initialization, authentication (anonymous), Firestore access, user management, and data listeners. Uses dynamic ES module imports from CDN.
- **translations.js**: Loads translation data from `translations_PTENESFR.csv` and provides a translation system for UI text.
- **style.css**: Custom styles, extends Tailwind.
- **firestore.rules**: Firestore security rules. See `FIREBASE_SETUP.md` for deployment.
- **FIREBASE_SETUP.md**: Step-by-step guide for setting up Firebase and Firestore rules.

## Developer Workflows
- **No build step**: All code runs directly in the browser. No bundler or transpiler is used.
- **To test locally**: Open `index.html` in a browser. For full functionality, ensure Firebase rules are set as described in `FIREBASE_SETUP.md`.
- **Translations**: Update `translations_PTENESFR.csv` and sync with `translations.js`.
- **Firebase**: All Firebase config is hardcoded in `script.js`. Auth is anonymous by default.

## Project Conventions
- **Language selection**: UI language is switched via buttons in `index.html`, using translation keys from `translations.js`.
- **User roles**: User IDs and roles are hardcoded in `script.js` under the `USERS` object.
- **External dependencies**: All major libraries (Tailwind, Lucide, jsPDF, Firebase) are loaded via CDN in `index.html`.
- **No framework**: Pure JS/HTML/CSS, no React/Vue/Angular.
- **Legacy code**: The `Old/` directory contains previous versions and is not maintained.

## Integration Points
- **Firebase**: Used for authentication and Firestore database. See `script.js` for all integration points.
- **Translations**: All UI text should use the translation system in `translations.js`.
- **jsPDF**: Used for exporting data to PDF, loaded via CDN.

## Examples
- To add a new translation: Update both `translations_PTENESFR.csv` and `translations.js`.
- To add a new user: Add to the `USERS` object in `script.js`.
- To change Firestore rules: Edit `firestore.rules` and follow `FIREBASE_SETUP.md`.

## Cautions
- Do not edit files in `Old/` unless porting legacy logic.
- Do not add build tools or frameworks unless discussed.
- Always test changes in the browser, as there is no automated test suite.

---
For more details, see the referenced files above. Ask for clarification if any workflow or pattern is unclear.
