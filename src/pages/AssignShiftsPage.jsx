import { useState, useMemo } from 'react'
import { Edit, User, Clock, Trash2, Plus, Users, Check, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { showToast } from '../utils/toast'
import ResponsiveTable from '../components/ResponsiveTable'
import ResponsivePagination from '../components/ResponsivePagination'

const AssignShiftsPage = () => {
  // Sample data for shifts
  const [shifts] = useState([
    { id: 1, name: 'Morning Shift', startTime: '08:00', endTime: '16:00' },
    { id: 2, name: 'Evening Shift', startTime: '16:00', endTime: '00:00' },
    { id: 3, name: 'Night Shift', startTime: '00:00', endTime: '08:00' },
  ])

  // Sample data for users
  const [users] = useState([
    { id: 1, name: 'John Doe', role: 'Agent' },
    { id: 2, name: 'Jane Smith', role: 'Agent' },
    { id: 3, name: 'Bob Johnson', role: 'Agent' },
    { id: 4, name: 'Alice Williams', role: 'Agent' },
    { id: 5, name: 'Michael Brown', role: 'Supervisor' },
  ])

  // Sample data for shift assignments
  const [assignments, setAssignments] = useState([
    { id: 1, shiftId: 1, userIds: [1, 2, 3], date: '2023-06-01' },
    { id: 2, shiftId: 2, userIds: [2, 4], date: '2023-06-01' },
    { id: 3, shiftId: 3, userIds: [3, 5], date: '2023-06-01' },
    { id: 4, shiftId: 1, userIds: [1, 4], date: '2023-06-02' },
    { id: 5, shiftId: 2, userIds: [2, 5], date: '2023-06-02' },
    { id: 6, shiftId: 3, userIds: [3, 1], date: '2023-06-02' },
    { id: 7, shiftId: 1, userIds: [2, 3], date: '2023-06-03' },
    { id: 8, shiftId: 2, userIds: [4, 5], date: '2023-06-03' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState(null)
  const [selectedShift, setSelectedShift] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [assignmentDate, setAssignmentDate] = useState('')
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserDetails, setSelectedUserDetails] = useState([])
  
  // Pagination and search states
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleAssignShift = () => {
    setEditingAssignment(null)
    setSelectedShift('')
    setSelectedUsers([])
    setAssignmentDate('')
    setShowModal(true)
  }

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment)
    setSelectedShift(assignment.shiftId)
    setSelectedUsers([...assignment.userIds])
    setAssignmentDate(assignment.date)
    setShowModal(true)
  }

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id))
    showToast('Assignment deleted successfully', 'success')
  }
  
  const handleUserListClick = (userIds) => {
    const userDetails = getUserDetails(userIds)
    setSelectedUserDetails(userDetails)
    setShowUserModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!selectedShift) {
      showToast('Please select a shift', 'error')
      return
    }
    
    if (selectedUsers.length === 0) {
      showToast('Please select at least one user', 'error')
      return
    }
    
    if (!assignmentDate) {
      showToast('Please select a date', 'error')
      return
    }
    
    if (editingAssignment) {
      // Update existing assignment
      setAssignments(assignments.map(assignment => 
        assignment.id === editingAssignment.id 
          ? { ...assignment, shiftId: parseInt(selectedShift), userIds: selectedUsers, date: assignmentDate }
          : assignment
      ))
      showToast('Assignment updated successfully', 'success')
    } else {
      // Add new assignment
      const newAssignment = {
        id: assignments.length + 1,
        shiftId: parseInt(selectedShift),
        userIds: selectedUsers,
        date: assignmentDate
      }
      setAssignments([...assignments, newAssignment])
      showToast('Shift assigned successfully', 'success')
    }
    setShowModal(false)
  }

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const selectAllUsers = () => {
    const allUserIds = users.map(user => user.id)
    setSelectedUsers(allUserIds)
  }

  const deselectAllUsers = () => {
    setSelectedUsers([])
  }

  const getShiftDetails = (shiftId) => {
    return shifts.find(s => s.id === shiftId) || {}
  }

  const getUserNames = (userIds) => {
    return userIds.map(id => {
      const user = users.find(u => u.id === id)
      return user ? user.name : ''
    }).join(', ')
  }

  const getUserDetails = (userIds) => {
    return userIds.map(id => {
      const user = users.find(u => u.id === id)
      return user || {}
    })
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
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      paddingLeft: '1rem',
      paddingRight: '1rem',
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
    userListCell: {
      position: 'relative'
    },
    userListButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#10b981',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      fontSize: '0.8125rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem'
    },
    userListButtonHover: {
      backgroundColor: '#f0fdf4'
    },
    userListPopup: {
      position: 'absolute',
      top: '100%',
      left: 0,
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '0.375rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      zIndex: 10,
      minWidth: '200px',
      padding: '0.5rem',
      marginTop: '0.25rem'
    },
    userListTitle: {
      fontSize: '0.75rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem'
    },
    userList: {
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    userListLi: {
      padding: '0.25rem 0',
      fontSize: '0.8125rem',
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
      zIndex: '50'
    },
    modalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '100%',
      maxWidth: '32rem',
      maxHeight: '90vh',
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
      padding: '1.5rem',
      overflowY: 'auto',
      flex: 1
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
    formInput: {
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
    formInputFocus: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
    },
    userSelectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem'
    },
    userSelectionActions: {
      display: 'flex',
      gap: '0.5rem'
    },
    userActionButton: {
      fontSize: '0.75rem',
      color: '#10b981',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem'
    },
    userGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: '0.5rem',
      marginTop: '0.5rem',
      maxHeight: '300px',
      overflowY: 'auto'
    },
    userCard: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      position: 'relative'
    },
    userCardSelected: {
      backgroundColor: '#ecfdf5',
      borderColor: '#10b981'
    },
    userAvatar: {
      height: '2rem',
      width: '2rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '0.5rem'
    },
    userAvatarText: {
      color: '#065f46',
      fontWeight: '600'
    },
    userName: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#111827'
    },
    selectedIndicator: {
      position: 'absolute',
      top: '-0.25rem',
      right: '-0.25rem',
      backgroundColor: '#10b981',
      borderRadius: '50%',
      width: '1rem',
      height: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
    userModalOverlay: {
      position: 'fixed',
      inset: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: '50'
    },
    userModalContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      width: '100%',
      maxWidth: '28rem'
    },
    userModalHeader: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    userModalTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#111827'
    },
    userModalCloseButton: {
      color: '#9ca3af',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    userModalCloseButtonHover: {
      color: '#6b7280'
    },
    userModalContent: {
      padding: '1.5rem'
    },
    userListItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    userListItemLast: {
      borderBottom: 'none'
    },
    userListItemIcon: {
      height: '2rem',
      width: '2rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '0.75rem'
    },
    userListItemText: {
      color: '#065f46',
      fontWeight: '600'
    },
    userListItemName: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#111827'
    },
    userListItemRole: {
      fontSize: '0.75rem',
      color: '#6b7280'
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
      
      .userGrid {
        gridTemplateColumns: repeat(1, minmax(0, 1fr));
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
      
      .userModalContainer {
        margin: 1rem;
        max-width: calc(100% - 2rem);
      }
    }
  `

  // Filter assignments based on search term
  const filteredAssignments = useMemo(() => {
    if (!searchTerm) return assignments
    
    const term = searchTerm.toLowerCase()
    return assignments.filter(assignment => {
      const shift = getShiftDetails(assignment.shiftId)
      const userNames = getUserNames(assignment.userIds).toLowerCase()
      return (
        shift.name?.toLowerCase().includes(term) ||
        assignment.date.includes(term) ||
        userNames.includes(term)
      )
    })
  }, [assignments, searchTerm, shifts, users])

  // Pagination logic
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAssignments = filteredAssignments.slice(startIndex, endIndex)

  // Reset to first page when search term changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm])

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Assign Shifts</h1>
        <button
          onClick={handleAssignShift}
          style={styles.addButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.addButtonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.addButton.backgroundColor}
        >
          <Plus style={{ height: '1rem', width: '1rem' }} />
          <span>Assign Shift</span>
        </button>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search assignments..."
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
            { key: 'shiftName', header: 'Shift Name', isPrimary: true },
            { key: 'timeRange', header: 'Time Range' },
            { key: 'assignedUsers', header: 'Assigned Users' },
            { key: 'date', header: 'Date' },
            { key: 'actions', header: 'Actions', sortable: false }
          ]}
          data={currentAssignments.map(assignment => {
            const shift = getShiftDetails(assignment.shiftId)
            return {
              id: assignment.id,
              shiftName: shift.name,
              timeRange: `${shift.startTime} - ${shift.endTime}`,
              assignedUsers: assignment.userIds.length,
              date: assignment.date,
              assignment: assignment,
              userIds: assignment.userIds
            }
          })}
          renderCell={(row, column) => {
            switch (column.key) {
              case 'shiftName':
                return (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Clock style={{ height: '1rem', width: '1rem', marginRight: '0.5rem', color: '#6b7280' }} />
                    {row.shiftName}
                  </div>
                );
              case 'assignedUsers':
                return (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserListClick(row.userIds);
                    }}
                    style={styles.userListButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.userListButtonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <Users style={{ height: '1rem', width: '1rem' }} />
                    {row.assignedUsers} users
                  </button>
                );
              case 'actions':
                return (
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAssignment(row.assignment);
                      }}
                      style={styles.actionButton}
                      title="Edit Assignment"
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Edit style={{ height: '1rem', width: '1rem' }} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAssignment(row.assignment.id);
                      }}
                      style={{ ...styles.actionButton, ...styles.actionButtonDanger }}
                      title="Delete Assignment"
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.actionButtonDangerHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
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
          totalItems={filteredAssignments.length}
          showInfo={true}
          showNavigation={true}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingAssignment ? 'Edit Shift Assignment' : 'Assign Shift'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                style={styles.modalCloseButton}
                onMouseEnter={(e) => e.target.style.color = styles.modalCloseButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.modalCloseButton.color}
              >
                <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} style={styles.modalForm}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Select Shift
                </label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  style={styles.formSelect}
                  required
                >
                  <option value="">Select a shift</option>
                  {shifts.map(shift => (
                    <option key={shift.id} value={shift.id}>
                      {shift.name} ({shift.startTime} - {shift.endTime})
                    </option>
                  ))}
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  Assignment Date
                </label>
                <input
                  type="date"
                  value={assignmentDate}
                  onChange={(e) => setAssignmentDate(e.target.value)}
                  style={styles.formInput}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.formInputFocus.borderColor;
                    e.target.style.boxShadow = styles.formInputFocus.boxShadow;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '';
                    e.target.style.boxShadow = '';
                  }}
                  required
                />
              </div>
              
              <div style={styles.formGroup}>
                <div style={styles.userSelectionHeader}>
                  <label style={styles.formLabel}>
                    Select Users ({selectedUsers.length} selected)
                  </label>
                  <div style={styles.userSelectionActions}>
                    <button
                      type="button"
                      onClick={selectAllUsers}
                      style={styles.userActionButton}
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={deselectAllUsers}
                      style={styles.userActionButton}
                    >
                      Deselect All
                    </button>
                  </div>
                </div>
                <div style={styles.userGrid}>
                  {users.map(user => (
                    <div
                      key={user.id}
                      onClick={() => toggleUserSelection(user.id)}
                      style={{
                        ...styles.userCard,
                        ...(selectedUsers.includes(user.id) ? styles.userCardSelected : {})
                      }}
                      onMouseEnter={(e) => {
                        if (!selectedUsers.includes(user.id)) {
                          e.target.style.borderColor = '#9ca3af';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!selectedUsers.includes(user.id)) {
                          e.target.style.borderColor = '#d1d5db';
                        }
                      }}
                    >
                      <div style={styles.userAvatar}>
                        <span style={styles.userAvatarText}>
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div style={styles.userName}>{user.name}</div>
                        <div style={{ ...styles.userName, fontSize: '0.75rem', color: '#6b7280' }}>
                          {user.role}
                        </div>
                      </div>
                      {selectedUsers.includes(user.id) && (
                        <div style={styles.selectedIndicator}>
                          <Check style={{ height: '0.625rem', width: '0.625rem', color: 'white' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div style={styles.userModalOverlay}>
          <div style={styles.userModalContainer}>
            <div style={styles.userModalHeader}>
              <h3 style={styles.userModalTitle}>Assigned Users</h3>
              <button 
                onClick={() => setShowUserModal(false)}
                style={styles.userModalCloseButton}
                onMouseEnter={(e) => e.target.style.color = styles.userModalCloseButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.userModalCloseButton.color}
              >
                <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div style={styles.userModalContent}>
              {selectedUserDetails.map((user, index) => (
                <div 
                  key={user.id} 
                  style={{
                    ...styles.userListItem,
                    ...(index === selectedUserDetails.length - 1 ? styles.userListItemLast : {})
                  }}
                >
                  <div style={styles.userListItemIcon}>
                    <span style={styles.userListItemText}>
                      {user.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div>
                    <div style={styles.userListItemName}>{user.name}</div>
                    <div style={styles.userListItemRole}>{user.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssignShiftsPage