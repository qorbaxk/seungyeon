import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_YOUTUBE_API_URL;

const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 공통 에러 처리 추가 가능
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('HTTP Error:', error);
    return Promise.reject(error);
  }
);

const get = async <T = any>(url: string, params?: any): Promise<T> => {
  try {
    const res = await http.get<T>(url, { params });
    return res.data;
  } catch (error) {
    console.error('GET Error:', error);
    return Promise.reject(error);
  }
};

const post = async <T = any>(url: string, body?: any): Promise<T> => {
  try {
    const res = await http.post<T>(url, body);
    return res.data;
  } catch (error) {
    console.error('POST Error:', error);
    return Promise.reject(error);
  }
};

const put = async <T = any>(url: string, body?: any): Promise<T> => {
  try {
    const res = await http.put<T>(url, body);
    return res.data;
  } catch (error) {
    console.error('PUT Error:', error);
    return Promise.reject(error);
  }
};

const patch = async <T = any>(url: string, body?: any): Promise<T> => {
  try {
    const res = await http.patch<T>(url, body);
    return res.data;
  } catch (error) {
    console.error('PATCH Error:', error);
    return Promise.reject(error);
  }
};

const del = async <T = any>(url: string, params?: any): Promise<T> => {
  try {
    const res = await http.delete<T>(url, { params });
    return res.data;
  } catch (error) {
    console.error('DELETE Error:', error);
    return Promise.reject(error);
  }
};

export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
};
