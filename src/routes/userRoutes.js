const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (require authentication)
router.use(auth.protect);
router.get('/me', userController.getCurrentUser);
router.patch('/updateProfile', userController.updateProfile);

// Admin only routes
router.get('/', auth.restrictTo('admin'), userController.getAllUsers);

module.exports = router; 