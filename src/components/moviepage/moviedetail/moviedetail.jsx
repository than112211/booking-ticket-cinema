import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getMovieDetail } from '../../../redux/movieSlice'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import star from '../../../resourses/img/start.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import { HOST_SERVER } from '../../../constants';
import './moviedetail.scss'
import Trailer from './trailer/trailer';
import { Button } from 'reactstrap';

function MovieDetail(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const slug = useParams()
    const movie = useSelector(state => state.movie.movie_detail)
    const [modalTrailer, setmodalTrailer] = useState(false);
    
    const toggleTrailer = () => setmodalTrailer(!modalTrailer);
  
    useEffect(() => {
        dispatch(getMovieDetail(slug))
     },[])

    const rating = [...Array(movie.rating)].map((rating,index) => {
        return <img key={index} src={star} alt="Rating" />
    })
    return (
        <div className="movie__detail">
            <Trailer video={movie.trailer} toggleTrailer={toggleTrailer} modalTrailer={modalTrailer}></Trailer>
            <div className="container moviedetail__container">
                <div className="row moviedetail__row">
                    <div className="col-12 col-sm-12 col-md-4 moviedetail__col">
                        <div className="moviedetail__img">
                            <img src={`${HOST_SERVER}/${movie.image}`} alt="Anh phim" />
                            <div className="view__trailer">
                                <FontAwesomeIcon onClick={toggleTrailer} icon={faPlayCircle}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-8 moviedetail__col">
                        <div className="moviedetail__info">
                            <h1 className="moviedetail__title">{movie.name}</h1>
                            <div className="moviedetail__info-item">
                                <h2>{t('movie_detail.start')}:</h2>
                                <span>{movie.date_start}</span>
                            </div>
                            <div className="moviedetail__info-item">
                                <h2>{t('movie_detail.type')}:</h2>
                                <span>{movie.type}</span>
                            </div>
                            <div className="moviedetail__info-item">
                                <h2>{t('movie_detail.actor')}:</h2>
                                <span>{movie.actor}</span>
                            </div>
                            <div className="moviedetail__info-item">
                                <h2>{t('movie_detail.director')}:</h2>
                                <span>{movie.director}</span>
                            </div>
                            <div className="moviedetail__info-item">
                                <h2>{t('movie_detail.length')}:</h2>
                                <span>{movie.length} phút</span>
                            </div>
                            <p>{movie.decription}</p>
                            <div className="moviedetail__info-item">
                                <h2>{t('movie_detail.rating')}:</h2>
                                <div className="rating__group">
                                    {rating}
                                </div>
                            </div>
                            <div className="btn__ticket">
                                <Link to={`/movietime/${movie.slug}`}><Button>{t('movie.buy')}</Button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;