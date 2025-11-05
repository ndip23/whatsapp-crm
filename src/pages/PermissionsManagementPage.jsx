import { useState, useMemo } from 'react'
import { Plus, Edit, Trash2, Save, X, Search } from 'lucide-react'
import { showToast } from '../utils/toast'
import ResponsiveTable from '../components/ResponsiveTable'
import ResponsivePagination from '../components/ResponsivePagination'

const PermissionsManagementPage = () => {
  // Sample permissions data
  const [permissions, setPermissions] = useState([
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

  // Available permissions to add
  const [availablePermissions] = useState([
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
  const [permissionToDelete, setPermissionToDelete] = useState(null)
  const [editingPermission, setEditingPermission] = useState(null)
  const [selectedPermission, setSelectedPermission] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })
  const [assignedPermissions, setAssignedPermissions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter permissions based on search term
  const filteredPermissions = useMemo(() => {
    if (!searchTerm) return permissions
    
    const term = searchTerm.toLowerCase()
    return permissions.filter(permission => 
      permission.name.toLowerCase().includes(term) ||
      (permission.description && permission.description.toLowerCase().includes(term))
    )
  }, [permissions, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPermissions = filteredPermissions.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handleAddPermission = () => {
    setEditingPermission(null)
    setFormData({ name: '', description: '' })
    setAssignedPermissions([])
    setShowModal(true)
  }

  const handleEditPermission = (permission) => {
    setEditingPermission(permission)
    setFormData({
      name: permission.name,
      description: permission.description
    })
    // For editing, we would typically load assigned permissions from the backend
    setAssignedPermissions([])
    setShowModal(true)
  }

  const handleDeletePermission = (permission) => {
    setPermissionToDelete(permission)
    setShowDeleteConfirm(true)
  }

  const confirmDeletePermission = () => {
    if (permissionToDelete) {
      setPermissions(permissions.filter(permission => permission.id !== permissionToDelete.id))
      showToast('Permission deleted successfully', 'success')
      setShowDeleteConfirm(false)
      setPermissionToDelete(null)
    }
  }

  const cancelDeletePermission = () => {
    setShowDeleteConfirm(false)
    setPermissionToDelete(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name) {
      showToast('Permission name is required', 'error')
      return
    }
    
    if (editingPermission) {
      // Update existing permission
      setPermissions(permissions.map(permission => 
        permission.id === editingPermission.id 
          ? { ...permission, ...formData }
          : permission
      ))
      showToast('Permission updated successfully', 'success')
    } else {
      // Add new permission
      const newPermission = {
        id: permissions.length + 1,
        ...formData
      }
      setPermissions([...permissions, newPermission])
      showToast('Permission added successfully', 'success')
    }
    setShowModal(false)
  }

  const handleAddToAssigned = () => {
    if (selectedPermission && !assignedPermissions.some(p => p.id === selectedPermission.id)) {
      const permissionToAdd = availablePermissions.find(p => p.id === selectedPermission.id)
      setAssignedPermissions([...assignedPermissions, permissionToAdd])
      setSelectedPermission(null)
    }
  }

  const handleRemoveFromAssigned = (id) => {
    setAssignedPermissions(assignedPermissions.filter(permission => permission.id !== id))
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
    tableCellSecondary: {
      color: '#6b7280'
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
    modalOverlay: {
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '50',
      opacity: 0
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
      transform: 'scale(0.98)',
      opacity: 0,
      maxHeight: '90vh',
      overflowY: 'auto'
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
      justifyContent: 'center'
    },
    modalCloseButtonHover: {
      backgroundColor: '#f3f4f6',
      color: '#111827'
    },
    modalForm: {
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
    formInputFocus: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
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
    addButtonSmallHover: {
      backgroundColor: '#059669'
    },
    assignedPermissionsContainer: {
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      padding: '0.75rem',
      marginBottom: '1rem',
      maxHeight: '12rem',
      overflowY: 'auto'
    },
    assignedPermissionItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    assignedPermissionItemLast: {
      borderBottom: 'none'
    },
    assignedPermissionInfo: {
      flex: '1'
    },
    assignedPermissionName: {
      fontWeight: '500',
      fontSize: '0.875rem',
      color: '#111827'
    },
    assignedPermissionDescription: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.125rem'
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
    removeButtonHover: {
      backgroundColor: '#fef2f2'
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
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    saveButtonHover: {
      backgroundColor: '#059669'
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
    confirmPermissionName: {
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
      
      .addButton {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
    }
    
    /* Custom scrollbar */
    .assignedPermissionsContainer::-webkit-scrollbar {
      width: 6px;
    }
    
    .assignedPermissionsContainer::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 3px;
    }
    
    .assignedPermissionsContainer::-webkit-scrollbar-thumb {
      background: #a7f3d0;
      border-radius: 3px;
    }
    
    .assignedPermissionsContainer::-webkit-scrollbar-thumb:hover {
      background: #6ee7b7;
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Permissions Management</h1>
        <button
          onClick={handleAddPermission}
          style={styles.addButton}
        >
          <Plus style={{ height: '1rem', width: '1rem' }} />
          <span>Add Permission</span>
        </button>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search permissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.tableContainer}>
        <ResponsiveTable
          columns={[
            { key: 'name', header: 'Permission Name', isPrimary: true },
            { key: 'description', header: 'Description' },
            { key: 'actions', header: 'Actions', sortable: false }
          ]}
          data={currentPermissions.map(permission => ({
            id: permission.id,
            name: permission.name,
            description: permission.description,
            permission: permission
          }))}
          renderCell={(row, column) => {
            switch (column.key) {
              case 'description':
                return <span style={styles.tableCellSecondary}>{row.description}</span>;
              case 'actions':
                return (
                  <div>
                    <button
                      onClick={() => handleEditPermission(row.permission)}
                      style={styles.actionButton}
                      title="Edit Permission"
                    >
                      <Edit style={{ height: '1rem', width: '1rem' }} />
                    </button>
                    <button
                      onClick={() => handleDeletePermission(row.permission)}
                      style={{ ...styles.actionButton, ...styles.actionButtonDanger }}
                      title="Delete Permission"
                    >
                      <Trash2 style={{ height: '1rem', width: '1rem' }} />
                    </button>
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
          totalItems={filteredPermissions.length}
          showInfo={true}
          showNavigation={true}
        />
      </div>

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
                onClick={cancelDeletePermission}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.modalCloseButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X style={{ height: '1.25rem', width: '1.25rem' }} />
              </button>
            </div>
            <div style={styles.confirmBody}>
              <p style={styles.confirmMessage}>
                Are you sure you want to delete <span style={styles.confirmPermissionName}>{permissionToDelete?.name}</span>? This action cannot be undone.
              </p>
            </div>
            <div style={styles.confirmFooter}>
              <button
                onClick={cancelDeletePermission}
                style={styles.confirmCancelButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.confirmCancelButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.confirmCancelButton.backgroundColor}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePermission}
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

      {/* Modal */}
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
                {editingPermission ? 'Edit Permission' : 'Add New Permission'}
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
                  Permission Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={styles.formInput}
                  placeholder="Enter permission name"
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
                  placeholder="Enter permission description"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Assign Permissions
                </label>
                <div style={styles.selectContainer}>
                  <select
                    value={selectedPermission ? selectedPermission.id : ''}
                    onChange={(e) => {
                      const permission = availablePermissions.find(p => p.id === parseInt(e.target.value))
                      setSelectedPermission(permission || null)
                    }}
                    style={styles.formSelect}
                  >
                    <option value="">Select a permission</option>
                    {availablePermissions
                      .filter(permission => !assignedPermissions.some(ap => ap.id === permission.id))
                      .map(permission => (
                        <option key={permission.id} value={permission.id}>
                          {permission.name}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddToAssigned}
                    disabled={!selectedPermission}
                    style={{
                      ...styles.addButtonSmall,
                      ...(selectedPermission ? {} : { opacity: 0.5, cursor: 'not-allowed' })
                    }}
                  >
                    <Plus style={{ height: '1rem', width: '1rem' }} />
                    <span>Add</span>
                  </button>
                </div>
                
                <div style={styles.assignedPermissionsContainer}>
                  {assignedPermissions.length === 0 ? (
                    <p style={{ ...styles.tableCellSecondary, fontStyle: 'italic', textAlign: 'center', margin: '1rem 0' }}>
                      No permissions assigned yet
                    </p>
                  ) : (
                    assignedPermissions.map((permission, index) => (
                      <div 
                        key={permission.id} 
                        style={{
                          ...styles.assignedPermissionItem,
                          ...(index === assignedPermissions.length - 1 ? styles.assignedPermissionItemLast : {})
                        }}
                      >
                        <div style={styles.assignedPermissionInfo}>
                          <div style={styles.assignedPermissionName}>{permission.name}</div>
                          <div style={styles.assignedPermissionDescription}>{permission.description}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFromAssigned(permission.id)}
                          style={styles.removeButton}
                        >
                          <X style={{ height: '1rem', width: '1rem' }} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
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
                  style={styles.saveButton}
                >
                  <Save style={{ height: '1rem', width: '1rem' }} />
                  <span>Save Permission</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PermissionsManagementPage