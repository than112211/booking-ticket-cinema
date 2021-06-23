import React,{useState,useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@material-ui/core/Container';
import {changeLanguage} from '../../redux/languageSlice'
import {getUser,logoutUser,requireLogin} from '../../redux/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faBars} from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';
import './header.scss'
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../login/login';
import { HOST_SERVER } from '../../constants';
import { addSearch } from '../../redux/searchSlice';

function Header(props) {
    const {t} = useTranslation();
    const language = useSelector(state => state.language)
    const dispatch = useDispatch()
    const [modalLogin, setModalLogin] = useState(false);
    const toggleLogin = () => setModalLogin(!modalLogin);
    const user = useSelector(state => state.user)
    const waitingSearch = useRef(null)
    const history = useHistory()
    function handleClickChangeLanguage() {
        const action = changeLanguage(language == 'vi' ? 'en' : 'vi')
        dispatch(action)
      }

    useEffect(() => {
        dispatch(requireLogin(toggleLogin))
        if(localStorage.getItem('token')){
            dispatch(getUser())
        }
     },[])

    function handleClickLogout(){
        localStorage.clear()
        dispatch(logoutUser())
    }

    const admin = user.isLogin && user.user.role === false ? <li><Link to="/admin">{t('header.nav.admin')}</Link></li> : <></>

    function handleChangeSearch(e){
        if(waitingSearch.current){
            clearTimeout(waitingSearch.current)
        }
        waitingSearch.current = setTimeout(() => {
            if(e.target.value !== ''){
                dispatch(addSearch(e.target.value))
                history.replace('/search')
            }
        },500)
    }
    return (
     <header className="header">
        <LoginModal modalLogin={modalLogin} toggleLogin={toggleLogin}></LoginModal>
        <Container fixed>
            <div className="header__nav">
                <div className="header__logo">
                    <img src="http://cinestar.com.vn/pictures/moi/9Logo/white-2018.png" alt="logo" />
                </div>
                <div className="header__search">
                    <input type="text" name="search" placeholder={t('header.search')} id="" onChange={handleChangeSearch}/>
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </div>
                <div className="header__btn">
                    <div className="icon__bars">
                        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        <div className="header__bars">
                            <ul>
                                <li><Link to="/">{t('header.nav.home')}</Link></li>
                                <li><Link to="/movie">{t('header.nav.movie')}</Link></li>
                                <li><Link>{t('header.nav.promotion')}</Link></li>
                                <li><Link>{t('header.nav.news')}</Link></li>
                                <li><Link to="/gift">{t('header.nav.gift')}</Link></li>
                                {admin}
                            </ul>
                        </div>
                    </div>
                    <div style={{display: user.isLogin ? 'flex' : 'none'}} className="user__info">
                        <h1>{user.user.name}</h1>
                        <img src={`${HOST_SERVER}/${user.user.avartar}`} alt="Avatar" />
                        <div className="user__info-detail">
                            <ul>
                                <li><Link to="/user">{t('info.info_person')}</Link></li>
                                <li><Link>{t('info.help')}</Link></li>
                                <li onClick={handleClickLogout}><Link>{t('info.logout')}</Link></li>
                            </ul>
                        </div>
                    </div>
                    <button  className="btn__login" style={{display:user.isLogin ? 'none' : 'block'}} onClick={toggleLogin}>{t('header.login')}</button>
                    <button  className="btn__changelanguage" onClick={handleClickChangeLanguage}>{language}</button>
                </div>
            </div>
            <div className="header__bottom">
                <ul>
                    <li><Link to="/">{t('header.nav.home')}</Link></li>
                    <li><Link to="/movie">{t('header.nav.movie')}</Link></li>
                    <li><Link>{t('header.nav.promotion')}</Link></li>
                    <li><Link>{t('header.nav.news')}</Link></li>
                    <li><Link to="/gift">{t('header.nav.gift')}</Link></li>
                    {admin}
                </ul>
            </div>
        </Container>
    </header>
    );
}

export default Header;