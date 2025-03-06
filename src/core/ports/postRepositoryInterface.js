class PostRepositoryInterface {
  /**
   * Sauvegarde un nouveau post
   * @param {Object} postData - Données du post
   * @returns {Promise<Object>} - Le post sauvegardé
   */
  async savePost(postData) {
    throw new Error("Méthode 'savePost' non implémentée");
  }

  /**
   * Récupère tous les posts
   * @returns {Promise<Array>} - Liste de posts
   */
  async findAllPosts() {
    throw new Error("Méthode 'findAllPosts' non implémentée");
  }

  /**
   * Récupère un post par son ID
   * @param {string} id - Identifiant du post
   * @returns {Promise<Object|null>} - Le post trouvé ou null
   */
  async findPostById(id) {
    throw new Error("Méthode 'findPostById' non implémentée");
  }

  /**
   * Met à jour un post
   * @param {string} id - Identifiant du post
   * @param {Object} updateData - Données de mise à jour
   * @returns {Promise<Object>} - Le post mis à jour
   */
  async updatePost(id, updateData) {
    throw new Error("Méthode 'updatePost' non implémentée");
  }

  /**
   * Supprime un post
   * @param {string} id - Identifiant du post
   * @returns {Promise<Object|null>} - Le post supprimé ou null
   */
  async deletePost(id) {
    throw new Error("Méthode 'deletePost' non implémentée");
  }
}

module.exports = PostRepositoryInterface;
