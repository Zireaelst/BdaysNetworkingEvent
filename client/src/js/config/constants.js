// API Configuration
export const API_BASE_URL = '/api';
export const API_ENDPOINTS = {
    USERS: {
        LOGIN: '/users/login',
        REGISTER: '/users/register',
        ME: '/users/me'
    },
    PROFILES: {
        GET: '/profiles/me',
        UPDATE: '/profiles/update'
    },
    QR_CODES: {
        GENERATE: '/qrcodes/generate',
        SCAN: '/qrcodes/scan'
    }
};

// Application Constants
export const APP_CONFIG = {
    NAME: 'Blockchain Days\'25',
    VERSION: '1.0.0',
    DESCRIPTION: 'Networking Event Application'
};

// UI Constants
export const UI_CONFIG = {
    MODAL_ANIMATION_DURATION: 300,
    NOTIFICATION_DURATION: 3000,
    MAX_POINTS: 1000
};

// Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER_DATA: 'user_data'
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK: 'Network error occurred. Please try again.',
    AUTH: 'Authentication failed. Please login again.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    SERVER: 'Server error occurred. Please try again later.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
    LOGIN: 'Login successful!',
    REGISTER: 'Registration successful!',
    PROFILE_UPDATE: 'Profile updated successfully!',
    QR_SCAN: 'QR code scanned successfully!'
};

// Points System
const POINTS = {
    NEW_CONNECTION: 10,
    BONUS_FIRST_FIVE: 20,
    BONUS_FIRST_TEN: 50
};

// QR Scanner Config
const QR_CONFIG = {
    fps: 10,
    qrbox: 250,
    aspectRatio: 1.0
};

// Animation Durations
const ANIMATION = {
    NOTIFICATION_DURATION: 3000,
    LEADERBOARD_UPDATE: 1000
};

// API Endpoints (if needed in the future)
const API = {
    QR_GENERATOR: 'https://api.qrserver.com/v1/create-qr-code/'
};

// Validation Rules
const VALIDATION = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[0-9]{10,11}$/,
    LINKEDIN_REGEX: /^https:\/\/[w]{0,3}\.?linkedin\.com\/.*$/
}; 