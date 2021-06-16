import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch,useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { clearStatusDeleteUser, deleteUser } from '../../../../redux/adminSlice';
import { useTranslation } from 'react-i18next';

DeleteUser.propTypes = {
    modalDeleteUser: PropTypes.bool,
    toggleDeleteUser: PropTypes.func,
    user: PropTypes.object,
};

function DeleteUser(props) {
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const {modalDeleteUser,toggleDeleteUser,user} = props
    const status = useSelector(state => state.admin.users.statusDelete)
    const notifyDeleteUser = () => toast.success(status);

    useEffect(() => {
        if(status) {
            toggleDeleteUser()
            notifyDeleteUser()
            dispatch(clearStatusDeleteUser())
        }
    }, [status]);
   
    function handleClickDelete(){
        dispatch(deleteUser(user._id))
    }
    
    return (
        <div>
            <Modal isOpen={modalDeleteUser} toggle={toggleDeleteUser} >
                <ModalHeader toggle={toggleDeleteUser}>{t('admin.user_info.delete_title')}</ModalHeader>
                <ModalBody>
                    {t('admin.user_info.delete_question')}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="btn__gift-yes" onClick={handleClickDelete}>{t('admin.user_info.delete_yes')}</Button>
                    <Button color="secondary" className="btn__gift-no" onClick={toggleDeleteUser}>{t('admin.user_info.delete_no')}</Button>
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

export default DeleteUser;