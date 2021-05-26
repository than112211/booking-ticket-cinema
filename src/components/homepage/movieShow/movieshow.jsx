import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {COMMING_SOON_MOVIE,NOW_MOVIE,HOST_SERVER,NUMBER_MOVIE_HOME} from '../../../constants/index'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {statusMovie,getMovieInit} from '../../../redux/movieSlice'
import {Button} from 'reactstrap'
import './movieshow.scss'

function MovieShow(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const [movieClick,setMovieClick] = useState(NOW_MOVIE)
    const movies = useSelector(state => state.movie.movie)

    useEffect(() => {
       dispatch(getMovieInit())
    },[])

    function handleClickNowMovie(){
        if(movieClick !== NOW_MOVIE) {
            setMovieClick(NOW_MOVIE)
            const action = statusMovie(NOW_MOVIE)
            dispatch(action)
        }
    }

    function handleClickCommingMovie(){
        if(movieClick !== COMMING_SOON_MOVIE) {
            setMovieClick(COMMING_SOON_MOVIE)
            const action = statusMovie(COMMING_SOON_MOVIE)
            dispatch(action)
        }
    }
    return (
        <div className="movieshow__container">
            <div className="show__tab">
                <ul>
                    <li className={classNames({'active__movieshow':movieClick === NOW_MOVIE ? true : false})} onClick={handleClickNowMovie}><Link>{t('show_movie.now')}</Link></li>
                    <li className={classNames({'active__movieshow':movieClick === COMMING_SOON_MOVIE ? true : false})} onClick={handleClickCommingMovie} ><Link>{t('show_movie.comming')}</Link></li>
                </ul>
            </div>
            <div className="show__content">
                <div className="container">
                    <div className="row">
                        {movies && movies.length ? movies.map((movie,index) => {
                            return <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                                        <div className="movie__show-item">
                                            <img src={`${HOST_SERVER}/${movie.image}`} alt="" />
                                            <h1>{movie.name}</h1>
                                        </div>
                                    </div>
                        }) : <></> }
                    </div>
                    <div className="btn__extend">
                        <Button >Xem thêm</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieShow;