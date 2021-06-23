import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearStatusDeleteMovietime,deleteMovietime } from '../../../../redux/adminSlice';
import { useTranslation } from 'react-i18next';
import { STATUS_CODE_MOVIETIME_DELETE_SUCCESS } from '../../../../constants';

DeleteMovietime.propTypes = {
    modalDeleteMovietime: PropTypes.bool,
    toggleDeleteMovietime: PropTypes.func,
    movietime: PropTypes.object,
};

function DeleteMovietime(props) {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const {modalDeleteMovietime,toggleDeleteMovietime,movietime} = props
    const status = useSelector(state => state.admin.movietimes.statusDelete)
    const notifyDeleteMovietimeSuccess = () => toast.success(t('toast.movietime.delete_success'));

    useEffect(() => {
        if(status) {
            toggleDeleteMovietime()
            if(status === STATUS_CODE_MOVIETIME_DELETE_SUCCESS){
                notifyDeleteMovietimeSuccess()
                dispatch(clearStatusDeleteMovietime())
            }
        }
    }, [status]);
   
    function handleClickDelete(){
        dispatch(deleteMovietime(movietime._id))
    }
    
    return (
        <div>
            <Modal isOpen={modalDeleteMovietime} toggle={toggleDeleteMovietime} >
                <ModalHeader toggle={toggleDeleteMovietime}>{t('admin.movietime_info.delete_title')}</ModalHeader>
                <ModalBody>
                    {t('admin.movietime_info.delete_question')}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="btn__yes" onClick={handleClickDelete}>{t('admin.movietime_info.delete_yes')}</Button>
                    <Button color="secondary" className="btn__no" onClick={toggleDeleteMovietime}>{t('admin.movietime_info.delete_no')}</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteMovietime;