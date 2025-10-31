import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../utils/toast'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(1) // 1: email, 2: code, 3: new password
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Handle email submission
  const handleEmailSubmit = (e) => {
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
    
    // In a real app, you would send a request to your backend to send the code
    // For demo purposes, we'll just move to the next step
    setStep(2)
    showToast('Code sent to your email!', 'success')
  }

  // Styles for the page
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
      marginBottom: '1.5rem'
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
      paddingLeft: '3rem',
      paddingRight: '1rem',
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      border: '1px solid #d1d5db',
      placeholderColor: '#9ca3af',
      color: '#111827',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputError: {
      borderColor: '#ef4444'
    },
    // Error message styling
    errorMessage: {
      marginTop: '0.25rem',
      fontSize: '0.75rem',
      color: '#ef4444'
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
    buttonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1rem',
      color: '#10b981',
      textDecoration: 'none',
      fontSize: '0.875rem'
    },
    timer: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    timerActive: {
      color: '#ef4444'
    },
    codeContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.5rem',
      margin: '1.5rem 0'
    },
    codeInput: {
      width: '3rem',
      height: '3rem',
      textAlign: 'center',
      fontSize: '1.25rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      outline: 'none',
      transition: 'border-color 0.15s ease-in-out'
    },
    codeInputFocus: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)'
    },
    codeInputError: {
      borderColor: '#ef4444'
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
            Reset Password
          </h2>
          
          {step === 1 && (
            <>
              <p style={styles.subtitle}>
                Enter your email to receive a verification code
              </p>
              <form style={styles.form} onSubmit={handleEmailSubmit}>
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

                <div style={{ marginTop: '1rem' }}>
                  <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                  >
                    Send Code
                  </button>
                </div>
              </form>
            </>
          )}
          
          {step === 2 && (
            <CodeVerification 
              styles={styles} 
              onBack={() => setStep(1)} 
              onNext={() => setStep(3)}
            />
          )}
          
          {step === 3 && (
            <NewPassword 
              styles={styles} 
              onBack={() => setStep(2)} 
              onFinish={() => {
                showToast('Password reset successfully!', 'success')
                navigate('/login')
              }}
            />
          )}
          
          <div style={styles.backButton} onClick={() => navigate('/login')}>
            <svg style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </div>
        </div>
      </div>
    </div>
  )
}

// Code verification component
const CodeVerification = ({ styles, onBack, onNext }) => {
  const [code, setCode] = useState(Array(6).fill(''))
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [timer, setTimer] = useState(60)
  const [errors, setErrors] = useState({})

  // Focus management for code inputs
  const inputRefs = Array(6).fill(null).map(() => React.createRef())

  // Handle input change
  const handleInputChange = (index, value) => {
    // Allow only digits
    if (value && !/^\d$/.test(value)) return
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    
    // Move to next input if a digit is entered
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus()
    }
    
    // Auto-validate when all 6 digits are entered
    if (newCode.every(digit => digit !== '') && newCode.length === 6) {
      validateCode(newCode.join(''))
    }
  }

  // Handle key down (for backspace)
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  // Validate the code
  const validateCode = (enteredCode) => {
    // In a real app, you would validate this with your backend
    // For demo, we'll accept "123456" as the correct code
    if (enteredCode === '123456') {
      showToast('Code verified successfully!', 'success')
      setTimeout(() => {
        onNext()
      }, 1000)
    } else {
      setErrors({ code: 'Incorrect code. Please try again.' })
      setCode(Array(6).fill(''))
      inputRefs[0].current?.focus()
      showToast('Incorrect code. Please try again.', 'error')
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    
    const newCode = Array(6).fill('')
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i]
    }
    setCode(newCode)
    
    // Focus on the next empty input or the last one
    const nextIndex = pastedData.length < 6 ? pastedData.length : 5
    inputRefs[nextIndex].current?.focus()
    
    // Auto-validate if all 6 digits are pasted
    if (pastedData.length === 6) {
      validateCode(pastedData)
    }
  }

  // Resend code
  const handleResend = () => {
    setIsResendDisabled(true)
    setTimer(60)
    showToast('New code sent to your email!', 'success')
  }

  // Timer effect
  React.useEffect(() => {
    let interval = null
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsResendDisabled(false)
    }
    return () => clearInterval(interval)
  }, [isResendDisabled, timer])

  return (
    <>
      <p style={styles.subtitle}>
        Enter the 6-digit code sent to your email
      </p>
      
      <div style={styles.codeContainer}>
        {code.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            style={{
              ...styles.codeInput,
              ...(errors.code ? styles.codeInputError : {}),
              ...(document.activeElement === inputRefs[index]?.current ? styles.codeInputFocus : {})
            }}
            autoFocus={index === 0}
          />
        ))}
      </div>
      
      {errors.code && (
        <p style={{ ...styles.errorMessage, textAlign: 'center' }}>{errors.code}</p>
      )}
      
      <div style={styles.timer}>
        {isResendDisabled ? (
          <span style={styles.timerActive}>Resend code in {timer}s</span>
        ) : (
          <button 
            onClick={handleResend}
            style={{ ...styles.button, backgroundColor: '#3b82f6' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Resend Code
          </button>
        )}
      </div>
      
      <div style={{ ...styles.backButton, justifyContent: 'center', marginTop: '2rem' }} onClick={onBack}>
        <svg style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Use a different email
      </div>
    </>
  )
}

// New password component
const NewPassword = ({ styles, onBack, onFinish }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})

  // Handle password submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Reset previous errors
    setErrors({})
    
    // Validate passwords
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }))
      showToast('Password is required', 'error')
      return
    }
    
    if (password.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }))
      showToast('Password must be at least 6 characters', 'error')
      return
    }
    
    if (!confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Please confirm your password' }))
      showToast('Please confirm your password', 'error')
      return
    }
    
    if (password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }))
      showToast('Passwords do not match', 'error')
      return
    }
    
    // In a real app, you would send the new password to your backend
    // For demo, we'll just show success
    onFinish()
  }

  return (
    <>
      <p style={styles.subtitle}>
        Enter your new password
      </p>
      
      <form style={styles.form} onSubmit={handleSubmit}>
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
            required
            style={{ 
              ...styles.input,
              ...(errors.password ? styles.inputError : {})
            }}
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            style={{
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
            }}
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
        
        <div style={styles.inputGroup}>
          <div style={styles.inputIconLeft}>
            <svg style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <input
            id="confirm-password"
            name="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            required
            style={{ 
              ...styles.input,
              ...(errors.confirmPassword ? styles.inputError : {})
            }}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            style={{
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
            }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
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
          {errors.confirmPassword && (
            <p style={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Reset Password
          </button>
        </div>
      </form>
      
      <div style={{ ...styles.backButton, justifyContent: 'center', marginTop: '1rem' }} onClick={onBack}>
        <svg style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </div>
    </>
  )
}

export default ForgotPasswordPage