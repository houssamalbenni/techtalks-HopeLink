const express = require('express');
const router = express.Router();
const NgoController = require('../controller/ngoController');
const { validation_token } = require('../middleware/auth.validation');
const roleVerification = require('../middleware/roleVerification');

router.use(validation_token);

// Get aid requests for services owned by the authenticated NGO
router.get('/requests', roleVerification(['ngo']), NgoController.getRequestsForNgo);

module.exports = router;
