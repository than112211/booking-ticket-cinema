import {createSlice} from '@reduxjs/toolkit';

const gift = createSlice({
    name: 'gift',
    initialState: {
        pending: false,
        gift: [],
        status: null,
        error: null,
    },
    reducers: {
        addGift: (state,action) => {
            return {
                ...state,
                pending: false,
                gift: action.payload
            }
        },

        getGiftInit: () => {
            
        },

        tradeGift: (state,action) => {

        },

        tradeGiftStatus: (state,action) => {
            return {
                ...state,
                status: action.payload
            }
        },

        getGiftPending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },

        getGiftError: (state,action) => {
            return {
                ...state,
                error: action.payload
            }
        }

    }
})

const {reducer,actions} = gift
export const {addGift,getGiftInit,getGiftPending,getGiftError,tradeGift,tradeGiftStatus} = actions
export default reducer