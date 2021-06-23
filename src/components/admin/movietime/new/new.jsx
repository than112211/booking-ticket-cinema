import React, { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addFilterMovie, addFilterTheater, clearStatusNewMovietime, newMovietime } from '../../../../redux/adminSlice';
import { toast } from 'react-toastify';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { STATUS_CODE_MOVIETIME_NEW_EXIST, STATUS_CODE_MOVIETIME_NEW_SUCCESS } from '../../../../constants';

NewMovietime.propTypes = {
    modalNewMovietime: PropTypes.bool,
    toggleNewMovietime: PropTypes.func,
};

function NewMovietime(props) {
    const {modalNewMovietime,toggleNewMovietime} = props
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const [dropdownMovie, setDropdownMovie] = useState(false);
    const toggleMovie = () => setDropdownMovie(prevState => !prevState);
    const [dropdownTheater, setDropdownTheater] = useState(false);
    const toggleTheater = () => setDropdownTheater(prevState => !prevState);
    const nameMovieSelected = useSelector(state => state.admin.movietimes.filter.movie)
    const nameTheaterSelected = useSelector(state => state.admin.movietimes.filter.theater)
    const listTheater = useSelector(state => state.theater.theater)
    const listNameMovie = useSelector(state => state.admin.movietimes.listNameMovie)
    const status = useSelector(state => state.admin.movietimes.statusNew)
    const notifyNewMovietimeSuccess = () => toast.success(t('toast.movietime.new_success'));
    const notifyNewMovietimeExist = () => toast.error(t('toast.movietime.new_exist'));
    const notifyMovietimeDateWrong = () => toast.error(t('toast.movietime.date_wrong'));
    const notifyMovietimeSelectTheater = () => toast.error(t('toast.movietime.select_theater'));

    useEffect(() => {
        if(status) {
            if(status === STATUS_CODE_MOVIETIME_NEW_SUCCESS){
                notifyNewMovietimeSuccess()
                dispatch(clearStatusNewMovietime())
                toggleNewMovietime()
            }
            if(status === STATUS_CODE_MOVIETIME_NEW_EXIST){
                dispatch(clearStatusNewMovietime())
                notifyNewMovietimeExist()
            }
        }
    }, [status]);

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
    function onSubmitNewMovietime(body){
        let date = new Date(body.date)
        if(nameTheaterSelected){
            if(date <= new Date(new Date().toDateString())){
                notifyMovietimeDateWrong()
            }
            else {
                const data = {
                    movie: nameMovieSelected.id,
                    theater: nameTheaterSelected._id,
                    data: body
                }
                dispatch(newMovietime(data))
            }
        }
        else notifyMovietimeSelectTheater()
    }
    
    function handleSelectNameMovie(movie) {
        if(nameMovieSelected.id !== movie.id){
            dispatch(addFilterMovie(movie))
        }
    }

    function handleSelectTheater(theater) {
        if(nameTheaterSelected){
            if(nameTheaterSelected._id !== theater._id)
            dispatch(addFilterTheater(theater))
        }
        else dispatch(addFilterTheater(theater))
    }
    return (
        <div>
            <Modal isOpen={modalNewMovietime} toggle={toggleNewMovietime}>
                <form onSubmit={handleSubmit(onSubmitNewMovietime)}>
                    <ModalHeader toggle={toggleNewMovietime}>{t('admin.gift_info.new_title')}</ModalHeader>
                    <ModalBody>
                        <div className="input-item">
                            <label htmlFor="input_movie">{t('movietime.select_movie')}</label>  
                            {dropMovie}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input_theater">{t('movietime.select_theater')}</label>  
                            {dropTheater}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__date">{t('movietime.select_date')}</label>  
                            <input {...register("date",{ required: true })} type="date" id="input__date"/> 
                            {errors.date && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__hour">{t('movietime.hour')}</label>  
                            <input {...register("hour",{ required: true })} type="time" id="input__hour"/> 
                            {errors.hour && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__price">{t('movietime.price')}</label>  
                            <input {...register("price",{ required: true })} type="number" id="input__price" placeholder={t('movietime.input_price')}/> 
                            {errors.price && <span>{t('register.require')}</span>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn__yes" type="submit">{t('admin.movietime_info.new_yes')}</Button>
                        <Button color="secondary" className="btn__no" onClick={toggleNewMovietime}>{t('admin.movietime_info.new_no')}</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default NewMovietime;