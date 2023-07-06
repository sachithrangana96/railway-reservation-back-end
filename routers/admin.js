const express = require('express');
const adminController = require('../controller/admin');

const router = express.Router();

// Admin routes
router.post('/', adminController.login);

router.post('/create', adminController.createAdmin);
module.exports = router;
