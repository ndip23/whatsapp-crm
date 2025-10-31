import { useState, useMemo } from 'react'
import { Plus, Edit, Trash2, Save, X, Search, ChevronLeft, ChevronRight, User, Shield } from 'lucide-react'
import { showToast } from '../utils/toast'

const RoleManagementPage = () => {
  // Sample roles data
  const [roles, setRoles] = useState([
    { 
      id: 1, 
      name: 'Administrator', 
      description: 'Full access to all system features',
      permissions: [
        { id: 1, name: 'User Management', description: 'Create, edit, and delete users' },
        { id: 2, name: 'Role Management', description: 'Manage user roles and permissions' },
        { id: 3, name: 'Client Management', description: 'Manage client information and groups' },
        { id: 4, name: 'Chat Access', description: 'Access to chat functionality' }
      ],
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ]
    },
    { 
      id: 2, 
      name: 'Manager', 
      description: 'Manage clients and view reports',
      permissions: [
        { id: 3, name: 'Client Management', description: 'Manage client information and groups' },
        { id: 5, name: 'Report Generation', description: 'Generate and view reports' },
        { id: 9, name: 'Notification Management', description: 'Manage notification settings' }
      ],
      users: [
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com' }
      ]
    },
    { 
      id: 3, 
      name: 'Support Agent', 
      description: 'Access to chat functionality and client information',
      permissions: [
        { id: 4, name: 'Chat Access', description: 'Access to chat functionality' },
        { id: 3, name: 'Client Management', description: 'Manage client information and groups' }
      ],
      users: [
        { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
        { id: 5, name: 'Michael Wilson', email: 'michael@example.com' },
        { id: 6, name: 'Sarah Brown', email: 'sarah@example.com' }
      ]
    },
    { 
      id: 4, 
      name: 'Analyst', 
      description: 'View reports and analytics',
      permissions: [
        { id: 5, name: 'Report Generation', description: 'Generate and view reports' },
        { id: 12, name: 'User Analytics', description: 'View user analytics and metrics' }
      ],
      users: []
    }
  ])

  // Sample users data
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Administrator' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Administrator' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Manager' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Support Agent' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Support Agent' },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'Support Agent' },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Analyst' },
    { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', role: null }
  ])

  // Sample permissions data
  const [permissions] = useState([
    { id: 1, name: 'User Management', description: 'Create, edit, and delete users' },
    { id: 2, name: 'Role Management', description: 'Manage user roles and permissions' },
    { id: 3, name: 'Client Management', description: 'Manage client information and groups' },
    { id: 4, name: 'Chat Access', description: 'Access to chat functionality' },
    { id: 5, name: 'Report Generation', description: 'Generate and view reports' },
    { id: 6, name: 'System Settings', description: 'Modify system configuration' },
    { id: 7, name: 'Audit Logs', description: 'View system audit logs' },
    { id: 8, name: 'Data Export', description: 'Export system data' },
    { id: 9, name: 'Notification Management', description: 'Manage notification settings' },
    { id: 10, name: 'API Access', description: 'Access to system APIs' },
    { id: 11, name: 'Backup Management', description: 'Manage system backups' },
    { id: 12, name: 'User Analytics', description: 'View user analytics and metrics' }
  ])

  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [showUsersModal, setShowUsersModal] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState(null)
  const [editingRole, setEditingRole] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [viewingRole, setViewingRole] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [assignedPermissions, setAssignedPermissions] = useState([])
  const [assignedUsers, setAssignedUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter roles based on search term
  const filteredRoles = useMemo(() => {
    if (!searchTerm) return roles
    
    const term = searchTerm.toLowerCase()
    return roles.filter(role => 
      role.name.toLowerCase().includes(term) ||
      (role.description && role.description.toLowerCase().includes(term))
    )
  }, [roles, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRoles = filteredRoles.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleAddRole = () => {
    setEditingRole(null)
    setFormData({ name: '', description: '' })
    setAssignedPermissions([])
    setAssignedUsers([])
    setShowModal(true)
  }

  const handleEditRole = (role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      description: role.description
    })
    setAssignedPermissions([...role.permissions])
    setAssignedUsers([...role.users])
    setShowModal(true)
  }

  const handleDeleteRole = (role) => {
    setRoleToDelete(role)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteRole = () => {
    if (roleToDelete) {
      setRoles(roles.filter(role => role.id !== roleToDelete.id))
      showToast('Role deleted successfully', 'success')
      setShowDeleteConfirm(false)
      setRoleToDelete(null)
    }
  }

  const cancelDeleteRole = () => {
    setShowDeleteConfirm(false)
    setRoleToDelete(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name) {
      showToast('Role name is required', 'error')
      return
    }
    
    if (editingRole) {
      // Update existing role
      setRoles(roles.map(role => 
        role.id === editingRole.id 
          ? { 
              ...role, 
              ...formData,
              permissions: assignedPermissions,
              users: assignedUsers
            }
          : role
      ))
      showToast('Role updated successfully', 'success')
    } else {
      // Add new role
      const newRole = {
        id: roles.length + 1,
        ...formData,
        permissions: assignedPermissions,
        users: assignedUsers
      }
      setRoles([...roles, newRole])
      showToast('Role added successfully', 'success')
    }
    setShowModal(false)
  }

  const handleAddPermission = () => {
    if (selectedRole && !assignedPermissions.some(p => p.id === selectedRole.id)) {
      const permissionToAdd = permissions.find(p => p.id == selectedRole.id)
      setAssignedPermissions([...assignedPermissions, permissionToAdd])
      setSelectedRole(null)
    }
  }

  const handleRemovePermission = (id) => {
    setAssignedPermissions(assignedPermissions.filter(permission => permission.id !== id))
  }

  const handleAddUser = (user) => {
    if (!assignedUsers.some(u => u.id === user.id)) {
      setAssignedUsers([...assignedUsers, user])
    }
  }

  const handleRemoveUser = (id) => {
    setAssignedUsers(assignedUsers.filter(user => user.id !== id))
  }

  const handleViewPermissions = (role) => {
    setViewingRole(role)
    setShowPermissionsModal(true)
  }

  const handleViewUsers = (role) => {
    setViewingRole(role)
    setShowUsersModal(true)
  }

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
      fontSize: '0.875rem'
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
      backgroundColor: '#ffffff'
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
    badge: {
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    badgePrimary: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    badgeSecondary: {
      backgroundColor: '#ede9fe',
      color: '#5b21b6'
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
      justifyContent: 'center'
    },
    actionButtonDanger: {
      color: '#ef4444'
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
      border: '1px solid #10b981', // Primary color border
      backgroundColor: '#ffffff', // White background for non-active pages
      color: '#10b981' // Primary color text
    },
    modalOverlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '50',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },
    modalOverlayVisible: {
      opacity: 1
    },
    modalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '40rem',
      border: '1px solid #e5e7eb',
      transform: 'scale(0.95)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      opacity: 0,
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    modalContainerVisible: {
      transform: 'scale(1)',
      opacity: 1
    },
    viewModalOverlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '50',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },
    viewModalOverlayVisible: {
      opacity: 1
    },
    viewModalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
      width: '100%',
      maxWidth: '30rem',
      border: '1px solid #e5e7eb',
      transform: 'scale(0.95)',
      transition: 'transform 0.3s ease, opacity 0.3s ease',
      opacity: 0
    },
    viewModalContainerVisible: {
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
      alignItems: 'center',
      flexShrink: 0
    },
    viewModalHeader: {
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
    viewModalTitle: {
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
      justifyContent: 'center'
    },
    modalCloseButtonHover: {
      backgroundColor: '#f3f4f6',
      color: '#111827'
    },
    modalForm: {
      padding: '1.25rem',
      overflowY: 'auto',
      flexGrow: 1
    },
    viewModalBody: {
      padding: '1.25rem'
    },
    formGroup: {
      marginBottom: '1rem'
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
      backgroundColor: '#ffffff'
    },
    formTextarea: {
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
      backgroundColor: '#ffffff',
      minHeight: '6rem',
      resize: 'vertical'
    },
    selectContainer: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem',
      alignItems: 'center'
    },
    formSelect: {
      flex: '1',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      outline: 'none',
      fontSize: '0.875rem',
      backgroundColor: '#ffffff'
    },
    addButtonSmall: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      fontWeight: '500',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
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
    assignedContainer: {
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      padding: '0.75rem',
      marginBottom: '1rem',
      maxHeight: '12rem',
      overflowY: 'auto'
    },
    viewList: {
      maxHeight: '200px',
      overflowY: 'auto',
      border: '1px solid #e5e7eb',
      borderRadius: '0.375rem'
    },
    assignedItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    viewItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      borderBottom: '1px solid #f3f4f6'
    },
    assignedItemLast: {
      borderBottom: 'none'
    },
    viewItemLast: {
      borderBottom: 'none'
    },
    assignedInfo: {
      flex: '1'
    },
    assignedName: {
      fontWeight: '500',
      fontSize: '0.875rem',
      color: '#111827'
    },
    viewItemName: {
      fontWeight: '500',
      fontSize: '0.875rem',
      color: '#111827'
    },
    assignedDescription: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.125rem'
    },
    viewItemDescription: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.125rem'
    },
    viewItemEmail: {
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    removeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#ef4444',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    userList: {
      maxHeight: '150px',
      overflowY: 'auto',
      border: '1px solid #e5e7eb',
      borderRadius: '0.375rem',
      marginTop: '0.5rem'
    },
    userItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem',
      borderBottom: '1px solid #f3f4f6',
      cursor: 'pointer'
    },
    userItemLast: {
      borderBottom: 'none'
    },
    userName: {
      fontWeight: '500',
      fontSize: '0.875rem'
    },
    userEmail: {
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    addUserButton: {
      backgroundColor: 'transparent',
      border: '1px dashed #d1d5db',
      color: '#6b7280',
      padding: '0.5rem',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'center',
      fontSize: '0.875rem',
      marginTop: '0.5rem'
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
      borderBottomRightRadius: '0.5rem',
      flexShrink: 0
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
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    confirmOverlay: {
      position: 'fixed',
      inset: 0,
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
      maxWidth: '22rem',
      border: '1px solid #e5e7eb',
      transform: 'scale(0.98)',
      transition: 'transform 0.2s ease, opacity 0.2s ease',
      opacity: 0
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
    confirmRoleName: {
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
    
    /* Custom scrollbar */
    .assignedContainer::-webkit-scrollbar {
      width: 6px;
    }
    
    .assignedContainer::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 3px;
    }
    
    .assignedContainer::-webkit-scrollbar-thumb {
      background: #a7f3d0;
      border-radius: 3px;
    }
    
    .assignedContainer::-webkit-scrollbar-thumb:hover {
      background: #6ee7b7;
    }
    
    .userList::-webkit-scrollbar {
      width: 6px;
    }
    
    .userList::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 3px;
    }
    
    .userList::-webkit-scrollbar-thumb {
      background: #a7f3d0;
      border-radius: 3px;
    }
    
    .userList::-webkit-scrollbar-thumb:hover {
      background: #6ee7b7;
    }
    
    .viewList::-webkit-scrollbar {
      width: 6px;
    }
    
    .viewList::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 3px;
    }
    
    .viewList::-webkit-scrollbar-thumb {
      background: #a7f3d0;
      border-radius: 3px;
    }
    
    .viewList::-webkit-scrollbar-thumb:hover {
      background: #6ee7b7;
    }
    
    .modalForm::-webkit-scrollbar {
      width: 6px;
    }
    
    .modalForm::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 3px;
    }
    
    .modalForm::-webkit-scrollbar-thumb {
      background: #a7f3d0;
      border-radius: 3px;
    }
    
    .modalForm::-webkit-scrollbar-thumb:hover {
      background: #6ee7b7;
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Role Management</h1>
        <button
          onClick={handleAddRole}
          style={styles.addButton}
        >
          <Plus style={{ height: '1rem', width: '1rem' }} />
          <span>Add Role</span>
        </button>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Role Name</th>
              <th style={styles.tableHeaderCell}>Description</th>
              <th style={styles.tableHeaderCell}>Permissions</th>
              <th style={styles.tableHeaderCell}>Users</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            {currentRoles.length > 0 ? (
              currentRoles.map((role) => (
                <tr 
                  key={role.id} 
                  style={styles.tableRow}
                >
                  <td style={{ ...styles.tableCell, fontWeight: '500' }}>{role.name}</td>
                  <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{role.description}</td>
                  <td style={styles.tableCell}>
                    <span 
                      style={{ ...styles.badge, ...styles.badgePrimary, cursor: 'pointer' }}
                      onClick={() => handleViewPermissions(role)}
                    >
                      {role.permissions.length} permissions
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <span 
                      style={{ ...styles.badge, ...styles.badgeSecondary, cursor: 'pointer' }}
                      onClick={() => handleViewUsers(role)}
                    >
                      {role.users.length} users
                    </span>
                  </td>
                  <td style={styles.actionCell}>
                    <button
                      onClick={() => handleEditRole(role)}
                      style={styles.actionButton}
                      title="Edit Role"
                    >
                      <Edit style={{ height: '1rem', width: '1rem' }} />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role)}
                      style={{ ...styles.actionButton, ...styles.actionButtonDanger }}
                      title="Delete Role"
                    >
                      <Trash2 style={{ height: '1rem', width: '1rem' }} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ ...styles.tableCell, textAlign: 'center', fontStyle: 'italic', color: '#6b7280' }}>
                  No roles found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={styles.paginationContainer}>
            <div style={styles.paginationInfo}>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredRoles.length)} of {filteredRoles.length} roles
            </div>
            <div style={styles.paginationControls}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  ...styles.paginationButton,
                  ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
                }}
              >
                <ChevronLeft style={{ height: '1rem', width: '1rem' }} />
              </button>
              
              {getPageNumbers().map((page, index) => (
                <div key={index}>
                  {page === '...' ? (
                    <span style={{ ...styles.pageNumber, cursor: 'default', color: '#9ca3af', border: 'none', backgroundColor: 'transparent' }}>...</span>
                  ) : (
                    <button
                      onClick={() => setCurrentPage(page)}
                      style={{
                        ...styles.pageNumber,
                        ...(currentPage === page 
                          ? { ...styles.paginationButtonActive, border: '1px solid #10b981' } 
                          : { backgroundColor: '#ffffff', color: '#10b981', border: '1px solid #10b981' })
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
              >
                <ChevronRight style={{ height: '1rem', width: '1rem' }} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Permissions View Modal */}
      {showPermissionsModal && (
        <div 
          style={{ 
            ...styles.viewModalOverlay, 
            ...styles.viewModalOverlayVisible 
          }}
        >
          <div 
            style={{ 
              ...styles.viewModalContainer, 
              ...styles.viewModalContainerVisible 
            }}
          >
            <div style={styles.viewModalHeader}>
              <h3 style={styles.viewModalTitle}>
                {viewingRole?.name} - Permissions
              </h3>
              <button 
                onClick={() => setShowPermissionsModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.modalCloseButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X style={{ height: '1.25rem', width: '1.25rem' }} />
              </button>
            </div>
            <div style={styles.viewModalBody}>
              <div style={styles.viewList}>
                {viewingRole?.permissions.length > 0 ? (
                  viewingRole.permissions.map((permission, index) => (
                    <div 
                      key={permission.id} 
                      style={{
                        ...styles.viewItem,
                        ...(index === viewingRole.permissions.length - 1 ? styles.viewItemLast : {})
                      }}
                    >
                      <div>
                        <div style={styles.viewItemName}>{permission.name}</div>
                        <div style={styles.viewItemDescription}>{permission.description}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ ...styles.viewItem, ...styles.viewItemLast, textAlign: 'center', color: '#6b7280', fontStyle: 'italic' }}>
                    No permissions assigned
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users View Modal */}
      {showUsersModal && (
        <div 
          style={{ 
            ...styles.viewModalOverlay, 
            ...styles.viewModalOverlayVisible 
          }}
        >
          <div 
            style={{ 
              ...styles.viewModalContainer, 
              ...styles.viewModalContainerVisible 
            }}
          >
            <div style={styles.viewModalHeader}>
              <h3 style={styles.viewModalTitle}>
                {viewingRole?.name} - Users
              </h3>
              <button 
                onClick={() => setShowUsersModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.modalCloseButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X style={{ height: '1.25rem', width: '1.25rem' }} />
              </button>
            </div>
            <div style={styles.viewModalBody}>
              <div style={styles.viewList}>
                {viewingRole?.users.length > 0 ? (
                  viewingRole.users.map((user, index) => (
                    <div 
                      key={user.id} 
                      style={{
                        ...styles.viewItem,
                        ...(index === viewingRole.users.length - 1 ? styles.viewItemLast : {})
                      }}
                    >
                      <div>
                        <div style={styles.viewItemName}>{user.name}</div>
                        <div style={styles.viewItemEmail}>{user.email}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ ...styles.viewItem, ...styles.viewItemLast, textAlign: 'center', color: '#6b7280', fontStyle: 'italic' }}>
                    No users assigned
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
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
                onClick={cancelDeleteRole}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.modalCloseButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X style={{ height: '1.25rem', width: '1.25rem' }} />
              </button>
            </div>
            <div style={styles.confirmBody}>
              <p style={styles.confirmMessage}>
                Are you sure you want to delete the role "<span style={styles.confirmRoleName}>{roleToDelete?.name}</span>"? This action cannot be undone.
              </p>
            </div>
            <div style={styles.confirmFooter}>
              <button
                onClick={cancelDeleteRole}
                style={styles.confirmCancelButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.confirmCancelButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.confirmCancelButton.backgroundColor}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteRole}
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

      {/* Add/Edit Role Modal */}
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
                {editingRole ? 'Edit Role' : 'Add New Role'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.modalCloseButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X style={{ height: '1.25rem', width: '1.25rem' }} />
              </button>
            </div>
            <form onSubmit={handleSubmit} style={styles.modalForm}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Role Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.formInput}
                  placeholder="Enter role name"
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={styles.formTextarea}
                  placeholder="Enter role description"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Assign Permissions
                </label>
                <div style={styles.selectContainer}>
                  <select
                    value={selectedRole ? selectedRole.id : ''}
                    onChange={(e) => {
                      const permission = permissions.find(p => p.id == e.target.value)
                      setSelectedRole(permission || null)
                    }}
                    style={styles.formSelect}
                  >
                    <option value="">Select a permission</option>
                    {permissions
                      .filter(permission => !assignedPermissions.some(ap => ap.id === permission.id))
                      .map(permission => (
                        <option key={permission.id} value={permission.id}>
                          {permission.name}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddPermission}
                    disabled={!selectedRole}
                    style={{
                      ...styles.addButtonSmall,
                      ...(selectedRole ? {} : { opacity: 0.5, cursor: 'not-allowed' })
                    }}
                  >
                    <Plus style={{ height: '1rem', width: '1rem' }} />
                    <span>Add</span>
                  </button>
                </div>
                
                <div style={styles.assignedContainer}>
                  {assignedPermissions.length === 0 ? (
                    <p style={{ ...styles.tableCellSecondary, fontStyle: 'italic', textAlign: 'center', margin: '1rem 0' }}>
                      No permissions assigned yet
                    </p>
                  ) : (
                    assignedPermissions.map((permission, index) => (
                      <div 
                        key={permission.id} 
                        style={{
                          ...styles.assignedItem,
                          ...(index === assignedPermissions.length - 1 ? styles.assignedItemLast : {})
                        }}
                      >
                        <div style={styles.assignedInfo}>
                          <div style={styles.assignedName}>{permission.name}</div>
                          <div style={styles.assignedDescription}>{permission.description}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemovePermission(permission.id)}
                          style={styles.removeButton}
                        >
                          <X style={{ height: '1rem', width: '1rem' }} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Assign Users
                </label>
                <div style={styles.userList}>
                  {users
                    .filter(user => !assignedUsers.some(au => au.id === user.id))
                    .map((user, index, array) => (
                      <div
                        key={user.id}
                        style={{
                          ...styles.userItem,
                          ...(index === array.length - 1 ? styles.userItemLast : {})
                        }}
                        onClick={() => handleAddUser(user)}
                      >
                        <div>
                          <div style={styles.userName}>{user.name}</div>
                          <div style={styles.userEmail}>{user.email}</div>
                        </div>
                        <User style={{ height: '1rem', width: '1rem', color: '#9ca3af' }} />
                      </div>
                    ))}
                </div>
                {assignedUsers.length > 0 && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <div style={{ ...styles.formLabel, marginBottom: '0.25rem' }}>
                      Assigned Users
                    </div>
                    {assignedUsers.map((user, index) => (
                      <div 
                        key={user.id} 
                        style={{
                          ...styles.assignedItem,
                          ...(index === assignedUsers.length - 1 ? styles.assignedItemLast : {})
                        }}
                      >
                        <div style={styles.assignedInfo}>
                          <div style={styles.assignedName}>{user.name}</div>
                          <div style={styles.assignedDescription}>{user.email}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveUser(user.id)}
                          style={styles.removeButton}
                        >
                          <X style={{ height: '1rem', width: '1rem' }} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
            <div style={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                style={styles.saveButton}
              >
                <Save style={{ height: '1rem', width: '1rem' }} />
                <span>Save Role</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoleManagementPage