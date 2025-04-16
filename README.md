# BDays Networking Event Backend

This is a Node.js backend for a networking event application that allows participants to register, generate unique QR codes, and scan other participants' QR codes to view their profiles.

## Features

- Participant registration with name, surname, email, phone (optional), and LinkedIn URL (optional)
- Authentication with JWT
- Unique QR code generation for each participant
- QR code scanning to view participant profiles
- Profile management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository:
```
git clone <repository-url>
cd BdaysNetworkingEvent
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bdays-networking
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=30d
```

## Running the Application

1. Start the development server:
```
npm run dev
```

2. The server will run at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new participant
- `POST /api/users/login` - Login a participant

### User Profile
- `GET /api/users/me` - Get current user profile (requires authentication)
- `PATCH /api/users/updateProfile` - Update user profile (requires authentication)

### QR Codes
- `GET /api/qrcodes/generate` - Generate QR code for current user (requires authentication)
- `GET /api/qrcodes/image` - Get QR code as an image (requires authentication)
- `GET /api/qrcodes/scan/:qrCodeId` - Scan a QR code to get user profile (requires authentication)

### Profiles
- `GET /api/profiles/:id` - Get public profile by ID

## Project Structure

```
├── src/
│   ├── controllers/        # Controllers for handling business logic
│   ├── middleware/         # Middleware functions
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── server.js           # Main server file
├── .env                    # Environment variables
└── package.json           # Project dependencies
```

## Usage

1. Register a new user with name, surname, email, and password.
2. After login, generate a QR code from the `/api/qrcodes/generate` endpoint.
3. Other users can scan the QR code to view the profile.

## Future Enhancements

- Connection tracking between participants
- Event organization features
- Statistics and reporting
- Mobile app integration

## License

MIT 