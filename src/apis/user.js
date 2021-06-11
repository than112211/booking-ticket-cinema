import axiosClient from './axiosClient'

const userAPI = {
    userLogin: (body) => {
        const url = `/account/login`
        return axiosClient.post(url,body)
    },

    userRegister: (body) => {
        const url = `/account/register`
        return axiosClient.post(url,body)
    },

    userMe: () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
          }
        const url = `/account/me`
        return axiosClient.get(url,config)
    },

    getAllTicket: () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
          }
        const url = `/ticket/history`
        return axiosClient.get(url,config)
    }
}
export default userAPI