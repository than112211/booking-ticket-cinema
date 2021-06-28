import React, { useState } from 'react';
import {NUMBER_EVENT_HOME,HOST_SERVER} from '../../../constants/index'
import icon_promotion from '../../../resourses/img/icon-promotion.png'
import {
    Carousel,
    CarouselItem,
    CarouselIndicators,
  } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './promotion.scss'

function Promotion(props) {
    const {t} = useTranslation();
    const event = useSelector(state => state.event.event)
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === Math.ceil(event.length/NUMBER_EVENT_HOME) - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
      }
    
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? Math.ceil(event.length/NUMBER_EVENT_HOME) - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
      }
  
    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
      }

    return (
        <div className="promotion__content">
            <div className="promotion__title">
                <img src={icon_promotion} alt="anh sự kiện" />
                <h1>{t('event')}</h1>
            </div>
            <div className="promotion__slide">
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                >
                <CarouselIndicators items={event} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {
                    [...Array(Math.ceil(event.length/NUMBER_EVENT_HOME))].map((item,index) =>{
                        return  <CarouselItem
                                    onExiting={() => setAnimating(true)}
                                    onExited={() => setAnimating(false)}
                                >
                                    <div className="row">
                                    {
                                      event.slice(index*NUMBER_EVENT_HOME,(index*NUMBER_EVENT_HOME)+NUMBER_EVENT_HOME).map(event =>{
                                          return  <div className="col-6 col-sm-3 col-md-6 col-lg-4">
                                                      <div className="event__item">
                                                          <img src={`${HOST_SERVER}/${event.image}`} alt="Anh sự kiện" />
                                                      </div>
                                                  </div>
                                      })
                                    }
                                    </div>
                                </CarouselItem>
                    })
                }
                </Carousel>
            </div>
        </div>
    );
}

export default Promotion;