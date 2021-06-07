import axiosClient from './axiosClient'

const movietimeAPI = {
    
    getDateMovietime: (id_movie,id_theater) => {
        const url = `/movietime/${id_movie}/${id_theater}`
        return axiosClient.get(url)
    },

    getHourMovietime: (id_movie,id_theater,date) => {
        const url = `/movietime/${id_movie}/${id_theater}/${date}`
        return axiosClient.get(url)
    },

    getMovietime: (id_movie,id_theater,date,hour) => {
        const url = `/movietime/${id_movie}/${id_theater}/${date}/${hour}`
        return axiosClient.get(url)
    }
}
export default movietimeAPI