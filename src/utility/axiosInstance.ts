import axios, { AxiosInstance } from 'axios'
import env from "@/env";

const fastApiAxiosInst: AxiosInstance = axios.create({
    baseURL: env.api.AI_BASE_URL,
    timeout: 2500,
})

const djangoAxiosInst: AxiosInstance = axios.create({
    baseURL: env.api.MAIN_API_URL,
    timeout: 2500,
})

export default { djangoAxiosInst, fastApiAxiosInst }