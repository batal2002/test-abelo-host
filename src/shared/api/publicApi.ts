import axios from 'axios'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://dummyjson.com'

export const publicApi = axios.create({
    baseURL: API_BASE_URL,
})
