import {createSlice} from '@reduxjs/toolkit';
import { TAB_ADMIN_DASHBOARD } from '../constants';

const admin = createSlice({
    name: 'admin',
    initialState: {
        pending: false,
        tab: TAB_ADMIN_DASHBOARD,
        error: null,
    },
    reducers: {

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
        }

    }
})

const {reducer,actions} = admin
export const {getDataError,getDataPending,chooseTab} = actions
export default reducer