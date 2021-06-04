import {put, delay,call, takeEvery, select} from 'redux-saga/effects'
import { addMovieToMovietime, getMovietimeInit, getMovietimeError, getMovietimePending, addHourList,addTheater,addDateList, addDate } from '../redux/movietimeSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'
import movieAPI from '../apis/movie'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import movietimeAPI from '../apis/movietime'

function* trackingMovietime(action){
    yield put(showLoading())
    const data = yield call(movieAPI.getMovieDetail,action.payload.slug)
    yield put(getMovietimePending())     
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addMovieToMovietime(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getMovietimeError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGetDateList(action){
    yield put(showLoading())
    const idMovie = yield select(state => state.movietime.movie._id)
    const data = yield call(movietimeAPI.getDateMovietime,idMovie,action.payload._id)
    yield put(getMovietimePending())     
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addDateList([...new Set(data.data)]))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getMovietimeError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGetHourList(action){
    yield put(showLoading())
    const idMovie = yield select(state => state.movietime.movie._id)
    const idTheater = yield select(state => state.movietime.theater._id)
    const data = yield call(movietimeAPI.getHourMovietime,idMovie,idTheater,action.payload)
    yield put(getMovietimePending())     
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addHourList(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getMovietimeError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}


function* movietimeSaga() {
    yield takeEvery(getMovietimeInit,trackingMovietime)
    yield takeEvery(addTheater,trackingGetDateList)
    yield takeEvery(addDate,trackingGetHourList)
}

export default movietimeSaga