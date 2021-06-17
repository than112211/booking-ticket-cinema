import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { clearStatusDeleteGift,deleteGift } from '../../../../redux/adminSlice';
import { useTranslation } from 'react-i18next';
import { STATUS_CODE_GIFT_DELETE_SUCCESS } from '../../../../constants';

DeleteGift.propTypes = {
    modalDeleteGift: PropTypes.bool,
    toggleDeleteGift: PropTypes.func,
    gift: PropTypes.object,
};

function DeleteGift(props) {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const {modalDeleteGift,toggleDeleteGift,gift} = props
    const status = useSelector(state => state.admin.gifts.statusDelete)
    const notifyDeleteUserSuccess = () => toast.success(t('toast.gift.delete_success'));

    useEffect(() => {
        if(status) {
            toggleDeleteGift()
            if(status === STATUS_CODE_GIFT_DELETE_SUCCESS){
                notifyDeleteUserSuccess()
                dispatch(clearStatusDeleteGift())
            }
        }
    }, [status]);
   
    function handleClickDelete(){
        dispatch(deleteGift(gift._id))
    }
    return (
        <div>
            <Modal isOpen={modalDeleteGift} toggle={toggleDeleteGift} >
                <ModalHeader toggle={toggleDeleteGift}>{t('admin.gift_info.delete_title')}</ModalHeader>
                <ModalBody>
                    {t('admin.gift_info.delete_question')}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="btn__gift-yes" onClick={handleClickDelete}>{t('admin.gift_info.delete_yes')}</Button>
                    <Button color="secondary" className="btn__gift-no" onClick={toggleDeleteGift}>{t('admin.gift_info.delete_no')}</Button>
                </ModalFooter>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            ></ToastContainer>
        </div>
    );
}

export default DeleteGift;