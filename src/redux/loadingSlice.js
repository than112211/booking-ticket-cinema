import {createSlice} from '@reduxjs/toolkit'

const loading = createSlice({
    name: 'loading',
    initialState: false,
    reducers: {
        showLoading: () => {
           return true
        },
        hidenLoading: () => {
           return false
        }
    }
})

const {reducer,actions} = loading
export const {showLoading,hidenLoading} = actions
export default reducer