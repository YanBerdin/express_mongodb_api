// Module d'abstraction de l'accès à la BDD.
const User = require("../../core/entities/User"); // model Mongoose
const UserRepositoryInterface = require("../../core/ports/userRepositoryInterface");

class MongooseUserRepository extends UserRepositoryInterface {
  /**
   * Sauvegarde un nouvel utilisateur dans la BDD
   * @param {Object} userData - Données de l'utilisateur à sauvegarder

   * @returns {Promise<Object>} - L'utilisateur sauvegardé
   */
  async saveUser(userData) {
    try {
      const user = new User(userData);
      user.setAPIKey(); // Génération et set de l'API key
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

  // async updateUser(id, updateData) { ... }
  // async deleteUser(id) { ... }
}

module.exports = MongooseUserRepository;
