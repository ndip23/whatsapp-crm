import { useState } from 'react'
import { showToast } from '../utils/toast'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'contacts',
      lastSeen: true,
      readReceipts: true
    },
    appearance: {
      theme: 'light',
      language: 'english'
    },
    chat: {
      enterToSend: true,
      mediaVisibility: true,
      autoDownload: {
        images: true,
        videos: false,
        documents: false
      }
    }
  })

  const handleNotificationChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting]
      }
    }))
  }

  const handlePrivacyChange = (setting, value = null) => {
    if (value !== null) {
      setSettings(prev => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          [setting]: value
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        privacy: {
          ...prev.privacy,
          [setting]: !prev.privacy[setting]
        }
      }))
    }
  }

  const handleAppearanceChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [setting]: value
      }
    }))
  }

  const handleChatChange = (section, setting) => {
    if (section === 'autoDownload') {
      setSettings(prev => ({
        ...prev,
        chat: {
          ...prev.chat,
          autoDownload: {
            ...prev.chat.autoDownload,
            [setting]: !prev.chat.autoDownload[setting]
          }
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        chat: {
          ...prev.chat,
          [setting]: !prev.chat[setting]
        }
      }))
    }
  }

  const handleSave = () => {
    // In a real app, you would save these settings to a backend
    showToast('Settings saved successfully!', 'success')
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
    section: {
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid #e5e7eb'
    },
    sectionTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '1rem'
    },
    sectionDescription: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '1.5rem'
    },
    settingRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 0'
    },
    settingInfo: {
      flex: '1'
    },
    settingLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.25rem'
    },
    settingDescription: {
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    toggleContainer: {
      position: 'relative',
      display: 'inline-block',
      width: '40px',
      height: '24px'
    },
    toggleInput: {
      opacity: '0',
      width: '0',
      height: '0'
    },
    toggleSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: '#d1d5db',
      transition: '0.3s',
      borderRadius: '24px'
    },
    toggleSliderBefore: {
      position: 'absolute',
      content: '""',
      height: '16px',
      width: '16px',
      left: '4px',
      bottom: '4px',
      backgroundColor: 'white',
      transition: '0.3s',
      borderRadius: '50%'
    },
    toggleSliderChecked: {
      backgroundColor: '#10b981'
    },
    toggleSliderBeforeChecked: {
      transform: 'translateX(16px)'
    },
    select: {
      padding: '0.5rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
      backgroundColor: '#ffffff',
      color: '#374151'
    },
    radioGroup: {
      display: 'flex',
      gap: '1rem',
      marginTop: '0.5rem'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#374151',
      cursor: 'pointer'
    },
    radioInput: {
      marginRight: '0.5rem'
    },
    saveButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#10b981',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      marginTop: '1rem'
    },
    saveButtonHover: {
      backgroundColor: '#059669'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Settings</h1>
      </div>

      {/* Notifications Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Notifications</h2>
        <p style={styles.sectionDescription}>Choose which notifications you want to receive</p>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Email notifications</div>
            <div style={styles.settingDescription}>Receive email notifications for important updates</div>
          </div>
          <label style={styles.toggleContainer}>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={() => handleNotificationChange('email')}
              style={styles.toggleInput}
            />
            <span 
              style={{
                ...styles.toggleSlider,
                ...(settings.notifications.email ? styles.toggleSliderChecked : {})
              }}
            >
              <span 
                style={{
                  ...styles.toggleSliderBefore,
                  ...(settings.notifications.email ? styles.toggleSliderBeforeChecked : {})
                }}
              ></span>
            </span>
          </label>
        </div>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Push notifications</div>
            <div style={styles.settingDescription}>Receive push notifications on your device</div>
          </div>
          <label style={styles.toggleContainer}>
            <input
              type="checkbox"
              checked={settings.notifications.push}
              onChange={() => handleNotificationChange('push')}
              style={styles.toggleInput}
            />
            <span 
              style={{
                ...styles.toggleSlider,
                ...(settings.notifications.push ? styles.toggleSliderChecked : {})
              }}
            >
              <span 
                style={{
                  ...styles.toggleSliderBefore,
                  ...(settings.notifications.push ? styles.toggleSliderBeforeChecked : {})
                }}
              ></span>
            </span>
          </label>
        </div>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>SMS notifications</div>
            <div style={styles.settingDescription}>Receive SMS notifications for critical alerts</div>
          </div>
          <label style={styles.toggleContainer}>
            <input
              type="checkbox"
              checked={settings.notifications.sms}
              onChange={() => handleNotificationChange('sms')}
              style={styles.toggleInput}
            />
            <span 
              style={{
                ...styles.toggleSlider,
                ...(settings.notifications.sms ? styles.toggleSliderChecked : {})
              }}
            >
              <span 
                style={{
                  ...styles.toggleSliderBefore,
                  ...(settings.notifications.sms ? styles.toggleSliderBeforeChecked : {})
                }}
              ></span>
            </span>
          </label>
        </div>
      </div>

      {/* Privacy Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Privacy</h2>
        <p style={styles.sectionDescription}>Control your privacy settings and who can see your information</p>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Profile visibility</div>
            <div style={styles.settingDescription}>Who can see your profile information</div>
          </div>
          <select
            value={settings.privacy.profileVisibility}
            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
            style={styles.select}
          >
            <option value="everyone">Everyone</option>
            <option value="contacts">My contacts</option>
            <option value="nobody">Nobody</option>
          </select>
        </div>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Last seen</div>
            <div style={styles.settingDescription}>Show when you were last seen</div>
          </div>
          <label style={styles.toggleContainer}>
            <input
              type="checkbox"
              checked={settings.privacy.lastSeen}
              onChange={() => handlePrivacyChange('lastSeen')}
              style={styles.toggleInput}
            />
            <span 
              style={{
                ...styles.toggleSlider,
                ...(settings.privacy.lastSeen ? styles.toggleSliderChecked : {})
              }}
            >
              <span 
                style={{
                  ...styles.toggleSliderBefore,
                  ...(settings.privacy.lastSeen ? styles.toggleSliderBeforeChecked : {})
                }}
              ></span>
            </span>
          </label>
        </div>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Read receipts</div>
            <div style={styles.settingDescription}>Show when you've read messages</div>
          </div>
          <label style={styles.toggleContainer}>
            <input
              type="checkbox"
              checked={settings.privacy.readReceipts}
              onChange={() => handlePrivacyChange('readReceipts')}
              style={styles.toggleInput}
            />
            <span 
              style={{
                ...styles.toggleSlider,
                ...(settings.privacy.readReceipts ? styles.toggleSliderChecked : {})
              }}
            >
              <span 
                style={{
                  ...styles.toggleSliderBefore,
                  ...(settings.privacy.readReceipts ? styles.toggleSliderBeforeChecked : {})
                }}
              ></span>
            </span>
          </label>
        </div>
      </div>

      {/* Appearance Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Appearance</h2>
        <p style={styles.sectionDescription}>Customize the look and feel of the application</p>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Theme</div>
            <div style={styles.settingDescription}>Choose between light and dark mode</div>
          </div>
          <select
            value={settings.appearance.theme}
            onChange={(e) => handleAppearanceChange('theme', e.target.value)}
            style={styles.select}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Language</div>
            <div style={styles.settingDescription}>Select your preferred language</div>
          </div>
          <select
            value={settings.appearance.language}
            onChange={(e) => handleAppearanceChange('language', e.target.value)}
            style={styles.select}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="german">German</option>
          </select>
        </div>
      </div>

      {/* Chat Settings Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Chat Settings</h2>
        <p style={styles.sectionDescription}>Configure your chat preferences</p>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Enter to send</div>
            <div style={styles.settingDescription}>Press Enter to send messages</div>
          </div>
          <label style={styles.toggleContainer}>
            <input
              type="checkbox"
              checked={settings.chat.enterToSend}
              onChange={() => handleChatChange(null, 'enterToSend')}
              style={styles.toggleInput}
            />
            <span 
              style={{
                ...styles.toggleSlider,
                ...(settings.chat.enterToSend ? styles.toggleSliderChecked : {})
              }}
            >
              <span 
                style={{
                  ...styles.toggleSliderBefore,
                  ...(settings.chat.enterToSend ? styles.toggleSliderBeforeChecked : {})
                }}
              ></span>
            </span>
          </label>
        </div>
        
        <div style={styles.settingRow}>
          <div style={styles.settingInfo}>
            <div style={styles.settingLabel}>Media visibility</div>
            <div style={styles.settingDescription}>Show media in gallery</div>
          </div>
          <label style={styles.toggleContainer}>
            <input
              type="checkbox"
              checked={settings.chat.mediaVisibility}
              onChange={() => handleChatChange(null, 'mediaVisibility')}
              style={styles.toggleInput}
            />
            <span 
              style={{
                ...styles.toggleSlider,
                ...(settings.chat.mediaVisibility ? styles.toggleSliderChecked : {})
              }}
            >
              <span 
                style={{
                  ...styles.toggleSliderBefore,
                  ...(settings.chat.mediaVisibility ? styles.toggleSliderBeforeChecked : {})
                }}
              ></span>
            </span>
          </label>
        </div>
        
        <div style={{ padding: '1rem 0' }}>
          <div style={styles.settingLabel}>Auto-download media</div>
          <div style={styles.settingDescription}>Automatically download media when connected to</div>
          
          <div style={styles.settingRow}>
            <div style={styles.settingInfo}>
              <div style={styles.settingLabel}>Images</div>
            </div>
            <label style={styles.toggleContainer}>
              <input
                type="checkbox"
                checked={settings.chat.autoDownload.images}
                onChange={() => handleChatChange('autoDownload', 'images')}
                style={styles.toggleInput}
              />
              <span 
                style={{
                  ...styles.toggleSlider,
                  ...(settings.chat.autoDownload.images ? styles.toggleSliderChecked : {})
                }}
              >
                <span 
                  style={{
                    ...styles.toggleSliderBefore,
                    ...(settings.chat.autoDownload.images ? styles.toggleSliderBeforeChecked : {})
                  }}
                ></span>
              </span>
            </label>
          </div>
          
          <div style={styles.settingRow}>
            <div style={styles.settingInfo}>
              <div style={styles.settingLabel}>Videos</div>
            </div>
            <label style={styles.toggleContainer}>
              <input
                type="checkbox"
                checked={settings.chat.autoDownload.videos}
                onChange={() => handleChatChange('autoDownload', 'videos')}
                style={styles.toggleInput}
              />
              <span 
                style={{
                  ...styles.toggleSlider,
                  ...(settings.chat.autoDownload.videos ? styles.toggleSliderChecked : {})
                }}
              >
                <span 
                  style={{
                    ...styles.toggleSliderBefore,
                    ...(settings.chat.autoDownload.videos ? styles.toggleSliderBeforeChecked : {})
                  }}
                ></span>
              </span>
            </label>
          </div>
          
          <div style={styles.settingRow}>
            <div style={styles.settingInfo}>
              <div style={styles.settingLabel}>Documents</div>
            </div>
            <label style={styles.toggleContainer}>
              <input
                type="checkbox"
                checked={settings.chat.autoDownload.documents}
                onChange={() => handleChatChange('autoDownload', 'documents')}
                style={styles.toggleInput}
              />
              <span 
                style={{
                  ...styles.toggleSlider,
                  ...(settings.chat.autoDownload.documents ? styles.toggleSliderChecked : {})
                }}
              >
                <span 
                  style={{
                    ...styles.toggleSliderBefore,
                    ...(settings.chat.autoDownload.documents ? styles.toggleSliderBeforeChecked : {})
                  }}
                ></span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <button
        style={styles.saveButton}
        onMouseEnter={(e) => e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = styles.saveButton.backgroundColor}
        onClick={handleSave}
      >
        Save Settings
      </button>
    </div>
  )
}

export default SettingsPage