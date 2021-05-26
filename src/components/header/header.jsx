import React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '@material-ui/core/Container';
import {changeLanguage} from '../../redux/languageSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import './header.scss'
import { useDispatch, useSelector } from 'react-redux';

function Header(props) {
    const {t} = useTranslation();
    const language = useSelector(state => state.language)
    const dispatch = useDispatch()
    
    function handleClickChangeLanguage() {
        const action = changeLanguage(language == 'vi' ? 'en' : 'vi')
        dispatch(action)
      }
    
    return (
     <header className="header">
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
                    <button  className="btn__login">{t('header.login')}</button>
                    <button  className="btn__changelanguage" onClick={handleClickChangeLanguage}>{language}</button>
                   </div>
            </div>
            <div className="header__bottom">
                            <ul>
                                <li>{t('header.nav.movie')}</li>
                                <li>{t('header.nav.promotion')}</li>
                                <li>{t('header.nav.news')}</li>
                                <li>{t('header.nav.intro')}</li>
                            </ul>
            </div>
         </Container>
     </header>
    );
}

export default Header;