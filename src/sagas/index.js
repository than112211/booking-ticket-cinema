import {all} from 'redux-saga/effects'
import changeLanguageSaga from './changeLanguage'
import movieSaga from './movie'
import eventSaga from './event'
import newsSaga from './news'
import userSaga from './user'
import movietimeSaga from './movietime'
import theaterSaga from './theater'

function* rootSaga() {
    yield all([
        changeLanguageSaga(),
        movieSaga(),
        eventSaga(),
        newsSaga(),
        userSaga(),
        movietimeSaga(),
        theaterSaga(),
    ]);
}
export default rootSaga