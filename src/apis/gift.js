import axiosClient from './axiosClient'

const giftAPI = {
    getInit: () => {
        const url = `/gift/all`
        return axiosClient.get(url)
    }
}
export default giftAPI