import createSagaMiddleware from 'redux-saga'
import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit'
import rootSaga from './sagas'
import languageReducer from './redux/languageSlice'
import loadingReducer from './redux/loadingSlice'
import movieReducer from './redux/movieSlice'
import eventReducer from './redux/eventSlice'
import newsReducer from './redux/newsSlice'
import userReducer from './redux/userSlice'
import paginationReducer from './redux/paginationSlice'
import movietimeReducer from './redux/movietimeSlice'
import theaterReducer from './redux/theaterSlice'

const rootReducer = {
    language: languageReducer,
    loading: loadingReducer,
    movie: movieReducer,
    event: eventReducer,
    news: newsReducer,
    user: userReducer,
    pagination: paginationReducer,
    movietime: movietimeReducer,
    theater: theaterReducer,
}
const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
    reducer: rootReducer,
    middleware
})

sagaMiddleware.run(rootSaga)

export default store