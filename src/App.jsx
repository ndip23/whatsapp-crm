import { Routes, Route, Navigate } from 'react-router-dom' // Added Navigate
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import AdminManagementPage from './pages/AdminManagementPage'
import ShiftManagementPage from './pages/ShiftManagementPage'
import AssignShiftsPage from './pages/AssignShiftsPage'
import ShiftLogPage from './pages/ShiftLogPage'
import ClientListPage from './pages/ClientListPage'
import SolvedConversationsPage from './pages/SolvedConversationsPage'
import PendingConversationsPage from './pages/PendingConversationsPage'
import EscalatedConversationsPage from './pages/EscalatedConversationsPage'
import PermissionsManagementPage from './pages/PermissionsManagementPage'
import RoleManagementPage from './pages/RoleManagementPage'
import ProfilePage from './pages/ProfilePage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import SettingsPage from './pages/SettingsPage'
import PrivacyPage from './pages/PrivacyPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        {/* FIX 1: Handle the root path. If someone lands on "/", send them to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="admin" element={<AdminManagementPage />} />
          <Route path="admin/users" element={<AdminManagementPage />} />
          <Route path="admin/permissions" element={<PermissionsManagementPage />} />
          <Route path="admin/roles" element={<RoleManagementPage />} />
          
          <Route path="shifts">
            <Route index element={<ShiftManagementPage />} />
            <Route path="manage" element={<ShiftManagementPage />} />
            <Route path="assign" element={<AssignShiftsPage />} />
            <Route path="log" element={<ShiftLogPage />} />
          </Route>
          
          <Route path="clients">
            <Route index element={<ClientListPage />} />
            <Route path="list" element={<ClientListPage />} />
            <Route path="solved" element={<SolvedConversationsPage />} />
            <Route path="pending" element={<PendingConversationsPage />} />
            <Route path="escalated" element={<EscalatedConversationsPage />} />
          </Route>

          <Route path="profile" element={<ProfilePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
        </Route>

        {/* FIX 2: Catch-all route. If they type a wrong URL, send them back to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App