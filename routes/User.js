const userController = require("../controller/userController");
const verify = require("../verifyToken");

const router = require("express").Router();

//Get All User
router.get("/", verify, userController.getAllUser);
//Get A User
router.get("/find/:id", userController.getUser);
//Add new user
router.post("/new", verify, userController.createUser);
//Update User
router.put("/:id", verify, userController.updateUser);
//Delete User
router.delete("/:id", verify, userController.deleteUser);
//Get A User
router.get("/profile/:id", userController.getUserById);
//get new user
router.get("/newuser", userController.getNewUser);

module.exports = router;
