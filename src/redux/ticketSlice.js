import {createSlice} from '@reduxjs/toolkit';

const ticket = createSlice({
    name: 'ticket',
    initialState: {
        seat: [],
        price: 0,
        number_ticket: 0,
        gift_code: null
    },
    reducers: {
        addSeat: (state,action) => {
            return {
                ...state,
                seat: [...state.seat,action.payload.seat],
                price: state.price + action.payload.price,
                number_ticket: state.number_ticket + 1
            }
        },

        removeGift: (state,action) => {
            return {
                ...state,
                gift_code: null,
                price: state.number_ticket * action.payload,
            }
        },

        addGiftCode: (state,action) => {
            return {
                ...state,
                gift_code: action.payload.code,
                price: (state.number_ticket * action.payload.price) - action.payload.code.value,
            }
        },

        removeSeat: (state,action) => {
            return {
                ...state,
                seat: [...state.seat.filter((seat,i) => i !== state.seat.indexOf(action.payload.seat))],
                price: state.price - action.payload.price,
                number_ticket: state.number_ticket - 1
            }
        },
    }
})

const {reducer,actions} = ticket
export const {addSeat,removeSeat,addGiftCode,removeGift} = actions
export default reducer