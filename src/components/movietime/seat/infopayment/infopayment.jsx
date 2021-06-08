import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {faMapMarkerAlt,faCalendarAlt,faClock} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button } from 'reactstrap';
import './infopayment.scss'
import { addGiftCode,removeGift } from '../../../../redux/ticketSlice';
import classNames from 'classnames';

function InfoPayment(props) {
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const movie = useSelector(state => state.movietime.movie)
    const movietime = useSelector(state => state.movietime)
    const ticket = useSelector(state => state.ticket)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const user = useSelector(state => state.user)
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const coupon = user.isLogin && ticket.seat.length ? <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                                            <DropdownToggle caret>
                                                                {ticket.gift_code ? ticket.gift_code.code : t('ticket.select_gift')}
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                                <DropdownItem onClick={handleRemoveGiftCode}>{t('ticket.clear_code')}</DropdownItem>
                                                                {user.user.gift_code.map(code =>{
                                                                    return <DropdownItem key={code._id} onClick={() => handleAddCodeGift(code)}>{code.code}</DropdownItem>
                                                                })}
                                                            </DropdownMenu>
                                                        </Dropdown> : <></>

    function handleAddCodeGift(code) {
        if(ticket.gift_code !== code.code){
            dispatch(addGiftCode({code:code,price:movietime.movie_time.movietime.price}))
        }
    }

    function handleRemoveGiftCode() {
        if(ticket.gift_code){
            dispatch(removeGift(movietime.movie_time.movietime.price))
        }
    }

    function handleClickPayment() {
        if(!user.isLogin){
            user.requireLogin()
        }
    }
    return (
        <div className="info__ticket">
            <h1>{t('ticket.title')}</h1>
            <div className="ticket__title">
                <h2>{movie.name}</h2>
                <span>{movie.type}</span>
                <span>{movie.length} {t('ticket.minute')}</span>
            </div>
            <div className="ticket__time">
                <div className="ticket__time-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
                    <h3>{movietime.theater?.name}</h3>
                </div>
                <div className="ticket__time-item">
                    <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
                    <h3>{movietime.date?.split('T').slice(0,1)}</h3>
                </div>
                <div className="ticket__time-item">
                    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                    <h3>{movietime.hour}</h3>
                </div>
            </div>
            <div className="ticket__seat">
                <h2>{t('ticket.seat')}</h2>
                <span>{ticket.seat.length ? ticket.seat.join(', ') : t('ticket.empty_seat')}</span>
            </div>
            <div className="ticket__price">
                <div className="price__item">
                    <h3>{t('ticket.unit_price')} :</h3>
                    <span>{movietime.movie_time?.movietime.price} VNĐ</span>
                </div>
                <div className="price__item">
                    <h3>{t('ticket.number_ticket')} :</h3>
                    <span>{ticket.number_ticket}</span>
                </div>
                <div className={classNames({"price__item":true,'choose__gift':ticket.gift_code ? false : true})}>
                    <h3>{t('ticket.gift_code')} :</h3>
                    <span>- {ticket.gift_code?.value} VNĐ</span>
                </div>
                <div className="price__item">
                    {coupon}
                </div>
            </div>
            <div className="ticket__price-total">
                <h3>{t('ticket.total_price')} :</h3>
                <span>{ticket.price} VNĐ</span>
            </div>
            <div className="btn__payment">
                <Button onClick={handleClickPayment}>{t('ticket.payment')}</Button>
            </div>
        </div>
    );
}

export default InfoPayment;