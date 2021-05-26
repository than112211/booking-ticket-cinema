import {all} from 'redux-saga/effects'
import changeLanguageSaga from './changeLanguage'
import movieSaga from './movie'
import eventSaga from './event'

function* rootSaga() {
    yield all([
        changeLanguageSaga(),
        movieSaga(),
        eventSaga()
    ]);
}
export default rootSaga