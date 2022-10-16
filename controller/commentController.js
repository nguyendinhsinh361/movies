const Comment = require('../models/Comment')
const Movie = require('../models/Movie')

const commentController = {
    addComment: async (req, res) => {
      if (req.user) {
        const newComment = new Comment({content: req.body.content, movie: req.body.movie, postedBy: req.user.id});
        
        try {
          const savedComment = await newComment.save();
          await Movie.findByIdAndUpdate(
            req.body.movie,
            { $push: { comments: savedComment._id } },
            { new: true, useFindAndModify: false }
          );
          res.status(201).json(savedComment);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You are not allowed!");
      }
    },
    deleteComment: async (req, res) => {
      if (req.user) {
        try {
          await Comment.findByIdAndDelete(req.params.id);
          res.status(201).json("The comment has been delete...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You are not allowed!");
      }
    },
  };
  
  module.exports = commentController;
  