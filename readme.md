# Express MongoDB REST API

Cette API permet de gérer des utilisateurs et des posts avec une authentification JWT, MongoDB comme base de données, et un modèle de révocation de tokens pour renforcer la sécurité des sessions.

## Technologies utilisées

- **Express** : Framework pour créer des applications web et des serveurs Node.js.
- **MongoDB** : Base de données NoSQL performante et flexible.
- **Mongoose** : Modélisation d’objets MongoDB pour Node.js, avec schémas de données, validation, et support des requêtes.
- **JWT (JsonWebToken)** : Pour l'authentification basée sur des tokens.
- **dotenv** : Permet de charger les variables d’environnement à partir d’un fichier `.env`.

## Structure

| Dossier/Fichier         | Description                                      |
|-------------------------|--------------------------------------------------|
| 📁 .vscode/             | Configuration spécifique à l'IDE (VS Code)       |
| ├── settings.json       | Paramètres de VS Code                            |
| 📁 src/                 | Dossier principal du code source                 |
| ├── 📁 bin/             | Fichiers exécutables                             |
| │   ├── www            | Point d'entrée pour démarrer le serveur          |
| ├── 📁 config/          | Fichiers de configuration                        |
| │   ├── app.js         | Classe qui gère l'application                    |
| │   ├── database.js    | Connexion à la base de données                   |
| 📁 core/                | Cœur de l'application                            |
| ├── 📁 entities/        | Modèles de données                               |
| │   ├── Post.js        | Modèle Post                                      |
| │   ├── User.js        | Modèle User                                      |
| 📁 infrastructure/      | Couche d'infrastructure et API                   |
| ├── 📁 api/            | Exposition des endpoints                         |
| │   ├── 📁 controllers/| Contrôleurs (MVC)                                |
| │   │   ├── postController.js | Gestion des posts                        |
| │   │   ├── userController.js | Gestion des utilisateurs                  |
| 📁 repositories/        | Couche persistance des données                   |
| ├── MongooseUserRepository.js | Implémentation UserRepository avec Mongoose |
| ├── MongoosePostRepository.js | Implémentation PostRepository avec Mongoose |
| 📁 utils/               | Fonctions utilitaires                            |
| ├── generateTokenSecret.js | Génération du secret JWT                     |
| 📄 .env.example         | Exemple de fichier d’environnement               |
| 📄 index.js             | Point d’entrée principal                         |
| 📄 swaggerConfig.js     | Configuration Swagger pour la documentation API  |


## Installation

Cloner le dépôt, puis installer les dépendances :

```bash
git clone <URL_DU_DEPOT>
cd NOM_DU_PROJET
npm install
```

## Configuration des variables d’environnement

Créez un fichier `.env` dans la racine du projet et ajoutez les variables suivantes :

```plaintext
PORT=3000
MONGODB_URI=<votre_URI_MongoDB>
TOKEN_SECRET=<votre_secret_jwt>
```

## Démarrage de l'application

Démarrer le serveur avec la commande suivante :

```bash
npm start
```

## Démarrage de MongoDB

Vous pouvez gérer MongoDB via `systemctl` sur Linux pour le démarrer, arrêter, ou vérifier son statut. Par exemple :

```bash
sudo systemctl start mongodb
```

## Documentation Swagger

<http://localhost:3000/api/docs/>

## Routes de l'API

### Authentification et Gestion des Utilisateurs

1. **Inscription d’un utilisateur :**

   - **Endpoint** : `POST /auth/register`
   - **Description** : Crée un nouvel utilisateur.
   - **Exemple** :

   ```bash
   curl -X POST http://localhost:3000/auth/register \
   -H "Content-Type: application/json" \
   -d '{
       "firstName": "John",
       "lastName": "Doe",
       "username": "john2024",
       "email": "john2024@gmail.com",
       "password": "strongPassword123!"
   }'
   ```

2. **Connexion d’un utilisateur :**

   - **Endpoint** : `POST /auth/login`
   - **Description** : Authentifie un utilisateur et génère un token JWT.
   - **Exemple** :

   ```bash
   curl -X POST http://localhost:3000/auth/login \
   -H "Content-Type: application/json" \
   -d '{
       "email": "john2024@gmail.com",
       "password": "strongPassword123!"
   }'
   ```

3. **Déconnexion d’un utilisateur (Token Révoqué) :**

   - **Endpoint** : `POST /auth/logout`
   - **Description** : Ajoute le token JWT de l’utilisateur dans la liste des tokens révoqués, empêchant ainsi toute future utilisation.
   - **Exemple** :

   ```bash
   curl -X POST http://localhost:3000/auth/logout \
   -H 'Content-Type: application/json' \
   -H "Authorization: Bearer <VOTRE_TOKEN_JWT>"
   ```

### Gestion des Posts

1. **Obtenir tous les posts :**

   - **Endpoint** : `GET /posts`
   - **Description** : Retourne la liste des posts publics.
   - **Exemple** :

   ```bash
   curl http://localhost:3000/posts
   ```

2. **Créer un post (Authentification requise) :**

   - **Endpoint** : `POST /posts/create`
   - **Description** : Crée un post, accessible uniquement aux utilisateurs authentifiés.
   - **Exemple** :

   ```bash
   curl -X POST http://localhost:3000/posts/create \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <VOTRE_TOKEN_JWT>" \
   -d '{
       "title": "Nouveau post",
       "content": "Contenu du post",
       "author": "Auteur"
   }'
   ```

3. **Mettre à jour un post :**

   - **Endpoint** : `PATCH /posts/update/:postId`
   - **Description** : Permet de modifier un post existant.
   - **Exemple** :

   ```bash
   curl -X PATCH http://localhost:3000/posts/update/ID_DU_POST \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <VOTRE_TOKEN_JWT>" \
   -d '{
       "title": "Titre modifié",
       "content": "Contenu mis à jour"
   }'
   ```

4. **Supprimer un post :**

   - **Endpoint** : `DELETE /posts/delete/:postId`
   - **Description** : Supprime un post en fonction de l’ID.
   - **Exemple** :

   ```bash
   curl -X DELETE http://localhost:3000/posts/delete/ID_DU_POST \
   -H "Authorization: Bearer <VOTRE_TOKEN_JWT>"
   ```

### Gestion des Clés API

1. **Générer une clé API :**

   - **Endpoint** : `POST /generateApiKey`
   - **Description** : Génère une clé API pour un utilisateur authentifié.
   - **Exemple** :

   ```bash
   curl -X POST http://localhost:3000/generateApiKey \
   -H "Authorization: Bearer <VOTRE_TOKEN_JWT>" \
   -d '{"email": "john2024@gmail.com"}'
   ```

## Sécurité et Révocation des Tokens

L'API utilise des tokens JWT pour sécuriser les endpoints, et met en œuvre une logique de révocation de tokens. Lorsqu'un utilisateur se déconnecte, son token est ajouté à la liste des tokens révoqués (`RevokedToken`), ce qui empêche toute réutilisation de ce token.

## Bonnes pratiques

- **Utilisation de JWT** : Renouveler régulièrement vos tokens pour maintenir la sécurité.
- **Protection des routes** : Utiliser le middleware `authorize` pour protéger les routes sensibles.
- **Gestion des erreurs** : Inclure un retour clair pour les erreurs (comme "Token invalide" ou "Utilisateur non authentifié") pour faciliter le debugging.

---
