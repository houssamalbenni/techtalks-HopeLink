const express = require("express");
const router = express.Router();
const { validateCreateService} = require('../middleware/auth.validation');
const AdminController = require('../controller/admin.controller');
// Get nearby services (geo query)
router.get("/services/nearby", AdminController.getNearbyServices);
// Create service (hospital / shelter)
router.post("/services",validateCreateService, AdminController.createService);

// Get all services
router.get("/services", AdminController.getService);
router.delete("/services/:id", AdminController.deleteService);
// Get service by ID
router.get("/services/:id", AdminController.findServiceById);
router.put("/services/:id", AdminController.updateService);
module.exports = router;