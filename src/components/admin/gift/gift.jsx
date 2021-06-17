import React, { useEffect,useState } from 'react';
import PaginationGift from './pagination/pagination';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { TAB_ADMIN_GIFT } from '../../../constants';
import { Table } from 'reactstrap';
import { getGiftStatistic, getListGift } from '../../../redux/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV,faGift,faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import EditGift from './edit/edit';
import DeleteGift from './delete/delete';
import NewGift from './newgift/newgift';

function GiftManagement(props) {
    const tab = useSelector(state => state.admin.tab)
    const gifts = useSelector(state => state.admin.gifts.gift)
    const numberGetWeek = useSelector(state => state.admin.gifts.numberGetWeek)
    const numberGetMonth = useSelector(state => state.admin.gifts.numberGetMonth)
    const numberGetYear = useSelector(state => state.admin.gifts.numberGetYear)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const [giftSelected,setGiftSelected] = useState({})
    const [modalEditGift, setmodalEditGift] = useState(false);
    const [modalDeleteGift, setmodalDeleteGift] = useState(false);
    const [modalNewGift, setmodalNewGift] = useState(false);
    const toggleNewGift = () => setmodalNewGift(!modalNewGift);

    const toggleEditGift = (gift) => {
        if(gift){
            setGiftSelected(gift)
        }
        setmodalEditGift(!modalEditGift);
    }

    const toggleDeleteGift = (gift) => {
        if(gift){
            setGiftSelected(gift)
        }
        setmodalDeleteGift(!modalDeleteGift);
    }

    useEffect(() => {
        if(tab === TAB_ADMIN_GIFT){
            dispatch(getListGift())
            dispatch(getGiftStatistic())
        }
    },[tab])

    const itemTable = gifts.map((gift,index) => {
        return  <tr key={gift._id}>
                    <th scope="row">{index+1}</th>
                    <td>{gift.name}</td>
                    <td>{new Date(gift.date.date_start).toLocaleDateString()}</td>
                    <td>{new Date(gift.date.date_end).toLocaleDateString()}</td>
                    <td>{gift.available}/{gift.amount}</td>
                    <td>{gift.point_to_get}</td>
                    <td>{gift.value} VNĐ</td>
                    <td><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                        <div className="action">
                            <ul>
                                <li onClick={() => toggleEditGift(gift)}>{t('admin.gift_info.edit')}</li>
                                <li onClick={() => toggleDeleteGift(gift)}>{t('admin.gift_info.delete')}</li>
                            </ul>
                        </div>
                    </td>
                </tr>
    })

    return (
        <div className={classNames({'admin__detail': true,
                                    'admin__content-active': tab === TAB_ADMIN_GIFT,
                                    'admin__content-disable': !(tab === TAB_ADMIN_GIFT)})}>
            <h1>{t('admin.gift_info.title')}</h1>
            <div className="add__new" onClick={toggleNewGift}>
                <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
                <span>{t('admin.gift_info.new_title')}</span>
            </div>
            <div className="statistic">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="statistic-item">
                            <h1>{t('admin.gift_info.week')}</h1>
                            <section>
                                <div className="statistic-icon">
                                    <FontAwesomeIcon icon={faGift}></FontAwesomeIcon>
                                </div>
                                <div className="statistic-number">
                                    <span>-{numberGetWeek.number}</span>
                                    <span>-{numberGetWeek.total} VNĐ</span>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="statistic-item">
                            <h1>{t('admin.gift_info.month')}</h1>
                            <section>
                                <div className="statistic-icon">
                                    <FontAwesomeIcon icon={faGift}></FontAwesomeIcon>
                                </div>
                                <div className="statistic-number">
                                    <span>-{numberGetMonth.number}</span>
                                    <span>-{numberGetMonth.total} VNĐ</span>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="statistic-item">
                            <h1>{t('admin.gift_info.year')}</h1>
                            <section>
                                <div className="statistic-icon">
                                    <FontAwesomeIcon icon={faGift}></FontAwesomeIcon>
                                </div>
                                <div className="statistic-number">
                                    <span>-{numberGetYear.number}</span>
                                    <span>-{numberGetYear.total} VNĐ</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table">
                <Table dark>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>{t('admin.gift_info.name')}</th>
                        <th>{t('admin.gift_info.date_start')}</th>
                        <th>{t('admin.gift_info.date_end')}</th>
                        <th>{t('admin.gift_info.remain')}</th>
                        <th>{t('admin.gift_info.point')}</th>
                        <th>{t('admin.gift_info.value')}</th>
                        <th>{t('admin.gift_info.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemTable}
                    </tbody>
                </Table>
            </div>
            <PaginationGift></PaginationGift>
            <EditGift toggleEditGift={toggleEditGift} modalEditGift={modalEditGift} gift={giftSelected}></EditGift>
            <DeleteGift toggleDeleteGift={toggleDeleteGift} modalDeleteGift={modalDeleteGift} gift={giftSelected}></DeleteGift>
            <NewGift toggleNewGift={toggleNewGift} modalNewGift={modalNewGift}></NewGift>
        </div>
    );
}

export default GiftManagement;