import {put,call,takeEvery} from 'redux-saga/effects'
import eventAPI from '../apis/event'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import {addEvent,getEventError,getEventInit, getEventPending} from '../redux/eventSlice'

function* trackingGetInitEvent(){
    const data = yield call(eventAPI.getInit)
    yield put(getEventPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addEvent(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getEventError(data.error))
    }
}
function* eventSaga() {
    yield takeEvery(getEventInit,trackingGetInitEvent)
}
export default eventSaga