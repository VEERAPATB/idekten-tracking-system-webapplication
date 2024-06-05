import axios from "axios";

const axiosAuth = axios.create({
    baseURL: process.env.URL_API_SERVER,
    headers: {'Content-Type': 'application/json'}
})

axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${process.env.API_TOKEN_SERVER}`

export default axiosAuth
