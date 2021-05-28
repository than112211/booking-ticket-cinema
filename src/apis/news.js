import {NUMBER_NEWS_HOME} from '../constants/index'
import axiosClient from './axiosClient'

const newsAPI = {
    getInit: () => {
        const url = `/news/all/${NUMBER_NEWS_HOME}`
        return axiosClient.get(url)
    }
}
export default newsAPI