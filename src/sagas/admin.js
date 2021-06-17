import {put,call,takeEvery,delay, select} from 'redux-saga/effects'
import adminAPI from '../apis/admin'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import { addGiftGetMonth, addGiftGetWeek, addGiftGetYear, addListGift, addListUser, addUserCreatedMonth, addUserCreatedWeek, addUserCreatedYear, decreasePageGift, decreasePageUser, deleteGift, deleteUser, editGift, editUser, getDataError, getDataPending, getDataSuccess, getGiftStatistic, getListGift, getListUser, getUserStatistic, increasePageGift, increasePageUser, newGift, setPageGift, setPageUser, setStatusDeleteGift, setStatusDeleteUser, setStatusEditGift, setStatusEditUser, setStatusNewGift, setTotalGift, setTotalUser } from '../redux/adminSlice'
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

function* trackingGetListGift(){
    yield put(showLoading())
    const pagination = yield select(state => state.admin.gifts.paginationGift)
    const data = yield call(adminAPI.getListGift,pagination)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(addListGift(data.data.gift))
        yield put(setTotalGift(data.data.total))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingEditGift(action){
    yield put(showLoading())
    const data = yield call(adminAPI.editGift,action.payload.id,action.payload.data)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListGift())
        yield put(setStatusEditGift(data.statusCode))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingDeleteGift(action){
    yield put(showLoading())
    const data = yield call(adminAPI.deleteGift,action.payload)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListGift())
        yield put(setStatusDeleteGift(data.statusCode))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingNewGift(action){
    yield put(showLoading())
    const data = yield call(adminAPI.newGift,action.payload)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListGift())
        yield put(setStatusNewGift(data.statusCode))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGiftStatistic(){
    yield put(showLoading())
    const numberGiftWeek = yield call(adminAPI.getGiftWeek)
    const numberGiftMonth = yield call(adminAPI.getGiftMonth)
    const numberGiftYear = yield call(adminAPI.getGiftYear)
    yield put(getDataPending())
    if(numberGiftWeek.status && numberGiftMonth.status && numberGiftYear.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(addGiftGetWeek(numberGiftWeek.data))
        yield put(addGiftGetMonth(numberGiftWeek.data))
        yield put(addGiftGetYear(numberGiftWeek.data))
    }
    if(numberGiftWeek.status || numberGiftMonth.status || numberGiftYear.status === FETCH_DATA_FAIL){
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
    yield takeEvery([getListGift,increasePageGift,decreasePageGift,setPageGift],trackingGetListGift)
    yield takeEvery(editGift,trackingEditGift)
    yield takeEvery(deleteGift,trackingDeleteGift)
    yield takeEvery(newGift,trackingNewGift)
    yield takeEvery(getGiftStatistic,trackingGiftStatistic)

}

export default adminSaga