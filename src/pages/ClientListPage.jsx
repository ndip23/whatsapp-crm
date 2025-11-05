import { useState, useMemo } from 'react'
import { Search, User, Calendar, MessageCircle, CheckCircle, Clock, AlertCircle, Plus, Edit } from 'lucide-react'
import { showToast } from '../utils/toast'
import ResponsiveTable from '../components/ResponsiveTable'
import ResponsivePagination from '../components/ResponsivePagination'

const ClientListPage = () => {
  // Sample data for clients
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      phone: '+1 234 567 8900', 
      country: 'USA', 
      assigned: true,
      assignedUser: 'Jane Smith',
      assignmentDate: '2023-06-01',
      conversationStatus: 'solved',
      tags: ['New Lead', 'VIP'] 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      phone: '+44 123 456 7890', 
      country: 'UK', 
      assigned: true,
      assignedUser: 'John Doe',
      assignmentDate: '2023-05-28',
      conversationStatus: 'pending',
      tags: ['Closed Sale'] 
    },
    { 
      id: 3, 
      name: 'Bob Johnson', 
      phone: '+61 234 567 890', 
      country: 'Australia', 
      assigned: false,
      assignedUser: null,
      assignmentDate: null,
      conversationStatus: null,
      tags: ['New Lead'] 
    },
    { 
      id: 4, 
      name: 'Alice Brown', 
      phone: '+1 987 654 3210', 
      country: 'Canada', 
      assigned: true,
      assignedUser: 'Bob Johnson',
      assignmentDate: '2023-06-02',
      conversationStatus: 'escalated',
      tags: ['VIP', 'Follow Up'] 
    },
    { 
      id: 5, 
      name: 'Charlie Wilson', 
      phone: '+49 123 456 789', 
      country: 'Germany', 
      assigned: false,
      assignedUser: null,
      assignmentDate: null,
      conversationStatus: null,
      tags: [] 
    },
  ])

  // Sample data for users (from current shifts)
  const [users] = useState([
    { id: 1, name: 'John Doe', role: 'Agent' },
    { id: 2, name: 'Jane Smith', role: 'Agent' },
    { id: 3, name: 'Bob Johnson', role: 'Agent' },
    { id: 4, name: 'Alice Williams', role: 'Agent' },
    { id: 5, name: 'Michael Brown', role: 'Supervisor' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedUser, setSelectedUser] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Handle assign button click
  const handleAssignClick = (client) => {
    setSelectedClient(client)
    setSelectedUser(client.assignedUser || '')
    setShowAssignModal(true)
  }

  // Handle re-assign button click
  const handleReassignClick = (client) => {
    setSelectedClient(client)
    setSelectedUser(client.assignedUser || '')
    setShowAssignModal(true)
  }

  // Handle assignment submission
  const handleAssignSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedUser) {
      showToast('Please select a user', 'error')
      return
    }
    
    setClients(clients.map(client => {
      if (client.id === selectedClient.id) {
        const user = users.find(u => u.name === selectedUser)
        return {
          ...client,
          assigned: true,
          assignedUser: selectedUser,
          assignmentDate: new Date().toISOString().split('T')[0],
          conversationStatus: client.conversationStatus || 'pending'
        }
      }
      return client
    }))
    
    showToast('Client assigned successfully', 'success')
    setShowAssignModal(false)
  }

  // Get status icon
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

  // Get status text
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

  // Get status style
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

  // Filter clients based on search term
  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients
    
    const term = searchTerm.toLowerCase()
    return clients.filter(client => 
      client.name.toLowerCase().includes(term) ||
      client.phone.includes(term) ||
      client.country.toLowerCase().includes(term) ||
      (client.assignedUser && client.assignedUser.toLowerCase().includes(term))
    )
  }, [clients, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

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
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      border: '1px solid #e5e7eb'
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
      fontWeight: '500'
    },
    assignButton: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      fontWeight: '500',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.8125rem'
    },
    assignButtonHover: {
      backgroundColor: '#059669'
    },
    reassignButton: {
      backgroundColor: '#f59e0b',
      color: '#ffffff',
      fontWeight: '500',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.8125rem'
    },
    reassignButtonHover: {
      backgroundColor: '#d97706'
    },
    modalOverlay: {
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '50'
    },
    modalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '100%',
      maxWidth: '28rem'
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
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#111827'
    },
    modalCloseButton: {
      color: '#9ca3af',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    modalCloseButtonHover: {
      color: '#6b7280'
    },
    modalForm: {
      padding: '1.5rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    formLabel: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '0.25rem'
    },
    formSelect: {
      display: 'block',
      width: '100%',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      outline: 'none'
    },
    formSelectFocus: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
    },
    modalFooter: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      backgroundColor: '#f9fafb',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.75rem'
    },
    cancelButton: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    },
    cancelButtonHover: {
      backgroundColor: '#f9fafb'
    },
    saveButton: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#ffffff',
      backgroundColor: '#10b981',
      border: 'none',
      cursor: 'pointer'
    },
    saveButtonHover: {
      backgroundColor: '#059669'
    }
  }

  // Responsive styles
  const mediaStyles = `
    @media (max-width: 768px) {
      .page {
        padding: 0.75rem;
      }
      
      .modalContainer {
        margin: 1rem;
        max-width: calc(100% - 2rem);
      }
      
      .pageTitle {
        font-size: 1.125rem;
      }
      
      .searchContainer {
        max-width: 100%;
        margin-bottom: 0.75rem;
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
    }
  `

  // Handle view conversation button click
  const handleViewConversation = (client) => {
    setSelectedClient(client)
    setShowChatModal(true)
  }

  // Render cell content for the table
  const renderCellContent = (row, column) => {
    switch (column.key) {
      case 'name':
        return row.name;
      case 'phone':
        return <span style={styles.tableCellSecondary}>{row.phone}</span>;
      case 'country':
        return <span style={styles.tableCellSecondary}>{row.country}</span>;
      case 'assignmentStatus':
        return row.assigned ? (
          <span style={{ color: '#10b981', fontWeight: '500' }}>Assigned</span>
        ) : (
          <span style={{ color: '#ef4444', fontWeight: '500' }}>Unassigned</span>
        );
      case 'assignedUser':
        return <span style={styles.tableCellSecondary}>{row.assigned ? row.assignedUser : '-'}</span>;
      case 'assignmentDate':
        return <span style={styles.tableCellSecondary}>{row.assignmentDate || '-'}</span>;
      case 'conversationStatus':
        return row.conversationStatus ? (
          <span style={{ ...styles.statusBadge, ...getStatusStyle(row.conversationStatus) }}>
            {getStatusIcon(row.conversationStatus)}
            <span style={{ marginLeft: '0.25rem' }}>
              {getStatusText(row.conversationStatus)}
            </span>
          </span>
        ) : (
          '-'
        );
      case 'actions':
        if (row.assigned) {
          if (row.conversationStatus === 'solved') {
            return (
              <button
                onClick={() => handleViewConversation(row.client)}
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
                <span>View</span>
              </button>
            );
          } else {
            return (
              <button
                onClick={() => handleReassignClick(row.client)}
                style={styles.reassignButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.reassignButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.reassignButton.backgroundColor}
              >
                <Edit style={{ height: '1rem', width: '1rem' }} />
                <span>Re-assign</span>
              </button>
            );
          }
        } else {
          return (
            <button
              onClick={() => handleAssignClick(row.client)}
              style={styles.assignButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.assignButtonHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.assignButton.backgroundColor}
            >
              <User style={{ height: '1rem', width: '1rem' }} />
              <span>Assign</span>
            </button>
          );
        }
      default:
        return row[column.key];
    }
  };

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Client List</h1>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search clients..."
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
            { key: 'name', header: 'Client Name', isPrimary: true },
            { key: 'phone', header: 'Phone' },
            { key: 'country', header: 'Country' },
            { key: 'assignmentStatus', header: 'Assignment Status' },
            { key: 'assignedUser', header: 'Assigned User' },
            { key: 'assignmentDate', header: 'Assignment Date' },
            { key: 'conversationStatus', header: 'Conversation Status' },
            { key: 'actions', header: 'Actions', sortable: false }
          ]}
          data={currentClients.map(client => ({
            id: client.id,
            name: client.name,
            phone: client.phone,
            country: client.country,
            assignmentStatus: client.assigned,
            assignedUser: client.assignedUser,
            assignmentDate: client.assignmentDate,
            conversationStatus: client.conversationStatus,
            client: client
          }))}
          renderCell={(row, column) => renderCellContent(row, column)}
        />

        <ResponsivePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredClients.length}
          showInfo={true}
          showNavigation={true}
        />
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {selectedClient?.assigned ? 'Re-assign Client' : 'Assign Client'}
              </h3>
              <button 
                onClick={() => setShowAssignModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.color = styles.modalCloseButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.modalCloseButton.color}
              >
                <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAssignSubmit} style={styles.modalForm}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Client
                </label>
                <div style={{ ...styles.tableCell, fontWeight: '500', padding: '0.5rem 0' }}>
                  {selectedClient?.name}
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Select User
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  style={styles.formSelect}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.formSelectFocus.borderColor;
                    e.target.style.boxShadow = styles.formSelectFocus.boxShadow;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '';
                    e.target.style.boxShadow = '';
                  }}
                  required
                >
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.name}>
                      {user.name} ({user.role})
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  style={styles.cancelButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = styles.cancelButton.backgroundColor}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.saveButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = styles.saveButton.backgroundColor}
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chat View Modal */}
      {showChatModal && selectedClient && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modalContainer, maxWidth: '60rem'}}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                Conversation with {selectedClient.name}
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
                  Client Information
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
                    Client Details
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Name
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedClient.name}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Phone Number
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedClient.phone}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Country
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedClient.country}
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
                    Assignment Details
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Assigned User
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedClient.assignedUser}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Assignment Date
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        {selectedClient.assignmentDate}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Status
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#111827',
                        marginTop: '0.125rem'
                      }}>
                        <span style={{ 
                          ...styles.statusBadge, 
                          ...getStatusStyle(selectedClient.conversationStatus) 
                        }}>
                          {getStatusIcon(selectedClient.conversationStatus)}
                          <span style={{ marginLeft: '0.25rem' }}>
                            {getStatusText(selectedClient.conversationStatus)}
                          </span>
                        </span>
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
                    Tags
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedClient.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          paddingLeft: '0.75rem',
                          paddingRight: '0.75rem',
                          paddingTop: '0.25rem',
                          paddingBottom: '0.25rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: tag === 'VIP' ? '#ede9fe' : '#dbeafe',
                          color: tag === 'VIP' ? '#5b21b6' : '#1e40af'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
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
                        {selectedClient.name.charAt(0)}
                      </span>
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#111827'
                      }}>
                        {selectedClient.name}
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
                        <p style={{ marginBottom: '0.25rem' }}>Hello, I'm interested in your product. Can you tell me more about it?</p>
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
                        <p style={{ marginBottom: '0.25rem' }}>Hi there! I'd be happy to help you with information about our product.</p>
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
                        <p style={{ marginBottom: '0.25rem' }}>That sounds great! What are the key features?</p>
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
                          Our product features include: 1) Advanced analytics dashboard, 
                          2) Real-time collaboration tools, 3) Customizable reporting, 
                          4) 24/7 customer support. Would you like me to send you our brochure?
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
                        <p style={{ marginBottom: '0.25rem' }}>Yes, please send it to my email. Thank you for your help!</p>
                        <p style={{
                          fontSize: '0.75rem',
                          color: '#9ca3af',
                          textAlign: 'left'
                        }}>
                          10:40 AM
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
                          You're welcome! I've sent the brochure to your email. 
                          If you have any more questions, feel free to ask.
                        </p>
                        <p style={{
                          fontSize: '0.75rem',
                          color: '#d1fae5',
                          textAlign: 'right'
                        }}>
                          10:42 AM
                        </p>
                      </div>
                    </div>
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

export default ClientListPage