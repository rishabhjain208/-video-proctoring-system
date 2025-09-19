import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export const createLog = (entry, interviewId) =>
  axios.post(`${API_BASE}/logs`, { entry, interviewId });

export const uploadInterview = (formData) =>
  axios.post(`${API_BASE}/interviews`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const fetchReport = (id) =>
  axios.get(`${API_BASE}/interviews/report/${id}`);
