import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { HOST_SERVER } from '../../constants';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { addDate, addTheater, getMovietimeInit,addHour, resetDate, resetHour ,getMovietime} from '../../redux/movietimeSlice';
import './movietime.scss'
import Seat from './seat/seat';
import classNames from 'classnames';

function MovieTime(props) {
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const movietime = useSelector(state => state.movietime)
    const theater = useSelector(state => state.theater.theater)
    const slug = useParams()
    const [dropdownTheater, setdropdownTheater] = useState(false);
    const toggleTheater = () => setdropdownTheater(prevState => !prevState);
    const [dropdownDate, setdropdownDate] = useState(false);
    const toggleDate = () => setdropdownDate(prevState => !prevState);
    const [dropdownHour, setdropdownHour] = useState(false);
    const toggleHour = () => setdropdownHour(prevState => !prevState);

    useEffect(() => {
        dispatch(getMovietimeInit(slug))
     },[])
    
    function handleClickTheater(theater) {
        if(movietime.theater){
            if(movietime.theater._id !== theater._id){
                dispatch(addTheater(theater))
                dispatch(resetDate())
                dispatch(resetHour())
            }
        }
        else{
            dispatch(addTheater(theater))
        }
    }

    function handleClickDate(date) {
        if(movietime.date){
            if(movietime.date !== date){
                dispatch(addDate(date))
                dispatch(resetHour())
            }
        }
        else{
            dispatch(addDate(date))
        }
    }

    function handleClickHour(hour) {
        if(movietime.hour){
            if(movietime.hour !== hour){
                dispatch(addHour(hour))
                dispatch(getMovietime())
            }
        }
        else{
            dispatch(addHour(hour))
            dispatch(getMovietime())
        }
    }

    const listTheater = theater.map((theater) =>{
        return <DropdownItem key={theater._id} onClick={() => handleClickTheater(theater)} >{theater.name}</DropdownItem>
    })

    const listDate = movietime.date_list.map((date,index) =>{
        return <DropdownItem key={index} onClick={() => handleClickDate(date)} >{new Date(date).toLocaleDateString()}</DropdownItem>
    })

    const listHour = movietime.hour_list.map((hour,index) =>{
        return <DropdownItem key={index} onClick={() => handleClickHour(hour)} >{hour}</DropdownItem>
    })

    return (
        <div className="movietime">
            <div className="container">
                <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                            <div className="movietime__img">
                                <img src={movietime.movie.image} alt="Anh phim" />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                            <div className="movietime__info">
                                <h1>{movietime.movie.name}</h1>
                                <div className="movietime__select">
                                    <div className="movietime__item">
                                        <Dropdown isOpen={dropdownTheater} toggle={toggleTheater}>
                                            <DropdownToggle caret>
                                                {movietime.theater ? movietime.theater.name : t('movietime.choose_theater') }
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {listTheater}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    <div className="movietime__item">
                                        <Dropdown isOpen={dropdownDate} toggle={toggleDate}>
                                            <DropdownToggle caret>
                                                {movietime.date ? movietime.date.split('T').slice(0,1) : t('movietime.choose_date') }
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {listDate}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    <div className="movietime__item">
                                        <Dropdown isOpen={dropdownHour} toggle={toggleHour}>
                                            <DropdownToggle caret>
                                                {movietime.hour ? movietime.hour : t('movietime.choose_hour') }
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {listHour}
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div className={classNames({'movietime__notify-active':movietime.movie_time ? false : true,
                                                        'movietime__notify-disable':movietime.movie_time})}>
                                <p>{t('movietime.notify')}</p>
                            </div>
                            <div className={classNames({'movietime__ticket-active': movietime.movie_time,
                                                        'movietime__ticket-disable': movietime.movie_time ? false : true})}>
                                <Seat></Seat>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default MovieTime;