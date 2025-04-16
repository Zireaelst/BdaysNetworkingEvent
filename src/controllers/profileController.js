const Profile = require('../models/profileModel');
const User = require('../models/userModel');

// Get current user's profile
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate('user', 'email');
    
    if (!profile) {
      return res.status(404).json({
        status: 'fail',
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create or update profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, company, position, bio, interests, socialLinks } = req.body;

    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      // Create new profile
      profile = await Profile.create({
        user: req.user._id,
        firstName,
        lastName,
        company,
        position,
        bio,
        interests,
        socialLinks
      });
    } else {
      // Update existing profile
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.company = company;
      profile.position = position;
      profile.bio = bio;
      profile.interests = interests;
      profile.socialLinks = socialLinks;
      await profile.save();
    }

    res.status(200).json({
      status: 'success',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get profile by ID
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('user', 'email');
    
    if (!profile) {
      return res.status(404).json({
        status: 'fail',
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}; 