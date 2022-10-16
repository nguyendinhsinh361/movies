const listController = require("../controller/listController");
const verify = require("../verifyToken");
const router = require("express").Router();

router.post("/", verify, movieController.addList);
router.delete("/:id", verify, movieController.deleteList);
router.get("/", verify, movieController.getList);
