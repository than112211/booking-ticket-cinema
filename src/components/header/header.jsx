import React,{useState,useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@material-ui/core/Container';
import {changeLanguage} from '../../redux/languageSlice'
import {getUser,logoutUser,requireLogin} from '../../redux/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './header.scss'
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../login/login';
import { HOST_SERVER } from '../../constants';

function Header(props) {
    const {t} = useTranslation();
    const language = useSelector(state => state.language)
    const dispatch = useDispatch()
    const [modalLogin, setModalLogin] = useState(false);
    const toggleLogin = () => setModalLogin(!modalLogin);
    const user = useSelector(state => state.user)

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
    return (
     <header className="header">
        <LoginModal modalLogin={modalLogin} toggleLogin={toggleLogin}></LoginModal>
        <Container fixed>
            <div className="header__nav">
                <div className="header__logo">
                    <img src="http://cinestar.com.vn/pictures/moi/9Logo/white-2018.png" alt="logo" />
                </div>
                <div className="header__search">
                    <input type="text" name="" placeholder={t('header.search')} id="" />
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </div>
                <div className="header__btn">
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
                </ul>
            </div>
        </Container>
    </header>
    );
}

export default Header;