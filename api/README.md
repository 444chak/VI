# :satellite: VI API

**Table des matières**  

- [Framework](#framework)
- [Swagger](#swagger)
- [Mise en place (Si vous ne passez pas par le Docker)](#mise-en-place-si-vous-ne-passez-pas-par-le-docker)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Run](#run)
- [Codes](#codes)
  - [Architecture](#architecture)
- [Routes](#routes)
  - [App](#app)
    - [Get info](#get-info)

## Framework

- [FastAPI](https://fastapi.tiangolo.com/)  

## Swagger

Pour avoir accès à la documentation Swagger, il suffit de se rendre sur l'URL suivante :  

```text
http://<url>:8000/docs
```

Sur cette page, des appels peuvent être effectués directement pour tester les routes.

## Mise en place (Si vous ne passez pas par le Docker)

### Requirements

- [Python](https://www.python.org/)
- [PDM](https://pdm.fming.dev/)

### Installation

```bash
pdm install
```

### Run

```bash
pdm run api
```

## Codes

### Architecture

Dans le dossier `src`, on retrouve les dossiers et fichiers suivants :

- `app.py` : Fichier d'entrée de l'application  
- `classes` : Dossier contenant les classes de l'application
- `utils` : Dossier contenant les utilitaires de l'application  
- `models` : Dossier contenant les modèles de données de l'application
- `routes` : Dossier contenant les routes de l'application

## Routes

### App

#### Get info

| Méthode | URL | Description    |
| ------- | --- | -------------- |
| GET     | /   | Get API's info |
