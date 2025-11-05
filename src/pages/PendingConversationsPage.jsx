import { useState, useMemo } from 'react'
import { Search, Clock, User, Calendar, MessageCircle } from 'lucide-react'
import ResponsiveTable from '../components/ResponsiveTable'
import ResponsivePagination from '../components/ResponsivePagination'

const PendingConversationsPage = () => {
  // Sample data for pending conversations with messages
  const [conversations] = useState([
    { 
      id: 1, 
      client: 'Robert Johnson', 
      agent: 'Jane Smith', 
      date: '2023-06-01', 
      messages: 8, 
      waitingTime: '25 mins',
      lastMessage: 'Awaiting client response',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hi, I have a question about my order #12345.', timestamp: '10:30 AM' },
        { id: 2, sender: 'agent', content: 'Hello Robert! I\'d be happy to help you with your order. What would you like to know?', timestamp: '10:32 AM' },
        { id: 3, sender: 'client', content: 'I want to know when it will be delivered. The tracking shows it\'s delayed.', timestamp: '10:33 AM' },
        { id: 4, sender: 'agent', content: 'Let me check the status of your order. I can see that there was a delay due to weather conditions, but it\'s now on its way.', timestamp: '10:35 AM' },
        { id: 5, sender: 'agent', content: 'You should receive it by tomorrow afternoon. I apologize for the inconvenience.', timestamp: '10:36 AM' },
        { id: 6, sender: 'client', content: 'Thank you for the update. I\'ll wait for it.', timestamp: '10:37 AM' },
        { id: 7, sender: 'agent', content: 'You\'re welcome! Is there anything else I can help you with?', timestamp: '10:38 AM' },
        { id: 8, sender: 'client', content: 'No, that\'s all for now. Thanks again!', timestamp: '10:39 AM' }
      ]
    },
    { 
      id: 2, 
      client: 'Sarah Williams', 
      agent: 'Bob Johnson', 
      date: '2023-06-01', 
      messages: 12, 
      waitingTime: '42 mins',
      lastMessage: 'Waiting for documentation',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hello, I\'m applying for a business loan and need some information.', timestamp: '09:15 AM' },
        { id: 2, sender: 'agent', content: 'Hi Sarah! I\'d be happy to help you with information about our business loans. What specifically would you like to know?', timestamp: '09:17 AM' },
        { id: 3, sender: 'client', content: 'I need to know what documentation is required for the application process.', timestamp: '09:18 AM' },
        { id: 4, sender: 'agent', content: 'For a business loan application, we typically require: 1) Business financial statements for the past 2 years, 2) Personal financial statements, 3) Business plan, 4) Tax returns, and 5) Legal documents.', timestamp: '09:20 AM' },
        { id: 5, sender: 'client', content: 'That\'s helpful. Do you have a checklist I can download?', timestamp: '09:22 AM' },
        { id: 6, sender: 'agent', content: 'Yes, I can email you our comprehensive checklist. Would you like me to send it to sarah.williams@email.com?', timestamp: '09:23 AM' },
        { id: 7, sender: 'client', content: 'Yes, please. Also, what\'s the minimum credit score required?', timestamp: '09:24 AM' },
        { id: 8, sender: 'agent', content: 'Our minimum credit score requirement is 680 for business loans. However, higher scores may qualify for better interest rates.', timestamp: '09:25 AM' },
        { id: 9, sender: 'client', content: 'I see. My score is 720, so that should be fine. When can I submit the application?', timestamp: '09:26 AM' },
        { id: 10, sender: 'agent', content: 'You can submit your application at any time through our online portal. I\'ll send you the checklist and a link to the application portal.', timestamp: '09:27 AM' },
        { id: 11, sender: 'client', content: 'Perfect. I\'ll wait for your email.', timestamp: '09:28 AM' },
        { id: 12, sender: 'agent', content: 'Great! I\'ll send it right away. Please let me know if you have any other questions.', timestamp: '09:29 AM' }
      ]
    },
    { 
      id: 3, 
      client: 'Thomas Brown', 
      agent: 'Alice Williams', 
      date: '2023-05-31', 
      messages: 6, 
      waitingTime: '18 mins',
      lastMessage: 'Awaiting payment confirmation',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hi, I\'ve sent a payment for my invoice #7890, but it\'s not showing in your system.', timestamp: '11:30 AM' },
        { id: 2, sender: 'agent', content: 'Hello Thomas! Let me check our system for your payment. Can you confirm the date and amount you sent?', timestamp: '11:32 AM' },
        { id: 3, sender: 'client', content: 'I sent $1,250.00 on May 30th via bank transfer.', timestamp: '11:33 AM' },
        { id: 4, sender: 'agent', content: 'Thank you for that information. I can see the payment was initiated but not yet cleared in our system.', timestamp: '11:35 AM' },
        { id: 5, sender: 'agent', content: 'Bank transfers can take 1-3 business days to process. I\'ll mark this as pending and check again tomorrow.', timestamp: '11:36 AM' },
        { id: 6, sender: 'client', content: 'Okay, thank you. I\'ll wait for confirmation.', timestamp: '11:37 AM' }
      ]
    },
    { 
      id: 4, 
      client: 'Emily Davis', 
      agent: 'John Doe', 
      date: '2023-05-31', 
      messages: 15, 
      waitingTime: '1 hour 5 mins',
      lastMessage: 'Waiting for technical details',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hello, I\'m interested in your enterprise software solution.', timestamp: '08:30 AM' },
        { id: 2, sender: 'agent', content: 'Hi Emily! I\'d be happy to provide information about our enterprise software. What specific needs does your business have?', timestamp: '08:32 AM' },
        { id: 3, sender: 'client', content: 'We need a solution for customer relationship management and analytics.', timestamp: '08:33 AM' },
        { id: 4, sender: 'agent', content: 'Our enterprise CRM solution includes advanced analytics, automation tools, and integration capabilities. Would you like me to schedule a demo?', timestamp: '08:35 AM' },
        { id: 5, sender: 'client', content: 'Yes, that would be great. When is the next available slot?', timestamp: '08:36 AM' },
        { id: 6, sender: 'agent', content: 'I can schedule a demo for tomorrow at 2 PM or Thursday at 10 AM. Which works better for you?', timestamp: '08:37 AM' },
        { id: 7, sender: 'client', content: 'Tomorrow at 2 PM works for me.', timestamp: '08:38 AM' },
        { id: 8, sender: 'agent', content: 'Perfect! I\'ve scheduled the demo for tomorrow at 2 PM. What technical specifications should I prepare for the demo?', timestamp: '08:39 AM' },
        { id: 9, sender: 'client', content: 'We\'re currently using Windows servers and have about 200 users. We also use Salesforce for our current CRM.', timestamp: '08:40 AM' },
        { id: 10, sender: 'agent', content: 'Thank you for that information. I\'ll make sure our technical team prepares a demo that addresses your specific environment and integration needs.', timestamp: '08:42 AM' },
        { id: 11, sender: 'client', content: 'That sounds good. Will the demo be in person or virtual?', timestamp: '08:43 AM' },
        { id: 12, sender: 'agent', content: 'Given the current circumstances, we\'re conducting all demos virtually via our secure meeting platform.', timestamp: '08:44 AM' },
        { id: 13, sender: 'client', content: 'Perfect. What information do you need from me to set up the virtual meeting?', timestamp: '08:45 AM' },
        { id: 14, sender: 'agent', content: 'I\'ll send you a calendar invitation with the meeting link. You\'ll just need a computer with a webcam and stable internet connection.', timestamp: '08:46 AM' },
        { id: 15, sender: 'client', content: 'Great! I look forward to it.', timestamp: '08:47 AM' }
      ]
    },
    { 
      id: 5, 
      client: 'James Wilson', 
      agent: 'Jane Smith', 
      date: '2023-05-30', 
      messages: 9, 
      waitingTime: '32 mins',
      lastMessage: 'Awaiting approval',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hi, I submitted a request for a new service plan yesterday. Any updates?', timestamp: '10:30 AM' },
        { id: 2, sender: 'agent', content: 'Hello James! Let me check the status of your service plan request. Can you confirm your account number?', timestamp: '10:32 AM' },
        { id: 3, sender: 'client', content: 'It\'s account #456789.', timestamp: '10:33 AM' },
        { id: 4, sender: 'agent', content: 'Thank you. I can see your request is currently under review by our service planning team.', timestamp: '10:35 AM' },
        { id: 5, sender: 'agent', content: 'The review process typically takes 1-2 business days. You should receive an update by tomorrow.', timestamp: '10:36 AM' },
        { id: 6, sender: 'client', content: 'Thank you. I\'m looking forward to the upgrade.', timestamp: '10:37 AM' },
        { id: 7, sender: 'agent', content: 'You\'re welcome! I\'ll follow up with you tomorrow with an update on your request.', timestamp: '10:38 AM' },
        { id: 8, sender: 'client', content: 'That would be great.', timestamp: '10:39 AM' },
        { id: 9, sender: 'agent', content: 'Is there anything else I can assist you with today?', timestamp: '10:40 AM' }
      ]
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const itemsPerPage = 5

  // Handle show conversation button click
  const handleShowConversation = (conversation) => {
    setSelectedConversation(conversation)
    setShowChatModal(true)
  }

  // Filter conversations based on search term
  const filteredConversations = useMemo(() => {
    if (!searchTerm) return conversations
    
    const term = searchTerm.toLowerCase()
    return conversations.filter(conversation => 
      conversation.client.toLowerCase().includes(term) ||
      conversation.agent.toLowerCase().includes(term) ||
      conversation.lastMessage.toLowerCase().includes(term)
    )
  }, [conversations, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredConversations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentConversations = filteredConversations.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const styles = {
    page: {
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      padding: '1rem 0'
    },
    pageTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    searchContainer: {
      position: 'relative',
      marginBottom: '1rem',
      maxWidth: '300px'
    },
    searchInput: {
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      outline: 'none',
      fontSize: '0.875rem'
    },
    searchInputFocus: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280',
      height: '1rem',
      width: '1rem'
    },
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    },
    statusBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500',
      backgroundColor: '#fffbeb',
      color: '#92400e',
      border: '1px solid #f59e0b'
    },
    showButton: {
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      color: '#10b981',
      fontWeight: '500',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.8125rem'
    },
    showButtonHover: {
      backgroundColor: 'rgba(16, 185, 129, 0.2)'
    },
    // Modal styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '90%',
      maxWidth: '60rem',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #e5e7eb',
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      margin: 0,
    },
    modalCloseButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalCloseButtonHover: {
      color: '#111827',
      backgroundColor: '#f3f4f6',
    }
  }

  // Responsive styles
  const mediaStyles = `
    @media (max-width: 768px) {
      .page {
        padding: 0.75rem;
      }
      
      .pageTitle {
        font-size: 1.125rem;
      }
      
      .searchContainer {
        max-width: 100%;
        margin-bottom: 0.75rem;
      }
      
      .modal-body-mobile {
        flex-direction: column !important;
        overflow: auto !important;
      }
      
      .details-panel-mobile {
        width: 100% !important;
        border-right: none !important;
        border-bottom: 1px solid #e5e7eb !important;
        overflow-y: auto !important;
      }
      
      .chat-panel-mobile {
        width: 100% !important;
        overflow-y: auto !important;
      }
      
      .modalContainer {
        margin: 1rem;
        max-width: calc(100% - 2rem);
        flex-direction: column;
        overflow: auto;
      }
    }
    
    @media (max-width: 480px) {
      .page {
        padding: 0.5rem;
      }
      
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        padding: 0.75rem 0;
      }
      
      .modalContainer {
        width: 95%;
        height: 95vh;
        overflow: auto;
      }
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>
          <Clock style={{ height: '1.5rem', width: '1.5rem', color: '#f59e0b' }} />
          Pending Conversations
        </h1>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
          onFocus={(e) => {
            e.target.style.borderColor = styles.searchInputFocus.borderColor;
            e.target.style.boxShadow = styles.searchInputFocus.boxShadow;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '';
            e.target.style.boxShadow = '';
          }}
        />
      </div>

      <div style={styles.tableContainer}>
        <ResponsiveTable
          columns={[
            { key: 'client', header: 'Client', isPrimary: true },
            { key: 'agent', header: 'Agent' },
            { key: 'date', header: 'Date' },
            { key: 'messages', header: 'Messages' },
            { key: 'waitingTime', header: 'Waiting Time' },
            { key: 'lastMessage', header: 'Last Message' },
            { key: 'status', header: 'Status' },
            { key: 'actions', header: 'Actions', sortable: false }
          ]}
          data={currentConversations.map(conversation => ({
            id: conversation.id,
            client: conversation.client,
            agent: conversation.agent,
            date: conversation.date,
            messages: conversation.messages,
            waitingTime: conversation.waitingTime,
            lastMessage: conversation.lastMessage,
            status: 'Pending',
            conversation: conversation
          }))}
          renderCell={(row, column) => {
            switch (column.key) {
              case 'client':
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <User style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                    {row.client}
                  </div>
                );
              case 'agent':
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <User style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                    {row.agent}
                  </div>
                );
              case 'date':
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Calendar style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                    {row.date}
                  </div>
                );
              case 'messages':
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MessageCircle style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                    {row.messages}
                  </div>
                );
              case 'status':
                return (
                  <span style={styles.statusBadge}>
                    <Clock style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                    {row.status}
                  </span>
                );
              case 'actions':
                return (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowConversation(row.conversation);
                    }}
                    style={styles.showButton}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = styles.showButtonHover.backgroundColor;
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                      e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                    }}
                  >
                    <MessageCircle style={{ height: '1rem', width: '1rem' }} />
                    Show
                  </button>
                );
              default:
                return row[column.key];
            }
          }}
        />

        <ResponsivePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredConversations.length}
          showInfo={true}
          showNavigation={true}
        />
      </div>

      {/* Chat View Modal */}
      {showChatModal && selectedConversation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                Conversation with {selectedConversation.client}
              </h3>
              <button 
                onClick={() => setShowChatModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.color = styles.modalCloseButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.modalCloseButton.color}
              >
                <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div style={{
              display: 'flex',
              height: '70vh',
              backgroundColor: '#f0f9ff'
            }} className="modal-body-mobile">
              {/* Client Info Panel */}
              <div style={{
                width: '30%',
                borderRight: '1px solid #e5e7eb',
                padding: '1rem',
                backgroundColor: '#ffffff',
                overflowY: 'auto'
              }} className="details-panel-mobile">
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#10b981',
                  marginBottom: '1rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid #10b981',
                  textAlign: 'center'
                }}>
                  Conversation Details
                </h4>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#10b981',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em'
                  }}>
                    Client Information
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Client Name
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.client}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Agent
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.agent}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Date
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.date}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#10b981',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em'
                  }}>
                    Conversation Metrics
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Messages
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.messages}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Waiting Time
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.waitingTime}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h5 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#10b981',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em'
                  }}>
                    Status
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Current Status
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        <span style={styles.statusBadge}>
                          <Clock style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                          Pending
                        </span>
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Last Message
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.lastMessage}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat Panel */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f0f9ff',
                overflowY: 'auto'
              }} className="chat-panel-mobile">
                {/* Chat Header */}
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      flexShrink: '0',
                      height: '2.5rem',
                      width: '2.5rem',
                      borderRadius: '9999px',
                      backgroundColor: '#d1fae5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{
                        color: '#065f46',
                        fontWeight: '600'
                      }}>
                        {selectedConversation.client.charAt(0)}
                      </span>
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#111827'
                      }}>
                        {selectedConversation.client}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        Pending Conversation
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Messages Container */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1rem',
                  backgroundColor: '#f0f9ff'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {selectedConversation.conversationMessages && selectedConversation.conversationMessages.map((message) => (
                      <div 
                        key={message.id} 
                        style={{
                          display: 'flex',
                          justifyContent: message.sender === 'agent' ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <div style={{
                          maxWidth: '70%',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          borderRadius: '1rem',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          backgroundColor: message.sender === 'agent' ? '#10b981' : '#ffffff',
                          color: message.sender === 'agent' ? '#ffffff' : '#1f2937',
                          borderBottomLeftRadius: message.sender === 'client' ? '0.25rem' : undefined,
                          borderBottomRightRadius: message.sender === 'agent' ? '0.25rem' : undefined
                        }}>
                          <p style={{ marginBottom: '0.25rem' }}>{message.content}</p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: message.sender === 'agent' ? '#d1fae5' : '#9ca3af',
                            textAlign: message.sender === 'agent' ? 'right' : 'left'
                          }}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Status Banner */}
                <div style={{
                  padding: '0.75rem',
                  backgroundColor: '#fffbeb',
                  color: '#92400e',
                  textAlign: 'center',
                  fontWeight: '500',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  This conversation is currently pending
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PendingConversationsPage