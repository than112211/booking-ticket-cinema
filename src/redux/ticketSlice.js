import {createSlice} from '@reduxjs/toolkit';

const ticket = createSlice({
    name: 'ticket',
    initialState: {
        seat: [],
        price: 0,
        number_ticket: 0,
        gift_code: null,
        method: null,
        pending: false,
        payment: null,
    },
    reducers: {

        checkTicketUnpaid: () => {
    
        },

        paidAll: (state) => {
            return {
                ...state,
                pending: false
            }
        },

        clearTicket: (state) => {
            return {
                ...state,
                seat: [],
                price: 0,
                number_ticket: 0,
                gift_code: null,
                method: null,
                payment: null,
            }
        },

        payment: () => {
            
        },

        addMethod: (state,action) => {
            return {
                ...state,
                method: action.payload
            }
        },

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
        paymentPending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },
        
        paymentError: (state,action) => {
            return {
                ...state,
                error: action.payload
            }
        },
        paymentSuccess: (state,action) => {
            return {
                ...state,
                error: null,
                payment: action.payload
            }
        }
    }
})

const {reducer,actions} = ticket
export const {addSeat,removeSeat,addGiftCode,removeGift,addMethod,payment,paymentPending,paymentError,paymentSuccess,clearTicket,checkTicketUnpaid,paidAll} = actions
export default reducer