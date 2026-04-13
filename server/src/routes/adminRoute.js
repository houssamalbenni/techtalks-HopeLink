const express = require("express");
const router = express.Router();
const AdminController = require('../controller/admin.controller');
// Get nearby services (geo query)
router.get("/services/nearby", AdminController.getNearbyServices);
// Create service (hospital / shelter)
router.post("/services", AdminController.createService);

// Get all services
router.get("/services", AdminController.getService);
router.delete("/services/:id", AdminController.deleteService);
// Get service by ID
router.get("/services/:id", AdminController.findServiceById);
module.exports = router;