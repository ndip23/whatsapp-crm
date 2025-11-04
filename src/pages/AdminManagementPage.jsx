import { useState, useMemo } from 'react'
import { Edit, Trash2, UserPlus, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { showToast } from '../utils/toast'

const AdminManagementPage = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      firstName: 'John', 
      middleName: 'Michael', 
      lastName: 'Doe', 
      phoneNumber: '+1234567890', 
      email: 'john.doe@example.com', 
      status: 'Active' 
    },
    { 
      id: 2, 
      firstName: 'Jane', 
      middleName: '', 
      lastName: 'Smith', 
      phoneNumber: '+0987654321', 
      email: 'jane.smith@example.com', 
      status: 'Active' 
    },
    { 
      id: 3, 
      firstName: 'Robert', 
      middleName: 'James', 
      lastName: 'Johnson', 
      phoneNumber: '+1122334455', 
      email: 'robert.johnson@example.com', 
      status: 'Suspended' 
    },
    { 
      id: 4, 
      firstName: 'Alice', 
      middleName: 'Marie', 
      lastName: 'Brown', 
      phoneNumber: '+5566778899', 
      email: 'alice.brown@example.com', 
      status: 'Active' 
    },
    { 
      id: 5, 
      firstName: 'Michael', 
      middleName: 'David', 
      lastName: 'Wilson', 
      phoneNumber: '+3344556677', 
      email: 'michael.wilson@example.com', 
      status: 'Active' 
    },
    { 
      id: 6, 
      firstName: 'Sarah', 
      middleName: 'Ann', 
      lastName: 'Davis', 
      phoneNumber: '+7788990011', 
      email: 'sarah.davis@example.com', 
      status: 'Suspended' 
    },
    { 
      id: 7, 
      firstName: 'David', 
      middleName: 'Robert', 
      lastName: 'Miller', 
      phoneNumber: '+2233445566', 
      email: 'david.miller@example.com', 
      status: 'Active' 
    },
    { 
      id: 8, 
      firstName: 'Emily', 
      middleName: 'Grace', 
      lastName: 'Taylor', 
      phoneNumber: '+6677889900', 
      email: 'emily.taylor@example.com', 
      status: 'Active' 
    },
    { 
      id: 9, 
      firstName: 'James', 
      middleName: 'Thomas', 
      lastName: 'Anderson', 
      phoneNumber: '+4455667788', 
      email: 'james.anderson@example.com', 
      status: 'Suspended' 
    },
    { 
      id: 10, 
      firstName: 'Lisa', 
      middleName: 'Marie', 
      lastName: 'Thomas', 
      phoneNumber: '+8899001122', 
      email: 'lisa.thomas@example.com', 
      status: 'Active' 
    },
    { 
      id: 11, 
      firstName: 'Daniel', 
      middleName: 'Paul', 
      lastName: 'Jackson', 
      phoneNumber: '+9900112233', 
      email: 'daniel.jackson@example.com', 
      status: 'Active' 
    },
    { 
      id: 12, 
      firstName: 'Jennifer', 
      middleName: 'Lynn', 
      lastName: 'White', 
      phoneNumber: '+1122334455', 
      email: 'jennifer.white@example.com', 
      status: 'Suspended' 
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users
    
    const term = searchTerm.toLowerCase()
    return users.filter(user => 
      user.firstName.toLowerCase().includes(term) ||
      (user.middleName && user.middleName.toLowerCase().includes(term)) ||
      user.lastName.toLowerCase().includes(term) ||
      user.phoneNumber.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    )
  }, [users, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleAddUser = () => {
    setEditingUser(null)
    setFormData({ 
      firstName: '', 
      middleName: '', 
      lastName: '', 
      phoneNumber: '', 
      email: '' 
    })
    setShowModal(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setFormData({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email
    })
    setShowModal(true)
  }

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id))
      showToast(`User ${userToDelete.firstName} deleted successfully`, 'success')
      setShowDeleteConfirm(false)
      setUserToDelete(null)
    }
  }

  const handleSuspendUser = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' }
        : user
    ))
    const user = users.find(u => u.id === id)
    showToast(
      user.status === 'Active' 
        ? `User ${user.firstName} suspended successfully` 
        : `User ${user.firstName} activated successfully`, 
      'success'
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber) {
      showToast('Please fill in all required fields', 'error')
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'error')
      return
    }
    
    // Phone number validation (simple)
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    if (!phoneRegex.test(formData.phoneNumber)) {
      showToast('Please enter a valid phone number', 'error')
      return
    }
    
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ))
      showToast('User updated successfully', 'success')
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        ...formData,
        status: 'Active'
      }
      setUsers([...users, newUser])
      showToast('User added successfully', 'success')
    }
    setShowModal(false)
  }

  const getFullName = (user) => {
    return `${user.firstName} ${user.middleName ? user.middleName + ' ' : ''}${user.lastName}`
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
    addButton: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      fontWeight: '500',
      paddingTop: '0.375rem',
      paddingBottom: '0.375rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      transition: 'background-color 0.2s ease'
    },
    addButtonHover: {
      backgroundColor: '#059669'
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
      fontSize: '0.875rem',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
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
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
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
      transition: 'background-color 0.2s ease'
    },
    tableCell: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      whiteSpace: 'nowrap',
      fontSize: '0.8125rem',
      color: '#111827',
      cursor: 'pointer'
    },
    tableCellSecondary: {
      color: '#6b7280'
    },
    statusBadge: {
      paddingLeft: '0.375rem',
      paddingRight: '0.375rem',
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
    statusSuspended: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    actionCell: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      whiteSpace: 'nowrap',
      fontSize: '0.8125rem'
    },
    actionButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      marginLeft: '0.125rem',
      width: '1.75rem',
      height: '1.75rem',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    actionButtonHover: {
      color: '#111827',
      backgroundColor: '#f3f4f6'
    },
    actionButtonDanger: {
      color: '#ef4444'
    },
    actionButtonDangerHover: {
      color: '#b91c1c',
      backgroundColor: '#fef2f2'
    },
    actionButtonWarning: {
      color: '#f59e0b'
    },
    actionButtonWarningHover: {
      color: '#d97706',
      backgroundColor: '#fffbeb'
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
      fontSize: '0.875rem',
      transition: 'all 0.2s ease'
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
    pageNumber: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2rem',
      height: '2rem',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      border: '1px solid transparent'
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
    modalOverlay: {
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '50',
      opacity: 0,
      transition: 'opacity 0.2s ease'
    },
    modalOverlayVisible: {
      opacity: 1
    },
    modalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '32rem',
      border: '1px solid #e5e7eb',
      transform: 'scale(0.98)',
      transition: 'transform 0.2s ease, opacity 0.2s ease',
      opacity: 0
    },
    modalContainerVisible: {
      transform: 'scale(1)',
      opacity: 1
    },
    modalHeader: {
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827'
    },
    modalCloseButton: {
      color: '#9ca3af',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '0.25rem',
      width: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s ease'
    },
    modalCloseButtonHover: {
      backgroundColor: '#f3f4f6',
      color: '#111827'
    },
    modalForm: {
      padding: '1.25rem'
    },
    formRow: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '0.75rem'
    },
    formGroup: {
      flex: '1',
      marginBottom: '0.75rem'
    },
    formGroupFull: {
      marginBottom: '0.75rem'
    },
    formLabel: {
      display: 'block',
      fontSize: '0.8125rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.375rem'
    },
    formInput: {
      display: 'block',
      width: '100%',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      outline: 'none',
      fontSize: '0.875rem',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      backgroundColor: '#ffffff'
    },
    formInputFocus: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
    },
    formInputError: {
      borderColor: '#f87171'
    },
    modalFooter: {
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      backgroundColor: '#f9fafb',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem',
      borderBottomLeftRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem'
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
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
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
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    saveButtonHover: {
      backgroundColor: '#059669'
    },
    // Enhanced confirmation dialog styles
    confirmOverlay: {
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '50',
      opacity: 0,
      transition: 'opacity 0.2s ease'
    },
    confirmOverlayVisible: {
      opacity: 1
    },
    confirmContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '28rem',
      border: '1px solid #e5e7eb',
      transform: 'scale(0.98)',
      transition: 'transform 0.2s ease, opacity 0.2s ease',
      opacity: 0,
      overflow: 'hidden'
    },
    confirmContainerVisible: {
      transform: 'scale(1)',
      opacity: 1
    },
    confirmHeader: {
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fef2f2'
    },
    confirmTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#b91c1c'
    },
    confirmBody: {
      padding: '1.25rem'
    },
    confirmMessage: {
      fontSize: '0.875rem',
      color: '#374151',
      marginBottom: '1.25rem',
      lineHeight: '1.5'
    },
    confirmUserName: {
      fontWeight: '600',
      color: '#111827'
    },
    confirmFooter: {
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      backgroundColor: '#f9fafb',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.5rem',
      borderBottomLeftRadius: '0.5rem',
      borderBottomRightRadius: '0.5rem'
    },
    confirmCancelButton: {
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
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    confirmCancelButtonHover: {
      backgroundColor: '#f9fafb'
    },
    confirmDeleteButton: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#ffffff',
      backgroundColor: '#ef4444',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    confirmDeleteButtonHover: {
      backgroundColor: '#dc2626'
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
      }
      
      .formRow {
        flex-direction: column;
        gap: 0;
      }
      
      .pageTitle {
        font-size: 1.125rem;
      }
      
      .searchContainer {
        maxWidth: 100%;
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
      
      .addButton {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
    }
    
    /* Animation keyframes */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `

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

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Staff Management</h1>
        <button
          onClick={handleAddUser}
          style={styles.addButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.addButtonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.addButton.backgroundColor}
        >
          <UserPlus style={{ height: '1rem', width: '1rem' }} />
          <span>Add User</span>
        </button>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Name</th>
              <th style={styles.tableHeaderCell}>Phone Number</th>
              <th style={styles.tableHeaderCell}>Email</th>
              <th style={styles.tableHeaderCell}>Status</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr 
                  key={user.id} 
                  style={styles.tableRow}
                >
                  <td style={{ ...styles.tableCell, fontWeight: '500' }}>{getFullName(user)}</td>
                  <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{user.phoneNumber}</td>
                  <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{user.email}</td>
                  <td style={styles.tableCell}>
                    <span style={{ 
                      ...styles.statusBadge, 
                      ...(user.status === 'Active' ? styles.statusActive : styles.statusSuspended) 
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={styles.actionCell}>
                    <button
                      onClick={() => handleEditUser(user)}
                      style={styles.actionButton}
                      onMouseEnter={(e) => {
                        e.target.style.color = styles.actionButtonHover.color
                        e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = styles.actionButton.color
                        e.target.style.backgroundColor = 'transparent'
                      }}
                      title="Edit User"
                    >
                      <Edit style={{ height: '1rem', width: '1rem' }} />
                    </button>
                    <button
                      onClick={() => handleSuspendUser(user.id)}
                      style={{ 
                        ...styles.actionButton, 
                        ...(user.status === 'Active' ? styles.actionButtonWarning : styles.actionButtonHover) 
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = user.status === 'Active' 
                          ? styles.actionButtonWarningHover.color 
                          : styles.actionButtonHover.color
                        e.target.style.backgroundColor = user.status === 'Active' 
                          ? styles.actionButtonWarningHover.backgroundColor 
                          : styles.actionButtonHover.backgroundColor
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = user.status === 'Active' 
                          ? styles.actionButtonWarning.color 
                          : styles.actionButton.color
                        e.target.style.backgroundColor = 'transparent'
                      }}
                      title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                    >
                      {user.status === 'Active' ? (
                        <svg style={{ height: '1rem', width: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                        </svg>
                      ) : (
                        <svg style={{ height: '1rem', width: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user)}
                      style={{ ...styles.actionButton, ...styles.actionButtonDanger }}
                      onMouseEnter={(e) => {
                        e.target.style.color = styles.actionButtonDangerHover.color
                        e.target.style.backgroundColor = styles.actionButtonDangerHover.backgroundColor
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = styles.actionButtonDanger.color
                        e.target.style.backgroundColor = 'transparent'
                      }}
                      title="Delete User"
                    >
                      <Trash2 style={{ height: '1rem', width: '1rem' }} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ ...styles.tableCell, textAlign: 'center', fontStyle: 'italic', color: '#6b7280' }}>
                  No staff members found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.paginationContainer}>
            <div style={styles.paginationInfo}>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} staff members
            </div>
            <div style={styles.paginationControls}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
                  ...(currentPage === 1 ? {} : {
                    onMouseEnter: (e) => e.target.style.backgroundColor = styles.paginationButtonHover.backgroundColor,
                    onMouseLeave: (e) => e.target.style.backgroundColor = styles.paginationButton.backgroundColor
                  })
                }}
              >
                <ChevronLeft style={{ height: '1rem', width: '1rem' }} />
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
                        ...(currentPage === page ? styles.paginationButtonActive : styles.paginationButtonInactive),
                        ...(currentPage === page ? {} : {
                          onMouseEnter: (e) => {
                            e.target.style.backgroundColor = '#f0fdf4'
                          },
                          onMouseLeave: (e) => {
                            e.target.style.backgroundColor = styles.paginationButtonInactive.backgroundColor
                          }
                        })
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
                  ...(currentPage === totalPages ? styles.paginationButtonDisabled : {}),
                  ...(currentPage === totalPages ? {} : {
                    onMouseEnter: (e) => e.target.style.backgroundColor = styles.paginationButtonHover.backgroundColor,
                    onMouseLeave: (e) => e.target.style.backgroundColor = styles.paginationButton.backgroundColor
                  })
                }}
              >
                <ChevronRight style={{ height: '1rem', width: '1rem' }} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div 
          style={{ 
            ...styles.modalOverlay, 
            ...styles.modalOverlayVisible 
          }}
        >
          <div 
            style={{ 
              ...styles.modalContainer, 
              ...styles.modalContainerVisible 
            }}
          >
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.modalCloseButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <svg style={{ height: '1.25rem', width: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} style={styles.modalForm}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    style={styles.formInput}
                    onFocus={(e) => {
                      e.target.style.borderColor = styles.formInputFocus.borderColor
                      e.target.style.boxShadow = styles.formInputFocus.boxShadow
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                    style={styles.formInput}
                    onFocus={(e) => {
                      e.target.style.borderColor = styles.formInputFocus.borderColor
                      e.target.style.boxShadow = styles.formInputFocus.boxShadow
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>
              </div>
              
              <div style={styles.formGroupFull}>
                <label style={styles.formLabel}>
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  style={styles.formInput}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.formInputFocus.borderColor
                    e.target.style.boxShadow = styles.formInputFocus.boxShadow
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
              
              <div style={styles.formGroupFull}>
                <label style={styles.formLabel}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  style={styles.formInput}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.formInputFocus.borderColor
                    e.target.style.boxShadow = styles.formInputFocus.boxShadow
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
              
              <div style={styles.formGroupFull}>
                <label style={styles.formLabel}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={styles.formInput}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.formInputFocus.borderColor
                    e.target.style.boxShadow = styles.formInputFocus.boxShadow
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
              
              <div style={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          style={{ 
            ...styles.confirmOverlay, 
            ...styles.confirmOverlayVisible 
          }}
        >
          <div 
            style={{ 
              ...styles.confirmContainer, 
              ...styles.confirmContainerVisible 
            }}
          >
            <div style={styles.confirmHeader}>
              <h3 style={styles.confirmTitle}>Confirm Deletion</h3>
              <button 
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setUserToDelete(null)
                }}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.modalCloseButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <svg style={{ height: '1.25rem', width: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div style={styles.confirmBody}>
              <p style={styles.confirmMessage}>
                Are you sure you want to delete <span style={styles.confirmUserName}>{userToDelete && getFullName(userToDelete)}</span>? This action cannot be undone.
              </p>
            </div>
            <div style={styles.confirmFooter}>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setUserToDelete(null)
                }}
                style={styles.confirmCancelButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.confirmCancelButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.confirmCancelButton.backgroundColor}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                style={styles.confirmDeleteButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.confirmDeleteButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.confirmDeleteButton.backgroundColor}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminManagementPage