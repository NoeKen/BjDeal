import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import Config from '../constants/config';
// import { relogin } from './relogin';

/**
 * Axios defaults
 */
axios.defaults.baseURL = Config.apiBaseUrl;

// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

/**
 * Request Interceptor
 */
axios.interceptors.request.use(
  async (inputConfig) => {
    const config = inputConfig;

    // Check for and add the stored Auth Token to the header request
    let token = '';
    try {
      token = await AsyncStorage.getItem('@Auth:token');
    } catch (error) {
      /* Nothing */
    }
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    throw error;
  },
);

/**
 * Response Interceptor
 */
axios.interceptors.response.use(
  (res) => {
    // Status code isn't a success code - throw error
    try {
      if (res?.error?.message == 'Token not provided' || res?.error?.message == 'Token has expired' || res?.error?.message == 'Token has blacklisted') {
        Actions.Login();
      }
    } catch(e){}
    if (!`${res.status}`.startsWith('2')) {
      throw res.data;
    }

    // Otherwise just return the data
    return res;
  },
  (error) => {
    // Pass the response from the API, rather than a status code
    try {
      if (error?.error?.message == 'Token not provided' || error?.error?.message == 'Token has expired' || error?.error?.message == 'Token has blacklisted') {
        Actions.Login();
      }
    } catch(e){}
    if (error && error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  },
);

export default axios;
