import {createSlice} from '@reduxjs/toolkit';

const user = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        user: {},
        pending: false,
        error: null,
        status: null,
    },
    reducers: {
        loginUser: () => {

        },

        registerUser: () => {
    
        },

        logoutUser: (state) => {
            return {
                ...state,
                isLogin: false,
                user: {},
                error: null,
                status: null,
            }
        },

        getUser: () => {

        },
        loginSuccess: (state,action) => {
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                pending: false,
                error: null,
            }
        },
        loginPending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },

        loginError: (state,action) => {
            return {
                ...state,
                error: action.payload,
                pending: false
            }
        },

        loginStatus: (state,action) => {
            return {
                ...state,
                status: action.payload,
                pending: false
            }
        }
        

    }
})

const {reducer,actions} = user
export const {loginUser,registerUser,loginError,loginPending,loginSuccess,getUser,loginStatus,logoutUser} = actions
export default reducer