import {createSlice} from '@reduxjs/toolkit';

const ticket = createSlice({
    name: 'ticket',
    initialState: {
        seat: [],
        price: 0,
        number_ticket: 0,
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
export const {addSeat,removeSeat} = actions
export default reducer