const express = require("express");
const router = express.Router();
const ChatRequestController = require("../controller/chatRequestController");
const { validation_token } = require("../middleware/auth.validation");

router.use(validation_token);

router.post("/", ChatRequestController.createRequest);
router.get("/queue", ChatRequestController.listPending);
router.get("/my", ChatRequestController.getActiveForRefugee);
router.get("/:id", ChatRequestController.getById);
router.post("/:id/accept", ChatRequestController.acceptRequest);

module.exports = router;
