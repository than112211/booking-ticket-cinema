import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {COMMING_SOON_MOVIE,NOW_MOVIE,HOST_SERVER} from '../../constants/index'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {statusMoviePage} from '../../redux/movieSlice'
import './movie.scss'
import PaginationPage from '../pagination/pagination';
import { Button } from 'reactstrap';

function MoviePage(props) {

    const {t} = useTranslation();
    const dispatch = useDispatch()
    const movies = useSelector(state => state.movie)

    useEffect(() => {
       dispatch(statusMoviePage(NOW_MOVIE))
    },[])

    function handleClickNowMovie(){
        if(movies.status !== NOW_MOVIE) {
            const action = statusMoviePage(NOW_MOVIE)
            dispatch(action)
        }
    }

    function handleClickCommingMovie(){
        if(movies.status !== COMMING_SOON_MOVIE) {
            const action = statusMoviePage(COMMING_SOON_MOVIE)
            dispatch(action)
        }
    }
    
    const moiveItem = movies.movie.map((movie,index) => {
        return  <div key={movie._id} className="col-12 col-sm-12 col-md-6">
                    <div className="movie__item">
                        <Link to={`/movie/${movie.slug}`}>
                            <div className="movie__img">
                                <img src={movie.image} alt="anh phim" />
                            </div>
                        </Link>
                        <div className="movie__info">
                            <div className="movie__text">
                                    <h1>{movie.name}</h1>
                                    <p>{movie.decription}</p>
                            </div>
                            <Button className="btn__buy"><Link to={`/movietime/${movie.slug}`}>{t('movie.buy')}</Link></Button>
                        </div>
                    </div>
                </div>
    })
    
    return (
        <div className="container movieshow__container movie__container">
             <div className="show__tab">
                <ul>
                    <li className={classNames({'active__movieshow':movies.status === NOW_MOVIE ? true : false})} onClick={handleClickNowMovie}><Link>{t('show_movie.now')}</Link></li>
                    <li className={classNames({'active__movieshow':movies.status === COMMING_SOON_MOVIE ? true : false})} onClick={handleClickCommingMovie} ><Link>{t('show_movie.comming')}</Link></li>
                </ul>
            </div>
            <div className="movie__content">
                <div className="row">
                    {moiveItem}
                </div>
            </div>
            <PaginationPage></PaginationPage>
        </div>
    );
}

export default MoviePage;