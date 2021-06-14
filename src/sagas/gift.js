import {put,call,takeEvery,delay} from 'redux-saga/effects'
import giftAPI from '../apis/gift'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import { addGift, getGiftError, getGiftInit, getGiftPending } from '../redux/giftSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'

function* trackingGetGiftInit(){
    yield put(showLoading())
    const data = yield call(giftAPI.getInit)
    yield put(getGiftPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addGift(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getGiftError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}
function* giftSaga() {
    yield takeEvery(getGiftInit,trackingGetGiftInit)
}
export default giftSaga