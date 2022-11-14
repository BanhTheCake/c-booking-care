import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import SwiperBasic from '../../../../components/Swiper/SwiperBasic/SwiperBasic';
import './SpecialistSection.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SpecialistSection = () => {

    const navigate = useNavigate()
    const specialtyList = useSelector(state => state.home.specialtyList)

    const dataRender = useMemo(() => {
        const newData = specialtyList?.map(item => {
            const newObject = {}
            newObject.img = item.image
            newObject.text = item.name
            newObject.id = item.id
            return newObject
        }) || []
        
        return newData
    }, [specialtyList])

    const handleClick = (id) => {
        return navigate(`/specialty-details/${id}`)
    }

    return (
        <>
            <div className="home__section SpecialistSection">
                <div className="container">
                    <h4 className="title">
                        <FormattedMessage id={'homePage.popular_specialties'} />
                    </h4>
                    <SwiperBasic
                        data={dataRender}
                        name="popular_specialties"
                        handleClick={handleClick}
                    />
                </div>
            </div>
        </>
    );
};

export default SpecialistSection;
