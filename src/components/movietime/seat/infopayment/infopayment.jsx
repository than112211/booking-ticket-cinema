import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {faMapMarkerAlt,faCalendarAlt,faClock} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button } from 'reactstrap';
import './infopayment.scss'
import { addGiftCode,addMethod,checkTicketUnpaid,clearTicket,payment,removeGift } from '../../../../redux/ticketSlice';
import classNames from 'classnames';
import { ToastContainer, toast } from 'react-toastify';
import { METHOD_PAYMENT_AIRPAY, METHOD_PAYMENT_MOMO, METHOD_PAYMENT_VIETTELPAY, METHOD_PAYMENT_ZALOPAY } from '../../../../constants';
import { getMovietime } from '../../../../redux/movietimeSlice';

function InfoPayment(props) {
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const movie = useSelector(state => state.movietime.movie)
    const movietime = useSelector(state => state.movietime)
    const ticket = useSelector(state => state.ticket)
    const user = useSelector(state => state.user)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [dropmethodPayment, setdropmethodPayment] = useState(false);
    const togglemethodPayment = () => setdropmethodPayment(prevState => !prevState);
    const notifyMethod = () => toast.error(t('toast.method'));
    const notifySeat = () => toast.error(t('toast.seat'));
    const notifyPayment = () => toast.error(t('toast.unpaid'));

    useEffect(() =>{
        if(ticket.payment){
           window.open(ticket.payment.link)
           dispatch(getMovietime())
           dispatch(clearTicket())
        }
    },[ticket.payment])

    useEffect(() =>{
        if(localStorage.getItem('token')){
            dispatch(checkTicketUnpaid())
        }
    },[ticket.method,user.user])

    const methodPayment =   <Dropdown isOpen={dropmethodPayment} toggle={togglemethodPayment}>
                                <DropdownToggle caret>
                                    {ticket.method ? ticket.method : t('ticket.select')}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => handleAddMethod(METHOD_PAYMENT_AIRPAY)}>{METHOD_PAYMENT_AIRPAY}</DropdownItem>
                                    <DropdownItem onClick={() => handleAddMethod(METHOD_PAYMENT_MOMO)}>{METHOD_PAYMENT_MOMO}</DropdownItem>
                                    <DropdownItem onClick={() => handleAddMethod(METHOD_PAYMENT_VIETTELPAY)}>{METHOD_PAYMENT_VIETTELPAY}</DropdownItem>
                                    <DropdownItem onClick={() => handleAddMethod(METHOD_PAYMENT_ZALOPAY)}>{METHOD_PAYMENT_ZALOPAY}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

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
        else if(!ticket.method){
            notifyMethod()
        }
            else if(ticket.seat.length == 0){
                notifySeat()
            }
                else if(ticket.pending == true) {
                    notifyPayment()
                }
                    else {
                        const body = {
                            gift: ticket.gift_code,
                            number: ticket.number_ticket,
                            price: ticket.price,
                            seat: ticket.seat
                        }
                        const id = movietime.movie_time._id
                        dispatch(payment({id,body}))
                    }
    }

    function handleAddMethod(method) {
        if(ticket.method !== method){
            dispatch(addMethod(method))
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
            <div className="ticket__methodpayment">
                <h3>{t('ticket.method')} :</h3>
                {methodPayment}
            </div>
            <div className="btn__payment">
                <Button onClick={handleClickPayment}>{t('ticket.payment')}</Button>
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

export default InfoPayment;