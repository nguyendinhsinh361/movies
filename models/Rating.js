const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
});

module.exports = mongoose.model("Rating", RatingSchema);
