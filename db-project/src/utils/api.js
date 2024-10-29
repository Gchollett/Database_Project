export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');
  
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`; // Adjust the scheme if necessary
    }
  
    return fetch(url, {
      ...options,
      headers,
    });
  };