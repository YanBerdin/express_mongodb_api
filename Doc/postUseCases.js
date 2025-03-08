/*const MongoosePostRepository = require("../../infrastructure/repositories/mongoosePostRepository");

class PostUseCases {
  constructor() {
    this.postRepository = new MongoosePostRepository();
  }

  async findPosts() {
    return await this.postRepository.findAllPosts();
  }

  async createPost(postData) {
    return await this.postRepository.savePost(postData);
  }

  async findOnePost(id) {
    return await this.postRepository.findPostById(id);
  }

  async updatePost(id, updateData) {
    return await this.postRepository.updatePost(id, updateData);
  }

  async deletePost(id) {
    return await this.postRepository.deletePost(id);
  }
}

module.exports = PostUseCases;
*/