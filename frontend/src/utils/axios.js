import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8088",
});

/// delay for axios instance (only local). Not mandatory
// axiosInstance.interceptors.response.use(
//     (config) => new Promise((resolve) => setTimeout(()=> resolve(config), 2000))
// )
export default axiosInstance;