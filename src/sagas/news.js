import {put,call,takeEvery} from 'redux-saga/effects'
import newsAPI from '../apis/news'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import {addNews,getNewsError,getNewsInit, getNewsPending} from '../redux/newsSlice'

function* trackingGetInitNews(){
    const data = yield call(newsAPI.getInit)
    yield put(getNewsPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(addNews(data.data))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getNewsError(data.error))
    }
}
function* newsSaga() {
    yield takeEvery(getNewsInit,trackingGetInitNews)
}
export default newsSaga