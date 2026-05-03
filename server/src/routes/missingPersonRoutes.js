const express = require("express");
const router = express.Router();
const MissingPersonController = require("../controller/missingPersonController");
const { validation_token } = require("../middleware/auth.validation");
const roleVerification = require("../middleware/roleVerification");

router.use(validation_token); // Apply authentication middleware to all routes

// Create a missing person case
router.post("/", roleVerification(["refugee"]), MissingPersonController.createCase);

// Get my cases
router.get("/my-cases", roleVerification(["refugee"]), MissingPersonController.getMyCases);

// Get a specific case
router.get("/:id", MissingPersonController.getCaseById);

// Update a case
router.put("/:id", roleVerification(["refugee", "admin"]), MissingPersonController.updateCase);

// Add note to case
router.post("/:id/notes", MissingPersonController.addNote);

// Get all cases (admin)
router.get("/", roleVerification(["admin"]), MissingPersonController.getAllCases);

// Get cases by status (admin)
router.get("/status/:status", roleVerification(["admin"]), MissingPersonController.getCasesByStatus);

module.exports = router;
