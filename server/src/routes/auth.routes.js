const express = require("express");
const router = express.Router();

const { loginRefugeeController, registerRefugeeController }= require('../controller/auth.controller.js');
const { loginRules, registerRefugeeRules } =require('../middleware/auth.validation.js');
const userController = require('../controller/auth.controller.js');
// ─── Register Route ───────────────────────────────────────────────────────────
router.post('/register', userController.registerRefugeeController);

// ─── Login Route ──────────────────────────────────────────────────────────────
 router.post('/login', loginRules, loginRefugeeController);



// ─── Service Route (hospitals & shelters) ──────────────────────────────────────────────────────────────




// Create ANY service (hospital, shelter, etc.)
const AdminController = require("../controller/admin.controller");

// Get nearby services (geo query)
router.get("/services/nearby", AdminController.getNearby);
// Create service (hospital / shelter)
router.post("/services", AdminController.createService);

// Get all services
router.get("/services", AdminController.getServices);
module.exports = router;