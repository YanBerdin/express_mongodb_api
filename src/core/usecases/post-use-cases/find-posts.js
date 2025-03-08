// src/core/usecases/post-use-cases/find-posts.js
const MongoosePostRepository = require ("../../../infrastructure/repositories/mongoosePostRepository");

class FindPostsUseCase {
  constructor() {
    this.postRepository = new MongoosePostRepository();
  }

  async findPosts() {
    return await this.postRepository.findAllPosts();
  }
}

module.exports = FindPostsUseCase;
// export default FindPostsUseCase;