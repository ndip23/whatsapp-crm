import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { 
  Bell, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageCircle, 
  BarChart2, 
  ChevronDown, 
  ChevronRight,
  Home,
  Shield,
  Clock,
  UserCircle,
  FileText,
  Settings,
  TrendingUp,
  Eye,
  Key,
  UserCheck
} from 'lucide-react'
import NotificationsCenter from '../components/NotificationsCenter'
import { useUser } from '../context/UserContext'

const DashboardLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({
    admin: true,
    clients: true
  })
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const { currentUser, notifications } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    // In a real app, you would clear user session
    navigate('/')
  }

  // Toggle expanded menu
  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }))
  }

  // Determine active navigation item based on current route
  const getActiveNav = () => {
    if (location.pathname.includes('/dashboard/admin')) return 'admin'
    if (location.pathname.includes('/dashboard/shifts')) return 'shifts'
    if (location.pathname.includes('/dashboard/clients')) return 'clients'
    if (location.pathname.includes('/dashboard/monitoring')) return 'monitoring'
    return 'dashboard'
  }

  const activeNav = getActiveNav()

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '1rem',
      // Custom scrollbar styling
      scrollbarWidth: 'thin',
      scrollbarColor: '#10b981 #e5e7eb'
    },
    sidebar: {
      width: '16rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      margin: '0 0 0 0.5rem', // Remove top margin, keep right margin
      height: 'calc(100vh - 2rem)',
      display: 'flex',
      flexDirection: 'column'
    },
    sidebarHeader: {
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo: {
      height: '2.5rem',
      width: '2.5rem',
      color: '#10b981'
    },
    logoContainer: {
      height: '3rem',
      width: '3rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    nav: {
      marginTop: '1.25rem',
      flex: '1',
      overflowY: 'auto'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    navItemActive: {
      backgroundColor: '#ecfdf5',
      color: '#10b981'
    },
    navItemInactive: {
      color: '#374151'
    },
    navItemHover: {
      backgroundColor: '#f0fdf4',
      color: '#10b981'
    },
    navItemWithSubmenu: {
      justifyContent: 'space-between'
    },
    submenu: {
      paddingLeft: '2rem'
    },
    submenuItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '400',
      textDecoration: 'none',
      color: '#6b7280'
    },
    submenuItemActive: {
      color: '#10b981',
      backgroundColor: '#f0fdf4'
    },
    submenuItemHover: {
      backgroundColor: '#f9fafb',
      color: '#10b981'
    },
    main: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      marginLeft: '1rem',
      borderRadius: '0.75rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      borderRadius: '0.75rem 0.75rem 0 0'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 1.5rem'
    },
    headerTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    notificationButton: {
      position: 'relative',
      padding: '0.25rem',
      color: '#6b7280',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    notificationButtonHover: {
      color: '#111827'
    },
    notificationBadge: {
      position: 'absolute',
      top: '0',
      right: '0',
      display: 'block',
      height: '0.5rem',
      width: '0.5rem',
      borderRadius: '9999px',
      backgroundColor: '#f87171'
    },
    userContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    userAvatar: {
      height: '2rem',
      width: '2rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    userAvatarIcon: {
      height: '1.25rem',
      width: '1.25rem',
      color: '#10b981'
    },
    userName: {
      marginLeft: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      cursor: 'pointer'
    },
    userDropdown: {
      position: 'absolute',
      top: '2.5rem',
      right: '0',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      minWidth: '12rem',
      zIndex: '50',
      border: '1px solid #e5e7eb'
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    dropdownItemHover: {
      backgroundColor: '#f9fafb'
    },
    dropdownIcon: {
      height: '1rem',
      width: '1rem',
      marginRight: '0.75rem'
    },
    divider: {
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '0.25rem 0'
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    logoutButtonHover: {
      color: '#111827'
    },
    logoutIcon: {
      height: '1rem',
      width: '1rem',
      marginRight: '0.25rem'
    },
    notificationCenter: {
      position: 'absolute',
      top: '4rem',
      right: '1rem', // Add margin from the right
      zIndex: '10'
    },
    content: {
      flex: '1',
      overflowY: 'auto',
      padding: '1.5rem',
      backgroundColor: '#f9fafb'
    },
    icon: {
      marginRight: '0.75rem',
      height: '1.25rem',
      width: '1.25rem'
    },
    expandIcon: {
      height: '1.25rem',
      width: '1.25rem'
    },
    conversationsList: {
      flex: '1',
      overflowY: 'auto',
      // Custom scrollbar styling
      scrollbarWidth: 'thin',
      scrollbarColor: '#10b981 #e5e7eb'
    },
    clientInfoPanel: {
      width: '25%',
      borderLeft: '1px solid #e5e7eb',
      padding: '1rem',
      backgroundColor: '#ffffff',
      overflowY: 'auto',
      // Custom scrollbar styling
      scrollbarWidth: 'thin',
      scrollbarColor: '#10b981 #e5e7eb'
    },
    messagesContainer: {
      flex: '1',
      overflowY: 'auto',
      padding: '1rem',
      backgroundColor: '#f0f9ff',
      // Custom scrollbar styling
      scrollbarWidth: 'thin',
      scrollbarColor: '#10b981 #e5e7eb'
    },
    messageItem: {
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      maxWidth: '80%'
    },
    messageContent: {
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      backgroundColor: '#e2f4f9',
      color: '#111827',
      fontSize: '0.875rem',
      lineHeight: '1.25rem'
    },
    messageUserInfo: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#6b7280',
      marginBottom: '0.25rem'
    },
    messageTime: {
      fontSize: '0.625rem',
      fontWeight: '400',
      color: '#6b7280'
    },
    messageInput: {
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      width: '100%',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      backgroundColor: '#ffffff',
      color: '#111827'
    },
    sendButton: {
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      backgroundColor: '#10b981',
      border: 'none',
      color: '#ffffff',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      marginLeft: '0.5rem'
    },
    sendButtonHover: {
      backgroundColor: '#059669'
    }
  }

  // Theme styles
  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#374151'
    },
    dark: {
      backgroundColor: '#1f2937',
      color: '#f9fafb'
    }
  }

  // Add custom scrollbar styles
  const scrollbarStyles = `
    /* Webkit browsers (Chrome, Safari) */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 3px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #a7f3d0;
      border-radius: 3px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #6ee7b7;
    }
    
    /* Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: #a7f3d0 #f3f4f6;
    }
  `

  return (
    <div style={styles.container}>
      <style>{scrollbarStyles}</style>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoContainer}>
            <MessageCircle style={styles.logo} />
          </div>
        </div>
        <nav style={styles.nav}>
          <a
            href="/dashboard"
            style={{
              ...styles.navItem,
              ...(activeNav === 'dashboard' ? styles.navItemActive : styles.navItemInactive)
            }}
            onMouseEnter={(e) => {
              if (activeNav !== 'dashboard') {
                e.target.style.backgroundColor = styles.navItemHover.backgroundColor;
                e.target.style.color = styles.navItemHover.color;
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== 'dashboard') {
                e.target.style.backgroundColor = '';
                e.target.style.color = styles.navItemInactive.color;
              }
            }}
          >
            <Home style={styles.icon} />
            <span>Dashboard</span>
          </a>
          
          <div
            style={{
              ...styles.navItem,
              ...styles.navItemWithSubmenu,
              ...(activeNav === 'admin' ? styles.navItemActive : styles.navItemInactive)
            }}
            onClick={() => toggleMenu('admin')}
            onMouseEnter={(e) => {
              if (activeNav !== 'admin') {
                e.target.style.backgroundColor = styles.navItemHover.backgroundColor;
                e.target.style.color = styles.navItemHover.color;
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== 'admin') {
                e.target.style.backgroundColor = '';
                e.target.style.color = styles.navItemInactive.color;
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Shield style={styles.icon} />
              <span>Admin Management</span>
            </div>
            {expandedMenus.admin ? 
              <ChevronDown style={styles.expandIcon} /> : 
              <ChevronRight style={styles.expandIcon} />
            }
          </div>
          
          {expandedMenus.admin && (
            <div style={styles.submenu}>
              <a
                href="/dashboard/admin"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/admin' || location.pathname === '/dashboard/admin/users' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/admin' && location.pathname !== '/dashboard/admin/users') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/admin' && location.pathname !== '/dashboard/admin/users') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <User style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Users</span>
              </a>
              <a
                href="/dashboard/admin/roles"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/admin/roles' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/admin/roles') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/admin/roles') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <Shield style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Roles</span>
              </a>
              <a
                href="/dashboard/admin/permissions"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/admin/permissions' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/admin/permissions') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/admin/permissions') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <Settings style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Permissions</span>
              </a>
            </div>
          )}
          
          <a
            href="/dashboard/shifts"
            style={{
              ...styles.navItem,
              ...(activeNav === 'shifts' ? styles.navItemActive : styles.navItemInactive)
            }}
            onMouseEnter={(e) => {
              if (activeNav !== 'shifts') {
                e.target.style.backgroundColor = styles.navItemHover.backgroundColor;
                e.target.style.color = styles.navItemHover.color;
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== 'shifts') {
                e.target.style.backgroundColor = '';
                e.target.style.color = styles.navItemInactive.color;
              }
            }}
          >
            <Clock style={styles.icon} />
            <span>Shift Management</span>
          </a>
          
          <div
            style={{
              ...styles.navItem,
              ...styles.navItemWithSubmenu,
              ...(activeNav === 'clients' ? styles.navItemActive : styles.navItemInactive)
            }}
            onClick={() => toggleMenu('clients')}
            onMouseEnter={(e) => {
              if (activeNav !== 'clients') {
                e.target.style.backgroundColor = styles.navItemHover.backgroundColor;
                e.target.style.color = styles.navItemHover.color;
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== 'clients') {
                e.target.style.backgroundColor = '';
                e.target.style.color = styles.navItemInactive.color;
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <UserCircle style={styles.icon} />
              <span>Client Management</span>
            </div>
            {expandedMenus.clients ? 
              <ChevronDown style={styles.expandIcon} /> : 
              <ChevronRight style={styles.expandIcon} />
            }
          </div>
          
          {expandedMenus.clients && (
            <div style={styles.submenu}>
              <a
                href="/dashboard/clients/list"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/clients/list' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/clients/list') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/clients/list') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <Users style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Client List</span>
              </a>
              <a
                href="/dashboard/clients/groups"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/clients/groups' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/clients/groups') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/clients/groups') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <UserCircle style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Client Groups</span>
              </a>
              <a
                href="/dashboard/clients/templates"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/clients/templates' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/clients/templates') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/clients/templates') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <FileText style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Message Templates</span>
              </a>
            </div>
          )}
          
          <a
            href="/dashboard/monitoring"
            style={{
              ...styles.navItem,
              ...(activeNav === 'monitoring' ? styles.navItemActive : styles.navItemInactive)
            }}
            onMouseEnter={(e) => {
              if (activeNav !== 'monitoring') {
                e.target.style.backgroundColor = styles.navItemHover.backgroundColor;
                e.target.style.color = styles.navItemHover.color;
              }
            }}
            onMouseLeave={(e) => {
              if (activeNav !== 'monitoring') {
                e.target.style.backgroundColor = '';
                e.target.style.color = styles.navItemInactive.color;
              }
            }}
          >
            <TrendingUp style={styles.icon} />
            <span>Monitoring & Reporting</span>
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div style={styles.main}>
        {/* Top navigation */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerTitle}>
              {location.pathname.includes('/dashboard/admin') ? 'Staff Management' : 
               location.pathname.includes('/dashboard/shifts') ? 'Shift Management' : 
               location.pathname.includes('/dashboard/clients') ? 'Client Management' : 
               location.pathname.includes('/dashboard/monitoring') ? 'Monitoring & Reporting' : 'Dashboard'}
            </div>
            <div style={styles.headerActions}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                style={styles.notificationButton}
                onMouseEnter={(e) => e.target.style.color = styles.notificationButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.notificationButton.color}
              >
                <Bell style={{ height: '1.5rem', width: '1.5rem' }} />
                {notifications.some(n => n.unread) && (
                  <span style={styles.notificationBadge}></span>
                )}
              </button>
              <div 
                style={styles.userContainer}
                onMouseEnter={() => setShowUserDropdown(true)}
              >
                <div 
                  style={styles.userAvatar}
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <User style={styles.userAvatarIcon} />
                </div>
                <span 
                  style={styles.userName}
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  {currentUser.name}
                </span>
                
                {showUserDropdown && (
                  <div 
                    style={styles.userDropdown}
                    onMouseLeave={() => setShowUserDropdown(false)}
                  >
                    <div
                      style={styles.dropdownItem}
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                      onClick={() => {
                        navigate('/dashboard/profile')
                        setShowUserDropdown(false)
                      }}
                    >
                      <UserCheck style={styles.dropdownIcon} />
                      View Profile
                    </div>
                    <div
                      style={styles.dropdownItem}
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                      onClick={() => {
                        navigate('/dashboard/change-password')
                        setShowUserDropdown(false)
                      }}
                    >
                      <Key style={styles.dropdownIcon} />
                      Change Password
                    </div>
                    <div style={styles.divider}></div>
                    <div
                      style={styles.dropdownItem}
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                      onClick={() => {
                        navigate('/dashboard/settings')
                        setShowUserDropdown(false)
                      }}
                    >
                      <Settings style={styles.dropdownIcon} />
                      Settings
                    </div>
                    <div
                      style={styles.dropdownItem}
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                      onClick={() => {
                        navigate('/dashboard/privacy')
                        setShowUserDropdown(false)
                      }}
                    >
                      <Eye style={styles.dropdownIcon} />
                      Privacy
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
                onMouseEnter={(e) => e.target.style.color = styles.logoutButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.logoutButton.color}
              >
                <LogOut style={styles.logoutIcon} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Notification Center */}
        {showNotifications && (
          <div style={styles.notificationCenter}>
            <NotificationsCenter onClose={() => setShowNotifications(false)} />
          </div>
        )}

        {/* Page content */}
        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout