import axios from 'axios'
import { getSession } from 'next-auth/react'

import { API_BASE_URL } from './api'

export const authApi = axios.create({
    baseURL: API_BASE_URL,
})

authApi.interceptors.request.use(async (config) => {
    const session = await getSession()
    const token = session?.accessToken

    if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})
