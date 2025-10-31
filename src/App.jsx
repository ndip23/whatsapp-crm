import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import AdminManagementPage from './pages/AdminManagementPage'
import ShiftManagementPage from './pages/ShiftManagementPage'
import ClientManagementPage from './pages/ClientManagementPage'
import MonitoringReportingPage from './pages/MonitoringReportingPage'
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
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="admin" element={<AdminManagementPage />} />
          <Route path="admin/users" element={<AdminManagementPage />} />
          <Route path="admin/permissions" element={<PermissionsManagementPage />} />
          <Route path="admin/roles" element={<RoleManagementPage />} />
          <Route path="shifts" element={<ShiftManagementPage />} />
          <Route path="clients" element={<ClientManagementPage />} />
          <Route path="monitoring" element={<MonitoringReportingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App