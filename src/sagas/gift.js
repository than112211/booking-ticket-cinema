import {put,call,takeEvery,delay,select} from 'redux-saga/effects'
import giftAPI from '../apis/gift'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import { addListGift, decreasePageGift, getGiftError, getGiftPending, getListGift, increasePageGift, setPageGift, setTotalGift, tradeGift, tradeGiftStatus } from '../redux/giftSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'

function* trackingGetGiftInit(){
    yield put(showLoading())
    const pagination = yield select(state => state.gift.pagination)
    const data = yield call(giftAPI.getListGift,pagination)
    yield put(getGiftPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addListGift(data.data.gift))
        yield put(setTotalGift(data.data.total))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getGiftError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trachkingTradeGift(action){
    yield put(showLoading())
    const data = yield call(giftAPI.tradeGift,action.payload)
    yield put(getGiftPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(tradeGiftStatus(data.data.message))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getGiftError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* giftSaga() {
    yield takeEvery([getListGift,increasePageGift,decreasePageGift,setPageGift],trackingGetGiftInit)
    yield takeEvery(tradeGift,trachkingTradeGift)
}

export default giftSaga