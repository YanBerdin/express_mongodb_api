# Project README

## Table of Contents

1. [High-level architectural overview](#1-high-level-architectural-overview)
2. [Component Breakdown](#2-component-breakdown)
3. [Key Function Documentation](#3-key-function-documentation)
4. [Usage Examples / Onboarding Guide](#4-usage-examples--onboarding-guide)
5. [Configuration and Environment Setup](#5-configuration-and-environment-setup)
6. [API Documentation](#6-api-documentation)
7. [Diagrams](#7-diagrams)
8. [Development Notes / TODOs](#8-development-notes--todos)

## Structure

| Folder/File                                   | Description                                    |
| --------------------------------------------- | ---------------------------------------------- |
| 📁 .vscode/                                   | IDE-specific configuration (VS Code)           |
| 📁 Doc/                                       | Project documentation                         |
| 📁 src/                                       | Main source code folder                       |
| ├── 📁 bin/                                   | Contains executable files                     |
| │   └── www                                   | Entry point to start the server               |
| ├── 📁 config/                                | Configuration files                           |
| │   ├── app.js                                | Class that manages the application            |
| │   ├── config.js                             | Global configuration                         |
| │   └── database.js                           | Database connection                          |
| ├── 📁 core/                                  | Core of the application                       |
| │   ├── 📁 entities/                          | Data models                                   |
| │   │   ├── Post.js                           | Post model                                    |
| │   │   ├── RevokedToken.js                   | Revoked token model                           |
| │   │   └── User.js                           | User model                                    |
| │   ├── 📁 ports/                             | Interfaces for data persistence               |
| │   │   ├── postRepositoryInterface.js        | Post repository interface                     |
| │   │   └── userRepositoryInterface.js        | User repository interface                     |
| │   └── 📁 usecases/                          | Business logic and use cases                  |
| │       ├── 📁 post-use-cases/                | Use cases specific to posts                  |
| │       │   ├── create-post.js                | Create a post                                 |
| │       │   ├── find-posts.js                 | Find posts                                    |
| │       │   ├── find-one-post.js              | Find a specific post                          |
| │       │   ├── delete-post.js                | Delete a post                                 |
| │       │   └── update-post.js                | Update a post                                 |
| │       ├── 📁 user-use-cases/                | Use cases specific to users                   |
| │           ├── login-user-with-credential.js | User login                                    |
| │           ├── logout-user.js                | User logout                                   |
| │           └── register-user-with-credential.js | User registration                          |
| ├── 📁 infrastructure/                        | Infrastructure layer and API                  |
| │   ├── 📁 adapters/                          | Adapters for different implementations        |
| │   ├── 📁 api/                               | API endpoints exposure                        |
| │   │   ├── 📁 controllers/                   | Controllers that handle requests              |
| │   │   │   ├── postController.js             | Post management                               |
| │   │   │   └── userController.js             | User management                               |
| │   │   ├── 📁 middlewares/                   | API middlewares                               |
| │   │   │   ├── apiKeyRequired.js             | API key middleware                             |
| │   │   │   ├── authMiddleware.js             | Authentication middleware                      |
| │   │   │   ├── loggerMiddleware.js           | Logs middleware                                |
| │   │   │   ├── loginRequired.js              | Authentication verification                     |
| │   │   │   └── validators.js                 | Request validation                            |
| │   │   ├── 📁 protected_routes/              | Protected routes requiring a JWT token        |
| │   │   │   ├── protectedposts.js             | Protected post routes                         |
| │   │   │   └── protectedUserRoute.js         | Protected user routes                         |
| │   │   └── 📁 routes/                        | Public routes                                  |
| │   │       ├── freeposts.js                  | Public post routes                            |
| │   │       └── userroutes.js                 | Public user routes                            |
| │   └── 📁 repositories/                      | Data persistence layer                        |
| │       ├── mongoosePostRepository.js         | Post implementation with Mongoose             |
| │       └── MongooseUserRepository.js         | User implementation with Mongoose             |
| └── 📁 utils/                                 | Utility functions                             |
|     └── generateTokenSecret.js                 | JWT secret generation                         |
| 📄 .env.example                               | Example environment file                      |
| 📄 index.js                                   | Main entry point                              |
| 📄 package.json                                | Project dependencies and scripts              |
| 📄 package-lock.json                           | Dependency version lock                       |
| 📄 posts.json                                  | Mock data for testing                          |
| 📄 readme.md                                  | This documentation file                       |
| 📄 swaggerConfig.js                           | Swagger configuration for documentation        |

## 1. High-Level Architectural Overview

This project implements a RESTful API using a layered architecture similar to Clean Architecture principles. The main layers are:

* **`src/config`**: Contains application configuration, including database connections (`database.js`), server settings (`app.js`), and environment variable management (`config.js`).
* **`src/core`**: Represents the core business logic of the application.
  * **`entities`**: Defines the Mongoose schemas for data structures like `User`, `Post`, and `RevokedToken`.
  * **`usecases`**: Contains the specific business operations (e.g., creating a post, registering a user).
  * **`ports`**: Defines interfaces for repositories, decoupling the core logic from specific data storage implementations.
* **`src/infrastructure`**: Provides concrete implementations for external concerns.
  * **`api`**: Handles HTTP requests and responses.
    * **`controllers`**: Receives requests, calls appropriate use cases, and sends responses.
    * **`middlewares`**: Handles cross-cutting concerns like authentication, validation, and logging.
    * **`routes`**: Defines the API endpoints.
  * **`repositories`**: Implements the repository interfaces defined in `src/core/ports` using Mongoose for MongoDB interaction.
* **`src/middlewares`**: Contains additional, potentially global, middlewares (though `apiKeyRequired.js` is currently unused).
* **`src/utils`**: Utility scripts, such as `generateTokenSecret.js`.

### Typical Request Flow

A typical request to a protected endpoint flows through the system as follows:

1. **API Route**: The request hits an endpoint defined in `src/infrastructure/api/routes` or `src/infrastructure/api/protected_routes`.
2. **Middleware(s)**:
    * `loggerMiddleware.js`: Logs the incoming request.
    * `authMiddleware.js` (`authorize`): Validates the JWT, checks if it's revoked, and populates `req.user`.
    * `loginRequired.js`: Ensures `req.user` is present.
    * `validators.js` (if applicable): Validates input parameters.
3. **Controller**: The corresponding controller in `src/infrastructure/api/controllers` handles the request.
4. **Use Case**: The controller instantiates and calls a specific use case from `src/core/usecases`.
5. **Repository**: The use case interacts with a repository (e.g., `MongoosePostRepository`) via its interface defined in `src/core/ports`.
6. **Database**: The repository performs CRUD operations on the MongoDB database.
7. The response flows back through the layers to the client.

## 2. Component Breakdown

### `src/core/entities`

* **`User.js`**:
  * **Purpose**: Defines the Mongoose schema for users.
  * **Fields**:
    * `firstName` (String, required, trim, minlength: 2, maxlength: 50)
    * `lastName` (String, required, trim, minlength: 2, maxlength: 50)
    * `username` (String, unique, required, trim, minlength: 3, maxlength: 50)
    * `email` (String, required, unique, lowercase, trim, minlength: 2, maxlength: 50, email format validation)
    * `apiKey` (String, unique, default: null) - *Note: API key generation logic has TODOs and might not be fully functional as intended.*
    * `hashedPassword` (String)
    * `created_at` (Date, default: Date.now)
    * `refreshToken` (String)
    * **Virtuals**:
    * `fullname`: Returns `firstName` + `lastName`.
    * **Methods**:
    * `comparePassword(password)`: Compares a given password with the stored `hashedPassword`.
    * `setAPIKey()`: Generates and sets an API key. *Currently uses `bcrypt.hashSync` with a TODO to use `bcrypt.hash`.*

* **`Post.js`**:
  * **Purpose**: Defines the Mongoose schema for posts.
  * **Fields**:
    * `title` (String, required)
    * `content` (String, required)
    * `created_at` (Date, default: Date.now)
    * `author` (String, required)
  * **Methods**:
    * `toLocalString()`: Returns the `created_at` date as a local string (Note: likely meant `toLocaleString()`).

* **`RevokedToken.js`**:
  * **Purpose**: Defines the Mongoose schema for storing revoked JWTs, used during logout.
  * **Fields**:
    * `token` (String, required, unique)
    * `revokedAt` (Date, default: Date.no

### `src/core/usecases`

#### `src/core/usecases/post-use-cases`

* **`create-post.js` (CreatePostUseCase)**: Handles the creation of new posts.
* **`delete-post.js` (DeletePostUseCase)**: Handles the deletion of posts by their ID.
* **`find-one-post.js` (FindOnePostUseCase)**: Handles finding a single post by its ID.
* **`find-posts.js` (FindPostsUseCase)**: Handles finding all posts.
* **`update-post.js` (UpdatePostUseCase)**: Handles updating an existing post by its ID.

#### `src/core/usecases/user-use-cases`

* **`login-user-with-credential.js` (loginUserWithCredentialsUseCase)**: Handles user login with email and password, issuing a JWT.
* **`logout-user.js` (logoutUserUseCase)**: Handles user logout by adding the current token to the `RevokedToken` list.
* **`register-user-with-credential.js` (registerUserWithCredentialsUseCase)**: Handles new user registration, including password hashing and API key generation.

### `src/core/ports`

* **`postRepositoryInterface.js`**: Defines the contract for post repository operations (e.g., `savePost`, `findAllPosts`, `findPostById`, `updatePost`, `deletePost`). This interface allows the core use cases to remain independent of the database technology used.
* **`userRepositoryInterface.js`**: Defines the contract for user repository operations (e.g., `saveUser`, `findByEmail`, `findById`). This ensures that user-related use cases are decoupled from the specific data access implementation.

The use of repository interfaces is a key aspect of Clean Architecture, promoting separation of concerns and testability by allowing data access logic to be swapped or mocked.

### `src/infrastructure/repositories`

* **`MongooseUserRepository.js`**:
  * **Purpose**: Implements the `UserRepositoryInterface` using Mongoose.
  * **Function**: Interacts with the MongoDB `users` collection to perform operations like saving new users (including API key generation via `user.setAPIKey()`) and finding users by email or ID.

* **`mongoosePostRepository.js`**:
  * **Purpose**: Implements the `PostRepositoryInterface` using Mongoose.
  * **Function**: Interacts with the MongoDB `posts` collection to perform CRUD operations (Create, Read, Update, Delete) on posts.

### `src/infrastructure/api/controllers`

* **`userController.js`**:
  * **Purpose**: Handles HTTP requests related to user authentication and management.
  * **Main Actions**:
    * `register`: Handles `POST /auth/register`. Validates input, calls `RegisterUserWithCredentialsUseCase` to create a new user.
    * `login`: Handles `POST /auth/login`. Validates input, calls `loginUserWithCredentialsUseCase` to authenticate the user and issue a JWT.
    * `logout`: Handles `POST /auth/logout` (protected). Calls `logoutUserUseCase` to invalidate the user's JWT.

* **`postController.js`**:
  * **Purpose**: Handles HTTP requests related to blog posts.
  * **Main Actions**:
    * `findPosts`: Handles `GET /posts`. Calls `FindPostsUseCase` to retrieve all posts.
    * `createPost`: Handles `POST /posts/create` (protected). Validates input, calls `CreatePostUseCase` to create a new post.
    * `findOnePost`: Handles `GET /posts/:id`. Calls `FindOnePostUseCase` to retrieve a specific post by its ID.
    * `findOnePostAndUpdate`: Handles `PATCH /posts/update/:id` (protected). Calls `UpdatePostUseCase` to update an existing post.
    * `findOnePostAndDelete`: Handles `DELETE /posts/delete/:id` (protected). Calls `DeletePostUseCase` to delete a post.

### `src/infrastructure/api/middlewares`

* **`authMiddleware.js` (`authorize`)**:
  * **Role**: Core authentication middleware for protected routes.
  * **Functionality**:
    1. Extracts the JWT from the `Authorization: Bearer <token>` header.
    2. Checks if the token exists in the `RevokedToken` collection in the database. If found, rejects the request.
    3. Verifies the JWT's signature and expiration using `jsonwebtoken` and the `TOKEN_SECRET`.
    4. If valid, populates `req.user` with the decoded token payload.
    5. Calls `next()` to pass control to the next middleware or route handler. If any step fails, it sends an appropriate error response (e.g., 401 Unauthorized).

* **`loginRequired.js`**:
  * **Role**: Authorization middleware that checks if a user is authenticated.
  * **Functionality**: Verifies that `req.user` has been populated (typically by `authMiddleware.js`). If `req.user` is not present, it returns a 401 Unauthorized error, indicating that the endpoint requires a logged-in user.

* **`validators.js`**:
  * **Role**: Provides input validation logic using `express-validator`.
  * **Functionality**: Exports various validation chains (e.g., `validateLogin`, `validateRegister`, `validatePostId`, `validateCreatePost`, `validateUpdatePost`) that check request bodies and parameters for correctness (e.g., email format, required fields, ID format).

* **`loggerMiddleware.js`**:
  * **Role**: Logs incoming HTTP requests.
  * **Functionality**: Prints the timestamp, HTTP method, and original URL of each request to the console.

* **`src/middlewares/apiKeyRequired.js`**:
  * **Status**: **Currently commented out and non-functional.**
  * **Intended Role (if active)**: This middleware was likely intended to protect certain routes by requiring a valid API key. However, its implementation is empty, and it's not actively used in any routes.

### `src/infrastructure/api/routes` & `src/infrastructure/api/protected_routes`

#### Overall Routing Structure

The application defines public routes and protected routes. Protected routes require authentication (a valid JWT) processed by the `authorize` and `loginRequired` middlewares.

#### Public Routes

* **`userroutes.js`**:
  * `GET /`: Displays a welcome message (currently includes HTML).
  * `POST /auth/register`: Allows new users to register. (Uses `validateRegister` middleware).
  * `POST /auth/login`: Allows existing users to log in and receive a JWT. (Uses `validateLogin` middleware).
* **`freeposts.js`**:
  * `GET /posts`: Retrieves a list of all posts.
  * `GET /posts/:id`: Retrieves a single post by its ID. (Uses `validatePostId` middleware).

#### Protected Routes

These routes are mounted under the `authorize` middleware in `src/config/app.js`, meaning all requests to them will first go through JWT validation.

* **`protectedUserRoute.js`**:
  * `POST /auth/logout`: Allows authenticated users to log out, revoking their current JWT. (Uses `loginRequired` middleware).
* **`protectedposts.js`**:
  * `POST /posts/create`: Allows authenticated users to create a new post. (Uses `loginRequired`, `validateCreatePost` middlewares).
  * `PATCH /posts/update/:id`: Allows authenticated users to update an existing post by its ID. (Uses `loginRequired`, `validatePostId`, `validateUpdatePost` middlewares).
  * `DELETE /posts/delete/:id`: Allows authenticated users to delete an existing post by its ID. (Uses `loginRequired`, `validatePostId` middlewares).

## 3. Key Function Documentation

### Controller Invoking a Use Case Example

In `userController.js`, the `register` method demonstrates how a controller uses a use case:

```javascript
// src/infrastructure/api/controllers/userController.js

// ...
const RegisterUserWithCredentials = require("../../../core/usecases/user-use-cases/register-user-with-credential");
// ...

class UserController {
  constructor() {
    this.registerUserUseCase = new RegisterUserWithCredentials();
    // ...
  }

  register = async (req, res) => {
    // ... input validation ...
    try {
      // 1. Controller instantiates and calls the use case
      const user = await this.registerUserUseCase.registerUser(req.body);
      // ...
      res.status(201).json({ message: "User registered successfully", user: userObj });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  // ...
}
```
Here, `userController.register` calls `this.registerUserUseCase.registerUser(req.body)`, passing the request data to the core business logic layer.

### JWT Validation Flow in `authMiddleware.js`

1. **Token Extraction**: The `authorize` middleware retrieves the token from the `Authorization: Bearer <token>` header.
2. **Revocation Check**: It queries the `RevokedToken` collection in MongoDB to see if the extracted token has been previously revoked (e.g., by a logout operation). If revoked, access is denied.
3. **Signature Verification**: If not revoked, `jwt.verify(token, config.tokenSecret)` is used to check:
    * The token's signature against the application's secret key.
    * The token's expiration time.
4. **User Population**: If verification is successful, the decoded payload of the JWT (containing user information like email, ID) is attached to `req.user`.
5. **Next Step**: `next()` is called, allowing the request to proceed to the next middleware or the actual route handler. If any check fails, a 401 Unauthorized response is sent.

## 4. Usage Examples / Onboarding Guide

### Registration

Create a new user account:

* **Endpoint**: `POST /auth/register`
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Body** (JSON):

    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe23",
      "email": "john.doe23@example.com",
      "password": "Password123!"
    }
    ```

* **Success Response (201 Created)**:

    ```json
    {
      "message": "User registered successfully",
      "user": {
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe23",
        "email": "john.doe23@example.com",
        "_id": "someUserId",
        "created_at": "2023-01-01T00:00:00.000Z",
        "apiKey": "someApiKey" 
        // Note: apiKey structure and reliability depend on current implementation
      }
    }
    ```

### Login

Log in to obtain a JWT:

* **Endpoint**: `POST /auth/login`
* **Method**: `POST`
* **Headers**: `Content-Type: application/json`
* **Body** (JSON):

    ```json
    {
      "email": "john.doe23@example.com",
      "password": "Password123!"
    }
    ```

* **Success Response (200 OK)**:

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lMjNAZXhhbXBsZS5jb20iLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwiX2lkIjoic29tZVVzZXJJZCIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAwOTAwfQ.someSignature"
    }
    ```

    (The token is a JSON Web Token valid for 15 minutes)

### Authenticated Request (e.g., Create Post)

Use the obtained JWT to access protected endpoints:

* **Endpoint**: `POST /posts/create`
* **Method**: `POST`
* **Headers**:
  * `Content-Type: application/json`
  * `Authorization: Bearer <your_jwt_token_here>` (Replace `<your_jwt_token_here>` with the token from the login response)
* **Body** (JSON):

    ```json
    {
      "title": "My First Protected Post",
      "content": "This content is created by an authenticated user.",
      "author": "John Doe" 
      // Author field might be derived from req.user in a future enhancement
    }
    ```

* **Success Response (201 Created)**:

    ```json
    {
      "_id": "somePostId",
      "title": "My First Protected Post",
      "content": "This content is created by an authenticated user.",
      "author": "John Doe",
      "created_at": "2023-01-01T00:05:00.000Z"
    }
    ```

## 5. Configuration and Environment Setup

* **Environment Variables**:
  * The project uses a `.env` file to manage environment-specific variables.
  * An example file, `.env.example`, is provided. Copy it to `.env` and fill in your actual configuration values:
        ```bash
        cp .env.example .env
        ```
  * Key variables in `.env`:
    * `PORT`: The port the server will listen on (e.g., `5000`).
    * `TOKEN_SECRET`: A secret key for signing and verifying JWTs. You can generate one using `node src/utils/generateTokenSecret.js`.
    * `MONGODB_URI`: The connection string for your local MongoDB instance (e.g., `mongodb://127.0.0.1:27017/yourdbname`).
    * `MONGODB_ATLAS_URI`: (Optional) Connection string for a MongoDB Atlas instance.

* **Dependencies**:

* Install project dependencies using npm:

```bash
npm install
```

* Key dependencies (from `package.json`):
        - `express`: Web framework.
        - `mongoose`: MongoDB ODM.
        - `bcrypt`: Password hashing.
        - `jsonwebtoken`: JWT creation and verification.
        - `express-validator`: Input validation.
        - `dotenv`: Environment variable loading.
        - `express-jsdoc-swagger`: API documentation generation.

* **Running the Application**:
  * The primary script to start the application is defined in `package.json`:
        ```js
        "scripts": {
          "start": "nodemon src/bin/www"
        }
        ```
    * Start the server using:

        ```bash
        npm start
        ```

    * This command uses `nodemon` to run `src/bin/www`, which initializes the database connection and starts the Express server. `nodemon` will automatically restart the server on file changes.

## 6. API Documentation

The API documentation is generated using `express-jsdoc-swagger` and is available by navigating to `/api/docs` in your browser when the server is running.

Example: `http://localhost:5000/api/docs` (if `PORT` is 5000).

The Swagger UI allows you to explore endpoints, view request/response schemas, and test API calls directly.

## 7. Diagrams

### Request Flow for Authenticated Endpoint (e.g., Create Post)

```mermaid
sequenceDiagram
    participant Client
    participant Server as API Gateway/LB
    participant ExpressApp as Express Application
    participant AuthMiddleware as authorize()
    participant LoginRequiredMiddleware as loginRequired()
    participant PostController
    participant CreatePostUseCase
    participant PostRepository
    participant Database

    Client->>Server: POST /posts/create (with JWT)
    Server->>ExpressApp: Request
    ExpressApp->>AuthMiddleware: execute(req, res, next)
    AuthMiddleware-->>Database: Check RevokedToken
    AuthMiddleware->>AuthMiddleware: Verify JWT
    AuthMiddleware->>ExpressApp: req.user populated
    ExpressApp->>LoginRequiredMiddleware: execute(req, res, next)
    LoginRequiredMiddleware->>ExpressApp: next()
    ExpressApp->>PostController: createPost(req, res)
    PostController->>CreatePostUseCase: createPost(req.body)
    CreatePostUseCase->>PostRepository: savePost(postData)
    PostRepository->>Database: Insert post
    Database-->>PostRepository: Saved post
    PostRepository-->>CreatePostUseCase: Saved post
    CreatePostUseCase-->>PostController: Saved post
    PostController-->>ExpressApp: res.status(201).json(post)
    ExpressApp-->>Client: HTTP 201 Response
```

### High-Level Architectural Components

```mermaid
flowchart TD
    A[Client] --> B[Express App / Routes]
    B --> C{Middleware}
    C -->|Authentication/Validation| D[Controllers]
    D --> E[Use Cases/Core Logic]
    E --> F[Ports/Interfaces]
    F -->|Implemented by| G[Repositories/Infrastructure]
    G --> H[Database/MongoDB]
    E -->|Domain Objects| I[Entities/Core Logic]
    X[Config] --> B
    X --> E
    X --> G
```

## 8. Development Notes / TODOs

* **General TODOs**:
  * Multiple `console.log` statements are present throughout the codebase (e.g., `User.js`, `userController.js`, `postController.js`, `authMiddleware.js`, `loginRequired.js`, `www`). These should be removed or replaced with a proper logger for production.
* **User Routes (`src/infrastructure/api/routes/userroutes.js`)**:
  * The root `GET /` route (`userRoutes.get("/", ...`) currently sends back HTML (`res.send('<h1> Hello API !</h1> <a href="/api/docs">Documentation</a>');`). A `//TODO: Remove Html` comment is present because REST API should not send HTML.
* **Database (`src/config/database.js`)**:
  * The `connectDB` function includes a `console.error("❌ Erreur : MONGODB_URI non définie dans .env");` which is good for initial setup but might be part of a more robust config validation.
* **Server Start (`src/bin/www`)**:
  * `console.log("Starting server...");`
  * `console.log(🌍 Running in ${config.NODE_ENV || "Development"} mode);`
  * `console.log(📡 MongoDB URL: ${config.mongoURI ? "Ok Defined" : "Not set"});`
    These are informational but should ideally be handled by a structured logger.
