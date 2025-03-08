// src/core/usecases/post-use-cases/create-post.js
const MongoosePostRepository = require ("../../../infrastructure/repositories/mongoosePostRepository");

class CreatePostUseCase {
  constructor() {
    this.postRepository = new MongoosePostRepository();
  }

  async createPost(postData) {
    return await this.postRepository.savePost(postData);
  }
}

module.exports = CreatePostUseCase;
// export default CreatePostUseCase;
