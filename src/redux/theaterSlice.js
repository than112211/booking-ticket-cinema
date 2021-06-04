import {createSlice} from '@reduxjs/toolkit';

const theater = createSlice({
    name: 'theater',
    initialState: {
        theater: [],
        pending: false,
        error: null
    },
    reducers: {

        addTheaterList: (state,action) => {
            return {
                ...state,
                pending: false,
                theater: action.payload
            }
        },

        getTheater: () => {
            
        },
      
        getTheaterPending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },

        getTheaterError: (state,action) => {
            return {
                ...state,
                error: action.payload
            }
        }
    }
})

const {reducer,actions} = theater
export const {getTheater,getTheaterError,getTheaterPending,addTheaterList} = actions
export default reducer