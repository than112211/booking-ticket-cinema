import {createSlice} from '@reduxjs/toolkit';

const search = createSlice({
    name: 'search',
    initialState: {
        pending: false,
        search: '',
        error: null,
        result: []
    },
    reducers: {
        addSearch: (state,action) => {
            return {
                ...state,
                search: action.payload
            }
        },

        addResult: (state,action) =>{
            return {
                ...state,
                result: action.payload
            }
        },

        getResultPending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },
        
        getResultError: (state,action) => {
            return {
                ...state,
                error: action.payload
            }
        }
    }
})

const {reducer,actions} = search
export const {addResult,addSearch,getResultError,getResultPending} = actions
export default reducer