const express = require("express");
const router = express.Router();
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

module.exports = router;