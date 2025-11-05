import { useState, useMemo } from 'react'
import { Edit, Trash2, Plus, Search } from 'lucide-react'
import { showToast } from '../utils/toast'
import ResponsiveTable from '../components/ResponsiveTable'
import ResponsivePagination from '../components/ResponsivePagination'

const ShiftManagementPage = () => {
  const [shifts, setShifts] = useState([
    { id: 1, name: 'Morning Shift', startTime: '08:00', endTime: '16:00' },
    { id: 2, name: 'Evening Shift', startTime: '16:00', endTime: '00:00' },
    { id: 3, name: 'Night Shift', startTime: '00:00', endTime: '08:00' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingShift, setEditingShift] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: ''
  })

  // Pagination and search states
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleAddShift = () => {
    setEditingShift(null)
    setFormData({ name: '', startTime: '', endTime: '' })
    setShowModal(true)
  }

  const handleEditShift = (shift) => {
    setEditingShift(shift)
    setFormData({
      name: shift.name,
      startTime: shift.startTime,
      endTime: shift.endTime
    })
    setShowModal(true)
  }

  const handleDeleteShift = (id) => {
    setShifts(shifts.filter(shift => shift.id !== id))
    showToast('Shift deleted successfully', 'success')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingShift) {
      // Update existing shift
      setShifts(shifts.map(shift => 
        shift.id === editingShift.id 
          ? { ...shift, ...formData }
          : shift
      ))
      showToast('Shift updated successfully', 'success')
    } else {
      // Add new shift
      const newShift = {
        id: shifts.length + 1,
        ...formData
      }
      setShifts([...shifts, newShift])
      showToast('Shift added successfully', 'success')
    }
    setShowModal(false)
  }

  // Filter shifts based on search term
  const filteredShifts = useMemo(() => {
    if (!searchTerm) return shifts
    
    const term = searchTerm.toLowerCase()
    return shifts.filter(shift => 
      shift.name.toLowerCase().includes(term) ||
      shift.startTime.includes(term) ||
      shift.endTime.includes(term)
    )
  }, [shifts, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredShifts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentShifts = filteredShifts.slice(startIndex, endIndex)

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
      
      .addButton {
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
      }
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Manage Shifts</h1>
        <button
          onClick={handleAddShift}
          style={styles.addButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.addButtonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.addButton.backgroundColor}
        >
          <Plus style={{ height: '1rem', width: '1rem' }} />
          <span>Add Shift</span>
        </button>
      </div>

      {/* Search Filter */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search shifts..."
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
            { key: 'name', header: 'Name', isPrimary: true },
            { key: 'startTime', header: 'Start Time' },
            { key: 'endTime', header: 'End Time' },
            { key: 'actions', header: 'Actions', sortable: false }
          ]}
          data={currentShifts.map(shift => ({
            id: shift.id,
            name: shift.name,
            startTime: shift.startTime,
            endTime: shift.endTime,
            shift: shift
          }))}
          renderCell={(row, column) => {
            switch (column.key) {
              case 'startTime':
              case 'endTime':
                return <span style={styles.tableCellSecondary}>{row[column.key]}</span>;
              case 'actions':
                return (
                  <div>
                    <button
                      onClick={() => handleEditShift(row.shift)}
                      style={styles.actionButton}
                      title="Edit Shift"
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <Edit style={{ height: '1rem', width: '1rem' }} />
                    </button>
                    <button
                      onClick={() => handleDeleteShift(row.shift.id)}
                      style={{ ...styles.actionButton, ...styles.actionButtonDanger }}
                      title="Delete Shift"
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
          totalItems={filteredShifts.length}
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
                {editingShift ? 'Edit Shift' : 'Add New Shift'}
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
                  Shift Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                <label style={styles.formLabel}>
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
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
                <label style={styles.formLabel}>
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShiftManagementPage