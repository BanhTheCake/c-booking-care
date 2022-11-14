import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FormattedMessage } from 'react-intl';
import aspect from '../../../../assets/image/aspect.png';
import bigCar from '../../../../assets/image/bigCar.png';
import car from '../../../../assets/image/car.jpg';
import head from '../../../../assets/image/head.png';
import hospital from '../../../../assets/image/hospital.png';
import pen from '../../../../assets/image/pen.png';
import phone from '../../../../assets/image/phone.png';
import plus from '../../../../assets/image/plus.jpg';
import teeth from '../../../../assets/image/teeth.png';
import './HomeBanner.scss';

const menuList = [
    { image: hospital, text: 'homePage.specialist_examination' },
    { image: phone, text: 'homePage.remote_examination' },
    { image: pen, text: 'homePage.general_examination' },
    { image: aspect, text: 'homePage.medical_test' },
    { image: head, text: 'homePage.mental_health' },
    { image: teeth, text: 'homePage.dental_examination' },
    { image: car, text: 'homePage.surgery_package' },
    { image: bigCar, text: 'homePage.medical_products' },
    { image: plus, text: 'homePage.Corporate_health' },
];

const HomeBanner = () => {
    return (
        <>
            <div className="home__banner">
                <div className="container banner__content">
                    <h2 className="banner__title">
                        <FormattedMessage id="homePage.medical_background" />
                    </h2>
                    <p className="banner__sub">
                        <FormattedMessage id="homePage.medical_background_sub" />
                    </p>
                    <div className="banner__input">
                        <label htmlFor="inputText" className="icon">
                            <BiSearchAlt2 size={24} />
                        </label>
                        <FormattedMessage id="homePage.find_specialty">
                            {(placeholder) => (
                                <input
                                    id="inputText"
                                    placeholder={placeholder}
                                />
                            )}
                        </FormattedMessage>
                    </div>
                    <div className="banner__menu">
                        {menuList.length &&
                            menuList.map((item) => {
                                return (
                                        <div key={item.text} className="banner__item">
                                            <div className="img__wrapper">
                                                <img src={item.image} alt="" />
                                            </div>
                                            <p>
                                                <FormattedMessage
                                                    id={item.text}
                                                />
                                            </p>
                                        </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeBanner;
