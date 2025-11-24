import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../utils/toast'
import { login } from '../services/authService'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault()

    // Reset previous errors
    setErrors({})

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }))
      showToast('Email is required', 'error')
      return
    } else if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }))
      showToast('Please enter a valid email address', 'error')
      return
    }

    // Validate password
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }))
      showToast('Password is required', 'error')
      return
    }

    try {
      const response = await login({ email, password })
      if (response && response.data) {
        showToast('Login successful!', 'success')
        // Small delay to show toast before navigation
        setTimeout(() => {
          navigate('/dashboard')
        }, 500)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Invalid email or password'
      showToast(errorMessage, 'error')
      setErrors(prev => ({ ...prev, general: errorMessage }))
    }
  }

  // Styles for the login page
  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)',
      padding: '1rem'
    },
    container: {
      maxWidth: '28rem',
      width: '100%',
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    logoContainer: {
      height: '4rem',
      width: '4rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
    },
    logo: {
      height: '2.5rem',
      width: '2.5rem',
      color: '#10b981'
    },
    title: {
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#111827'
    },
    subtitle: {
      marginTop: '0.5rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    form: {
      marginTop: '2rem'
    },
    // Input group with icon container
    inputGroup: {
      position: 'relative',
      marginBottom: '1.5rem' // Increased spacing between fields
    },
    // Icon container for input fields (left side)
    inputIconLeft: {
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: '1',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none'
    },
    // Input field styles
    input: {
      appearance: 'none',
      display: 'block',
      width: '100%',
      paddingLeft: '3rem', // Increased space for left icon
      paddingRight: '3rem', // Increased space for right icon (password toggle)
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      border: '1px solid #d1d5db',
      placeholderColor: '#9ca3af',
      color: '#111827',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      outline: 'none',
      // Ensure text doesn't overlap with icons
      boxSizing: 'border-box'
    },
    inputError: {
      borderColor: '#ef4444'
    },
    // Password visibility toggle button (right side)
    togglePassword: {
      position: 'absolute',
      right: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#9ca3af',
      display: 'flex',
      alignItems: 'center',
      zIndex: '1'
    },
    // Error message styling
    errorMessage: {
      marginTop: '0.25rem',
      fontSize: '0.75rem',
      color: '#ef4444'
    },
    // Checkbox container
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    checkbox: {
      height: '1rem',
      width: '1rem',
      color: '#10b981',
      borderColor: '#d1d5db',
      borderRadius: '0.25rem'
    },
    checkboxLabel: {
      marginLeft: '0.5rem',
      fontSize: '0.875rem',
      color: '#111827'
    },
    forgotPassword: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#10b981',
      textDecoration: 'none'
    },
    forgotPasswordHover: {
      color: '#059669'
    },
    button: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: '0.75rem 1rem',
      border: '1px solid transparent',
      fontSize: '0.875rem',
      fontWeight: '500',
      borderRadius: '0.375rem',
      color: '#ffffff',
      backgroundColor: '#10b981',
      cursor: 'pointer',
      transition: 'background-color 150ms ease-in-out'
    },
    buttonHover: {
      backgroundColor: '#059669'
    },
    dividerContainer: {
      position: 'relative',
      marginTop: '1.5rem'
    },
    dividerLine: {
      position: 'absolute',
      inset: '0',
      display: 'flex',
      alignItems: 'center'
    },
    dividerBorder: {
      width: '100%',
      borderTop: '1px solid #d1d5db'
    },
    dividerText: {
      position: 'relative',
      padding: '0 0.5rem',
      fontSize: '0.875rem',
      color: '#6b7280',
      backgroundColor: '#ffffff'
    },
    demoContainer: {
      marginTop: '1rem',
      backgroundColor: '#dcfce7',
      padding: '1rem',
      borderRadius: '0.375rem'
    },
    demoText: {
      fontSize: '0.875rem',
      color: '#065f46'
    },
    demoCredential: {
      fontWeight: '500'
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div>
          <div style={styles.logoContainer}>
            <svg style={styles.logo} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 style={styles.title}>
            WhatsApp & Team Mgmt System
          </h2>
          <p style={styles.subtitle}>
            Sign in to your account
          </p>
        </div>
        <form style={styles.form} onSubmit={handleLogin}>
          {/* Email input field with icon */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIconLeft}>
              <svg style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {})
              }}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p style={styles.errorMessage}>{errors.email}</p>
            )}
          </div>

          {/* Password input field with icon and visibility toggle */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIconLeft}>
              <svg style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {})
              }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              style={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg style={{ height: '1.25rem', width: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg style={{ height: '1.25rem', width: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              )}
            </button>
            {errors.password && (
              <p style={styles.errorMessage}>{errors.password}</p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={styles.checkboxContainer}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                style={styles.checkbox}
              />
              <label htmlFor="remember-me" style={styles.checkboxLabel}>
                Remember me
              </label>
            </div>

            <div style={{ fontSize: '0.875rem' }}>
              <a href="/forgot-password" style={styles.forgotPassword}>
                Forgot your password?
              </a>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
            >
              Sign in
            </button>
          </div>
        </form>

        <div style={styles.dividerContainer}>
          <div style={styles.dividerLine}>
            <div style={styles.dividerBorder}></div>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <span style={styles.dividerText}>
              All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage