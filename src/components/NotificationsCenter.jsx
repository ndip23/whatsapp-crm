import { useUser } from '../context/UserContext'
import { X } from 'lucide-react'

const NotificationsCenter = ({ onClose }) => {
  const { notifications, markNotificationAsRead } = useUser()

  const styles = {
    container: {
      width: '20rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb'
    },
    header: {
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827'
    },
    closeButton: {
      color: '#9ca3af',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    closeButtonHover: {
      color: '#6b7280'
    },
    notificationsList: {
      maxHeight: '24rem',
      overflowY: 'auto'
    },
    notificationItem: {
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb'
    },
    notificationItemUnread: {
      backgroundColor: '#dbeafe'
    },
    notificationHeader: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    notificationTitle: {
      fontWeight: '500',
      color: '#111827'
    },
    notificationBadge: {
      height: '0.5rem',
      width: '0.5rem',
      borderRadius: '9999px',
      backgroundColor: '#10b981'
    },
    notificationTime: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginTop: '0.25rem'
    },
    markAsReadButton: {
      marginTop: '0.5rem',
      fontSize: '0.75rem',
      color: '#10b981',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    markAsReadButtonHover: {
      color: '#065f46'
    },
    footer: {
      padding: '1rem',
      textAlign: 'center'
    },
    viewAllButton: {
      fontSize: '0.875rem',
      color: '#10b981',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    viewAllButtonHover: {
      color: '#065f46'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Notifications</h3>
        <button 
          onClick={onClose} 
          style={styles.closeButton}
          onMouseEnter={(e) => e.target.style.color = styles.closeButtonHover.color}
          onMouseLeave={(e) => e.target.style.color = styles.closeButton.color}
        >
          <X style={{ height: '1.25rem', width: '1.25rem' }} />
        </button>
      </div>
      <div style={styles.notificationsList}>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              ...styles.notificationItem,
              ...(notification.unread ? styles.notificationItemUnread : {})
            }}
          >
            <div style={styles.notificationHeader}>
              <h4 style={styles.notificationTitle}>{notification.title}</h4>
              {notification.unread && (
                <span style={styles.notificationBadge}></span>
              )}
            </div>
            <p style={styles.notificationTime}>{notification.timestamp}</p>
            <div style={{ marginTop: '0.5rem' }}>
              <button 
                onClick={() => markNotificationAsRead(notification.id)}
                style={styles.markAsReadButton}
                onMouseEnter={(e) => e.target.style.color = styles.markAsReadButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.markAsReadButton.color}
              >
                Mark as read
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.footer}>
        <button 
          style={styles.viewAllButton}
          onMouseEnter={(e) => e.target.style.color = styles.viewAllButtonHover.color}
          onMouseLeave={(e) => e.target.style.color = styles.viewAllButton.color}
        >
          View all notifications
        </button>
      </div>
    </div>
  )
}

export default NotificationsCenter