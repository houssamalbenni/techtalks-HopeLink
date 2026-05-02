const express = require("express");
const router = express.Router();
const RefugeeController = require('../controller/refugeeController');
const { validation_token } = require('../middleware/auth.validation');
const roleVerification = require('../middleware/roleVerification');
router.use(validation_token); // Apply authentication middleware to all routes

router.get("/",roleVerification(['admin']),RefugeeController.getAllRequests);
router.get("/my-requests",roleVerification(['refugee']),RefugeeController.getMyRequests);
router.get("/:id",roleVerification(['admin']), RefugeeController.getRequestById);

router.post("/",roleVerification(['refugee']), RefugeeController.requestService);
router.put("/:id", roleVerification(['admin']), RefugeeController.updateRequest);

module.exports = router;