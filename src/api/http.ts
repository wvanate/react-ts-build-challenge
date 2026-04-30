import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://potterapi-fedeperin.vercel.app',
    timeout: 10_000,
})
