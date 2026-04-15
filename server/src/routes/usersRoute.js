const express = require("express");
const router = express.Router();
const UsersController = require('../controller/usersController.js');


router.get("/", UsersController.getAllUsers);
router.get("/:id", UsersController.getUserById);
router.put("/:id", UsersController.updateUser);
router.get("/role/:role", UsersController.getUsersByRole);
router.delete("/:id", UsersController.deleteUser);


module.exports = router;