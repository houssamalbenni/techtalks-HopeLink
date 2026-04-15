const express = require("express");
const router = express.Router();
const DonorController = require('../controller/donorController');


router.post("/",DonorController.createDonation);
router.get("/total", DonorController.getTotalDonationsAmmount);
router.get("/:userId", DonorController.getAllUserDonations);
module.exports = router;