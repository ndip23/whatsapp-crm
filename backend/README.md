# WhatsApp Backend API

Backend server for the WhatsApp Centralized Dashboard System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `backend/` directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Add other environment variables as needed
```

3. Run the server:
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/admin` - Admin management routes
- `/api/whatsapp` - WhatsApp integration routes
- `/api/notifications` - Notification routes
- `/api/conversations` - Conversation management routes
- `/api/analytics` - Analytics routes
- `/api/superadmin` - Super admin routes
- `/api/client` - Client management routes
- `/api/shift` - Shift management routes

## Socket.IO

The server uses Socket.IO for real-time communication. Connect to the server and join user-specific rooms for notifications.

