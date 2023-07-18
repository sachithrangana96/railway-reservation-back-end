const express = require('express');
const userController = require('../controller/user');
const { verifyToken } = require("../middlewares/verifyToken")
const router = express.Router();

// User routes

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/me',verifyToken, userController.getUserByMe);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
