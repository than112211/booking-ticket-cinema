import {createSlice, current} from '@reduxjs/toolkit';
import {NOW_MOVIE,NUMBER_MOVIE_HOME} from '../constants/index'

const movie = createSlice({
    name: 'movie',
    initialState: {
        status: NOW_MOVIE,
        movie: []
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
                movie: action.payload
            }
        },
        getMovieInit: () => {

        }
    }
})

const {reducer,actions} = movie
export const {statusMovie,addMovie,getMovieInit} = actions
export default reducer