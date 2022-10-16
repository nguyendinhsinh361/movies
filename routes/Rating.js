const ratingController = require('../controller/ratingController')
const router = require("express").Router();
const verify = require("../verifyToken");

//ADD RATING
router.post("/", verify, ratingController.addRating);

//DELETE RATING
router.delete("/:id", verify, ratingController.deleteRating);

module.exports = router;
