import {put, delay,call, takeEvery, select} from 'redux-saga/effects'
import {statusMovieHome,statusMoviePage,addMovie, getMoviePending, getMovieError, getMovieDetail,addMovieDetail} from '../redux/movieSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'
import movieAPI from '../apis/movie'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import { setTotal,increasePage,decreasePage, setPage,resetPage } from '../redux/paginationSlice'

function* trackingChangeStatusMovieHome(action){
    yield put(showLoading())
    const data = yield call(movieAPI.getInit,action.payload)
    yield put(getMoviePending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addMovie(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getMovieError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingChangeStatusMovie(action){
    yield put(showLoading())
    yield put(resetPage())
    const pagination = yield select(state => state.pagination)
    const data = yield call(movieAPI.getMovie,action.payload,pagination)
    yield put(getMoviePending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addMovie(data.data.movie))
        yield put(setTotal(data.data.total))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getMovieError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingChangePageMovie(){
    yield put(showLoading())
    const pagination = yield select(state => state.pagination)
    const movies = yield select(state => state.movie)
    const data = yield call(movieAPI.getMovie,movies.status,pagination)
    yield put(getMoviePending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addMovie(data.data.movie))
        yield put(setTotal(data.data.total))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getMovieError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}


function* trackingMovieDetail(action){
    yield put(showLoading())
    const data = yield call(movieAPI.getMovieDetail,action.payload.slug)
    yield put(getMoviePending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addMovieDetail(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getMovieError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}



function* movieSaga() {
    yield takeEvery(statusMovieHome,trackingChangeStatusMovieHome)
    yield takeEvery(statusMoviePage,trackingChangeStatusMovie)
    yield takeEvery([setPage,increasePage,decreasePage],trackingChangePageMovie)
    yield takeEvery(getMovieDetail,trackingMovieDetail)
}

export default movieSaga