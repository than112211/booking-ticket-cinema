import {createSlice} from '@reduxjs/toolkit';

const event = createSlice({
    name: 'event',
    initialState: {
        pending: false,
        event: [],
        error: null,
    },
    reducers: {
        addEvent: (state,action) => {
            return {
                ...state,
                pending: false,
                event: action.payload
            }
        },

        getEventInit: () => {
            
        },

        getEventPending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },

        getEventError: (state,action) => {
            return {
                ...state,
                error: action.payload
            }
        }

    }
})

const {reducer,actions} = event
export const {getEventInit,addEvent,getEventPending,getEventError} = actions
export default reducer