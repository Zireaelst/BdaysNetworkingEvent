const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    surname: {
      type: String,
      required: [true, 'Please provide your surname'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    linkedinUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          // Skip validation if field is empty
          if (!v) return true;
          return validator.isURL(v) && v.includes('linkedin.com');
        },
        message: 'Please provide a valid LinkedIn URL',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false, // Don't show password in queries
    },
    qrCodeId: {
      type: String,
      unique: true,
      default: () => uuidv4(), // Generate a unique ID for QR code
    },
    role: {
      type: String,
      enum: ['participant', 'admin'],
      default: 'participant',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Password encryption middleware
userSchema.pre('save', async function(next) {
  // Only run if password is modified
  if (!this.isModified('password')) return next();
  
  // Hash the password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords for login
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Add virtual field for full name
userSchema.virtual('fullName').get(function() {
  return `${this.name} ${this.surname}`;
});

const User = mongoose.model('User', userSchema);
module.exports = User; 