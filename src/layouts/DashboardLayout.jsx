import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { 
  Bell, 
  User, 
  LogOut, 

  Users, 

  MessageCircle, 

  ChevronDown, 
  ChevronRight,
  Home,
  Shield,
  Clock,
  UserCircle,
  FileText,
  Settings,

  Eye,
  Key,
  UserCheck,
  CheckCircle,

  Menu,
  X
} from 'lucide-react'
import NotificationsCenter from '../components/NotificationsCenter'
import { useUser } from '../context/UserContext'

const DashboardLayout = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({
    admin: true,
    clients: true,
    shifts: true
  })
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const { currentUser, notifications } = useUser()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    // In a real app, you would clear user session
    navigate('/')
  }

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      // Close sidebar when window is resized to larger than 1188px
      if (window.innerWidth >= 1188 && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarOpen])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.mobile-sidebar')
      const menuButton = document.querySelector('.mobile-menu-button')
      
      if (windowWidth < 1188 && isSidebarOpen && sidebar && !sidebar.contains(event.target) && 
          menuButton && !menuButton.contains(event.target)) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSidebarOpen, windowWidth])

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
    
    /* Smooth glide transition for mobile sidebar */
    .mobile-sidebar {
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .mobile-sidebar.open {
      transform: translateX(0);
    }
    
    @media (max-width: 1187px) {
      .mobile-sidebar {
        transform: translateX(-100%);
      }
      
      .mobile-sidebar.open {
        transform: translateX(0);
      }
    }
  `

  return (
    <div style={styles.container}>
      <style>{scrollbarStyles}</style>
      
      {/* Sidebar overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          display: isSidebarOpen ? 'block' : 'none',
          opacity: isSidebarOpen ? 1 : 0,
          transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      ></div>
      
      {/* Sidebar - hide completely on large screens unless toggled */}
      <div 
        className={`mobile-sidebar ${isSidebarOpen ? 'open' : ''}`}
        style={{
          ...styles.sidebar,
          position: windowWidth >= 1188 ? 'relative' : 'fixed',
          top: windowWidth >= 1188 ? '0' : '1rem',
          left: windowWidth >= 1188 ? '0' : '1rem',
          height: windowWidth >= 1188 ? 'calc(100vh - 2rem)' : 'calc(100vh - 2rem)',
          width: '16rem',
          zIndex: 1000,
          transform: windowWidth >= 1188 ? 'translateX(0)' : (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'),
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          margin: windowWidth >= 1188 ? '0 0 0 0.5rem' : '0',
          borderRadius: '0.75rem',
          display: windowWidth >= 1188 ? 'flex' : (isSidebarOpen ? 'flex' : 'none')
        }}
      >
        {/* Close button for mobile sidebar - only show on small screens */}
        {windowWidth < 1188 && (
          <div style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            zIndex: 1001,
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '0.25rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out'
          }} onClick={toggleSidebar}>
            <X style={{ height: '1.25rem', width: '1.25rem', color: '#374151' }} />
          </div>
        )}
        
        <div style={styles.sidebarHeader}>
          <div style={styles.logoContainer}>
            <MessageCircle style={styles.logo} />
          </div>
        </div>
        <nav style={styles.nav}>
          <Link
            to="/dashboard"
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
          </Link>
          
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
              <Link
                to="/dashboard/admin"
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
              </Link>
              <Link
                to="/dashboard/admin/roles"
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
              </Link>
              <Link
                to="/dashboard/admin/permissions"
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
              </Link>
            </div>
          )}
          
          <div
            style={{
              ...styles.navItem,
              ...styles.navItemWithSubmenu,
              ...(activeNav === 'shifts' ? styles.navItemActive : styles.navItemInactive)
            }}
            onClick={() => toggleMenu('shifts')}
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Clock style={styles.icon} />
              <span>Shift Management</span>
            </div>
            {expandedMenus.shifts ? 
              <ChevronDown style={styles.expandIcon} /> : 
              <ChevronRight style={styles.expandIcon} />
            }
          </div>
          
          {expandedMenus.shifts && (
            <div style={styles.submenu}>
              <Link
                to="/dashboard/shifts/manage"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/shifts/manage' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/shifts/manage') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/shifts/manage') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <Clock style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Manage Shifts</span>
              </Link>
              <Link
                to="/dashboard/shifts/assign"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/shifts/assign' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/shifts/assign') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/shifts/assign') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <User style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Assign Shifts</span>
              </Link>
              <Link
                to="/dashboard/shifts/log"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/shifts/log' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/shifts/log') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/shifts/log') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <FileText style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Shift Log</span>
              </Link>
            </div>
          )}
        
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
              <Link
                to="/dashboard/clients/list"
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
              </Link>
              <Link
                to="/dashboard/clients/solved"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/clients/solved' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/clients/solved') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/clients/solved') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <CheckCircle style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Solved Conversations</span>
              </Link>
              <Link
                to="/dashboard/clients/pending"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/clients/pending' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/clients/pending') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/clients/pending') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <Clock style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Pending Conversations</span>
              </Link>
              <Link
                to="/dashboard/clients/escalated"
                style={{
                  ...styles.submenuItem,
                  ...(location.pathname === '/dashboard/clients/escalated' ? styles.submenuItemActive : {})
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/dashboard/clients/escalated') {
                    e.target.style.backgroundColor = styles.submenuItemHover.backgroundColor;
                    e.target.style.color = styles.submenuItemHover.color;
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/dashboard/clients/escalated') {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = styles.submenuItem.color;
                  }
                }}
              >
                <LinklertCircle style={{ ...styles.icon, marginRight: '0.5rem' }} />
                <span>Escalated Conversations</span>
              </Link>
            </div>
          )}
          
        </nav>
      </div>

      {/* Main content */}
      <div style={{...styles.main, marginLeft: windowWidth >= 1188 ? '1rem' : '0'}}>
        {/* Top navigation */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Menu button only shown on small screens */}
              {windowWidth < 1188 && (
                <button 
                  className="mobile-menu-button"
                  style={{
                    marginRight: '1rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 5.2s ease-in-out'
                  }}
                  onClick={toggleSidebar}
                >
                  <Menu style={{ height: '1.5rem', width: '1.5rem', color: '#374151' }} />
                </button>
              )}
              <h1 style={styles.headerTitle}>W-CS</h1>
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
                  className="user-name-mobile"
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
                <LogOut style={{...styles.logoutIcon, ...{ marginLeft: 0 }}} />
                <span className="logout-label-mobile" style={{ marginLeft: '0.25rem' }}>
                  Logout
                </span>
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