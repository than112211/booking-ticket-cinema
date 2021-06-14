import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGiftInit } from '../../redux/giftSlice';
import gift_img from '../../resourses/img/icon-promotion.png'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGift} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import './gift.scss'

function Gift(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const gifts = useSelector(state => state.gift.gift)
    const [modal, setModal] = useState(false);
    const [gift,setGift] = useState({})
    const toggle = () => setModal(!modal);

    useEffect(() => {
        dispatch(getGiftInit())
    },[])
    
    function handleClickTradeGift(gift){
        setGift(gift)
        toggle()
    }   

    const modalTradeGift =  <Modal isOpen={modal} toggle={toggle} >
                                <ModalHeader toggle={toggle}>{t('gift.modal-title')}</ModalHeader>
                                <ModalBody>
                                    {t('gift.modal-content-start')}{gift.point_to_get}{t('gift.modal-content-end')}
                                </ModalBody>
                                <ModalFooter>
                                <Button color="primary" onClick={toggle}>{t('gift.modal-yes')}</Button>
                                <Button color="secondary" onClick={toggle}>{t('gift.modal-no')}</Button>
                                </ModalFooter>
                            </Modal>
    const renderGifts = gifts.map(gift => {
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
            </div>
        </div>
    );
}

export default Gift;