import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import './admin.scss'
import { useDispatch, useSelector } from 'react-redux';
import { TAB_ADMIN_DASHBOARD, TAB_ADMIN_GIFT, TAB_ADMIN_MOVIE, TAB_ADMIN_MOVIETIME, TAB_ADMIN_REVENUE, TAB_ADMIN_USER } from '../../constants';
import { chooseTab } from '../../redux/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift,faFilm,faUserAlt,faChartPie,faVideo,faDollarSign} from '@fortawesome/free-solid-svg-icons'
import UserManagement from './user/user';
import GiftManagement from './gift/gift';
import MovieManagement from './movie/movie';

function AdminPage(props) {
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const tab = useSelector(state => state.admin.tab)

    function handleClickChangeTab(selectTab){
        if(tab !== selectTab){
            dispatch(chooseTab(selectTab))
        }
    }
    return (
        <div className="admin">
            <div className="container">
                <div className="row">
                    <div className="col-3 col-sm-3">
                        <div className="admin__menu">
                            <div className="admin__menu-tab">
                                <ul>
                                    <li className={classNames({'admin__tab-active':tab === TAB_ADMIN_DASHBOARD})} onClick={() => handleClickChangeTab(TAB_ADMIN_DASHBOARD)}><FontAwesomeIcon icon={faChartPie}></FontAwesomeIcon>{t('admin.dashboard')}</li>
                                    <li className={classNames({'admin__tab-active':tab === TAB_ADMIN_USER})} onClick={() => handleClickChangeTab(TAB_ADMIN_USER)}><FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>{t('admin.user')}</li>
                                    <li className={classNames({'admin__tab-active':tab === TAB_ADMIN_MOVIE})} onClick={() => handleClickChangeTab(TAB_ADMIN_MOVIE)}><FontAwesomeIcon icon={faFilm}></FontAwesomeIcon>{t('admin.movie')}</li>
                                    <li className={classNames({'admin__tab-active':tab === TAB_ADMIN_MOVIETIME})} onClick={() => handleClickChangeTab(TAB_ADMIN_MOVIETIME)}><FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>{t('admin.movietime')}</li>
                                    <li className={classNames({'admin__tab-active':tab === TAB_ADMIN_GIFT})} onClick={() => handleClickChangeTab(TAB_ADMIN_GIFT)}><FontAwesomeIcon icon={faGift}></FontAwesomeIcon>{t('admin.gift')}</li>
                                    <li className={classNames({'admin__tab-active':tab === TAB_ADMIN_REVENUE})} onClick={() => handleClickChangeTab(TAB_ADMIN_REVENUE)}><FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>{t('admin.revenue')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 col-sm-9">
                        <div className="admin__content">
                            <UserManagement></UserManagement>
                            <GiftManagement></GiftManagement>
                            <MovieManagement></MovieManagement>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;