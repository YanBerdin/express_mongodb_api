// src/infrastructure/repositories/userRepository.js
const User = require("../../core/entities/User"); // ou le chemin correct vers ton modèle Mongoose

class UserRepository {
  /**
   * Sauvegarde un nouvel utilisateur dans la BDD
   * @param {Object} userData - Données de l'utilisateur à sauvegarder

   * @returns {Promise<Object>} - L'utilisateur sauvegardé
   */
  async saveUser(userData) {
    try {
      const user = new User(userData);
      // Génération et set de l'API key
      user.setAPIKey();
      return await user.save();
    } catch (error) {
      throw new Error(`Error saving user: ${error.message}`);
    }
  }

  /**
   * Recherche un utilisateur par email
   * @param {string} email - Email de l'utilisateur à rechercher
   * @returns {Promise<Object|null>} - L'utilisateur trouvé ou null
   */
  async findByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  /**
   * Recherche un utilisateur par son identifiant
   * @param {string} id - Identifiant de l'utilisateur
   * @returns {Promise<Object|null>} - L'utilisateur trouvé ou null
   */
  async findById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(`Error finding user by id: ${error.message}`);
    }
  }

  // Optionnellement, tu peux ajouter d'autres méthodes, par exemple :
  // async updateUser(id, updateData) { ... }
  // async deleteUser(id) { ... }
}

module.exports = UserRepository;
