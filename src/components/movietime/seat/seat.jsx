import React from 'react';
import InfoPayment from './infopayment/infopayment';
import { useDispatch, useSelector } from 'react-redux';
import {faCouch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './seat.scss'
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { addSeat, removeSeat } from '../../../redux/ticketSlice';

function Seat(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const movietime = useSelector(state => state.movietime.movie_time)
    const seatSelected = useSelector(state => state.ticket.seat)

    function handleClickChooseSeat(id,available) {
        const price = movietime.movietime.price
        if(available){
            if(seatSelected.indexOf(id) < 0){
                dispatch(addSeat({seat:id,price:price}))
            }
            else{
                dispatch(removeSeat({seat:id,price:price}))
            }
        }
    }

    const seat = movietime?.movietime.seat.map((seatRow,index) =>{
        return  <div key={index} className="row seat__row">
                    {   
                        seatRow.map(({available,id,_id}) => {
                            return  <div key={_id} className="col-1 col-sm-1 seat__colume">
                                        <FontAwesomeIcon 
                                            onClick={() => handleClickChooseSeat(id,available)} 
                                            icon={faCouch} 
                                            className={classNames({
                                                'seat__colume-active': available,
                                                'seat__colume-disable': available ? false : true,
                                                'seat__colume-selecting': seatSelected.indexOf(id) < 0 ? false : true
                                            })}>
                                        </FontAwesomeIcon>
                                    </div>
                        })
                    }
                </div>
    })
    return (
        <div className="ticket">
            <div className="seat">
                {seat}
                <div className="seat__note">
                    <div className="seat__note-item">
                        <FontAwesomeIcon className="seat__choosed" icon={faCouch}></FontAwesomeIcon>
                        <h1>{t('seat.picked')}</h1>
                    </div>
                    <div className="seat__note-item">
                        <FontAwesomeIcon className="seat__available" icon={faCouch}></FontAwesomeIcon>
                        <h1>{t('seat.available')}</h1>
                    </div>
                    <div className="seat__note-item">
                        <FontAwesomeIcon className="seat__selecting" icon={faCouch}></FontAwesomeIcon>
                        <h1>{t('seat.choosing')}</h1>
                    </div>
                </div>
            </div>
            <div className="info__payment">
                <InfoPayment></InfoPayment>
            </div>
        </div>  
    );
}

export default Seat;