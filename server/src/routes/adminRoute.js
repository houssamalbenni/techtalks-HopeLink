const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { validateCreateService } = require('../middleware/auth.validation');
const AdminController = require('../controller/admin.controller');
const { validation_token } = require('../middleware/auth.validation');
const roleVerification = require('../middleware/roleVerification');

router.use(validation_token);

// Stats
router.get("/stats/weekly-registrations", AdminController.getWeeklyRegistrations);
router.get("/stats/demographics", AdminController.getDemographics);
router.get("/stats/recent-activity", AdminController.getRecentActivity);

// Services
router.get("/services/nearby", AdminController.getNearbyServices);
router.post("/services", roleVerification(['admin']), validateCreateService, AdminController.createService);
router.get("/services", AdminController.getService);
router.delete("/services/:id", roleVerification(['admin']), AdminController.deleteService);
router.get("/services/:id", AdminController.findServiceById);
router.put("/services/:id", roleVerification(['admin']), AdminController.updateService);

=======
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
>>>>>>> 6c4dac5da57378261fe538a3a7c53f446ea11374
module.exports = router;