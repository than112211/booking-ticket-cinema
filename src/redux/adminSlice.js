import {createSlice} from '@reduxjs/toolkit';
import { LIMIT_USER_ADMIN, TAB_ADMIN_DASHBOARD } from '../constants';

const admin = createSlice({
    name: 'admin',
    initialState: {
        pending: false,
        tab: TAB_ADMIN_DASHBOARD,
        error: null,
        users:{
            numberUserWeek: 0,
            numberUserMonth: 0,
            numberUserYear: 0,
            statusEdit: null,
            statusDelete: null,
            user: [],
            paginationUser:{
                total: 0,
                page: 1,
                limit: LIMIT_USER_ADMIN
            }
        }
    },
    reducers: {

        getUserStatistic: () => {

        },

        addUserCreatedWeek: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    numberUserWeek: action.payload
                }
            }
        },

        addUserCreatedMonth: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    numberUserMonth: action.payload
                }
            }
        },

        addUserCreatedYear: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    numberUserYear: action.payload
                }
            }
        },

        setStatusEditUser: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    statusEdit: action.payload
                }
            }
        },

        clearStatusEditUser: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    statusEdit: null
                }
            }
        },

        setStatusDeleteUser: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    statusDelete: action.payload
                }
            }
        },

        clearStatusDeleteUser: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    statusDelete: null
                }
            }
        },

        editUser: () => {

        },

        deleteUser: () => {

        },

        getListUser: () => {

        },

        addListUser: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    user: action.payload
                }
            }
        },

        increasePageUser: (state) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    paginationUser: {
                        ...state.users.paginationUser,
                        page: state.users.paginationUser.page + 1
                    }
                }
            }
         },
        decreasePageUser: (state) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    paginationUser: {
                        ...state.users.paginationUser,
                        page: state.users.paginationUser.page - 1
                    }
                }
            }
        },
 
        setPageUser: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    paginationUser: {
                        ...state.users.paginationUser,
                        page: action.payload
                    }
                }
            }
        },
 
        setTotalUser: (state,action) => {
            return {
                ...state,
                users: {
                    ...state.users,
                    paginationUser: {
                        ...state.users.paginationUser,
                        total: action.payload
                    }
                }
            }
        },

        chooseTab: (state,action) => {
            return {
                ...state,
                tab: action.payload
            }
        },

        getDataPending: (state,action) => {
            return {
                ...state,
                pending: true
            }
        },

        getDataError: (state,action) => {
            return {
                ...state,
                error: action.payload
            }
        },

        getDataSuccess: (state,action) => {
            return {
                ...state,
                pending: false
            }
        }

    }
})

const {reducer,actions} = admin
export const {getDataSuccess,getDataError,getDataPending,chooseTab,increasePageUser,decreasePageUser,setTotalUser,setPageUser,addListUser,getListUser,editUser,deleteUser,setStatusDeleteUser,setStatusEditUser,clearStatusEditUser,clearStatusDeleteUser,addUserCreatedMonth,addUserCreatedWeek,addUserCreatedYear,getUserStatistic} = actions
export default reducer