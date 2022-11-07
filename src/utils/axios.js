const axios = require('axios');

const axiosInstance = axios.create({ baseURL: process.env.TELEGRAM_API || 'https://api.telegram.org/bot' });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Facetec server error')
);

module.exports = axiosInstance;
