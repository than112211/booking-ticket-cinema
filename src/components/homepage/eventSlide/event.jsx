import React,{useState,useEffect} from 'react';
import {HOST_SERVER} from '../../../constants/index'
import './event.scss'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
  } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getEventInit } from '../../../redux/eventSlice';

function EventSlide(props) {
    const dispatch = useDispatch()
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const event = useSelector(state => state.event.event)
    
    useEffect(() => {
        dispatch(getEventInit())
    },[])

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === event.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
  
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? event.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = event.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item._id}
            >
              <img src={`${HOST_SERVER}/${item.cover_image}`} alt={item.title} />
            </CarouselItem>
        );
      });
    return (
        <div className="event__slide-home">
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
              >
                <CarouselIndicators items={event} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>
    );
}

export default EventSlide;