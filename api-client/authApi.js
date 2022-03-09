import axiosClient from "./axiosClient"

const authApi = {
  loginApi: (data) => {
    const url = "/pibo/api/login"
    return axiosClient.post(url, data)
  },

  logoutApi: () => {
    const url = "/pibo/api/logout"
    return axiosClient.get(url)
  },

  getProfile: () => {
    const url = '/pibo/api/users'
    return axiosClient.get(url)
  }
}

export default authApi
