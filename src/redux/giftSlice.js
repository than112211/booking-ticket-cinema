import {createSlice} from '@reduxjs/toolkit';
import { LITMIT_GIFT } from '../constants';

const gift = createSlice({
    name: 'gift',
    initialState: {
        pending: false,
        gift: [],
        status: null,
        error: null,
        pagination: {
            page:1,
            limit: LITMIT_GIFT,
            total: null,
        }
    },
    reducers: {
        increasePageGift: (state,action) => {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: state.pagination.page + 1
                }
            }
        },

        decreasePageGift: (state,action) => {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: state.pagination.page - 1
                }
            }
        },

        setPageGift: (state,action) => {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.payload
                }
            }
        },

        setTotalGift: (state,action) => {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    total: action.payload
                }
            }
        },

        addListGift: (state,action) => {
            return {
                ...state,
                pending: false,
                gift: action.payload
            }
        },

        getListGift: () => {
            
        },

        tradeGift: (state,action) => {

        },

        tradeGiftStatus: (state,action) => {
            return {
                ...state,
                status: action.payload
            }
        },

        clearGiftStatus: (state,action) => {
            return {
                ...state,
                status: null
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
export const {addListGift,getListGift,clearGiftStatus,getGiftPending,getGiftError,tradeGift,tradeGiftStatus,increasePageGift,decreasePageGift,setPageGift,setTotalGift} = actions
export default reducer