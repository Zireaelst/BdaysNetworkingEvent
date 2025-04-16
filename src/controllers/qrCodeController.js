const User = require('../models/userModel');
const { generateQRCode, generateQRCodeBuffer } = require('../utils/qrCodeUtil');

// Generate QR code for a user
exports.generateUserQRCode = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    
    // Generate QR code data URL
    const qrCodeDataUrl = await generateQRCode(user.qrCodeId);
    
    res.status(200).json({
      status: 'success',
      data: {
        qrCode: qrCodeDataUrl,
        qrCodeId: user.qrCodeId,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get QR code as image
exports.getQRCodeImage = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    
    // Generate QR code buffer
    const qrCodeBuffer = await generateQRCodeBuffer(user.qrCodeId);
    
    // Set response headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="qrcode.png"');
    
    // Send the image
    res.send(qrCodeBuffer);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Scan QR code to get user profile
exports.scanQRCode = async (req, res) => {
  try {
    const { qrCodeId } = req.params;
    
    if (!qrCodeId) {
      return res.status(400).json({
        status: 'fail',
        message: 'QR code ID is required',
      });
    }
    
    // Find user by qrCodeId
    const user = await User.findOne({ qrCodeId });
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with this QR code',
      });
    }
    
    // Return user profile data (without sensitive information)
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
}; 