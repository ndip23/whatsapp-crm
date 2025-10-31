import { useState } from 'react'
import { Search, Filter } from 'lucide-react'

const ClientManagementPage = () => {
  const [clients] = useState([
    { id: 1, name: 'John Doe', phone: '+1 234 567 8900', country: 'USA', agent: 'Jane Smith', tags: ['New Lead', 'VIP'] },
    { id: 2, name: 'Jane Smith', phone: '+44 123 456 7890', country: 'UK', agent: 'John Doe', tags: ['Closed Sale'] },
    { id: 3, name: 'Bob Johnson', phone: '+61 234 567 890', country: 'Australia', agent: 'Alice Brown', tags: ['New Lead'] },
    { id: 4, name: 'Alice Brown', phone: '+1 987 654 3210', country: 'Canada', agent: 'Bob Johnson', tags: ['VIP', 'Follow Up'] },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterTag, setFilterTag] = useState('')

  // Get all unique tags for filter dropdown
  const allTags = [...new Set(clients.flatMap(client => client.tags))]

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.phone.includes(searchTerm)
    const matchesFilter = filterTag === '' || client.tags.includes(filterTag)
    return matchesSearch && matchesFilter
  })

  const styles = {
    page: {
      padding: '1rem'
    },
    pageTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '1.5rem'
    },
    searchFilterContainer: {
      marginBottom: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    searchContainer: {
      position: 'relative',
      flex: '1'
    },
    searchIcon: {
      position: 'absolute',
      insetY: '0',
      left: '0',
      paddingLeft: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none'
    },
    searchInput: {
      display: 'block',
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '0.75rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      backgroundColor: '#ffffff',
      placeholderColor: '#9ca3af',
      outline: 'none'
    },
    searchInputFocus: {
      borderColor: '#10b981',
      ring: '1px solid #10b981'
    },
    filterContainer: {
      position: 'relative'
    },
    filterIcon: {
      position: 'absolute',
      insetY: '0',
      left: '0',
      paddingLeft: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none'
    },
    filterSelect: {
      display: 'block',
      width: '100%',
      paddingLeft: '2.5rem',
      paddingRight: '0.75rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      backgroundColor: '#ffffff',
      outline: 'none'
    },
    filterSelectFocus: {
      borderColor: '#10b981',
      ring: '1px solid #10b981'
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
      backgroundColor: '#ffffff',
      cursor: 'pointer'
    },
    tableRowHover: {
      backgroundColor: '#f9fafb'
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
    tagContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.25rem'
    },
    tag: {
      display: 'inline-flex',
      alignItems: 'center',
      paddingLeft: '0.625rem',
      paddingRight: '0.625rem',
      paddingTop: '0.125rem',
      paddingBottom: '0.125rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    tagNew: {
      backgroundColor: '#dbeafe',
      color: '#1e40af'
    },
    tagVip: {
      backgroundColor: '#ede9fe',
      color: '#5b21b6'
    },
    tagFollowUp: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    tagClosed: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    clientDetailPanel: {
      marginTop: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      padding: '1.5rem'
    },
    clientDetailTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '1rem'
    },
    clientDetailGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      gap: '1.5rem'
    },
    clientDetailSection: {
      marginBottom: '1rem'
    },
    sectionTitle: {
      fontSize: '1rem',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    detailsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    detailItem: {
      display: 'flex',
      flexDirection: 'column'
    },
    detailLabel: {
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    detailValue: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#111827'
    },
    tagsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    addTagButton: {
      marginTop: '0.5rem',
      fontSize: '0.875rem',
      color: '#10b981',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer'
    },
    addTagButtonHover: {
      color: '#065f46'
    },
    notesList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    noteItem: {
      fontSize: '0.875rem'
    },
    noteText: {
      color: '#111827'
    },
    noteTime: {
      color: '#6b7280',
      fontSize: '0.75rem'
    },
    reminderContainer: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '0.5rem'
    },
    reminderInput: {
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      fontSize: '0.875rem'
    },
    reminderButton: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      fontWeight: '500',
      paddingTop: '0.25rem',
      paddingBottom: '0.25rem',
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      borderRadius: '0.375rem',
      border: 'none',
      fontSize: '0.875rem',
      cursor: 'pointer'
    },
    reminderButtonHover: {
      backgroundColor: '#059669'
    }
  }

  // Responsive styles
  const mediaStyles = `
    @media (min-width: 768px) {
      .searchFilterContainer {
        flex-direction: row;
        gap: 1rem;
      }
      
      .searchContainer {
        flex: 1;
      }
      
      .clientDetailGrid {
        gridTemplateColumns: repeat(3, minmax(0, 1fr));
      }
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <h1 style={styles.pageTitle}>Client Management</h1>

      {/* Search and Filter */}
      <div className="searchFilterContainer" style={styles.searchFilterContainer}>
        <div style={styles.searchContainer}>
          <div style={styles.searchIcon}>
            <Search style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
          </div>
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            onFocus={(e) => {
              e.target.style.borderColor = styles.searchInputFocus.borderColor;
              e.target.style.boxShadow = `0 0 0 1px ${styles.searchInputFocus.ring}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '';
              e.target.style.boxShadow = '';
            }}
          />
        </div>
        <div style={styles.filterContainer}>
          <div style={styles.filterIcon}>
            <Filter style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} />
          </div>
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            style={styles.filterSelect}
            onFocus={(e) => {
              e.target.style.borderColor = styles.filterSelectFocus.borderColor;
              e.target.style.boxShadow = `0 0 0 1px ${styles.filterSelectFocus.ring}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '';
              e.target.style.boxShadow = '';
            }}
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Client Name</th>
              <th style={styles.tableHeaderCell}>Phone</th>
              <th style={styles.tableHeaderCell}>Country</th>
              <th style={styles.tableHeaderCell}>Assigned Agent</th>
              <th style={styles.tableHeaderCell}>Tags</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            {filteredClients.map((client) => (
              <tr 
                key={client.id} 
                style={styles.tableRow}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.tableRowHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.tableRow.backgroundColor}
              >
                <td style={{ ...styles.tableCell, fontWeight: '500' }}>{client.name}</td>
                <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{client.phone}</td>
                <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{client.country}</td>
                <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{client.agent}</td>
                <td style={styles.tableCell}>
                  <div style={styles.tagContainer}>
                    {client.tags.map(tag => (
                      <span 
                        key={tag} 
                        style={{ 
                          ...styles.tag, 
                          ...(tag === 'New Lead' ? styles.tagNew : 
                              tag === 'VIP' ? styles.tagVip : 
                              tag === 'Follow Up' ? styles.tagFollowUp : 
                              styles.tagClosed)
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Client Detail Panel */}
      <div style={styles.clientDetailPanel}>
        <h2 style={styles.clientDetailTitle}>Client Details</h2>
        <div className="clientDetailGrid" style={styles.clientDetailGrid}>
          <div>
            <h3 style={styles.sectionTitle}>Client Information</h3>
            <dl style={styles.detailsList}>
              <div style={styles.detailItem}>
                <dt style={styles.detailLabel}>Name</dt>
                <dd style={styles.detailValue}>John Doe</dd>
              </div>
              <div style={styles.detailItem}>
                <dt style={styles.detailLabel}>Phone Number</dt>
                <dd style={styles.detailValue}>+1 234 567 8900</dd>
              </div>
              <div style={styles.detailItem}>
                <dt style={styles.detailLabel}>Country</dt>
                <dd style={styles.detailValue}>USA</dd>
              </div>
            </dl>
          </div>
          
          <div>
            <h3 style={styles.sectionTitle}>Tags</h3>
            <div style={styles.tagsContainer}>
              <span style={{ ...styles.tag, ...styles.tagNew }}>
                New Lead
              </span>
              <span style={{ ...styles.tag, ...styles.tagVip }}>
                VIP
              </span>
            </div>
            <button 
              style={styles.addTagButton}
              onMouseEnter={(e) => e.target.style.color = styles.addTagButtonHover.color}
              onMouseLeave={(e) => e.target.style.color = styles.addTagButton.color}
            >
              + Add Tag
            </button>
          </div>
          
          <div>
            <h3 style={styles.sectionTitle}>Notes</h3>
            <div style={styles.notesList}>
              <div style={styles.noteItem}>
                <p style={styles.noteText}>Initial inquiry about product features</p>
                <p style={styles.noteTime}>2 hours ago</p>
              </div>
            </div>
            <button 
              style={styles.addTagButton}
              onMouseEnter={(e) => e.target.style.color = styles.addTagButtonHover.color}
              onMouseLeave={(e) => e.target.style.color = styles.addTagButton.color}
            >
              + Add Note
            </button>
          </div>
        </div>
        
        <div style={styles.clientDetailSection}>
          <h3 style={styles.sectionTitle}>Follow-up Reminder</h3>
          <div style={styles.reminderContainer}>
            <input
              type="datetime-local"
              style={styles.reminderInput}
            />
            <button 
              style={styles.reminderButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.reminderButtonHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.reminderButton.backgroundColor}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientManagementPage