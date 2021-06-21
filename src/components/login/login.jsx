import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import {clearLoginStatus, loginUser} from '../../redux/userSlice'
import './login.scss'
import ModalRegister from '../register/register';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LOGIN_INCORRECT_PASSWORD, LOGIN_NOT_FOUND, LOGIN_SUCCESS } from '../../constants';

LoginModal.propTypes = {
    modalLogin: PropTypes.bool,
    toggleLogin: PropTypes.func,
};

function LoginModal(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {modalLogin,toggleLogin} = props
    const notifyLoginSuccess = () => toast.success(t('toast.user.login_success'));
    const [modalRegister, setModalRegister] = useState(false);
    const status = useSelector(state => state.user.statusLogin)
    const [notify,setNotify] = useState(null)
    const toggleRegister = () => {
        setModalRegister(!modalRegister)
        if(modalLogin) {
            toggleLogin()
        }
    }

    useEffect(() => {
        if(status === LOGIN_SUCCESS) {
            toggleLogin()
            notifyLoginSuccess()
            dispatch(clearLoginStatus())
        }
        if(status === LOGIN_INCORRECT_PASSWORD) {
            setNotify(t('toast.user.incorrect_password'))
        }
        if(status === LOGIN_NOT_FOUND) {
            setNotify(t('toast.user.not_found'))
        }
    },[status])

    function onSubmit(data){
        dispatch(loginUser(data))
    }

    return (
        <div className="login__form">
            <ModalRegister modalRegister={modalRegister} toggleRegister={toggleRegister} ></ModalRegister>
            <Modal isOpen={modalLogin} toggle={toggleLogin} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader toggle={toggleLogin}>{t('login.login')}</ModalHeader>
                    <ModalBody>
                        <div className="input-item">
                            <label htmlFor="input__email">{t('login.email')}</label>  
                            <input {...register("email",{ required: true })} type="email" id="input__email" placeholder={t('login.input_email')}/> 
                            {errors.email && <span>{t('login.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__password">{t('login.password')}</label>  
                            <input {...register("password",{ required: true })} type="password" id="input__password" placeholder={t('login.input_password')}/> 
                            {errors.password && <span>{t('login.require')}</span>}

                        </div>
                        <h1 style={{display:notify ? 'block' : 'none'}}>{notify}</h1>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="btn__login" type="submit">{t('login.login')}</Button>
                        <Button color="secondary" className="btn__register" onClick={toggleRegister}>{t('register.register')}</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default LoginModal;