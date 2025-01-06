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
  - [Grids](#grids)
    - [Create](#create)
  - [Get](#get)
  - [Set start point](#set-start-point)
  - [Set end point](#set-end-point)
  - [Update](#update)

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

### Grids

#### Create

| Méthode | URL     | Description   |
| ------- | ------- | ------------- |
| POST    | /grids/ | Create a grid |

**Request**  

```json
{
  "width": 1,
  "height": 1,
}
```

### Get

| Méthode | URL         | Description      |
| ------- | ----------- | ---------------- |
| GET     | /grids/{id} | Get a grid by id |

### Set start point

| Méthode | URL               | Description                         |
| ------- | ----------------- | ----------------------------------- |
| PUT     | /grids/{id}/start | Set the start point of a grid by id |

**Request**  

```json
{
  "x": 0,
  "y": 0
}
```

### Set end point

| Méthode | URL             | Description                       |
| ------- | --------------- | --------------------------------- |
| PUT     | /grids/{id}/end | Set the end point of a grid by id |

**Request**  

```json
{
  "x": 0,
  "y": 0
}
```

### Update

| Méthode | URL         | Description         |
| ------- | ----------- | ------------------- |
| PATCH   | /grids/{id} | Update a grid by id |

**Request**  

```json
{
  "grid": [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
}
``
