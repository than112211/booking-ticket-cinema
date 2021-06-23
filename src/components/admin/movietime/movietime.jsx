import React, { useEffect,useState } from 'react';
import PaginationMovietime from './pagination/pagination';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { TAB_ADMIN_MOVIETIME } from '../../../constants';
import { Table } from 'reactstrap';
import { getMovieStatistic, getListNameMovie, addFilterMovie, addFilterTheater, addFilterDate, clearDate, clearTheater } from '../../../redux/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { faEllipsisV,faVideo,faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import DeleteMovietime from './delete/delete';
import NewMovietime from './new/new';
import './movietime.scss'

function MovietimeManagement(props) {
    const tab = useSelector(state => state.admin.tab)
    const movietimes = useSelector(state => state.admin.movietimes.movietime)
    const total = useSelector(state => state.admin.movietimes.paginationMovietime.total)
    const nameMovieSelected = useSelector(state => state.admin.movietimes.filter.movie)
    const nameTheaterSelected = useSelector(state => state.admin.movietimes.filter.theater)
    const dateSelected = useSelector(state => state.admin.movietimes.filter.date)
    const listTheater = useSelector(state => state.theater.theater)
    const listNameMovie = useSelector(state => state.admin.movietimes.listNameMovie)
    const listDate = useSelector(state => state.admin.movietimes.listDate)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [movietimeSelected,setMovietimeSelected] = useState({})
    const [dropdownMovie, setDropdownMovie] = useState(false);
    const toggleMovie = () => setDropdownMovie(prevState => !prevState);
    const [dropdownTheater, setDropdownTheater] = useState(false);
    const toggleTheater = () => setDropdownTheater(prevState => !prevState);
    const [dropdownDate, setDropdownDate] = useState(false);
    const toggleDate = () => setDropdownDate(prevState => !prevState);
    const [modalDeleteMovietime, setmodalDeleteMovietime] = useState(false);
    const [modalNewMovietime, setmodalNewMovietime] = useState(false);
    const toggleNewMovietime = () => setmodalNewMovietime(!modalNewMovietime);

    const toggleDeleteMovietime = (movietime) => {
        if(movietime){
            setMovietimeSelected(movietime)
        }
        setmodalDeleteMovietime(!modalDeleteMovietime);
    }

    useEffect(() => {
        if(tab === TAB_ADMIN_MOVIETIME){
            dispatch(getListNameMovie())
            dispatch(getMovieStatistic())
        }
    },[tab])
    
    function handleSelectNameMovie(movie) {
        if(nameMovieSelected.id !== movie.id){
            dispatch(addFilterMovie(movie))
            dispatch(clearDate())
            dispatch(clearTheater())
        }
    }

    function handleSelectTheater(theater) {
        if(nameTheaterSelected){
            if(nameTheaterSelected._id !== theater._id)
            dispatch(addFilterTheater(theater))
            dispatch(clearDate())
        }
        else dispatch(addFilterTheater(theater))
    }
    function handleSelectDate(date) {
        if(dateSelected){
            if(dateSelected !== date)
            dispatch(addFilterDate(date))
        }
        else dispatch(addFilterDate(date))
    }

    const dropMovie = <Dropdown isOpen={dropdownMovie} toggle={toggleMovie}>
                        <DropdownToggle caret>
                            {nameMovieSelected?.name}
                        </DropdownToggle>
                        <DropdownMenu>
                            {listNameMovie?.map(movie => {
                                return <DropdownItem onClick={() => handleSelectNameMovie(movie)}>{movie.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>

    const dropTheater = <Dropdown isOpen={dropdownTheater} toggle={toggleTheater}>
                        <DropdownToggle caret>
                            {nameTheaterSelected ? nameTheaterSelected.name : t('admin.movietime_info.select_theater')}
                        </DropdownToggle>
                        <DropdownMenu>
                            {listTheater?.map(theater => {
                                return <DropdownItem onClick={() => handleSelectTheater(theater)}>{theater.name}</DropdownItem>

                            })}
                        </DropdownMenu>
                    </Dropdown>

    const dropDate = <Dropdown isOpen={dropdownDate} toggle={toggleDate}>
                        <DropdownToggle caret>
                            {dateSelected ? new Date(dateSelected).toLocaleDateString() : t('admin.movietime_info.select_date')}
                        </DropdownToggle>
                        <DropdownMenu>
                            {listDate?.map(date => {
                                return <DropdownItem onClick={() => handleSelectDate(date)}>{new Date(date).toLocaleDateString()}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>              

    const itemTable = movietimes.map((movietime,index) => {
        return  <tr key={movietime._id}>
                    <th scope="row">{index+1}</th>
                    <td>{nameMovieSelected.name}</td>
                    <td>{new Date(movietime.movietime.date).toLocaleDateString()}</td>
                    <td>{movietime.movietime.hour}</td>
                    <td>{movietime.movietime.price}</td>
                    <td><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                        <div className="action">
                            <ul>
                                <li>{t('admin.movietime_info.edit')}</li>
                                <li onClick={() => toggleDeleteMovietime(movietime)}>{t('admin.movietime_info.delete')}</li>
                            </ul>
                        </div>
                    </td>
                </tr>
    })

    return (
        <div className={classNames({'admin__detail': true,
                                    'admin__content-active': tab === TAB_ADMIN_MOVIETIME,
                                    'admin__content-disable': !(tab === TAB_ADMIN_MOVIETIME)})}>
            <h1>{t('admin.movietime_info.title')}</h1>
            <div className="add__new" onClick={toggleNewMovietime}>
                <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                <span>{t('admin.movietime_info.new_title')}</span>
            </div>
            <div className="statistic">
                <div className="row item__row">
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="statistic-item">
                            <h1>{t('admin.movietime_info.number_all')}</h1>
                            <section>
                                <div className="statistic-icon">
                                    <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                                </div>
                                <div className="statistic-number">
                                    <span>+{total}</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="select__filter">
                <div className="select__filter-item">
                    {dropMovie}
                </div>
                <div className="select__filter-item">
                    {dropTheater}
                </div>
                <div className="select__filter-item">
                    {dropDate}
                </div>
            </div>
            <div className="table">
                <Table dark>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>{t('admin.movietime_info.name')}</th>
                        <th>{t('admin.movietime_info.date')}</th>
                        <th>{t('admin.movietime_info.hour')}</th>
                        <th>{t('admin.movietime_info.price')}</th>
                        <th>{t('admin.movietime_info.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemTable}
                    </tbody>
                </Table>
            </div>
            <PaginationMovietime></PaginationMovietime>
            <DeleteMovietime toggleDeleteMovietime={toggleDeleteMovietime} modalDeleteMovietime={modalDeleteMovietime} movietime={movietimeSelected}></DeleteMovietime>
            <NewMovietime toggleNewMovietime={toggleNewMovietime} modalNewMovietime={modalNewMovietime}></NewMovietime>
        </div>
    );
}

export default MovietimeManagement;