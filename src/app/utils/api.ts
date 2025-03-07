import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://blog.jscorp.uz', // O'zingizning API bazaviy URL'ingizni qo'ying
  timeout: 10000, // So‘rov muddati (millisekundda)
  headers: {
    'Content-Type': 'application/json',
  }
});

// So‘rovga interceptor qo‘shish (Masalan, har bir so‘rov oldidan tokenni yangilash)
apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

// Javob interceptor (Xatolarni avtomatik boshqarish)
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API xatosi:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
