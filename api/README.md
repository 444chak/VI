# :satellite: NetWorkers API

**Table des matières**  

- [Framework](#framework)
- [Swagger](#swagger)
- [Mise en place (Si vous ne passez pas par le Docker)](#mise-en-place-si-vous-ne-passez-pas-par-le-docker)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Run](#run)
- [Codes](#codes)
  - [Architecture](#architecture)
  - [Environnement](#environnement)
  - [Base de données](#base-de-données)
    - [Création de la base de données sans Docker](#création-de-la-base-de-données-sans-docker)
    - [Base de données avec Docker](#base-de-données-avec-docker)
- [Dépendances](#dépendances)
- [Routes](#routes)
  - [Auth](#auth)
    - [Login](#login)
    - [Register](#register)
    - [Refresh token](#refresh-token)
  - [Users](#users)
    - [Get all users](#get-all-users)
    - [Get user by username](#get-user-by-username)
    - [Get own user](#get-own-user)
    - [Update user](#update-user)
    - [Update own user](#update-own-user)
    - [Update user password](#update-user-password)
    - [Delete user](#delete-user)
  - [IPv4](#ipv4)
    - [Get IPv4 class](#get-ipv4-class)
    - [Convert dec to bin](#convert-dec-to-bin)
    - [Convert dec to hex](#convert-dec-to-hex)
    - [Convert hex to dec](#convert-hex-to-dec)
    - [Convert bin to dec](#convert-bin-to-dec)
    - [Get CIDR notation](#get-cidr-notation)
    - [Get mask](#get-mask)
    - [Get VLSM](#get-vlsm)
  - [IPv6](#ipv6)
    - [Simplify IPv6](#simplify-ipv6)
    - [Extend IPv6](#extend-ipv6)
  - [Scapy](#scapy)
    - [Create ethernet frame](#create-ethernet-frame)
    - [TCP test](#tcp-test)
    - [Ping](#ping)
    - [Get interfaces](#get-interfaces)

## Framework

- [FastAPI](https://fastapi.tiangolo.com/)  
- [SQLAlchemy](https://www.sqlalchemy.org/)  

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
- `utils` : Dossier contenant les utilitaires de l'application dont le processus des modules  
- `models` : Dossier contenant les modèles de données de l'application ainsi que la connexion à la base de données avec SQLAlchemy  
- `routes` : Dossier contenant les routes de l'application
- `middlewares` : Dossier contenant les middlewares de l'application
- `dependencies` : Dossier contenant les dépendances des routes de l'application. C'est similaire aux middlewares mais eux sont utilisés pour les routes  

### Environnement

L'application a besoin que les variables d'environnement suivantes soient définies :

- JWT_SECRET_KEY  
- JWT_REFRESH_KEY  
- COMMON_KEY  
- MYSQL_DATABASE  
- MYSQL_USER  
- MYSQL_PASSWORD  

> Ces variables d'environnement sont déjà définies si l'application est lancée avec le Docker  

### Base de données

#### Création de la base de données sans Docker

La base de données utilisée est MariaDB. Si vous lancez MariaDB sans Docker, il faut que vous exécutiez les commandes suivantes :

```bash
mariadb -u root -p < database/init.sql # Depuis la racine du projet
```

```sql
CREATE USER 'xxx'@'%' IDENTIFIED BY 'xxx';
GRANT ALL PRIVILEGES ON networkers.* TO 'xxx'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

#### Base de données avec Docker

Si vous gardez le lancement avec Docker, la base de données est déjà configurée.  
Vous aurez un dossier `database/data` qui contient les données de la base de données.  

## Dépendances

L'applications dépend de la base de données pour fonctionner. Il faut donc lancer la base de données avant de lancer l'application API.  

## Routes

### Auth

#### Login

| Méthode | URL         | Description | Token requis | Roles |
| ------- | ----------- | ----------- | ------------ | ----- |
| POST    | /auth/login | Login       | False        | None  |

**Request**  

```json
{
  "username": "string",
  "password": "string"
}
```

#### Register

| Méthode | URL            | Description | Token requis | Roles |
| ------- | -------------- | ----------- | ------------ | ----- |
| POST    | /auth/register | Register    | False        | None  |

**Request**  

```json
{
  "username": "string",
  "password": "string"
}
```

#### Refresh token

| Méthode | URL           | Description   | Token requis | Roles |
| ------- | ------------- | ------------- | ------------ | ----- |
| POST    | /auth/refresh | Refresh token | False        | None  |

**Request**  

```json
{
  "refresh_token": "string"
}
```

### Users

#### Get all users

| Méthode | URL    | Description   | Token requis | Roles |
| ------- | ------ | ------------- | ------------ | ----- |
| GET     | /users | Get all users | True         | Admin |

#### Get user by username

| Méthode | URL               | Description          | Token requis | Roles |
| ------- | ----------------- | -------------------- | ------------ | ----- |
| GET     | /users/{username} | Get user by username | True         | Admin |

#### Get own user

| Méthode | URL       | Description  | Token requis | Roles |
| ------- | --------- | ------------ | ------------ | ----- |
| GET     | /users/me | Get own user | True         | User  |

#### Update user

| Méthode | URL               | Description | Token requis | Roles |
| ------- | ----------------- | ----------- | ------------ | ----- |
| PATCH   | /users/{username} | Update user | True         | Admin |

**Request**  

```json
{
  "username": "string"
}
```

#### Update own user

| Méthode | URL       | Description     | Token requis | Roles |
| ------- | --------- | --------------- | ------------ | ----- |
| PATCH   | /users/me | Update own user | True         | User  |

**Request**  

```json
{
  "username": "string"
}
```

#### Update user password

| Méthode | URL                | Description          | Token requis | Roles |
| ------- | ------------------ | -------------------- | ------------ | ----- |
| PATCH   | /users/me/password | Update user password | True         | User  |

**Request**  

```json
{
  "old_password": "string",
  "password": "string",
  "confirm_password": "string"
}
```

#### Delete user

| Méthode | URL               | Description | Token requis | Roles |
| ------- | ----------------- | ----------- | ------------ | ----- |
| DELETE  | /users/{username} | Delete user | True         | Admin |

### IPv4

#### Get IPv4 class

| Method | URL              | Description    | Need token | Roles |
| ------ | ---------------- | -------------- | ---------- | ----- |
| GET    | /ipv4/class/{ip} | Get IPv4 class | True       | User  |

#### Convert dec to bin

| Method | URL                    | Description        | Need token | Roles |
| ------ | ---------------------- | ------------------ | ---------- | ----- |
| GET    | /ipv4/dec-to-bin/{dec} | Convert dec to bin | True       | User  |

#### Convert dec to hex

| Method | URL                    | Description        | Need token | Roles |
| ------ | ---------------------- | ------------------ | ---------- | ----- |
| GET    | /ipv4/dec-to-hex/{dec} | Convert dec to hex | True       | User  |

#### Convert hex to dec

| Method | URL                    | Description        | Need token | Roles |
| ------ | ---------------------- | ------------------ | ---------- | ----- |
| GET    | /ipv4/hex-to-dec/{hex} | Convert hex to dec | True       | User  |

#### Convert bin to dec

| Method | URL                    | Description        | Need token | Roles |
| ------ | ---------------------- | ------------------ | ---------- | ----- |
| GET    | /ipv4/bin-to-dec/{bin} | Convert bin to dec | True       | User  |

#### Get CIDR notation

| Method | URL             | Description       | Need token | Roles |
| ------ | --------------- | ----------------- | ---------- | ----- |
| GET    | /ipv4/cidr/{ip} | Get CIDR notation | True       | User  |

#### Get mask

| Method | URL             | Description | Need token | Roles |
| ------ | --------------- | ----------- | ---------- | ----- |
| GET    | /ipv4/mask/{ip}/{mask} | Get mask    | True       | User  |

#### Get VLSM

| Method | URL                      | Description | Need token | Roles |
| ------ | ------------------------ | ----------- | ---------- | ----- |
| GET    | /ipv4/vlsm/{ip}/{subnet} | Get VLSM    | True       | User  |

### IPv6

#### Simplify IPv6

| Méthode | URL                   | Description   | Token requis | Roles |
| ------- | --------------------- | ------------- | ------------ | ----- |
| GET     | /ipv6/simplify/{ipv6} | Simplify IPv6 | True         | User  |

#### Extend IPv6

| Méthode | URL                 | Description | Token requis | Roles |
| ------- | ------------------- | ----------- | ------------ | ----- |
| GET     | /ipv6/extend/{ipv6} | Extend IPv6 | True         | User  |

### Scapy

#### Create ethernet frame

| Méthode | URL                                                  | Description           | Token requis | Roles |
| ------- | ---------------------------------------------------- | --------------------- | ------------ | ----- |
| GET     | /scapy/ethernet-frame/{dst_mac}/{src_mac}/{eth_type} | Create ethernet frame | True         | User  |

#### TCP test

| Méthode | URL                                       | Description | Token requis | Roles |
| ------- | ----------------------------------------- | ----------- | ------------ | ----- |
| GET     | /scapy/tcp-test/{target_ip}/{target_port} | TCP test    | True         | User  |

#### Ping

| Méthode | URL              | Description | Token requis | Roles |
| ------- | ---------------- | ----------- | ------------ | ----- |
| GET     | /scapy/ping/{ip} | Ping        | True         | User  |

#### Get interfaces

| Méthode | URL               | Description                | Token requis | Roles |
| ------- | ----------------- | -------------------------- | ------------ | ----- |
| GET     | /scapy/interfaces | Get interfaces of the host | True         | User  |
