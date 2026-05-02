const express = require("express");
const router = express.Router();
const DonorController = require('../controller/donorController');
const { validation_token } = require('../middleware/auth.validation');
const roleVerification = require('../middleware/roleVerification');

router.use(validation_token); // Apply authentication middleware to all routes
router.use(roleVerification(['donor'])); // Apply role verification middleware to all routes, ensure only donors can access these routes
router.post("/",DonorController.createDonation);
router.get("/total", DonorController.getTotalDonationsAmmount);
router.get("/", DonorController.getAllUserDonations);
module.exports = router;