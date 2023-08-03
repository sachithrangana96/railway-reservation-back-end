const express = require('express');
const userController = require('../controller/user');
const { verifyToken } = require("../middlewares/verifyToken")
const router = express.Router();

// User routes

router.get('/', userController.getAllUsers);
router.get('/me',verifyToken, userController.getUserByMe);
router.get('/:id', userController.getUserById);
router.post('/update',verifyToken, userController.updateMe)
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
