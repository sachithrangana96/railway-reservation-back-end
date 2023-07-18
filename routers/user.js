const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

// User routes

router.get('/', userController.getAllUsers);
router.get('/userID', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
