import React from 'react';
import EventSlide from './eventSlide/event';
import './home.scss'
import MovieShow from './movieShow/movieshow';
import News from './news/news';
import Promotion from './promotion/promotion';

function Home(props) {
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