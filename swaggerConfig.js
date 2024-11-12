// swaggerConfig.js
const options = {
  info: {
    version: "1.0.0",
    title: "User Authentication API",
    description:
      "Documentation de l'API d'authentification des utilisateurs. Testez les routes en obtenant un JWT après une connexion réussie. Utilisez ce JWT pour autoriser vos requêtes sécurisées.",
    license: {
      name: "MIT",
    },
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
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          firstName: { type: "string", example: "Diana" },
          lastName: { type: "string", example: "Linares" },
          username: { type: "string", example: "diana2023" },
          email: { type: "string", example: "diana2023@gmail.com" },
          password: { type: "string", example: "0./<>@5/#89" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: { type: "string", example: "JWT token here" },
        },
      },
    },
  },
};

module.exports = options;
