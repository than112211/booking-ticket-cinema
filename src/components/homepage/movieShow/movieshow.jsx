import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {COMMING_SOON_MOVIE,NOW_MOVIE,HOST_SERVER,NUMBER_MOVIE_HOME} from '../../../constants/index'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {statusMovieHome} from '../../../redux/movieSlice'
import {Button} from 'reactstrap'
import './movieshow.scss'

function MovieShow(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const movies = useSelector(state => state.movie)

    useEffect(() => {
       dispatch(statusMovieHome(NOW_MOVIE))
    },[])

    function handleClickNowMovie(){
        if(movies.status !== NOW_MOVIE) {
            const action = statusMovieHome(NOW_MOVIE)
            dispatch(action)
        }
    }

    function handleClickCommingMovie(){
        if(movies.status !== COMMING_SOON_MOVIE) {
            const action = statusMovieHome(COMMING_SOON_MOVIE)
            dispatch(action)
        }
    }
    return (
        <div className="movieshow__container">
            <div className="show__tab">
                <ul>
                    <li className={classNames({'active__movieshow':movies.status === NOW_MOVIE ? true : false})} onClick={handleClickNowMovie}><Link>{t('show_movie.now')}</Link></li>
                    <li className={classNames({'active__movieshow':movies.status === COMMING_SOON_MOVIE ? true : false})} onClick={handleClickCommingMovie} ><Link>{t('show_movie.comming')}</Link></li>
                </ul>
            </div>
            <div className="show__content">
                <div className="container">
                    <div className="row">
                        {movies.movie && movies.movie.length ? movies.movie.map((movie,index) => {
                            return <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                                        <div className="movie__show-item">
                                            <Link to={`/movie/${movie.slug}`}><img src={`${HOST_SERVER}/${movie.image}`} alt="Anh phim" /></Link>
                                            <h1>{movie.name}</h1>
                                        </div>
                                    </div>
                        }) : <></> }
                    </div>
                    <div className="btn__extend">
                        <Button><Link to="/movie">{t('movie.see_more')}</Link></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieShow;