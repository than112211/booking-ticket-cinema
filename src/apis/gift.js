import axiosClient from './axiosClient'

const giftAPI = {
    getInit: () => {
        const url = `/gift/all`
        return axiosClient.get(url)
    },

    tradeGift: (id) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
          }
        const url = `/gift/${id}/get`
        return axiosClient.get(url,config)
    }
}
export default giftAPI