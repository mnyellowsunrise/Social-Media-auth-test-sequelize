import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Adjust this URL to match your backend server
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token added to request:', token);
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login page
      console.log('Unauthorized access. Redirecting to login page...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
