import axios from 'axios';
import queryString from 'query-string';
import {HOST_SERVER,FETCH_DATA_SUCCESS} from '../constants/index'

const axiosClient = axios.create({
    baseURL: HOST_SERVER,
    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return {
            data:response.data,
            status:FETCH_DATA_SUCCESS
    };
  }
    return response;
}, (error) => {
    throw error;
});

export default axiosClient;