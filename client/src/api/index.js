import https from 'https';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  hostname: process.env.REEACT_APP_API_HOST || 'http://localhost:3000/',
  httpsAgent: https.Agent({
    rejectUnauthorized: false,
  }),
});

// TODO - use interceptors for better error handling: https://masteringjs.io/tutorials/axios/interceptors#error-handling

export const getAllExams = payload => api.get(`/exams`, payload);
export const getAllItems = payload => api.get(`/items`, payload);
export const getAllPatients = payload => api.get(`/patients`, payload);

export const getExamById = id => api.get(`/filtered-exams?id=${id}`);
export const getItemById = id => api.get(`/item/${id}`);
export const getPatientById = id => api.get(`/filtered-patients?id=${id}`);

export const insertExam = payload => api.post(`/exam`, payload);
export const insertItem = payload => api.post(`/item`, payload);
export const insertPatient = payload => api.post(`/patient`, payload);

export const updateItemById = (id, payload) => api.put(`/item/${id}`, payload);
export const updateExamById = (id, payload) => api.put(`/exam/${id}/:field/:value`, payload);
export const updatePatientById = (id, payload) => api.put(`/patient?id=${id}/:field/:value`, payload);

export const deleteItemById = id => api.delete(`/item/${id}`);
export const deleteExamById = id => api.delete(`/exam/${id}`);
export const deletePatientById = id => api.delete(`/patient?id=${id}`);

const apis = {
  getAllExams,
  getAllItems,
  getExamById,
  getItemById,
  insertExam,
  insertItem,
  updateExamById, 
  updateItemById,
  deleteExamById,
  deleteItemById,

  getAllPatients,
  getPatientById,
  insertPatient,
  updatePatientById,
  deletePatientById,
};

export default apis;
