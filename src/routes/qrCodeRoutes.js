const express = require('express');
const qrCodeController = require('../controllers/qrCodeController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes (require authentication)
router.use(auth.protect);

// Generate QR code for the authenticated user
router.get('/generate', qrCodeController.generateUserQRCode);

// Get QR code as image
router.get('/image', qrCodeController.getQRCodeImage);

// Public route for scanning QR codes (still behind auth to prevent abuse)
router.get('/scan/:qrCodeId', qrCodeController.scanQRCode);

module.exports = router; 