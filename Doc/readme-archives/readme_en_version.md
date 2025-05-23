# Express MongoDB REST API

This API allows managing users and posts with JWT authentication, MongoDB as the database, and a token revocation model to enhance session security.

## Technologies Used

- **Express**: Framework for creating web applications and Node.js servers.
- **MongoDB**: High-performance and flexible NoSQL database.
- **Mongoose**: MongoDB object modeling for Node.js, with data schemas, validation, and query support.
- **JWT (JsonWebToken)**: For token-based authentication.

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

## Installation

Clone the repository, then install the dependencies:

```bash
git clone <REPOSITORY_URL>
cd PROJECT_NAME
npm install
```

## Environment Variables Configuration

Create a `.env` file in the project root and add the following variables:

```plaintext
PORT=3000
MONGODB_URI=<your_MongoDB_URI>
TOKEN_SECRET=<your_jwt_secret>
```

## Starting the Application

Start the server with the following command:

```bash
npm start
```

## Starting MongoDB

You can manage MongoDB via `systemctl` on Linux to start, stop, or check its status. For example:

```bash
sudo systemctl start mongodb
```

## Swagger Documentation

<http://localhost:3000/api/docs/>

## API Routes

### Authentication and User Management

1. **Register a User:**

   - **Endpoint**: `POST /auth/register`
   - **Description**: Creates a new user.
   - **Example**:

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

2. **Login a User:**

   - **Endpoint**: `POST /auth/login`
   - **Description**: Authenticates a user and generates a JWT token.
   - **Example**:

   ```bash
   curl -X POST http://localhost:3000/auth/login \
   -H "Content-Type: application/json" \
   -d '{
       "email": "john2024@gmail.com",
       "password": "strongPassword123!"
   }'
   ```

3. **Logout a User (Token Revoked):**

   - **Endpoint**: `POST /auth/logout`
   - **Description**: Adds the user's JWT token to the revoked tokens list, preventing any future use.
   - **Example**:

   ```bash
   curl -X POST http://localhost:3000/auth/logout \
   -H 'Content-Type: application/json' \
   -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
   ```

### Post Management

1. **Get All Posts:**

   - **Endpoint**: `GET /posts`
   - **Description**: Returns the list of public posts.
   - **Example**:

   ```bash
   curl http://localhost:3000/posts
   ```

2. **Create a Post (Authentication Required):**

   - **Endpoint**: `POST /posts/create`
   - **Description**: Creates a post, accessible only to authenticated users.
   - **Example**:

   ```bash
   curl -X POST http://localhost:3000/posts/create \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
   -d '{
       "title": "New post",
       "content": "Post content",
       "author": "Author"
   }'
   ```

3. **Update a Post:**

   - **Endpoint**: `PATCH /posts/update/:postId`
   - **Description**: Allows modifying an existing post.
   - **Example**:

   ```bash
   curl -X PATCH http://localhost:3000/posts/update/POST_ID \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
   -d '{
       "title": "Modified title",
       "content": "Updated content"
   }'
   ```

4. **Delete a Post:**

   - **Endpoint**: `DELETE /posts/delete/:postId`
   - **Description**: Deletes a post based on the ID.
   - **Example**:

   ```bash
   curl -X DELETE http://localhost:3000/posts/delete/POST_ID \
   -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
   ```

### API Key Management

1. **Generate an API Key:**

   - **Endpoint**: `POST /generateApiKey`
   - **Description**: Generates an API key for an authenticated user.
   - **Example**:

   ```bash
   curl -X POST http://localhost:3000/generateApiKey \
   -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
   -d '{"email": "john2024@gmail.com"}'
   ```

## Security and Token Revocation

The API uses JWT tokens to secure endpoints and implements token revocation logic. When a user logs out, their token is added to the revoked tokens list (`RevokedToken`), preventing any reuse of that token.

## Best Practices

- **Use of JWT**: Regularly renew your tokens to maintain security.
- **Route Protection**: Use the `authorize` middleware to protect sensitive routes.
- **Error Handling**: Include clear feedback for errors (such as "Invalid token" or "User not authenticated") to facilitate debugging.