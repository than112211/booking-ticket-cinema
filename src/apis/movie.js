import {NOW_MOVIE} from '../constants/index'
import axiosClient from './axiosClient'

const movieAPI = {
    getInit: (status) => {
        const url = `/movie/${status === NOW_MOVIE ? 'now' : 'comming'}`
        return axiosClient.get(url)
    },
    
    getMovie: (status,pagination) => {
        const params = {
            page: pagination.page,
            limit: pagination.limit,
        }
        const url = `/movie/${status === NOW_MOVIE ? 'playing' : 'soon'}`
        return axiosClient.get(url,{params})
    },

    getMovieDetail: (slug) => {
        const url = `/movie/${slug}`
        return axiosClient.get(url)
    }
}
export default movieAPI