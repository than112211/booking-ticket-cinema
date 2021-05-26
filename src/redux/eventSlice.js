import {createSlice} from '@reduxjs/toolkit';

const event = createSlice({
    name: 'event',
    initialState: [],
    reducers: {
        addEvent: (state,action) => {
            return action.payload
        },
        getEventInit: () => {
        }
    }
})

const {reducer,actions} = event
export const {getEventInit,addEvent} = actions
export default reducer