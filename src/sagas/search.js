import {put, delay,call, takeEvery} from 'redux-saga/effects'
import {showLoading,hidenLoading} from '../redux/loadingSlice'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS } from '../constants/index'
import { addResult, addSearch, getResultError, getResultPending } from '../redux/searchSlice'
import movieAPI from '../apis/movie'

function* trackingGetResultSearch(action){
    yield put(showLoading())
    const data = yield call(movieAPI.getMovieSearch,action.payload)
    yield put(getResultPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addResult(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getResultError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* searchSaga() {
    yield takeEvery(addSearch,trackingGetResultSearch)
}

export default searchSaga