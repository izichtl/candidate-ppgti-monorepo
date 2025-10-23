import axios, { AxiosInstance } from 'axios';
import { VITE_API_URL, VITE_IS_LOCAL, VITE_LOCAL_TOKEN } from '../config';

export const instanceAXIOS = axios.create({
  baseURL: VITE_API_URL,
});

export const APIDecoratorWithBaseURI = (
  base: string | undefined = VITE_API_URL,
): AxiosInstance => {
  instanceAXIOS.defaults.baseURL = base;

  const tokenFromStorage = localStorage.getItem('userJWT');
  const hasAuthToken = VITE_IS_LOCAL === 'true';
  const accessToken = hasAuthToken ? VITE_LOCAL_TOKEN : tokenFromStorage;

  // instanceAXIOS.defaults.headers.common['Authorization'] = accessToken;
  if (accessToken && accessToken.trim() !== '') {
    instanceAXIOS.defaults.headers.common['Authorization'] =
      accessToken.replace('Bearer ', '');
  } else {
    delete instanceAXIOS.defaults.headers.common['Authorization'];
  }

  return instanceAXIOS;
};
