import { useState, useMemo } from 'react'
import { Search, CheckCircle, User, Calendar, MessageCircle } from 'lucide-react'
import ResponsiveTable from '../components/ResponsiveTable'
import ResponsivePagination from '../components/ResponsivePagination'

const SolvedConversationsPage = () => {
  // Sample data for solved conversations with messages
  const [conversations] = useState([
    { 
      id: 1, 
      client: 'John Doe', 
      agent: 'Jane Smith', 
      date: '2023-06-01', 
      messages: 12, 
      resolutionTime: '15 mins',
      outcome: 'Issue resolved',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hello, I\'m having trouble with my account login.', timestamp: '10:30 AM' },
        { id: 2, sender: 'agent', content: 'Hi John, I\'d be happy to help you with that. Can you tell me what error message you\'re seeing?', timestamp: '10:32 AM' },
        { id: 3, sender: 'client', content: 'It says "Invalid credentials" but I\'m sure I\'m using the right password.', timestamp: '10:33 AM' },
        { id: 4, sender: 'agent', content: 'Let me check your account. It looks like your account was temporarily locked due to multiple failed login attempts. I\'ve unlocked it now. Can you try logging in again?', timestamp: '10:35 AM' },
        { id: 5, sender: 'client', content: 'Yes, it\'s working now. Thank you so much!', timestamp: '10:36 AM' },
        { id: 6, sender: 'agent', content: 'You\'re welcome! For future reference, if you have trouble remembering your password, you can use the "Forgot Password" feature to reset it.', timestamp: '10:37 AM' },
        { id: 7, sender: 'client', content: 'That\'s helpful. I\'ll keep that in mind.', timestamp: '10:38 AM' },
        { id: 8, sender: 'agent', content: 'Great! Is there anything else I can help you with today?', timestamp: '10:39 AM' },
        { id: 9, sender: 'client', content: 'No, that was the only issue. Thanks again!', timestamp: '10:40 AM' },
        { id: 10, sender: 'agent', content: 'You\'re welcome. Have a great day!', timestamp: '10:41 AM' },
        { id: 11, sender: 'client', content: 'You too!', timestamp: '10:42 AM' },
        { id: 12, sender: 'agent', content: 'This conversation has been marked as solved.', timestamp: '10:45 AM' }
      ]
    },
    { 
      id: 2, 
      client: 'Alice Johnson', 
      agent: 'Bob Johnson', 
      date: '2023-06-01', 
      messages: 8, 
      resolutionTime: '10 mins',
      outcome: 'Product inquiry answered',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hi, I\'m interested in your premium package. What features does it include?', timestamp: '09:15 AM' },
        { id: 2, sender: 'agent', content: 'Hello Alice! Our premium package includes advanced analytics, priority support, custom reporting, and API access. Would you like me to go over each feature in detail?', timestamp: '09:17 AM' },
        { id: 3, sender: 'client', content: 'Yes, please tell me more about the analytics feature.', timestamp: '09:18 AM' },
        { id: 4, sender: 'agent', content: 'Our advanced analytics provide real-time insights into your data with customizable dashboards, trend analysis, and predictive modeling. You can create custom reports and schedule automated delivery.', timestamp: '09:20 AM' },
        { id: 5, sender: 'client', content: 'That sounds great. How much does it cost?', timestamp: '09:22 AM' },
        { id: 6, sender: 'agent', content: 'The premium package is $99/month, but we\'re currently offering a 20% discount for new customers. That would bring it down to $79.20/month.', timestamp: '09:23 AM' },
        { id: 7, sender: 'client', content: 'I\'ll think about it and get back to you. Thanks for the information!', timestamp: '09:24 AM' },
        { id: 8, sender: 'agent', content: 'You\'re welcome! Feel free to reach out if you have any other questions. I\'ll mark this as solved for now.', timestamp: '09:25 AM' }
      ]
    },
    { 
      id: 3, 
      client: 'Michael Brown', 
      agent: 'Alice Williams', 
      date: '2023-05-31', 
      messages: 15, 
      resolutionTime: '22 mins',
      outcome: 'Technical support provided',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hello, I\'m having trouble connecting to your API.', timestamp: '14:30 PM' },
        { id: 2, sender: 'agent', content: 'Hi Michael, I\'m sorry to hear you\'re having issues with our API. Can you tell me what error message you\'re receiving?', timestamp: '14:32 PM' },
        { id: 3, sender: 'client', content: 'I\'m getting a 401 Unauthorized error.', timestamp: '14:33 PM' },
        { id: 4, sender: 'agent', content: 'That indicates an authentication issue. Have you checked that your API key is correct and properly formatted?', timestamp: '14:34 PM' },
        { id: 5, sender: 'client', content: 'Yes, I double-checked and it looks correct.', timestamp: '14:35 PM' },
        { id: 6, sender: 'agent', content: 'Let me check our system. It looks like your API key may have expired. I\'ll generate a new one for you.', timestamp: '14:37 PM' },
        { id: 7, sender: 'client', content: 'That would be great, thanks.', timestamp: '14:38 PM' },
        { id: 8, sender: 'agent', content: 'Here\'s your new API key: abc123xyz789. Please update your application with this key.', timestamp: '14:39 PM' },
        { id: 9, sender: 'client', content: 'I\'ve updated it. Let me test it now.', timestamp: '14:40 PM' },
        { id: 10, sender: 'client', content: 'It\'s working now! Thank you so much.', timestamp: '14:42 PM' },
        { id: 11, sender: 'agent', content: 'Great! I\'m glad we could resolve that quickly. Is there anything else I can help with?', timestamp: '14:43 PM' },
        { id: 12, sender: 'client', content: 'No, that was the only issue.', timestamp: '14:44 PM' },
        { id: 13, sender: 'agent', content: 'Perfect. Remember that API keys expire every 90 days for security reasons.', timestamp: '14:45 PM' },
        { id: 14, sender: 'client', content: 'Good to know. I\'ll make a note of that.', timestamp: '14:46 PM' },
        { id: 15, sender: 'agent', content: 'This conversation has been marked as solved.', timestamp: '14:52 PM' }
      ]
    },
    { 
      id: 4, 
      client: 'Carol Davis', 
      agent: 'John Doe', 
      date: '2023-05-31', 
      messages: 7, 
      resolutionTime: '8 mins',
      outcome: 'Billing question resolved',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hi, I was charged twice for my subscription this month.', timestamp: '11:20 AM' },
        { id: 2, sender: 'agent', content: 'Hello Carol, I\'m sorry to hear about the double charge. Let me look into that for you right away.', timestamp: '11:21 AM' },
        { id: 3, sender: 'agent', content: 'I can see the duplicate charge in our system. I\'ll process a refund for the extra amount immediately.', timestamp: '11:23 AM' },
        { id: 4, sender: 'client', content: 'Thank you! How long will it take to process?', timestamp: '11:24 AM' },
        { id: 5, sender: 'agent', content: 'The refund should appear in your account within 3-5 business days, depending on your bank.', timestamp: '11:25 AM' },
        { id: 6, sender: 'client', content: 'Perfect, I appreciate your quick response.', timestamp: '11:26 AM' },
        { id: 7, sender: 'agent', content: 'You\'re welcome! I apologize for the inconvenience. Is there anything else I can assist you with?', timestamp: '11:28 AM' }
      ]
    },
    { 
      id: 5, 
      client: 'David Wilson', 
      agent: 'Jane Smith', 
      date: '2023-05-30', 
      messages: 11, 
      resolutionTime: '18 mins',
      outcome: 'Service request fulfilled',
      conversationMessages: [
        { id: 1, sender: 'client', content: 'Hello, I\'d like to request a feature for your software.', timestamp: '16:45 PM' },
        { id: 2, sender: 'agent', content: 'Hi David! We\'re always interested in feedback. What feature would you like to see added?', timestamp: '16:46 PM' },
        { id: 3, sender: 'client', content: 'It would be great if you could add a dark mode option.', timestamp: '16:47 PM' },
        { id: 4, sender: 'agent', content: 'That\'s a great suggestion! Many users have requested that feature. I\'ll add it to our development roadmap.', timestamp: '16:49 PM' },
        { id: 5, sender: 'client', content: 'Wonderful! Do you have an estimated timeline for when it might be available?', timestamp: '16:50 PM' },
        { id: 6, sender: 'agent', content: 'We\'re planning to implement it in our next major release, which is scheduled for Q3 of this year.', timestamp: '16:52 PM' },
        { id: 7, sender: 'client', content: 'That\'s perfect. I\'ll look forward to it.', timestamp: '16:53 PM' },
        { id: 8, sender: 'agent', content: 'Great! I\'ll make sure to update you when it\'s available. Is there anything else you\'d like to see in the platform?', timestamp: '16:54 PM' },
        { id: 9, sender: 'client', content: 'Not at the moment. Thanks for considering the request!', timestamp: '16:55 PM' },
        { id: 10, sender: 'agent', content: 'You\'re welcome! Your feedback helps us make our product better for everyone.', timestamp: '16:56 PM' },
        { id: 11, sender: 'agent', content: 'This conversation has been marked as solved.', timestamp: '17:03 PM' }
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
      conversation.outcome.toLowerCase().includes(term)
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

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

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
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1px solid #10b981'
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
          <CheckCircle style={{ height: '1.5rem', width: '1.5rem', color: '#10b981' }} />
          Solved Conversations
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
            { key: 'resolutionTime', header: 'Resolution Time' },
            { key: 'outcome', header: 'Outcome' },
            { key: 'status', header: 'Status' },
            { key: 'actions', header: 'Actions', sortable: false }
          ]}
          data={currentConversations.map(conversation => ({
            id: conversation.id,
            client: conversation.client,
            agent: conversation.agent,
            date: conversation.date,
            messages: conversation.messages,
            resolutionTime: conversation.resolutionTime,
            outcome: conversation.outcome,
            status: 'Solved',
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
                    <CheckCircle style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
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
          <div style={{...styles.modalContainer, maxWidth: '60rem'}}>
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
                        Resolution Time
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.resolutionTime}
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
                          <CheckCircle style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                          Solved
                        </span>
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Outcome
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedConversation.outcome}
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
                backgroundColor: '#f0f9ff'
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
                        Solved Conversation
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
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  textAlign: 'center',
                  fontWeight: '500',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  This conversation has been marked as solved
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default SolvedConversationsPage
