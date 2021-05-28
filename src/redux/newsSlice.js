import {createSlice} from '@reduxjs/toolkit';

const news = createSlice({
    name: 'news',
    initialState: {
        pending: false,
        news: [],
        error: null
    },
    reducers: {
        addNews: (state,action) => {
            return {
                ...state,
                pending: false,
                news: action.payload
            }
        },
        getNewsInit: () => {

        },

        getNewsPending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },
        
        getNewsError: (state,action) => {
            return {
                ...state,
                error: action.payload
            }
        }
    }
})

const {reducer,actions} = news
export const {getNewsInit,addNews,getNewsPending,getNewsError} = actions
export default reducer