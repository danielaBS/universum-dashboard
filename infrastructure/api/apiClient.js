import axios from 'axios';

const apiClient = (config) => {
  const axiosInstance = axios(config);

  return axiosInstance;
};

export default apiClient;
