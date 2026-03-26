import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardLayout from './layouts/DashboardLayout'
// ... import all other pages ...

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Main entry points */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Protected Dashboard Routes */}
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

        {/* Catch-all for 404s */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App