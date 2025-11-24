import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getNotifications, markNotificationAsRead as markReadAPI } from '../services/notificationService'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  // Load user from localStorage on mount
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch (e) {
        return null
      }
    }
    return null
  })

  const [notifications, setNotifications] = useState([])
  const [loadingNotifications, setLoadingNotifications] = useState(false)

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!currentUser) return

    try {
      setLoadingNotifications(true)
      const data = await getNotifications()
      // Transform API response to match component expectations
      const transformed = Array.isArray(data) ? data.map(notif => ({
        id: notif._id || notif.id,
        title: notif.message || notif.type,
        timestamp: notif.createdAt ? new Date(notif.createdAt).toLocaleString() : 'Recently',
        unread: !notif.isRead,
        type: notif.type,
        metadata: notif.metadata
      })) : []
      setNotifications(transformed)
    } catch (error) {
      console.error('Error fetching notifications:', error)
      // Keep empty array on error
      setNotifications([])
    } finally {
      setLoadingNotifications(false)
    }
  }, [currentUser])

  const markNotificationAsRead = async (id) => {
    try {
      await markReadAPI(id)
      // Update local state
      setNotifications(notifications.map(notification =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      ))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const addNotification = (notification) => {
    setNotifications([notification, ...notifications])
  }

  const updateUser = (userData) => {
    setCurrentUser(userData)
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }

  // Sync user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setCurrentUser(user)
      } catch (e) {
        console.error('Error parsing user from localStorage:', e)
      }
    }
  }, [])

  // Fetch notifications when user is available
  useEffect(() => {
    if (currentUser) {
      fetchNotifications()
      // Set up polling to refresh notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000)
      return () => clearInterval(interval)
    }
  }, [currentUser, fetchNotifications])

  return (
    <UserContext.Provider value={{
      currentUser,
      setCurrentUser: updateUser,
      notifications,
      loadingNotifications,
      markNotificationAsRead,
      addNotification,
      refreshNotifications: fetchNotifications
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}