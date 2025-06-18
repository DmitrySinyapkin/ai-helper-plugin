import axios from "axios"
import chromeStorage from "../utils/chromeStorage"
import { refreshUrl } from "./endpoints"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.response.use(function (response) {
    return response.data
}, async function (error) {
    const originalRequest = error.config
    if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            const { refresh } = await chromeStorage.get(['refresh'])
            if (refresh) {
                const newToken: Token = await api.post(refreshUrl, { refresh })
                await chromeStorage.set(newToken)
                originalRequest.headers['Authorization'] = `Bearer ${newToken.access}`
                return api(originalRequest)
            }
        } catch (refreshError) {
            return Promise.reject(error.response?.data?.message || error.message)
        }
    }
    return Promise.reject(error.response?.data?.message || error.message)
})

api.interceptors.request.use(async function (config) {
    const { access } = await chromeStorage.get(['access'])
    if (access) {
        config.headers['Authorization'] = `Bearer ${access}`
    }
    return config
}, function (error) {
    return Promise.reject(error.message)
})

export default api
