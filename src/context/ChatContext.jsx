import { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      client: 'John Doe',
      clientAvatar: null,
      lastMessage: 'Hello, I have a question about my order',
      time: '10:30 AM',
      unread: 2,
      online: true,
      messages: [
        { id: 1, text: 'Hello, I have a question about my order', sender: 'client', timestamp: '10:25 AM' },
        { id: 2, text: 'Sure, how can I help you?', sender: 'agent', timestamp: '10:26 AM' },
        { id: 3, text: 'I want to know the status of my order #12345', sender: 'client', timestamp: '10:28 AM' },
        { id: 4, text: 'Let me check that for you...', sender: 'agent', timestamp: '10:30 AM' }
      ]
    },
    {
      id: 2,
      client: 'Jane Smith',
      clientAvatar: null,
      lastMessage: 'Thanks for your help!',
      time: '9:15 AM',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: 'Hi there!', sender: 'client', timestamp: '9:00 AM' },
        { id: 2, text: 'Hello! How can I assist you today?', sender: 'agent', timestamp: '9:02 AM' },
        { id: 3, text: 'I just wanted to say thanks for resolving my issue', sender: 'client', timestamp: '9:15 AM' }
      ]
    },
    {
      id: 3,
      client: 'Bob Johnson',
      clientAvatar: null,
      lastMessage: 'Can you send me the quote?',
      time: 'Yesterday',
      unread: 1,
      online: false,
      messages: [
        { id: 1, text: 'Hello, I\'m interested in your services', sender: 'client', timestamp: 'Yesterday, 4:30 PM' },
        { id: 2, text: 'Hi Bob! Thanks for reaching out. How can I help?', sender: 'agent', timestamp: 'Yesterday, 4:32 PM' },
        { id: 3, text: 'Can you send me a quote for your premium package?', sender: 'client', timestamp: 'Yesterday, 4:45 PM' }
      ]
    },
    {
      id: 4,
      client: 'Alice Williams',
      clientAvatar: null,
      lastMessage: 'I need help with my account settings',
      time: '8:45 AM',
      unread: 3,
      online: true,
      messages: [
        { id: 1, text: 'Hi support team', sender: 'client', timestamp: '8:30 AM' },
        { id: 2, text: 'Hello Alice! How can I assist you today?', sender: 'agent', timestamp: '8:32 AM' },
        { id: 3, text: 'I\'m having trouble accessing my account settings', sender: 'client', timestamp: '8:45 AM' }
      ]
    },
    {
      id: 5,
      client: 'Michael Brown',
      clientAvatar: null,
      lastMessage: 'When will my order be delivered?',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: 'Hello, I placed an order last week', sender: 'client', timestamp: 'Yesterday, 2:15 PM' },
        { id: 2, text: 'Hi Michael! Let me check the status of your order.', sender: 'agent', timestamp: 'Yesterday, 2:17 PM' },
        { id: 3, text: 'It should arrive by Friday according to our tracking system', sender: 'agent', timestamp: 'Yesterday, 2:20 PM' },
        { id: 4, text: 'Great, thank you for the update!', sender: 'client', timestamp: 'Yesterday, 2:25 PM' }
      ]
    },
    {
      id: 6,
      client: 'Sarah Davis',
      clientAvatar: null,
      lastMessage: 'I have a question about pricing',
      time: '11:20 AM',
      unread: 1,
      online: true,
      messages: [
        { id: 1, text: 'Hi there, I\'m interested in your services', sender: 'client', timestamp: '11:15 AM' },
        { id: 2, text: 'Hello Sarah! I\'d be happy to help with pricing information.', sender: 'agent', timestamp: '11:17 AM' },
        { id: 3, text: 'I have a question about your pricing structure', sender: 'client', timestamp: '11:20 AM' }
      ]
    },
    {
      id: 7,
      client: 'David Wilson',
      clientAvatar: null,
      lastMessage: 'Thank you for the quick response',
      time: 'Yesterday',
      unread: 0,
      online: false,
      messages: [
        { id: 1, text: 'I had an issue with my account', sender: 'client', timestamp: 'Yesterday, 10:30 AM' },
        { id: 2, text: 'Hi David, I understand you had an account issue. How can I help?', sender: 'agent', timestamp: 'Yesterday, 10:32 AM' },
        { id: 3, text: 'I was unable to login to my account this morning', sender: 'client', timestamp: 'Yesterday, 10:35 AM' },
        { id: 4, text: 'Thank you for the quick response and solution!', sender: 'client', timestamp: 'Yesterday, 11:00 AM' }
      ]
    }
  ])

  const [activeConversation, setActiveConversation] = useState(conversations[0])

  const sendMessage = (conversationId, messageText) => {
    setConversations(prevConversations => 
      prevConversations.map(conversation => {
        if (conversation.id === conversationId) {
          const newMessage = {
            id: conversation.messages.length + 1,
            text: messageText,
            sender: 'agent',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            lastMessage: messageText,
            unread: 0
          }
        }
        return conversation
      })
    )

    // Update active conversation if it's the one we're sending to
    if (activeConversation.id === conversationId) {
      setActiveConversation(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: prev.messages.length + 1,
            text: messageText,
            sender: 'agent',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ],
        lastMessage: messageText
      }))
    }
  }

  const selectConversation = (conversation) => {
    setActiveConversation(conversation)
    
    // Mark conversation as read
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unread: 0 } 
          : conv
      )
    )
  }

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      sendMessage,
      selectConversation
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}