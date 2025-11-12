import { useState, useMemo } from 'react'
import { Edit, Trash2, UserPlus, Search, Shield } from 'lucide-react'
import { showToast } from '../utils/toast'
import ResponsiveTable from '../components/ResponsiveTable'
import ResponsivePagination from '../components/ResponsivePagination'

const AdminManagementPage = () => {
  // Sample users data
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

  // Sample admins data
  const [admins, setAdmins] = useState([
    { 
      id: 1, 
      firstName: 'Admin', 
      middleName: '', 
      lastName: 'User', 
      phoneNumber: '+1234567890', 
      email: 'admin@example.com', 
      status: 'Active',
      role: 'Super Admin'
    },
    { 
      id: 2, 
      firstName: 'System', 
      middleName: '', 
      lastName: 'Administrator', 
      phoneNumber: '+0987654321', 
      email: 'system.admin@example.com', 
      status: 'Active',
      role: 'Admin'
    }
  ])

  const [activeTab, setActiveTab] = useState('users') // 'users' or 'admins'
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    role: '' // For admins only
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Get current data based on active tab
  const currentData = activeTab === 'users' ? users : admins

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return currentData
    
    const term = searchTerm.toLowerCase()
    return currentData.filter(item => 
      item.firstName.toLowerCase().includes(term) ||
      (item.middleName && item.middleName.toLowerCase().includes(term)) ||
      item.lastName.toLowerCase().includes(term) ||
      item.phoneNumber.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      (activeTab === 'admins' && item.role.toLowerCase().includes(term))
    )
  }, [currentData, searchTerm, activeTab])

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredData.slice(startIndex, endIndex)

  // Reset to first page when search term or tab changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm, activeTab])

  const handleAddUser = () => {
    setEditingUser(null)
    setFormData({ 
      fullName: '', 
      phoneNumber: '', 
      email: '',
      role: activeTab === 'admins' ? 'Admin' : '' // Default role for admins
    })
    setShowModal(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    // Combine first, middle, and last names into a single fullName field
    const fullName = `${user.firstName}${user.middleName ? ' ' + user.middleName : ''}${user.lastName ? ' ' + user.lastName : ''}`.trim()
    setFormData({
      fullName: fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role || '' // For admins
    })
    setShowModal(true)
  }

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
      if (activeTab === 'users') {
        setUsers(users.filter(user => user.id !== userToDelete.id))
      } else {
        setAdmins(admins.filter(admin => admin.id !== userToDelete.id))
      }
      showToast(`${activeTab === 'users' ? 'User' : 'Admin'} ${userToDelete.firstName} deleted successfully`, 'success')
      setShowDeleteConfirm(false)
      setUserToDelete(null)
    }
  }

  const handleSuspendUser = (id) => {
    if (activeTab === 'users') {
      setUsers(users.map(user => 
        user.id === id 
          ? { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' }
          : user
      ))
    } else {
      setAdmins(admins.map(admin => 
        admin.id === id 
          ? { ...admin, status: admin.status === 'Active' ? 'Suspended' : 'Active' }
          : admin
      ))
    }
    
    const item = currentData.find(u => u.id === id)
    showToast(
      item.status === 'Active' 
        ? `${activeTab === 'users' ? 'User' : 'Admin'} ${item.firstName} suspended successfully` 
        : `${activeTab === 'users' ? 'User' : 'Admin'} ${item.firstName} activated successfully`, 
      'success'
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple validation
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
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
    
    // Split fullName into first, middle, and last names
    const nameParts = formData.fullName.trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : ''
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''
    
    if (!firstName || !lastName) {
      showToast('Please enter both first and last name in the full name field', 'error')
      return
    }
    
    const userData = {
      firstName,
      middleName,
      lastName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      role: formData.role || '' // For admins
    }
    
    if (editingUser) {
      // Update existing user/admin
      if (activeTab === 'users') {
        setUsers(users.map(user => 
          user.id === editingUser.id 
            ? { ...user, ...userData }
            : user
        ))
      } else {
        setAdmins(admins.map(admin => 
          admin.id === editingUser.id 
            ? { ...admin, ...userData }
            : admin
        ))
      }
      showToast(`${activeTab === 'users' ? 'User' : 'Admin'} updated successfully`, 'success')
    } else {
      // Add new user/admin
      const newItem = {
        id: currentData.length + 1,
        ...userData,
        status: 'Active'
      }
      
      if (activeTab === 'users') {
        setUsers([...users, newItem])
      } else {
        setAdmins([...admins, newItem])
      }
      showToast(`${activeTab === 'users' ? 'User' : 'Admin'} added successfully`, 'success')
    }
    setShowModal(false)
  }

  const getFullName = (user) => {
    // Updated to work with the new data structure
    return `${user.firstName} ${user.middleName ? user.middleName + ' ' : ''}${user.lastName}`
  }

  // Styles object
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
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#10b981',
      color: '#ffffff',
      fontWeight: '500',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem'
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
      fontWeight: '500'
    },
    statusActive: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1px solid #10b981'
    },
    statusSuspended: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #ef4444'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2rem',
      width: '2rem',
      borderRadius: '0.375rem',
      border: '1px solid #e5e7eb',
      backgroundColor: 'transparent',
      color: '#6b7280',
      cursor: 'pointer'
    },
    actionButtonHover: {
      backgroundColor: '#f3f4f6',
      color: '#111827'
    },
    actionButtonWarning: {
      color: '#f59e0b'
    },
    actionButtonWarningHover: {
      backgroundColor: '#fffbeb',
      color: '#d97706'
    },
    actionButtonDanger: {
      color: '#ef4444'
    },
    actionButtonDangerHover: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    modalOverlay: {
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '50',
      opacity: 0,
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
      visibility: 'hidden'
    },
    modalOverlayVisible: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      opacity: 1,
      visibility: 'visible'
    },
    modalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '100%',
      maxWidth: '32rem',
      transform: 'scale(0.95)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      opacity: 0
    },
    modalContainerVisible: {
      transform: 'scale(1)',
      opacity: 1
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
      cursor: 'pointer',
      borderRadius: '0.25rem',
      padding: '0.25rem'
    },
    modalCloseButtonHover: {
      backgroundColor: '#f3f4f6'
    },
    modalForm: {
      padding: '1.5rem'
    },
    formRow: {
      display: 'flex',
      gap: '1rem'
    },
    formGroup: {
      flex: 1,
      marginBottom: '1rem'
    },
    formGroupFull: {
      marginBottom: '1rem'
    },
    formLabel: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '0.25rem'
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
      fontSize: '0.875rem'
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
    },
    confirmOverlay: {
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '50',
      opacity: 0,
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
      visibility: 'hidden'
    },
    confirmOverlayVisible: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      opacity: 1,
      visibility: 'visible'
    },
    confirmContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '100%',
      maxWidth: '28rem',
      transform: 'scale(0.95)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      opacity: 0
    },
    confirmContainerVisible: {
      transform: 'scale(1)',
      opacity: 1
    },
    confirmHeader: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    confirmTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#111827'
    },
    confirmBody: {
      padding: '1.5rem'
    },
    confirmMessage: {
      fontSize: '0.875rem',
      color: '#374151',
      lineHeight: '1.5'
    },
    confirmUserName: {
      fontWeight: '600',
      color: '#111827'
    },
    confirmFooter: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      backgroundColor: '#f9fafb',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.75rem'
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
      cursor: 'pointer'
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
      cursor: 'pointer'
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
      
      .modalContainer {
        margin: 1rem;
        max-width: calc(100% - 2rem);
      }
      
      .confirmContainer {
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
      
      .formRow {
        flex-direction: column;
        gap: 0;
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
      
      .addButton span {
        display: none;
      }
      
      .addButton {
        padding: 0.5rem;
      }
      
      .addButton svg {
        margin-right: 0;
      }
    }
  `

  // Pagination helper function
  const getPageNumbers = (currentPage, totalPages) => {
    const delta = 2
    const range = []
    const rangeWithDots = []
    
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }
    
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }
    
    rangeWithDots.push(...range)
    
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }
    
    return rangeWithDots
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
          <span>Add {activeTab === 'users' ? 'User' : 'Admin'}</span>
        </button>
      </div>

      {/* Tabs for Users and Admins */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            ...styles.addButton,
            backgroundColor: activeTab === 'users' ? '#10b981' : '#f3f4f6',
            color: activeTab === 'users' ? '#ffffff' : '#374151',
            border: 'none',
            borderRadius: '0.375rem 0.375rem 0 0',
            borderBottom: activeTab === 'users' ? 'none' : '1px solid #e5e7eb'
          }}
        >
          <UserPlus style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
          <span>Users</span>
        </button>
        <button
          onClick={() => setActiveTab('admins')}
          style={{
            ...styles.addButton,
            backgroundColor: activeTab === 'admins' ? '#10b981' : '#f3f4f6',
            color: activeTab === 'admins' ? '#ffffff' : '#374151',
            border: 'none',
            borderRadius: '0.375rem 0.375rem 0 0',
            borderBottom: activeTab === 'admins' ? 'none' : '1px solid #e5e7eb'
          }}
        >
          <Shield style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
          <span>Admins</span>
        </button>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.tableContainer}>
        <ResponsiveTable
          columns={[
            { key: 'name', header: 'Name', isPrimary: true },
            { key: 'phoneNumber', header: 'Phone Number' },
            { key: 'email', header: 'Email' },
            ...(activeTab === 'admins' ? [{ key: 'role', header: 'Role' }] : []),
            { key: 'status', header: 'Status' },
            { key: 'actions', header: 'Actions', sortable: false }
          ]}
          data={currentItems.map(item => ({
            id: item.id,
            name: getFullName(item),
            phoneNumber: item.phoneNumber,
            email: item.email,
            ...(activeTab === 'admins' ? { role: item.role } : {}),
            status: item.status,
            item: item
          }))}
          renderCell={(row, column) => {
            switch (column.key) {
              case 'status':
                return (
                  <span style={{ 
                    ...styles.statusBadge, 
                    ...(row.status === 'Active' ? styles.statusActive : styles.statusSuspended) 
                  }}>
                    {row.status}
                  </span>
                );
              case 'actions':
                return (
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditUser(row.item);
                      }}
                      style={styles.actionButton}
                      onMouseEnter={(e) => {
                        e.target.style.color = styles.actionButtonHover.color;
                        e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = styles.actionButton.color;
                        e.target.style.backgroundColor = 'transparent';
                      }}
                      title={`Edit ${activeTab === 'users' ? 'User' : 'Admin'}`}
                    >
                      <Edit style={{ height: '1rem', width: '1rem' }} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSuspendUser(row.item.id);
                      }}
                      style={{ 
                        ...styles.actionButton, 
                        ...(row.status === 'Active' ? styles.actionButtonWarning : styles.actionButtonHover) 
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = row.status === 'Active' 
                          ? styles.actionButtonWarningHover.color 
                          : styles.actionButtonHover.color;
                        e.target.style.backgroundColor = row.status === 'Active' 
                          ? styles.actionButtonWarningHover.backgroundColor 
                          : styles.actionButtonHover.backgroundColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = row.status === 'Active' 
                          ? styles.actionButtonWarning.color 
                          : styles.actionButton.color;
                        e.target.style.backgroundColor = 'transparent';
                      }}
                      title={row.status === 'Active' ? `Suspend ${activeTab === 'users' ? 'User' : 'Admin'}` : `Activate ${activeTab === 'users' ? 'User' : 'Admin'}`}
                    >
                      {row.status === 'Active' ? (
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(row.item);
                      }}
                      style={{ ...styles.actionButton, ...styles.actionButtonDanger }}
                      onMouseEnter={(e) => {
                        e.target.style.color = styles.actionButtonDangerHover.color;
                        e.target.style.backgroundColor = styles.actionButtonDangerHover.backgroundColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = styles.actionButtonDanger.color;
                        e.target.style.backgroundColor = 'transparent';
                      }}
                      title={`Delete ${activeTab === 'users' ? 'User' : 'Admin'}`}
                    >
                      <Trash2 style={{ height: '1rem', width: '1rem' }} />
                    </button>
                  </div>
                );
              default:
                return row[column.key];
            }
          }}
          onRowClick={(row) => handleEditUser(row.item)}
        />

        <ResponsivePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          showInfo={true}
          showNavigation={true}
        />
      </div>

      {/* Add/Edit User/Admin Modal */}
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
                {editingUser ? `Edit ${activeTab === 'users' ? 'User' : 'Admin'}` : `Add New ${activeTab === 'users' ? 'User' : 'Admin'}`}
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
              <div style={styles.formGroupFull}>
                <label style={styles.formLabel}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  style={styles.formInput}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.formInputFocus.borderColor
                    e.target.style.boxShadow = styles.formInputFocus.boxShadow
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                  placeholder="Enter full name (first and last name required)"
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
              
              {/* Role field for admins only */}
              {activeTab === 'admins' && (
                <div style={styles.formGroupFull}>
                  <label style={styles.formLabel}>
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    style={styles.formInput}
                    onFocus={(e) => {
                      e.target.style.borderColor = styles.formInputFocus.borderColor
                      e.target.style.boxShadow = styles.formInputFocus.boxShadow
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select Role</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>
              )}
              
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
                  {editingUser ? `Update ${activeTab === 'users' ? 'User' : 'Admin'}` : `Add ${activeTab === 'users' ? 'User' : 'Admin'}`}
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