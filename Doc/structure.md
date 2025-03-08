# Structure

📦 Projet
├── 📁 .vscode/                      # Configuration spécifique à l'IDE (VS Code)
│   └── settings.json
├── 📁 Doc/                          # Documentation du projet
│   └── test-password.json            # Fichier de test des mots de passe
├── 📁 src/                           # Dossier principal du code source
│   ├── 📁 bin/                       # Dossier pour les fichiers exécutables
│   │   └── www                        # Point d'entrée pour démarrer le serveur
│   ├── 📁 config/                    # Fichiers de configuration de l'application
│   │   ├── app.js                     # Classe qui gère l'application
│   │   ├── config.js                  # Variables d'environnement
│   │   └── database.js                # Connexion à la base de données
│   ├── 📁 core/                      # Cœur de l'application (Domaine, Use Cases)
│   │   ├── 📁 entities/               # Modèles de données (Domain Entities)
│   │   │   ├── Post.js
│   │   │   ├── RevokedToken.js
│   │   │   └── User.js
│   │   ├── 📁 ports/                  # Interfaces pour la couche de persistance
│   │   │   ├── postRepositoryInterface.js
│   │   │   └── userRepositoryInterface.js
│   │   └── 📁 usecases/               # Logique métier et cas d'utilisation
│   │       ├── postUseCases.js
│   │       └── userUseCases.js
│   ├── 📁 infrastructure/             # Couche d'infrastructure et API
│   │   ├── 📁 api/                    # Couche API (exposition des endpoints)
│   │   │   ├── 📁 controllers/        # Contrôleurs qui gèrent les requêtes
│   │   │   │   ├── postController.js
│   │   │   │   └── userController.js
│   │   │   ├── 📁 middlewares/        # Middlewares (authentification, logs, validation)
│   │   │   │   ├── loggerMiddleware.js
│   │   │   │   ├── loginRequired.js
│   │   │   │   ├── authMiddleware.js
│   │   │   │   ├── validators.js
│   │   │   │   └── apiKeyRequired.js   # Destiné à la signature dynamique du JWT (TODO)
│   │   │   ├── 📁 protected_routes/   # Routes protégées nécessitant un token JWT
│   │   │   │   ├── protectedUserRoute.js
│   │   │   │   └── protectedposts.js
│   │   │   ├── 📁 routes/             # Routes publiques
│   │   │   │   ├── freeposts.js
│   │   │   │   └── userroutes.js
│   │   ├── 📁 repositories/               # Implémentations des répositories
│   │   │   ├── MongooseUserRepository.js   # Gestion des utilisateurs via Mongoose
│   │   │   └── MongoosePostRepository.js   # Gestion des posts via Mongoose
│   ├── 📁 utils/                      # Fonctions utilitaires
│   │   └── generateTokenSecret.js
├── 📄 .env.example                    # Exemple de fichier d'environnement
├── 📄 .gitignore                       # Fichier pour exclure certains fichiers de Git
├── 📄 index.js                         # Point d'entrée principal (charge `app.js`)
├── 📄 package.json                     # Dépendances et scripts du projet
├── 📄 package-lock.json                 # Version lock des dépendances
├── 📄 posts.json                        # Données fictives pour les tests
├── 📄 swaggerConfig.js                  # Configuration de Swagger pour la documentation API

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
| │   ├── config.js      | Variables d’environnement                        |
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
