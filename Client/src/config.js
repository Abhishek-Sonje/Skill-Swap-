// Environment Configuration
export const config = {
  // Backend API URL
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Socket.IO URL (usually same as API URL)
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Environment
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  
  // Check if running in production
  isProduction: import.meta.env.NODE_ENV === 'production',
  
  // Check if running in development
  isDevelopment: import.meta.env.NODE_ENV === 'development'
};

// Log configuration in development
if (config.isDevelopment) {
  console.log('🔧 Environment Configuration:', config);
} 