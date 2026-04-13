const express = require("express");
const router = express.Router();
const AdminController = require('../controller/admin.controller.js');
// Get nearby services (geo query)
router.get("/services/nearby", AdminController.getNearbyServices);
// Create service (hospital / shelter)
router.post("/services", AdminController.createService);

// Get all services
router.get("/services", AdminController.getService);
module.exports = router;