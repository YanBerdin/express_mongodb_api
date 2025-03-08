// src/core/usecases/post-use-cases/delete-post.js
const MongoosePostRepository = require ("../../../infrastructure/repositories/mongoosePostRepository");

class DeletePostUseCase {
  constructor() {
    this.postRepository = new MongoosePostRepository();
  }

  async deletePost(id) {
    return await this.postRepository.deletePost(id);
  }
}

module.exports = DeletePostUseCase;
// export default DeletePostUseCase;
