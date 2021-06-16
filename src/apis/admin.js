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
    }
}
export default adminAPI