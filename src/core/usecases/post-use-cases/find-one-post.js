// src/core/usecases/post-use-cases/find-one-post.js
const MongoosePostRepository = require ("../../../infrastructure/repositories/mongoosePostRepository");

class FindOnePostUseCase {
  constructor() {
    this.postRepository = new MongoosePostRepository();
  }

  async findOnePost(id) {
    return await this.postRepository.findPostById(id);
  }
}

module.exports = FindOnePostUseCase;
// export default FindOnePostUseCase;