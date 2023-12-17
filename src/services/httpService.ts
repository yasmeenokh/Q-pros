import axios, { AxiosResponse } from 'axios';

const baseUrl: string = 'https://api-1lsbhevi9-yasmeenokh.vercel.app/workspace/';

const HTTP = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  },
});
HTTP.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error: Error) => {
    console.log('HTTP.interceptors', error);
    Promise.reject(error);
  },
);

const responseBody = (response: AxiosResponse) => response.data;

export const getRequest = async (url: string = baseUrl, params: any = {}) => {
  try {
    const res = await HTTP.get(url, { params });
    return responseBody(res);
  } catch (error) {
    console.error('getRequest', error);
    throw error;
  }
};

export const postRequest = async (body: {}, url: string = baseUrl) => {
  try {
    const res = await axios.post(baseUrl, body);
    return await responseBody(res);
  } catch (error) {
    console.error('postRequest', error);
    throw error;
  }
};
export const deleteRequest = async (id: string) => {
  try {
    const res = await axios.delete(`${baseUrl}${id}`);
    return await responseBody(res);
  } catch (error) {
    console.error('deleteRequest', error);
    throw error;
  }
};

export const updateRequest = async (id: string, body: any) => {
  try {
    const res = await axios.patch(`${baseUrl}${id}`, body);
    return responseBody(res);
  } catch (error) {
    console.error('updateRequest', error);
    throw error;
  }
};
