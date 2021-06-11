import axiosClient from './axiosClient'

const ticketAPI = {
    payment: (action) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
          }
        const url = `/ticket/paymentMoMo/${action.id}`
        return axiosClient.post(url,action.body,config)
    },

    checkUnpaid: () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
          }
        const url = `/ticket/checkunpaid`
        return axiosClient.get(url,config)
    }
}
export default ticketAPI