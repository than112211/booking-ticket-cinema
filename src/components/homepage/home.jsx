import React from 'react';
import EventSlide from './eventSlide/event';
import './home.scss'
import MovieShow from './movieShow/movieshow';

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

                </div>
                <div className="news">

                </div>
            </div>
        </div>
    );
}

export default Home;