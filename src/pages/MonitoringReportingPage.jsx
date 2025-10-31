import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const MonitoringReportingPage = () => {
  // Mock data for charts
  const conversationData = [
    { name: 'Mon', conversations: 12 },
    { name: 'Tue', conversations: 19 },
    { name: 'Wed', conversations: 8 },
    { name: 'Thu', conversations: 15 },
    { name: 'Fri', conversations: 11 },
    { name: 'Sat', conversations: 7 },
    { name: 'Sun', conversations: 13 },
  ]

  const performanceData = [
    { name: 'John', conversations: 24, responseTime: 2.3 },
    { name: 'Jane', conversations: 18, responseTime: 3.1 },
    { name: 'Bob', conversations: 32, responseTime: 1.8 },
    { name: 'Alice', conversations: 21, responseTime: 2.7 },
  ]

  const agentData = [
    { name: 'John Doe', handled: 24, responseTime: '2.3 min', status: 'Active' },
    { name: 'Jane Smith', handled: 18, responseTime: '3.1 min', status: 'Active' },
    { name: 'Bob Johnson', handled: 32, responseTime: '1.8 min', status: 'Active' },
    { name: 'Alice Brown', handled: 21, responseTime: '2.7 min', status: 'Away' },
  ]

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
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statsCard: {
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    statsTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#111827'
    },
    statsValue: {
      marginTop: '0.5rem',
      fontSize: '1.875rem',
      fontWeight: '600',
      color: '#10b981'
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    chartCard: {
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    },
    chartTitle: {
      fontSize: '1.125rem',
      fontWeight: '500',
      color: '#111827',
      marginBottom: '1rem'
    },
    chartContainer: {
      height: '20rem'
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
    statusBadge: {
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      paddingTop: '0.125rem',
      paddingBottom: '0.125rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    statusActive: {
      backgroundColor: '#d1fae5',
      color: '#065f46'
    },
    statusAway: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    }
  }

  // Responsive styles
  const mediaStyles = `
    @media (min-width: 768px) {
      .statsGrid {
        gridTemplateColumns: repeat(3, minmax(0, 1fr));
      }
      
      .chartsGrid {
        gridTemplateColumns: repeat(2, minmax(0, 1fr));
      }
    }
  `

  return (
    <div style={styles.page}>
      <style>{mediaStyles}</style>
      <h1 style={styles.pageTitle}>Monitoring & Reporting</h1>
      
      {/* Stats Cards */}
      <div className="statsGrid" style={styles.statsGrid}>
        <div style={styles.statsCard}>
          <h3 style={styles.statsTitle}>Total Conversations Today</h3>
          <p style={styles.statsValue}>42</p>
        </div>
        <div style={styles.statsCard}>
          <h3 style={styles.statsTitle}>Avg. First Response Time</h3>
          <p style={styles.statsValue}>2.4 min</p>
        </div>
        <div style={styles.statsCard}>
          <h3 style={styles.statsTitle}>Open Conversations &gt; 24h</h3>
          <p style={styles.statsValue}>8</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="chartsGrid" style={styles.chartsGrid}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Conversations per Day</h3>
          <div style={{ ...styles.chartContainer, height: '20rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversations" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Agent Performance</h3>
          <div style={{ ...styles.chartContainer, height: '20rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="conversations" 
                  stroke="#10b981" 
                  activeDot={{ r: 8 }} 
                  name="Conversations" 
                />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#8b5cf6" 
                  name="Response Time (min)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Agent Performance Table */}
      <div style={styles.tableContainer}>
        <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '500', color: '#111827' }}>Agent Performance</h3>
        </div>
        <table style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={styles.tableHeaderCell}>Name</th>
              <th style={styles.tableHeaderCell}>Conversations Handled</th>
              <th style={styles.tableHeaderCell}>Avg. Response Time</th>
              <th style={styles.tableHeaderCell}>Status</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            {agentData.map((agent, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={{ ...styles.tableCell, fontWeight: '500' }}>{agent.name}</td>
                <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{agent.handled}</td>
                <td style={{ ...styles.tableCell, ...styles.tableCellSecondary }}>{agent.responseTime}</td>
                <td style={styles.tableCell}>
                  <span style={{ 
                    ...styles.statusBadge, 
                    ...(agent.status === 'Active' ? styles.statusActive : styles.statusAway) 
                  }}>
                    {agent.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MonitoringReportingPage