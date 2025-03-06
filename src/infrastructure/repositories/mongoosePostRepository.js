const Post = require("../../core/entities/Post");
const PostRepositoryInterface = require("../../core/ports/postRepositoryInterface");

class MongoosePostRepository extends PostRepositoryInterface {
  async savePost(postData) {
    try {
      const post = new Post(postData);
      return await post.save();
    } catch (error) {
      throw new Error(`Error saving post: ${error.message}`);
    }
  }

  async findAllPosts() {
    try {
      return await Post.find({});
    } catch (error) {
      throw new Error(`Error finding posts: ${error.message}`);
    }
  }

  async findPostById(id) {
    try {
      return await Post.findById(id);
    } catch (error) {
      throw new Error(`Error finding post by id: ${error.message}`);
    }
  }

  async updatePost(id, updateData) {
    try {
      // La méthode findByIdAndUpdate renvoie le document mis à jour si l'option {new: true} est passée
      return await Post.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }

  async deletePost(id) {
    try {
      return await Post.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}

module.exports = MongoosePostRepository;
