import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearStatusDeleteMovie,deleteMovie } from '../../../../redux/adminSlice';
import { useTranslation } from 'react-i18next';
import { STATUS_CODE_MOVIE_DELETE_ISPLAYING, STATUS_CODE_MOVIE_DELETE_SUCCESS } from '../../../../constants';

DeleteMovie.propTypes = {
    modalDeleteMovie: PropTypes.bool,
    toggleDeleteMovie: PropTypes.func,
    movie: PropTypes.object,
};

function DeleteMovie(props) {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const {modalDeleteMovie,toggleDeleteMovie,movie} = props
    const status = useSelector(state => state.admin.movies.statusDelete)
    const notifyDeleteMovieSuccess = () => toast.success(t('toast.movie.delete_success'));
    const notifyDeleteMovieisPlaying = () => toast.error(t('toast.movie.delete_isplaying'));

    useEffect(() => {
        if(status) {
            toggleDeleteMovie()
            if(status === STATUS_CODE_MOVIE_DELETE_SUCCESS){
                notifyDeleteMovieSuccess()
                dispatch(clearStatusDeleteMovie())
            }
            if(status === STATUS_CODE_MOVIE_DELETE_ISPLAYING){
                notifyDeleteMovieisPlaying()
                dispatch(clearStatusDeleteMovie())
            }
        }
    }, [status]);
   
    function handleClickDelete(){
        dispatch(deleteMovie(movie._id))
    }
    return (
        <div>
            <Modal isOpen={modalDeleteMovie} toggle={toggleDeleteMovie} >
                <ModalHeader toggle={toggleDeleteMovie}>{t('admin.movie_info.delete_title')}</ModalHeader>
                <ModalBody>
                    {t('admin.movie_info.delete_question')}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="btn__yes" onClick={handleClickDelete}>{t('admin.movie_info.delete_yes')}</Button>
                    <Button color="secondary" className="btn__no" onClick={toggleDeleteMovie}>{t('admin.movie_info.delete_no')}</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteMovie;