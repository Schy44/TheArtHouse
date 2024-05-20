// AxiosInstance.jsx
import React from 'react';
import axios from 'axios';

const AxiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',  // Adjust the base URL if necessary
    });

    return <>{axiosInstance}</>;
};

export default AxiosInstance;
