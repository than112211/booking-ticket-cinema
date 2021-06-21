import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import EventSlide from './eventSlide/event';
import './home.scss'
import MovieShow from './movieShow/movieshow';
import News from './news/news';
import { toast } from 'react-toastify';
import Promotion from './promotion/promotion';
import { useTranslation } from 'react-i18next';

function Home(props) {
    const history = useHistory()
    const notifyPaymentSuccess = () => toast.success(t('toast.payment_success'));
    const notifyPaymentFail = () => toast.error(t('toast.payment_fail'));
    const {t} = useTranslation();

    useEffect(() => {
        if(history.location.search === "?payment=0"){
            history.replace('/')
            notifyPaymentSuccess()
        }
        else if(history.location.search === "?payment=1"){
            history.replace('/')
            notifyPaymentFail()
        }
    },[])
    
    return (
        <div>
            <div className="event__slide">
                <EventSlide></EventSlide>
            </div>
            <div className="movie__show">
                <MovieShow></MovieShow>
            </div>
            <div className="container">
                <div className="promotion">
                    <Promotion></Promotion>
                </div>
                <div className="news">
                    <News></News>
                </div>
            </div>
        </div>
    );
}

export default Home;