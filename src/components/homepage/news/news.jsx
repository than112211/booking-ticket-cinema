import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import React, { useState,useEffect } from 'react';
import './news.scss'
import icon_news from '../../../resourses/img/icon-news.png'
import { getNewsInit } from '../../../redux/newsSlice';
import {HOST_SERVER} from '../../../constants'
import newsAPI from '../../../apis/news';

function News(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const news = useSelector(state => state.news.news)

    useEffect(() => {
        dispatch(getNewsInit())
    },[])

    return (
        <div className="news__container">
            <div className="news__title">
                <img src={icon_news} alt="Anh tin tức" />
                <h1>{t('news')}</h1>
            </div>
            <div className="news__content">
                {
                    [...Array(Math.ceil(news.length/2))].map((item,index)=> {
                        return  <div className="row news__wrap">
                                    {
                                        news.slice(index*2,(index*2)+2).map(news =>{
                                            return  <div className="news__item">
                                                            <div className="news__item-content">
                                                                <h1>{news.title}</h1>
                                                                <p>{news.decription}</p>
                                                            </div>
                                                            <div className="news__item-img">
                                                                <img src={`${HOST_SERVER}/${news.image}`} alt="" />
                                                            </div>
                                                        </div>
                                        })
                                    }
                                </div>
                    })
                }
            </div>
        </div>
    );
}

export default News;