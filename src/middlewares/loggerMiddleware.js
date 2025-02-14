// src/infrastructure/api/middlewares/loggerMiddleware.js
const loggerMiddleware = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    next();
  };
  
  module.exports = loggerMiddleware;
  