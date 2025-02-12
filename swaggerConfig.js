const options = {
  info: {
    version: "1.0.0",
    title: "Users API",
    description:
      "Documentation de l'API d'Utilisateurs avec express-jsdoc-swagger.",
    license: { name: "MIT" },
  },
  security: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
    },
  },
  baseDir: __dirname,
  filesPattern: "./**/*.js", // Cherche tous les fichiers .js dans le projet
  swaggerUIPath: "/api/docs", // Path où Swagger UI sera disponible
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: "/v3/api-docs",
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
  multiple: true,
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT" // spécifie le format du token
      },
    },
    schemas: {
      Post: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            description: "Identifiant unique du post  (ObjectId MongoDB)",
            example: "612e123",
          },
          title: {
            type: "string",
            description: "Titre du post",
            example: "Mon Premier Post",
          },
          content: {
            type: "string",
            description: "Contenu du post",
            example: "Ceci est le contenu du post.",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Date de création du post",
            example: "2023-10-12T07:20:50.52Z",
          },
          author: {
            type: "string",
            description: "Auteur du post",
            example: "John Doe",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Identifiant unique de l'utilisateur",
            example: "612e123a4f1a4a23e4d12345",
          },
          firstName: {
            type: "string",
            description: "Prénom de l'utilisateur",
            example: "Jane",
          },
          lastName: {
            type: "string",
            description: "Nom de l'utilisateur",
            example: "Doe",
          },
          username: {
            type: "string",
            description: "Nom d'utilisateur unique",
            example: "jdoe123",
          },
          email: {
            type: "string",
            format: "email",
            description: "Adresse email de l'utilisateur",
            example: "jane.doe@example.com",
          },
          apiKey: {
            type: "string",
            description: "Clé API unique pour l'utilisateur",
            example: "abcd1234efgh5678ijkl9101",
          },
          hashedPassword: {
            type: "string",
            description: "Mot de passe haché de l'utilisateur",
          },
          created_at: {
            type: "string",
            format: "date-time",
            description: "Date de création de l'utilisateur",
            example: "2023-10-12T07:20:50.52Z",
          },
          refreshToken: {
            type: "string",
            description: "Token de rafraîchissement pour l'authentification",
          },
        },
      },
    },
  },
};

module.exports = options;
