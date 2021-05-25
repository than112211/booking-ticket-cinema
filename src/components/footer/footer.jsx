import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFacebook,faYoutube,faGoogle,faTwitter} from '@fortawesome/free-brands-svg-icons'
import './footer.scss'
import line from '../../resourses/img/line-bg.png'

Footer.propTypes = {
    
};

function Footer(props) {
    const {t} = useTranslation();

    return (
        <footer className="footer">
            <div className="footer__line">
                    <img src={line} alt="" />
            </div>
            <Container fixed>
                <div className="footer__logo">
                    <img src="http://cinestar.com.vn/pictures/moi/9Logo/white-2018.png" alt="logo" />
                </div>
                <div className="footer__content">
                    <ul className="footer__content-item">
                        <li>{t('footer.ul-1.theater')}</li>
                        <li>CineStar Hà Nội</li>
                        <li>CineStar TP.HCM</li>
                        <li>CineStar Đà Nẵng</li>
                        <li>CineStar TP.Cần Thơ</li>
                    </ul>
                    <ul className="footer__content-item">
                        <li>CineStar</li>
                        <li>{t('footer.ul-2.now_show')}</li>
                        <li>{t('footer.ul-2.comming_soon')}</li>
                        <li>{t('footer.ul-2.news')}</li>
                        <li>{t('footer.ul-2.promotion')}</li>
                    </ul>
                    <ul className="footer__content-item">
                        <li>{t('footer.ul-3.info')}</li>
                        <li>{t('footer.ul-3.question')}</li>
                        <li>{t('footer.ul-3.contact')}</li>
                        <li>{t('footer.ul-3.intro')}</li>
                    </ul>
                    <ul className="footer__content-item">
                        <li>{t('footer.ul-4.policy')}</li>
                        <li>{t('footer.ul-4.general')}</li>
                        <li>{t('footer.ul-4.security')}</li>
                        <li>{t('footer.ul-4.transaction')}</li>
                    </ul>
                </div>
                <div className="footer__contact">
                    <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>

                </div>
          </Container>
        </footer>
    );
}

export default Footer;