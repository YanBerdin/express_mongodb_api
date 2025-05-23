# Express MongoDB REST API

Cette API permet de gérer des utilisateurs et des posts avec une authentification JWT, MongoDB comme base de données, et un modèle de révocation de tokens pour renforcer la sécurité des sessions.

## Technologies utilisées

- **Express** : Framework pour créer des applications web et des serveurs Node.js.
- **MongoDB** : Base de données NoSQL performante et flexible.
- **Mongoose** : Modélisation d’objets MongoDB pour Node.js, avec schémas de données, validation, et support des requêtes.
- **JWT (JsonWebToken)** : Pour l'authentification basée sur des tokens.
- **dotenv** : Permet de charger les variables d’environnement à partir d’un fichier `.env`.

## Installation

Cloner le dépôt, puis installer les dépendances :

```bash
git clone <URL_DU_DEPOT>
cd NOM_DU_PROJET
```

## Installation des dépendances

`npm install`

## Lancer le projet

`npm start`

## Démarrer MongoDB

### Utiliser `systemctl` (recommandé pour Ubuntu 20.04 et versions ultérieures)

Vérifier la disponibilité de systemctl

  ```bash
  which systemctl
  ```

Quelques commandes pour gérer MongoDB sur un système Linux avec `systemctl` :

1. **Vérifier le statut du service MongoDB** :

   ```bash
   sudo systemctl status mongodb
   ```

2. **Démarrer le service MongoDB** :

   ```bash
   sudo systemctl start mongodb
   ```

3. **Arrêter le service MongoDB** :

   ```bash
   sudo systemctl stop mongodb
   ```

4. **Redémarrer le service MongoDB** :

   ```bash
   sudo systemctl restart mongodb
   ```

5. **Activer le service MongoDB au démarrage** :

   ```bash
   sudo systemctl enable mongodb
   ```

6. **Désactiver le service MongoDB au démarrage** :

   ```bash
   sudo systemctl disable mongodb
   ```

## Documentation Swagger

<http://localhost:3000/api/docs/>

## Tester les requêtes pour les posts

### Envoi d'une requête GET à l'URL <http://localhost:3000/posts>

`curl http://localhost:3000/posts`

### Envoi d'une requête POST à l'URL <http://localhost:3000/posts/create>

🖥️ Quelques commandes pour sur un système Linux

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

# Ecape  $ avec \$
curl -X POST \
http://localhost:3000/posts/create \
-H 'Content-Type: application/json' \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhbjIwMjRAZ21haWwuY29tIiwiX2lkIjoiNjcyNDM3NjNkZGMyMzJiYWQ3M2JkMWNkIiwiaWF0IjoxNzMwNTk0MDEwfQ.alrWdAGuN8z3HFTwtQCDlSaLRuGxZl69uzhApuxL294" \
-H "x-api-key: \$2b\$10\$l4r4JJksEtOfe0eqVBCVN.gVyZFlqSvYgmeyQdvLDrx90R4cNCsk2" \
-d '{}'

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

### Requêtes POST pour connecter un utilisateur <http://localhost:3000/api/auth/login>

```bash

curl -X POST \
http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "diana2023@gmail.com",
  "password": "0./<>@5/#89"
}'

```

```bash

curl -X POST \
http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "yan2024@gmail.com",
  "password": "/0./<>@5/#300"
}'

```

### Requêtes POST pour générer une nouvelle clé API [apiKeyRequired] <http://localhost:5000/generateApiKey>

Remplacer [$BEARER_TOKEN] par le token du user connecté

```bash

curl -X POST \
  http://localhost:3000/generateApiKey \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $BEARER_TOKEN" \
  -d '{
    "email": "diana2023@gmail.com"
  }'

```

Ajouter dans les http-headers l'[apiKeyRequired] générée, à la clé [x-api-key].

```bash

curl -X POST \
  http://localhost:3000/generateApiKey \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpYW5hMjAyM0BnbWFpbC5jb20iLCJfaWQiOiI2NzFkYTIwYTc3MTQxMzU4NzM3Yjc1NjEiLCJpYXQiOjE3MzA0MjI0MTl9.NDMJ8U-JHNySArS4Rv8HYhdeBoTPmnI2pBUZPuPD2U4" \
  -d '{
    "email": "diana2023@gmail.com"
  }'

```

```bash

curl -X POST \
  http://localhost:3000/generateApiKey \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhbjIwMjRAZ21haWwuY29tIiwiX2lkIjoiNjcyNDM3NjNkZGMyMzJiYWQ3M2JkMWNkIiwiaWF0IjoxNzMwNTk0MDEwfQ.alrWdAGuN8z3HFTwtQCDlSaLRuGxZl69uzhApuxL294" \
  -d '{
    "email": "yan2024@gmail.com"
  }'

```

### Requêtes Delete autorisée pour supprimer un post

```bash

curl -X DELETE \
http://localhost:3000/posts/delete/671c38ac094de37ea9461955 \
-H 'Content-Type: application/json' \
-d '{
  }'

```

```bash

curl -X DELETE \
http://localhost:3000/posts/delete/671fd311586b969192e0735e \
-H 'Content-Type: application/json' \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhbjIwMjRAZ21haWwuY29tIiwiX2lkIjoiNjcyNDM3NjNkZGMyMzJiYWQ3M2JkMWNkIiwiaWF0IjoxNzMwNTk0MDEwfQ.alrWdAGuN8z3HFTwtQCDlSaLRuGxZl69uzhApuxL294" \
-H "x-api-key: \$2b\$10\$UIVDQ30e5CrhAnBJQDoVvO1mouboA71tHmIUZF3/GZ3aF.IXfHjei" \
-d '{}'

```

### Requêtes POST pour logout

```bash

curl -X POST \
http://localhost:3000/auth/logout \
-H 'Content-Type: application/json' \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlhbjIwMjRAZ21haWwuY29tIiwiX2lkIjoiNjcyNDM3NjNkZGMyMzJiYWQ3M2JkMWNkIiwiaWF0IjoxNzMwNTkzNjMxfQ.6g96Tk3jZFnbemz1w1gX6ruw7jHwKdmXPb_3-g6V8Us" \
-H "x-api-key: \$2b\$10\$lyRhn19ngbWDZkc.yeGUe.L1TlrL4mVk6CgSoBLeiKeGJJ8UPpube" \
-d '{}'

```

#### Infos swagger

Bouton Authorize : sans guillemet, sans nom de clé (Bearer, Token ...), le JWT only
ID : sans guillemet, sans nom de clé (Bearer, Token ...), l'ID only
