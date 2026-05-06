const express = require("express");
const router = express.Router();
const UsersController = require('../controller/usersController.js');
const { validation_token } = require('../middleware/auth.validation');

router.get("/", UsersController.getAllUsers);
router.get("/:id", UsersController.getUserById);
router.get("/roles/:role", UsersController.getUsersByRole);

router.use(validation_token); // Apply authentication middleware to all routes

router.get("/role", UsersController.getUserRole);
router.put("/", UsersController.updateUser);
router.delete("/", UsersController.deleteUser);


module.exports = router;