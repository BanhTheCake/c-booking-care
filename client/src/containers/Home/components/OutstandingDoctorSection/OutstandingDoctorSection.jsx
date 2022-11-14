// OutstandingDoctorSection

import React from 'react';
import { FormattedMessage } from 'react-intl';
import SwiperRounded from '../../../../components/Swiper/SwiperRounded/SwiperRounded';
import './OutstandingDoctorSection.scss';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const OutstandingDoctorSection = () => {

    const dataDoctor = useSelector((state) => state.home.topDoctorList)
    const navigate = useNavigate()

    const handleClick = (item) => {
        const { id } = item
        if (!id) {
            return toast.error('Id is missing !')
        }
        return navigate(`/doctor-details/${id}`)
    }

    return (
        <>
            <div className="home__section OutstandingDoctorSection">
                <div className="container">
                    <h4 className="title">
                        <FormattedMessage id={'homePage.famous_doctor'} />
                    </h4>
                    <SwiperRounded
                        data={dataDoctor}
                        name="famous_doctor"
                        handleClick={handleClick}
                    />
                </div>
            </div>
        </>
    );
};

export default OutstandingDoctorSection;
