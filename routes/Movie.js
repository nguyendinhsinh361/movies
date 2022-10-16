const movieController = require("../controller/movieController");
const verify = require("../verifyToken");

const router = require("express").Router();

//Add Movie
router.post("/", verify, movieController.addMovie);
//Get All Movie
router.get("/", movieController.getAllMovie);
//Get new Movie
router.get("/new", movieController.getNewMovie);
//Get movies series
router.get("/series", movieController.getMovieSeries);
//Get movies single
router.get("/single", movieController.getMovieSingle);
//Filter Movie By Name
router.get("/search/name=:name", movieController.filterMovieByName);
//Filter Movie By Category
router.get("/filter/name=:category", movieController.filterMovieByCategory);
//Get Random Movie
router.get("/random", movieController.getRandomMovie);
//Get A Movie
router.get("/find/:id", movieController.getAMovie);
//Update Movie
router.put("/:id", verify, movieController.updateMovie);
//Delete Movie
router.delete("/:id", verify, movieController.deleteMovie);
//Add comment
router.post("/post", movieController.addComment);
//Delete comment
router.delete("/post/delete/:id", movieController.deleteComment);

module.exports = router;
