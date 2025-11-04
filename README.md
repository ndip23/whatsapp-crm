# WhatsApp Centralized Dashboard System

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Implemented Features](#implemented-features)
3. [Pending Features](#pending-features)
4. [Project Structure](#project-structure)
5. [Backend Integration Notes](#backend-integration-notes)
6. [Getting Started](#getting-started)

## Tech Stack

This application is built using modern web technologies:

- **Frontend Framework**: React.js 19+
- **Build Tool**: Vite
- **Routing**: React Router DOM 7+
- **State Management**: React Context API
- **UI Components**: Lucide React (Icons)
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Styling**: Tailwind CSS
- **Development Tools**: ESLint, PostCSS, Autoprefixer

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
w_central_system/
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/             # React Context providers
│   ├── layouts/             # Page layouts and structures
│   ├── pages/               # Individual page components
│   ├── utils/               # Utility functions and helpers
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   ├── index.css           # Global styles
│   └── App.css             # Application-specific styles
├── public/                 # Static assets
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## Backend Integration Notes

All frontend components have been implemented with clear comments indicating where backend integration should occur. These comments follow the pattern:

```javascript
// In a real app, you would [specific action]
```

Examples of backend integration points include:

1. **Authentication**: Login, password reset, session management
2. **Data Operations**: CRUD operations for users, roles, permissions, clients
3. **Chat System**: Real-time messaging, message history, online status
4. **File Handling**: Avatar uploads, document attachments
5. **Notifications**: Push notifications, email sending
6. **Analytics**: Data collection, report generation

Each component is designed to be easily connected to backend services through:
- API calls for data fetching and updating
- WebSocket connections for real-time features
- Authentication tokens for secure access
- Error handling for network issues

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation
1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd w_central_system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Development
Start the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```

### Building for Production
Create a production build:
```bash
npm run build
```
or
```bash
yarn build
```

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```
or
```bash
yarn preview
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