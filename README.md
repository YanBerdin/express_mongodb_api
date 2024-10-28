# express_mongodb REST API

- **express**: framework web pour créer des application web et des serveurs Node.js
- **nodemon**: utilitaire qui permet de redémarrer automatiquement le serveur à chaque modification des fichiers javascript

## Installation

`npm install`

## Lancer le projet

`npm start`

## Démarrer MongoDB

`sudo service mongodb start`

## Vérifier son status

`sudo service mongodb status`

## Tester les requêtes pour les posts

### Envoi d'une requête GET à l'URL <http://localhost:3000/posts>

`curl http://localhost:3000/posts`

### Envoi d'une requête POST à l'URL <http://localhost:3000/posts/create>

🖥️ Executer dans le terminal :

### Requêtes POST pour créer un post avec data locales

```bash

curl -X POST \
  http://localhost:3000/posts/create \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "new post ",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus lacus in lorem interdum, at mollis sem consequat. Vestibulum tempus fermentum justo, id molestie risus rhoncus ac. Phasellus augue purus, finibus non posuere molestie, laoreet at metus. Nam posuere non tellus nec laoreet. Etiam eu blandit lacus."
  }'

```

### Requêtes POST pour creér un post

```bash

curl -X POST \
http://localhost:3000/posts/create \
-H 'Content-Type: application/json' \
-d '{
    "title": "new post MVC",
    "content": "Mon texte MVC",
    "author": "MVC MAN "
  }'

```

### Requêtes PATCH pour Update un post

```bash
curl -X PATCH \
http://localhost:3000/posts/update/671c3cb1c8121b336840bfb1 \
-H 'Content-Type: application/json' \
-d '{
    "title": "updated MVC post",
    "content": "Updated Lorem ipsum",
    "created_at": "",
    "author": "Updated MVC author"
  }'

```

### Requêtes Delete pour supprimer un post

```bash

curl -X DELETE \
http://localhost:3000/posts/delete/671c38ac094de37ea9461955 \
-H 'Content-Type: application/json' \
-d '{
  }'

```

## Tester les requêtes pour les utilisateurs

### Requêtes POST pour créer un utilisateur <http://localhost:3000/auth/register>

```bash

curl -X POST \
http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
    "firstName": "Diana",
    "lastName": "Linares",
    "username": "diana2023",
    "email": "diana2023@gmail.com",
    "password": "0./<>@5/#89"
  }'

```

### Requêtes POST pour connecter un utilisateur <http://localhost:3000/api/posts/auth/login>

```bash

curl -X POST \
http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "diana2023@gmail.com",
  "password": "0./<>@5/#89"
}'

```
