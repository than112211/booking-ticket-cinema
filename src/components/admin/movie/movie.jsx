import React, { useEffect,useState } from 'react';
import PaginationMovie from './pagination/pagination';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { TAB_ADMIN_MOVIE } from '../../../constants';
import { Table } from 'reactstrap';
import { getMovieStatistic, getListMovie, changeToCommingSoonMovie, changeToPlayingMovie } from '../../../redux/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV,faVideo,faPlusCircle,faToggleOn,faToggleOff} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import EditMovie from './edit/edit';
import DeleteMovie from './delete/delete';
import NewMovie from './newmovie/newmovie';

function MovieManagement(props) {
    const tab = useSelector(state => state.admin.tab)
    const movies = useSelector(state => state.admin.movies.movie)
    const numberPlaying = useSelector(state => state.admin.movies.numberPlaying)
    const numberCommingSoon = useSelector(state => state.admin.movies.numberCommingSoon)
    const numberAll = useSelector(state => state.admin.movies.numberAll)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [movieSelected,setMovieSelected] = useState({})
    const [modalEditMovie, setmodalEditMovie] = useState(false);
    const [modalDeleteMovie, setmodalDeleteMovie] = useState(false);
    const [modalNewMovie, setmodalNewMovie] = useState(false);
    const toggleNewMovie = () => setmodalNewMovie(!modalNewMovie);
    const toggleEditMovie = (movie) => {
        if(movie){
            setMovieSelected(movie)
        }
        setmodalEditMovie(!modalEditMovie);
    }

    const toggleDeleteMovie = (movie) => {
        if(movie){
            setMovieSelected(movie)
        }
        setmodalDeleteMovie(!modalDeleteMovie);
    }

    useEffect(() => {
        if(tab === TAB_ADMIN_MOVIE){
            dispatch(getListMovie())
            dispatch(getMovieStatistic())
        }
    },[tab])

    function handleClickChangeToCommingSoon(id){
        dispatch(changeToCommingSoonMovie(id))
    }

    function handleClickChangeToPlaying(id){
        dispatch(changeToPlayingMovie(id))
    }

    const itemTable = movies.map((movie,index) => {
        return  <tr key={movie._id}>
                    <th scope="row">{index+1}</th>
                    <td>{movie.name}</td>
                    <td>{new Date(movie.date.date_start).toLocaleDateString()}</td>
                    <td>{movie.director}</td>
                    <td>{movie.language}</td>
                    <td>{movie.length} {t('admin.movie_info.minute')}</td>
                    <td>{movie.playing ? <FontAwesomeIcon onClick={() => handleClickChangeToCommingSoon(movie._id)} className="table__icon-active" icon={faToggleOn}></FontAwesomeIcon> : <FontAwesomeIcon onClick={() => handleClickChangeToPlaying(movie._id)} className="table__icon-disable" icon={faToggleOff}></FontAwesomeIcon>}</td>
                    <td><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                        <div className="action">
                            <ul>
                                <li onClick={() => toggleEditMovie(movie)}>{t('admin.movie_info.edit')}</li>
                                <li onClick={() => toggleDeleteMovie(movie)}>{t('admin.movie_info.delete')}</li>
                            </ul>
                        </div>
                    </td>
                </tr>
    })

    return (
        <div className={classNames({'admin__detail': true,
                                    'admin__content-active': tab === TAB_ADMIN_MOVIE,
                                    'admin__content-disable': !(tab === TAB_ADMIN_MOVIE)})}>
            <h1>{t('admin.movie_info.title')}</h1>
            <div className="add__new" onClick={toggleNewMovie}>
                <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                <span>{t('admin.movie_info.new_title')}</span>
            </div>
            <div className="statistic">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="statistic-item">
                            <h1>{t('admin.movie_info.number_playing')}</h1>
                            <section>
                                <div className="statistic-icon">
                                    <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                                </div>
                                <div className="statistic-number">
                                    <span>+{numberPlaying}</span>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="statistic-item">
                            <h1>{t('admin.movie_info.number_commingsoon')}</h1>
                            <section>
                                <div className="statistic-icon">
                                    <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                                </div>
                                <div className="statistic-number">
                                    <span>+{numberCommingSoon}</span>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="statistic-item">
                            <h1>{t('admin.movie_info.number_all')}</h1>
                            <section>
                                <div className="statistic-icon">
                                    <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                                </div>
                                <div className="statistic-number">
                                    <span>+{numberAll}</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table">
                <Table dark>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>{t('admin.movie_info.name')}</th>
                        <th>{t('admin.movie_info.date_start')}</th>
                        <th>{t('admin.movie_info.director')}</th>
                        <th>{t('admin.movie_info.language')}</th>
                        <th>{t('admin.movie_info.length')}</th>
                        <th>{t('admin.movie_info.playing')}</th>
                        <th>{t('admin.movie_info.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemTable}
                    </tbody>
                </Table>
            </div>
            <PaginationMovie></PaginationMovie>
            <EditMovie toggleEditMovie={toggleEditMovie} modalEditMovie={modalEditMovie} movie={movieSelected}></EditMovie>
            <DeleteMovie toggleDeleteMovie={toggleDeleteMovie} modalDeleteMovie={modalDeleteMovie} movie={movieSelected}></DeleteMovie>
            <NewMovie toggleNewMovie={toggleNewMovie} modalNewMovie={modalNewMovie}></NewMovie>
        </div>
    );
}

export default MovieManagement;