const express = require('express');
const familyController = require('../controller/familyController');
const { validation_token } = require('../middleware/auth.validation');
const router = express.Router();
router.use(validation_token);
router.get("/", familyController.getAllMissingPersons);
router.get("/:id", familyController.getMissingPersonById);
router.post("/", familyController.createMissingPerson);
router.put("/:id", familyController.updateMissingPerson);

module.exports = router;