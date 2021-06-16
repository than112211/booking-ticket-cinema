import React, { useEffect,useState } from 'react';
import PaginationUser from './pagination/pagination';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { TAB_ADMIN_USER } from '../../../constants';
import { Table } from 'reactstrap';
import { getListUser, getUserStatistic } from '../../../redux/adminSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle,faCheckCircle,faEllipsisV,faUserAlt} from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';
import './user.scss'
import EditUser from './edit/edit';
import DeleteUser from './delete/delete';

function UserManagement(props) {
    const tab = useSelector(state => state.admin.tab)
    const users = useSelector(state => state.admin.users.user)
    const numberCreatedWeek = useSelector(state => state.admin.users.numberUserWeek)
    const numberCreatedMonth = useSelector(state => state.admin.users.numberUserMonth)
    const numberCreatedYear = useSelector(state => state.admin.users.numberUserYear)
    const [userSelected,setUserSelected] = useState({})
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const [modalEditUser, setmodalEditUser] = useState(false);
    const [modalDeleteUser, setmodalDeleteUser] = useState(false);

    const toggleEditUser = (user) => {
        if(user){
            setUserSelected(user)
        }
        setmodalEditUser(!modalEditUser);
    }

    const toggleDeleteUser = (user) => {
        if(user){
            setUserSelected(user)
        }
        setmodalDeleteUser(!modalDeleteUser);
    }

    useEffect(() => {
        if(tab === TAB_ADMIN_USER){
            dispatch(getListUser())
            dispatch(getUserStatistic())
        }
    },[tab])

    const itemTable = users.map((user,index) => {
        return  <tr key={user._id}>
                    <th scope="row">{index+1}</th>
                    <td>{user.name}</td>
                    <td>{new Date(user.date).toLocaleDateString()}</td>
                    <td>{user.email}</td>
                    <td>{user.isVerified ? <FontAwesomeIcon className="icon__check" icon={faCheckCircle}></FontAwesomeIcon> : <FontAwesomeIcon className="icon__times" icon={faTimesCircle}></FontAwesomeIcon>}</td>
                    <td>{user.point}</td>
                    <td><FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                        <div className="user__action">
                            <ul>
                                <li onClick={() => toggleEditUser(user)}>{t('admin.user_info.edit')}</li>
                                <li onClick={() => toggleDeleteUser(user)}>{t('admin.user_info.delete')}</li>
                            </ul>
                        </div>
                    </td>
                </tr>
    })
    return (
        <div className={classNames({'admin__user': true,
                                    'admin__content-active': tab === TAB_ADMIN_USER,
                                    'admin__content-disable': !(tab === TAB_ADMIN_USER)})}>
            <h1>{t('admin.user_info.title')}</h1>
            <div className="user__statistic">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="user__statistic-item">
                            <h1>{t('admin.user_info.week')}</h1>
                            <section>
                                <div className="user__statistic-icon">
                                    <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
                                </div>
                                <span>+{numberCreatedWeek}</span>
                            </section>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="user__statistic-item">
                            <h1>{t('admin.user_info.month')}</h1>
                            <section>
                                <div className="user__statistic-icon">
                                    <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
                                </div>
                                <span>+{numberCreatedMonth}</span>
                            </section>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4">
                        <div className="user__statistic-item">
                            <h1>{t('admin.user_info.year')}</h1>
                            <section>
                                <div className="user__statistic-icon">
                                    <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
                                </div>
                                <span>+{numberCreatedYear}</span>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user__table">
                <Table dark>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>{t('admin.user_info.name')}</th>
                        <th>{t('admin.user_info.dob')}</th>
                        <th>{t('admin.user_info.email')}</th>
                        <th>{t('admin.user_info.verify')}</th>
                        <th>{t('admin.user_info.point')}</th>
                        <th>{t('admin.user_info.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemTable}
                    </tbody>
                </Table>
            </div>
            <PaginationUser></PaginationUser>
            <EditUser toggleEditUser={toggleEditUser} modalEditUser={modalEditUser} user={userSelected}></EditUser>
            <DeleteUser toggleDeleteUser={toggleDeleteUser} modalDeleteUser={modalDeleteUser} user={userSelected}></DeleteUser>
        </div>
    );
}

export default UserManagement;