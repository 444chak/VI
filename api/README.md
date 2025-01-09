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
  - [Dijsktra](#dijsktra)
  - [BFS (Breadth First Search)](#bfs-breadth-first-search)
  - [DFS (Depth First Search)](#dfs-depth-first-search)
  - [A\* (A Star)](#a-a-star)

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

| Méthode | URL | Description    |
| ------- | --- | -------------- |
| GET     | /   | Get API's info |

### Dijsktra

| Méthode | URL       | Description                             |
| ------- | --------- | --------------------------------------- |
| POST    | /dijkstra | Get the shortest path between two nodes |

**Request:**  

```json
{
  "grid": [[2,2,2,2,2,2,5,5,5,5,5,2,2,2,2,2],[2,2,5,5,5,5,2,2,5,5,5,2,2,2,2,2],[2,2,5,2,2,2,2,2,2,2,2,2,2,2,2,2],[5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,3,2,2,5,5,5,5,5,5,2,2,2,2,2,2],[3,2,2,2,2,2,2,2,2,2,2,2,2,5,2,2],[5,3,2,2,2,2,2,2,2,2,2,1,2,5,2,2],[3,2,-1,2,2,2,2,-1,-1,2,2,1,2,5,2,2],[3,2,2,-1,2,2,2,-1,-1,2,2,1,2,5,2,2],[3,2,2,-1,-1,2,-1,-1,2,2,2,1,2,5,2,2],[3,2,2,2,-1,-1,-1,-1,-1,2,2,1,2,2,5,2],[3,2,2,2,-1,-1,-1,-1,2,2,1,2,2,5,2,2],[3,3,2,2,2,2,-1,-1,2,2,2,1,2,2,5,2],[3,3,3,2,2,2,2,2,2,1,1,2,2,5,2,2],[2,3,3,3,2,2,2,2,2,2,1,1,2,2,5,2],[2,3,3,3,2,2,3,3,3,3,1,1,2,5,2,2],[2,2,2,3,3,3,3,3,3,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]],
  "start": [
    0,
    0
  ],
  "end": [
    19,
    15
  ]
}
```

### BFS (Breadth First Search)

| Méthode | URL  | Description                             |
| ------- | ---- | --------------------------------------- |
| POST    | /bfs | Get the shortest path between two nodes |

**Request:**  

```json
{
  "grid": [[2,2,2,2,2,2,5,5,5,5,5,2,2,2,2,2],[2,2,5,5,5,5,2,2,5,5,5,2,2,2,2,2],[2,2,5,2,2,2,2,2,2,2,2,2,2,2,2,2],[5,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,3,2,2,5,5,5,5,5,5,2,2,2,2,2,2],[3,2,2,2,2,2,2,2,2,2,2,2,2,5,2,2],[5,3,2,2,2,2,2,2,2,2,2,1,2,5,2,2],[3,2,-1,2,2,2,2,-1,-1,2,2,1,2,5,2,2],[3,2,2,-1,2,2,2,-1,-1,2,2,1,2,5,2,2],[3,2,2,-1,-1,2,-1,-1,2,2,2,1,2,5,2,2],[3,2,2,2,-1,-1,-1,-1,-1,2,2,1,2,2,5,2],[3,2,2,2,-1,-1,-1,-1,2,2,1,2,2,5,2,2],[3,3,2,2,2,2,-1,-1,2,2,2,1,2,2,5,2],[3,3,3,2,2,2,2,2,2,1,1,2,2,5,2,2],[2,3,3,3,2,2,2,2,2,2,1,1,2,2,5,2],[2,3,3,3,2,2,3,3,3,3,1,1,2,5,2,2],[2,2,2,3,3,3,3,3,3,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]],
  "start": [
    0,
    0
  ],
  "end": [
    19,
    15
  ]
}
```

### DFS (Depth First Search)

| Méthode | URL  | Description                             |
| ------- | ---- | --------------------------------------- |
| POST    | /dfs | Get the shortest path between two nodes |

### A* (A Star)

| Méthode | URL    | Description                             |
| ------- | ------ | --------------------------------------- |
| POST    | /astar | Get the shortest path between two nodes |
