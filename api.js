import axios from 'axios';

// ✅ Correct base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
};

// Club services
export const clubAPI = {
  getAll: () => api.get('/clubs'),
  getById: (id) => api.get(`/clubs/${id}`),
};

// Registration services
export const registrationAPI = {
  registerForEvent: (eventId) =>
    api.post('/registrations/register', { eventId }),
  getUserRegistrations: () =>
    api.get('/registrations/my-registrations'),
};

export default api;