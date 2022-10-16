const Movie = require("../models/Movie");

const movieController = {
  addMovie: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const newMovie = new Movie(req.body);
        const saveMovie = await newMovie.save();
        res.status(201).json(saveMovie);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  },
  filterMovieByName: async (req, res) => {
    const nameMovie = req.params.name;
    try {
      const movies = await Movie.find({
        name: { $regex: nameMovie, $options: "i" },
      });
      res.status(200).json(movies.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  },
  filterMovieByCategory: async (req, res) => {
    const category = req.params.category.replace("-", " ");
    const resultCategory = await Movie.findOne({ value: category });

    try {
      if (resultCategory) {
        const movies = await Movie.find({
          category: { $eq: category },
        });
        res.status(200).json(movies.reverse());
      } else {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMovieSeries: async (req, res) => {
    try {
      const moviesSeries = await Movie.find({
        type: { $eq: "series" },
      });
      res.status(200).json(moviesSeries.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMovieSingle: async (req, res) => {
    try {
      const moviesSingle = await Movie.find({
        type: { $eq: "single" },
      });
      res.status(200).json(moviesSingle.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getNewMovie: async (req, res) => {
    try {
      const movies = await Movie.find();
      const newMovies = movies.reverse().slice(0, 10);
      res.status(200).json(newMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllMovie: async (req, res) => {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id).populate(["comments", "ratings"]);
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getRandomMovie: async (req, res) => {
    let movie;
    try {
      movie = await Movie.aggregate();
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(err);
    }
  },
  updateMovie: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMovie);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed");
    }
  },
  deleteMovie: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed to delete");
    }
  },
  addComment: async (req, res) => {
    const matched = await v.check;
    const comment = {
      comment: req.body.comment,
      postedBy: req.user._id,
    };
    Movie.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
      });
  },
  deleteComment: async (req, res) => {
    Movie.findOne({ _id: req.params._id })
      .populate("postedBy", "_id")
      .exec((err, post) => {
        if (err || !post) {
          return res.status(422).json({ error: err });
        }
        if (post.postedBy._id.toString() === req.user._id.toString()) {
          post
            .remove()
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  },
};

module.exports = movieController;
