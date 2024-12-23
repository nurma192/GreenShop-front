import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api`;

const api = axios.create({

    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if (error.response.status === 401) {
        const res = await axios.post(`${API_URL}/users/refresh`,{
            refreshToken: localStorage.getItem('refreshToken'),
        })

        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        console.log("40001",res.data)
    }
})

export default api