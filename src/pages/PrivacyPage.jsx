import { useState } from 'react'
import { showToast } from '../utils/toast'

const PrivacyPage = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'contacts',
    lastSeen: true,
    readReceipts: true,
    profilePhoto: 'everyone',
    about: 'everyone',
    status: 'contacts',
    groups: 'contacts',
    blockedContacts: []
  })

  const [activeSection, setActiveSection] = useState('privacy')

  const handleSettingChange = (setting, value = null) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value !== null ? value : !prev[setting]
    }))
  }

  const handleSave = () => {
    // In a real app, you would save these settings to a backend
    showToast('Privacy settings saved successfully!', 'success')
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
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #e5e7eb',
      marginBottom: '2rem'
    },
    tab: {
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#6b7280',
      cursor: 'pointer',
      borderBottom: '2px solid transparent'
    },
    tabActive: {
      color: '#10b981',
      borderBottom: '2px solid #10b981'
    },
    section: {
      marginBottom: '2rem'
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
      padding: '0.75rem 0',
      borderBottom: '1px solid #f3f4f6'
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
    select: {
      padding: '0.5rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
      backgroundColor: '#ffffff',
      color: '#374151'
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
    blockedContactsSection: {
      marginTop: '2rem'
    },
    blockedContact: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.375rem',
      marginBottom: '0.5rem'
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center'
    },
    contactAvatar: {
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: '9999px',
      backgroundColor: '#d1fae5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '0.75rem'
    },
    contactName: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151'
    },
    unblockButton: {
      padding: '0.25rem 0.75rem',
      backgroundColor: '#f3f4f6',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      cursor: 'pointer'
    },
    unblockButtonHover: {
      backgroundColor: '#e5e7eb'
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
        <h1 style={styles.title}>Privacy Settings</h1>
      </div>

      <div style={styles.tabs}>
        <div
          style={{
            ...styles.tab,
            ...(activeSection === 'privacy' ? styles.tabActive : {})
          }}
          onClick={() => setActiveSection('privacy')}
        >
          Privacy Settings
        </div>
        <div
          style={{
            ...styles.tab,
            ...(activeSection === 'security' ? styles.tabActive : {})
          }}
          onClick={() => setActiveSection('security')}
        >
          Security
        </div>
        <div
          style={{
            ...styles.tab,
            ...(activeSection === 'blocked' ? styles.tabActive : {})
          }}
          onClick={() => setActiveSection('blocked')}
        >
          Blocked Contacts
        </div>
      </div>

      {activeSection === 'privacy' && (
        <div>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Who can see my information</h2>
            <p style={styles.sectionDescription}>Choose who can see your personal info</p>
            
            <div style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingLabel}>Profile photo</div>
                <div style={styles.settingDescription}>Who can see your profile photo</div>
              </div>
              <select
                value={privacySettings.profilePhoto}
                onChange={(e) => handleSettingChange('profilePhoto', e.target.value)}
                style={styles.select}
              >
                <option value="everyone">Everyone</option>
                <option value="contacts">My contacts</option>
                <option value="nobody">Nobody</option>
              </select>
            </div>
            
            <div style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingLabel}>About</div>
                <div style={styles.settingDescription}>Who can see your about info</div>
              </div>
              <select
                value={privacySettings.about}
                onChange={(e) => handleSettingChange('about', e.target.value)}
                style={styles.select}
              >
                <option value="everyone">Everyone</option>
                <option value="contacts">My contacts</option>
                <option value="nobody">Nobody</option>
              </select>
            </div>
            
            <div style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingLabel}>Status</div>
                <div style={styles.settingDescription}>Who can see your status updates</div>
              </div>
              <select
                value={privacySettings.status}
                onChange={(e) => handleSettingChange('status', e.target.value)}
                style={styles.select}
              >
                <option value="everyone">Everyone</option>
                <option value="contacts">My contacts</option>
                <option value="nobody">Nobody</option>
              </select>
            </div>
            
            <div style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingLabel}>Groups</div>
                <div style={styles.settingDescription}>Who can add you to groups</div>
              </div>
              <select
                value={privacySettings.groups}
                onChange={(e) => handleSettingChange('groups', e.target.value)}
                style={styles.select}
              >
                <option value="everyone">Everyone</option>
                <option value="contacts">My contacts</option>
                <option value="nobody">Nobody</option>
              </select>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Read receipts</h2>
            <p style={styles.sectionDescription}>Read receipts are sent for all messages</p>
            
            <div style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingLabel}>Read receipts</div>
                <div style={styles.settingDescription}>If you turn this off, you won't send or receive read receipts</div>
              </div>
              <label style={styles.toggleContainer}>
                <input
                  type="checkbox"
                  checked={privacySettings.readReceipts}
                  onChange={() => handleSettingChange('readReceipts')}
                  style={styles.toggleInput}
                />
                <span 
                  style={{
                    ...styles.toggleSlider,
                    ...(privacySettings.readReceipts ? styles.toggleSliderChecked : {})
                  }}
                >
                  <span 
                    style={{
                      ...styles.toggleSliderBefore,
                      ...(privacySettings.readReceipts ? styles.toggleSliderBeforeChecked : {})
                    }}
                  ></span>
                </span>
              </label>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Last seen</h2>
            <p style={styles.sectionDescription}>Last seen is visible to everyone by default</p>
            
            <div style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingLabel}>Last seen</div>
                <div style={styles.settingDescription}>If you turn this off, you won't be able to see others' last seen</div>
              </div>
              <label style={styles.toggleContainer}>
                <input
                  type="checkbox"
                  checked={privacySettings.lastSeen}
                  onChange={() => handleSettingChange('lastSeen')}
                  style={styles.toggleInput}
                />
                <span 
                  style={{
                    ...styles.toggleSlider,
                    ...(privacySettings.lastSeen ? styles.toggleSliderChecked : {})
                  }}
                >
                  <span 
                    style={{
                      ...styles.toggleSliderBefore,
                      ...(privacySettings.lastSeen ? styles.toggleSliderBeforeChecked : {})
                    }}
                  ></span>
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'security' && (
        <div>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Security Settings</h2>
            <p style={styles.sectionDescription}>Manage your account security</p>
            
            <div style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingLabel}>Two-step verification</div>
                <div style={styles.settingDescription}>Add extra security to your account with a PIN</div>
              </div>
              <label style={styles.toggleContainer}>
                <input
                  type="checkbox"
                  checked={false}
                  onChange={() => {}}
                  style={styles.toggleInput}
                />
                <span style={styles.toggleSlider}>
                  <span style={styles.toggleSliderBefore}></span>
                </span>
              </label>
            </div>
            
            <div style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingLabel}>Show security notifications</div>
                <div style={styles.settingDescription}>Get notified when your account is logged in from other devices</div>
              </div>
              <label style={styles.toggleContainer}>
                <input
                  type="checkbox"
                  checked={true}
                  onChange={() => {}}
                  style={styles.toggleInput}
                />
                <span style={{...styles.toggleSlider, ...styles.toggleSliderChecked}}>
                  <span style={{...styles.toggleSliderBefore, ...styles.toggleSliderBeforeChecked}}></span>
                </span>
              </label>
            </div>
          </div>
          
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Account Protection</h2>
            <p style={styles.sectionDescription}>Protect your account from unauthorized access</p>
            
            <div style={styles.settingRow}>
              <div style={styles.settingInfo}>
                <div style={styles.settingLabel}>Account self-destruction</div>
                <div style={styles.settingDescription}>Delete your account after a period of inactivity</div>
              </div>
              <select
                value="never"
                onChange={() => {}}
                style={styles.select}
              >
                <option value="never">Never</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'blocked' && (
        <div>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Blocked Contacts</h2>
            <p style={styles.sectionDescription}>Blocked contacts cannot message you or call you</p>
            
            {privacySettings.blockedContacts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                You haven't blocked any contacts yet
              </div>
            ) : (
              <div style={styles.blockedContactsSection}>
                {privacySettings.blockedContacts.map((contact, index) => (
                  <div key={index} style={styles.blockedContact}>
                    <div style={styles.contactInfo}>
                      <div style={styles.contactAvatar}>
                        <svg fill="currentColor" viewBox="0 0 20 20" style={{ height: '1.25rem', width: '1.25rem', color: '#10b981' }}>
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div style={styles.contactName}>{contact}</div>
                    </div>
                    <button
                      style={styles.unblockButton}
                      onMouseEnter={(e) => e.target.style.backgroundColor = styles.unblockButtonHover.backgroundColor}
                      onMouseLeave={(e) => e.target.style.backgroundColor = styles.unblockButton.backgroundColor}
                      onClick={() => {
                        // In a real app, you would unblock the contact
                        showToast(`${contact} has been unblocked`, 'success')
                      }}
                    >
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        style={styles.saveButton}
        onMouseEnter={(e) => e.target.style.backgroundColor = styles.saveButtonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = styles.saveButton.backgroundColor}
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  )
}

export default PrivacyPage