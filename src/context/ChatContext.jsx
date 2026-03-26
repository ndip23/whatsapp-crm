import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { io } from 'socket.io-client' // 1. Import Socket.io
import { getConversations, getSingleConversation } from '../services/conversationService'
import { apiClient } from '../lib/axios'
import { showToast } from '../utils/toast'

const ChatContext = createContext()

// Determine the socket URL (Local vs Production)
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([])
  const [activeConversation, setActiveConversation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [socket, setSocket] = useState(null)

  // --- 1. INITIALIZE SOCKET CONNECTION ---
  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true
    })

    setSocket(newSocket)

    // Cleanup on logout/close
    return () => newSocket.close()
  }, [])

  // --- 2. LISTEN FOR LIVE MESSAGES ---
  useEffect(() => {
    if (!socket) return

    // Listen for the 'new_message' event (matching your backend socketManager)
    socket.on('new_message', (data) => {
      const { conversationId, message } = data

      // Update the main list snippet (last message)
      setConversations(prev => prev.map(c => 
        c._id === conversationId 
          ? { ...c, lastMessage: message.content, lastMessageAt: message.createdAt } 
          : c
      ))

      // If we are currently chatting with this person, add the message to the screen
      setActiveConversation(prev => {
        if (prev && prev._id === conversationId) {
          return {
            ...prev,
            messages: [...(prev.messages || []), message]
          }
        }
        return prev
      })

      // Notify the agent
      if (message.senderType === 'client') {
        showToast(`New message from client!`, 'success')
      }
    })

    return () => socket.off('new_message')
  }, [socket])

  // --- 3. FETCH DATA ---
  const fetchConversations = useCallback(async () => {
    try {
      const data = await getConversations()
      setConversations(data.conversations || [])
    } catch (error) {
      console.error('Failed to sync conversations:', error)
    }
  }, [])

  useEffect(() => { fetchConversations() }, [fetchConversations])

  const selectConversation = async (conversation) => {
    try {
      setLoading(true)
      const data = await getSingleConversation(conversation._id)
      setActiveConversation(data.conversation)
      
      // Mark as read locally
      setConversations(prev => 
        prev.map(c => c._id === conversation._id ? { ...c, unread: 0 } : c)
      )
    } catch (error) {
      showToast('Could not load chat history', 'error')
    } finally {
      setLoading(false)
    }
  }

  // --- 4. SEND MESSAGE ---
  const sendMessage = async (conversationId, messageText) => {
    if (!messageText.trim()) return

    // Optimistic Update
    const optimisticMsg = {
      _id: Date.now(),
      content: messageText,
      senderType: 'agent',
      createdAt: new Date().toISOString()
    }

    setActiveConversation(prev => ({
      ...prev,
      messages: [...(prev.messages || []), optimisticMsg]
    }))

    try {
      await apiClient.post('/api/whatsapp/send', {
        conversationId,
        message: messageText
      })
      // We don't need to manually refresh; the socket will send the confirmation!
    } catch (error) {
      showToast('Message failed', 'error')
    }
  }

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      loading,
      sendMessage,
      selectConversation,
      refreshConversations: fetchConversations
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)