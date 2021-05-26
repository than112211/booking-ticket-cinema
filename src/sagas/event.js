import {put,call,takeEvery} from 'redux-saga/effects'
import eventAPI from '../apis/event'
import {FETCH_DATA_SUCCESS} from '../constants/index'
import {addEvent,getEventInit} from '../redux/eventSlice'

function* trackingGetInitEvent(){
    const data = yield call(eventAPI.getInit)
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addEvent(data.data))
     }
}
function* movieSaga() {
    yield takeEvery(getEventInit,trackingGetInitEvent)
}
export default movieSaga