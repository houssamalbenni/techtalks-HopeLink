const express = require("express");
const router = express.Router();
const UsersController = require('../controller/usersController.js');


router.get("/", UsersController.getAllUsers);
router.get("/role", UsersController.getUserRole);
router.get("/:id", UsersController.getUserById);
router.put("/:id", UsersController.updateUser);
router.get("/roles/:role", UsersController.getUsersByRole);
router.delete("/:id", UsersController.deleteUser);


module.exports = router;