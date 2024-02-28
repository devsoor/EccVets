import axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

export const endpoints = {
    chat: '/api/chat',
    kanban: '/api/kanban',
    calendar: '/api/calendar',
    auth: {
      me: '/api/auth/me',
      login: '/api/auth/login',
      register: '/api/auth/register',
    },
    mail: {
      list: '/api/mail/list',
      details: '/api/mail/details',
      labels: '/api/mail/labels',
    },
    post: {
      list: '/api/post/list',
      details: '/api/post/details',
      latest: '/api/post/latest',
      search: '/api/post/search',
    },
    product: {
      list: '/api/product/list',
      details: '/api/product/details',
      search: '/api/product/search',
    },
  };


export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];
  
    const res = await axiosInstance.get(url, { ...config });
  
    return res.data;
  };

const axiosInstance = axios.create({
    baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
