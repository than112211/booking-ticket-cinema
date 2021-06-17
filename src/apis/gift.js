import axiosClient from './axiosClient'

const giftAPI = {
    getListGift: (pagination) => {
        const params = {
            page: pagination.page,
            limit: pagination.limit,
        }
        const url = `/gift/all`
        return axiosClient.get(url,{params})
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