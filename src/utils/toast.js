// Simple toast notification utility
let toastContainer = null;

const createToastContainer = () => {
  if (toastContainer) return toastContainer;
  
  toastContainer = document.createElement('div');
  toastContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
  toastContainer.style.position = 'fixed';
  toastContainer.style.top = '1rem';
  toastContainer.style.right = '1rem';
  toastContainer.style.zIndex = '50';
  toastContainer.style.display = 'flex';
  toastContainer.style.flexDirection = 'column';
  toastContainer.style.gap = '0.5rem';
  document.body.appendChild(toastContainer);
  return toastContainer;
};

export const showToast = (message, type = 'success') => {
  const container = createToastContainer();
  
  const toast = document.createElement('div');
  toast.style.padding = '0.75rem 1rem';
  toast.style.borderRadius = '0.375rem';
  toast.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
  toast.style.fontWeight = '500';
  toast.style.color = '#ffffff';
  toast.style.transform = 'translateX(100%)';
  toast.style.transition = 'transform 0.3s ease-out';
  toast.style.opacity = '0';
  
  // Set solid background colors
  if (type === 'success') {
    toast.style.backgroundColor = '#10b981'; // Solid green
  } else if (type === 'error') {
    toast.style.backgroundColor = '#ef4444'; // Solid red
  } else {
    toast.style.backgroundColor = '#3b82f6'; // Solid blue
  }
  
  toast.textContent = message;
  
  // Add to container
  container.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  }, 10);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
};