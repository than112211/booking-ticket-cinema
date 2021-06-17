import axiosClient from './axiosClient'

const adminAPI = {
    
    getListUser: (pagination) => {
        const params = {
            page: pagination.page,
            limit: pagination.limit,
        }
        const url = `/account/all`
        return axiosClient.get(url,{params})
    },

    editUser: (id,body) => {
        const url = `/account/edit/${id}`
        return axiosClient.post(url,body)
    },

    deleteUser: (id) => {
        const url = `/account/delete/${id}`
        return axiosClient.delete(url)
    },

    getUserCreatedWeek: () => {
        const url = `/account/all/week`
        return axiosClient.get(url)
    },

    getUserCreatedMonth: () => {
        const url = `/account/all/month`
        return axiosClient.get(url)
    },

    getUserCreatedYear: () => {
        const url = `/account/all/year`
        return axiosClient.get(url)
    },

    getListGift: (pagination) => {
        const params = {
            page: pagination.page,
            limit: pagination.limit,
        }
        const url = `/gift/all`
        return axiosClient.get(url,{params})
    },

    newGift: (body) => {
        const url = `/gift/create`
        return axiosClient.post(url,body)
    },

    editGift: (id,body) => {
        const url = `/gift/${id}`
        return axiosClient.put(url,body)
    },

    deleteGift: (id) => {
        const url = `/gift/${id}`
        return axiosClient.delete(url)
    },

    getGiftWeek: () => {
        const url = `/gift/statistic/week`
        return axiosClient.get(url)
    },

    getGiftMonth: () => {
        const url = `/gift/statistic/month`
        return axiosClient.get(url)
    },

    getGiftYear: () => {
        const url = `/gift/statistic/year`
        return axiosClient.get(url)
    },
}
export default adminAPI