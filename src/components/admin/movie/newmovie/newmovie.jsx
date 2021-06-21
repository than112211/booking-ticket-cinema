import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearStatusNewMovie, newMovie } from '../../../../redux/adminSlice';
import { toast } from 'react-toastify';
import { STATUS_CODE_MOVIE_NEW_EXIST, STATUS_CODE_MOVIE_NEW_SUCCESS } from '../../../../constants';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

NewMovie.propTypes = {
    modalNewMovie: PropTypes.bool,
    toggleNewMovie: PropTypes.func,
};

function NewMovie(props) {
    const {modalNewMovie,toggleNewMovie} = props
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const status = useSelector(state => state.admin.movies.statusNew)
    const notifyNewMovieSuccess = () => toast.success(t('toast.movie.new_success'));
    const notifyNewMovieExist = () => toast.error(t('toast.movie.new_exist'));
    const notifyNewMovieDateWrong = () => toast.error(t('toast.movie.date_wrong'));
    const notifyNewMovieVideoWrong = () => toast.error(t('toast.movie.video_wrong'));
    const notifyNewMovieImageWrong = () => toast.error(t('toast.movie.image_wrong'));

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [playing,setPlaying] = useState(false)

    useEffect(() => {
        if(status) {
            if(status === STATUS_CODE_MOVIE_NEW_SUCCESS){
                notifyNewMovieSuccess()
                dispatch(clearStatusNewMovie())
                toggleNewMovie()
            }
            if(status === STATUS_CODE_MOVIE_NEW_EXIST){
                dispatch(clearStatusNewMovie())
                notifyNewMovieExist()
            }
        }
    }, [status]);

    function onSubmitNewMovie(data){
        let allowFileImage = /[\/.](gif|jpg|jpeg|tiff|png)$/i
        let allowFileVideo = /[\/.](mov|avi|wmv|flv|3gp|mp4|mpg)$/i
        let start = new Date(data.date_start)
        let end = new Date(data.date_end)
        if(allowFileVideo.exec(data.trailer[0].type)){
            if(allowFileImage.exec(data.image[0].type)){
                if(start > end || end < Date.now()){
                    notifyNewMovieDateWrong()
                }
                else {
                    const formData = new FormData()
                    formData.append("name",data.name)
                    formData.append("actor",data.actor)
                    formData.append("director",data.director)
                    formData.append("date_start",data.date_start)
                    formData.append("date_end",data.date_end)
                    formData.append("decription",data.decription)
                    formData.append("language",data.language)
                    formData.append("length",data.length)
                    formData.append("type",data.type)
                    formData.append("rating",data.rating)
                    formData.append("playing",playing)
                    formData.append("trailer",data.trailer[0])
                    formData.append("image",data.image[0])
                    dispatch(newMovie(formData))
                }

            }
            else notifyNewMovieImageWrong()
        }
        else notifyNewMovieVideoWrong()
        }

    function handleClickComming(){
        if(playing){
            setPlaying(!playing)
        }
    }
    function handleClickPlaying(){
        if(!playing){
            setPlaying(!playing)
        }
    }
    const dropStatus = <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret>
                                {playing ? t('movie.playing') : t('movie.comming')}
                            </DropdownToggle>
                            <DropdownMenu>
                            <DropdownItem onClick={handleClickPlaying}>{t('movie.playing')}</DropdownItem>
                            <DropdownItem onClick={handleClickComming}>{t('movie.comming')}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
    return (
        <div>
            <Modal isOpen={modalNewMovie} toggle={toggleNewMovie}>
                <form onSubmit={handleSubmit(onSubmitNewMovie)}>
                    <ModalHeader toggle={toggleNewMovie}>{t('admin.movie_info.new_title')}</ModalHeader>
                    <ModalBody>
                        <div className="input-item">
                            <label htmlFor="input_name">{t('movie.name')}</label>  
                            <input {...register("name",{ required: true })} type="text" id="input_name" placeholder={t('movie.input_name')} /> 
                            {errors.name && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input_description">{t('movie.description')}</label>  
                            <input {...register("decription",{ required: true })} type="text" id="input_description" placeholder={t('movie.input_description')}/> 
                            {errors.decription && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input_director">{t('movie.director')}</label>  
                            <input {...register("director",{ required: true })} type="text" id="input_director" placeholder={t('movie.input_director')}/> 
                            {errors.director && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input_actor">{t('movie.actor')}</label>  
                            <input {...register("actor",{ required: true })} type="text" id="input_actor" placeholder={t('movie.input_actor')}/> 
                            {errors.actor && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__date_start">{t('movie.date_start')}</label>  
                            <input {...register("date_start",{ required: true })} type="date" id="input__date_start"/> 
                            {errors.date_start && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__date_end">{t('movie.date_end')}</label>  
                            <input {...register("date_end",{ required: true })} type="date" id="input__date_end"/> 
                            {errors.date_end && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input_language">{t('movie.language')}</label>  
                            <input {...register("language",{ required: true })} type="text" id="input_language" placeholder={t('movie.input_language')}/> 
                            {errors.language && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input_type">{t('movie.type')}</label>  
                            <input {...register("type",{ required: true })} type="text" id="input_type" placeholder={t('movie.input_type')}/> 
                            {errors.type && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__length">{t('movie.length')}</label>  
                            <input {...register("length",{ required: true })} type="number" id="input__length" placeholder={t('movie.input_length')}/> 
                            {errors.length && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__rating">{t('movie.rating')}</label>  
                            <input {...register("rating",{ required: true , min:1,max:5 })} type="number" id="input__rating" placeholder={t('movie.input_rating')}/> 
                            {errors.rating && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__trailer">{t('movie.trailer')}</label>  
                            <input {...register("trailer",{ required: true })} type="file" id="input__trailer" placeholder={t('movie.input_trailer')}/> 
                            {errors.trailer && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__image">{t('movie.image')}</label>  
                            <input {...register("image",{ required: true })} type="file" id="input__image" placeholder={t('movie.input_image')}/> 
                            {errors.image && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label>{t('movie.status')}</label>  
                            {dropStatus}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn__yes" type="submit">{t('admin.movie_info.new_yes')}</Button>
                        <Button color="secondary" className="btn__no" onClick={toggleNewMovie}>{t('admin.movie_info.new_no')}</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default NewMovie;