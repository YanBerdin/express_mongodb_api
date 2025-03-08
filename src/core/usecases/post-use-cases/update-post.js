// src/core/usecases/post-use-cases/update-post.js
const MongoosePostRepository = require ("../../../infrastructure/repositories/mongoosePostRepository");

class UpdatePostUseCase {
  constructor() {
    this.postRepository = new MongoosePostRepository();
  }

  async updatePost(id, updateData) {
    return await this.postRepository.updatePost(id, updateData);
  }
}

module.exports = UpdatePostUseCase;
// export default UpdatePostUseCase;