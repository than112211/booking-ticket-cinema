import React from 'react';
import './detail.scss'
import {faMapMarkerAlt,faCalendarAlt,faClock} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next';

function DetailHistory(props) {
    const {ticket} = props
    const {t} = useTranslation();
    
    return (
        <div className="detail__history">
            <h1>{ticket.namemovie}</h1>
            <div className="detail__history-item">
                <h2>{t('detail_ticket.theater')}:</h2>
                <span><FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>{ticket.theater}</span>
            </div>
            <div className="detail__history-item">
                <h2>{t('detail_ticket.date')}:</h2>
                <span><FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>{new Date(ticket.date).toLocaleDateString()}</span>
            </div>
            <div className="detail__history-item">
                <h2>{t('detail_ticket.hour')}:</h2>
                <span><FontAwesomeIcon icon={faClock}></FontAwesomeIcon>{ticket.hour}h</span>
            </div>
            <div className="detail__history-item">
                <h2><FontAwesomeIcon></FontAwesomeIcon>{t('detail_ticket.seat')}:</h2>
                <span>{ticket.seat.join(', ')}</span>
            </div>
            
        </div>
    );
}

export default DetailHistory;