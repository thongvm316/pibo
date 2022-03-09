import axiosClient from "./axiosClient"

const userApi = {
  menuApi: () => {
    const url = "/pibo/api/menu"
    return axiosClient.get(url)
  },
}

export default userApi
