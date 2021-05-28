import {all} from 'redux-saga/effects'
import changeLanguageSaga from './changeLanguage'
import movieSaga from './movie'
import eventSaga from './event'
import newsSaga from './news'

function* rootSaga() {
    yield all([
        changeLanguageSaga(),
        movieSaga(),
        eventSaga(),
        newsSaga(),
    ]);
}
export default rootSaga