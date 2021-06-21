import {put,call,delay,takeEvery, select} from 'redux-saga/effects'
import userAPI from '../apis/user'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import {loginUser,loginSuccess, registerUser,getUser, loginStatus, getTicket, addTicket, getTicketPending, getTicketError, userError, userPending, registerStatus} from '../redux/userSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'

function* trackingLogin(action){
    yield put(showLoading())
    const data = yield call(userAPI.userLogin,action.payload)
    yield put(userPending())
    if(data.status === FETCH_DATA_SUCCESS){
        if(data.data.user){
            localStorage.setItem('token',data.data.token)
            yield put(loginSuccess(data.data.user))
            yield put(loginStatus(data.statusCode))
        }
        else {
            yield put(loginStatus(data.statusCode))
        }
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(userError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingRegister(action){
    yield put(showLoading())
    const data = yield call(userAPI.userRegister,action.payload)
    yield put(userPending())
    if(data.status === FETCH_DATA_SUCCESS){
        if(data.data.user){
            localStorage.setItem('token',data.data.token)
            yield put(loginSuccess(data.data.user))
            yield put(registerStatus(data.statusCode))
        }
        else {
            yield put(registerStatus(data.statusCode))
        }
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(userError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGetUser(){
    const data = yield call(userAPI.userMe)
    yield put(userPending())
    if(data.status === FETCH_DATA_SUCCESS){
        if(data.data){
            yield put(loginSuccess(data.data))
        }
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(userError(data.error))
    }
}

function* trackingGetHistoryTicket(){
    yield put(showLoading())
    const data = yield call(userAPI.getAllTicket)
    yield put(getTicketPending())
    if(data.status === FETCH_DATA_SUCCESS){
            yield put(addTicket(data.data))
        }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getTicketError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* userSaga() {
    yield takeEvery(loginUser,trackingLogin)
    yield takeEvery(registerUser,trackingRegister)
    yield takeEvery(getUser,trackingGetUser)
    yield takeEvery(getTicket,trackingGetHistoryTicket)

}
export default userSaga