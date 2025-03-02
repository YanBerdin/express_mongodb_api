class UserRepositoryInterface {
  async saveUser(userData) {
    throw new Error("Méthode 'saveUser' non implémentée");
  }

  async findByEmail(email) {
    throw new Error("Méthode 'findByEmail' non implémentée");
  }

  async findById(id) {
    throw new Error("Méthode 'findById' non implémentée");
  }
}

module.exports = UserRepositoryInterface;
