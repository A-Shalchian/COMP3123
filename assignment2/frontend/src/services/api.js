import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => api.post('/user/login', data),
  signup: (data) => api.post('/user/signup', data)
};

export const employeeAPI = {
  getAll: () => api.get('/emp/employees'),
  getById: (id) => api.get(`/emp/employees/${id}`),
  create: (data) => api.post('/emp/employees', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.put(`/emp/employees/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => api.delete(`/emp/employees?eid=${id}`),
  search: (params) => api.get('/emp/employees/search', { params })
};

export default api;
