import { useState, useMemo } from 'react'
import { MessageCircle, CheckCircle, Clock, AlertCircle, Search } from 'lucide-react'
import ResponsiveTable from '../components/ResponsiveTable'
import ResponsivePagination from '../components/ResponsivePagination'

const ShiftLogPage = () => {
  // Sample data for shift logs
  const [shiftLogs] = useState([
    {
      id: 1,
      shiftId: 1,
      shiftName: 'Morning Shift',
      date: '2023-06-01',
      startTime: '08:00',
      endTime: '16:00',
      assignedUsers: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ],
      conversations: [
        { id: 101, client: 'Alice Johnson', status: 'solved', messages: 12 },
        { id: 102, client: 'Bob Wilson', status: 'pending', messages: 8 },
        { id: 103, client: 'Carol Davis', status: 'escalated', messages: 15 }
      ]
    },
    {
      id: 2,
      shiftId: 2,
      shiftName: 'Evening Shift',
      date: '2023-06-01',
      startTime: '16:00',
      endTime: '00:00',
      assignedUsers: [
        { id: 3, name: 'Bob Johnson' },
        { id: 4, name: 'Alice Williams' }
      ],
      conversations: [
        { id: 104, client: 'David Brown', status: 'solved', messages: 7 },
        { id: 105, client: 'Eva Miller', status: 'solved', messages: 11 },
        { id: 106, client: 'Frank Garcia', status: 'pending', messages: 5 }
      ]
    },
    {
      id: 3,
      shiftId: 3,
      shiftName: 'Night Shift',
      date: '2023-06-01',
      startTime: '00:00',
      endTime: '08:00',
      assignedUsers: [
        { id: 5, name: 'Michael Brown' }
      ],
      conversations: [
        { id: 107, client: 'Grace Lee', status: 'escalated', messages: 22 },
        { id: 108, client: 'Henry Taylor', status: 'solved', messages: 9 }
      ]
    }
  ])

  const [selectedLog, setSelectedLog] = useState(null)
  const [showConversationModal, setShowConversationModal] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  
  // Pagination and search states
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const getStatusIcon = (status) => {
    switch (status) {
      case 'solved':
        return <CheckCircle style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
      case 'pending':
        return <Clock style={{ height: '1rem', width: '1rem', color: '#f59e0b' }} />
      case 'escalated':
        return <AlertCircle style={{ height: '1rem', width: '1rem', color: '#ef4444' }} />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'solved':
        return 'Solved'
      case 'pending':
        return 'Pending'
      case 'escalated':
        return 'Escalated'
      default:
        return status
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'solved':
        return {
          backgroundColor: '#d1fae5',
          color: '#065f46',
          border: '1px solid #10b981'
        }
      case 'pending':
        return {
          backgroundColor: '#fffbeb',
          color: '#92400e',
          border: '1px solid #f59e0b'
        }
      case 'escalated':
        return {
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #ef4444'
        }
      default:
        return {}
    }
  }

  const viewConversation = (conversation) => {
    setSelectedConversation(conversation)
    setShowConversationModal(true)
  }

  // Filter shift logs based on search term
  const filteredShiftLogs = useMemo(() => {
    if (!searchTerm) return shiftLogs
    
    const term = searchTerm.toLowerCase()
    return shiftLogs.filter(log => 
      log.shiftName.toLowerCase().includes(term) ||
      log.date.includes(term) ||
      log.assignedUsers.some(user => user.name.toLowerCase().includes(term)) ||
      log.conversations.some(conv => conv.client.toLowerCase().includes(term))
    )
  }, [shiftLogs, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredShiftLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentShiftLogs = filteredShiftLogs.slice(startIndex, endIndex)

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
      margin: 0
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
    filterContainer: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    filterSelect: {
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      outline: 'none'
    },
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
    },
    table: {
      minWidth: '100%',
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
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    },
    tableRowHover: {
      backgroundColor: '#f9fafb'
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
    userContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    userItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    userAvatar: {
      height: '1.5rem',
      width: '1.5rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    userAvatarText: {
      color: '#065f46',
      fontWeight: '600',
      fontSize: '0.75rem'
    },
    conversationContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    conversationItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      justifyContent: 'space-between',
      padding: '0.25rem 0'
    },
    conversationDetails: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flex: 1
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
      fontWeight: '500'
    },
    viewButton: {
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      cursor: 'pointer',
      color: '#10b981',
      display: 'flex',
      alignItems: 'center',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.375rem',
      fontSize: '0.8125rem',
      fontWeight: '500',
      whiteSpace: 'nowrap'
    },
    viewButtonHover: {
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: 'rgba(16, 185, 129, 0.5)'
    },
    // Enhanced modal styles
    modalOverlay: {
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '1000'
    },
    modalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '90%',
      maxWidth: '60rem',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    modalHeader: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827'
    },
    modalCloseButton: {
      color: '#9ca3af',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalCloseButtonHover: {
      color: '#111827',
      backgroundColor: '#f3f4f6'
    },
    modalBody: {
      display: 'flex',
      flex: '1',
      overflow: 'auto',
      flexDirection: 'row'
    },
    // Left panel for conversation details
    detailsPanel: {
      width: '30%',
      borderRight: '1px solid #e5e7eb',
      padding: '1rem',
      backgroundColor: '#ffffff',
      overflowY: 'auto'
    },
    detailsTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#10b981',
      marginBottom: '1rem',
      paddingBottom: '0.5rem',
      borderBottom: '1px solid #10b981',
      textAlign: 'center'
    },
    detailSection: {
      marginBottom: '1rem'
    },
    detailSectionTitle: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#10b981',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.025em'
    },
    detailItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      marginBottom: '0.75rem'
    },
    detailLabel: {
      fontSize: '0.75rem',
      color: '#6b7280',
      fontWeight: '500'
    },
    detailValue: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#111827'
    },
    // Right panel for chat
    chatPanel: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f9ff',
      overflowY: 'auto'
    },
    chatHeader: {
      padding: '1rem',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#ffffff'
    },
    clientInfo: {
      display: 'flex',
      alignItems: 'center'
    },
    clientAvatar: {
      flexShrink: '0',
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    clientAvatarText: {
      color: '#065f46',
      fontWeight: '600'
    },
    clientDetails: {
      marginLeft: '1rem'
    },
    clientName: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827'
    },
    clientStatus: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '1rem',
      backgroundColor: '#f0f9ff'
    },
    messageList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    messageItem: {
      display: 'flex',
      flexDirection: 'column'
    },
    messageRow: {
      display: 'flex',
      justifyContent: 'flex-start'
    },
    messageBubble: {
      maxWidth: '70%',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      borderRadius: '1rem',
      backgroundColor: '#ffffff',
      color: '#1f2937',
      borderBottomLeftRadius: '0.25rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    },
    agentMessageBubble: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderBottomLeftRadius: '1rem',
      borderBottomRightRadius: '0.25rem'
    },
    messageText: {
      marginBottom: '0.25rem'
    },
    messageTime: {
      fontSize: '0.75rem',
      color: '#9ca3af',
      textAlign: 'left'
    },
    agentMessageTime: {
      color: '#d1fae5',
      textAlign: 'right'
    },
    outcomeBanner: {
      padding: '0.75rem',
      textAlign: 'center',
      fontWeight: '500',
      borderTop: '1px solid #e5e7eb'
    },
    solvedBanner: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    pendingBanner: {
      backgroundColor: '#fffbeb',
      color: '#92400e'
    },
    escalatedBanner: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
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
    }
  }

  // Responsive styles
  const mediaStyles = `
    @media (max-width: 768px) {
      .page {
        padding: 0.75rem;
      }
      
      .tableContainer {
        overflow-x: auto;
      }
      
      .modalContainer {
        margin: 1rem;
        max-width: calc(100% - 2rem);
        flex-direction: column;
        overflow: auto;
      }
      
      .detailsPanel {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
      }
      
      .chatPanel {
        width: 100%;
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
      
      .pageTitle {
        font-size: 1.125rem;
      }
      
      .searchContainer {
        max-width: 100%;
        margin-bottom: 0.75rem;
      }
      
      .filterContainer {
        flex-direction: column;
      }
      
      .paginationContainer {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
      
      .conversation-item-mobile {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }
      
      .conversation-details-mobile {
        width: 100%;
        justify-content: space-between;
      }
      
      .status-badge-mobile {
        font-size: 0.625rem;
        padding-left: 0.375rem;
        padding-right: 0.375rem;
        padding-top: 0.125rem;
        padding-bottom: 0.125rem;
      }
      
      .view-button-mobile {
        font-size: 0.75rem;
        padding: 0.125rem 0.375rem;
        align-self: flex-end;
        margin-top: 0.25rem;
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
      
      .tableCell {
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 0.75rem;
      }
      
      .tableHeaderCell {
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 0.625rem;
      }
      
      .modalContainer {
        width: 95%;
        height: 95vh;
        overflow: auto;
      }
      
      .status-badge-mobile {
        font-size: 0.625rem;
      }
      
      .view-button-mobile {
        font-size: 0.6875rem;
        padding: 0.125rem 0.25rem;
      }
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Shift Log</h1>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search shift logs..."
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

      <div style={styles.filterContainer}>
        <select style={styles.filterSelect}>
          <option>All Shifts</option>
          <option>Morning Shift</option>
          <option>Evening Shift</option>
          <option>Night Shift</option>
        </select>
        <select style={styles.filterSelect}>
          <option>All Dates</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
        <select style={styles.filterSelect}>
          <option>All Users</option>
          <option>John Doe</option>
          <option>Jane Smith</option>
          <option>Bob Johnson</option>
        </select>
      </div>

      <div style={styles.tableContainer}>
        <ResponsiveTable
          columns={[
            { key: 'shift', header: 'Shift', isPrimary: true },
            { key: 'date', header: 'Date' },
            { key: 'assignedUsers', header: 'Assigned Users' },
            { key: 'conversations', header: 'Conversations' },
            { key: 'statusSummary', header: 'Status Summary' }
          ]}
          data={currentShiftLogs.map(log => ({
            id: log.id,
            shift: {
              name: log.shiftName,
              time: `${log.startTime} - ${log.endTime}`
            },
            date: log.date,
            assignedUsers: log.assignedUsers,
            conversations: log.conversations,
            statusSummary: log.conversations,
            log: log
          }))}
          onRowClick={(row) => setSelectedLog(row.log)}
          renderCell={(row, column) => {
            switch (column.key) {
              case 'shift':
                return (
                  <div>
                    <div style={{ fontWeight: '500' }}>
                      {row.shift.name}
                    </div>
                    <div style={{ ...styles.tableCellSecondary, fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {row.shift.time}
                    </div>
                  </div>
                );
              case 'date':
                return <span style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{row.date}</span>;
              case 'assignedUsers':
                return (
                  <div style={styles.userContainer}>
                    {row.assignedUsers.map(user => (
                      <div key={user.id} style={styles.userItem}>
                        <div style={styles.userAvatar}>
                          <span style={styles.userAvatarText}>
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <span>{user.name}</span>
                      </div>
                    ))}
                  </div>
                );
              case 'conversations':
                return (
                  <div style={styles.conversationContainer}>
                    {row.conversations.map(conversation => (
                      <div 
                        key={conversation.id} 
                        style={styles.conversationItem}
                        className="conversation-item conversation-item-mobile"
                      >
                        <div 
                          style={styles.conversationDetails}
                          className="conversation-details conversation-details-mobile"
                        >
                          <MessageCircle style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                          <span>{conversation.client}</span>
                          <span 
                            style={{ ...styles.statusBadge, ...getStatusStyle(conversation.status) }}
                            className="status-badge status-badge-mobile"
                          >
                            {getStatusIcon(conversation.status)}
                            <span style={{ marginLeft: '0.25rem' }}>
                              {getStatusText(conversation.status)}
                            </span>
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            viewConversation(conversation)
                          }}
                          style={styles.viewButton}
                          className="view-button view-button-mobile"
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = styles.viewButtonHover.backgroundColor
                            e.target.style.borderColor = styles.viewButtonHover.borderColor
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.1)'
                            e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)'
                          }}
                        >
                          <MessageCircle style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                );
              case 'statusSummary':
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle style={{ height: '1rem', width: '1rem', color: '#10b981' }} />
                      <span>{row.statusSummary.filter(c => c.status === 'solved').length} Solved</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock style={{ height: '1rem', width: '1rem', color: '#f59e0b' }} />
                      <span>{row.statusSummary.filter(c => c.status === 'pending').length} Pending</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle style={{ height: '1rem', width: '1rem', color: '#ef4444' }} />
                      <span>{row.statusSummary.filter(c => c.status === 'escalated').length} Escalated</span>
                    </div>
                  </div>
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
          totalItems={filteredShiftLogs.length}
          showInfo={true}
          showNavigation={true}
        />
      </div>

      {/* Enhanced Conversation Modal */}
      {showConversationModal && selectedConversation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                Conversation with {selectedConversation.client}
              </h3>
              <button 
                onClick={() => setShowConversationModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.color = styles.modalCloseButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.modalCloseButton.color}
              >
                <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div style={styles.modalBody} className="modal-body-mobile">
              {/* Left Panel - Conversation Details */}
              <div style={styles.detailsPanel} className="details-panel-mobile">
                <h4 style={styles.detailsTitle}>
                  Conversation Details
                </h4>
                
                <div style={styles.detailSection}>
                  <h5 style={styles.detailSectionTitle}>
                    Client Information
                  </h5>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>
                      Client Name
                    </div>
                    <div style={styles.detailValue}>
                      {selectedConversation.client}
                    </div>
                  </div>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>
                      Conversation ID
                    </div>
                    <div style={styles.detailValue}>
                      #{selectedConversation.id}
                    </div>
                  </div>
                </div>
                
                <div style={styles.detailSection}>
                  <h5 style={styles.detailSectionTitle}>
                    Conversation Metrics
                  </h5>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>
                      Messages
                    </div>
                    <div style={styles.detailValue}>
                      {selectedConversation.messages}
                    </div>
                  </div>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>
                      Status
                    </div>
                    <div style={styles.detailValue}>
                      <span style={{ ...styles.statusBadge, ...getStatusStyle(selectedConversation.status) }}>
                        {getStatusIcon(selectedConversation.status)}
                        <span style={{ marginLeft: '0.25rem' }}>
                          {getStatusText(selectedConversation.status)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={styles.detailSection}>
                  <h5 style={styles.detailSectionTitle}>
                    Agent Information
                  </h5>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>
                      Assigned Agent
                    </div>
                    <div style={styles.detailValue}>
                      John Doe
                    </div>
                  </div>
                  <div style={styles.detailItem}>
                    <div style={styles.detailLabel}>
                      Resolution Time
                    </div>
                    <div style={styles.detailValue}>
                      15 minutes
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Panel - Chat View */}
              <div style={styles.chatPanel} className="chat-panel-mobile">
                {/* Chat Header */}
                <div style={styles.chatHeader}>
                  <div style={styles.clientInfo}>
                    <div style={styles.clientAvatar}>
                      <span style={styles.clientAvatarText}>
                        {selectedConversation.client.charAt(0)}
                      </span>
                    </div>
                    <div style={styles.clientDetails}>
                      <h3 style={styles.clientName}>
                        {selectedConversation.client}
                      </h3>
                      <p style={styles.clientStatus}>
                        {getStatusText(selectedConversation.status)} Conversation
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Messages Container */}
                <div style={styles.messagesContainer}>
                  <div style={styles.messageList}>
                    {/* Sample messages - in a real app, these would come from the conversation data */}
                    <div style={styles.messageItem}>
                      <div style={styles.messageRow}>
                        <div style={styles.messageBubble}>
                          <p style={styles.messageText}>Hello, I have a question about my order.</p>
                          <p style={styles.messageTime}>10:25 AM</p>
                        </div>
                      </div>
                    </div>
                    <div style={styles.messageItem}>
                      <div style={{ ...styles.messageRow, justifyContent: 'flex-end' }}>
                        <div style={{ ...styles.messageBubble, ...styles.agentMessageBubble }}>
                          <p style={styles.messageText}>Sure, how can I help you?</p>
                          <p style={{ ...styles.messageTime, ...styles.agentMessageTime }}>10:26 AM</p>
                        </div>
                      </div>
                    </div>
                    <div style={styles.messageItem}>
                      <div style={styles.messageRow}>
                        <div style={styles.messageBubble}>
                          <p style={styles.messageText}>I want to know the status of my order #12345.</p>
                          <p style={styles.messageTime}>10:28 AM</p>
                        </div>
                      </div>
                    </div>
                    <div style={styles.messageItem}>
                      <div style={{ ...styles.messageRow, justifyContent: 'flex-end' }}>
                        <div style={{ ...styles.messageBubble, ...styles.agentMessageBubble }}>
                          <p style={styles.messageText}>Let me check that for you...</p>
                          <p style={{ ...styles.messageTime, ...styles.agentMessageTime }}>10:30 AM</p>
                        </div>
                      </div>
                    </div>
                    <div style={styles.messageItem}>
                      <div style={styles.messageRow}>
                        <div style={styles.messageBubble}>
                          <p style={styles.messageText}>Thank you, I appreciate your help.</p>
                          <p style={styles.messageTime}>10:32 AM</p>
                        </div>
                      </div>
                    </div>
                    <div style={styles.messageItem}>
                      <div style={{ ...styles.messageRow, justifyContent: 'flex-end' }}>
                        <div style={{ ...styles.messageBubble, ...styles.agentMessageBubble }}>
                          <p style={styles.messageText}>
                            Your order has been shipped and is expected to arrive on June 5th. 
                            Here's the tracking number: TRK123456789.
                          </p>
                          <p style={{ ...styles.messageTime, ...styles.agentMessageTime }}>10:35 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status Banner */}
                <div style={{ 
                  ...styles.outcomeBanner, 
                  ...(selectedConversation.status === 'solved' ? styles.solvedBanner : 
                       selectedConversation.status === 'pending' ? styles.pendingBanner : 
                       styles.escalatedBanner)
                }}>
                  This conversation is currently {getStatusText(selectedConversation.status).toLowerCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShiftLogPage