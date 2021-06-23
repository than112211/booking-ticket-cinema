import {put,call,takeEvery,delay, select} from 'redux-saga/effects'
import adminAPI from '../apis/admin'
import movietimeAPI from '../apis/movietime'
import {FETCH_DATA_FAIL, FETCH_DATA_SUCCESS} from '../constants/index'
import { addFilterDate, addFilterMovie, addFilterTheater, addGiftGetMonth, addGiftGetWeek, addGiftGetYear, addListDate, addListGift, addListMovie, addListMovietime, addListNameMovie, addListUser, addMovieAll, addMovieCommingSoon, addMoviePlaying, addUserCreatedMonth, addUserCreatedWeek, addUserCreatedYear, changeToCommingSoonMovie, changeToPlayingMovie, decreasePageGift, decreasePageMovie, decreasePageMovietime, decreasePageUser, deleteGift, deleteMovie, deleteMovietime, deleteUser, editGift, editMovie, editUser, getDataError, getDataPending, getDataSuccess, getGiftStatistic, getListGift, getListMovie, getListMovietime, getListNameMovie, getListUser, getMovieStatistic, getUserStatistic, increasePageGift, increasePageMovie, increasePageMovietime, increasePageUser, newGift, newMovie, newMovietime, setPageGift, setPageMovie, setPageMovietime, setPageUser, setStatusDeleteGift, setStatusDeleteMovie, setStatusDeleteMovietime, setStatusDeleteUser, setStatusEditGift, setStatusEditMovie, setStatusEditUser, setStatusNewGift, setStatusNewMovie, setStatusNewMovietime, setTotalGift, setTotalMovie, setTotalMovietime, setTotalUser } from '../redux/adminSlice'
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
        yield put(addUserCreatedMonth(numberCreatedMonth.data))
        yield put(addUserCreatedYear(numberCreatedYear.data))
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
        yield put(addGiftGetMonth(numberGiftMonth.data))
        yield put(addGiftGetYear(numberGiftYear.data))
    }
    if(numberGiftWeek.status || numberGiftMonth.status || numberGiftYear.status === FETCH_DATA_FAIL){
        yield put(getDataError(FETCH_DATA_FAIL))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGetListMovie(){
    yield put(showLoading())
    const pagination = yield select(state => state.admin.movies.paginationMovie)
    const data = yield call(adminAPI.getListMovie,pagination)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(addListMovie(data.data.movie))
        yield put(setTotalMovie(data.data.total))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingNewMovie(action){
    yield put(showLoading())
    const data = yield call(adminAPI.newMovie,action.payload)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListMovie())
        yield put(setStatusNewMovie(data.statusCode))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingEditMovie(action){
    yield put(showLoading())
    const data = yield call(adminAPI.editMovie,action.payload.id,action.payload.data)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListMovie())
        yield put(setStatusEditMovie(data.statusCode))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingChangeToPlayingMovie(action){
    yield put(showLoading())
    const data = yield call(adminAPI.changeToPlayingMovie,action.payload)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListMovie())
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingChangeToCommingSoonMovie(action){
    yield put(showLoading())
    const data = yield call(adminAPI.changeToCommingSoonMovie,action.payload)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListMovie())
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingDeleteMovie(action){
    yield put(showLoading())
    const data = yield call(adminAPI.deleteMovie,action.payload)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListMovie())
        yield put(setStatusDeleteMovie(data.statusCode))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingMovieStatistic(){
    yield put(showLoading())
    const numberPlaying = yield call(adminAPI.numberMoviePlaying)
    const numberCommingSoon = yield call(adminAPI.numberMovieCommingSoon)
    const numberAll = yield call(adminAPI.numberMovieAll)
    yield put(getDataPending())
    if(numberPlaying.status && numberCommingSoon.status && numberAll.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(addMovieCommingSoon(numberCommingSoon.data))
        yield put(addMoviePlaying(numberPlaying.data))
        yield put(addMovieAll(numberAll.data))
    }
    if(numberPlaying.status || numberCommingSoon.status || numberAll.status === FETCH_DATA_FAIL){
        yield put(getDataError(FETCH_DATA_FAIL))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGetListMovietime(){
    yield put(showLoading())
    const pagination = yield select(state => state.admin.movietimes.paginationMovietime)
    const filter = yield select(state => state.admin.movietimes.filter)
    const data = yield call(adminAPI.getListMovietime,pagination,filter)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(addListMovietime(data.data.movie))
        yield put(setTotalMovietime(data.data.total))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGetListNameMovie(){
    yield put(showLoading())
    const data = yield call(adminAPI.getListNameMovie)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(addListNameMovie(data.data))
        yield put(addFilterMovie(data.data[0]))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingGetDateList(action){
    yield put(showLoading())
    const idMovie = yield select(state => state.admin.movietimes.filter.movie.id)
    const data = yield call(movietimeAPI.getDateMovietime,idMovie,action.payload._id)
    yield put(getDataPending())     
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(addListDate([...new Set(data.data)]))
     }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}


function* trackingNewMovietime(action){
    yield put(showLoading())
    const data = yield call(adminAPI.newMovietime,action.payload)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListMovietime())
        yield put(setStatusNewMovietime(data.statusCode))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
    }
    yield delay(300)
    yield put(hidenLoading())
}

function* trackingDeleteMovietime(action){
    yield put(showLoading())
    const data = yield call(adminAPI.deleteMovietime,action.payload)
    yield put(getDataPending())
    if(data.status === FETCH_DATA_SUCCESS){
        yield put(getDataSuccess())
        yield put(getListMovietime())
        yield put(setStatusDeleteMovietime(data.statusCode))
    }
    if(data.status === FETCH_DATA_FAIL){
        yield put(getDataError(data.error))
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
    yield takeEvery([getListMovie,increasePageMovie,decreasePageMovie,setPageMovie],trackingGetListMovie)
    yield takeEvery(newMovie,trackingNewMovie)
    yield takeEvery(editMovie,trackingEditMovie)
    yield takeEvery(changeToCommingSoonMovie,trackingChangeToCommingSoonMovie)
    yield takeEvery(changeToPlayingMovie,trackingChangeToPlayingMovie)
    yield takeEvery(deleteMovie,trackingDeleteMovie)
    yield takeEvery(getMovieStatistic,trackingMovieStatistic)
    yield takeEvery([getListMovietime,addFilterDate,addFilterTheater,addFilterMovie,increasePageMovietime,decreasePageMovietime,setPageMovietime],trackingGetListMovietime)
    yield takeEvery(getListNameMovie,trackingGetListNameMovie)
    yield takeEvery(addFilterTheater,trackingGetDateList)
    yield takeEvery(newMovietime,trackingNewMovietime)
    yield takeEvery(deleteMovietime,trackingDeleteMovietime)

}

export default adminSaga