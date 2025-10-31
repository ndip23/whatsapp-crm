import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { showToast } from '../utils/toast'

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })
  
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required'
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required'
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // In a real app, you would send this data to a backend
      console.log('Password change request:', formData)
      showToast('Password changed successfully!', 'success')
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }

  const styles = {
    container: {
      padding: '1.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.75rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    header: {
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#111827'
    },
    subtitle: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginTop: '0.25rem'
    },
    form: {
      maxWidth: '28rem'
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
    inputContainer: {
      position: 'relative'
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '0.75rem',
      paddingLeft: '2.5rem', // Space for icon
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
    inputError: {
      borderColor: '#ef4444'
    },
    iconContainer: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      color: '#9ca3af'
    },
    icon: {
      height: '1.25rem',
      width: '1.25rem'
    },
    togglePasswordButton: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#9ca3af'
    },
    errorText: {
      display: 'block',
      fontSize: '0.75rem',
      color: '#ef4444',
      marginTop: '0.25rem'
    },
    submitButton: {
      padding: '0.75rem 1rem',
      backgroundColor: '#10b981',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%'
    },
    submitButtonHover: {
      backgroundColor: '#059669'
    },
    passwordRequirements: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginTop: '0.25rem'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Change Password</h1>
        <p style={styles.subtitle}>Update your password to keep your account secure</p>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Current Password</label>
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPasswords.currentPassword ? 'text' : 'password'}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(errors.currentPassword ? styles.inputError : {}),
                ...(errors.currentPassword ? { borderColor: '#ef4444' } : {})
              }}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor
                e.target.style.outline = styles.inputFocus.outline
                e.target.style.outlineOffset = styles.inputFocus.outlineOffset
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.currentPassword ? '#ef4444' : ''
                e.target.style.outline = ''
                e.target.style.outlineOffset = ''
              }}
              placeholder="Enter current password"
            />
            <button
              type="button"
              style={styles.togglePasswordButton}
              onClick={() => togglePasswordVisibility('currentPassword')}
              aria-label={showPasswords.currentPassword ? "Hide password" : "Show password"}
            >
              {showPasswords.currentPassword ? <EyeOff style={styles.icon} /> : <Eye style={styles.icon} />}
            </button>
          </div>
          {errors.currentPassword && <span style={styles.errorText}>{errors.currentPassword}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>New Password</label>
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              type={showPasswords.newPassword ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(errors.newPassword ? styles.inputError : {}),
                ...(errors.newPassword ? { borderColor: '#ef4444' } : {})
              }}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor
                e.target.style.outline = styles.inputFocus.outline
                e.target.style.outlineOffset = styles.inputFocus.outlineOffset
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.newPassword ? '#ef4444' : ''
                e.target.style.outline = ''
                e.target.style.outlineOffset = ''
              }}
              placeholder="Enter new password"
            />
            <button
              type="button"
              style={styles.togglePasswordButton}
              onClick={() => togglePasswordVisibility('newPassword')}
              aria-label={showPasswords.newPassword ? "Hide password" : "Show password"}
            >
              {showPasswords.newPassword ? <EyeOff style={styles.icon} /> : <Eye style={styles.icon} />}
            </button>
          </div>
          {errors.newPassword && <span style={styles.errorText}>{errors.newPassword}</span>}
          <p style={styles.passwordRequirements}>Password must be at least 8 characters long</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm New Password</label>
          <div style={styles.inputContainer}>
            <div style={styles.iconContainer}>
              <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <input
              type={showPasswords.confirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={{
                ...styles.input,
                ...(errors.confirmPassword ? styles.inputError : {}),
                ...(errors.confirmPassword ? { borderColor: '#ef4444' } : {})
              }}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor
                e.target.style.outline = styles.inputFocus.outline
                e.target.style.outlineOffset = styles.inputFocus.outlineOffset
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : ''
                e.target.style.outline = ''
                e.target.style.outlineOffset = ''
              }}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              style={styles.togglePasswordButton}
              onClick={() => togglePasswordVisibility('confirmPassword')}
              aria-label={showPasswords.confirmPassword ? "Hide password" : "Show password"}
            >
              {showPasswords.confirmPassword ? <EyeOff style={styles.icon} /> : <Eye style={styles.icon} />}
            </button>
          </div>
          {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
        </div>

        <button
          type="submit"
          style={styles.submitButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.submitButton.backgroundColor}
        >
          Update Password
        </button>
      </form>
    </div>
  )
}

export default ChangePasswordPage