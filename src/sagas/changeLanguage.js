import {put, delay, takeEvery} from 'redux-saga/effects'
import {changeLanguage} from '../redux/languageSlice'
import {showLoading,hidenLoading} from '../redux/loadingSlice'
import i18n from '../i18n'

function* trackingChangeLanguage(action){
    yield put(showLoading())
    i18n.changeLanguage(action.payload)
    yield delay(1000)
    yield put(hidenLoading())
}

function* changeLanguageSaga() {
    yield takeEvery(changeLanguage,trackingChangeLanguage)
}
export default changeLanguageSaga