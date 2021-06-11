import {put,call,takeEvery, delay} from 'redux-saga/effects'
import ticketAPI from '../apis/ticket'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import { hidenLoading, showLoading } from '../redux/loadingSlice'
import {  checkTicketUnpaid, paidAll, payment, paymentError, paymentPending, paymentSuccess } from '../redux/ticketSlice'
import { getTicket } from '../redux/userSlice'

function* trackingPayment(action){
    yield put(showLoading())
    const data = yield call(ticketAPI.payment,action.payload)
    yield put(paymentPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(paymentSuccess(data.data))
        yield put(getTicket())
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(paymentError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trachkingCheckTicketUnpaid(){
    const data = yield call(ticketAPI.checkUnpaid)
    if(data.status === FETCH_DATA_SUCCESS){
        if(data.data){
            yield put(paymentPending())
        }
        else yield put(paidAll())
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(paymentError(data.error))
    }
}

function* ticketSaga() {
    yield takeEvery(payment,trackingPayment)
    yield takeEvery(checkTicketUnpaid,trachkingCheckTicketUnpaid)

}

export default ticketSaga