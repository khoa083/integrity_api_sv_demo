const express = require('express');
const router = express.Router();
const { verifyIntegrity } = require('../controllers/integrityController');

router.post('/verify-integrity', verifyIntegrity);

module.exports = router;
