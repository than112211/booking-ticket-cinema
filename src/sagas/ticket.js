import {put,call,takeEvery, select, delay} from 'redux-saga/effects'
import ticketAPI from '../apis/ticket'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import { hidenLoading, showLoading } from '../redux/loadingSlice'
import { payment, paymentError, paymentPending, paymentSuccess } from '../redux/ticketSlice'

function* trackingPayment(action){
    yield put(showLoading())
    const data = yield call(ticketAPI.payment,action.payload)
    yield put(paymentPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(paymentSuccess(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(paymentError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* ticketSaga() {
    yield takeEvery(payment,trackingPayment)
}

export default ticketSaga