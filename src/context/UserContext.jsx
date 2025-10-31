import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Admin User',
    role: 'admin',
    avatar: null
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

  return (
    <UserContext.Provider value={{
      currentUser,
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