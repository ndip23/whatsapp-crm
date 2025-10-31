import { useState } from 'react'
import { Edit, Trash2, Plus } from 'lucide-react'
import { showToast } from '../utils/toast'

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

  const styles = {
    page: {
      padding: '1rem'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    pageTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827'
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
      alignItems: 'center'
    },
    addButtonHover: {
      backgroundColor: '#059669'
    },
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden'
    },
    table: {
      minWidth: '100%',
      borderCollapse: 'collapse',
      divideY: '1px solid #e5e7eb'
    },
    tableHeader: {
      backgroundColor: '#f9fafb'
    },
    tableHeaderCell: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
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
      backgroundColor: '#ffffff',
      divideY: '1px solid #e5e7eb'
    },
    tableRow: {
      backgroundColor: '#ffffff'
    },
    tableCell: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem',
      color: '#111827'
    },
    tableCellSecondary: {
      color: '#6b7280'
    },
    actionCell: {
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem'
    },
    actionButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280'
    },
    actionButtonHover: {
      color: '#111827'
    },
    actionButtonDanger: {
      color: '#ef4444'
    },
    actionButtonDangerHover: {
      color: '#b91c1c'
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
      ring: '1px solid #10b981'
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
    @media (min-width: 640px) {
      .tableContainer {
        overflow-x: auto;
      }
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Shift Management</h1>
        <button
          onClick={handleAddShift}
          style={styles.addButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.addButtonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.addButton.backgroundColor}
        >
          <Plus style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
          Add Shift
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Name</th>
              <th style={styles.tableHeaderCell}>Start Time</th>
              <th style={styles.tableHeaderCell}>End Time</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            {shifts.map((shift) => (
              <tr key={shift.id} style={styles.tableRow}>
                <td style={{ ...styles.tableCell, fontWeight: '500' }}>{shift.name}</td>
                <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{shift.startTime}</td>
                <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{shift.endTime}</td>
                <td style={styles.actionCell}>
                  <button
                    onClick={() => handleEditShift(shift)}
                    style={styles.actionButton}
                    onMouseEnter={(e) => e.target.style.color = styles.actionButtonHover.color}
                    onMouseLeave={(e) => e.target.style.color = styles.actionButton.color}
                  >
                    <Edit style={{ height: '1rem', width: '1rem' }} />
                  </button>
                  <button
                    onClick={() => handleDeleteShift(shift.id)}
                    style={{ ...styles.actionButton, ...styles.actionButtonDanger }}
                    onMouseEnter={(e) => e.target.style.color = styles.actionButtonDangerHover.color}
                    onMouseLeave={(e) => e.target.style.color = styles.actionButtonDanger.color}
                  >
                    <Trash2 style={{ height: '1rem', width: '1rem' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                    e.target.style.boxShadow = `0 0 0 1px ${styles.formInputFocus.ring}`;
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
                    e.target.style.boxShadow = `0 0 0 1px ${styles.formInputFocus.ring}`;
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
                    e.target.style.boxShadow = `0 0 0 1px ${styles.formInputFocus.ring}`;
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