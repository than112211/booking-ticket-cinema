import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import './gift.scss'
import { TAB_USER_GIFT } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGift} from '@fortawesome/free-solid-svg-icons'
import gift_img from '../../../resourses/img/icon-promotion.png'

function GiftUser(props) {
    const tab = useSelector(state => state.user.tab)
    const user = useSelector(state => state.user.user)

    const renderGifts = user.gift_code.map(gift => {
        return  <div key={gift._id} className="gift__item">
                    <div className="gift__item-img">
                        <img src={gift_img} alt="Anh quà tặng" />
                    </div>
                    <div className="gift__item-content">
                        <h1>{gift.name}</h1>
                    </div>
                    <div className="gift__item-code">
                        <span><FontAwesomeIcon icon={faGift}></FontAwesomeIcon>{gift.code}</span>
                    </div>
                </div>
    })
    return (
        <div className={classNames({'user__gift':true,
                                    'user__tab-active':tab === TAB_USER_GIFT,
                                    'user__tab-disable':!(tab === TAB_USER_GIFT) })}>
            {renderGifts}
        </div>
    );
}

export default GiftUser;