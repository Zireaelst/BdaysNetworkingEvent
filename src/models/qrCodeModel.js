const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastScanned: {
    type: Date
  },
  scanCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('QRCode', qrCodeSchema); 