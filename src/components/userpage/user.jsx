import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Info from './info/info'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './user.scss';
import { TAB_USER_CHANGEPASSWORD, TAB_USER_GIFT, TAB_USER_HISTORY, TAB_USER_INFOMATION } from '../../constants';
import { chooseTab } from '../../redux/userSlice';

function UserPage(props) {
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const tab = useSelector(state => state.user.tab)

    function handleClickChangeTab(tab) {
        dispatch(chooseTab(tab))
    }
    return (
        <div className="user">
            <div className="container movieshow__container user__container">
                <div className="show__tab user__tab">
                    <ul>
                        <li className={classNames({'user__info-active':tab === TAB_USER_INFOMATION})} onClick={() => handleClickChangeTab(TAB_USER_INFOMATION)}><Link>{t('user.info')}</Link></li>
                        <li className={classNames({'user__info-active':tab === TAB_USER_CHANGEPASSWORD})} onClick={() => handleClickChangeTab(TAB_USER_CHANGEPASSWORD)}><Link>{t('user.change_password')}</Link></li>
                        <li className={classNames({'user__info-active':tab === TAB_USER_GIFT})} onClick={() => handleClickChangeTab(TAB_USER_GIFT)}><Link>{t('user.gift')}</Link></li>
                        <li className={classNames({'user__info-active':tab === TAB_USER_HISTORY})} onClick={() => handleClickChangeTab(TAB_USER_HISTORY)}><Link>{t('user.history')}</Link></li>
                    </ul>
                </div>
                <div className="user__tab-item">
                    <Info></Info>
                </div>
            </div>
        </div>
    );
}

export default UserPage;