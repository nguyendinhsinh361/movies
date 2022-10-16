const commentController = require('../controller/commentController')

const router = require("express").Router();
const verify = require("../verifyToken");

//ADD COMMENT
router.post("/", verify, commentController.addComment);

//DELETE COMMENT
router.delete("/:id", verify, commentController.deleteComment);

module.exports = router;
