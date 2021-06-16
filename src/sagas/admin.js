import {put,call,takeEvery,delay, select} from 'redux-saga/effects'
import adminAPI from '../apis/admin'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import { addListUser, addUserCreatedMonth, addUserCreatedWeek, addUserCreatedYear, decreasePageUser, deleteUser, editUser, getDataError, getDataPending, getDataSuccess, getListUser, getUserStatistic, increasePageUser, setPageUser, setStatusDeleteUser, setStatusEditUser, setTotalUser } from '../redux/adminSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'

function* trackingGetListUser(){
    yield put(showLoading())
    const pagination = yield select(state => state.admin.users.paginationUser)
    const data = yield call(adminAPI.getListUser,pagination)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(addListUser(data.data.user))
        yield put(setTotalUser(data.data.total))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingEditUser(action){
    yield put(showLoading())
    const data = yield call(adminAPI.editUser,action.payload.id,action.payload.data)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListUser())
        yield put(setStatusEditUser(data.data))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingDeleteUser(action){
    yield put(showLoading())
    const data = yield call(adminAPI.deleteUser,action.payload)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListUser())
        yield put(setStatusDeleteUser(data.data))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingUserStatistic(){
    yield put(showLoading())
    const numberCreatedWeek = yield call(adminAPI.getUserCreatedWeek)
    const numberCreatedMonth = yield call(adminAPI.getUserCreatedMonth)
    const numberCreatedYear = yield call(adminAPI.getUserCreatedYear)
    yield put(getDataPending())
    if(numberCreatedWeek.status && numberCreatedMonth.status && numberCreatedYear.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(addUserCreatedWeek(numberCreatedWeek.data))
        yield put(addUserCreatedMonth(numberCreatedWeek.data))
        yield put(addUserCreatedYear(numberCreatedWeek.data))
    }
    if(numberCreatedWeek.status || numberCreatedMonth.status || numberCreatedYear.status === FETCH_DATA_FAIL){
        yield put(getDataError(FETCH_DATA_FAIL))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* adminSaga() {
    yield takeEvery([getListUser,increasePageUser,decreasePageUser,setPageUser],trackingGetListUser)
    yield takeEvery(editUser,trackingEditUser)
    yield takeEvery(deleteUser,trackingDeleteUser)
    yield takeEvery(getUserStatistic,trackingUserStatistic)
}

export default adminSaga