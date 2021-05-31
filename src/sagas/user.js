import {put,call,delay,takeEvery} from 'redux-saga/effects'
import userAPI from '../apis/user'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import {loginUser,loginError,loginPending,loginSuccess, registerUser,getUser, loginStatus} from '../redux/userSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'

function* trackingLogin(action){
    yield put(showLoading())
    const data = yield call(userAPI.userLogin,action.payload)
    yield put(loginPending())
    if(data.status === FETCH_DATA_SUCCESS){
        if(data.data.user){
            localStorage.setItem('token',data.data.token)
            yield put(loginSuccess(data.data.user))
        }
        else {
            yield put(loginStatus(data.data.message))
        }
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(loginError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingRegister(action){
    yield put(showLoading())
    const data = yield call(userAPI.userRegister,action.payload)
    yield put(loginPending())
    if(data.status === FETCH_DATA_SUCCESS){
        if(data.data.user){
            localStorage.setItem('token',data.data.token)
            yield put(loginSuccess(data.data.user))
        }
        else {
            yield put(loginStatus(data.data.message))
        }
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(loginError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGetUser(){
    const data = yield call(userAPI.userMe)
    yield put(loginPending())
    if(data.status === FETCH_DATA_SUCCESS){
        if(data.data){
            yield put(loginSuccess(data.data))
        }
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(loginError(data.error))
    }
}

function* userSaga() {
    yield takeEvery(loginUser,trackingLogin)
    yield takeEvery(registerUser,trackingRegister)
    yield takeEvery(getUser,trackingGetUser)
}
export default userSaga