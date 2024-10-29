# express mongodb REST API

- **express**: framework web pour créer des application web et des serveurs Node.js
- **nodemon**: utilitaire qui permet de redémarrer automatiquement le serveur à chaque modification des fichiers javascript
- **mongodb**:  solution de base de données flexible, performante et adaptée à tous les cas d'utilisation.

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

### Requêtes POST pour générer une nouvelle clé API <http://localhost:5000/generateApiKey>

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
