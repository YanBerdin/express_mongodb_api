# express_mongodb REST API

- **express**: framework web pour créer des application web et des serveurs Node.js
- **nodemon**: utilitaire qui permet de redémarrer automatiquement le serveur à chaque modification des fichiers javascript

## Installation

`npm install`

## Lancer le projet

`npm start`

## Tester le projet

### Envoi d'une requête GET à l'URL <http://localhost:5000/posts>

`curl http://localhost:5000/posts`

### Envoi d'une requête POST à l'URL <http://localhost:5000/posts/create>

🖥️ Saisir dans le terminal :

Create Sans mongoDB ni Mongoose

```bash
curl -X POST \
  http://localhost:3000/posts/create \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "new post ",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus lacus in lorem interdum, at mollis sem consequat. Vestibulum tempus fermentum justo, id molestie risus rhoncus ac. Phasellus augue purus, finibus non posuere molestie, laoreet at metus. Nam posuere non tellus nec laoreet. Etiam eu blandit lacus."
  }'

```

Create avec MongoDB et Mongoose

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

Update avec MongoDB et Mongoose

```bash
curl -X PATCH \
  http://localhost:3000/posts/update/671c38ac094de37ea9461955 \
  -H 'Content-Type: application/json' \
  -d '{

    "title": "updated MVC post",
    "content": "Updated Lorem ipsum",
    "created_at": "",
    "author": "Updated MVC author"
  }'
  ```

Delete avec MongoDB et Mongoose

```bash
curl -X DELETE \
  http://localhost:3000/posts/delete/671c38ac094de37ea9461955 \
  -H 'Content-Type: application/json' \
  -d '{

  }'
  ```
