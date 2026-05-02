const express = require("express");
const router = express.Router();
const { validateCreateService} = require('../middleware/auth.validation');
const AdminController = require('../controller/admin.controller');
const { validation_token } = require('../middleware/auth.validation');
const roleVerification = require('../middleware/roleVerification');
router.use(validation_token); // Apply authentication middleware to all routes
// Get nearby services (geo query)
router.get("/services/nearby", AdminController.getNearbyServices);
// Create service (hospital / shelter)
router.post("/services",roleVerification(['admin']),validateCreateService, AdminController.createService);

// Get all services
router.get("/services", AdminController.getService);
router.delete("/services/:id",roleVerification(['admin']), AdminController.deleteService);
// Get service by ID
router.get("/services/:id", AdminController.findServiceById);
router.put("/services/:id",roleVerification(['admin']), AdminController.updateService);
module.exports = router;