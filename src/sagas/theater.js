import {put, delay,call, takeEvery} from 'redux-saga/effects'
import { getMovietimeInit } from '../redux/movietimeSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS } from '../constants/index'
import theaterAPI from '../apis/theater'
import { addTheaterList, getTheaterError, getTheaterPending } from '../redux/theaterSlice'
import { getListNameMovie } from '../redux/adminSlice'

function* trackingGetTheater(){
    yield put(showLoading())
    const data = yield call(theaterAPI.getInit)
    yield put(getTheaterPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addTheaterList(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getTheaterError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* theaterSaga() {
    yield takeEvery([getMovietimeInit,getListNameMovie],trackingGetTheater)
}

export default theaterSaga