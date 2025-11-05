import { useState } from 'react'

const ResponsiveTable = ({ 
  columns, 
  data, 
  onRowClick, 
  renderCell,
  className = '',
  tableContainerStyle = {},
  tableStyle = {},
  headerStyle = {},
  rowStyle = {},
  cellStyle = {}
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...data]
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }

  // For mobile view, we'll transform the data into a card-like structure
  const renderMobileView = () => {
    return (
      <div className="mobile-table-container">
        {sortedData.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="mobile-table-card"
            onClick={() => onRowClick && onRowClick(row)}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              padding: '1rem',
              marginBottom: '0.75rem',
              border: '1px solid #e5e7eb',
              cursor: onRowClick ? 'pointer' : 'default'
            }}
          >
            {columns.map((column, colIndex) => (
              <div 
                key={colIndex} 
                className="mobile-table-row"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.25rem 0',
                  borderBottom: colIndex < columns.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}
              >
                <div 
                  className="mobile-table-header"
                  style={{
                    fontWeight: '500',
                    color: '#6b7280',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em'
                  }}
                >
                  {column.header}
                </div>
                <div 
                  className="mobile-table-cell"
                  style={{
                    fontWeight: column.isPrimary ? '500' : 'normal',
                    color: column.isPrimary ? '#111827' : '#6b7280',
                    fontSize: '0.875rem',
                    textAlign: 'right',
                    maxWidth: '60%'
                  }}
                >
                  {renderCell ? renderCell(row, column) : row[column.key]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  // Desktop view with traditional table
  const renderDesktopView = () => {
    return (
      <div className="table-container" style={{
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        ...tableContainerStyle
      }}>
        <div className="table-wrapper" style={{ overflowX: 'auto' }}>
          <table 
            className={`table ${className}`} 
            style={{
              minWidth: '100%',
              borderCollapse: 'collapse',
              ...tableStyle
            }}
          >
            <thead style={{ backgroundColor: '#f9fafb', ...headerStyle }}>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    onClick={column.sortable !== false ? () => handleSort(column.key) : undefined}
                    style={{
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                      textAlign: column.align || 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#6b7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      cursor: column.sortable !== false ? 'pointer' : 'default',
                      whiteSpace: 'nowrap',
                      backgroundColor: '#f9fafb',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: column.align === 'right' ? 'flex-end' : 'flex-start' }}>
                      <span>{column.header}</span>
                      {column.sortable !== false && (
                        <span style={{ marginLeft: '0.25rem', fontSize: '0.7rem' }}>
                          {getSortIcon(column.key)}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ backgroundColor: '#ffffff', ...rowStyle }}>
              {sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{
                    backgroundColor: '#ffffff',
                    transition: 'background-color 0.2s ease',
                    cursor: onRowClick ? 'pointer' : 'default',
                    ...rowStyle
                  }}
                  onMouseEnter={(e) => {
                    if (onRowClick) {
                      e.target.closest('tr').style.backgroundColor = '#f9fafb'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (onRowClick) {
                      e.target.closest('tr').style.backgroundColor = '#ffffff'
                    }
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      style={{
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        whiteSpace: 'nowrap',
                        fontSize: '0.875rem',
                        color: '#111827',
                        borderBottom: '1px solid #e5e7eb',
                        textAlign: column.align || 'left',
                        ...cellStyle
                      }}
                    >
                      {renderCell ? renderCell(row, column) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="responsive-table">
      <style>{`
        @media (max-width: 768px) {
          .mobile-table-container {
            display: block;
          }
          .table-container {
            display: none;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-table-container {
            display: none;
          }
          .table-container {
            display: block;
          }
        }
      `}</style>
      
      {/* Mobile view */}
      <div className="mobile-view">
        {renderMobileView()}
      </div>
      
      {/* Desktop view */}
      <div className="desktop-view">
        {renderDesktopView()}
      </div>
    </div>
  )
}

export default ResponsiveTable