import { ChevronLeft, ChevronRight } from 'lucide-react'

const ResponsivePagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  totalItems,
  showInfo = true,
  showNavigation = true,
  maxVisiblePages = 5
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)

  const styles = {
    paginationContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      borderTop: '1px solid #e5e7eb',
      gap: '0.75rem'
    },
    paginationInfo: {
      fontSize: '0.8125rem',
      color: '#6b7280',
      textAlign: 'center'
    },
    paginationControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    paginationButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2rem',
      height: '2rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      backgroundColor: '#ffffff',
      color: '#374151',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      minWidth: '2rem'
    },
    paginationButtonHover: {
      backgroundColor: '#f9fafb'
    },
    paginationButtonDisabled: {
      opacity: '0.5',
      cursor: 'not-allowed'
    },
    paginationButtonActive: {
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderColor: '#10b981'
    },
    paginationButtonInactive: {
      backgroundColor: '#ffffff',
      color: '#10b981',
      borderColor: '#10b981',
      borderWidth: '1px',
      borderStyle: 'solid'
    },
    pageNumber: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2rem',
      height: '2rem',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      border: '1px solid transparent',
      minWidth: '2rem'
    }
  }

  // Mobile view with simplified pagination
  const renderMobileView = () => {
    return (
      <div style={styles.paginationContainer}>
        {showInfo && (
          <div style={styles.paginationInfo}>
            Showing {startIndex + 1}-{endIndex} of {totalItems}
          </div>
        )}
        
        {showNavigation && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center'
          }}>
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
                padding: '0.5rem 1rem',
                width: 'auto'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.target.style.backgroundColor = styles.paginationButtonHover.backgroundColor
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.target.style.backgroundColor = styles.paginationButton.backgroundColor
                }
              }}
            >
              <ChevronLeft style={{ height: '1rem', width: '1rem' }} />
              <span style={{ marginLeft: '0.25rem' }}>Prev</span>
            </button>
            
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#111827'
            }}>
              {currentPage} of {totalPages}
            </div>
            
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages ? styles.paginationButtonDisabled : {}),
                padding: '0.5rem 1rem',
                width: 'auto'
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.backgroundColor = styles.paginationButtonHover.backgroundColor
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.backgroundColor = styles.paginationButton.backgroundColor
                }
              }}
            >
              <span style={{ marginRight: '0.25rem' }}>Next</span>
              <ChevronRight style={{ height: '1rem', width: '1rem' }} />
            </button>
          </div>
        )}
      </div>
    )
  }

  // Desktop view with full pagination
  const renderDesktopView = () => {
    return (
      <div style={styles.paginationContainer}>
        {showInfo && (
          <div style={styles.paginationInfo}>
            Showing {startIndex + 1}-{endIndex} of {totalItems}
          </div>
        )}
        
        {showNavigation && (
          <div style={styles.paginationControls}>
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (currentPage !== 1) {
                  e.target.style.backgroundColor = styles.paginationButtonHover.backgroundColor
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== 1) {
                  e.target.style.backgroundColor = styles.paginationButton.backgroundColor
                }
              }}
            >
              <ChevronLeft style={{ height: '1rem', width: '1rem' }} />
            </button>
            
            {getPageNumbers().map((page, index) => (
              <div key={index}>
                {page === '...' ? (
                  <span style={{ 
                    ...styles.pageNumber, 
                    cursor: 'default', 
                    color: '#9ca3af',
                    border: 'none',
                    backgroundColor: 'transparent'
                  }}>
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => onPageChange(page)}
                    style={{
                      ...styles.pageNumber,
                      ...(currentPage === page ? styles.paginationButtonActive : styles.paginationButtonInactive),
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage !== page) {
                        e.target.style.backgroundColor = '#f0fdf4'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage !== page) {
                        e.target.style.backgroundColor = styles.paginationButtonInactive.backgroundColor
                      }
                    }}
                  >
                    {page}
                  </button>
                )}
              </div>
            ))}
            
            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages ? styles.paginationButtonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.backgroundColor = styles.paginationButtonHover.backgroundColor
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== totalPages) {
                  e.target.style.backgroundColor = styles.paginationButton.backgroundColor
                }
              }}
            >
              <ChevronRight style={{ height: '1rem', width: '1rem' }} />
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="responsive-pagination">
      <style>{`
        @media (max-width: 768px) {
          .mobile-pagination {
            display: block;
          }
          .desktop-pagination {
            display: none;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-pagination {
            display: none;
          }
          .desktop-pagination {
            display: block;
          }
        }
      `}</style>
      
      {/* Mobile view */}
      <div className="mobile-pagination">
        {renderMobileView()}
      </div>
      
      {/* Desktop view */}
      <div className="desktop-pagination">
        {renderDesktopView()}
      </div>
    </div>
  )
}

export default ResponsivePagination