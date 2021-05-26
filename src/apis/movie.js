import {NOW_MOVIE} from '../constants/index'
import axiosClient from './axiosClient'

const movieAPI = {
    getInit: (status) => {
        const url = `/movie/${status === NOW_MOVIE ? 'now' : 'comming'}`
        return axiosClient.get(url)
    }
}
export default movieAPI