import { useState } from 'react'
import { useChat } from '../context/ChatContext'
import { Search, Paperclip, Send, MessageCircle, Clock, User, CheckCircle, Maximize2, X, PieChart, Menu, Info, MessageSquare } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'
import ResponsiveTable from '../components/ResponsiveTable'

const DashboardPage = () => {
  const { conversations, activeConversation, selectConversation, sendMessage } = useChat()
  const [message, setMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isChatExpanded, setIsChatExpanded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClientInfoOpen, setIsClientInfoOpen] = useState(false)
  const [isAnalyticsExpanded, setIsAnalyticsExpanded] = useState(false)
  const [isAgentPerformanceExpanded, setIsAgentPerformanceExpanded] = useState(false)
  const [conversationStatus, setConversationStatus] = useState('pending')

  // Mock data for monitoring and reporting charts
  const conversationData = [
    { name: 'Mon', conversations: 12 },
    { name: 'Tue', conversations: 19 },
    { name: 'Wed', conversations: 8 },
    { name: 'Thu', conversations: 15 },
    { name: 'Fri', conversations: 11 },
    { name: 'Sat', conversations: 7 },
    { name: 'Sun', conversations: 13 },
  ]

  // Weekly agent performance data
  const weeklyPerformanceData = [
    { name: 'John', mon: 5, tue: 7, wed: 4, thu: 6, fri: 8, sat: 3, sun: 4 },
    { name: 'Jane', mon: 4, tue: 6, wed: 5, thu: 7, fri: 6, sat: 2, sun: 5 },
    { name: 'Bob', mon: 6, tue: 8, wed: 7, thu: 9, fri: 10, sat: 4, sun: 6 },
    { name: 'Alice', mon: 3, tue: 5, wed: 6, thu: 4, fri: 5, sat: 3, sun: 7 },
  ]

  // Detailed agent performance data
  const agentPerformanceData = [
    { 
      name: 'John Doe', 
      totalConversations: 42, 
      solved: 35, 
      unsolved: 5, 
      escalated: 2, 
      responseTime: '2.3 min',
      status: 'Active' 
    },
    { 
      name: 'Jane Smith', 
      totalConversations: 38, 
      solved: 30, 
      unsolved: 6, 
      escalated: 2, 
      responseTime: '3.1 min',
      status: 'Active' 
    },
    { 
      name: 'Bob Johnson', 
      totalConversations: 52, 
      solved: 45, 
      unsolved: 4, 
      escalated: 3, 
      responseTime: '1.8 min',
      status: 'Active' 
    },
    { 
      name: 'Alice Brown', 
      totalConversations: 41, 
      solved: 34, 
      unsolved: 5, 
      escalated: 2, 
      responseTime: '2.7 min',
      status: 'Away' 
    },
  ]

  // Existing agent data
  const agentData = [
    { name: 'John Doe', handled: 24, responseTime: '2.3 min', status: 'Active' },
    { name: 'Jane Smith', handled: 18, responseTime: '3.1 min', status: 'Active' },
    { name: 'Bob Johnson', handled: 32, responseTime: '1.8 min', status: 'Active' },
    { name: 'Alice Brown', handled: 21, responseTime: '2.7 min', status: 'Away' },
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && activeConversation) {
      sendMessage(activeConversation.id, message)
      setMessage('')
    }
  }

  const handleStatusChange = (status) => {
    setConversationStatus(status)
    // In a real app, you would save this status to a backend
    console.log('Conversation status changed to:', status)
  }

  const filteredConversations = conversations.filter(conv => 
    conv.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pieChartData = [
    { name: 'Resolved', value: 65, color: '#10b981' },
    { name: 'Pending', value: 20, color: '#f59e0b' },
    { name: 'Escalated', value: 15, color: '#ef4444' }
  ];

  const styles = {
    page: {
      padding: '0'
    },
    pageTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '1.5rem'
    },
    chatContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      marginBottom: '2rem',
      overflow: 'hidden'
    },
    chatInterface: {
      display: 'flex',
      height: 'calc(100vh - 90px)'
    },
    // Conversations panel
    conversationsPanel: {
      width: '30%',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f9fafb'
    },
    searchContainer: {
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#ffffff'
    },
    searchWrapper: {
      position: 'relative'
    },
    searchIcon: {
      position: 'absolute',
      insetY: '0',
      left: '0',
      paddingLeft: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      height: '100%'
    },
    searchInput: {
      display: 'block',
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '0.75rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      backgroundColor: '#ffffff',
      placeholderColor: '#9ca3af',
      outline: 'none'
    },
    searchInputFocus: {
      borderColor: '#10b981',
      ring: '1px solid #10b981'
    },
    conversationsList: {
      flex: '1',
      overflowY: 'auto'
    },
    conversationItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      cursor: 'pointer',
      backgroundColor: '#ffffff',
      transition: 'background-color 0.2s ease'
    },
    conversationItemHover: {
      backgroundColor: '#f0fdf4'
    },
    conversationItemActive: {
      backgroundColor: '#ecfdf5',
      borderLeft: '3px solid #10b981'
    },
    avatarContainer: {
      flexShrink: '0'
    },
    avatar: {
      height: '3rem',
      width: '3rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    avatarText: {
      color: '#065f46',
      fontWeight: '600'
    },
    conversationDetails: {
      marginLeft: '1rem',
      flex: '1',
      minWidth: '0'
    },
    conversationHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    clientName: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#111827',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    time: {
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    conversationFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '0.25rem'
    },
    lastMessage: {
      fontSize: '0.875rem',
      color: '#6b7280',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      flex: '1'
    },
    unreadBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '1.25rem',
      width: '1.25rem',
      borderRadius: '9999px',
      backgroundColor: '#10b981',
      color: '#ffffff',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    // Chat panel
    chatPanel: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f9ff'
    },
    chatHeader: {
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#ffffff'
    },
    chatHeaderContent: {
      display: 'flex',
      alignItems: 'center'
    },
    chatAvatar: {
      flexShrink: '0'
    },
    chatAvatarInner: {
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    chatAvatarText: {
      color: '#065f46',
      fontWeight: '600'
    },
    clientInfo: {
      marginLeft: '1rem'
    },
    clientNameHeader: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827'
    },
    clientStatus: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    messagesContainer: {
      flex: '1',
      overflowY: 'auto',
      padding: '1rem',
      backgroundColor: '#f0f9ff'
    },
    messageList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    messageRow: {
      display: 'flex'
    },
    messageRowSent: {
      justifyContent: 'flex-end'
    },
    messageRowReceived: {
      justifyContent: 'flex-start'
    },
    messageBubble: {
      maxWidth: '70%',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      borderRadius: '1rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    },
    messageBubbleSent: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderBottomRightRadius: '0.25rem'
    },
    messageBubbleReceived: {
      backgroundColor: '#ffffff',
      color: '#1f2937',
      borderBottomLeftRadius: '0.25rem'
    },
    messageText: {
      marginBottom: '0.25rem'
    },
    messageTime: {
      fontSize: '0.75rem'
    },
    messageTimeSent: {
      color: '#d1fae5',
      textAlign: 'right'
    },
    messageTimeReceived: {
      color: '#9ca3af',
      textAlign: 'left'
    },
    noConversation: {
      flex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f9ff'
    },
    noConversationText: {
      color: '#6b7280'
    },
    inputContainer: {
      padding: '1rem',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#ffffff'
    },
    inputForm: {
      display: 'flex',
      alignItems: 'center'
    },
    attachmentButton: {
      padding: '0.5rem',
      color: '#6b7280',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '0.5rem'
    },
    attachmentButtonHover: {
      color: '#374151',
      backgroundColor: '#f3f4f6'
    },
    messageInput: {
      flex: '1',
      margin: '0 0.5rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '1.5rem',
      outline: 'none',
      fontSize: '0.875rem'
    },
    messageInputFocus: {
      borderColor: '#10b981',
      ring: '1px solid #10b981'
    },
    sendButton: {
      padding: '0.75rem',
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderRadius: '1.5rem',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    sendButtonHover: {
      backgroundColor: '#059669'
    },
    // Client info panel
    clientInfoPanel: {
      width: '25%',
      borderLeft: '1px solid #e5e7eb',
      padding: '0.75rem',
      backgroundColor: '#ffffff',
      overflowY: 'auto'
    },
    clientInfoTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#10b981',
      marginBottom: '0.75rem',
      paddingBottom: '0.25rem',
      borderBottom: '1px solid #10b981',
      textAlign: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    sectionTitle: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#10b981',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.025em',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    detailsList: {
      marginTop: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    detailItem: {
      display: 'flex',
      flexDirection: 'column'
    },
    detailLabel: {
      fontSize: '0.75rem',
      color: '#6b7280',
      fontWeight: '500',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    detailValue: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#111827',
      marginTop: '0.125rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    clientInfoSection: {
      marginBottom: '1rem'
    },
    tagsContainer: {
      marginTop: '0.5rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    tag: {
      display: 'inline-flex',
      alignItems: 'center',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    tagNew: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    tagVip: {
      backgroundColor: '#ede9fe',
      color: '#5b21b6'
    },
    addTagButton: {
      marginTop: '0.75rem',
      fontSize: '0.875rem',
      color: '#10b981',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center'
    },
    addTagButtonHover: {
      color: '#065f46'
    },
    notesList: {
      marginTop: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    noteItem: {
      fontSize: '0.875rem',
      padding: '0.75rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem'
    },
    noteText: {
      color: '#111827',
      fontSize: '0.875rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    noteTime: {
      color: '#6b7280',
      fontSize: '0.75rem',
      marginTop: '0.25rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    reminderContainer: {
      marginTop: '0.75rem',
      display: 'flex',
      gap: '0.5rem',
      flexDirection: 'column'
    },
    reminderInput: {
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      paddingTop: '0.375rem',
      paddingBottom: '0.375rem',
      fontSize: '0.8125rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      outline: 'none',
      transition: 'border-color 0.2s ease',
      width: '100%'
    },
    reminderButton: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      fontWeight: '500',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      borderRadius: '0.375rem',
      border: 'none',
      fontSize: '0.8125rem',
      cursor: 'pointer',
      alignSelf: 'flex-start',
      transition: 'background-color 0.2s ease'
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e5e7eb'
    },
    saveButton: {
      flex: '1',
      backgroundColor: '#10b981',
      color: '#ffffff',
      fontWeight: '500',
      paddingTop: '0.625rem',
      paddingBottom: '0.625rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.8125rem',
      transition: 'background-color 0.2s ease'
    },
    saveButtonHover: {
      backgroundColor: '#059669'
    },
    cancelButton: {
      flex: '1',
      backgroundColor: '#f3f4f6',
      color: '#1f2937',
      fontWeight: '500',
      paddingTop: '0.625rem',
      paddingBottom: '0.625rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      cursor: 'pointer',
      fontSize: '0.8125rem',
      transition: 'background-color 0.2s ease'
    },
    cancelButtonHover: {
      backgroundColor: '#e5e7eb'
    },
    statusButton: {
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      border: '1px solid #d1d5db',
      backgroundColor: '#f9fafb',
      color: '#374151',
      fontSize: '0.75rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    statusButtonActive: {
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      color: '#ffffff'
    },
    // Stats cards
    statsGrid: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    statsCard: {
      backgroundColor: '#ffffff',
      padding: '1rem',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      transition: 'transform 0.2s ease',
      flex: '1 1 calc(50% - 0.5rem)',
      minWidth: '200px'
    },
    statsCardHover: {
      transform: 'translateY(-2px)'
    },
    statsTitle: {
      fontSize: '0.8125rem',
      fontWeight: '500',
      color: '#6b7280',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statsValue: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#10b981',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    statsIcon: {
      width: '1.125rem',
      height: '1.125rem',
      color: '#10b981'
    },
    // Add new styles for monitoring and reporting components
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    chartCard: {
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    chartTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '1rem'
    },
    chartContainer: {
      height: '20rem'
    },
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      marginBottom: '2rem'
    },
    table: {
      minWidth: '100%',
      borderCollapse: 'collapse',
      divideY: '1px solid #e5e7eb'
    },
    tableHeader: {
      backgroundColor: '#f9fafb'
    },
    tableHeaderCell: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      textAlign: 'left',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    tableBody: {
      backgroundColor: '#ffffff',
      divideY: '1px solid #e5e7eb'
    },
    tableRow: {
      backgroundColor: '#ffffff'
    },
    tableCell: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem',
      color: '#111827'
    },
    tableCellSecondary: {
      color: '#6b7280'
    },
    statusBadge: {
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      paddingTop: '0.125rem',
      paddingBottom: '0.125rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    statusActive: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusAway: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    // Add new styles for the detailed agent performance table
    detailedTableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      marginBottom: '2rem'
    },
    detailedTable: {
      minWidth: '100%',
      borderCollapse: 'collapse',
      divideY: '1px solid #e5e7eb'
    },
    detailedTableHeader: {
      backgroundColor: '#f9fafb'
    },
    detailedTableHeaderCell: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      textAlign: 'left',
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    detailedTableBody: {
      backgroundColor: '#ffffff',
      divideY: '1px solid #e5e7eb'
    },
    detailedTableRow: {
      backgroundColor: '#ffffff'
    },
    detailedTableCell: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem',
      color: '#111827'
    },
    detailedTableCellSecondary: {
      color: '#6b7280'
    },
  }

  // Responsive styles - updated to include monitoring and reporting responsiveness
  const mediaStyles = `
    @media (min-width: 768px) {
      .chatInterface {
        flex-direction: row;
      }
      
      .conversationsPanel {
        width: 33.333333%;
        display: block;
      }
      
      .clientInfoPanel {
        width: 25%;
        display: block;
      }
      
      .statsGrid {
        gridTemplateColumns: repeat(2, minmax(0, 1fr));
      }
      
      .chartsGrid {
        gridTemplateColumns: repeat(2, minmax(0, 1fr));
      }
      
      /* Show panels in expanded view on desktop */
      .expandedChatInterface .conversationsPanel {
        display: block;
      }
      
      .expandedChatInterface .clientInfoPanel {
        display: block;
      }
    }
    
    @media (min-width: 1024px) {
      .statsGrid {
        gridTemplateColumns: repeat(2, minmax(0, 1fr));
      }
    }
    
    /* Mobile responsiveness - align inner containers with header width */
    @media (max-width: 767px) {
      /* Make inner containers have 0 outer left and right margins while maintaining inner padding and vertical margins */
      .chatContainer,
      .statsGrid,
      .chartsGrid,
      .detailedTableContainer,
      .tableContainer {
        margin-left: 0;
        margin-right: 0;
      }
      
      /* Remove rounded corners on mobile */
      .chatContainer,
      .statsGrid,
      .chartsGrid,
      .detailedTableContainer,
      .tableContainer,
      .statsCard,
      .chartCard {
        border-radius: 0;
      }
      
      /* Reduce padding on mobile for better visibility */
      .searchContainer {
        padding: 0.5rem;
      }
      
      .conversationsList {
        padding: 0;
      }
      
      .conversationItem {
        padding: 0.75rem;
        min-height: 2.5rem; /* Better touch target size */
      }
      
      .chatHeader {
        padding: 0.75rem;
      }
      
      .messagesContainer {
        padding: 0.5rem;
      }
      
      .inputContainer {
        padding: 0.5rem;
      }
      
      .clientInfoPanel {
        padding: 0.5rem;
      }
      
      .clientInfoSection {
        margin-bottom: 0.75rem;
      }
      
      /* Chat interface optimizations for mobile - hide side panels by default */
      .chatInterface {
        height: calc(100vh - 200px);
        flex-direction: column;
      }
      
      .conversationsPanel {
        display: none;
      }
      
      .clientInfoPanel {
        display: none;
      }
      
      /* Ensure chat panel takes full width on mobile */
      .chatPanel {
        width: 100%;
      }
      
      /* Mobile chat container optimizations */
      .chatContainer .chatInterface {
        height: calc(100vh - 230px);
      }
      
      /* Hide conversation and client info panels on mobile by default */
      .chatContainer .conversationsPanel {
        display: none;
      }
      
      .chatContainer .clientInfoPanel {
        display: none;
      }
      
      /* Ensure chat panel takes full width on mobile */
      .chatContainer .chatPanel {
        width: 100%;
      }
      
      /* Expanded chat interface optimizations for mobile */
      .expandedChatInterface .chatInterface {
        flex-direction: column;
      }
      
      .expandedChatInterface .conversationsPanel {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
        display: none;
      }
      
      .expandedChatInterface .clientInfoPanel {
        width: 100%;
        border-left: none;
        border-top: 1px solid #e5e7eb;
        display: none;
      }
      
      .messageBubble {
        max-width: 85%;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      
      .lastMessage {
        font-size: 0.75rem;
      }
      
      .clientName {
        font-size: 0.8125rem;
      }
      
      .clientNameHeader {
        font-size: 0.875rem;
      }
    }
    
    /* Custom scrollbar styling */
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
    
    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
  `

  // Chat Container
  const chatContainerStyle = {
    ...styles.chatContainer,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  }
  
  // Chat footer
  const chatFooterStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTop: '1px solid #e5e7eb'
  }
  
  // Information button
  const infoButtonStyle = {
    backgroundColor: 'rgba(59, 130, 246, 0.6)',
    color: '#ffffff',
    border: '1px solid rgba(59, 130, 246, 0.6)',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    width: '2.5rem',
    height: '2.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }
  
  const infoButtonHoverStyle = {
    backgroundColor: 'rgba(37, 99, 235, 0.8)',
    borderColor: 'rgba(37, 99, 235, 0.8)',
    transform: 'scale(1.05)'
  }
  
  // Client info sidebar
  const clientInfoSidebarStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '90%',
    maxWidth: '350px',
    height: '100%',
    backgroundColor: '#ffffff',
    boxShadow: '-5px 0 15px -5px rgba(0, 0, 0, 0.1)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideInRight 0.3s ease-out forwards'
  }
  
  const clientInfoSidebarHeaderStyle = {
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
  
  const clientInfoSidebarTitleStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#111827',
    margin: 0
  }
  
  const clientInfoSidebarContentStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem'
  }

  // Mobile menu button
  const mobileMenuButtonStyle = {
    backgroundColor: 'rgba(16, 185, 129, 0.6)',
    color: '#ffffff',
    border: '1px solid rgba(16, 185, 129, 0.6)',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    width: '2.5rem',
    height: '2.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }

  const mobileMenuButtonHoverStyle = {
    backgroundColor: 'rgba(5, 150, 105, 0.8)',
    borderColor: 'rgba(5, 150, 105, 0.8)',
    transform: 'scale(1.05)'
  }

  // Mobile overlay styles
  const mobileOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    animation: 'fadeIn 0.3s ease-out forwards'
  }

  const mobilePanelStyle = {
    backgroundColor: '#ffffff',
    width: '90%',
    maxWidth: '350px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    animation: 'slideIn 0.3s ease-out forwards'
  }

  const closeButtonStyleMobile = {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: '1px solid #ef4444',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '10',
    transition: 'all 0.2s ease',
    width: '2.5rem',
    height: '2.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  }

  const expandButtonStyle = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.375rem',
    padding: '0.375rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '10',
    transition: 'all 0.2s ease',
    width: '2rem',
    height: '2rem'
  }

  const expandButtonHoverStyle = {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.5)'
  }

  const closeButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.375rem',
    padding: '0.375rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1001',
    transition: 'all 0.2s ease',
    width: '2rem',
    height: '2rem'
  }

  const closeButtonHoverStyle = {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.5)'
  }

  const expandedViewStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000'
  }

  const expandedContentStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    width: '95%',
    height: '95%',
    maxWidth: '1400px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  }

  const expandedChatInterfaceStyle = {
    ...styles.chatInterface,
    height: 'calc(100% - 50px)', // Increased height to give more space for messages
    flex: '1'
  }

  // Analytics Expansion Button
  const analyticsExpandButtonStyle = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.375rem',
    padding: '0.375rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '10',
    transition: 'all 0.2s ease',
    width: '2rem',
    height: '2rem'
  }

  const analyticsExpandButtonHoverStyle = {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.5)'
  }

  // Agent Performance Expansion Button
  const agentPerformanceExpandButtonStyle = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.375rem',
    padding: '0.375rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '10',
    transition: 'all 0.2s ease',
    width: '2rem',
    height: '2rem'
  }

  const agentPerformanceExpandButtonHoverStyle = {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: 'rgba(16, 185, 129, 0.5)'
  }

  // Expanded Agent Performance Container
  const expandedAgentPerformanceContainerStyle = {
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    height: 'calc(100vh - 3rem)',
    overflow: 'auto'
  }

  // Expanded Agent Performance Chart Style
  const expandedAgentPerformanceChartStyle = {
    height: '400px',
    width: '100%',
    position: 'relative',
    overflow: 'auto'
  }

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      
      {/* WhatsApp-style chat interface */}
      <div className="chatContainer" style={chatContainerStyle}>
        {!isChatExpanded && (
          <button 
            style={expandButtonStyle}
            onClick={() => setIsChatExpanded(true)}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = expandButtonHoverStyle.backgroundColor;
              e.target.style.borderColor = expandButtonHoverStyle.borderColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = expandButtonStyle.backgroundColor;
              e.target.style.borderColor = expandButtonStyle.borderColor;
            }}
          >
            <Maximize2 style={{ height: '1rem', width: '1rem' }} />
          </button>
        )}
        
        <div className="chatInterface" style={styles.chatInterface}>
          {/* Left Panel - Conversations List - Hidden on mobile */}
          <div className="conversationsPanel" style={{...styles.conversationsPanel, display: 'none'}}>
            <div style={styles.searchContainer}>
              <div style={styles.searchWrapper}>
                <div style={styles.searchIcon}>
                  <Search style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
                </div>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.searchInputFocus.borderColor;
                    e.target.style.boxShadow = `0 0 0 1px ${styles.searchInputFocus.ring}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '';
                    e.target.style.boxShadow = '';
                  }}
                />
              </div>
            </div>
            <div style={styles.conversationsList}>
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  style={{
                    ...styles.conversationItem,
                    ...(activeConversation.id === conversation.id ? styles.conversationItemActive : {})
                  }}
                  onClick={() => selectConversation(conversation)}
                  onMouseEnter={(e) => {
                    if (activeConversation.id !== conversation.id) {
                      e.target.style.backgroundColor = styles.conversationItemHover.backgroundColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeConversation.id !== conversation.id) {
                      e.target.style.backgroundColor = styles.conversationItem.backgroundColor;
                    }
                  }}
                >
                  <div style={styles.avatarContainer}>
                    <div style={styles.avatar}>
                      <span style={styles.avatarText}>
                        {conversation.client.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div style={styles.conversationDetails}>
                    <div style={styles.conversationHeader}>
                      <h3 style={styles.clientName}>
                        {conversation.client}
                      </h3>
                      <span style={styles.time}>
                        {conversation.time}
                      </span>
                    </div>
                    <div style={styles.conversationFooter}>
                      <p style={styles.lastMessage}>
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span style={styles.unreadBadge}>
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Panel - Chat Window */}
          <div style={{...styles.chatPanel, flex: '1', width: '100%'}}>
            {activeConversation ? (
              <>
                <div style={styles.chatHeader}>
                  <div style={styles.chatHeaderContent}>
                    <div style={styles.chatAvatar}>
                      <div style={styles.chatAvatarInner}>
                        <span style={styles.chatAvatarText}>
                          {activeConversation.client.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div style={styles.clientInfo}>
                      <h3 style={styles.clientNameHeader}>
                        {activeConversation.client}
                      </h3>
                      <p style={styles.clientStatus}>
                        {activeConversation.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                </div>
                <div style={styles.messagesContainer}>
                  <div style={styles.messageList}>
                    {activeConversation.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`messageRow ${msg.sender === 'agent' ? 'messageRowSent' : 'messageRowReceived'}`}
                        style={{
                          ...styles.messageRow,
                          ...(msg.sender === 'agent' ? styles.messageRowSent : styles.messageRowReceived)
                        }}
                      >
                        <div
                          className={`messageBubble ${msg.sender === 'agent' ? 'messageBubbleSent' : 'messageBubbleReceived'}`}
                          style={{
                            ...styles.messageBubble,
                            ...(msg.sender === 'agent' ? styles.messageBubbleSent : styles.messageBubbleReceived)
                          }}
                        >
                          <p style={styles.messageText}>{msg.text}</p>
                          <p
                            className={`messageTime ${msg.sender === 'agent' ? 'messageTimeSent' : 'messageTimeReceived'}`}
                            style={{
                              ...styles.messageTime,
                              ...(msg.sender === 'agent' ? styles.messageTimeSent : styles.messageTimeReceived)
                            }}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={styles.inputContainer}>
                  <form onSubmit={handleSendMessage} style={styles.inputForm}>
                    <button
                      type="button"
                      style={styles.attachmentButton}
                      onMouseEnter={(e) => e.target.style.color = styles.attachmentButtonHover.color}
                      onMouseLeave={(e) => e.target.style.color = styles.attachmentButton.color}
                    >
                      <Paperclip style={{ height: '1.25rem', width: '1.25rem' }} />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type message here"
                      style={styles.messageInput}
                      onFocus={(e) => {
                        e.target.style.borderColor = styles.messageInputFocus.borderColor;
                        e.target.style.boxShadow = `0 0 0 1px ${styles.messageInputFocus.ring}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '';
                        e.target.style.boxShadow = '';
                      }}
                    />
                    <button
                      type="submit"
                      style={styles.sendButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.sendButtonHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = styles.sendButton.backgroundColor}
                    >
                      <Send style={{ height: '1.25rem', width: '1.25rem' }} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div style={styles.noConversation}>
                <p style={styles.noConversationText}>Select a conversation to start chatting</p>
              </div>
            )}
          </div>

          {/* Right Panel - Client Info - Hidden on mobile */}
          <div className="clientInfoPanel" style={{...styles.clientInfoPanel, width: '25%', display: 'none'}}>
            {activeConversation && (
              <div>
                <h3 style={styles.clientInfoTitle}>Client Information</h3>
                <div style={styles.clientInfoSection}>
                  <h4 style={styles.sectionTitle}>Client Details</h4>
                  <dl style={styles.detailsList}>
                    <div style={styles.detailItem}>
                      <dt style={styles.detailLabel}>Name</dt>
                      <dd style={styles.detailValue}>{activeConversation.client}</dd>
                    </div>
                    <div style={styles.detailItem}>
                      <dt style={styles.detailLabel}>Phone Number</dt>
                      <dd style={styles.detailValue}>+1 234 567 8900</dd>
                    </div>
                    <div style={styles.detailItem}>
                      <dt style={styles.detailLabel}>Country</dt>
                      <dd style={styles.detailValue}>USA</dd>
                    </div>
                  </dl>
                </div>
                
                <div style={styles.clientInfoSection}>
                  <h4 style={styles.sectionTitle}>Tags</h4>
                  <div style={styles.tagsContainer}>
                    <span style={{ ...styles.tag, ...styles.tagNew }}>
                      New Lead
                    </span>
                    <span style={{ ...styles.tag, ...styles.tagVip }}>
                      VIP
                    </span>
                  </div>
                  <button 
                    style={styles.addTagButton}
                    onMouseEnter={(e) => e.target.style.color = styles.addTagButtonHover.color}
                    onMouseLeave={(e) => e.target.style.color = styles.addTagButton.color}
                  >
                    + Add Tag
                  </button>
                </div>
                
                <div style={styles.clientInfoSection}>
                  <h4 style={styles.sectionTitle}>Notes</h4>
                  <div style={styles.notesList}>
                    <div style={styles.noteItem}>
                      <p style={styles.noteText}>Initial inquiry about product features</p>
                      <p style={styles.noteTime}>2 hours ago</p>
                    </div>
                  </div>
                  <button 
                    style={styles.addTagButton}
                    onMouseEnter={(e) => e.target.style.color = styles.addTagButtonHover.color}
                    onMouseLeave={(e) => e.target.style.color = styles.addTagButton.color}
                  >
                    + Add Note
                  </button>
                </div>
                
                <div style={styles.clientInfoSection}>
                  <h4 style={styles.sectionTitle}>Follow-up Reminder</h4>
                  <div style={styles.reminderContainer}>
                    <input
                      type="datetime-local"
                      style={styles.reminderInput}
                    />
                    <button 
                      style={styles.reminderButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.reminderButtonHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = styles.reminderButton.backgroundColor}
                    >
                      Save
                    </button>
                  </div>
                </div>
                
                <div style={styles.actionButtons}>
                  <button 
                    style={styles.saveButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.saveButton.backgroundColor}
                  >
                    Save
                  </button>
                  <button 
                    style={styles.cancelButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.cancelButton.backgroundColor}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Chat footer with mobile buttons */}
        <div style={chatFooterStyle}>
          {/* Mobile menu button - hidden when overlay is open */}
          {!isMobileMenuOpen && (
            <button 
              style={mobileMenuButtonStyle}
              onClick={() => setIsMobileMenuOpen(true)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = mobileMenuButtonHoverStyle.backgroundColor;
                e.target.style.borderColor = mobileMenuButtonHoverStyle.borderColor;
                e.target.style.transform = mobileMenuButtonHoverStyle.transform;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = mobileMenuButtonStyle.backgroundColor;
                e.target.style.borderColor = mobileMenuButtonStyle.borderColor;
                e.target.style.transform = '';
              }}
            >
              <MessageSquare style={{ height: '1.25rem', width: '1.25rem' }} />
            </button>
          )}
          
          {/* Information button */}
          {activeConversation && (
            <button 
              style={infoButtonStyle}
              onClick={() => setIsClientInfoOpen(true)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = infoButtonHoverStyle.backgroundColor;
                e.target.style.borderColor = infoButtonHoverStyle.borderColor;
                e.target.style.transform = infoButtonHoverStyle.transform;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = infoButtonStyle.backgroundColor;
                e.target.style.borderColor = infoButtonStyle.borderColor;
                e.target.style.transform = '';
              }}
            >
              <Info style={{ height: '1.25rem', width: '1.25rem' }} />
            </button>
          )}
        </div>
        
        {/* Mobile overlay for conversations and client info */}
        {isMobileMenuOpen && (
          <div style={mobileOverlayStyle} onClick={(e) => {
            // Only close if clicking on the overlay backdrop, not the panel itself
            if (e.target === e.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}>
            <div style={mobilePanelStyle}>
              <button 
                style={closeButtonStyleMobile}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#dc2626';
                  e.target.style.borderColor = '#dc2626';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = closeButtonStyleMobile.backgroundColor;
                  e.target.style.borderColor = closeButtonStyleMobile.borderColor;
                  e.target.style.transform = '';
                }}
              >
                <X style={{ height: '1rem', width: '1rem' }} />
              </button>
              
              {/* Combined Panel for Conversations and Client Info */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Conversations Panel */}
                <div className="conversationsPanel" style={{...styles.conversationsPanel, width: '100%', borderRight: 'none', borderBottom: '1px solid #e5e7eb', flex: '1', minHeight: '0'}}>
                  <div style={styles.searchContainer}>
                    <div style={styles.searchWrapper}>
                      <div style={styles.searchIcon}>
                        <Search style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
                      </div>
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                        onFocus={(e) => {
                          e.target.style.borderColor = styles.searchInputFocus.borderColor;
                          e.target.style.boxShadow = `0 0 0 1px ${styles.searchInputFocus.ring}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '';
                          e.target.style.boxShadow = '';
                        }}
                      />
                    </div>
                  </div>
                  <div style={{...styles.conversationsList, flex: '1', minHeight: '0'}}>
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        style={{
                          ...styles.conversationItem,
                          ...(activeConversation.id === conversation.id ? styles.conversationItemActive : {})
                        }}
                        onClick={() => {
                          selectConversation(conversation);
                          // Close overlay after selecting conversation
                          setIsMobileMenuOpen(false);
                        }}
                        onMouseEnter={(e) => {
                          if (activeConversation.id !== conversation.id) {
                            e.target.style.backgroundColor = styles.conversationItemHover.backgroundColor;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeConversation.id !== conversation.id) {
                            e.target.style.backgroundColor = styles.conversationItem.backgroundColor;
                          }
                        }}
                      >
                        <div style={styles.avatarContainer}>
                          <div style={styles.avatar}>
                            <span style={styles.avatarText}>
                              {conversation.client.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div style={styles.conversationDetails}>
                          <div style={styles.conversationHeader}>
                            <h3 style={styles.clientName}>
                              {conversation.client}
                            </h3>
                            <span style={styles.time}>
                              {conversation.time}
                            </span>
                          </div>
                          <div style={styles.conversationFooter}>
                            <p style={styles.lastMessage}>
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread > 0 && (
                              <span style={styles.unreadBadge}>
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Client Info Sidebar */}
        {isClientInfoOpen && (
          <div style={{...mobileOverlayStyle, backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 999}} onClick={(e) => {
            // Only close if clicking on the overlay backdrop
            if (e.target === e.currentTarget) {
              setIsClientInfoOpen(false);
            }
          }}>
            <div style={clientInfoSidebarStyle}>
              <div style={clientInfoSidebarHeaderStyle}>
                <h3 style={clientInfoSidebarTitleStyle}>Client Information</h3>
                <button 
                  style={closeButtonStyleMobile}
                  onClick={() => setIsClientInfoOpen(false)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#dc2626';
                    e.target.style.borderColor = '#dc2626';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = closeButtonStyleMobile.backgroundColor;
                    e.target.style.borderColor = closeButtonStyleMobile.borderColor;
                    e.target.style.transform = '';
                  }}
                >
                  <X style={{ height: '1rem', width: '1rem' }} />
                </button>
              </div>
              <div style={clientInfoSidebarContentStyle}>
                {activeConversation && (
                  <div>
                    <div style={styles.clientInfoSection}>
                      <h4 style={styles.sectionTitle}>Client Details</h4>
                      <dl style={styles.detailsList}>
                        <div style={styles.detailItem}>
                          <dt style={styles.detailLabel}>Name</dt>
                          <dd style={styles.detailValue}>{activeConversation.client}</dd>
                        </div>
                        <div style={styles.detailItem}>
                          <dt style={styles.detailLabel}>Phone Number</dt>
                          <dd style={styles.detailValue}>+1 234 567 8900</dd>
                        </div>
                        <div style={styles.detailItem}>
                          <dt style={styles.detailLabel}>Country</dt>
                          <dd style={styles.detailValue}>USA</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div style={styles.clientInfoSection}>
                      <h4 style={styles.sectionTitle}>Status</h4>
                      <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                          style={{
                            ...styles.statusButton,
                            ...(conversationStatus === 'solved' ? styles.statusButtonActive : {}),
                            padding: '0.25rem 0.5rem'
                          }}
                          onClick={() => handleStatusChange('solved')}
                        >
                          <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>Solved</span>
                        </button>
                        <button
                          style={{
                            ...styles.statusButton,
                            ...(conversationStatus === 'pending' ? styles.statusButtonActive : {}),
                            padding: '0.25rem 0.5rem'
                          }}
                          onClick={() => handleStatusChange('pending')}
                        >
                          <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>Pending</span>
                        </button>
                        <button
                          style={{
                            ...styles.statusButton,
                            ...(conversationStatus === 'escalated' ? styles.statusButtonActive : {}),
                            padding: '0.25rem 0.5rem'
                          }}
                          onClick={() => handleStatusChange('escalated')}
                        >
                          <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>Escalated</span>
                        </button>
                      </div>
                    </div>
                    
                    <div style={styles.clientInfoSection}>
                      <h4 style={styles.sectionTitle}>Tags</h4>
                      <div style={styles.tagsContainer}>
                        <span style={{ ...styles.tag, ...styles.tagNew }}>
                          New Lead
                        </span>
                        <span style={{ ...styles.tag, ...styles.tagVip }}>
                          VIP
                        </span>
                      </div>
                      <button 
                        style={styles.addTagButton}
                        onMouseEnter={(e) => e.target.style.color = styles.addTagButtonHover.color}
                        onMouseLeave={(e) => e.target.style.color = styles.addTagButton.color}
                      >
                        + Add Tag
                      </button>
                    </div>
                    
                    <div style={styles.clientInfoSection}>
                      <h4 style={styles.sectionTitle}>Notes</h4>
                      <div style={styles.notesList}>
                        <div style={styles.noteItem}>
                          <p style={styles.noteText}>Initial inquiry about product features</p>
                          <p style={styles.noteTime}>2 hours ago</p>
                        </div>
                      </div>
                      <button 
                        style={styles.addTagButton}
                        onMouseEnter={(e) => e.target.style.color = styles.addTagButtonHover.color}
                        onMouseLeave={(e) => e.target.style.color = styles.addTagButton.color}
                      >
                        + Add Note
                      </button>
                    </div>
                    
                    <div style={styles.clientInfoSection}>
                      <h4 style={styles.sectionTitle}>Follow-up Reminder</h4>
                      <div style={styles.reminderContainer}>
                        <input
                          type="datetime-local"
                          style={styles.reminderInput}
                        />
                        <button 
                          style={styles.reminderButton}
                          onMouseEnter={(e) => e.target.style.backgroundColor = styles.reminderButtonHover.backgroundColor}
                          onMouseLeave={(e) => e.target.style.backgroundColor = styles.reminderButton.backgroundColor}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    
                    <div style={styles.actionButtons}>
                      <button 
                        style={styles.saveButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.saveButton.backgroundColor}
                      >
                        Save
                      </button>
                      <button 
                        style={styles.cancelButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.cancelButton.backgroundColor}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Chat View */}
      {isChatExpanded && (
        <div style={expandedViewStyle} onClick={(e) => e.target === e.currentTarget && setIsChatExpanded(false)}>
          <div style={expandedContentStyle}>
            <button 
              style={closeButtonStyle}
              onClick={() => setIsChatExpanded(false)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = closeButtonHoverStyle.backgroundColor;
                e.target.style.borderColor = closeButtonHoverStyle.borderColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = closeButtonStyle.backgroundColor;
                e.target.style.borderColor = closeButtonStyle.borderColor;
              }}
            >
              <X style={{ height: '1rem', width: '1rem' }} />
            </button>
            
            <div className="expandedChatInterface" style={expandedChatInterfaceStyle}>
              {/* Left Panel - Conversations List - Hidden on mobile */}
              <div className="conversationsPanel" style={{...styles.conversationsPanel, width: '30%', display: 'none'}}>
                <div style={styles.searchContainer}>
                  <div style={styles.searchWrapper}>
                    <div style={styles.searchIcon}>
                      <Search style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={styles.searchInput}
                      onFocus={(e) => {
                        e.target.style.borderColor = styles.searchInputFocus.borderColor;
                        e.target.style.boxShadow = `0 0 0 1px ${styles.searchInputFocus.ring}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '';
                        e.target.style.boxShadow = '';
                      }}
                    />
                  </div>
                </div>
                <div style={styles.conversationsList}>
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      style={{
                        ...styles.conversationItem,
                        ...(activeConversation.id === conversation.id ? styles.conversationItemActive : {})
                      }}
                      onClick={() => selectConversation(conversation)}
                      onMouseEnter={(e) => {
                        if (activeConversation.id !== conversation.id) {
                          e.target.style.backgroundColor = styles.conversationItemHover.backgroundColor;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeConversation.id !== conversation.id) {
                          e.target.style.backgroundColor = styles.conversationItem.backgroundColor;
                        }
                      }}
                    >
                      <div style={styles.avatarContainer}>
                        <div style={styles.avatar}>
                          <span style={styles.avatarText}>
                            {conversation.client.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div style={styles.conversationDetails}>
                        <div style={styles.conversationHeader}>
                          <h3 style={styles.clientName}>
                            {conversation.client}
                          </h3>
                          <span style={styles.time}>
                            {conversation.time}
                          </span>
                        </div>
                        <div style={styles.conversationFooter}>
                          <p style={styles.lastMessage}>
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <span style={styles.unreadBadge}>
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Panel - Chat Window */}
              <div style={{...styles.chatPanel, flex: '1', width: '100%'}}>
                {activeConversation ? (
                  <>
                    <div style={styles.chatHeader}>
                      <div style={styles.chatHeaderContent}>
                        <div style={styles.chatAvatar}>
                          <div style={styles.chatAvatarInner}>
                            <span style={styles.chatAvatarText}>
                              {activeConversation.client.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div style={styles.clientInfo}>
                          <h3 style={styles.clientNameHeader}>
                            {activeConversation.client}
                          </h3>
                          <p style={styles.clientStatus}>
                            {activeConversation.online ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style={styles.messagesContainer}>
                      <div style={styles.messageList}>
                        {activeConversation.messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`messageRow ${msg.sender === 'agent' ? 'messageRowSent' : 'messageRowReceived'}`}
                            style={{
                              ...styles.messageRow,
                              ...(msg.sender === 'agent' ? styles.messageRowSent : styles.messageRowReceived)
                            }}
                          >
                            <div
                              className={`messageBubble ${msg.sender === 'agent' ? 'messageBubbleSent' : 'messageBubbleReceived'}`}
                              style={{
                                ...styles.messageBubble,
                                ...(msg.sender === 'agent' ? styles.messageBubbleSent : styles.messageBubbleReceived)
                              }}
                            >
                              <p style={styles.messageText}>{msg.text}</p>
                              <p
                                className={`messageTime ${msg.sender === 'agent' ? 'messageTimeSent' : 'messageTimeReceived'}`}
                                style={{
                                  ...styles.messageTime,
                                  ...(msg.sender === 'agent' ? styles.messageTimeSent : styles.messageTimeReceived)
                                }}
                              >
                                {msg.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={styles.inputContainer}>
                      <form onSubmit={handleSendMessage} style={styles.inputForm}>
                        <button
                          type="button"
                          style={styles.attachmentButton}
                          onMouseEnter={(e) => e.target.style.color = styles.attachmentButtonHover.color}
                          onMouseLeave={(e) => e.target.style.color = styles.attachmentButton.color}
                        >
                          <Paperclip style={{ height: '1.25rem', width: '1.25rem' }} />
                        </button>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type message here"
                          style={styles.messageInput}
                          onFocus={(e) => {
                            e.target.style.borderColor = styles.messageInputFocus.borderColor;
                            e.target.style.boxShadow = `0 0 0 1px ${styles.messageInputFocus.ring}`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '';
                            e.target.style.boxShadow = '';
                          }}
                        />
                        <button
                          type="submit"
                          style={styles.sendButton}
                          onMouseEnter={(e) => e.target.style.backgroundColor = styles.sendButtonHover.backgroundColor}
                          onMouseLeave={(e) => e.target.style.backgroundColor = styles.sendButton.backgroundColor}
                        >
                          <Send style={{ height: '1.25rem', width: '1.25rem' }} />
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div style={styles.noConversation}>
                    <p style={styles.noConversationText}>Select a conversation to start chatting</p>
                  </div>
                )}
              </div>

              {/* Right Panel - Client Info - Hidden on mobile */}
              <div className="clientInfoPanel" style={{...styles.clientInfoPanel, width: '25%', display: 'none'}}>
                {activeConversation && (
                  <div>
                    <h3 style={styles.clientInfoTitle}>Client Information</h3>
                    <div style={styles.clientInfoSection}>
                      <h4 style={styles.sectionTitle}>Client Details</h4>
                      <dl style={styles.detailsList}>
                        <div style={styles.detailItem}>
                          <dt style={styles.detailLabel}>Name</dt>
                          <dd style={styles.detailValue}>{activeConversation.client}</dd>
                        </div>
                        <div style={styles.detailItem}>
                          <dt style={styles.detailLabel}>Phone Number</dt>
                          <dd style={styles.detailValue}>+1 234 567 8900</dd>
                        </div>
                        <div style={styles.detailItem}>
                          <dt style={styles.detailLabel}>Country</dt>
                          <dd style={styles.detailValue}>USA</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div style={styles.clientInfoSection}>
                      <h4 style={styles.sectionTitle}>Tags</h4>
                      <div style={styles.tagsContainer}>
                        <span style={{ ...styles.tag, ...styles.tagNew }}>
                          New Lead
                        </span>
                        <span style={{ ...styles.tag, ...styles.tagVip }}>
                          VIP
                        </span>
                      </div>
                      <button 
                        style={styles.addTagButton}
                        onMouseEnter={(e) => e.target.style.color = styles.addTagButtonHover.color}
                        onMouseLeave={(e) => e.target.style.color = styles.addTagButton.color}
                      >
                        + Add Tag
                      </button>
                    </div>
                    
                    <div style={styles.clientInfoSection}>
                      <h4 style={styles.sectionTitle}>Notes</h4>
                      <div style={styles.notesList}>
                        <div style={styles.noteItem}>
                          <p style={styles.noteText}>Initial inquiry about product features</p>
                          <p style={styles.noteTime}>2 hours ago</p>
                        </div>
                      </div>
                      <button 
                        style={styles.addTagButton}
                        onMouseEnter={(e) => e.target.style.color = styles.addTagButtonHover.color}
                        onMouseLeave={(e) => e.target.style.color = styles.addTagButton.color}
                      >
                        + Add Note
                      </button>
                    </div>
                    
                    <div style={styles.clientInfoSection}>
                      <h4 style={styles.sectionTitle}>Follow-up Reminder</h4>
                      <div style={styles.reminderContainer}>
                        <input
                          type="datetime-local"
                          style={styles.reminderInput}
                        />
                        <button 
                          style={styles.reminderButton}
                          onMouseEnter={(e) => e.target.style.backgroundColor = styles.reminderButtonHover.backgroundColor}
                          onMouseLeave={(e) => e.target.style.backgroundColor = styles.reminderButton.backgroundColor}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                    
                    <div style={styles.actionButtons}>
                      <button 
                        style={styles.saveButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.saveButton.backgroundColor}
                      >
                        Save
                      </button>
                      <button 
                        style={styles.cancelButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.cancelButton.backgroundColor}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards - Now in two-column layout */}
      <div className="statsGrid" style={styles.statsGrid}>
        <div 
          style={styles.statsCard}
          onMouseEnter={(e) => {
            e.target.style.transform = styles.statsCardHover.transform;
            e.target.style.boxShadow = styles.statsCardHover.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = '';
            e.target.style.boxShadow = styles.statsCard.boxShadow;
          }}
        >
          <h3 style={styles.statsTitle}>
            <MessageCircle style={styles.statsIcon} />
            Total Conversations Today
          </h3>
          <p style={styles.statsValue}>42</p>
        </div>
        <div 
          style={styles.statsCard}
          onMouseEnter={(e) => {
            e.target.style.transform = styles.statsCardHover.transform;
            e.target.style.boxShadow = styles.statsCardHover.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = '';
            e.target.style.boxShadow = styles.statsCard.boxShadow;
          }}
        >
          <h3 style={styles.statsTitle}>
            <Clock style={styles.statsIcon} />
            Avg. First Response Time
          </h3>
          <p style={styles.statsValue}>2.4 min</p>
        </div>
        <div 
          style={styles.statsCard}
          onMouseEnter={(e) => {
            e.target.style.transform = styles.statsCardHover.transform;
            e.target.style.boxShadow = styles.statsCardHover.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = '';
            e.target.style.boxShadow = styles.statsCard.boxShadow;
          }}
        >
          <h3 style={styles.statsTitle}>
            <MessageCircle style={styles.statsIcon} />
            Open Conversations &gt; 24h
          </h3>
          <p style={styles.statsValue}>8</p>
        </div>
        <div 
          style={styles.statsCard}
          onMouseEnter={(e) => {
            e.target.style.transform = styles.statsCardHover.transform;
            e.target.style.boxShadow = styles.statsCardHover.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = '';
            e.target.style.boxShadow = styles.statsCard.boxShadow;
          }}
        >
          <h3 style={styles.statsTitle}>
            <CheckCircle style={styles.statsIcon} />
            Resolved Today
          </h3>
          <p style={styles.statsValue}>32</p>
        </div>
      </div>

      {/* Charts Section - Moved from Monitoring & Reporting */}
      <div className="chartsGrid" style={styles.chartsGrid}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Conversations per Day</h3>
          <div style={{ ...styles.chartContainer, height: '20rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversations" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={{...styles.chartCard, position: 'relative'}}>
          <h3 style={styles.chartTitle}>Agent Performance (Weekly)</h3>
          {!isAgentPerformanceExpanded && (
            <button 
              style={agentPerformanceExpandButtonStyle}
              onClick={() => setIsAgentPerformanceExpanded(true)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = agentPerformanceExpandButtonHoverStyle.backgroundColor;
                e.target.style.borderColor = agentPerformanceExpandButtonHoverStyle.borderColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = agentPerformanceExpandButtonStyle.backgroundColor;
                e.target.style.borderColor = agentPerformanceExpandButtonStyle.borderColor;
              }}
            >
              <Maximize2 style={{ height: '1rem', width: '1rem' }} />
            </button>
          )}
          <div style={{ ...styles.chartContainer, height: '20rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="mon" fill="#10b981" name="Monday" />
                <Bar dataKey="tue" fill="#3b82f6" name="Tuesday" />
                <Bar dataKey="wed" fill="#8b5cf6" name="Wednesday" />
                <Bar dataKey="thu" fill="#ec4899" name="Thursday" />
                <Bar dataKey="fri" fill="#f59e0b" name="Friday" />
                <Bar dataKey="sat" fill="#ef4444" name="Saturday" />
                <Bar dataKey="sun" fill="#06b6d4" name="Sunday" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Agent Performance Table */}
      <div className="detailedTableContainer" style={styles.detailedTableContainer}>
        <div style={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827' }}>Agent Performance Details</h3>
        </div>
        <ResponsiveTable
          columns={[
            { key: 'name', header: 'Agent', isPrimary: true },
            { key: 'totalConversations', header: 'Total Conversations' },
            { key: 'solved', header: 'Solved' },
            { key: 'unsolved', header: 'Unsolved' },
            { key: 'escalated', header: 'Escalated' },
            { key: 'responseTime', header: 'Avg. Response Time' },
            { key: 'status', header: 'Status' }
          ]}
          data={agentPerformanceData}
          renderCell={(row, column) => {
            if (column.key === 'solved') {
              return <span style={{ color: '#10b981' }}>{row.solved}</span>;
            } else if (column.key === 'unsolved') {
              return <span style={{ color: '#f59e0b' }}>{row.unsolved}</span>;
            } else if (column.key === 'escalated') {
              return <span style={{ color: '#ef4444' }}>{row.escalated}</span>;
            } else if (column.key === 'status') {
              return (
                <span style={{ 
                  ...styles.statusBadge, 
                  ...(row.status === 'Active' ? styles.statusActive : styles.statusAway) 
                }}>
                  {row.status}
                </span>
              );
            } else {
              return row[column.key];
            }
          }}
        />
      </div>

      {/* Agent Performance Table - Moved from Monitoring & Reporting */}
      <div className="tableContainer" style={styles.tableContainer}>
        <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827' }}>Agent Performance</h3>
        </div>
        <ResponsiveTable
          columns={[
            { key: 'name', header: 'Name', isPrimary: true },
            { key: 'handled', header: 'Conversations Handled' },
            { key: 'responseTime', header: 'Avg. Response Time' },
            { key: 'status', header: 'Status' }
          ]}
          data={agentData}
          renderCell={(row, column) => {
            if (column.key === 'status') {
              return (
                <span style={{ 
                  ...styles.statusBadge, 
                  ...(row.status === 'Active' ? styles.statusActive : styles.statusAway) 
                }}>
                  {row.status}
                </span>
              );
            } else {
              return row[column.key];
            }
          }}
        />
      </div>

      {/* Expanded Analytics View */}
      {isAnalyticsExpanded && (
        <div style={expandedViewStyle} onClick={(e) => e.target === e.currentTarget && setIsAnalyticsExpanded(false)}>
          <div style={expandedContentStyle}>
            <button 
              style={closeButtonStyle}
              onClick={() => setIsAnalyticsExpanded(false)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = closeButtonHoverStyle.backgroundColor;
                e.target.style.borderColor = closeButtonHoverStyle.borderColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = closeButtonStyle.backgroundColor;
                e.target.style.borderColor = closeButtonStyle.borderColor;
              }}
            >
              <X style={{ height: '1rem', width: '1rem' }} />
            </button>
            
            <div style={expandedChartContainerStyle}>
              <h2 style={{ ...styles.pageTitle, marginBottom: '2rem' }}>Analytics Dashboard</h2>
              
              <div style={{ display: 'flex', gap: '2rem', height: 'calc(100% - 4rem)' }}>
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ ...styles.sectionTitle, fontSize: '1.125rem', marginBottom: '1rem' }}>
                    Conversations Overview
                  </h3>
                  <div style={expandedChartStyle}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={conversationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="conversations" fill="#10b981" name="Conversations" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ ...styles.sectionTitle, fontSize: '1.125rem', marginBottom: '1rem' }}>
                    Status Distribution
                  </h3>
                  <div style={expandedChartStyle}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1000}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Count']} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Agent Performance View */}
      {isAgentPerformanceExpanded && (
        <div style={expandedViewStyle} onClick={(e) => e.target === e.currentTarget && setIsAgentPerformanceExpanded(false)}>
          <div style={{...expandedContentStyle, height: '90%', width: '90%'}}>
            <button 
              style={closeButtonStyle}
              onClick={() => setIsAgentPerformanceExpanded(false)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = closeButtonHoverStyle.backgroundColor;
                e.target.style.borderColor = closeButtonHoverStyle.borderColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = closeButtonStyle.backgroundColor;
                e.target.style.borderColor = closeButtonStyle.borderColor;
              }}
            >
              <X style={{ height: '1rem', width: '1rem' }} />
            </button>
            
            <div style={expandedAgentPerformanceContainerStyle}>
              <h2 style={{ ...styles.pageTitle, marginBottom: '1rem' }}>Agent Performance Details</h2>
              
              <div style={expandedAgentPerformanceChartStyle}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mon" fill="#10b981" name="Monday" />
                    <Bar dataKey="tue" fill="#3b82f6" name="Tuesday" />
                    <Bar dataKey="wed" fill="#8b5cf6" name="Wednesday" />
                    <Bar dataKey="thu" fill="#ec4899" name="Thursday" />
                    <Bar dataKey="fri" fill="#f59e0b" name="Friday" />
                    <Bar dataKey="sat" fill="#ef4444" name="Saturday" />
                    <Bar dataKey="sun" fill="#06b6d4" name="Sunday" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Detailed Agent Performance Table in Expanded View */}
              <div style={{...styles.detailedTableContainer, marginTop: '2rem', maxHeight: '400px', overflow: 'auto'}}>
                <ResponsiveTable
                  columns={[
                    { key: 'name', header: 'Agent', isPrimary: true },
                    { key: 'totalConversations', header: 'Total Conversations' },
                    { key: 'solved', header: 'Solved' },
                    { key: 'unsolved', header: 'Unsolved' },
                    { key: 'escalated', header: 'Escalated' },
                    { key: 'responseTime', header: 'Avg. Response Time' },
                    { key: 'status', header: 'Status' }
                  ]}
                  data={agentPerformanceData}
                  renderCell={(row, column) => {
                    if (column.key === 'solved') {
                      return <span style={{ color: '#10b981' }}>{row.solved}</span>;
                    } else if (column.key === 'unsolved') {
                      return <span style={{ color: '#f59e0b' }}>{row.unsolved}</span>;
                    } else if (column.key === 'escalated') {
                      return <span style={{ color: '#ef4444' }}>{row.escalated}</span>;
                    } else if (column.key === 'status') {
                      return (
                        <span style={{ 
                          ...styles.statusBadge, 
                          ...(row.status === 'Active' ? styles.statusActive : styles.statusAway) 
                        }}>
                          {row.status}
                        </span>
                      );
                    } else {
                      return row[column.key];
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default DashboardPage
