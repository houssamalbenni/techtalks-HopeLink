const express = require("express");
const router = express.Router();
const { validateCreateService} = require('../middleware/auth.validation');
const AdminController = require('../controller/admin.controller');
const { validation_token } = require('../middleware/auth.validation');
const roleVerification = require('../middleware/roleVerification');
// Get nearby services (geo query)
router.get("/services/nearby", validation_token, AdminController.getNearbyServices);
// Create service (hospital / shelter)
router.post("/services", validation_token, roleVerification(['admin', 'ngo']), validateCreateService, AdminController.createService);

// Get all services
router.get("/services", AdminController.getService);
router.delete("/services/:id", validation_token, roleVerification(['admin']), AdminController.deleteService);
// Get service by ID
router.get("/services/:id", AdminController.findServiceById);
router.put("/services/:id", validation_token, roleVerification(['admin', 'ngo']), AdminController.updateService);
module.exports = router;