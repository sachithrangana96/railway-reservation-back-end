const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

// User routes
router.post('/login', userController.login);

router.post('/user', userController.createUser);
module.exports = router;
