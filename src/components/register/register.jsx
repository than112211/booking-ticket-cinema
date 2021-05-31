import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { loginError, registerUser } from '../../redux/userSlice'
import { useTranslation } from 'react-i18next';

ModalRegister.propTypes = {
    modalRegister: PropTypes.bool,
    toggleRegister: PropTypes.func,
};

function ModalRegister(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {modalRegister,toggleRegister} = props
    const user = useSelector(state => state.user)

    function onSubmit(data){
        if(data.password === data.repassword) {
            delete data.repassword
            dispatch(registerUser(data))
        }
        else dispatch(loginError("Mật khẩu không trùng khớp"))
    }
    return (
        <div className="register__form">
        <Modal isOpen={modalRegister} toggle={toggleRegister} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggleRegister}>{t('register.register')}</ModalHeader>
                <ModalBody>
                    <div className="input-item">
                        <label htmlFor="input_name">{t('register.fullname')}</label>  
                        <input {...register("name",{ required: true })} type="text" id="input_name" placeholder={t('register.input_fullname')}/> 
                        {errors.name && <span>{t('register.require')}</span>}
                    </div>
                    <div className="input-item">
                        <label htmlFor="input_date">{t('register.date')}</label>  
                        <input {...register("date",{ required: true })} type="date" id="input_date" /> 
                        {errors.date && <span>{t('register.require')}</span>}
                    </div>
                    <div className="input-item">
                        <label htmlFor="input__email">{t('register.email')}</label>  
                        <input {...register("email",{ required: true })} type="email" id="input__email" placeholder={t('register.input_email')}/> 
                        {errors.email && <span>{t('register.require')}</span>}
                    </div>
                    <div className="input-item">
                        <label htmlFor="input__password">{t('register.password')}</label>  
                        <input {...register("password",{ required: true })} type="password" id="input__password" placeholder={t('register.password')}/> 
                        {errors.password && <span>{t('register.require')}</span>}
                    </div>
                    <div className="input-item">
                        <label htmlFor="input__repassword">{t('register.repassword')}</label>  
                        <input {...register("repassword",{ required: true })} type="password" id="input__repassword" placeholder={t('register.input_repassword')}/> 
                        {errors.repassword  && <span>{t('register.require')}</span>}
                    </div>
                    <h1 style={{display:user.status ?'block' : 'none'}}>{user.status}</h1>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" className="btn__register" type="submit">{t('register.register')}</Button>
                    <Button color="primary" className="btn__login" onClick={toggleRegister}>{t('register.cancel')}</Button>
                </ModalFooter>
            </form>
        </Modal>
          </div>
    );
}

export default ModalRegister;