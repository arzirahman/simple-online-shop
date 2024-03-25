import axiosInstance from 'axios';

export const axios = () => {
    return axiosInstance.create({
        baseURL: 'http://localhost:8080'
    })
}