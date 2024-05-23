import axios, { AxiosInstance } from 'axios'
import env from "@/env";

// const springAxiosInst: AxiosInstance = axios.create({
//     baseURL: 'http://localhost:7777',
//     timeout: 2500,
// })

// const fastApiAxiosInst: AxiosInstance = axios.create({
//     baseURL: 'http://localhost:8000',
//     timeout: 2500,
// })

const djangoAxiosInst: AxiosInstance = axios.create({
    baseURL: env.api.MAIN_API_URL,
    timeout: 2500,
})

export default { djangoAxiosInst }