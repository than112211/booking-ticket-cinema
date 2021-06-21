import {createSlice} from '@reduxjs/toolkit';
import { LIMIT_GIFT_ADMIN, LIMIT_MOVIE_ADMIN, LIMIT_USER_ADMIN, TAB_ADMIN_DASHBOARD } from '../constants';

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
        },
        gifts:{
            numberGetWeek: {},
            numberGetMonth: {},
            numberGetYear: {},
            statusNew: null,
            statusEdit: null,
            statusDelete: null,
            gift: [],
            paginationGift:{
                total: 0,
                page: 1,
                limit: LIMIT_GIFT_ADMIN
            }
        },
        movies:{
            numberPlaying: 0,
            numberCommingSoon: 0,
            numberAll: 0,
            statusNew: null,
            statusEdit: null,
            statusDelete: null,
            movie: [],
            paginationMovie:{
                total: 0,
                page: 1,
                limit: LIMIT_MOVIE_ADMIN
            }
        }
    },
    reducers: {
        changeToPlayingMovie: () =>{

        },

        changeToCommingSoonMovie: () =>{

        },

        getMovieStatistic: () => {

        },

        addMoviePlaying: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    numberPlaying: action.payload
                }
            }
        },

        addMovieAll: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    numberAll: action.payload
                }
            }
        },

        addMovieCommingSoon: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    numberCommingSoon: action.payload
                }
            }
        },

        setStatusNewMovie: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    statusNew: action.payload
                }
            }
        },

        clearStatusNewMovie: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    statusNew: null
                }
            }
        },

        setStatusEditMovie: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    statusEdit: action.payload
                }
            }
        },

        clearStatusEditMovie: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    statusEdit: null
                }
            }
        },

        setStatusDeleteMovie: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    statusDelete: action.payload
                }
            }
        },

        clearStatusDeleteMovie: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    statusDelete: null
                }
            }
        },

        editMovie: () => {

        },

        newMovie: () => {

        },

        deleteMovie: () => {

        },

        getListMovie: () => {

        },

        addListMovie: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    movie: action.payload
                }
            }
        },

        increasePageMovie: (state) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    paginationMovie: {
                        ...state.movies.paginationMovie,
                        page: state.movies.paginationMovie.page + 1
                    }
                }
            }
         },
        decreasePageMovie: (state) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    paginationMovie: {
                        ...state.movies.paginationMovie,
                        page: state.movies.paginationMovie.page - 1
                    }
                }
            }
        },
 
        setPageMovie: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    paginationMovie: {
                        ...state.movies.paginationMovie,
                        page: action.payload
                    }
                }
            }
        },
 
        setTotalMovie: (state,action) => {
            return {
                ...state,
                movies: {
                    ...state.movies,
                    paginationMovie: {
                        ...state.movies.paginationMovie,
                        total: action.payload
                    }
                }
            }
        },

        getGiftStatistic: () => {

        },

        addGiftGetWeek: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    numberGetWeek: action.payload
                }
            }
        },

        addGiftGetMonth: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    numberGetMonth: action.payload
                }
            }
        },

        addGiftGetYear: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    numberGetYear: action.payload
                }
            }
        },

        setStatusNewGift: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    statusNew: action.payload
                }
            }
        },

        clearStatusNewGift: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    statusNew: null
                }
            }
        },

        setStatusEditGift: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    statusEdit: action.payload
                }
            }
        },

        clearStatusEditGift: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    statusEdit: null
                }
            }
        },

        setStatusDeleteGift: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    statusDelete: action.payload
                }
            }
        },

        clearStatusDeleteGift: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    statusDelete: null
                }
            }
        },

        editGift: () => {

        },

        newGift: () => {

        },

        deleteGift: () => {

        },

        getListGift: () => {

        },

        addListGift: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    gift: action.payload
                }
            }
        },

        increasePageGift: (state) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    paginationGift: {
                        ...state.gifts.paginationGift,
                        page: state.gifts.paginationGift.page + 1
                    }
                }
            }
         },
        decreasePageGift: (state) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    paginationGift: {
                        ...state.gifts.paginationGift,
                        page: state.gifts.paginationGift.page - 1
                    }
                }
            }
        },
 
        setPageGift: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    paginationGift: {
                        ...state.gifts.paginationGift,
                        page: action.payload
                    }
                }
            }
        },
 
        setTotalGift: (state,action) => {
            return {
                ...state,
                gifts: {
                    ...state.gifts,
                    paginationGift: {
                        ...state.gifts.paginationGift,
                        total: action.payload
                    }
                }
            }
        },

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
export const {  getDataSuccess,
                getDataError,
                getDataPending,
                chooseTab,
                increasePageUser,
                decreasePageUser,
                setTotalUser,
                setPageUser,
                addListUser,
                getListUser,
                editUser,
                deleteUser,
                setStatusDeleteUser,
                setStatusEditUser,
                clearStatusEditUser,
                clearStatusDeleteUser,
                addUserCreatedMonth,
                addUserCreatedWeek,
                addUserCreatedYear,
                getUserStatistic,
                getListGift,
                addListGift,
                increasePageGift,
                decreasePageGift,
                setPageGift,
                setStatusDeleteGift,
                setStatusEditGift,
                setTotalGift,
                editGift,
                deleteGift,
                clearStatusDeleteGift,
                clearStatusEditGift,
                newGift,
                setStatusNewGift,
                clearStatusNewGift,
                getGiftStatistic,
                addGiftGetMonth,
                addGiftGetWeek,
                addGiftGetYear,
                getListMovie,
                getMovieStatistic,
                setPageMovie,
                setStatusDeleteMovie,
                setStatusEditMovie,
                setStatusNewMovie,
                setTotalMovie,
                clearStatusDeleteMovie,
                clearStatusEditMovie,
                clearStatusNewMovie,
                addMovieCommingSoon,
                addListMovie,
                addMoviePlaying,
                addMovieAll,
                editMovie,
                newMovie,
                deleteMovie,
                increasePageMovie,
                decreasePageMovie,
                changeToCommingSoonMovie,
                changeToPlayingMovie
            } = actions
export default reducer