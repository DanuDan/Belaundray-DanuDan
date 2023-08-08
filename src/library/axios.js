import _axios from "axios";
import { getSession } from "next-auth/react";

const axios = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: false
})

axios.interceptors.request.use(async (config) => {
    const session = await getSession()
    const user = session?.user

    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] = "*";

    user && (config.headers["token"] = `${user.token}`)

    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use((response) => {
    return response
}, err => {
    if (err.reponse?.status.code == 401) {
        // Unauthorize
        return Promise.reject(err)
    }

    return Promise.reject(err);
})

export default axios