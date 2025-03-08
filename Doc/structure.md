# Structure

📦 Projet
├── 📁 .vscode/                      # Configuration spécifique à l'IDE (VS Code)
│   └── settings.json
├── 📁 Doc/                          # Documentation du projet
│   └── test-password.json            # Fichier de test des mots de passe
├── src
│   ├── bin
│   │   └── www
│   ├── config
│   │   ├── app.js
│   │   ├── config.js
│   │   └── database.js
│   ├── core
│   │   ├── entities
│   │   │   ├── Post.js
│   │   │   ├── RevokedToken.js
│   │   │   └── User.js
│   │   ├── ports
│   │   │   ├── postRepositoryInterface.js
│   │   │   └── userRepositoryInterface.js
│   │   └── usecases
│   │       ├── postUseCases.js
│   │       ├── post-uses-cases
│   │       ├── user-use-cases
│   │       │   ├── login-user-with-credential.js
│   │       │   ├── logout-user.js
│   │       │   └── register-user-with-credential.js
│   │       └── userUseCases.js
│   ├── infrastructure
│   │   ├── adapters
│   │   ├── api
│   │   │   ├── controllers
│   │   │   │   ├── postController.js
│   │   │   │   └── userController.js
│   │   │   ├── middlewares
│   │   │   │   ├── apiKeyRequired.js
│   │   │   │   ├── authMiddleware.js
│   │   │   │   ├── loggerMiddleware.js
│   │   │   │   ├── loginRequired.js
│   │   │   │   └── validators.js
│   │   │   ├── protected_routes
│   │   │   │   ├── protectedposts.js
│   │   │   │   └── protectedUserRoute.js
│   │   │   └── routes
│   │   │       ├── freeposts.js
│   │   │       └── userroutes.js
│   │   └── repositories
│   │       ├── mongoosePostRepository.js
│   │       └── MongooseUserRepository.js
│   ├── middlewares
│   │   └── apiKeyRequired.js
│   └── utils
│       └── generateTokenSecret.js
├── 📄 .env.example                    # Exemple de fichier d'environnement
├── 📄 .gitignore                       # Fichier pour exclure certains fichiers de Git
├── 📄 index.js                         # Point d'entrée principal (charge `app.js`)
├── 📄 package.json                     # Dépendances et scripts du projet
├── 📄 package-lock.json                 # Version lock des dépendances
├── 📄 posts.json                        # Données fictives pour les tests
├── 📄 swaggerConfig.js                  # Configuration de Swagger pour la documentation API

| Dossier/Fichier                                  | Description                                    |
| ------------------------------------------------ | ---------------------------------------------- |
| 📁 .vscode/                                      | Configuration spécifique à l'IDE (VS Code)     |
| 📁 Doc/                                          | Documentation du projet                        |
| 📁 src/                                          | Dossier principal du code source               |
| ├── 📁 bin/                                      | Contient les fichiers exécutables              |
| │   └── www                                      | Point d'entrée pour démarrer le serveur        |
| ├── 📁 config/                                   | Fichiers de configuration                      |
| │   ├── app.js                                   | Classe qui gère l'application                  |
| │   ├── config.js                                | Configuration globale                          |
| │   └── database.js                              | Connexion à la base de données                 |
| ├── 📁 core/                                     | Cœur de l'application                          |
| │   ├── 📁 entities/                             | Modèles de données                             |
| │   │   ├── Post.js                              | Modèle Post                                    |
| │   │   ├── RevokedToken.js                      | Modèle de token révoqué                        |
| │   │   └── User.js                              | Modèle User                                    |
| │   ├── 📁 ports/                                | Interfaces pour la persistance des données     |
| │   │   ├── postRepositoryInterface.js           | Interface repository Post                      |
| │   │   └── userRepositoryInterface.js           | Interface repository User                      |
| │   └── 📁 usecases/                             | Logique métier et cas d'utilisation            |
| │       ├── postUseCases.js                      | Cas d'utilisation des posts                    |
| │       ├── 📁 post-uses-cases/                  | Cas d'utilisation spécifiques aux posts        |
| │       ├── 📁 user-use-cases/                   | Cas d'utilisation spécifiques aux utilisateurs |
| │       │   ├── login-user-with-credential.js    | Connexion d'un utilisateur                     |
| │       │   ├── logout-user.js                   | Déconnexion d'un utilisateur                   |
| │       │   └── register-user-with-credential.js | Inscription d'un utilisateur                   |
| │       └── userUseCases.js                      | Cas d'utilisation des utilisateurs             |
| ├── 📁 infrastructure/                           | Couche d'infrastructure et API                 |
| │   ├── 📁 adapters/                             | Adapteurs pour différentes implémentations     |
| │   ├── 📁 api/                                  | Exposition des endpoints API                   |
| │   │   ├── 📁 controllers/                      | Contrôleurs qui gèrent les requêtes            |
| │   │   │   ├── postController.js                | Gestion des posts                              |
| │   │   │   └── userController.js                | Gestion des utilisateurs                       |
| │   │   ├── 📁 middlewares/                      | Middlewares pour l'API                         |
| │   │   │   ├── apiKeyRequired.js                | Middleware de clé API                          |
| │   │   │   ├── authMiddleware.js                | Middleware d'authentification                  |
| │   │   │   ├── loggerMiddleware.js              | Middleware de logs                             |
| │   │   │   ├── loginRequired.js                 | Vérification de l'authentification             |
| │   │   │   └── validators.js                    | Validation des requêtes                        |
| │   │   ├── 📁 protected\_routes/                | Routes protégées nécessitant un token JWT      |
| │   │   │   ├── protectedposts.js                | Routes protégées des posts                     |
| │   │   │   └── protectedUserRoute.js            | Routes protégées des utilisateurs              |
| │   │   └── 📁 routes/                           | Routes publiques                               |
| │   │       ├── freeposts.js                     | Routes publiques des posts                     |
| │   │       └── userroutes.js                    | Routes publiques des utilisateurs              |
| │   └── 📁 repositories/                         | Couche de persistance des données              |
| │       ├── mongoosePostRepository.js            | Implémentation des posts avec Mongoose         |
| │       └── MongooseUserRepository.js            | Implémentation des utilisateurs avec Mongoose  |
| ├── 📁 utils/                                    | Fonctions utilitaires                          |
| │   └── generateTokenSecret.js                   | Génération du secret JWT                       |
| 📄 .env.example                                  | Exemple de fichier d’environnement             |
| 📄 .gitignore                                    | Fichier pour exclure certains fichiers de Git  |
| 📄 index.js                                      | Point d’entrée principal                       |
| 📄 package.json                                  | Dépendances et scripts du projet               |
| 📄 package-lock.json                             | Version lock des dépendances                   |
| 📄 posts.json                                    | Données fictives pour les tests                |
| 📄 swaggerConfig.js                              | Configuration de Swagger pour la documentation |
