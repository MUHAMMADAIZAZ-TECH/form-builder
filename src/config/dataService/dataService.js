import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_BASE_URL;

const authHeader = () => ({
  // Authorization: `Bearer ${localStorage.getItem('mes_access_token')}`,
  // 'ngrok-skip-browser-warning': true,
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  'Access-Control-Allow-Origin': '*', 
  // withCredentials: true,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('mes_access_token')}`,
    // 'ngrok-skip-browser-warning': true,
  },
});

class DataService {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader() },
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static postFormData(path = '', formData = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data: formData,
      headers: { ...authHeader(), ...optionalHeader, 'Content-Type': 'multipart/form-data' },
    });
  }


  static delete(path = '', data = {}) {
    return client({
      method: 'DELETE',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data,
      headers: { ...authHeader() },
    });
  }
}

client.interceptors.request.use(
  (config) => {
    // You can modify the request configuration here, e.g., add headers
    // config.headers.Authorization = `Bearer ${yourAccessToken}`;
    return config;
  },
  (error) => {
    // Handle any request errors here
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle any response errors here
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.error('Please Check Your Internet Connection');
      return Promise.reject({ response: { data: 'Please Check Your Internet Connection' } });
    }
    else {
      return Promise.reject({ ...error, message: error?.response?.data });
    }
  }
);

export { DataService };

