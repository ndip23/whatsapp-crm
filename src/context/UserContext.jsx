import { createContext, useContext, useState, useEffect } from 'react'

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

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New chat assigned',
      timestamp: '2 minutes ago',
      unread: true,
      type: 'chat'
    },
    {
      id: 2,
      title: 'Message received from John Doe',
      timestamp: '15 minutes ago',
      unread: true,
      type: 'message'
    },
    {
      id: 3,
      title: 'Follow-up reminder due',
      timestamp: '1 hour ago',
      unread: false,
      type: 'reminder'
    }
  ])

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, unread: false } 
        : notification
    ))
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

  return (
    <UserContext.Provider value={{
      currentUser,
      setCurrentUser: updateUser,
      notifications,
      markNotificationAsRead,
      addNotification
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