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

    getListMovie: (pagination) => {
        const params = {
            page: pagination.page,
            limit: pagination.limit,
        }
        const url = `/movie/all`
        return axiosClient.get(url,{params})
    },

    newMovie: (body) => {
        const url = `/movie/create`
        return axiosClient.post(url,body)
    },

    editMovie: (id,body) => {
        const url = `/movie/edit/${id}`
        return axiosClient.put(url,body)
    },

    changeToPlayingMovie: (id) => {
        const url = `/movie/${id}/playing`
        return axiosClient.put(url)
    },

    changeToCommingSoonMovie: (id) => {
        const url = `/movie/${id}/comming`
        return axiosClient.put(url)
    },

    deleteMovie: (id) => {
        const url = `/movie/${id}`
        return axiosClient.delete(url)
    },

    numberMoviePlaying: () => {
        const url = `/movie/all/playing`
        return axiosClient.get(url)
    },

    numberMovieCommingSoon: () => {
        const url = `/movie/all/commingsoon`
        return axiosClient.get(url)
    },

    numberMovieAll: () => {
        const url = `/movie/all/total`
        return axiosClient.get(url)
    },

    getListNameMovie: () => {
        const url = `/movie/name`
        return axiosClient.get(url)
    },

    getListMovietime: (pagination,filter) => {
        const params = {
            page: pagination.page,
            limit: pagination.limit,
            theater: filter.theater ? filter.theater._id : null,
            movie: filter.movie.id,
            date: filter.date ? filter.date : null,
        }
        const url = `/movietime/all`
        return axiosClient.get(url,{params})
    },

    newMovietime : ({movie,theater,data}) => {
        const url = `/movietime/create/${movie}/${theater}`
        return axiosClient.post(url,data)
    },

    deleteMovietime : (id) => {
        const url = `/movietime/${id}`
        return axiosClient.delete(url)
    }
}
export default adminAPI