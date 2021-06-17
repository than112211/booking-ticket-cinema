import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearGiftStatus, getListGift, tradeGift } from '../../redux/giftSlice';
import gift_img from '../../resourses/img/icon-promotion.png'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGift} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import './gift.scss'
import PaginationGift from './pagination/pagination';

function Gift(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const gifts = useSelector(state => state.gift)
    const [modal, setModal] = useState(false);
    const [gift,setGift] = useState({})
    const toggle = () => setModal(!modal);
    const notifyTradeGift = () => toast.success(gifts.status);

    useEffect(() => {
        dispatch(getListGift())
    },[])

    useEffect(() => {
        if(gifts.status){
            toggle()
            notifyTradeGift()
            dispatch(clearGiftStatus())
        }
    },[gifts.status])
    
    function handleClickTradeGift(gift){
        if(user.isLogin){
            setGift(gift)
            toggle()
        }
        else user.requireLogin()
    }   

    function handleClickYesTradeGift(){
        dispatch(tradeGift(gift._id))
    }

    const modalTradeGift =  <Modal isOpen={modal} toggle={toggle} >
                                <ModalHeader toggle={toggle}>{t('gift.modal-title')}</ModalHeader>
                                <ModalBody>
                                    {t('gift.modal-content-start')}{gift.point_to_get}{t('gift.modal-content-end')}
                                </ModalBody>
                                <ModalFooter>
                                <Button color="primary" className="btn__gift-yes" onClick={handleClickYesTradeGift}>{t('gift.modal-yes')}</Button>
                                <Button color="secondary" className="btn__gift-no" onClick={toggle}>{t('gift.modal-no')}</Button>
                                </ModalFooter>
                            </Modal>
                            
    const renderGifts = gifts.gift.map(gift => {
        return  <div key={gift._id} className="gift__item">
                    <div className="gift__item-img">
                        <img src={gift_img} alt="Anh quà tặng" />
                    </div>
                    <div className="gift__item-content">
                        <h1>{gift.name}</h1>
                        <span>{gift.point_to_get}<FontAwesomeIcon icon={faGift}></FontAwesomeIcon></span>
                        <p>{gift.description}</p>
                    </div>
                    <div className="gift__item-trade">
                        <Button onClick={() => handleClickTradeGift(gift)}>{t('gift.trade')}</Button>
                    </div>
                </div>
    })
    
    return (
        <div className="gift">
            <div className="container gift__container">
                {renderGifts}
                {modalTradeGift}
                <PaginationGift></PaginationGift>
            </div>
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

export default Gift;