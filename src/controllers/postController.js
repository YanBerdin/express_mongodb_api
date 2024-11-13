const mongoose = require("mongoose");
const Post = require("../models/Post");
const { validationResult } = require("express-validator");

module.exports = {
  /**
   * @openapi
   * /posts:
   *   get:
   *     summary: Récupère tous les posts
   *     description: Renvoie une liste de tous les posts présents dans la base de données.
   *     tags:
   *       - Posts
   *     responses:
   *       200:
   *         description: Liste des posts
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Post'
   *       500:
   *         description: Erreur serveur interne
   */
  async findPosts(req, res) {
    // console.log(">> GET /posts");
    try {
      const posts = await Post.find({});
      res.send(posts);
    } catch (error) {
      res.send(error);
    }
  },
  
  /**
   * @openapi
   * /posts/create:
   *   post:
   *     summary: Crée un nouveau post
   *     description: Crée un post en envoyant un objet avec le titre, le contenu (chaîne de caractères), et l'auteur.
   *     tags:
   *       - Posts
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Post'
   *     responses:
   *       201:
   *         description: Post créé avec succès
   *       400:
   *         description: Données manquantes ou incorrectes
   *       500:
   *         description: Erreur serveur interne
   */
  async createPost(req, res) {
    // console.log(">> POST /posts/create");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(req.body);
      const post = await new Post(req.body);
      await post.save();
      res.status(201).json(post); // Send the new post object as response
      res.send("new post successfully added");
    } catch (error) {
      console.log(error);
      res.send(error);
      // res.status(500).json({ message: 'Erreur lors de la création du post' });
    }
  },

  /**
   * @openapi
   * /posts/{id}:
   *   get:
   *     summary: Récupère un post par son identifiant
   *     description: Renvoie un post spécifique en fonction de l'identifiant fourni.
   *     tags:
   *       - Posts
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Identifiant du post à récupérer
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Détails du post
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   *       404:
   *         description: Post introuvable
   */
  async findOnePost(req, res) {
    // console.log(">> GET /posts/:id");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.send(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  },

  //? findByIdAndUpdate
  /**
   * @openapi
   * /posts/update/{id}:
   *   patch:
   *     summary: Met à jour un post existant
   *     description: Modifie un post en utilisant l'identifiant et les données envoyées dans la requête.
   *     tags:
   *       - Posts
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Identifiant du post à mettre à jour
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Post'
   *     responses:
   *       200:
   *         description: Post mis à jour avec succès
   *       400:
   *         description: Données incorrectes ou manquantes
   *       404:
   *         description: Post introuvable
   *       500:
   *         description: Erreur serveur interne
   */
  async findOnePostAndUpdate(req, res) {
    // console.log(">> PATCH /posts/update/:id");
    try {
      const query = { _id: req.params.id };
      const update = req.body;
      console.log(req.body);
      const post = await Post.findByIdAndUpdate(query, update);

      await post.save();

      res.send("new post successfully edited");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  /**
   * @openapi
   * /posts/delete/{id}:
   *   delete:
   *     summary: Supprime un post existant
   *     description: Supprime un post de la base de données en fonction de l'identifiant.
   *     tags:
   *       - Posts
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Identifiant du post à supprimer
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Post supprimé avec succès
   *       404:
   *         description: Post introuvable
   *       500:
   *         description: Erreur serveur interne
   */
  async findOnePostAndDelete(req, res) {
    // console.log(">> DELETE /posts/delete/:id");
    try {
      const query = { _id: req.params.id };
      await Post.findOneAndDelete(query);
      res.send("new post successfully deleted");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};
