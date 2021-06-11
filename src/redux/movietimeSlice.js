import {createSlice} from '@reduxjs/toolkit';

const movietime = createSlice({
    name: 'movietime',
    initialState: {
        movie_time: null,
        theater: null,
        date_list: [],
        date: null,
        date_server: null,
        hour_list: [],
        hour: null,
        movie: [],
        pending: false,
        error: null,
    },
    reducers: {
        getMovietime: (state,action) => {
            return {
                ...state,
                pending: true,
            }
        },

        addMovietime: (state,action) => {
            return {
                ...state,
                pending: false,
                movie_time: action.payload
            }
        },
        
        addHourList: (state,action) => {
            return {
                ...state,
                pending: false,
                hour_list: action.payload
            }
        },
        
        addHour: (state,action) => {
            return {
                ...state,
                hour: action.payload
            }
        },
        
        resetHour: (state,action) => {
            return {
                ...state,
                hour: null
            }
        },

        resetDate: (state,action) => {
            return {
                ...state,
                date: null
            }
        },

        addDateList: (state,action) => {
            return {
                ...state,
                pending: false,
                date_list: action.payload
            }
        },

        addDate: (state,action) => {
            return {
                ...state,
                date: new Date(action.payload).toLocaleDateString(),
                date_server: action.payload
            }
        },

        addTheater: (state,action) => {
            return {
                ...state,
                theater: action.payload
            }
        },

        addMovieToMovietime: (state,action) => {
            return {
                ...state,
                pending: false,
                movie: action.payload
            }
        },

        getMovietimeInit: () => {
            
        },
      
        getMovietimePending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },

        getMovietimeError: (state,action) => {
            return {
                ...state,
                error: action.payload
            }
        }
    }
})

const {reducer,actions} = movietime
export const {getMovietimeInit,getMovietimeError,getMovietimePending,addMovieToMovietime,addHour,addTheater,addDate,addDateList,addHourList,resetDate,resetHour,getMovietime,addMovietime} = actions
export default reducer