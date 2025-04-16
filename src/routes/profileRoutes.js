const express = require('express');
const User = require('../models/userModel');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get public profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    
    // Return public profile data
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          phone: user.phone,
          linkedinUrl: user.linkedinUrl,
          fullName: user.fullName,
        },
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
});

// Protected routes
router.use(auth.protect);

// Get list of connections (to be implemented)
router.get('/connections', async (req, res) => {
  // For future implementation - track connections between users
  res.status(200).json({
    status: 'success',
    message: 'Feature to be implemented',
    data: {
      connections: [],
    },
  });
});

module.exports = router; 