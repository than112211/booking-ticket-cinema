import {createSlice} from '@reduxjs/toolkit'
import { LITMIT_MOVIE } from '../constants'

const pagination = createSlice({
    name: 'pagination',
    initialState: {
        page: 1,
        limit: LITMIT_MOVIE,
        total: 0
    },
    reducers: {
        increasePage: (state,action) => {
           return {
               ...state,
               page: state.page + 1
           }
        },
        decreasePage: (state,action) => {
            return {
                ...state,
                page: state.page - 1
            }
        },

        setPage: (state,action) => {
            return {
                ...state,
                page: action.payload
            }
        },

        setTotal: (state,action) => {
            return {
                ...state,
                total: action.payload
            }
        },

        resetPage: (state,action) => {
            return {
                ...state,
                total: 0,
                page: 1,
            }
        }

    }
})

const {reducer,actions} = pagination
export const {increasePage,decreasePage,setPage,setTotal,resetPage} = actions
export default reducer