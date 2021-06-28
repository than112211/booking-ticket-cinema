import {createSlice} from '@reduxjs/toolkit';
import {NOW_MOVIE} from '../constants/index'

const movie = createSlice({
    name: 'movie',
    initialState: {
        status: NOW_MOVIE,
        movie: [],
        pending: false,
        movie_detail:[],
        error: null
    },
    reducers: {
        statusMovieHome: (state,action) => {
            return {
                ...state,
                status: action.payload
            }
        },

        statusMoviePage: (state,action) => {
            return {
                ...state,
                status: action.payload
            }
        },

        addMovie: (state,action) => {
            return {
                ...state,
                pending: false,
                movie: action.payload
            }
        },

        addMovieDetail: (state,action) => {
            return {
                ...state,
                pending: false,
                movie_detail: action.payload
            }
        },

        getMovieDetail: () => {
            
        },
      
        getMoviePending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },

        getMovieError: (state,action) => {
            return {
                ...state,
                error: action.payload
            }
        }
    }
})

const {reducer,actions} = movie
export const {statusMovieHome,addMovie,getMoviePending,getMovieError,statusMoviePage,getMovieDetail,addMovieDetail} = actions
export default reducer