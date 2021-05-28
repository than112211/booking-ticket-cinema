import {createSlice, current} from '@reduxjs/toolkit';
import {NOW_MOVIE,NUMBER_MOVIE_HOME} from '../constants/index'

const movie = createSlice({
    name: 'movie',
    initialState: {
        status: NOW_MOVIE,
        movie: [],
        pending: false,
        error: null
    },
    reducers: {
        statusMovie: (state,action) => {
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
        
        getMovieInit: () => {

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
export const {statusMovie,addMovie,getMovieInit,getMoviePending,getMovieError} = actions
export default reducer