import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {  TAB_USER_HISTORY } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle,faClock} from '@fortawesome/free-solid-svg-icons'
import './history.scss'
import classNames from 'classnames';
import { Table,Button } from 'reactstrap';
import DetailHistory from './detail/detail';
import Countdown from 'react-countdown';
import { getTicket } from '../../../redux/userSlice';
import { clearTicket, rePayment } from '../../../redux/ticketSlice';

function HistoryTicket(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const tab = useSelector(state => state.user.tab)
    const user = useSelector(state => state.user)
    const ticket = useSelector(state => state.ticket)

    useEffect(() =>{
        if(ticket.payment){
           window.open(ticket.payment.link)
           dispatch(clearTicket())
        }
    },[ticket.payment])

    const renderTime = ({ minutes, seconds, completed }) => {
        if (completed) {
            dispatch(getTicket())
            return <span>00:00</span>
        } 
        else {
            return <span>{minutes}:{seconds}</span>;
        }
      }
    
    function handleClickRepayment(ticket){
        dispatch(rePayment(ticket))
    }
    const itemTable = user.ticket.map((ticket,index) => {
        return  <tr className={classNames({'table__active':index % 2 == 0 })}>
                    <th key={ticket._id} scope="row">{index+1}</th>
                    <td>{ticket.namemovie}</td>
                    <td><FontAwesomeIcon className={classNames({
                        'icon_active': ticket.status,
                        'icon_cancel': ticket.status ? false : true
                    })} icon={faCircle}></FontAwesomeIcon>{ticket.status ? t('history.status_success') : t('history.status_cancel')}</td>
                    <td>{ticket.price} VNĐ</td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td><FontAwesomeIcon className={classNames({
                        'icon_active': ticket.paid,
                        'icon_error': ticket.paid ? false : true
                    })} icon={faCircle}></FontAwesomeIcon>{ticket.paid ? t('history.paid') : t('history.unpaid')}</td>
                    <td><FontAwesomeIcon icon={faClock}></FontAwesomeIcon>{ ticket.status && ticket.paid == false ? <Countdown date={new Date(ticket.createdAt).getTime() + 300000} renderer={renderTime} /> : <span>00:00</span>}</td>
                    <td>{(ticket.status && ticket.paid) || ticket.status == false ? <Button className="btn__ticket-delete">{t('history.delete')}</Button> : <Button onClick={() => handleClickRepayment(ticket)} className="btn__ticket-payment">{t('history.payment')}</Button>}</td>
                    <DetailHistory ticket={ticket}></DetailHistory>
                </tr>
    })
    return (
        <div className={classNames({'user__history':true,
                                    'user__tab-active':tab === TAB_USER_HISTORY,
                                    'user__tab-disable':!(tab === TAB_USER_HISTORY )})}>
            <div className="history__table">
                <Table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>{t('history.name')}</th>
                        <th>{t('history.status')}</th>
                        <th>{t('history.price')}</th>
                        <th>{t('history.created_at')}</th>
                        <th>{t('history.payment')}</th>
                        <th>{t('history.time')}</th>
                        <th>{t('history.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemTable}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default HistoryTicket;