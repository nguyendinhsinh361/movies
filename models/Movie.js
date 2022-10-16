const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    origin_name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumb_url: {
      type: String,
      required: true,
    },
    poster_url: {
      type: String,
      required: true,
    },
    trailer_url: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    director: {
      type: Array,
    },
    status: {
      type: String,
    },
    country: {
      type: String,
    },
    actor: {
      type: Array,
    },
    year: {
      type: Number,
    },
    category: {
      type: Array,
      required: true,
    },
    episodes: {
      type: Array,
      required: true,
    },
    comments: [{ 
      type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }],
    ratings: [{ 
      type: mongoose.Schema.Types.ObjectId, ref: 'Rating'
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
