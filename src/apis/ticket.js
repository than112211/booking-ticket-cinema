import axiosClient from './axiosClient'
const config = {
    headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
    }
  }
const ticketAPI = {
    payment: (action) => {
        const url = `/ticket/paymentMoMo/${action.id}`
        return axiosClient.post(url,action.body,{headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }})
    },
}
export default ticketAPI