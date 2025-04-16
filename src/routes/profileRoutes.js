const express = require('express');
const profileController = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(auth.protect);

// Get current user's profile
router.get('/me', profileController.getMyProfile);

// Update current user's profile
router.patch('/update', profileController.updateProfile);

// Get profile by ID
router.get('/:id', profileController.getProfile);

module.exports = router; 