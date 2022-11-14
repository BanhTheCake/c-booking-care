import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SwiperBasic from '../../../../components/Swiper/SwiperBasic/SwiperBasic';
import { popularSpecialties } from '../../../../constant/data';
import './HealthFacilitiesSection.scss';

const HealthFacilitiesSection = () => {

    const navigate = useNavigate()

    const clinicList = useSelector((state) => state.home.clinicList)

    const dataRender = useMemo(() => {
        const newData = clinicList?.map(item => {
            const newObject = {}
            newObject.img = item.image
            newObject.text = item.name
            newObject.id = item.id
            return newObject
        }) || []
        
        return newData
    }, [clinicList])

    const handleClick = (id) => {
        console.log(id);
        return navigate(`/clinic-details/${id}`)
    }

    return (
        <>
            <div className="home__section HealthFacilitiesSection">
                <div className="container">
                    <h4 className="title">
                        <FormattedMessage id={'homePage.outstanding_medical_facility'} />
                    </h4>
                    <SwiperBasic
                        data={dataRender}
                        handleClick={handleClick}
                        name="outstanding_medical_facility"
                    />
                </div>
            </div>
        </>
    );
};

export default HealthFacilitiesSection;
