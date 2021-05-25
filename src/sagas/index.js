import {all} from 'redux-saga/effects'
import changeLanguageSaga from './changeLanguage'

function* rootSaga() {
    yield all([
        changeLanguageSaga()
    ]);
}
export default rootSaga