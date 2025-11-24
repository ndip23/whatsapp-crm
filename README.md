# WhatsApp Centralized Dashboard System

A full-stack application for managing WhatsApp conversations, team members, shifts, and clients.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Implemented Features](#implemented-features)
5. [Backend Integration Notes](#backend-integration-notes)

## Tech Stack

### Frontend
- **Framework**: React.js 19+
- **Build Tool**: Vite
- **Routing**: React Router DOM 7+
- **State Management**: React Context API
- **UI Components**: Lucide React (Icons)
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Development Tools**: ESLint, PostCSS, Autoprefixer

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5+
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (jsonwebtoken)
- **Real-time**: Socket.IO
- **Validation**: Validator.js
- **Security**: Helmet, CORS
- **Scheduling**: node-cron
- **WhatsApp Integration**: Twilio, Meta, WhatsAcloud providers

## Implemented Features

### Authentication & User Management
- Login Page with email/password validation
- Forgot Password flow with email verification and 6-digit code entry
- Profile Page for viewing and editing user information
- Change Password Page with validation
- Settings Page for application preferences
- Privacy Page with detailed privacy controls

### Dashboard & Chat Interface
- Real-time chat interface with conversation list
- Client information panel with details, tags, notes, and reminders
- Conversation status management (Solved, Pending, Escalated)
- Expandable chat view for better focus
- Expandable analytics section with performance charts
- Responsive design for all screen sizes

### Admin Management
- User Management (Add, Edit, Suspend/Delete users)
- Role Management (Create, Edit, Delete roles with user assignment)
- Permission Management (Create, Edit, Delete permissions with assignment)
- Search and pagination for all admin sections

### Business Operations
- Shift Management System
- Client Management with groups and message templates
- Monitoring & Reporting with analytics dashboard
- Shift Log with detailed conversation tracking

### UI/UX Features
- Responsive design for all device sizes
- Custom scrollbars with lighter colors
- Notification center with unread indicators
- User dropdown menu with profile options
- Consistent styling and design language
- Form validation with user-friendly error messages
- Enhanced conversation modals with WhatsApp-like interface
- Improved table views with better data organization
- Semi-transparent buttons with hover effects for better UX

## Project Structure

```
WhatsApp-and-Team-Mgmt/
├── backend/                 # Backend API (Node.js/Express)
│   ├── app.js              # Express server entry point
│   ├── config/             # Configuration files (DB, etc.)
│   ├── controllers/        # Request handlers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & role middleware
│   ├── services/           # Business logic services
│   ├── provider/           # WhatsApp provider integrations
│   ├── jobs/               # Scheduled jobs (cron)
│   ├── socket/             # Socket.IO handlers
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
├── src/                     # Frontend (React)
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context providers
│   ├── layouts/            # Page layouts
│   ├── pages/              # Page components
│   ├── services/           # Frontend API services
│   ├── lib/                # Utilities (axios config)
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── package.json            # Frontend dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## Backend Integration

The backend API is fully integrated and provides the following endpoints:

### API Endpoints
- `/api/auth` - Authentication (login, register)
- `/api/admin` - Admin management (CRUD operations)
- `/api/whatsapp` - WhatsApp webhook and message sending
- `/api/notifications` - Notification management
- `/api/conversations` - Conversation CRUD and management
- `/api/analytics` - Analytics and reporting
- `/api/superadmin` - Super admin operations
- `/api/client` - Client management
- `/api/shift` - Shift management

### Real-time Features
- Socket.IO integration for real-time notifications
- Live message updates
- User presence tracking

### Authentication
- JWT-based authentication
- Role-based access control (Admin, Super Admin, Agent)
- Protected routes with middleware

## Getting Started

### Prerequisites
- Node.js 16+ installed
- MongoDB database
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WhatsApp-and-Team-Mgmt
```

2. **Frontend Setup:**
```bash
# Install frontend dependencies
npm install
```

3. **Backend Setup:**
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Create .env file
cp .env.example .env  # (if exists) or create manually
# Add your environment variables:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
```

### Development

**Start Backend Server:**
```bash
cd backend
npm run dev
```

**Start Frontend (in a new terminal):**
```bash
# From root directory
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default)
The backend will run on `http://localhost:5000` (or your configured PORT)

### Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## Development Guidelines

1. **Code Structure**: Follow the existing component structure and naming conventions
2. **Styling**: Use Tailwind CSS classes for styling with internal CSS for complex layouts
3. **State Management**: Utilize React Context for global state, component state for local state
4. **Comments**: All backend integration points are clearly marked with explanatory comments
5. **Responsive Design**: Ensure all components work on mobile, tablet, and desktop screens
6. **Accessibility**: Follow WCAG guidelines for accessible UI components
7. **UI Consistency**: Maintain consistent styling patterns across all pages, especially for buttons, modals, and tables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add appropriate comments for backend integration points
5. Test your changes
6. Submit a pull request

## License

This project is proprietary and intended for internal use only. All rights reserved.