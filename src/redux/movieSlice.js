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
export const {statusMovieHome,addMovie,getMoviePending,getMovieError,statusMoviePage} = actions
export default reducer