import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { showToast } from '../utils/toast'

const ProfilePage = () => {
  const { currentUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    phoneNumber: '+1234567890',
    department: 'Administration',
    position: 'System Administrator'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would save this data to a backend
    showToast('Profile updated successfully!', 'success')
    setIsEditing(false)
  }

  const styles = {
    container: {
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#111827'
    },
    editButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#10b981',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer'
    },
    editButtonHover: {
      backgroundColor: '#059669'
    },
    profileSection: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '2rem'
    },
    avatarSection: {
      flex: '0 0 auto'
    },
    avatar: {
      height: '8rem',
      width: '8rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1rem'
    },
    avatarIcon: {
      height: '4rem',
      width: '4rem',
      color: '#10b981'
    },
    uploadButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#f3f4f6',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%'
    },
    uploadButtonHover: {
      backgroundColor: '#e5e7eb'
    },
    infoSection: {
      flex: '1'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      backgroundColor: '#ffffff',
      color: '#111827'
    },
    inputFocus: {
      borderColor: '#10b981',
      outline: '2px solid #10b981',
      outlineOffset: '0px'
    },
    readOnlyInput: {
      display: 'block',
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      backgroundColor: '#f9fafb',
      color: '#6b7280',
      cursor: 'not-allowed'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end'
    },
    saveButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#10b981',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer'
    },
    saveButtonHover: {
      backgroundColor: '#059669'
    },
    cancelButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#f3f4f6',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer'
    },
    cancelButtonHover: {
      backgroundColor: '#e5e7eb'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>User Profile</h1>
        {!isEditing && (
          <button
            style={styles.editButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.editButtonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.editButton.backgroundColor}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div style={styles.profileSection}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            <svg style={styles.avatarIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          {isEditing && (
            <button
              style={styles.uploadButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.uploadButtonHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.uploadButton.backgroundColor}
            >
              Upload New Photo
            </button>
          )}
        </div>

        <div style={styles.infoSection}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.inputFocus.borderColor
                    e.target.style.outline = styles.inputFocus.outline
                    e.target.style.outlineOffset = styles.inputFocus.outlineOffset
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = ''
                    e.target.style.outline = ''
                    e.target.style.outlineOffset = ''
                  }}
                />
              ) : (
                <div style={styles.readOnlyInput}>{profileData.firstName}</div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.inputFocus.borderColor
                    e.target.style.outline = styles.inputFocus.outline
                    e.target.style.outlineOffset = styles.inputFocus.outlineOffset
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = ''
                    e.target.style.outline = ''
                    e.target.style.outlineOffset = ''
                  }}
                />
              ) : (
                <div style={styles.readOnlyInput}>{profileData.lastName}</div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.inputFocus.borderColor
                    e.target.style.outline = styles.inputFocus.outline
                    e.target.style.outlineOffset = styles.inputFocus.outlineOffset
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = ''
                    e.target.style.outline = ''
                    e.target.style.outlineOffset = ''
                  }}
                />
              ) : (
                <div style={styles.readOnlyInput}>{profileData.email}</div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.inputFocus.borderColor
                    e.target.style.outline = styles.inputFocus.outline
                    e.target.style.outlineOffset = styles.inputFocus.outlineOffset
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = ''
                    e.target.style.outline = ''
                    e.target.style.outlineOffset = ''
                  }}
                />
              ) : (
                <div style={styles.readOnlyInput}>{profileData.phoneNumber}</div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={profileData.department}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.inputFocus.borderColor
                    e.target.style.outline = styles.inputFocus.outline
                    e.target.style.outlineOffset = styles.inputFocus.outlineOffset
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = ''
                    e.target.style.outline = ''
                    e.target.style.outlineOffset = ''
                  }}
                />
              ) : (
                <div style={styles.readOnlyInput}>{profileData.department}</div>
              )}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Position</label>
              {isEditing ? (
                <input
                  type="text"
                  name="position"
                  value={profileData.position}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = styles.inputFocus.borderColor
                    e.target.style.outline = styles.inputFocus.outline
                    e.target.style.outlineOffset = styles.inputFocus.outlineOffset
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = ''
                    e.target.style.outline = ''
                    e.target.style.outlineOffset = ''
                  }}
                />
              ) : (
                <div style={styles.readOnlyInput}>{profileData.position}</div>
              )}
            </div>

            {isEditing && (
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = styles.cancelButtonHover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = styles.cancelButton.backgroundColor}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.saveButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = styles.saveButton.backgroundColor}
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage