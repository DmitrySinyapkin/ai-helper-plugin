import axios from "axios"
import chromeStorage from "../chromeStorage/storage"
import { refreshUrl } from "./endpoints"

const api = axios.create({
    baseURL: import.meta.env.BASE_URL + '/api' || "http://localhost:300/api",
    headers: {
        'Content-Type': 'application/json',
    }
})

api.interceptors.response.use(function (response) {
    return response.data
}, async function (error) {
    const originalRequest = error.config
    if (error.response?.status === 403) {
        originalRequest._retry = true
        const refresh = await chromeStorage.get(['refresh'])
        if (refresh) {
            const newToken: Token = await api.post(refreshUrl, { refresh })
            chromeStorage.set(newToken)
            originalRequest.headers['Authorization'] = `Bearer ${newToken.access}`
        }
        return api(originalRequest)
    }
})

api.interceptors.request.use(async function (config) {
    const access = await chromeStorage.get(['access'])
    config.headers['Authorization'] = `Bearer ${access}` || ''
    return config
}, function (error) {
    return Promise.reject(error)
})

export default api
