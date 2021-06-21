import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearStatusEditGift,editGift } from '../../../../redux/adminSlice';
import { toast } from 'react-toastify';
import { STATUS_CODE_GIFT_EDIT_SUCCESS } from '../../../../constants';

EditGift.propTypes = {
    modalEditGift: PropTypes.bool,
    toggleEditGift: PropTypes.func,
    gift: PropTypes.object,
};

function EditGift(props) {
    const {modalEditGift,toggleEditGift,gift} = props
    const { register, handleSubmit, formState: { errors },setValue } = useForm();
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const status = useSelector(state => state.admin.gifts.statusEdit)
    const notifyEditGiftSuccess = () => toast.success(t('toast.gift.edit_success'));
    
    useEffect(() => {
        if(gift) {
          setValue("name",gift.name)
          setValue("date_start",gift.date?.date_start.split('T').slice(0,1))
          setValue("date_end",gift.date?.date_end.split('T').slice(0,1))
          setValue("description",gift.description)
          setValue("point_to_get",gift.point_to_get)
          setValue("value",gift.value)
        }
      }, [gift]);

    useEffect(() => {
        if(status) {
            toggleEditGift()
            if(status === STATUS_CODE_GIFT_EDIT_SUCCESS){
                notifyEditGiftSuccess()
                dispatch(clearStatusEditGift())
            }
        }
    }, [status]);

    function onSubmitEditGift(data){
        dispatch(editGift({data:data,id:gift._id}))
    }

    return (
        <div>
            <Modal isOpen={modalEditGift} toggle={toggleEditGift}>
                <form onSubmit={handleSubmit(onSubmitEditGift)}>
                    <ModalHeader toggle={toggleEditGift}>{t('admin.gift_info.edit_title')}</ModalHeader>
                    <ModalBody>
                        <div className="input-item">
                            <label htmlFor="input_name">{t('gift.name')}</label>  
                            <input {...register("name",{ required: true })} type="text" id="input_name" /> 
                            {errors.name && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input_description">{t('gift.description')}</label>  
                            <input {...register("description",{ required: true })} type="text" id="input_description"/> 
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
                            <label htmlFor="input__point">{t('gift.point')}</label>  
                            <input {...register("point_to_get",{ required: true })} type="number" id="input__point"/> 
                            {errors.point_to_get && <span>{t('register.require')}</span>}
                        </div>
                        <div className="input-item">
                            <label htmlFor="input__value">{t('gift.value')}</label>  
                            <input {...register("value",{ required: true })} type="number" id="input__value"/> 
                            {errors.value  && <span>{t('register.require')}</span>}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn__yes" type="submit">{t('admin.gift_info.edit_yes')}</Button>
                        <Button color="secondary" className="btn__no" onClick={toggleEditGift}>{t('admin.gift_info.edit_no')}</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default EditGift;