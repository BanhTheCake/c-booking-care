import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineContactSupport } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleChangeLanguage } from '../../../../app/appSlice';
import logo from '../../../../assets/image/bookingcare-2020.svg';
import './HomeNavbar.scss';

const HomeNavbar = () => {
    const language = useSelector(state => state.app.language)
    const navigate = useNavigate()
    
    const dispatch = useDispatch();
    const handleClickBtn = (languageInput) => {
        if (languageInput === language) {
            return
        }
        dispatch(handleChangeLanguage(languageInput));
    };

    const handleClickHome = () => {
        return navigate('/')
    }

    return (
        <>
            <div className="home__header">
                <div className="container home__header-wrapper">
                    <div className="header__logo" onClick={handleClickHome}>
                        <GiHamburgerMenu size={26} cursor={'pointer'} />
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="header__menu">
                        <div className="menu-item">
                            <h5>
                                <FormattedMessage id="homePage.specialist" />
                            </h5>
                            <p>
                                <FormattedMessage id="homePage.Specialist_sub" />
                            </p>
                        </div>
                        <div className="menu-item">
                            <h5>
                                <FormattedMessage id="homePage.health_facilities" />
                            </h5>
                            <p>
                                <FormattedMessage id="homePage.health_facilities_sub" />
                            </p>
                        </div>
                        <div className="menu-item">
                            <h5>
                                <FormattedMessage id="homePage.doctor" />
                            </h5>
                            <p>
                                <FormattedMessage id="homePage.doctor_sub" />
                            </p>
                        </div>
                        <div className="menu-item">
                            <h5>
                                <FormattedMessage id="homePage.checkup_package" />
                            </h5>
                            <p>
                                <FormattedMessage id="homePage.checkup_package_sub" />
                            </p>
                        </div>
                    </div>
                    <div className="header__support">
                        <div className="support">
                            <MdOutlineContactSupport size={20} />
                            <span>
                                <FormattedMessage id="homePage.support" />
                            </span>
                        </div>
                        <div className="change-language">
                            <p
                                className={language === 'vi-VI' ? 'active' : ''}
                                onClick={() => handleClickBtn('vi-VI')}
                            >
                                VN
                            </p>
                            <p
                                className={language === 'en-US' ? 'active' : ''}
                                onClick={() => handleClickBtn('en-US')}
                            >
                                EN
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeNavbar;
