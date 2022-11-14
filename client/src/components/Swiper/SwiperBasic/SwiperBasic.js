import React from 'react';
import {
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill
} from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';
import { Autoplay, Lazy, Navigation } from 'swiper';
import 'swiper/css';
import "swiper/css/lazy";
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import './SwiperBasic.scss';

const SwiperBasic = ({ data = [], name = '', handleClick = () => {} }) => {
    if (data.length === 0 || name === '') {
        return null;
    }

    return (
        <>
            <div className="swiper-wrapper">
                <Swiper
                    slidesPerView={1}
                    slidesPerGroup={1}
                    spaceBetween={16}
                    speed={500}
                    navigation={{
                        prevEl: `.prevBtn-${name}`,
                        nextEl: `.nextBtn-${name}`,
                    }}
                    lazy={true}
                    breakpoints={{
                        500: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                        },
                        640: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                        },
                        1100: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                        },
                    }}
                    // autoplay={{
                    //     delay: 3000,
                    //     disableOnInteraction: false,
                    // }}
                    modules={[Navigation, Autoplay, Lazy]}
                    className="mySwiper"
                >
                    {data.length &&
                        data.map((item, index) => {
                            return (
                                    <SwiperSlide key={item.text + name + index}>
                                        <div className="mySwiper__item" onClick={() => handleClick(item.id)}>
                                            <div className="img__wrapper">
                                                <img
                                                    data-src={item.img}
                                                    alt=""
                                                    className="swiper-lazy"
                                                />
                                            </div>
                                            <p>
                                                {item.text}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                            );
                        })}
                </Swiper>
                <button className={`prevBtn prevBtn-${name}`}>
                    <BsFillArrowLeftSquareFill size={30} />
                </button>
                <button className={`nextBtn nextBtn-${name}`}>
                    <BsFillArrowRightSquareFill size={30} />
                </button>
            </div>
        </>
    );
};

export default SwiperBasic;
