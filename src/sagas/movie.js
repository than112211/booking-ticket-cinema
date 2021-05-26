import {put, delay,call, takeEvery} from 'redux-saga/effects'
import {statusMovie,getMovieInit} from '../redux/movieSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'
import movieAPI from '../apis/movie'
import {FETCH_DATA_SUCCESS, NOW_MOVIE} from '../constants/index'
import {addMovie} from '../redux/movieSlice'

function* trackingChangeStatusMovie(action){
    yield put(showLoading())
    const data = yield call(movieAPI.getInit,action.payload)
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addMovie(data.data))
     }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGetInitMovie(){
    const data = yield call(movieAPI.getInit,NOW_MOVIE)
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addMovie(data.data))
     }
}

function* movieSaga() {
    yield takeEvery(statusMovie,trackingChangeStatusMovie)
    yield takeEvery(getMovieInit,trackingGetInitMovie)
}

export default movieSaga