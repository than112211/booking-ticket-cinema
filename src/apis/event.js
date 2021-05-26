import axiosClient from './axiosClient'

const eventAPI = {
    getInit: () => {
        const url = `/event/all`
        return axiosClient.get(url)
    }
}
export default eventAPI