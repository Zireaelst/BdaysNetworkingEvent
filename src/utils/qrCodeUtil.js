const QRCode = require('qrcode');

/**
 * Generate a QR code image as data URL containing the user's QR code ID
 * @param {string} qrCodeId - Unique ID to embed in QR code
 * @returns {Promise<string>} - Data URL of the QR code
 */
exports.generateQRCode = async (qrCodeId) => {
  try {
    // The data to encode in the QR code - we'll use the qrCodeId 
    // which can be used to look up the user
    const data = qrCodeId;
    
    // Generate QR code as a data URL (base64 encoded image)
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H', // High error correction for better scanning
      margin: 1,
      width: 300,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
    
    return qrCodeDataUrl;
  } catch (error) {
    throw new Error(`Error generating QR code: ${error.message}`);
  }
};

/**
 * Generate a QR code as a PNG buffer
 * @param {string} qrCodeId - Unique ID to embed in QR code
 * @returns {Promise<Buffer>} - Buffer containing the QR code image
 */
exports.generateQRCodeBuffer = async (qrCodeId) => {
  try {
    const buffer = await QRCode.toBuffer(qrCodeId, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 300,
    });
    
    return buffer;
  } catch (error) {
    throw new Error(`Error generating QR code buffer: ${error.message}`);
  }
}; 