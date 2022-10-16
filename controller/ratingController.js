const Rating = require('../models/Rating')
const Movie = require('../models/Movie')

const ratingController = {
    addRating: async (req, res) => {
      if (req.user) {
        const newRating = new Rating({rating: req.body.rating, movie: req.body.movie, postedBy: req.user.id});
        
        try {
          const savedRating = await newRating.save();
          await Movie.findByIdAndUpdate(
            req.body.movie,
            { $push: { ratings: savedRating._id } },
            { new: true, useFindAndModify: false }
          );
          res.status(201).json(savedRating);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You are not allowed!");
      }
    },
    deleteRating: async (req, res) => {
      if (req.user) {
        try {
          await Rating.findByIdAndDelete(req.params.id);
          res.status(201).json("The Rating has been delete...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You are not allowed!");
      }
    },
  };
  
  module.exports = ratingController;
  