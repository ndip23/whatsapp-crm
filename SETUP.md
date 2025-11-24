# Setup Guide

## Prerequisites

- Node.js 16+ installed
- MongoDB database (local or Atlas)
- npm or yarn package manager

## Installation Steps

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Environment Variables Setup

#### Frontend (.env in root directory)

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

#### Backend (.env in backend directory)

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/whatsapp-db
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/whatsapp-db?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars

# WhatsApp Provider Configuration (optional)
# TWILIO_ACCOUNT_SID=your_twilio_account_sid
# TWILIO_AUTH_TOKEN=your_twilio_auth_token
# TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Meta WhatsApp Business API (optional)
# META_APP_ID=your_meta_app_id
# META_APP_SECRET=your_meta_app_secret
# META_VERIFY_TOKEN=your_meta_verify_token

# WhatsAcloud Provider (optional)
# WHATSACLOUD_API_KEY=your_whatsacloud_api_key
# WHATSACLOUD_API_URL=your_whatsacloud_api_url
```

### 3. Database Setup

Make sure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or ensure your MongoDB Atlas connection string is correct
```

### 4. Initialize Super Admin

After starting the backend, you can initialize a super admin by making a POST request to:

```bash
curl -X POST http://localhost:5000/api/auth/init-superadmin
```

Or use the default credentials:
- Email: `superadmin@example.com`
- Password: `SuperAdmin123!`

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:5000`

## API Endpoints

All API endpoints are prefixed with `/api`:

- `/api/auth` - Authentication (login, register)
- `/api/admin` - Admin management
- `/api/whatsapp` - WhatsApp integration
- `/api/notifications` - Notifications
- `/api/conversations` - Conversation management
- `/api/analytics` - Analytics
- `/api/superadmin` - Super admin operations
- `/api/client` - Client management
- `/api/shift` - Shift management

## Authentication

The application uses JWT tokens stored in cookies. After login, the token is automatically included in all API requests via the axios interceptor.

## Troubleshooting

1. **CORS Errors**: Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
2. **Database Connection**: Verify `MONGO_URI` is correct and MongoDB is running
3. **401 Unauthorized**: Check that JWT_SECRET is set and token is being sent
4. **Port Conflicts**: Change `PORT` in backend `.env` if 5000 is already in use

