# :lipstick: VI Web

**Table des matières**  

- [Framework](#framework)
- [Mise en place (Si vous ne passez pas par le Docker)](#mise-en-place-si-vous-ne-passez-pas-par-le-docker)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Run](#run)
- [Codes](#codes)
  - [Architecture](#architecture)
- [Dépendances](#dépendances)

## Framework

- [Next.js](https://nextjs.org/)

## Mise en place (Si vous ne passez pas par le Docker)

### Requirements

- [Node.js](https://nodejs.org/)

### Installation

```bash
npm install
```

### Run

```bash
npm run dev
```

## Codes

Le code est fait en TypeScript (`.ts` et `.tsx`).

### Architecture

Dans le dossier `src/` :

- `app/`: pages de l'application
  - `api/`: appels à l'API
  - `components/`: composants utilisés dans les différentes pages
  - `home/`: page principale
  - `dict.ts`: dictionnaire des couleurs
  - `global.css`: styles globaux
  - `index.tsx`: page d'accueil
- `utils/`: pages utilitaires
  - `apiClient.ts`: configuration des appels par défaut à l'API

## Dépendances

L'applications dépend de l'API pour fonctionner. Il faut donc lancer l'API avant de lancer l'application front-end.
