import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HOST_SERVER, TAB_USER_HISTORY, TAB_USER_INFOMATION } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faCheckCircle,faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import './info.scss'
import { Button } from 'reactstrap';
import classNames from 'classnames';

function Info(props) {
    const {t} = useTranslation();
    const tab = useSelector(state => state.user.tab)
    const user = useSelector(state => state.user.user)
    return (
        <div className={classNames({'user__info':true,
                                    'user__tab-active':tab === TAB_USER_INFOMATION,
                                    'user__tab-disable':!(tab === TAB_USER_INFOMATION) })}>
            <div className="row">
                <div className="col-4 col-sm-4">
                    <div className="info__left">
                        <div className="info__left-img">
                            <img src={`${HOST_SERVER}/${user.avartar}`} alt="Anh dai dien" />
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </div>
                        <h1>{user.name}</h1>
                    </div>
                </div>
                <div className="col-8 col-sm-8">
                    <div className="info__right">
                        <h1>{t('user.info')}</h1>
                        <div className="info__right-item">
                            <h2>{t('user.user_info.email')}:</h2>
                            <span>{user.email}</span>
                        </div>
                        <div className="info__right-item">
                            <h2>{t('user.user_info.dob')}:</h2>
                            <span>{user.date.split('T').slice(0,1)}</span>
                        </div>
                        <div className="info__right-item">
                            <h2>{t('user.user_info.point')}:</h2>
                            <span>{user.point}</span>
                        </div>
                        <div className="info__right-item">
                            <h2>{t('user.user_info.verify')}:</h2>
                            <span>
                                {user.verify ? <FontAwesomeIcon className="icon_check" icon={faCheckCircle}></FontAwesomeIcon> : <FontAwesomeIcon className="icon_times" icon={faTimesCircle}></FontAwesomeIcon>}
                            </span>
                        </div>
                        <Button>{t('user.user_info.edit')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;