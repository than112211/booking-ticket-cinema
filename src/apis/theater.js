import axiosClient from './axiosClient'

const theaterAPI = {
    
    getInit: () => {
        const url = `/theater/all`
        return axiosClient.get(url)
    }
}
export default theaterAPI