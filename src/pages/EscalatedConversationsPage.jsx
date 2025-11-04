import { useState, useMemo } from 'react'
import { Search, AlertCircle, User, Calendar, MessageCircle } from 'lucide-react'

const EscalatedConversationsPage = () => {
  // Sample data for escalated conversations
  const [conversations] = useState([
    { 
      id: 1, 
      client: 'Michael Thompson', 
      agent: 'Jane Smith', 
      date: '2023-06-01', 
      messages: 22, 
      escalationTime: '1 hour 15 mins',
      reason: 'Technical issue unresolved',
      priority: 'High'
    },
    { 
      id: 2, 
      client: 'Jennifer Lopez', 
      agent: 'Bob Johnson', 
      date: '2023-06-01', 
      messages: 18, 
      escalationTime: '45 mins',
      reason: 'Billing dispute',
      priority: 'Medium'
    },
    { 
      id: 3, 
      client: 'David Beckham', 
      agent: 'Alice Williams', 
      date: '2023-05-31', 
      messages: 25, 
      escalationTime: '2 hours 5 mins',
      reason: 'Service outage complaint',
      priority: 'High'
    },
    { 
      id: 4, 
      client: 'Sarah Connor', 
      agent: 'John Doe', 
      date: '2023-05-31', 
      messages: 14, 
      escalationTime: '32 mins',
      reason: 'Account security concern',
      priority: 'High'
    },
    { 
      id: 5, 
      client: 'Bruce Wayne', 
      agent: 'Jane Smith', 
      date: '2023-05-30', 
      messages: 19, 
      escalationTime: '1 hour 8 mins',
      reason: 'Product defect report',
      priority: 'Medium'
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
      conversation.reason.toLowerCase().includes(term) ||
      conversation.priority.toLowerCase().includes(term)
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
    tableWrapper: {
      overflowX: 'auto',
      maxWidth: '100%'
    },
    table: {
      minWidth: '900px',
      width: '100%',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      backgroundColor: '#f9fafb'
    },
    tableHeaderCell: {
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
    tableBody: {
      backgroundColor: '#ffffff'
    },
    tableRow: {
      backgroundColor: '#ffffff'
    },
    tableCell: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem',
      color: '#111827',
      borderBottom: '1px solid #e5e7eb'
    },
    tableCellSecondary: {
      color: '#6b7280'
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
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #ef4444'
    },
    priorityHigh: {
      color: '#ef4444',
      fontWeight: '600'
    },
    priorityMedium: {
      color: '#f59e0b',
      fontWeight: '600'
    },
    priorityLow: {
      color: '#10b981',
      fontWeight: '600'
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      borderTop: '1px solid #e5e7eb'
    },
    paginationInfo: {
      fontSize: '0.8125rem',
      color: '#6b7280'
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    paginationButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2rem',
      height: '2rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      backgroundColor: '#ffffff',
      color: '#374151',
      cursor: 'pointer',
      fontSize: '0.875rem'
    },
    paginationButtonHover: {
      backgroundColor: '#f9fafb'
    },
    paginationButtonDisabled: {
      opacity: '0.5',
      cursor: 'not-allowed'
    },
    paginationButtonActive: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderColor: '#10b981'
    },
    paginationButtonInactive: {
      backgroundColor: '#ffffff',
      color: '#10b981',
      borderColor: '#10b981',
      borderWidth: '1px',
      borderStyle: 'solid'
    },
    pageNumber: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2rem',
      height: '2rem',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      border: '1px solid transparent'
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
      maxWidth: '50rem',
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
      
      .tableWrapper {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      
      .table {
        min-width: 800px;
      }
      
      .pageTitle {
        font-size: 1.125rem;
      }
      
      .searchContainer {
        max-width: 100%;
        margin-bottom: 0.75rem;
      }
      
      .paginationContainer {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
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
      
      .table {
        min-width: 700px;
      }
      
      .tableCell {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        font-size: 0.75rem;
      }
      
      .tableHeaderCell {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        font-size: 0.625rem;
      }
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>
          <AlertCircle style={{ height: '1.5rem', width: '1.5rem', color: '#ef4444' }} />
          Escalated Conversations
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
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Client</th>
                <th style={styles.tableHeaderCell}>Agent</th>
                <th style={styles.tableHeaderCell}>Date</th>
                <th style={styles.tableHeaderCell}>Messages</th>
                <th style={styles.tableHeaderCell}>Escalation Time</th>
                <th style={styles.tableHeaderCell}>Reason</th>
                <th style={styles.tableHeaderCell}>Priority</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody}>
              {currentConversations.map((conversation) => (
                <tr key={conversation.id} style={styles.tableRow}>
                  <td style={{ ...styles.tableCell, fontWeight: '500' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <User style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                      {conversation.client}
                    </div>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <User style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                      {conversation.agent}
                    </div>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Calendar style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                      {conversation.date}
                    </div>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <MessageCircle style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                      {conversation.messages}
                    </div>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{conversation.escalationTime}</td>
                  <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{conversation.reason}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...(conversation.priority === 'High' ? styles.priorityHigh : 
                           conversation.priority === 'Medium' ? styles.priorityMedium : 
                           styles.priorityLow)
                    }}>
                      {conversation.priority}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <span style={styles.statusBadge}>
                      <AlertCircle style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                      Escalated
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => handleShowConversation(conversation)}
                      style={{
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
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
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
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.paginationContainer}>
            <div style={styles.paginationInfo}>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredConversations.length)} of {filteredConversations.length} conversations
            </div>
            <div style={styles.paginationControls}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.backgroundColor = styles.paginationButtonHover.backgroundColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.target.style.backgroundColor = styles.paginationButton.backgroundColor;
                  }
                }}
              >
                <svg style={{ height: '1rem', width: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {getPageNumbers().map((page, index) => (
                <div key={index}>
                  {page === '...' ? (
                    <span style={{ ...styles.pageNumber, cursor: 'default', color: '#9ca3af' }}>...</span>
                  ) : (
                    <button
                      onClick={() => setCurrentPage(page)}
                      style={{
                        ...styles.pageNumber,
                        ...(currentPage === page ? styles.paginationButtonActive : styles.paginationButtonInactive)
                      }}
                      onMouseEnter={(e) => {
                        if (currentPage !== page) {
                          e.target.style.backgroundColor = styles.paginationButtonHover.backgroundColor;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== page) {
                          e.target.style.backgroundColor = styles.paginationButtonInactive.backgroundColor;
                        }
                      }}
                    >
                      {page}
                    </button>
                  )}
                </div>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.backgroundColor = styles.paginationButtonHover.backgroundColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== totalPages) {
                    e.target.style.backgroundColor = styles.paginationButton.backgroundColor;
                  }
                }}
              >
                <svg style={{ height: '1rem', width: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
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
              }}>
                {/* Client Info Panel */}
                <div style={{
                  width: '30%',
                  borderRight: '1px solid #e5e7eb',
                  padding: '1rem',
                  backgroundColor: '#ffffff',
                  overflowY: 'auto'
                }}>
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
                          Escalation Time
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#111827',
                          marginTop: '0.125rem'
                        }}>
                          {selectedConversation.escalationTime}
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
                            <AlertCircle style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                            Escalated
                          </span>
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          fontWeight: '500'
                        }}>
                          Escalation Reason
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#111827',
                          marginTop: '0.125rem'
                        }}>
                          {selectedConversation.reason}
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          fontWeight: '500'
                        }}>
                          Priority
                        </div>
                        <div style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#111827',
                          marginTop: '0.125rem'
                        }}>
                          <span style={{
                            ...(selectedConversation.priority === 'High' ? styles.priorityHigh : 
                                 selectedConversation.priority === 'Medium' ? styles.priorityMedium : 
                                 styles.priorityLow)
                          }}>
                            {selectedConversation.priority}
                          </span>
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
                }}>
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
                          Escalated Conversation
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
                      {/* Sample messages - in a real app, these would come from the conversation data */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start'
                      }}>
                        <div style={{
                          maxWidth: '70%',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          borderRadius: '1rem',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          backgroundColor: '#ffffff',
                          color: '#1f2937',
                          borderBottomLeftRadius: '0.25rem'
                        }}>
                          <p style={{ marginBottom: '0.25rem' }}>Hello, I'm having an issue with my account that I can't resolve.</p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            textAlign: 'left'
                          }}>
                            10:30 AM
                          </p>
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}>
                        <div style={{
                          maxWidth: '70%',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          borderRadius: '1rem',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          backgroundColor: '#10b981',
                          color: '#ffffff',
                          borderBottomRightRadius: '0.25rem'
                        }}>
                          <p style={{ marginBottom: '0.25rem' }}>Hi there! I'm sorry to hear you're having trouble. Can you tell me more about the issue?</p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#d1fae5',
                            textAlign: 'right'
                          }}>
                            10:32 AM
                          </p>
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start'
                      }}>
                        <div style={{
                          maxWidth: '70%',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          borderRadius: '1rem',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          backgroundColor: '#ffffff',
                          color: '#1f2937',
                          borderBottomLeftRadius: '0.25rem'
                        }}>
                          <p style={{ marginBottom: '0.25rem' }}>I'm trying to update my payment method, but I keep getting an error message.</p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            textAlign: 'left'
                          }}>
                            10:35 AM
                          </p>
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                      }}>
                        <div style={{
                          maxWidth: '70%',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          borderRadius: '1rem',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          backgroundColor: '#10b981',
                          color: '#ffffff',
                          borderBottomRightRadius: '0.25rem'
                        }}>
                          <p style={{ marginBottom: '0.25rem' }}>
                            I understand. Let me try to help you with that. 
                            Unfortunately, I'm unable to resolve this issue from my end. 
                            I'll need to escalate this to our technical team.
                          </p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#d1fae5',
                            textAlign: 'right'
                          }}>
                            10:38 AM
                          </p>
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start'
                      }}>
                        <div style={{
                          maxWidth: '70%',
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          paddingTop: '0.75rem',
                          paddingBottom: '0.75rem',
                          borderRadius: '1rem',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                          backgroundColor: '#ffffff',
                          color: '#1f2937',
                          borderBottomLeftRadius: '0.25rem'
                        }}>
                          <p style={{ marginBottom: '0.25rem' }}>Thank you for your assistance. I appreciate it.</p>
                          <p style={{
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            textAlign: 'left'
                          }}>
                            10:40 AM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Banner */}
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    textAlign: 'center',
                    fontWeight: '500',
                    borderTop: '1px solid #e5e7eb'
                  }}>
                    This conversation has been escalated
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default EscalatedConversationsPage