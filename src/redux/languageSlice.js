import {createSlice} from '@reduxjs/toolkit'

const language = createSlice({
    name:'language',
    initialState:'vi',
    reducers:{
        changeLanguage: (state,action) => {
            state = action.payload
            return state
        }
    }
})

const {reducer,actions} = language
export const {changeLanguage} = actions
export default reducer