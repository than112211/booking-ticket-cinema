import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearStatusEditUser, editUser } from '../../../../redux/adminSlice';
import { ToastContainer, toast } from 'react-toastify';

EditUser.propTypes = {
    modalEditUser: PropTypes.bool,
    toggleEditUser: PropTypes.func,
    user: PropTypes.object,
};

function EditUser(props) {
    const {modalEditUser,toggleEditUser,user} = props
    const { register, handleSubmit, formState: { errors },setValue } = useForm();
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const status = useSelector(state => state.admin.users.statusEdit)
    const notifyEditUser = () => toast.success(status);

    useEffect(() => {
        if(user) {
          setValue("name",user.name)
          setValue("date",user.date?.split('T').slice(0,1))
          setValue("email",user.email)
          setValue("password",user.password)
          setValue("point",user.point)
        }
      }, [user]);

    useEffect(() => {
        if(status) {
            toggleEditUser()
            notifyEditUser()
            dispatch(clearStatusEditUser())
        }
    }, [status]);
   
    function onSubmit(data){
        dispatch(editUser({data:data,id:user._id}))
    }

    return (
        <div>
            <Modal isOpen={modalEditUser} toggle={toggleEditUser}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={toggleEditUser}>{t('admin.user_info.edit_title')}</ModalHeader>
                    <ModalBody>
                        <div className="input-item">
                            <label htmlFor="input_name">{t('register.fullname')}</label>  
                            <input {...register("name",{ required: true })} type="text" id="input_name"/> 
                            {errors.name && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input_date">{t('register.date')}</label>  
                            <input {...register("date",{ required: true })} type="date" id="input_date"/> 
                            {errors.date && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__email">{t('register.email')}</label>  
                            <input {...register("email",{ required: true })} type="email" id="input__email"/> 
                            {errors.email && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__password">{t('register.password')}</label>  
                            <input {...register("password",{ required: true })} type="password" id="input__password"/> 
                            {errors.password && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__point">{t('register.point')}</label>  
                            <input {...register("point",{ required: true })} type="number" id="input__point"/> 
                            {errors.point  && <span>{t('register.require')}</span>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn__gift-yes" type="submit">{t('admin.user_info.edit_yes')}</Button>
                        <Button color="secondary" className="btn__gift-no" onClick={toggleEditUser}>{t('admin.user_info.edit_no')}</Button>
                    </ModalFooter>
                </form>
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

export default EditUser;