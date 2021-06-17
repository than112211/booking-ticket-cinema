import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearStatusNewGift, newGift } from '../../../../redux/adminSlice';
import { ToastContainer, toast } from 'react-toastify';
import { STATUS_CODE_GIFT_NEW_EXIST, STATUS_CODE_GIFT_NEW_SUCCESS } from '../../../../constants';

NewGift.propTypes = {
    modalNewGift: PropTypes.bool,
    toggleNewGift: PropTypes.func,
};

function NewGift(props) {
    const {modalNewGift,toggleNewGift} = props
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const status = useSelector(state => state.admin.gifts.statusNew)
    const notifyNewGiftSuccess = () => toast.success(t('toast.gift.new_success'));
    const notifyNewGiftExist = () => toast.error(t('toast.gift.new_exist'));
    const notifyNewGiftDateWrong = () => toast.error(t('toast.gift.date_wrong'));

    useEffect(() => {
        if(status) {
            if(status === STATUS_CODE_GIFT_NEW_SUCCESS){
                notifyNewGiftSuccess()
                dispatch(clearStatusNewGift())
                toggleNewGift()
            }
            if(status === STATUS_CODE_GIFT_NEW_EXIST){
                dispatch(clearStatusNewGift())
                notifyNewGiftExist()
            }
        }
    }, [status]);

    function onSubmitNewGift(data){
        let start = new Date(data.date_start)
        let end = new Date(data.date_end)
        if(start > end || end < Date.now()){
            notifyNewGiftDateWrong()
        }
        else {
            dispatch(newGift(data))
        }
    }
    return (
        <div>
            <Modal isOpen={modalNewGift} toggle={toggleNewGift}>
                <form onSubmit={handleSubmit(onSubmitNewGift)}>
                    <ModalHeader toggle={toggleNewGift}>{t('admin.gift_info.new_title')}</ModalHeader>
                    <ModalBody>
                        <div className="input-item">
                            <label htmlFor="input_name">{t('gift.name')}</label>  
                            <input {...register("name",{ required: true })} type="text" id="input_name" placeholder={t('gift.input_name')} /> 
                            {errors.name && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input_description">{t('gift.description')}</label>  
                            <input {...register("description",{ required: true })} type="text" id="input_description" placeholder={t('gift.input_description')}/> 
                            {errors.description && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__date_start">{t('gift.date_start')}</label>  
                            <input {...register("date_start",{ required: true })} type="date" id="input__date_start"/> 
                            {errors.date_start && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__date_end">{t('gift.date_end')}</label>  
                            <input {...register("date_end",{ required: true })} type="date" id="input__date_end"/> 
                            {errors.date_end && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__amount">{t('gift.amount')}</label>  
                            <input {...register("amount",{ required: true })} type="number" id="input__amount" placeholder={t('gift.input_amount')}/> 
                            {errors.amount && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__point">{t('gift.point')}</label>  
                            <input {...register("point_to_get",{ required: true })} type="number" id="input__point" placeholder={t('gift.input_point')}/> 
                            {errors.point_to_get && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__value">{t('gift.value')}</label>  
                            <input {...register("value",{ required: true })} type="number" id="input__value" placeholder={t('gift.input_value')}/> 
                            {errors.value  && <span>{t('register.require')}</span>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn__gift-yes" type="submit">{t('admin.gift_info.new_yes')}</Button>
                        <Button color="secondary" className="btn__gift-no" onClick={toggleNewGift}>{t('admin.gift_info.new_no')}</Button>
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

export default NewGift;