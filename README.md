# :jigsaw: VI

> SAé5-2  

## :memo: • Description

VI est un projet de 3ème année de l'IUT de Vélizy.  
Il consiste en une application pour réaliser des graphes où les sommets sont des hexagones.  

## :arrow_forward: • Pour commencer

### :package: • Pré-requis

- [Docker](https://docs.docker.com/get-docker/)

### :rocket: • Lancement

Pour lancer le projet, il suffit de lancer la commande suivante :

```bash
docker compose up --build 
```

L'application sera alors accessible à l'adresse suivante : [http://localhost:3000](http://localhost:3000)

> Vous pouvez également accéder au swagger de l'API à l'adresse suivante : [http://localhost:8000/docs](http://localhost:8000/docs). Vous y trouverez l'ensemble des routes disponibles.

Pour lancer l'application en mode développement, il suffit de lancer la commande suivante :

```bash
docker compose --profile dev up --build
```

> Il est possible d'ajouter l'option `-d` pour lancer les conteneurs en arrière-plan.

## :clipboard: • Documentation technique

- [#API](api/README.md)  
- [#Client](front-js/README.md)  

## :gear: • Technologies utilisées

- :satellite: [FastAPI](https://fastapi.tiangolo.com/)  
- :lipstick: [Next.js](https://nextjs.org/)  
- :whale: [Docker](https://www.docker.com/)  

## :busts_in_silhouette: • Auteurs

- [**@Eliott BARKER**](https://wwww.github.com/Eliott-B)  
- [**@Maxence OUVRARD**](https://github.com/MaxOuvrard)  
- [**@Chakib OUALI**](https://github.com/444chak)  
- [**@Ilan RUBIO**](https://github.com/IlanRubio)  
- [**@Kylian GRAVIER**](https://github.com/SaAxok)  
