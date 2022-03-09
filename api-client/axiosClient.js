import axios from "axios"
import queryString from "query-string"

const axiosClient = axios.create({
  baseURL: process.env.SERVER_API,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(
  (config) => {
    const pauthToken = localStorage.getItem("pauthToken")
    if (pauthToken) {
      config.headers.Authorization = `Bearer ${pauthToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => {
    if (response?.headers?.pauth) {
      localStorage.setItem("pauthToken", response.headers.pauth)
    }

    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosClient
